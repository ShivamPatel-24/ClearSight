const colorToggleBtn = document.querySelector('#color-toggle');
const body = document.querySelector('body');

colorToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});
const brightnessSlider = document.querySelector('#brightness-slider');

brightnessSlider.addEventListener('input', () => {
  const brightnessValue = brightnessSlider.value;
  document.body.style.filter = `brightness(${brightnessValue}%)`;
});


function increaseFontSizeCart() {
    var elements = document.getElementsByClassName("changeable-font-size");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var style = window.getComputedStyle(element, null).getPropertyValue('font-size');
      var fontSize = parseFloat(style);
      element.style.fontSize = (fontSize + 1) + 'px';
    }
  }
  
  function decreaseFontSizeCart() {
    var elements = document.getElementsByClassName("changeable-font-size");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var style = window.getComputedStyle(element, null).getPropertyValue('font-size');
      var fontSize = parseFloat(style);
      element.style.fontSize = (fontSize - 1) + 'px';
    }
  }


  function toggleOptions() {
    var optionsList = document.querySelector(".options-list");
    optionsList.classList.toggle("hidden");
  }

  const button = document.getElementById("inc-font");



button.addEventListener("click", () => {
  const label = button.innerText;
  speak(label);
});

function speak(text) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  window.speechSynthesis.speak(speech);
}
function toggleOptions() {
  var optionsList = document.querySelector(".options-list");
  optionsList.classList.toggle("hidden");
}

const button2 = document.getElementById("dec-font");



button2.addEventListener("click", () => {
const label = button2.innerText;
speak(label);
});

function speak(text) {
const speech = new SpeechSynthesisUtterance();
speech.text = text;
window.speechSynthesis.speak(speech);
}