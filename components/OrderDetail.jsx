import React, { useState } from 'react'
import Styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
      createOrder({ customer, address, total, method: 0 })
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.wrapper}>
        <h1 className={Styles.title}>Vous paierez 12€ après la livraison.</h1>
        <div className={Styles.item}>
          <label className={Styles.label}>Nom Prenom</label>
          <input placeholder="John Doe" type="text" className={Styles.input} onChange={(e)=> setCustomer(e.target.value)}/>
        </div>
        <div className={Styles.item}>
          <label className={Styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className={Styles.input}
          />
        </div>
        <div className={Styles.item}>
          <label className={Styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className={Styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={Styles.button} onClick={handleClick}>
          Commander !!!
        </button>
      </div>
    </div>
  )
}

export default OrderDetail