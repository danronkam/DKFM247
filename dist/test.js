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

let songs = [
    {
        "title": "Abdelazer",
        "audio": "./dist/Music/Abdelazer.mp3",
        "artist": "Philip Adler",
        "genre": "Piano",
        "mood": "Chill"
    },
    {
        "title": "DROPdrip",
        "audio": "./dist/Music/DROPdrip.mp3",
        "artist": "Palmistry",
        "genre": "Electronic",
        "mood": "Chill"
    },
    {
        "title": "Left Undone",
        "audio": "./dist/Music/left_undone.mp3",
        "artist": "Alex Benedict",
        "genre": "Piano",
        "mood": "Dark"
    },
    {
        "title": "Future Dollars",
        "audio": "./dist/Music/future-dollars-zuul.mp3",
        "artist": "Zuul",
        "genre": "Electronic",
        "mood": "Chill"
    },
    {
        "title": "Eternal Rain Dollars",
        "audio": "./dist/Music/Eternal_Rain.mp3",
        "artist": "Stefan Biniak",
        "genre": "Electronic",
        "mood": "Chill"
    },
    {
        "title": "Fall Asleep",
        "audio": "./dist/Music/Chill_Piano.mp3",
        "artist": "Tokyo Music Walker",
        "genre": "Piano",
        "mood": "Chill"
    },
    {
        "title": "Spring Joy Flowers",
        "audio": "./dist/Music/Spring_Joy_Flowers.mp3",
        "artist": "Tokyo Music Walker",
        "genre": "Piano",
        "mood": "Chill"
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
        "title": "Nighthawks Diner",
        "source": "http://img.weburbanist.com/wp-content/uploads/2018/04/edward-hopper-in-motion-2.gif",
        "mood": "Chill"
    },
    {
        "title": "People in the Sun",
        "source": "http://img.weburbanist.com/wp-content/uploads/2018/04/edward-hopper-in-motion-3.gif",
        "mood": "Chill"
    },
    {
        "title": "pixel scenery",
        "source": "https://64.media.tumblr.com/673304829a5f7d502979e59c8eaac252/tumblr_mgigxnLRKw1qbzzgco1_1280.gifv",
        "mood": "Chill"
    },
    {
        "title": "Hallway",
        "source": "https://cutewallpaper.org/21/video-background-loops/Best-Hd-Video-Background-Seamless-Loop-Seamless-Background-.gif",
        "mood": "Dark"
    }
    ,
    {
        "title": "Matrix",
        "source": "https://j.gifs.com/Q1xW4q@large.gif?download=true",
        "mood": "Dark"
    }
]
// $document.ready(function () {
//     $("form").submit(function (event) {
//         event.preventDefault()

//         var mood = document.getElementById('mood').value
//         var genre = document.getElementById('genre').value


//         $.get("process.php", { mood: mood, genre: genre }, function (data) {
//             console.log(data)
//         })
//     })
// })

let playlist;
let backgrounds = [];
let playlistIdx = 0;
let backgroundIDX = 0;
let isPlaying = false;
let currentSong = document.createElement('audio');
let volumes = [];

startForm.addEventListener('submit', e => {
    let mood = document.querySelector('#mood').value
    let genre = document.querySelector('#genre').value


    e.preventDefault();

    // console.log(e.data())

    // const mood = e.getElementById('mood')
    // const genre = e.getElementById('genre')
    // console.log(mood)
    getPlaylist(mood, genre)
    getBackgrounds(mood)
    getSong(playlistIdx)
    playSong()
    nextBackground()
})

info_button.addEventListener('click', e=> {

    toggleInstrunctions()
})

function toggleInstrunctions() {
    if(!instructions.style.display ||       instructions.style.display === 'block' ) {
        instructions.style.display = 'none'
    } else {
        instructions.style.display = 'block'
    }

}

document.addEventListener('keypress', event => {
    var name = event.key;
    var code = event.code;

    if(name === 'p') {
        playPause()
    } else if (name === 'n') {
        nextSong()
    } else if (name === 'b') {
        nextBackground()
    } else if (name === 'm') {
        muteSong()
    } else if (name === 'f') {
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

// function toggleFullScreen() {
//     if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
//     (!document.mozFullScreen && !document.webkitIsFullScreen)) {
//      if (document.documentElement.requestFullScreen) {  
//        document.documentElement.requestFullScreen();  
//      } else if (document.documentElement.mozRequestFullScreen) {  
//        document.documentElement.mozRequestFullScreen();  
//      } else if (document.documentElement.webkitRequestFullScreen) {  
//        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
//      }  
//    } else {  
//      if (document.cancelFullScreen) {  
//        document.cancelFullScreen();  
//      } else if (document.mozCancelFullScreen) {  
//        document.mozCancelFullScreen();  
//      } else if (document.webkitCancelFullScreen) {  
//        document.webkitCancelFullScreen();  
//      }  
// }
// }

startButton.addEventListener('click', e => {
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
})

top_logo.addEventListener('click', e => {
    
    window.location.reload()
})


function muteSong() {
    let previousVolume = currentSong.volume
    if(previousVolume === 0) {
        currentSong.volume = volumes[volumes.length - 1]
        volume_slider.value = (volumes[volumes.length - 1]) * 100
    } else {
        volumes.push(previousVolume)
        currentSong.volume = 0
        volume_slider.value = 0
    }
}

volumeButton.addEventListener('click', e => {
    muteSong()
})

// changeButtom.addEventListener('click', e => {
//     nextBackground()
// })

function getPlaylist(mood, genre) {
    return playlist = songs.filter(song => song.mood === mood && song.genre === genre )
}

function getBackgrounds(mood) {
    return backgrounds = images.filter(image => image.mood === mood)
}





function nextBackground() {
    if(backgrounds.length === 0) {
        backgrounds = images
    }
    // if(backgroundIDX > backgrounds.length) {
    //     backgroundIDX = 0
    // }
    // if(backgrounds.length === 0) {
    //     backgrounds = images
    //     body.style.backgroundImage = `url(${backgrounds[backgroundIDX].source})`
    //     backgroundIDX += 1
    // } else if (backgrounds.length === 1) {
    //     body.style.backgroundImage = `url(${backgrounds[backgroundIDX].source})`
    // }else  if(backgroundIDX === images.length - 1) {
    //     backgroundIDX = 0
    //     body.style.backgroundImage = `url(${backgrounds[backgroundIDX].source})`
    // } else {
    //     backgroundIDX += 1
    //     body.style.backgroundImage = `url(${backgrounds[backgroundIDX].source})`
    // }
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
    }
    // reset()

    currentSong.src = playlist[playlistIdx].audio;
    currentSong.load()

    songTitle.textContent = playlist[playlistIdx].title
    songArtist.textContent = playlist[playlistIdx].artist
    currentSong.addEventListener("ended", nextSong)
}

// function reset() {
//     currentTime.textContent = "00:00";
//     totalDuration.textContent = "00:00"
//     seekSlider.value = 0;
// }

function playPause() {
    if (playlist === undefined) {
        playlist = songs
    }
    if (!currentSong.src) {
        getSong(playlistIdx);
        playSong();
        isPlaying = true;
    } else if (isPlaying === false) {
        playSong()
    } else {
        pauseSong()
    }
    // var playPromise = currentSong.play();

    // if(playPromise != undefined) {
    //     playPromise.then(_ => {
    //         pauseSong()
    //     })
    //     .catch(error => {

    //     })
    // }
    // // if(!isPlaying) {
    // //     playSong();
    // // } else {
    //     else {
    //     playSong();

    // }
}

function playSong() {
    if (!currentSong) {
        currentSong = getSong(playlistIdx)
    } 
    currentSong.play();
    isPlaying = true;

    // playpauseButton.innerHTML = <i class="fas fa-pause"></i>
}

function pauseSong() {
    currentSong.pause();
    isPlaying = false;

    // playpauseButton.innerHTML = <i class="fas fa-play"></i>
}

function nextSong() {
    if (playlistIdx < playlist.length - 1) {
        playlistIdx += 1
    } else {
        playlistIdx = 0
    }
    getSong(playlistIdx);
    // progressBar.style.width = '0%'
    playSong()
}


function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    currentSong.volume = volume_slider.value / 100;
  }




// TESTS PLEASE IGNORE_______________________________________________
// const button1 = document.getElementById('button1');
// let audio1 = new Audio()
// audio1.src = './Music/01_DROPdrip.mp3'
// const audioCtx = new window.AudioContext();
// console.log(audioCtx)

// button1.addEventListener('click', function() {
//     audio1.play()
//     audio1.addEventListener('playing', function() {
//         console.log('Audio 1 Started Playing')
//     })
//     audio1.addEventListener('ended', function() {
//         console.log('Audio 1 Ended!')
//     })
// })

// const button2= document.getElementById('button2');



// button2.addEventListener('click', playSong);

// function playSong() {
//     audio1.play()
// }