/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Styles from '../styles/Footer.module.css';
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.item}>
        <Image src="/img/bg.png" layout="fill" alt="" />
      </div>
      <div className={Styles.item}>
        <div className={Styles.card}>
        <h2 className={Styles.motto}>
        Oh oui, nous l’avons fait. Nonoduweb Pizza, les meilleures pizzas du monde
          </h2>
          <div className={Styles.item}>
        <Image src="/img/perso.jpg" width="400px" height="300px" alt="" />
      </div>
        </div>
        <div className={Styles.card}>
          <h1 className={Styles.title}> Trouve ton restaurant</h1>
          <p className={Styles.text}>
            24 rue des Italiens
            <br /> Rome, Italie
          </p>
          <p className={Styles.text}>
            24 rue des pizza
            <br /> Londres, Angleterre
          </p>
          <p className={Styles.text}>
            24 rue des lumieres
            <br /> Paris, France
          </p>
          <p className={Styles.text}>
            24 rue des lacs
            <br /> Madrid, Espagne
          </p>
        </div>
        <div className={Styles.card}>
          <h1 className={Styles.title}> Horaire d'ouverture</h1>
          <p className={Styles.text}>
            Du Lundi au Vendredi
            <br />
            9 : 00 - 22 : 00
          </p>
          <p className={Styles.text}>
            Samedi - Dimanche
            <br />
            11 : 00 - 23 : 00
          </p>
        </div>
      </div>
    </div>
  );
};
