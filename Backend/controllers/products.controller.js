import mongoose from "mongoose";
import productdb from "../models/products.model.js"
const productNotFound = {
  "msg": "product Not found",
  "success": false,
  "data": null
}


const productSearchList = (async (req, res) => {
  const userSearch = req.params.prodname;
  // console.log(userSearch);
  if (req.params.prodname.length >= 1) {
    // const products = await productdb.find({ name: userSearch })
    const products = await productdb.find({ name: { $regex: userSearch, $options: "i" } }).limit(28)
    // console.log(products);

    res.status(200).json(products).end()
    return
  }
  res.status(404).json(productNotFound).end()
  return
})


const nextPrevious = (async (req, res) => {
  console.log("i am here");
  const userSearch = req.params.product;
  // console.log("req.body.value= ",req.body.value);
  console.log("req.body.value= ",req.body.jump);
  
  
  

  if (req.body.jump != null ) {
    // const abcd = await productdb.find({ name: { $regex: userSearch, $options: "i" } })
    const a = await productdb.find({ name: { $regex: userSearch, $options: "i" } }).skip(req.body.jump).limit(28)

    res.status(200).json(a).end();
    return
  }
  res.status(500).end();


})




const productDetail = (async (req, res) => {
  const userSearch = req.params.prodname;
  console.log(userSearch)
  if (req.params.prodname.length >= 1) {

    const products = await productdb.find({ _id: userSearch })
    console.log(products);

    res.status(200).json(products).end()
    return
  }
  res.status(404).json(productNotFound).end()
  return
})

const MoreProductList = (async (req, res) => {
  console.log("MoreProductList = ", req.body.value);
  // if (req.body)
  const products = await productdb.find().limit(28).skip(req.body.value)
  res.status(200).json(products).end()
  // res.status(200).end()
  return
})


const productList = (async (req, res) => {


  // const products = await productdb.find().limit(28).skip(Math.floor((Math.random() * 999) + 1))
  const products = await productdb.find().limit(28)
  // console.log(products);

  res.status(200).json(products).end()
  return
})


const handleAdminProductEdit = (async (req, res) => {
  console.log("req.params.id = ", req.params.id);

  const userid = new mongoose.Types.ObjectId(req.params.id);

  let a = await productdb.updateOne({ _id: userid }, { $set: { ...req.body } })
  // console.log(a);

  res.status(200).json(a).end();
  // res.status(200).end();

})


const handleAdminProductdelete = (async (req, res) => {
  console.log("req.params.id = ", req.params.id);

  const userid = new mongoose.Types.ObjectId(req.params.id);

  let a = await productdb.deleteOne({ _id: userid })
  console.log(a);

  res.status(200).json(a).end();
  // res.status(200).end();

})

const handleAdminProductCount = (async (req, res) => {
  console.log("req.body.value = ",req.body.count);
  
  if (req.body.count >= 28) {
    let a = await productdb.find().skip(req.body.count).limit(28)
    // console.log(a);
    res.status(200).json(a).end();
    return
  }
  res.status(500).end();

})






export { productSearchList, productList, productDetail, MoreProductList, handleAdminProductEdit, handleAdminProductdelete, handleAdminProductCount, nextPrevious }