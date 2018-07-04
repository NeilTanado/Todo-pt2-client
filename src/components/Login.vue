<template>
  <div>
    <v-layout row justify-center>
        <v-btn color="primary" dark @click.stop="dialog3 = true">Login</v-btn>
        <v-dialog v-model="dialog3" max-width="500px">
          <v-card>
            <div class="container">
            <v-card-title>
              <h1> Please Insert Your ID </h1>
            </v-card-title>
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
              v-model="password"
              :append-icon="e1 ? 'visibility_off':'visibility'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              :rules="passwordRules"
              label="Enter your password"
              hint="At least 5 characters"
              min="5"
              counter="20"
            ></v-text-field>
            </v-form>
              <Register/>
              <h3> OR </h3>
              <fb-signin-button
                 :params="fbSignInParams"
                 @success="onSignInFBSuccess"
                 @error="onSignInFBError">
                 Sign in with Facebook
               </fb-signin-button>
              <g-signin-button
                :params="googleSignInParams"
                @success="onSignInGoogleSuccess"
                @error="onSignInGoogleError">
                Sign in with Google
              </g-signin-button>
            <v-card-actions>
              <v-btn color="primary" flat @click="signIn()">Sign In</v-btn>
              <v-btn color="primary" flat @click.stop="dialog3=false">Close</v-btn>
            </v-card-actions>
            </div>
          </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import Register from '@/components/Register.vue'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  components:{
    Register,

  },
  data () {
    return {
      e1: true,
      dialog3: false,
      valid: false,
      password: '',
      email: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length > 4 || 'Password must be more than 4 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      googleSignInParams: {
        client_id: '581622540445-bhb06p93j4u39a0n7a3tj2p04btplo0e.apps.googleusercontent.com'
      },
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      }
    }
  },
  methods:{
    signIn(){
      let loginData={
        email : this.email,
        password : this.password
      }
      axios.post('https://todoserver.neil.guru/users/signin',loginData)
      .then((value) => {
        localStorage.setItem('token',value.data.token)
        this.dialog3 = false
        this.$emit('login',true)
        swal(
          'Login Success',
          'Grats',
          'success'
        )
        this.$router.push('/first')
      })
      .catch((err) => {
        this.dialog3 = false
        swal({
         type: 'error',
         title: 'Oops...',
         text: 'Wrong Username or Password',
        })
      });
    },
    onSignInFBSuccess (response) {
      console.log('masuk FB');
       FB.api('/me','GET',{fields:["name",'email']}, dude => {
         const userData = {
           name: dude.name,
           email: dude.email
         }
         axios.post('https://todoserver.neil.guru/users/sosmed',userData)
         .then((value) => {
           localStorage.setItem('token',value.data.token)
           this.dialog3 = false
           this.$emit('login',true)
           swal(
             'Login Success',
             'Grats',
             'success'
           )
           this.$router.push('/first')
         })
         .catch((err) => {
           console.log(err);
         })
       })
     },
     onSignInFBError (error) {
       console.log('OH NOES', error)
     },
    onSignInGoogleSuccess (googleUser) {
      // google login
      const profile = googleUser.getBasicProfile()
      const userData = {
        name: profile.getName(),
        email: profile.getEmail()
      }
      axios.post('https://todoserver.neil.guru/users/sosmed',userData)
      .then((value) => {
        localStorage.setItem('token',value.data.token)
        this.dialog3 = false
        this.$emit('login',true)
        swal(
          'Login Success',
          'Grats',
          'success'
        )
        this.$router.push('/first')
      })
      .catch((err) => {
        console.log(err);
      })
    },
    onSignInGoogleError (error) {
      console.log('OH NOES', error)
    },
    facebook(){

    }
  },
  created(){
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      // js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=119308148780939"
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1353983184743648',
        cookie: true,
        xfbml: true,
        version: 'v3.0'
      })
    }
  },
  mounted(){

  }
}
</script>

<style lang="css">
.g-signin-button {
  box-sizing: border-box;
   position: relative;
   /* width: 13em;  - apply for fixed size */
   margin: 0.2em;
   padding: 0 15px 0 46px;
   border: none;
   text-align: center;
   line-height: 34px;
   white-space: nowrap;
   border-radius: 0.2em;
   font-size: 16px;
   color: #FFF;
   background: #DD4B39;
   border-right: #BB3F30 1px solid;
   background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
   background: #E74B37;
}

.fb-signin-button {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: center;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}
</style>
