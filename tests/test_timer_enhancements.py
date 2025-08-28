import unittest
from app import app
import time

class TimerEnhancementsTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_enhanced_ui_elements(self):
        """Test that the enhanced UI elements are present"""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        html = response.data.decode('utf-8')
        
        # Check for work state indicator
        self.assertIn('work-state', html)
        self.assertIn('作業中', html)
        
        # Check for dynamic progress circle
        self.assertIn('progress-circle', html)
        self.assertIn('stroke-dasharray', html)
        self.assertIn('stroke-dashoffset', html)
        
        # Check for transform rotation (starting from top)
        self.assertIn('rotate(-90 90 90)', html)

    def test_timer_functionality_preserved(self):
        """Test that original timer functionality is preserved"""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        html = response.data.decode('utf-8')
        
        # Original functionality should still be present
        self.assertIn('ポモドーロタイマー', html)
        self.assertIn('開始', html)
        self.assertIn('リセット', html)
        self.assertIn('25:00', html)
        self.assertIn('timer.js', html)

if __name__ == '__main__':
    unittest.main()