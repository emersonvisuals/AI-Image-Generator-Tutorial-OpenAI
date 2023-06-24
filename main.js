// variables
const button = document.querySelector("button.submit");
const imageContainer = document.querySelector("section.imageContainer");
const form = document.querySelector("form");
const input = document.querySelector("input.description");
const OPENAI_API_KEY = "KEY GOES HERE";

// avoid refresh
function handleForm(event) {
  event.preventDefault();
}

form.addEventListener("submit", handleForm);

// AI image generator function
const getImage = async () => {
  if (input.value === "") {
    return;
  } else {
    // add the loading class
    imageContainer.classList.add("loading");

    // clear previous image
    imageContainer.innerHTML = "";

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Create an amazing image using this description: ${input.value}`,
          n: 4,
          size: "256x256",
        }),
      }
    );

    const result = await response.json();
    console.log(result);

    // remove loading class from image container
    imageContainer.classList.remove("loading");

    // itarate through the result and add images
    result.data.forEach((item) => {
      if (item.url) {
        const img = document.createElement("img");
        img.src = item.url;
        img.alt = "Generated image";
        imageContainer.appendChild(img);
      }
    });

    input.value = "";
  }
};

button.addEventListener("click", getImage);
