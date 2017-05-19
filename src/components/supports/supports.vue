<template>
  <ul class="supports">
    <li v-for="item in supports" class="item">
      <span class="icon" :class="classMap[item.type]+'_'+imgType"></span>
      <span class="information">{{item.description}}</span>
    </li>
  </ul> 
</template>

<script>

  export default {
    name: 'supports',
    data() {
      return {
        classMap: []
      };
    },
    props: {
      supports: {
        type: Array
      },
      imgType: {
        type: Number
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/mixin";

  .supports{
    .item{
      margin-bottom: 12px;
      &:last-child{
        margin-bottom: 0;
      }
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 16px;
        height: 16px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
        &.decrease_2{
          @include bg-image('decrease_2',"png");
        }
        &.discount_2{
          @include bg-image('discount_2',"png");
        }
        &.guarantee_2{
          @include bg-image('guarantee_2',"png");
        }
        &.invoice_2{
          @include bg-image('invoice_2',"png");
        }
        &.special_2{
          @include bg-image('special_2',"png");          
        }
        &.decrease_4{
          @include bg-image('decrease_4',"png");
        }
        &.discount_4{
          @include bg-image('discount_4',"png");
        }
        &.guarantee_4{
          @include bg-image('guarantee_4',"png");
        }
        &.invoice_4{
          @include bg-image('invoice_4',"png");
        }
        &.special_4{
          @include bg-image('special_4',"png");          
        }        
      }
      .information{
        font-size: 12px;
        vertical-align: center;
      }       
    }
  }
</style>

