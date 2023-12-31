const levelSelect = document.getElementById('levelSelect');
const memoryGame = document.querySelector('.memory-game');
const timerContainer = document.querySelector('.timer-container');
const container = document.querySelector('.container');
const leaderboardPopup = document.querySelector('.popup');
const playerNameInput = document.getElementById("playerName");

const playerData = [
    { name: 'Annisa', level: 'easy', timer: '00:30'},
    { name: 'Rafhi', level: 'medium', timer: '01:15'},
    { name: 'Yabsir', level: 'hard', timer: '01:45'},
    { name: 'Ferdinan', level: 'easy', timer: '00:50'},
    { name: 'Anyongs', level: 'medium', timer: '01:22'},
    { name: 'Siapa hayow', level: 'Hard', timer: '01:48'},
    { name: 'Onih', level: 'easy', timer: '00:51'},
    { name: 'Raimu', level: 'medium', timer: '01:30'},
    { name: 'Sisir', level: 'hard', timer: '02:10'},
];
localStorage.setItem('leaderboard', JSON.stringify(playerData));

function saveNameAndShowPlayAndLevel() {
    var playerName = playerNameInput.value;

    if (playerName) {
        var formContainer = document.querySelector(".form-container");
        var playButtonContainer = document.querySelector(".button-container");
        var levelSelectContainer = document.querySelector(".select-container");

        formContainer.style.display = "none";
        playButtonContainer.style.display = "block";
        levelSelectContainer.style.display = "block";
    }else {
        alert("Please enter your name");
    }
}

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

// Timer Game 
let timerInterval;

function startTimer() {
    let countdown = 5;
    let timer = 0;
    const timerElement = document.getElementById('timer');

    function updateTimer() {
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        const formattedTime =
            padZero(minutes) + ':' + padZero(seconds);

        if (countdown > 0) {
            countdown--;
            startPlay = true;
        } else {
            if (startPlay) {
                startPlay = false;
                timer = 0;
            }
            timer++;
        }
        timerElement.textContent = formattedTime;

    }

    timerInterval = setInterval(updateTimer, 1000);
}

function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}

document.getElementById('levelSelect').addEventListener('click', function () {
    startTimer();
});

// Countdown Game
function countdown() {
    const message = document.querySelector('.message');
    const overlayCountdown = document.querySelector('.overlaycountdown');
    overlayCountdown.style.display = 'block';
    message.style.display = 'block';
    setTimeout(() => {
        message.textContent = 'Are you ready?';
    }, 1000);

    setTimeout(() => {
        message.innerHTML = '3';
        const countdown = document.getElementById('countdown');
        countdown.volume = 0.2;
        countdown.play();
    }, 2000);

    setTimeout(() => {
        message.innerHTML = '2'
    }, 3000);

    setTimeout(() => {
        message.innerHTML = '1'
    }, 4000)

    setTimeout(() => {
        message.innerHTML = 'Begin';
    }, 5000)

    setTimeout(() => {
        overlayCountdown.style.display = 'none';
        message.style.display = 'none';
    }, 7000);
}

levelSelect.addEventListener('change', () => {
    const selectedLevel = levelSelect.value;
    if (selectedLevel === 'easy' || selectedLevel === 'medium' || selectedLevel === 'hard') {
        memoryGame.style.visibility = 'visible';
        timerContainer.style.visibility = 'visible';
        container.style.visibility = 'hidden';

        countdown();
    } else {
        memoryGame.style.visibility = 'hidden';
    }
    setupGame(selectedLevel);
})

function setupGame(selectedLevel) {
    const cardData = {
        easy: {
            cardCount: 12,
            cardImages: ['assets/img/alpukat.png', 'assets/img/anggur.png', 'assets/img/apel.png', 'assets/img/bluebery.png', 'assets/img/chery.png', 'assets/img/jeruk.png'],
        },
        medium: {
            cardCount: 24,
            cardImages: ['assets/img/alpukat.png', 'assets/img/anggur.png', 'assets/img/apel.png', 'assets/img/bluebery.png', 'assets/img/chery.png', 'assets/img/jeruk.png',
                'assets/img/durian.png', 'assets/img/jambu.png', 'assets/img/kiwi.png', 'assets/img/leci.png', 'assets/img/lemon.png', 'assets/img/mangga.png'],
        },
        hard: {
            cardCount: 40,
            cardImages: ['assets/img/alpukat.png', 'assets/img/anggur.png', 'assets/img/apel.png', 'assets/img/bluebery.png', 'assets/img/chery.png', 'assets/img/jeruk.png',
                'assets/img/durian.png', 'assets/img/jambu.png', 'assets/img/kiwi.png', 'assets/img/leci.png', 'assets/img/lemon.png', 'assets/img/mangga.png',
                'assets/img/manggis.png', 'assets/img/melon.png', 'assets/img/nanas.png', 'assets/img/peach.png', 'assets/img/pear.png', 'assets/img/pisang.png',
                'assets/img/semangka.png', 'assets/img/stroberi.png'],
        },
    };
    const cardContainer = document.querySelector('.memory-game');
    cardContainer.innerHTML = '';

    const { cardCount, cardImages } = cardData[selectedLevel];
    const columns = selectedLevel === 'easy' ? 4 : selectedLevel === 'medium' ? 6 : 8;

    const duplicatedImages = cardImages.concat(cardImages);
    for (let i = duplicatedImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [duplicatedImages[i], duplicatedImages[j]] = [duplicatedImages[j], duplicatedImages[i]];
    }

    //untuk munculin kartunya
    for (let i = 0; i < cardCount; i++) {
        const card = document.createElement('div');
        card.classList.add('memory-card', selectedLevel);
        card.dataset.src = duplicatedImages[i];

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = duplicatedImages[i];
        frontFace.alt = 'Front Face';

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = 'assets/img/backcard.png';
        backFace.alt = 'Back Face';

        card.appendChild(frontFace);
        card.appendChild(backFace);

        cardContainer.appendChild(card);
    }

    cardContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    initializeGameLogic();
}

function initializeGameLogic() {
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    // Flip Card Function
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');
        // sound effect kartu di click
        const clickSound = new Audio('assets/sound/klik.mp3');
        clickSound.currentTime = 0;//mengatur ulang audio ke awal
        clickSound.volume = 0.25;//mengatur volume 
        clickSound.play();

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // Cek Match card
    function checkForMatch() {
        let isMatch = firstCard.dataset.src === secondCard.dataset.src;

        isMatch ? disableCards() : unflipCards();
    }

    //hentikan waktu
    function stopTimer() {
        clearInterval(timerInterval);
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        // sound effect kartu match
        const matchSound = new Audio('assets/sound/match.mp3');
        matchSound.currentTime = 0;//mengatur ulang audio ke awal
        matchSound.volume = 0.5;
        matchSound.play();
        const timer = document.getElementById('timer').textContent;
        if (document.querySelectorAll('.memory-card.flip').length === cards.length) {
            stopTimer(); // Menghentikan waktu jika semua kartu cocok
            saveData(timer);
            // Sound Effect Win
            const winSound = new Audio('assets/sound/gamewin.mp3');
            winSound.currentTime = 0;//mengatur ulang audio ke awal
            winSound.volume = 0.5;
            winSound.play();
            // Popup Leaderboard
            setTimeout(() => {
                leaderboard();
            }, 1000);
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        // sound effect kartu no match
        const noMatchSound = new Audio('assets/sound/notmatch.mp3');
        noMatchSound.currentTime = 0;//mengatur ulang audio ke awal
        noMatchSound.volume = 0.5;
        noMatchSound.play();

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
}

document.addEventListener('DOMContentLoaded', () => {
    setupGame(levelSelect.value)
    
})

function saveData(timer) {
    const playerName = playerNameInput.value;
    const selectedLevel = levelSelect.value;
    if (playerName && selectedLevel) {

        const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];

        // Tambahkan data pemain baru ke array leaderboard
        leaderboardData.push({
            name: playerName,
            level: selectedLevel,
            timer: timer
        });

        // Simpan data leaderboard yang sudah diperbarui kembali ke Local Storage
        localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    }
}

// Leaderboard Function
function leaderboard() {
    const leaderboardPopup = document.querySelector('.popup');
    const leaderboardTable = leaderboardPopup.querySelector('table');
    leaderboardTable.innerHTML = '';
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboard'));
    const levelFilter = document.getElementById('levelFilter');
    const selectedLevel = levelFilter.value;
    let displayIndex = 1; //
    leaderboardData.forEach((player, index) => {
        if (selectedLevel === 'all' || player.level === selectedLevel) {
            const row = leaderboardTable.insertRow(-1);
            const cellNo = row.insertCell(0);
            const cellName = row.insertCell(1);
            const cellLevel = row.insertCell(2);
            const cellTimer = row.insertCell(3);

            cellNo.textContent = displayIndex;
            cellName.textContent = player.name;
            cellLevel.textContent = player.level;
            cellTimer.textContent = player.timer;

            displayIndex++;
        }
    });
    leaderboardPopup.style.display = 'block';
}

const levelFilter = document.getElementById('levelFilter');
levelFilter.addEventListener('change', leaderboard);

// close Leaderboard
function closeLeaderboard() {
    const leaderboard = document.querySelector('.popup')
    leaderboard.style.display = 'none';
}

// Mode Full Screen
const fullScreen = document.getElementById("fullscreen");
fullScreen.addEventListener('click', () => {
  if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
})

// Backsound Music
backsound.volume = 0.5;
function backSound() {
const backsound = document.getElementById("backsound");

const btn = document.getElementById("btnSound");

const unmuteIcon = '<i class="fas fa-solid fa-volume-xmark fa-2x"></i>'

const muteIcon = '<i class="fas fa-sharp fa-regular fa-volume-high fa-2x"></i>'

backsound.muted = !backsound.muted;

  if (backsound.muted) {
    btn.innerHTML = unmuteIcon;
  } else {
    btn.innerHTML = muteIcon;
  }
}

playAgain.addEventListener('click', () => {
    const selectedLevel = levelSelect.value;
    let playAgain;
    if (selectedLevel === 'easy') {
        leaderboardPopup.style.display = 'none';
        playAgain = 'easy';
        countdown();
        startTimer();
    }else if (selectedLevel === 'medium') {
        leaderboardPopup.style.display = 'none';
        playAgain = 'medium';
        countdown();
        startTimer();
    }else if (selectedLevel === 'hard') {
        leaderboardPopup.style.display = 'none';
        playAgain = 'hard';
        countdown();
        startTimer();
    }
    setupGame(playAgain);
});

next.addEventListener('click', () => {
    const selectedLevel = levelSelect.value;
    let nextLevel;
    if (selectedLevel === 'easy') {
        leaderboardPopup.style.display = 'none';
        nextLevel = 'medium';
        countdown();
        startTimer();
    }else if (selectedLevel === 'medium') {
        leaderboardPopup.style.display = 'none';
        nextLevel = 'hard';
        countdown();
        startTimer();
    }else if (selectedLevel === 'hard') {
        leaderboardPopup.style.display = 'none';
        nextLevel = 'easy';
        countdown();
        startTimer();
    }
    setupGame(nextLevel);
});
