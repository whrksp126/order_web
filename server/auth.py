import app
from models import User
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

@app.route('/signUp', methods=['GET, POST'])
def signUp():
  print('signUp실행됨')
  if request.method == 'POST':
    print('POST실행됨')
    
    email = request.form.get('email')
    brand_name = request.form.get('brand_name')
    password = request.form.get('password')
    sub_password = request.form.get('sub_password')
    
    if len(email) < 5:
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
      new_user = User(
        email=email, 
        password=generate_password_hash(password, method='sha256'), 
        brand_name=brand_name
      )
      
      db.session.add(new_user)
      db.session.commit()
      db.session.close()  
      
      return jsonify(
        message='회원가입에 성공하였습니다.',
        category='success',
        status=200
      )
  

@app.route('/login', methods=['GET', 'POST'])
def login():
  pass

@app.route('/logout', methods=['GET', 'POST'])
def logout():
  pass

@app.route('/findId', methods=['GET', 'POST'])
def findId():
  pass

@app.route('/createNewPassword', methods=['GET', 'POST'])
def createNewPassword():
  pass