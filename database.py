from typing import Text
from sqlalchemy import create_engine, Column, Integer, String, Text, Enum
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine('mysql+pymysql://root:0000@localhost:3306/order_web')

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
session = Session()

Base = declarative_base()

class menu_items(Base):
  __tablename__ = 'menu_items'
  id = Column(Integer, primary_key=True, unique=True, nullable=False, autoincrement=True)
  name = Column(String(45), nullable=False, unique=True)
  price = Column(Integer, nullable=False)
  img_url = Column(Text)
  description = Column(Text)
  list_type = Column()
  category = Column()
  
class menu_list_type(Base):
  __tablename__ = 'menu_list_type'
  id = Column(Integer, primary_key=True, unique=True, nullable=False, autoincrement=True)
  name = Column(String(45), nullable=False, unique=True)
  
class category_list(Base):
  __tablename__ = 'category_list'
  id = Column(Integer, primary_key=True, unique=True, nullable=False, autoincrement=True)
  name = Column(String(45), nullable=False, unique=True)
  
Base.metadata.tables
Base.metadata.create_all(engine)

# demo1 = Demo(name="helloworld", password="password")
# session.add(demo1)
# session.commit()
# session.close()