<template>
  <div>
    <v-container grid-list-md mt-4>
      <h3>{{dataWeather.temperature}}&#x2103;</h3>
      <img :src="dataWeather.image">
      <h3>{{dataWeather.location}}</h3>
      <v-layout row wrap>
        <v-text-field v-model="first" label="What You Want To Do?"></v-text-field>
        <v-menu
          ref="menu2"
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="10"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="100px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            icon="event"
            label="Date"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" @input="$refs.menu2.save(date)"></v-date-picker>
        </v-menu>
        <v-btn round color="primary" dark @click="addTodo()"><b>ADD TODO</b></v-btn>
      </v-flex>
      </v-layout>
    </v-container>
    <v-container>
    <v-layout row wrap>
      <v-flex xs3 class="my-2 mr-5 ml-5" v-for="todo in listTodo">
        <v-card height="100%">
        <v-card-text>
          <h2 class="text-md-center" v-if="!todo.status">{{todo.description}}</h2>
          <h2 class="text-md-center" v-else><strike>{{todo.description}}</strike></h2>
          {{todo.date}}</v-card-text>
          <div v-if="!todo.status">
            <v-btn flat color="green" @click="editTodo(todo._id)">Done</v-btn>
            <v-btn flat color="orange" @click="deleteTodo(todo._id)">Delete</v-btn>
          </div>
          <div v-else>
            <v-btn flat color="red" @click="editedTodo(todo._id)">Undone</v-btn>
            <v-btn flat color="orange" @click="deleteTodo(todo._id)">Delete</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data(){
    return{
      date: null,
      dialog4: false,
      first:'',
      date:'',
      listTodo: [],
      dataWeather : {},
    }
  },
  methods:{
    editTodo(id){
      let statusTodo = {status : true}
      let tokenUser = localStorage.getItem('token')
      let self = this
      axios.put('https://todoserver.neil.guru/todos/update/'+id,statusTodo,{
        headers:{
          tokenUser
        },
      })
      .then((value) => {
        self.getData()
      })
      .catch((err) => {
        console.log(err);
      })
    },
    editedTodo(id){
      let statusTodo = {status : false}
      let tokenUser = localStorage.getItem('token')
      let self = this
      axios.put('https://todoserver.neil.guru/todos/update/'+id,statusTodo,{
        headers:{
          tokenUser
        },
      })
      .then((value) => {
        self.getData()
        })
      .catch((err) => {
        console.log(err);
      })
    },
    addTodo(){
      if(localStorage.getItem('token')){
        if(this.date === '' && this.first === ''){
          swal({
            type: 'error',
            title: 'Please Insert',
            text: 'Todo and Date',
          })
        }else{
          let sentTodo = {
            description : this.first,
            date: this.date
          }
          let tokenuser = localStorage.getItem('token')
          let self = this
          axios.post('https://todoserver.neil.guru/todos/create',sentTodo,{
            headers:{
              tokenuser
            }
          })
          .then((value) => {
            self.first = ''
            self.date = ''
            swal(
              'Good job!',
              'You clicked the button!',
              'success'
            )
            self.getData()
          })
          .catch((err) => {
            console.log(err);
          })
        }
      }else{
        swal({
          type: 'error',
          title: 'Please Login First',
        })
      }
    },
    getData(){
      let token = localStorage.getItem('token')
      let self = this
      axios.get('https://todoserver.neil.guru/todos/datatodo',{
        headers:{
          token
        }
      })
      .then((value) => {
        self.listTodo = value.data.data.todo
        console.log(value.data.data.todo);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    deleteTodo (id) {
      let token = localStorage.getItem('token')
        axios.delete('https://todoserver.neil.guru/todos/deletetodo/'+id,{
          headers:{
            token
          }
        })
        .then((value) => {
          swal("Oooops", "You deleted a Todo!", "error");
          this.getData()
        })
        .catch((err) => {
          console.log(err);
        })
      },
    getWeather(){
      let self = this
      axios.get('https://todoserver.neil.guru/todos/getweather')
      .then((value) => {
        let data = value.data.result[0]
        self.dataWeather = {temperature: data.current.temperature, image : data.current.imageUrl, location : data.location.name}
      })
      .catch((err) => {
        console.log(err);
      })
    },
    getScored(){
      let self = this
        axios.get('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json')
        .then((value) => {
          console.log(value);
        })
        .catch((err) => {
          console.log(err);
        })
      }
  },
  created(){
    this.getData()
    this.getWeather()
  }
}
</script>

<style lang="css">
</style>
