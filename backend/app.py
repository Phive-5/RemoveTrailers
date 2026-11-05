from flask import Flask, request, jsonify, send_from_directory
import os
import re

# Use absolute path for static folder with correct Windows path separator
app = Flask(__name__, static_folder='C:/Code/RemoveTrailers/frontend', static_url_path='')


def scan_directory(path):
    trailer_files = []
    total_size = 0
    for root, _, files in os.walk(path):
        for file in files:
            if '-trailer' in file.lower():
                file_path = os.path.join(root, file)
                size = os.path.getsize(file_path)
                trailer_files.append({'name': file, 'path': file_path, 'size': size})
                total_size += size
    return trailer_files, total_size

@app.route('/scan', methods=['POST'])
def scan():
    data = request.get_json()
    path = data.get('path', '')
    if not os.path.exists(path):
        return jsonify({'error': 'Invalid path'}), 400
    files, total_size = scan_directory(path)
    return jsonify({'files': files, 'count': len(files), 'total_size': total_size})

@app.route('/remove', methods=['POST'])
def remove():
    data = request.get_json()
    paths = data.get('paths', [])
    removed = []
    for path in paths:
        if os.path.exists(path):
            os.remove(path)
            removed.append(path)
    return jsonify({'removed': removed})

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
