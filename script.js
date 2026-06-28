document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. FLOATING PARTICLES BACKGROUND
    ========================================================= */
    (function createParticles() {
        const bg = document.getElementById('particles-bg');
        if (!bg) return;
        const colors = ['#ff4d6d','#f4c430','#ffb3c1','#c77dff','#ff8fab','#ffe082'];
        const hearts = ['♥','✦','✿','❋','·'];
        for (let i = 0; i < 40; i++) {
            const el = document.createElement('div');
            el.classList.add('particle');
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const heart = hearts[Math.floor(Math.random() * hearts.length)];
            el.style.cssText = `
                left: ${Math.random() * 100}vw;
                width: ${size}px; height: ${size}px;
                color: ${color};
                font-size: ${size}px;
                animation-duration: ${Math.random() * 12 + 6}s;
                animation-delay: ${Math.random() * 10}s;
                background: none;
            `;
            el.textContent = heart;
            bg.appendChild(el);
        }
    })();

    /* =========================================================
       2. RELATIONSHIP COUNTER — starts Sep 18, 2025
    ========================================================= */
    const LOVE_START = new Date('2025-09-18T00:00:00+05:30');

    function updateCounter() {
        const now = new Date();
        const diff = now - LOVE_START;
        if (diff < 0) return;

        const totalSecs = Math.floor(diff / 1000);
        const secs  = totalSecs % 60;
        const mins  = Math.floor(totalSecs / 60) % 60;
        const hours = Math.floor(totalSecs / 3600) % 24;
        const days  = Math.floor(totalSecs / 86400);

        const pad = (n, d = 2) => String(n).padStart(d, '0');

        const elDays  = document.getElementById('cnt-days');
        const elHours = document.getElementById('cnt-hours');
        const elMins  = document.getElementById('cnt-mins');
        const elSecs  = document.getElementById('cnt-secs');

        if (elDays)  elDays.textContent  = pad(days, 3);
        if (elHours) elHours.textContent = pad(hours);
        if (elMins)  elMins.textContent  = pad(mins);
        if (elSecs)  elSecs.textContent  = pad(secs);
    }
    updateCounter();
    setInterval(updateCounter, 1000);

    /* =========================================================
       3. CUSTOM CURSOR
    ========================================================= */
    const cursor = document.querySelector('.cursor-follower');
    if (cursor && window.matchMedia('(hover: hover)').matches) {
        let mx = 0, my = 0, cx = 0, cy = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        (function moveCursor() {
            cx += (mx - cx) * 0.15;
            cy += (my - cy) * 0.15;
            cursor.style.left = cx + 'px';
            cursor.style.top  = cy + 'px';
            requestAnimationFrame(moveCursor);
        })();
    }

    /* =========================================================
       4. SCROLL PROGRESS BAR
    ========================================================= */
    const bar = document.getElementById('scroll-progress');
    if (bar) {
        window.addEventListener('scroll', () => {
            const scrolled = document.documentElement.scrollTop;
            const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            bar.style.width = ((scrolled / total) * 100) + '%';
        }, { passive: true });
    }

    /* =========================================================
       5. SCROLL REVEAL
    ========================================================= */
    const revealEls = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));

    /* =========================================================
       6. BIRTHDAY BALLOONS
    ========================================================= */
    (function createBalloons() {
        const container = document.getElementById('balloons');
        if (!container) return;
        const colors = ['#ff4d6d','#f4c430','#c77dff','#ff8fab','#4cc9f0','#80ffdb'];
        for (let i = 0; i < 16; i++) {
            const b = document.createElement('div');
            b.classList.add('balloon');
            b.style.cssText = `
                left: ${Math.random() * 95}%;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                animation-duration: ${Math.random() * 8 + 6}s;
                animation-delay: ${Math.random() * 12}s;
                width: ${Math.random() * 20 + 35}px;
                height: ${Math.random() * 25 + 44}px;
            `;
            container.appendChild(b);
        }
    })();

    /* =========================================================
       7. VIDEO CALL TIMER (aesthetic only)
    ========================================================= */
    let callSec = 36000; // Start at 10 hrs history
    const callEl = document.getElementById('call-duration');
    if (callEl) {
        setInterval(() => {
            callSec++;
            const h = String(Math.floor(callSec / 3600)).padStart(2, '0');
            const m = String(Math.floor((callSec % 3600) / 60)).padStart(2, '0');
            const s = String(callSec % 60).padStart(2, '0');
            callEl.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }

    /* =========================================================
       8. MOBILE DRAWER
    ========================================================= */
    const menuBtn = document.getElementById('nav-menu-btn');
    const drawer  = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (menuBtn && drawer) {
        menuBtn.addEventListener('click', () => drawer.classList.add('open'));
        drawerClose && drawerClose.addEventListener('click', () => drawer.classList.remove('open'));
        drawerLinks.forEach(l => l.addEventListener('click', () => drawer.classList.remove('open')));
        drawer.addEventListener('click', e => {
            if (e.target === drawer) drawer.classList.remove('open');
        });
    }

    /* =========================================================
       9. MUSIC TOGGLE
    ========================================================= */
    const musicBtn  = document.getElementById('music-toggle');
    const bgMusic   = document.getElementById('bg-music');
    let musicOn = false;
    let musicInited = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (!musicInited) {
                bgMusic.volume = 0.4;
                bgMusic.play().catch(() => {});
                musicInited = true;
                musicOn = true;
            } else if (musicOn) {
                bgMusic.pause();
                musicOn = false;
            } else {
                bgMusic.play().catch(() => {});
                musicOn = true;
            }
            musicBtn.querySelector('.music-text').textContent = musicOn ? 'Music On' : 'Music Off';
            musicBtn.style.borderColor = musicOn ? '#ff4d6d' : 'rgba(255,77,109,0.4)';
        });
    }

});

/* =========================================================
   10. PHOTO FOLDER — LIGHTBOX SYSTEM
   Reads from /photos/<folder-name>/ directories.
   Because browsers can't list directories, we use a simple
   convention: the user adds images and also updates a small
   manifest JSON (auto-generated placeholder approach).
   For local file usage, we attempt to load images 1.jpg
   through 20.jpg and show ones that exist.
========================================================= */

// Folder metadata
const FOLDERS = {
    'love-confession':   {
        title: '💌 Love Confession Day — September 18, 2025',
        path:  'photos/love-confession/'
    },
    'first-meet-day1': {
        title: '🛕 Day 1 — Simhachalam Temple Visit, Vizag',
        path:  'photos/first-meet-vizag/'
    },
    'first-meet-day2': {
        title: '🌊 Day 2 — Vizag Beaches & Parks',
        path:  'photos/first-meet-vizag/'
    },
    'fav-pics': {
        title: '📸 My Favorite Pics of Her',
        path:  'photos/fav-pics/'
    },
    'second-meet-cafe': {
        title: '☕ 2nd Meet — The Cafe Day',
        path:  'photos/second-meet-cafe/'
    },
    'third-meet-vizag': {
        title: '🌅 3rd Meet — Vizag TTD & Beaches',
        path:  'photos/third-meet-vizag/'
    },
    'fourth-meet-wedding': {
        title: '💒 4th Meet — My Brother\'s Wedding',
        path:  'photos/fourth-meet-wedding/'
    },
    'video-calls': {
        title: '📱 Long Distance Video Call Screenshots',
        path:  'photos/video-calls/'
    },
    'flowers': {
        title: '🌹 My Daily Flower Collection',
        path:  'photos/flowers/'
    }
};

let currentFolderImages = [];
let currentViewerIndex  = 0;

// Reads directly from PHOTO_DATA global (generated by generate_manifests.sh)
// This works on file:// protocol with no fetch() needed
function openLightbox(folderKey) {
    const folder = FOLDERS[folderKey];
    if (!folder) return;

    const overlay = document.getElementById('lightbox-overlay');
    const titleEl = document.getElementById('lightbox-title');
    const grid    = document.getElementById('lightbox-grid');
    const emptyEl = document.getElementById('lightbox-empty');

    titleEl.textContent = folder.title;
    grid.innerHTML      = '';
    emptyEl.style.display = 'none';
    currentFolderImages = [];

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Get the folder name from path: "photos/flowers/" → "flowers"
    const folderName = folder.path.replace(/^photos\//, '').replace(/\/$/, '');

    // Read from PHOTO_DATA (injected by photo_data.js — no fetch needed)
    const files = (typeof PHOTO_DATA !== 'undefined' && PHOTO_DATA[folderName]) || [];

    if (files.length === 0) {
        showEmpty(emptyEl, folder.path);
    } else {
        renderPhotos(files, folder.path, grid);
    }
}



function autoDetectImages(basePath, grid, emptyEl) {
    // Build a wide candidate list: numbered + camera-style names
    const exts = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG'];
    const candidates = new Set();

    // Numbered: 1.jpg … 30.jpg
    for (let i = 1; i <= 30; i++) {
        exts.forEach(e => candidates.add(i + '.' + e));
    }

    // Common camera prefixes: IMG_XXXX, DSC_XXXX, PHOTO_XXXX, VID_XXXX, PXL_XXXX
    const prefixes = ['IMG_', 'DSC_', 'PHOTO_', 'PXL_', 'VID_', 'DCIM_', 'P_'];
    for (let i = 0; i <= 9999; i += 1) {
        if (i > 1100) break; // limit scan range
        const padded = String(i).padStart(4, '0');
        prefixes.forEach(pfx => {
            exts.slice(0, 4).forEach(e => candidates.add(pfx + padded + '.' + e));
        });
    }

    const candidateArr = Array.from(candidates);
    let loaded = [];
    let checked = 0;
    const ts = Date.now();

    candidateArr.forEach(name => {
        const img = new Image();
        img.onload = () => {
            loaded.push(name);
            checked++;
            if (checked === candidateArr.length) finalize();
        };
        img.onerror = () => {
            checked++;
            if (checked === candidateArr.length) finalize();
        };
        img.src = basePath + name + '?' + ts;
    });

    function finalize() {
        if (loaded.length === 0) showEmpty(emptyEl, basePath);
        else {
            // Sort naturally
            loaded.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
            renderPhotos(loaded, basePath, grid);
        }
    }
}

function encodeFilePath(basePath, file) {
    // Encode each path segment individually so spaces/special chars work
    return basePath + file.split('/').map(encodeURIComponent).join('/');
}

function renderPhotos(files, basePath, grid) {
    currentFolderImages = files.map(f => encodeFilePath(basePath, f));
    files.forEach((file, idx) => {
        const div = document.createElement('div');
        div.className = 'lb-photo';
        const img = document.createElement('img');
        img.src = encodeFilePath(basePath, file);
        img.alt = `Photo ${idx + 1}`;
        img.loading = 'lazy';
        // Show a placeholder colour while loading
        div.style.background = 'rgba(255,77,109,0.08)';
        img.onload  = () => div.style.background = '';
        img.onerror = () => { div.style.opacity = '0.3'; img.alt = 'Could not load'; };
        div.appendChild(img);
        div.addEventListener('click', () => openViewer(idx));
        grid.appendChild(div);
    });
}

function showEmpty(el, path) {
    el.style.display = 'block';
    el.querySelector('p').textContent =
        '📂 No photos found yet — add yours to the folder and they will appear here!';
    const sub = el.querySelector('.empty-sub');
    if (sub) sub.innerHTML = `Drop images into: <code>${path}</code> and name them 1.jpg, 2.jpg … etc., or add a <code>manifest.json</code> file.`;
}

function closeLightbox() {
    const overlay = document.getElementById('lightbox-overlay');
    if (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

/* Viewer */
function openViewer(idx) {
    currentViewerIndex = idx;
    const viewer = document.getElementById('photo-viewer');
    const img    = document.getElementById('viewer-img');
    img.src      = currentFolderImages[idx];
    viewer.style.display = 'flex';
    viewer.classList.add('open');
}

function closeViewer() {
    const viewer = document.getElementById('photo-viewer');
    viewer.style.display = 'none';
    viewer.classList.remove('open');
}

function prevPhoto() {
    if (currentFolderImages.length === 0) return;
    currentViewerIndex = (currentViewerIndex - 1 + currentFolderImages.length) % currentFolderImages.length;
    document.getElementById('viewer-img').src = currentFolderImages[currentViewerIndex];
}

function nextPhoto() {
    if (currentFolderImages.length === 0) return;
    currentViewerIndex = (currentViewerIndex + 1) % currentFolderImages.length;
    document.getElementById('viewer-img').src = currentFolderImages[currentViewerIndex];
}

// Keyboard support
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const viewer = document.getElementById('photo-viewer');
        if (viewer && viewer.classList.contains('open')) closeViewer();
        else closeLightbox();
    }
    if (e.key === 'ArrowLeft')  prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
});
