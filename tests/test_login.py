import unittest
from flask import url_for, session
from urllib.parse import urlparse

import sys
import os

project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_dir)

from CAMS import app


class LoginTestCase(unittest.TestCase):
    
    def setUp(self):
        self.app = app.test_client()
        
    def test_valid_login(self):
        with self.app as client:
            data = {'username': 'admin', 'password': 'secure'}
            response = client.post('/login', data=data)
            
            self.assertEqual(response.status_code, 200)
            self.assertEqual(session['logged_in'], True)
            self.assertEqual(session['username'], 'admin')
            
    def test_invalid_login(self):
        with self.app as client:
            data = {'username': 'invalid', 'password': 'wrong'}
            response = client.post('/login', data=data)
            
            self.assertEqual(response.status_code, 400)
            self.assertNotIn('logged_in', session)
            
    def test_redirect_on_get_request(self):
        with self.app as client:
            response = client.get('/login')
            
            self.assertEqual(response.status_code, 302)
            expected_location = url_for('home', _external=True)
            actual_location = response.headers.get('Location')
            parsed_expected_location = urlparse(expected_location)
            parsed_actual_location = urlparse(actual_location)

            self.assertEqual(parsed_actual_location.path, parsed_expected_location.path)
            
if __name__ == '__main__':
    unittest.main()
