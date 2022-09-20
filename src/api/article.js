import request from '@/utils/request'
export const getArticleByIdAPI = (id) => {
  return request({
    url: '/v1_0/articles/' + id
  })
}
export const addFollowAPI = (userId) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })
}
export const delFollowAPI = (userId) => {
  return request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}
export const PostCommentAPI = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
export const getCommentListAPI = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}
export const addCollectAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
export const delCollectAPI = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
