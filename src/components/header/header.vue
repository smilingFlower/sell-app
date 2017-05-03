<template>
	<div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟到达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="information">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="showDetail">
        {{seller.supports.length}}个
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :starSize="48" :starScore ="seller.score"></star>
          </div>
          <div class="title">
            
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close"></i>
      </div>
    </div>
	</div>
</template>

<script>
  import star from '../star/star.vue';

  export default {
    name: 'header',
    data() {
      return {
        classMap: [],
        detailShow: false
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      showDetail() {
        this.detailShow = !this.detailShow;
      }
    },
    components: {
      star
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/mixin";

  .header {
    position: relative;
    overflow:hidden;
    background-color:rgba(0,0,0,0.5);
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      .avatar{
        display: inline-block;
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        color: #fff;        
        .title {
          .brand {
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            @include bg-image("brand","png");
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name{
            font-size: 16px;
            padding-left: 6px;
          }
        }
        .description{
          font-size: 12px;
          padding-top: 8px;
          padding-bottom: 10px;
        }
        .supports{
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease{
              @include bg-image('decrease_1',"png");
            }
            &.discount{
              @include bg-image('discount_1',"png");
            }
            &.guarantee{
              @include bg-image('guarantee_1',"png");
            }
            &.invoice{
              @include bg-image('invoice_1',"png");
            }
            &.special{
              @include bg-image('special_1',"png");          
            }
          }
          .information{
            font-size: 10px;
            vertical-align: top;
          }       
        }
      }
      .supports-count{
        position: absolute;
        right: 12px;
        bottom: 14px;
        height: 24px;
        padding-left: 10px;
        padding-right: 8px;
        line-height: 24px;
        font-size:10px;
        color: #fff;
        border-radius: 14px;
        background-color: rgba(0,0,0,0.2);
      }
    }
    .bulletin-wrapper{
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7, 17, 27, 0.2);
      color: #fff;
      .bulletin-icon{
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        width: 22px;
        height: 12px;
        @include bg-image("bulletin","png");
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text{
        vertical-align: top;
        margin: 0 6px 0 0;
        font-size: 10px;
      }
      &>.icon-keyboard_arrow_right{
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .background{
      position: absolute;
      width:100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      filter:blur(10px);
    }
    .detail{
      position: fixed;
      z-index: 100;
      top: 0;
      left:0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color:rgba(7,17,27,0.8);
      .detail-wrapper{
        width: 100%;
        min-height: 100%;
        .detail-main{
          padding-top: 64px;
          padding-bottom: 64px;
          color: #fff;
          .name{
            text-align: center;
            font-size:16px;
            font-weight: 700px;
          }
          .star-wrapper{
            margin-top: 16px;
            text-align: center;
          }
          .title{
          }
        }
      }
      .detail-close{
        font-size: 32px;
        line-height: 64px;
        margin-top: -64px;
        text-align: center;
        color: rgba(255,255,255,0.5);
      }
    }
  }  
</style>

