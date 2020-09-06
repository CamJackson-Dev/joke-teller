const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disbal/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}
// Passing Joke to Voice RSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: '8c9db25336a44210866d90842f07e773',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}
// Get jokes from Joke API

const apiUrl =
  'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
async function getJokes() {
  let joke = '';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-toSpeech
    tellMe(joke);
    //Disable Button
    toggleButton();
  } catch (error) {
    // Catch errors
    console.log('whoops', error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
