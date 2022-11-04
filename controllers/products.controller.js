const Validator = require('fastest-validator');
const slug = require('slug');
const { Products } = require('../models');

const v = new Validator();

const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      include: [
        "Categories"
      ]
    });

    if (products.length < 1) {
      return res.status(200).json({
        status: 200,
        message: "Sorry, Products is Empty"
      });
    }

    res.status(200);
    res.json({
      status: 200,
      message: "Data Products Found!",
      data: products
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when show all data products"
    });
  }
};

const addProduct = async (req, res) => {
  const schema = {
    category_id: "number|integer|required",
    name: "string|required",
    slug: "string|optional",
    price: "number|integer|required"
  }
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }

  try {
    const name = req.body.name;
    const categoryId = req.body.category_id;
    const slugNameProduct = slug(name);
    const price = req.body.price

    const product = await Products.create({
      category_id: categoryId,
      name: name,
      slug: slugNameProduct,
      price: price
    });

    res.status(201);
    res.json({
      status: 201,
      message: "Success Add New Product",
      data: product
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when added new data product"
    });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Products.findByPk(id, {
      include: [
        "Categories"
      ]
    });

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Product with id: ${id} Not Found!`
      });
    }

    res.status(404);
    res.json({
      status: 200,
      message: 'Data Product Found',
      data: data
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when show detail data product"
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    let data = await Products.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Product with id: ${id} Not Found!`
      });
    }

    const schema = {
      category_id: "number|integer|optional",
      name: "string|optional",
      slug: "string|optional",
      price: "number|integer|optional"
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    const categoryId = req.body.category_id;
    const name = req.body.name;
    const slugNameProduct = slug(name);
    const price = req.body.price;

    data = await data.update({
      category_id: categoryId,
      name: name,
      slug: slugNameProduct,
      price: price
    });

    res.status(201);
    res.json({
      status: 201,
      message: 'Success Update Data Product',
      data: data
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when updated data product"
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    let data = await Products.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Product With id: ${id} Not Found!`
      });
    }

    data = await data.destroy(data);

    res.status(200);
    res.json({
      status: 200,
      message: 'Success Delete Data Product',
      data: data
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when deleted data product"
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  getDetailProduct,
  updateProduct,
  deleteProduct,
};