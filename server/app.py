from flask import Flask, jsonify, request
app = Flask(__name__)


@app.route('/')
def index(): 
  return 'helloworld'

@app.route('/user/<username>')
def show_user_profile(username):
  # 해당 사용자의 사용자 프로필 표시
  return 'User %s' % username

@app.route('/post/<int:post_id>')
def show_post(post_id):
  # 주어진 id와 함께 게시물을 보여줍니다, id는 정수입니다.
  return 'Post %d' % post_id

@app.route('/login', methods=['POST'])
def login():
  login_data = request.json
  if login_data['loginId'] != 'test' or login_data['loginPassword'] != 'testtest':
    result = {
      "code": 403,
      "message": str("일치하는 유저 정보가 없습니다.")
    }
    resp = jsonify(result)
    resp.status_code = result['code']
    return resp
    
  response = {
    'user_id' : login_data['loginId'],
    'user_password' : login_data['loginPassword'],
  }
  
  return jsonify(response), 200

# @app.route('/sign-up', methods=['POST'])
# def sign_up():
#   user = request.json
#   response = {
#     'name': user['name'],
#     'email': user['email'],
#     'password': user['password'],
#     'profile': user['profile']
#   }
#   return jsonify(response), 200

if __name__=='__main__':
  app.run(debug=True)