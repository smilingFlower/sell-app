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
       <div class="rating-list">
         <ul v-show="food.ratings && food.ratings.length">
           <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
             <div class="user">
               <span class="name">{{rating.username}}</span>
               <img class="avatar" :src="rating.avatar" width="12" height="12">
             </div>
             <div class="time">{{rating.rateTime | formatData}}</div>
             <p class="info">
               <span :class="{'icon-thumb_down':rating.rateType === 1,'icon-thumb_up':rating.rateType === 0}"></span>{{rating.text}}
             </p>
           </li>
         </ul>
         <div v-show="!food.ratings || !food.ratings.length || showRating" class="no-rating">
           暂无评价
         </div>
       </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import {formatData} from '../../common/js/data';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import split from '../split/split';
  import ratingselect from '../ratingselect/ratingselect';

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
        },
        showRating: false  // 是否有评论
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
      selectRating(arg) {
        this.selectType = arg.type;

        if (this.selectType === arg.type && arg.count === 0) {
          this.showRating = true;
        }else{
          this.showRating = false;
        }

        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;

        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent === true && text === '') {
          return false;
        }

        if (this.selectType === ALL) {
          return true;
        }else{
          return type === this.selectType;
        }
      }
    },
    filters: {
      formatData(time) {
        let date = new Date(time);
        return formatData(date, 'yyyy-MM-dd hh:mm');
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
  @import "../../common/sass/mixin";

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
        padding-top: 18px;
        .title{
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,27,37);
          line-height: 14px;
          padding-left: 18px;
        }
      }
      .rating-list{
        padding: 0 18px;
        .rating-item{
          position: relative;
          padding: 18px 0;
          @include border-1px(rgba(7,17,27,0.1));
          .time{
            font-size: 10px;
            line-height: 10px;
            color:rgb(147,153,159);
          }
          .info{
            font-size: 12px;
            color: rgb(7,17,27);
            padding-top: 10px;
            .icon-thumb_down,.icon-thumb_up{
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              margin-right: 4px;
            }
            .icon-thumb_down{
              color:rgb(147,153,159);
            }
            .icon-thumb_up{
              color:rgb(0,160,220);
            }
          }
          .user{
            position: absolute;
            right: 0;
            top: 18px;
            .name{
              display:inline-block;
              vertical-align: top;
              color:rgb(147,153,159);
              font-size: 12px;
            }
            .avatar{
              display:inline-block;
              vertical-align: top;
              border-radius: 50%;
            }
          }
        }
        .no-rating{
          padding: 20px 0;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
</style>

