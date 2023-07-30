import { queryAuthInfo, postLightAuth } from '/api'
import { loginStatus } from '/utils/enum'

export const queryAuthStore = async () => {
  const code = my.getStorageSync({key:'xxx_token'});
  if (!code.data) {
    await lightLogin();
  }
  const { subCode, model } = await queryAuthInfo();
  // 登陆失效操作
  if (subCode === loginStatus.BIZ_FAIL) {
    my.removeStorageSync({key:'xxx_token'})
    await lightLogin();
    const { model } = await queryAuthInfo();
    return model;
  }
  return model;
}

export const lightLogin = async () => {
  console.log(222);
  const code = await getAliCode();
  console.log(111);
  const  { success, model, errorMsg } = await postLightAuth({ authCode: code })
  if (!success) return my.showToast({content: errorMsg});
  my.setStorageSync({key: 'xxx_token',data:model.lightToken});
}

export const getAliCode = () => {
  return new Promise((resolve) => {
    my.getAuthCode({
      scopes: 'auth_base',
      success: res=> {
        resolve(res.authCode)
      },
    })
  })
}