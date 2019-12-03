from pymongo import MongoClient

DATABASE = MongoClient()['students']
DEBUG = True
client = MongoClient('localhost', 27017)
