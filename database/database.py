from asyncio.windows_events import NULL
from cmath import log
import sqlite3
from mimetypes import init
from sqlite3 import connect
from sqlite3 import Error
from sqlite3.dbapi2 import Cursor
import os,json

DB_NAME = r"database\user_records.db"
def create_connection(db_file):
    """ create a database connection to a SQLite database """
    connection = None
    try:
        connection = sqlite3.connect(db_file)
        print(sqlite3.version)
        #print(DB_NAME, db_file)
    except Error as e:
        print(e)
    finally:
        if connection:
            connection.commit()

def create_table():
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        """function to create table inside database"""
        # create table user inside database if not exists
        table_script = '''CREATE TABLE IF NOT EXISTS User(
                        ID int NOT NULL,
                        Username VARCHAR(255),
                        Email VARCHAR(255) NOT NULL,
                        Password VARCHAR(150)
                    );
                    '''
        cursor.executescript(table_script)
        connection.commit()

def insert_record(fullname, email, password):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        """function to insert record inside table"""
        available = cursor.execute("SELECT * FROM User WHERE Email==?",(email, )).fetchall()
        if not available:
            last_id = cursor.execute("SELECT * FROM User ORDER BY ID DESC LIMIT 1").fetchall()
            if not last_id: last_id = 0
            else: last_id = last_id[0][0] + 1
            cursor.execute("INSERT INTO User(ID, Username, Email, Password) VALUES(?, ?, ?, ?)", (last_id, fullname, email, password))
            data ={
                "email":email,
                "name":fullname
            }

            try:
                os.mkdir('./users')
            except OSError as error:
                print(error)
            userPath = './users/user_catalog.json'
            print(userPath)
            with open(userPath, 'a', encoding='utf-8') as f:
                json.dump(data, f)
                f.write('\n') 
            connection.commit()
        else: connection.commit()

def check_records(email, password):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        correct = cursor.execute("SELECT * FROM User WHERE Email == ? AND Password == ?",(email,password)).fetchall()
        if not correct: return 0
        else:
            return correct[0][1]

def fetch_records():
    """function to fetch User records"""
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User")
        data = cursor.fetchall()
        return data