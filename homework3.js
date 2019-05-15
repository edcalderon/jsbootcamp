$(function() {   

  $('#but').click(()=>{
  		var val = $("#num").val();
	  	for (i=0; i<val; i++){
		    $("#c").append(`<svg id="${i}" width="400" height="180">
							<rect x="50" y="20" rx="20" ry="20" width="150" height="150"
							style="fill:red;stroke:black;stroke-width:5;opacity:0.5"/>
							</svg>`)
		    $('#'+i).click(function(e){
			     var counter = $(this).data('counter')
			     counter = counter || 0
			     counter++
			     $(this).data('counter', counter)
			     alert(`Element number ${this.id} has been clicked. It is click number ${counter} for this element`);
			 });
	  	}
  })
})	