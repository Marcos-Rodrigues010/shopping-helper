let cart = [];
let id = 0;
let count = 1;
let indexToDelete;

function checkFields() {
    let nameItem = document.querySelector("#name").value;
    let qt = document.querySelector("#qtd").value;
    let value = document.querySelector("#unit-value").value;
    if (nameItem === "" | qt === "" | value === "") {
        alert("Preencha todos os campos para continuar");
    } else {
        addItem(nameItem, qt, value);
    }
}

function addItem(nameItem, qt, value) {
    id++;
    let qtItem = parseStringToFloat(qt);
    let unitValueItem = parseStringToFloat(value);
    let totalValueItem = qtItem * unitValueItem;
    totalValueItem = totalValueItem.toFixed(2);
    totalValueItem = parseStringToFloat(totalValueItem)
    cart.push({ id, nameItem, qtItem, unitValueItem, totalValueItem });
    document.querySelector("#name").value = '';
    document.querySelector("#qtd").value = '';
    document.querySelector("#unit-value").value = '';
    document.querySelector('#name').focus();
    showItem();
}

function showItem() {
    let lastItem = cart.length - 1;
    let item = '<div class="item" id="' + cart[lastItem].id + '">'
    item += '<div>' + count + '</div>'
    item += '<div>' + cart[lastItem].nameItem + '</div>'
    item += '<div><input type="number" name="qtItem" id="qtItem" onchange="updateQtItem(this)" value="' + cart[lastItem].qtItem + '" min="1"></div> '
    item += '<div><input type="number" data-id-item="" name="unit-value-item" onchange="updateUnitValueItem(this)"id="unit-value-item" value="' + cart[lastItem].unitValueItem + '" min="0.01" step="0.01"></div>'
    item += '<div>R$' + cart[lastItem].totalValueItem.toFixed(2).replace('.', ',') + '</div> '
    item += '<div><svg onclick="openModal(this)" enable-background="new 0 0 91 91" height="91px" id="bin" version="1.1" viewBox="12 10 80 80" width="91px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M67.305,36.442v-8.055c0-0.939-0.762-1.701-1.7-1.701H54.342v-5.524c0-0.938-0.761-1.7-1.699-1.7h-12.75   c-0.939,0-1.701,0.762-1.701,1.7v5.524H26.93c-0.939,0-1.7,0.762-1.7,1.701v8.055c0,0.938,0.761,1.699,1.7,1.699h0.488v34.021   c0,0.938,0.761,1.7,1.699,1.7h29.481c3.595,0,6.52-2.924,6.52-6.518V38.142h0.486C66.543,38.142,67.305,37.381,67.305,36.442z    M41.592,22.862h9.35v3.824h-9.35V22.862z M61.719,67.345c0,1.719-1.4,3.117-3.12,3.117h-27.78v-32.32l30.9,0.002V67.345z    M63.904,34.742H28.629v-4.655h11.264h12.75h11.262V34.742z"/><rect height="19.975" width="3.4" x="36.066" y="44.962"/><rect height="19.975" width="3.4" x="44.566" y="44.962"/><rect height="19.975" width="3.4" x="53.066" y="44.962"/></g></svg></div>'
    item += '</div>'
    document.querySelector(".listItem-area").innerHTML += item;
    count++;
    updateTotalValue();
}

function updateQtItem(e){
    let idItem = e.parentNode.parentNode.id;
    let index = getItemById(idItem);
    cart[index].qtItem = parseStringToFloat(e.value);
    document.getElementById(idItem).children[2].children[0].setAttribute('value', cart[index].qtItem)
    updateTotalValueItem(index, idItem);
    updateTotalValue();
}

function updateUnitValueItem(e){
    let idItem = e.parentNode.parentNode.id;
    let index = getItemById(idItem);
    cart[index].unitValueItem = parseStringToFloat(e.value);
    document.getElementById(idItem).children[3].children[0].setAttribute('value', cart[index].unitValueItem)
    updateTotalValueItem(index, idItem);
    updateTotalValue();
}

function updateTotalValueItem(index, idItem){
    cart[index].totalValueItem = cart[index].qtItem * cart[index].unitValueItem;
    cart[index].totalValueItem = cart[index].totalValueItem.toFixed(2).replace(',', '.');
    cart[index].totalValueItem = parseStringToFloat(cart[index].totalValueItem)
    document.getElementById(idItem).children[4].innerHTML = `R$${cart[index].totalValueItem.toFixed(2).replace('.', ',')}`;
}


function updateTotalValue(){

    let totalValue = 0;

    for(let i in cart){
        totalValue += cart[i].totalValueItem;
    }
    totalValue = totalValue.toFixed(2).replace('.', ',');
    document.querySelector('.total-value').innerHTML = `Valor total: R$${totalValue}`
}

function getItemById(id){
    let index = cart.findIndex((e)=>{
        return e.id.toString() === id;
    })
    return index;
}

function openModal(e){
    let height = document.querySelector('.container').clientHeight;
    let idItem = e.parentNode.parentNode.id;
    indexToDelete = getItemById(idItem);
    document.querySelector('.modal').style.display = 'flex';
    document.querySelector('.modal').style.height = height+'px';
}

function closeModal(){
    indexToDelete = '';
    document.querySelector('.modal').style.display = 'none';
}

function deleteItem(){
    let id = cart[indexToDelete].id.toString();
    let item = document.getElementById(id)
    document.querySelector('.listItem-area').removeChild(item);
    cart.splice(indexToDelete, 1);
    updateTotalValue();
    indexToDelete = '';
    closeModal();
    updateCount();
}

function updateCount(){
    count = 1;
    let items = document.querySelectorAll('.item')
    for(let i in items){
        items[i].children[0].innerHTML = count;
        count++;
    }
}

function parseStringToFloat(value){
    let aux = value.replace(',','.');
    let result = parseFloat(aux);
    return result;
}