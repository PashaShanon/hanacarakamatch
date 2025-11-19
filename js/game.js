const Game = {
    // Data kata yang tersedia (pakai data milikmu)
    wordData: [
        { 
            id : 1,
            word: "aku turu",
            cards: [
                { jawa: 'ꦲ', latin: 'a' },
                { jawa: 'ꦏ', latin: 'ku' },
                { jawa: 'ꦠ', latin: 'tu' },
                { jawa: 'ꦫ', latin: 'ru' }
            ]
        },
        {
            id : 2,
            word: "kota ponorogo",
            cards: [
                { jawa: 'ꦏꦺꦴ', latin: 'ko' },
                { jawa: 'ꦠ', latin: 'ta' },
                { jawa: 'ꦥꦺꦴ', latin: 'po' },
                { jawa: 'ꦤꦺꦴ', latin: 'no' },
                { jawa: 'ꦫꦺꦴ', latin: 'ro' },
                { jawa: 'ꦒꦺꦴ', latin: 'go' }
            ]
        },
        {
            id : 3,
            word: "arek maca tulisan",
            cards: [
                { jawa: "ꦲ", latin: "a" },
                { jawa: "ꦫꦺꦏ꧀", latin: "rek" },
                { jawa: "ꦩ", latin: "ma" },
                { jawa: "ꦕ", latin: "ca" },
                { jawa: "ꦠꦸ", latin: "tu" },
                { jawa: "ꦭꦶ", latin: "li" },
                { jawa: "ꦱ", latin: "sa" },
                { jawa: "ꦤ꧀", latin: "n" }
            ]
        },
        {
            id : 4,
            word: "ulo mateni pitike pasa",
            cards: [
                 { jawa: "ꦲꦸ", latin: "u" },
                 { jawa: "ꦭꦺꦴ", latin: "lo" },
                 { jawa: "ꦩ", latin: "ma" },
                 { jawa: "ꦠꦺ", latin: "te" },
                 { jawa: "ꦤꦶ", latin: "ni" },
                 { jawa: "ꦥꦶ", latin: "pi" },
                 { jawa: "ꦠꦶ", latin: "ti" },
                 { jawa: "ꦏꦺ", latin: "ke" },
                 { jawa: "ꦥ", latin: "pa" },
                 { jawa: "ꦱ", latin: "sa" }
            ]
        },
        {
            id : 5,
            word: "melu lomba festika jawa timur",
            cards: [
                { jawa: "ꦩꦺ", latin: "me" },
                { jawa: "ꦭꦸ", latin: "lu" },
                { jawa: "ꦭꦺꦴꦩ꧀", latin: "lom" },
                { jawa: "ꦧ", latin: "ba" },
                { jawa: "ꦥ꦳ꦺ", latin: "fe" },
                { jawa: "ꦱ꧀", latin: "s" },
                { jawa: "ꦠꦶ", latin: "ti" },
                { jawa: "ꦏ", latin: "ka" },
                { jawa: "ꦗ", latin: "ja" },
                { jawa: "ꦮ", latin: "wa" },
                { jawa: "ꦠꦶ", latin: "ti" },
                { jawa: "ꦩꦸꦂ", latin: "mur" }
            ]
        }
    ],

    // level & reward
    currentLevelId: 1,     
    baseLevelTime: 20,   
    levelDuration: 0,    
    remainingSeconds: 0, 
    elapsedSeconds: 0,   
    levelTimerInterval: null,

    // Level progression
    unlockedLevels: [1], 
    currentScreen: 'menu',
    
    // HAPUS FITUR KOIN & HELPER
    // coins: 0,
    // hasFreeHelper: true,
    // previewCost: 3,
    // addTimeCost: 5,

    // state sebelumnya
    selectedWord: null,
    cardData: null,
    jawaCards: [],
    latinCards: [],
    previewMessage: null,
    countdownInterval: null,
    gameTimer: null,
    startTime: null,
    elapsedTime: 0,

    // Game elements
    jawaBoard: null,
    latinBoard: null,
    timerElement: null,
    matchesElement: null,
    totalPairsElement: null,
    resetButton: null,
    messageElement: null,
    sentenceElement: null,
    finalTimeElement: null,

    // Elements untuk screen management
    menuScreen: null,
    levelSelectionScreen: null,
    gameScreen: null,
    backToMenuBtn: null,

    // Game state
    flippedCards: [],
    matchedPairs: 0,
    gameOver: false,
    canFlip: false,
    gameStarted: false,

    init: function() {
        // elements
        this.jawaBoard = document.getElementById('jawa-board');
        this.latinBoard = document.getElementById('latin-board');
        this.timerElement = document.getElementById('timer');
        this.matchesElement = document.getElementById('matches');
        this.totalPairsElement = document.getElementById('total-pairs');
        this.resetButton = document.getElementById('reset-btn');
        this.messageElement = document.getElementById('message');
        this.sentenceElement = document.getElementById('sentence');
        this.finalTimeElement = document.getElementById('final-time');
        this.menuScreen = document.getElementById('menu-screen');
        this.levelSelectionScreen = document.getElementById('level-selection');
        this.gameScreen = document.getElementById('game-screen');
        this.backToMenuBtn = document.getElementById('back-to-menu');

        console.log('🔄 LEVEL ID SYSTEM DIMULAI');

        // ✅ AUTO START GAME KETIKA DI game.html
        const currentPage = window.location.pathname;
        if (currentPage.includes('game.html')) {
            console.log('🚀 Auto starting game from game.html');
            
            this.currentLevelId = parseInt(localStorage.getItem("currentLevelId")) || 1;
            const savedUnlocked = localStorage.getItem("unlockedLevels");
            this.unlockedLevels = savedUnlocked ? JSON.parse(savedUnlocked) : [1];
            
            console.log('- Current Level:', this.currentLevelId);
            console.log('- Unlocked Levels:', this.unlockedLevels);

            setTimeout(() => {
                this.initGame();
            }, 100);
        }

        // load player data
        this.loadPlayerData();
        // this.updateSoundButton(); // HAPUS
        this.loadUnlockedLevels();

        console.log('- Current Level ID:', this.currentLevelId);
        console.log('- Unlocked Levels:', this.unlockedLevels);

        // inisialisasi event listener
        this.initEventListeners();
        this.initScreenEventListeners();

        // Tampilkan beranda
        this.showScreen('menu');
    },

    initEventListeners: function() {
        if (this.resetButton) {
            this.resetButton.addEventListener('click', () => {
                this.initGame();
            });
        }
        
        const playGameBtn = document.getElementById('play-game-btn');
        if (playGameBtn) {
            playGameBtn.addEventListener('click', () => {
                this.showScreen('level-selection');
            });
        }
    },
    
    initScreenEventListeners: function() {
        if (this.backToMenuBtn) {
            this.backToMenuBtn.addEventListener('click', () => {
                this.showScreen('menu');
            });
        }
        
        const levelCards = document.querySelectorAll('.level-card');
        levelCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const level = parseInt(e.currentTarget.dataset.level);
                const locked = e.currentTarget.dataset.locked === 'true';
                
                if (!locked) {
                    this.startLevel(level);
                } else {
                    e.currentTarget.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        e.currentTarget.style.animation = '';
                    }, 500);
                }
            });
        });
    },

    showScreen: function(screenName) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        this.currentScreen = screenName;
        switch(screenName) {
            case 'menu':
                if (this.menuScreen) this.menuScreen.classList.add('active');
                break;
            case 'level-selection':
                if (this.levelSelectionScreen) this.levelSelectionScreen.classList.add('active');
                this.updateLevelSelection();
                break;
            case 'game':
                if (this.gameScreen) this.gameScreen.classList.add('active');
                break;
        }
    },

    startLevel: function(levelId) {
        console.log(`🎯 startLevel(${levelId}) DIPANGGIL`);
        
        if (!this.unlockedLevels.includes(levelId)) {
            console.error(`❌ LEVEL ${levelId} BELUM TERBUKA!`);
            alert(`Level ${levelId} belum terbuka! Selesaikan level sebelumnya.`);
            return;
        }
        
        const levelData = this.getLevelData(levelId);
        if (!levelData) {
            console.error(`❌ DATA LEVEL ${levelId} TIDAK DITEMUKAN!`);
            return;
        }
        
        this.currentLevelId = levelId;
        localStorage.setItem("currentLevelId", levelId);
        
        console.log(`🚀 MEMULAI LEVEL ${levelId}: "${levelData.word}"`);
        
        this.showScreen('game');
        this.resetGameState();
        this.loadLevel();
        this.createCardsArray();
        this.updateGameUI();
        this.adjustGridSize();
        this.createCardsDOM();
        this.showPreviewMessage();
        // this.updateCoinDisplay(); // HAPUS
    },

    initGame: function() {
        this.clearLevelTimer();
        this.elapsedSeconds = 0;
        this.remainingSeconds = 0;
        this.updateTimerDisplay();

        if (typeof Statistics !== 'undefined') {
            Statistics.onGameStart();
        }

        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
        if (this.previewMessage && document.body.contains(this.previewMessage)) {
            document.body.removeChild(this.previewMessage);
        }

        this.resetGameState();
        this.loadLevel();
        this.createCardsArray();
        this.updateGameUI();
        this.adjustGridSize();
        this.createCardsDOM();
        this.showPreviewMessage();
        // this.updateCoinDisplay(); // HAPUS
        
        this.showScreen('game');
    },

    updateLevelSelection: function() {
        const levelCards = document.querySelectorAll('.level-card');
        
        levelCards.forEach(card => {
            const levelId = parseInt(card.dataset.level);
            const levelData = this.getLevelData(levelId);
            const isUnlocked = this.unlockedLevels.includes(levelId);
            
            if (isUnlocked) {
                card.classList.remove('locked');
                card.dataset.locked = 'false';
                card.querySelector('.lock-icon')?.remove();
                
                card.querySelector('.level-title').textContent = `Level ${levelId}`;
                // HAPUS TEKS KATA
                // card.querySelector('.level-word').textContent = levelData.word;
                card.querySelector('.level-cards').textContent = `${levelData.cards.length} Kartu`;
                card.querySelector('.level-status').textContent = 'Buka';
            } else {
                card.classList.add('locked');
                card.dataset.locked = 'true';
                if (!card.querySelector('.lock-icon')) {
                    const lockIcon = document.createElement('div');
                    lockIcon.className = 'lock-icon';
                    lockIcon.textContent = '🔒';
                    card.appendChild(lockIcon);
                }
                card.querySelector('.level-title').textContent = `Level ${levelId}`;
                // HAPUS TEKS KATA
                // card.querySelector('.level-word').textContent = '???';
                card.querySelector('.level-cards').textContent = '??? Kartu';
                card.querySelector('.level-status').textContent = 'Terkunci';
            }
        });
    },

    getLevelData: function(levelId) {
        return this.wordData.find(level => level.id === levelId) || this.wordData[0];
    },

    unlockNextLevel: function() {
        const nextLevelId = this.currentLevelId + 1;
        
        const nextLevelData = this.getLevelData(nextLevelId);
        if (nextLevelData && !this.unlockedLevels.includes(nextLevelId)) {
            this.unlockedLevels.push(nextLevelId);
            this.saveUnlockedLevels();
            this.updateLevelSelection();
            
            console.log(`🔓 LEVEL ${nextLevelId} TERBUKA! Kata: "${nextLevelData.word}"`);
            
            this.showNewLevelUnlocked(nextLevelId);
        }
    },

    showNewLevelUnlocked: function(levelNumber) {
        const message = document.createElement('div');
        message.className = 'unlock-message';
        message.innerHTML = `
            <div class="unlock-content">
                <h3>🎉 Level ${levelNumber} Terbuka! 🎉</h3>
                <p>Selamat! Anda telah menyelesaikan level ${levelNumber - 1} dan membuka level ${levelNumber}!</p>
            </div>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 3000);
    },

    saveUnlockedLevels: function() {
        localStorage.setItem("unlockedLevels", JSON.stringify(this.unlockedLevels));
    },

    loadUnlockedLevels: function() {
        const saved = localStorage.getItem("unlockedLevels");
        if (saved) {
            this.unlockedLevels = JSON.parse(saved);
            if (!this.unlockedLevels.includes(1)) {
                this.unlockedLevels.push(1);
                console.log('🔓 Level 1 ditambahkan ke unlocked levels');
            }
        } else {
            this.unlockedLevels = [1];
        }
        
        console.log('🔓 Unlocked Levels:', this.unlockedLevels);
    },

    loadLevel: function() {
        console.log(`🔍 [DEBUG] loadLevel DIPANGGIL: currentLevelId=${this.currentLevelId}`);
        
        const levelData = this.getLevelData(this.currentLevelId);
        if (!levelData) {
            console.error(`❌ [DEBUG] LEVEL ${this.currentLevelId} TIDAK DITEMUKAN!`);
            this.currentLevelId = 1;
            const fallbackData = this.getLevelData(1);
            if (!fallbackData) {
                console.error(`❌ [DEBUG] LEVEL 1 JUGA TIDAK DITEMUKAN!`);
                return;
            }
            this.selectedWord = Utils.clone(fallbackData);
            this.cardData = fallbackData.cards;
        } else {
            this.selectedWord = Utils.clone(levelData);
            this.cardData = levelData.cards;
        }
        
        console.log(`✅ [DEBUG] Level ${this.currentLevelId} DIMUAT: "${this.selectedWord.word}"`);
        
        this.levelDuration = this.baseLevelTime + ((this.currentLevelId - 1) * 5);
        this.remainingSeconds = this.levelDuration;
        this.elapsedSeconds = 0;
        
        console.log(`⏱️ [DEBUG] Waktu level: ${this.levelDuration} detik`);
    },

    resetGameState: function() {
        if (this.jawaBoard) this.jawaBoard.innerHTML = '';
        if (this.latinBoard) this.latinBoard.innerHTML = '';
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.gameOver = false;
        this.canFlip = false;
        this.gameStarted = false;
        this.jawaCards = [];
        this.latinCards = [];
    },

    createCardsArray: function() {
        this.cardData.forEach(card => {
            const pairId = Utils.generateId();
            this.jawaCards.push({ 
                ...card, 
                type: 'jawa',
                pairId: pairId 
            });

            this.latinCards.push({ 
                ...card, 
                type: 'latin',
                pairId: pairId 
            });
        });

        Utils.shuffleArray(this.jawaCards);
        Utils.shuffleArray(this.latinCards);
    },

    updateGameUI: function() {
        if (this.matchesElement) this.matchesElement.textContent = this.matchedPairs;
        if (this.totalPairsElement) this.totalPairsElement.textContent = this.cardData.length;
        if (this.messageElement) this.messageElement.style.display = 'none';
    },

    adjustGridSize: function() {
        const totalCards = this.cardData.length;
        if (!this.jawaBoard || !this.latinBoard) return;

        this.jawaBoard.className = 'game-board jawa-board';
        this.latinBoard.className = 'game-board latin-board';
        
        if (totalCards <= 6) {
            this.jawaBoard.classList.add('grid-small');
            this.latinBoard.classList.add('grid-small');
        } else if (totalCards <= 8) {
            this.jawaBoard.classList.add('grid-medium');
            this.latinBoard.classList.add('grid-medium');
        } else if (totalCards <= 12) {
            this.jawaBoard.classList.add('grid-large');
            this.latinBoard.classList.add('grid-large');
        } else {
            this.jawaBoard.classList.add('grid-xlarge');
            this.latinBoard.classList.add('grid-xlarge');
        }
    },

    createCardsDOM: function() {
        this.jawaCards.forEach((card, index) => {
            const cardElement = this.createCardElement(card, index, 'jawa');
            this.jawaBoard.appendChild(cardElement);
        });
        
        this.latinCards.forEach((card, index) => {
            const cardElement = this.createCardElement(card, index, 'latin');
            this.latinBoard.appendChild(cardElement);
        });
    },

    createCardElement: function(card, index, boardType) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'flipped');
        cardElement.dataset.index = index;
        cardElement.dataset.pairId = card.pairId;
        cardElement.dataset.type = card.type;
        cardElement.dataset.board = boardType;
        
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = '?';
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        
        if (card.type === 'jawa') {
            cardBack.classList.add('jawa-font');
            
            const jawaContent = document.createElement('div');
            jawaContent.classList.add('jawa-card-content');
            
            const jawaChar = document.createElement('div');
            jawaChar.classList.add('jawa-character');
            jawaChar.textContent = card.jawa;
            
            const latinHint = document.createElement('div');
            latinHint.classList.add('latin-hint');
            latinHint.textContent = card.latin;
            
            jawaContent.appendChild(jawaChar);
            jawaContent.appendChild(latinHint);
            cardBack.appendChild(jawaContent);
            
        } else {
            cardBack.textContent = card.latin;
        }
        
        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        
        cardElement.addEventListener('click', (e) => this.flipCard(e));
        return cardElement;
    },

    showPreviewMessage: function() {
        if (this.previewMessage && document.body.contains(this.previewMessage)) {
            document.body.removeChild(this.previewMessage);
        }
        
        this.previewMessage = document.createElement('div');
        this.previewMessage.classList.add('preview-message');
        this.previewMessage.innerHTML = `
            <div class="preview-content">
                <h3>Ingat Posisi Kartu!</h3>
                <p class="target-word">Cari pasangan aksara Jawa dan Latin</p>
                <p class="countdown">Game dimulai dalam <span class="timer">6</span> detik...</p>
            </div>
        `;
        document.body.appendChild(this.previewMessage);
        
        this.startCountdown();
    },

    startCountdown: function() {
        let countdown = 6;
        const timerElement = this.previewMessage.querySelector('.timer');
        
        this.countdownInterval = setInterval(() => {
            countdown--;
            timerElement.textContent = countdown;
            
            if (countdown <= 0) {
                this.finishPreview();
            }
        }, 1000);
        
        setTimeout(() => {
            this.finishPreview();
        }, 7000);
    },

    finishPreview: function() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
        
        this.closeOnlyUnflippedCards();
        this.canFlip = true;
        this.gameStarted = true;
        this.startLevelTimer();
        
        if (this.previewMessage && document.body.contains(this.previewMessage)) {
            this.previewMessage.style.animation = 'fadeOutUp 0.5s forwards';
            setTimeout(() => {
                if (this.previewMessage && document.body.contains(this.previewMessage)) {
                    document.body.removeChild(this.previewMessage);
                }
            }, 500);
        }
    },
    
    closeOnlyUnflippedCards: function() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            if (!card.classList.contains('flipped') || this.flippedCards.includes(card)) {
                return;
            }
            
            card.style.transition = 'none';
            card.classList.remove('flipped');
            
            setTimeout(() => {
                card.style.transition = '';
            }, 10);
        });
    },

    startLevelTimer: function() {
        this.clearLevelTimer();
        this.remainingSeconds = this.levelDuration;
        this.elapsedSeconds = 0;
        this.updateTimerDisplay();

        this.levelTimerInterval = setInterval(() => {
            if (this.remainingSeconds <= 0) {
                this.clearLevelTimer();
                this.endGame(false);
                return;
            }
            this.remainingSeconds--;
            this.elapsedSeconds = this.levelDuration - this.remainingSeconds;
            this.updateTimerDisplay();
        }, 1000);
    },

    clearLevelTimer: function() {
        if (this.levelTimerInterval) {
            clearInterval(this.levelTimerInterval);
            this.levelTimerInterval = null;
        }
    },

    updateTimerDisplay: function() {
        const totalSeconds = Math.max(0, Math.floor(this.remainingSeconds));
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        const formattedTime = 
            minutes.toString().padStart(2, '0') + ':' + 
            seconds.toString().padStart(2, '0');
        
        if (this.timerElement) this.timerElement.textContent = formattedTime;
        
        if (this.timerElement) {
            this.timerElement.classList.add('timer-pulse');
            setTimeout(() => {
                this.timerElement.classList.remove('timer-pulse');
            }, 500);
        }

        if (this.timerElement) {
            if (this.remainingSeconds <= 5) {
                this.timerElement.classList.add('timer-danger');
            } else {
                this.timerElement.classList.remove('timer-danger');
            }
        }
    },

    getFormattedTime: function() {
        const totalSeconds = Math.floor(this.elapsedSeconds);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    },

    flipCard: function(event) {
        if (this.gameOver || !this.canFlip) return;
        
        const card = event.currentTarget;
    
        if (card.classList.contains('matched') || card.classList.contains('flipped')) return;
        
        card.classList.add('flipped');
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 1) {
            return;
        }
        
        if (this.flippedCards.length === 2) {
            this.canFlip = false;
            setTimeout(() => this.checkMatch(), 1000);
        }
    },

    checkMatch: function() {
        const [card1, card2] = this.flippedCards;
        
        if (!card1 || !card2) {
            this.flippedCards = [];
            this.canFlip = true;
            return;
        }

        const pairId1 = card1.dataset.pairId;
        const pairId2 = card2.dataset.pairId;
        const board1 = card1.dataset.board;
        const board2 = card2.dataset.board;
        const isValidPair = board1 !== board2;

        if (pairId1 === pairId2 && isValidPair) {
            this.handleMatchSuccess(card1, card2);
            this.flippedCards = [];
            this.canFlip = true;
        } else {
            this.handleMatchFailure(card1, card2);
        }
    },

    handleMatchSuccess: function(card1, card2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        
        // WARNA HIJAU SAAT BENAR
        card1.style.backgroundColor = '#27ae60';
        card2.style.backgroundColor = '#27ae60';
        
        this.matchedPairs++;
        if (this.matchesElement) this.matchesElement.textContent = this.matchedPairs;
        
        if (typeof Statistics !== 'undefined') {
            Statistics.onMatchFound();
        }
        
        if (this.matchedPairs === this.jawaCards.length) {
            this.clearLevelTimer();
            this.endGame(true);
        }
    },

    handleMatchFailure: function(card1, card2) {
        if (typeof Statistics !== 'undefined') {
            Statistics.onMistakeMade();
        }

        card1.style.animation = 'shake 0.5s';
        card2.style.animation = 'shake 0.5s';
        
        setTimeout(() => {
            card1.style.animation = '';
            card2.style.animation = '';
            
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            
            this.flippedCards = [];
            this.canFlip = true;
        }, 1200);
    },

    endGame: function(isWin) {
        this.gameOver = true;
        this.canFlip = false;
        this.clearLevelTimer();
        
        if (isWin) {
            if (typeof Statistics !== 'undefined') {
                Statistics.onGameWin(this.elapsedSeconds);
            }

            this.unlockNextLevel();
            this.showWinMessage();
            
        } else {
            if (this.messageElement) {
                this.messageElement.style.display = 'block';
                this.messageElement.innerHTML = `<p>Waktu habis! Coba lagi.</p>`;
            }
        }
    },

    showWinMessage: function() {
        const finalTime = this.getFormattedTime();
        
        if (this.messageElement) {
            this.messageElement.style.display = 'block';
            this.messageElement.innerHTML = `
                <div class="win-message">
                    <div class="win-header">
                        <h3>🎉 SELAMAT! 🎉</h3>
                        <p>Anda berhasil menyelesaikan Level ${this.currentLevelId}!</p>
                    </div>
                    
                    <div class="win-stats">
                        <div class="stat-item">
                            <span class="stat-label">Waktu:</span>
                            <span class="stat-value">${finalTime}</span>
                        </div>
                    </div>
                    
                    <div class="win-buttons">
                        <button id="next-level-btn" class="btn-reward">
                            Lanjut ke Level Berikutnya
                        </button>
                        <button id="replay-level-btn" class="btn-secondary">
                            Ulangi Level
                        </button>
                    </div>
                </div>
            `;
        }
        
        setTimeout(() => {
            const nextLevelBtn = document.getElementById('next-level-btn');
            const replayBtn = document.getElementById('replay-level-btn');
            
            if (nextLevelBtn) {
                nextLevelBtn.addEventListener('click', () => {
                    const nextLevel = this.currentLevelId + 1;
                    if (this.getLevelData(nextLevel)) {
                        this.startLevel(nextLevel);
                    } else {
                        this.showScreen('level-selection');
                    }
                });
            }
            
            if (replayBtn) {
                replayBtn.addEventListener('click', () => {
                    this.startLevel(this.currentLevelId);
                });
            }
        }, 100);
        
        if (typeof Utils !== 'undefined' && typeof Utils.createConfetti === 'function') {
            Utils.createConfetti();
        }
    },

    loadPlayerData: function() {
        this.currentLevelId = parseInt(localStorage.getItem("currentLevelId")) || 1;
        this.loadUnlockedLevels();
    },

        deletePlayerData: function() {
            localStorage.removeItem("currentLevelId");
            localStorage.removeItem("unlockedLevels");
            this.currentLevelId = 1;
            this.unlockedLevels = [1];
            this.initGame();
            alert("Data pemain berhasil dihapus!");
        },

};

// Initialize jika website dimuat
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});