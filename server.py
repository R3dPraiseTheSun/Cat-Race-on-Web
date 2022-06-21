import asyncio
from asyncio.windows_events import NULL
import base64
from cmath import log
from datetime import datetime, timedelta
from socketserver import ThreadingMixIn
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import secrets
from numpy import blackman


import database.database as dbFuncs
import CatsLogic

dbFuncs.create_connection(r"database\user_records.db")
dbFuncs.create_table()

catTrackFinalTimeList = []
racingNow = False
async def setRace(delay, eventID):
	try:
		print("RACING STARTS IN ",delay," SECONDS!")
		global racingNow
		await asyncio.sleep(delay)
		racingNow = True
		print("RACING STARTS NOW ",racingNow)
		for catTrackTime in catTrackFinalTimeList:
			if(eventID == catTrackTime['eventID']):
				dbFuncs.insert_event_winner(eventID, catTrackTime['finalTime']['timeComplet'][0]['cat'])
				return catTrackTime['finalTime']
	except KeyboardInterrupt:
		print('KeyboardInterrupt')
		exit()

def getClosestEventTime():
	closestEvent = dbFuncs.get_closest_event()
	if len(closestEvent) == 0: return
	laps = closestEvent[0][3]
	eventID=closestEvent[0][0]
	date = datetime.strptime(closestEvent[0][1], "%d/%m/%Y")
	time = datetime.strptime(closestEvent[0][2], "%H:%M")
	dt1 = datetime(date.year,date.month,date.day,time.hour,time.minute,time.second)
	dt2 = datetime.now()
	timeDiff = 0
	print(dt1, dt2)
	if(dt1 > dt2):
		timeDiff = dt1-dt2 #Time until next racing event
		delay = timeDiff.total_seconds()
		returnData = {
			"catInfo":asyncio.run(setRace(delay,eventID)),
			"totalLaps":laps,
			"eventID":eventID
		}
		return returnData
	else:
		timeDiff = dt2-dt1 #Time after event has already started
		return False

class ThreadingServer(ThreadingMixIn, HTTPServer):
    pass

def make_token():
    """
    Creates a cryptographically-secure, URL-safe string
    """
    return secrets.token_urlsafe(16)  

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

		if(self.path == "/web/serverGetRacingState.py"):
			global racingNow
			catData = getClosestEventTime()
			response = {
				'catData': catData,
				'race': racingNow
			}
			racingNow = False
			json_string = json.dumps(response).encode('utf-8')
			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)

		if(self.path == "/web/serverCreateEvent.py"):
			dateData = self.data.split('&')[0][self.data.split('&')[0].index('date')+5:].replace('%2F','/')
			timeData = self.data.split('&')[1][self.data.split('&')[1].index('time')+5:].replace('%3A',':')
			lapsData = self.data.split('&')[2][self.data.split('&')[2].index('laps')+5:]
			# print(dateData, timeData, lapsData)
			eventID = dbFuncs.insert_event(dateData, timeData, lapsData)
			newCatTrack = CatsLogic.CatTrack(5,int(lapsData))
			newCatTrack.generateSpeed()
			finalTime = newCatTrack.getFinalTimes()
			catTrackData={
				'finalTime': finalTime,
				'eventID': eventID
			}
			catTrackFinalTimeList.append(catTrackData)
			print(catTrackData,catTrackFinalTimeList,sep='\n')
			response = {
				'response': 'yes'
			}
			json_string = json.dumps(response).encode('utf-8')
			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)

		if(self.path == "/web/serverGetEvents.py"):
			events = dbFuncs.get_events()
			response = {
				'eventList': events
			}
			json_string = json.dumps(response).encode('utf-8')
			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)

		if(self.path == "/web/serverGetTableData.py"):
			userID = self.data.split('UserId=')[1]
			tableData = dbFuncs.get_history_data_from_user(userID)
			response = {
				'tableData': tableData
			}
			json_string = json.dumps(response).encode('utf-8')
			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)
			
		if(self.path == "/web/serverGetBets.py"):
			userID = self.data.split('&')[0][self.data.split('&')[0].index('userID')+7:]
			betList = dbFuncs.get_bets(userID)
			catStat = []
			for bet in betList:
				catStat.append(dbFuncs.get_cat_name(bet[3]))
			response = {
				'betList': betList,
				'catName': catStat
			}
			json_string = json.dumps(response).encode('utf-8')
			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)
			
		if(self.path == "/web/serverPlaceBet.py"):
			userID = self.data.split('&')[0][self.data.split('&')[0].index('userID')+7:]
			catID = self.data.split('&')[1][self.data.split('&')[1].index('catID')+6:]
			betValue = self.data.split('&')[2][self.data.split('&')[2].index('betValue')+9:]
			eventID = self.data.split('&')[3][self.data.split('&')[3].index('eventID')+8:]
			status = dbFuncs.place_bet(userID,eventID,catID,betValue)
			response = {
				'response': status
			}
			json_string = json.dumps(response).encode('utf-8')
			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)

		if(self.path == "/web/serverContinousLogin.py"):
			cookie = self.data.split('&')[0][self.data.split('&')[0].index('cookie')+7:]
			clientID = self.data.split('&')[1][self.data.split('&')[1].index('clientID')+9:]
			check = dbFuncs.check_cookie(cookie, clientID)
			if(not check):
				self.send_response_only(404)
			else: 
				#print(check)
				loginData = {
					'user':check[0][1],
					'id':check[0][0],
					'admin':check[0][5]
				}
				json_string = json.dumps(loginData).encode('utf-8')
				self.send_response(200)
				self.send_header(
					'Content-type',
					'application/json'
				)
				self.end_headers()
				self.wfile.write(json_string)

		if(self.path == "/web/serverGetCats.py"):
			eventID = self.data.split('EventID=')[1]
			catsDataArray = dbFuncs.get_cats(eventID)
			catsData=[]
			for catsElem in catsDataArray:
				catsData.append(catsElem[0])

			# print('AYO WE GETTIN\' DA CATS YE?\n ...It is:', catsData, 'wack!')

			json_string = json.dumps(catsData).encode('utf-8')

			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)

		if(self.path == "/web/serverGetCatStats.py"):
			catStatsData = dbFuncs.get_cat_stat(self.data.split('=')[1])
			# print('AYO WE GETTIN\' DA CAT STAT YE?\n ...It is:', catStatsData, 'wack!')

			json_string = json.dumps(catStatsData).encode('utf-8')

			self.send_response(200)
			self.send_header(
				'Content-type',
				'application/json'
			)
			self.end_headers()
			self.wfile.write(json_string)

		if(self.path == "/web/serverGetBalance.py"):
			balance = dbFuncs.get_balance(self.data.split('=')[1])
			# print('AYO WE GETTIN\' BALANCE YE?\n ...It is:', balance, 'wack!')
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
			# print('AYO WE SETTIN\' BALANCE YE?',userId,'\n ...It is:', balance + int(amount), 'wack!')
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

			# print("Register: ",user, email, password)
			dbFuncs.insert_record(user, email,encodePass(password))

		if all(words in self.data for words in ["email","password"]):
			email = self.data.split('&')[0][self.data.split('&')[0].index('email')+6:]
			password = self.data.split('&')[1][self.data.split('&')[1].index('password')+9:]
			if(not dbFuncs.check_records(email,encodePass(password))): 
				# print("Failed login detected!")
				self.send_response(404)
			else: 
				sessionID = make_token()
				data = dbFuncs.check_records(email,encodePass(password))
				# print("welcome ", data[0][0], data[0][1])
				sessionID = dbFuncs.update_sessionID(sessionID, data[0][0])
				data = {
					"id" : data[0][0],
					"user" : data[0][1],
					"sessionID": sessionID,
					"admin": data[0][5]
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