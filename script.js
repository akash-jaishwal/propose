// DOM Elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const backgroundHearts = document.getElementById('background-hearts');
const sparklesContainer = document.getElementById('sparkles');

// Create a persistent thought bubble element
const thoughtBubble = document.createElement('div');
thoughtBubble.classList.add('thought-bubble');
thoughtBubble.style.display = 'none';
document.body.appendChild(thoughtBubble);

// Variables
let noCount = 0;

// ========== SPARKLE EFFECTS ==========
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.animationDelay = Math.random() * 2 + "s";
    sparklesContainer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

setInterval(createSparkle, 200);

// ========== HEART ANIMATION ==========
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random heart types
    const heartTypes = ['❤️', '💕', '💖', '💗', '💝', '💘', '🩷', '🤍'];
    heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s"; // 4-7s
    heart.style.fontSize = Math.random() * 15 + 15 + "px"; // 15-30px
    backgroundHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(createHeart, 250);

// ========== NO BUTTON LOGIC ==========
const moveButton = () => {
    noCount++;

    // Reset text
    noBtn.querySelector('.btn-text').innerText = "No 😢";

    // Funny messages in Hindi/English mix
    const messages = [
        "Main itna bura hu kya? 🥺",
        "Single hi rehna hai kya? 😒",
        "Soch lo ache se! 🤔",
        "Dil todogi kya? 💔",
        "Manja na yaar! 😘",
        "Aisa mat kro! 😭",
        "Please? 🥺",
        "Last chance! ⚠️",
        "Ek baar soch lo! 🙏",
        "Mera dil hai ye! 💕",
        "Pakka nahi? 😔",
        "I'll be sad! 😢",
        "Ruko zara! 🥹",
        "No nahi! 😤"
    ];

    // Pick a random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];

    // Update Thought Bubble
    thoughtBubble.innerText = message;
    thoughtBubble.style.display = 'block';

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    // Get card dimensions for collision detection
    const card = document.querySelector('.glass-card');
    const cardRect = card.getBoundingClientRect();

    const padding = 30;
    let rX, rY;
    let overlap = true;
    let attempts = 0;

    // Find a position that doesn't overlap with the card
    while (overlap && attempts < 50) {
        attempts++;
        rX = Math.random() * (viewportWidth - btnWidth - 2 * padding) + padding;
        rY = Math.random() * (viewportHeight - btnHeight - 2 * padding) + padding;

        const safetyMargin = 30;

        if (
            rX < cardRect.right + safetyMargin &&
            rX + btnWidth > cardRect.left - safetyMargin &&
            rY < cardRect.bottom + safetyMargin &&
            rY + btnHeight > cardRect.top - safetyMargin
        ) {
            overlap = true;
        } else {
            overlap = false;
        }
    }

    // Move button to body if not already there
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }

    // Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${rX}px`;
    noBtn.style.top = `${rY}px`;

    // Position Thought Bubble
    const bubbleRect = thoughtBubble.getBoundingClientRect();

    let bubbleLeft = rX + (btnWidth / 2) - (bubbleRect.width / 2);
    let bubbleTop = rY - bubbleRect.height - 20;

    // Boundary checks
    if (bubbleLeft < 10) bubbleLeft = 10;
    if (bubbleLeft + bubbleRect.width > viewportWidth - 10) {
        bubbleLeft = viewportWidth - bubbleRect.width - 10;
    }
    if (bubbleTop < 10) {
        bubbleTop = rY + btnHeight + 20;
    }

    thoughtBubble.style.left = `${bubbleLeft}px`;
    thoughtBubble.style.top = `${bubbleTop}px`;

    // Add extra visual feedback
    noBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        noBtn.style.transform = 'scale(1)';
    }, 150);
};

// Event Listeners for No Button
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});

// Touch support for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

// ========== YES BUTTON LOGIC ==========
yesBtn.addEventListener('click', () => {
    // Add a nice transition effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        window.location.href = "success.html";
    }, 500);
});

// ========== INITIAL ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation to the card
    const card = document.querySelector('.glass-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.9)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    }, 100);
});
