import os
from dotenv import load_dotenv, find_dotenv

from flask import Flask, jsonify, request
from json import *
from flask_cors import cross_origin
import pymysql as sql

load_dotenv(find_dotenv()) #Find dotenv file

sql_host = os.environ.get("host") #Get DB credentials
sql_port = os.environ.get("port")
sql_user = os.environ.get("user")
sql_password = os.environ.get("password")
sql_database = os.environ.get("database") 

connection = None
CONNECTION_TIMEOUT = 5000

def connect_db(): #Establish Connection
    connection = sql.connect(
        host = sql_host, 
        port = int(sql_port), 
        user = sql_user, 
        password = sql_password, 
        database = sql_database, 
        connect_timeout = CONNECTION_TIMEOUT
    )
    print("Connected to Database.")
    return connection

def get_cursor(connection):
    connection.ping(reconnect=True)
    return connection.cursor()

app = Flask(__name__)

@app.route('/', methods=["GET"]) #Set Route for Reading
@cross_origin() #Allow access

def fetchAllData():
    connection = connect_db()
    cur = connection.cursor()
    getAllContacts = "SELECT * FROM contacts"
    cur.execute(getAllContacts)
    
    results = cur.fetchall()
    jsonResp = jsonify(results)
    return jsonResp

@app.route('/fetchSingleContact/<string:id>', methods=["GET"]) #Set Route for Reading
@cross_origin() #Allow access

def fetchSinglecontact(id):
    connection = connect_db()
    cur = connection.cursor()
    getContact = "SELECT * FROM contacts WHERE contact_id = %s"
    cur.execute(getContact, id)
    
    results = cur.fetchall()
    jsonResp = jsonify(results)
    return jsonResp

@app.route('/AddContact', methods= ["POST"]) #Set Route for Insertion
@cross_origin()

def insert():
    if request.method == "POST":
        contact_name = request.form['name']
        contact_number = request.form['number']

        connection = connect_db()
        cur = connection.cursor()
        insertNewContact = "INSERT INTO contacts (contact_name, contact_number) VALUES (%s, %s)"
        insertValues = (contact_name, contact_number)
        cur.execute(insertNewContact, insertValues)
        connection.commit()
        
        return "record inserted."

@app.route('/DeleteContact/<string:id>', methods= ["DELETE"]) #Set Route for Deletion
@cross_origin()
def delete(id):
    if request.method == "DELETE":
        connection = connect_db()
        cur = connection.cursor()
        deleteContact = "DELETE FROM contacts WHERE contact_id = %s"
        toDelete = id
        cur.execute(deleteContact, toDelete)
        connection.commit()

        return "record deleted."

@app.route('/EditContact/<string:id>', methods= ["PUT"]) #Set Route for Update
@cross_origin()
def update(id):
    if request.method == "PUT":
        contact_name = request.form['name']
        contact_number = request.form['number']

        connection = connect_db()
        cur = connection.cursor()
        updateContact = "UPDATE contacts SET contact_name = %s, contact_number = %s WHERE contact_id = %s"
        updateValues = (contact_name, contact_number, id)
        cur.execute(updateContact, updateValues)
        connection.commit()

        return "record updated."

if __name__ == '__main__':
    app.run(debug=True)