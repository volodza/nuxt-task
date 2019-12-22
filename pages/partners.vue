<template>
  <b-card no-body class="my-3" header-tag="header">
    <template v-slot:header>
      <h6 class="mb-0 text-center">Parthers list</h6>
    </template>

    <b-spinner v-if="partners == null" class="mx-auto my-3" variant="secondary"></b-spinner>

    <p class="text-center my-3" v-else-if="!partners.length">The list of partners is empty</p>

    <b-table v-else striped hover :items="items"></b-table>
  </b-card>
</template>

<script>
import errMessages from '../static/js/errMessages';
export default {
  name:'Partners',
  middleware:'auth',
  data() {
    return{
      partners:null
    }
  },
  methods:{
    async getPartners(){
      const token = this.$store.getters.token;  
      try {
        const partners = await this.$axios.$get('/user/personalPartners/', {
          params:{token}
        });
        this.$store.commit('setPartners', partners)
        this.partners = this.$store.getters.partners;
      } catch (err){
        const errCode = err.response.status;
        this.$store.dispatch("setAlert", {text:errMessages[errCode],type:'danger'});
      }
    },
  },
  computed:{
    items(){
      return this.partners.map(x=>{
        return {
          username: x.username,
          email: x.email,
          online: x.online ? 'Online' : 'Offline'
        }
      })
    }
  },

  mounted() {
    if(this.$store.getters.partners == null) {
      this.getPartners()
    } else {
      this.partners = this.$store.getters.partners;
    }
  }
}
</script>