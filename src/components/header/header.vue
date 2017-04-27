<template>
	<div class="header">
    {{seller.name}}
	</div>
</template>

<script>
	export default {
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    }
	};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>

