# Import required modules
import os
import sys

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from database.database import db, init_postgres, User, Message

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
jwt = JWTManager(app)

# Initialize the database with your Flask app
init_postgres(app)

# Create all database tables
with app.app_context():
    db.create_all()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if username already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 409

    # Create new user
    new_user = User(username=username)
    new_user.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password_hash, password):
        user.is_online = True  # Update online status
        db.session.commit()  # Commit changes to the database

        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200

    return jsonify({"message": "Invalid username or password"}), 401

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    if user:
        user.is_online = False
        db.session.commit()
        return jsonify({"message": "User logged out successfully"}), 200
    return jsonify({"message": "User not found"}), 404

# Fetch User's online status
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [{"username": user.username, "is_online": user.is_online} for user in users]
    return jsonify(users_list)

@app.route('/message', methods=['POST'])
@cross_origin(origin='*')
@jwt_required()
def handle_message():
    current_user = get_jwt_identity()
    data = request.get_json()
    receiver_username = data.get('receiver')
    content = data.get('content')

    # Fetch sender and receiver from the database
    sender = User.query.filter_by(username=current_user).first()
    receiver = User.query.filter_by(username=receiver_username).first()

    if not receiver:
        return jsonify({"message": "Receiver not found"}), 404

    # Create new message
    new_message = Message(sender_id=sender.id, receiver_id=receiver.id, content=content)
    db.session.add(new_message)
    db.session.commit()

    return jsonify({"message": "Message sent successfully"}), 200

@app.route('/messages/<receiver_username>', methods=['GET'])
@jwt_required()
@cross_origin(origin='*')
def get_messages(receiver_username):
    current_user = get_jwt_identity()
    sender = User.query.filter_by(username=current_user).first()
    receiver = User.query.filter_by(username=receiver_username).first()

    if not receiver:
        return jsonify({"message": "Receiver not found"}), 404

    messages = Message.query.filter(
        (Message.sender_id == sender.id) & (Message.receiver_id == receiver.id) |
        (Message.sender_id == receiver.id) & (Message.receiver_id == sender.id)
    ).order_by(Message.timestamp).all()

    messages_list = [{"sender": msg.sender.username, "content": msg.content, "timestamp": msg.timestamp} for msg in messages]
    return jsonify(messages_list)

@app.route('/my_messages', methods=['GET'])
@jwt_required()
def get_my_messages():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Assuming you want to fetch messages sent by and to the current user
    messages = Message.query.filter(
        (Message.sender_id == user.id) | (Message.receiver_id == user.id)
    ).order_by(Message.timestamp).all()

    messages_list = [
        {"sender": msg.sender.username, "content": msg.content, "timestamp": msg.timestamp}
        for msg in messages
    ]
    return jsonify(messages_list)




if __name__ == '__main__':
    app.run(debug=True)
