from numpy import broadcast
from routes import app
from flask_socketio import SocketIO, send, join_room, leave_room
from flask import request, session 

socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    print('@@@@@@@@@@@@@@@@@@username=',username, 'room=',room)
    send(username + ' has entered the room.', to=room)
    
@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.',  to=room)


@socketio.on('message')
def handleMessage(msg):
  # print('######################',request.cookies.get('userEmail'))
  print('!!!!!!!!!!!!!!!!!!!!!!!!!! msg,',msg)
  send(msg, broadcast=True)
  return None


if __name__=='__main__':
  socketio.run(app, host='0.0.0.0')
  # app.run(host='0.0.0.0', debug=True, port=5000)
