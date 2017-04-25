<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      my is tab
    </div>
    <div class="content">
      my is content
    </div>
  </div>
</template>

<script>
  import header from "./components/header/header.vue";
  export default {
    name: 'app',
    components:{
      'v-header': header
    }
  }
</script>

<style>
.tab{
  background-color: #0f0
}
</style>
