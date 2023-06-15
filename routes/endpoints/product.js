const Product = require('../../models/product');
const multer = require('multer');
const path = require('path');
const Config  = require('../../config.json')
const FILE_PATH =  Config.MODE.toUpperCase() == "PROD" ? Config.ONLINE_URL : Config.LOCAL_URL;

const storage = multer.diskStorage({
  destination: function (req, file, cb)  {
    cb(null, 'avatar/');
  },
  filename: function (req, file, cb)  {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${file.originalname}-${Date.now()}.${ext}`);
  },
});

const avatar = multer({storage: storage});

const routes = function (app) {
  app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.log(err);
      res.send('Error fetching URL');
    }
  });

  app.post('/products', avatar.any(), async (req, res) => {
    try {
      const product = new Product(req.body);

      req.files.forEach(async(e) => {
        
        if (e.fieldname == 'avatar') {

          product.avatar = FILE_PATH + e.originalname;
          await product.save();
          res.json({ msg: 'data saved', code: 200 });

        }else{
          res.json({ msg: 'Product cannot be saved without any image', code: 400 });
        }

      });

      
    } catch (err) {
      console.log(err.message);
      res.send('server error occurs');
    }
  });

  app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
      .then(() => {
        res.status(200).json({ msg: 'Product deleted !!!' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to delete Product' });
      });
  });

  app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;

    Product.findByIdAndUpdate(productId, updatedData)
      .then(() => {
        res.status(200).json({ msg: 'Product updated !!!' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update' });
      });
  });
};

module.exports = routes;
