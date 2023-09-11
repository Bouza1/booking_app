import os
import psycopg2

def get_user_security(username):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("SELECT * FROM security WHERE id = %s", (username,))
  user = c.fetchone()
  conn.close()
  return user

def get_user_details(username):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("SELECT * FROM users WHERE id = %s", (username,))
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
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("INSERT INTO security (id, password) VALUES (%s, %s)", (username, hashed_password))
  conn.commit()
  conn.close()

def save_user_details(id, first_name, last_name, role):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("INSERT INTO users (id, first_name, last_name, role) VALUES (%s, %s, %s, %s)", (id, first_name, last_name, role))
  conn.commit()
  conn.close()

def get_times(date):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("SELECT * FROM calendar WHERE day = %s", (date,))
  results = c.fetchall()
  return results

def if_date_doesnt_exist(date):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("INSERT INTO calendar (day, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen) VALUES (%s, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)", (date,))
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
  sql_statement = f"UPDATE calendar SET {get_time_as_string(time)} = %s WHERE day = %s"
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  if cancel == True:
    c.execute(sql_statement,("0", date))
  else:
    c.execute(sql_statement,(username, date))
  conn.commit()
  conn.close()

def insert_reset_token(id, token, assigned):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("INSERT INTO resets (id, token, assigned) VALUES (%s, %s, %s)", (id, token, assigned))  
  conn.commit()
  conn.close()

def return_valid_tokens(id):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("SELECT * FROM resets WHERE id = %s AND token = 0", (id,))
  results = c.fetchone()
  return results

def update_password(user, password):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("UPDATE security SET password = %s WHERE id = %s",(password, user))
  conn.commit()
  conn.close()

def spend_previous_tokens(assigned):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("SELECT id FROM resets WHERE assigned = %s", (assigned,))
  tokens = c.fetchall()
  c.executemany("UPDATE resets SET token=1 WHERE id = %s", tokens)
  conn.commit()

def spend_token(token):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute("UPDATE resets SET token=1 WHERE id = %s", (token,))
  conn.commit()
  conn.close()

def return_all(table):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  select_query = f"SELECT * FROM {table};"
  c .execute(select_query)
  rows = c.fetchall()
  return rows

def delete_from_table(table, username):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  c.execute(f'DELETE FROM {table} WHERE id = %s', (username,))
  conn.commit()
  conn.close()

def reset_db():
  drop_table('resets')
  drop_table('security')
  drop_table('calendar')
  drop_table('users')

def drop_table(table):
  conn = psycopg2.connect(os.environ['DATABASE_URL'])
  c = conn.cursor()
  drop_query = f"DROP TABLE IF EXISTS {table};"
  c.execute(drop_query)
  conn.close()