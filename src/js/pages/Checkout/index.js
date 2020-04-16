import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

import './style.scss';
import { emptyCard, filledCard, IconCartao } from '../../components/Images';
import { api, step, cardInfo, validateFields, hideElements } from '../../functions';
import { showElements, formatPrice, toggleModal, cleanForm } from '../../functions';

import Modal from '../../components/Modal';

export default function Checkout() {

  const [cardDisplay, setCardDisplay] = useState(emptyCard);
  const [card, setCard] = useState(cardDisplay.front);
  const [infoCard, setInfoCard] = useState(cardInfo);
  const [client, setClient] = useState('');
  const [product, setProduct] = useState({});
  const [payment, setPayment] = useState({});
  const [order, setOrder] = useState({});

  function flipCardBack(target) {
    hideElements('.checkout__card-info');
    setCard(cardDisplay.back);
  }
  
  function flipCardFront(target) {
    showElements('.checkout__card-info');
    setCard(cardDisplay.front);
    validateFields(target);
  }

  function handleCardData(target) {

    const newCard = Object.assign({}, infoCard);
    const { value, key } = validateFields(target);
    
    newCard[key] = value;
    newCard.isEmpty = false;
    setInfoCard(newCard);

  }

  async function handleBuy(event) {

    event.preventDefault();

    const data = {
      id: order.id,
      productId: product.id,
      quantity: 1,
      clientId: client,
      payment: {
        id: payment.id,
        method: payment.method,
        number: infoCard.number,
        name: infoCard.name,
        expiration: infoCard.expiration,
        cvv: infoCard.cvv,
        installments: infoCard.installments
      },
      value: product.price
    }

    await fetch(`${api}/orders`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-type": "application/json"
      })
    }).then(() => {

      cleanForm();
      toggleModal('.checkout__modal');

    });

  }

  useEffect(() => setCard(cardDisplay.front), [cardDisplay]);

  useEffect(() => {
  
    if (!infoCard.isEmpty) {

      setCardDisplay(filledCard)

    }

  }, [infoCard]);

  useEffect(() => {

    (async function handleClientData() {

      await fetch(`${api}/clients/1`)
      .then(response => response.json()
      .then(json => setClient(json.id)));      

    })();

  }, []);

  useEffect(() => {

    (async function handleProductData() {

      await fetch(`${api}/products/128366870`)
      .then(response => response.json()
      .then(({ id, price }) => setProduct({ id, price })));

    })();

  }, []);

  useEffect(() => {

    (async function handlePaymentData() {

      await fetch(`${api}/paymentMethods/2`)
      .then(response => response.json()
      .then(({ id, method }) => setPayment({ id, method })));

    })();

  }, []);

  useEffect(() => {

    (async function handleOrderData() {

      await fetch(`${api}/orders`)
      .then(response => response.json()
      .then(json => setOrder((json[json.length - 1].id) + 1)));

    })();

  }, []);

  return (
    <section className="checkout">
        <section className="checkout__wrapper">
          <section className="checkout__column checkout__column--display">
            <section className="checkout__row">
              <a href="#/" className="checkout__control checkout__control--desktop">Alterar forma de pagamento</a>
              <a href="#/" className="checkout__control checkout__control--mobile"><strong>Etapa {step.current}</strong> de {step.total}</a>
            </section>
            <section className="checkout__row checkout__row--title">
                <img src={IconCartao} alt="Adicionar cartão"/>
                <h2>Adicione um novo cartão de crédito</h2>
            </section>
            <figure className="checkout__row checkout__row--card">
                <img src={card} alt="Cartão de Crédito"/>
                <p className="checkout__card-info checkout__card-info--number">{infoCard.number}</p>
                <p className="checkout__card-info checkout__card-info--name">{infoCard.name}</p>
                <p className="checkout__card-info checkout__card-info--expiration">{infoCard.expiration}</p>
            </figure>
          </section>
          <section className="checkout__column checkout__column--information">
            <section className="checkout__row checkout__row--breadcrumb">
              <section className="checkout__step"><span className="active">1</span> Carrinho</section>
              <section className="checkout__step"><span>2</span> Pagamento</section>
              <section className="checkout__step"><span>3</span> Confirmação</section>
            </section>
            <form className="checkout__row checkout__row--form" onSubmit={e => handleBuy(e)}>
              <div className="checkout__input checkout__input--number">
                <InputMask type="text" name="number" id="number" 
                  placeholder="Número do cartão"
                  tabIndex="1"
                  mask="9999 9999 9999 9999" maskPlaceholder={null}
                  onInput={e => handleCardData(e.target)}
                  onBlur={e => validateFields(e.target)}
                  required
                />
                <label htmlFor="number">Número do cartão</label>
              </div>
              <div className="checkout__input checkout__input--name">
                <input type="text" name="name" id="name"
                  placeholder="Nome (igual ao cartão)"
                  tabIndex="2"
                  onInput={e => handleCardData(e.target)}
                  onBlur={e => validateFields(e.target)}
                  required
                />
                <label htmlFor="name">Nome (igual no cartão)</label>
              </div>
              <section className="checkout__group">
                <div className="checkout__input checkout__input--expiration">
                  <InputMask type="text" name="expiration" id="expiration" 
                    placeholder="Validade"
                    tabIndex="3"
                    mask="99/99" maskPlaceholder={null}
                    // maxLength="5"
                    onInput={e => handleCardData(e.target)}
                    onBlur={e => validateFields(e.target)}
                    required
                  />
                  <label htmlFor="expiration">Validade</label>
                </div>
                <div className="checkout__input checkout__input--cvv">
                  <InputMask type="text" name="cvv" id="cvv" 
                    placeholder='CVV'
                    tabIndex="4"
                    mask="999"
                    onFocus={e => flipCardBack(e.target)}
                    onBlur={e => flipCardFront(e.target)}
                    onInput={e => handleCardData(e.target)}
                    required
                  />
                  <label htmlFor="cvv">CVV</label>
                  <span>i</span>
                </div>
              </section>
              <div className="checkout__input checkout__input--installments">
                <span id="installmentMessage">Insira o número de parcelas</span>
                <select className="checkout__select" name="installments" id="installments" defaultValue="default" tabIndex="5" 
                  onFocus={e => e.target.classList.add('active')}
                  onChange={e => handleCardData(e.target)}
                  onBlur={e => validateFields(e.target)} >
                  <option value="default">Número de parcelas</option>
                  <option value="1">1x de {formatPrice(product.price, 1)} sem juros</option>
                  <option value="2">2x de {formatPrice(product.price, 2)} sem juros</option>
                  <option value="3">3x de {formatPrice(product.price, 3)} sem juros</option>
                  <option value="4">4x de {formatPrice(product.price, 4)} sem juros</option>
                  <option value="5">5x de {formatPrice(product.price, 5)} sem juros</option>
                </select>
              </div>
              <section className="checkout__row checkout__row--button">
                <button tabIndex="6">CONTINUAR</button>
              </section>
            </form>
          </section>
          <Modal func={() => toggleModal('.checkout__modal')} />
        </section>
      </section>
  )
}