const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 15",
            preco: 7999,
            categoria: "Celulares",
            imagem: "https://picsum.photos/200?1",
            descricao: "Smartphone Apple",
            emEstoque: true
        },

        {
            id: 2,
            nome: "Galaxy S24",
            preco: 5999,
            categoria: "Celulares",
            imagem: "https://picsum.photos/200?2",
            descricao: "Smartphone Samsung",
            emEstoque: true
        },

        {
            id: 3,
            nome: "Notebook Dell",
            preco: 4500,
            categoria: "Notebooks",
            imagem: "https://picsum.photos/200?3",
            descricao: "Notebook para estudos",
            emEstoque: true
        },

        {
            id: 4,
            nome: "Mouse Gamer",
            preco: 250,
            categoria: "Acessórios",
            imagem: "https://picsum.photos/200?4",
            descricao: "Mouse RGB",
            emEstoque: true
        },

        {
            id: 5,
            nome: "Teclado Mecânico",
            preco: 450,
            categoria: "Acessórios",
            imagem: "https://picsum.photos/200?5",
            descricao: "Teclado mecânico gamer",
            emEstoque: false
        },

        {
            id: 6,
            nome: "PlayStation 5",
            preco: 4200,
            categoria: "Games",
            imagem: "https://picsum.photos/200?6",
            descricao: "Console Sony",
            emEstoque: true
        },

        {
            id: 7,
            nome: "Xbox Series X",
            preco: 4100,
            categoria: "Games",
            imagem: "https://picsum.photos/200?7",
            descricao: "Console Microsoft",
            emEstoque: false
        },

        {
            id: 8,
            nome: "MacBook Air",
            preco: 9500,
            categoria: "Notebooks",
            imagem: "https://picsum.photos/200?8",
            descricao: "Notebook Apple",
            emEstoque: true
        }
    ]
};

// B2

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

// B3
function formatPrice(preco) {
    return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id" , produto.id)
    card.style.backgroundColor = "#fff";

    const img = document.createElement("img");
    img.src = produto.imagem;

    const title = document.createElement("h2");
    title.innerText = produto.nome;

    const price = document.createElement("p");
    price.innerText = formatPrice(produto.preco);

    const category = document.createElement("p");
    category.innerText = produto.categoria;

    const btnDetails = document.createElement("button");
    btnDetails.innerText = "Ver detalhes";
    btnDetails.addEventListener("click", function () {
        showProductDetails(produto);
    });

    const btnHighlight = document.createElement("button");
    btnHighlight.innerText = "Destacar";
    btnHighlight.addEventListener("click", function () {
        card.classList.toggle("highlight");
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(btnDetails);
    card.appendChild(btnHighlight);

    return card;
}

function renderProducts(produtos) {

    productList.innerHTML = "";

    produtos.forEach(function (produto) {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    const allCards = document.querySelectorAll(".card");
    allCards.forEach(function (card) {
        console.log(card.getAttribute("data-id"));
    });
}

function renderCategories() {

    categorySelect.innerHTML = "";

    const optionAll = document.createElement("option");

    optionAll.value = "Todas";

    optionAll.innerText = "Todas";

    categorySelect.appendChild(optionAll);

    const categorias = [];

    data.produtos.forEach(function (produto) {

        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorias.forEach(function (categoria) {

        const option = document.createElement("option");

        option.value = categoria;

        option.innerText = categoria;

        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {

    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>

        <img src="${produto.imagem}" width="200">

        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>

        <p><strong>Categoria:</strong> ${produto.categoria}</p>

        <p>
            <strong>Estoque:</strong>
            ${produto.emEstoque ? "Disponível" : "Indisponível"}
        </p>

        <p>${produto.descricao}</p>
    `;
}

function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categorySelect.value;

    return data.produtos.filter(function (produto) {

        const matchName =
            produto.nome.toLowerCase().includes(searchText);

        const matchCategory =
            selectedCategory === "Todas" ||
            produto.categoria === selectedCategory;

        return matchName && matchCategory;
    });
}

searchInput.addEventListener("input", function () {

    const filtered = filterProducts();

    renderProducts(filtered);
});

categorySelect.addEventListener("change", function () {

    const filtered = filterProducts();

    renderProducts(filtered);
});

btnRender.addEventListener("click", function () {

    renderProducts(data.produtos);
});

renderCategories();
renderProducts(data.produtos);