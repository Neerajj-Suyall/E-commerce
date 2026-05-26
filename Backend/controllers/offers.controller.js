import productdb from "../models/products.model.js"

         const offersList = (async(req, res)=>{
        const offers =  await productdb.aggregate([{$sort:{discount:-1}}, {$limit:25}])
         res.status(200).json(offers).end()
      })




export { offersList}