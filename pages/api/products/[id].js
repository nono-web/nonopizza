import dbConnect from '../../../util/mongo';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;
  dbConnect();

  if (method === 'GET') {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'PUT') {
    if(!token || token !== process.env.TOKEN){
        return res.status(401).json("Vous n'êtes pas identifier")
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'DELETE') {
    if(!token || token !== process.env.TOKEN){
        return res.status(401).json("Vous n'êtes pas identifier")
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json('Le produit a été supprimer');
    } catch (err) {
      res.status(500).json(err);
    }
  }
}