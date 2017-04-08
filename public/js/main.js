document.addEventListener("DOMContentLoaded", function(){
  getPosts(readToken());
});

function getPosts(token){
  $.ajax({
    dataType: 'json',
    url: '/api/v1/posts?token=' + token,
    type: 'get',
    cache: true,
    success: function(data, status){
      initPosts(data);
    },
    error: function(){
      renderAuth();
    }
  });
}

function initPosts(data){
  var app = document.getElementById('app');
  app.innerHTML = '';

  for(var i = 0; i<data.length; i++){
    app.innerHTML += '<div>' + data[i].text + '</div>'
  }
}

function renderAuth(){
  var app = document.getElementById('app');
  app.innerHTML =
  '<div class="row">'+
    '<div class="col-md-8 col-md-offset-2">'+
      '<div class="alert alert-danger" style="display: none;" id="login_error">'+
        '<strong>Email or password incorrect!</strong>'+
      '</div>'+
      '<div class="alert alert-danger" style="display: none;" id="login_error_password">'+
        '<strong>Wrong password!</strong>'+
      '</div>'+
      '<form class="form-vertical" role="form">'+
        '<input type="text" placeholder="email" class="form-control" id="login_email"/>'+
        '<input type="password" placeholder="password" class="form-control" id="login_password"/>'+
        '<button type="button" class="btn btn-info form-control" onclick="login()">Login</button>'+
      '</form>'+
      '<a><h4 onclick="renderRegister()">Register</h4></a>'+
    '<div>'+
  '</div>';
}

function renderRegister(){
  var app = document.getElementById('app');
  app.innerHTML =
  '<div class="row">'+
    '<div class="col-md-8 col-md-offset-2">'+
      '<div class="alert alert-danger" style="display: none;" id="register_error">'+
        '<strong>All fields needed!</strong>'+
      '</div>'+
      '<div class="alert alert-danger" style="display: none;" id="register_error_email">'+
        '<strong>Invalid email!</strong>'+
      '</div>'+
      '<div class="alert alert-danger" style="display: none;" id="register_error_password">'+
        '<strong>Password confirmation does not match!</strong>'+
      '</div>'+
      '<div class="alert alert-danger" style="display: none;" id="register_error_same_user">'+
        '<strong>Email already registered!</strong>'+
      '</div>'+
      '<form class="form-vertical" role="form">'+
        '<input type="text" placeholder="email" class="form-control" id="register_email"/>'+
        '<input type="text" placeholder="name" class="form-control" id="register_name"/>'+
        '<input type="password" placeholder="password" class="form-control" id="register_password"/>'+
        '<input type="password" placeholder="confirm password" class="form-control" id="confirm_password"/>'+
        '<button type="button" class="btn btn-info form-control" onclick="register()">Register</button>'+
      '</form>'+
      '<a><h4 onclick="renderAuth()">Login</h4></a>'+
    '<div>'+
  '</div>';
}
