document.addEventListener("DOMContentLoaded", function() {
  set_page_height();
});

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
  let reset_container = document.getElementById('content-container')
  if(isMobileDevice()){
  } else {
     page.setAttribute('class', "vh-100 align-items-middle justify-content-center")
    reset_container.style.width = "50vw"
  }
}

let password_inp = document.getElementById('password_inp')
let confirm_pword = document.getElementById('confirm_pass_inp')

password_inp.addEventListener('blur', function(){
  let password_instructions = document.getElementById("password_instructions")
  if(check_passw()){
    password_inp.style.border = "1px solid green";
    password_instructions.style.display = "none";
  } else if(!check_passw()){
    password_inp.style.border = "1px solid red";
    password_instructions.style.display = "block";
  }
  if_both()
})

confirm_pword.addEventListener('input', function(){
  let confirm_pword_instructions = document.getElementById("confirm_pword_instructions")
  if(check_confirm_passw()){
    confirm_pword.style.border = "1px solid green";
    confirm_pword_instructions.style.display = "none";
  }  else if(!check_confirm_passw()) {
    confirm_pword.style.border = "1px solid red";
    confirm_pword_instructions.style.display = "block";
  }
  if_both()
})

function check_passw(){
  let password_inp = document.getElementById('password_inp')
  let password_value = password_inp.value
  let pword_reg_x = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  if(password_value.match(pword_reg_x)){
    return true;
  } else {
    return false;
  }
}

function check_confirm_passw(){
  let password_inp = document.getElementById('password_inp').value
  let confirm_pass_inp = document.getElementById('confirm_pass_inp')
  let conforim_pass_inp_value = confirm_pass_inp.value
  if(password_inp === conforim_pass_inp_value){
    return true;
  } else {
    return false;
  }
}

function if_both(){
  let reset_btn = document.getElementById('reset_btn')
  if(check_passw() && check_confirm_passw()){
    reset_btn.disabled = false;
  } else {
    reset_btn.disabled = true;
  }
}
