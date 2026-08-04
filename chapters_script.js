document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       0. GSAP INIT
    ========================================================= */

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Standard reveal animation for sections
        gsap.utils.toArray('.gs-reveal').forEach(elem => {
            gsap.fromTo(elem, 
                { autoAlpha: 0, y: 50 }, 
                {
                    duration: 1.2, 
                    autoAlpha: 1, 
                    y: 0, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    /* =========================================================
       1. FLOATING PARTICLES BACKGROUND (Upgraded)
    ========================================================= */
    (function createParticles() {
        const bg = document.getElementById('particles-bg');
        if (!bg) return;
        const colors = ['#F4F1E1', '#F4C430', '#FF4D6D', '#74ebd5'];
        const hearts = ['✨', '❀', '🪷', '·', '⋆'];
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
                animation-duration: ${Math.random() * 12 + 8}s;
                animation-delay: ${Math.random() * 10}s;
                background: none;
                text-shadow: 0 0 10px ${color};
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
       9. MUSIC TOGGLE, DRAGGABLE BUBBLE & AUTOPLAY
    ========================================================= */
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let musicOn = false;
    let musicInited = false;

    if (musicBtn && bgMusic) {
        musicBtn.style.display = 'flex';
        bgMusic.volume = 0.4;

        function togglePlayState(play) {
            musicOn = play;
            musicInited = true;
            
            const textNode = musicBtn.querySelector('.music-text');
            if (play) {
                musicBtn.classList.add('playing');
                if (textNode) {
                    textNode.textContent = 'ON';
                    textNode.style.color = '#F4C430';
                }
            } else {
                musicBtn.classList.remove('playing');
                if (textNode) {
                    textNode.textContent = 'OFF';
                    textNode.style.color = '#FFF';
                }
            }
        }

        // Try autoplay immediately
        bgMusic.play().then(() => {
            togglePlayState(true);
        }).catch(() => {
            // Fallback: Autoplay blocked, wait for first interaction
            const firstInteraction = () => {
                if (!musicInited) {
                    bgMusic.play().then(() => togglePlayState(true)).catch(()=>{});
                }
                ['click', 'touchstart', 'scroll'].forEach(evt => document.removeEventListener(evt, firstInteraction));
            };
            ['click', 'touchstart', 'scroll'].forEach(evt => document.addEventListener(evt, firstInteraction, { once: true }));
        });

        // Drag & Click functionality
        let isDragging = false;
        let startX, startY;
        let wasDragged = false; 
        
        const onDragStart = (e) => {
            if (e.target.closest('#music-toggle')) {
                isDragging = true;
                wasDragged = false;
                let clientX = e.touches ? e.touches[0].clientX : e.clientX;
                let clientY = e.touches ? e.touches[0].clientY : e.clientY;
                
                const rect = musicBtn.getBoundingClientRect();
                startX = clientX - rect.left;
                startY = clientY - rect.top;
                
                musicBtn.style.transition = 'none';
            }
        };

        const onDragMove = (e) => {
            if (!isDragging) return;
            wasDragged = true;
            
            if(e.cancelable) { e.preventDefault(); }
            
            let clientX = e.touches ? e.touches[0].clientX : e.clientX;
            let clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            let newX = clientX - startX;
            let newY = clientY - startY;

            const maxW = window.innerWidth - musicBtn.offsetWidth;
            const maxH = window.innerHeight - musicBtn.offsetHeight;
            newX = Math.max(0, Math.min(newX, maxW));
            newY = Math.max(0, Math.min(newY, maxH));

            musicBtn.style.left = newX + 'px';
            musicBtn.style.top = newY + 'px';
            musicBtn.style.bottom = 'auto'; 
            musicBtn.style.right = 'auto';
        };

        const onDragEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            musicBtn.style.transition = 'background 0.3s, transform 0.2s, border-color 0.3s';
        };

        // Standard native click for Play/Pause robustness
        musicBtn.addEventListener('click', (e) => {
            if (wasDragged) {
                e.preventDefault();
                return;
            }
            if (musicOn) {
                bgMusic.pause();
                togglePlayState(false);
            } else {
                bgMusic.play().then(() => togglePlayState(true)).catch(()=>{});
            }
        });

        musicBtn.addEventListener('mousedown', onDragStart);
        document.addEventListener('mousemove', onDragMove, {passive: false});
        document.addEventListener('mouseup', onDragEnd);

        musicBtn.addEventListener('touchstart', onDragStart, {passive: true});
        document.addEventListener('touchmove', onDragMove, {passive: false});
        document.addEventListener('touchend', onDragEnd);
    }

    /* Hero Photos Auto-Cycler */
    (function initHeroPhotosCycler() {
        const photos = document.querySelectorAll('.stack-photo');
        if (!photos.length) return;

        // Initial setup
        const positions = ['pos-1', 'pos-2', 'pos-3', 'pos-4'];
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
   11. THE LETTER SURPRISE (VRINDAVAN FINALE)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Generate Vrindavan Background magic
    const fxParticles = document.querySelector('.layer-particles');
    const fxFireflies = document.querySelector('.layer-fireflies');

    if (fxParticles) {
        for(let i=0; i<60; i++) {
            let p = document.createElement('div');
            p.style.cssText = `position:absolute; width:${Math.random()*3+1}px; height:${Math.random()*3+1}px; background:#F4C430; border-radius:50%; box-shadow:0 0 6px #F4C430; top:${Math.random()*100}%; left:${Math.random()*100}%; opacity:${Math.random()}; animation: floatUp ${Math.random()*15+8}s linear infinite;`;
            fxParticles.appendChild(p);
        }
    }
    if (fxFireflies) {
        for(let i=0; i<35; i++) {
            let f = document.createElement('div');
            f.style.cssText = `position:absolute; width:4px; height:4px; background:#D4AF37; border-radius:50%; box-shadow:0 0 12px 3px #F4C430, 0 0 25px #FFF; top:${Math.random()*100}%; left:${Math.random()*100}%; animation: fireflyDart ${Math.random()*8+5}s ease-in-out infinite alternate;`;
            fxFireflies.appendChild(f);
        }
    }
    
    // Add keyframes dynamically if not present
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatUp { from { transform: translateY(0); } to { transform: translateY(-100vh); } }
        @keyframes fireflyDart { 0% { transform: translate(0, 0) scale(1); opacity:0.2;} 50% { transform: translate(${Math.random()*50-25}px, -30px) scale(1.6); opacity:1;} 100% { transform: translate(${Math.random()*100-50}px, -60px) scale(0.8); opacity:0.1;} }
    `;
    document.head.appendChild(style);

    const sealBtn = document.getElementById('wax-seal-btn');
    const envelopeStage = document.getElementById('envelope-stage');
    // Allow clicking anywhere on the entire envelope to open it (Fixes laptop mode issue)
    const envelopeBody = document.querySelector('.royal-envelope');
    
    const noteContainer = document.getElementById('secret-note-container');
    const fireworks = document.getElementById('fireworks');
    const psSurprise = document.getElementById('ps-surprise');
    const psBtn = document.getElementById('ps-btn');
    const psReveal = document.getElementById('ps-reveal');
    const escapeParticles = document.getElementById('escape-particles');

    if (sealBtn) {
        sealBtn.addEventListener('click', breakSeal, { once: true });
    }
    if (envelopeBody) {
        envelopeBody.addEventListener('click', breakSeal, { once: true });
    }

    function breakSeal() {
        if(sealBtn) sealBtn.classList.add('cracked');
        if(envelopeBody) envelopeBody.style.pointerEvents = 'none';

        // Explode magic particles from inside
        if (escapeParticles) {
            for(let i=0; i<40; i++){
                let p = document.createElement('div');
                const types = ['✨', '💖', '🌸', '💫'];
                p.textContent = types[Math.floor(Math.random() * types.length)];
                p.style.cssText = `position:absolute; top:50%; left:50%; font-size:${Math.random()*18+12}px; transform:translate(-50%,-50%); transition:all 2.5s cubic-bezier(0.16, 1, 0.3, 1); opacity:1; z-index:50; pointer-events:none;`;
                escapeParticles.appendChild(p);
                
                setTimeout(() => {
                    p.style.transform = `translate(${(Math.random()-0.5)*500}px, ${(Math.random()-0.5)*500 - 150}px) scale(${Math.random()+0.5}) rotate(${Math.random()*360}deg)`;
                    p.style.opacity = '0';
                }, 50);
            }
        }

        // --- Grand Innovative Sparkler Crackers (Fireworks) ---
        const finaleBg = document.querySelector('.magical-vrindavan-finale');
        if (finaleBg) {
            // Launch 12 majestic fireworks!
            for(let j=0; j<12; j++){
                setTimeout(() => {
                    let fw = document.createElement('div');
                    fw.className = 'grand-firework';
                    fw.style.left = `${Math.random()*80 + 10}%`; // 10% to 90%
                    fw.style.bottom = '10%'; // Start from bottom
                    finaleBg.appendChild(fw);
                    
                    // Create particles for this firework
                    for(let k=0; k<35; k++) {
                        let fwp = document.createElement('div');
                        fwp.className = 'fw-particle';
                        const colors = ['#F4C430', '#D4AF37', '#FF6B81', '#FFF', '#00D2C8'];
                        let col = colors[Math.floor(Math.random() * colors.length)];
                        fwp.style.background = col;
                        fwp.style.boxShadow = `0 0 10px ${col}, 0 0 20px ${col}`;
                        let angle = Math.random() * Math.PI * 2;
                        let dist = Math.random() * 200 + 50; 
                        let tx = Math.cos(angle) * dist;
                        let ty = Math.sin(angle) * dist;
                        
                        fwp.style.setProperty('--tx', `${tx}px`);
                        fwp.style.setProperty('--ty', `${ty}px`);
                        fw.appendChild(fwp);
                    }
                    
                    // Automatically clean up firework node
                    setTimeout(() => { if(fw.parentNode) fw.parentNode.removeChild(fw); }, 4000);
                }, j * 450); // Stagger them
            }
        }

        // Screen flash, matching the theme's existing blast effect
        const blast = document.createElement('div');
        blast.className = 'screen-blast';
        document.body.appendChild(blast);

        setTimeout(() => {
            blast.classList.add('explode');
            if (envelopeStage) envelopeStage.classList.add('opened');
            if (noteContainer) noteContainer.classList.add('open');
            revealLetterLines();
        }, 1000); // Slower, more cinematic opening

        setTimeout(() => {
            if (blast.parentNode) blast.parentNode.removeChild(blast);
        }, 2500);
    }

    function revealLetterLines() {
        const lines = document.querySelectorAll('#luxury-letter .letter-line');
        lines.forEach((line, i) => {
            setTimeout(() => line.classList.add('visible'), 600 + i * 350);
        });

        // After the last line has appeared, close the moment with fireworks + the P.S. option
        const totalDelay = 600 + lines.length * 350 + 600;
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

/* =========================================================
   12. MAGICAL FAIRY LIGHT BORDERS ON CHAPTER CARDS
   Dynamically wraps chapter cards with glowing fairy wires
   and beautiful corner floral assets
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Apply to alternate chapters (index 0, 2, 4...) and the final letter
    const sections = document.querySelectorAll('section.memory-section');
    const targetedCards = [];

    sections.forEach((sec, index) => {
        if (index % 2 === 0) {
            const card = sec.querySelector('.manuscript-card, .story-card.vertical-card');
            if (card) targetedCards.push(card);
        }
    });

    // Also add lighting for the final letter
    const luxuryLetter = document.getElementById('luxury-letter');
    if (luxuryLetter) targetedCards.push(luxuryLetter);
    
    targetedCards.forEach(card => {
        card.classList.add('has-fairy-border');
        
        // Container for wires and lights
        const borderWrap = document.createElement('div');
        borderWrap.className = 'fairy-lights-wrap';
        
        // Generate glowing bulbs (fairy lights) along the perimeter
        // Roughly 40 lights per card
        for (let i = 0; i < 40; i++) {
            const light = document.createElement('div');
            light.className = 'fairy-light bulb-' + (i % 3);
            
            // Distribute along 4 edges: 0 = top, 1 = right, 2 = bottom, 3 = left
            let edge = i % 4;
            // Position along the edge (5% to 95% to leave corners free for flowers)
            let posPos = 5 + (Math.random() * 90); 
            let offset = (Math.random() - 0.5) * 12; // Wobble away from the straight wire
            
            if (edge === 0) { 
                light.style.top = '-2px'; 
                light.style.left = posPos + '%'; 
                light.style.transform = `translateY(${offset}px)`; 
            } else if (edge === 1) { 
                light.style.right = '-2px'; 
                light.style.top = posPos + '%'; 
                light.style.transform = `translateX(${offset}px)`; 
            } else if (edge === 2) { 
                light.style.bottom = '-2px'; 
                light.style.left = posPos + '%'; 
                light.style.transform = `translateY(${offset}px)`; 
            } else if (edge === 3) { 
                light.style.left = '-2px'; 
                light.style.top = posPos + '%'; 
                light.style.transform = `translateX(${offset}px)`; 
            }
            
            // Randomize blink delay
            light.style.animationDelay = (Math.random() * 3) + 's';
            
            borderWrap.appendChild(light);
        }
        
        // --- Add Floral Corners ---
        // Top-Left Corner
        const cornerTL = document.createElement('div');
        cornerTL.className = 'fairy-corner tl';
        cornerTL.innerHTML = `
            <span class="corner-flower" style="top:-6px; left:-2px; font-size:32px; transform:rotate(-35deg);">🌸</span>
            <span class="corner-flower" style="top:-14px; left:18px; font-size:24px; transform:rotate(25deg);">🍃</span>
            <span class="corner-flower" style="top:18px; left:-8px; font-size:28px; transform:rotate(-70deg);">🌿</span>
            <span class="corner-flower" style="top:12px; left:12px; font-size:18px;">🌺</span>
            <!-- Glowing accent dots -->
            <div style="position:absolute; width:4px; height:4px; background:#fff; border-radius:50%; top:28px; left:28px; box-shadow:0 0 8px #FFD700;"></div>
        `;
        borderWrap.appendChild(cornerTL);
        
        // Bottom-Right Corner
        const cornerBR = document.createElement('div');
        cornerBR.className = 'fairy-corner br';
        cornerBR.innerHTML = `
            <span class="corner-flower" style="bottom:-6px; right:-2px; font-size:32px; transform:rotate(145deg);">🌸</span>
            <span class="corner-flower" style="bottom:-14px; right:18px; font-size:24px; transform:rotate(-155deg);">🍃</span>
            <span class="corner-flower" style="bottom:18px; right:-8px; font-size:28px; transform:rotate(110deg);">🌿</span>
            <span class="corner-flower" style="bottom:12px; right:12px; font-size:18px;">🌺</span>
            <!-- Glowing accent dots -->
            <div style="position:absolute; width:4px; height:4px; background:#fff; border-radius:50%; bottom:28px; right:28px; box-shadow:0 0 8px #FFD700;"></div>
        `;
        borderWrap.appendChild(cornerBR);
        
        card.appendChild(borderWrap);
    });
});