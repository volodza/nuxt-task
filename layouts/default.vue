<template>
  <div>
    <Navbar />
    <div style="max-width:700px" class="container">
      <nuxt />
    </div>
    
    <!-- error alert -->
    <div 
      class="alert alert-dismissible"
      :class="`alert-${alertMessage.type}`" 
      style="position: fixed; bottom: 0px; width: 100%; margin-bottom: 0px;"
      v-if="showAlert"
    >
      <button @click="closeAlert" type="button" aria-label="Close" class="close">×</button>
      <p class="text-center">{{ alertMessage.text }}</p>
    </div>

    <!-- success alert -->
    <!-- <div 
      class="alert alert-dismissible alert-success" 
      style="position: fixed; bottom: 0px; width: 100%; margin-bottom: 0px;"
      v-if="showSuccess"
    >
      <button @click="closeSuccess" type="button" aria-label="Close" class="close">×</button>
      <p class="text-center">{{ success }}</p>
    </div> -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components:{
    Navbar
  },
  data() {
    return {
       
    }
  },
  computed:{
    // error() {
    //   return this.$store.getters.error;
    // },
    // showError(){
    //   return !!this.error
    // },
    // success() {
    //   return this.$store.getters.success;
    // },
    // showSuccess(){
    //   return !!this.success
    // }
    alertMessage () {
      return this.$store.getters.alert
    },
    showAlert (){
      return !!this.alertMessage
    }
  },
  methods: {
    // closeError() {
    //   this.$store.dispatch("clearError");
    // },
    // closeSuccess() {
    //   this.$store.dispatch("clearSuccess");
    // }
    closeAlert() {
      this.$store.dispatch('clearAlert')
    }
  },
  watch: {
    // error(val){
    //   if (val!==null) setTimeout(this.$store.dispatch('clearError'),5000)
    // }
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

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
