from flask import Flask, flash, request, jsonify, render_template, redirect, url_for, g, session, send_from_directory, abort
from flask_cors import CORS
from flask_api import status
from datetime import date, datetime, timedelta
from calendar import monthrange
from dateutil.parser import parse
import pytz
import os
import sys
import time
import uuid
import json
import random
import string
import pathlib
import io
from uuid import UUID
from bson.objectid import ObjectId
import re
# straight mongo access
from pymongo import MongoClient
mongo_client = MongoClient("mongodb+srv://CSYE7220_MIDTERM:CSYE7220_MIDTERM@cluster0.lxsro.mongodb.net/Uber?retryWrites=true&w=majority")

app = Flask(__name__)
CORS(app)
records=dict()
# database access layer
## insert one record
def insert_one(r):
    with mongo_client:
        db = mongo_client['Uber']
        try:
            mongo_collection = db['Uber']
            result = mongo_collection.insert_one(r)
        except Exception as e:
            print(e)

# route
@app.route("/postData",methods=["POST"])
def add_record():
    routeno = request.json['route']
    username = request.json['name']
    date = request.json['date']
    starttime = request.json['starttime']
    endtime = request.json['endtime']
    record = dict(routeno=routeno,username=username,date=date,starttime=starttime,endtime=endtime,_id=str(ObjectId()))
    records[record['_id']]=record
    insert_one(record)
    return jsonify(record)

@app.route("/getData",methods=["GET"])
def get_records():
    return jsonify(records)
@app.route("/postMany",methods=["POST"])
def add_many():
    for r in request.json:
        routeno = r['route']
        username = r['name']
        date = r['date']
        starttime = r['starttime']
        endtime = r['endtime']
        record = dict(routeno=routeno,username=username,date=date,starttime=starttime,endtime=endtime,_id=str(ObjectId()))
        records[record['_id']]=record
        insert_one(record)
    return "success"
###################
# Apply from mongo#
###################
def applyRecordLevelUpdates():
    return None
def applyCollectionLevelUpdates():
    global records
    with mongo_client:
        db = mongo_client['Uber']
        mongo_collection = db['Uber']

        cursor = mongo_collection.find({})
        recordsinDB = list(cursor)

        howmany = len(recordsinDB)
        sorted_records = sorted(recordsinDB)
        #return json.dumps({"results": sorted_records })

        for record in sorted_records:
            records[record['_id']] = record
        print('found ' + str(howmany) + ' Uber!')
##################
# ADMINISTRATION #
##################
# This runs once before the first single request
# Used to bootstrap our collections
@app.before_first_request
def before_first_request_func():
    applyCollectionLevelUpdates()

# This runs once before any request
@app.before_request
def before_request_func():
    applyRecordLevelUpdates()



if __name__ == '__main__':
    applyCollectionLevelUpdates()
    app.run(debug=True, host='0.0.0.0')
    