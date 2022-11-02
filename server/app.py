from numpy import broadcast
from routes import app
from flask_socketio import SocketIO, send
from flask import request, session 

socketio = SocketIO(app, cors_allowed_origins="*")




@socketio.on('message')
def handleMessage(msg):
  # print('######################',request.cookies.get('userEmail'))
  send(msg, broadcast=True)
  return None


if __name__=='__main__':
  socketio.run(app, host='0.0.0.0')
  # app.run(host='0.0.0.0', debug=True, port=5000)
