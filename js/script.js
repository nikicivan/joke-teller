const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing our joke to VoiceRSS API
function tellMe(joke) {
    console.log(joke);
    VoiceRSS.speech({
        key: '80d5f4eea7474f1399e97a92ee43cf19',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
};

//Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Dark,Pun?blacklistFlags=nsfw,religious,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text-to-Speach
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        console.log('wooops! ', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);