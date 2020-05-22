<template>
  <div class="itemclass">
    <div class="title">{{infoModel.title}}</div>
    <span class="time">{{infoModel.publish_time}}</span>
    <div class="imgdiv">
      <img  v-lazy="showImg" >
    </div>

    <div class="line"></div>
  </div>
</template>

<script>
  import {imgforvalue} from "common/utils";


  export default {
    name: "TVDBInfoItem",
    data(){
      return {
        placeholdimg:require('assets/img/common/placeholder_small.png')
      }
    },
    props:{
      infoModel:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImg(){
        return imgforvalue(this.infoModel.indexpic)
        // return this.infoModel.indexpic.host+this.infoModel.indexpic.dir+
        //   this.infoModel.indexpic.filepath+this.infoModel.indexpic.filename
      }
    }
  }
</script>

<style scoped>
  *{
    --marinX:10px;
  }

  .itemclass{
    height: 24vw;
    position: relative;
  }
  .title{
    font-size: 17.5px;
    width: 65vw;
    padding-top: 3vw;
    padding-left: var(--marinX);
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .time{
    position: absolute;
    bottom: 8px;
    left: var(--marinX);
    color: var(--color-gray);
  }
  .imgdiv{
    width: 27vw;
    height: 18vw;
    position: absolute;
    right: var(--marinX);
    top: 3vw;
  }
  .imgdiv img{
    width: 100%;
    height: 100%;
  }
  .line{
    width: 100%;
    height: 1px;
    background-color: var(--color-gray);
    position: absolute;
    bottom: -1px;
  }
</style>
