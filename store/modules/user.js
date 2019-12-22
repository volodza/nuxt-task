//Login, registration, logout, getting partners, getting and updating user properties
export default {
  state: () => ({
    authUser: null,
    isLogged: false,
    properties: null,
    partners: null,
  }),

  getters:{
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
    }
  },

  mutations:{
    setUser (state, payload) {
      state.authUser = payload;
      state.isLogged = true;
    },
    setProperties (state,payload){
      state.properties = {
        username: payload.username,
        sponsor: payload.sponsor.username,
        email: payload.email,
        firstName: payload.firstName,
        secondName: payload.secondName,
        birthday: payload.birthday ? payload.birthday.slice(0,10) : '',
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
      state.authUser.username = payload.username;
    },
    setPartners (state, payload){
      state.partners = payload;
    },
    logout (state) {
      state.authUser = null,
      state.isLogged = false,
      state.properties = null,
      state.partners = null
    },
  },
  actions:{
// nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit ({ commit }, { req }) {
      // console.log(req.session)
      if (req.session && req.session.username && req.session.token) {
        let username = req.session.username;
        let token = req.session.token
        commit('setUser', {username,token})
        // console.log()
      }
    },

    async register({commit},form) {
      let {username} = JSON.parse(form)
      try {
        const res = await this.$axios.$post('/user',form, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        let token = res.token
        const sessionPromise = this.$axios.$post(process.env.DEV_API + '/api/login',{username,token})
        const [session] = await Promise.all([sessionPromise])
        commit('login', {username,token})
        console.log(session)
      } catch (error) {
        throw error
      }
    },

    async login({commit}, {username, password}) {
      try {
        const res = await this.$axios.$get('/auth', {
          params: {username , password}
        })
        let token = res.token
        const sessionPromise = this.$axios.$post(process.env.DEV_API + '/api/login',{username,token})
        const [session] = await Promise.all([sessionPromise])
        commit('setUser', {username,token})
        console.log(session)
      } catch (error) {
        throw error
      }
    },

    async logout ({ commit }) {
      await this.$axios.$get(process.env.DEV_API + '/api/logout').then((res) => {
        commit('logout')
        console.log(res)
      })
    },

    async getUserProps ({commit}, token){
      try {
        const props = await this.$axios.$get('/user', {
          params: { token }
        })
        commit('setProperties', props)
      } catch (error) {
        throw error
      }
    },

    async updateUserProps ({commit}, {token , items} ){
      try {
        const props = await this.$axios.$put('/user', { token, ...items })
        commit('setProperties', props)
      } catch (error) {
        throw error
      }
    },
  },
}
