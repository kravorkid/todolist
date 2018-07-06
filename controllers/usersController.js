// var firebase = require('./firebaseController');
//
// class userController {
//
//   index(req, res){
//     res.render('dashboard');
//   }
//
//   update(req, res){
//     var email = req.body.email;
//     var password = req.body.password;
//
//     var user = firebase.auth.currentUser;
//     user.updateProfile({
//       email: email,
//       password: password
//     }).then(function() {
//       // Update successful.
//     })
//
//   }
//
//   indexRegister(req, res){
//     res.render('register');
//   }
//
//   register(req, res){
//     var email = req.body.email;
//     var password = req.body.password;
//
//     firebase.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
//        var errorCode = error.code;
//        var errorMessage = error.message;
//
//        if (errorCode == 'auth/weak-password') {
//          console.log('password trop faible');
//        } else {
//          console.log(errorMessage);
//        }
//        console.log(error);
//      });
//     res.redirect('task');
//   }
//
//   logOut(req, res){
//     firebase.auth.signOut().then(function() {
//       req.session.destroy()
//       res.redirect('login')
//     }).catch(function(error) {
//         console.log(error)
//     });
//
//
//   }
//
// }
// module.exports = new authController();
