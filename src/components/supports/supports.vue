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
  $supports-list: decrease, discount, special, invoice, guarantee;

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
        @for $i from 1 through length($supports-list){
          &.#{nth($supports-list, $i)}_2{
            @include bg-image('#{nth($supports-list, $i)}_2',"png");
          }
          &.#{nth($supports-list, $i)}_4{
            @include bg-image('#{nth($supports-list, $i)}_4',"png");
          }         
        }       
      }
      .information{
        font-size: 12px;
        vertical-align: middle;
      }       
    }
  }
</style>

