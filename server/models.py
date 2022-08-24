from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, Integer, String, TEXT, Enum, VARCHAR

from uuid import uuid4

from database import Base
db = SQLAlchemy()

def get_uuid():
  # uuid4().hex 는 랜덤 아이디를 16진법으로 만들겠다
  return uuid4().hex

class User(db.Model):
  __tablename__ = "users"
  id = Column(String(32), primary_key=True, unique=True, default=get_uuid)
  email = Column(String(345), unique=True)
  password = Column(TEXT, nullable=False)

class Menu_items(Base):
  __tablename__ = 'menu_items'
  id = Column(Integer, primary_key=True, unique=True, nullable=False, autoincrement=True)
  name = Column(String(45), nullable=False, unique=True)
  price = Column(Integer, nullable=False)
  img_url = Column(TEXT, nullable=False)
  description = Column(TEXT)
  
  # menu_item = Menu_items(name="김치치즈탕수육", price="22000", description="", img_url="../image_list/리얼안심탕수육_-김치치즈탕수육_1080x640.jpg", )

  # db_session.add(menu_item)
  # db_session.commit()
  # db_session.close()  
  
class Menu_list_type(Base):
  __tablename__ = 'menu_list'
  id = Column(Integer, primary_key=True, unique=True, nullable=False, autoincrement=True)
  name = Column(String(45), nullable=False, unique=True)
  
class Mategory_list(Base):
  __tablename__ = 'category_list'
  id = Column(Integer, primary_key=True, unique=True, nullable=False, autoincrement=True)
  name = Column(String(45), nullable=False, unique=True)
