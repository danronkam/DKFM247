const musicPlayer = document.querySelector('music_player')
const playpauseButton = document.querySelector('#play_pauseButton')
const skipButton = document.querySelector('#skip_button')
const audio = document.querySelector('#audio')
const startForm = document.getElementById('session_start')
const startButton = document.getElementById('start_button')
const changeButtom = document.getElementById('change')
const volumeButton = document.getElementById('volume')
const seek_slider = document.querySelector('seek_slider')
const volume_slider = document.querySelector('#volume_slider')
const dans_links = document.getElementById('dans_links')
const info = document.getElementById('info')
const top_logo = document.getElementById('top_logo')
const info_button = document.getElementById('info_button')
const instructions = document.getElementById('instructions')

let body = document.body
let station_title = document.querySelector(".station_title");
let songTitle = document.querySelector(".song_title");
let songArtist = document.querySelector(".song_artist");

let seekSlider = document.querySelector(".seek_slider");
let volumeSlider = document.querySelector(".volume_slider");
let currentTime = document.querySelector(".current_time");
let totalDuration = document.querySelector(".total_duration");
let sessionStarted = false


//  Element Variables ^^^ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


let songs = [
    {
        "title": "Baby Bubble",
        "audio": "dist/Music/BABYBUBBLE.mp3", 
        "artist": "QT",
        "genre": "Dark",
        "mood": "Sophie"
    },
    {
        "title": "Bikers",
        "audio": "dist/Music/Bikers.mp3",
        "artist": "A.G. Cook, Sophie",
        "genre": "Dark",
        "mood": "Sophie"
    },
    {
        "title": "Hard (DisMagazine Rinse FM Takeover)",
        "audio": "dist/Music/Hard.mp3",
        "artist": "Sophie",
        "genre": "Dark",
        "mood": "Sophie"
    }, 
    {
        "title": "High on Helium",
        "audio": "dist/Music/HIGH_ ON_ HELIUM.mp3",
        "artist": "Charli XCX",
        "genre": "Dark",
        "mood": "Sophie"
    },
    {
        "title": "My Forever (Ft Cecile Believe & Dev Hynes)",
        "audio": "dist/Music/My_Forever.mp3",
        "artist": "Sophie",
        "genre": "Piano",
        "mood": "Dark"
    },
    {
        "title": "Future Dollars",
        "audio": "./dist/Music/future-dollars-zuul.mp3",
        "artist": "Zuul",
        "genre": "Electronic",
        "mood": "Sophie"
    },
    {
        "title": "Eternal Rain Dollars",
        "audio": "./dist/Music/Eternal_Rain.mp3",
        "artist": "Stefan Biniak",
        "genre": "Electronic",
        "mood": "Sophie"
    },
    {
        "title": "Fall Asleep",
        "audio": "./dist/Music/Chill_Piano.mp3",
        "artist": "Tokyo Music Walker",
        "genre": "Piano",
        "mood": "Sophie"
    },
    {
        "title": "Spring Joy Flowers",
        "audio": "./dist/Music/Spring_Joy_Flowers.mp3",
        "artist": "Tokyo Music Walker",
        "genre": "Piano",
        "mood": "Sophie"
    },
    {
        "title": "Deep House Trance Type Beat",
        "audio": "./dist/Music/Deep_House_Type_Beat_-_Trance.mp3",
        "artist": "Royalty Free Music",
        "genre": "Electronic",
        "mood": "Dark"
    },
    {
        "title": "Deep House Trance Type Beat",
        "audio": "./dist/Music/Would_I_Lie_To_You_Deep_House_Remix__Free_To_Use.mp3",
        "artist": "Christian Joseph",
        "genre": "Electronic",
        "mood": "Dark"
    },
]

let images = [
    {
        "title": "Basketballs",
        "source": "https://derailed-seed.s3.us-west-1.amazonaws.com/bball_64_15_12fps.gif",
        "mood": "Dark"
    },
    {
        "title": "Building",
        "source": "https://derailed-seed.s3.us-west-1.amazonaws.com/building.gif",
        "mood": "Dark"
    },
    {
        "title": "Pills_dark",
        "source": "https://derailed-seed.s3.us-west-1.amazonaws.com/pills_black.gif",
        "mood": "Dark"
    },
    {
        "title": "Unlock",
        "source": "https://derailed-seed.s3.us-west-1.amazonaws.com/unlock.gif",
        "mood": "Dark"
    }
    ,
    {
        "title": "Blanket",
        "source": "https://derailed-seed.s3.us-west-1.amazonaws.com/blanket.gif",
        "mood": "Light"
    },
    {
        "title": "Balloons",
        "source": "https://derailed-seed.s3.us-west-1.amazonaws.com/balloons.gif",
        "mood": "Light"
    },
    {
        "title": "Diamonds",
        "source": "https://derailed-seed.s3.us-west-1.amazonaws.com/diamonds_64_15_12.gif",
        "mood": "Dark"
    }
]

//  Playlists ^^^ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


let playlist;
let backgrounds = [];
let playlistIdx = 0;
let backgroundIDX = 0;
let isPlaying = false;
let currentSong = document.createElement('audio');


top_logo.addEventListener('click', e => {
    window.location.reload()
})


function toggleInstrunctions() {
    if(!instructions.style.display ||       instructions.style.display === 'block' ) {
        instructions.style.display = 'none'
    } else {
        instructions.style.display = 'block'
    }
}

info_button.addEventListener('click', e=> {
    toggleInstrunctions()
})

startForm.addEventListener('submit', e => {
    e.preventDefault();
    let mood = document.querySelector('#mood').value
    let genre = document.querySelector('#genre').value

    if(mood === "Mood" || genre === 'Genre'){
        let errors = document.getElementById("errors")
        errors.style.display = 'block'
    } else {
        console.log(mood, genre)
        getPlaylist(mood, genre)
        console.log(playlist)
        getBackgrounds(mood)
        getSong(playlistIdx)
        playSong()
        nextBackground()
        let login = document.getElementById("login")
        let dkfm = document.getElementById("dkfm")
        login.classList.add('fadeOut')
        dkfm.classList.add('fadeIn')
        top_logo.classList.add('fadeIn')
        login.style.display='none'
        dkfm.style.display = "flex"
        dans_links.style.display = 'block'
        info.classList.add('fadeIn')
        dkfm.style.display = "flex"
        top_logo.style.display = "flex"
    }
})

function getPlaylist(mood, genre) {
    console.log(mood, genre);
    return playlist = songs.filter(song => song.mood === mood && song.genre === genre )
}

function getBackgrounds(mood) {
    return backgrounds = images.filter(image => image.mood === mood)
}

//  Landing Page Controls ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


document.addEventListener('keypress', event => {
    var name = event.key;

    if(name === 'p') {
        playPause()
    } else if (name === 'r' || name === 'R') {
        window.location.reload()
    } else if (name === 'n' || name === 'N') {
        nextSong()
    } else if (name === 't' || name === 'T') {
        toggleInstrunctions()
    } else if (name === 'b' || name === 'B') {
        nextBackground()
    } else if (name === 'm' || name === 'M') {
        muteSong()
    } else if (name === 'f' || name === 'F') {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
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
    }
})



//  Hot Key Controls ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function nextBackground() {
    if(backgrounds.length === 0) {
        backgrounds = images
    }
    if (backgroundIDX < backgrounds.length - 1) {
        backgroundIDX += 1
    } else {
        backgroundIDX = 0
    }
    body.style.backgroundImage = `url(${backgrounds[backgroundIDX].source})`
}

function getSong(playlistIdx) {
    if (!playlist) {
        playlist = songs
        console.log(songs, "<- this is songs")
    }

    currentSong.src = playlist[playlistIdx].audio;
    currentSong.load()

    songTitle.textContent = playlist[playlistIdx].title
    songArtist.textContent = playlist[playlistIdx].artist
    currentSong.addEventListener("ended", nextSong)
}

function playPause() {
    if (playlist === undefined) {
        playlist = songs
        let login = document.getElementById("login")
        let dkfm = document.getElementById("dkfm")
        login.classList.add('fadeOut')
        dkfm.classList.add('fadeIn')
        top_logo.classList.add('fadeIn')
        login.style.display='none'
        dkfm.style.display = "flex"
        dans_links.style.display = 'block'
        info.classList.add('fadeIn')
        dkfm.style.display = "flex"
        top_logo.style.display = "flex"
    }
    if (!currentSong.src) {
        getSong(playlistIdx);
        playSong();
        isPlaying = true;
    } else if (isPlaying === false) {
        let playlogo = document.getElementById("playlogo")
        let pauselogo = document.getElementById("pauselogo")
        playlogo.style.display='none'
        pauselogo.style.display = "flex"
        playSong()
    } else {
        let playlogo = document.getElementById("playlogo")
        let pauselogo = document.getElementById("pauselogo")
        playlogo.style.display='flex'
        pauselogo.style.display = "none"
        pauseSong()
    }
   
}

function playSong() {
    if (!currentSong) {
        currentSong = getSong(playlistIdx)
    } 
    currentSong.play();
    isPlaying = true;
}

function pauseSong() {
    currentSong.pause();
    isPlaying = false;
}

function nextSong() {
    if(!playlist) {
        playlist = songs
        let login = document.getElementById("login")
        let dkfm = document.getElementById("dkfm")
        login.classList.add('fadeOut')
        dkfm.classList.add('fadeIn')
        top_logo.classList.add('fadeIn')
        login.style.display='none'
        dkfm.style.display = "flex"
        dans_links.style.display = 'block'
        info.classList.add('fadeIn')
        dkfm.style.display = "flex"
        top_logo.style.display = "flex"
    }
    if (playlistIdx < playlist.length - 1) {
        playlistIdx += 1
    } else {
        playlistIdx = 0
    }
    getSong(playlistIdx);
    playSong()
}

//  Music Play Controls ^^^ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let volumes = [];

function setVolume() {

    currentSong.volume = volume_slider.value / 100;
  }

function muteSong() {
    console.log(volumes)
    let currentVolume = currentSong.volume
    if(currentVolume === 0) { //if song is currently muted
        let previousVolume = volumes.pop();

        currentSong.volume = previousVolume;
        volume_slider.value = previousVolume * 100;
    } else { //if song is not muted
        volumes.push(currentVolume);
        currentSong.volume = 0;
        volume_slider.value = 0;
    }
}

volumeButton.addEventListener('click', e => {
    muteSong();
})

//  Volume Controls ^^ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
