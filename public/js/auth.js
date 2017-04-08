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
    error: function(data){
      if(data.status == 403){
        showError(document.getElementById('login_error'));
        hideError(document.getElementById('login_error_password'))
      }
      else if(data.status == 460){
        showError(document.getElementById('login_error_password'));
        hideError(document.getElementById('login_error'));
      }
    }
  });
}

function register(){
  var email = document.getElementById('register_email').value.toString();
  var password = document.getElementById('register_password').value.toString();
  var name = document.getElementById('register_name').value.toString();
  var confirm_password = document.getElementById('confirm_password').value.toString();

  var json = {"email": email, "password": password, "name": name, "confirm_password": confirm_password};
  $.ajax({
    dataType: 'json',
    url: '/api/v1/auth/register',
    contentTypeString: 'application/x-www-form-urlencoded',
    type: 'POST',
    data: json,
    success: function(data, status){
      document.cookie = 'token' + '=' + data.token
      location.reload();
    },
    error: function(res){
      if(res.status == 422){
        showError(document.getElementById('register_error'));
        hideError(document.getElementById('register_error_email'));
        hideError(document.getElementById('register_error_password'));
        hideError(document.getElementById('register_error_same_user'));
      }
      else if(res.status == 461){
        hideError(document.getElementById('register_error'));
        showError(document.getElementById('register_error_email'));
        hideError(document.getElementById('register_error_password'));
        hideError(document.getElementById('register_error_same_user'));
      }
      else if(res.status == 421){
        hideError(document.getElementById('register_error'));
        hideError(document.getElementById('register_error_email'));
        showError(document.getElementById('register_error_password'));
        hideError(document.getElementById('register_error_same_user'));
      }
      else if(res.status == 406){
        hideError(document.getElementById('register_error'));
        hideError(document.getElementById('register_error_email'));
        hideError(document.getElementById('register_error_password'));
        showError(document.getElementById('register_error_same_user'));
      }
    }
  });
}
