import base64
from cmath import log
from socketserver import ThreadingMixIn
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json

from numpy import blackman

import database.database as dbFuncs

dbFuncs.create_connection(r"database\user_records.db")
dbFuncs.create_table()

class ThreadingServer(ThreadingMixIn, HTTPServer):
    pass

def encodePass(password):
	password = password.encode('utf-8')
	password = base64.b64encode(password)
	return password

class RequestHandler(SimpleHTTPRequestHandler):
	def do_GET(self):
		myfile = self.path.split('?')[0] # After the "?" symbol not relevent here
		myfile = myfile.lstrip('/')
		print("My File is: ",myfile)
		if(myfile == 'web/' or myfile == ''):
			myfile = 'web/index.html'    # Load index file as default

		try:
			file = open(myfile,'rb') # open file , r => read , b => byte format
			response = file.read()
			file.close()

			header = 'HTTP/1.1 200 OK\n'

			if(myfile.endswith(".jpg")):
				mimetype = 'image/jpg'
			elif(myfile.endswith(".css")):
				mimetype = 'text/css'
			elif(myfile.endswith(".js")):
				mimetype = 'application/javascript'
			elif(myfile.endswith(".json")):
				mimetype = 'application/json'
			elif(myfile.endswith(".py")):
				mimetype = 'application/python'
			else:
				mimetype = 'text/html'

			header += 'Content-Type: '+str(mimetype)+'\n\n'

		except Exception as e:
			header = 'HTTP/1.1 404 Not Found\n\n'
			response = '<html><body><center><h3>Error 404: File not found</h3><p>Python HTTP Server</p></center></body></html>'.encode('utf-8')

		self.send_response(200)
		self.send_header('Content-type', str(mimetype))
		self.send_header('Content-length', len(response))
		self.end_headers()
		self.wfile.write(response)

	def do_POST(self):
		print(self.path)
		self.data = self.rfile.read(int(self.headers['Content-Length'])).decode('utf-8')
		print(self.data)

		if(self.path == "/web/serverGetCats.py"):
			catsData = dbFuncs.get_cats()
			print('AYO WE GETTIN\' DA CATS YE?\n ...It is:', catsData, 'wack!')

			json_string = json.dumps(catsData).encode('utf-8')

			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)
			
		if(self.path == "/web/serverGetBalance.py"):
			balance = dbFuncs.get_balance(self.data.split('=')[1])
			print('AYO WE GETTIN\' BALANCE YE?\n ...It is:', balance, 'wack!')
			data = {
					"balance" : balance,
			}
			json_string = json.dumps(data).encode('utf-8')

			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)
		if(self.path == "/web/serverAddBalance.py"):
			userId = self.data.split('&')[0][self.data.split('&')[0].index('UserId')+7:]
			balance = dbFuncs.get_balance(userId)
			amount = self.data.split('&')[1][self.data.split('&')[1].index('amount')+7:]
			print('AYO WE SETTIN\' BALANCE YE?',userId,'\n ...It is:', balance + int(amount), 'wack!')
			dbFuncs.update_balance(userId, balance + int(amount))

			data = {
				"response" : 'yes',
			}
			json_string = json.dumps(data).encode('utf-8')
			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)

		if all(words in self.data for words in ["user","email","password"]):
			user = self.data.split('&')[0][self.data.split('&')[0].index('user')+5:]
			email = self.data.split('&')[1][self.data.split('&')[1].index('email')+6:]
			password = self.data.split('&')[2][self.data.split('&')[2].index('password')+9:]

			print("Register: ",user, email, password)
			dbFuncs.insert_record(user, email,encodePass(password))

		if all(words in self.data for words in ["email","password"]):
			email = self.data.split('&')[0][self.data.split('&')[0].index('email')+6:]
			password = self.data.split('&')[1][self.data.split('&')[1].index('password')+9:]
			if(not dbFuncs.check_records(email,encodePass(password))): 
				print("Failed login detected!")
				self.send_response(404)
			else: 
				data = dbFuncs.check_records(email,encodePass(password))
				print("welcome ", data[0][0], data[0][1])
				data = {
					"id" : data[0][0],
					"user" : data[0][1],
				}
				json_string = json.dumps(data).encode('utf-8')

				self.send_response(200)
				self.send_header(
					'Content-type',
					'application/json'
				)
				self.end_headers()
				self.wfile.write(json_string)



try:
	ThreadingServer(('127.0.0.1', 80), RequestHandler).serve_forever()
except KeyboardInterrupt:
	print('KeyboardInterrupt')
	exit()