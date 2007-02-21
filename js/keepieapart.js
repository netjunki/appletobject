
//if (document.all) {
	var detect = navigator.userAgent.toLowerCase();
	var browser,thestring;
	var version = 0;

	//if (checkIt('msie')) {
		//browser = "IE "
		//browser += detect.substr(place + thestring.length,3);
		document.title = detect + ' - ' + document.title;
	//}
//}

function checkIt(string)
{
	place = detect.indexOf(string) + 1;
	thestring = string;
	return place;
}