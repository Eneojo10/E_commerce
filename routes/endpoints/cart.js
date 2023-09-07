// const Cart = require('../../models/cart'); 

// const routes = function(app) {

//   app.post('/add-to-cart', async (req, res) => {
//     try {
//       const { userId, productId, quantity } = req.body;

//       const cart = await Cart.findOne({ userId });

//       if (!cart) {
//         const newCart = new Cart({
//           userId,
//           items: [{ product: productId, quantity }],
//           total: 0,
//         });
//         await newCart.save();
//       } else {
//         const existingItemIndex = cart.items.findIndex((item) =>
//           item.product.equals(productId)
//         );

//         if (existingItemIndex !== -1) {
//           cart.items[existingItemIndex].quantity += quantity;
//         } else {
//           cart.items.push({ product: productId, quantity });
//         }

//         cart.total = calculateCartTotal(cart.items);

//         await cart.save();
//       }

//       res.status(200).json({ message: 'Item added to cart successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

// };

// // function calculateCartTotal(items) {
// //   let total = 0;
// //   for (const item of items) {
// //     // Assuming you have a way to fetch the product price
// //     // You should retrieve the product price from the database here
// //     const productPrice = getProductPrice(item.product);

// //     total += productPrice * item.quantity;
// //   }
// //   return total;
// // }

// // // Example function to retrieve the product price from the database
// // function getProductPrice(productId) {
// //   // You would typically fetch the product price from your database here
// //   // Replace this with your actual logic to fetch the product price
// //   return 10; // Replace with the actual product price
// // }

// module.exports = routes;
