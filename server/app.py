# // 로그인 후 -> 서버는 "session_id"라는 쿠키를 설정합니다.
# // 클라이언트가 요청할 때마다 -> 서버가 해당 세션 session_id를 수신합니다.
# // 서버는 세션 ID를 참조하는 모든 세션을 확인합니다.
# // 해당 ID의 세션이 있으면 인증됩니다.

from array import array
from flask import Flask, jsonify, request, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Menu_type_list
from datetime import timedelta
from models import Menu_items
from database import db_session
app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
server_session = Session(app)
db.init_app(app)

with app.app_context():
  db.create_all()

@app.route("/@me")
def get_current_user():
  user_id = session.get("user_id")
  if not user_id:
    return jsonify({"error": "Unauthorized"}), 401
  
  user = User.query.filter_by(id=user_id).first()
  return jsonify({
    "id": user.id,
    "email": user.email
  })

@app.route("/menu_items", methods=["POST"])
def menu_items():
  try:
    menu_items = db_session.query(Menu_items).all()
    if menu_items:
      array = []
      for menu in menu_items:
        data = {
          "id": menu.id,
          "name": menu.name,
          "price": menu.price,
          "img_url" : menu.img_url,
          "description": menu.description,
        }
        array.append(data)
      return jsonify(array)
  except:
    db_session.rollback()
    
    

@app.route("/menu_list", methods=["POST"])
def menu_list():
  try:
    menu_list = db_session.query(Menu_type_list).all()
    if menu_list:
      array = [];
      for list in menu_list:
        data = {
          "id" : list.id,
          "name" : list.name
        }
        array.append(data)
      return jsonify(array)
  except:
    db_session.rollback()

@app.route("/delete_menu_list", methods=["POST"])
def delete_menu_list():
  try:
    menu_list_id = request.json["menu_list_id"]
    menu_list_query = db_session.query(Menu_type_list).get(menu_list_id)
    db_session.delete(menu_list_query)
    db_session.commit()
    db_session.close()
    return jsonify({
      'menu_list_id': menu_list_id,
    })
  except:
    db_session.rollback()
  


@app.route("/add_menu_list", methods=["POST"])
def add_menu_list():
  list_name = request.json["list_name"]
  try:
    menu_type_list = Menu_type_list(name=list_name)
    db_session.add(menu_type_list)
    db_session.commit()
    db_session.close()  
    return jsonify({
      "list_name" : list_name
    })    
  except:
    db_session.rollback()
    db_session.close()  

    

@app.route("/register", methods=["POST"])
def register_user():
  email = request.json["email"]
  password = request.json["password"]
  
  # 이메일 유효성 검사 시작
  user_exists = User.query.filter_by(email=email).first() is not None
  if user_exists:
    return jsonify({"error": "이미 등록된 이메일 입니다."}), 409
  # 이메일 유효성 검사 끝
  
  hashed_password = bcrypt.generate_password_hash(password)
  new_user = User(email=email, password=hashed_password)
  db.session.add(new_user)
  db.session.commit()
  
  session["user_id"] = new_user.id
  
  return jsonify({
    "id": new_user.id,
    "email": new_user.email
  })
  
@app.route("/login", methods=["POST"])
def login_user():
  email = request.json['email']
  password = request.json['password']
  
  # user = User.query.filter_by(email=email).first()
  user = db_session.query(User).filter(User.email == email).first()
  # 이메일 유효성 검사 시작
  if user is None:
    return jsonify({"error": "일치하는 유저 정보가 없습니다."}), 401
  # 이메일 유효성 검사 끝
  
  # 비밀번호 일치 검사 시작
  if not bcrypt.check_password_hash(user.password, password):
    return jsonify({"error": "일치하는 유저 정보가 없습니다."}), 401
  # 비밀번호 일치 검사 끝
  
  # user_id를 이용하여 세션만들기
  session["user_id"] = user.id
  
  return jsonify({
    "id": user.id,
    "email": user.email
  })
  
@app.route("/logout", methods=["POST"])
def logout_user():
  session.pop("user_id")
  return "200"

# 매 요청마다 실행
@app.before_request
def make_session_permanent():
  session.permanent = True
  # 마지막 요청으로 부터 5분 후 세션이 만료됨
  # app.permanent_session_lifetime = timedelta(minutes=5)
  
if __name__=='__main__':
  app.run(debug=True)


  
  
# @app.route('/')
# def index(): 
#   return 'helloworld'

# @app.route('/login', methods=['POST'])
# def login():
#   login_data = request.json
#   login_email = login_data['loginEmail']
#   login_password = login_data['loginPassword']
  
#   login_data = get_user(login_email)
#   if login_password != login_data[0][2]:
#     result = {
#       "code": 403,
#       "message": str("일치하는 유저 정보가 없습니다.")
#     }
#     resp = jsonify(result)
#     resp.status_code = result['code']
#     return resp
  
#   response = {
#     'user_name' : login_data[0][1],
#     'message' : str('로그인에 성공하였습니다.')
#   }
#   return jsonify(response), 200

# @app.route('/register', methods=['POST'])
# def regitster():
#   register_data = request.json
  
#   register_email = register_data['SingUpEmail']
#   register_name = register_data['SingUpId']
#   register_password = register_data['SingUpPassword']
  
#   # 이메일 유효성 검사 시작
#   email_data = get_user(register_email)
#   if email_data != 0:
#     response = {
#       'message' : str('이미 등록된 E-mail 입니다.')
#     }
#     return jsonify(response), 403
#   # 이메일 유효성 검사 끝
  
#   # 유저 정보 저장
#   insert_user(register_email, register_name, register_password)
  
#   response = {
#     'user_name' : register_name,
#     'message' : str('회원가입에 성공하였습니다.')
#   }
  
#   return jsonify(response), 200




# def get_user(email):
#   db = pymysql.connect(host='localhost', port=3306, user='root', password='0000', db='order_web', charset='utf8')
#   cursor = db.cursor()
#   sql = '''select * from order_web.users_table where user_email like (%s) '''
#   cursor.execute(sql,(email))
#   result = cursor.fetchall()
#   db.close()
  
#   return result

# def insert_user(email, name, password):
#   db = pymysql.connect(host='localhost', port=3306, user='root', password='0000', db='order_web', charset='utf8')
#   cursor = db.cursor()
#   sql = ''' insert into order_web.users_table (user_email, user_name, user_password) values(%s, %s, %s) '''
#   cursor.execute(sql,(email, name, password))
#   db.commit()
#   db.close()
