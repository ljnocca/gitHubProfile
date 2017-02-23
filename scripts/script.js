//*** SECTION: PROFILE ***

function profiletoHTML (profileObj){ //this function assigns html to the API information from a GitHub profile	
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

//*** SECTION: REPOS ***

function repoToHTMLstring (singleRepoObject){ //this function assigns html to the API information from a GitHub repos	
	var objectToHTML = ''
	objectToHTML += '<ul class = "repoList">'
	objectToHTML +=		'<li>'
	objectToHTML += 		'<div><h1 class = "repoName">' + singleRepoObject.name + '</h1></div>'
	objectToHTML += 		'<div class = "subRepoText"><p class = "language">' + singleRepoObject.language + '</p></div>'
	objectToHTML += 		'<div class = "subRepoText"><p class = "lastUpdate">Updated ' + singleRepoObject.updated_at + '</p></div>'
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

// *** SECTION: SEARCHBAR & PROMISES
function loadDefaultProfile (){
	var profilePromise = $.getJSON('https://api.github.com/users/ljnocca')
	profilePromise.then(profiletoHTML)

	var reposPromise = $.getJSON('https://api.github.com/users/ljnocca/repos')
	reposPromise.then(arrayToCode)
}

loadDefaultProfile() //automatically display the default profile

var baseURL = 'https://api.github.com/users/'

function searchQuery (username){ //updates baseURL to input for the getJSON API reques and the '.then' method
	var profilePromise = $.getJSON(baseURL+username)
	profilePromise.then(profiletoHTML)

	var repoPromise = $.getJSON(baseURL+username+'/repos')
	repoPromise.then(arrayToCode)
}


var inputSearch = document.querySelector('.searchBar') //select the searchbar from the DOM

inputSearch.addEventListener('keydown', function(eventObj) { //run search query once username is entered in the searchbar and enter key is pressed
    if (eventObj.keyCode === 13) {
        searchQuery(eventObj.target.value)
    }
})



