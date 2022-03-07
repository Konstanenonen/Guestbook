const ajaxButton = document.getElementById("ajax-button");

ajaxButton.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const country = document.getElementById("country").value;
  const message = document.getElementById("message").value;
  console.log(name, country, message);

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("root").innerHTML = this.responseText;
      console.log(this.responseText);
    }
  }

  xmlhttp.open("POST", "/addMessage", true);
  xmlhttp.setRequestHeader("Content-type", "application/json");

  const userInput = {
    name: name,
    country: country,
    message: message,
  };

  xmlhttp.send(JSON.stringify(userInput));

});