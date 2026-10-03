// ===== VARIÁVEIS =====
const PONTOS_VITORIA = 3;
const PONTOS_EMPATE = 1;

const titulo = document.getElementById("titulo");
const campoTime = document.getElementById("time");
const campoVitorias = document.getElementById("vitorias");
const campoEmpates = document.getElementById("empates");
const campoDerrotas = document.getElementById("derrotas");
const btnCalcular = document.getElementById("btnCalcular");
const btnLimpar = document.getElementById("btnLimpar");
const resultado = document.getElementById("resultado");

// ===== FUNÇÕES =====

// Calcula os pontos conquistados
function calcularPontos(vitorias, empates) {
    return vitorias * PONTOS_VITORIA + empates * PONTOS_EMPATE;
}

// Calcula o aproveitamento em porcentagem
function calcularAproveitamento(pontos, jogos) {
    let pontosDisputados = jogos * PONTOS_VITORIA;
    return (pontos / pontosDisputados) * 100;
}

// Retorna uma frase de acordo com o aproveitamento
function avaliarDesempenho(aproveitamento) {
    if (aproveitamento >= 70) {
        return "Campanha de campeão! 🏆";
    } else if (aproveitamento >= 55) {
        return "Brigando por vaga na Libertadores.";
    } else if (aproveitamento >= 40) {
        return "Meio de tabela, dá pra melhorar.";
    } else {
        return "Cuidado com a zona de rebaixamento! ⚠️";
    }
}

// Verifica se o valor é um número inteiro maior ou igual a zero
function numeroValido(valor) {
    return Number.isInteger(valor) && valor >= 0;
}

// Mostra uma mensagem de erro na página
function mostrarErro(mensagem) {
    resultado.className = "erro";
    resultado.innerHTML = mensagem;
}

// Função principal: valida, calcula e altera a página
function processar() {
    let time = campoTime.value.trim();
    let vitorias = Number(campoVitorias.value);
    let empates = Number(campoEmpates.value);
    let derrotas = Number(campoDerrotas.value);

    // VALIDAÇÃO
    if (time === "") {
        mostrarErro("Digite o nome do time.");
        return;
    }
    if (!numeroValido(vitorias) || !numeroValido(empates) || !numeroValido(derrotas)) {
        mostrarErro("Vitórias, empates e derrotas devem ser números inteiros (0 ou mais).");
        return;
    }

    let jogos = vitorias + empates + derrotas;

    if (jogos === 0) {
        mostrarErro("O time precisa ter pelo menos 1 jogo.");
        return;
    }
    if (jogos > 38) {
        mostrarErro("Um campeonato de pontos corridos tem no máximo 38 jogos.");
        return;
    }

    // CÁLCULO
    let pontos = calcularPontos(vitorias, empates);
    let aproveitamento = calcularAproveitamento(pontos, jogos);
    let frase = avaliarDesempenho(aproveitamento);

    // ALTERAÇÃO NO CONTEÚDO DA PÁGINA
    titulo.textContent = "Como está o " + time + "?";

    resultado.className = "sucesso";
    resultado.innerHTML =
        "<strong>" + time + "</strong>" +
        "<span class='percentual'>" + aproveitamento.toFixed(1) + "%</span>" +
        "<div class='barra'><div class='barra-preenchida' style='width:" +
        aproveitamento + "%'></div></div>" +
        "<p>" + pontos + " pontos em " + jogos + " jogos</p>" +
        "<p>" + frase + "</p>";
}

// Limpa os campos e volta a página ao normal
function limpar() {
    campoTime.value = "";
    campoVitorias.value = "";
    campoEmpates.value = "";
    campoDerrotas.value = "";
    resultado.className = "";
    resultado.innerHTML = "";
    titulo.textContent = "Seu time está brigando por quê?";
}

// ===== EVENTOS DE CLIQUE =====
btnCalcular.addEventListener("click", processar);
btnLimpar.addEventListener("click", limpar);
