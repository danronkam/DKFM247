const musicPlayer = document.querySelector('music_player')
const playButton = document.querySelector('#play_button')
const skipButton = document.querySelector('#skip_button')
const audio = document.querySelector('#audio')

const songTitle = document.querySelector('song_title')
const songArtist = document.querySelector('song_artist')


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
const playlistIdx = 0;
let isPlaying = false;
let currentSong = document.createElement('audio')

function getPlaylist(mood) {
   return playlist = songs.filter(song => song.mood === mood)
}

function getSong(playlistIdx) {
    currentSong.src = playlist[playlistIdx].audio;
    currentSong.load()

    songTitle.textContent = playlist[playlistIdx].title
    songArtist.textContent = playlist[playlistIdx].artist

    currentSong.addEventListener("ended", nextTrack)
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