from email import message
from unicodedata import category
from models import Menu, Menu_list
from flask import request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user, login_required

from . import *
bp = Blueprint("menu", __name__, url_prefix="/menu")


@bp.route('/add', methods=['POST'])
@login_required
def add():
  if request.method == 'POST':
    
    json_data = request.get_json()
    name = json_data['name']
    price = int(json_data['price'])
    img_url = json_data['img_url']
    description = json_data['description']
    
    if len(name) > 80:
      return jsonify(
      message='메뉴명은 80자 미만입니다.', 
      category='error',
      status=404
    )
    elif isinstance(price, int) != True:
      return jsonify(
      message='가격은 숫자만 입력이 가능합니다.', 
      category='error',
      status=404
    )
    elif len(img_url) > 400:
     return jsonify(
      message='잘못된 이미지 경로입니다.', 
      category='error',
      status=404
    ) 
    elif len(description) > 800 :
      return jsonify(
      message='설명은 800자 이하입니다.', 
      category='error',
      status=404
    )   
    try:
      new_menu = Menu(
        name=name, 
        price=price, 
        img_url=img_url, 
        description=description, 
        user_id=current_user.id
      )
      db.session.add(new_menu)
      db.session.commit()
      db.session.close()
      
      return jsonify(
        message='메뉴를 추가하였습니다.',
        category='success',
        status=200
      )
    except Exception as e:
      print(e)


@bp.route('/add_list', methods=['POST'])
@login_required
def add_list():
  if request.method == 'POST':
    
    json_data = request.get_json()
    name = json_data['name']
    description = json_data['description']
    
    if len(name) > 80:
      return jsonify(
      message='리스트명은 80자 미만입니다.', 
      category='error',
      status=404
    )
    elif len(description) > 800 :
      return jsonify(
      message='설명은 800자 이하입니다.', 
      category='error',
      status=404
    )   
    try:
      print('이쪽까지 들어옴')
      new_menu = Menu_list(
        name=name, 
        description=description, 
        user_id=current_user.id
      )
      db.session.add(new_menu)
      db.session.commit()
      db.session.close()
      
      return jsonify(
        message='리스트를 추가하였습니다.',
        category='success',
        status=200
      )
    except Exception as e:
      print(e)
