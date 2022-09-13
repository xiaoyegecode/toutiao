import request from '@/utils/request'
export const channelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 *获取文章
 * @param {String | Number} id 频道的id
 * @param {Number} timestamp 请求新的推荐数据传当时的时间戳
 * @returns Promise
 */
export const articleListAPI = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
export const AllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
