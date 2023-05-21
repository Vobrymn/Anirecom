import unittest
from flask import session
from werkzeug.datastructures import ImmutableMultiDict

import sys
import os

project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_dir)

from CAMS import app

class RegisterTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_successful_registration(self):
        with self.app as client:
            data = {'username': 'newuser', 'password': 'securepassword', 'password_2': 'securepassword'}
            response = client.post('/register', data=data)

            self.assertEqual(response.status_code, 200)
            self.assertEqual(session['logged_in'], True)
            self.assertEqual(session['username'], 'newuser')
            self.assertEqual(session['colour_1'], 'rgba(14, 112, 47, 0.9)')
            self.assertEqual(session['colour_2'], 'rgba(203, 119, 174, 0.9)')

    def test_username_taken(self):
        with self.app as client:
            data = {'username': 'admin', 'password': 'password', 'password_2': 'password'}
            response = client.post('/register', data=data)

            self.assertEqual(response.status_code, 400)
            self.assertNotIn('logged_in', session)

    def test_invalid_username(self):
        with self.app as client:
            data = {'username': '!@#', 'password': 'password', 'password_2': 'password'}
            response = client.post('/register', data=data)

            self.assertEqual(response.status_code, 400)
            self.assertNotIn('logged_in', session)

    def test_passwords_not_matching(self):
        with self.app as client:
            data = {'username': 'newuser', 'password': 'password1', 'password_2': 'password2'}
            response = client.post('/register', data=data)

            self.assertEqual(response.status_code, 400)
            self.assertNotIn('logged_in', session)

    def test_password_length(self):
        with self.app as client:
            data = {'username': 'newuser', 'password': 'short', 'password_2': 'short'}
            response = client.post('/register', data=data)

            self.assertEqual(response.status_code, 400)
            self.assertNotIn('logged_in', session)

if __name__ == '__main__':
    unittest.main()