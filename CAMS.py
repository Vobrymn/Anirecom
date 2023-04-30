from flask import Flask, render_template, url_for
app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')

@app.route('/')
def index():

   return render_template('index.html')

'''
@app.route('/login', methods = ['GET', 'POST'])
def login():
   if request.method == 'POST':
      session['username'] = request.form['username']
      return redirect(url_for('index'))
   return
'''

if __name__ == '__main__':
   app.run(debug = True)