import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import styles from '../styles/Home.module.css';


export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza de NonoduWeb</title>
        <meta name="description" content="Les meilleurs pizza du monde" />
        <link rel=" icon"  href="img/pizza.png"/>
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
  return {
    props: {
      pizzaList: res.data,
    },
  };
};
