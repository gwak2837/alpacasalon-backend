import { Express } from 'express'
import fetch from 'node-fetch'

import { poolQuery } from '../database/postgres'
import { generateJWT } from '../utils/jwt'
import findKakaoUser from './sql/findKakaoUser.sql'
import registerKakaoUser from './sql/registerKakaoUser.sql'

function encodeGender(gender: string) {
  switch (gender) {
    case 'male':
      return 1
    case 'female':
      return 2
    default:
      return 0
  }
}

function verifyTargetCustomer(user: any) {
  return (
    user.id === 1992264706 || // 제리
    user.id === 2003890986 || // 토리
    user.id === 1990358042 || // 또리
    user.id === 2026354632 || // 수리
    user.id === 2045905961 || // ?
    user.id === 2013581948 || // 시리
    user.id === 2064695827 || // 아리
    user.id === 2073558438 || // 블리
    (user.kakao_account.gender === 'female' &&
      new Date().getFullYear() - +user.kakao_account.birthyear >= 40)
  )
}

function hasRequiredInfo(user: any) {
  return user.nickname && user.phone_number
}

async function fetchKakaoUserToken(code: string) {
  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API_KEY}&code=${code}`,
  })

  return (await response.json()) as Record<string, unknown>
}

async function fetchKakaoUserInfo(accessToken: string) {
  const response = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return (await response.json()) as Record<string, unknown>
}

export async function unregisterKakaoUser(kakaoUserId: string) {
  return fetch('https://kapi.kakao.com/v1/user/unlink', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
    },
    body: `target_id_type=user_id&target_id=${kakaoUserId}`,
  })
}

export function setOAuthStrategies(app: Express) {
  // Kakao OAuth
  app.get('/oauth/kakao', async (req, res) => {
    if (!req.query.code) {
      return res.status(400).send('400 Bad Request')
    }

    const kakaoUserToken = await fetchKakaoUserToken(req.query.code as string)
    if (kakaoUserToken.error) {
      return res.status(400).send('400 Bad Request')
    }

    const kakaoUserInfo = await fetchKakaoUserInfo(kakaoUserToken.access_token as string)
    const kakaoAccount = kakaoUserInfo.kakao_account as any
    const frontendUrl = process.env.FRONTEND_URL

    // 선택항목 미동의 시 다른 페이지로 리다이렉트 하기
    if (!kakaoAccount.birthyear || !kakaoAccount.birthday || !kakaoAccount.gender) {
      unregisterKakaoUser(kakaoUserInfo.id as string)
      return res.redirect(`${frontendUrl}/need-info`)
    }

    // 4050 여성이 아닌 경우
    if (!verifyTargetCustomer(kakaoUserInfo)) {
      return res.redirect(`${frontendUrl}/sorry?id=${kakaoUserInfo.id}`)
    }

    const findKakaoUserResult = await poolQuery(findKakaoUser, [kakaoUserInfo.id])
    const kakaoUser = findKakaoUserResult.rows[0]

    // 이미 kakao 소셜 로그인 정보가 존재하는 경우
    if (kakaoUser?.id) {
      const jwt = await generateJWT({ userId: kakaoUser.id })

      // 필수 정보가 없는 경우
      if (!hasRequiredInfo(kakaoUser)) {
        return res.redirect(
          `${frontendUrl}/oauth/register?${new URLSearchParams({
            jwt,
            nickname: kakaoUser.nickname,
            phoneNumber: kakaoUser.phone_number,
          })}`
        )
      }

      return res.redirect(
        `${frontendUrl}/oauth?${new URLSearchParams({ jwt, nickname: kakaoUser.nickname })}`
      )
    }

    // kakao 소셜 로그인 정보가 없는 경우
    const { rows } = await poolQuery(registerKakaoUser, [
      kakaoAccount.email,
      null,
      kakaoAccount.phone_number,
      kakaoAccount.birthyear,
      kakaoAccount.birthday,
      encodeGender(kakaoAccount.gender),
      '알파카의 소개가 아직 없어요.',
      kakaoAccount.profile.profile_image_url,
      kakaoUserInfo.id,
    ])
    const newKakaoUser = rows[0]

    const queryString = new URLSearchParams({
      jwt: await generateJWT({ userId: newKakaoUser.id }),
      phoneNumber: newKakaoUser.phone_number,
    })

    return res.redirect(`${frontendUrl}/oauth/register?${queryString}`)
  })

  // app.get('/oauth/kakao/unregister', async (req, res) => {
  //   console.log('👀 - req.query.code', req.query.code)
  // })
}
