const musicPlayer = document.querySelector('music_player')
const playpauseButton = document.querySelector('#play_pauseButton')
const skipButton = document.querySelector('#skip_button')
const audio = document.querySelector('#audio')
const startForm = document.getElementById('session_start')
const startButton = document.getElementById('start_button')
const changeButtom = document.getElementById('change')

let body = document.body
let songTitle = document.querySelector(".song_title");
let songArtist = document.querySelector(".song_artist");

let seekSlider = document.querySelector(".seek_slider");
let volumeSlider = document.querySelector(".volume_slider");
let currentTime = document.querySelector(".current_time");
let totalDuration = document.querySelector(".total_duration");

let songs = [
    {
        "title": "Abdelazer",
        "audio": "./Music/Abdelazer.mp3",
        "artist": "Philip Adler",
        "genre": "Piano",
        "mood": "Relaxing"
    },
    {
        "title": "DROPdrip",
        "audio": "./Music/DROPdrip.mp3",
        "artist": "Palmistry",
        "genre": "Electronic",
        "mood": "Chill"
    }
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
        "mood": "Relaxing"
    },
    {
        "title": "Nighthawks Diner",
        "source": "http://img.weburbanist.com/wp-content/uploads/2018/04/edward-hopper-in-motion-2.gif",
        "mood": "Chill"
    },
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
let backgrounds;
let playlistIdx = 0;
let backgroundIDX = 0;
let isPlaying = false;
let currentSong = document.createElement('audio')

startForm.addEventListener('submit', e => {
    let mood = document.querySelector('#mood').value
    console.log(mood)
    e.preventDefault();
    console.log(e, "EVENT!!!")
    // console.log(e.data())

    // const mood = e.getElementById('mood')
    // const genre = e.getElementById('genre')
    console.log(mood)
    getPlaylist(mood)
    getSong(playlistIdx)
    playSong()
})

startButton.addEventListener('click', e => {
    let login = document.getElementById("login")
    let dkfm = document.getElementById("dkfm")
    login.classList.add('fadeOut')
    dkfm.classList.add('fadeIn')
    login.style.display='none'
    dkfm.style.display = "flex"

})

changeButtom.addEventListener('click', e => {
    nextBackground()
})

function getPlaylist(mood) {
    return playlist = songs.filter(song => song.mood === mood)
}

function getBackgrounds(mood) {
    return backgrounds = images.filter(image => image.mood === mood)
}

function nextBackground() {
    if(backgroundIDX === images.length - 1) {
        backgroundIDX = 0
        body.style.backgroundImage = `url(${images[backgroundIDX].source})`
    } else {
        backgroundIDX += 1
        body.style.backgroundImage = `url(${images[backgroundIDX].source})`
        return
    }
}

function getSong(playlistIdx) {
    reset()

    currentSong.src = playlist[playlistIdx].audio;
    currentSong.load()

    songTitle.textContent = playlist[playlistIdx].title
    songArtist.textContent = playlist[playlistIdx].artist
    console.log(currentSong)
    currentSong.addEventListener("ended", nextSong)
}

function reset() {
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00"
    seekSlider.value = 0;
}

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
    if (playlistIdx < songs.length - 1) {
        playlistIdx += 1
    } else {
        playlistIdx = 0
    }
    getSong(playlistIdx);
    playSong()
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