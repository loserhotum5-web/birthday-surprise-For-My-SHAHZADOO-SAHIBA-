// script.js (Final Code: Cake Level 2 -> Quiz Level 3 -> Final Message Level 4)

const audio = document.getElementById('myAudio');
let capturedHearts = 0;
const requiredHearts = 10;
let heartInterval; 

// Quiz ka sawal aur jawab yahan badlein
// DHYAN DEIN: Jawab hamesha SMALL letters mein likhein
const correctAnswer = "cafe"; // <--- APNA SAHI JAWAB YAHAN LIKHEIN (Example: cafe)

// 1. Function to switch screens
function showScreen(screenNumber) {
    // Sab screens chupa do
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });

    // Zaroori screen dikhao
    const targetScreen = document.getElementById('screen' + screenNumber);
    targetScreen.classList.remove('hidden');

    // Game control
    if (screenNumber === 2) {
        startGame(); // Cake game shuru
    } else if (screenNumber === 3) {
        stopGame(); // Cake game rok do
        document.getElementById('quizMessage').innerText = ''; 
        document.getElementById('quizAnswer').value = ''; 
    } else {
        stopGame(); // Baaki screens par game rok do
    }
}

// Shuruat mein Screen 1 dikhao
window.onload = () => showScreen(1);


// 2. Audio Play on First Click
document.addEventListener('click', function() {
    if (audio.paused) {
        audio.play().catch(e => console.log("Audio play error:", e));
    }
}, { once: true });


// 3. Game Logic (Cake Creation)
function startGame() {
    capturedHearts = 0;
    document.getElementById('capturedCount').innerText = 0;
    
    // Cake/Heart ka message badlein
    document.getElementById('screen2').querySelector('h2').innerText = "Collect the Cakes! 🎂";

    // Har 0.5 second mein naya cake
    heartInterval = setInterval(createCake, 500); 
}

function stopGame() {
    clearInterval(heartInterval);
    document.querySelectorAll('.flying-cake').forEach(h => h.remove());
}

function createCake() {
    const cake = document.createElement('div');
    cake.classList.add('flying-cake');
    cake.innerText = '🍰'; // Cake emoji
    cake.style.fontSize = '2em'; 
    
    // Position
    cake.style.left = Math.random() * 90 + 5 + 'vw';
    cake.style.top = Math.random() * 80 + 10 + 'vh'; 
    
    // Capture karne ka logic
    cake.onclick = () => {
        cake.remove();
        capturedHearts++;
        document.getElementById('capturedCount').innerText = capturedHearts;
        
        if (capturedHearts >= requiredHearts) {
            // Level complete! Ab Screen 3 (Quiz) par jao
            showScreen(3); // <-- YAHAN GHALTI THEEK KAR DI GAYI HAI
        }
    };
    
    document.getElementById('screen2').appendChild(cake);

    // Cake ko 5 seconds baad automatically hata do
    setTimeout(() => {
        if (cake.parentElement) cake.remove();
    }, 5000);
}


// 4. Quiz Logic (Screen 3)
function checkAnswer() {
    const userAnswer = document.getElementById('quizAnswer').value.toLowerCase().trim();
    const message = document.getElementById('quizMessage');

    if (userAnswer === correctAnswer) {
        message.style.color = 'yellowgreen';
        message.innerText = "Sahi Jawab! Ab aakhri surprise...";
        
        // 2 second ke baad final screen par jao
        setTimeout(() => {
            showScreen(4); // Final screen
        }, 2000);
        
    } else {
        message.style.color = 'red';
        message.innerText = "Galat Jawab! Dobara koshish karo...";
        document.getElementById('quizAnswer').value = ''; 
    }
}