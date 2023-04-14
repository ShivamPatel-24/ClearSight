
// main.js


function toggleOptions() {
    var optionsList = document.querySelector(".options-list");
    optionsList.classList.toggle("hidden");
  }

  const button = document.getElementById("font-increase-btn");



button.addEventListener("click", () => {
  const label = button.innerText;
  speak(label);
});

function speak(text) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  window.speechSynthesis.speak(speech);
}



const button2 = document.getElementById("font-decrease-btn");
button2.addEventListener("click", () => {
  const label = button2.innerText;
  speak(label);
});

function speak(text) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  window.speechSynthesis.speak(speech);
}

var fontSize = 16; // initial font size
  var maxFontSize = 100; // maximum font size
  var minFontSize = 12; // minimum font size

  document.getElementById("font-increase-btn").addEventListener("click", function() {
    if (fontSize < maxFontSize) {
      fontSize += 2; // increase font size by 2
      document.body.style.fontSize = fontSize + "px";
      document.getElementById("middle-panel").classList.add("large"); // Add the "large" class to the middle panel to increase its size
    }
  });

  document.getElementById("font-decrease-btn").addEventListener("click", function() {
    if (fontSize > minFontSize) {
      fontSize -= 2; // decrease font size by 2
      document.body.style.fontSize = fontSize + "px";
      if (fontSize <= minFontSize) {
        document.getElementById("middle-panel").classList.remove("large"); // Remove the "large" class from the middle panel to decrease its size
      }
    }
  });


  var brightness = 100; // initial brightness
  var body = document.getElementsByTagName("body")[0];
  var brightnessSlider = document.getElementById("brightness");
  
  brightnessSlider.addEventListener("input", function() {
    brightness = brightnessSlider.value;
    body.style.filter = "brightness(" + brightness + "%)";
  });

  function toggleTheme() {
    var body = document.getElementsByTagName("body")[0];
    var checkbox = document.getElementById("toggle-value");
    if (checkbox.checked) {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
    } else {
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
    }
  }
  
  