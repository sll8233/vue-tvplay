<template>
    <div>
      <YTVideoPlayer ref="slvideoplayer" />
      <VideoTab :tabArray="tabArray" @clickItemPlayer = "clickItemPlayer"/>
    </div>
</template>

<script>
  import YTVideoPlayer from "components/common/videoPlayer/YTVideoPlayer";
  import VideoTab from "./childView/VideoTab";
  import {getVideoChannel} from "network/VideoRequest";

  export default {
    name: "VideoLive",
    data(){
      return{
        tabArray:[],
      }
    },
    components:{
      YTVideoPlayer,
      VideoTab
    },
    mounted() {
      this.setPoster()
    },
    created() {
      getVideoChannel().then(res =>{
        this.tabArray = []
        for(var item of res.data) { // item代表数组里面的元素
          if (item.audio_only == 1)
            this.tabArray.push(item)
        }
      })
    },
    methods:{
      clickItemPlayer(str){
        console.log(str);
        this.$refs.slvideoplayer.setPlayerUrl(str);
        this.setPoster()
      },
      setPoster(){
        this.$refs.slvideoplayer.setPlayerPoster(require("assets/img/video/radio_bg.png"))
      }
    }
  }
</script>

<style scoped>
  .vjs-poster{
    background-image: url("~assets/img/video/radio_bg.png");
  }
</style>
