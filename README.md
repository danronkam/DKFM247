# DKFM247
DK-FM is a music player that lets users select a genre and mood which plays a continuous curated set of songs and accompanying visuals. While many music players focus on the users and the playlists they make, DK-FM is meant to be set up and forgotten while users focus on other more important things in their lives. Although the playlist won't be user made, they will still have the ability to cycle through the songs and backgrounds in order to create their ideal set up. It’s background music that won't distract you but also won’t put you to sleep. 
	
[Check it Out!](https://danronkam.github.io/DKFM247/)

# Technologies
* Javascript
* HTML & CSS
# Screenshots
![image](https://user-images.githubusercontent.com/101153713/196276355-2ffbfcde-fedb-4260-aa3b-97a457dd4383.png)
![image](https://user-images.githubusercontent.com/101153713/196276575-6b9d38de-2ec9-4644-8435-bb5e143a010f.png)


# Features
## Music and Background Filters
Based on filters the users select, backgrounds and music are selected from that seasons featured lists. 

```
function getPlaylist(mood, genre) {
    return playlist = songs.filter(song => song.mood === mood && song.genre === genre )
}

function getBackgrounds(mood) {
    return backgrounds = images.filter(image => image.mood === mood)
}
```

## Hotkeys
A keypress event listener for all of the applications features
```
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
```
 

	
