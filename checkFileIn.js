
const checkFileIn = (url_link) => {
	if (url_link == undefined){
		console.log("Please put url to check file.");
		return;
	}
	var r = new XMLHttpRequest();
	r.open('GET', `${url_link}`, false);
	r.send(null);
	if (r.status == 200){ 
		console.log(r.responseText);
		this.log('OK');
	} else if (r.status == 404) {
		this.log('Error reaching file. Check url!');
	} else {
		this.log('Unknown error!');
	}
}
