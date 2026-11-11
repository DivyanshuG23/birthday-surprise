
/* =====================================
   BIRTHDAY SURPRISE - JAVASCRIPT
===================================== */

// ELEMENTS
const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");
const openBtn = document.getElementById("openBtn");

const giftBox = document.getElementById("giftBox");
const typingText = document.getElementById("typingText");

const wishBtn = document.getElementById("wishBtn");
const cake = document.querySelector(".cake");
const cakeResult = document.getElementById("cakeResult");

const finalBtn = document.getElementById("finalBtn");
const finalMessage = document.getElementById("finalMessage");

const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");


// 1. OPEN BIRTHDAY SURPRISE

openBtn.addEventListener("click", () => {

    intro.classList.add("hide");
    mainContent.classList.add("show");

    startConfetti(220);
    playSound(660);

    setTimeout(() => {
        typeBirthdayMessage();
    }, 1200);

});


// 2. BIRTHDAY MESSAGE TYPING ANIMATION

const birthdayMessage = `
Dear Bhai,

Life is more beautiful when we have someone
like you around.

May your life always be filled with happiness,
good health, success and countless beautiful
moments.

May all your dreams come true.
May every new day bring new opportunities,
new achievements and unlimited smiles.

Always stay the same amazing person you are.

Keep smiling, keep growing and keep shining.

You deserve the absolute BEST!

Hamesha khush raho, Bhai! ❤️
`;

let typingIndex = 0;

function typeBirthdayMessage() {

    if (typingIndex < birthdayMessage.length) {

        typingText.innerHTML +=
            birthdayMessage.charAt(typingIndex) === "\n"
            ? "<br>"
            : birthdayMessage.charAt(typingIndex);

        typingIndex++;

        setTimeout(typeBirthdayMessage, 35);

    }

}


// 3. CAKE CANDLE BLOW EFFECT

wishBtn.addEventListener("click", () => {

    if (cake.classList.contains("blown")) {
        return;
    }

    cake.classList.add("blown");

    cakeResult.textContent =
        "🎉 Your wishes are on their way! May all your dreams come true, Bhai! ❤️";

    wishBtn.textContent = "WISH GRANTED! ❤️";

    startConfetti(180);

    playSound(880);

    setTimeout(() => {
        playSound(1100);
    }, 250);

});


// 4. FINAL SURPRISE

finalBtn.addEventListener("click", () => {

    finalMessage.classList.add("show");

    finalBtn.textContent = "YOU ARE THE BEST! ❤️";

    startConfetti(300);

    finalMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    playSound(1000);

});


// 5. CONFETTI ANIMATION

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let confettiPieces = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


function createConfetti(count = 100) {

    const colors = [
        "#FFD700",
        "#FF69B4",
        "#FFFFFF",
        "#8A5CFF",
        "#FF6347",
        "#40E0D0"
    ];

    for (let i = 0; i < count; i++) {

        confettiPieces.push({

            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height,

            size: Math.random() * 7 + 3,

            speedY: Math.random() * 4 + 2,
            speedX: Math.random() * 3 - 1.5,

            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 8 - 4,

            color: colors[
                Math.floor(Math.random() * colors.length)
            ],

            opacity: 1

        });

    }

}


function startConfetti(count = 100) {
    createConfetti(count);
}


function animateConfetti() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach((piece, index) => {

        piece.y += piece.speedY;
        piece.x += piece.speedX;

        piece.rotation += piece.rotationSpeed;

        if (piece.y > canvas.height) {
            confettiPieces.splice(index, 1);
            return;
        }

        ctx.save();

        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation * Math.PI / 180);

        ctx.fillStyle = piece.color;
        ctx.globalAlpha = piece.opacity;

        ctx.fillRect(
            -piece.size / 2,
            -piece.size / 2,
            piece.size,
            piece.size * 0.65
        );

        ctx.restore();

    });

    requestAnimationFrame(animateConfetti);

}

animateConfetti();


// 6. FLOATING STAR PARTICLES

function createStars() {

    const star = document.createElement("div");

    star.textContent = Math.random() > 0.5 ? "✦" : "✧";

    star.style.position = "fixed";
    star.style.left = Math.random() * 100 + "vw";
    star.style.bottom = "-30px";

    star.style.color = "#FFD66B";
    star.style.fontSize = Math.random() * 15 + 8 + "px";

    star.style.pointerEvents = "none";
    star.style.zIndex = "1";

    star.style.transition =
        "transform 7s linear, opacity 7s linear";

    document.body.appendChild(star);

    requestAnimationFrame(() => {

        star.style.transform =
            `translateY(-${window.innerHeight + 100}px) rotate(360deg)`;

        star.style.opacity = "0";

    });

    setTimeout(() => {
        star.remove();
    }, 7500);

}

setInterval(createStars, 500);


// 7. SIMPLE CELEBRATION SOUND

let audioContext = null;

function playSound(frequency = 800) {

    try {

        audioContext ??= new (
            window.AudioContext || window.webkitAudioContext
        )();

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(
            0.12,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.7
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.7);

    } catch (error) {

        console.log("Audio is not available.");

    }

}


// 8. BACKGROUND MELODY

let musicPlaying = false;
let musicTimer = null;

const melody = [
    523, 659, 784, 659,
    587, 698, 880, 698,
    523, 659, 784, 1046,
    880, 784, 659, 523
];

let noteIndex = 0;

function playMelodyNote() {

    if (!audioContext) return;

    const frequency = melody[noteIndex];

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    const now = audioContext.currentTime;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.65);

    noteIndex = (noteIndex + 1) % melody.length;

}


musicBtn.addEventListener("click", async () => {

    try {

        audioContext ??= new (
            window.AudioContext || window.webkitAudioContext
        )();

        await audioContext.resume();

        musicPlaying = !musicPlaying;

        if (musicPlaying) {

            musicTimer = setInterval(playMelodyNote, 450);

            musicBtn.classList.add("playing");

            musicIcon.textContent = "♫";
            musicText.textContent = "Music On";

        } else {

            clearInterval(musicTimer);

            musicBtn.classList.remove("playing");

            musicIcon.textContent = "♫";
            musicText.textContent = "Play Music";

        }

    } catch (error) {

        console.log("Could not start music.");

    }

});


console.log("🎂 Happy Birthday Bhai! Website Loaded Successfully.");
