const go = (url, type = 'navigateTo') => {
  switch (type) {
    case 'navigateTo':
      my.navigateTo({
        url
      });
      break;
    case 'switchTab':
      my.switchTab({
        url
      });
      break;
    case 'redirectTo':
      my.redirectTo({
        url
      })
      break;
    case 'reLaunch':
      my.reLaunch({
        url
      })
      break;
  }
};
export default go