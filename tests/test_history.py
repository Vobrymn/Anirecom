import unittest

import sys
import os

project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_dir)

from CAMS import app


class HistoryTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_logged_in_user_with_history(self):
        with self.app as client:
            with client.session_transaction() as session:
                session['logged_in'] = True
                session['username'] = 'admin'

            response = client.get('/history')

            self.assertEqual(response.status_code, 200)

    def test_logged_in_user_without_history(self):
        with self.app as client:
            with client.session_transaction() as session:
                session['logged_in'] = True
                session['username'] = 'testuser'

            response = client.get('/history')

            self.assertEqual(response.status_code, 200)

    def test_session_history(self):
        with self.app as client:
            with client.session_transaction() as session:
                session['history'] = [
                    {'query': 'example query 1'},
                    {'query': 'example query 2'},
                    {'query': 'example query 3'}
                ]

            response = client.get('/history')

            self.assertEqual(response.status_code, 200)

    def test_no_history(self):
        with self.app as client:
            response = client.get('/history')

            self.assertEqual(response.status_code, 200)
            self.assertIn(b'history = "null"', response.data)

if __name__ == '__main__':
    unittest.main()