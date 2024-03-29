import React from 'react';
import Image from 'next/image';
import Styles from '../styles/Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from "../redux/cartSlice";
import OrderDetail from '../components/OrderDetail';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = 'EUR';
  const style = { Layout: 'vertical' };
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data) => {
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, data)
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    }catch(err) {
      console.log(err)
    }
  }

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
             const shipping = details.purchase_units[0].shipping;
             createOrder ({
              customer: shipping.name.full_name,
              address: shipping.address.address_line_1,
              total: cart.total,
              method: 1,
             })
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.left}>
        <table className={Styles.table}>
          <tbody>
          <tr className={Styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          </tbody>
          <tbody>
          {cart.products.map((product) => (
            <tr className={Styles.tr} key={product._id}>
              <td>
                <div className={Styles.imgContainer}>
                  <Image
                    src={product.img}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={Styles.name}>{product.title}</span>
              </td>
              <td>
                <span className={Styles.extras}>
                  {product.extras.map((extra) => (
                    <span key={extra._id}>{extra.text}, </span>
                  ))}
                </span>
              </td>
              <td>
                <span className={Styles.price}>{product.price}</span>
              </td>
              <td>
                <span className={Styles.quantity}>{product.quantity}</span>
              </td>
              <td>
                <span className={Styles.total}>
                  {product.price * product.quantity}€
                </span>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className={Styles.right}>
        <div className={Styles.wrapper}>
          <h2 className={Styles.title}> Total Panier</h2>
          <div className={Styles.totalText}>
            <b className={Styles.totalTextTitle}>Sous Total : </b> {cart.total}€
          </div>
          <div className={Styles.totalText}>
            <b className={Styles.totalTextTitle}>Reduction : </b> 0€
          </div>
          <div className={Styles.totalText}>
            <b className={Styles.totalTextTitle}>Total : </b> {cart.total}€
          </div>
          {open ? (
            <div className={Styles.paymentMethods}>
              <button className={Styles.payButton} onClick={() =>setCash(true)}>Paiement en espèces à la livraison</button>
              <PayPalScriptProvider
                options={{
                  'client-id': 'AVOP3HIbxgpAtKNjWq1aH17AXfTgLqC9nzJOjVfiVFb4p7x0ie4yAuF4UKwI7lxga9hDFVLxsSRugjem',
                  components: 'buttons',
                  currency: 'EUR',
                  'disable-funding': 'credit,card,p24',
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={Styles.button}>
              Achetez Maintenant
            </button>
          )}
        </div>
      </div>
      { cash && (
        <OrderDetail total={cart.total} createOrder={createOrder} />
      ) }
    </div>
  );
};

export default Cart;
