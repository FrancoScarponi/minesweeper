document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "index.html";
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";

    var isValid = true;

    var nameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!nameRegex.test(name) || name.length === 0) {
      document.getElementById("nameError").textContent =
        "Name must be alphanumeric.";
      isValid = false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      isValid = false;
    }

    if (message.length <= 5) {
      document.getElementById("messageError").textContent =
        "Message must be more than 5 characters.";
      isValid = false;
    }

    if (isValid) {
      var subject = encodeURIComponent("Message from " + name);
      var body = encodeURIComponent(message);
      var mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    }
  });

  function toggleTheme () {
  var themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  var savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.add(savedTheme + "-theme");
  themeToggle.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    var newTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
  });
};

toggleTheme()