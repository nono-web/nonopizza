import React from 'react';
import Styles from '../styles/PizzaList.module.css';
import PizzaCart from './PizzaCart';

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}> Les meilleures Pizzas du monde </h1>
      <p className={Styles.desc}>
       NonoduWeb vous propose une grande variété de Pizza. Tous nos produits sont locaux. De la pâte fraiche, à la sauce tomate et aux ingrédients. Vous recherchez une bonne pizza et un service irréprochable, vous êtes au bon endroit.
      </p>
      <div className={Styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCart key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
