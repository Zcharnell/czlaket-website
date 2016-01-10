function ZcharAppService($resource, $state){
	var data;
	var id;
	var todos = {};
	var images = {image:{url:'/'}};

	//var rest = $resource('/ui/api/profile/v3/accounts/lookup/:id.json', null, {
	var rest = $resource('/api/:id/todos/:todoID', null, {
		'query':{method:'get', isArray:false},
		'save':{method:'POST', isArray:false},
		'update':{method:'PUT'},
		'remove':{method:'DELETE', isArray:true}
	});

	var restFiles = $resource('/sign_s3', null, {
		'query':{method:'get', isArray:false},
		'save':{method:'POST', isArray:false},
		'update':{method:'PUT'},
		'remove':{method:'DELETE', isArray:true}
	});

	// var loadData = function(){
	// 	if(id) data = rest.query({id:id}).$promise.then(dataLoaded);
	// };

	var loadData = function(){
		if(id) data = rest.query({id:id}).$promise
			.then(function(data){
				dataLoaded(data);
			}, function (error){
				data = null;
			});
	};

	var getData = function(_id){
		id = 'zcharapp';
		if(!data) loadData();
		return data;
	};

	var dataLoaded = function(result){
		data = result;
		todos = data.todos;
		// var body = {text:"hihihi22"};
		// var post = rest.save({id:id},body).$promise
		// 	.then(function(data){
		// 		updateData(data);
		// 	}, function (error){
		// 		console.log(error);
		// 	});

		// deleteTodos();

		//setupPrograms();
		//setupVariables();
		//PrefsGuiContacts.setupContacts(data);
		//PrefsGuiErrors.setupErrors(data);
		//setupAlerts();
		//setupDefaultStates();
	};

	var updateData = function(result){
		data = result;
	}

	var getTodos = function(){
		return todos;
	}

	var getTodo = function(todoID){
		for(var i in data){
			if(data[i]._id == todoID){
				return data[i].text;
			}
		}
	}

	var deleteTodos = function(){
		for(var i in data){
			var remove = rest.remove({id:id,todoID:data[i]._id}).$promise
				.then(function(data){
					console.log(data);
				}, function (error){
					console.log(error);
				});
		}
	}

	var getSignedRequest = function(file,success){
	    var signedRequest = restFiles.query({id:id,file_name:file.name,file_type:file.type}).$promise
			.then(function(res){
				// console.log(res.signed_request,res.url);
				uploadFile(file,res.signed_request,res.url,success);
			}, function (error){
				console.log('Could not get signed URL. ',error);
			});
		return signedRequest;

	    // xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
	    // xhr.onreadystatechange = function(){
	    //     if(xhr.readyState === 4){
	    //         if(xhr.status === 200){
	    //             var response = JSON.parse(xhr.responseText);
	    //             upload_file(file, response.signed_request, response.url);
	    //         }
	    //         else{
	    //             alert("Could not get signed URL.");
	    //         }
	    //     }
	    // };
	    // xhr.send();
	}

	// var uploadFile = function(file, signed_request, url){
	// 	var rest = $resource(signed_request, null, {
	// 		'query':{method:'get', isArray:false},
	// 		'save':{method:'POST', isArray:false},
	// 		'update':{method:'PUT'},
	// 		'remove':{method:'DELETE', isArray:true}
	// 	});
	//     var xhr = new XMLHttpRequest();
	//     xhr.open("PUT", signed_request);
	//     xhr.setRequestHeader('x-amz-acl', 'public-read');
	//     xhr.onload = function() {
	//         if (xhr.status === 200) {
	//         	console.log('Uploaded!');
	//             // document.getElementById("preview").src = url;            
	//             // document.getElementById("avatar_url").value = url;
	//         }
	//     };
	//     xhr.onerror = function() {
	//         alert("Could not upload file."); 
	//     };
	//     xhr.send(file);
	// }

	var uploadFile = function(file, signed_request, url,success){
	    var xhr = new XMLHttpRequest();
	    xhr.open("PUT", signed_request);
	    xhr.setRequestHeader('x-amz-acl', 'public-read');
	    xhr.onload = function() {
	        if (xhr.status === 200) {
	        	// console.log('Uploaded!');
	        	// // console.log(url);
	        	images.image.url = url;
	        	success(url);
	            // document.getElementById("preview").src = url;            
	            // document.getElementById("avatar_url").value = url;
	        }
	    };
	    xhr.onerror = function() {
	        console.log("Could not upload file."); 
	    };
	    xhr.send(file);
	}

	var getImages = function(){
		return images;
	}

	return{
		'getData':getData,
		'todos':getTodos,
		'todo':getTodo,
		'initUpload':getSignedRequest,
		'images':getImages
	};
}

ZcharAppService.$inject = ['$resource', '$state'];

angular.module('ZcharApp').factory('ZcharAppService', ZcharAppService);