// Seleção dos elementos do DOM necessários

const contentDiv = document.querySelector(".content")
const filterSelect = document.querySelector("#categoryFilter")
const popularityFilter = document.querySelector("#likesFilter")
const searchInput = document.querySelector("#searchInput")
const dateFilterMin = document.querySelector("#dateFilterMin")
const dateFilterMax = document.querySelector("#dateFilterMax")
const clearFiltersBttn = document.querySelector("#clearFiltersBttn")

const dados = [
    {id: 1, titulo: "Campeonato de Stop", categoria: "Lazer", data:"2025-12-10", curtidas: 4, liked: false},
    {id: 2, titulo: "Projetos de LSW", categoria: "Educação", data:"2025-12-18", curtidas: 1, liked: false},
    {id: 3, titulo: "Carnaval", categoria: "Lazer", data:"2026-02-13", curtidas: 2, liked: false},
    {id: 4, titulo: "Dia D para Vacinação", categoria: "Saúde", data:"2026-04-05", curtidas: 1, liked: false},
]

const defaultFilters = [
    {type: "categoria", value: "todas"},
    {type: "popularidade", value: false},
    {type: "titulo", value: ""},
    {type: "minDate", value: null},
    {type: "maxDate", value: null}
]

let activeFilters = defaultFilters.map(f => ({...f})); // Cópia dos filtros padrão

// Funções para criação e renderização dinâmica dos cards de eventos

function createEventCard(event){
    if(!event || typeof event !== "object" || event === null) return null;

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
    
    // Botão para Curtir
    const cardLikeBttn = document.createElement("button")
    cardLikeBttn.classList.add("like-bttn") 
    cardLikeBttn.textContent = "Curtir"
    
    //Função de curtir
    cardLikeBttn.addEventListener("click", () => {
        if (!event.liked) {
            event.curtidas++
            cardLikeCount.textContent = event.curtidas
            event.liked = true
            filterEvents()
        }
    })

    // Contagem de Likes
    const cardLikeCount = document.createElement("span")
    cardLikeCount.classList.add("like-count")
    cardLikeCount.textContent = event.curtidas

    // Adiciona os elementos de ação a div de ação
    cardActionsDiv.appendChild(cardEditBttn)
    cardActionsDiv.appendChild(cardLikeBttn)
    cardActionsDiv.appendChild(cardLikeCount)


    //Adiciona os elementos a div do card
    cardDiv.appendChild(cardCategory)
    cardDiv.appendChild(cardTitle)
    cardDiv.appendChild(cardDate)
    cardDiv.appendChild(cardActionsDiv)

    return cardDiv;
}

function renderEvents(eventArray){
    // Limpa o conteúdo atual
    contentDiv.innerHTML = ""

    eventArray.forEach(event => {
        const card = createEventCard(event)
        // Adiciona o card criado a div de conteúdo
        contentDiv.appendChild(card)
    });
}


// Funções para Filtragem dos Eventos

function populateCategoryFilter(){
    // Extrai as categorias únicas dos eventos
    const categorias = ["todas", ...new Set(dados.map(e => e.categoria.trim()).filter(Boolean).map(c => c.toLowerCase()))];

    filterSelect.innerHTML = ""
    categorias.forEach(category => {
        const option = document.createElement("option")
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        filterSelect.appendChild(option);
    });
}

function updateFilters(type, value){
    const filter = activeFilters.find(f => f.type === type);
    if(filter){
        filter.value = value;
    }
    filterEvents();
}

function clearFilters(){
    activeFilters = defaultFilters.map(f => ({...f}));
    filterSelect.value = "todas";
    popularityFilter.checked = false;
    searchInput.value = "";
    dateFilterMin.value = "";
    dateFilterMax.value = "";
    renderEvents(dados);
}

function filterByCategory(event){
    const categoryFilter = activeFilters.find(f => f.type === "categoria").value;
    return categoryFilter === "todas" || event.categoria.toLowerCase() === categoryFilter;
}

function filterBySearch(event){
    const searchFilter = activeFilters.find(f => f.type === "titulo").value;
    return event.titulo.toLowerCase().includes(searchFilter.toLowerCase());
}

function filterByMinDate(event){
    const minDateFilter = activeFilters.find(f => f.type === "minDate").value || "0000-01-01";
    const minDate = new Date(minDateFilter);

    return new Date(event.data) >= minDate;
}

function filterByMaxDate(event){
    const maxDateFilter = activeFilters.find(f => f.type === "maxDate").value || "9999-12-31";
    const maxDate = new Date(maxDateFilter);

    return new Date(event.data) <= maxDate;
}

function filterEvents(){
    const filteredEvents = dados.filter(event => {
        const matchesCategory = filterByCategory(event);
        const matchesSearch = filterBySearch(event);
        const matchesDate = filterByMinDate(event) && filterByMaxDate(event);
        return matchesCategory && matchesSearch && matchesDate;
    })

    //Ordenação por popularidade
    const order = activeFilters.find(f => f.type === "popularidade")?.value;
    console.log(order);
    let filteredEventsOrdened = filteredEvents;
    if (order) {
        filteredEventsOrdened = [...filteredEvents].sort((a, b) => b.curtidas - a.curtidas);
    }
    
    renderEvents(filteredEventsOrdened)
}


// Inicialização da Página, chamando as funções necessárias

function initialize(){
    renderEvents(dados)
    populateCategoryFilter();

    filterSelect.addEventListener("change", event => updateFilters("categoria", event.target.value));
    popularityFilter.checked = false;
    popularityFilter.addEventListener("change", e => updateFilters("popularidade", e.target.checked));
    searchInput.addEventListener("input", event => updateFilters("titulo", event.target.value));
    dateFilterMin.addEventListener("change", event => updateFilters("minDate", event.target.value));
    dateFilterMax.addEventListener("change", event => updateFilters("maxDate", event.target.value));
    clearFiltersBttn.addEventListener("click", clearFilters);
}

initialize();
