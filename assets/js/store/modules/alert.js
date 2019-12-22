export default {
  state: () => ({
    alert:null
  }),
  mutations:{
    setAlert (state,payload) {
      state.alert = payload;
    },
    clearAlert (state){
      state.alert = null;
    }
  },
  actions:{
    setAlert ({commit},payload){
      commit('setAlert',payload)
    },
    clearAlert ({commit}) {
      commit('clearAlert')
    }
  },
  getters:{
    alert: state => {
      return state.alert
    }
  }
}
