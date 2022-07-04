import React from 'react';
import { useStateValue } from '../../StateProvider';
import './Modal.css';

const Modal = () => {
  const [{ modal, modal_message, modal_prompt, modal_type }, dispatch] =
    useStateValue();

  return (
    <div
      className='modal__screen'
      style={{ display: modal === true ? 'block' : 'none' }}
    >
      {/* <div class='middle'> */}
      <section>
        <div className='ball one'></div>
        <div className='ball two'></div>

        {/* <div className='box one'></div>
        <div className='box two'></div>
        <div className='box three'></div>
        <div className='box four'></div> */}
      </section>

      {/* <div class='bar bar1'></div>
        <div class='bar bar2'></div>
        <div class='bar bar3'></div>
        <div class='bar bar4'></div>
        <div class='bar bar5'></div>
        <div class='bar bar6'></div>
        <div class='bar bar7'></div>
        <div class='bar bar8'></div> */}
      {/* </div> */}
    </div>
  );
};

export default Modal;
