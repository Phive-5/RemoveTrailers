// Progress Bubble Script
function showProgressBubble(progress) {
    let bubble = document.getElementById('progressBubble');
    let overlay = document.getElementById('progressOverlay');
    if (!bubble) {
        overlay = document.createElement('div');
        overlay.id = 'progressOverlay';
        overlay.className = 'progress-overlay';
        document.body.appendChild(overlay);

        bubble = document.createElement('div');
        bubble.id = 'progressBubble';
        bubble.className = 'progress-bubble';
        document.body.appendChild(bubble);
    }
    bubble.setAttribute('data-progress', progress + '%');
    bubble.classList.add('active');
    overlay.classList.add('active');
}

function updateProgressBubble(progress) {
    const bubble = document.getElementById('progressBubble');
    if (bubble) {
        bubble.setAttribute('data-progress', progress + '%');
    }
}

function hideProgressBubble() {
    const bubble = document.getElementById('progressBubble');
    const overlay = document.getElementById('progressOverlay');
    if (bubble) {
        bubble.classList.remove('active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
}
