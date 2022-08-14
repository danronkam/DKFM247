{
    class AudioPlayer extends HTMLElement {
        constructor() {
            super();

            this.attachShadow( init: {mode: 'open'})
        }
    }

    customElements.define('audio-player', AudioPlayer)
}