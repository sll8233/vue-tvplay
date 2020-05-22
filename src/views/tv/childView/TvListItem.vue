<template>
    <div class="tv-item">
      <span class="time">{{showStartTime}}</span>
      <span class="title">{{tvItem.theme}}</span>
      <span class="play-icon" ><img :src="showimg" ></span>
    </div>
</template>

<script>
  export default {
    name: "TvListItem",
    props:{
      tvItem:{
        type:Object,
        default(){
          return {}
        }
      }

    },
    computed:{
      showStartTime(){
        return this.tvItem.start.length>0?this.tvItem.start:"00:00"
      },
      showimg(){

        return this.tvItem.display == 1? require("assets/img/tv/play_normal.png"):require("assets/img/tv/play_display.png")
      }
    }
  }
</script>

<style scoped>
  .tv-item{
    height: 50px;
    line-height: 50px;
    display: flex;
    text-align: center;
    font-size: 16.6px;
  }
  .time{
    flex:1;

    /*padding-left: 10px;*/
  }
  .title{
    flex:2;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    /*padding: 0 15px;*/
  }
  .play-icon{
    flex:1;
  }
  .play-icon img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
</style>
