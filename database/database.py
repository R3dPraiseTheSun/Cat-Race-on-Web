from asyncio.windows_events import NULL
from cmath import log
from datetime import datetime
from pickle import FALSE, TRUE
import sqlite3
from mimetypes import init
from sqlite3 import connect
from sqlite3 import Error
from sqlite3.dbapi2 import Cursor
import os,json
from numpy import equal

from requests import session

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
                        Password VARCHAR(150),
                        admin int
                    );
                    '''
        cursor.executescript(table_script)

        # table_script = '''ALTER TABLE User ADD session_id varchar(255)'''
        # cursor.executescript(table_script)

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
        table_script = '''CREATE TABLE IF NOT EXISTS CatStats(
                ID int NOT NULL,
                RESULT VARCHAR(10)
            );
            '''
        cursor.executescript(table_script)
        #Event Table
        table_script = '''CREATE TABLE IF NOT EXISTS EventSchedule(
            ID int NOT NULL,
            event_date DATE NOT NULL,
            event_start_time TIME (0) NOT NULL,
            number_of_laps int
        );
        '''
        cursor.executescript(table_script)

        #Cat Competitors
        table_script = '''CREATE TABLE IF NOT EXISTS CatAttendance(
            cat_id int NOT NULL,
            event_id int NOT NULL
        );
        '''
        #Bets Table

        # table_script = '''DROP TABLE UsersBets'''
        # cursor.executescript(table_script)

        table_script = '''CREATE TABLE IF NOT EXISTS UsersBets(
            ID int NOT NULL,
            event_id int NOT NULL,
            client_id int NOT NULL,
            cat_id int NOT NULL,
            bet_date DATE NOT NULL,
            bet_time TIME (0) NOT NULL,
            bet_size int NOT NULL
        );
        '''
        cursor.executescript(table_script)

        table_script = '''CREATE TABLE IF NOT EXISTS EventWinners(
            event_id int NOT NULL PRIMARY KEY,
            cat_id int NOT NULL
        );
        '''
        cursor.executescript(table_script)
        connection.commit()

def get_cats(eventID):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        catIds = cursor.execute("SELECT cat_id FROM CatAttendance WHERE event_id==?",(eventID,)).fetchall()
        """function to insert record inside table""" 
        catsData = []
        for catId in catIds:
            catsData.append(cursor.execute("SELECT * FROM Cats WHERE ID==?",(catId[0], )).fetchall())
        connection.commit()
        return catsData

def get_cat_name(catId):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        """function to insert record inside table""" 
        catName = cursor.execute("SELECT * FROM Cats WHERE ID==?",(catId, )).fetchall()
        connection.commit()
        return catName

def get_cat_stat(catId):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        """function to insert record inside table""" 
        catStatData = cursor.execute("SELECT * FROM CatStats WHERE ID==?",(catId, )).fetchall()
        connection.commit()
        return catStatData

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

def update_sessionID(sessionID, clientID):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        currentSessionID = cursor.execute("SELECT session_id from User WHERE ID==?",(clientID, )).fetchall()
        if not currentSessionID:
            cursor.execute("UPDATE User SET session_id=? WHERE ID==?", (sessionID, clientID))
            return sessionID
        return currentSessionID[0][0]

def check_cookie(givenSessionID, clientID):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        sessionIDFromClient = cursor.execute("SELECT session_id from User WHERE ID==?",(clientID, )).fetchall()
        if givenSessionID == sessionIDFromClient[0][0]:
            return cursor.execute("SELECT * from User WHERE ID==?",(clientID, )).fetchall()
        return FALSE

def insert_record(fullname, email, password):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        """function to insert record inside table"""
        available = cursor.execute("SELECT * FROM User WHERE Email==?",(email, )).fetchall()
        if not available:
            last_id = cursor.execute("SELECT * FROM User ORDER BY ID DESC LIMIT 1").fetchall()
            if not last_id: last_id = 0
            else: last_id = last_id[0][0] + 1
            cursor.execute("INSERT INTO User(ID, Username, Email, Password, admin) VALUES(?, ?, ?, ?, 0)", (last_id, fullname, email, password))
            data ={
                "email":email,
                "name":fullname
            }
            cursor.execute("INSERT INTO Financial(ID, balance) VALUES(?, ?)",(last_id, 0)).fetchall()

            # try:
            #     os.mkdir('./users')
            # except OSError as error:
            #     print(error)
            # userPath = './users/user_catalog.json'
            # print(userPath)
            # with open(userPath, 'a', encoding='utf-8') as f:
            #     json.dump(data, f)
            #     f.write('\n') 
            connection.commit()
        else: connection.commit()

def check_records(email, password):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        correct = cursor.execute("SELECT * FROM User WHERE Email == ? AND Password == ?",(email,password)).fetchall()
        if not correct: 
            connection.commit()
            return 0
        else:
            connection.commit()
            return correct

def fetch_records():
    """function to fetch User records"""
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User")
        data = cursor.fetchall()
        connection.commit()
        return data

def place_bet(userID,eventID,catID,betValue):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        userBalance = cursor.execute("SELECT balance FROM Financial WHERE ID==?",(userID,)).fetchall()
        if int(betValue) < userBalance[0][0]:
            cursor.execute("UPDATE Financial SET balance=? WHERE ID==?", (userBalance[0][0] - int(betValue), userID))
            last_id = cursor.execute("SELECT * FROM UsersBets ORDER BY ID DESC LIMIT 1").fetchall()
            if not last_id: last_id = 0
            else: last_id = last_id[0][0] + 1
            betTime = datetime.now().strftime("%H:%M:%S")
            betDate = datetime.now().date().strftime("%d/%m/%Y")
            cursor.execute("INSERT INTO UsersBets(ID, event_id, client_id, cat_id, bet_date, bet_time, bet_size) VALUES(?,?,?,?,?,?,?)",(last_id, eventID, userID, catID, betDate, betTime, betValue)).fetchall()
            connection.commit()
            return True
        return False
def get_bets(userID):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        betList = cursor.execute("SELECT * FROM UsersBets WHERE client_id==?",(userID)).fetchall()
        return betList

def get_events():
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        events = cursor.execute("SELECT * FROM EventSchedule").fetchall()
        return events

def insert_event(date, startTime, lapsData):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        last_id = cursor.execute("SELECT * FROM EventSchedule ORDER BY ID DESC LIMIT 1").fetchall()
        if not last_id: last_id = 0
        else: last_id = last_id[0][0] + 1

        #Add all cats to newly added event
        cursor.execute("INSERT INTO EventSchedule(ID, event_date, event_start_time, number_of_laps) VALUES(?,?,?,?)",(last_id, date, startTime, lapsData)).fetchall()
        cursor.execute("INSERT INTO CatAttendance(cat_id,event_id) VALUES(0,?)",(last_id, )).fetchall()
        cursor.execute("INSERT INTO CatAttendance(cat_id,event_id) VALUES(1,?)",(last_id, )).fetchall()
        cursor.execute("INSERT INTO CatAttendance(cat_id,event_id) VALUES(2,?)",(last_id, )).fetchall()
        cursor.execute("INSERT INTO CatAttendance(cat_id,event_id) VALUES(3,?)",(last_id, )).fetchall()
        cursor.execute("INSERT INTO CatAttendance(cat_id,event_id) VALUES(4,?)",(last_id, )).fetchall()

        connection.commit()
        return last_id


def get_history_data_from_user(userID):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        return cursor.execute('''SELECT event_id, Cats.name, bet_size, bet_date, bet_time  FROM UsersBets JOIN
        EventSchedule ON UsersBets.event_id=EventSchedule.ID JOIN
        Cats ON UsersBets.cat_id=Cats.ID WHERE client_id==?;''',
        (userID, )).fetchall()

def get_closest_event():
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        return cursor.execute("SELECT * FROM EventSchedule WHERE event_date >= strftime('%d/%m/%Y', datetime('now', 'localtime')) AND event_start_time > strftime('%H:%M', datetime('now', 'localtime')) ORDER BY event_date, event_start_time").fetchall()

def insert_event_winner(eventID, catID):
    with sqlite3.connect(DB_NAME) as connection:
        cursor = connection.cursor()
        try:
            cursor.execute("INSERT INTO EventWinners(event_id,cat_id) VALUES(?,?)", (eventID,catID)).fetchall()
            connection.commit()
        except:
            connection.commit()

