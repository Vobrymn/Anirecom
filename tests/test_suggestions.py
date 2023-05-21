import unittest

import sys
import os

project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_dir)

from CAMS import app

class SuggestionsTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_valid_request(self):
        with self.app as client:
            response = client.get('/suggestions?content_type=anime&genres=["action"]&themes=["adventure"]')

            self.assertEqual(response.status_code, 200)

    def test_invalid_parameter(self):
        with self.app as client:
            response = client.get('/suggestions?content_type=anime&invalid_param=value')

            self.assertEqual(response.status_code, 400)
            self.assertIn('Invalid parameter(s)', response.data.decode())

    def test_invalid_content_type(self):
        with self.app as client:
            response = client.get('/suggestions?content_type=invalid&genres=invalid')

            self.assertEqual(response.status_code, 400)
            self.assertIn('Invalid content type', response.data.decode())

    def test_invalid_date_range(self):
        with self.app as client:
            response = client.get('/suggestions?content_type=anime&dates=[1900, 2025]')

            self.assertEqual(response.status_code, 400)
            self.assertIn('Invalid date range', response.data.decode())

    def test_invalid_query(self):
        with self.app as client:
            response = client.get('/suggestions?content_type=anime&genres=invalid')

            self.assertEqual(response.status_code, 400)
            self.assertIn('Invalid query', response.data.decode())

if __name__ == '__main__':
    unittest.main()

