$.ajax({
	type: "GET",
	url: "db.csv",
	dataType: "text",
	success: function(data) {processData(data);}
});

function populate(){
	for(var a = 0; a < 3; a++){
		$('#planetsList').append('<div class="col s12"><div class="card"><div class="card-image"><img src="images/p' + a + '.jpg"><span class="card-title">' + result[a]['PlanetIdentifier'] + '</span><a class="btn-floating halfway-fab waves-effect waves-light red"><i class="fa fa-info"></i></a></div><div class="card-content"><p></p></div></div></div>');
	}
}

function loaded(){
	console.log(result);
	populate();
	$("#loader").fadeOut(400);
}
