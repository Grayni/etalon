const Table = require('../models/table.model')
const Row = require('../models/row.model')

module.exports.create = async (req, res) => {

  const table = new Table({
    name: req.body.name,
    rows: req.body.rows,
    present: req.body.present
  })

  try {
    await table.save()
    res.status(201).json(table)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const tables = await Table.find()
    res.status(200).json(tables)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Table.deleteOne({_id: req.params.id})
    await Row.deleteMany({tableId: req.params.id})
    res.status(200).json({message: 'Taблица успешно удалена!'})
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getByName = async (req, res) => {
  try {
    await Table.findOne({name: req.params.name}).populate('rows').exec((error, table) => {
      res.status(200).json(table)
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.present = async (req, res) => {
  const date = new Date().toISOString()
  const $set = {
    present: req.body.present,
    date
  }
  try {
    await Table.findOneAndUpdate({name: req.params.name}, {$set}, {new: true})
    res.status(200).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.rowAdd = async (req, res) => {
  
  try {
    const {tableId, uid, operations, usn_6, usn_7, osn} = req.body

    const row = new Row({tableId, uid, operations, usn_6, usn_7, osn})
    
    await row.save()
    
    const  table = await Table.findById(tableId)

    table.rows.push(row._id)
    table.save()

    res.status(201).json(row)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.rowUpdate = async (req, res) => {
  const $set = {[req.body.key]: req.body.value}
  const name = (req.params.uid).match(/[aA-zZ]([^_])+/)[0]
  const date = new Date().toISOString()

  try {
    await Row.findOneAndUpdate({uid: req.params.uid}, {$set}, {new: true})
    await Table.findOneAndUpdate({name}, {date}, {new: true} )

    res.status(200).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({date: 1}).populate('rows').exec((error, tables) => {
      res.status(200).json(tables)
    })

  } catch (e) {
    res.status(500).json(e)
  }
}