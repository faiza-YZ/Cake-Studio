// The visitor's list lives only for this page session; it is never saved.
const likes = [];

const likeForm = document.querySelector("#likes-form");
const likeInput = document.querySelector("#like-input");
const likesList = document.querySelector("#likes-list");
const emptyNote = document.querySelector("#likes-empty");
const cardinal = document.querySelector(".bird");

// Rebuild the list from in-memory state and attach a working remove button.
function renderLikes() {
  likesList.replaceChildren();
  emptyNote.hidden = likes.length > 0;

  likes.forEach((like, index) => {
    const item = document.createElement("li");
    const text = document.createElement("span");
    const removeButton = document.createElement("button");

    text.textContent = like;
    removeButton.type = "button";
    removeButton.className = "remove-like";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Remove ${like}`);
    removeButton.addEventListener("click", () => {
      likes.splice(index, 1);
      renderLikes();
    });

    item.append(text, removeButton);
    likesList.append(item);
  });
}

// A form submit works both from the Add button and the Enter key.
likeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = likeInput.value.trim();

  if (!value) {
    likeInput.focus();
    return;
  }

  likes.push(value);
  likeInput.value = "";
  renderLikes();
  likeInput.focus();
});

// Restart the short movement each time the illustration is activated.
function flutterCardinal() {
  cardinal.classList.remove("flutter");
  void cardinal.offsetWidth;
  cardinal.classList.add("flutter");
}

cardinal.addEventListener("click", flutterCardinal);
cardinal.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    flutterCardinal();
  }
});
cardinal.addEventListener("animationend", () => {
  cardinal.classList.remove("flutter");
});

renderLikes();
