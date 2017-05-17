<template>
	<div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2, ratings.length, $event)" class="type positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0, positives.length, $event)" class="type positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1, negatives.length, $event)" class="type negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch border-1px" :class="{'on':onlyContent}">
      <span class="icon-add_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
	</div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    name: 'ratingselect',
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, count, event) {
        if (!event._constructed) {
          return;
        }

        this.$emit('select', {type, count});
      },
      toggleContent() {
        if (!event._constructed) {
          return;
        }

        this.$emit('toggle');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/mixin.scss";

  .ratingselect{
    .rating-type{
      font-size: 0;
      padding: 18px 0;
      margin: 0 18px;
      @include border-1px(rgba(7,17,27,0.1));
      .type{
        display: inline-block;
        width: 60px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        color: rgb(77, 85, 93);
        border-radius: 1px;
        vertical-align: bottom;
        margin-right: 8px;
        .count{
          font-size: 8px;
          vertical-align: bottom;
          padding-left: 4px;
        }
        &.active{
          color: #fff;          
        }
        &.positive{
          background-color: rgba(0,160,220,0.2);
          &.active{
            background: rgb(0, 160, 220);
          }
        }
        &.negative{
          background-color: rgba(77,85,93,0.2);
          &.active{
            background: rgb(0, 160, 220);
          }          
        }
      }
    }
    .switch{
      padding: 12px 18px;
      @include border-1px(rgba(7,17,27,0.1));
      color: rgb(147,153,159);
      line-height: 24px;
      &.on{
        .icon-add_circle{
          color: #00c850;
        }
      }
      .icon-add_circle{
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
      }
      .text{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
   }
</style>

