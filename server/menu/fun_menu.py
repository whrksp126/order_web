from tkinter import E
from models import Menu, Menu_list, R_menu_list
from routes import db


# 메뉴 추가 기능 함수
def fun_add_menu(name, price, img_url, description, user_id):
  try:
    new_menu = Menu(
      name=name, 
      price=price, 
      img_url=img_url, 
      description=description, 
      user_id=user_id
    )
    db.session.add(new_menu)
    db.session.commit()
    menu_id = new_menu.id
    db.session.close()
    return menu_id;
  
  except Exception as e:
    print("eeeeee fun_add_menu eeeeee,", e)
    
# 메뉴 리스트 추가 기능 함수
def fun_add_menu_list(name, description, color, user_id):
  try:
    menu_list = Menu_list(name=name, description=description, color=color, user_id=user_id)
    db.session.add(menu_list)
    db.session.commit()
    db.session.close()
  except Exception as e:
    print("eeeeee fun_add_menu_list eeeeee", e)
  
    
# 메뉴와 메뉴리스트 매핑 테이블 만들기
def fun_add_r_menu_list(menu_id, list_id, user_id):
  try:
    new_r_menu_list = R_menu_list(list_id=list_id, menu_id=menu_id, user_id=user_id)
    db.session.add(new_r_menu_list)
    db.session.commit()
    db.session.close()
  except Exception as e:
    print("eeeeee fun_add_r_menu_list eeeeee,", e)

# 현재 사용자의 모든 메뉴와 리스트를 join 하여 호출하기
def fun_call_all_menus(user_id):
  menus = []
  try:
    all_menus = db.session.query(Menu, R_menu_list, Menu_list)\
      .select_from(Menu)\
      .join(R_menu_list)\
      .join(Menu_list)\
      .filter(Menu.user_id == user_id)\
      .all()
    has_menu = [];
    new_menu_list = []
    for menu, r_menu_list, menu_list in all_menus:
      if not menu.id in has_menu:
        # 데이터 없으면
        has_menu.append(menu.id)
        new_menu_list.append({
          "list_id": menu_list.id,
          "list_name": menu_list.name,
          "list_color": menu_list.color
        })
        menus.append({
          "id": menu.id,
          "name": menu.name,
          "price": menu.price,
          "img_url": menu.img_url,
          "description": menu.description,
          "menu_list": new_menu_list
        })
      else:
        # 데이터 있으면
        [x for x in menus if x['id'] == menu.id][0]['menu_list'].append({
          "list_id": menu_list.id,
          "list_name": menu_list.name,
          "list_color": menu_list.color
        })
      new_menu_list = []
    return menus
  except Exception as e:
    print("eeeeee all_menus eeeeee,", e)
    
# 현재 사용자의 모든 메뉴 호출하기
def fun_call_menu(user_id):
  menu=[]
  try:
    menus = Menu.query.filter(Menu.user_id == user_id).all()
    for item in menus:
      menu.append({
        "id":item.id,
        "name":item.name,
        "price":item.price,
        "img_url":item.img_url,
        "description":item.description,
      })
    return menu
  except Exception as e:
    print('eeeeee fun_call_all_menu eeeeee,', e)
    

# 현재 사용자의 모든 메뉴 리스트 호출하기  
def fun_call_all_menu_list(user_id):
  menu_list = []
  try:
    menu_lists = Menu_list.query.filter(Menu_list.user_id == user_id).all()
    for list_item in menu_lists:
      menu_list.append({
        "id": list_item.id,
        "name": list_item.name,
        "description": list_item.description,
        "color": list_item.color,
      })
    return menu_list
    
  except Exception as e:
    print("eeeeee fun_call_all_menu_list eeeeee", e)
    
# 메뉴 삭제
def fun_delete_menu(menuId):
  try:
    # pk로 연결된 경우 저장된 연결된 데이터 먼저 제거한다.
    r_menu_list = db.session.query(R_menu_list) \
      .filter(R_menu_list.menu_id == menuId) \
      .all()
    for menu_list in r_menu_list:
      db.session.delete(menu_list)
      
    menu = db.session.query(Menu) \
      .filter(Menu.id == menuId) \
      .first()
    db.session.delete(menu)
    db.session.commit()
  
  except Exception as e:
    print("eeeeee delete_menu eeeeee", e)
    
# 메뉴 수정
def fun_edit_menu(user_id, menu_id, name, price, image, description, menu_list):
  try:
    print('user_id,',user_id)
    print('menu_id,',menu_id)
    print('name,',name)
    print('price,',price)
    print('image,',image)
    print('description,',description)
    print('menu_list,',menu_list)
    # menu = db.session.query(Menu).filter(id == menuId).first()
    
    # 해당 유저의 이미지 폴더에 같은 이미지 명 제거 후 새로운 이미지 저장하기
    # r_menu_list에 target menu_id를 삭제하고 수정된 내용을 추가한다.
    
    # user.age += 1
    # session.commit()
  except Exception as e:
    print("eeeeee eidt_menu eeeeee", e)
    