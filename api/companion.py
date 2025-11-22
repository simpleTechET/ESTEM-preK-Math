from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.error

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Enable CORS
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        # Read request body
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        # Get data from request
        student_name = data.get('studentName', 'Student')
        context = data.get('context', '')
        message_type = data.get('type', 'encouragement')

        # Create prompt based on type
        prompts = {
            'encouragement': f"You are {student_name}'s friendly AI study companion. {context} Give them a short, warm, encouraging message (2-3 sentences max).",
            'correction': f"You are {student_name}'s patient AI study companion. {context} Gently help them understand their mistake with a kind explanation (2-3 sentences max).",
            'celebration': f"You are {student_name}'s enthusiastic AI study companion. {context} Celebrate their success warmly (2-3 sentences max).",
            'focus': f"You are {student_name}'s supportive AI study companion. Help them refocus with a gentle reminder about staying on task (2-3 sentences max)."
        }

        prompt = prompts.get(message_type, prompts['encouragement'])

        # Call Claude API
        api_key = os.environ.get('ANTHROPIC_API_KEY')
        
        if not api_key:
            response = {
                'message': f"Great job, {student_name}! Keep going!",
                'error': 'API key not configured'
            }
            self.wfile.write(json.dumps(response).encode())
            return

        # Prepare Claude API request
        request_data = {
            'model': 'claude-sonnet-4-20250514',
            'max_tokens': 150,
            'messages': [
                {
                    'role': 'user',
                    'content': prompt
                }
            ]
        }

        # Make request to Claude API
        req = urllib.request.Request(
            'https://api.anthropic.com/v1/messages',
            data=json.dumps(request_data).encode('utf-8'),
            headers={
                'x-api-key': api_key,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            }
        )

        try:
            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read().decode('utf-8'))
                message = result['content'][0]['text']
                
                response_data = {
                    'message': message,
                    'studentName': student_name
                }
                
                self.wfile.write(json.dumps(response_data).encode())
        except urllib.error.HTTPError as e:
            error_response = {
                'message': f"You're doing great, {student_name}!",
                'error': f'API error: {e.code}'
            }
            self.wfile.write(json.dumps(error_response).encode())
        except Exception as e:
            error_response = {
                'message': f"Keep up the good work, {student_name}!",
                'error': str(e)
            }
            self.wfile.write(json.dumps(error_response).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
