import { set_page_height, if_message_to_dsiplay, check_passw, check_email, check_name } from './main.js';

document.addEventListener("DOMContentLoaded", function() {
  set_page_height();
  set_input_triggers();
  set_terms_cond_btns();
  if_message_to_dsiplay();
});

let flag = 0

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
  if(check_email('email_inp')){
    email_inp.style.border = "1px solid green"
    email_instructions.style.display = "none";
    flag = 0
  } else if((!check_email('email_inp')) && flag === 0) {
    email_inp.style.border = "1px solid red";
    email_instructions.style.display = "block";
    flag = 1
  }
})

password_inp.addEventListener('blur', function(){
  let password_instructions = document.getElementById("password_instructions")
  if(check_passw('password_inp')){
    password_inp.style.border = "1px solid green";
    password_instructions.style.display = "none";
    flag = 0
  } else if((!check_passw('password_inp')) && flag === 0){
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
  if((check_name('fname_inp') && check_name('lname_inp') && check_email('email_inp') && check_passw('password_inp') && check_confirm_passw()) && flag === 0){
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


