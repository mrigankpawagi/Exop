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
	data = {
    		datasets: [{
        			data: flags,
        			backgroundColor: ["#2ECC40", "#FF851B"]
    		}],
    		labels: [
        			'Confirmed Planets', 
        			'Controversial Planets'
    		]
	};
	var ctx = document.getElementById("conformityChart").getContext('2d');
	var conformityChart = new Chart(ctx,{
    		type: 'doughnut',
    		data: data,
    		options: Chart.defaults.doughnut
	});
}

function discoveryMethodChart(){
	var flags = [0, 0, 0, 0, 0]
	for(var x = 0; x < planets.length; x++){
		if(planets[x]['DiscoveryMethod'] == 'RV'){
			flags[0] += 1;
		}
		else if(planets[x]['DiscoveryMethod'] == 'imaging'){
			flags[1] += 1;
		}
		else if(planets[x]['DiscoveryMethod'] == 'microlensing'){
			flags[2] += 1;
		}
		else if(planets[x]['DiscoveryMethod'] == 'timing'){
			flags[3] += 1;
		}
		else if(planets[x]['DiscoveryMethod'] == 'transit'){
			flags[4] += 1;
		}
	}
	data = {
    		datasets: [{
        			data: flags,
        			backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", '#0FC5D6']
    		}],
    		labels: [
        			'RV',
        			'Imaging',
        			'Microlensing',
        			'Timing',
        			'Transit'
    		]
	};
	var ctx = document.getElementById("discoveryMethodChart").getContext('2d');
	var discoveryMethodChart = new Chart(ctx,{
    		type: 'doughnut',
    		data: data,
    		options: Chart.defaults.doughnut
	});
}

function discoveryYearChart(){
	var years = [], yearLabels = [], yearLabelsShort = [];
	for(var i = 1; i <= new Date().getFullYear(); i++)
		years[i] = 0;
	for(var i = 1781, j = 0; i <= new Date().getFullYear(); i++){
		yearLabels[j] = i;
		j++;
	}
	for(var x = 0; x < planets.length; x++){
		if(planets[x]['DiscoveryYear'] == '')
			continue;
		years[planets[x]['DiscoveryYear'] - 0]++;
	}
	
	data = {
    		datasets: [{
        			data: years.slice(1781, years.length),
        			label: 'Number of Discoveries by Year',
        			borderColor: '#FF5722',
        			backgroundColor: '#FFFFFF00',
        			pointBorderWidth: 0,
        			pointRadius: 0,
        			lineTension: 0
    		}],
    		labels: yearLabels
	};
	var ctx = document.getElementById("discoveryYearChart").getContext('2d');
	var discoveryYearChart = new Chart(ctx,{
    		type: 'line',
    		data: data,
    		options: Chart.defaults.line
	});


	for(var i = 1990, j = 0; i <= new Date().getFullYear(); i++){
		yearLabelsShort[j] = i;
		j++;
	}
	dataShort = {
    		datasets: [{
        			data: years.slice(1990, years.length),
        			label: 'Number of Discoveries by Year',
        			borderColor: '#FF5722',
        			backgroundColor: '#FFFFFF00',
        			pointBorderWidth: 0,
        			pointRadius: 0,
        			lineTension: 0
    		}],
    		labels: yearLabelsShort
	};

	var ctx = document.getElementById("discoveryYearShortChart").getContext('2d');
	var discoveryYearShortChart = new Chart(ctx,{
    		type: 'line',
    		data: dataShort,
    		options: Chart.defaults.line
	});
}

function loaded(){
	populate();
	$("#loader").fadeOut(400);
	typeFlagChart();
	conformityChart();
	discoveryMethodChart();
	discoveryYearChart();
}