import request from '@/utils/request'
// 登录
export const loginAPI = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const userInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}
