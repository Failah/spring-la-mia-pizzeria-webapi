console.log("Index: JS OK!");

pizzaList();

function pizzaList() {
    axios.get('http://localhost:8080/api/pizzas')
        .then((res) => {
            const pizzaListContainer = document.querySelector('#pizza-list');
            res.data.forEach(pizza => {
                const pizzaCard = `
            <div class="col-md-4 mb-4">
              <div class="card">
                <a href="./show.html?id=${pizza.id}">
                  <img src="${pizza.imgURL}" class="card-img-top" alt="${pizza.name}">
                </a>
                <div class="card-body">
                  <h5 class="card-title">
                    <a href="./show.html?id=${pizza.id}">${pizza.name}</a>
                  </h5>
                  <p class="card-text">${pizza.description}</p>
                </div>
              </div>
            </div>
          `;
                pizzaListContainer.insertAdjacentHTML('beforeend', pizzaCard);
            });
        })
        .catch((err) => {
            console.error('errore nella richiesta', err);
            alert('Errore durante la richiesta!');
        });
}

function searchPizzas() {
    const input = document.querySelector('#search-input');
    const filter = input.value.toUpperCase();
    const pizzaListContainer = document.querySelector('#pizza-list');
    const pizzas = pizzaListContainer.querySelectorAll('.card');

    pizzas.forEach((pizza) => {
        const name = pizza.querySelector('.card-title a').textContent.toUpperCase();

        if (name.includes(filter)) {
            pizza.style.display = '';
        } else {
            pizza.style.display = 'none';
        }
    });
}

document.querySelector('#search-input').addEventListener('input', () => {
    searchPizzas();
});



