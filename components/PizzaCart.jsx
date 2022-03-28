import React from 'react';
import Image from 'next/image';
import Styles from '../styles/PizzaCart.module.css';
import Link from 'next/link';

const PizzaCart = ({ pizza }) => {
  return (
    <div className={Styles.container}>
      <Link href={`/product/${pizza._id}`} passHref>
      <Image src={pizza.img} alt="" width="700" height="500" />
      </Link>
      <h1 className={Styles.title}> {pizza.title} </h1>
      <span className={Styles.price}> {pizza.prices[0]}€</span>
      <p className={Styles.desc}>
        {pizza.desc}
      </p>
    </div>
  );
};

export default PizzaCart;
