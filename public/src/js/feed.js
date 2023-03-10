var shareImageButton = document.querySelector("#share-image-button");
var createPostArea = document.querySelector("#create-post");
var closeCreatePostModalButton = document.querySelector(
  "#close-create-post-modal-btn"
);
var sharedMomentsArea = document.querySelector("#shared-moments");

function openCreatePostModal() {
  createPostArea.style.display = "block";

  if (deferrredPrompt) {
    deferrredPrompt.prompt();
    deferrredPrompt.userChoice.then((choiceResult) => {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === "dismissed") {
        console.log("user cancelled");
      } else {
        console.log("user added to home screen");
      }
    });

    deferrredPrompt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = "none";
}

shareImageButton.addEventListener("click", openCreatePostModal);

closeCreatePostModalButton.addEventListener("click", closeCreatePostModal);

//Switiching back to dynamic fetching
// function onSaveButtonClicked(event) {
//   console.log("clicked");

//   //cache can be accessed anywhere

//   if ("caches" in window) {
//     // we could disable button if cache functionality is not present
//     // to provide better user experience

//     caches.open("user-requested").then((cache) => {
//       cache.add("https://httpbin.org/get");
//       cache.add("/src/images/sf-boat.jpg");
//     });
//   }
// }

function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard() {
  var cardWrapper = document.createElement("div");
  cardWrapper.className = "shared-moment-card mdl-card mdl-shadow--2dp";
  var cardTitle = document.createElement("div");
  cardTitle.className = "mdl-card__title";
  cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = "cover";
  cardTitle.style.height = "180px";
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement("h2");
  cardTitleTextElement.style.color = "white";
  cardTitleTextElement.className = "mdl-card__title-text";
  cardTitleTextElement.textContent = "new Trip";
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement("div");
  cardSupportingText.className = "mdl-card__supporting-text";
  cardSupportingText.textContent = "In delhi";
  cardSupportingText.style.textAlign = "center";

  //adding a button for user onClick event
  // var cardSaveButton = document.createElement("button");
  // cardSupportingText.appendChild(cardSaveButton);
  // cardSaveButton.textContent = "Save for later";
  // cardSaveButton.addEventListener("click", onSaveButtonClicked);

  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

var url = "https://httpbin.org/get";

var networkDataRecieved = false;

//dummy url sending and loading feed data
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    networkDataRecieved = true;
    console.log("From web", data);
    clearCards();
    createCard();
  });

if ("caches" in window) {
  caches
    .match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
    })
    .then((data) => {
      if (!networkDataRecieved) {
        console.log("From Cache", data);
        clearCards();
        createCard();
      }
    });
}
