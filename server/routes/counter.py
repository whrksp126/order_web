from flask import Blueprint
from flask_socketio import SocketIO
from routes import app


socketio = SocketIO(app)

bp = Blueprint("counter", __name__, url_prefix="/counter")


@socketio.on('message')
def handle_message(data):
    print('#######################received message: ' + data)