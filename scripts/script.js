//*** SECTION: PROFILE ***

var profilePromise = $.getJSON('https://api.github.com/users/ljnocca')
//getJson (a method contained in jQuery) makes a request to the server at that location
//it returns a 'promise' that will resolve when the response to the request comes back.


function profiletoHTML (profileObj){
//this function assigns html to the API information from GitHub	
	var profileNode = document.querySelector('.profile')
	var profileObjToHTML = ''
	profileObjToHTML += '<img src="' + profileObj.avatar_url + '">'
	profileObjToHTML += '<h1 class = "name">' + profileObj.name + '</h1>'
	profileObjToHTML += '<h2 class = "username">' + profileObj.login + '</h2>'
	profileObjToHTML += '<p class = "bio">' + profileObj.bio + '</p>'
	profileObjToHTML += '<ul class = "contactInfo">'
	profileObjToHTML += 	'<li class = "location">' + profileObj.location + '</li>'
	profileObjToHTML += 	'<li class = "email"><a href="mailto:' + profileObj.email + '">'+ profileObj.email +'</a></li>'
	profileObjToHTML += 	'<li class = "website"><a href="' + profileObj.blog + '">' + profileObj.blog + '</a></li>'
	profileObjToHTML += '</ul>'

	profileNode.innerHTML = profileObjToHTML
}

profilePromise.then(profiletoHTML)
//promise runs the profiletoHTML function once the information is received from the server



//*** SECTION: REPOS ***

var reposPromise = $.getJSON('https://api.github.com/users/ljnocca/repos')

function repoToHTMLstring (singleRepoObject){
	var objectToHTML = ''
	objectToHTML += '<ul class = "repoList">'
	objectToHTML +=		'<li>'
	objectToHTML += 		'<div><h1 class = "repoName">' + singleRepoObject.name + '</h1></div>'
	objectToHTML += 		'<div><p class = "language">' + singleRepoObject.language + '</p></div>'	
	// objectToHTML += '<p class = "lastUpdate"' + singleRepoObject.updated_at + '</p>'  <--- will not display date
	objectToHTML +=		'</li>'
	objectToHTML += '</ul>'

	return objectToHTML
}

function arrayToCode (arrayOfRepos){
	var arrayToHTML = ''
	var repoNode = document.querySelector('.repos')
	for (var i = 0; i<arrayOfRepos.length; i++){
		arrayToHTML += repoToHTMLstring(arrayOfRepos[i])
	}

	repoNode.innerHTML = arrayToHTML
}

reposPromise.then(arrayToCode)


