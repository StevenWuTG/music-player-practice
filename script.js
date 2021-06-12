//query selectors
const image = document.getElementById('player-img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.getElementById('player-audio')
const prevButton = document.getElementById('prev')
const playButton = document.getElementById('play')
const nextButton = document.getElementById('next')

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

//playin loop
let isPlaying = false


//play
const playSong = () => {
    isPlaying = true
    playButton.classList.replace('fa-play', 'fa-pause')
    playButton.setAttribute('title', "Pause")
    music.play()
    
}

//pause
const pauseSong = () => {
    playButton.classList.replace('fa-pause','fa-play')
    playButton.setAttribute('title', "Play")
    isPlaying = false
    music.pause()
}



//update DOM
const loadSong = (song) => {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

//current song
let songIndex = 0

//next song
const nextSong = () => {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()

}
//prev song
const prevSong = () => {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()

}

//on load - select first song
loadSong(songs[songIndex])

//player event listener

playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))
prevButton.addEventListener('click', prevSong)
nextButton.addEventListener('click', nextSong)
