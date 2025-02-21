export function formatData(data, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  let o = {
    'M+': data.getMonth() + 1,
    'd+': data.getDate() + 1,
    'h+': data.getHours() + 1,
    'm+': data.getMinutes() + 1,
    's+': data.getSeconds() + 1
  };

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }

  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
