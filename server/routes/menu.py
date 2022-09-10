from email import message
from unicodedata import category
from models import Menu, Menu_list, R_menu_list
from flask import request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user, login_required

from . import *
bp = Blueprint("menu", __name__, url_prefix="/menu")

# 메뉴 추가
@bp.route('/add', methods=['POST'])
@login_required
def add():
  if request.method == 'POST':
    
    json_data = request.get_json()
    name = json_data['name']
    price = int(json_data['price'])
    img_url = json_data['img_url']
    description = json_data['description']
    menu_list = json_data['menu_list']
    if menu_list == 0:
      menu_list == None;
    
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
    user_id = current_user.id
    menu_id = add_menu(name, price, img_url, description, user_id)

    if menu_list != None:
      r_menu_list(menu_id, menu_list, user_id)
    return jsonify(
      message='메뉴를 추가하였습니다.',
      category='success',
      status=200
    )

def add_menu(name, price, img_url, description, user_id):
  try:
    new_menu = Menu(
      name=name, 
      price=price, 
      img_url=img_url, 
      description=description, 
      user_id=user_id
    )
    db.session.add(new_menu)
    db.session.commit()
    menu_id = new_menu.id
    db.session.close()
    return menu_id;
  
  except Exception as e:
    print(e)
    
# 메뉴 리스트 추가
@bp.route('/call_admin_page', methods=['POST'])
@login_required
def call_admin_page():
  menus = call_menu(current_user.id)
  menu_lists = call_menu_list(current_user.id)
  r_menu_list = call_r_menu_list(current_user.id)

  # for item in r_menu_list:
  #   for menu in menus:
  #     if item['menu_id'] == menu['id']:
        
  #       for menu_list in menu_lists:
  #         menu['list_type'] = menu_list['name']
  #         menu['list_id'] = menu_list['id']

  return jsonify(
      message='모든 메뉴를 불러왔습니다.',
      category='success',
      data = menus,
      status=200
    )
    
def call_menu(user_id):
  try:
    # call_menu = Menu.query.filter_by(user_id=user_id).all()
    # menus=[]
    # for menu in call_menu:
    #   menus.append({
    #     "id": menu.id,
    #     "name": menu.name,
    #     "price": menu.price,
    #     "img_url": menu.img_url,
    #     "description": menu.description,
    #   })
    print("#################################")
    menus = R_menu_list.query.join(Menu)
    print(menus)
    return menus
  except Exception as e:
    print(e)

def call_menu_list(user_id):
  try:
    call_menu_list = Menu_list.query.filter_by(user_id=user_id).all()
    menu_list = []
    for list in call_menu_list:
      menu_list.append({
        "id": list.id,
        "name": list.name,
        "description": list.description
      })
    return menu_list
  except Exception as e:
    print(e)

def call_r_menu_list(user_id):
  try:
    call_menu_list = R_menu_list.query.filter_by(user_id=user_id).all()
    r_menu_list=[]
    for item in call_menu_list:
      r_menu_list.append({
        "list_id": item.list_id,
        "menu_id": item.menu_id
      })
      return r_menu_list
  except Exception as e:
    print(e)

# 메뉴와 메뉴리스트 매핑 테이블
def r_menu_list(menu_id, list_id, user_id):
  try:
    new_r_menu_list = R_menu_list(list_id=list_id, menu_id=menu_id, user_id=user_id)
    db.session.add(new_r_menu_list)
    db.session.commit()
    db.session.close()
  except Exception as e:
    print(e)

# 메뉴 리스트 추가
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

# 메뉴 리스트 호출
@bp.route('/read_list', methods=['POST'])
@login_required
def read_list():
  if request.method == 'POST':
    new_menu_list = Menu_list.query.filter_by(user_id=current_user.id).all()
    menu_list = [];
    for list in new_menu_list:
      menu_list.append({"name": list.name,"id": list.id})
    if menu_list:
      return jsonify(
        message='메뉴 리스트를 불러왔습니다.',
        category='success',
        data=menu_list,
        status=200
      )
    else:
      return jsonify(
        message='저장된 메뉴 리스트가 없습니다.',
        category='error',
        status=404
      )
  return jsonify()    