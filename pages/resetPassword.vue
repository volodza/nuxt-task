<template>
    <b-card class="mt-3" header-tag="header">
      <template v-slot:header>
        <h6 class="mb-0">Reset password</h6>
      </template>
      
      <b-form @submit.prevent="onSubmit">
        <b-row>
          <b-col sm="12">
            <b-form-group 
              label="Username:"
              label-for="usernameInput"
            >
              <b-form-input 
                v-validate="'required'"
                id="usernameInput"
                v-model="form.username"
                :class="{'is-invalid': errors.has('username') }"
                type="text"
                name="username"
                placeholder="Enter username"
              />
            </b-form-group>
          </b-col>

          <b-col sm="12">
            <b-form-group 
              label="Password type for reset:"
              label-for="passwordSelect"
            >
              <b-form-select
                v-validate="'required'"
                id="passwordSelect"
                :class="{'select': true, 'error': errors.has('password type') }"
                v-model="form.type"
                :options="options"
                name="password type"/>
            </b-form-group>
          </b-col>

<!-- 
          <b-col sm="12">
            <b-form-group 
              label="Admin token:"
              label-for="tokenInput"
            >
              <b-form-input 
                id="tokenInput"
                v-model="form.token"
                :class="{'form-control': true, 'error': errors.has('New Password') }"
                type="text"
                name="Admin token"
                placeholder="Enter token"
              />
            </b-form-group>
          </b-col> -->

        </b-row>

        <b-card-text class="text-center">
          The new password will be sent by SMS to the phone specified during registration
        </b-card-text>
          
        <b-row class="d-flex justify-content-end mt-3 mr-2">
          <b-button :disabled='sending' type="submit" variant="primary">
            <b-spinner class="mx-3" v-if="sending" variant="light" small ></b-spinner>
            <span v-else>Reset</span>
          </b-button>

          <b-button @click="$router.go(-1)" variant="danger">Cancel</b-button>
        </b-row>
      </b-form>
    </b-card>
</template>

<script>
import errMessages from '../static/js/errMessages';
export default {
  name:'ResetPassword',
  data(){
    return {
      form:{
        username:'',
        token:'',
        type: '0'
      },
      options: [
        { value: '0', text: 'User password' },
        { value: '1', text: 'Financial password' },
      ],
      sending:false,
    }
  },
  methods:{
    async onSubmit() {
      this.$validator.validateAll().then(success => {
        if (success){
          this.onSend();
        } else {
          let errMsg = this.$validator.errors.items[0].msg;
          this.$store.dispatch("setAlert", {text:errMsg,type:'danger'});
        }
      }).catch(e => {
        this.$store.dispatch("setAlert", {text:e,type:'danger'});
      })
    },

    async onSend() {
      this.sending = true;
      try {
        await this.$axios.$post('/user/resetPassword',this.form)
        this.sending = false;
        this.$store.dispatch("setAlert", {text:"Password successfully reset",type:'success'});
      } catch (err) {
        this.sending = false;
        const errCode = err.response.status;
        this.$store.dispatch("setAlert", {text:errMessages[errCode],type:'danger'});
      }
    },
  }
}
</script>