
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;
const loki = require('lokijs')

var data = {}

var db = new loki('Data');
var vehicles = db.getCollection('vehicles');
if(!vehicles){
    vehicles = db.addCollection('vehicles');
}
vehicles.on('insert', function(input) { input.id = input.$loki; });


express()
.use(bodyParser.json())
.use(express.static(path.join(__dirname, 'public')))
.get('/',  (req, res) => {
    res.render('index', {});
})
.get('/parking',  (req, res) => {
    res.json({data: vehicles.data})
})
.get('/parking/:id',  (req, res) => {
    let id = req.params.id
    let vehicle = vehicles.get(id)
    res.json({data: vehicle})
})
.post('/parking',  (req, res) => {
    let data = req.body;
    let vehicle = vehicles.insert(data);
    res.json({data: vehicle})
})
.put('/parking/:id',  (req, res) => {
    let id = req.params.id
    let data = req.body;
    let vehicle = vehicles.get(id)
    for(let attr in data){
        if (attr in vehicle)
            vehicle[attr] = data[attr]
    }
    vehicle = vehicles.update(vehicle)
    res.json({vehicle})
})
.delete('/parking/:id',  (req, res) => {
    let id = req.params.id
    let vehicle = vehicles.get(id)
    let data = vehicles.remove(vehicle)
    res.json({data})
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function getRecordById(data, id) {
    let obj = find(data, { id })
    return obj
}

function editRecord(entity, id, data) {
    let obj = getRecordById(entity, id)
    assign(obj, data)
    return obj
}

function deleteRecord(entity, id) {
    let idx = entity.data.findIndex(i => i.id === id)
    entity.data.splice(idx, 1)
}