document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Aqui, você faria uma chamada ao seu backend para validar o login
        // Exemplo de requisição fetch:
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
                // Redirecionar para a página principal ou dashboard
                window.location.href = "/";
            } else {
                // Exibir mensagem de erro
                alert("Login failed: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        });
    });
});
