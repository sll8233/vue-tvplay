<template>
  <div class="line"></div>
</template>

<script>
  export default {
    name: "grayLine"
  }
</script>

<style scoped>
  .line{
    width: 100%;
    height: 1px;
    background-color: var(--color-gray);
    position: absolute;
    bottom: -1px;
  }
</style>
