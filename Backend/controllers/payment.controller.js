import productdb from "../models/products.model.js"
import crypto from "crypto";
import cartsdb from "../models/carts.model.js";
import "dotenv"

import Orderlists from "../models/orders.model.js";

 const    verifyPayment = async (req, res) => {
        console.log("req.body = ",req.body);
        let id = req.authData.id
        
        try {
                const {
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature,             
                } = req.body;

                if (
                        !razorpay_order_id ||
                        !razorpay_payment_id ||
                        !razorpay_signature
                ) {
                        return res.status(400).json({
                                success: false,
                                message: "Payment details are missing",
                        });
                }

                const generatedSignature = crypto
                        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                        .digest("hex");

                const expected = Buffer.from(generatedSignature, "hex");
                const received = Buffer.from(razorpay_signature, "hex");

                const isValid =
                        expected.length === received.length &&
                        crypto.timingSafeEqual(expected, received);

                if (!isValid) {
                         res.status(400).json({
                                success: false,
                                message: "Invalid payment signature",
                        });
                }
                 console.log("payment isValid =", isValid);
                 
                // After payment signature verification succeeds

const updatedOrder = await Orderlists.findOneAndUpdate(
  { razorpayOrderId: razorpay_order_id },
  {
    $set: {
      razorpayPaymentId: razorpay_payment_id,
      paymentStatus: "paid",
      orderStatus: "confirmed",
    },
  },
  { new: true }
);

console.log("updatedOrder = ", updatedOrder);


if (!updatedOrder) {
  return res.status(404).json({
    success: false,
    message: "Order not found",
  });
}

let productids = updatedOrder.orderdetail.map((ittr) => ittr.productid)
console.log("let productids = productdata.map((ittr) => ittr.productid) = ",productids);

 let ksajbakjb = await cartsdb.updateMany({ userid: id }, { $pull: { cartData: { productid: { $in: productids } } } })

 console.log( "uncart data = ", ksajbakjb);
 

return res.status(200).json({
  success: true,
  message: "Payment verified and order updated",
  order: updatedOrder,
});
                // Next: find the matching pending order,
                // confirm its amount and payment status,
                // and update it to paid.

                //  res.status(200).json({
                //         success: true,
                //         message: "Payment signature verified",
                //         paymentId: razorpay_payment_id,
                // });
        } catch (error) {
                console.error("Payment verification error:", error);

                 res.status(500).json({
                        success: false,
                        message: "Payment verification failed",
                });
        }
};




export { verifyPayment }