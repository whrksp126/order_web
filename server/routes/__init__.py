from flask import Flask
from config import ApplicationConfig
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user, current_user, logout_user, login_required, LoginManager

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

from routes import auth
app.register_blueprint(auth.bp)

db.create_all()