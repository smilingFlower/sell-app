<template>
	<div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
     <ul>
       <li v-for="(item, index) in goods" ref="menuItem" class="menu-item border-1px" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
         <span v-show="item.type > -1" class="icon" :class="classMap[item.type]"></span><span class="name">{{item.name}}</span>
       </li>
     </ul>
    </div> 
    <div class="goods-wrapper"  ref="foodsWrapper">
     <ul>
       <li v-for="item in goods" class="food-list" ref="foodList">
         <h2 class="title">{{item.name}}</h2>
         <ul>
           <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
             <div class="icon">
               <img :src="food.icon" width="58" height="58">
             </div>
             <div class="infomation">
               <h3 class="name">{{food.name}}</h3>
               <p class="description" v-if="food.description">{{food.description}}</p>
               <div class="extra">
                 <span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
               </div>
               <div class="price">
                 <span class="now-price">￥{{food.price}}</span>
                 <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
               </div>
               <div class="cartcontrol-warpper">
                 <cartcontrol @add="addFood" :food='food'></cartcontrol>
               </div>
             </div>
           </li>
         </ul>
       </li>
     </ul>
    </div> 
    <shopcart ref="shopcart" :selectFoods="selectFoods" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></shopcart>
    <food ref="food" :food="selectedFood"></food>
  </div>
</template>

<script>
  import VueAxios from 'axios';
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import food from '../food/food';

  const ERR_OK = 0;

  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        classMap: [],
        listHeight: [],
        listMenuHeight: [],
        scrollY: 0,
        scrollMenuY: 0,
        selectedFood: {}
      };
    },
    components: {
      shopcart,
      cartcontrol,
      food
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if(!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((value) => {
          value.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      var _this = this;
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      VueAxios.get('/api/goods')
        .then(function(response) {
          if(response.data.erron === ERR_OK) {
            _this.goods = response.data.data;
            _this.$nextTick(() => {
              _this._initScroll();
              _this._calculateHeight();
              _this._calculateMenuHeight();
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    methods: {
      _initScroll() {
        var _this = this;

        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });

        this.menuScroll.on('scroll', (pos) => {
          _this.scrollMenuY = Math.abs(Math.round(pos.y));
        });

        this.foodsScroll.on('scroll', (pos) => {
          _this.scrollY = Math.abs(Math.round(pos.y));
          let menuWrapperHeight = this.$refs.menuWrapper.clientHeight;
          if (menuWrapperHeight <= _this.scrollY) {
            this.scrollMeun(this.currentIndex);
          }
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0, len = foodList.length; i < len; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      _calculateMenuHeight() {
        let menuItem = this.$refs.menuItem;
        let height = 0;
        this.listMenuHeight.push(height);
        for (let i = 0, len = menuItem.length; i < len; i++) {
          height += menuItem[i].clientHeight;
          this.listMenuHeight.push(height);
        }
      },
      selectMenu(index, event) {
        // 在pc端点击触发两次  因为pc端better-scroll没有阻原生默认的事件 原生默认的事伯中没有_constructed这个属性
        if (!event._constructed) {
          return;
        }

        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      scrollMeun(index) {
        let menuItem = this.$refs.menuItem;
        let el = menuItem[index];
        this.menuScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      addFood(target) {
        this._dorp(target);
      },
      _dorp(target) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/mixin";
 
  .goods{
    display: flex;
    position: absolute;
    top: 177px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      .menu-item{ 
        width: 56px;
        padding: 14px 12px;
        @include border-1px(rgba(7,17,27,0.1));
        &.current{
          background-color: #fff;
          @include border-none();
        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease{
            @include bg-image('decrease_3',"png");
          }
          &.discount{
            @include bg-image('discount_3',"png");
          }
          &.guarantee{
            @include bg-image('guarantee_3',"png");
          }
          &.invoice{
            @include bg-image('invoice_3',"png");
          }
          &.special{
            @include bg-image('special_3',"png");          
          }
        }
        .name{
          vertical-align: top;
          font-size: 14px;
          color: #07111b;
          line-height: 14px;
        }
      }
    }
    .goods-wrapper{
      flex: 1;
      .food-list{
        .title{
          font-size: 12px;
          color: rgb(147,153,159);
          line-height: 26px;
          background-color: #f3f5f7;
          border-left: 2px solid #d9dde1;
          padding-left: 12px;
        }
        .food-item{
          display: flex;
          padding: 18px;
          &:last-child{
            @include border-none();
          }
          @include border-1px(rgba(7,17,27,0.1));
          .icon{
            flex: 0 0 58px;
            width: 58px;
            height: 58px;
          }
          .infomation{
            position: relative;
            flex: 1;
            padding-left: 10px;
            .name{
              font-size: 14px;
              line-height: 14px;
              padding-top: 2px;
              padding-bottom: 4px;
            }
            .description,.extra{
              font-size: 10px;
              color: rgb(147,153,159);
              line-height: 18px;
            }
            .extra{
              .sellCount{
                padding-right: 12px;
              }
            }
            .price{
              padding-top: 4px;
              .now-price{
                font-size: 14px;
                color: rgb(240,20,20);
                font-weight: 700;
                vertical-align: top;
              }
              .old-price{
                font-size: 10px;
                color: rgb(147,153,159);
                font-weight: 700;
                vertical-align: top;
                text-decoration: line-through;
              }
            }
            .cartcontrol-warpper{
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }
</style>

