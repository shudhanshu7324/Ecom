const express = require('express');
const { createProduct,allProduct,userProduct,deleteProduct,updateProduct, filterProduct } = require('../controllers/product.controller');
const isLoggedin = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/createproduct',isLoggedin,createProduct);
router.get('/allproducts',isLoggedin,allProduct);
router.get('/userproduct',isLoggedin,userProduct);
router.delete('/deleteproduct/:id',isLoggedin,deleteProduct);
router.put('/updateproduct/:id',isLoggedin,updateProduct);
router.get('/filter',isLoggedin,filterProduct);


module.exports = router;