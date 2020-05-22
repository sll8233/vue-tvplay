<template>
  <div class="tv-live">
    <y-t-video-player ref="slvideoplayer" />

    <tv-tab :tabArray="tvChannelA"
            @clickItemPlayer = "clickItemPlayer(arguments)"/>

<!--    <button @click="testAxios">TestAxios</button>-->

  </div>
</template>

<script>

  import TvTab from "components/content/tvTab/TvTab";
  import YTVideoPlayer from "components/common/videoPlayer/YTVideoPlayer";


  import {getChannelsA} from "network/TvRequest";

  export default {
    name: "TvLive",
    components:{
      TvTab,
      YTVideoPlayer
    },
    data() {
      return {
        active: 0,
        tvChannelA:[], //tv的channel数组
      }
    },
    methods: {

      clickItemPlayer(msg){
        // console.log(msg);
        this.$refs.slvideoplayer.setPlayerUrl(msg[0]);
        this.$refs.slvideoplayer.setPlayerPoster(msg[1]);
      },

      getChannels(){
          getChannelsA().then(res=>{
            this.tvChannelA = []
            for(var item of res.data) { // item代表数组里面的元素
              if (item.audio_only != 1)
                this.tvChannelA.push(item)
            }
            // console.log(this.tvChannelA);
          })
      }
    },
    created() {
     this.getChannels();
    },
    mounted() {

      // console.log(this.$refs.slvideoplayer.$el.offsetHeight);
    }

  }
</script>

<style scoped>
  .tv-live{
    overflow: hidden;
  }

</style>
