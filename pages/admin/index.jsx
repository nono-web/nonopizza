import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import Add from '../../components/Add';
import Styles from '../../styles/Admin.module.css';

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = [
    'en préparation',
    'en chemin',
    'délivrer',
    'Commande effectuer',
  ];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/products/` + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/orders/` + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.item}>
        <h1 className={Styles.title}>Produits</h1>
        <table className={Styles.table}>
          <tbody>
            <tr className={Styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={Styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectif="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td> {product.title} </td>
                <td>{product.prices[0]}€</td>
                <td>
                  <button className={Styles.button}>Modfier</button>
                  <button
                    className={Styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <Add />
      </div>
      <div className={Styles.item}>
        <h1 className={Styles.title}>Commandes</h1>
        <table className={Styles.table}>
          <tbody>
            <tr className={Styles.trTitle}>
              <th>Id</th>
              <th>Client</th>
              <th>Total</th>
              <th>Paiement</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={Styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>{order.total}€ </td>
                <td>
                  {order.method === 0 ? (
                    <span> En espèces </span>
                  ) : (
                    <span>Payé</span>
                  )}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className={Styles.buttonStage}
                    onClick={() => handleStatus(order._id)}
                  >
                    Prochaine étape
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  const productRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
  const orderRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
