from sqlalchemy import Column, String, create_engine, Integer, VARCHAR, ForeignKey, DATETIME, DECIMAL, BLOB, Boolean, CHAR
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

class database:
    engine = create_engine('mysql+mysqlconnector://mradey13:password@localhost:3306/asdetect')
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

