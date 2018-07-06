var firebase = require('./firebaseController');
var tasksUser = firebase.database.ref('tasks');

class tasksController {

  index(req, res){
    var tasksUser = firebase.database.ref('tasks/'+ res.locals.user);
    var count = 0;
    tasksUser.on('child_added', function(snapshot){
      return count++
    })
    res.render('./tasks/task', { tasksUser: tasksUser, count: count });
  }

  create(req, res){
    var tasksUser = firebase.database.ref('tasks/'+ res.locals.user);
    tasksUser.push({
      task: req.body.task,
    })
    res.redirect('back');
  }

  edit(req, res){
    var tasksUser = firebase.database.ref('tasks/'+ res.locals.user);

    var id = req.params.id
    var value = tasksUser.once('value').then(function(snapshot){
      var u = snapshot.child(id).child('task').val()
      return u;
    })
    res.render('./tasks/edit', { id: id, tasksUser: tasksUser, value: value })
  }

  update(req, res){
    var tasksUser = firebase.database.ref('tasks/'+ res.locals.user);
    var child = tasksUser.child(req.body.id);
    child.update({
      task: req.body.task
    })
    res.redirect('/task')
  }

  delete(req, res){
    var tasksUser = firebase.database.ref('tasks/'+ res.locals.user);
    var key = req.params.id
    tasksUser.child(key).remove();
    res.redirect('back');
  }
}
module.exports = new tasksController();
