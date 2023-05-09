from flask import Flask, render_template, url_for, redirect, make_response, request, session, g
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3 as sql
import re
import urllib

app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')

app.secret_key = 'my-secret-key'
app.config['DATABASES'] = {
   'users': 'databases/users.db',
   'history': 'databases/history.db',
   'entries': 'databases/entries.db'
}
app.config['CURRENT_DATABASE'] = None

def get_db(database_name):
   """Connect to a specific SQLite database."""
   if database_name not in app.config['DATABASES']:
         raise ValueError(f"Database '{database_name}' not configured")
   if app.config['CURRENT_DATABASE'] != database_name:
         close_db()
         db = g._database = sql.connect(app.config['DATABASES'][database_name])
         g._database_name = database_name
         app.config['CURRENT_DATABASE'] = database_name
   else:
         db = getattr(g, '_database', None)
         if db is None:
            db = g._database = sql.connect(app.config['DATABASES'][database_name])
            g._database_name = database_name
            app.config['CURRENT_DATABASE'] = database_name
   return db

def close_db():
   """Close the database connection."""
   db = getattr(g, '_database', None)
   if db is not None:
      db.close()
      app.config['CURRENT_DATABASE'] = None

@app.route('/')
def home():

   # colour_1 = session['colour_1']
   # colour_2 = session['colour_2']

   response = make_response(render_template('index.html'))

   response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
   response.headers["Pragma"] = "no-cache"
   response.headers["Expires"] = "0"
   
   return response

@app.route('/login', methods=['GET', 'POST'])
def login():
   if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
         username = request.form['username']
         password = request.form['password']
         db = get_db("users")
         cursor = db.cursor()
         cursor.execute('SELECT * FROM accounts WHERE username = ?', (username,))
         while (account := cursor.fetchone()):
            if check_password_hash(account[2], password):
               session['logged_in'] = True
               session['username'] = account[1]
               session['colour_1'] = account[3]
               session['colour_2'] = account[4]

               response = make_response('Session set')
               for key, value in session.items():
                  response.set_cookie(key, urllib.parse.quote(str(value)))
               
               return response
            
         error_message = "Incorrect username / password"
         return (make_response(error_message, 400))
   return redirect(url_for("home"))

 
@app.route('/logout')
def logout():
   session.pop('logged_in', None)
   session.pop('username', None)
   session.pop('colour_1', None)
   session.pop('colour_2', None)
   response = make_response(redirect(url_for('home')))
   response.delete_cookie('logged_in')
   response.delete_cookie('username')
   response.delete_cookie('colour_1')
   response.delete_cookie('colour_2')
   return response
 
@app.route('/register', methods =['GET', 'POST'])
def register():
   if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'password_2' in request.form:
      username = request.form['username']
      password = request.form['password']
      password_2 = request.form['password_2']
      db = get_db("users")
      cursor = db.cursor()
      cursor.execute('SELECT * FROM accounts WHERE username = ?', (username,))
      account = cursor.fetchone()
      if account:
         error_message = 'Username taken'
         return (make_response(error_message, 400))
      elif not re.match(r'[A-Za-z0-9]+', username):
         error_message = 'Username must contain only characters and numbers'
         return (make_response(error_message, 400))
      elif (password != password_2):
         error_message = 'Passwords must match'
         return (make_response(error_message, 400))
      elif (len(password) < 8 or len(password_2) < 8):
         error_message = 'Password must be at least 8 characters'
         return (make_response(error_message, 400))
      else:
         cursor.execute('INSERT INTO accounts (username,password) VALUES (?,?)', (username, generate_password_hash(password),))
         db.commit()
         session['logged_in'] = True
         session['username'] = username
         session['colour_1'] = "rgba(14, 112, 47, 0.9)"
         session['colour_2'] = "rgba(203, 119, 174, 0.9)"
         return "Registration successful"
   return render_template('register.html')

@app.route('/change_pwd', methods=['GET', 'POST'])
def change_pwd():
   if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'new_password' in request.form:
         username = request.form['username']
         password = request.form['password']
         new_password = request.form['new_password']
         db = get_db("users")
         cursor = db.cursor()
         cursor.execute('SELECT * FROM accounts WHERE username = ?', (username,))
         while (account := cursor.fetchone()):
            if check_password_hash(account[2], password):
               cursor.execute("UPDATE accounts set password = ?", generate_password_hash(new_password))
               return "Update successful"
         error_message = "Incorrect password"
         return (make_response(error_message, 400))
   return redirect(url_for("home"))

@app.route('/change_colour', methods=['GET', 'POST'])
def change_colour():
   if request.method == 'POST' and 'colour_1' in request.form and 'colour_2' in request.form and session["logged_in"]:
      colour_1 = request.form['colour_1']
      colour_2 = request.form['colour_2']
      session['colour_1'] = colour_1
      session['colour_2'] = colour_2
      db = get_db("users")
      cursor = db.cursor()
      cursor.execute('SELECT * FROM accounts WHERE username = ?', (session["username"],))
      cursor.execute("UPDATE accounts set colour_1 = ?, colour_2 = ?", (colour_1, colour_2))
   return redirect(url_for("home"))
      


@app.route('/quiz')
def quiz():

   return render_template('quiz.html')

@app.route('/suggestions')
def suggestions():

   return render_template('suggestions.html')



@app.route('/history')
def history():

   return render_template('history.html')



if __name__ == '__main__':
   app.run(debug = True)