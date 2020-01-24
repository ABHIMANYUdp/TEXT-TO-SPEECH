const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

//Init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    //looping
    voices.forEach(voice => {
        // creating an option element
        const option = document.createElement('option');
        //filling with voices and languages
        option.textContent = voice.name + '(' + voice.lang + ')';

        //setting attributes
        option.setAttribute('data-lang', voice.lang); 
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {
    //check if it is already speaking
    if(synth.speaking) {
        console.error('Already Speaking');
        return;
    }
    if (textInput.value !== '') {
        // Add background animation
        //body.style.background = '#141414 url(img/wave.gif)';
        //body.style.backgroundRepeat = 'repeat-x';
        //body.style.backgroundSize = '100% 100%';
    
        // Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
    
        // Speak end
        speakText.onend = e => {
          console.log('Done speaking...');
          //body.style.background = '#141414';
        };
    
        // Speak error
        speakText.onerror = e => {
          console.error('Something went wrong');
        };
    
        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
          'data-name'
        );
    
        // Loop through voices
        voices.forEach(voice => {
          if (voice.name === selectedVoice) {
            speakText.voice = voice;
          }
        });
    
        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        // Speak
        synth.speak(speakText);
      }
};

//EVENT LISTENERS

//on submission
textForm.addEventListener('submit',e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

//voice select change
voiceSelect.addEventListener('change',e => speak());