from email import message
from unicodedata import category
from models import User
from flask import request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user, login_required

from . import *
bp = Blueprint("auth", __name__, url_prefix="/auth")

@login_manager.user_loader
def load_user(user_id):
  return User.query.filter_by(id=user_id).first()

# 로그인이 안된 사용자가 @login_required 데코레이터로 된 api에 접속한 경우 
# unauthorized 함수로 반환 시켜줌 
@login_manager.unauthorized_handler
def unauthorized():
  print('로그인 검증 실패')
  return jsonify(
        message='로그인 후 이용가능한 api 입니다.', 
        category='error',
        status=404
      )

@bp.route('/signUp', methods=['POST'])
def signUp():
  if request.method == 'POST':
    
    json_data = request.get_json()
    email = json_data['email']
    brand_name = json_data['brand_name']
    password = json_data['password']
    sub_password = json_data['sub_password']
    
    user = User.query.filter_by(email=email).first()
    if user:
      return jsonify(
        message='이미 유효한 이메일 정보가 있습니다.', 
        category='error',
        status=404
      )
    elif len(email) < 5:
      return jsonify(
        message='이메일 형식이 올 바르지 않습니다', 
        category='error',
        status=404
      )
    elif len(brand_name) < 2:
      return jsonify(
        message='브랜드 명의 형식이 올 바르지 않습니다', 
        category='error',
        status=404
      )
    elif password != sub_password:
      return jsonify(
        message='비밀번호가 일치하지 않습니다', 
        category='error',
        status=404
      )
    elif len(password) < 6:
      return jsonify(
        message='비밀번호는 7자 이상 입니다', 
        category='error',
        status=404
      )
    else:
      new_user = User(email=email, brand_name=brand_name, password=generate_password_hash(password, method='sha256'))      
      db.session.add(new_user)
      db.session.commit()
      db.session.close()  
      return jsonify(
        message='회원가입에 성공하였습니다.',
        category='success',
        status=200
      )
  

@bp.route('/signIn', methods=['POST'])
def login():
  if request.method == 'POST':
    print('로그인 실행됨')
        
    json_data = request.get_json()
    email = json_data['email']
    password = json_data['password']

    user = User.query.filter_by(email=email).first()
    if user:
      if check_password_hash(user.password, password):
        login_user(user, remember=True)
        return jsonify(
          message='로그인에 성공하였습니다.',
          category='success',
          status=200
        )
      else:
        return jsonify(
          message='로그인 정보가 일치하지 않습니다.',
          category='error',
          status=404
        )
    else:
      return jsonify(
        message='로그인 정보가 일치하지 않습니다.',
        category='error',
        status=404
      )  
  
  return jsonify()

@bp.route('/logout', methods=['POST'])
@login_required
def logout():
  logout_user()
  print('로그아웃이 실행됨')
  return jsonify(
        message='로그아웃에 성공 하였습니다.',
        category='success',
        status=200
      )  

@bp.route('/findId', methods=['POST'])
def findId():
  pass

@bp.route('/createNewPassword', methods=['GET', 'POST'])
def createNewPassword():
  pass