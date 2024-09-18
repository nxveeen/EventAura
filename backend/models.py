import uuid
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, DateTime, Boolean
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    # ID as a UUID (universally unique identifier)
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    # User's full name
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    # User's email (unique)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    # User's phone number (optional but can be useful for contact)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    # Password hash (hashed passwords for security)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    # Role (either attendee or organizer)
    role: Mapped[str] = mapped_column(String(50), nullable=False, default="attendee")
    # Date of account creation (auto-generated)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    # Boolean to check if user is active
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    
    def __repr__(self) -> str:
        return f'<User {self.name}, {self.email}, {self.role}>'
