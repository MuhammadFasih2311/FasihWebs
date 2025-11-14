const textArray = ["a Web Developer.", "a Designer."];
let i = 0, j = 0, currentText = "", isDeleting = false;

function type() {
  const typed = document.getElementById("typed-text");

  if (i < textArray.length) {
    if (!isDeleting && j <= textArray[i].length) {
      currentText = textArray[i].substring(0, j++);
    }
    if (isDeleting && j >= 0) {
      currentText = textArray[i].substring(0, j--);
    }

    typed.innerHTML = currentText;

    if (!isDeleting && j === textArray[i].length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % textArray.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }
}
type();

// Show/Hide Scroll Button on Scroll
window.onscroll = function () {
  const btn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Scroll to Top Function
document.getElementById("scrollTopBtn").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

