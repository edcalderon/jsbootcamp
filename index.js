
const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const path = require('path')
const hbs = require('hbs');
const PORT = process.env.PORT || 5000;
const loki = require('lokijs')
const viewsDir = path.join(__dirname, './templates/views');
require('./helpers/helpers');

var data = {}

var db = new loki('Data');
var vehicles = db.getCollection('vehicles');
if(!vehicles){
    vehicles = db.addCollection('vehicles');
}
vehicles.on('insert', function(input) { input.id = input.$loki; });


express()
.use(bodyParser.urlencoded({extended: false}))
.use(bodyParser.json())
.use(express.static(path.join(__dirname, 'public')))
.set('view engine', 'hbs')
.set('views',viewsDir)

.get('/',  (req, res) => {
    res.render('index', {
        list: vehicles
    });
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
    let plateNumber = req.body.plateNumber
    let model = req.body.model
    let ownerName = req.body.ownerName
    let ownerPhone = req.body.ownerPhone
    let arrivalDate = req.body.arrivalDate
    let inHour = req.body.inHour
    let data = {plateNumber:plateNumber.toUpperCase(),model:model,ownerName:ownerName.toUpperCase(),ownerPhone:ownerPhone,arrivalDate:arrivalDate,inHour:inHour,outHour:''}
    let vehicle = vehicles.insert(data)
    
    res.render('index', {
        list: vehicles
    });

})

.put('/parking/:id',  (req, res) => {
    let id = req.params.id
    let data = req.body;
    console.log(data)
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

