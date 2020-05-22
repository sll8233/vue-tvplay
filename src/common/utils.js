export function debounce (func,delay) {
    let timer = null;
    return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this,args)
        },delay)
    }
}

// 如果传过来是个单数,前面加个0
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };


// 封装格式化时间正则函数  (时间, '格式化')
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

//传入model的indexpic，拼接img字符串
export function imgforvalue(model) {

  if (model)
    return model.host+model.dir + model.filepath + model.filename
  else
    return '../../../assets/img/tv/newPlay.png'
}

//传入model，拼接播放视频的url字符串
export function playlerforvalue(model) {

  if (model.video){
    if (model.video.dir.length>0){
      let src = model.video.host+model.video.dir+model.video.filepath+model.video.filename
      return src

    }else{
      let src = model.video.host+"/"+model.video.dir+model.video.filepath+model.video.filename
      return src
    }
  }else
    return ""
}
export function dayItems(nowDay){
  switch (nowDay) {
    case 0:
      return ["今天","昨天","前天","周二","周三","周四","周五"];
      break;
    case 1:
      return ["今天","昨天","前天","周三","周四","周五","周六"];
      break;
    case 2:
      return ["今天","昨天","前天","周四","周五","周六","周日"];
      break;
    case 3:
      return ["今天","昨天","前天","周五","周六","周日","周一"];
      break;
    case 4:
      return ["今天","昨天","前天","周六","周日","周一","周二"];
      break;
    case 5:
      return ["今天","昨天","前天","周日","周一","周二","周三"];
      break;
    case 6:
      return ["今天","昨天","前天","周一","周二","周三","周四"];
      break;
    default: return []
      break;
  }
}
