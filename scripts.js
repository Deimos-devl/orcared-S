// Banco de dados dos produtos
const produtos = {
    injetaveis: {
        "Enantato de Testo": 195,
        "Cipionato de testo": 175,
        "Durateston": 195,
        "Propionato de testo": 170,
        "Deca": 195,
        "NPP": 170,
        "Trembo Acetato": 180,
        "Trembo Enantato": 210,
        "Tri-Trembo": 190,
        "RedBlend": 195,
        "Masteron": 210,
        "Primobolan": 290,
        "Boldenona": 195,
        "HCG": 210,
        "Stanozolol Oily": 160,
    },
    orais: {
        "Hemogenin 5mg": 150,
        "Hemogenin 50mg": 170,
        "Oxandrolona 5mg": 120,
        "Oxandrolona 10mg": 170,
        "Oxandrolona 20mg": 259,
        "Stanozolol 10mg": 150,
        "Dianabol": 150,
        "Proviron": 110,
        "Tadalafil": 90,
        "Finasterida": 70,
        "Tamoxifeno": 97,
        "Anastrozol": 97,
        "Espironolactona": 65,
        "Clenbuterol": 99,
        "Seca Tudo": 99,
        "Emagrecedor": 99,
        "Roacutan 5mg": 60,
        "Roacutan 20mg": 150,
        "Minoxired": 50,
        "Diladrol": 75,
    },
};

// Renderizar os produtos
function renderProdutos(tipo, containerId) {
    const container = document.getElementById(containerId);
    Object.entries(produtos[tipo]).forEach(([produto, preco]) => {
        const div = document.createElement("div");
        div.className = "produto";
        div.innerHTML = `
            <span>${produto} - R$${preco.toFixed(2).replace(".", ",")}</span>
            <button onclick="ajustarQuantidade(this, -1)">-</button>
            <input type="number" value="0" min="0" />
            <button onclick="ajustarQuantidade(this, 1)">+</button>
        `;
        container.appendChild(div);
    });
}

// Ajustar quantidade
function ajustarQuantidade(button, delta) {
    const input = button.parentElement.querySelector("input");
    const novaQuantidade = Math.max(0, parseInt(input.value) + delta);
    input.value = novaQuantidade;
}

// Gerar orçamento
document.getElementById("gerar-orcamento").addEventListener("click", () => {
    let total = 0;
    const produtosSelecionados = [];
    const tipoFrete = document.querySelector("input[name='frete']:checked").value;

    // Mapear tipo de frete para exibir apenas "Sedex"
    const tipoFreteFormatado = tipoFrete.includes("Sedex") ? "Sedex" : tipoFrete;

    // Injetáveis
    document.querySelectorAll("#injetaveis .produto").forEach((div, i) => {
        const quantidade = parseInt(div.querySelector("input").value);
        if (quantidade > 0) {
            const nome = Object.keys(produtos.injetaveis)[i];
            const preco = produtos.injetaveis[nome];
            total += quantidade * preco;
            produtosSelecionados.push(`${quantidade}x ${nome} R$${(quantidade * preco).toFixed(2).replace(".", ",")}`);
        }
    });

    // Orais
    document.querySelectorAll("#orais .produto").forEach((div, i) => {
        const quantidade = parseInt(div.querySelector("input").value);
        if (quantidade > 0) {
            const nome = Object.keys(produtos.orais)[i];
            const preco = produtos.orais[nome];
            total += quantidade * preco;
            produtosSelecionados.push(`${quantidade}x ${nome} R$${(quantidade * preco).toFixed(2).replace(".", ",")}`);
        }
    });

    // Adicionar frete
    const freteValores = { PAC: 40, Sedex: 55, "Sedex-": 65, Transportadora: 80 };
    total += freteValores[tipoFrete];

    if (produtosSelecionados.length > 0) {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });

        const mensagem = `
Total de ${formatter.format(total)} já com o frete incluso (${tipoFreteFormatado})
🔥 Garanta seu Cashback, nossa garantia é 100% gratuita! 🔥

Seu novo pedido será 📦:
${produtosSelecionados.join("\n")}

Podemos fechar o seu pedido para você garantir seu Cashback? 🎁
        `.trim();

        navigator.clipboard.writeText(mensagem).then(() => {
            alert("Orçamento gerado e copiado para a área de transferência!");
            document.querySelectorAll("input[type='number']").forEach(input => input.value = 0);
        });
    } else {
        alert("Selecione pelo menos um produto!");
    }
});

// Inicializar
renderProdutos("injetaveis", "injetaveis");
renderProdutos("orais", "orais");
