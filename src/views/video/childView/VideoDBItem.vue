<template>
    <div class="dbitem">
      <div class="title fontWeight">{{dbItem.title}}</div>
      <div class="time">{{dbItem.publish_time}}</div>
      <div class="listenimg">
        <img :src="nowimg">
      </div>
      <gray-line />
    </div>
</template>

<script>
  import grayLine from "components/common/line/grayLine";
  export default {
    name: "VideoDBItem",
    data(){
      return{
        nowimg:require('assets/img/video/listen.png')
      }
    },
    components:{
      grayLine
    },
    props:{
      dbItem:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .dbitem{
    height: 70px;
    position: relative;
  }
  .dbitem .title{
    padding-left: 10px;
    line-height: 40px;
    font-size: 16px;
  }
  .dbitem .time{
    margin-top: 8px;
    padding-left: 10px;
    color: var(--color-gray);
  }
  .listenimg{
    position: absolute;
    width: 30px;
    height: 30px;
    right: 20px;
    top: 20px;
  }
  .listenimg img{
    width: 100%;
    height: 100%;
  }



</style>
