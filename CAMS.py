from flask import Flask, render_template, url_for, redirect, make_response, request, session, g
from werkzeug.security import generate_password_hash, check_password_hash
from selenium import webdriver
import sqlite3 as sql
import re
import urllib
import json

app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')

app.secret_key = 'my-secret-key'
app.config['DATABASES'] = {
   'users': 'databases/users.db',
   'content': 'databases/content.db',
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
               
               session.pop('history', None)

               response = make_response('Login successful')
               for key, value in session.items():
                  if key in ["logged_in", "username", "colour_1", "colour_2"]:
                     response.set_cookie(key, urllib.parse.quote(str(value)))
               
               db.close()
               return response
         db.close()
         error_message = "Incorrect username / password"
         return (make_response(error_message, 400))
   return redirect(url_for("home"))

 
@app.route('/logout')
def logout():
   session.pop('logged_in', None)
   session.pop('username', None)
   session.pop('colour_1', None)
   session.pop('colour_2', None)
   session.pop("history", None)
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
         db.close()
         error_message = 'Username taken'
         return (make_response(error_message, 400))
      elif not re.match(r'[A-Za-z0-9]+', username):
         db.close()
         error_message = 'Username must contain only characters and numbers'
         return (make_response(error_message, 400))
      elif (password != password_2):
         db.close()
         error_message = 'Passwords must match'
         return (make_response(error_message, 400))
      elif (len(password) < 8 or len(password_2) < 8):
         db.close()
         error_message = 'Password must be at least 8 characters'
         return (make_response(error_message, 400))
      else:
         cursor.execute('INSERT INTO accounts (username,password) VALUES (?,?)', (username, generate_password_hash(password),))
         db.commit()
         session['logged_in'] = True
         session['username'] = username
         session['colour_1'] = "rgba(14, 112, 47, 0.9)"
         session['colour_2'] = "rgba(203, 119, 174, 0.9)"

         session.pop('history', None)

         response = make_response('Registration successful')

         response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
         response.headers["Pragma"] = "no-cache"
         response.headers["Expires"] = "0"

         for key, value in session.items():
            if key in ["logged_in", "username", "colour_1", "colour_2"]:
               response.set_cookie(key, urllib.parse.quote(str(value)))
            
         db.close()
         return response
      
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
               db.close()
               return "Update successful"
         db.close()
         error_message = "Incorrect password"
         return (make_response(error_message, 400))
   return redirect(url_for("home"))

@app.route('/change_colour', methods=['GET', 'POST'])
def change_colour():
   if request.method == 'POST' and 'colour_1' in request.form and 'colour_2' in request.form and session.get("logged_in") and session.get("username"):
      colour_1 = request.form['colour_1']
      colour_2 = request.form['colour_2']
      session['colour_1'] = colour_1
      session['colour_2'] = colour_2
      db = get_db("users")
      cursor = db.cursor()
      cursor.execute("UPDATE accounts SET colour_1 = ?, colour_2 = ? WHERE username = ?", (colour_1, colour_2, session.get("username")))
      db.close()
   return redirect(url_for("home"))
      


@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
   if request.method == 'GET':
      
      response = make_response(render_template('quiz.html'))

      response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
      response.headers["Pragma"] = "no-cache"
      response.headers["Expires"] = "0"
      
      return response
   elif request.method == "POST" and "query" in request.form:

      query = json.loads(request.form["query"])

      if session.get("history") is None:
         session["history"] = []
      
      session["history"].insert(0, query)
      
      max_logs = 10

      if len(session["history"]) > max_logs:
         session["history"] = session["history"][:max_logs]

      if session.get("logged_in") and session.get("username"):
         username = session.get("username")
         db = get_db("users")
         cursor = db.cursor()
         cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name= ?;", (username,))
         history = cursor.fetchone()
         if not history:
            cursor.execute("CREATE TABLE {} (log_num INTEGER PRIMARY KEY AUTOINCREMENT, query TEXT);".format(username))
            db.commit()
      
         cursor.execute("INSERT INTO {} (query) VALUES (?)".format(username), (json.dumps(query),))
         db.commit()

      db.close()

      return "History updated"

   else:

      error_message = 'Invalid request'
      return (make_response(error_message, 400))


@app.route('/suggestions', methods=['GET'])
def suggestions():
      VALID_PARAMS = ['content_type', 'genres', 'themes', 'producers', 'dates']
      # Check for any invalid parameters
      invalid_params = [param for param in request.args.keys() if param not in VALID_PARAMS]
      if invalid_params:
         error_message = f"Invalid parameter(s): {', '.join(invalid_params)}"
         return (make_response(error_message, 400))
      
      content_type = request.args.get('content_type')
      if (content_type is None or (content_type != "anime" and content_type != "manga")):
         error_message = "Invalid content type"
         return (make_response(error_message, 400))
      
      query = {}
      query_error = False
      
      genre = request.args.get('genres')
      if genre != '[]' and genre:
         try:
            genre = eval(genre)
            query["genres"] = genre
         except:
            query_error = True
         
      themes = request.args.get('themes')
      if themes != '[]' and themes:
         try:
            themes = eval(themes)
            query["themes"] = themes
         except:
            query_error = True
      producers = request.args.get('producers')
      if producers != '[]' and producers:
         try:
            producers = eval(producers)
            query["producers"] = producers
         except:
            query_error = True

      conditions = []

      dates = request.args.get('dates')      
      if dates != '[]' and dates:
         try:
            dates = eval(dates)

            try:
               if (dates[0] < 1917 or dates[1] > 2023):
                  error_message = "Invalid date range"
                  return (make_response(error_message, 400))
             
               conditions.append(f"year > {dates[0]} AND year < {dates[1]}")
            except:
               error_message = "Invalid date"
               return (make_response(error_message, 400))

         except:
            query_error = True

      if query_error:
         error_message = "Invalid query"
         return (make_response(error_message, 400))   
      
      for key in query:
         for value in query[key]:
            if isinstance(value, str):
               conditions.append(f"{key} LIKE '%{value}%'")
            else:
               error_message = "Invalid query"
               return (make_response(error_message, 400)) 
        
      # join the conditions using AND operator      

      condition = ' AND '.join(conditions)     

      # select rows with the specified conditions
      db = get_db("content")
      cursor = db.cursor()

      if condition:
         cursor.execute(f"SELECT * FROM {content_type} WHERE {condition} ORDER BY RANDOM() LIMIT 12")
      else:
         cursor.execute(f"SELECT * FROM {content_type} ORDER BY RANDOM() LIMIT 12")

      suggestions = cursor.fetchall()

      return render_template("suggestions.html", suggestions = suggestions)



@app.route('/history')
def history():
   if session.get("logged_in") and session.get("username"):
      username = session.get("username")
      db = get_db("users")
      cursor = db.cursor()
      cursor.execute('SELECT * FROM history WHERE username = ?', (username,))
      account = cursor.fetchone()
      if account:
         response = make_response(account[1])
         return response
      else:
         error_message = "User has no history"
         return (make_response(error_message, 400))
      

   return render_template('history.html')



if __name__ == '__main__':
   app.run(debug = True)