
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


  window.addEventListener('DOMContentLoaded', function() {
    // Get the necessary elements
    var body = document.getElementsByTagName('body')[0];
    var brightnessSlider = document.getElementById('brightness');
    var toggleCheckbox = document.getElementById('toggle-value');
  
    // Set the initial brightness value
    var brightness = 100;
    body.style.filter = 'brightness(' + brightness + '%)';
  
    // Add an event listener to the brightness slider
    brightnessSlider.addEventListener('input', function() {
      brightness = brightnessSlider.value;
      body.style.filter = 'brightness(' + brightness + '%)';
    });
  
    // Add an event listener to the toggle checkbox
    toggleCheckbox.addEventListener('click', function() {
      if (toggleCheckbox.checked) {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
      } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
      }
    });
  });

  

  

 
  

  function toggleTheme() {
    const body = document.querySelector("body");
    const toggleValue = document.getElementById("toggle-value");
    
    if (toggleValue.checked) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }
  
  

    
  function increaseFontSize() {
    var h5Elements = document.getElementsByTagName('h5');
    for (var i = 0; i < h5Elements.length; i++) {
      var fontSize = parseInt(window.getComputedStyle(h5Elements[i], null).getPropertyValue('font-size'));
      h5Elements[i].style.fontSize = (fontSize + 1) + 'px';
    }
  }

  function decreaseFontSize() {
    var h5Elements = document.getElementsByTagName('h5');
    for (var i = 0; i < h5Elements.length; i++) {
      var fontSize = parseInt(window.getComputedStyle(h5Elements[i], null).getPropertyValue('font-size'));
      h5Elements[i].style.fontSize = (fontSize - 1) + 'px';
    }
  }
     
     
    
  


  