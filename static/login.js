import { set_page_height, if_message_to_dsiplay, show_toast, check_passw, check_email } from './main.js';

document.addEventListener("DOMContentLoaded", function() {
  set_page_height();
  if_message_to_dsiplay();
});


let username_inp = document.getElementById('username')
username_inp.addEventListener('input', function(){
  check_username_pword()
})

let password_inp = document.getElementById('password')
password_inp.addEventListener('input', function(){
  check_username_pword()
})

function check_username_pword(){
  let login_btn = document.getElementById('login-btn')
  if(check_email('username') && check_passw('password')){
    login_btn.disabled = false;
  } else {
    login_btn.disabled = true;
  }
}

let uname_reset_in = document.getElementById('username_reset')
uname_reset_in.addEventListener('input', function(){
  let reset_btn = document.getElementById('reset_email_btn') 
  if(check_email('username_reset')){
    reset_btn.disabled = false;
  } else {
    reset_btn.disabled = true;
  }
})

let reset_btn = document.getElementById('reset_email_btn')
reset_btn.addEventListener('click', function(){
  let uname_reset_in = document.getElementById('username_reset')
  send_reset_to_server(uname_reset_in.value)
})

function send_reset_to_server(email) {
  fetch('/api/reset_email', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Request failed with status ' + response.status);
    }
  })
  .then(data => {
    show_toast(data);
  })
  .catch(error => {
    console.error(error);
  });
}

