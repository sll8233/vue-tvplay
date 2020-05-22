<template>
    <div class="dbinfovc">

      <van-nav-bar :title="vctitle" left-text="" class="navbar"
        left-arrow  @click-left="onClickLeft" />
      <div class="topplacehold"></div>


      <y-t-video-player ref="slvideoplayer" />
      <div class="showPlayer">
        <div class="nowtitle">{{nowtitle}}</div>
        <div class="nowtime">{{nowtime}}</div>
        <div class="line"></div>
      </div>

      <van-pull-refresh v-model="refreshing" loading-text=" "
                        @refresh="onRefresh" class="vantpull">
        <van-list
          v-model="loading" :immediate-check="true"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad" offset="1"
        >
        <ul class="infoul">
            <li v-for="(item,index) in infoArray" @click="dbClick(item)">
              <tv-d-b-info-item :infoModel = item />
            </li>
        </ul>

        </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>
  import { NavBar,PullRefresh,List } from 'vant';
  import {getDBInfoDatas} from "network/TvRequest";


  import YTVideoPlayer from "components/common/videoPlayer/YTVideoPlayer";
  import TvDBInfoItem from "./TvDBInfoItem";
  import {imgforvalue,playlerforvalue} from "common/utils";

  export default {
    name: "TvDBNewsInfo",
    data(){
      return{
        infoArray:[],
        nowtitle:"",
        nowtime:"",
        page:1, //加载页码
        loading: false,
        finished: false,
        refreshing: false,
      }
    },
    components:{
      TvDBInfoItem,
      [NavBar.name]:NavBar,
      YTVideoPlayer,
      [PullRefresh.name]:PullRefresh,
      [List.name]:List
    },
    created() {
      // this.getDatas()

    },
    methods:{
      onClickLeft(){
        this.$router.back()
      },
      // getDatas(){
      //   getDBInfoDatas(this.cid,this.page).then(res =>{
      //     this.infoArray = res.data
      //     console.log(res);
      //   })
      // },

      dbClick(item){
        // console.log(item);
        this.nowtitle = "正在播放："+ item.title
        this.nowtime = item.publish_time

        this.$refs.slvideoplayer.setPlayerUrl(playlerforvalue(item))
        // this.$refs.slvideoplayer.setPlayerUrl('http://vfile.zhyantai.com/2020/1589/3320/0637/158933200637.ssm/158933200637.m3u8')
        // this.$refs.slvideoplayer.player.play()

        this.$refs.slvideoplayer.setPlayerPoster(imgforvalue(item.indexpic))
      },

      onRefresh(){ //下拉
        console.log("onRefresh");
        this.page = 1
        // 清空列表数据
        this.infoArray = [];
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },

      onLoad(){ //上拉更多

        getDBInfoDatas(this.cid,this.page).then(res =>{
          if (res.data.length == 0){
            this.finished = true;
            return ;
          }
          this.infoArray.push.apply(this.infoArray,res.data);
          // this.infoArray = res.data
          this.page++;
          this.refreshing = false;
          this.loading = false;



          console.log(this.infoArray);
        })

      }



    },
    computed:{
      vctitle(){
        return this.$route.query["infoModel"].program_name
      },
      cid(){
        return this.$route.query["infoModel"].column_id
      },
      fristASrc(){
        return this.infoArray[0]
      }
    },
    watch:{
      fristASrc(newValue,oldValue){
        // console.log(newValue);
        this.$refs.slvideoplayer.setPlayerUrl(playlerforvalue(newValue))
        this.$refs.slvideoplayer.setPlayerPoster(imgforvalue(newValue.indexpic))
        if (this.infoArray[0]) this.nowtitle = "正在播放："+this.infoArray[0].title
        if (this.infoArray[0]) this.nowtime = this.infoArray[0].publish_time

      }
    }
  }
</script>

<style scoped>
  .dbinfovc{
    position: relative;
    height: calc(100vh - 30px);
    width: 100%;

  }
  .topplacehold{
    height: calc(44px - 30px);
  }
  .dbinfovc >>> .van-nav-bar__title{
    color:var(--color-select);
    font-size:20px;
  }
  .navbar{
    height: 44px;
    position: absolute;
    width: 100%;
    top: -30px;
  }
  .showPlayer{
    height: 60px;
    position: relative;
    /*background-color: #ff8198;*/
  }
  .nowtitle{
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding:0 10px;
  }
  .nowtime{
    line-height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding:0 10px;
    color: var(--color-gray);
    font-size: 16px;
  }
  .infoul{
    /*height: calc(100vh - 44px - 75vw - 60px );*/
    /*overflow: scroll;*/
  }
  .vantpull{
    height: calc(100vh - 44px - 75vw - 60px);
    overflow: scroll;
  }
  .line{
    width: 100%;
    height: 1px;
    background-color: var(--color-gray);
    position: absolute;
    bottom: -1px;
  }

</style>
