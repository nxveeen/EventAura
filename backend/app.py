from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# alchemy databse ------------------------------------------------------------- 
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.sqlite"
db.init_app(app)
# with app.app_context():
#     db.drop_all()
#     db.create_all()

# endpoints --------------------------------------------------------------------------------
@app.route('/')
def index():
    data = { "members": ["member1", "member2", "member3"]}
    return jsonify(data)

# new user sign up -------------------------------------------------------------------------
@app.route('/api/users/signup', methods = ['POST'])
def signup():
    try:
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        password = request.form['password']
      
        # check existing user
        existing_user = User.query.filter_by(email = email).first()
        if existing_user:
            return jsonify({"message":"User already exits!!"}), 400
        hashed_password = generate_password_hash(password)
      
        # create new user
        new_user = User(name=name, email=email, password=hashed_password, phone=phone)
        db.session.add(new_user)
        db.session.commit() 

        return jsonify({"message":"User signed up successfully!!"}), 201

    except Exception as e:
        return jsonify({"error":str(e)}), 400

@app.route('/api/users/login', methods = ['POST'])
def login():
    try:
        email = request.form['email']  
        password = request.form['password']

        # find user
        user = User.query.filter_by(email = email).first()  
        
        if not user:
            return jsonify({"message":"User not found!!"}), 404
        
        if not check_password_hash(user.password, password):
            return jsonify({"message":"Incorrect password"})
        
        return jsonify({"message": "Login successful!", "user": {"name": user.name, "email": user.email, "phone": user.phone}}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/api/users', methods = ['GET'])
def get_users():
    if request.method == "GET":
        try:
            all_users = User.query.all()
            users_list = [{"id":user.id, "name":user.name, "email":user.email, "phone":user.phone, "role":user.role, "created_at":user.created_at} for user in all_users]
            return jsonify(users_list), 200
        except Exception as e:
            return jsonify({"message":str(e)}), 400
    
if __name__ == '__main__':
    app.run()