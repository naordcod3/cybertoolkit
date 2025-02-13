document.addEventListener("DOMContentLoaded", () => {
    // Matrix Effect
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = "01abcdefghijklmnopqrstuvwxyz";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)"; // Slightly slower fade-out
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff00";
        ctx.font = `${fontSize}px monospace`;
    
        drops.forEach((y, i) => {
            const text = letters[Math.floor(Math.random() * letters.length)];
            const x = i * fontSize;
            ctx.fillText(text, x, y);
            drops[i] = y > canvas.height || Math.random() > 0.98 ? 0 : y + fontSize;
        });
    }
    
    setInterval(drawMatrix, 40);
    

    // Smooth Tile Expansion
    document.querySelectorAll(".topic-card").forEach((card) => {
        card.addEventListener("click", () => {
            card.classList.toggle("expanded");
        });
    });

    // Background Music Toggle
    const music = document.getElementById("background-music");
    const toggleButton = document.getElementById("toggle-music");

    toggleButton.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            toggleButton.textContent = "🔊 Mute";
        } else {
            music.pause();
            toggleButton.textContent = "🔇 Unmute";
        }
    });

    // Codebreaker Game Logic
    const correctKey = "1337";
    const display = document.getElementById("code-display");
    const message = document.getElementById("game-message");
    const userInput = document.getElementById("user-input");

    window.checkCode = function () {
        const input = userInput.value.trim();
        if (input === correctKey) {
            display.textContent = "ACCESS GRANTED";
            message.textContent = "Decryption Successful!";
            message.style.color = "lime";
        } else {
            message.textContent = "ACCESS DENIED. Try again.";
            message.style.color = "red";
        }
    };
});
document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("codeInput");
    const submitButton = document.getElementById("submitCode");
    const body = document.body;
    const accessMessage = document.getElementById("accessMessage");

    const correctCode = "1337H4X"; // Change this to your desired access code

    submitButton.addEventListener("click", function () {
        if (inputField.value === correctCode) {
            triggerAccessGrantedEffect();
        } else {
            triggerAccessDeniedEffect();
        }
    });

    function triggerAccessGrantedEffect() {
        playSound("audio/access_granted.mp3"); // Make sure this file exists
        body.classList.add("glitch-effect");
        accessMessage.innerText = "ACCESS GRANTED";
        accessMessage.classList.add("access-granted");
        setTimeout(() => {
            body.classList.remove("glitch-effect");
            accessMessage.classList.remove("access-granted");
        }, 2000);
    }

    function triggerAccessDeniedEffect() {
        playSound("audio/access_denied.mp3"); // Make sure this file exists
        accessMessage.innerText = "ACCESS DENIED";
        accessMessage.classList.add("access-denied");
        setTimeout(() => {
            accessMessage.classList.remove("access-denied");
        }, 1000);
    }

    function playSound(soundFile) {
        const audio = new Audio(soundFile);
        audio.play();
    }
});

async function fetchIP() {
    try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('user-ip').innerText = data.ip;
    } catch (error) {
        document.getElementById('user-ip').innerText = "Unable to fetch IP";
    }
}

fetchIP();

function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    document.getElementById('browser-info').innerText = userAgent;
}

getBrowserInfo();

// Fetch User IP Address
async function fetchIP() {
    try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('user-ip').innerText = data.ip;
    } catch (error) {
        document.getElementById('user-ip').innerText = "Unable to fetch IP";
    }
}

// Show System Info
document.getElementById("os-info").textContent = `OS: ${navigator.platform}`;
document.getElementById("browser-info").textContent = `Browser: ${navigator.userAgent}`;


// Generate a Random Password
function generatePassword() {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";

    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Display the generated password
    document.getElementById("generated-password").textContent = password;

    // Show the copy button
    let copyBtn = document.getElementById("copy-btn");
    copyBtn.classList.remove("hidden");
    copyBtn.classList.add("inline-block"); // Ensures it's visible properly
}

function copyPassword() {
    let password = document.getElementById("generated-password").textContent;

    if (!password) {
        alert("No password generated yet!");
        return;
    }

    navigator.clipboard.writeText(passw

    function copyPassword() {
        let password = document.getElementById("generated-password").textContent;

        if (!password) {
            alert("No password generated yet!");
            return;
        }

        navigator.clipboard.writeText(password).then(() => {
            alert("Password copied to clipboard!");
        }).catch(err => {
            console.error("Copy failed", err);
        });
    }






// Generate Fake Hash (Base64)
function generateHash() {
    const text = document.getElementById('hash-input').value;
    document.getElementById('hash-output').innerText = btoa(text);
}


// Simulated Ping Function
function simulatePing() {
    const site = document.getElementById('ping-input').value;
    document.getElementById('ping-output').innerText = `Pinging ${site} ... Response: 64 bytes from ${site}`;
}

// Fake Terminal Command Execution
document.getElementById('terminal-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const command = event.target.value;
        const output = document.getElementById('terminal-output');

        if (command === "ip") {
            fetchIP();
        } else if (command === "clear") {
            output.innerHTML = "root@cyber:~$";
        } else {
            output.innerHTML += `<br>root@cyber:~$ Command not found: ${command}`;
        }

        event.target.value = '';
    }
});

// Run on page load
fetchIP();
getSystemInfo();

// update year
document.getElementById("year").textContent = new Date().getFullYear();

//typewriter
const text = "Welcome to the Cyber Underground...";
let index = 0;
function typeWriter() {
    if (index < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}
window.onload = typeWriter;

//scroll
const codeCanvas = document.getElementById("codeRainCanvas");
const codeCtx = codeCanvas.getContext("2d");

codeCanvas.width = window.innerWidth;
codeCanvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = Math.floor(codeCanvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawCodeRain() {
    codeCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
    codeCtx.fillRect(0, 0, codeCanvas.width, codeCanvas.height);
    codeCtx.fillStyle = "#00ff00";
    codeCtx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        codeCtx.fillText(text, x, y);
        drops[i] = y > codeCanvas.height || Math.random() > 0.975 ? 0 : y + fontSize;
    });

    requestAnimationFrame(drawCodeRain);
}

drawCodeRain();


