<template>
    <div class="tvdbitem">
      <img :src="itemData.logo" alt="">
      <span class="title fontWeight">{{itemData.program_name}}</span>
      <span class="content">{{detailText.text}}</span>
    </div>
</template>

<script>
  export default {
    name: "TvDBItem",
    props:{
      itemData:{
        type:Object,
        default(){
          return {}
        }
      },
      detailText:{
        type:Object,
        default() {
          return undefined;
        }
      }
    }
  }
</script>

<style scoped>
  img{
    height: 45px;
    width: 45px;
    position: absolute;
    top:10px;
    left: 20px;
  }
  .tvdbitem{
    height: 65px;
    position: relative;
  }
  .tvdbitem .title{
    font-size: 16px;
    position: absolute;
    top: 10px;
    left: 80px;
  }
  .tvdbitem .content{
    font-size: 14px;
    position: absolute;
    top: 38px;
    left: 80px;
    color: var(--color-gray);
  }
</style>
