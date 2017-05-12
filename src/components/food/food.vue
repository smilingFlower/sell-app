<template>
  <div v-show="showFlag" class="food">

  </div>
</template>

<script>
  export default {
    name: 'food',
    data() {
      return {
        showFlag: false
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    motheds: {
      show() {
        this.showFlag = true;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .food{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
  }
</style>

