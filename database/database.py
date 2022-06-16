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

        table_script = '''CREATE TABLE IF NOT EXISTS Financial(
                        ID int NOT NULL,
                        balance NUMBER(0,38)
                    );
                    '''
        cursor.executescript(table_script)
        # table_script = '''DROP TABLE Cats'''
        # cursor.executescript(table_script)
        table_script = '''CREATE TABLE IF NOT EXISTS Cats(
                ID int NOT NULL,
                NAME VARCHAR(255)
            );
            '''
        cursor.executescript(table_script)
        # table_script = '''INSERT INTO Cats(ID,NAME) VALUES(0,'Ocelot')'''
        # cursor.executescript(table_script)
        # table_script = '''INSERT INTO Cats(ID,NAME) VALUES(1,'Ragdoll')'''
        # cursor.executescript(table_script)
        # table_script = '''INSERT INTO Cats(ID,NAME) VALUES(2,'Siamese')'''
        # cursor.executescript(table_script)
        # table_script = '''INSERT INTO Cats(ID,NAME) VALUES(3,'Persian')'''
        # cursor.executescript(table_script)
        # table_script = '''INSERT INTO Cats(ID,NAME) VALUES(4,'Jellie')'''
        # cursor.executescript(table_script)
        connection.commit()

def get_cats():
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        """function to insert record inside table""" 
        catsData = cursor.execute("SELECT * FROM Cats").fetchall()
        connection.commit()
        return catsData

def update_balance(userID, newBalance):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        """function to insert record inside table""" 
        cursor.execute("UPDATE Financial SET balance=? WHERE ID==?",(newBalance, userID)).fetchall()
        connection.commit()
def get_balance(userID):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        """function to insert record inside table"""
        balance = cursor.execute("SELECT balance FROM Financial WHERE ID==?",(userID)).fetchall()
        print(balance[0][0])
        connection.commit()
        return balance[0][0]
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
            cursor.execute("INSTERT INTO Financial(ID, balance) VALUES(?, ?)",(last_id, 0)).fetchall()

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
            return correct

def fetch_records():
    """function to fetch User records"""
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User")
        data = cursor.fetchall()
        return data