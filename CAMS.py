from flask import Flask, render_template, url_for, redirect, make_response, request, session, g
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3 as sql
import re
import urllib
import json
from config import Config


# setting up app config

app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')

app.config.from_object('config.Config')

app.secret_key = 'my-secret-key'
app.config['CURRENT_DATABASE'] = None


# connects to database of choice and allows for switching

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

# closes database connection

def close_db():
   """Close the database connection."""
   db = getattr(g, '_database', None)
   if db is not None:
      db.close()
      app.config['CURRENT_DATABASE'] = None


# home route, renders index.html

@app.route('/')
def home():

   response = make_response(render_template('index.html'))

   response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
   response.headers["Pragma"] = "no-cache"
   response.headers["Expires"] = "0"
   
   return response


# login route, takes username and password in post request and checks users database

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

               # setting session variables and cookies

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

 
# logout route, pops all session variables and deletes related cookies

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


# register route, takes username, password and password_2, sanitises input, checks users and uploads to database, logs user in and returns to home page

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


#change password route, takes old_password, new_password and confirm_password, sanitises inputs, checks users and updates password

@app.route('/change_pwd', methods=['POST'])
def change_pwd():
   if request.method == 'POST' and 'old_password' in request.form and 'new_password' in request.form and 'confirm_password' in request.form and session.get("logged_in") and session.get("username"):
         old_password = request.form['old_password']
         new_password = request.form['new_password']
         confirm_password = request.form['confirm_password']
         db = get_db("users")
         cursor = db.cursor()
         cursor.execute('SELECT * FROM accounts WHERE username = ?', (session.get("username"),))
         while (account := cursor.fetchone()):
            if check_password_hash(account[2], old_password):
               if confirm_password == new_password:
                  cursor.execute("UPDATE accounts set password = ?", (generate_password_hash(new_password),))
                  db.commit()
                  db.close()
                  return "Update successful"
               elif (len(new_password) < 8 or len(confirm_password) < 8):
                  db.close()
                  error_message = 'Password must be at least 8 characters'
                  return (make_response(error_message, 400))
               else:
                  db.close()
                  error_message = "Passwords do not match"
                  return (make_response(error_message, 400))
               
         db.close()      
         error_message = "Incorrect password"
         return (make_response(error_message, 400))
   
   error_message = 'Error'
   return (make_response(error_message, 400))


#change password route, takes colour_1 and colour_2, checks users and updates colours

@app.route('/change_colour', methods=['POST'])
def change_colour():
   if request.method == 'POST' and 'colour_1' in request.form and 'colour_2' in request.form and session.get("logged_in") and session.get("username"):
      colour_1 = request.form['colour_1']
      colour_2 = request.form['colour_2']
      session['colour_1'] = colour_1
      session['colour_2'] = colour_2
      db = get_db("users")
      cursor = db.cursor()
      cursor.execute("UPDATE accounts SET colour_1 = ?, colour_2 = ? WHERE username = ?", (colour_1, colour_2, session.get("username")))
      db.commit()
      db.close()

      response = make_response('Colour changed')

      for key, value in session.items():
         if key in ["colour_1", "colour_2"]:
            response.set_cookie(key, urllib.parse.quote(str(value)))

      return response
   
   error_message = 'Error'
   return (make_response(error_message, 400))
      

#quiz route, on load (get) sends valid question options for use in autocomplete
#            after quiz completion receives post request with tags list to store as user history


@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
   if request.method == 'GET':

      db = get_db("content")
      cursor = db.cursor()
      genres = cursor.execute("SELECT DISTINCT genres FROM tags").fetchall()
      themes = cursor.execute("SELECT DISTINCT themes FROM tags").fetchall()
      studios = cursor.execute("SELECT DISTINCT studios FROM tags").fetchall()
      authors = cursor.execute("SELECT DISTINCT authors FROM tags").fetchall()

      valid_tags = [[genre[0] for genre in genres], [theme[0] for theme in themes], [studio[0] for studio in studios], [author[0] for author in authors]]

      response = make_response(render_template('quiz.html', valid_tags=valid_tags))

      response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
      response.headers["Pragma"] = "no-cache"
      response.headers["Expires"] = "0"
      
      return response
   elif request.method == "POST" and 'query' in request.form:

      query = json.loads(request.form["query"])

      session_history = session.get("history", [])
      
      session_history.insert(0, query)

      session["history"] = session_history
      
      max_logs = 9

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


#suggestions route, on load (get) receives tags, returns corresponding content entries, accessible directly from browser url

@app.route('/suggestions', methods=['GET'])
def suggestions():
      VALID_PARAMS = ['content_type', 'genres', 'themes', 'producers', 'dates']
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
          

      condition = ' AND '.join(conditions)     

      db = get_db("content")
      cursor = db.cursor()

      if condition:
         cursor.execute(f"SELECT * FROM {content_type} WHERE {condition} ORDER BY RANDOM() LIMIT 20")
      else:
         cursor.execute(f"SELECT * FROM {content_type} ORDER BY RANDOM() LIMIT 40")

      suggestions = cursor.fetchall()

      return render_template("suggestions.html", suggestions = suggestions)


# history route, returns entries of session history or stored history from database

@app.route('/history')
def history():
   if session.get("logged_in") and session.get("username"):

      username = session.get("username")
      db = get_db("users")
      cursor = db.cursor()
      cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name= ?;", (username,))
      history_table = cursor.fetchone()

      if history_table:
         cursor.execute("SELECT * FROM {} ORDER BY log_num DESC LIMIT 18;".format(username))
         history = cursor.fetchall()
         response = make_response(render_template('history.html', history = history))
         response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
         response.headers["Pragma"] = "no-cache"
         response.headers["Expires"] = "0"

         return response
      else:
         response = make_response(render_template('history.html', history = "null"))
         response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
         response.headers["Pragma"] = "no-cache"
         response.headers["Expires"] = "0"
         
         return response

      
   elif session.get("history"):
      session_history = []
      for i in range (len(session.get("history"))):
         session_history.append([len(session.get("history")) - 1 - i, session.get("history")[i]])

      response = make_response(render_template('history.html', history = session_history))
      response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
      response.headers["Pragma"] = "no-cache"
      response.headers["Expires"] = "0"
      
      return response

   else:

      response = make_response(render_template('history.html', history = "null"))
      response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
      response.headers["Pragma"] = "no-cache"
      response.headers["Expires"] = "0"

      return response

   


if __name__ == '__main__':
   app.run(debug = True)