const musicPlayer = document.querySelector('music_player')
const playpauseButton = document.querySelector('#play_pauseButton')
const skipButton = document.querySelector('#skip_button')
const audio = document.querySelector('#audio')

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
        "mood": "Relaxing"
    },
    {
        "title": "DROPdrip",
        "audio": "./Music/DROPdrip.mp3",
        "artist": "Palmistry",
        "mood": "Chill"
    }
]

let playlist;
let playlistIdx = 0;
let isPlaying = false;
let currentSong = document.createElement('audio')

function getPlaylist(mood) {
   return playlist = songs.filter(song => song.mood === mood)
}

function getSong(playlistIdx) {
    reset()

    currentSong.src = songs[playlistIdx].audio;
    currentSong.load()

    songTitle.textContent = songs[playlistIdx].title
    songArtist.textContent = songs[playlistIdx].artist
    console.log(currentSong)
    currentSong.addEventListener("ended", nextSong)
}

function reset(){
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00"
    seekSlider.value = 0;
}

function playPause() {
    // var playPromise = currentSong.play();

    // if(playPromise != undefined) {
    //     playPromise.then(_ => {
    //         currentSong.pause()
    //     })
    //     .catch(error => {

    //     })
    // }
    if(!isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
}

function playSong() {
    if(!currentSong) {
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