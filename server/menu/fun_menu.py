from tkinter import E
from models import Menu, Menu_list, R_menu_list
from routes import db, app
import os

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
    print('@@@@@@@@@@@@@@@@@@@@@@@@,', list_id, menu_id, user_id)
    new_r_menu_list = R_menu_list(list_id=list_id, menu_id=menu_id, user_id=user_id)
    db.session.add(new_r_menu_list)
    db.session.commit()
    # db.session.close()
  except Exception as e:
    print("eeeeee fun_add_r_menu_list eeeeee,", e)

# 현재 사용자의 모든 메뉴와 리스트를 join 하여 호출하기
def fun_call_all_menus(user_id):
  try:
    all_join_menu = db.session.query(Menu.id.label('id'), \
      Menu.name.label('name'), Menu.price.label('price'), Menu.img_url.label('img_url'), \
      Menu.description.label('description'), Menu_list.id.label('list_id'), \
      Menu_list.name.label('list_name'), Menu_list.color.label('list_color')).\
      outerjoin(R_menu_list, Menu.id == R_menu_list.menu_id).\
      outerjoin(Menu_list, R_menu_list.list_id == Menu_list.id).\
      filter(Menu.user_id == user_id).\
      all()
    print(all_join_menu)
    menu_data_list = [];
    menu_id_list = [];
    list_data_list = [];
    for menu in all_join_menu:
      print(menu)
      if not menu.id in menu_id_list:
        menu_id_list.append(menu.id)
        if menu.list_id != None:
          list_data_list.append({
            "list_id": menu.list_id,
            "list_name": menu.list_name,
            "list_color": menu.list_color,
          })
        menu_data_list.append({
          "id": menu.id,
          "name": menu.name,
          "price": menu.price,
          "img_url": menu.img_url,
          "description": menu.description,
          "menu_list": list_data_list
        })
      else:
        [x for x in menu_data_list if x['id'] == menu.id][0]['menu_list'].append({
          "list_id": menu.list_id,
          "list_name": menu.list_name,
          "list_color": menu.list_color,
        })
      list_data_list = [];
    return menu_data_list
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
def fun_delete_menu(menuId, user_id):
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
    
    fun_delete_server_image(user_id, menu.img_url)
    
    db.session.delete(menu)
    db.session.commit()
  
  except Exception as e:
    print("eeeeee delete_menu eeeeee", e)
    
# 메뉴 수정
def fun_edit_menu(user_id, menu_id, name, price, description, menu_list, image):
  try:
    print('!!!!!!!!!!!!!!!!!!!!!!!!menu_list,',menu_list)
    menu = db.session.query(Menu).filter(Menu.id == menu_id).first()
    menu.name = name;
    menu.price = price;
    if image != None:
      menu.img_url = image;
    if description != 'null':
      menu.description = description
    db.session.commit()
    
    r_menu_list = db.session.query(R_menu_list) \
      .filter(R_menu_list.menu_id == menu_id) \
      .all()
    for target_menu_list in r_menu_list:
      db.session.delete(target_menu_list)
    db.session.commit()
    if menu_list != None:
      for list_id in menu_list:
        list_id = int(list_id)
        fun_add_r_menu_list(menu_id, list_id, user_id)
    
    db.session.commit()
    
  except Exception as e:
    print("eeeeee edit_menu eeeeee", e)







ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
    
# 서버 경로에 이미 동일한 이미지파일이 있을 경우 삭제
def fun_delete_server_image(user_id, image_name):
  path_menu_images = app.config['UPLOAD_FOLDER'] + 'menu_images/' + str(user_id)

  # DB에서 불러온 이미지 파일명과 동일한 서버의 이미지를 삭제함
  if os.path.isfile(path_menu_images + '/' + image_name):
    os.remove(path_menu_images + '/' + image_name)