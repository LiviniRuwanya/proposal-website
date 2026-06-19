const screens = {
  welcome: document.getElementById("welcomeScreen"),
  questions: document.getElementById("questionScreen"),
  loveMeter: document.getElementById("loveMeterScreen"),
  gallery: document.getElementById("galleryScreen"),
  letter: document.getElementById("letterScreen"),
  countdown: document.getElementById("countdownScreen"),
  proposal: document.getElementById("proposalScreen"),
  celebration: document.getElementById("celebrationScreen"),
};

const beginBtn = document.getElementById("beginBtn");
const musicToggle = document.getElementById("musicToggle");
const musicHint = document.getElementById("musicHint");
const backgroundMusic = document.getElementById("backgroundMusic");
const floatingHearts = document.getElementById("floatingHearts");
const sparkleLayer = document.getElementById("sparkleLayer");

const questionCounter = document.getElementById("questionCounter");
const questionProgress = document.getElementById("questionProgress");
const questionText = document.getElementById("questionText");
const answerGrid = document.getElementById("answerGrid");
const answerMessage = document.getElementById("answerMessage");

const meterFill = document.getElementById("meterFill");
const meterLabel = document.getElementById("meterLabel");

const galleryImage = document.getElementById("galleryImage");
const galleryCaption = document.getElementById("galleryCaption");
const galleryDots = document.getElementById("galleryDots");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const galleryContinue = document.getElementById("galleryContinue");

const typedLetter = document.getElementById("typedLetter");
const countdownNumber = document.getElementById("countdownNumber");
const proposalQuestion = document.getElementById("proposalQuestion");
const fireworks = document.getElementById("fireworks");
const replayBtn = document.getElementById("replayBtn");

const questions = [
  {
    text: "Do you love me? ❤️",
    options: ["Yes 😍", "Of course ❤️", "More than pizza 🍕", "No 😏"],
    runaway: "No 😏",
    message: "I knew it. Your heart gave you away ❤️",
  },
  {
    text: "How much do you love me?",
    options: ["A little 🤏", "A lot ❤️", "To the moon and back 🌙", "Infinity ♾️"],
    message: "I think it's even more than that ❤️",
  },
  {
    text: "Who is your favorite person?",
    options: ["You ❤️", "My girlfriend ❤️", "My future wife 💍", "All of the above 😏"],
    message: "Correct answer: all roads lead back to me 😍",
  },
  {
    text: "What is your favorite memory with me?",
    options: ["Our first meeting 🥰", "Our first photo 📸", "Our first date 🌹", "Every moment ❤️"],
    message: "Same. Every little moment with you matters ❤️",
  },
  {
    text: "Would you like to make more memories together?",
    options: ["Yes ❤️", "Absolutely 😍", "Definitely 🥰", "Forever ♾️"],
    message: "Good, because I have so many dreams with you ✨",
  },
  {
    text: "Can you imagine growing old with me?",
    options: ["Yes ❤️", "Of course 💕", "I already do 🥹", "Every day ❤️"],
    message: "That makes my heart so happy 🥹",
  },
  {
    text: "Can you handle me for the rest of your life? 😂",
    options: ["Challenge accepted 😎", "Yes ❤️", "Happily 🥰", "I'll try 😂"],
    message: "Brave answer. I love that about you 😂❤️",
  },
  {
    text: "Will you continue annoying me forever? 😜",
    options: ["Yes 😏", "Definitely 😂", "That's my job ❤️", "Forever 🥰"],
    message: "Perfect. I would miss it if you stopped ❤️",
  },
];

const galleryPhotos = [
  {
    src: "images/1.jpeg",
    alt: "Romantic memory 1",
    caption: "This is where our story began ❤️",
  },
  {
    src: "images/2.jpeg",
    alt: "Romantic memory 2",
    caption: "One of my favorite memories ❤️",
  },
  {
    src: "images/3.jpeg",
    alt: "Romantic memory 3",
    caption: "You make every day brighter ☀️",
  },
  {
    src: "images/4.jpeg",
    alt: "Romantic memory 4",
    caption: "Every smile with you is special ❤️",
  },
];

const letterText = `Every moment with you has become one of my favorite memories.

You make my world brighter, happier, and more beautiful.

Thank you for loving me, supporting me, and being my best friend.

No matter where life takes us, I always want you by my side.

I love you more than words can ever explain. ❤️`;

let activeQuestion = 0;
let currentPhoto = 0;
let galleryTimer;
let letterStarted = false;
let musicWasStarted = false;

function placeholderImage(caption) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffb6c1"/>
          <stop offset="55%" stop-color="#e6d6ff"/>
          <stop offset="100%" stop-color="#ffd700"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="750" fill="url(#bg)"/>
      <circle cx="190" cy="150" r="90" fill="rgba(255,255,255,0.35)"/>
      <circle cx="1010" cy="600" r="135" fill="rgba(255,255,255,0.28)"/>
      <text x="50%" y="44%" text-anchor="middle" font-family="Poppins, Arial" font-size="76" fill="#ffffff">❤️</text>
      <text x="50%" y="57%" text-anchor="middle" font-family="Poppins, Arial" font-size="38" font-weight="700" fill="#6b3d85">${caption}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[screenName].classList.add("active");

  if (screenName === "loveMeter") {
    animateLoveMeter();
  }

  if (screenName === "gallery") {
    startGallery();
  } else {
    stopGallery();
  }

  if (screenName === "letter" && !letterStarted) {
    letterStarted = true;
    typeLoveLetter();
  }

  if (screenName === "countdown") {
    startCountdown();
  }

  if (screenName === "proposal") {
    revealProposalQuestion();
  }
}

function tryPlayMusic() {
  if (musicWasStarted || !backgroundMusic) {
    return;
  }

  backgroundMusic.volume = 0.45;
  backgroundMusic.play()
    .then(() => {
      musicWasStarted = true;
      musicToggle.textContent = "♫ Pause";
      musicToggle.setAttribute("aria-label", "Pause background music");
      hideMusicHint();
    })
    .catch(() => {
      musicToggle.textContent = "♫ Our Song";
    });
}

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play()
      .then(() => {
        musicWasStarted = true;
        musicToggle.textContent = "♫ Pause";
        musicToggle.setAttribute("aria-label", "Pause background music");
        hideMusicHint();
      })
      .catch(() => {
        musicToggle.textContent = "♫ Add Song";
      });
  } else {
    backgroundMusic.pause();
    musicToggle.textContent = "♫ Our Song";
    musicToggle.setAttribute("aria-label", "Play background music");
  }
}

function hideMusicHint() {
  musicHint?.classList.add("hide");
}

function renderQuestion() {
  const question = questions[activeQuestion];
  questionCounter.textContent = `Question ${activeQuestion + 1} of ${questions.length}`;
  questionProgress.style.width = `${((activeQuestion + 1) / questions.length) * 100}%`;
  questionText.textContent = question.text;
  answerMessage.textContent = "";
  answerGrid.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = option;

    if (option === question.runaway) {
      button.classList.add("runaway");
      button.addEventListener("mouseenter", () => moveRunawayButton(button));
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        moveRunawayButton(button);
      });
      button.addEventListener("click", (event) => {
        event.preventDefault();
        moveRunawayButton(button);
      });
    } else {
      button.addEventListener("click", () => answerQuestion(question.message));
    }

    answerGrid.appendChild(button);
  });
}

function moveRunawayButton(button) {
  const gridRect = answerGrid.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();
  const maxX = Math.max(0, gridRect.width - buttonRect.width);
  const maxY = Math.max(0, gridRect.height - buttonRect.height);
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  button.style.position = "absolute";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
  button.style.zIndex = "3";
  createSparkle(buttonRect.left + buttonRect.width / 2, buttonRect.top + buttonRect.height / 2);
}

function watchRunawayDistance(event) {
  const runaway = document.querySelector(".answer-btn.runaway");
  if (!runaway || !screens.questions.classList.contains("active")) {
    return;
  }

  const rect = runaway.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

  if (distance < 120) {
    moveRunawayButton(runaway);
  }
}

function answerQuestion(message) {
  answerMessage.textContent = message;
  burstHearts(8);
  sparkleAroundCenter();

  document.querySelectorAll(".answer-btn").forEach((button) => {
    button.disabled = true;
  });

  window.setTimeout(() => {
    activeQuestion += 1;

    if (activeQuestion < questions.length) {
      renderQuestion();
    } else {
      showScreen("loveMeter");
    }
  }, 1450);
}

function animateLoveMeter() {
  let value = 0;
  meterFill.style.width = "0%";
  meterLabel.textContent = "0%";

  window.setTimeout(() => {
    meterFill.style.width = "100%";
  }, 120);

  const meterInterval = window.setInterval(() => {
    value += 2;
    meterLabel.textContent = `${Math.min(value, 100)}%`;

    if (value >= 100) {
      window.clearInterval(meterInterval);
      burstHearts(14);
      window.setTimeout(() => showScreen("gallery"), 1700);
    }
  }, 42);
}

function startGallery() {
  renderGalleryDots();
  showPhoto(currentPhoto);
  stopGallery();
  galleryTimer = window.setInterval(() => {
    showPhoto(currentPhoto + 1);
  }, 3200);
}

function stopGallery() {
  if (galleryTimer) {
    window.clearInterval(galleryTimer);
    galleryTimer = null;
  }
}

function showPhoto(index) {
  currentPhoto = (index + galleryPhotos.length) % galleryPhotos.length;
  const photo = galleryPhotos[currentPhoto];

  galleryImage.style.opacity = "0";
  window.setTimeout(() => {
    galleryImage.onerror = () => {
      galleryImage.onerror = null;
      galleryImage.src = placeholderImage(`Add ${photo.src}`);
    };
    galleryImage.src = photo.src;
    galleryImage.alt = photo.alt;
    galleryCaption.textContent = photo.caption;
    galleryImage.style.opacity = "1";
    updateGalleryDots();
  }, 220);
}

function renderGalleryDots() {
  if (galleryDots.children.length) {
    updateGalleryDots();
    return;
  }

  galleryPhotos.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.addEventListener("click", () => {
      showPhoto(index);
      startGallery();
    });
    galleryDots.appendChild(dot);
  });
}

function updateGalleryDots() {
  [...galleryDots.children].forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPhoto);
  });
}

function typeLoveLetter() {
  let index = 0;
  typedLetter.textContent = "";

  const typingTimer = window.setInterval(() => {
    typedLetter.textContent += letterText[index];
    index += 1;

    if (index >= letterText.length) {
      window.clearInterval(typingTimer);
      burstHearts(12);
      window.setTimeout(() => showScreen("countdown"), 1800);
    }
  }, 36);
}

function startCountdown() {
  const values = ["3", "2", "1"];
  let index = 0;

  function showValue() {
    countdownNumber.textContent = values[index];
    countdownNumber.classList.remove("pop");
    void countdownNumber.offsetWidth;
    countdownNumber.classList.add("pop");
    createSparkle(window.innerWidth / 2, window.innerHeight / 2);

    index += 1;
    if (index < values.length) {
      window.setTimeout(showValue, 1000);
    } else {
      window.setTimeout(() => showScreen("proposal"), 1200);
    }
  }

  showValue();
}

function revealProposalQuestion() {
  proposalQuestion.classList.add("hidden");
  window.setTimeout(() => {
    proposalQuestion.classList.remove("hidden");
    burstHearts(18);
    sparkleAroundCenter();
  }, 3300);
}

function celebrate() {
  showScreen("celebration");
  launchConfetti();
  launchFireworks();
  burstHearts(30);

  if (backgroundMusic.paused) {
    toggleMusic();
  }
}

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "❤️" : "💕";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${1 + Math.random() * 1.6}rem`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;
  heart.style.opacity = `${0.35 + Math.random() * 0.55}`;
  floatingHearts.appendChild(heart);

  window.setTimeout(() => heart.remove(), 14500);
}

function burstHearts(count) {
  for (let i = 0; i < count; i += 1) {
    window.setTimeout(createHeart, i * 80);
  }
}

function createSparkle(x, y) {
  for (let i = 0; i < 10; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty("--x", `${(Math.random() - 0.5) * 180}px`);
    sparkle.style.setProperty("--y", `${(Math.random() - 0.5) * 180}px`);
    sparkleLayer.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 950);
  }
}

function sparkleAroundCenter() {
  createSparkle(window.innerWidth / 2, window.innerHeight / 2);
}

function launchConfetti() {
  const colors = ["#ffb6c1", "#e6d6ff", "#ffd700", "#ff5f93", "#ffffff"];

  for (let i = 0; i < 150; i += 1) {
    window.setTimeout(() => {
      const confetti = document.createElement("span");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = `${Math.random() * 0.45}s`;
      confetti.style.animationDuration = `${2.8 + Math.random() * 2.6}s`;
      document.body.appendChild(confetti);
      window.setTimeout(() => confetti.remove(), 5600);
    }, i * 12);
  }
}

function launchFireworks() {
  const origins = [
    { x: 20, y: 25 },
    { x: 78, y: 28 },
    { x: 50, y: 18 },
    { x: 30, y: 68 },
    { x: 72, y: 66 },
  ];

  origins.forEach((origin, originIndex) => {
    window.setTimeout(() => {
      for (let i = 0; i < 24; i += 1) {
        const angle = (Math.PI * 2 * i) / 24;
        const distance = 70 + Math.random() * 70;
        const firework = document.createElement("span");
        firework.className = "firework";
        firework.style.left = `${origin.x}vw`;
        firework.style.top = `${origin.y}vh`;
        firework.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
        firework.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
        fireworks.appendChild(firework);
        window.setTimeout(() => firework.remove(), 1000);
      }
    }, originIndex * 360);
  });
}

function resetJourney() {
  activeQuestion = 0;
  currentPhoto = 0;
  letterStarted = false;
  typedLetter.textContent = "";
  renderQuestion();
  showScreen("welcome");
}

beginBtn.addEventListener("click", () => {
  tryPlayMusic();
  renderQuestion();
  showScreen("questions");
});

musicToggle.addEventListener("click", toggleMusic);
document.addEventListener("mousemove", watchRunawayDistance);

prevPhoto.addEventListener("click", () => {
  showPhoto(currentPhoto - 1);
  startGallery();
});

nextPhoto.addEventListener("click", () => {
  showPhoto(currentPhoto + 1);
  startGallery();
});

galleryContinue.addEventListener("click", () => showScreen("letter"));

document.querySelectorAll(".proposal-buttons button").forEach((button) => {
  button.addEventListener("click", celebrate);
});

replayBtn.addEventListener("click", resetJourney);

// Keep the page feeling alive even while the user reads.
window.setInterval(createHeart, 900);
renderQuestion();
