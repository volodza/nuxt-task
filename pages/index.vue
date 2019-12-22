<template>
  <div class="main">
    <logo/>
    <h1 class="title">
        NUXT JS
    </h1>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  components:{
    Logo
  }
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.main {
  margin: 0 auto;
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
