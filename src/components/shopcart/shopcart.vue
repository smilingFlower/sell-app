<template>
  <div>
		<div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <!-- 购货车图标 -->
          <div class="logo-warpper">
            <div class="logo" :class="{'high-light':payCount}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-if="payCount">{{payCount}}</div>
          </div>
          <div class="right">
            <div class="price" :class="{'high-light':totalAmount !== 0}">
              ￥ {{totalAmount}}
            </div>
            <!-- 描述 -->
            <div class="description">
              另需配送费￥{{deliveryPrice}}元
            </div>
          </div>
          <!-- 价格 -->
        </div>
        <div class="content-right">
          <div class="pay" @click.stop="pay" :class="{'enough':totalAmount >= minPrice}">
            {{payDecs}}
          </div>
        </div>
      </div>  
      <div class="ball-contianer">
          <div v-for="ball in balls">
            <transition name="drop" tag="div" v-on:before-enter="beforeDrop" v-on:enter="enterDrop" v-on:after-enter="afterDrop">
              <div v-show="ball.show" class="ball">
                <span class="inner inner-hook"></span>
              </div>
            </transition>
          </div>
      </div>
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header border-1px">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food border-1px" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol  @add="addFood" :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol';

  export default {
    name: 'shopcart',
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 20,
              count: 1
            }
          ];
        }
      },
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      }
    },
    components: {
      cartcontrol
    },
    computed: {
      totalAmount() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      payCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDecs() {
        if (this.totalAmount === 0) {
          return '￥' + this.minPrice + '元起送';
        }else if(this.totalAmount < this.minPrice) {
          let diff = this.minPrice - this.totalAmount;
          return '还差' + diff + '元起送';
        }else{
          return '结算';
        }
      },
      listShow() {
        console.log(this.totalAmount);
        if (!this.totalAmount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            }else{
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop(el) {
        var _this = this;

        for (let i = 0; i < _this.balls.length; i++) {
          let item = _this.balls[i];

          if (!item.show) {
            item.show = true;
            item.el = el;
            _this.dropBalls.push(item);
            return;
          }
        };
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while(count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);

            el.style.display = '';
            el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
            el.style.transform = 'translate3d(0,' + y + 'px,0)';

            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
            inner.style.transform = 'translate3d(' + x + 'px,0,0)';
          }
        }
      },
      enterDrop(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;

        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';

          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalAmount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      addFood(target) {
        this.drop(target);
      },
      pay() {
        if (this.totalAmount < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalAmount}元`);
      },
      hideList() {
        this.fold = true;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/mixin.scss";

  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
      height:100%;
      display: flex;
      .content-left{
        display:flex;
        flex: 1;
        background-color: #141d27;
        font-size: 0;
        .logo-warpper{
          position: relative;
          flex: 0 0 58px;
          display:inline-block;
          box-sizing: border-box;
          width: 58px;
          height: 58px;
          margin-left: 12px;
          margin-top: -10px;
          margin-right: 12px;
          padding: 6px;
          border-radius: 100%;
          background-color: #141d27;
          .logo{
            border-radius: 100%;
            background-color: #2b343c;
            text-align: center;
            color: rgba(255,255,255,0.4);
            .icon-shopping_cart{
              font-size: 20px;
              line-height: 48px;
            }
            &.high-light{
              background-color:#00a0dc;
              color: #fff;
            }            
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            color: #fff;
            font-size: 10px;
            text-align: center;
            line-height: 16px;
            background-color: #f01414;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            border-radius: 6px;
          }
        }
        .right{
          flex: 1;
          .price{
            display: inline-block;
            font-size: 16px;
            color: rgba(255,255,255,0.4);
            font-weight: 700;
            padding-top: 8px;
            padding-bottom: 4px;
            &.high-light{
              color: #fff;
            }
          }
          .description{
            font-size: 12px;
            color: rgba(255,255,255,0.4);
          }          
        }
      }
      .content-right{
        flex: 0 0 105px;
        .pay{
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          line-height: 48px;
          background-color: #2b333b;
          &.enough{
            background-color: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-contianer{
      .ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
    .shopcart-list{
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      background-color: #fff;
      .list-header{
        height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        line-height: 40px;
        @include border-1px(rgba(7,17,27,0.1));
        .title{
          float: left;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .empty{
          float: right;
          font-size: 12px;
          color: rgb(0,160,220);
        }
      }
      .list-content{
        box-sizing:border-box;
        max-height: 220px;
        padding:0 18px;
        overflow: hidden;
        background: #fff;
        ul{
          padding-bottom: 48px;
        }
        .food{
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          @include border-1px(rgba(7,17,27,0.1));
          .name{
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price{
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    background-color: rgba(7,17,27,0.6);
    &.fade-enter-active,&.fade-leave-active{
      opacity: 1;
      transition: all 0.5s;
    }
    &.fade-enter,&.fade-leave-active{
      opacity: 0;
    }
  }
</style>

