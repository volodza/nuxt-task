import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
// import alert from './modules/alert';


Vue.use(Vuex);

new Vuex.Store({
  modules:{
      user
  }
})

// export default store