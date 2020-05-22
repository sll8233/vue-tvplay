<template>
  <div class="tvclass">


<!--    <div class="btn-div">-->
<!--      <van-button :icon="zbicon" type="default" class="leftBtn">直播</van-button>-->
<!--      <van-button :icon="dbicon" type="default">点播</van-button>-->
<!--    </div>-->


    <van-tabs v-model="active" line-width ="0px" title-active-color="#1baaeb"
              @change = "change">
      <van-tab  :key="0">
        <template #title>
          <div class="titlediv">
            <img :src="zbicon" ref="tvleftimg">
            <span>直播</span>
          </div>
        </template>
      </van-tab>
      <van-tab  :key="1">
        <template #title>
          <div class="titlediv">
            <img :src="dbicon" class="dianboimg" ref="tvrightimg">
            <span>点播</span>
          </div>
        </template>
      </van-tab>

    </van-tabs>


    <keep-alive>
      <router-view></router-view>
    </keep-alive>


  </div>
</template>

<script>
  import {Button, Tab, Tabs,Icon} from 'vant';

  export default {
    name: "Tv",
    data(){
      return{
        active:0,
        showactive:0
      }
    },
    components:{
      [Button.name] :Button,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [Icon.name]:Icon
    },
    computed:{
      dbicon(){
        return require("assets/img/tv/db.png")
      },
      zbicon(){
        return require("assets/img/tv/zb.png")
      },
      dbselecticon(){
        return require("assets/img/tv/db_sel.png")
      },
      zbselecticon(){
        return require("assets/img/tv/zb_sel.png")
      }
    },
    methods:{
      change(name){
        if (name == 0){
          this.$refs.tvleftimg.src = this.zbselecticon
          this.$refs.tvrightimg.src = this.dbicon
          this.$router.replace('/Tv/TvLive')
        }else if(name == 1){
          this.$refs.tvleftimg.src = this.zbicon
          this.$refs.tvrightimg.src = this.dbselecticon
          this.$router.replace('/Tv/TVDB')
        }

      }
    },
  }
</script>

<style scoped>

  .titlediv{
    width: 80px;
    height: 30px;
    top: 2px;
    position:relative;
  }
  .titlediv img{
    position: absolute;
    width: 32px;
    height: 22px;
    top: 3px;
  }
  .titlediv .dianboimg{
    width: 27px;
    height: 25px;

  }
  .titlediv span{
    position: absolute;
    height: 30px;
    top: 0;
    bottom: 0;
    line-height: 30px;
    right: 0px;
    font-size: 17px;
  }
</style>
