import {request} from "./request";

export function getVideoListArray() {
  return request({
    url:'/V13/Tv/getTv'
  })
}

export function getdbinfo(column_id) {
  return request({
    url:'/V13/Hjnews/getNews',
    params:{
      column_id,
    }
  })
}
//获取video直播tabs
export function getVideoChannel() {
  return request({
    url:'V13/tv/getLive'
  })
}

//获取video每日列表内容
export function getVideoList(channel_id,zone) {
  return request({
    url:'/V13/Tv/getProgram',
    params: {
      channel_id,
      zone
    }
  })
}
