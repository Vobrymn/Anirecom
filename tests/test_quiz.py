import unittest
from flask import session

import sys
import os

project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_dir)

from CAMS import app

class QuizTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_quiz_get_request(self):
        with self.app as client:
            response = client.get('/quiz')

            self.assertEqual(response.status_code, 200)

    def test_quiz_post_request(self):
        with self.app as client:
            data = {
            'query': '{"content_type":"anime","genres":["action"],"themes":[],"producers":[],"dates":""}'
            }
            response = client.post('/quiz', data=data)

            session_history = session.get('history', [])
            stored_query = session_history[0]

            expected_query = {
                'content_type': 'anime',
                'genres': ['action'],
                'themes': [],
                'producers': [],
                'dates': ''
            }

            self.assertEqual(stored_query, expected_query)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.data.decode(), "History updated")

    def test_quiz_invalid_request(self):
        with self.app as client:
            response = client.post('/quiz')

            self.assertEqual(response.status_code, 400)


if __name__ == '__main__':
    unittest.main()
