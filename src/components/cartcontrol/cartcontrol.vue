<template>
  <div class="cartcontrol">
    <transition name="move" tag="div">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count"  v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    name: 'cartcontrol',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        };

        if (this.food.count) {
          this.food.count--;
        };
      },
      addCart(event) {
        if (!event._constructed) {
          return;
        };

        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        }else{
          this.food.count++;
        };

        this.$emit('add', event.target);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .cartcontrol{
    font-size:0;
    height: 24px;
    .cart-decrease{
      display: inline-block;
      font-size: 0;
      .inner{
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: #00a0dc;
        transition: all 0.5s linear;
        transform: rotate(0);      
      }
      &.move-enter-active, &.move-leave-active{
        transform: translate3d(0, 0, 0);
        transition: all 0.5s linear;
        opacity: 1;
      }
      &.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translate3d(20px, 0, 0);
        .inner{
          transform: rotate(180deg);
        }
      }    
    }   
    .cart-count{
      display: inline-block;
      font-size: 10px;
      min-width: 16px;
      line-height: 24px;
      text-align: center;
      color: rgb(147,153,159);
      vertical-align: top;
    }
    .cart-add{
      display: inline-block;
      font-size: 24px;
      color: #00a0dc;
    }
  }
</style>

