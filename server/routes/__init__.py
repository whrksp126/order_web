from flask import Flask
from config import ApplicationConfig
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app = Flask(__name__)

# 세션을 랜덤하게 만들어줌(서버를 재 시작할 경우 로그인[세션]이 풀린다.)
# app.secret_key = os.urandom(24)
# 세션을 고정된 값으로 생성한다.
app.secret_key = 'server_session'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = 'strong'

app.config.from_object(ApplicationConfig)
db = SQLAlchemy(app)
db.init_app(app)

from routes import auth, admin
app.register_blueprint(auth.bp)
app.register_blueprint(admin.bp)

db.create_all()

from models import User
from flask import jsonify


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

# 매 요청마다 실행
@app.before_request
def make_session_permanent():
  pass
  # session.permanent = True
  # 마지막 요청으로 부터 5분 후 세션이 만료됨
  # app.permanent_session_lifetime = timedelta(minutes=5)
  