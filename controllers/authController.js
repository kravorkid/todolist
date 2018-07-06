var firebase = require('./firebaseController');

class authController {

  indexLogin(req, res){
    res.render('login');
  }

  login(req, res){
    var email = req.body.email;
    var password = req.body.password;

    firebase.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        'Wrong password.'
      } else {
        errorMessage;
      }
      error;
    });

    firebase.auth.onAuthStateChanged(function(user) {
      var user = firebase.auth.currentUser;
      if (user) {
        req.session.user_id = user.uid;
        res.redirect('task');
      } else {
        // res.render('login', { error: 'Invalid email or password.' });
      }
    });

  }

  indexRegister(req, res){
    res.render('register');
  }

  register(req, res){
    var email = req.body.email;
    var password = req.body.password;

    firebase.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
       var errorCode = error.code;
       var errorMessage = error.message;

       if (errorCode == 'auth/weak-password') {
         console.log('password trop faible');
       } else {
         console.log(errorMessage);
       }
       console.log(error);
     });
    res.redirect('task');
  }

  logOut(req, res){
    firebase.auth.signOut().then(function() {
      req.session.destroy()
      res.redirect('login')
    }).catch(function(error) {
        console.log(error)
    });


  }

}
module.exports = new authController();
