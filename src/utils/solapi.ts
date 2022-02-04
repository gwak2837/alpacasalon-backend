import HmacSHA256 from 'crypto-js/hmac-sha256'
import { utc } from 'moment'
import { customAlphabet } from 'nanoid'
import fetch, { Headers } from 'node-fetch'

const apiKey = process.env.SOLAPI_API_KEY
const apiSecret = process.env.SOLAPI_API_SECRET
const accessToken = process.env.SOLAPI_ACCESS_TOKEN

export const from = process.env.SOLAPI_PHONE_NUMBER
export const pfId = process.env.SOLAPI_PF_ID

function getAuth() {
  if (apiKey && apiSecret) {
    const date = utc().format()
    const salt = customAlphabet(
      '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      32
    )()
    const hmacData = date + salt
    const signature = HmacSHA256(hmacData, apiSecret).toString()

    return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`
  } else if (accessToken) {
    return `Bearer ${accessToken}`
  } else {
    throw new Error(
      '문자메시지를 전송하기 위해서는 액세스토큰 또는 API_KEY, API_SECRET이 필요합니다.'
    )
  }
}

function getUrl(path: string) {
  return `https://api.solapi.com${path}`
}

function getBaseUrl() {
  return 'https://api.solapi.com'
}

export async function send(body: Record<string, any>) {
  const response = await fetch(getUrl(`/messages/v4/send`), {
    method: 'POST',
    headers: new Headers({
      Authorization: getAuth(),
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  })
  return response.json()
}

export async function sendMany(body: Record<string, any>) {
  const response = await fetch(getUrl(`/messages/v4/send-many`), {
    method: 'POST',
    headers: new Headers({
      Authorization: getAuth(),
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  })
  return response.json()
}
