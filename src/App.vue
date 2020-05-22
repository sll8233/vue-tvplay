<template>
  <div id="app">

    <van-tabs type="card" @click="onClick" class="tv-tabs">
      <van-tab title="看电视"></van-tab>
      <van-tab title="听广播"></van-tab>
    </van-tabs>


    <router-view/>
  </div>
</template>

<script>
  import { Tab, Tabs } from 'vant';
  export default {
    name: "App",
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
    },
    methods:{
      onClick(index, title){
        console.log(index);
        if (index == 0)
          this.$router.replace('/Tv')
        else if (index == 1)
          this.$router.replace('/Video')
      }
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>

<style scoped>

  .tv-tabs  >>> .van-tabs__nav--card{
    border-radius: 15px 15px 15px 15px;
    border-color: var(--color-select);
    margin: 0 18%;
    overflow: hidden;
  }

  .tv-tabs  >>>  .van-tab.van-tab--active{
    background-color:var(--color-select);
  }
  .tv-tabs  >>> .van-tabs__nav--card .van-tab{
    border-color: var(--color-select);
  }
  .tv-tabs  >>> .van-tabs__nav--card .van-tab{
    color: var(--color-select);
  }
  .tv-tabs  >>> .van-tabs__nav--card .van-tab.van-tab--active{
    color: white;
  }
</style>
