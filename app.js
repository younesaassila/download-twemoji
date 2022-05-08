const form = document.getElementById("form");
const errorMessageElement = document.getElementById("error-message");
const twemojiElement = document.getElementById("twemoji");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const emoji = formData.get("emoji-input").toString();
  twemojiElement.textContent = emoji;
  try {
    twemoji.parse(twemojiElement, {
      folder: "svg",
      ext: ".svg",
    });
  } catch {
    return showError("The `twemoji` namespace is undefined.");
  }
  const twemojiImg = twemojiElement.querySelector("img");

  if (!twemojiImg)
    return showError("No emoji found or emoji not yet in Twemoji's database.");
  if (!twemojiImg.src)
    return showError("Could not retrieve the URL of the Twemoji's SVG.");
  showError(null);

  window.open(twemojiImg.src, "_blank").focus();
});

function showError(message) {
  if (message) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
  } else {
    errorMessageElement.textContent = "";
    errorMessageElement.style.display = "none";
  }
}
