const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newProduct = await Product.create({
      name,
      price,
      description,
      category,
      userId: req.user.id,
    });

    return res
      .status(201)
      .json({ product: newProduct, message: "Product created successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error in creating product: ${err.message}` });
  }
};

const allProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error in fetching products: ${err.message}` });
  }
};

const userProduct = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id });
    return res.status(200).json({ products });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error in fetching products: ${err.message}` });
  }
};


const deleteProduct = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: 'Product deleted successfully'});
    }catch(err){
        return res.status(500).json({message: `Error in deleting product: ${err.message}`});
    }
}

const updateProduct = async (req, res) => {
    try {
        // Find the product by ID
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Destructure and fallback to existing values if not provided
        const {
            name = product.name,
            price = product.price,
            description = product.description,
            category = product.category,
        } = req.body;

        // Validate required fields
        if (!name || !price || !description || !category) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        // Update the product
        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;

        // Save the updated product
        await product.save();

        return res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
        return res.status(500).json({ message: `Error in updating product: ${err.message}` });
    }
};


module.exports = { createProduct, allProduct, userProduct,deleteProduct,updateProduct };
