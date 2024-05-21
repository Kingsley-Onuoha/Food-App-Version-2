const express = require("express")
const Stripe = require("stripe")

require("dotenv").config()

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

router.post("/create-checkout-session", async (req, res) => {

  const line_items = req.body.items.map((item)=>{
    return{
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.card.info.name,
        },
        unit_amount: item.card.info.price*10,
      },
      quantity: item.cartQuantity,
    }
  })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE", "NG", "IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "inr",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 250000,
            currency: "inr",
          },
          display_name: "Express delivery",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/restaurants/cart`,
    });
  
    res.send({url: session.url});
  });
  
  module.exports = router