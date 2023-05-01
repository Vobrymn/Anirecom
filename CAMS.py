from flask import Flask, render_template, url_for
app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')

@app.route('/')
def start():


   r = app.make_response(render_template('index.html'))

   r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
   r.headers["Pragma"] = "no-cache"
   r.headers["Expires"] = "0"

   return r

'''
@app.route('/login', methods = ['GET', 'POST'])
def login():
   if request.method == 'POST':
      session['username'] = request.form['username']
      return redirect(url_for('index'))
   return
'''

@app.route('/quiz')
def quiz():

   return render_template('test.html')



@app.route('/suggestions')
def suggestions():

   return render_template('suggestions.html')



@app.route('/history')
def history():

   return render_template('history.html')



if __name__ == '__main__':
   app.run(debug = True)


