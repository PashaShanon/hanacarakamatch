const Menu = {
    screens: {},

    init: function() {
        this.screens = {
            main: document.getElementById('main-menu'),
            settings: document.getElementById('settings-screen'),
            help: document.getElementById('help-screen'),
            stats: document.getElementById('stats-screen'),
            game: document.getElementById('game-screen')
        };

        this.initEventListeners();
    },

    initEventListeners: function() {

        // Tombol Main menu
        document.getElementById('play-btn').addEventListener('click', () => this.showScreen('game'));

        document.getElementById('settings-btn').addEventListener('click', () => this.showScreen('settings'));

        document.getElementById('help-btn').addEventListener('click', () => this.showScreen('help'));

        document.getElementById('stats-btn').addEventListener('click', () => {

            Statistics.updateStatisticsDisplay();

            this.showScreen('stats');

        });


        // Back buttons
        document.getElementById('back-from-settings').addEventListener('click', () => this.showScreen('main'));
        document.getElementById('back-from-help').addEventListener('click', () => this.showScreen('main'));
        document.getElementById('back-from-stats').addEventListener('click', () => this.showScreen('main'));
        document.getElementById('back-to-menu').addEventListener('click', () => this.showScreen('main'));
    },

    showScreen: function(screenName) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });

        // Show selected screen
        this.screens[screenName].classList.add('active');

        // Initialize game if showing game screen
        if (screenName === 'game') {
            Game.init();
        }
    }
};

// Initialize menu for single page version
if (document.getElementById('main-menu') && document.getElementById('game-screen')) {
    document.addEventListener('DOMContentLoaded', () => {
        Menu.init();
    });
}