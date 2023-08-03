import sqlite3
import os
from utils.config import aes_decrypt

DATABASE = aes_decrypt(os.environ['DB_LOC'])

def init_db():
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute('''CREATE TABLE IF NOT EXISTS security
  (id TEXT PRIMARY KEY,
  password TEXT NOT NULL)''')
  c.execute('''CREATE TABLE IF NOT EXISTS users
  (id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL)''')
  c.execute('''CREATE TABLE IF NOT EXISTS calender
  (id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  seven TEXT NOT NULL,
  eight TEXT NOT NULL,
  nine TEXT NOT NULL,               
  ten TEXT NOT NULL,
  eleven TEXT NOT NULL,               
  twelve TEXT NOT NULL,
  thirteen TEXT NOT NULL,               
  fourteen TEXT NOT NULL,
  fifteen TEXT NOT NULL,               
  sixteen TEXT NOT NULL,
  seventeen TEXT NOT NULL,
  eighteen TEXT NOT NULL,
  nineteen TEXT NOT NULL)''')
  c.execute('''CREATE TABLE IF NOT EXISTS resets
  (id TEXT PRIMARY KEY,
  token TEXT NOT NULL,
  assigned TEXT NOT NULL)''')
  conn.commit()
  conn.close()

def reset_db():
  drop_table('resets')
  drop_table('security')
  drop_table('calender')
  drop_table('users')
  init_db()

def drop_table(table):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  drop_query = f"DROP TABLE IF EXISTS {table};"
  c.execute(drop_query)
  conn.close()

def get_user_security(username):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute("SELECT * FROM security WHERE id=?", (username,))
  user = c.fetchone()
  conn.close()
  print(user)
  return user

def get_user_details(username):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute("SELECT * FROM users WHERE id=?", (username,))
  user = c.fetchone()
  conn.close()
  return user

def return_user_object(username):
  user = get_user_details(username)
  user_obj = {
    "firstname":user[1],
    "lastname":user[2],
    "role":user[3]
  }
  return user_obj

def save_user_security(username, hashed_password):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute("INSERT INTO security (id, password) VALUES (?, ?)", (username, hashed_password))
  conn.commit()
  conn.close()

def save_user_details(id, first_name, last_name, role):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute("INSERT INTO users (id, first_name, last_name, role) VALUES (?, ?, ?, ?)", (id,first_name, last_name, role))
  conn.commit()
  conn.close()

def get_times(date):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute("SELECT * FROM calender WHERE date = ?", (date,))
  results = c.fetchall()
  return results

def if_date_doesnt_exist(date):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute("INSERT INTO calender (date, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen) VALUES (?, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)", (date,))
  conn.commit()
  conn.close()

def get_times_for_date(date):
  results = get_times(date)
  if results == []:
    if_date_doesnt_exist(date)
    return get_times(date)
  else:
    return results

def get_time_as_string(time):
  big_time_obj = {
    "7":"seven",
    "8":"eight",
    "9":"nine",
    "10":"ten",
    "11":"eleven",
    "12":"twelve",
    "13":"thirteen",
    "14":"fourteen",
    "15":"fifteen",
    "16":"sixteen",
    "17":"seventeen",
    "18":"eighteen",
    "19":"nineteen"
  }
  return big_time_obj[time]

def insert_booking_2_db(date, time, username, cancel):
  sql_statement = f"UPDATE calender SET {get_time_as_string(time)} = ? WHERE date = ?"
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  if cancel == True:
    c.execute(sql_statement,("0", date))
  else:
    c.execute(sql_statement,(username, date))
  conn.commit()
  conn.close()

def insert_reset_token(id, token, assigned):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute("INSERT INTO resets (id, token, assigned) VALUES (?, ?, ?)", (id, token, assigned))  
  conn.commit()
  conn.close()

def return_valid_tokens(id):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute("SELECT * FROM resets WHERE id = (?) AND token = 0", (id,))
  results = c.fetchone()
  return results

def update_password(user, password):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute("UPDATE security SET password = (?) WHERE id = (?)",(password, user))
  conn.commit()
  conn.close()

def spend_previous_tokens(assigned):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c .execute("SELECT id FROM resets WHERE assigned=?", (assigned,))
  tokens = c.fetchall()
  c.executemany("UPDATE resets SET token=1 WHERE id=?", tokens)
  conn.commit()

def spend_token(token):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute("UPDATE resets SET token=1 WHERE id = (?)", (token,))
  conn.commit()
  conn.close()

def return_all(table):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  select_query = f"SELECT * FROM {table};"
  c .execute(select_query)
  rows = c.fetchall()
  return rows

def delete_from_table(table, username):
  conn = sqlite3.connect(DATABASE)
  c = conn.cursor()
  c.execute(f'DELETE FROM {table} WHERE id = ?', (username,))
  conn.commit()
  conn.close()

