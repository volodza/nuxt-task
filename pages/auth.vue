<template>
  <b-card class="mt-3" header-tag="header">
    <template v-slot:header>
      <h6 class="mb-0">Auth</h6>
    </template>

    <b-form @submit.prevent="onSubmit">
      <b-row>
        <b-col sm="12">
          <b-form-group 
            label="Username:"
            label-for="usernameInput"
          >
            <b-form-input 
              v-validate="{required:true}"
              id="usernameInput"
              :class="{'is-invalid': errors.has('username') }"
              v-model="form.username"
              type="text"
              name="username"
              placeholder="Enter username"
            />
          </b-form-group>
        </b-col>

        <b-col sm="12">
          <b-form-group 
            label="Password:"
            label-for="passwordInput"
          >
            <b-form-input 
              v-validate="{required:false}"
              id="passwordInput"
              v-model="form.password"
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="d-flex justify-content-end mr-2">
        <b-button :disabled='sending' type="submit" variant="primary">
          <b-spinner class="mx-3" v-if="sending" variant="light" small ></b-spinner>
          <span v-else>Login</span>
        </b-button>

        <b-button to="/resetpassword" variant="link">Reset password</b-button>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import errMessages from '../static/js/errMessages';
export default {
  name:'Auth',
  data() {
    return {
      form:{
        username:'volodza',
        password:'12345678'
      },
      sending:false
    }
  },
  methods:{
    async onSubmit() {
      this.$validator.validateAll().then(success => {
        if (success){
          this.onSend();
        } else {
          let errMsg = this.$validator.errors.items[0].msg;
          this.$store.dispatch("setAlert", {text:errMsg, type:'danger'});
        }
      }).catch(e => {
       this.$store.dispatch("setAlert", {text:e, type:'danger'});
      })
    },
    async onSend() {
      this.sending = true;
      try {
        await this.$store.dispatch('login', this.form);
        this.sending = false;
        this.$router.push('/');
      } catch (err) {
        this.sending = false;
        const errCode = err.response.status;
        this.$store.dispatch("setAlert", {text:errMessages[errCode],type:'danger'});
      }
    },
  },
}
</script>

<style>

</style>