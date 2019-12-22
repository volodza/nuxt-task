import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import alert from './modules/alert';


Vue.use(Vuex);

// new Vuex.Store({
//   modules:{
//       user,alert
//   }
// })

const createStore = () => {
  return new Vuex.Store({
    modules:{
      user,alert
  }
  });
};

export default createStore

