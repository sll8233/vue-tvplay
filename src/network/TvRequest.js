import {request} from "./request";

//获取看电视->直播->  channel_id频道id,zone第几天
export function getTvDatas(channel_id,zone){
  return request({
    // url:'/search/error.html',
    url:'V13/Tv/getProgram',
    params:{
      channel_id,
      zone
    }
  })
}

//获取看电视->直播->tabs频道
export function getChannelsA() {
  return request({
    url:'V13/tv/getLive'
  })
}
//获取看电视->点播->all数据
export function getDBDatas() {
  return request({
    url:'V13/Tv/getTv'
  })
}

export function getDBInfoDatas(column_id,page) {
  return request({
    url:'V13/Hjnews/getNews',
    params: {
      column_id,
      page
    }
  })
}


export class liveModel{
  constructor(m3u8,channel_id,channel_logo,channel_stream,display,end,now_play,start,theme,dates,id) {
    this.m3u8 = m3u8
    this.channel_id = channel_id
    this.channel_logo = channel_logo
    this.channel_stream = channel_stream
    this.display = display
    this.end = end
    this.now_play = now_play
    this.start = start
    this.theme = theme
    this.dates = dates
    this.id = id
  }
}
