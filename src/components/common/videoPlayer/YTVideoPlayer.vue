<template>
  <div>
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
    />
  </div>
</template>

<script>

  export default {
    name: "YTVideoPlayer",
    data(){
      return{
        playerOptions: {

          autoplay: false, // 如果true,浏览器准备好时开始回放。

          muted: false, // 默认情况下将会消除任何音频。

          loop: false, // 导致视频一结束就重新开始。

          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）

          language: 'zh-CN',

          aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）

          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。

          sources: [{

            type: 'application/x-mpegURL', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目

            src:"",
            // src:"https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            // src:'http://stream.zhyantai.com/yttv1/sd/1588867200000,10200000.m3u8?_upt=677dee461588956446'
            // src:'https://cdn.letv-cdn.com/2018/12/05/JOCeEEUuoteFrjCg/playlist.m3u8' // url地址，从别的博主那看来的地址，亲测可用
          }],

          poster: '../../../assets/img/tv/newPlay.png', // 你的封面地址

          // width: document.documentElement.clientWidth, //播放器宽度

          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。

          controlBar: {

            timeDivider: true,

            durationDisplay: true,

            remainingTimeDisplay: false,

            fullscreenToggle: true // 全屏按钮

          }
        }
      }
    },
    methods:{
      goPlayer(){
        const player = this.$refs.videoPlayer.player
        player.play()
      },
      setPlayerUrl(url){
        this.playerOptions.sources[0].src = url
      },
      setPlayerPoster(url){
        this.playerOptions.poster = url
      },
      onPlayerPlay (player) {
        console.log('player play!', player)
      },
      onPlayerPause (player) {
        console.log('player pause!', player)
      },
      onPlayerEnded (player) {
        console.log('player ended!', player)
      },
      onPlayerLoadeddata (player) {
        console.log('player Loadeddata!', player)
      },
      onPlayerWaiting (player) {
        console.log('player Waiting!', player)
      },
      onPlayerPlaying (player) {
        console.log('player Playing!', player)
      },
      onPlayerTimeupdate (player) {
        console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay (player) {
        console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough (player) {
        console.log('player Canplaythrough!', player)
      },
      playerStateChanged (playerCurrentState) {
        console.log(playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      },
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    }
  }
</script>

<style scoped>

</style>
