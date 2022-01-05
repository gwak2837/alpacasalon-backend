/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
  DateTime: any
  EmailAddress: any
  JWT: any
  LastValue: any
  Latitude: any
  Longitude: any
  NonEmptyString: any
  NonNegativeInt: any
  PositiveInt: any
  URL: any
  UUID: any
}

export type Comment = {
  __typename?: 'Comment'
  contents?: Maybe<Scalars['NonEmptyString']>
  creationTime?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  isLiked: Scalars['Boolean']
  isModified: Scalars['Boolean']
  likedCount: Scalars['NonNegativeInt']
  modificationTime?: Maybe<Scalars['DateTime']>
  /** 이 댓글의 상위 댓글 */
  parentComment?: Maybe<Comment>
  /** 이 댓글이 달린 피드 */
  post?: Maybe<Post>
  /** 대댓글 */
  subcomments?: Maybe<Array<Comment>>
  /** 댓글을 작성한 사용자 */
  user?: Maybe<User>
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export type Group = {
  __typename?: 'Group'
  creationTime: Scalars['DateTime']
  description?: Maybe<Scalars['NonEmptyString']>
  id: Scalars['ID']
  imageUrl?: Maybe<Scalars['URL']>
  isJoined: Scalars['Boolean']
  memberCount: Scalars['NonNegativeInt']
  modificationTime: Scalars['DateTime']
  name: Scalars['NonEmptyString']
  newMembers?: Maybe<Array<User>>
}

export type GroupCreationInput = {
  description?: InputMaybe<Scalars['NonEmptyString']>
  imageUrl?: InputMaybe<Scalars['URL']>
  name: Scalars['NonEmptyString']
}

export type GroupModificationInput = {
  description?: InputMaybe<Scalars['NonEmptyString']>
  id: Scalars['ID']
  imageUrl?: InputMaybe<Scalars['URL']>
  name?: InputMaybe<Scalars['NonEmptyString']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createComment?: Maybe<Comment>
  createGroup?: Maybe<Group>
  createPoll?: Maybe<Poll>
  createPost?: Maybe<Post>
  createZoom?: Maybe<Zoom>
  deleteComment?: Maybe<Comment>
  deleteGroup?: Maybe<Group>
  deletePost?: Maybe<Post>
  deleteZoom?: Maybe<Zoom>
  joinGroup?: Maybe<Group>
  joinZoom?: Maybe<Zoom>
  /** 로그아웃 성공 여부 반환 */
  logout: Scalars['Boolean']
  readNotifications?: Maybe<Scalars['NonNegativeInt']>
  toggleLikingComment?: Maybe<Comment>
  /** 회원탈퇴 시 사용자 정보가 모두 초기화됩니다 */
  unregister?: Maybe<User>
  updateComment?: Maybe<Comment>
  updateGroup?: Maybe<Group>
  updatePost?: Maybe<Post>
  /** 사용자 정보를 수정합니다 */
  updateUser?: Maybe<User>
  updateZoom?: Maybe<Zoom>
}

export type MutationCreateCommentArgs = {
  commentId?: InputMaybe<Scalars['ID']>
  contents: Scalars['NonEmptyString']
  postId: Scalars['ID']
}

export type MutationCreateGroupArgs = {
  input: GroupCreationInput
}

export type MutationCreatePollArgs = {
  input: PollCreationInput
}

export type MutationCreatePostArgs = {
  input: PostCreationInput
}

export type MutationCreateZoomArgs = {
  input: ZoomCreationInput
}

export type MutationDeleteCommentArgs = {
  id: Scalars['ID']
}

export type MutationDeleteGroupArgs = {
  id: Scalars['ID']
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationDeleteZoomArgs = {
  id: Scalars['ID']
}

export type MutationJoinGroupArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type MutationJoinZoomArgs = {
  id: Scalars['ID']
}

export type MutationReadNotificationsArgs = {
  ids: Array<Scalars['ID']>
}

export type MutationToggleLikingCommentArgs = {
  id: Scalars['ID']
}

export type MutationUpdateCommentArgs = {
  contents: Scalars['NonEmptyString']
  id: Scalars['ID']
}

export type MutationUpdateGroupArgs = {
  input: GroupModificationInput
}

export type MutationUpdatePostArgs = {
  input: PostModificationInput
}

export type MutationUpdateUserArgs = {
  input: UserModificationInput
}

export type MutationUpdateZoomArgs = {
  input: ZoomModificationInput
}

export type Notification = {
  __typename?: 'Notification'
  contents: Scalars['NonEmptyString']
  creationTime: Scalars['DateTime']
  id: Scalars['ID']
  isRead: Scalars['Boolean']
  receiver: User
  sender?: Maybe<User>
  type: NotificationType
}

export enum NotificationType {
  LikingComment = 'LIKING_COMMENT',
  NewComment = 'NEW_COMMENT',
  NewSubcomment = 'NEW_SUBCOMMENT',
}

/** 기본값: 내림차순 */
export enum OrderDirection {
  Asc = 'ASC',
}

export type Pagination = {
  lastId?: InputMaybe<Scalars['ID']>
  lastValue?: InputMaybe<Scalars['LastValue']>
  limit: Scalars['PositiveInt']
}

export type Poll = {
  __typename?: 'Poll'
  closingTime: Scalars['DateTime']
  contents?: Maybe<Scalars['NonEmptyString']>
  creationTime: Scalars['DateTime']
  id: Scalars['ID']
  selection?: Maybe<Array<PollSelection>>
  status: Status
  title: Scalars['NonEmptyString']
}

export type PollComment = {
  __typename?: 'PollComment'
  contents?: Maybe<Scalars['NonEmptyString']>
  creationTime: Scalars['DateTime']
  id: Scalars['ID']
  modificationTime: Scalars['DateTime']
  selection?: Maybe<Array<PollSelection>>
  status: Status
  title: Scalars['NonEmptyString']
}

export type PollCreationInput = {
  title: Scalars['NonEmptyString']
}

export type PollSelection = {
  __typename?: 'PollSelection'
  contents: Scalars['NonEmptyString']
  count: Scalars['NonNegativeInt']
  creationTime: Scalars['DateTime']
  id: Scalars['ID']
  poll: Poll
}

export type Post = {
  __typename?: 'Post'
  commentCount: Scalars['NonNegativeInt']
  contents: Scalars['NonEmptyString']
  creationTime: Scalars['DateTime']
  /** 모임 */
  group?: Maybe<Group>
  id: Scalars['ID']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  /** 피드 좋아요 여부 (로그인 필요) */
  isLiked: Scalars['Boolean']
  modificationTime: Scalars['DateTime']
  title: Scalars['NonEmptyString']
  /** 글쓴이 */
  user?: Maybe<User>
}

export type PostCreationInput = {
  contents: Scalars['NonEmptyString']
  groupId?: InputMaybe<Scalars['ID']>
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
  title: Scalars['NonEmptyString']
}

export type PostModificationInput = {
  contents?: InputMaybe<Scalars['NonEmptyString']>
  id: Scalars['ID']
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
  title?: InputMaybe<Scalars['NonEmptyString']>
}

export type Query = {
  __typename?: 'Query'
  /** 특정 게시글에 달린 댓글 */
  commentsByPost?: Maybe<Array<Comment>>
  /** 이번 달 핫한 이야기 */
  famousPosts?: Maybe<Array<Post>>
  group?: Maybe<Group>
  /** 사용자 닉네임 중복 여부 검사 */
  isNicknameUnique: Scalars['Boolean']
  /** 좋아요 누른 댓글 */
  likedComments?: Maybe<Array<Comment>>
  /** 현재 로그인된(JWT) 사용자 정보를 반환 */
  me?: Maybe<User>
  /** 내가 쓴 댓글 */
  myComments?: Maybe<Array<Comment>>
  myGroups?: Maybe<Array<Group>>
  myPosts?: Maybe<Array<Post>>
  myZooms?: Maybe<Array<Zoom>>
  notifications?: Maybe<Array<Notification>>
  participatingPolls?: Maybe<Array<Poll>>
  /** 글 상세 */
  post?: Maybe<Post>
  /** 글 목록 */
  posts?: Maybe<Array<Post>>
  postsByGroup?: Maybe<Array<Post>>
  recommendationGroups?: Maybe<Array<Group>>
  /** 글 검색 */
  searchPosts?: Maybe<Array<Post>>
  /** 글 검색 */
  searchZooms?: Maybe<Array<Zoom>>
  /** 닉네임으로 사용자 검색 */
  userByNickname?: Maybe<User>
  /** 글 상세 */
  zoom?: Maybe<Zoom>
  /** 글 목록 */
  zooms?: Maybe<Array<Zoom>>
}

export type QueryCommentsByPostArgs = {
  postId: Scalars['ID']
}

export type QueryGroupArgs = {
  id: Scalars['ID']
}

export type QueryIsNicknameUniqueArgs = {
  nickname: Scalars['NonEmptyString']
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryPostsArgs = {
  pagination: Pagination
}

export type QueryPostsByGroupArgs = {
  groupId: Scalars['ID']
}

export type QuerySearchPostsArgs = {
  keywords: Array<Scalars['NonEmptyString']>
}

export type QuerySearchZoomsArgs = {
  keywords: Array<Scalars['NonEmptyString']>
}

export type QueryUserByNicknameArgs = {
  nickname: Scalars['NonEmptyString']
}

export type QueryZoomArgs = {
  id: Scalars['ID']
}

export type QueryZoomsArgs = {
  pagination: Pagination
}

export type Review = {
  __typename?: 'Review'
  contents?: Maybe<Scalars['NonEmptyString']>
  creationTime: Scalars['DateTime']
  id: Scalars['ID']
  modificationTime: Scalars['DateTime']
  title?: Maybe<Scalars['NonEmptyString']>
  writer?: Maybe<User>
}

export enum Status {
  Closed = 'CLOSED',
  Ongoing = 'ONGOING',
  Planned = 'PLANNED',
}

export type User = {
  __typename?: 'User'
  bio?: Maybe<Scalars['NonEmptyString']>
  birthday: Scalars['NonEmptyString']
  birthyear: Scalars['Int']
  creationTime: Scalars['DateTime']
  email: Scalars['EmailAddress']
  gender: Gender
  hasNewNotifications: Scalars['Boolean']
  id: Scalars['UUID']
  imageUrl?: Maybe<Scalars['URL']>
  likedCount: Scalars['NonNegativeInt']
  modificationTime: Scalars['DateTime']
  nickname?: Maybe<Scalars['NonEmptyString']>
  phoneNumber?: Maybe<Scalars['NonEmptyString']>
}

export type UserModificationInput = {
  ageRange?: InputMaybe<Scalars['NonEmptyString']>
  bio?: InputMaybe<Scalars['String']>
  birthday?: InputMaybe<Scalars['NonEmptyString']>
  email?: InputMaybe<Scalars['EmailAddress']>
  gender?: InputMaybe<Gender>
  imageUrl?: InputMaybe<Scalars['URL']>
  nickname?: InputMaybe<Scalars['NonEmptyString']>
  phoneNumber?: InputMaybe<Scalars['NonEmptyString']>
}

export type Zoom = {
  __typename?: 'Zoom'
  creationTime: Scalars['DateTime']
  description: Scalars['NonEmptyString']
  id: Scalars['ID']
  imageUrl?: Maybe<Scalars['URL']>
  isJoined: Scalars['Boolean']
  modificationTime: Scalars['DateTime']
  tags?: Maybe<Array<Scalars['NonEmptyString']>>
  title: Scalars['NonEmptyString']
  whenWhat: Array<Scalars['NonEmptyString']>
  whenWhere: Scalars['NonEmptyString']
}

export type ZoomCreationInput = {
  description: Scalars['NonEmptyString']
  imageUrl?: InputMaybe<Scalars['URL']>
  title: Scalars['NonEmptyString']
}

export type ZoomModificationInput = {
  contents?: InputMaybe<Scalars['NonEmptyString']>
  id: Scalars['ID']
  imageUrl?: InputMaybe<Scalars['URL']>
  title?: InputMaybe<Scalars['NonEmptyString']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Comment: ResolverTypeWrapper<Comment>
  Date: ResolverTypeWrapper<Scalars['Date']>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>
  Gender: Gender
  Group: ResolverTypeWrapper<Group>
  GroupCreationInput: GroupCreationInput
  GroupModificationInput: GroupModificationInput
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  JWT: ResolverTypeWrapper<Scalars['JWT']>
  LastValue: ResolverTypeWrapper<Scalars['LastValue']>
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>
  Mutation: ResolverTypeWrapper<{}>
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>
  Notification: ResolverTypeWrapper<Notification>
  NotificationType: NotificationType
  OrderDirection: OrderDirection
  Pagination: Pagination
  Poll: ResolverTypeWrapper<Poll>
  PollComment: ResolverTypeWrapper<PollComment>
  PollCreationInput: PollCreationInput
  PollSelection: ResolverTypeWrapper<PollSelection>
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>
  Post: ResolverTypeWrapper<Post>
  PostCreationInput: PostCreationInput
  PostModificationInput: PostModificationInput
  Query: ResolverTypeWrapper<{}>
  Review: ResolverTypeWrapper<Review>
  Status: Status
  String: ResolverTypeWrapper<Scalars['String']>
  URL: ResolverTypeWrapper<Scalars['URL']>
  UUID: ResolverTypeWrapper<Scalars['UUID']>
  User: ResolverTypeWrapper<User>
  UserModificationInput: UserModificationInput
  Zoom: ResolverTypeWrapper<Zoom>
  ZoomCreationInput: ZoomCreationInput
  ZoomModificationInput: ZoomModificationInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']
  Comment: Comment
  Date: Scalars['Date']
  DateTime: Scalars['DateTime']
  EmailAddress: Scalars['EmailAddress']
  Group: Group
  GroupCreationInput: GroupCreationInput
  GroupModificationInput: GroupModificationInput
  ID: Scalars['ID']
  Int: Scalars['Int']
  JWT: Scalars['JWT']
  LastValue: Scalars['LastValue']
  Latitude: Scalars['Latitude']
  Longitude: Scalars['Longitude']
  Mutation: {}
  NonEmptyString: Scalars['NonEmptyString']
  NonNegativeInt: Scalars['NonNegativeInt']
  Notification: Notification
  Pagination: Pagination
  Poll: Poll
  PollComment: PollComment
  PollCreationInput: PollCreationInput
  PollSelection: PollSelection
  PositiveInt: Scalars['PositiveInt']
  Post: Post
  PostCreationInput: PostCreationInput
  PostModificationInput: PostModificationInput
  Query: {}
  Review: Review
  String: Scalars['String']
  URL: Scalars['URL']
  UUID: Scalars['UUID']
  User: User
  UserModificationInput: UserModificationInput
  Zoom: Zoom
  ZoomCreationInput: ZoomCreationInput
  ZoomModificationInput: ZoomModificationInput
}

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = {
  contents?: Resolver<Maybe<ResolversTypes['NonEmptyString']>, ParentType, ContextType>
  creationTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  imageUrls?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>
  isLiked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isModified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  likedCount?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>
  modificationTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>
  parentComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>
  subcomments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress'
}

export type GroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']
> = {
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['NonEmptyString']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  imageUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>
  isJoined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  memberCount?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>
  modificationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  newMembers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT'
}

export interface LastValueScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['LastValue'], any> {
  name: 'LastValue'
}

export interface LatitudeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude'
}

export interface LongitudeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude'
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createComment?: Resolver<
    Maybe<ResolversTypes['Comment']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommentArgs, 'contents' | 'postId'>
  >
  createGroup?: Resolver<
    Maybe<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateGroupArgs, 'input'>
  >
  createPoll?: Resolver<
    Maybe<ResolversTypes['Poll']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreatePollArgs, 'input'>
  >
  createPost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreatePostArgs, 'input'>
  >
  createZoom?: Resolver<
    Maybe<ResolversTypes['Zoom']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateZoomArgs, 'input'>
  >
  deleteComment?: Resolver<
    Maybe<ResolversTypes['Comment']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommentArgs, 'id'>
  >
  deleteGroup?: Resolver<
    Maybe<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteGroupArgs, 'id'>
  >
  deletePost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, 'id'>
  >
  deleteZoom?: Resolver<
    Maybe<ResolversTypes['Zoom']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteZoomArgs, 'id'>
  >
  joinGroup?: Resolver<
    Maybe<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<MutationJoinGroupArgs, never>
  >
  joinZoom?: Resolver<
    Maybe<ResolversTypes['Zoom']>,
    ParentType,
    ContextType,
    RequireFields<MutationJoinZoomArgs, 'id'>
  >
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  readNotifications?: Resolver<
    Maybe<ResolversTypes['NonNegativeInt']>,
    ParentType,
    ContextType,
    RequireFields<MutationReadNotificationsArgs, 'ids'>
  >
  toggleLikingComment?: Resolver<
    Maybe<ResolversTypes['Comment']>,
    ParentType,
    ContextType,
    RequireFields<MutationToggleLikingCommentArgs, 'id'>
  >
  unregister?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  updateComment?: Resolver<
    Maybe<ResolversTypes['Comment']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCommentArgs, 'contents' | 'id'>
  >
  updateGroup?: Resolver<
    Maybe<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateGroupArgs, 'input'>
  >
  updatePost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePostArgs, 'input'>
  >
  updateUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'input'>
  >
  updateZoom?: Resolver<
    Maybe<ResolversTypes['Zoom']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateZoomArgs, 'input'>
  >
}

export interface NonEmptyStringScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString'
}

export interface NonNegativeIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt'
}

export type NotificationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']
> = {
  contents?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  isRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  receiver?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  type?: Resolver<ResolversTypes['NotificationType'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PollResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Poll'] = ResolversParentTypes['Poll']
> = {
  closingTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  contents?: Resolver<Maybe<ResolversTypes['NonEmptyString']>, ParentType, ContextType>
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  selection?: Resolver<Maybe<Array<ResolversTypes['PollSelection']>>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PollCommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PollComment'] = ResolversParentTypes['PollComment']
> = {
  contents?: Resolver<Maybe<ResolversTypes['NonEmptyString']>, ParentType, ContextType>
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  modificationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  selection?: Resolver<Maybe<Array<ResolversTypes['PollSelection']>>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PollSelectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PollSelection'] = ResolversParentTypes['PollSelection']
> = {
  contents?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  count?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  poll?: Resolver<ResolversTypes['Poll'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface PositiveIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt'
}

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  commentCount?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>
  contents?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  group?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  imageUrls?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>
  isLiked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  modificationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  commentsByPost?: Resolver<
    Maybe<Array<ResolversTypes['Comment']>>,
    ParentType,
    ContextType,
    RequireFields<QueryCommentsByPostArgs, 'postId'>
  >
  famousPosts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>
  group?: Resolver<
    Maybe<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<QueryGroupArgs, 'id'>
  >
  isNicknameUnique?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<QueryIsNicknameUniqueArgs, 'nickname'>
  >
  likedComments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  myComments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>
  myGroups?: Resolver<Maybe<Array<ResolversTypes['Group']>>, ParentType, ContextType>
  myPosts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>
  myZooms?: Resolver<Maybe<Array<ResolversTypes['Zoom']>>, ParentType, ContextType>
  notifications?: Resolver<Maybe<Array<ResolversTypes['Notification']>>, ParentType, ContextType>
  participatingPolls?: Resolver<Maybe<Array<ResolversTypes['Poll']>>, ParentType, ContextType>
  post?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryPostArgs, 'id'>
  >
  posts?: Resolver<
    Maybe<Array<ResolversTypes['Post']>>,
    ParentType,
    ContextType,
    RequireFields<QueryPostsArgs, 'pagination'>
  >
  postsByGroup?: Resolver<
    Maybe<Array<ResolversTypes['Post']>>,
    ParentType,
    ContextType,
    RequireFields<QueryPostsByGroupArgs, 'groupId'>
  >
  recommendationGroups?: Resolver<Maybe<Array<ResolversTypes['Group']>>, ParentType, ContextType>
  searchPosts?: Resolver<
    Maybe<Array<ResolversTypes['Post']>>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchPostsArgs, 'keywords'>
  >
  searchZooms?: Resolver<
    Maybe<Array<ResolversTypes['Zoom']>>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchZoomsArgs, 'keywords'>
  >
  userByNickname?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserByNicknameArgs, 'nickname'>
  >
  zoom?: Resolver<
    Maybe<ResolversTypes['Zoom']>,
    ParentType,
    ContextType,
    RequireFields<QueryZoomArgs, 'id'>
  >
  zooms?: Resolver<
    Maybe<Array<ResolversTypes['Zoom']>>,
    ParentType,
    ContextType,
    RequireFields<QueryZoomsArgs, 'pagination'>
  >
}

export type ReviewResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']
> = {
  contents?: Resolver<Maybe<ResolversTypes['NonEmptyString']>, ParentType, ContextType>
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  modificationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes['NonEmptyString']>, ParentType, ContextType>
  writer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL'
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID'
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  bio?: Resolver<Maybe<ResolversTypes['NonEmptyString']>, ParentType, ContextType>
  birthday?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  birthyear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>
  hasNewNotifications?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  imageUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>
  likedCount?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>
  modificationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  nickname?: Resolver<Maybe<ResolversTypes['NonEmptyString']>, ParentType, ContextType>
  phoneNumber?: Resolver<Maybe<ResolversTypes['NonEmptyString']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ZoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Zoom'] = ResolversParentTypes['Zoom']
> = {
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  imageUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>
  isJoined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  modificationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  tags?: Resolver<Maybe<Array<ResolversTypes['NonEmptyString']>>, ParentType, ContextType>
  title?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  whenWhat?: Resolver<Array<ResolversTypes['NonEmptyString']>, ParentType, ContextType>
  whenWhere?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>
  Date?: GraphQLScalarType
  DateTime?: GraphQLScalarType
  EmailAddress?: GraphQLScalarType
  Group?: GroupResolvers<ContextType>
  JWT?: GraphQLScalarType
  LastValue?: GraphQLScalarType
  Latitude?: GraphQLScalarType
  Longitude?: GraphQLScalarType
  Mutation?: MutationResolvers<ContextType>
  NonEmptyString?: GraphQLScalarType
  NonNegativeInt?: GraphQLScalarType
  Notification?: NotificationResolvers<ContextType>
  Poll?: PollResolvers<ContextType>
  PollComment?: PollCommentResolvers<ContextType>
  PollSelection?: PollSelectionResolvers<ContextType>
  PositiveInt?: GraphQLScalarType
  Post?: PostResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Review?: ReviewResolvers<ContextType>
  URL?: GraphQLScalarType
  UUID?: GraphQLScalarType
  User?: UserResolvers<ContextType>
  Zoom?: ZoomResolvers<ContextType>
}
