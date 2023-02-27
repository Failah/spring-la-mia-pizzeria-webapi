console.log("Show: JS OK!");

const urlParams = new URLSearchParams(window.location.search);
const pizzaId = urlParams.get('id');

showPizza(pizzaId);

function showPizza(pizzaId) {
    axios.get(`http://localhost:8080/api/pizzas/${pizzaId}`)
        .then((res) => {
            const pizza = res.data;
            const pizzaContainer = document.querySelector('#pizza-details');

            const pizzaCard = `
      <div class="card">
        <img src="${pizza.image}" class="card-img-top" alt="${pizza.name}">
        <div class="card-body">
          <h5 class="card-title">${pizza.name}</h5>
          <p class="card-text">${pizza.description}</p>
          <p class="card-text">Prezzo: ${pizza.price}€</p>
          <div>
            <a href="./index.html" class="btn btn-primary">Torna all'indice</a>
          </div>
          <div class="mt-4">
            <button onclick="deletePizza(${pizzaId})" class="btn btn-danger" id="delete-pizza-btn">Elimina pizza</button>
          </div>

        </div>
      </div>
    `;
            pizzaContainer.insertAdjacentHTML('beforeend', pizzaCard);
        })
        .catch((err) => {
            console.error('Errore nella richiesta', err);
            alert('Errore durante la richiesta!');
        });
}


// ELIMINAZIONE PIZZA
function deletePizza(pizzaId) {
    if (confirm("Sei sicuro di voler eliminare questa pizza?")) {
        axios.delete('http://localhost:8080/api/pizzas/delete/' + pizzaId)
            .then((res) => {
                alert("Pizza eliminata!")
                window.location.href = './index.html';
            })
            .catch((err) => {
                console.error('Errore nella richiesta', err);
                alert('Errore durante la richiesta!');
            });
    }
}


