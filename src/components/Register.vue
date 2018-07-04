<template>
  <div>
    <v-btn color="blue darken-4" dark @click.stop="dialog2 = true">REGISTER WITH EMAIL
     <v-icon dark right>far fa-envelope</v-icon>
    </v-btn>
    <v-dialog v-model="dialog2" max-width="500px">
     <v-card>
       <div class="container">
       <v-card-title>
         <h2>Register Now</h2>
       </v-card-title>
        <v-form v-model="valid">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="25"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
          v-model="password"
          :append-icon="e2 ? 'visibility_off':'visibility'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          :rules="passwordRules"
          label="Enter your password"
          hint="At least 5 characters"
          min="5"
          counter="20"
        ></v-text-field>
        </v-form>
       <v-card-actions>
         <v-btn color="primary" flat @click="registerId()">Sign Up</v-btn>
         <v-btn color="primary" flat @click.stop="dialog2=false">Close</v-btn>
       </v-card-actions>
          </div>
     </v-card>
   </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
  data(){
    return{
      e1:true,
      dialog2: false,
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password:'',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length > 4 || 'Password must be more than 4 characters'
      ]
    }
  },
  methods:{
    registerId(){
      let newUser = {
        name:this.name,
        email:this.email,
        password:this.password
      }
      axios.post('https://todoserver.neil.guru/users/createuser',newUser)
      .then((value) => {
        swal(
          'Good job!',
          'You already registered',
          'success'
        )
        this.dialog2 = false
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>
