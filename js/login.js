// Verificar se o usuário está logado
function verificarLogin() {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (!usuarioLogado) {
        $('#exampleModal').modal('show');
    } else {
        window.location.href = "produto.html";
    }
}

// Atualizar o estado do botão de login/desconectar
function atualizarBotaoLogin() {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    const botaoLogin = document.querySelector('.sign_btn a');

    if (usuarioLogado) {
        botaoLogin.textContent = "Desconectar";
        botaoLogin.href = "#";
        botaoLogin.setAttribute("data-bs-toggle", "modal");
        botaoLogin.setAttribute("data-bs-target", "#desconectarModal"); 

        botaoLogin.addEventListener('click', function (event) {
            event.preventDefault();
            localStorage.removeItem("usuarioLogado"); 
            atualizarBotaoLogin(); 
        });
    } else {
        botaoLogin.textContent = "Entrar";
        botaoLogin.href = "#";
        botaoLogin.setAttribute("data-bs-toggle", "modal");
        botaoLogin.setAttribute("data-bs-target", "#exampleModal"); 

        botaoLogin.addEventListener('click', function (event) {
            event.preventDefault();
            verificarLogin(); 
        });
    }
}

// desconectar o usuário
function desconectarUsuario() {
    localStorage.removeItem("usuarioLogado");
    alert("Você foi desconectado.");
    atualizarBotaoLogin();
}

//  botão "Comprar"
document.querySelector('.banner_main a').addEventListener('click', function (event) {
    event.preventDefault();
    verificarLogin();
});

// Login
document.querySelector('#exampleModal form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    if (email === "kalebe@fatec.com" && senha === "gabriel") {
        localStorage.setItem("usuarioLogado", email);
        $('#exampleModal').modal('hide');
        atualizarBotaoLogin();
        //window.location.href = "produto.html";
    } else {
        alert("Credenciais incorretas. Tente novamente.");
    }
});

// Verificar o estado do login
window.addEventListener('load', function () {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
        $('#exampleModal').modal('hide');
    }
    atualizarBotaoLogin();
});