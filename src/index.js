import "./styles.css";

const content = document.querySelector("#content");

const heading = document.createElement("h1");
heading.textContent = "Webpack Template";

const paragraph = document.createElement("p");
paragraph.textContent =
  "If you can see this, your Webpack template is working!";

content.append(heading, paragraph);