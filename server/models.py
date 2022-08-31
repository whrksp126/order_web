from sqlalchemy import create_engine
from uuid import uuid4
from app import db

def get_uuid():
  # uuid4().hex 는 랜덤 아이디를 16진법으로 만들겠다
  return uuid4().hex

class User():
  id = db.Column(db.String(32), primary_key=True)
  user_id = db.Column(db.Integer, unique=True, default=get_uuid)
  email = db.Column(db.String(345), unique=True, nullable=False)
  brand_name = db.Column(db.String(50), nullable=False)
  password = db.Column(db.String(200), nullable=False)

class Menu():
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80), nullable=False, unique=True)
  price = db.Column(db.Integer, nullable=False)
  img_url = db.Column(db.String(400), nullable=False)
  description = db.Column(db.String(2000))
  
# menu_item = Menu_items(name="김치치즈탕수육", price="22000", description="", img_url="../image_list/리얼안심탕수육_-김치치즈탕수육_1080x640.jpg", )

# db_session.add(menu_item)
# db_session.commit()
# db_session.close()  
  
class Menu_list():
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(45), nullable=False, unique=True)


class Category_list():
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(45), nullable=False, unique=True)

  
