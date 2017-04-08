document.addEventListener("DOMContentLoaded", function(){
  getPosts();
});

function getPosts(){
  //TODO get token from cookies
  token = 'token'
  $.ajax({
    dataType: 'json',
    url: '/api/v1/posts?token=' + token,
    type: 'get',
    cache: true,
    success: function(data, status){
      initPosts(data);
    },
    error: function(){
      showLogin();
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

function showLogin(){
  var app = document.getElementById('app');
  app.innerHTML = '<div>LOGIN</div>'
}
