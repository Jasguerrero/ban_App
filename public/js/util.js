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
