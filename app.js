const $ = (selector) => document.querySelector(selector);
const form = $("#form");
const emojiInputElement = $("#emoji-input");
const formatSelectElement = $("#format-select");
const errorMessageElement = $("#error-message");
const twemojiElement = $("#twemoji");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const emoji = formData.get("emoji-input");
  const format = formatSelectElement.value || "svg";
  const [extension, folder] = format.split("-");
  twemojiElement.textContent = emoji ? emoji.toString().trim() : "";
  try {
    twemoji.parse(twemojiElement, {
      folder: folder || extension,
      ext: `.${extension}`,
    });
  } catch {
    return showError("The `twemoji` namespace is undefined.");
  }
  const twemojiImg = twemojiElement.querySelector("img");
  if (!twemojiImg || !twemojiImg.src)
    return showError(`Unknown emoji '${emoji}'.`);
  showError(null);
  const tab = window.open(twemojiImg.src, "_blank");
  if (tab) tab.focus();
});

function showError(message) {
  if (message) {
    emojiInputElement.setAttribute("aria-invalid", "true");
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
  } else {
    emojiInputElement.removeAttribute("aria-invalid");
    errorMessageElement.textContent = "";
    errorMessageElement.style.display = "none";
  }
}
