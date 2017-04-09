function showError(div){
  div.style.display = 'block';
}

function hideError(div){
  div.style.display = 'none';
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

function sendLike(postID){
  var likes_count = parseInt(document.getElementById('likes_count').innerHTML);
  $.ajax({
    url: '/api/v1/post/'+postID+'/like?token=' + readToken(),
    type: 'POST',
    cache: true,
    success: function(data, textStatus, xhr){
      if(xhr.status == 200)
        document.getElementById('likes_count').innerHTML = likes_count + 1;
      else{
        document.getElementById('likes_count').innerHTML = likes_count - 1;
      }
    },
    error: function(d){
      renderAuth();
    }
  });
}

function post(){
  var text = document.getElementById('post_text').innerHTML;
  var json = {"text": text};
  $.ajax({
    dataType: 'json',
    url: '/api/v1/posts?token=' + readToken(),
    contentTypeString: 'application/x-www-form-urlencoded',
    type: 'POST',
    data: json,
    cache: true,
    success: function(data, textStatus, xhr){
      location.reload();
    },
    error: function(data){
      if(data.status == 422){
        showError(document.getElementById('post_error_text'));
      }
      else{
        renderAuth();
      }
    }
  });
}
