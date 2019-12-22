<template>
  <b-card class="mt-3" header-tag="header" >
    <template v-slot:header>
      <h6 class="mb-0">Registration</h6>
    </template>

    <b-form @submit.prevent="onSubmit"> 
      <b-row>
        <b-col v-for="(textfield,i) in textfields" :key="i" md="6" sm="12">
          <b-form-group 
            :label="textfield.label"
            :label-for="textfield.id"
          >
            <b-form-input 
              v-validate="textfield.validate"
              :id="textfield.id"
              v-model="form[textfield.name]"
              :class="{'is-invalid': errors.has(textfield.name) }"
              :type="textfield.type"
              :name="textfield.name"
              :placeholder="textfield.placeholder"
            />
          </b-form-group>
        </b-col>
      </b-row> 

      <b-row class="d-flex justify-content-end mr-2">
        <b-button :disabled='sending' type="submit" variant="primary">
          <b-spinner class="mx-3" v-if="sending" variant="light" small label="Spinning"></b-spinner>
          <span v-else>Register</span>
        </b-button>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import errMessages from '../../assets/js/errMessages';
  export default {
    name:'Registration',
    data() {
      return {
        form: {
          sponsor:'testareg1',
          username: '',
          email: '',
          firstName:'',
          secondName:'',
          phone:'',
          country:'RU',
          password: '',
          finPassword: '',
          skype:''
        },
        textfields:[
          {
            label:'Sponsor*:',
            id:'sponsorInput',
            type:'text',
            name:'sponsor',
            placeholder:'Enter sponsor username',
            validate:{ required: true, regex:/^[a-z0-9]*?([-_][a-z0-9]+){0,2}$/i }
          },
          {
            label:'Username*:',
            id:'usernameInput',
            type:'text',
            name:'username',
            placeholder:'Enter username',
            validate:{ required: true, regex:/^[a-z0-9]*?([-_][a-z0-9]+){0,2}$/i }
          },
          {
            label:'Password*:',
            id:'passwordInput',
            type:'password',
            name:'password',
            placeholder:'Enter password',
            validate:{ required: true,min:8 }
          },
          {
            label:'Financial password*:',
            id:'finPasswordInput',
            type:'password',
            name:'finPassword',
            placeholder:'Enter financial password',
            validate:{ required: true,min:8 }
          },
          {
            label:'First name*:',
            id:'firstNameInput',
            type:'text',
            name:'firstName',
            placeholder:'Enter first name',
            validate:{ required: true, regex:/^[a-z0-9]+$/i }
          },
          {
            label:'Second name*:',
            id:'secondNameInput',
            type:'text',
            name:'secondName',
            placeholder:'Enter second name',
            validate:{ required: true, regex:/^[a-z0-9]+$/i }
          },
          {
            label:'Email*:',
            id:'emailInput',
            type:'text',
            name:'email',
            placeholder:'Enter email',
            validate:{ required: true, email:true }
          },
          {
            label:'Phone*:',
            id:'phoneInput',
            type:'text',
            name:'phone',
            placeholder:'Enter phone (+79008001234)',
            validate:{ required: true, regex:/^[0-9\-\+]{9,15}$/ }
          },
          {
            label:'Country (ISO)*:',
            id:'countryInput',
            type:'text',
            name:'country',
            placeholder:'Enter country',
            validate:{ required: true, regex:/^[A-Z]{2}$/ }
          },
          {
            label:'Skype:',
            id:'skypeInput',
            type:'text',
            name:'skype',
            validate:{ required: false }
          }
        ],
        sending:false
      }
    },
    methods: {
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

      async onSend(){
        this.sending = true;
        try {
          await this.$store.dispatch('register', JSON.stringify(this.form)).then(() => {
            this.sending = false
            this.$router.push('/')
          })
        } catch (err) {
          this.sending = false
          const errCode = err.response.status;
          this.$store.dispatch("setAlert", {text:errMessages[errCode], type:'danger'});
        }
      }
    }
  }
</script>

<style scoped>

</style>