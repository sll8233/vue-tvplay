<template>
    <div class="video-tabs">

      <van-tabs v-model="active" swipeable @change = "change"
                v-if="Object.keys(tabArray).length != 0">
        <van-tab v-for="(item,index) in tabArray" :title="item.name"
                 :key="index" >

          <van-tree-select   :height="treeHeight" @click-nav="clickTreeNav"
                             :items="showDaysItems" :main-active-index.sync="treeactive">
            <template #content>

              <div v-if="treeactive === indexx" v-for="(itemnum,indexx) in 7">
                <ul v-if="showLi" >
                  <li @click="clickItem(item)" v-for="(item,index) in result[active][treeactive]">
                    <video-list-item :tvItem="item" /></li>
                </ul>
              </div>


            </template>
          </van-tree-select>

        </van-tab>
      </van-tabs>

    </div>
</template>

<script>
  import { Tab, Tabs,TreeSelect } from 'vant';
  import {dayItems} from "common/utils";
  import {getVideoList} from "network/VideoRequest";
  import VideoListItem from "./VideoListItem";
  import TvListItem from "../../tv/childView/TvListItem";


  export default {
    name: "VideoTab",
    data(){
      return{
        active:0,
        treeactive:0,
        result:[[]],//二维数组
      }
    },
    created() {
      this.getDay()
      this.getVideoArray(13,0)
    },
    props:{
      tabArray:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      [TreeSelect.name]:TreeSelect,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      VideoListItem
    },
    methods:{
      clickItem(item){

        if(item.display == 0) return; //不能播放
        this.$emit('clickItemPlayer',item.m3u8)
      },
      change(){
        this.getVideoArray();
      },
      clickTreeNav(index){
        this.getVideoArray();
      },
      getVideoArray(channel_id = this.tabArray[this.active].id ,zone = this.currentDay){
        getVideoList(channel_id,zone).then(res =>{

          let temp = this.result[this.active]
          if(temp == undefined) temp = []
          temp[this.treeactive] = res.data
          this.$set(this.result,this.active,temp)

          console.log(this.result);

        })
      },

      getDay(){
        this.nowDay = new Date().getDay();
      }
    },
    computed:{
      showDaysItems(){
        let a = [];
        for(let value of this.dayItems) {
          a.push({"text":value})
        }
        return a;
      },
      dayItems(){
        return dayItems(this.nowDay)
      },
      treeHeight(){
        let playerH = this.getViewportSize().width*3/4;
        return this.getViewportSize().height - 30 - 44 - 44 - playerH -1;
      },
      currentDay(){
        if (this.treeactive == 0) return 0
        else if(this.treeactive == 1) return -1
        else if(this.treeactive == 2) return -2
        else if(this.treeactive == 3) return 1
        else if(this.treeactive == 4) return 2
        else if(this.treeactive == 5) return 3
        else if(this.treeactive == 6) return 4
        else return 0
      },
      showLi(){
        // console.log(this.result[this.active][this.treeactive]);
        if(this.result[this.active]&&this.result[this.active][this.treeactive])
        {
          console.log(this.result[this.active][this.treeactive]);

          if(Object.keys(this.result[this.active][this.treeactive]).length != 0)
            return true;
        }

        return false;
      },
    },

  }
</script>


<style scoped>
  .video-tabs >>>.van-tree-select__content{
    flex: 2.8;
  }
  .video-tabs >>> .van-sidebar-item--select::before{
    background-color: var(--color-select);
    height: 100%;
  }
</style>
