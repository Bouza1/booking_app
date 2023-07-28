from flask import Flask, render_template, request, redirect, url_for, session
from flask_bcrypt import Bcrypt
from utils.db import get_user_security, init_db, get_times_for_date, insert_booking_2_db, return_user_object, return_valid_tokens, update_password
from utils.user import handle_email_reset, reset_password, save_user, handle_delete
from utils.config import aes_encrypt, aes_decrypt
import os 

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config['SECRET_KEY'] = os.environ['SUPER_SECRET_KEY'].encode()

@app.route('/', methods=['GET', 'POST', 'PUT'])
def login():
  if request.method == 'POST':
    username = request.form.get('username')
    password = request.form.get('password')
    user = get_user_security(aes_encrypt(username))
    if user and bcrypt.check_password_hash(user[1], password):
      session['logged_in'] = True
      session['username'] = username
      user_obj = return_user_object(aes_encrypt(username))
      session['firstname'] = aes_decrypt(user_obj['firstname'])
      session['lastname'] = aes_decrypt(user_obj['lastname'])
      return redirect(url_for('booking'))
    else:
      return render_template('login.html', message='{"type":"danger", "title":"Login Attempt", "message":"No User Found."}')
  return render_template('login.html')


@app.route('/logout')
def logout():
  session.clear()
  return redirect(url_for('login'))


@app.route('/booking')
def booking():
  if not session.get('logged_in'):
    return redirect(url_for('login'))
  return render_template('booking.html', username=aes_encrypt(session['username']), firstname=session['firstname'])


@app.route('/register', methods=['GET', 'POST'])
def register():
  if request.method == 'POST':
    first_name = request.form.get('fname')
    last_name = request.form.get('lname')
    username = request.form.get('email')
    password = request.form.get('password')
    if get_user_security(aes_encrypt(username)):
      return render_template('register.html', message='{"type":"warning", "title":"Login Attempt", "message":"Username Already Exists!"}')
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    save_user(username, hashed_password, first_name, last_name)
    return render_template('login.html', message='{"type":"success", "title":"Account Creation",  "message":"Account Created!"}')
  return render_template('register.html')


@app.route("/api/times_booked", methods=['GET', 'PUT'])
def get_times():
  if request.is_json:
    datee = request.get_json()
    times = get_times_for_date(datee['date'])

    return {"times": times}


@app.route("/api/book_slot", methods=['GET', 'PUT'])
def book_slot():
  if request.is_json:
    booking_object = request.get_json()
    insert_booking_2_db(booking_object['date'], booking_object['time'], aes_encrypt(session['username']), booking_object['cancel'])
    return {"message": "Booked!"}


@app.route("/api/reset_email", methods=['GET', 'PUT'])
def reset_details():
  if request.is_json:
    reset_object = request.get_json()
  return handle_email_reset(reset_object['email'])


@app.route("/api/reset_link/<reset_id>", methods=['GET'])
def reset_link(reset_id):
  token = aes_encrypt(reset_id)
  if return_valid_tokens(token):
    return render_template('reset.html', token=token)
  else:
    return render_template('login.html', message='{"type":"danger", "title":"Password Reset",  "message":"Invalid Reset Token!"}')

@app.route("/api/reset_password", methods=['POST', 'GET', 'PUT'])
def change_password():
  if request.method == 'POST':
    p_word = request.form.get('password')
    token = request.form.get('token')
    password = bcrypt.generate_password_hash(p_word).decode('utf-8')
    reset_password(token, password)
    return render_template('login.html', message= '{"type":"success", "title":"Password Reset", "message":"Please Login Using Your New Password."}')
  if request.method == 'PUT':
    req = request.get_json()
    password = bcrypt.generate_password_hash(req['password']).decode('utf-8')
    try:
      update_password(aes_encrypt(session['username']), password)
      return {"type":"success", "message":"Your Password Has Been Changed."}
    except:
      return {"type":"danger", "message":"Error Processing Password Change! Please Try Again."}
  return render_template('login.html', message= '{"type":"danger", "title":"Password Reset", "message":"Error! Please Try Again"}')

@app.route("/api/delete_account", methods=["GET", "POST"])
def delete_account():
  if not session.get('logged_in'):
    return redirect(url_for('login', message= '{"type":"danger", "title":"Account Deletion", "message":"You Must Be Logged In To Request Account Deletion"}'))
  else:
    if request.method == 'POST':
      p_word = request.form.get('delete_pword')
      user = get_user_security(aes_encrypt(session['username']))
      if bcrypt.check_password_hash(user[1], p_word):
        handle_delete(aes_encrypt(session['username']))
        return render_template('login.html', message= '{"type":"danger", "title":"Account Deletion", "message":"Your Account Has Been Permanently Deleted! Please Sign Back Up If You So Wish."}')
      else:
        return render_template('booking.html', username=session['username'], firstname=session['firstname'], message= '{"type":"warning", "title":"Account Deletion", "message":"Incorrect Password Please Try Again."}')
    return {"message":"Deleted"}

if __name__ == '__main__':
  init_db()
  app.run(host='0.0.0.0', port=81)
