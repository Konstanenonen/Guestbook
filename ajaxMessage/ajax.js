const ajaxButton = document.getElementById("ajax-button");

ajaxButton.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const country = document.getElementById("country").value;
  const message = document.getElementById("message").value;
  console.log(name, country, message);
})