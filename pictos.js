document.addEventListener('DOMContentLoaded', function() {
    // Pictos data from the wiki
    const pictosData = [
        { name: "Accelerating Heal", attributes: "Health, Speed", effect: "Healing an ally also applies Rush for 1 turn" },
        { name: "Accelerating Last Stand", attributes: "Health, Speed", effect: "Gain Rush if fighting alone" },
        { name: "Accelerating Shots", attributes: "Health, Defense", effect: "20% change to gain Rush on Free Aim shot" },
        { name: "Accelerating Tint", attributes: "Health, Speed", effect: "Healing Tints also apply Rush" },
        { name: "Aegis Revival", attributes: "Defense, Speed", effect: "+1 Shield on being revived" },
        { name: "Anti-Blight", attributes: "Health, Defense", effect: "Immune to Blight" },
        { name: "Anti-Burn", attributes: "Health, Defense", effect: "Immune to Burn" },
        { name: "Anti-Charm", attributes: "Health, Defense", effect: "Immune to Charm" },
        { name: "Anti-Freeze", attributes: "Health, Defense", effect: "Immune to Freeze" },
        { name: "Anti-Stun", attributes: "Health, Defense", effect: "Immune to Stun" },
        { name: "At Death's Door", attributes: "Defense, Critical Rate", effect: "Deal 50% more damage if Health is below 10%" },
        { name: "Attack Lifesteal", attributes: "Health, Critical Rate", effect: "Recover 15% Health on Base Attack" },
        { name: "Augmented Aim", attributes: "Speed, Critical Rate", effect: "50% increased Free Aim damage" },
        { name: "Augmented Attack", attributes: "Defense, Speed", effect: "50% increased Base Attack damage" },
        { name: "Augmented Counter I", attributes: "Health, Critical Rate", effect: "25% increased Counterattack damage" },
        { name: "Augmented Counter II", attributes: "Defense, Critical Rate", effect: "50% increased Counterattack damage" },
        { name: "Augmented Counter III", attributes: "Defense, Critical Rate", effect: "75% increased Counterattack damage" },
        { name: "Augmented First Strike", attributes: "Speed, Critical Rate", effect: "50% increased damage on the first hit. Once per battle" },
        { name: "Auto Death", attributes: "Critical Rate", effect: "Kill self on battle start" },
        { name: "Auto Powerful", attributes: "Speed, Critical Rate", effect: "Apply Powerful for 3 turns on battle start" },
        { name: "Auto Regen", attributes: "Defense", effect: "Apply Regen for 3 turns on battle start" },
        { name: "Auto Rush", attributes: "Speed, Critical Rate", effect: "Apply Rush for 3 turns on battle start" },
        { name: "Auto Shell", attributes: "Health", effect: "Apply Shell for 3 turns on battle start" },
        { name: "Base Shield", attributes: "Speed, Critical Rate", effect: "+1 Shield if not affected by any Shield on turn start" },
        { name: "Beneficial Contamination", attributes: "Defense, Speed", effect: "+2 AP on applying a Status Effect. Once per turn" },
        { name: "Break Specialist", attributes: "Health, Speed", effect: "Break damage is increased by 50%, but base damage is reduced by 20%" },
        { name: "Breaker", attributes: "Speed, Critical Rate", effect: "25% increased Break damage" },
        { name: "Breaking Attack", attributes: "Speed, Critical Rate", effect: "Base Attack on Break" },
        { name: "Breaking Burn", attributes: "Speed, Critical Rate", effect: "25% increased Break damage on Burning enemies" },
        { name: "Breaking Counter", attributes: "Speed, Critical Rate", effect: "50% increased Break damage on Counterattack" },
        { name: "Breaking Death", attributes: "Speed, Critical Rate", effect: "Fully charge enemy's Break Bar on death" },
        { name: "Breaking Shots", attributes: "Speed, Critical Rate", effect: "50% increased Break damage with Free Aim Shots" },
        { name: "Breaking Slow", attributes: "Speed, Critical Rate", effect: "25% increased Break damage against Slowed enemies" },
        { name: "Burn Affinity", attributes: "Speed, Critical Rate", effect: "25% increased damage on Burning Targets" },
        { name: "Burning Break", attributes: "Health, Critical Rate", effect: "Apply 3 Burn stacks on Breaking a target" },
        { name: "Burning Death", attributes: "Speed, Critical Rate", effect: "Apply 3 Burn to all enemies on Death" },
        { name: "Burning Mark", attributes: "Health, Defense", effect: "Apply Burn on hitting a Marked enemy" },
        { name: "Burning Shots", attributes: "Speed, Critical Rate", effect: "20% chance to Burn on Free Aim shot" },
        { name: "Charging Alteration", attributes: "Defense, Speed", effect: "+10% of a Gradient Charge on applying a Buff. Once per turn" },
        { name: "Charging Attack", attributes: "Speed, Critical Rate", effect: "+15% of a Gradient Charge on Base Attack" },
        { name: "Charging Burn", attributes: "Health, Speed", effect: "+20% of a Gradient Charge on applying Burn. Once per turn" },
        { name: "Charging Counter", attributes: "Health, Defense", effect: "+20% of a Gradient Charge on Counterattack" },
        { name: "Charging Critical", attributes: "Defense, Critical Rate", effect: "+20% of a Gradient Charge on Critical Hit. Once per turn" },
        { name: "Charging Mark", attributes: "Speed, Critical Rate", effect: "+20% of a Gradient Charge on hitting a Marked target. Once per turn" },
        { name: "Charging Stun", attributes: "Health, Speed", effect: "+5% of a Gradient Charge on hitting a Stunned enemy" },
        { name: "Charging Tint", attributes: "Health, Defense", effect: "+5% of a Gradient Charge on using an item" },
        { name: "Charging Weakness", attributes: "Speed, Critical Rate", effect: "+15% of a Gradient Charge on hitting a Weakness. Once per turn" },
        { name: "Cheater", attributes: "Health, Speed", effect: "Always play twice in a row" },
        { name: "Cleansing Tint", attributes: "Health, Defense", effect: "Healing Tints also remove all Status Effects from the target" },
        { name: "Clea's Life", attributes: "Health", effect: "On turn start, if no damage taken since last turn, recover 100% Health" },
        { name: "Combo Attack I", attributes: "Speed, Critical Rate", effect: "Base Attack has 1 extra hit" },
        { name: "Combo Attack II", attributes: "Speed, Critical Rate", effect: "Base Attack has 1 extra hit" },
        { name: "Combo Attack III", attributes: "Speed, Critical Rate", effect: "Base Attack has 1 extra hit" },
        { name: "Confident", attributes: "Speed, Critical Rate", effect: "Take 50% less damage, but can't be Healed" },
        { name: "Confident Fighter", attributes: "Health, Critical Rate", effect: "30% increased damage, but can't be Healed" },
        { name: "Critical Break", attributes: "Speed, Critical Rate", effect: "25% increased Break damage on Critical Hits" },
        { name: "Critical Burn", attributes: "Speed, Critical Rate", effect: "25% increased Critical Chance on Burning enemies" },
        { name: "Critical Moment", attributes: "Speed, Critical Rate", effect: "50% increased Critical Chance if Health is below 30%" },
        { name: "Critical Stun", attributes: "Defense, Critical Rate", effect: "100% on Critical Chance on hitting a Stunned target" },
        { name: "Critical Vulnerability", attributes: "Defense, Speed", effect: "25% increased Critical Chance on Defenceless enemies" },
        { name: "Critical Weakness", attributes: "Speed, Critical Rate", effect: "25% increased Critical Chance on Weakness" },
        { name: "Dead Energy I", attributes: "Speed, Critical Rate", effect: "+3 AP on killing an enemy" },
        { name: "Dead Energy II", attributes: "Speed, Critical Rate", effect: "+3 AP on killing an enemy" },
        { name: "Death Bomb", attributes: "Speed, Critical Rate", effect: "On Death, deal damage to all enemies" },
        { name: "Defensive Mode", attributes: "Health, Defense", effect: "On receiving damage, consume 1 AP to take 30% less damage, if possible" },
        { name: "Dodger", attributes: "Speed, Critical Rate", effect: "Gain 1 AP on Perfect Dodge. Once per turn" },
        { name: "Double Burn", attributes: "Speed, Critical Rate", effect: "On applying a Burn stack, apply a second one" },
        { name: "Double Mark", attributes: "Speed", effect: "Mark requires 1 more hit to be removed" },
        { name: "Draining Cleanse", attributes: "Health, Defense", effect: "Consume 1 AP to prevent Status Effects application, if possible" },
        { name: "Effective Heal", attributes: "Health, Defense", effect: "Double all Heals received" },
        { name: "Effective Support", attributes: "Health, Speed", effect: "+2 AP on using an item" },
        { name: "Empowering Attack", attributes: "Speed, Critical Rate", effect: "Gain Powerful for 1 turn on Base Attack" },
        { name: "Empowering Break", attributes: "Speed, Critical Rate", effect: "Gain Powerful on Breaking a target" },
        { name: "Empowering Dodge", attributes: "Speed, Critical Rate", effect: "5% increased damage for each consecutive successful Dodge. Can stack up to 10 times" },
        { name: "Empowering Last Stand", attributes: "Health, Critical Rate", effect: "Gain Powerful if fighting alone" },
        { name: "Empowering Parry", attributes: "Speed, Critical Rate", effect: "Each successful Parry increases damage by 5% until end of the following turn. Taking any damage removes this buff" },
        { name: "Empowering Tint", attributes: "Health, Speed", effect: "Healing Tints also apply Powerful" },
        { name: "Energising Attack I", attributes: "Speed, Critical Rate", effect: "+1 AP on Base Attack" },
        { name: "Energising Attack II", attributes: "Defense, Speed", effect: "+1 AP on Base Attack" },
        { name: "Energising Break", attributes: "Speed, Critical Rate", effect: "+3 AP on Breaking a target" },
        { name: "Energising Burn", attributes: "Defense, Speed", effect: "+1 AP on applying Burn. Once per turn" },
        { name: "Energising Cleanse", attributes: "Health, Defense", effect: "Dispel the first negative Status Effect received an gain 2 AP" },
        { name: "Energising Death", attributes: "Defense, Speed", effect: "On death, +4 AP to allies" },
        { name: "Energising Gradient", attributes: "Speed, Critical Rate", effect: "+1 AP per Gradient Charge consumed" },
        { name: "Energising Heal", attributes: "Health, Speed", effect: "On Healing an ally, also give 2 AP" },
        { name: "Energising Jump", attributes: "Health, Speed", effect: "+1 AP on Jump Counterattack" },
        { name: "Energising Pain", attributes: "Health, Defense", effect: "No longer gain AP on Parry. +1AP on getting hit" },
        { name: "Energising Parry", attributes: "Health", effect: "+1 AP on successful Parry" },
        { name: "Energising Powerful", attributes: "Defense, Speed", effect: "Give 2 AP on applying Powerful" },
        { name: "Energising Revive", attributes: "Health, Defense", effect: "+3 AP to all allies when revived" },
        { name: "Energising Rush", attributes: "Defense, Speed", effect: "Give 2 AP on applying Rush" },
        { name: "Energising Shell", attributes: "Defense, Speed", effect: "Give 2 AP on applying Shell" },
        { name: "Energising Shots", attributes: "Speed, Critical Rate", effect: "20% chance to gain 1 AP on Free Aim shot" },
        { name: "Energising Start I", attributes: "Health", effect: "+1 AP on battle start" },
        { name: "Energising Start II", attributes: "Health", effect: "+1 AP on battle start" },
        { name: "Energising Start III", attributes: "Health", effect: "+1 AP on battle start" },
        { name: "Energising Start IV", attributes: "Health", effect: "+1 AP on battle start" },
        { name: "Energising Stun", attributes: "Speed, Critical Rate", effect: "+1 AP on hitting a Stunned target with a Skill" },
        { name: "Energising Turn", attributes: "Speed", effect: "+1 AP on turn start" },
        { name: "Energy Master", attributes: "Health", effect: "Every AP gain is increased by 1" },
        { name: "Enfeebling Attack", attributes: "Health, Defense", effect: "Base Attack applies Powerless for 1 turn" },
        { name: "Enfeebling Mark", attributes: "Defense, Speed", effect: "Marked targets deal 30% less damage" },
        { name: "Exhausting Power", attributes: "Health, Defense", effect: "50% increased damage if Exhausted" },
        { name: "Exposing Attack", attributes: "Speed, Critical Rate", effect: "Base Attack applies Defenseless for 1 turn" },
        { name: "Exposing Break", attributes: "Defense, Speed", effect: "Apply Defenceless on Break" },
        { name: "Faster Than Strong", attributes: "Health, Defense", effect: "Always play twice in a row, but deal 50% less damage" },
        { name: "First Offensive", attributes: "Speed, Critical Rate", effect: "First hit dealt and taken deals 50% more damage" },
        { name: "First Strike", attributes: "Speed, Critical Rate", effect: "Play first" },
        { name: "Fueling Break", attributes: "Speed, Critical Rate", effect: "Breaking a target doubles its Burn amount" },
        { name: "Full Strength", attributes: "Health, Defense", effect: "25% increased damage on full Health" },
        { name: "Glass Canon", attributes: "Speed", effect: "Deal 25% more damage, but take 25% more damage" },
        { name: "Gradient Break", attributes: "Speed, Critical Rate", effect: "+50% of a Gradient Charge on Breaking a target" },
        { name: "Gradient Breaker", attributes: "Speed, Critical Rate", effect: "50% increased Breaking damage with Gradient Attacks" },
        { name: "Gradient Fighter", attributes: "Speed, Critical Rate", effect: "+25% increased damage with Gradient Attacks" },
        { name: "Greater Defenceless", attributes: "Speed, Critical Rate", effect: "+15% to Defenceless damage amplification" },
        { name: "Greater Powerful", attributes: "Speed, Critical Rate", effect: "+15% to Powerful damage increase" },
        { name: "Greater Powerless", attributes: "Defense, Speed", effect: "+15% to Powerless damage reduction" },
        { name: "Greater Rush", attributes: "Speed, Critical Rate", effect: "+25% Rush Speed increase" },
        { name: "Greater Shell", attributes: "Health, Defense", effect: "+10% to Shell damage reduction" },
        { name: "Greater Slow", attributes: "Defense, Speed", effect: "+15% to Slow Speed reduction" },
        { name: "Healing Boon", attributes: "Defense, Speed", effect: "Heal 15% HP on applying a buff" },
        { name: "Healing Counter", attributes: "Health", effect: "Recover 25% Health on Counterattack" },
        { name: "Healing Death", attributes: "Speed, Critical Rate", effect: "On death, the rest of the Expedition recover all Health" },
        { name: "Healing Fire", attributes: "Defense, Speed", effect: "Recover 25% Health when attacking a Burning target. Once per turn" },
        { name: "Healing Mark", attributes: "Defense", effect: "Recover 25% Health on hitting a Marked enemy. Once per turn" },
        { name: "Healing Parry", attributes: "Health, Defense", effect: "Recover 3% Health on Parry" },
        { name: "Healing Share", attributes: "Health, Critical Rate", effect: "Receive 15% of all Heals affecting other characters" },
        { name: "Healing Stun", attributes: "Health, Speed", effect: "Recover 5% Health on hitting a Stunned target" },
        { name: "Healing Tint Energy", attributes: "Health, Defense", effect: "Healing Tints also give 1 AP" },
        { name: "Immaculate", attributes: "Speed, Critical Rate", effect: "30% increased damage until a hit is received" },
        { name: "In Medias Res", attributes: "Defense, Critical Rate", effect: "+3 Shields on Battle Start, but next Health is halved" },
        { name: "Inverted Affinity", attributes: "Health, Critical Rate", effect: "Apply Inverted on self for 3 turns on battle start. 50% increased damage while Inverted" },
        { name: "Longer Burn", attributes: "Health, Defense", effect: "Burn duration is increased by 2" },
        { name: "Longer Powerful", attributes: "Health, Critical Rate", effect: "On applying Powerful, its duration is increased by 2" },
        { name: "Longer Rush", attributes: "Health, Speed", effect: "On applying Rush, its duration is increased by 2" },
        { name: "Longer Shell", attributes: "Health, Defense", effect: "On applying Shell, its duration is increased by 2" },
        { name: "Last Stand Critical", attributes: "Health, Defense", effect: "100% Critical Chance while fighting alone" },
        { name: "Marking Break", attributes: "Speed, Critical Rate", effect: "Apply Mark on Break" },
        { name: "Marking Shots", attributes: "Speed, Critical Rate", effect: "20% chance to apply Mark on Free Aim shot" },
        { name: "Painted Power", attributes: "Health", effect: "Damage can exceed 9,999" },
        { name: "Painter", attributes: "Speed, Critical Rate", effect: "Convert all Physical damage to Void damage" },
        { name: "Perilous Parry", attributes: "Speed, Critical Rate", effect: "+1 AP on Parry, but damage received is doubled" },
        { name: "Piercing Shot", attributes: "Health, Critical Rate", effect: "25% increased Free Aim damage. Free Aim shots ignore Shields" },
        { name: "Powered Attack", attributes: "Speed, Critical Rate", effect: "On every damage dealt, try to consume 1 AP. If successful, increase damage by 20" },
        { name: "Powerful Heal", attributes: "Health, Speed", effect: "Healing an ally also applies Powerful for 1 turn" },
        { name: "Powerful Mark", attributes: "Speed, Critical Rate", effect: "Gain Powerful on hitting a Marked enemy" },
        { name: "Powerful on Shell", attributes: "Defense, Critical Rate", effect: "Apply Powerful on applying Shell" },
        { name: "Powerful Revive", attributes: "Speed, Critical Rate", effect: "Apply Powerful for 3 turns when revived" },
        { name: "Powerful Shield", attributes: "Speed, Critical Rate", effect: "10% increased damage per Shield Point on self" },
        { name: "Powerful Shots", attributes: "Health, Defense", effect: "20% chance to gain Powerful on Free Aim shot" },
        { name: "Pro Retreat", attributes: "Health, Speed", effect: "Allows Flee to be instantaneous" },
        { name: "Protecting Attack", attributes: "Health, Defense", effect: "Gain Shell for 1 turn on Base Attack" },
        { name: "Protecting Death", attributes: "Health, Defense", effect: "On death, allies gain Shell" },
        { name: "Protecting Heal", attributes: "Health, Defense", effect: "Healing an ally also applies Shell for 1 turn" },
        { name: "Protecting Last Stand", attributes: "Health, Defense", effect: "Gain Shell if fighting alone" },
        { name: "Protecting Tint", attributes: "Health, Defense", effect: "Healing Tints also apply Shell" },
        { name: "Quick Break", attributes: "Speed, Critical Rate", effect: "Play again on Breaking a target" },
        { name: "Random Defense", attributes: "Critical Rate", effect: "Damage taken is randomly multiplied by a value between 50% and 200%" },
        { name: "Recovery", attributes: "Health, Speed", effect: "Recovers 10% Health on turn start" },
        { name: "Revive Paradox", attributes: "Speed, Critical Rate", effect: "Play immediately when revived" },
        { name: "Revive Tint Energy", attributes: "Health, Defense", effect: "Revive Tints also give 3 AP" },
        { name: "Rewarding Mark", attributes: "Defense, Speed", effect: "+2 AP on dealing damage to a Marked target. Once per turn" },
        { name: "Roulette", attributes: "Defense, Critical Rate", effect: "Every hit has a 50% chance to deal either 50% or 200% of its damage" },
        { name: "Rush on Powerful", attributes: "Speed, Critical Rate", effect: "Apply Rush on applying Powerful" },
        { name: "Shell On Rush", attributes: "Defense, Speed", effect: "Apply Shell on applying Rush" },
        { name: "SOS Power", attributes: "Speed, Critical Rate", effect: "Apply Powerful when falling below 50% Health" },
        { name: "SOS Rush", attributes: "Defense, Speed", effect: "Apply Rush when falling below 50% Health" },
        { name: "SOS Shell", attributes: "Defense, Speed", effect: "Apply Shell when falling below 50% Health" },
        { name: "Second Chance", attributes: "Health, Critical Rate", effect: "Revive with 100% Health. Once per battle" },
        { name: "Shared Care", attributes: "Health, Defense", effect: "When healing an ally, also Heal self for 50% of that value" },
        { name: "Shield Affinity", attributes: "Speed, Critical Rate", effect: "30% increased damage while having Shields, but receiving any damage always removes all Shields" },
        { name: "Shielding Death", attributes: "Defense, Speed", effect: "On death, allies gain 3 Shield points" },
        { name: "Shielding Tint", attributes: "Health, Defense", effect: "Healing Tints also add 2 Shields" },
        { name: "Shortcut", attributes: "Speed, Critical Rate", effect: "Immediately play when falling below 30% Health. Once per battle" },
        { name: "Slowing Break", attributes: "Defense, Speed", effect: "Apply Slow on Break" },
        { name: "Sniper", attributes: "Speed, Critical Rate", effect: "First Free Aim shot each turn deals 200% increased damage and can Break" },
        { name: "Solidifying", attributes: "Defense, Speed", effect: "+2 Shields when the character's Health falls below 50%. Once per battle" },
        { name: "Solo Fighter", attributes: "Health, Defense", effect: "Deal 50% more damage if fighting alone" },
        { name: "Staggering Attack", attributes: "Speed, Critical Rate", effect: "50% increased Break damage on Base Attack" },
        { name: "Stay Marked", attributes: "Speed, Critical Rate", effect: "50% chance to apply Mark when attacking a Marked target" },
        { name: "Stun Boost", attributes: "Speed, Critical Rate", effect: "30% increased damage on Stunned targets" },
        { name: "Survivor", attributes: "Speed, Critical Rate", effect: "Survive fatal damage with 1 Health. Once per battle" },
        { name: "Sweet Kill", attributes: "Speed, Critical Rate", effect: "Recover 50% Health on killing an enemy" },
        { name: "Tainted", attributes: "Defense, Critical Rate", effect: "15% increased damage for each Status Effect on self" },
        { name: "Teamwork", attributes: "Health, Defense", effect: "10% increased damage while all allies are alive" },
        { name: "The One", attributes: "Critical Rate", effect: "Max Health is reduced to 1" },
        { name: "Time Tint", attributes: "Health, Defense", effect: "Energy Tints also apply Rush" },
        { name: "Versatile", attributes: "Speed, Critical Rate", effect: "After a Free Aim hit, Base Attack damage is increased by 50% for 1 turn" },
        { name: "Warming Up", attributes: "Health, Critical Rate", effect: "5% increased damage per turn. Can stack up to 5 times" },
        { name: "Weakness Gain", attributes: "Speed, Critical Rate", effect: "+1AP on hitting an enemy's Weakness. Once per turn" }
    ];

    // DOM elements
    const pictosList = document.getElementById('pictos-list');
    const searchInput = document.getElementById('search-input');
    const hideCompletedCheckbox = document.getElementById('hide-completed');
    const completedCountElement = document.getElementById('completed-count');
    const totalCountElement = document.getElementById('total-count');
    const progressBar = document.getElementById('progress-bar');

    // Load saved data from localStorage
    let savedPictos = JSON.parse(localStorage.getItem('expedition33Pictos')) || {};

    // Initialize the pictos list
    function initializePictos() {
        // Populate pictos
        pictosData.forEach(picto => {
            const pictoElement = createPictoElement(picto);
            pictosList.appendChild(pictoElement);
        });

        // Update counters and progress
        updateCounters();
    }

    // Create a picto element
    function createPictoElement(picto) {
        const pictoId = `picto-${picto.name.replace(/\s+/g, '-').toLowerCase()}`;
        const isCompleted = savedPictos[pictoId] === true;

        const pictoItem = document.createElement('div');
        pictoItem.className = `boss-item ${isCompleted ? 'completed' : ''}`;
        pictoItem.dataset.id = pictoId;
        pictoItem.dataset.name = picto.name.toLowerCase();
        pictoItem.addEventListener('click', function(e) {
            // Don't trigger if clicking directly on the checkbox
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                togglePictoCompletion(pictoId, checkbox.checked);
            }
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'boss-checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', function() {
            togglePictoCompletion(pictoId, this.checked);
        });

        const pictoName = document.createElement('span');
        pictoName.className = 'boss-name';
        pictoName.textContent = picto.name;

        const pictoDetails = document.createElement('span');
        pictoDetails.className = 'boss-location';
        pictoDetails.textContent = `${picto.attributes} | ${picto.effect}`;

        pictoItem.appendChild(checkbox);
        pictoItem.appendChild(pictoName);
        pictoItem.appendChild(pictoDetails);

        return pictoItem;
    }

    // Toggle picto completion status
    function togglePictoCompletion(pictoId, isCompleted) {
        // Update the saved data
        savedPictos[pictoId] = isCompleted;
        localStorage.setItem('expedition33Pictos', JSON.stringify(savedPictos));

        // Update the UI
        const pictoElement = document.querySelector(`.boss-item[data-id="${pictoId}"]`);
        if (pictoElement) {
            if (isCompleted) {
                pictoElement.classList.add('completed');
            } else {
                pictoElement.classList.remove('completed');
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
        const totalPictos = pictosData.length;
        const completedPictos = Object.values(savedPictos).filter(value => value === true).length;

        completedCountElement.textContent = completedPictos;
        totalCountElement.textContent = totalPictos;

        // Update progress bar
        const progressPercentage = (completedPictos / totalPictos) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update main page if it exists
        if (window.updateMainPageProgress) {
            window.updateMainPageProgress('pictos', completedPictos, totalPictos);
        }
    }

    // Filter pictos based on search input
    function filterPictos() {
        const searchTerm = searchInput.value.toLowerCase();
        const allPictoItems = document.querySelectorAll('.boss-item');

        allPictoItems.forEach(item => {
            const pictoName = item.dataset.name;
            if (pictoName.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Apply hide completed filter
    function applyHideCompletedFilter() {
        const allPictoItems = document.querySelectorAll('.boss-item');
        
        allPictoItems.forEach(item => {
            if (hideCompletedCheckbox.checked && item.classList.contains('completed')) {
                item.classList.add('hidden');
            } else if (item.classList.contains('hidden') && !searchInput.value) {
                // Only remove 'hidden' if it's not hidden by search
                item.classList.remove('hidden');
            }
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterPictos);
    
    hideCompletedCheckbox.addEventListener('change', function() {
        applyHideCompletedFilter();
    });
    
    // Clear search button
    const clearSearchButton = document.getElementById('clear-search');
    clearSearchButton.addEventListener('click', function() {
        searchInput.value = '';
        filterPictos();
    });

    // Category headers toggle
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', function() {
            const pictosList = this.nextElementSibling;
            pictosList.classList.toggle('hidden');
            
            // Toggle the arrow
            const headerText = this.querySelector('h3');
            if (pictosList.classList.contains('hidden')) {
                headerText.style.setProperty('--arrow', '"►"');
            } else {
                headerText.style.setProperty('--arrow', '"▼"');
            }
        });
    });

    // Initialize the app
    initializePictos();
});
