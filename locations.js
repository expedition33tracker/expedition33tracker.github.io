document.addEventListener('DOMContentLoaded', function() {
    // Location data from the wiki
    const locationData = {
        primary: [
            { name: "Lumiere (Prologue)" },
            { name: "Spring Meadows" },
            { name: "Flying Waters" },
            { name: "Ancient Sanctuary" },
            { name: "Gestral Village" },
            { name: "Esquie's Nest" },
            { name: "Stone Wave Cliffs" },
            { name: "Forgotten Battlefield" },
            { name: "Monoco's Station" },
            { name: "Old Lumiere" },
            { name: "Visages" },
            { name: "Sirene" },
            { name: "The Monolith" },
            { name: "The Manor (Epilogue)" },
            { name: "Lumiere (Act III)" }
        ],
        sub: [
            { name: "Abbest Cave" },
            { name: "Ancient Gestral City" },
            { name: "Blades' Graveyard" },
            { name: "Boat Graveyard" },
            { name: "Coastal Cave" },
            { name: "Crimson Forest" },
            { name: "Crushing Cavern" },
            { name: "Dark Gestral Arena" },
            { name: "Dark Shores" },
            { name: "Endless Night Sanctuary" },
            { name: "Endless Tower" },
            { name: "Esoteric Ruins" },
            { name: "Falling Leaves" },
            { name: "Floating Cemetery" },
            { name: "Flying Casino" },
            { name: "Flying Manor" },
            { name: "Frozen Hearts" },
            { name: "Gestral Beach" },
            { name: "Hidden Gestral Arena" },
            { name: "Isle of the Eyes" },
            { name: "Lost Woods" },
            { name: "Painting Workshop" },
            { name: "Red Woods" },
            { name: "Renoir's Drafts" },
            { name: "Sacred River" },
            { name: "Sinister Cave" },
            { name: "Sirene's Dress" },
            { name: "Sky Island" },
            { name: "Stone Quarry" },
            { name: "Stone Wave Cliffs Cave" },
            { name: "Sunless Cliffs" },
            { name: "The Abyss" },
            { name: "The Canvas" },
            { name: "The Carousel" },
            { name: "The Chosen Path" },
            { name: "The Crows" },
            { name: "The Fountain" },
            { name: "The Meadows" },
            { name: "The Reacher" },
            { name: "The Small Bourgeon" },
            { name: "Twilight Quarry" },
            { name: "White Sands" },
            { name: "White Tree" },
            { name: "Yellow Harvest" }
        ]
    };

    // DOM elements
    const primaryLocationsList = document.getElementById('primary-locations');
    const subLocationsList = document.getElementById('sub-locations');
    const searchInput = document.getElementById('search-input');
    const hideCompletedCheckbox = document.getElementById('hide-completed');
    const completedCountElement = document.getElementById('completed-count');
    const totalCountElement = document.getElementById('total-count');
    const progressBar = document.getElementById('progress-bar');

    // Load saved data from localStorage
    let savedLocations = JSON.parse(localStorage.getItem('expedition33Locations')) || {};

    // Initialize the location lists
    function initializeLocations() {
        // Populate primary locations
        locationData.primary.forEach(location => {
            const locationElement = createLocationElement(location, 'primary');
            primaryLocationsList.appendChild(locationElement);
        });

        // Populate sub-locations
        locationData.sub.forEach(location => {
            const locationElement = createLocationElement(location, 'sub');
            subLocationsList.appendChild(locationElement);
        });

        // Update counters and progress
        updateCounters();
    }

    // Create a location element
    function createLocationElement(location, category) {
        const locationId = `${category}-${location.name.replace(/\s+/g, '-').toLowerCase()}`;
        const isCompleted = savedLocations[locationId] === true;

        const locationItem = document.createElement('div');
        locationItem.className = `boss-item ${isCompleted ? 'completed' : ''}`;
        locationItem.dataset.id = locationId;
        locationItem.dataset.name = location.name.toLowerCase();
        locationItem.addEventListener('click', function(e) {
            // Don't trigger if clicking directly on the checkbox
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                toggleLocationCompletion(locationId, checkbox.checked);
            }
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'boss-checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', function() {
            toggleLocationCompletion(locationId, this.checked);
        });

        const locationName = document.createElement('span');
        locationName.className = 'boss-name';
        locationName.textContent = location.name;

        locationItem.appendChild(checkbox);
        locationItem.appendChild(locationName);

        return locationItem;
    }

    // Toggle location completion status
    function toggleLocationCompletion(locationId, isCompleted) {
        // Update the saved data
        savedLocations[locationId] = isCompleted;
        localStorage.setItem('expedition33Locations', JSON.stringify(savedLocations));

        // Update the UI
        const locationElement = document.querySelector(`.boss-item[data-id="${locationId}"]`);
        if (locationElement) {
            if (isCompleted) {
                locationElement.classList.add('completed');
            } else {
                locationElement.classList.remove('completed');
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
        const totalLocations = locationData.primary.length + locationData.sub.length;
        const completedLocations = Object.values(savedLocations).filter(value => value === true).length;

        completedCountElement.textContent = completedLocations;
        totalCountElement.textContent = totalLocations;

        // Update progress bar
        const progressPercentage = (completedLocations / totalLocations) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update main page if it exists
        if (window.updateMainPageProgress) {
            window.updateMainPageProgress('locations', completedLocations, totalLocations);
        }
    }

    // Filter locations based on search input
    function filterLocations() {
        const searchTerm = searchInput.value.toLowerCase();
        const allLocationItems = document.querySelectorAll('.boss-item');

        allLocationItems.forEach(item => {
            const locationName = item.dataset.name;
            if (locationName.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Apply hide completed filter
    function applyHideCompletedFilter() {
        const allLocationItems = document.querySelectorAll('.boss-item');
        
        allLocationItems.forEach(item => {
            if (hideCompletedCheckbox.checked && item.classList.contains('completed')) {
                item.classList.add('hidden');
            } else if (item.classList.contains('hidden') && !searchInput.value) {
                // Only remove 'hidden' if it's not hidden by search
                item.classList.remove('hidden');
            }
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterLocations);
    
    hideCompletedCheckbox.addEventListener('change', function() {
        applyHideCompletedFilter();
    });
    
    // Clear search button
    const clearSearchButton = document.getElementById('clear-search');
    clearSearchButton.addEventListener('click', function() {
        searchInput.value = '';
        filterLocations();
    });

    // Category headers toggle
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', function() {
            const locationsList = this.nextElementSibling;
            locationsList.classList.toggle('hidden');
            
            // Toggle the arrow
            const headerText = this.querySelector('h3');
            if (locationsList.classList.contains('hidden')) {
                headerText.style.setProperty('--arrow', '"►"');
            } else {
                headerText.style.setProperty('--arrow', '"▼"');
            }
        });
    });

    // Initialize the app
    initializeLocations();
});
