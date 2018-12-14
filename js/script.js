 $('.modal').modal();
$('.sidenav').sidenav();

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
	out += '<strong>' + result[x]['PlanetIdentifier'] + '</strong> is a planet';
	out += result[x]['DistFromSunParsec'] != '' ? ', ' +  result[x]['DistFromSunParsec'] + ' parsecs away from the sun' : '';
	out += '. ';
	out += result[x]['AgeGyr'] != '' ? 'It is around ' +  result[x]['AgeGyr'] + ' billion years old. ' : '';
	out += result[x]['DiscoveryYear'] != '' ? 'It was discovered in ' +  result[x]['DiscoveryYear'] + '. ' : '';
	out += result[x]['ListsPlanetIsOn'] != '' ? 'It is one of the ' +  result[x]['ListsPlanetIsOn'] + '. ' : '';


	return out;
}

function info(x){
	$('#info').children('.modal-content').children('h4').text(planets[x]['PlanetIdentifier']);
	var table;
	for(var a = 0; a < headers.length; a++){
		if(planets[x][headers[a]] == '')
			continue;
		if(headers[a] == 'TypeFlag'){			
			table += '<tr><td>' + headers[a] + '</td><td>' + ['No known stellar binary companion', 'P-type binary (circumbinary)', 'S-type binary', 'Orphan planet (no star)'][planets[x][headers[a]]] + '</td></tr>';
			continue;
		}			
		table += '<tr><td>' + headers[a] + '</td><td>' + planets[x][headers[a]] + '</td></tr>';
	}
	$('#info').children('.modal-content').children('table').children('tbody').html(table);
	$('#info').modal('open');
}

function typeFlagChart(){
	var flags = [0, 0, 0, 0]
	for(var x = 0; x < planets.length; x++){
		if(planets[x]['TypeFlag'] != ''){
			flags[planets[x]['TypeFlag']] += 1;
		}
	}
	console.log(flags);
	data = {
    		datasets: [{
        			data: flags,
        			backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B"]
    		}],
    		labels: [
        			'No known stellar binary companion', 
        			'P-type binary (circumbinary)', 
        			'S-type binary', 
        			'Orphan planet (no star)'
    		]
	};
	var ctx = document.getElementById("typeFlagChart").getContext('2d');
	var typeFlagChart = new Chart(ctx,{
    		type: 'doughnut',
    		data: data,
    		options: Chart.defaults.doughnut
	});
}
function conformityChart(){
	var flags = [0, 0]
	for(var x = 0; x < planets.length; x++){
		if(planets[x]['ListsPlanetIsOn'] == 'Confirmed planets'){
			flags[0] += 1;
		}
		else if(planets[x]['ListsPlanetIsOn'] == 'Controversial'){
			flags[1] += 1;
		}
	}
	console.log(flags);
	data = {
    		datasets: [{
        			data: flags,
        			backgroundColor: ["#2ECC40", "#FF851B"]
    		}],
    		labels: [
        			'Confirmed', 
        			'Controversial'
    		]
	};
	var ctx = document.getElementById("conformityChart").getContext('2d');
	var conformityChart = new Chart(ctx,{
    		type: 'doughnut',
    		data: data,
    		options: Chart.defaults.doughnut
	});
}

function loaded(){
	console.log(result);
	populate();
	$("#loader").fadeOut(400);
	typeFlagChart();
	conformityChart();
}
