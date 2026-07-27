/**
 * Forever Us ❤️ - Luxury Birthday Surprise Gateway Script
 * Custom synthesized audio, GPU-optimized canvas particles, tilt effects, and game-like transitions.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. WEB AUDIO API SYNTHESIZER (No asset dependencies!)
       ========================================================= */
    let audioCtx = null;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Play a standard synthetic tone with pitch & volume envelopes
    function playTone(freq, type, duration, gainVal, slideToFreq = 0) {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        if (slideToFreq > 0) {
            osc.frequency.exponentialRampToValueAtTime(slideToFreq, audioCtx.currentTime + duration);
        }
        
        gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }

    // Custom sound effect models
    const sounds = {
        tap: () => playTone(600, 'sine', 0.08, 0.15, 300),
        success: () => {
            const time = audioCtx ? audioCtx.currentTime : 0;
            const delay = 0.07;
            const scale = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            scale.forEach((freq, idx) => {
                setTimeout(() => {
                    playTone(freq, 'triangle', 0.4, 0.2, freq * 1.05);
                }, idx * delay * 1000);
            });
        },
        error: () => {
            playTone(150, 'sawtooth', 0.25, 0.25);
            setTimeout(() => playTone(140, 'sawtooth', 0.25, 0.25), 80);
        },
        pop: () => {
            initAudio();
            // Generate synthetic white noise pop
            const bufferSize = audioCtx.sampleRate * 0.1; // 100ms
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;
            
            // Pop envelope
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(800, audioCtx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
            
            const gain = audioCtx.createGain();
            gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + 0.1);
            
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);
            
            noise.start();
        },
        chestOpen: () => {
            const notes = [261.63, 311.13, 392.00, 466.16, 523.25, 622.25, 783.99]; // C minor 7 arpeggio scale
            notes.forEach((freq, i) => {
                setTimeout(() => {
                    playTone(freq, 'sine', 0.9, 0.12, freq + 50);
                }, i * 110);
            });
        }
    };

    /* =========================================================
       2. BACKGROUND CANVASES / PAR-TICLE SYSTEM
       ========================================================= */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let w, h;
    let particles = [];
    const maxParticles = 65;

    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * w;
            this.y = initial ? Math.random() * h : h + 20;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 0.8 + 0.3;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.type = Math.random() > 0.65 ? 'heart' : (Math.random() > 0.4 ? 'petal' : 'star');
            this.alpha = Math.random() * 0.5 + 0.3;
            this.rotation = Math.random() * Math.PI;
            this.rotSpeed = Math.random() * 0.02 - 0.01;
            // Warm romantic hues
            const colors = [
                'rgba(255, 179, 193, ', // Soft pink
                'rgba(183, 110, 121, ', // Rose gold
                'rgba(232, 219, 252, ', // Lavender
                'rgba(244, 216, 176, '  // Warm gold
            ];
            this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotSpeed;
            if (this.y < -20 || this.x < -20 || this.x > w + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.colorBase + this.alpha + ')';
            
            if (this.type === 'heart') {
                // Mathematical Bezier curve heart drawing
                ctx.beginPath();
                ctx.moveTo(0, -this.size / 2);
                ctx.bezierCurveTo(this.size / 2, -this.size, this.size, -this.size / 2, 0, this.size);
                ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size / 2, -this.size, 0, -this.size / 2);
                ctx.fill();
            } else if (this.type === 'petal') {
                // Curved leaf/petal shape
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size / 1.6, Math.PI / 4, 0, 2 * Math.PI);
                ctx.fill();
            } else {
                // Sparkle star shape
                ctx.beginPath();
                for (let i = 0; i < 4; i++) {
                    ctx.lineTo(0, -this.size);
                    ctx.lineTo(this.size / 3, -this.size / 3);
                    ctx.rotate(Math.PI / 2);
                }
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // Initialize particles array
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* =========================================================
       2b. EMOJI FLOATER SYSTEM (hearts, flowers, sparks)
       ========================================================= */
    const floatersContainer = document.getElementById('login-floaters');
    const FLOATER_EMOJIS = ['❤️','💕','💖','💗','💓','🌸','🌺','🌹','🌷','✨','⭐','💫','🌟','🍀','💐'];
    const SPARK_EMOJIS   = ['✦','✧','⋄','◇','·','★'];

    function spawnFloater() {
        if (!floatersContainer) return;
        const el = document.createElement('span');
        const isSpark = Math.random() < 0.3;
        el.className = 'login-floater' + (isSpark ? ' spark' : '');

        const pool = isSpark ? SPARK_EMOJIS : FLOATER_EMOJIS;
        el.textContent = pool[Math.floor(Math.random() * pool.length)];

        // Random horizontal position
        el.style.left = Math.random() * 100 + 'vw';

        // Random size: smaller for sparks, larger for flowers/hearts
        const minSize = isSpark ? 0.8 : 1.2;
        const maxSize = isSpark ? 1.5 : 2.8;
        el.style.fontSize = (Math.random() * (maxSize - minSize) + minSize) + 'rem';

        // Random duration
        const dur = Math.random() * 8 + 7; // 7–15 s
        el.style.animationDuration = dur + 's';
        el.style.animationDelay = '0s';

        // Random opacity peak
        el.style.setProperty('--peak-opacity', (Math.random() * 0.5 + 0.4).toFixed(2));

        floatersContainer.appendChild(el);

        // Remove after animation ends to avoid DOM bloat
        setTimeout(() => { el.remove(); }, dur * 1000 + 500);
    }

    // Spawn continuously — staggered
    if (floatersContainer) {
        // Initial burst of floaters spread across screen
        for (let i = 0; i < 18; i++) {
            setTimeout(spawnFloater, Math.random() * 6000);
        }
        // Then continuous spawn every ~800ms
        setInterval(spawnFloater, 800);
    }

    /* =========================================================
       3. BACKGROUND MUSIC (Koyilamma Romantic Piano MP3)
       ========================================================= */
    const musicBtn = document.getElementById('floating-music-btn');
    const audioEl = document.getElementById('bg-piano-music');
    let playingMusic = false;
    let currentAudioSource = 'assets/music/Gulabi Kallu Rendu Mullu (PenduJatt.Com.Se).mp3';

    function toggleMusic(forcePlay = null) {
        initAudio();
        const action = forcePlay !== null ? forcePlay : !playingMusic;
        
        if (action) {
            audioEl.volume = 0.45;
            audioEl.play()
                .then(() => {
                    playingMusic = true;
                    musicBtn.classList.add('playing');
                    musicBtn.querySelector('.btn-icon').textContent = '🔊';
                    musicBtn.querySelector('.btn-text').textContent = 'Playing';
                })
                .catch(() => {
                    console.log("Music blocked by browser policy.");
                });
        } else {
            audioEl.pause();
            playingMusic = false;
            musicBtn.classList.remove('playing');
            musicBtn.querySelector('.btn-icon').textContent = '🔇';
            musicBtn.querySelector('.btn-text').textContent = 'Muted';
        }
    }

    function crossfadeToNewSong(newSrc) {
        if (!playingMusic) {
            audioEl.src = newSrc;
            currentAudioSource = newSrc;
            return;
        }
        
        // fade out
        let vol = 0.45;
        const fadeOutInt = setInterval(() => {
            if (vol > 0.05) {
                vol -= 0.05;
                audioEl.volume = vol;
            } else {
                clearInterval(fadeOutInt);
                audioEl.pause();
                audioEl.src = newSrc;
                currentAudioSource = newSrc;
                audioEl.load();
                
                audioEl.play().then(() => {
                    // fade in
                    let volIn = 0;
                    audioEl.volume = volIn;
                    const fadeInInt = setInterval(() => {
                        if (volIn < 0.4) {
                            volIn += 0.05;
                            audioEl.volume = volIn;
                        } else {
                            clearInterval(fadeInInt);
                        }
                    }, 100);
                }).catch(() => {});
            }
        }, 100);
    }

    musicBtn.addEventListener('click', () => toggleMusic());

    // Auto action events to trigger playing background audio on interface engagement
    const startAudioOnInteraction = () => {
        if (!playingMusic) toggleMusic(true);
        ['click', 'touchstart', 'keydown'].forEach(evt => {
            document.removeEventListener(evt, startAudioOnInteraction);
        });
    };
    ['click', 'touchstart', 'keydown'].forEach(evt => {
        document.addEventListener(evt, startAudioOnInteraction, { passive: true });
    });

    /* =========================================================
       4. PAGE 1: SECURITY PIN CODE COMPONENT
       ========================================================= */
    const hardcodedPin = "000619";
    let enteredPin = "";
    const maxPinLength = 6;
    
    const pinDots = Array.from({ length: maxPinLength }, (_, i) => document.getElementById(`dot-${i}`));
    const pinError = document.getElementById('pin-error');
    const lockCard = document.getElementById('lock-card');
    
    // Core Keypad Interaction
    document.getElementById('numeric-keypad').addEventListener('click', (e) => {
        const btn = e.target.closest('.keypad-button');
        if (!btn || enteredPin.length >= maxPinLength && btn.dataset.val !== 'backspace') return;
        
        sounds.tap();
        
        const val = btn.dataset.val;

        if (val === 'backspace') {
            if (enteredPin.length > 0) {
                enteredPin = enteredPin.slice(0, -1);
                updatePinDots();
            }
        } else if (val === 'heart') {
            // Secret Easter egg: typing custom love
            e.stopPropagation();
        } else {
            enteredPin += val;
            updatePinDots();
            if (enteredPin.length === maxPinLength) {
                setTimeout(verifyPinCode, 250);
            }
        }
    });

    function updatePinDots() {
        pinError.classList.remove('visible');
        pinDots.forEach((dot, idx) => {
            if (idx < enteredPin.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled', 'error');
            }
        });
    }

    function verifyPinCode() {
        if (enteredPin === hardcodedPin) {
            sounds.success();
            // Unlock animations
            lockCard.classList.add('unlock-fadeout');
            document.getElementById('login-experience').classList.add('unlock-fadeout');
            
            // Spawn luxury explosion particles
            triggerMagicalExplosion();
            
            setTimeout(() => {
                document.getElementById('login-experience').classList.remove('active', 'unlock-fadeout');
                
                // Redirect directly to the chapters page
                window.location.href = 'chapters.html';
            }, 650);
            
        } else {
            sounds.error();
            // Shake visual card & error state
            lockCard.classList.add('shake-ani');
            pinDots.forEach(dot => dot.classList.add('error'));
            pinError.classList.add('visible');
            
            setTimeout(() => {
                lockCard.classList.remove('shake-ani');
                enteredPin = "";
                updatePinDots();
            }, 1000);
        }
    }

    /* =========================================================
       5. MAGIC SUCCESS TRANSITION EFFECTS
       ========================================================= */
    function triggerMagicalExplosion() {
        const colors = ['#ffd700', '#ff8fab', '#b76e79', '#e8dbfc', '#ff4d6d'];
        for (let i = 0; i < 90; i++) {
            const exp = document.createElement('div');
            exp.style.cssText = `
                position: fixed;
                top: 50vh;
                left: 50vw;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                z-index: 9999;
                pointer-events: none;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(exp);
            
            // Random direction calculations
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 12 + 6;
            const dx = Math.cos(angle) * velocity;
            const dy = Math.sin(angle) * velocity;
            
            let posX = window.innerWidth / 2;
            let posY = window.innerHeight / 2;
            let alpha = 1;
            
            function updateExpFrame() {
                posX += dx;
                posY += dy + 0.12; // Gravitational fall
                alpha -= 0.012;
                
                exp.style.left = posX + 'px';
                exp.style.top = posY + 'px';
                exp.style.opacity = alpha;
                
                if (alpha > 0) {
                    requestAnimationFrame(updateExpFrame);
                } else {
                    exp.remove();
                }
            }
            requestAnimationFrame(updateExpFrame);
        }
    }

    /* =========================================================
       6. SURPRISE SEQUENCE RUNNER
       ========================================================= */
    function startSurpriseSeq() {
        // Individual character typography reveal animations
        const titleContainer = document.getElementById('animated-birthday-title');
        const originalText = titleContainer.textContent.trim();
        titleContainer.innerHTML = '';
        
        [...originalText].forEach((letter, i) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.style.animationDelay = `${i * 0.06}s`;
            span.className = 'heading-letter ruby-gold';
            titleContainer.appendChild(span);
        });

        // Start text message typing animation
        setTimeout(startTypewritingMsg, 1000);
        
        // Populate the photo album polaroid components
        buildSurpriseGallery();
        
        // Spawn active drifting balloons
        spawnDriftingBalloons();
    }

    const typeMsg = `You are the most beautiful chapter of my life.

Every smile of yours makes my world brighter.

Every hug feels like home.

Every moment with you becomes my favorite memory.

Thank you for being the reason behind my happiest days.

I love you more than words can ever express.

Cannot wait for your Birthday My Karammmaaa ❤️`;

    function startTypewritingMsg() {
        const speed = 36; // Typing character delay time (ms)
        const typedContainer = document.getElementById('typed-surprise-msg');
        let idx = 0;
        
        typedContainer.innerHTML = '';
        const cursorNode = document.createElement('span');
        cursorNode.className = 'typing-cursor';
        typedContainer.appendChild(cursorNode);

        function type() {
            if (idx < typeMsg.length) {
                const char = typeMsg.charAt(idx);
                // Insert letter before cursor node
                cursorNode.before(char);
                idx++;
                
                // Adaptive delay logic for breaks
                let delay = speed;
                if (char === '\n') delay = 350;
                else if (char === '.') delay = 200;
                
                setTimeout(type, delay);
            } else {
                cursorNode.remove();
            }
        }
        type();
    }

    /* =========================================================
       7. GALLERY COMPONENT GRID GENERATOR (Polaroids + dynamic tilt)
       ========================================================= */
    const polaroidGallery = document.getElementById('polaroid-gallery');
    
    // Use all 7 images from first page karamma for the premium gallery with unique captions
    const fallbackPics = [
        { url: "photos/first page karamma/WhatsApp_Image_2026-06-28_at_12.22.53_PM.jpeg", title: "Sweeter than the stars ✨" },
        { url: "photos/first page karamma/WhatsApp_Image_2026-06-28_at_12.22.53_PM_11_.jpeg", title: "My absolute favorite glow 💛" },
        { url: "photos/first page karamma/WhatsApp_Image_2026-06-28_at_12.22.53_PM_13_.jpeg", title: "Where poetry meets you 🌸" },
        { url: "photos/first page karamma/WhatsApp_Image_2026-06-28_at_12.22.53_PM_1_.jpeg", title: "Lost in your eyes 💫" },
        { url: "photos/first page karamma/WhatsApp_Image_2026-06-28_at_12.22.53_PM_2_.jpeg", title: "Perfection in a frame 📸" },
        { url: "photos/first page karamma/WhatsApp_Image_2026-06-28_at_12.22.53_PM_3_.jpeg", title: "That beautiful smile 😍" },
        { url: "photos/first page karamma/WhatsApp_Image_2026-06-28_at_12.22.53_PM_7_.jpeg", title: "My entire universe 🌍" }
    ];

    let itemsSource = [];
    const basePath = ''; // Reset base path as we provide full paths

    function buildSurpriseGallery() {
        polaroidGallery.innerHTML = '';
        
        let fileList = [];
        if (typeof PHOTO_DATA !== 'undefined' && PHOTO_DATA['fav-pics']) {
            fileList = PHOTO_DATA['fav-pics'].map(f => {
                return { url: 'photos/fav-pics/' + f, title: 'Beautiful Smiles ✨' }
            });
        }
        
        if (fileList.length === 0) {
            fileList = fallbackPics;
        }

        itemsSource = fileList.map((item) => {
            return {
                url: item.url,
                title: item.title
            };
        });

        // Slice up to display ~14 images for luxury performance
        itemsSource.slice(0, 16).forEach((item, idx) => {
            const polaroid = document.createElement('div');
            polaroid.className = 'gallery-polaroid';
            
            // Random minor tilt rotation for scrapbook effect
            const randAng = Math.random() * 6 - 3;
            polaroid.style.transform = `rotate(${randAng}deg)`;
            
            // Identify if video item
            const isVideo = item.url.toLowerCase().endsWith('.mp4') || item.url.toLowerCase().endsWith('.mov');

            polaroid.innerHTML = `
                <div class="polaroid-light-sheen"></div>
                <div class="gallery-img-wrap">
                    ${isVideo ? `
                        <video src="${item.url}" muted playsinline loop style="width:100%;height:100%;object-fit:cover;"></video>
                        <div class="gallery-video-indicator">▶</div>
                    ` : `
                        <img src="${item.url}" alt="Memory photo" loading="lazy">
                    `}
                </div>
                <div class="gallery-caption">${item.title}</div>
                <div class="polaroid-gold-seal">✦ M &amp; K ✦</div>
            `;

            // Hover parallax tilt & light sheen cursor tracking actions
            polaroid.addEventListener('mousemove', (e) => {
                const rect = polaroid.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const midX = rect.width / 2;
                const midY = rect.height / 2;
                
                // Tilt ranges
                const tiltX = -(y - midY) / 12;
                const tiltY = (x - midX) / 12;
                
                const px = (x / rect.width) * 100;
                const py = (y / rect.height) * 100;
                polaroid.style.setProperty('--mouse-x', px + '%');
                polaroid.style.setProperty('--mouse-y', py + '%');
                
                polaroid.style.transform = `scale(1.06) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotate(0deg)`;
            });

            polaroid.addEventListener('mouseleave', () => {
                polaroid.style.transform = `rotate(${randAng}deg) rotateX(0deg) rotateY(0deg) scale(1)`;
            });

            // Tap actions opening fullscreen modal lightbox
            polaroid.addEventListener('click', () => {
                openLightboxModal(idx);
            });

            polaroidGallery.appendChild(polaroid);
        });
    }

    /* =========================================================
       8. LIGHTBOX MODAL IMAGE VIEWER (Touch & swipe supported)
       ========================================================= */
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalVideo = document.getElementById('lightbox-video');
    const modalCaption = document.getElementById('lightbox-caption');
    const modalClose = document.getElementById('lightbox-close');
    
    let currentModalIdx = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function openLightboxModal(idx) {
        currentModalIdx = idx;
        modal.classList.add('open');
        updateModalMedia();
    }

    function updateModalMedia() {
        const item = itemsSource[currentModalIdx];
        const isVideo = item.url.toLowerCase().endsWith('.mp4') || item.url.toLowerCase().endsWith('.mov');
        
        modalImg.style.display = 'none';
        modalVideo.style.display = 'none';
        modalVideo.pause();
        
        modalCaption.textContent = item.title;

        if (isVideo) {
            modalVideo.src = item.url;
            modalVideo.style.display = 'block';
            modalVideo.play().catch(() => {});
        } else {
            modalImg.src = item.url;
            modalImg.style.display = 'block';
        }
    }

    function closeModal() {
        modal.classList.remove('open');
        modalVideo.src = '';
        modalVideo.pause();
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-content-wrapper')) {
            closeModal();
        }
    });

    // Slider arrows trigger
    document.getElementById('lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        currentModalIdx = (currentModalIdx - 1 + itemsSource.length) % itemsSource.length;
        updateModalMedia();
    });

    document.getElementById('lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        currentModalIdx = (currentModalIdx + 1) % itemsSource.length;
        updateModalMedia();
    });

    // Keyboard support trigger
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') {
            currentModalIdx = (currentModalIdx - 1 + itemsSource.length) % itemsSource.length;
            updateModalMedia();
        }
        if (e.key === 'ArrowRight') {
            currentModalIdx = (currentModalIdx + 1) % itemsSource.length;
            updateModalMedia();
        }
    });

    // Mobile Swipe Gesture Controls
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, { passive: true });

    function handleSwipeGesture() {
        const threshold = 55;
        if (touchStartX - touchEndX > threshold) {
            // Swipe Left -> next
            currentModalIdx = (currentModalIdx + 1) % itemsSource.length;
            updateModalMedia();
        }
        if (touchEndX - touchStartX > threshold) {
            // Swipe Right -> previous
            currentModalIdx = (currentModalIdx - 1 + itemsSource.length) % itemsSource.length;
            updateModalMedia();
        }
    }

    /* =========================================================
       9. LIVE BIRTHDAY COUNTER (August 19)
       ========================================================= */
    function getNextBirthday() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let bday = new Date(currentYear, 7, 19, 0, 0, 0); // August is month 7 (0-indexed)
        if (now > bday) {
            bday = new Date(currentYear + 1, 7, 19, 0, 0, 0);
        }
        return bday;
    }

    function updateLiveCounter() {
        const nextBday = getNextBirthday();
        const now = new Date();
        const diff = nextBday - now;
        
        if (diff < 0) return;

        const totalSecs = Math.floor(diff / 1000);
        const secs = totalSecs % 60;
        const mins = Math.floor(totalSecs / 60) % 60;
        const hours = Math.floor(totalSecs / 3600) % 24;
        const days = Math.floor(totalSecs / 86400);

        const pad = (n) => String(n).padStart(2, '0');

        const elDays = document.getElementById('bday-days');
        const elHours = document.getElementById('bday-hours');
        const elMins = document.getElementById('bday-minutes');
        const elSecs = document.getElementById('bday-seconds');

        if (elDays) elDays.textContent = String(days).padStart(3, '0');
        if (elHours) elHours.textContent = pad(hours);
        if (elMins) elMins.textContent = pad(mins);
        if (elSecs) elSecs.textContent = pad(secs);
    }
    updateLiveCounter();
    setInterval(updateLiveCounter, 1000);

    /* =========================================================
       10. ACTIVE TIMELINE ANIMATIONS (Scroll Observer)
       ========================================================= */
    const timelineItems = document.querySelectorAll('.scroll-animate-in');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    timelineItems.forEach(el => scrollObserver.observe(el));

    /* =========================================================
       11. ENVELOPE LOVE LETTER LOGIC
       ========================================================= */
    const envelope = document.getElementById('love-envelope');
    envelope.addEventListener('click', (e) => {
        e.stopPropagation();
        envelope.classList.toggle('open');
    });

    /* =========================================================
       12. BALLOONS SPAWN POPPING SURPRISES
       ========================================================= */
    const wishesList = [
        "May your 20th year be as beautiful as your smile! 🌸",
        "Wishing you endless laughter and joy today! 🎈",
        "I wish to hold your hand in every chapter of our lives. 🤝",
        "May all your dreams paint into reality, my princess! ✨",
        "An ocean of hugs and kisses for you today! 🌊",
        "May your heart always feel as warm as you make mine. 💖",
        "Wishing you the happiest, sweetest days ahead! 🍫",
        "To the most special girl: The countdown begins! 👑",
        "You are my absolute favorite chapter, forever us! ❤️",
        "Counting down the days to your beautiful birthday! 🥂"
    ];

    const balloonColors = ['#ff8fab', '#ffe5ec', '#b76e79', '#d4af37', '#e8dbfc', '#ff4d6d'];
    const arena = document.getElementById('balloon-arena');
    const toast = document.getElementById('pop-wish-toast');
    const toastMsg = document.getElementById('toast-message');

    function spawnDriftingBalloons() {
        arena.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            createSingleBalloon(i);
        }
    }

    function createSingleBalloon(idx) {
        const balloon = document.createElement('div');
        balloon.className = 'drifting-balloon';
        
        const randomLeft = Math.random() * 85 + 5; // offset percent
        const randomDuration = Math.random() * 6 + 7; // speed variation
        const randomDelay = Math.random() * 5; // staggering
        
        balloon.style.left = randomLeft + '%';
        balloon.style.animationDuration = randomDuration + 's';
        balloon.style.animationDelay = '-' + randomDelay + 's'; // negative starts mid-run

        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];

        balloon.innerHTML = `
            <div class="balloon-body" style="background:${color};"></div>
            <div class="balloon-string"></div>
            <div class="balloon-wish-hint">Tap Me</div>
        `;

        balloon.addEventListener('click', (e) => {
            e.stopPropagation();
            balloon.classList.add('popped');
            sounds.pop();
            
            // Small pop screen particles
            spawnPopParticles(e.clientX, e.clientY, color);
            
            // Pop wish message toast notification
            const wish = wishesList[idx % wishesList.length];
            showWishToast(wish);
            
            // Respawn after 3 seconds
            setTimeout(() => {
                balloon.classList.remove('popped');
                balloon.style.left = (Math.random() * 85 + 5) + '%';
            }, 3500);
        });

        arena.appendChild(balloon);
    }

    function spawnPopParticles(cx, cy, color) {
        const rect = arena.getBoundingClientRect();
        const localX = cx - rect.left;
        const localY = cy - rect.top;

        for (let i = 0; i < 15; i++) {
            const part = document.createElement('div');
            part.style.cssText = `
                position: absolute;
                left: ${localX}px;
                top: ${localY}px;
                width: ${Math.random() * 6 + 3}px;
                height: ${Math.random() * 6 + 3}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
            `;
            arena.appendChild(part);

            const dx = Math.random() * 6 - 3;
            const dy = Math.random() * 6 - 3;
            let px = localX;
            let py = localY;
            let alpha = 1;

            function runPart() {
                px += dx;
                py += dy + 0.05;
                alpha -= 0.02;
                part.style.left = px + 'px';
                part.style.top = py + 'px';
                part.style.opacity = alpha;
                if (alpha > 0) {
                    requestAnimationFrame(runPart);
                } else {
                    part.remove();
                }
            }
            requestAnimationFrame(runPart);
        }
    }

    let toastTimeout;
    function showWishToast(msg) {
        clearTimeout(toastTimeout);
        toastMsg.textContent = msg;
        toast.classList.add('visible');
        toastTimeout = setTimeout(() => {
            toast.classList.remove('visible');
        }, 3200);
    }

    /* =========================================================
       13. FINAL SURPRISE: GOLDEN TREASURE CHEST
       ========================================================= */
    const openBoxBtn = document.getElementById('open-box-btn');
    const chestContainer = document.getElementById('treasure-chest-container');
    const chest = document.getElementById('treasure-chest');
    const chestSparkles = document.getElementById('chest-sparkles');
    const treasureReveal = document.getElementById('treasure-reveal');
    let chestOpened = false;

    openBoxBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openBoxBtn.style.display = 'none';
        chestContainer.classList.add('visible');
    });

    chest.addEventListener('click', (e) => {
        e.stopPropagation();
        if (chestOpened) return;

        // Visual shaking feedback
        chest.classList.add('shake');
        sounds.tap();

        setTimeout(() => {
            chest.classList.remove('shake');
            chest.classList.add('open');
            sounds.chestOpen();
            chestOpened = true;
            
            // Sparkles emission interval
            emitGoldSparkles();
            
            // Fade-in chapters unlock button
            setTimeout(() => {
                treasureReveal.classList.add('visible');
            }, 1000);

        }, 400);
    });

    function emitGoldSparkles() {
        let count = 0;
        const colors = ['#ffd700', '#fff', '#e0a35e', '#ff8fab'];
        const interval = setInterval(() => {
            if (count > 25) {
                clearInterval(interval);
                return;
            }
            const sp = document.createElement('div');
            sp.className = 'chest-sparkle';
            // Offset positioning inside chest structure
            sp.style.left = (Math.random() * 120 + 30) + 'px';
            sp.style.top = '30px';
            sp.style.background = colors[Math.floor(Math.random() * colors.length)];
            sp.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
            
            chestSparkles.appendChild(sp);
            count++;
            
            setTimeout(() => sp.remove(), 1200);
        }, 80);
    }

    // Existing Chapters Redirect Trigger Link
    document.getElementById('view-chapters-btn').addEventListener('click', () => {
        sounds.success();
        // Redirect to renamed chapters file
        setTimeout(() => {
            window.open('chapters.html', '_blank');
        }, 400);
    });

    /* =========================================================
       13. INTERACTIVE LUXURY POLAROID SPECULAR SHEEN & HEART BURST
       ========================================================= */
    const smallPolaroids = document.querySelectorAll('.small-polaroid');
    smallPolaroids.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', px + '%');
            card.style.setProperty('--mouse-y', py + '%');
        });
    });

    // Global heart sparkle burst listener for all polaroid cards
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.small-polaroid, .gallery-polaroid');
        if (!card) return;

        createPolaroidHeartBurst(e.clientX, e.clientY);
    });

    function createPolaroidHeartBurst(x, y) {
        const symbols = ['❤️', '💖', '✨', '💕', '🌸', '💫'];
        for (let i = 0; i < 12; i++) {
            const p = document.createElement('span');
            p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            p.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: ${Math.random() * 1.1 + 0.8}rem;
                pointer-events: none;
                z-index: 99999;
                transition: all 0.75s cubic-bezier(0.16, 1, 0.3, 1);
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 1;
                filter: drop-shadow(0 2px 8px rgba(255, 77, 109, 0.6));
            `;
            document.body.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 75 + 35;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist - 35;

            requestAnimationFrame(() => {
                p.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.35) rotate(${Math.random() * 60 - 30}deg)`;
                p.style.opacity = '0';
            });

            setTimeout(() => p.remove(), 800);
        }
    }

});
