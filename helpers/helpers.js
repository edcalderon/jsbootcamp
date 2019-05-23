const hbs = require('hbs');
const index = require('./../index.js');

hbs.registerHelper('listVehicles', (list, sort) => {
    let text = ""
    if(sort != 'undefined'){
        if(sort == 'Owner name'){
            list.data.sort(function(a, b) {
              var nameA = a.ownerName.toUpperCase(); // ignore upper and lowercase
              var nameB = b.ownerName.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              // names must be equal
              return 0;
            });
        }
        if(sort == 'plate Number' || 'Model' || 'Owner phone'){
            list.data.sort(function (a, b) {
              if(sort == 'plate Number'){
                return a.plateNumber - b.plateNumber
              }
              if(sort == 'Model'){
                return a.model - b.model
              }
              if(sort == 'Owner phone'){
                return a.ownerPhone - b.ownerPhone
              }
            });
        }   
        if(sort == 'Arrival date' || 'In Hour' || 'Out Hour'){
            list.data.sort(function (a, b) {
               if(sort == 'Arrival date'){ 
                 var dateA = new Date(a.arrivalDate)
                 var dateB = new Date(b.arrivalDate);
                 return dateA - dateB;
                } 
                if(sort == 'In Hour'){ 
                 return Date.parse('01/01/2013 '+a.inHour) - Date.parse('01/01/2013 '+b.inHour)      
                }
                if(sort == 'Out Hour'){ 
                 return Date.parse('01/01/2013 '+a.outHour) - Date.parse('01/01/2013 '+b.outHour)      
                }
            });
        } 
    }   
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
            <td scope="row" class="cell100 column1">${plateNumber}</td>
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
