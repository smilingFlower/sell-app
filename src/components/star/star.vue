<template>
		<div class="star" :class="'star' + starSize">
      <span v-for="itemClass in itemClasss" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
  const LENTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    name: 'star',
    props: {
      starScore: {
        type: Number
      },
      starSize: {
        type: Number
      }
    },
    computed: {
      itemClasss: function() {
        let result = [];
        let integer = Math.floor(this.starScore);
        let hasHalf = this.starScore % 1 !== 0;

        for (let i = 0, len = integer; i < len; i++) {
          result.push(CLS_ON);
        };

        if(hasHalf) {
          result.push(CLS_HALF);
        };

        while(result.lenth < LENTH) {
          result.push(CLS_OFF);
        };

        return result;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/mixin";

  .star{
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star24 {
      .star-item {
        width: 12px;
        height: 12px;
        background-size: 12px 12px;
        margin-right: 6px;
        &:last-child{
          margin-right: 0;
        }        
        &.on {
          @include bg-image("star24_on","png");
        }
        &.half {
          @include bg-image("star24_half","png");
        }
        &.off {
          @include bg-image("star24_off","png");
        }           
      }      
    }
    &.star36 {
      .star-item {
        width: 18px;
        height: 18px;
        background-size: 18px 18px;
        margin-right: 8px;
        &:last-child{
          margin-right: 0;
        }        
        &.on {
          @include bg-image("star36_on","png");
        }
        &.half {
          @include bg-image("star36_half","png");
        }
        &.off {
          @include bg-image("star36_off","png");
        }   
      }   
    }
    &.star48 {
      .star-item {
        width: 24px;
        height: 24px;
        background-size: 24px 24px;
        margin-right: 10px;
        &:last-child{
          margin-right: 0;
        }        
        &.on {
          @include bg-image("star48_on","png");
        }
        &.half {
          @include bg-image("star48_half","png");
        }
        &.off {
          @include bg-image("star48_off","png");
        }
      }
    }
  }
</style>

