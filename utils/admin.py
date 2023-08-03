from utils.db_handler import return_all
import pandas as pd
import os
import zipfile

def return_db_object():
  return {
    "security": create_dataframe(return_all('security')),
    "users": create_dataframe(return_all('users')),
    "calender": create_dataframe(return_all('calender')),
    "resets": create_dataframe(return_all('resets'))
  }

def create_dataframe(db_object):
  df = pd.DataFrame(db_object)
  return df

def loop_dataframes(dataframes, site_root):
    for table, frame in dataframes.items():
      write_2_csv(site_root, table, frame)


def output_backup(site_root):
  try:
    loop_dataframes(return_db_object(), site_root)
    return True
  except:
    return False

def write_2_csv(site_root, table, frame):
  sheetname = table +".csv"
  csv_url = os.path.join(site_root, 'data/temp', sheetname)
  frame.to_csv(csv_url, index=False, header=False)
  
def zip_folder(site_root):
  zip_file_name = os.path.join(site_root, 'data', 'temp.zip')
  folder_name = os.path.join(site_root, 'data', 'temp')
  with zipfile.ZipFile(zip_file_name, 'w') as zipf:
    for root, dirs, files in os.walk(folder_name):
      for file in files:
        zipf.write(os.path.join(root, file), arcname=file)
  return zip_file_name

def wipe_docs(site_root):
  zip_file_name = os.path.join(site_root, 'data', 'temp.zip')
  os.remove(zip_file_name)
  docs = ['security', 'users', 'calender', 'resets']
  for doc in docs:
    csv = doc + ".csv"
    csv_url = os.path.join(site_root, 'data/temp', csv)
    os.remove(csv_url)
