const texts = ["Backend Developer", "Bot Developer", "System Architect", "Low-Level Enthusiast"];
let index = 0;
let charIndex = 0;
let typingElement;

function type() {
  if (!typingElement) return;
  if (charIndex < texts[index].length) {
    typingElement.textContent += texts[index][charIndex];
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1700);
  }
}

function erase() {
  if (!typingElement) return;
  if (charIndex > 0) {
    typingElement.textContent = texts[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % texts.length;
    setTimeout(type, 350);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  typingElement = document.getElementById("typing-text");
  if (typingElement && texts.length) setTimeout(type, 500);
});
document.querySelectorAll('nav a[href^="#"], .hero-buttons a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});