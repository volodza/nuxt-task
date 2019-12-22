<template>
  <div>
    <Navbar />
    <div class="container">
      <nuxt />
    </div>
    
    <!-- alert -->
    <div 
      class="alert alert-dismissible"
      :class="`alert-${alertMessage.type}`" 
      v-if="showAlert"
    >
      <button @click="closeAlert" type="button" aria-label="Close" class="close">×</button>
      <p class="text-center">{{ alertMessage.text }}</p>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components:{
    Navbar
  },
  data() {
    return {}
  },
  computed:{
    alertMessage () {
      return this.$store.getters.alert
    },
    showAlert (){
      return !!this.alertMessage
    }
  },
  methods: {
    closeAlert() {
      this.$store.dispatch('clearAlert')
    }
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.container{
  max-width:700px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.alert {
  position: fixed; 
  bottom: 0px;
  width: 100%; 
  margin-bottom: 0px;
}
</style>
