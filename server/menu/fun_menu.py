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
def fun_add_menu_list(name, description, user_id):
  try:
    menu_list = Menu_list(name=name, description=description, user_id=user_id)
    print('#############################')
    print(name, description, user_id)
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
          "list_name": menu_list.name
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
          "list_name": menu_list.name
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
        "name": list_item.name
      })
    return menu_list
    
  except Exception as e:
    print("eeeeee fun_call_all_menu_list eeeeee", e)
    
