const {ipcRenderer} = require('electron')
const _ = require('lodash')
const products = document.querySelector('#products');
const btns = document.querySelectorAll('.btn.btn-danger')

ipcRenderer.on('product:new',(event,product) => {
  const newProductTemplate = `
  <div class="col-xs-4 p-2">
    <div class="card text-center">
        <div class="card header">
            <h5>${product.name}</h5>
        </div>
        <div class="card body">
            <h5>${product.description}</h5>
            <hr>
            <h5>${product.price}</h5>
        </div>
        <div class="card-footer">
            <button class="btn btn-danger btn-sm">
                DELETE
            </button>
        </div>  
    </div>
  </div>
  `;
  products.innerHTML += newProductTemplate;
  const btns = document.querySelectorAll('.btn.btn-danger')
  _.forEach(btns,btn => {
    btn.addEventListener('click',event => {
      event.target.parentElement.parentElement.parentElement.remove();
    })
  })
})
ipcRenderer.on('product:deleteAll',(event,a) => {
  products.innerHTML = ''
})

