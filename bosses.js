document.addEventListener('DOMContentLoaded', function() {
    // Boss data from the wiki
    const bossData = {
        main: [
            { name: "Eveque", location: "Spring Meadows" },
            { name: "Goblu", location: "Flying Waters" },
            { name: "Ultimate Sakapatate", location: "Ancient Sanctuary" },
            { name: "Francois", location: "Gestral Village" },
            { name: "Lampmaster", location: "Esquie's Nest" },
            { name: "Dualliste", location: "Stone Wave Cliffs" },
            { name: "Stalact", location: "Forgotten Battlefield" },
            { name: "Jovial Moissonneuse", location: "Monoco's Station" },
            { name: "Seething Boucheclier", location: "Old Lumière" },
            { name: "Sorrowful Chapelier", location: "The Monolith" },
            { name: "Visages", location: "The Monolith" },
            { name: "Mask Keeper", location: "The Monolith" },
            { name: "Tisseur", location: "Sirene's Dress" },
            { name: "Glissando", location: "Sirene's Dress" },
            { name: "Sirene", location: "Sirene's Dress" },
            { name: "Gargant", location: "The Continent" },
            { name: "The Paintress", location: "The Canvas" },
            { name: "Creation", location: "The Canvas" },
            { name: "Renoir", location: "The Canvas" }
        ],
        secondary: [
            { name: "Bourgeon", location: "Spring Meadows" },
            { name: "Chromatic Abbest", location: "The Continent" },
            { name: "Chromatic Aberration", location: "The Continent" },
            { name: "Chromatic Benisseur", location: "The Continent" },
            { name: "Chromatic Bourgeon", location: "The Continent" },
            { name: "Chromatic Bruler", location: "The Continent" },
            { name: "Chromatic Demineur", location: "The Continent" },
            { name: "Chromatic Gault", location: "The Continent" },
            { name: "Chromatic Glissando", location: "Sirene's Dress" },
            { name: "Chromatic Greatsword Cultist", location: "The Continent" },
            { name: "Chromatic Lancelier", location: "The Continent" },
            { name: "Chromatic Jar", location: "The Continent" },
            { name: "Chromatic Orphelin", location: "The Continent" },
            { name: "Chromatic Luster", location: "The Continent" },
            { name: "Chromatic Portier", location: "The Continent" },
            { name: "Chromatic Troubadour", location: "The Continent" },
            { name: "Clair Obscur", location: "The Continent" },
            { name: "Frost Eveque", location: "Frozen Hearts" },
            { name: "Golgra", location: "Sacred River" },
            { name: "Grosse Tete (Boss)", location: "The Continent" },
            { name: "Grown Bourgeon", location: "The Meadows" },
            { name: "Serpenphare", location: "The Continent" },
            { name: "Sprong", location: "The Continent" },
            { name: "Thunder Eveque", location: "The Continent" },
            { name: "Alicia", location: "The Manor" },
            { name: "Clea", location: "The Manor" },
            { name: "Simon", location: "The Canvas" }
        ]
    };

    // DOM elements
    const mainBossesList = document.getElementById('main-bosses');
    const secondaryBossesList = document.getElementById('secondary-bosses');
    const searchInput = document.getElementById('search-input');
    const hideCompletedCheckbox = document.getElementById('hide-completed');
    const completedCountElement = document.getElementById('completed-count');
    const totalCountElement = document.getElementById('total-count');
    const progressBar = document.getElementById('progress-bar');

    // Load saved data from localStorage
    let savedBosses = JSON.parse(localStorage.getItem('expedition33Bosses')) || {};

    // Initialize the boss lists
    function initializeBosses() {
        // Populate main bosses
        bossData.main.forEach(boss => {
            const bossElement = createBossElement(boss, 'main');
            mainBossesList.appendChild(bossElement);
        });

        // Populate secondary bosses
        bossData.secondary.forEach(boss => {
            const bossElement = createBossElement(boss, 'secondary');
            secondaryBossesList.appendChild(bossElement);
        });

        // Update counters and progress
        updateCounters();
    }

    // Create a boss element
    function createBossElement(boss, category) {
        const bossId = `${category}-${boss.name.replace(/\s+/g, '-').toLowerCase()}`;
        const isCompleted = savedBosses[bossId] === true;

        const bossItem = document.createElement('div');
        bossItem.className = `boss-item ${isCompleted ? 'completed' : ''}`;
        bossItem.dataset.id = bossId;
        bossItem.dataset.name = boss.name.toLowerCase();
        bossItem.addEventListener('click', function(e) {
            // Don't trigger if clicking directly on the checkbox
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                toggleBossCompletion(bossId, checkbox.checked);
            }
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'boss-checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', function() {
            toggleBossCompletion(bossId, this.checked);
        });

        const bossName = document.createElement('span');
        bossName.className = 'boss-name';
        bossName.textContent = boss.name;

        // const bossLocation = document.createElement('span');
        // bossLocation.className = 'boss-location';
        // bossLocation.textContent = boss.location;

        bossItem.appendChild(checkbox);
        bossItem.appendChild(bossName);
        // bossItem.appendChild(bossLocation);

        return bossItem;
    }

    // Toggle boss completion status
    function toggleBossCompletion(bossId, isCompleted) {
        // Update the saved data
        savedBosses[bossId] = isCompleted;
        localStorage.setItem('expedition33Bosses', JSON.stringify(savedBosses));

        // Update the UI
        const bossElement = document.querySelector(`.boss-item[data-id="${bossId}"]`);
        if (bossElement) {
            if (isCompleted) {
                bossElement.classList.add('completed');
            } else {
                bossElement.classList.remove('completed');
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
        const totalBosses = bossData.main.length + bossData.secondary.length;
        const completedBosses = Object.values(savedBosses).filter(value => value === true).length;

        completedCountElement.textContent = completedBosses;
        totalCountElement.textContent = totalBosses;

        // Update progress bar
        const progressPercentage = (completedBosses / totalBosses) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update main page if it exists
        if (window.updateMainPageProgress) {
            window.updateMainPageProgress('bosses', completedBosses, totalBosses);
        }
    }

    // Filter bosses based on search input
    function filterBosses() {
        const searchTerm = searchInput.value.toLowerCase();
        const allBossItems = document.querySelectorAll('.boss-item');

        allBossItems.forEach(item => {
            const bossName = item.dataset.name;
            if (bossName.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Apply hide completed filter
    function applyHideCompletedFilter() {
        const allBossItems = document.querySelectorAll('.boss-item');
        
        allBossItems.forEach(item => {
            if (hideCompletedCheckbox.checked && item.classList.contains('completed')) {
                item.classList.add('hidden');
            } else if (item.classList.contains('hidden') && !searchInput.value) {
                // Only remove 'hidden' if it's not hidden by search
                item.classList.remove('hidden');
            }
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterBosses);
    
    hideCompletedCheckbox.addEventListener('change', function() {
        applyHideCompletedFilter();
    });
    
    // Clear search button
    const clearSearchButton = document.getElementById('clear-search');
    clearSearchButton.addEventListener('click', function() {
        searchInput.value = '';
        filterBosses();
    });

    // Category headers toggle
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', function() {
            const bossList = this.nextElementSibling;
            bossList.classList.toggle('hidden');
            
            // Toggle the arrow
            const headerText = this.querySelector('h3');
            if (bossList.classList.contains('hidden')) {
                headerText.style.setProperty('--arrow', '"►"');
            } else {
                headerText.style.setProperty('--arrow', '"▼"');
            }
        });
    });

    // Initialize the app
    initializeBosses();
});
