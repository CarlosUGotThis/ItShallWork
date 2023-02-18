const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

let finalTranscription = '';
let transcription = '';

recognition.onresult = (event) => {
  transcription = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      finalTranscription += event.results[i][0].transcript + '.<br/>';
    } else {
      transcription += event.results[i][0].transcript;
    }
  }
  document.getElementById('transcription').innerHTML = finalTranscription + '<em>' + transcription + '</em>';
};

recognition.onend = () => {
  document.getElementById('start-btn').disabled = false;
  document.getElementById('stop-btn').disabled = true;
};

document.getElementById('start-btn').addEventListener('click', () => {
  finalTranscription = '';
  transcription = '';
  recognition.start();
  document.getElementById('start-btn').disabled = true;
  document.getElementById('stop-btn').disabled = false;
});

document.getElementById('stop-btn').addEventListener('click', () => {
  recognition.stop();
});