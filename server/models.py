from uuid import uuid4
from routes import db
from flask_login import UserMixin

def get_uuid():
  # uuid4().hex 는 랜덤 아이디를 16진법으로 만들겠다
  return uuid4().hex

class User(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  # user_id = db.Column(db.String(255), unique=True, default=get_uuid)
  email = db.Column(db.String(345), unique=True, nullable=False)
  brand_name = db.Column(db.String(50), nullable=False)
  password = db.Column(db.String(255), nullable=False)
  
  menus = db.relationship('Menu')
  menu_list = db.relationship('Menu_list')
  menu_categorys = db.relationship('Menu_categorys')

class Menu(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80), nullable=False, unique=True)
  price = db.Column(db.Integer, nullable=False)
  img_url = db.Column(db.String(400), nullable=False)
  description = db.Column(db.String(800))
  
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  
  r_menu_list = db.relationship('R_menu_list')  

  
# menu_item = Menu_items(name="김치치즈탕수육", price="22000", description="", img_url="../image_list/리얼안심탕수육_-김치치즈탕수육_1080x640.jpg", )

# db_session.add(menu_item)
# db_session.commit()
# db_session.close()  
  
class Menu_list(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(45), nullable=False, unique=True)
  description = db.Column(db.String(800))

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  
  r_menu_list = db.relationship('R_menu_list')  

class Menu_categorys(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(45), nullable=False, unique=True)
  description = db.Column(db.String(800))
  
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class R_menu_list(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  list_id = db.Column(db.Integer, db.ForeignKey('menu_list.id'))
  menu_id = db.Column(db.Integer, db.ForeignKey('menu.id'))

  
