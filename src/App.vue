<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="'/goods'"><div>商品</div></router-link>
      </div>
      <div class="tab-item">
        <router-link :to="'/ratings'">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="'/seller'">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import VueAxios from 'axios';

  const ERR_OK = 0;

  export default {
    name: 'app',
    data() {
      return {
        seller: {}
      };
    },
    created() {
      var _this = this;
      VueAxios.get('/api/seller')
        .then(function (response) {
          if(response.data.erron === ERR_OK) {
            _this.seller = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import 'common/sass/mixin.scss';

 #app{
  .tab{
      display: flex;
      height: 40px;
      line-height: 40px;
      @include border-1px(rgba(7,17,27,0.1));

      .tab-item{
        flex: 1;
        text-align: center;

        & > a{
          display: block;
          font-size: 14px;
          color: rgb(77,85,93);
        }

        & > a.active{
          color: rgb(240,20,20);
        }

      }
    }
 }
</style>

