from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine('mysql+pymysql://root:0000@localhost:3306/order_web')

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
session = Session()

Base = declarative_base()

class Demo(Base):
  __tablename__ = 'demos'
  id = Column(Integer, primary_key=True)
  name = Column(String)
  password = Column(String)
  
Base.metadata.tables
Base.metadata.create_all(engine)

demo1 = Demo(name="helloworld", password="password")
session.add(demo1)
session.commit()
session.close()