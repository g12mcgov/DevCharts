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

	(function poll(){
	   setTimeout(function(){
	   	console.log("Checking...");
	   	checkStatus();
	   	
	   	// Refresh our counts
	   	counts = [];

	   	// Call recurvisely
	   	poll();

	  }, 30000);
	})();

	function checkStatus(){
		var status = true;
		client.delta(false, function(error, changes){
			if(error){
				return showError(error);
			} else {
				if(changes.shouldPullAgain == true){
					
					timeoutSet();

					python_lookup(PATH);
					js_lookup(PATH);
					cplus_lookup(PATH);
					erlang_lookup(PATH);
					scala_lookup(PATH);
					html_lookup(PATH);
					css_lookup(PATH);
					java_lookup(PATH);
					perl_lookup(PATH);
					ruby_lookup(PATH);
					go_lookup(PATH);
					csharp_lookup(PATH);					

				}
				else if (changes.shouldPullAgain == false){
					return;
				}
				else {
					return;
				}
			}
		});
	};

	/* Get Account Info if we really want it */
	function accountInfo(){
		client.getAccountInfo(function(error, accountInfo) {
		if(error){
			return showError(error);
		}
		var account_info = accountInfo	
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
			   var temp = new Array(name[j], data[j]); 
			   dataArrayFinal[j] = temp;     
			}

			constructGraph(dataArrayFinal);

		},5000);
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

	function python_lookup(directory_path){
		client.search(PATH, ".py", function(error, count){
			if(error){ 
				return showError(error);
			}
			console.log("py"+count.length);
			counts.push({"name": "Python", "value": count.length});
		});
	};

	function js_lookup(directory_path){
		client.search(PATH, ".js", function(error, count){
			if(error){ 
				return showError(error);
			}
			console.log("js"+count.length);
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
				console.log("cpp"+count.length);
				counts.push({"name": "C++ (.cpp)", "value": count.length});
			}
		});
		client.search(PATH, ".h", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("h"+count.length);
				counts.push({"name": "C++ (.h)", "value": count.length});
			}
		});
	};

	function erlang_lookup(directory_path){
		client.search(PATH, ".erl", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("erl"+count.length);
				counts.push({"name": "Erlang", "value": count.length});
			}
		});
	};

	function html_lookup(directory_path){
		client.search(PATH, ".html", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("html"+count.length);
				counts.push({"name": "HTML", "value": count.length});
			}
		});
	};

	function css_lookup(directory_path){
		client.search(PATH, ".css", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("css"+count.length);
				counts.push({"name": "CSS", "value": count.length});
			}
		});
	}

	function scala_lookup(directory_path){
		client.search(PATH, ".scala", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("scala"+count.length);
				counts.push({"name": "Scala", "value": count.length});
			}
		});	
	}

	function java_lookup(directory_path){
		client.search(PATH, ".java", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("java"+count.length);
				counts.push({"name": "Java", "value": count.length});
			}
		});	
	}

	function php_lookup(directory_path){
		client.search(PATH, ".php", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("php"+count.length);
				counts.push({"name": "PHP", "value": count.length});
			}
		});			
	}

	function perl_lookup(directory_path){
		client.search(PATH, ".pl", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("perl"+count.length);
				counts.push({"name": "Perl", "value": count.length});
			}
		});			
	}

	function ruby_lookup(directory_path){
		client.search(PATH, ".rb", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("rb"+count.length);
				counts.push({"name": "Ruby", "value": count.length});
			}
		});		
	}

	function go_lookup(directory_path){
		client.search(PATH, ".go", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("go"+count.length);
				counts.push({"name": "Go", "value": count.length});
			}
		});		
	}

	function csharp_lookup(directory_path){
		client.search(PATH, ".cs", function(error, count){
			if(error){
				return showError(error);
			} else if (count.length == 0 || count.length == null) {
				return;
			} else {
				console.log("c#"+count.length);
				counts.push({"name": "C#", "value": count.length});
			}
		});		
	}

	/******************************************************/
});
