const button1 = document.getElementById('button1');
let audio1 = new Audio()
audio1.src = './01 DROPdrip.mp3'
const audioCtx = new window.AudioContext();
console.log(audioCtx)

button1.addEventListener('click', function() {
    audio1.play()
    audio1.addEventListener('playing', function() {
        console.log('Audio 1 Started Playing')
    })
    audio1.addEventListener('ended', function() {
        console.log('Audio 1 Ended!')
    })
})

const button2= document.getElementById('button2');



button2.addEventListener('click', playSong);

function playSong() {
    const oscillator
}