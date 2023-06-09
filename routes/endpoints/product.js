const Product = require('../../models/product');
const multer = require('multer');
const path = require('path');
const PORT = 5000;
const FILE_PATH = `http://localhost:${PORT}/avatar/`;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let _dir = path.join(__dirname, '../../avatars');
    cb(null, _dir);
  },
  filename: function (req, file, cb) {
    let filename = file.originalname.toLowerCase();
    cb(null, filename);
  },

});

const avatar = multer(( storage ));


const routes = function(app) {
  app.get('/products', async(req, res) => {
    try {
      let product = await Product.find();
      res.json(product)
    }catch(err) {
      console.log(err)
      res.send('Error fetching URL')
    }

  });


  app.post('/products', avatar.any(), async(req, res) => {
    try {
      let product = new Product(req.body);

      req.files.forEach((e) => {
        if(e.fieldname == 'avatar') {
          product.avatar = FILE_PATH + e.filename;
        }
      });

      await product.save();
      res.json({msg: 'data saved', code: 200})
    }catch(err) {
      console.log(err)
      res.send('server error occurs')
    }
  });

  app.delete('/product/:id',(req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
    .then(() => {
      res.status(200).json({msg: 'Product deleted !!!'});
    })
    .catch((error) => {
      res.status(500).json({error: 'Failed to delete Product'});
    });
  });

  app.put('/product/:id', (req, res) => {
    const productId = req.params.id;
    const updatedData =req.body;

    Product.findByIdAndUpdate(productId, updatedData)
    .then(() => {
      res.status(200).json({msg: 'Product updated !!!'})
    })
    .catch((error) => {
      res.status(500).json({error: 'Failed to update'})
    });

  });
}

module.exports = routes;