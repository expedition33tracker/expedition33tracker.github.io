document.addEventListener('DOMContentLoaded', function() {
    // Expedition Journals data from the wiki
    const journalsData = [
        { name: "Journal - Fracture Survivor", location: "Old Lumiere" },
        { name: "Journal - Expedition 34", location: "The Crows" },
        { name: "Journal - Expedition 35", location: "Falling Leaves" },
        { name: "Journal - Expedition 36", location: "White Tree" },
        { name: "Journal - Expedition 37", location: "Gestral Beach" },
        { name: "Journal - Expedition 38", location: "Yellow Harvest" },
        { name: "Journal - Expedition 39", location: "Visages" },
        { name: "Journal - Expedition 40", location: "The Continent" },
        { name: "Journal - Expedition 41", location: "Forgotten Battlefield" },
        { name: "Journal - Expedition 42", location: "Old Lumiere" },
        { name: "Journal - Expedition 43", location: "The Continent" },
        { name: "Journal - Expedition 44", location: "Yellow Harvest" },
        { name: "Journal - Expedition 45", location: "Crushing Cavern" },
        { name: "Journal - Expedition 46", location: "Sirene's Dress" },
        { name: "Journal - Expedition 47", location: "The Continent" },
        { name: "Journal - Expedition 48", location: "Stone Quarry" },
        { name: "Journal - Expedition 49", location: "Falling Leaves" },
        { name: "Journal - Expedition 50", location: "Stone Wave Cliffs" },
        { name: "Journal - Expedition 51", location: "Frozen Hearts" },
        { name: "Journal - Expedition 52", location: "Gestral Village" },
        { name: "Journal - Expedition 53", location: "The Small Bourgeon" },
        { name: "Journal - Expedition 54", location: "Stone Wave Cliffs Cave" },
        { name: "Journal - Expedition 55", location: "Sirene" },
        { name: "Journal - Expedition 56", location: "Stone Wave Cliffs" },
        { name: "Journal - Expedition 57", location: "Forgotten Battlefield" },
        { name: "Journal - Expedition 58", location: "Old Lumiere" },
        { name: "Journal - Expedition 59", location: "Yellow Harvest" },
        { name: "Journal - Expedition 60", location: "Lumiere (Act III)" },
        { name: "Journal - Expedition 61", location: "The Reacher" },
        { name: "Journal - Expedition 62", location: "The Continent" },
        { name: "Journal - Expedition 63", location: "Ancient Sanctuary" },
        { name: "Journal - Expedition 64", location: "The Continent" },
        { name: "Journal - Expedition 65", location: "Monoco's Station" },
        { name: "Journal - Expedition 66", location: "Esquie's Nest" },
        { name: "Journal - Expedition 67", location: "Sirene" },
        { name: "Journal - Expedition 68", location: "Flying Waters" },
        { name: "Journal - Expedition 69", location: "Visages" },
        { name: "Journal - Expedition 70", location: "The Monolith" },
        { name: "Journal - Expedition 78", location: "Stone Wave Cliffs" },
        { name: "Journal - Expedition 81", location: "Spring Meadows" },
        { name: "Journal - Expedition 84", location: "The Fountain" },
        { name: "Journal - Julie Search and Rescue", location: "The Continent" },
        { name: "Journal - Simon", location: "The Abyss" },
        { name: "Journal - Aline", location: "The Manor" },
        { name: "Journal - Renoir", location: "The Manor" },
        { name: "Journal - Unknown 1", location: "The Manor" },
        { name: "Journal - Unknown 2", location: "The Manor" },
        { name: "Journal - Unknown 3 (The Manor)", location: "The Manor (Painting Room)" },
        { name: "Journal - Verso", location: "The Continent" }
    ];

    // DOM elements
    const journalsList = document.getElementById('journals-list');
    const searchInput = document.getElementById('search-input');
    const hideCompletedCheckbox = document.getElementById('hide-completed');
    const completedCountElement = document.getElementById('completed-count');
    const totalCountElement = document.getElementById('total-count');
    const progressBar = document.getElementById('progress-bar');

    // Load saved data from localStorage
    let savedJournals = JSON.parse(localStorage.getItem('expedition33Journals')) || {};

    // Initialize the journals list
    function initializeJournals() {
        // Populate journals
        journalsData.forEach(journal => {
            const journalElement = createJournalElement(journal);
            journalsList.appendChild(journalElement);
        });

        // Update counters and progress
        updateCounters();
    }

    // Create a journal element
    function createJournalElement(journal) {
        const journalId = `journal-${journal.name.replace(/\s+/g, '-').toLowerCase()}`;
        const isCompleted = savedJournals[journalId] === true;

        const journalItem = document.createElement('div');
        journalItem.className = `boss-item ${isCompleted ? 'completed' : ''}`;
        journalItem.dataset.id = journalId;
        journalItem.dataset.name = journal.name.toLowerCase();
        journalItem.addEventListener('click', function(e) {
            // Don't trigger if clicking directly on the checkbox
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                toggleJournalCompletion(journalId, checkbox.checked);
            }
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'boss-checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', function() {
            toggleJournalCompletion(journalId, this.checked);
        });

        const journalName = document.createElement('span');
        journalName.className = 'boss-name';
        journalName.textContent = journal.name;

        const journalLocation = document.createElement('span');
        journalLocation.className = 'boss-location';
        journalLocation.textContent = journal.location;

        journalItem.appendChild(checkbox);
        journalItem.appendChild(journalName);
        journalItem.appendChild(journalLocation);

        return journalItem;
    }

    // Toggle journal completion status
    function toggleJournalCompletion(journalId, isCompleted) {
        // Update the saved data
        savedJournals[journalId] = isCompleted;
        localStorage.setItem('expedition33Journals', JSON.stringify(savedJournals));

        // Update the UI
        const journalElement = document.querySelector(`.boss-item[data-id="${journalId}"]`);
        if (journalElement) {
            if (isCompleted) {
                journalElement.classList.add('completed');
            } else {
                journalElement.classList.remove('completed');
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
        const totalJournals = journalsData.length;
        const completedJournals = Object.values(savedJournals).filter(value => value === true).length;

        completedCountElement.textContent = completedJournals;
        totalCountElement.textContent = totalJournals;

        // Update progress bar
        const progressPercentage = (completedJournals / totalJournals) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update main page if it exists
        if (window.updateMainPageProgress) {
            window.updateMainPageProgress('journals', completedJournals, totalJournals);
        }
    }

    // Filter journals based on search input
    function filterJournals() {
        const searchTerm = searchInput.value.toLowerCase();
        const allJournalItems = document.querySelectorAll('.boss-item');

        allJournalItems.forEach(item => {
            const journalName = item.dataset.name;
            if (journalName.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Apply hide completed filter
    function applyHideCompletedFilter() {
        const allJournalItems = document.querySelectorAll('.boss-item');
        
        allJournalItems.forEach(item => {
            if (hideCompletedCheckbox.checked && item.classList.contains('completed')) {
                item.classList.add('hidden');
            } else if (item.classList.contains('hidden') && !searchInput.value) {
                // Only remove 'hidden' if it's not hidden by search
                item.classList.remove('hidden');
            }
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterJournals);
    
    hideCompletedCheckbox.addEventListener('change', function() {
        applyHideCompletedFilter();
    });
    
    // Clear search button
    const clearSearchButton = document.getElementById('clear-search');
    clearSearchButton.addEventListener('click', function() {
        searchInput.value = '';
        filterJournals();
    });

    // Category headers toggle
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', function() {
            const journalsList = this.nextElementSibling;
            journalsList.classList.toggle('hidden');
            
            // Toggle the arrow
            const headerText = this.querySelector('h3');
            if (journalsList.classList.contains('hidden')) {
                headerText.style.setProperty('--arrow', '"►"');
            } else {
                headerText.style.setProperty('--arrow', '"▼"');
            }
        });
    });

    // Initialize the app
    initializeJournals();
});
