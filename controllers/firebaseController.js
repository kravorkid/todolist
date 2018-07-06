
class firebaseController {
  constructor(){
    this.firebase = require('firebase');
    this.config = {
      apiKey: "AIzaSyDj4m4f-0PHF4apFnNP42-x0QrhvXG2XYA",
      authDomain: "todolist-krav.firebaseapp.com",
      databaseURL: "https://todolist-krav.firebaseio.com",
      projectId: "todolist-krav",
      storageBucket: "todolist-krav.appspot.com",
      messagingSenderId: "452879138002"
    };
    this.init = this.firebase.initializeApp(this.config);
    this.auth = this.firebase.auth();
    this.database = this.firebase.database();
    // this.firebase.app();
  }



}
module.exports = new firebaseController();
