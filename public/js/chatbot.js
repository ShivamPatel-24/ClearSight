/* // Uses SpeechSynthesis to create audio from text input */
function speak(text) {
  console.log("speak called with text:", text);
  const speech = new SpeechSynthesisUtterance(text);
  return new Promise((resolve, reject) => {
    speech.onend = () => {
      console.log('Speech ended.');
      resolve();
    };
    speech.onerror = (event) => {
      console.error('Speech error:', event.error);
      reject(event.error);
    };
    window.speechSynthesis.speak(speech);
  });
}



/* // rasa webchat widget usage - https://github.com/botfront/rasa-webchat */
!(function () {
  let e = document.createElement("script"),
    t = document.head || document.getElementsByTagName("head")[0];
  (e.src =
    "https://cdn.jsdelivr.net/npm/rasa-webchat@1.0.1/lib/index.js"),
    // Replace 1.x.x with the version that you want
    (e.async = !0),
    (e.onload = () => {
      window.WebChat.default(
        {
          customData: { language: "en" },
          socketUrl: "http://localhost:5005",
          socketPath: "/socket.io/",
          params: {"storage":"session"},

          // triggers TTS on chatbot response
          onSocketEvent:{
            'bot_uttered': async (event) => {
            console.log("onsocketEvent occurred");
            if (event.text) {
              await speak(event.text);
            }
          },

            'connect': () => console.log('connection established'),
          
          },
 
          //embedded: true,
          // add other props here
        },
        null
      );
    }),
    t.insertBefore(e, t.firstChild);
})();


// plays when document is clicked (only plays once)
// let speechPlayed = false;

// function init(text) {
//   if (!speechPlayed) {
//     document.addEventListener('click', function clickListener(event) {
//       console.log("Input into init");
//       console.log(text);

//       speak(text).then(() => {
//         speechPlayed = true;
//         document.removeEventListener('click', clickListener);
//       });
//     });
//   }
// }

// plays audio from text input if play-button is clicked
function play_audio(text) {
  document.getElementById('play-button').addEventListener('click', function clickListener(event) {
    speak(text)
  });
}




