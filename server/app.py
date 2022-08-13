from flask import Flask, jsonify, request
import pymysql
import pandas as pd
app = Flask(__name__)

@app.route('/')
def index(): 
  return 'helloworld'

@app.route('/login', methods=['POST'])
def login():
  login_data = request.json
  login_email = login_data['loginEmail']
  login_password = login_data['loginPassword']
  
  login_data = get_user(login_email)
  if login_password != login_data[0][2]:
    result = {
      "code": 403,
      "message": str("일치하는 유저 정보가 없습니다.")
    }
    resp = jsonify(result)
    resp.status_code = result['code']
    return resp
  
  response = {
    'user_name' : login_data[0][1],
    'message' : str('로그인에 성공하였습니다.')
  }
  return jsonify(response), 200

@app.route('/register', methods=['POST'])
def regitster():
  register_data = request.json
  
  register_email = register_data['SingUpEmail']
  register_name = register_data['SingUpId']
  register_password = register_data['SingUpPassword']
  
  # 이메일 유효성 검사 시작
  email_data = get_user(register_email)
  if email_data != 0:
    response = {
      'message' : str('이미 등록된 E-mail 입니다.')
    }
    return jsonify(response), 403
  # 이메일 유효성 검사 끝
  
  # 유저 정보 저장
  insert_user(register_email, register_name, register_password)
  
  response = {
    'user_name' : register_name,
    'message' : str('회원가입에 성공하였습니다.')
  }
  
  return jsonify(response), 200




def get_user(email):
  db = pymysql.connect(host='localhost', port=3306, user='root', password='0000', db='order_web', charset='utf8')
  cursor = db.cursor()
  sql = '''select * from order_web.users_table where user_email like (%s) '''
  cursor.execute(sql,(email))
  result = cursor.fetchall()
  db.close()
  
  return result

def insert_user(email, name, password):
  db = pymysql.connect(host='localhost', port=3306, user='root', password='0000', db='order_web', charset='utf8')
  cursor = db.cursor()
  sql = ''' insert into order_web.users_table (user_email, user_name, user_password) values(%s, %s, %s) '''
  cursor.execute(sql,(email, name, password))
  db.commit()
  db.close()

if __name__=='__main__':
  app.run(debug=True)