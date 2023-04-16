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