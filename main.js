const CardsContainer = document.querySelector(".cards__products");
const btnKeep = document.querySelector("#btn__keep");

const getProducts = async () => {
    let result = await fetch('http://localhost:3000/products')
    result = await result.json()
    return result
}

const deleteProduct = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
        method: "delete"
    })
}

const saveProduct = async (nome, preco, imagem) => {
    const data = {
        nome: nome,
        preco: preco,
        imagem: imagem,
    }
    await fetch('http://localhost:3000/products', {
        method:"post",
        body: JSON.stringify(data)
    })
}

const Card = (nome, preco, imagem, id) => {
    return `
        <div class="card">
            <img class="personagem" src="${imagem}" alt="${nome}">
            <h3 class="product__name">${nome}</h3>
            <h4 class="price__card">${preco}</h4>
            <div class="svg">
                <img class="deleteCard" data-id="${id}" src="../img/trash.svg">
            </div>
        </div>
    `
}

const handleDeleteCard = () => {
    const deleteCard = document.querySelectorAll(".deleteCard");
    deleteCard.forEach(el => {
        el.addEventListener("click", async (e) => {
            const cardId = e.target.getAttribute("data-id")
            deleteProduct(cardId)
            renderCards()
        })
    })
}

const renderCards = async () => {
    const cards = await getProducts()
    let html = ""
    CardsContainer.innerHTML = html
    cards.map(card => {
        html += Card(card.nome, card.preco, card.imagem, card.id)
    })
    CardsContainer.innerHTML = html
    handleDeleteCard()
}


renderCards()

btnKeep.addEventListener("click", async (e) => {
    e.preventDefault()
    const inputName = document.querySelector("input.form__control[name=name]").value
    const inputPrice = document.querySelector("input.form__control[name=price]").value
    const inputImage = document.querySelector("input.form__control[name=image]").value

    await saveProduct(inputName, inputPrice, inputImage)
    renderCards()
})
