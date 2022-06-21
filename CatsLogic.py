import random
from numpy import sort

class CatTrack:
	numberOCats = 0
	numberOLaps = 0
	speedOCats = []
	def __init__(self, cats, laps):
		self.numberOCats = cats
		self.numberOLaps = laps

	def generateSpeed(self):
		for cat in range(self.numberOCats):
			for lap in range(self.numberOLaps):
				speed = random.uniform(1,5)
				obj = {
					"cat":cat,
					"lap":lap,
					"speed":speed,
					"lapTime":10/speed
				}
				self.speedOCats.append(obj)
	
	def getFinalTimes(self):
		timeToCompleteCats = []
		lapTimes = []
		for cat in range(self.numberOCats):
			timeToComplete = 0
			for catData in self.speedOCats:
				if catData['cat']==cat:
					catLapTime={
						'cat':cat,
						'lapTime':catData['lapTime']
					}
					lapTimes.append(catLapTime)
					timeToComplete += catData['lapTime']
			catFinishTime = {
				'cat':cat,
				'finalTime':timeToComplete
			}
			timeToCompleteCats.append(catFinishTime)

		timeToCompleteCats.sort(key=lambda x: x['finalTime'])
		result = {
			"timeComplet":timeToCompleteCats,
			"lapTimesData":lapTimes
		}
		return result

# objTrack = CatTrack(5,5)
# objTrack.generateSpeed()
# finalist = objTrack.getFinalTimes()
# print(finalist.get('timeComplet'),finalist.get('timeComplet')[0]['cat'])