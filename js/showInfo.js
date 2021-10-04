let form = $('#selector-form');

$(form).on('submit', e => {
	e.preventDefault();

	let graph = $('#graph')[0];

	let base = $('#cryptos').val();
	let period = $('#period').val();

	let data = getData(base, 'USD', period, 5).
		then(data => {

				let layout =  {
					margin: {t: 0,
						r: 10,
						b: 30,
						l: 30
					},
					font: {family: "'Ubuntu', sans-serif",
					   color: "#E8F1F2"},
					paper_bgcolor: "#30323D",
					plot_bgcolor: "#30323D",
					colorway: ["#FFCA3A"],
					xaxis: {
						tickformat: "%Y-%m-%d"}
				};

				Plotly.newPlot( graph,
					[{ x: data[0],
						y: data[1] }],
					layout,
				{displayModeBar: false} 
				);
		});

});

$(window).on('load', () => {
	form.submit();
});

$("#cryptos").change(function() {
	form.submit();
});

$("#period").change(function() {
	form.submit();
});
