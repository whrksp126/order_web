from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:
  SECRET_KEY = os.environ["SECRET_KEY"]
  SQLALCHEMY_TRACH_MODIFICATIONS = False
  SQLALCHEMY_ECHO = True
  SQLALCHEMY_DATABASE_URI = r"mysql+pymysql://root:0000@localhost:3306/rms_web"
  # SQLALCHEMY_DATABASE_URI = "mysql://root:0000@localhost:3306/rms_web"
  
  SESSION_TYPE = "redis"
  SESSION_PERMANENT = False
  SESSION_USE_SIGNER = True
  SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")