document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = "/";
                } else {
                    alert("Login failed: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error during login:", error);
                alert("An error occurred. Please try again.");
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const username = document.getElementById("new-username").value;
            const password = document.getElementById("new-password").value;

            fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = "login.html";
                } else {
                    alert("Registration failed: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error during registration:", error);
                alert("An error occurred. Please try again.");
            });
        });
    }
});
