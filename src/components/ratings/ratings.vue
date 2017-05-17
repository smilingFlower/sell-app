<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">
            {{seller.score}}
          </h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家69.2%</div>
        </div><!-- overview-left end-->
        <div class="overview-right">
          <div class="block">
            <span class="title">
              服务评分
            </span>
            <div class="star-wrapper">
              <star :starSize="36" :starScore ="seller.serviceScore"></star>
            </div> 
            <span class="score">{{seller.serviceScore}}</span>           
          </div>
          <div class="block">
            <span class="title">
              商品评分
            </span>
            <div class="star-wrapper">
              <star :starSize="36" :starScore ="seller.foodScore"></star>
            </div> 
            <span class="score">{{seller.foodScore}}</span>           
          </div>
          <div class="block">
            <span class="title">
              送达时间
            </span>
            <span class="deliveryTime">
              {{seller.deliveryTime}}分钟
            </span>
          </div>                    
        </div>  <!-- overview-right end-->
      </div>
      <split></split>
      <div class="rating-select">
        <ratingselect :ratings="ratingsArr" @toggle="toggleContent" @select="selectRating" :selectType="selectType" :onlyContent="onlyContent"></ratingselect>
      </div>
      <div class="rating-list">
       <ul v-show="ratingsArr.length">
         <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratingsArr" class="rating-item border-1px">
          <img class="avatar" :src="rating.avatar" width="28" height="28">
          <div class="name">{{rating.username}}</div>
          <div class="time">{{rating.rateTime | formatData}}</div>  
          <div class="block">
            <div class="star-wrapper">
              <star :starSize="24" :starScore ="seller.serviceScore"></star>
            </div> 
            <span class="deliveryTime">{{seller.deliveryTime}}分钟送达</span>
          </div>
          <p class="info">{{rating.text}}</p>      
          <div class="recommend-warpper" v-show="rating.recommend && rating.recommend.length">
            <span :class="{'icon-thumb_down':rating.rateType === 1,'icon-thumb_up':rating.rateType === 0}"></span>
            <span class="recommend-item" v-for="item in rating.recommend">{{item}}
            </span>
          </div>
         </li>
       </ul>      
       <div v-show="!ratingsArr.length || showRating" class="no-rating">
         暂无评价
       </div>      
      </div>   
    </div>
	</div>
</template>

<script>
 import VueAxios from 'axios';
 import BScroll from 'better-scroll';
 import star from '../star/star';
 import ratingselect from '../ratingselect/ratingselect';
 import split from '../split/split';
 import {formatData} from '../../common/js/data';

  const ERR_OK = 0;
  const ALL = 2;

  export default {
    name: 'ratings',
    data() {
      return {
        selectType: ALL,
        onlyContent: true,
        showRating: false,
        ratingsArr: []
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      var _this = this;

      VueAxios.get('api/ratings')
        .then((response) => {
          if(response.data.erron === ERR_OK) {
            _this.ratingsArr = response.data.data;

            _this.$nextTick(() => {
              _this._initScroll();
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filters: {
      formatData(time) {
        let date = new Date(time);
        return formatData(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      ratingselect,
      split
    },
    methods: {
      _initScroll() {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;

        this.$nextTick(() => {
          this.scroll.refresh();
        });
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
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/sass/mixin';

  .ratings{
    position: absolute;
    left: 0;
    right: 0;
    top: 177px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .ratings-content{
      .overview{
        display: flex;
        padding: 18px 0;
        .overview-left{
          flex: 0 0 138px;
          width: 138px;
          @media only screen and (max-width:320px){
            flex: 0 0 110px;
            width: 110px;
          };
          border-right: 1px solid rgba(7,17,27,0.1);
          text-align: center;
          padding: 6px 0;
          .score{
            font-size: 24px;
            line-height: 28px;
            color: rgb(255,153,0);
            margin-bottom: 6px;
          }
          .title{
            font-size: 12px;
            color: rgb(7,17,27);
            line-height: 12px;
            margin-bottom: 8px;
          }
          .rank{
            color: rgb(147,153,159);
            font-size: 10px;
            line-height: 20px;
          }
        }
        .overview-right{
          flex: 1;
          padding: 6px 0 6px 12px; 
          @media only screen and (max-width:320px){
            padding-left: 6px;
          };          
          .block{
            margin-bottom: 8px;
            font-size: 0;
            .title{
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              line-height: 18px;
              color: rgb(7,17,27);    
              margin-right: 12px;
              @media only screen and (max-width:320px){
                margin-right: 6px;
              };                                     
            }
            .star-wrapper{
              display: inline-block;
              vertical-align: top;
              margin-right: 12px;
              @media only screen and (max-width:320px){
                margin-right: 6px;
              };                                 
            }
            .score{
              display: inline-block;
              vertical-align: top;
              line-height: 18px;
              font-size: 12px;
              color: rgb(255,153,0);
            }
            .deliveryTime{
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              line-height: 18px;
              color: rgb(147,153,159);
            }
          }
        }
      }
      .rating-list{
        padding: 0 18px;
        .rating-item{
          position: relative;
          padding: 18px 0 18px 40px;
          @include border-1px(rgba(7,17,27,0.1));
          .time{
            position: absolute;
            top: 18px;
            right: 0;
            font-size: 10px;
            line-height: 10px;
            color:rgb(147,153,159);
          }
          .block{
            margin-bottom: 4px;
            font-size: 0;
            .star-wrapper{
              display: inline-block;
              vertical-align: top;
              margin-right: 6px;                                
            }
            .deliveryTime{
              display: inline-block;
              vertical-align: top;
              font-size: 10px;
              line-height: 12px;
              color: rgb(147,153,159);
            }
          }          
          .info{
            padding-top: 6px;
            font-size: 12px;
            color: rgb(7,17,27);
            line-height: 18px;
          }
          .recommend-warpper{
            padding-top: 8px;
            .icon-thumb_down,.icon-thumb_up,.recommend-item{
              margin-right: 4px;
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;        
            }
            .icon-thumb_down{
              color:rgb(147,153,159);
            }
            .icon-thumb_up{
              color:rgb(0,160,220);
            }
            .recommend-item{
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
          }
          .name{
            font-size: 10px;
            color: rgb(7,17,27);
            line-height: 12px;
            margin-bottom: 4px;
          }
          .avatar{
            position: absolute;
            top: 18px;
            left: 0;
            border-radius: 50%;
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
