document.addEventListener("DOMContentLoaded", function() {
  set_page_height();
  set_input_triggers();
  set_terms_cond_btns();
  if_message_to_dsiplay();
});

function if_message_to_dsiplay(){
  try {
    let message = document.getElementById('message').innerText
    let message_object = JSON.parse(message);
    show_message_toast(message_object);
  } catch(error){
    console.log(error);
  }
}
  
let flag = 0

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

let fname_inp = document.getElementById('fname_inp')
let lname_inp = document.getElementById('lname_inp')
let email_inp = document.getElementById('email_inp')
let password_inp = document.getElementById('password_inp')
let confirm_pword = document.getElementById('confirm_pass_inp')

fname_inp.addEventListener('blur', function(){
  let name_instructions = document.getElementById("name_instructions")
  if(check_name('fname_inp')){
    fname_inp.style.border = "1px solid green"
    name_instructions.style.display = "none"
    flag = 0
  } else if((!check_name('fname_inp')) && flag === 0)  {
    fname_inp.style.border = "1px solid red";
    name_instructions.innerText = "First Name Must Be At Least 3 Characters"
    name_instructions.style.display = 'block';
    flag = 1
  }
})

lname_inp.addEventListener('blur', function(){
  let name_instructions = document.getElementById("name_instructions")
  if(check_name('lname_inp')){
    lname_inp.style.border = "1px solid green";
    name_instructions.style.display = "none";
    flag = 0
  } else if((!check_name('lname_inp')) && flag === 0) {
    lname_inp.style.border = "1px solid red";
    name_instructions.innerText = "Last Name Must Be At Least 3 Characters";
    name_instructions.style.display = 'block';
    flag = 1
  }
})

email_inp.addEventListener('blur', function(){
  let email_instructions = document.getElementById("email_instructions")
  if(check_email()){
    email_inp.style.border = "1px solid green"
    email_instructions.style.display = "none";
    flag = 0
  } else if((!check_email()) && flag === 0) {
    email_inp.style.border = "1px solid red";
    email_instructions.style.display = "block";
    flag = 1
  }
})

password_inp.addEventListener('blur', function(){
  let password_instructions = document.getElementById("password_instructions")
  if(check_passw()){
    password_inp.style.border = "1px solid green";
    password_instructions.style.display = "none";
    flag = 0
  } else if((!check_passw()) && flag === 0){
    password_inp.style.border = "1px solid red";
    password_instructions.style.display = "block";
    flag = 1
  }
})

confirm_pword.addEventListener('input', function(){
  let confirm_pword_instructions = document.getElementById("confirm_pword_instructions")
  if(check_confirm_passw()){
    confirm_pword.style.border = "1px solid green";
    confirm_pword_instructions.style.display = "none";
    flag = 0;
  }  else if((!check_confirm_passw()) && flag === 0) {
    confirm_pword.style.border = "1px solid red";
    confirm_pword_instructions.style.display = "block";
    flag = 1;
  }
})

function check_name(element){
  let name_inp = document.getElementById(element)
  let name_value = name_inp.value
  if((name_value.length >= 3) && (/^[a-zA-Z]+$/.test(name_value))){
    return true;
  } else {
    return false;
  }
}

function check_email(){
  let email_inp = document.getElementById('email_inp')
  let email_value = email_inp.value
  let mail_reg_x = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email_value.match(mail_reg_x)){
     return true;
   } else {
    return false;
   }
}

function check_passw(){
  let password_inp = document.getElementById('password_inp')
  let password_value = password_inp.value
  let pword_reg_x = /^(?=.*[A-Z])(?=.*\d).{8,}$/
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

function set_input_triggers(){
  let form_inputs = document.getElementsByClassName('form-control')
  for(let i = 0; i < form_inputs.length; i++){
    form_inputs[i].addEventListener('blur', function(){
      check_all_inps();
    })
  }
}

function check_all_inps(){
  let terms_conditions = document.getElementById('terms_conditions')
  if((check_name('fname_inp') && check_name('lname_inp') && check_email() && check_passw() && check_confirm_passw()) && flag === 0){
    terms_conditions.style.display = "block";
  } else {
    terms_conditions.style.display = "none";
  }
}

function set_terms_cond_btns(){
  let buttons = document.getElementsByClassName('dis-agree-btn')
  for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(){
      console.log(this.value)
      let registerBtn = document.getElementById('register_btn')
      if(this.value === "agree"){
        registerBtn.disabled = false;
      } else {
        registerBtn.disabled = true;
      }
    })
  }
}

function show_message_toast(response) {
  let toastElement = document.getElementById("liveToast")
  let classStr = "toast hide bg-" + response['type']
  toastElement.setAttribute('class', classStr)
  let toastBody = document.getElementById("toast-body")
  toastBody.innerHTML = ""
  let p_tag = document.createElement('p')
  p_tag.innerText = response['message']
  toastBody.appendChild(p_tag)
  const myToast = new bootstrap.Toast(toastElement);
  myToast.show();
}

