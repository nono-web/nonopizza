import { useState } from 'react';
import Styles from '../styles/Add.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const Add = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice =(e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  }

  const handleExtraInput =(e) => {
    setExtra({...extra, [e.target.name]: e.target.value});
  };

  const handleExtra =(e) => {
    setExtraOptions((prev)=> [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/nonoduweb/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.wrapper}>
        <h1>Ajouter une nouvelle pizza</h1>
        <div className={Styles.item}>
          <label className={Styles.label}> Choisie une image</label>
          <input type="file" onChange={(e)=> setFile(e.target.files[0])} />
        </div>
        <div className={Styles.item}>
          <label className={Styles.label}> Titre</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={Styles.item}>
          <label className={Styles.label}> Description</label>
          <textarea
            type="text"
            row={25}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={Styles.item}>
          <label className={Styles.label}> Prix</label>
          <input
          className={`${Styles.input} ${Styles.inputSm}`}
            type="number"
            placeholder="Petite"
            onChange={(e) => changePrice(e, 0)}
          />
          <input
          className={`${Styles.input} ${Styles.inputSm}`}
            type="number"
            placeholder="Moyenne"
            onChange={(e) => changePrice(e, 1)}
          />
          <input
          className={`${Styles.input} ${Styles.inputSm}`}
            type="number"
            placeholder="Grande"
            onChange={(e) => changePrice(e, 2)}
          />
        </div>
        <div className={Styles.item}>
          <label className={Styles.label}>Extra</label>
          <div className={Styles.extra}>
          <input
          className={`${Styles.input} ${Styles.inputSm}`}
            type="Text"
            placeholder="Article"
            name="text"
            onChange={handleExtraInput}
          />
            <input
          className={`${Styles.input} ${Styles.inputSm}`}
            type="Number"
            placeholder="Prix"
            name="price"
            onChange={handleExtraInput}
          />
          <button className={Styles.extraButton} onClick={handleExtra} >
            Ajouter
          </button>
          </div>
          <div className={Styles.extraItem}>
            {extraOptions.map(options=>(
              <span key={options.text} className={Styles.extraItems}>{options.text} </span>
            ))}
          </div>
        </div>
        <button className={Styles.addButton} onClick={handleCreate}>
          Creer 
        </button>
      </div>
    </div>
  );
};

export default Add;
