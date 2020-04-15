const cardInfo = {
  number: '**** **** **** ****',
  name: 'Nome do titular',
  expiration: '00/00',
  cvv: '',
  installments: 1,
  isEmpty: true
}

const step = {
  current: 2,
  total: 3
}

const api = 'http://localhost:3004';

function cleanForm() {

  const inputs = document.querySelectorAll('form input');
  const select = document.querySelector('form select');

  inputs.forEach(input => input.value = "");
  select.value = "default";

}

function toggleModal(element) {

  const modal = document.querySelector(element);

  modal.classList.contains('show') ?
  modal.classList.remove('show') :
  modal.classList.add('show');

}

function hideElements(element) {

  document.querySelectorAll(element).forEach(el => el.classList.add('hidden'));

}

function showElements(element) {

  document.querySelectorAll(element).forEach(el => el.classList.remove('hidden'));

}

function formatPrice(value, installments) {

  const val = (value / installments).toFixed(2);
  const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const price = currency.format(val);

  return price;

}

function validateFields(target) {

  const value = target.value;
  const parent = target.parentNode;
  const key = target.getAttribute('id');
  const regex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/;

  const check = {

    number: () => {

      if (key === 'number' && value.length !== 19) {

        parent.classList.add('warning');

      } else {

        parent.classList.remove('warning');

      }
  
      const newValue = () => {

        if (value.length > 19) {

          return { value: value.slice(0, 19), key }

        } else return { value, key }

      }

      return newValue();
  
    },

    name: () => {
  
      if (key === 'name' && !regex.test(value)) {

        parent.classList.add('warning');

      }else {

        parent.classList.remove('warning');

      }
  
      return { value, key }
    
    },

    expiration: () => {

      if (key === 'expiration') {
        
        const exp = Array.from(value);
        const nExp = exp.map(val => val !== "/" ? Number(val) : "/");
  
        if (nExp.length > 5) nExp.pop();
  
        if (
            (nExp.length < 5) ||
            (nExp[0] > 1) ||
            (nExp[0] === 1 && nExp[1] > 2) ||
            (nExp[0] === 0 && nExp[1] === 0) ||
            (nExp[3] < 2 || nExp[3] > 3)
          ) {
              
          parent.classList.add('warning');
  
        } else {

          parent.classList.remove('warning');

        }
  
        return { value: nExp.join(""), key }
  
      }
  
    },

    cvv: () => {
    
      const arr = Array.from(value);
      const cvv = arr.filter(val => !isNaN(val));

      if (key === 'cvv' && cvv.length !== 3) {
  
        parent.classList.add('warning');
  
      } else {
        
        parent.classList.remove('warning');

      }

      return { value: cvv.join(''), key }
  
    },

    installments: () => {

      if (key === 'installments' && value === 'default') {
  
        parent.classList.add('warning');
        
      } else {
        
        parent.classList.remove('warning');        

      }

      return { value, key }

    }

  }

  return check[key]();

}

export { api, step, cardInfo, validateFields, hideElements, showElements, formatPrice, toggleModal, cleanForm }

