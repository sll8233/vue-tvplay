<template>
    <div class="videodb">
      <van-tree-select height="tvdbheight" @click-nav="clickTreeNav"
                       :items="items" :main-active-index.sync="active" class="vantree">
        <template #content>
          <ul>
            <li v-for=" (item,index) in dblistArray" @click="videoClick(item)" :key="index">
              <video-d-b-item :dbItem = item />
            </li>
          </ul>
        </template>
      </van-tree-select>

      <YTVideoPlayer class="videoplay" ref="videoplayer"/>

    </div>
</template>

<script>
  import { TreeSelect } from 'vant';
  import {getVideoListArray,getdbinfo} from "network/VideoRequest";
  import VideoDBItem from "./childView/VideoDBItem";
  import YTVideoPlayer from "components/common/videoPlayer/YTVideoPlayer";
  import {playlerforvalue} from "common/utils";

  export default {
    name: "VideoDBVC",
    components:{
      [TreeSelect.name]:TreeSelect,
      VideoDBItem,
      YTVideoPlayer
    },
    data(){
      return{
        active: 0,
        dblistArray:[],
        // items: [{ text: '分组 1' }, { text: '分组 2' }],
        videoList:[]
      }
    },
    computed:{

      items(){
        const itemA = []
        for(let item of this.videoList)
          itemA.push( { "text": item.program_name })
        return itemA
      },
      tvdbheight(){}
    },


    created() {
      getVideoListArray().then(res =>{
        for(let item of res.data)
          if (item.audio_only == 1)
              this.videoList = item.program
        console.log(this.videoList);
        this.clickTreeNav(0)
      })

    },
    methods:{
      clickTreeNav(index){
        getdbinfo(this.videoList[index].column_id).then(res =>{
          this.dblistArray = res.data
        })
      },
      videoClick(item){
        this.$refs.videoplayer.setPlayerUrl(playlerforvalue(item))
        setTimeout(()=>{
          this.$refs.videoplayer.goPlayer()
        },10)
      }
    }
  }
</script>

<style scoped>
  .videodb{
    height: calc(100vh - 44px - 30px);
    overflow: hidden;
  }
  .vantree{
    height: 100%;
  }
  .videodb >>> .van-sidebar-item--select::before{
    background-color: var(--color-select);
    height: 100%;
  }

  .videoplay{
    height: 0px;
  }


  /*.videodb >>> .van-sidebar-item__text{*/
  /*  padding-left: 35px;*/
  /*}*/
  /*.videodb >>> .van-sidebar-item__text::before{*/
  /*  content: '123';*/
  /*  position: absolute;*/
  /*  width: 33px;*/
  /*  height: 33px;*/
  /*  left: 0px;*/
  /*  top: -7px;*/
  /*  background-color: red;*/
  /*}*/
</style>
