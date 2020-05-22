<template>
    <div class="tv-tabs">

      <van-tabs v-model="active" swipeable @change = "change"
                v-if="Object.keys(tabArray).length != 0">
        <van-tab v-for="(item,index) in tabArray" :title="item.name"
                 :key="index" >

          <van-tree-select   :height="treeHeight" @click-nav="clickTreeNav"
                             :items="showDaysItems" :main-active-index.sync="treeactive">
            <template #content>

              <div v-if="treeactive === indexx" v-for="(itemnum,indexx) in 7">
                <ul v-if="showLi" >
                  <li @click="clickItem(index)" v-for="(item,index) in result[active][treeactive]">
                    <tv-list-item :tvItem = item /></li>
                </ul>
              </div>


            </template>
          </van-tree-select>

        </van-tab>
      </van-tabs>

    </div>
</template>

<script>
  import {imgforvalue} from "common/utils";
  import { Tab, Tabs,TreeSelect } from 'vant';
  import TvListItem from "views/tv/childView/TvListItem";
  import {getTvDatas} from "network/TvRequest";
  import {dayItems} from "common/utils";

  export default {
    name: "TvTab",
    components:{
      TvListItem,
      [TreeSelect.name]:TreeSelect,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs
    },
    props:{
      tabArray:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        active:0,
        result:[[]],//二维数组
        treeactive:0,
        tabsSelectArray:{0:0}, //缓存每一个tabs选择的treeindex,{0:1,1:1}形式

      }
    },
    methods:{
      change(name,title){ //监听tabs的改变

        if (typeof(this.tabsSelectArray[name]) === "undefined"){
          this.tabsSelectArray[name] = 0
          this.testAxios()
        }else{
          this.treeactive = this.tabsSelectArray[name]
        }

      },
      clickItem(index){

        if (this.result[this.active][this.treeactive]){

          if(this.result[this.active][this.treeactive][index].display == 0) return; //不能播放
          this.$emit('clickItemPlayer',this.result[this.active][this.treeactive][index].m3u8,imgforvalue(this.result[this.active][this.treeactive][index].channel_logo.rectangle))
        }

      },
      clickTreeNav(index){
        this.testAxios()

        this.tabsSelectArray[this.active] = index
      },

      testAxios(channel_id = this.tabArray[this.active].id,zone = this.currentDay) {

        getTvDatas(channel_id,zone).then(res =>{

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
    created() {
      this.getDay()
      this.testAxios(2,0)
    },
    computed:{
      showLi(){
        // console.log(this.result[this.active][this.treeactive]);
        if(this.result[this.active]&&this.result[this.active][this.treeactive]) {
          // console.log(this.result[this.active][this.treeactive]);

          if(Object.keys(this.result[this.active][this.treeactive]).length != 0)
            return true;
        }

        return false;
      },
      treeHeight(){
        let playerH = this.getViewportSize().width*3/4;
        return this.getViewportSize().height - 30 - 44 - 44 - playerH -1;
      },
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
      fristObj(){
        return this.result[0][0]
      }
    },
    watch: {
      fristObj: {
        handler(newVal, oldVal) {
          if (oldVal == undefined && newVal.length>0){
            // console.log(newVal);
           this.clickItem(0)
          }

        },
        deep: true
      }
    },


  }
</script>

<style scoped>
  .tv-tabs >>>.van-tree-select__content{
    flex: 3.5;
  }
  .tv-tabs >>> .van-sidebar-item--select::before{
    background-color: var(--color-select);
    height: 100%;
  }
</style>
