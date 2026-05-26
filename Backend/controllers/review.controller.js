import reviewRatingsdb from "../models/review.model.js";
import Orderlists from "../models/orders.model.js";


const insertReview = (async (req, res) => {
      console.log("req.body", req.body);
      // console.log(req.body);
      let id = req.authData.id

      const validation = await Orderlists.updateOne({ _id: req.body.orderid, "orderdetail.productid": req.body.productid }, { $set: { "orderdetail.$.review": true } })
      //  const validation = await Orderlists.find({ "orderdetail.productid":req.body.productid} )


      if (validation.modifiedCount == 1) {
            const offers = await reviewRatingsdb.insertOne({ userid: id, ...req.body })
            console.log(offers);

            res.status(200).json(offers).end()
            return
      }
      res.status(500).end()
})

const productReview = (async (req, res) => {
      const userProduct = req.params.id;
      let id = req.authData.id
      console.log("reviewRatingsdb userProduct  = ", userProduct);
      console.log("reviewRatingsdb id  = ", id);

      const feedback = await reviewRatingsdb.find({ userid: id, productid: userProduct })
      console.log("reviewRatingsdb feedback  = ", feedback);
      
      if (feedback.length >= 1) {
            res.status(200).json(feedback).end()
            return
            // }else if (feedback.length == 0) {
            //       res.status(200).json(feedback).end()
            //       return
      }
      res.status(500).end()
})

const editReview = (async (req, res) => {
      console.log("req.body", req.body);
      let id = req.authData.id



      const offers = await reviewRatingsdb.updateOne({ userid: id, orderid: req.body.orderid, productid: req.body.productid }, { $set: { ...req.body } })
      console.log(offers);
      if (offers.modifiedCount == 1) {
            res.status(200).json(offers).end()
            return
      }
      res.status(500).end()
})

const deleteReview = (async (req, res) => {
     console.log("req.body", req.body);
      // console.log(req.body);
      let id = req.authData.id

      const validation = await Orderlists.updateOne({ _id: req.body.orderid, "orderdetail.productid": req.body.productid }, { $set: { "orderdetail.$.review": false } })
      //  const validation = await Orderlists.find({ "orderdetail.productid":req.body.productid} )
      console.log("validation = ",validation);
      


      if (validation.modifiedCount == 1) {
            const offers = await reviewRatingsdb.deleteOne({ userid: id, productid:req.body.productid, orderid:req.body.orderid })
            console.log(offers);

            res.status(200).json(offers).end()
            return
      }
      res.status(500).end()
})





export { insertReview, productReview, editReview, deleteReview }