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
  app.innerHTML =
  '<div class="postCard">'+
    '<h3>Share your artwork!</h3>'+
    '<div class="alert alert-danger" style="display: none;" id="post_error_text">'+
      '<strong>Text and image needed!</strong>'+
    '</div>'+
    '<form class="form-vertical" role="form">'+
      '<input type="file" name="file" class="form-control" accept="image/*" id="image">'+
      '<textarea id="post_text" cols="40" rows="5" class="form-control"></textarea>'+
      '<button type="button" class="btn btn-info form-control" onclick="post()">Post</button>'+
    '</form>'+
  '</div>';
  for(var i = 0; i<data.length; i++){
    app.innerHTML +=
    '<div class=card'+i%2+'>'+
      '<img src="'+data[i].image+'" class="img-responsive center-block">'+
      '<h4>'+ data[i].text + '</h4>'+
      '<blockquote><footer>'+data[i].username+'<footer></blockquote>'+
      '<div class="row">'+
        '<div class="col-md-2 col-xs-3" onclick="sendLike(\''+data[i]._id+'\')"><p><span id="likes_count_'+data[i]._id+'">'+data[i].likes_count+'</span> <i class="fa fa-heart" aria-hidden="true"></i><p>'+
        '</div>'+
        '<div class="col-md-2 col-xs-3" onclick="showComments(\''+data[i]._id+'\')"><p>'+data[i].comments_count+' <i><i class="fa fa-comments" aria-hidden="true"></i></p>'+
        '</div>'+
      '</div>'+
      '<div class="row">'+
      '<div class="col-md-12" id="comment_section_'+data[i]._id+'" style="display: none;" >'+
      '</div>'+
      '</div>'+
    '</div>';
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

function renderComments(comments, postID, section){
  section.innerHTML = "";

  for(var i = 0; i<comments.length; i++){
    section.innerHTML +=
    '<div class="row card_comments">'+
      '<div class="col-md-12">'+comments[i].text+'</div>'+
      '<div class="col-md-12 align-text-right">'+comments[i].username+'</div>'+
    '</div>';
  }
  section.innerHTML +=
  '<div class="row card_comments">'+
    '<div class="form-vertical" role="form">'+
      '<input class="form-control" placeholder="Comment!!" id="text_comment_'+postID+'"></input>'+
      '<button type="button" class="btn btn-info form-control" onclick="postComment(\''+postID+'\')">Share</button>'+
    '</div>'+
  '</div>';
}
