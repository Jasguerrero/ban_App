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
