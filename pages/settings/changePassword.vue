<template>
  <b-card class="my-3" header-tag="header">
    <template v-slot:header>
      <h6 class="mb-0 text-center">Change password</h6>
    </template>

    <b-form @submit.prevent="onSubmit">
      <b-row>
        <b-col sm="12">
          <b-form-group 
            label="Old Password:"
            label-for="oldPasswordInput"
          >
            <b-form-input 
              v-validate="'required'"
              id="oldPasswordInput"
              v-model="form.oldPassword"
              :class="{'form-control': true, 'error': errors.has('Old Password') }"
              type="password"
              name="Old Password"
              placeholder="Enter Old Password"
            />
          </b-form-group>
        </b-col>

        <b-col sm="12">
          <b-form-group 
            label="New Password:"
            label-for="newPasswordInput"
          >
            <b-form-input 
              v-validate="'required'"
              id="newPasswordInput"
              v-model="form.newPassword"
              :class="{'form-control': true, 'error': errors.has('New Password') }"
              type="password"
              name="New Password"
              placeholder="Enter New Password"
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
      </b-row>

      <b-button :disabled='sending' type="submit" variant="primary">
        <b-spinner class="mx-3" v-if="sending" variant="light" small label="Spinning"></b-spinner>
        <span v-else>Change</span>
      </b-button>

      <b-button @click="$router.go(-1)" variant="danger">Cancel</b-button>
    </b-form>
  </b-card>
</template>

<script>
export default {
  middleware:'auth',
  data(){
    return {
      form:{
        oldPassword:'',
        newPassword:'',
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
      const token = this.$store.getters.token;

      try {
        await this.$axios.$post('http://165.22.199.57/user/changePassword',{...this.form,token})
        this.sending = false;
        this.$store.dispatch("setAlert", {text:'Password changed successfully',type:'success'});
        this.$router.push('/settings')
      } catch (e) {
        this.sending = false;
        this.$store.dispatch("setAlert", {text:e,type:'danger'});
      }
    },
  }
}
</script>