/*
*
*	Author: Grant McGovern
*	Date: 23 August 2014
*
*	~ DevCharts ~
*
*
*/

/* Include the config file */
$("head").append('<script type="text/javascript" src="config.js"></script>');

$(document).ready(function () {
	var client = new Dropbox.Client({key: client_key, secret: client_secret});


	/* Relative Globals */
	var counts = [];
	var PATH = directory_path;

	authenticate();
	
	function authenticate(){
		client.authenticate(function () {
		    if (client.isAuthenticated()) {
				console.log("Dropbox has been authenticated");
				token = client._oauth._token // Grab token returned
			}
			else {
				alert("Login failed!");
			} 
		});
	};

	/* Get Account Info if we really want it */
	function accountInfo(){
		client.getAccountInfo(function(error, accountInfo) {
		if(error){
			return showError(error);
		}
		
		console.log(accountInfo);
		
		});
	};

	/* Get the contents from a diretory */
	function getContents(directory_path, file_extensions){
		client.readdir(directory_path, function(error, entries){
			if(error){
				var meta_url = "https://api.dropbox.com/1/metadata/auto/" + directory_path;
				return showError(error);
			}
			else {
				//console.log(entries);
			}
		});
	};


	function constructGraph(dataArrayFinal) {
	    $('#container').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotShadow: false
	        },
	        title: {
	            text: chart_title // Imported from config.js
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.2f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	        	type: chart_type,
	        	name: 'Code Construct',
	        	data: dataArrayFinal
	        }]
	    });
	};

	/* This is hacky and gross */
	function timeoutSet() {
		setTimeout(function(){

			var name = Array();
			var data = Array();
			var dataArrayFinal = Array();
			for(var i = 0; i < counts.length; i++) { 
			   name[i] = counts[i].name; 
			   data[i] = counts[i].value;  
			}

			for(var j = 0; j < name.length; j++) { 
			   var temp = new Array(name[j],data[j]); 
			   dataArrayFinal[j] = temp;     
			}
			
			constructGraph(dataArrayFinal);

		},6000);
	};

	function python_lookup(directory_path){
		client.search(PATH, ".py", function(error, count){
			if(error){ 
				return showError(error);
			}
			counts.push({"name": "Python", "value": count.length});
		});
	};

	function js_lookup(directory_path){
		client.search(PATH, ".js", function(error, count){
			if(error){ 
				return showError(error);
			}
			counts.push({"name": "JavaScript", "value": count.length});
		});
	};

	function cplus_lookup(directory_path){
		client.search(PATH, ".cpp", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				counts.push({"name": "C++ (.cpp)", "value": count.length});
			}
		});
		client.search(PATH, ".h", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				counts.push({"name": "C++ (.h)", "value": count.length});
			}
		});
	};

	function erlang_lookup(directory_path){
		client.search(PATH, ".erl", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				console.log("No erlang in here!");
				return;
			} else {
				counts.push({"name": "Erlang", "value": count.length});
			}
		});
	};

	function html_lookup(directory_path){
		client.search(PATH, ".html", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				console.log("No HTML in here!");
				return;
			} else {
				counts.push({"name": "HTML", "value": count.length});
			}
		});
	};

	function css_lookup(directory_path){
		client.search(PATH, ".css", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				console.log("No HTML in here!");
				return;
			} else {
				counts.push({"name": "CSS", "value": count.length});
			}
		});
	}

	function scala_lookup(directory_path){
		client.search(PATH, ".scala", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				console.log("No Scala in here!");
				return;
			} else {
				counts.push({"name": "Scala", "value": count.length});
			}
		});	
	}

	function java_lookup(directory_path){
		client.search(PATH, ".java", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				console.log("No Java in here!");
				return;
			} else {
				counts.push({"name": "Java", "value": count.length});
			}
		});	
	}

	function php_lookup(directory_path){
		client.search(PATH, ".php", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				console.log("No PHP in here!");
				return;
			} else {
				counts.push({"name": "PHP", "value": count.length});
			}
		});			
	}

	function perl_lookup(directory_path){
		client.search(PATH, ".pl", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				console.log("No Perl in here!");
				return;
			} else {
				counts.push({"name": "Perl", "value": count.length});
			}
		});			
	}

	function ruby_lookup(directory_path){
		client.search(PATH, ".rb", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				console.log("No Ruby in here!");
				return;
			} else {
				counts.push({"name": "Ruby", "value": count.length});
			}
		});		
	}

	function go_lookup(directory_path){
		client.search(PATH, ".go", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				console.log("No Go in here!");
				return;
			} else {
				counts.push({"name": "Go", "value": count.length});
			}
		});		
	}

	function csharp_lookup(directory_path){
		client.search(PATH, ".cs", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				console.log("No C# in here!");
				return;
			} else {
				counts.push({"name": "C#", "value": count.length});
			}
		});		
	}

	/******************************************************/

	function checkStatus(){
		var status = true;
		client.delta(false, function(error, changes){
			if(error){
				return showError(error);
			} else {
				if(changes.shouldPullAgain == true){
					
					var count_py = python_lookup(PATH);
					var count_js = js_lookup(PATH);
					var count_cplus = cplus_lookup(PATH);
					var count_erl = erlang_lookup(PATH);
					var count_scala = scala_lookup(PATH);
					var count_html = html_lookup(PATH);
					var count_css = css_lookup(PATH);
					var count_java = java_lookup(PATH);
					var count_perl = perl_lookup(PATH);
					var count_ruby = ruby_lookup(PATH);
					var count_go = go_lookup(PATH);
					var count_cs = csharp_lookup(PATH);					
					
					timeoutSet();
				}
			}
		});
	};

	(function poll(){
	   setTimeout(function(){
	   	console.log("checking");
	   	checkStatus();
	   	
	   	// Refresh our counts
	   	counts = [];

	   	// Call recurvisely
	   	poll();

	  }, 30000);
	})();

});
