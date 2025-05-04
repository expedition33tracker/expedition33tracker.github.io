document.addEventListener('DOMContentLoaded', function() {
    // Achievement data from the wiki
    const achievementData = [
        { name: "Lumière", description: "Embark on the Expedition." },
        { name: "Spring Meadows", description: "Find your way through Spring Meadows." },
        { name: "Flying Waters", description: "Find your way through Flying Waters." },
        { name: "Ancient Sanctuary", description: "Find your way through Ancient Sanctuary." },
        { name: "Gestral Village", description: "Find your way through Gestral Village." },
        { name: "Esquie's Nest", description: "Find your way through Esquie's Nest." },
        { name: "Stone Wave Cliffs", description: "Find your way through Stone Wave Cliffs." },
        { name: "Forgotten Battlefield", description: "Find your way through Forgotten Battlefield." },
        { name: "Monoco's Station", description: "Find your way through Monoco's Station." },
        { name: "Old Lumière", description: "Find your way through Old Lumière." },
        { name: "First Axon", description: "Defeat the first Axon." },
        { name: "Second Axon", description: "Defeat the second Axon." },
        { name: "Monolith", description: "Reach the Monolith." },
        { name: "Back to Lumière", description: "Return to Lumière." },
        { name: "Plane, Train, and Submarine", description: "Discover all of Esquie's abilities." },
        { name: "Follow The Trail", description: "Find all of the journals from prior expeditions." },
        { name: "Aiding the Enemy", description: "Finish all of the Nevron quests." },
        { name: "Gestral Games", description: "Win all of the Gestral games." },
        { name: "Lost Gestrals", description: "Find all of the Lost Gestrals." },
        { name: "À On", description: "Beat the Serpenphare." },
        { name: "Sprong", description: "Beat Sprong." },
        { name: "Sciel", description: "Reach relationship level 7 with Sciel." },
        { name: "Monoco", description: "Reach relationship level 7 with Monoco." },
        { name: "Maelle", description: "Reach relationship level 7 with Maelle." },
        { name: "Lune", description: "Reach relationship level 7 with Lune." },
        { name: "Esquie", description: "Reach relationship level 7 with Esquie." },
        { name: "Weapon Upgrade", description: "Upgrade a weapon once." },
        { name: "Weapon Mastery", description: "Fully upgrade a weapon." },
        { name: "Lumina", description: "Consume a Lumina point." },
        { name: "Expeditioner", description: "Reach level 33." },
        { name: "Tailbreaker", description: "Reach level 66." },
        { name: "Survivor", description: "Reach level 99." },
        { name: "Overcharge", description: "With Gustave, use a fully charged Overcharge that Breaks an enemy." },
        { name: "Perfect Flow", description: "With Lune, consume Stains 4 turns in a row." },
        { name: "Synergy", description: "With Maelle, use Percée on a Marked enemy while in Virtuose Stance." },
        { name: "Maximisation", description: "With Sciel, consume 20 Foretell on a single target during Twilight." },
        { name: "Perfection", description: "With Version, reach Rank S." },
        { name: "Wheel Control", description: "With Monoco, cast an Upgraded Skill 4 turns in a row." },
        { name: "Carreau Parfait", description: "Beat the Chromatic Pétank." },
        { name: "Expedition 33", description: "Unlock all playable characters." },
        { name: "Chroma Proficiency", description: "Use a level 3 Gradient Attack." },
        { name: "Connoisseur", description: "Find all 33 music records." },
        { name: "Paint Cage", description: "Break a Paint Cage." },
        { name: "Time to Spill Some Ink", description: "Break an enemy." },
        { name: "Professional", description: "Defeat a boss without taking any damage." },
        { name: "Curious", description: "Witness an optional scene at camp." },
        { name: "Legend", description: "Unlock Esquie." },
        { name: "A Peculiar Encounter", description: "Defeat the Mime in Lumière" },
        { name: "Paintress", description: "Defeat the Paintress." },
        { name: "Clea", description: "Beat Clea" },
        { name: "Endless", description: "Reach the top of the Endless Tower" },
        { name: "Noir et Blanc", description: "Solve the Painting Workshop's mystery." },
        { name: "Feet Collection", description: "Acquire all of Monoco's skills" },
        { name: "The End", description: "Reach the end" },
        { name: "Peace At Last", description: "Beat Simon" },
        { name: "The Greatest Expedition in History", description: "Obtain all trophies." },
    ];

    // DOM elements
    const achievementsList = document.getElementById('achievements-list');
    const searchInput = document.getElementById('search-input');
    const hideCompletedCheckbox = document.getElementById('hide-completed');
    const completedCountElement = document.getElementById('completed-count');
    const totalCountElement = document.getElementById('total-count');
    const progressBar = document.getElementById('progress-bar');

    // Load saved data from localStorage
    let savedAchievements = JSON.parse(localStorage.getItem('expedition33Achievements')) || {};

    // Initialize the achievement list
    function initializeAchievements() {
        // Populate achievements
        achievementData.forEach(achievement => {
            const achievementElement = createAchievementElement(achievement);
            achievementsList.appendChild(achievementElement);
        });

        // Update counters and progress
        updateCounters();
    }

    // Create an achievement element
    function createAchievementElement(achievement) {
        const achievementId = achievement.name.replace(/\s+/g, '-').toLowerCase();
        const isCompleted = savedAchievements[achievementId] === true;

        const achievementItem = document.createElement('div');
        achievementItem.className = `boss-item ${isCompleted ? 'completed' : ''}`;
        achievementItem.dataset.id = achievementId;
        achievementItem.dataset.name = achievement.name.toLowerCase();
        achievementItem.addEventListener('click', function(e) {
            // Don't trigger if clicking directly on the checkbox
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                toggleAchievementCompletion(achievementId, checkbox.checked);
            }
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'boss-checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', function() {
            toggleAchievementCompletion(achievementId, this.checked);
        });

        const achievementName = document.createElement('span');
        achievementName.className = 'boss-name';
        achievementName.textContent = achievement.name;

        const achievementDescription = document.createElement('span');
        achievementDescription.className = 'boss-location';
        achievementDescription.textContent = achievement.description;

        achievementItem.appendChild(checkbox);
        achievementItem.appendChild(achievementName);
        achievementItem.appendChild(achievementDescription);

        return achievementItem;
    }

    // Toggle achievement completion status
    function toggleAchievementCompletion(achievementId, isCompleted) {
        // Update the saved data
        savedAchievements[achievementId] = isCompleted;
        localStorage.setItem('expedition33Achievements', JSON.stringify(savedAchievements));

        // Update the UI
        const achievementElement = document.querySelector(`.boss-item[data-id="${achievementId}"]`);
        if (achievementElement) {
            if (isCompleted) {
                achievementElement.classList.add('completed');
            } else {
                achievementElement.classList.remove('completed');
            }
        }

        // Update counters and progress
        updateCounters();

        // Apply hide completed filter if active
        if (hideCompletedCheckbox.checked) {
            applyHideCompletedFilter();
        }
    }

    // Update counters and progress bar
    function updateCounters() {
        const totalAchievements = achievementData.length;
        
        const completedAchievements = Object.values(savedAchievements).filter(value => value === true).length;

        completedCountElement.textContent = completedAchievements;
        totalCountElement.textContent = totalAchievements;

        // Update progress bar
        const progressPercentage = (completedAchievements / totalAchievements) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update main page if it exists
        if (window.updateMainPageProgress) {
            window.updateMainPageProgress('achievements', completedAchievements, totalAchievements);
        }
    }

    // Filter achievements based on search input
    function filterAchievements() {
        const searchTerm = searchInput.value.toLowerCase();
        const allAchievementItems = document.querySelectorAll('.boss-item');

        allAchievementItems.forEach(item => {
            const achievementName = item.dataset.name;
            if (achievementName.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Apply hide completed filter
    function applyHideCompletedFilter() {
        const allAchievementItems = document.querySelectorAll('.boss-item');
        
        allAchievementItems.forEach(item => {
            if (hideCompletedCheckbox.checked && item.classList.contains('completed')) {
                item.classList.add('hidden');
            } else if (item.classList.contains('hidden') && !searchInput.value) {
                // Only remove 'hidden' if it's not hidden by search
                item.classList.remove('hidden');
            }
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterAchievements);
    
    hideCompletedCheckbox.addEventListener('change', function() {
        applyHideCompletedFilter();
    });
    
    // Clear search button
    const clearSearchButton = document.getElementById('clear-search');
    clearSearchButton.addEventListener('click', function() {
        searchInput.value = '';
        filterAchievements();
    });

    // Category headers toggle
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', function() {
            const achievementList = this.nextElementSibling;
            achievementList.classList.toggle('hidden');
            
            // Toggle the arrow
            const headerText = this.querySelector('h3');
            if (achievementList.classList.contains('hidden')) {
                headerText.style.setProperty('--arrow', '"►"');
            } else {
                headerText.style.setProperty('--arrow', '"▼"');
            }
        });
    });

    // Initialize the app
    initializeAchievements();
});
