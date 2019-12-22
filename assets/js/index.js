// import axios from 'axios'

export const state = () => ({
  authUser: null,
  isLogged: false,
  properties: null,
  partners: null,
  // error:null,
  // success:null,
  alert:null

})

export const getters  = {
  isLogged: state => {
    return state.isLogged
  },
  username: state => {
    return state.authUser.username
  },
  token: state => {
    return state.authUser.token
  },
  userProperties: state => {
    return state.properties
  },
  partners: state => {
    return state.partners
  },
  // error: state => {
  //   return state.error
  // },
  // success: state => {
  //   return state.success
  // },
  alert: state => {
    return state.alert
  }
}

export const mutations = {
  SET_USER (state, payload) {
    state.authUser = payload;
    state.isLogged = true;
  },
  SET_PROPERTIES (state,payload){
    state.properties = {
      username: payload.username,
      sponsor: payload.sponsor.username,
      email: payload.email,
      firstName: payload.firstName,
      secondName: payload.secondName,
      birthday: payload.birthday.slice(0,10) || '',
      phoneNumber: payload.phoneNumber,
      phoneNumber2: payload.phoneNumber2,
      skype: payload.skype,
      country: payload.country,
      state: payload.state,
      city: payload.city,
      address: payload.address,
      zipCode: payload.zipCode,
      site: payload.links.site,
      odnoklassniki: payload.links.odnoklassniki,
      vk: payload.links.vk,
      fb: payload.links.fb,
      youtube: payload.links.youtube,
      deliverySMS: payload.settings.deliverySMS,
      deliveryEmail: payload.settings.deliveryEmail,
      showName: payload.settings.showName,
      showEmail: payload.settings.showEmail,
      showMobile: payload.settings.showMobile,
      autoExtensionBS: payload.settings.autoExtensionBS
    };
    state.authUser.username = payload.username
  },
  SET_PARTNERS (state, payload){
    state.partners = payload;
  },
  LOGOUT (state) {
    state.authUser = null,
    state.isLogged = false,
    state.properties = null,
    state.partners = null
  },
  // setError(state,payload){
  //   state.error = payload
  // },
  // clearError(state){
  //     state.error = null
  // },
  // setSuccess(state,payload){
  //     state.success = payload
  // },
  // clearSuccess(state){
  //     state.success = null
  // }
  setAlert (state,payload) {
    state.alert = payload;
  },
  clearAlert (state){
    state.alert = null;
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    // console.log(req.session)
    if (req.session && req.session.username && req.session.token) {
      let username = req.session.username;
      let token = req.session.token
      commit('SET_USER', {username,token})
      // console.log()
    }
  },

  async register({commit},form) {
    let {username} = JSON.parse(form)
    try {
      const res = await this.$axios.$post('http://165.22.199.57/user',form, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      let token = res.token
      const sessionPromise = this.$axios.$post('/api/login',{username,token})
      const [session] = await Promise.all([sessionPromise])
      commit('LOGIN', {username,token})
      console.log(session)
    } catch (error) {
      throw error
    }
  },

  async login({commit}, {username, password}) {
    try {
      const res = await this.$axios.$get('http://165.22.199.57/auth', {
        params: {username , password}
      })
      let token = res.token
      const sessionPromise = this.$axios.$post('/api/login',{username,token})
      const [session] = await Promise.all([sessionPromise])
      commit('SET_USER', {username,token})
      console.log(session)
    } catch (error) {
      throw error
    }
  },

  async logout ({ commit }) {
    await this.$axios.$get('/api/logout').then((res) => {
      commit('LOGOUT')
      console.log(res)
    })
  },

  async getUserProps ({commit}, token){
    try {
      const props = await this.$axios.$get('http://165.22.199.57/user', {
        params: { token }
      })
      commit('SET_PROPERTIES', props)
    } catch (error) {
      throw error
    }
  },

  async updateUserProps ({commit}, {token , items} ){
    try {
      const props = await this.$axios.$put('http://165.22.199.57/user', { token, ...items })
      commit('SET_PROPERTIES', props)
    } catch (error) {
      throw error
    }
  },

  setAlert ({commit},payload){
    commit('setAlert',payload)
  },

  clearAlert ({commit}) {
    commit('clearAlert')
  }

}

