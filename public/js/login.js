function login(){
  var email = document.getElementById('login_email').value.toString();
  var password = document.getElementById('login_password').value.toString();

  var json = {"email": email, "password": password};
  $.ajax({
    dataType: 'json',
    url: '/api/v1/auth/login',
    contentTypeString: 'application/x-www-form-urlencoded',
    type: 'POST',
    data: json,
    success: function(data, status){
      document.cookie = 'token' + '=' + data.token
      location.reload();
    },
    error: function(){
      showError(document.getElementById('login_error'));
    }
  });
}
