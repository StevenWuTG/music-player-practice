const image = document.getElementById('player-img')
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.getElementById('player-audio')
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

//music
const songs = [
    {
        name: 'PaulCesarBeats-BOOMBAP',
        displayName: 'BOOM BAP',
        artist: 'Paul Cesar Beats'

    },
    {
        name: 'Eaters-AgentsInCoffeeShops',
        displayName: 'Agents In Coffeeshops',
        artist: 'Eaters'

    },
    {
        name: 'LexVillena-TheHearseSong',
        displayName: 'The Hearse Song',
        artist: 'Lex Villena'

    },
    {
        name: 'PaulCesarBeats-DREDAY',
        displayName: 'Dre Day',
        artist: 'Paul Cesar Beats'

    },
    {
        name: 'Eaters-Dogstarmegalazer',
        displayName: 'Dogstarmegalazer',
        artist: 'Eaters'

    },
    {
        name: 'Eaters-SurfaceImpact',
        displayName: 'SurfaceImpact',
        artist: 'Eaters'

    },
    {
        name: 'BlackAnt-Piece',
        displayName: 'Piece',
        artist: 'Black Ant'

    }
]


// playin loop
let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  playButton.classList.replace('fa-play', 'fa-pause');
  playButton.setAttribute('title', 'Pause');
  music.play();
}

// pause
function pauseSong() {
  isPlaying = false;
  playButton.classList.replace('fa-pause', 'fa-play');
  playButton.setAttribute('title', 'Play');
  music.pause();
}


// update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// current Song
let songIndex = 0;

// previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// on load - select first song
loadSong(songs[songIndex]);

// update progress bar & time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // delay switching duration element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// player event listener
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
