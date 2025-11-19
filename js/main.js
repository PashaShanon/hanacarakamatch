// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme pertama kali
    Utils.loadTheme();
    
    // Initialize statistics jikalau page memerlukannya
    if (typeof Statistics !== 'undefined') {
        Statistics.init();
    }
    
    // Initialize tombol tema jikalau di setting
    initThemeButtons();
    
    // Event hapus data pemain
    const hapusDataBtn = document.getElementById('hapus-data-btn');
    if (hapusDataBtn) {
        hapusDataBtn.addEventListener('click', () => {
            localStorage.removeItem("currentLevelId");
            localStorage.removeItem("unlockedLevels");
            alert("Data pemain berhasil dihapus!");
            window.location.reload();
        });
    }
    
    console.log('Memory Game initialized successfully!');
});

//fungsi tema
function initThemeButtons() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    if (themeButtons.length > 0) {
        themeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedTheme = this.dataset.theme;
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                Utils.changeTheme(selectedTheme);
            });
        });
        
        // Set tema berdasarkan penyimpanan
        const currentTheme = localStorage.getItem('memoryGameTheme') || 'light';
        themeButtons.forEach(btn => {
            if (btn.dataset.theme === currentTheme) {
                btn.classList.add('active');
            }
        });
    }
}
