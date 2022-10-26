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
  r_menu_list = db.relationship('R_menu_list')
  
  menu_categorys = db.relationship('Menu_categorys')

class Menu(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80), nullable=False,)
  price = db.Column(db.Integer, nullable=False)
  img_url = db.Column(db.String(400), nullable=False)
  description = db.Column(db.String(800))
  
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  
  r_menu_list = db.relationship('R_menu_list')  



class Menu_list(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(45), nullable=False)
  color = db.Column(db.String(45), nullable=False)
  description = db.Column(db.String(800))

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  
  r_menu_list = db.relationship('R_menu_list')  

class Menu_categorys(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(45), nullable=False, unique=True)
  description = db.Column(db.String(800))
  
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class R_menu_list(db.Model, UserMixin):
  __table_args__ = (db.PrimaryKeyConstraint('list_id', 'menu_id', name = 'mapping_menu_list'), )
  
  list_id = db.Column(db.Integer, db.ForeignKey('menu_list.id'))
  menu_id = db.Column(db.Integer, db.ForeignKey('menu.id'))
  
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  
  

  
