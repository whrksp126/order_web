from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine('mysql+pymysql://root:0000@localhost:3306/order_web')

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db_session = Session()

Base = declarative_base()
  
Base.metadata.tables
Base.metadata.create_all(engine)

