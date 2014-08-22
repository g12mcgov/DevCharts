
var client = new Dropbox.Client({key: '########', secret: '#########'});

var token = "";
var PATH = "/Developer";

client.authenticate(function () {
    if (client.isAuthenticated()) {
		console.log("Dropbox has been authenticated");
		token = client._oauth._token // Grab token returned
	}
	else {
		alert("Login failed!");
	} 
});

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
function displayContents(directory_path){
	client.readdir(directory_path, function(error, entries){
		if(error){
			var meta_url = "https://api.dropbox.com/1/metadata/auto/" + directory_path;
			return showError(error);
		}
		else {
			console.log(entries);
		}
	});
};

client.findByName(PATH, ".py", function(error, results){
	if(error){
		return showError(error);
	}
	else {
		console.log(results.length);
	}
});

//displayContents(PATH);

(function poll(){
   setTimeout(function(){
      $.ajax({ url: "server", success: function(data){
        //Update your dashboard gauge
        salesGauge.setValue(data.value);


        
        poll();
      }, dataType: "json"});
  }, 30000);
})();
