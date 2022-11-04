const Validator = require('fastest-validator');
const db = require('../models');
const Employes = db.Employe;

const v = new Validator();

const getEmployes = async (req, res) => {
  try {
    const employes = await Employes.findAll();

    if (employes.length < 1) {
      return res.status(200).json({
        status: 200,
        message: 'Sorry, Employes is Empty'
      });
    }

    res.status(200);
    res.json({
      status: 200,
      messsage: 'Data Found',
      data: employes
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when show all data employes"
    });
  }
};

const addEmploye = async (req, res) => {
  try {
    const schema = {
      employe_name: "string|required",
      employe_role: "string|required",
      employe_phone_number: "string|required",
      employe_address: "string|optional"
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    const employe = await Employes.create(req.body);

    res.status(201);
    res.json({
      status: 201,
      message: 'Success Add New Employe',
      data: employe
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when added new data employe"
    });
  }
};

const getDetailEmploye = async (req, res) => {
  try {
    const id = req.params.id;

    const employe = await Employes.findByPk(id);

    if (!employe) {
      res.status(404);
      res.json({
        status: 404,
        message: `Employe With id: ${id} Not Found!`
      });
    }

    res.status(200);
    res.json({
      status: 200,
      message: 'Data Employe Found!',
      data: employe
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when show detail data employe"
    });
  }
};

const updateEmploye = async (req, res) => {
  try {
    const id = req.params.id;

    let employe = await Employes.findByPk(id);

    if (!employe) {
      return res.status(404).json({
        status: 404,
        message: `Employe With id: ${id} Not Found!`
      });
    }

    const schema = {
      employe_name: "string|optional",
      employe_role: "string|optional",
      employe_phone_number: "string|optional",
      employe_address: "string|optional"
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    employe = await employe.update(req.body);

    res.status(201);
    res.json({
      status: 201,
      message: 'Update Data Successfully',
      data: employe
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when updated data employe"
    });
  }
};

const deleteEmploye = async (req, res) => {
  try {
    const id = req.params.id;

    let employe = await Employes.findByPk(id);

    if (!employe) {
      return res.status(404).json({
        status: 404,
        message: `Employe With id: ${id} Not Found!`
      });
    }

    employe = await employe.destroy(employe);

    res.send(200);
    res.json({
      status: 200,
      message: 'Delete Data Successfully',
      data: employe
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when delete data employe"
    });
  }
};

module.exports = {
  getEmployes, 
  addEmploye, 
  getDetailEmploye, 
  updateEmploye, 
  deleteEmploye,
};