import React from 'react';

import { check } from '../Images';

export default function Modal({ func }) {
  return (
    <>
      <section className="checkout__modal">
        <section>
          <p>Pagamento efetuado</p>
          <img src={check} alt="check"/>
          <button 
            onClick={func}>OK
          </button>
        </section>
      </section>   
    </>
  )
}