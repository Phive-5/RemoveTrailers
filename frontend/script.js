let trailerFiles = [];

function formatSize(bytes) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2); // Convert bytes to GB with 2 decimal places
}

function scanDirectory() {
    const path = document.getElementById('directoryPath').value;
    if (!path) {
        alert('Please enter a directory path.');
        return;
    }
    // Show progress starting at 0%
    showProgressBubble(0);
    
    // Simulate progress updates (in a real app, this would come from backend)
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        if (progress <= 90) { // Stop at 90% until fetch completes
            updateProgressBubble(progress);
        }
    }, 300);
    
    fetch('http://localhost:5000/scan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
    })
    .then(response => response.json())
    .then(data => {
        clearInterval(progressInterval);
        updateProgressBubble(100); // Complete progress
        setTimeout(hideProgressBubble, 500); // Hide after a short delay
        
        trailerFiles = data.files || [];
        document.getElementById('fileCount').textContent = data.count || 0;
        document.getElementById('totalSize').textContent = formatSize(data.total_size || 0) + ' GB';
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        if (data.error) {
            alert(data.error);
            return;
        }
        data.files.forEach(file => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" data-path="${file.path}"></td>
                <td>${file.name}</td>
                <td>${formatSize(file.size)} GB</td>
            `;
            fileList.appendChild(row);
        });
    })
    .catch(error => {
        clearInterval(progressInterval);
        updateProgressBubble(100);
        setTimeout(hideProgressBubble, 500);
        console.error('Error:', error);
        alert('An error occurred while scanning the directory.');
    });
}

function selectAll() {
    const checkboxes = document.querySelectorAll('#fileList input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = true);
}

function removeSelected() {
    const checkboxes = document.querySelectorAll('#fileList input[type="checkbox"]:checked');
    const paths = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-path'));
    if (paths.length === 0) return;
    const confirmation = confirm(`Are you sure you want to remove ${paths.length} trailer files?`);
    if (confirmation) {
        showProgressBubble(0);
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 20;
            if (progress <= 80) {
                updateProgressBubble(progress);
            }
        }, 300);
        
        fetch('http://localhost:5000/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paths }),
        })
        .then(response => response.json())
        .then(data => {
            clearInterval(progressInterval);
            updateProgressBubble(100);
            setTimeout(hideProgressBubble, 500);
            alert(`${data.removed.length} files removed.`);
            scanDirectory(); // Refresh the list
        })
        .catch(error => {
            clearInterval(progressInterval);
            updateProgressBubble(100);
            setTimeout(hideProgressBubble, 500);
            console.error('Error:', error);
            alert('An error occurred while removing files.');
        });
    }
}

function browseDirectory() {
    // This is a placeholder since actual file dialog requires electron or similar desktop app context
    alert('Browsing functionality would be implemented with a desktop app context. For now, manually enter the path.');
}
