from email import message
from unicodedata import category
# from models import Menu, Menu_list, R_menu_list
from flask import request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user, login_required
from menu.fun_menu import fun_call_all_menus, fun_call_menu, fun_call_all_menus, fun_add_r_menu_list, fun_add_menu_list, fun_call_all_menu_list

from . import *
bp = Blueprint("admin", __name__, url_prefix="/admin")

# 메뉴 추가
@bp.route('/add_menu', methods=['POST'])
@login_required
def add_menu():
  if request.method == 'POST':
    user_id = current_user.id
    
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
      
    menu_id = fun_add_menu(name, price, img_url, description, user_id)

    if menu_list != None:
      fun_add_r_menu_list(menu_id, menu_list, user_id)
    return jsonify(
      message='메뉴를 추가하였습니다.',
      category='success',
      status=200
    )

# 메뉴 리스트 추가
@bp.route('/add_list', methods=['POST'])
@login_required
def add_list():
  if request.method == 'POST':
    user_id = current_user.id
    
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
    fun_add_menu_list(name, description, user_id)
    
    return jsonify(
      message='리스트를 추가하였습니다.',
      category='success',
      status=200
    )
    
    
# 페이지 로딩시 모든 리스트 호출 하기
@bp.route('/call_all', methods=['POST'])
@login_required
def menu_management_page():
  user_id = current_user.id
  menus_lists = fun_call_all_menus(user_id)
  menu = fun_call_menu(user_id)
  menu_list = fun_call_all_menu_list(user_id)
  return jsonify(
      message='모든 메뉴를 불러왔습니다.',
      category='success',
      menu=menu,
      menu_list=menu_list,
      menus_lists=menus_lists,
      status=200
    )
