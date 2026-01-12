let current = 1;
let started = false;
let step = 0;
let index = 0;
let confettiInterval = null;
const PHOTO_DURATION = 1500; // 1.5 detik per foto

const photos = [
  "Foto/Testt1.jpg",
  "Foto/1.jpeg",
  "Foto/2.jpeg",
  "Foto/4.jpeg",
  "Foto/5.jpeg",
  "Foto/6.jpeg",
  "Foto/7.jpeg",
  "Foto/8.jpg",
  "Foto/9.jpg",
  "Foto/10.jpg",
  "Foto/11.jpg",

];

/* ===== PAGE CONTROL ===== */
function go(n) {
  document.getElementById("page" + current).classList.remove("active");
  document.getElementById("page" + n).classList.add("active");
  current = n;

  if (n === 3 && !started) {
    startSlideshow();
    startConfetti();
    startEnding();
    started = true;
  }
}

/* ===== PAGE 1 ===== */
function choose(type) {
  if (type === "pelan") go(2);
  else go(3);
}

/* ===== PAGE 2 ===== */
function ready() {
  const texts = [
    "Tarik napas dulu.",
    "Sedikit lagi.",
    "Oke."
  ];
  step++;
  if (step < texts.length) {
    document.getElementById("readyText").innerText = texts[step];
  } else {
    go(3);
  }
}

/* ===== SLIDESHOW ===== */
function startSlideshow() {
  const img = document.getElementById("slide");
  index = 0;

  img.src = photos[index];
  img.style.opacity = 1;

  // musik mulai bersamaan dengan foto pertama
  playMusicForSlideshow();

  const interval = setInterval(() => {
    img.style.opacity = 0;

    setTimeout(() => {
      index++;

      if (index >= photos.length) {
        clearInterval(interval);
        return;
      }

      img.src = photos[index];
      img.style.opacity = 1;

    }, 300); // waktu fade
  }, PHOTO_DURATION);
}


function stopConfetti() {
  clearInterval(confettiInterval);
}


function fadeMusicSlow() {
  const music = document.getElementById("music");

  const fade = setInterval(() => {
    if (music.volume > 0.05) {
      music.volume -= 0.01;   // pelan dan halus
    } else {
      clearInterval(fade);
      // musik dibiarkan tetap berjalan sampai habis
    }
  }, 300);
}


function startMusicDelayed() {
  const music = document.getElementById("music");
  music.volume = 0;
  music.play();

  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < 0.35) {          // jangan keras
      vol += 0.02;
      music.volume = vol;
    } else {
      clearInterval(fadeIn);
    }
  }, 300);
}

/* ===== MUSIC ===== */
function startMusic() {
  const music = document.getElementById("music");
  music.volume = 1;
  music.play();
}

/* ===== CONFETTI ===== */
function startConfetti() {
  confettiInterval = setInterval(() => {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = `hsl(${Math.random() * 360},100%,70%)`;
    c.style.animationDuration = 4 + Math.random() * 2 + "s";

    document.body.appendChild(c);

    setTimeout(() => {
      c.remove();
    }, 7000);
  }, 300); // setiap 300ms muncul pita baru
}


/* ===== ENDING FLOW ===== */
function startEnding() {
  const totalDuration = photos.length * PHOTO_DURATION;

  setTimeout(() => {
    go(4);
    fadeOutMusic();
  }, totalDuration + 500);

  setTimeout(() => {
    go(5);
  }, totalDuration + 8000);
}


/* ===== MUSIC FADE ===== */
function fadeOutMusic() {
  const music = document.getElementById("music");
  const fade = setInterval(() => {
    if (music.volume > 0.02) {
      music.volume -= 0.02;
    } else {
      music.pause();
      music.currentTime = 0;
      clearInterval(fade);
    }
  }, 300);
}

function playMusicForSlideshow() {
  const music = document.getElementById("music");
  music.volume = 0;
  music.play();

  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < 0.35) {
      vol += 0.02;
      music.volume = vol;
    } else {
      clearInterval(fadeIn);
    }
  }, 300);
}

function stopMusicForSlideshow() {
  const music = document.getElementById("music");
  const fadeOut = setInterval(() => {
    if (music.volume > 0.02) {
      music.volume -= 0.02;
    } else {
      music.pause();
      music.currentTime = 0;
      clearInterval(fadeOut);
    }
  }, 300);
}


