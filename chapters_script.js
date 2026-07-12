document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. FLOATING PARTICLES BACKGROUND
    ========================================================= */
    (function createParticles() {
        const bg = document.getElementById('particles-bg');
        if (!bg) return;
        const colors = ['#ff4d6d', '#f4c430', '#ffb3c1', '#c77dff', '#ff8fab', '#ffe082'];
        const hearts = ['♥', '✦', '✿', '❋', '·'];
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
        const secs = totalSecs % 60;
        const mins = Math.floor(totalSecs / 60) % 60;
        const hours = Math.floor(totalSecs / 3600) % 24;
        const days = Math.floor(totalSecs / 86400);

        const pad = (n, d = 2) => String(n).padStart(d, '0');

        const elDays = document.getElementById('cnt-days');
        const elHours = document.getElementById('cnt-hours');
        const elMins = document.getElementById('cnt-mins');
        const elSecs = document.getElementById('cnt-secs');

        if (elDays) elDays.textContent = pad(days, 3);
        if (elHours) elHours.textContent = pad(hours);
        if (elMins) elMins.textContent = pad(mins);
        if (elSecs) elSecs.textContent = pad(secs);
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
            cursor.style.top = cy + 'px';
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
       5b. SCROLLSPY — active nav link + chapter indicator
    ========================================================= */
    (function initScrollspy() {
        const sections = Array.from(document.querySelectorAll('main section[id]'));
        if (!sections.length) return;

        const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
        const drawerLinks = Array.from(document.querySelectorAll('.drawer-link'));
        const indicator = document.getElementById('chapter-indicator');
        const indicatorText = document.getElementById('chapter-indicator-text');

        // Friendly labels for the indicator pill
        const LABELS = {
            'hero': 'Welcome',
            'love-day': 'Chapter 01 · The Beginning',
            'first-meet': 'Chapter 02 · First Meet',
            'fav-pics': 'Chapter 03 · Her Pics',
            'second-meet': 'Chapter 04 · The Cafe',
            'third-meet': 'Chapter 05 · Vizag Again',
            'fourth-meet': 'Chapter 06 · The Wedding',
            'video-calls': 'Chapter 07 · Video Calls',
            'flowers': 'Chapter 08 · Flowers',
            'journey': 'Chapter 09 · Our Journey',
            'birthday-wish': 'The Letter'
        };

        function setActive(id) {
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
            drawerLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
            if (indicatorText) indicatorText.textContent = LABELS[id] || id;
            if (indicator) indicator.classList.toggle('visible', id !== 'hero');
        }

        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

        sections.forEach(sec => spy.observe(sec));
    })();

    /* =========================================================
       6. BIRTHDAY BALLOONS & SYMBOLS
    ========================================================= */
    (function createBalloons() {
        const container = document.getElementById('balloons');
        if (!container) return;
        const colors = ['#ff4d6d', '#f4c430', '#c77dff', '#ff8fab', '#4cc9f0', '#80ffdb'];
        const additionalSymbols = ['👑', '🌸', '✨', '💖', '']; // User requested her symbols
        for (let i = 0; i < 20; i++) {
            const b = document.createElement('div');
            const useSymbol = Math.random() > 0.5;

            if (useSymbol) {
                b.classList.add('floating-symbol');
                b.textContent = additionalSymbols[Math.floor(Math.random() * additionalSymbols.length)];
                b.style.cssText = `
                    position: absolute; bottom: -80px;
                    left: ${Math.random() * 95}%;
                    font-size: ${Math.random() * 20 + 20}px;
                    animation: riseUp linear infinite;
                    animation-duration: ${Math.random() * 8 + 6}s;
                    animation-delay: ${Math.random() * 12}s;
                    background: transparent;
                `;
            } else {
                b.classList.add('balloon');
                b.style.cssText = `
                    left: ${Math.random() * 95}%;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    animation: riseUp linear infinite, blinkAnim 3s infinite;
                    animation-duration: ${Math.random() * 8 + 6}s;
                    animation-delay: ${Math.random() * 12}s;
                    width: ${Math.random() * 20 + 35}px;
                    height: ${Math.random() * 25 + 44}px;
                `;
            }
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
    const drawer = document.getElementById('mobile-drawer');
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
       9. MUSIC TOGGLE & AUTOPLAY ON INTERACTION
    ========================================================= */
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let musicOn = false;
    let musicInited = false;

    function playMusic() {
        if (!musicInited && bgMusic) {
            bgMusic.volume = 0.4;
            bgMusic.play().then(() => {
                musicInited = true;
                musicOn = true;
                if (musicBtn) {
                    musicBtn.querySelector('.music-text').textContent = 'Music On';
                    musicBtn.style.borderColor = '#ff4d6d';
                }
            }).catch(() => { });
        }
    }

    // Attempt to start music on first screen interaction
    document.addEventListener('click', playMusic, { once: true });
    document.addEventListener('touchstart', playMusic, { once: true });
    document.addEventListener('scroll', playMusic, { once: true });

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the document click
            if (!musicInited) {
                playMusic();
            } else if (musicOn) {
                bgMusic.pause();
                musicOn = false;
            } else {
                bgMusic.play().catch(() => { });
                musicOn = true;
            }
            musicBtn.querySelector('.music-text').textContent = musicOn ? 'Music On' : 'Music Off';
            musicBtn.style.borderColor = musicOn ? '#ff4d6d' : 'rgba(255,77,109,0.4)';
        });
    }

    /* Hero Photos Auto-Cycler */
    (function initHeroPhotosCycler() {
        const photos = document.querySelectorAll('.stack-photo');
        if (!photos.length) return;

        // Initial setup
        const positions = ['pos-1', 'pos-2', 'pos-3'];
        photos.forEach((p, i) => p.classList.add(positions[i]));

        setInterval(() => {
            // Rotate the positions array
            positions.unshift(positions.pop());
            photos.forEach((p, i) => {
                p.className = 'stack-photo ' + positions[i];
            });
        }, 2500); // 2.5 seconds cycle frequency
    })();

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
    'love-confession': {
        title: '💌 Love Confession Day — September 18, 2025',
        path: 'photos/love-confession/'
    },
    'first-meet-day1': {
        title: '🛕 Day 1 — Simhachalam Temple Visit with Karamma (Karishma)',
        path: 'photos/first-meet-vizag/temple/'
    },
    'first-meet-day2': {
        title: '🌊 Day 2 — Vizag Beaches & Parks with Karamma',
        path: 'photos/first-meet-vizag/'
    },
    'fav-pics': {
        title: '📸 Bunny\'s Favorite Pics of Karamma ✨',
        path: 'photos/fav-pics/'
    },
    'second-meet-cafe': {
        title: '☕ 2nd Meet — Cafe Day (At Karamma\'s Place)',
        path: 'photos/second-meet-cafe/'
    },
    'third-meet-vizag': {
        title: '🌅 3rd Meet — Vizag TTD & Beaches',
        path: 'photos/third-meet-vizag/'
    },
    'fourth-meet-wedding': {
        title: '💒 4th Meet — Bunny\'s Brother\'s Wedding',
        path: 'photos/fourth-meet-wedding/'
    },
    'video-calls': {
        title: '📱 Long Distance — Bunny & Karamma\'s Video Chats',
        path: 'photos/video-calls/'
    },
    'flowers': {
        title: '🌹 Flowers Bunny Sent to Karamma',
        path: 'photos/flowers/'
    },
    'journey': {
        title: '🚂 Bunny & Karamma\'s First Journey Together — June 2026',
        path: 'photos/journey/'
    }
};

let currentFolderImages = [];
let currentViewerIndex = 0;

// Reads directly from PHOTO_DATA global (generated by generate_manifests.sh)
// This works on file:// protocol with no fetch() needed
function openLightbox(folderKey) {
    if (folderKey === 'love-confession' || folderKey === 'video-calls') {
        const pwd = prompt("Please enter the password to open this chapter");
        if (pwd !== "1919") {
            alert("Incorrect password! Access not allowed.");
            return;
        }
    }

    const folder = FOLDERS[folderKey];
    if (!folder) return;

    const overlay = document.getElementById('lightbox-overlay');
    const titleEl = document.getElementById('lightbox-title');
    const grid = document.getElementById('lightbox-grid');
    const emptyEl = document.getElementById('lightbox-empty');

    titleEl.textContent = folder.title;
    grid.innerHTML = '';
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

function isVideoFile(url) {
    const videoExts = ['.mp4', '.mov', '.webm', '.avi', '.mkv', '.m4v', '.3gp'];
    const lowercase = url.toLowerCase();
    return videoExts.some(ext => lowercase.endsWith(ext) || lowercase.includes(ext + '?'));
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
        div.style.position = 'relative';

        const fileUrl = encodeFilePath(basePath, file);

        if (isVideoFile(fileUrl)) {
            const video = document.createElement('video');
            video.src = fileUrl;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.autoplay = true;
            video.setAttribute('preload', 'metadata');
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';

            // Show placeholder/handle load
            div.style.background = 'rgba(255,77,109,0.08)';
            video.onloadeddata = () => div.style.background = '';
            video.onerror = () => { div.style.opacity = '0.3'; };
            div.appendChild(video);

            // Add a small video badge/icon overlay
            const badge = document.createElement('div');
            badge.className = 'media-video-badge';
            badge.innerHTML = '▶';
            div.appendChild(badge);

            // Trigger play
            video.play().catch(() => { });
        } else {
            const img = document.createElement('img');
            img.src = fileUrl;
            img.alt = `Photo ${idx + 1}`;
            img.loading = 'lazy';

            div.style.background = 'rgba(255,77,109,0.08)';
            img.onload = () => div.style.background = '';
            img.onerror = () => { div.style.opacity = '0.3'; img.alt = 'Could not load'; };
            div.appendChild(img);
        }

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

/* Viewer functions */
function openViewer(idx) {
    currentViewerIndex = idx;
    const viewer = document.getElementById('photo-viewer');
    const img = document.getElementById('viewer-img');
    const vid = document.getElementById('viewer-vid');
    const url = currentFolderImages[idx];

    if (vid) {
        vid.pause();
        vid.src = '';
        vid.style.display = 'none';
    }
    if (img) {
        img.style.display = 'none';
        img.src = '';
    }

    if (isVideoFile(url)) {
        if (vid) {
            vid.src = url;
            vid.style.display = 'block';
            vid.play().catch(() => { });
        }
    } else {
        if (img) {
            img.src = url;
            img.style.display = 'block';
        }
    }

    viewer.style.display = 'flex';
    viewer.classList.add('open');
}

function closeViewer() {
    const viewer = document.getElementById('photo-viewer');
    const vid = document.getElementById('viewer-vid');
    if (vid) {
        vid.pause();
        vid.src = '';
    }
    viewer.style.display = 'none';
    viewer.classList.remove('open');
}

function updateViewerMedia() {
    const img = document.getElementById('viewer-img');
    const vid = document.getElementById('viewer-vid');
    const url = currentFolderImages[currentViewerIndex];

    if (vid) {
        vid.pause();
        vid.src = '';
        vid.style.display = 'none';
    }
    if (img) {
        img.style.display = 'none';
        img.src = '';
    }

    if (isVideoFile(url)) {
        if (vid) {
            vid.src = url;
            vid.style.display = 'block';
            vid.play().catch(() => { });
        }
    } else {
        if (img) {
            img.src = url;
            img.style.display = 'block';
        }
    }
}

function prevPhoto() {
    if (currentFolderImages.length === 0) return;
    currentViewerIndex = (currentViewerIndex - 1 + currentFolderImages.length) % currentFolderImages.length;
    updateViewerMedia();
}

function nextPhoto() {
    if (currentFolderImages.length === 0) return;
    currentViewerIndex = (currentViewerIndex + 1) % currentFolderImages.length;
    updateViewerMedia();
}

// Keyboard support
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const viewer = document.getElementById('photo-viewer');
        if (viewer && viewer.classList.contains('open')) closeViewer();
        else closeLightbox();
    }
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
});

/* =========================================================
   11. THE LETTER SURPRISE — seal break, staggered reveal, P.S.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const sealBtn = document.getElementById('wax-seal-btn');
    const envelopeStage = document.getElementById('envelope-stage');
    const noteContainer = document.getElementById('secret-note-container');
    const fireworks = document.getElementById('fireworks');
    const psSurprise = document.getElementById('ps-surprise');
    const psBtn = document.getElementById('ps-btn');
    const psReveal = document.getElementById('ps-reveal');

    if (sealBtn) {
        sealBtn.addEventListener('click', breakSeal, { once: true });
    }

    function breakSeal() {
        sealBtn.classList.add('cracked');

        // Screen flash, matching the theme's existing blast effect
        const blast = document.createElement('div');
        blast.className = 'screen-blast';
        document.body.appendChild(blast);

        setTimeout(() => {
            blast.classList.add('explode');
            if (envelopeStage) envelopeStage.classList.add('opened');
            if (noteContainer) noteContainer.classList.add('open');
            revealLetterLines();
        }, 400);

        setTimeout(() => {
            if (blast.parentNode) blast.parentNode.removeChild(blast);
        }, 1900);
    }

    function revealLetterLines() {
        const lines = document.querySelectorAll('#luxury-letter .letter-line');
        lines.forEach((line, i) => {
            setTimeout(() => line.classList.add('visible'), 350 + i * 260);
        });

        // After the last line has appeared, close the moment with fireworks + the P.S. option
        const totalDelay = 350 + lines.length * 260 + 400;
        setTimeout(() => {
            if (fireworks) fireworks.classList.add('show');
            if (psSurprise) psSurprise.classList.add('show');
        }, totalDelay);
    }

    if (psBtn) {
        psBtn.addEventListener('click', () => {
            if (psReveal) psReveal.classList.add('open');
            psBtn.classList.add('used');
        });
    }
});