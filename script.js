document.addEventListener('DOMContentLoaded', function() {
    // Define category totals
    const categoryTotals = {
        bosses: 46,
        achievements: 56,
        music: 33,
        locations: 59,
        pictos: 160,
        journals: 49
    };

    // DOM elements
    const totalCompletedCountElement = document.getElementById('total-completed-count');
    const totalCountElement = document.getElementById('total-count');
    const totalProgressBar = document.getElementById('total-progress-bar');
    
    // Category-specific elements
    const bossesCompletedElement = document.getElementById('bosses-completed');
    const bossesTotalElement = document.getElementById('bosses-total');
    const bossesProgressBar = document.getElementById('bosses-progress');
    
    const achievementsCompletedElement = document.getElementById('achievements-completed');
    const achievementsTotalElement = document.getElementById('achievements-total');
    const achievementsProgressBar = document.getElementById('achievements-progress');
    
    const musicCompletedElement = document.getElementById('music-completed');
    const musicTotalElement = document.getElementById('music-total');
    const musicProgressBar = document.getElementById('music-progress');
    
    const locationsCompletedElement = document.getElementById('locations-completed');
    const locationsTotalElement = document.getElementById('locations-total');
    const locationsProgressBar = document.getElementById('locations-progress');
    
    const pictosCompletedElement = document.getElementById('pictos-completed');
    const pictosTotalElement = document.getElementById('pictos-total');
    const pictosProgressBar = document.getElementById('pictos-progress');
    
    const journalsCompletedElement = document.getElementById('journals-completed');
    const journalsTotalElement = document.getElementById('journals-total');
    const journalsProgressBar = document.getElementById('journals-progress');

    // Load saved data from localStorage
    const savedBosses = JSON.parse(localStorage.getItem('expedition33Bosses')) || {};
    const savedAchievements = JSON.parse(localStorage.getItem('expedition33Achievements')) || {};
    const savedMusicRecords = JSON.parse(localStorage.getItem('expedition33MusicRecords')) || {};
    const savedLocations = JSON.parse(localStorage.getItem('expedition33Locations')) || {};
    const savedPictos = JSON.parse(localStorage.getItem('expedition33Pictos')) || {};
    const savedJournals = JSON.parse(localStorage.getItem('expedition33Journals')) || {};

    // Make the update function available globally
    window.updateMainPageProgress = updateCategoryProgress;

    // Initialize the progress displays
    function initializeProgress() {
        // Set the total counts
        if (bossesTotalElement) bossesTotalElement.textContent = categoryTotals.bosses;
        if (achievementsTotalElement) achievementsTotalElement.textContent = categoryTotals.achievements;
        if (musicTotalElement) musicTotalElement.textContent = categoryTotals.music;
        if (locationsTotalElement) locationsTotalElement.textContent = categoryTotals.locations;
        if (pictosTotalElement) pictosTotalElement.textContent = categoryTotals.pictos;
        if (journalsTotalElement) journalsTotalElement.textContent = categoryTotals.journals;
        
        if (totalCountElement) {
            const totalItems = categoryTotals.bosses + categoryTotals.achievements + categoryTotals.music + 
                              categoryTotals.locations + categoryTotals.pictos + categoryTotals.journals;
            totalCountElement.textContent = totalItems;
        }

        // Update each category's progress
        updateCategoryProgress('bosses', getCompletedCount(savedBosses), categoryTotals.bosses);
        updateCategoryProgress('achievements', getCompletedCount(savedAchievements), categoryTotals.achievements);
        updateCategoryProgress('music', getCompletedCount(savedMusicRecords), categoryTotals.music);
        updateCategoryProgress('locations', getCompletedCount(savedLocations), categoryTotals.locations);
        updateCategoryProgress('pictos', getCompletedCount(savedPictos), categoryTotals.pictos);
        updateCategoryProgress('journals', getCompletedCount(savedJournals), categoryTotals.journals);
        
        // Update total progress
        updateTotalProgress();
    }

    // Get the count of completed items
    function getCompletedCount(savedItems) {
        return Object.values(savedItems).filter(value => value === true).length;
    }

    // Update a specific category's progress
    function updateCategoryProgress(category, completed, total) {
        // Update the category's progress display
        const progressPercentage = (completed / total) * 100;
        
        switch(category) {
            case 'bosses':
                if (bossesCompletedElement) bossesCompletedElement.textContent = completed;
                if (bossesProgressBar) bossesProgressBar.style.width = `${progressPercentage}%`;
                break;
            case 'achievements':
                if (achievementsCompletedElement) achievementsCompletedElement.textContent = completed;
                if (achievementsProgressBar) achievementsProgressBar.style.width = `${progressPercentage}%`;
                break;
            case 'music':
                if (musicCompletedElement) musicCompletedElement.textContent = completed;
                if (musicProgressBar) musicProgressBar.style.width = `${progressPercentage}%`;
                break;
            case 'locations':
                if (locationsCompletedElement) locationsCompletedElement.textContent = completed;
                if (locationsProgressBar) locationsProgressBar.style.width = `${progressPercentage}%`;
                break;
            case 'pictos':
                if (pictosCompletedElement) pictosCompletedElement.textContent = completed;
                if (pictosProgressBar) pictosProgressBar.style.width = `${progressPercentage}%`;
                break;
            case 'journals':
                if (journalsCompletedElement) journalsCompletedElement.textContent = completed;
                if (journalsProgressBar) journalsProgressBar.style.width = `${progressPercentage}%`;
                break;
        }
        
        // Update the total progress
        updateTotalProgress();
    }

    // Update the total progress
    function updateTotalProgress() {
        if (!totalCompletedCountElement || !totalProgressBar) return;
        
        const bossesCompleted = getCompletedCount(savedBosses);
        const achievementsCompleted = getCompletedCount(savedAchievements);
        const musicCompleted = getCompletedCount(savedMusicRecords);
        const locationsCompleted = getCompletedCount(savedLocations);
        const pictosCompleted = getCompletedCount(savedPictos);
        const journalsCompleted = getCompletedCount(savedJournals);
        
        const totalCompleted = bossesCompleted + achievementsCompleted + musicCompleted + 
                              locationsCompleted + pictosCompleted + journalsCompleted;
        const totalItems = categoryTotals.bosses + categoryTotals.achievements + categoryTotals.music + 
                          categoryTotals.locations + categoryTotals.pictos + categoryTotals.journals;
        
        totalCompletedCountElement.textContent = totalCompleted;
        
        const totalProgressPercentage = (totalCompleted / totalItems) * 100;
        totalProgressBar.style.width = `${totalProgressPercentage}%`;
    }

    // Initialize the app
    initializeProgress();
});
