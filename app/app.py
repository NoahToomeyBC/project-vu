# Import dependencies
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import os
from sqlalchemy import create_engine, Table, MetaData
from sqlalchemy.ext.automap import automap_base
import numpy as np
from flask import Flask, render_template, url_for, redirect,flash, get_flashed_messages, jsonify
from sqlalchemy.orm import Session

# Connect to database with flask_sqlalchemy
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.run(debug=True)


Base = automap_base()

# engine, suppose it has two tables 'user' and 'address' set up
engine = create_engine("postgresql://postgres:piechartspassword@project-vu-database-piecharts.c7rvpt2rehpr.us-east-2.rds.amazonaws.com:5432/project_db")

# reflect the tables
Base.prepare(engine, reflect=True)


session = Session(engine)

#routes

Master = Base.classes.master_bystate_table

@app.route('/')
def vis():
    try:
        labels = session.query(Master.State).all()
        label = list(np.ravel(labels))
        values = session.query(Master.Rank_adult_access_2019).all()
        value = list(np.ravel(values))
        return render_template("index2.html", labels = label, values = value)
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text
if __name__ == '__main__':
    app.run(debug=True)

