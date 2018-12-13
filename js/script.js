 $('.modal').modal();

$.ajax({
	type: "GET",
	url: "db.csv",
	dataType: "text",
	success: function(data) {processData(data);}
});

function populate(){
	for(var a = 0; a < 3; a++){
		$('#planetsList').append('<div class="col s12"><div class="card"><div class="card-image"><img src="images/p' + a + '.jpg"><span class="card-title">' + result[a]['PlanetIdentifier'] + '</span><a class="btn-floating halfway-fab waves-effect waves-light red" onclick="info(' + a + ')"><i class="fa fa-info"></i></a></div><div class="card-content"><p>' + content(a) + '</p></div></div></div>');
	}
}

function content(x){
	out = "";
	out += '<strong>' + result[x]['PlanetIdentifier'] + '</strong> is a planet'
	out += result[x]['DistFromSunParsec'] != '' ? ', ' +  result[x]['DistFromSunParsec'] + ' parsecs away from the sun' : '';
	out += '.';

	return out;
}

function info(x){
	$('#info').children('.modal-content').children('h4').text(planets[x]['PlanetIdentifier']);
	var table;
	for(var a = 0; a < headers.length; a++){
		if(planets[x][headers[a]] == '')
			continue;
		table += '<tr><td>' + headers[a] + '</td><td>' + planets[x][headers[a]] + '</td></tr>';
	}
	$('#info').children('.modal-content').children('table').children('tbody').html(table);
	$('#info').modal('open');
}

function loaded(){
	console.log(result);
	populate();
	$("#loader").fadeOut(400);
}