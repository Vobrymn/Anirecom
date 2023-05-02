from flask import Flask, render_template, url_for, redirect, request, session
import re 
import sqlite3

app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')


'''app.secret_key = 'your secret key'
 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'your password'
app.config['MYSQL_DB'] = 'geeklogin'
 
mysql = MySQL(app)'''


@app.route('/')
def start():
   r = app.make_response(render_template('index.html'))

   r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
   r.headers["Pragma"] = "no-cache"
   r.headers["Expires"] = "0"

   return r

@app.route('/login', methods =['GET', 'POST'])
def login():
    return render_template('login.html')
 
@app.route('/logout')
def logout():
    return redirect(url_for('login'))
 
@app.route('/register', methods =['GET', 'POST'])
def register():
    return render_template('register.html')

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


