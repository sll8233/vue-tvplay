<template>
    <div class="tvdianbo">
      <van-tree-select height="tvdbheight" class="vantree"
                       :items="itemsTitle" :main-active-index.sync="active">
        <template #content>
          <div>
            <ul v-if="active === index" v-for="(item,index) in itemsTitle">
              <li v-for="(item,index) in allDatas[active].program" @click="dbClick(index)">
                <tv-d-b-item :itemData = item :detailText = "itemsTitle[active]" />

              </li>
            </ul>
          </div>


        </template>
      </van-tree-select>


    </div>
</template>

<script>
  import { TreeSelect } from 'vant';
  import TvDBItem from "./childView/TvDBItem";

  import {getDBDatas} from "network/TvRequest";

  export default {
    name: "TVDB",
    components:{
      [TreeSelect.name]:TreeSelect,
      TvDBItem,
    },
    data() {
      return {
        active: 0,
        allDatas:[],
        // items: [{ text: '分组 1' }, { text: '分组 2' }],
      };
    },
    created() {
      getDBDatas().then(res=>{
        this.allDatas = res.data
        // console.log(this.allDatas);
      })
    },
    computed:{
      itemsTitle(){
        const title = []
        for(let item of this.allDatas){
          if (item.audio_only != 1)
          title.push( { "text": item.channel_name })
        }
        return title;
      },
      tvdbheight(){

      }
    },
    methods:{
      dbClick(index){

        // console.log(this.allDatas[this.active].program[index]);
        this.$router.push({
          path:"/tvdbinfo",
          query:{
            "infoModel":this.allDatas[this.active].program[index]
          }
        })
      }

    }
  }
</script>

<style scoped>
  .tvdianbo{
    height: calc(100vh - 44px - 30px);
    overflow: hidden;
  }
  .vantree{
    height: 100%;
  }

  .tvdianbo >>> .van-sidebar-item--select::before{
    background-color: var(--color-select);
    height: 100%;
  }

  /*.tvdianbo >>> .van-sidebar-item__text::before{*/
  /*  content: ' 123';*/
  /*  width: 10px;*/
  /*  height: 10px;*/
  /*  background-color: red;*/
  /*}*/
</style>
