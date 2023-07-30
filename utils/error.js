import { loginStatus } from '/utils/enum'
export const networkError = (status, other) => {
  switch (status) {
    case 404:
      my.showToast({content: "请求的资源不存在"})
      break;
    case 500:
      my.showToast({content: "服务器错误"})
      ElMessage.error("服务器错误");
      break;
    default:
      my.showToast({content: other || "请求出错"})
  }
};

export const workError = (data, showError = true) => {
  if (![loginStatus.BIZ_FAIL].includes(data.errorCode) && showError) {
    my.showToast({content:data.errorMsg})
  }
}