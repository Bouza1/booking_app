from utils.db import get_user_security, insert_reset_token, return_valid_tokens, update_password, spend_previous_tokens,  spend_token, save_user_security, save_user_details, delete_from_table
from utils.config import aes_encrypt, aes_decrypt
from utils.email_template import template
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string import Template
import os 
import base64

def save_user(username, hashed_password, first_name, last_name, role):
  id = aes_encrypt(username)
  f_name = aes_encrypt(first_name)
  l_name =aes_encrypt(last_name)
  r = aes_encrypt(role)
  save_user_security(id, hashed_password)
  save_user_details(id, f_name, l_name, r)

def generate_url_safe_variable():
    random_bytes = os.urandom(32)
    url_safe_variable = base64.urlsafe_b64encode(random_bytes).rstrip(b'=').decode()
    return url_safe_variable

def handle_email_reset(email):
  user_exists =  get_user_security(aes_encrypt(email))
  if user_exists:
    token = create_reset_obj(email)
    e = token['E']
    d = token['D']
    spend_previous_tokens(e['assigned'])
    insert_reset_token(e['id'], e['token'], e['assigned'])
    send_reset_email(d)
    return {"message":"Please Check Your Email For Further Instructions.", "type":"success"}
  else:
    return {"message":"No Account Found With These Details", "type":"danger"}

def create_reset_obj(email):
  url = generate_url_safe_variable()
  encrypted = aes_encrypt(url)
  obj_e = {
      "id":encrypted,
      "token":0,
      "assigned":aes_encrypt(email)
  }
  obj_d = {
      "id":url,
      "token":0,
      "assigned":email
  }
  return {"E":obj_e, "D":obj_d}

def format_link(url):
  link = "https://wsscctennis.co.uk/api/reset_link/" + url
  return link

def format_html(url):
  link = format_link(url)
  return Template(template).safe_substitute(url_1=link)
  
def send_reset_email(reset_obj):
  me = os.environ['COMP_SHOP_EMAIL']
  you = reset_obj['assigned']
  msg = MIMEMultipart('alternative')
  msg['Subject'] = "Password Reset Request."
  msg['From'] = me
  msg['To'] = you
  text = "Please follow the link below to reset your password!"
  html = format_html(reset_obj['id'])
  part1 = MIMEText(text, 'plain')
  part2 = MIMEText(html, 'html')
  msg.attach(part1)
  msg.attach(part2)
  mail = smtplib.SMTP('smtp.gmail.com', 587)
  mail.ehlo()
  mail.starttls()
  mail.login(me, os.environ['EMAIL_PASSWORD'])
  mail.sendmail(me, you, msg.as_string())
  mail.quit()

def reset_password(token, password):
  valid_token = return_valid_tokens(token)
  email = valid_token[2]
  update_password(email, password)
  spend_token(token)

def handle_delete(username):
  try:
    delete_from_table('security', username)
    delete_from_table('users', username)
    return True
  except:
    return False