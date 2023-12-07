from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
from datetime import datetime

# Initialize SQLAlchemy with no settings
db = SQLAlchemy()

def init_postgres(app):
    """
    Initializes the database with the given Flask app using Supabase PostgreSQL credentials.
    """
    # Load environment variables
    load_dotenv()

    # Get Supabase PostgreSQL credentials from environment variables
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_port = os.getenv("SUPABASE_PORT", "5432")  # Default port for PostgreSQL
    supabase_database_name = os.getenv("SUPABASE_DATABASE_NAME")
    supabase_user = os.getenv("SUPABASE_USER")
    supabase_password = os.getenv("SUPABASE_PASSWORD")

    # Construct the database URL
    database_url = f"postgresql://{supabase_user}:{supabase_password}@{supabase_url}:{supabase_port}/{supabase_database_name}"

    # Configure SQLAlchemy
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Silence the deprecation warning
    app.config["SQLALCHEMY_ECHO"] = True  # Optional: Log all SQL commands

    # Initialize SQLAlchemy with app
    db.init_app(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    is_online = db.Column(db.Boolean, default=False)
    # Add other fields as necessary

# You can add more models here
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
   
    sender = db.relationship('User', foreign_keys=[sender_id])
    receiver = db.relationship('User', foreign_keys=[receiver_id])
    
    
    
