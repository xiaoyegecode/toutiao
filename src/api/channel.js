import request from '@/utils/request'
export const channelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 推荐新闻
export const articleListAPI = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
