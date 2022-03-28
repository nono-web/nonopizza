import React from 'react';
import Styles from '../../styles/Product.module.css';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();


  const changePrice = (number) => {
    setPrice(price + number);
  }

  const handleSize = (sizeIndex) => {
      const difference = pizza.prices[sizeIndex] - pizza.prices[size];
      setSize(sizeIndex);
      changePrice(difference)
  }

  const handleChange = (e, option) => {
    const checked = e.target.checked 

    if(checked) {
        changePrice(option.price)
        setExtras(prev=>[...prev, option])
    }else {
      changePrice(-option.price)
      setExtras(extras.filter((extra) => extra. _id !== option._id));
    }
  }

  const handleClick = () => {
      dispatch(addProduct({...pizza, extras, price, quantity}))
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.left}>
        <div className={Styles.imgContainer}>
          <Image src={pizza.img} layout="fill" alt="" objectFit="contain" />
        </div>
      </div>
      <div className={Styles.right}>
        <h1 className={Styles.title}> {pizza.title}</h1>
        <span className={Styles.price}>{price}€</span>
        <p className={Styles.desc}>{pizza.desc}</p>
        <h3 className={Styles.choose}>Choisie la taille</h3>
        <div className={Styles.sizes}>
          <div className={Styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={Styles.number}>Petite</span>
          </div>
          <div className={Styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={Styles.number}>Moyenne</span>
          </div>
          <div className={Styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={Styles.number}>Grande</span>
          </div>
        </div>
        <h3 className={Styles.choose}>Choisie un ingredient supplementaire</h3>
        <div className={Styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={Styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={Styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={Styles.add}>
          <input onChange={(e)=> setQuantity(e.target.value)} type="number" defaultValue={1} className={Styles.quantity} />
          <button className={Styles.button} onClick={handleClick}>Ajouter au Panier </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
