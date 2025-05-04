document.addEventListener('DOMContentLoaded', function() {
    // Music records data from the wiki
    const musicData = [
        { name: "Alicia", location: "The Manor (Alicia's Study)" },
        { name: "Alicia's Birthday Party", location: "Boat Graveyard" },
        { name: "Aline", location: "White Sands" },
        { name: "Aline's Glasshouse", location: "Lost Woods" },
        { name: "Children of Lumière", location: "The Continent (Purchase from Citrelo for 1000 Chroma)" },
        { name: "Clea", location: "Endless Tower" },
        { name: "Clea! Don't Pull Your Sister's Hair!", location: "The Manor (Clea's Art Room)" },
        { name: "Endless Light", location: "Renoir's Drafts" },
        { name: "Forlorn", location: "The Manor" },
        { name: "Goblu", location: "The Continent (Purchase from Blabary for 1000 Chroma)" },
        { name: "Gustave", location: "Stone Wave Cliffs" },
        { name: "Honeymoon in Lumière", location: "White Tree" },
        { name: "L'Amour d'une Mère", location: "The Manor" },
        { name: "Le Grand Café de Lumière", location: "The Carousel" },
        { name: "Lettre à Maelle", location: "Camp (After defeating an axon in Act II)" },
        { name: "Lights of the Past", location: "Ancient Gestral City" },
        { name: "Linen and Cotton", location: "The Continent (Purchase from Rubiju for 1000 Chroma)" },
        { name: "Lost Voice", location: "The Continent (Purchase from Strabami for 5000 Chroma)" },
        { name: "Lumière", location: "Lumiere (Defeat the Mime)" },
        { name: "Lune", location: "Camp (Relationship Level 6 with Lune)" },
        { name: "Monoco", location: "Camp (Relationship Level 6 with Monoco)" },
        { name: "Nocturne pour Lumière", location: "Sinister Cave" },
        { name: "Nocturne pour un masque de tristesse", location: "The Manor" },
        { name: "Our Drafts Collide", location: "Camp (After defeating final boss)" },
        { name: "Our Painted Family", location: "The Meadows" },
        { name: "Renoir", location: "The Manor" },
        { name: "Révérence", location: "Blades' Graveyard" },
        { name: "Rêveries dans Paris", location: "Flying Casino" },
        { name: "Robe de Jour", location: "The Continent (Purchase from Rederi for 1000 Chroma)" },
        { name: "Sciel", location: "Camp (Relationship Level 6 with Sciel)" },
        { name: "Un 33 Décembre à Lumière", location: "Twilight Quarry" },
        { name: "Until Next Life", location: "Falling Leaves" },
        { name: "Verso", location: "The Manor" }
    ];

    // DOM elements
    const musicRecordsList = document.getElementById('music-records');
    const searchInput = document.getElementById('search-input');
    const hideCompletedCheckbox = document.getElementById('hide-completed');
    const completedCountElement = document.getElementById('completed-count');
    const totalCountElement = document.getElementById('total-count');
    const progressBar = document.getElementById('progress-bar');

    // Load saved data from localStorage
    let savedMusicRecords = JSON.parse(localStorage.getItem('expedition33MusicRecords')) || {};

    // Initialize the music records list
    function initializeMusicRecords() {
        // Populate music records
        musicData.forEach(record => {
            const recordElement = createMusicRecordElement(record);
            musicRecordsList.appendChild(recordElement);
        });

        // Update counters and progress
        updateCounters();
    }

    // Create a music record element
    function createMusicRecordElement(record) {
        const recordId = `music-${record.name.replace(/\s+/g, '-').toLowerCase()}`;
        const isCompleted = savedMusicRecords[recordId] === true;

        const recordItem = document.createElement('div');
        recordItem.className = `boss-item ${isCompleted ? 'completed' : ''}`;
        recordItem.dataset.id = recordId;
        recordItem.dataset.name = record.name.toLowerCase();
        recordItem.addEventListener('click', function(e) {
            // Don't trigger if clicking directly on the checkbox
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                toggleMusicRecordCompletion(recordId, checkbox.checked);
            }
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'boss-checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', function() {
            toggleMusicRecordCompletion(recordId, this.checked);
        });

        const recordName = document.createElement('span');
        recordName.className = 'boss-name';
        recordName.textContent = record.name;

        const recordLocation = document.createElement('span');
        recordLocation.className = 'boss-location';
        recordLocation.textContent = record.location;

        recordItem.appendChild(checkbox);
        recordItem.appendChild(recordName);
        recordItem.appendChild(recordLocation);

        return recordItem;
    }

    // Toggle music record completion status
    function toggleMusicRecordCompletion(recordId, isCompleted) {
        // Update the saved data
        savedMusicRecords[recordId] = isCompleted;
        localStorage.setItem('expedition33MusicRecords', JSON.stringify(savedMusicRecords));

        // Update the UI
        const recordElement = document.querySelector(`.boss-item[data-id="${recordId}"]`);
        if (recordElement) {
            if (isCompleted) {
                recordElement.classList.add('completed');
            } else {
                recordElement.classList.remove('completed');
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
        const totalRecords = musicData.length;
        const completedRecords = Object.values(savedMusicRecords).filter(value => value === true).length;

        completedCountElement.textContent = completedRecords;
        totalCountElement.textContent = totalRecords;

        // Update progress bar
        const progressPercentage = (completedRecords / totalRecords) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update main page if it exists
        if (window.updateMainPageProgress) {
            window.updateMainPageProgress('music', completedRecords, totalRecords);
        }
    }

    // Filter music records based on search input
    function filterMusicRecords() {
        const searchTerm = searchInput.value.toLowerCase();
        const allRecordItems = document.querySelectorAll('.boss-item');

        allRecordItems.forEach(item => {
            const recordName = item.dataset.name;
            if (recordName.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Apply hide completed filter
    function applyHideCompletedFilter() {
        const allRecordItems = document.querySelectorAll('.boss-item');
        
        allRecordItems.forEach(item => {
            if (hideCompletedCheckbox.checked && item.classList.contains('completed')) {
                item.classList.add('hidden');
            } else if (item.classList.contains('hidden') && !searchInput.value) {
                // Only remove 'hidden' if it's not hidden by search
                item.classList.remove('hidden');
            }
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterMusicRecords);
    
    hideCompletedCheckbox.addEventListener('change', function() {
        applyHideCompletedFilter();
    });
    
    // Clear search button
    const clearSearchButton = document.getElementById('clear-search');
    clearSearchButton.addEventListener('click', function() {
        searchInput.value = '';
        filterMusicRecords();
    });

    // Category headers toggle
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', function() {
            const recordsList = this.nextElementSibling;
            recordsList.classList.toggle('hidden');
            
            // Toggle the arrow
            const headerText = this.querySelector('h3');
            if (recordsList.classList.contains('hidden')) {
                headerText.style.setProperty('--arrow', '"►"');
            } else {
                headerText.style.setProperty('--arrow', '"▼"');
            }
        });
    });

    // Initialize the app
    initializeMusicRecords();
});
