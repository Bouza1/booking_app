
/////// add validation so cant send till password and username filled!

document.addEventListener("DOMContentLoaded", function() {
  set_page_height();
  if_message_to_dsiplay();
});

function if_message_to_dsiplay(){
  try {
    let message = document.getElementById('message').innerText
    let message_object = JSON.parse(message)
    showCustomToast(message_object)
  } catch(error){
    console.log(error)
}

}
function isMobileDevice() {
  return(isIOS() || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
}

function isIOS() {
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    return true;
  } else {
    return navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator.platform);
  }
}

function set_page_height(){
  let page = document.getElementById('whole-page')
  let login_container = document.getElementById('content-container')
  if(isMobileDevice()){
  } else {
     page.setAttribute('class', "vh-100 align-items-middle justify-content-center")
    login_container.style.width = "50vw"
  }
}

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
  let uname_value = uname_reset_in.value
  if(check_email('username_reset')){
    reset_btn.disabled = false;
  } else {
    reset_btn.disabled = true;
  }
})

function check_passw(element){
  let password_inp = document.getElementById(element)
  let password_value = password_inp.value
  let pword_reg_x = /^(?=.*[A-Z])(?=.*\d).{8,}$/
  if(password_value.match(pword_reg_x)){
    return true;
  } else {
    return false;
  }
}

function check_email(element){
  let uname = document.getElementById(element)
  let email_value = uname.value
  let mail_reg_x = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email_value.match(mail_reg_x)){
     return true;
   } else {
    return false;
   }
}

let reset_btn = document.getElementById('reset_email_btn')
reset_btn.addEventListener('click', function(){
  let uname_reset_in = document.getElementById('username_reset')
  send_reset_to_server(uname_reset_in.value)
})

function send_reset_to_server(email){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
  if(xhttp.status == 200 && xhttp.readyState == 4 ) {
    response = JSON.parse(xhttp.response);
    showCustomToast(response)
    }
  };
  xhttp.open("PUT", "/api/reset_email", true);
  let obj = JSON.stringify({"email":email});
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(obj);
}

function showCustomToast(response) {
  let toastElement = document.getElementById("liveToast")
  let classStr = "toast hide bg-" + response['type']
  toastElement.setAttribute('class', classStr)
  let toastTitle = document.getElementById('toast-title')
  toastTitle.innerText = response['title']
  let toastBody = document.getElementById("toast-body")
  toastBody.innerHTML = ""
  let p_tag = document.createElement('p')
  p_tag.innerText = response['message']
  toastBody.appendChild(p_tag)
  const myToast = new bootstrap.Toast(toastElement);
  myToast.show();
}
