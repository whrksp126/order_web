from routes import app
from flask_socketio import SocketIO

socketio = SocketIO(app)


if __name__=='__main__':
  socketio.run(app, host='0.0.0.0', debug=True, port=5000)
  # app.run(host='0.0.0.0', debug=True, port=5000)
