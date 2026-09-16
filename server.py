import http.server
import socketserver
import json
import urllib.parse
from datetime import datetime

PORT = 8001
MESSAGES_FILE = "messages.txt"

class ContactFormHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/submit':
            # Parse the form data
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # The frontend will send JSON data
            try:
                data = json.loads(post_data.decode('utf-8'))
                name = data.get('name', 'Unknown')
                email = data.get('email', 'Unknown')
                message = data.get('message', 'No message')
                
                # Save to file
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                with open(MESSAGES_FILE, "a", encoding="utf-8") as f:
                    f.write(f"[{timestamp}] New Message\n")
                    f.write(f"Name: {name}\n")
                    f.write(f"Email: {email}\n")
                    f.write(f"Message: {message}\n")
                    f.write("-" * 40 + "\n")
                
                # Send Success Response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {"status": "success", "message": "Message saved successfully."}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
            except Exception as e:
                # Handle errors
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {"status": "error", "message": str(e)}
                self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ContactFormHandler) as httpd:
        print(f"Serving on port {PORT}", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
