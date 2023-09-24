const Products = require('../../models/products');
const multer = require('multer');
const path = require('path');
const Config = require('../../config.json');
const FILE_PATH =
  Config.MODE.toUpperCase() == 'PROD' ? Config.ONLINE_URL : Config.LOCAL_URL;
var cloudinary = require('cloudinary').v2;

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return res;
}

cloudinary.config({
  cloud_name: 'dsr7fgsfi',
  api_key: '476945147655376',
  api_secret: 'SZtX0-BGtAEIGE5_FyAsXmTtT0Q',
  secure: true,
});

const avatar = multer({ storage: multer.memoryStorage() }).single('avatar');

const routes = function (app) {
  app.get('/product', async (req, res) => {
    try {
      const product = await Products.find();
      res.json(product);
    } catch (err) {
      console.log(err);
      res.send('Error fetching URL');
    }
  });

  app.post('/product', avatar, async (req, res) => {
    try {
      const product = new Products(req.body);

      if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        const data = await handleUpload(dataURI);

        product.avatar = data.url;
        await product.save();
        res.json({ msg: 'data saved', code: 200 });
      } else {
        res.json({
          msg: 'Product cannot be saved without any image',
          code: 400,
        });
      }
    } catch (err) {
      console.log(err.message);
      res.send('server error occurs');
    }
  });

  app.delete('/product/:id', (req, res) => {
    const productId = req.params.id;

    Products.findByIdAndDelete(productId)
      .then(() => {
        res.status(200).json({ msg: 'Product deleted !!!' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to delete Product' });
      });
  });

  app.put('/product/:id', (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;

    Products.findByIdAndUpdate(productId, updatedData)
      .then(() => {
        res.status(200).json({ msg: 'Product updated !!!' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update' });
      });
  });
};

module.exports = routes;
