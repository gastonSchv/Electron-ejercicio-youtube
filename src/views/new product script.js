const { ipcRenderer } = require('electron')

const _query = id => {
    return document.querySelector(id)
}
const _value = id => {
    return _query(id).value
}
const form = _query('#productForm')
form.addEventListener('submit', event => {
    event.preventDefault();
    const name = _value('#name');
    const price = _value('#price');
    const description = _value('#description');

    ipcRenderer.send('product:new',{name,price,description})
})