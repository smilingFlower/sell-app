<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" width="100%">
          <div class="back" @click.stop.prevent="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="name">{{food.name}}</h1>
          <div class="detail">
           <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
         </div>
         <div class="price">
           <span class="now-price">￥{{food.price}}</span>
           <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
         </div>
         <div class="cartcontrol-warpper">
           <cartcontrol :food='food'></cartcontrol>
         </div>
         <transition name="fade">
           <div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
         </transition>         
        </div> <!-- content end -->
       <split v-show="food.info"></split>
       <div class="food-info" v-show="food.info">
          <h2 class="title">商品信息</h2>
          <p class="text">{{food.info}}</p>         
       </div>
       <split></split>
       <div class="rating">
          <h2 class="title">商品评价</h2>
          <ratingselect :ratings="food.ratings" @toggle="toggleContent" @select="selectRating" :selectType="selectType" :onlyContent="onlyContent" :desc="desc
          " ></ratingselect>
       </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import split from '../split/split';
  import ratingselect from '../ratingselect/ratingselect';

  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;

  export default {
    name: 'food',
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐嘈'
        }
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show() {
        this.showFlag = !this.showFlag;
        this.selectType = ALL;
        this.onlyContent = true;

        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          }else{
            this.scroll.refresh();
          }
        });
      },
      back() {
        this.showFlag = !this.showFlag;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }

        Vue.set(this.food, 'count', 1);
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
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
    &.move-enter-active,&.move-leave-active{
      transition: all 0.5s;
      transform: translate3d(0, 0, 0);
    }
    &.move-enter,&.move-leave-active{
      transform: translate3d(100%,0,0);
    }    
    .food-content{
      .image-header{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
         img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
         }
        .back{
          position: absolute;
          left: 6px;
          top: 12px;
          padding: 6px;
          .icon-arrow_lift{
            font-size: 24px;
            color: #fff;
          }
        }
      }
      .content{
        position: relative;
        padding: 18px;
        .name{
          font-size: 14px;
          line-height: 14px;
          color: rgb(7,17,27);
          font-weight: 700;
          margin-bottom: 8px;
        }
        .detail{
          font-size: 0;
          line-height: 10px;
          height: 10px;
          margin-bottom: 18px;
          .sell-count,.rating{
            font-size: 10px;
            color: rgb(147,153,159);
            margin-right: 12px;
          }
        }
        .price{
          font-weight: 700;
          line-height: 24px;
          .now-price{
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old-price{
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
      .cartcontrol-warpper{
        position: absolute;
        right: 18px;
        bottom: 18px;
      }
      .buy{
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 12px;
        font-size: 10px;
        color: #fff;
        background-color: rgb(0,160,220);
        &.fade-enter-active,&.fade-leave-acitve{
          transition: all 0.5s;
          opacity: 1;
        }
        &.fade-enter,&.fade-leave-acitve{
          opacity: 0;
        }
      }
      .food-info{
        padding: 18px;
        .title{
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,27,37);
          line-height: 14px;
          padding-bottom: 12px;
        }
        .text{
          font-size: 12px;
          color: rgb(77,85,93);
          line-height: 24px;
        }
      }
      .rating{
        .title{
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,27,37);
          line-height: 14px;
          padding-left: 18px;
        }
      }
    }
  }
</style>

