import pyodbc 
import pandas as pd

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=http://localhost/web/;'
                      'Database=user_records;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()
cursor.execute('SELECT * FROM products')

sql_query = pd.read_sql_query('''
                              select * from user_records.db.EventSchedule
                              '''
                              ,conn) # here, the 'conn' is the variable that contains your database connection information from step 2

df = pd.DataFrame(sql_query)
df.to_csv (r'C:\Users\cosmi\exported_data.csv', index = False) # place 'r' before the path name
df.to_xml (r'C:\Users\cosmi\exported_data.xml', index = False) # place 'r' before the path name