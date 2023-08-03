document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('date').valueAsDate = new Date();
  set_min_max_dates();
  get_times();
  set_click_events();
  if_message_to_dsiplay();
});

function if_message_to_dsiplay(){
  try {
    let message = document.getElementById('message').innerText
    let message_object = JSON.parse(message)
    show_toast(message_object)
  } catch(error){
    console.log(error)
  }
}

function return_user(){
  let user = document.getElementById('hidden_u').innerText;
  return user
}

function get_times(){
  var selectedDate = document.getElementById("date").value;
  get_times_from_server(selectedDate);
}

function set_min_max_dates(){
  let date_inp = document.getElementById('date')
  let today = new Date();
  let thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  let formattedToday = today.toISOString().split('T')[0];
  let formattedThirtyDaysFromNow = thirtyDaysFromNow.toISOString().split('T')[0];
  date_inp.min = formattedToday;
  date_inp.max = formattedThirtyDaysFromNow;
}

async function get_times_from_server(date) {
  try {
    const response = await fetch('/api/times_booked', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "date": date })
    });
    if (response.ok) {
      const content = await response.json();
      create_buttons(content['times'][0]);
    } else {
      throw new Error('Failed to get times');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function return_button_array(){
  let seven = document.getElementById("7");
  let eight = document.getElementById("8");
  let nine = document.getElementById("9");
  let ten = document.getElementById("10");
  let eleven = document.getElementById("11");
  let twelve = document.getElementById("12");
  let thirteen = document.getElementById("13");
  let fourteen = document.getElementById("14");
  let fifteen = document.getElementById("15");
  let sixteen = document.getElementById("16");
  let seventeen = document.getElementById("17");
  let eighteen = document.getElementById("18");
  let nineteen = document.getElementById("19");
  return [seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen]
}

function create_buttons(times){
  let button_array = return_button_array();
  for(let i = 0; i < button_array.length; i++){
    set_button_state(button_array[i], times[i+2]);
  }
}

function set_button_state(button, booked){
  user = return_user();
  if(booked === "0"){
    button.disabled = false;
    button.innerText = button.value;
    button.setAttribute('class', 'btn btn-sm btn-primary shadow w-100 book-btn');
  } else if(booked === user){
    button.disabled = false;
    button.innerText = "Cancel";
    button.setAttribute('class', 'btn btn-sm btn-warning text-light shadow w-100 book-btn');
  } else {
    button.disabled = true;
    button.innerText = "Not Available";
    button.setAttribute('class', 'btn btn-sm btn-danger text-light shadow w-100 book-btn');
  }
}

//------------------------------------------- Send Booking To Server -------------------------------------------
function set_click_events(){
  buttons = return_button_array();
  for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(){
      send_booking_to_server(this.id, this.innerText);
    })
  }
}

function create_booking_object(time, cancel){
  let selectedDate = document.getElementById("date").value; 
  if(cancel === "Cancel"){
    cancel = true;
  } else {
    cancel = false;
  }
  let dateTimeObj = {
    "date":selectedDate,
    "time":time,
    "cancel":cancel
  }
  return dateTimeObj
}

async function send_booking_to_server(time, cancel) {
  let booking_obj = create_booking_object(time, cancel);
  show_booking_toast(booking_obj);
  try {
    const response = await fetch('/api/book_slot', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking_obj)
    });
    if (response.ok) {
      const content = await response.json();
      get_times();
    } else {
      throw new Error('Failed to book slot');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function show_booking_toast(booking_obj) {
  if(booking_obj['cancel']){
    console.log("No Toast")
  } else {
  let toastElement = document.getElementById("liveToast")
  toastElement.setAttribute('class', "toast hide bg-success")
  let toastTitle = document.getElementById('toast-title')
  toastTitle.innerText = "Booking Confirmed"
  let toastBody = document.getElementById("toast-body")
  toastBody.innerHTML = ""
  let booking_p = document.createElement('p')
  booking_p.innerText = return_time_string(booking_obj['time'])
  toastBody.appendChild(booking_p)
  const myToast = new bootstrap.Toast(toastElement);
  myToast.show();
  }
}

function return_time_string(starting_time){
  let holder_1 = Number(starting_time);
  let start_time = "";
  let end_time = "";
  if(holder_1 <= 11){
    start_time = starting_time + ":00am"
  } else{
    start_time = starting_time + ":00pm"
  }
  let till = Number(starting_time)+1
  if(till <= 11){
    end_time = till + ":00am"
  } else{
    end_time = till + ":00pm"
  }
  return "Court Booked: " + start_time + " - " + end_time + "!"
}

let password_inp = document.getElementById('new_pword')
let confirm_pword = document.getElementById('confirm_pass_inp')
let change_btn = document.getElementById('change_pword_btn')

password_inp.addEventListener('blur', function(){
  let password_instructions = document.getElementById("password_instructions")
  if(check_passw('new_pword')){
    password_inp.style.border = "1px solid green";
    password_instructions.style.display = "none";
  } else if(!check_passw('new_pword')){
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

function if_both(){
  let change_btn = document.getElementById('change_pword_btn')
  if(check_passw('new_pword') && check_confirm_passw()){
    change_btn.disabled = false;
    change_btn.setAttribute('class', "btn btn-success")
  } else {
    change_btn.disabled = true;
    change_btn.setAttribute('class', "btn btn-danger")
  }
}

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

function check_confirm_passw(){
  let password_inp = document.getElementById('new_pword').value
  let confirm_pass_inp = document.getElementById('confirm_pass_inp')
  let conforim_pass_inp_value = confirm_pass_inp.value
  if(password_inp === conforim_pass_inp_value){
    return true;
  } else {
    return false;
  }
}

function clear_inputs(){
  let password_inp = document.getElementById('new_pword')
  let confirm_pass_inp = document.getElementById('confirm_pass_inp')
  password_inp.value = ""
  confirm_pass_inp.value = ""
  password_inp.innerText = ""
  confirm_pass_inp.innerText = ""
}
change_btn.addEventListener('click', send_change_2_server)

async function send_change_2_server() {
  let password = document.getElementById('new_pword').value;
  let obj = JSON.stringify({ "password": password });
  try {
    const response = await fetch('/api/reset_password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: obj
    });

    if (response.ok) {
      const content = await response.json();
      clear_inputs();
      if_both();
      show_toast(content);
    } else {
      throw new Error('Failed to reset password');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function show_toast(response) {
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

let delete_pword_inp = document.getElementById('delete_pword')
delete_pword_inp.addEventListener('input', function(){
  let password_instructions = document.getElementById("password_instructions")
  let final_delete_btn = document.getElementById('final_delete_btn')
  if(check_passw(this.id)){
    password_inp.style.border = "1px solid green";
    delete_warning.style.display = "block";
    final_delete_btn.disabled = false;
  } else if(!check_passw(this.id)){
    password_inp.style.border = "1px solid red";
    delete_warning.style.display = "none";
    final_delete_btn.disabled = true;
  }
})

let backup_token_btn = document.getElementById('backup_token_btn')
backup_token_btn.addEventListener('click', function(){
  send_backup_request();
})

function send_backup_request() {
  fetch('/admin/api/backup', {
    method: 'POST',
  })
  .then(response => {
    if (response.status === 200) {
      return response.blob();
    } else {
      throw new Error('Backup request failed');
    }
  })
  .then(blob => {
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.href = url;
    link.download = "temp.zip";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
    send_clean_request();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function send_clean_request() {
  fetch('/admin/api/cleanup')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Cleanup request failed');
      }
    })
    .then(responseData => {
      console.log('GET request successful:', responseData);
    })
    .catch(error => {
      // Handle errors here, if needed
      console.error('Error:', error);
    });
}