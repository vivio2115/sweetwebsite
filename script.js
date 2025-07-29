const texts = ["Backend Developer", "Bot Developer", "System Architect", "Low-Level Enthusiast"];
let index = 0;
let charIndex = 0;
let typingElement = document.getElementById("typing-text");

function type() {
  if (charIndex < texts[index].length) {
    typingElement.textContent += texts[index][charIndex];
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = texts[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 60);
  } else {
    index = (index + 1) % texts.length;
    setTimeout(type, 300);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (texts.length) setTimeout(type, 500);
});
