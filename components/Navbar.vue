<template>
  <b-nav class="nav-bar" align="right">
    <b-nav-item v-if="!isLoggedIn" to='/registration' active>Register</b-nav-item>
    <b-nav-item v-if="!isLoggedIn" to="/auth">Login</b-nav-item>

    <b-nav-item-dropdown 
      :text="username" 
      right 
      v-if="isLoggedIn"
    >
      <b-dropdown-item to="/partners">Partners</b-dropdown-item>
      <b-dropdown-item to="/settings">Settings</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item @click="logout">Logout</b-dropdown-item>
    </b-nav-item-dropdown>
  </b-nav>
</template>
<style>

</style>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLogged
    },
    username(){
      return this.$store.getters.username 
    }
  },
  methods:{
    async logout(){
      await this.$store.dispatch('logout');
      this.$router.push('/auth')
    }
  }
}
</script>

<style lang="css">
  .nav-bar{
    background-color:#fafafb;
    border-bottom:1px solid rgb(219, 219, 219);
  }
</style>
