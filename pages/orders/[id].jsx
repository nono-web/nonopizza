import React from 'react';
import Image from 'next/image';
import Styles from '../../styles/Order.module.css';
import axios from 'axios';

const Order = ({ order }) => {

    const status = order.status;

    const statusClass = (index) => {
        if(index-status <1) return Styles.done
        if(index-status === 1) return Styles.inProgress
        if(index-status >1) return Styles.undone
    };

  return (
    <div className={Styles.container}>
      <div className={Styles.left}>
          <div className={Styles.row}>
          <table className={Styles.table}>
          <tr className={Styles.trTitle}>
            <th>Commande</th>
            <th>Client</th>
            <th>Adresse</th>
            <th>Total</th>
          </tr>
          <tr className={Styles.tr}>
            <td>
              <span className={Styles.id}>{order._id}</span>
            </td>
            <td>
              <span className={Styles.name}>
                {order.customer}
              </span>
            </td>
            <td>
              <span className={Styles.adresse}>{order.address}</span>
            </td>
            <td>
              <span className={Styles.total}>{order.total}€</span>
            </td>
          </tr>
        </table>
              </div>
              <div className={Styles.row}>
              <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="" />
            <span>Paiement</span>
            <div className={Styles.checkedIcon}>
              <Image
                className={Styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/bake.png" width={30} height={30} alt="" />
            <span>Préparation</span>
            <div className={Styles.checkedIcon}>
              <Image
                className={Styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>En Chemin</span>
            <div className={Styles.checkedIcon}>
              <Image
                className={Styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Délivré</span>
            <div className={Styles.checkedIcon}>
              <Image
                className={Styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.right}>
        <div className={Styles.wrapper}>
          <h2 className={Styles.title}> Total Panier</h2>
          <div className={Styles.totalText}>
            <b className={Styles.totalTextTitle}>Sous Total : </b> {order.total}€
          </div>
          <div className={Styles.totalText}>
            <b className={Styles.totalTextTitle}>Reduction : </b> 0€
          </div>
          <div className={Styles.totalText}>
            <b className={Styles.totalTextTitle}>Total : </b> {order.total}€
            </div>
          <button disabled className={Styles.button}>
            Payez !!!
          </button>
        </div>
      </div>
    </div>
  );
};


export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};

export default Order;