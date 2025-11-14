const contentDiv = document.querySelector(".content")



const dados = [
    {id: 1, titulo: "Campeonato de Stop", categoria: "Lazer", data:"2025-12-10", curtidas: 0},
    {id: 2, titulo: "Projetos de LSW", categoria: "Educação", data:"2025-12-18", curtidas: 0},
    {id: 3, titulo: "Carnaval", categoria: "Lazer", data:"2026-02-13", curtidas: 0},
]


function createEventCard(event){
    // Cria o html do card 
    const cardDiv = document.createElement("div")
    cardDiv.classList.add("event-card")

    // Categoria do Evento
    const cardCategory = document.createElement("p")
    cardCategory.classList.add("event-category") 
    cardCategory.textContent = event.categoria

    // Título do Evento
    const cardTitle = document.createElement("h3")
    cardTitle.classList.add("event-title") 
    cardTitle.textContent = event.titulo

    // Data do Evento
    const cardDate = document.createElement("p")
    cardDate.classList.add("event-date")
    cardDate.textContent = event.data 

    // Div dos Botões de Ação
    const cardActionsDiv = document.createElement("div")
    cardActionsDiv.classList.add("event-actions")

    // Botão para Editar
    const cardEditBttn = document.createElement("button")
    cardEditBttn.classList.add("edit-bttn") 
    cardEditBttn.textContent = "Editar"

    // Contagem de Likes
    const cardLikeCount = document.createElement("span")
    cardLikeCount.classList.add("like-count")
    cardLikeCount.textContent = event.curtidas

    // Botão para Curtir
    const cardLikeBttn = document.createElement("button")
    cardLikeBttn.classList.add("like-bttn") 
    cardLikeBttn.textContent = "Like"

    // Adiciona os elementos de ação a div de ação
    cardActionsDiv.appendChild(cardEditBttn)
    cardActionsDiv.appendChild(cardLikeCount)
    cardActionsDiv.appendChild(cardLikeBttn)


    //Adiciona os elementos a div do card
    cardDiv.appendChild(cardCategory)
    cardDiv.appendChild(cardTitle)
    cardDiv.appendChild(cardDate)
    cardDiv.appendChild(cardActionsDiv)

    return cardDiv;
}


function renderEvents(eventArray){
    eventArray.forEach(event => {
        const card = createEventCard(event)
        // Adiciona o card criado a div de conteúdo
        contentDiv.appendChild(card)
    });
}


renderEvents(dados)
