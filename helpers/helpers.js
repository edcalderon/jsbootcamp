const hbs = require('hbs');
const index = require('./../index.js');

hbs.registerHelper('listVehicles', (list) => {
    let text = ""
    list.data.forEach( veh => {
        let plateNumber = veh.plateNumber
        let model = veh.model
        let ownerName = veh.ownerName
        let ownerPhone = veh.ownerPhone
        let arrivalDate = veh.arrivalDate
        let inHour = veh.inHour
        let outHour = veh.outHour
        let id = veh.id

        text =  text + `<tr class="row100 body">
            <td class="cell100 column1">${plateNumber}</td>
            <td class="cell100 column2">${model}</td>
            <td class="cell100 column3">${ownerName}</td>
            <td class="cell100 column4">${ownerPhone}</td>
            <td class="cell100 column5">${arrivalDate}</td>
            <td class="cell100 column6">${inHour}</td>
            <td class="cell100 column7">${outHour}</td>
            <td class="cell100 column8">
                <div class="inblock" >
                    <i id="edit" data-id=${id} class="fa fa-pencil" ></i>
                    <i id="delete" data-id=${id} class="fa fa-trash"></i>
                    <input type="checkbox" data-id=${id} class="check"/> 
                </div>
            </td>
            </tr>`               
    })
    return text

});
