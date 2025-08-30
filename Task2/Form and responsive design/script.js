document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let errorMsg = document.getElementById("error-msg");

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "" || email === "" || message === "") {
    errorMsg.style.color = "red";
    errorMsg.textContent = "⚠ Please fill out all fields.";
    shake(errorMsg);
  } else if (!emailPattern.test(email)) {
    errorMsg.style.color = "red";
    errorMsg.textContent = "⚠ Invalid email format.";
    shake(errorMsg);
  } else {
    errorMsg.style.color = "green";
    errorMsg.textContent = "✅ Form submitted successfully!";
    document.getElementById("form").reset();
  }
});

function shake(element) {
  element.style.animation = "shake 0.3s";
  setTimeout(() => {
    element.style.animation = "";
  }, 300);
}
