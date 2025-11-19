// Utility functions dengan color palette yang sesuai
const Utils = {
    // Shuffle array using Fisher-Yates algorithm
    shuffleArray: function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    // Generate unique ID
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Deep clone object
    clone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // Change theme dengan color palette yang konsisten
    changeTheme: function(theme) {
        const body = document.body;
        body.className = ''; // Reset classes
        
        // Apply theme class untuk CSS styling
        body.classList.add(theme + '-theme');
        
        // Update CSS variables berdasarkan tema
        this.updateCSSVariables(theme);
        
        // Save theme preference
        localStorage.setItem('memoryGameTheme', theme);
    },

    // Update CSS variables berdasarkan tema
    updateCSSVariables: function(theme) {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            // Dark theme variables
            root.style.setProperty('--bg-primary', '#1A120B');
            root.style.setProperty('--bg-secondary', '#3C2A21');
            root.style.setProperty('--bg-card', '#D5CEA3');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#b0b0b0');
            root.style.setProperty('--accent-primary', '#E5E5CB');
            root.style.setProperty('--accent-secondary', '#E5E5CB');
            root.style.setProperty('--accent-success', '#03dac6');
            root.style.setProperty('--accent-warning', '#ffb74d');
            root.style.setProperty('--accent-danger', '#cf6679');
            root.style.setProperty('--border-color', '#404040');
            root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
        } else {
            // Light theme variables (default)
            root.style.setProperty('--bg-primary', '#fbfcf8');
            root.style.setProperty('--bg-secondary', '#f0f2f5');
            root.style.setProperty('--bg-card', '#ffffff');
            root.style.setProperty('--text-primary', '#2c3e50');
            root.style.setProperty('--text-secondary', '#7f8c8d');
            root.style.setProperty('--accent-primary', '#7e57c2');
            root.style.setProperty('--accent-secondary', '#6a45b0');
            root.style.setProperty('--accent-success', '#26a69a');
            root.style.setProperty('--accent-warning', '#ffa726');
            root.style.setProperty('--accent-danger', '#ef5350');
            root.style.setProperty('--border-color', '#e2e8f0');
            root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
        }
    },

    // Load tema yang disimpan
    loadTheme: function() {
        const savedTheme = localStorage.getItem('memoryGameTheme') || 'light';
        this.changeTheme(savedTheme);
        
        // Update tombol tema aktif
        this.updateThemeButtons(savedTheme);
    },

    // Update tombol tema aktif
    updateThemeButtons: function(activeTheme) {
        const themeButtons = document.querySelectorAll('.theme-btn');
        if (themeButtons.length > 0) {
            themeButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.theme === activeTheme) {
                    btn.classList.add('active');
                }
            });
        }
    },

    // Create confetti animation dengan color palette tema
    createConfetti: function() {
        const currentTheme = localStorage.getItem('memoryGameTheme') || 'light';
        
        // Colors berdasarkan tema
        const colors = currentTheme === 'dark' 
            ? ['#bb86fc', '#03dac6', '#ff79c6', '#ffb74d', '#8be9fd', '#50fa7b'] // Dark theme colors
            : ['#7e57c2', '#26a69a', '#ec407a', '#ffa726', '#29b6f6', '#66bb6a']; // Light theme colors
            
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '1000';
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            confettiContainer.appendChild(confetti);
        }
        
        document.body.appendChild(confettiContainer);
        
        setTimeout(() => {
            if (document.body.contains(confettiContainer)) {
                document.body.removeChild(confettiContainer);
            }
        }, 5000);
    }
};
