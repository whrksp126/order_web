import json
from email import message
from unicodedata import category
# from models import Menu, Menu_list, R_menu_list
from flask import request, jsonify, Blueprint, send_file, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user, login_required
from menu.fun_menu import fun_call_all_menus, fun_call_menu, \
  fun_call_all_menus, fun_add_r_menu_list, fun_add_menu_list, \
  fun_call_all_menu_list, fun_add_menu, fun_delete_menu
from . import *
from werkzeug.utils import secure_filename
import os
from routes import app


bp = Blueprint("admin", __name__, url_prefix="/admin")

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
    
# 이미지 GET 호출 api 만들기
@app.route("/uploads/<path:name>")
def download_file(name):
  print(name)
  print(app.config['UPLOAD_FOLDER'])
  return send_from_directory('../' + app.config['UPLOAD_FOLDER'], name);



# 메뉴 추가
@bp.route('/add_menu', methods=['POST'])
def add_menu():
# @login_required
  if request.method == 'POST':
    # user_id = current_user.id
    f_file = request.files['file']
    f_name = request.form['name']
    f_price = request.form['price']
    f_description = request.form['description']
    f_menu_list = request.form['menu_list']
    # filename = secure_filename(f_file.filename)
    # os.makedirs(app.config['UPLOAD_FOLDER'])
    # f_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))'
    if f_file and allowed_file(f_file.filename):
      # filename = secure_filename(f_file.filename)
      os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
      f_file.save(os.path.join(app.config['UPLOAD_FOLDER'], f_file.filename))

    # json_data = json.loads(request.data)
    # name = json_data.get('name', None)
    # price = int(json_data.get('price', None))
    # img_url = json_data.get('file', None)
    # description = json_data.get("description",None)
    # menu_list = json_data.get('menu_list', None)
    
    # if len(menu_list) == 0:
    #   menu_list == None;
    
    # if len(name) > 80:
    #   return jsonify(
    #   message='메뉴명은 80자 미만입니다.', 
    #   category='error',
    #   status=404
    # )
    # elif isinstance(price, int) != True:
    #   return jsonify(
    #   message='가격은 숫자만 입력이 가능합니다.', 
    #   category='error',
    #   status=404
    # )
    # elif len(img_url) > 400:
    #  return jsonify(
    #   message='잘못된 이미지 경로입니다.', 
    #   category='error',
    #   status=404
    # ) 
    # # (리펙토링 해야하라 듯) description이 NoneType 일때 대응
    # elif description != None:
    #   if len(description) > 800 :
    #     return jsonify(
    #     message='설명은 800자 이하입니다.', 
    #     category='error',
    #     status=404
    # )
      
    # menu_id = fun_add_menu(name, price, img_url, description, user_id)
    # if menu_list != None:
    #   for list_id in menu_list:
    #     fun_add_r_menu_list(menu_id, list_id, user_id)
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
    color = json_data['color']
    name = json_data['name']
    
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
  
    fun_add_menu_list(name, description, color, user_id)
    
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


# 메뉴 삭제하기
@bp.route('/delete_menu', methods=['POST'])
@login_required
def delete_menu():
  user_id = current_user.id

  json_data = request.get_json()
  menu_id = json_data['menu_id']
  print("user_id,",user_id , "menu_id,", menu_id)
  
  fun_delete_menu(menu_id)
  return jsonify(
      message='메뉴를 삭제 하였습니다.',
      category='success',
      status=200
    )