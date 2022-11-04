// # Import Package
const Validator = require('fastest-validator');
const {
  Notes
} = require('../models');

// # Instansiasi Package Validator
const v = new Validator();

// # Method Menampilkan Seluruh Data Catatan
const getNotes = async (req, res) => {
  try {
    const data = await Notes.findAll();
    if (data.length < 1) {
      return res.status(200).json({
        message: "Data is Undefined!"
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: 'Data is Found',
        data: data
      });
    }
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when show all data notes"
    });
  }
}

// # Method Menambahkan Data Catatan
const addNewNote = async (req, res) => {
  // # Create Validate
  const schema = {
    title: "string",
    description: "string"
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }

  try {
    // # Create Data 
    const note = await Notes.create(req.body);
    res.status(201);
    res.json({
      status: 201,
      message: "Success Added New Data Note",
      data: note
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when added new data note"
    });
  }
};

// # Method Menampilkan Detail Data
const detailNote = async (req, res) => {
  // # Catch id
  const id = req.params.id;
  try { 
    // # Find id
    const note = await Notes.findOne({
      where: {
        id: id,
      }
    });

    // # Validate when id = not found
    if (note === null) {
      return res.status(404).json({
        status: 404,
        message: `Note with id: ${id} not found!`
      });
    }

    // # Return where id = found
    res.status(200);
    res.json({
      status: 200,
      message: 'Data Found',
      data: note
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : `failed data note with id : ${id} not found`
    });
  }
};

// # Method Update Data
const updateNote = async (req, res) => {
  // # Tangkap id 
  const id = req.params.id;
  try {
    // # Cari note berdasarkan id
    let note = await Notes.findByPk(id);

    // # Validate when id = not found
    if (note === null) {
      return res.status(404).json({
        status: 404,
        message: `Note with id: ${id} not found!`
      });
    }

    // # Create validation
    const schema = {
      title: "string|optional",
      description: "string|optional"
    }
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    // # Update Data
    note = await note.update(req.body);
    res.json({
      status: 201,
      message: "Update Data Successfully",
      data: note,
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when update data note"
    });
  }
};

// # Method Hapus Data
const deleteNote = async (req, res) => {
  // # Tangkap id dikirim user
  const id = req.params.id;

  try {
    // # Cari id didalam db = id yang dikirimkan
    let note = await Notes.findByPk(id);

    // # Jika id tidak ditemukan
    if (!note) {
      return res.status(404).json({
        status: 404,
        message: `Note with id: ${id} not found!`
      });
    }

    // # Jika id ditemukan
    note = await note.destroy(note);
    res.status(200)
    res.json({
      status: 200,
      message: "Delete Data Successfully",
      data: note,
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when delete data note"
    });
  }
};

module.exports = {
  getNotes,
  addNewNote,
  detailNote,
  updateNote,
  deleteNote,
};