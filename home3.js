$(function() {              
  var n = 4;
  var counters = {}; // DATA

  //Event handler that stores the counter of the clicks globally
  function universal(e) {
    console.log('this', this)
    if (! counters[this.id]) {
      counters[this.id] = 1;
    }
    else {
      counters[this.id]++;
    }
    alert('UNIVERSAL: ' + this.id + " has been clicked " + counters[this.id] + " time(s)");
  }
  
  //Event handler that stores the counter of the clicks internally
  function generator(who) {
    var ctr = 0; // DATA
    return function() {
      ctr++;
      alert('GENERATOR: ' + who + " has been clicked " + ctr + " time(s)");
    }
  }

  for (var i = 0 ; i < n ; i++) {
    $('#c').append(`<button id="can${i}" data-counter='3'> can${i} </button>`);
    //$('#can' + i).click(universal);
    //$('#can' + i).click(generator('can' + i));
   $('#can' + i).click(function(e){
      var counter = $(this).data('counter')
      counter = counter || 0
     counter++
     $(this).data('counter', counter)
     alert('NEW: ' + this.id + " has been clicked " + counter + " time(s)");
   });
    
  }                                                                                                                               
});
