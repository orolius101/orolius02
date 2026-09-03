/* =========================================================
   RAKSHA BANDHAN SPECIAL - INTERACTIVE JAVASCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- STATE MANAGEMENT ---
  const state = {
    passcode: '1234', // Default PIN (or any 4-digit code works!)
    currentInput: '',
    sisterName: 'Pyari Behen',
    brotherName: 'Your Brother',
    soundEnabled: true,
    rakhiTied: false
  };

  // --- INTRO SCREEN LOGIC ---
  const introScreen = document.getElementById('introScreen');
  const btnExplore = document.getElementById('btnExplore');
  const starsContainer = document.getElementById('stars');
  const flowerContainer = document.getElementById('flower-container');

  if (introScreen) {
    // Generate Stars
    const STAR_COUNT = 60;
    for (let i = 0; i < STAR_COUNT; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2 + 1;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 3) + 's';
      starsContainer.appendChild(s);
    }

    const bouquetBase = () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.92
    });

    const FLOWER_TYPES = ['daisy', 'sunflower', 'tulip', 'rose'];
    const FLOWER_COLORS = {
      daisy: '#ffffff',
      sunflower: '#f5c518',
      tulip: '#f28fb1',
      rose: '#e3313c'
    };

    function makeSparkles(x, y) {
      for (let i = 0; i < 8; i++) {
        const sp = document.createElement('div');
        sp.className = 'sparkle';
        sp.textContent = '✦';
        const angle = Math.random() * Math.PI * 2;
        const dist = 20 + Math.random() * 30;
        sp.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        sp.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        sp.style.left = x + 'px';
        sp.style.top = y + 'px';
        flowerContainer.appendChild(sp);
        setTimeout(() => sp.remove(), 900);
      }
    }

    function flowerHead(type, color) {
      switch (type) {
        case 'daisy':
          let petals = '';
          for (let i = 0; i < 10; i++) {
            const a = (i / 10) * 360;
            petals += `<ellipse cx="0" cy="-13" rx="4.5" ry="12" fill="${color}" transform="rotate(${a})"/>`;
          }
          return `<g>${petals}<circle cx="0" cy="0" r="7" fill="#f5c518"/></g>`;
        case 'sunflower':
          let sp = '';
          for (let i = 0; i < 14; i++) {
            const a = (i / 14) * 360;
            sp += `<ellipse cx="0" cy="-15" rx="5" ry="14" fill="${color}" transform="rotate(${a})"/>`;
          }
          return `<g>${sp}<circle cx="0" cy="0" r="9" fill="#6b3f1d"/></g>`;
        case 'tulip':
          return `<g>
            <path d="M0,-28 C-14,-24 -14,-6 0,4 C14,-6 14,-24 0,-28 Z" fill="${color}"/>
            <path d="M0,-24 C-8,-18 -6,-4 0,2" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
          </g>`;
        case 'rose':
          return `<g>
            <circle cx="0" cy="0" r="14" fill="${color}"/>
            <circle cx="0" cy="0" r="10" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/>
            <circle cx="0" cy="0" r="6" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
            <circle cx="0" cy="0" r="2.5" fill="rgba(0,0,0,0.25)"/>
          </g>`;
      }
    }

    function plantFlower(clickX, clickY) {
      const base = bouquetBase();
      const type = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
      const color = FLOWER_COLORS[type];

      const targetX = clickX;
      const targetY = clickY;

      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'flower-svg');
      svg.style.left = '0px';
      svg.style.top = '0px';
      svg.style.width = '100%';
      svg.style.height = '100%';
      flowerContainer.appendChild(svg);

      const stem = document.createElementNS(svgNS, 'path');
      const midX = (base.x + targetX) / 2 + (Math.random() * 40 - 20);
      const dPath = `M${base.x},${base.y} Q${midX},${(base.y + targetY) / 2} ${targetX},${targetY}`;
      stem.setAttribute('d', dPath);
      stem.setAttribute('fill', 'none');
      stem.setAttribute('stroke', '#3f7d3a');
      stem.setAttribute('stroke-width', '4');
      stem.setAttribute('stroke-linecap', 'round');
      const len = 800;
      stem.style.strokeDasharray = len;
      stem.style.strokeDashoffset = len;
      stem.style.transition = 'stroke-dashoffset 1s ease-out';
      svg.appendChild(stem);

      for (let i = 0; i < 2; i++) {
        const t = 0.4 + i * 0.25;
        const lx = base.x + (targetX - base.x) * t;
        const ly = base.y + (targetY - base.y) * t;
        const leaf = document.createElementNS(svgNS, 'ellipse');
        leaf.setAttribute('cx', lx + (i % 2 === 0 ? -10 : 10));
        leaf.setAttribute('cy', ly);
        leaf.setAttribute('rx', '10');
        leaf.setAttribute('ry', '5');
        leaf.setAttribute('fill', '#3f7d3a');
        leaf.setAttribute('transform', `rotate(${i % 2 === 0 ? -30 : 30} ${lx} ${ly})`);
        leaf.style.opacity = '0';
        leaf.style.transition = 'opacity 0.4s ease-in';
        leaf.style.transitionDelay = '0.5s';
        svg.appendChild(leaf);
        requestAnimationFrame(() => { leaf.style.opacity = '1'; });
      }

      const head = document.createElementNS(svgNS, 'g');
      head.setAttribute('class', 'glow');
      head.style.color = color;
      head.innerHTML = flowerHead(type, color);
      head.setAttribute('transform', `translate(${targetX},${targetY}) scale(0)`);
      head.style.transition = 'transform 0.6s cubic-bezier(.34,1.56,.64,1)';
      head.style.transitionDelay = '0.9s';
      svg.appendChild(head);

      requestAnimationFrame(() => {
        stem.style.strokeDashoffset = '0';
      });
      setTimeout(() => {
        head.setAttribute('transform', `translate(${targetX},${targetY}) scale(1)`);
      }, 50);

      makeSparkles(targetX, targetY);
    }

    introScreen.addEventListener('click', (e) => {
      if (e.target === btnExplore) return;
      plantFlower(e.clientX, e.clientY);
    });

    setTimeout(() => {
      plantFlower(window.innerWidth / 2 - 60, window.innerHeight * 0.45);
    }, 800);

    btnExplore.addEventListener('click', () => {
      introScreen.classList.remove('active');
      introScreen.classList.add('hidden');
      passcodeScreen.classList.remove('hidden');
      passcodeScreen.classList.add('active');
    });
  }

  // --- DOM ELEMENTS ---
  const passcodeScreen = document.getElementById('passcodeScreen');
  const mainScreen = document.getElementById('mainScreen');
  const pinSlots = [
    document.getElementById('slot-0'),
    document.getElementById('slot-1'),
    document.getElementById('slot-2'),
    document.getElementById('slot-3')
  ];
  const passcodeMsg = document.getElementById('passcodeMsg');
  const keypadBtns = document.querySelectorAll('.key-btn');
  const hintToggleBtn = document.getElementById('hintToggleBtn');
  const hintCard = document.getElementById('hintCard');
  const heartsRing = document.getElementById('heartsRing');

  // Main screen elements
  const displaySisterName = document.getElementById('displaySisterName');
  const displayBrotherName = document.getElementById('displayBrotherName');
  const envelopeCard = document.getElementById('envelopeCard');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const lockAgainBtn = document.getElementById('lockAgainBtn');
  const toast = document.getElementById('toast');



  // =========================================================
  // 1. GENERATE HEARTS RING AROUND OVAL FRAME (REFERENCE MATCH)
  // =========================================================
  function renderHeartsRing() {
    if (!heartsRing) return;
    heartsRing.innerHTML = '';
    const heartCount = 28;
    const rx = 132; // Oval radius X
    const ry = 172; // Oval radius Y

    for (let i = 0; i < heartCount; i++) {
      const angle = (i / heartCount) * (2 * Math.PI) - (Math.PI / 2);
      const x = rx * Math.cos(angle);
      const y = ry * Math.sin(angle);

      const heart = document.createElement('span');
      heart.className = 'heart-item';
      heart.textContent = '❤️';
      heart.style.left = `calc(50% + ${x}px)`;
      heart.style.top = `calc(50% + ${y}px)`;
      heartsRing.appendChild(heart);
    }
  }
  renderHeartsRing();

  // Re-render hearts ring on window resize
  window.addEventListener('resize', renderHeartsRing);

  // =========================================================
  // 2. WEB AUDIO API SYNTHESIZER (SOUND EFFECTS)
  // =========================================================
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playKeyTone() {
    if (!state.soundEnabled) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 pitch
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      // Audio context fallthrough
    }
  }

  function playSuccessTune() {
    if (!state.soundEnabled) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.35);
        }, idx * 100);
      });
    } catch (e) {}
  }

  // =========================================================
  // 3. KEYPAD & PASSCODE INPUT LOGIC
  // =========================================================
  keypadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      handleKeyPress(key);
    });
  });

  // Keyboard support for desktop
  document.addEventListener('keydown', (e) => {
    if (passcodeScreen.classList.contains('hidden')) return;
    if (e.key >= '0' && e.key <= '9') {
      handleKeyPress(e.key);
    } else if (e.key === 'Backspace') {
      handleKeyPress('DEL');
    } else if (e.key === '*' || e.key === '#') {
      handleKeyPress('*');
    }
  });

  function handleKeyPress(key) {
    playKeyTone();

    if (key === 'DEL') {
      if (state.currentInput.length > 0) {
        state.currentInput = state.currentInput.slice(0, -1);
        updatePinDisplay();
      }
      return;
    }

    if (state.currentInput.length < 4) {
      state.currentInput += key;
      updatePinDisplay();

      // Check passcode once 4 digits are entered
      if (state.currentInput.length === 4) {
        validatePasscode();
      }
    }
  }

  function updatePinDisplay() {
    pinSlots.forEach((slot, idx) => {
      const charSpan = slot.querySelector('.pin-char');
      if (idx < state.currentInput.length) {
        slot.classList.add('filled');
        charSpan.textContent = '🌸'; // Cute flower icon when entered
      } else {
        slot.classList.remove('filled');
        charSpan.textContent = '';
      }
    });
  }

  function validatePasscode() {
    // Unlock for set passcode OR any 4-digit birthday code entered!
    passcodeMsg.style.color = '#fff3bf';
    passcodeMsg.textContent = 'Verifying passcode... ✨';

    setTimeout(() => {
      playSuccessTune();
      triggerConfetti();

      passcodeMsg.style.color = '#b2f2bb';
      passcodeMsg.textContent = 'Welcome Pyari Behen! Unlocking... 💖';

      setTimeout(() => {
        unlockWebsite();
      }, 700);

    }, 400);
  }

  function unlockWebsite() {
    passcodeScreen.classList.remove('active');
    passcodeScreen.classList.add('hidden');

    mainScreen.classList.remove('hidden');
    mainScreen.classList.add('active');

    // Initialize HTML5 Canvas Scratch Cards
    setTimeout(initScratchCards, 150);

    // Trigger welcoming celebration confetti
    triggerConfetti();
    showToast(`Welcome ${state.sisterName}! Happy Raksha Bandhan! 💖`);
  }

  // =========================================================
  // 4. HINT TOGGLE BUTTON LOGIC
  // =========================================================
  if (hintToggleBtn) {
    hintToggleBtn.addEventListener('click', () => {
      hintCard.classList.toggle('hidden');
      if (!hintCard.classList.contains('hidden')) {
        playKeyTone();
      }
    });
  }

  // =========================================================
  // 5. HEARTFELT ENVELOPE OPENING LOGIC
  // =========================================================
  if (envelopeCard) {
    envelopeCard.addEventListener('click', () => {
      envelopeCard.classList.toggle('open');
      if (envelopeCard.classList.contains('open')) {
        playSuccessTune();
      }
    });
  }

  // =========================================================
  // 7. RAKSHA BANDHAN GIFTS UNBOXING & SCRATCH EFFECT
  // =========================================================
  function initScratchCards() {
    const cards = document.querySelectorAll('.gift-card');

    cards.forEach(card => {
      const canvas = card.querySelector('.scratch-canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      let isScratching = false;
      let isCleared = false;

      function resizeCanvas() {
        const rect = card.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        canvas.width = rect.width;
        canvas.height = rect.height;
        drawCover();
      }

      function drawCover() {
        if (isCleared) return;

        // Draw metallic pink/gold wrapped coating
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#ff9a9e');
        grad.addColorStop(0.4, '#fecfef');
        grad.addColorStop(0.7, '#a1c4fd');
        grad.addColorStop(1, '#ff9a9e');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add golden sparkles
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 40; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const r = Math.random() * 2 + 1;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Add "UNWRAP GIFT 🎁" banner text
        ctx.fillStyle = '#d63031';
        ctx.font = '700 15px "Fredoka", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎁 SCRATCH TO UNWRAP! ✨', canvas.width / 2, canvas.height / 2);
      }

      setTimeout(resizeCanvas, 100);
      window.addEventListener('resize', resizeCanvas);

      function getScratchPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: clientX - rect.left,
          y: clientY - rect.top
        };
      }

      function scratch(e) {
        if (!isScratching || isCleared) return;
        const pos = getScratchPos(e);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
        ctx.fill();

        checkScratchProgress();
      }

      function checkScratchProgress() {
        if (isCleared) return;
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imgData.data;
        let transparentPixels = 0;

        for (let i = 3; i < pixels.length; i += 16) {
          if (pixels[i] === 0) transparentPixels++;
        }

        const totalSampled = pixels.length / 16;
        const percent = (transparentPixels / totalSampled) * 100;

        if (percent > 35) { // Auto clear once 35% scratched!
          isCleared = true;
          canvas.classList.add('cleared');
          const btn = card.querySelector('.btn-unwrap-gift');
          if (btn) {
            btn.classList.remove('locked');
            btn.textContent = 'Unwrap Gift 🎁';
          }
          triggerConfetti();
          playSuccessTune();
          showToast('Gift Box Unwrapped! Tap to reveal your surprise! 🎉');
        }
      }

      canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
      canvas.addEventListener('mousemove', scratch);
      window.addEventListener('mouseup', () => { isScratching = false; });

      canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); }, { passive: true });
      canvas.addEventListener('touchmove', scratch, { passive: true });
      window.addEventListener('touchend', () => { isScratching = false; });
    });
  }

  const unwrapBtns = document.querySelectorAll('.btn-unwrap-gift');
  unwrapBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btn.classList.contains('locked')) {
        showToast('🎁 Please scratch off the gift wrapping first!');
        return;
      }
      const card = btn.closest('.gift-card');

      card.classList.add('unwrapped');
      btn.textContent = '✓ Gift Unwrapped! 💖';
      playSuccessTune();
      triggerConfetti();

      const title = card.querySelector('h3').textContent.trim();
      showToast(`🎉 You Unwrapped: ${title}! Enjoy your Raksha Bandhan gift! 💖`);
    });
  });

  // =========================================================
  // 8. CUSTOMIZATION MODAL & EDIT NAMES LOGIC
  // =========================================================
  function updateDisplayedNames() {
    displaySisterName.textContent = state.sisterName;
    displayBrotherName.textContent = state.brotherName;

    const letterSisterSpans = document.querySelectorAll('.letter-sister-name');
    const letterBrotherSpans = document.querySelectorAll('.letter-brother-name');

    letterSisterSpans.forEach(el => el.textContent = state.sisterName);
    letterBrotherSpans.forEach(el => el.textContent = state.brotherName);
  }



  // Lock Again Button
  if (lockAgainBtn) {
    lockAgainBtn.addEventListener('click', () => {
      state.currentInput = '';
      updatePinDisplay();
      passcodeMsg.textContent = '';
      mainScreen.classList.remove('active');
      mainScreen.classList.add('hidden');
      passcodeScreen.classList.remove('hidden');
      passcodeScreen.classList.add('active');
    });
  }

  // Sound Toggle Button
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      soundToggleBtn.textContent = state.soundEnabled ? '🎵 Music: ON' : '🔇 Music: OFF';
      showToast(state.soundEnabled ? 'Sound Effects Enabled 🎵' : 'Sound Muted 🔇');
    });
  }

  // Hero "Yes" Button Handler (Matching reference interaction)
  const btnHeroYes = document.getElementById('btnHeroYes');
  if (btnHeroYes) {
    btnHeroYes.addEventListener('click', () => {
      triggerConfetti();
      playSuccessTune();
      const letterSection = document.querySelector('.letter-section');
      if (letterSection) {
        letterSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // =========================================================
  // 9. UTILITIES: TOAST & CONFETTI
  // =========================================================
  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3500);
  }

  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d7d', '#ffd700', '#20c997', '#ff85a2', '#ffffff']
      });
    }
  }

  // =========================================================
  // 10. OROLIUS RAKHI CUSTOMIZER ENGINE
  // =========================================================
  const customiseBtn = document.getElementById('customiseBtn');
  const customizerModal = document.getElementById('customizerModal');
  const closeCustomizerBtn = document.getElementById('closeCustomizerBtn');
  const roleSisterBtn = document.getElementById('roleSisterBtn');
  const roleBrotherBtn = document.getElementById('roleBrotherBtn');
  const customizerScreenA = document.getElementById('customizerScreenA');
  const customizerScreenB = document.getElementById('customizerScreenB');
  const applyCustomizerBtn = document.getElementById('applyCustomizerBtn');
  const customizerGridItems = document.querySelectorAll('.customizer-grid-item');

  // Selection states
  let selectedRole = 'sister';
  const selectedPages = {
    basicPage: true,
    passcode: true,
    flowers: true,
    pixelGame: false,
    quizGame: false,
    ticTacToe: false
  };

  // Open Customizer
  if (customiseBtn) {
    customiseBtn.addEventListener('click', () => {
      customizerModal.classList.remove('hidden');
      customizerScreenA.classList.remove('hidden');
      customizerScreenB.classList.add('hidden');
    });
  }

  // Close Customizer
  if (closeCustomizerBtn) {
    closeCustomizerBtn.addEventListener('click', () => {
      customizerModal.classList.add('hidden');
    });
  }

  // Role Selection (Screen A -> Screen B)
  if (roleSisterBtn) {
    roleSisterBtn.addEventListener('click', () => {
      selectedRole = 'sister';
      // Update names for Sister context
      document.querySelectorAll('.letter-sister-name').forEach(el => el.textContent = 'Sister');
      document.querySelectorAll('.letter-brother-name').forEach(el => el.textContent = 'Your Brother');
      customizerScreenA.classList.add('hidden');
      customizerScreenB.classList.remove('hidden');
    });
  }

  if (roleBrotherBtn) {
    roleBrotherBtn.addEventListener('click', () => {
      selectedRole = 'brother';
      // Update names for Brother context
      document.querySelectorAll('.letter-sister-name').forEach(el => el.textContent = 'Brother');
      document.querySelectorAll('.letter-brother-name').forEach(el => el.textContent = 'Your Sister');
      customizerScreenA.classList.add('hidden');
      customizerScreenB.classList.remove('hidden');
    });
  }

  // Grid Selection Toggles
  customizerGridItems.forEach(item => {
    item.addEventListener('click', () => {
      const pageKey = item.getAttribute('data-page');
      selectedPages[pageKey] = !selectedPages[pageKey];
      item.classList.toggle('selected', selectedPages[pageKey]);
    });
  });

  // Apply Customization
  if (applyCustomizerBtn) {
    applyCustomizerBtn.addEventListener('click', () => {
      // 1. Handle Basic Page
      const basicSections = document.querySelectorAll('.letter-section, .gifts-section, .memories-section, .festive-footer');
      basicSections.forEach(sec => {
        // Keep active game sections hidden/shown separately
        if (sec.id !== 'sec-tic-tac-toe' && sec.id !== 'sec-quiz-game' && sec.id !== 'sec-pixel-game') {
          if (selectedPages.basicPage) {
            sec.classList.remove('hidden');
          } else {
            sec.classList.add('hidden');
          }
        }
      });

      // 2. Handle Passcode Screen Bypass
      const passcodeScreen = document.getElementById('passcodeScreen');
      const mainScreen = document.getElementById('mainScreen');
      const introScreen = document.getElementById('introScreen');
      
      if (!selectedPages.passcode) {
        // Bypass passcode completely
        if (passcodeScreen && !passcodeScreen.classList.contains('hidden')) {
          passcodeScreen.classList.add('hidden');
          passcodeScreen.classList.remove('active');
          mainScreen.classList.remove('hidden');
          mainScreen.classList.add('active');
        }
      }

      // 3. Handle Flowers Screen Bypass
      if (!selectedPages.flowers) {
        if (introScreen && !introScreen.classList.contains('hidden')) {
          introScreen.classList.add('hidden');
          introScreen.classList.remove('active');
          if (selectedPages.passcode) {
            passcodeScreen.classList.remove('hidden');
            passcodeScreen.classList.add('active');
          } else {
            mainScreen.classList.remove('hidden');
            mainScreen.classList.add('active');
          }
        }
      }

      // 4. Handle Games Toggles
      const tttSection = document.getElementById('sec-tic-tac-toe');
      const quizSection = document.getElementById('sec-quiz-game');
      const pixelSection = document.getElementById('sec-pixel-game');

      if (tttSection) tttSection.classList.toggle('hidden', !selectedPages.ticTacToe);
      if (quizSection) quizSection.classList.toggle('hidden', !selectedPages.quizGame);
      if (pixelSection) {
        pixelSection.classList.toggle('hidden', !selectedPages.pixelGame);
        if (selectedPages.pixelGame) {
          startPixelGame();
        } else {
          stopPixelGame();
        }
      }

      customizerModal.classList.add('hidden');
      triggerConfetti();
      showToast('Website Customized Successfully! ✨');
    });
  }

  // =========================================================
  // 11. GAME 1: TIC-TAC-TOE LOGIC
  // =========================================================
  let tttBoard = ['', '', '', '', '', '', '', '', ''];
  let tttActive = true;
  let tttTurn = '🌸'; // Sister starts
  const tttCells = document.querySelectorAll('.ttt-cell');
  const tttStatus = document.querySelector('.ttt-status');
  const tttResetBtn = document.getElementById('tttResetBtn');

  const tttWinConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-cell-index'));

    if (tttBoard[index] !== '' || !tttActive) return;

    tttBoard[index] = tttTurn;
    cell.textContent = tttTurn;
    cell.style.color = tttTurn === '🌸' ? '#f43f5e' : '#d97706';

    checkTTTResult();
  }

  function checkTTTResult() {
    let roundWon = false;
    for (let i = 0; i < tttWinConditions.length; i++) {
      const winCondition = tttWinConditions[i];
      let a = tttBoard[winCondition[0]];
      let b = tttBoard[winCondition[1]];
      let c = tttBoard[winCondition[2]];
      if (a === '' || b === '' || c === '') continue;
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      tttStatus.textContent = `🎉 Player ${tttTurn} Wins! 🎉`;
      triggerConfetti();
      tttActive = false;
      return;
    }

    let roundDraw = !tttBoard.includes('');
    if (roundDraw) {
      tttStatus.textContent = '🤝 Game ended in a draw! 🤝';
      tttActive = false;
      return;
    }

    tttTurn = tttTurn === '🌸' ? '🏵️' : '🌸';
    tttStatus.textContent = `${tttTurn} Turn`;
  }

  function resetTTT() {
    tttBoard = ['', '', '', '', '', '', '', '', ''];
    tttActive = true;
    tttTurn = '🌸';
    tttStatus.textContent = '🌸 Turn';
    tttCells.forEach(cell => {
      cell.textContent = '';
      cell.style.color = '';
    });
  }

  tttCells.forEach(cell => cell.addEventListener('click', handleCellClick));
  if (tttResetBtn) tttResetBtn.addEventListener('click', resetTTT);

  // =========================================================
  // 12. GAME 2: SIBLING QUIZ LOGIC
  // =========================================================
  const quizQuestions = [
    {
      q: "Question 1: Who is the absolute favorite child in the family?",
      options: [
        { text: "Sister 🌸 (Obviously)", correct: true },
        { text: "Brother 🏵️ (In his dreams)", correct: false }
      ]
    },
    {
      q: "Question 2: Who wins 99% of arguments?",
      options: [
        { text: "Sister 🌸 (Has infinite debate skill)", correct: true },
        { text: "Brother 🏵️ (Always gives up)", correct: false }
      ]
    },
    {
      q: "Question 3: Who is the sweet angel and who is the annoying goblin?",
      options: [
        { text: "Sister = Angel, Brother = Goblin 😈", correct: true },
        { text: "Sister = Goblin, Brother = Angel 😇", correct: false }
      ]
    }
  ];

  let currentQuizIdx = 0;
  const quizQuestionEl = document.getElementById('quizQuestion');
  const quizFeedbackEl = document.getElementById('quizFeedback');
  const quizOptionsContainer = document.querySelector('.quiz-options');

  function renderQuiz() {
    if (!quizQuestionEl || !quizOptionsContainer) return;
    const item = quizQuestions[currentQuizIdx];
    quizQuestionEl.textContent = item.q;
    quizFeedbackEl.classList.add('hidden');
    quizOptionsContainer.innerHTML = '';

    item.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = opt.text;
      btn.style.cssText = "background: #f8fafc; border: 2px solid #e2e8f0; padding: 14px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s;";
      
      btn.addEventListener('click', () => {
        if (opt.correct) {
          quizFeedbackEl.textContent = "✅ That is 100% CORRECT! 🎉";
          quizFeedbackEl.style.color = "#16a34a";
          quizFeedbackEl.classList.remove('hidden');
          triggerConfetti();
          
          setTimeout(() => {
            currentQuizIdx = (currentQuizIdx + 1) % quizQuestions.length;
            renderQuiz();
          }, 2000);
        } else {
          quizFeedbackEl.textContent = "❌ INCORRECT! Try again! 😂";
          quizFeedbackEl.style.color = "#ef4444";
          quizFeedbackEl.classList.remove('hidden');
        }
      });
      quizOptionsContainer.appendChild(btn);
    });
  }

  renderQuiz();

  // =========================================================
  // 13. GAME 3: PIXELATED CATCHER GAME LOGIC
  // =========================================================
  const pixelCanvas = document.getElementById('pixelCanvas');
  const pixelScoreVal = document.getElementById('pixelScoreVal');
  const pixelLeftBtn = document.getElementById('pixelLeftBtn');
  const pixelRightBtn = document.getElementById('pixelRightBtn');
  
  let pixelCtx = pixelCanvas ? pixelCanvas.getContext('2d') : null;
  let pixelGameActive = false;
  let pixelScore = 0;
  let pixelAnimId = null;

  // Game elements
  const bowl = {
    x: 115,
    y: 220,
    width: 50,
    height: 12,
    speed: 15
  };

  let fallingHearts = [];

  function spawnHeart() {
    if (Math.random() < 0.03) {
      fallingHearts.push({
        x: Math.random() * 260 + 10,
        y: 0,
        size: 10 + Math.random() * 8,
        speed: 2 + Math.random() * 3
      });
    }
  }

  function updatePixelGame() {
    if (!pixelGameActive) return;

    spawnHeart();

    fallingHearts.forEach((heart, idx) => {
      heart.y += heart.speed;

      // Check collision with bowl
      if (
        heart.y + heart.size >= bowl.y &&
        heart.x >= bowl.x &&
        heart.x <= bowl.x + bowl.width
      ) {
        pixelScore++;
        if (pixelScoreVal) pixelScoreVal.textContent = pixelScore;
        fallingHearts.splice(idx, 1);
        if (pixelScore % 5 === 0) triggerConfetti();
      }

      // Remove offscreen hearts
      if (heart.y > 250) {
        fallingHearts.splice(idx, 1);
      }
    });

    drawPixelGame();
    pixelAnimId = requestAnimationFrame(updatePixelGame);
  }

  function drawPixelGame() {
    if (!pixelCtx) return;
    // Clear canvas
    pixelCtx.fillStyle = '#1e293b';
    pixelCtx.fillRect(0, 0, 280, 250);

    // Draw Bowl (Pixelated Style)
    pixelCtx.fillStyle = '#f43f5e';
    pixelCtx.fillRect(bowl.x, bowl.y, bowl.width, bowl.height);
    // Detail on bowl
    pixelCtx.fillStyle = '#ffffff';
    pixelCtx.fillRect(bowl.x + 10, bowl.y + 3, bowl.width - 20, bowl.height - 6);

    // Draw Hearts (Pixelated Style)
    fallingHearts.forEach(heart => {
      pixelCtx.fillStyle = '#ff85a2';
      // Draw a blocky pixel heart
      const hs = heart.size / 3;
      pixelCtx.fillRect(heart.x, heart.y + hs, hs, hs);
      pixelCtx.fillRect(heart.x + hs, heart.y, hs, hs);
      pixelCtx.fillRect(heart.x + 2*hs, heart.y + hs, hs, hs);
      pixelCtx.fillRect(heart.x, heart.y + 2*hs, 3*hs, hs);
      pixelCtx.fillRect(heart.x + hs, heart.y + 3*hs, hs, hs);
    });
  }

  function startPixelGame() {
    if (pixelGameActive) return;
    pixelGameActive = true;
    pixelScore = 0;
    if (pixelScoreVal) pixelScoreVal.textContent = pixelScore;
    fallingHearts = [];
    updatePixelGame();
  }

  function stopPixelGame() {
    pixelGameActive = false;
    if (pixelAnimId) cancelAnimationFrame(pixelAnimId);
  }

  if (pixelLeftBtn) {
    pixelLeftBtn.addEventListener('click', () => {
      bowl.x = Math.max(0, bowl.x - bowl.speed);
    });
  }

  if (pixelRightBtn) {
    pixelRightBtn.addEventListener('click', () => {
      bowl.x = Math.min(230, bowl.x + bowl.speed);
    });
  }

});
