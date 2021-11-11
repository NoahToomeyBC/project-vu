# Import dependencies
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import os
from sqlalchemy import create_engine, Table, MetaData
from sqlalchemy.ext.automap import automap_base
import numpy as np
from flask import Flask, render_template, url_for, redirect,flash, get_flashed_messages, jsonify, request
import json
import pandas as pd
from sqlalchemy.orm import Session
from flask import Flask

# Connect to database with flask_sqlalchemy
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQL_DATABASE_URI'] = "postgresql://postgres:piechartspassword@project-vu-database-piecharts.c7rvpt2rehpr.us-east-2.rds.amazonaws.com:5432/project_db"
# app.run(debug=True)
Base = automap_base()

# engine, suppose it has two tables 'user' and 'address' set up
engine = create_engine("postgresql://postgres:piechartspassword@project-vu-database-piecharts.c7rvpt2rehpr.us-east-2.rds.amazonaws.com:5432/project_db")

# reflect the tables
Base.prepare(engine, reflect=True)

session = Session(engine)

#This is where table classes are set up to make calling postgres DB easier
Master = Base.classes.adult_master_year
master_df = pd.read_sql_query('select * from "adult_master_year"',con=engine)
#Routes

# Home Page Route
@app.route('/')
def index():
    try:
        data = master_df.to_dict('records')
        return render_template('index.html', tableA = data)
    # This except block returns errors in html when page is loaded
    except Exception as e:
    # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.'
        return hed + error_text

# Testing route, probably bar charts
@app.route('/tables')
def tables():
    try:
        labels = session.query(Master.state).all()
        label = list(np.ravel(labels))
        values = session.query(Master.percent_adult_access).all()
        value = list(np.ravel(values))
        return render_template("tables.html", labels = label, values = value)
    # This except block returns errors in html when page is loaded
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

# Leaflet/maps chart
@app.route('/map-ami')
def maps():
    try:
        return render_template("map_ami.html")
    # This except block returns errors in html when page is loaded
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

@app.route('/map-access')
def maps():
    try:
        return render_template("map_access.html")
    # This except block returns errors in html when page is loaded
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

@app.route('/map-unmet-needs')
def maps():
    try:
        return render_template("map_unmet_needs.html")
    # This except block returns errors in html when page is loaded
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

@app.route('/map-untreated-disability')
def maps():
    try:
        return render_template("map_untreated_disability.html")
    # This except block returns errors in html when page is loaded
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text


@app.route('/map-suicidal-ideation')
def maps():
    try:
        return render_template("map_suicide.html")
    # This except block returns errors in html when page is loaded
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

# Machine learning route
@app.route('/machine-learning')
def machinelearn():
    try:
        return render_template("machine_learning.html")
    # This except block returns errors in html when page is loaded
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text




if __name__ == '__main__':
    app.run(debug=True)

