<template>
    <div class="d-flex flex-column">
      <b-btn class="mt-3" variant="primary" to="/settings/changePassword">
        Change Password
      </b-btn>
      
      <b-spinner v-if="items == null" class="mx-auto my-3" variant="secondary"></b-spinner>

      <b-form @submit.prevent="onSubmit" class="my-3" v-else >
        <b-card header-tag="header">
          <template v-slot:header>
            <h6 class="mb-0">Personal information</h6>
          </template>

          <b-row class="my-1" v-for="(field,i) in infoFields" :key="i">
            <b-col sm="3">
              <label :for="field.label">{{ field.label }}</label>
            </b-col>

            <b-col sm="9">
              <b-form-input 
                v-validate="field.validate"
                :class="{'is-invalid': errors.has(field.id) }"
                v-model="items[field.id]" 
                :name="field.id"
                :id="field.id" 
                type="text"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-card>


        <b-card class="mt-2" header-tag="header">
          <template v-slot:header>
            <h6 class="mb-0">Social links</h6>
          </template>

          <b-row class="my-1" v-for="field in linkFields" :key="field.id">
            <b-col sm="3">
              <label :for="field.label">{{ field.label }}</label>
            </b-col>

            <b-col sm="9">
              <b-form-input 
                v-model="items[field.id]" 
                :id="field.id" 
                type="text"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-card>

        <b-card class="my-2 d-flex flex-wrap" header-tag="header">
          <template v-slot:header>
            <h6 class="mb-0">Preferences</h6>
          </template>

          <b-row>
            <b-form-checkbox
              style="margin-left:30px"
              v-for="checkbox in checkboxes" :key="checkbox.id"
              :id="checkbox.id"
              v-model="items[checkbox.id]"
              name="checkbox-1"
              value="1"
              unchecked-value="0"
            >
              {{ checkbox.label}}
            </b-form-checkbox>
          </b-row>
        </b-card>

        <b-button block :disabled='sending' type="submit" variant="primary">
          <b-spinner class="mx-3" v-if="sending" variant="light" small label="Spinning"></b-spinner>
          <span v-else>Update</span>
        </b-button>
      </b-form>
    </div>
</template>

<script>
  export default {
    middleware: 'auth',
    name: "Settings",
    data () {
      return {
        items: null,
        sending:false,
        infoFields:[
          {
            label:'Username:',
            id:'username',
            validate:{required:true,regex:/^[a-z0-9]*?([-_][a-z0-9]+){0,2}$/i}
          },
          {
            label:'Sponsor:',
            id:'sponsor',
            validate:{required:true,regex:/^[a-z0-9]*?([-_][a-z0-9]+){0,2}$/i}
          },
          {
            label:'Email:',
            id:'email',
            validate:{required:true,regex:/^[a-z0-9]+?.+@.+\..+[a-z0-9]$/i}
          },
          {
            label:'First name:',
            id:'firstName',
            validate:{required:true,regex:/^[a-z0-9]+$/i}
          },
          {
            label:'Second name:',
            id:'secondName',
            validate:{required:true,regex:/^[a-z0-9]+$/i}
          },
          {
            label:'Birthday:',
            id:'birthday',
            validate:{date_format : 'yyyy-MM-dd'}
          },
          {
            label:'Phone Number 1:',
            id:'phoneNumber',
            validate:{required:true,regex:/^[0-9\-\+]{9,15}$/}
          },
          {
            label:'Phone Number 2:',
            id:'phoneNumber2',
            validate:{required:false,regex:/^[0-9\-\+]{9,15}$/}
          },
          {
            label:'Skype:',
            id:'skype',
            validate:{required:false,regex:/^[a-z0-9\-\_]$/i}
          },
          {
            label:'Country (ISO):',
            id:'country',
            validate:{required:true,regex:/^[A-Z]{2}$/}
          },
          {
            label:'State:',
            id:'state'
          },
          {
            label:'City:',
            id:'city'
          },
          {
            label:'Address:',
            id:'address'
          },
          {
            label:'ZipCode:',
            id:'zipCode'
          },
        ],
        linkFields:[
          {label:'Site:',id:'site'},
          {label:'Odnoklassniki:',id:'odnoklassniki'},
          {label:'Vkontakte:',id:'vk'},
          {label:'Facebook:',id:'fb'},
          {label:'Youtube:',id:'youtube'},
        ],
        checkboxes:[
          {label:'Auto extension BS',id:'autoExtensionBS'},
          {label:'Show mobile',id:'showMobile'},
          {label:'Show email',id:'showEmail'},
          {label:'Show name',id:'showName'},
          {label:'Delivery email',id:'deliveryEmail'},
          {label:'Delivery SMS',id:'deliverySMS'},
        ]
      }
    },
    async mounted() {
      const properties = this.$store.getters.userProperties;
      if(properties == null) await this.getProperties();
      this.items = Object.assign({}, this.$store.getters.userProperties)
    },

    methods: {
      async getProperties(){
        try {
          await (this.$store.dispatch('getUserProps', this.$store.getters.token))
        } catch (e) {
          this.$store.dispatch("setAlert", {text:e, type:'danger'});
        }
      },

      async updateProperties(){
        this.sending = true;
        let token = this.$store.getters.token;
        let items = this.items;
        try {
          await (this.$store.dispatch('updateUserProps', {token,items}))
          this.$store.dispatch("setAlert", {text:'Successfully updated', type:'success'});
          this.sending = false;
        } catch (e) {
          this.sending = false;
          this.$store.dispatch("setAlert", {text:e, type:'danger'});
        }
      },

      async onSubmit() {
        this.$validator.validateAll().then(success => {
          if (success){
            this.updateProperties();
          } else {
            let errMsg = this.$validator.errors.items[0].msg;
            this.$store.dispatch("setAlert", {text:errMsg, type:'danger'});
          }
        }).catch(e => {
          this.$store.dispatch("setAlert", {text:e, type:'danger'});
        })
      },

    }
  }
</script>

<style scoped>

</style>