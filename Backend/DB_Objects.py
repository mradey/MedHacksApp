from sqlalchemy import Column, String, create_engine, Integer, Float, VARCHAR, ForeignKey, DATETIME, DECIMAL, BLOB, Boolean, CHAR
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from passlib.apps import custom_app_context as pwd_context

DB = declarative_base()

class User(DB):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True)
    fname = Column(VARCHAR)
    lname = Column(VARCHAR)
    email = Column(VARCHAR)
    race = Column(VARCHAR)
    sex = Column(CHAR)
    height = Column(Integer)
    weight = Column(Integer)
    age = Column(Integer)
    family_history = Column(Boolean)

class Paradigm1(DB):
    __tablename__ = "paradigm1"
    id = Column(Integer, primary_key=True, autoincrement=True)
    velocity = Column(Float) 
    acceleration = Column(Float)
    deceleration = Column(Float)
    distance = Column(Float)
    time = Column(Float)
    pointx = Column(Float)
    pointy = Column(Float)
    user_id = Column(Integer, ForeignKey('user.id'))

class Paradigm2(DB):
    __tablename__ = "paradigm2"
    id = Column(Integer, primary_key=True, autoincrement=True)
    time = Column(Float)
    distanceFromEndpoint = Column(Float)
    initialVelocity = Column(Float)
    pointx = Column(Float)
    pointy = Column(Float)
    user_id = Column(Integer, ForeignKey('user.id'))

class Paradigm3(DB):
    __tablename__ = "paradigm3"
    id = Column(Integer, primary_key=True, autoincrement=True)
    shape = Column(VARCHAR)
    user_id = Column(Integer, ForeignKey('user.id'))

class database:
    engine = create_engine('mysql+mysqlconnector://mradey13:password@localhost:3306/asdetect')
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

