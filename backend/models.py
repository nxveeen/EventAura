import uuid
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, DateTime, Boolean
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Association table to link events and users (attendees)
event_attendees = db.Table(
    'event_attendees',
    db.Column('event_id', String(36), db.ForeignKey('events.id'), primary_key=True),
    db.Column('user_id', String(36), db.ForeignKey('users.id'), primary_key=True)
)

# user model
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
     # Events the user is attending (many-to-many relationship with events)
    attended_events: Mapped[list['Event']] = relationship('Event', secondary=event_attendees, back_populates='attendees')

    def __repr__(self) -> str:
        return f'<User {self.name}, {self.email}, {self.role}>'

# event model
class Event(db.Model):
    __tablename__ = 'events'

    # ID as a UUID (universally unique identifier)
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    
    # Event title
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    
    # Event description
    description: Mapped[str] = mapped_column(db.Text, nullable=False)
    
    # Event date and time
    date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    
    # Date of event creation (auto-generated)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Event location
    location: Mapped[str] = mapped_column(String(255), nullable=False)
    
    # City and country fields for additional location data
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    country: Mapped[str] = mapped_column(String(100), nullable=False)
    
    # Foreign Key - Organizer (User who created the event)
    organizer_id: Mapped[str] = mapped_column(String(36), db.ForeignKey('users.id'), nullable=False)
    
    # Many-to-many relationship for attendees
    attendees: Mapped[list['User']] = relationship('User', secondary=event_attendees, back_populates='attended_events')
    
    # Boolean flag for event status (e.g., active or cancelled)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    def __repr__(self) -> str:
        return f"<Event {self.title} on {self.date}, organized by {self.organizer_id}>"