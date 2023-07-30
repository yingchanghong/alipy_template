import { channelCode, loginStatus } from '/utils/enum'
import { lightLogin } from '/utils/lightLogin'
import go from '/utils/go'
import { networkError, workError } from '/utils/error'
export const request = (url, config = {}) => {
  const _config = {
    method: "get",
  }
  _config.data = config.data;
  _config.method = config.method || "get";
  _config.headers = {
    channelcode: channelCode,
    authToken: my.getStorageSync({ key: 'xxx_token' }).data
  }
  return new Promise((resolve, reject) => {
    my.showLoading({ content: "请稍后" });
    my.request({
      url,
      ..._config,
      success: async res => {
        if (res.data.subCode === loginStatus.BIZ_FAIL) {
          my.removeStorageSync({ key: 'xxx_token' });
          await lightLogin();
          resolve(refresh(url, config))
        }
        if (res.data.subCode === loginStatus.INVALID_LOGIN) {
          go(`/pages/login/login`, 'reLaunch');
        }
        if (!res.data.success) {
          workError(res.data, config.showError)
        }
        resolve(res.data);
      },
      fail: err => {
        networkError(err.status)
        reject(err)
      },
      complete: () => {
        my.hideLoading()
      }
    })
  })
}

const refresh = async (url, config = {}) => {
  const _config = {
    method: "get",
  }
  _config.data = config.data;
  _config.method = config.method || "get";
  _config.headers = {
    channelcode: channelCode,
    authToken: my.getStorageSync({ key: 'xxx_token' }).data
  }
  return new Promise((resolve) => {
    my.request({
      url,
      ..._config,
      success: (res) => {
        resolve(res.data)
      },
    })
  })
}