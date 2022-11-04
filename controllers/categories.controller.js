const Validator = require('fastest-validator');
const {
  Categories
} = require('../models');
const slug = require('slug');

const v = new Validator();

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      include: [
        "Products"
      ]
    });
    if (categories.length < 1) {
      return res.status(200).json({
        status: 200,
        message: "Sorry, Categories is Empty!"
      });
    }
    res.status(200);
    res.json({
      status: 200,
      message: 'Data Categories Found!',
      data: categories
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when show all data categories"
    });
  }
};

const addCategory = async (req, res) => {
  const schema = {
    name: "string|required",
    slug: "string|optional"
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }

  try {
    const name = req.body.name;
    const slugCategory = slug(name);

    const category = await Categories.create({
      name: name,
      slug: slugCategory
    });

    res.status(201);
    res.json({
      status: 201,
      message: 'Success Add New Category!',
      data: category
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when added new data category"
    });
  }
};

const getDetailCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Categories.findByPk(id, {
      include: [
        "Products"
      ]
    });
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Category With id = ${id} Not Found!`
      });
    }
    res.status(200);
    res.json({
      status: 200,
      message: 'Data Category Found',
      data: data
    })
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when show detail data category"
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    let note = await Categories.findByPk(id);

    if (!note) {
      return res.status(404).json({
        status: 404,
        message: `Category With id: ${id} Not Found!`
      });
    }

    const schema = {
      name: "string|optional",
      slug: "string|optional"
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      res.status(400).json(validate);
    }

    const name = req.body.name;
    const slugCategory = slug(name);

    note = await note.update({
      name: name,
      slug: slugCategory
    });

    res.status(201);
    res.json({
      status: 201,
      message: "Update Data Successfully",
      data: note
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when update data category"
    });
  }
};

const removeCategory = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await Categories.findByPk(id);
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Category With id: ${id} Not Found!`
      });
    }

    data = await data.destroy(data);
    res.status(200);
    res.json({
      status: 200,
      message: "Remove Data Successfully",
      data: data
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when delete data category"
    });
  }
};

const showProductsInCategory = async (req, res) => {
  try {
    const getSlug = req.params.slug;
    const product = await Categories.findOne({
      where: {
        slug: getSlug
      },
      include: [
        "Products"
      ]
    });

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: `Products in Category Not Found!`
      });
    }

    res.status(200);
    res.json({
      status: 200,
      message: 'Data Found',
      data: product.Products
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when show data products in category"
    });
  }
};

module.exports = {
  getCategories,
  addCategory,
  getDetailCategory,
  updateCategory,
  removeCategory,
  showProductsInCategory,
};