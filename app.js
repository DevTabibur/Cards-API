// @ts-nocheck
const main = document.getElementById('main');
const searchBtn = () => {
    const errorText = document.getElementById('error-text');
    const inputField = document.getElementById("input-field");
    const inputValue = parseInt(inputField.value);
    // error handling
    if(isNaN (inputValue)){  // isNaN
        errorText.innerText = 'please enter a number';
        inputField.value = '';
        main.innerHTML = '';
    }
    else if (inputValue ==''){
        errorText.innerText = 'please provide a number';
        inputField.value = '';
        main.innerHTML = '';

    }
    else if (inputValue > 52){
        errorText.innerText = 'please provide a number between 1-52';
        inputField.value = '';
        main.innerHTML = '';

    }
    else if(inputValue <= 0){
        errorText.innerText = 'please provide a positive number';
        inputField.value = '';
        main.innerHTML = '';


    }
    else{
        // clear previous result div
        main.innerHTML = '';
        // clear error text
        errorText.innerText = '';
        // clear input value after providing valid info
        inputField.value = '';

        const url = `https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`;
        fetch (url)
        .then(res => res.json())
        .then(data => cardsDisplay(data.cards))

    }
}

const cardsDisplay = (cards) => {

    for (const card of cards){

        const div =document.createElement('div');

        div.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${card.image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${card.suit}</h5>
              <p class="card-text">${card.code}</p>
              <p class="card-text">${card.value}</p>
              <a onclick="cardDetails('${card.code}')" class="btn btn-primary">Details</a>
         </div>
      </div>
        `;

        main.appendChild(div);
    }
}

// for Details button
const cardDetails = (code) =>{
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(res => res.json())
        .then(data => {
            const allCards = data.cards;
            const singleCard = allCards.find(card => card.code === code)
            const div = document.createElement("div");
            main.innerHTML="";
            div.innerHTML=`
                <div class="card" style="width: 18rem;">
                    <img src="${singleCard.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${singleCard.suit}</h5>
                        <p class="card-text">${singleCard.code}</p>
                        <p class="card-text">${singleCard.value}</p>
                    </div>
                </div>
            `
            main.appendChild(div)
        })
}