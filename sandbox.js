/* Attempts to make process iterative, though 
*  Dropbox API and the way in which the Javascript 
*  SDK interact have mae this unfeasble... so far at least
*/

function look_for_files(directory_path, file_extensions){
		for (var i = 0; i < file_extensions.length; i++){
			current_file = file_extensions[i];
			timeoutSet();
			client.search(PATH, current_file, function(error, count){
				if(error){ 
					return showError(error);
				}
				console.log(current_file);
				console.log(count.length);
				counts.push(count.length);
			});
		}
	};
	

	function find_files(directory_path, current_file) {
		client.findByName(PATH, current_file, function(error, count){
			// Likely a file extension didn't exist
			if(error){ 
				return showError(error);
			}
			else {
				return count;
			}
		})
		return findByName;
	};