import reqUrl from './url'
import { request } from './request';
import { channelCode } from '/utils/enum'

// 查询用户信息 
export const queryUserInfo = () => {
  return request(reqUrl.queryUserInfo, { method: 'post' })
}
export const Upload = (filePath, url = reqUrl.uploadInternalUrl) => {
  return new Promise((resolve) => {
    my.uploadFile({
      url: url,
      name: 'file',
      headers: {
        channelcode: channelCode,
        authToken: my.getStorageSync({key: 'xxx_token'}).data
      },
      filePath,
      success: (res) => {
        resolve(JSON.parse(res.data))
      },
      fail: err=>{
        console.log(err);
      }
    })
  })
}