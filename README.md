# Remove Trailers

An application to scan and remove trailer files from specified directories.

## Overview

This tool helps you identify and delete video trailer files (identified by `-trailer` in the filename) from your media collection. It scans a directory recursively, lists all matching trailer files with their sizes, and lets you select and delete them through a web interface.

## How It Works

1. The backend (Python Flask) walks the supplied directory tree and collects every file whose name contains `-trailer` (case-insensitive).
2. Each matching file's name, full path, and size are returned to the frontend.
3. The frontend renders the list in a table with checkboxes; you can select all or individual files.
4. On confirmation, the backend deletes the selected files from disk.

## Dependencies

- Python 3.x
- Flask 2.0.1 (see `backend/requirements.txt`)

## Platforms

- Backend: cross-platform (Python/Flask); tested on Windows (static folder path uses `C:/Code/RemoveTrailers/frontend`).
- Frontend: any modern web browser.
- Filesystem paths are OS-specific; provide paths valid for the host running the backend.

## Installation

```bash
cd backend
pip install -r requirements.txt
```

## Usage

1. Start the backend server:
   ```bash
   cd backend
   python app.py
   ```
   The server listens on `http://0.0.0.0:5000` (port 5000).
2. Open a web browser and navigate to `http://localhost:5000`.
3. Enter a directory path (or browse to select one) and click **Scan**.
4. Review the trailer files found, select the ones to remove, and click **Remove Selected**.
5. Confirm deletion.

## Notes

- The backend's `static_folder` is hard-coded to `C:/Code/RemoveTrailers/frontend`. Adjust this path in `backend/app.py` if the project is cloned elsewhere.
- Deletion is permanent; there is no recycle-bin/trash recovery.