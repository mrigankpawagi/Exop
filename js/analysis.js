var planets, result = [], headers;

function processData(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	headers = allTextLines[0].split(',');
	var lines = [];
	for (var i=1; i<allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		if (data.length == headers.length) {
			var tarr = [];
			for (var j=0; j<headers.length; j++) {
				tarr[headers[j]] = data[j];
			}
			lines.push(tarr);
		}
	}
	planets = lines;
	compare();
}

function compare(){
	for(var i = 0; i < checks.length; i++){
		var sortVal = [], sortIndex = [], sortValFinal = [], sortIndexFinal = [], sortValEND = [], sortIndexEND = [];
		for(var x = 0; x < planets.length; x++){
			if(planets[x][checks[i]] != ''){
				planets[x][checks[i] + '_difference'] = Math.abs(avg(checks[i]) - planets[x][checks[i]]);
				if(sortVal.length == 0){
					sortVal[0] = planets[x][checks[i] + '_difference'];
					sortIndex[0] = x;
				}
				else {
					for(var a = 0; a < sortVal.length; a++){
						if(planets[x][checks[i] + '_difference'] < sortVal[a]){
							sortVal.splice(a, 0, planets[x][checks[i] + '_difference']);
							sortIndex.splice(a, 0, x);
							break;
						}
						if(a == sortVal.length - 1){
							sortVal.push(planets[x][checks[i] + '_difference']);
							sortIndex.push(x);	
							break;
						}
					}
				}
			}
			else{
				sortValEND.push(planets[x][checks[i] + '_difference']);
				sortIndexEND.push(x);
			}
			sortValFinal = sortVal.concat(sortValEND);
			sortIndexFinal = sortIndex.concat(sortIndexEND);
		}
		for(var m = 0; m < sortIndexFinal.length; m++){
			if(planets[sortIndexFinal[m]][checks[i]] == ''){				
				planets[sortIndexFinal[m]][checks[i] + '_rank'] = sortIndexFinal.length - 1;
				continue;
			}
			planets[sortIndexFinal[m]][checks[i] + '_rank'] = m;
		}
	}
	var overallSort = [], overallSortVals = [];
	for(var p = 0; p < planets.length; p++){
		var score = 0;
		for(var q = 0; q < checks.length; q++){
			score += planets[p][checks[q] + '_rank'];
		}
		planets[p]['overallScore'] = score;
		if(overallSortVals.length == 0){
			overallSortVals[0] = score;
			overallSort[0] = p;
		}
		else{
			for(var r = 0; r < overallSortVals.length; r++){
				if(score < overallSortVals[r]){
					overallSortVals.splice(r, 0, score);
					overallSort.splice(r, 0, p);
					break;
				}
				if(r == overallSortVals.length - 1){
					overallSortVals.push(score);
					overallSort.push(p);	
					break;
				}
			}
		}
	}
	for(var w = 0; w < overallSort.length; w++){
		if(result.length == 3){
			break;
		}
		if (solar.indexOf(planets[overallSort[w]]['PlanetIdentifier']) != -1) {
			continue;
		}
		result.push(planets[overallSort[w]]);
	}
	loaded();
}


function avg(prop){
	return (Earth[prop] + Mars[prop]) / 2;
}

const checks = [
	'PlanetaryMassJpt',
	'RadiusJpt',
	'PeriodDays',
	'SemiMajorAxisAU',
	'Eccentricity',
	'PeriastronDeg',
	'LongitudeDeg',
	'AscendingNodeDeg',
	'InclinationDeg',
	'SurfaceTempK',
	'AgeGyr',
	// 'RightAscension',
	// 'Declination',
	'HostStarMassSlrMass',
	'HostStarRadiusSlrRad',
	'HostStarMetallicity',
	'HostStarTempK',
	'HostStarAgeGyr'
];

const Earth = {
	PlanetaryMassJpt: 0.00315,
	RadiusJpt: 0.0911301511922301,
	PeriodDays: 365,
	SemiMajorAxisAU: 1.00000102,
	Eccentricity: 0.0167086,
	PeriastronDeg: 102.93005885,
	LongitudeDeg: 100.46691572,
	AscendingNodeDeg: -11.26064,
	InclinationDeg: -0.00054346,
	SurfaceTempK: 288,
	AgeGyr: 4.543,
	// RightAscension: ,
	// Declination: ,
	HostStarMassSlrMass: 1,
	HostStarRadiusSlrRad: 1,
	HostStarMetallicity: 0.0122,
	HostStarTempK: 5778,
	HostStarAgeGyr: 4.603
};

const Mars = {
	PlanetaryMassJpt: 0.00034,
	RadiusJpt: 0.048483071333552,
	PeriodDays: 687,
	SemiMajorAxisAU: 1.523679,
	Eccentricity: 0.0934,
	PeriastronDeg: -23.91744784,
	LongitudeDeg: -4.56813164,
	AscendingNodeDeg: 49.558,
	InclinationDeg: 1.85181869,
	SurfaceTempK: 210,
	AgeGyr: 4.603,
	// RightAscension: ,
	// Declination: ,
	HostStarMassSlrMass: 1,
	HostStarRadiusSlrRad: 1,
	HostStarMetallicity: 0.0122,
	HostStarTempK: 5778,
	HostStarAgeGyr: 4.603
};

const solar = [
	'Mercury',
	'Venus',
	'Earth',
	'Mars',
	'Jupiter',
	'Saturn',
	'Uranus',
	'Neptune',
	'Pluto'
];