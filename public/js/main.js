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
      '<form class="form-vertical" role="form">'+
        '<input type="text" placeholder="email" class="form-control" id="login_email"/>'+
        '<input type="password" placeholder="password" class="form-control" id="login_password"/>'+
        '<button type="button" class="btn btn-info form-control" onclick="login()">Login</button>'+
      '</form>'+
    '<div>'+
  '</div>';
}

function readToken(){
  var nameEQ = 'token' + "=";
  var co = document.cookie.split(';');
  for(var i=0;i < co.length;i++) {
      var c = co[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
