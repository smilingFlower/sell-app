<template>
	<div class="seller" ref="seller">
    <div class="seller-content">    
  		<div class="overview">
        <h1 class="name">{{seller.name}}</h1>
        <div class="desc border-1px">
          <div class="star-wrapper">
            <star :starSize="36" :starScore ="seller.score"></star>
          </div> 
          <span class="text">{{seller.ratingCount}}</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>元
            </div>
          </li>                
        </ul>
        <div class="favorite" @click="toggleCollect">
          <i class="icon-favorite" :class="{'active':favorite}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="supports-warpper">
        <h2 class="title">公告与活动</h2>
        <p class="bulletin border-1px">{{seller.bulletin}}</p>
        <div class="supports-list" v-if="seller.supports">
          <supports :supports="seller.supports" :imgType="4"></supports>
        </div>
      </div>
      <split></split>
      <div class="pics">
        <h2 class="title">商家实景</h2>
        <div class="pics-warpper" ref="picsWarpper">
          <ul class="pics-list" ref="picsList">
            <li class="pics-item" v-for="pic in seller.pics">
              <img  :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <div class="info">
        <h2 class="title border-1px">商家信息</h2>
        <p class="info-item border-1px" v-for="info in seller.infos">{{info}}</p>
      </div>
    </div>
	</div>
</template>

<script>
  import BScroll from 'better-scroll';
  import star from '../star/star';
  import supports from '../supports/supports';
  import split from '../split/split';
  import {saveToLocal, loadFormLocal} from '../../common/js/store';

  export default {
    name: 'seller',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFormLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    created() {
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '未收藏';
      }
    },
    components: {
      star,
      supports,
      split
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        }else{
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picsList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picsWarpper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            }else{
              console.log('aaaaaa');
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleCollect() {
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/mixin.scss";
  .seller{  
    position: absolute;
    left: 0;
    right: 0;
    top: 177px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .seller-content{
      .overview{
        position: relative;
        padding: 18px 18px 0;
        .name{
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 1;
        }
        .desc{
          @include border-1px(rgba(7,17,27,0.1));
          margin-top: 8px;
          padding-bottom: 18px;
          .star-wrapper{
            display: inline-block;
            vertical-align: top;
            margin-right: 8px;
          }
          .text{
            display: inline-block;
            vertical-align: top;
            margin-right: 12px;
            font-size: 10px;
            color: rgb(77,85,93);
            line-height: 36px;
          }
        }
        .favorite{
          position: absolute;
          top: 22px;
          right: 18px;
          width: 50px;
          text-align: center;
          .icon-favorite{
            display: inline-block;
            font-size: 24px;
            color: rgb(77,85,93);
            &.active{
              color: rgb(240,20,20);
            }
          }
          .text{
            display: inline-block;
            padding-top: 4px;
            font-size: 10px;
            color: rgb(77,85,93);
            line-height: 1;
          }
        }
        .remark{
          display: flex;
          padding-top: 18px;
          padding-bottom: 18px;
          .block{
            flex: 1;
            text-align: center;
            border-right: 1px solid rgba(7,17,27,0.1); 
            &.last-child{
              border: none; 
            }
            h2{
              font-size: 10px;
              line-height: 1;
              color: rgb(147,153,159);
              margin-bottom: 4px;
            }
            .content{
             font-size: 10px; 
             line-height: 24px;
             color: rgb(7,17,27);
             .stress{
              font-size: 24px;
              margin-right: 2px;
             }
            }
          }
        }
      }
      .supports-warpper{
        padding: 18px;
        .title{
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 1;
          margin-bottom: 8px;        
        }
        .bulletin{
          font-size: 12px;
          color: rgb(240,20,20);
          line-height: 24px;
          padding: 0 12px 16px 12px;
          @include border-1px(rgba(7,17,27,0.1));
        }
        .supports-list{
          padding: 16px 12px 0 12px;
        }
      }
      .pics{
        padding: 18px;
        .title{
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 1;
          margin-bottom: 12px;  
        }
        .pics-warpper{
          width: 100%;
          overflow: hidden;     
          white-space: nowrap;
          .pics-list{
            font-size: 0;
            .pics-item{
              display: inline-block;
              width: 120px;
              height: 90px;
              margin-right: 6px;
              &.last-child{
                margin-right: 0;
              }          
            }
          }
        }
      }
      .info{
        padding: 18px;
        .title{
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 1;
          padding-bottom: 12px;
          @include border-1px(rgba(7,17,27,0.1));
        } 
        .info-item{
          padding: 16px 12px;
          font-size: 12px;
          color: rgb(7,17,27);
          line-height: 16px;
          @include border-1px(rgba(7,17,27,0.1));
        }       
      }
    }
  }
</style>

