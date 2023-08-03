// Page Format & Layout
export function isMobileDevice() {
    return(isIOS() || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
  }
  
  export function isIOS() {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
      return true;
    } else {
      return navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(navigator.platform);
    }
  }
  
  export function set_page_height(){
    let page = document.getElementById('whole-page')
    let content_container = document.getElementById('content-container')
    if(isMobileDevice()){
    } else {
      page.setAttribute('class', "vh-100 align-items-middle justify-content-center")
      content_container.style.width = "50vw"
    }
  }
  
  // Toast & Message Handling
  export function if_message_to_dsiplay(){
    try {
      let message = document.getElementById('message').innerText
      let message_object = JSON.parse(message)
      show_toast(message_object)
    } catch(error){
      console.log(error)
    }
  }
  
  export function show_toast(response) {
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
  
  // Check Inputs
  export function check_passw(element){
    let password_inp = document.getElementById(element)
    let password_value = password_inp.value
    let pword_reg_x = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    if(password_value.match(pword_reg_x)){
      return true;
    } else {
      return false;
    }
  }
  
  export function check_email(element){
    let uname = document.getElementById(element)
    let email_value = uname.value
    let mail_reg_x = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email_value.match(mail_reg_x)){
       return true;
     } else {
      return false;
     }
  }
  
  export function check_name(element){
    let name_inp = document.getElementById(element)
    let name_value = name_inp.value
    if((name_value.length >= 3) && (/^[a-zA-Z]+$/.test(name_value))){
      return true;
    } else {
      return false;
    }
  }