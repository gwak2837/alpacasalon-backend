import { mergeResolvers } from '@graphql-tools/merge'

import * as commentMutationResolver from './comment/Mutation'
import * as commentObjectResolver from './comment/Object'
import * as commentQueryResolver from './comment/Query'
import * as commonResolver from './common/common'
import * as postMutationResolver from './post/Mutation'
import * as postObjectResolver from './post/Object'
import * as postQueryResolver from './post/Query'
import * as userMutationResolver from './user/Mutation'
import * as userObjectResolver from './user/Object'
import * as userQueryResolver from './user/Query'

const resolversArray = [
  commentMutationResolver,
  commentObjectResolver,
  commentQueryResolver,
  commonResolver,
  postMutationResolver,
  postObjectResolver,
  postQueryResolver,
  userMutationResolver,
  userObjectResolver,
  userQueryResolver,
]

export const resolvers = mergeResolvers(resolversArray)
