document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("new-username").value;
        const password = document.getElementById("new-password").value;

        // Aqui, você faria uma chamada ao seu backend para registrar o usuário
        // Exemplo de requisição fetch:
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
                // Redirecionar para a página de login
                window.location.href = "/login";
            } else {
                // Exibir mensagem de erro
                alert("Registration failed: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        });
    });
});
