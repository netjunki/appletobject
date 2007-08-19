/*
 *  AppletObject
 *
 *	Florian Jenett, Stephen Williams, Aaron Steed
 *
 *	http://ez-applet-html.sourceforge.net/
 *	http://svn.sourceforge.net/viewvc/ez-applet-html/trunk/
 *	http://sourceforge.net/projects/ez-applet-html/
 *
 *  -----------------------------------------------------------
 *
 *	changed: 2007-06-01 23:38:24 - Stephen
 *  version: 0.0.7
 *
 *  -----------------------------------------------------------
 *
 *	
 *
 *  ----------------------------------------------------------- */

 
function AppletObject(){
	this.attributeNames={"height":1,"width":1,"mayscript":1,"align":1,"alt":1,"archive":1,"code":1,"codebase":1,"hspace":1,"name":1,"object":1,"title":1,"vspace":1,"id":1,"class":1,"title":1,"style":1,"dir":1,"lang":1,"xml:lang":1};
	this.params = new Array();
	
}

AppletObject.prototype.set = function(name, value){
	this.params[name] = value;
}
AppletObject.prototype.setLang = function(val){
	this.lang = ao_lang[val];
}
AppletObject.prototype.load = function(id){
	this.write(id);
}
AppletObject.prototype.write = function(id){
	if(!navigator.javaEnabled()){
		return;
	}
	var element = this.getElement(id);
	if(element!=null){
		element.innerHTML = this.createTagApplet();
	}
}
AppletObject.prototype.debug = function(id){
	var element = this.getElement(id);
	if(element!=null){
		var val = '<textarea rows="10" cols="60">';
		val += this.createTagApplet()+"</textarea>";
		element.innerHTML = val;
	}
}

/**
		AppletObject.createTagApplet()
		
		create the an applet applet tag
 */

AppletObject.prototype.createTagApplet = function ()
{
	var tag = '<applet'
	var params = '';
	for(var prop in this.params){
		if(this.attributeNames[prop]==1){
			tag += ' '+prop+'="'+this.params[prop]+'"';
		}else{
			params += '<param  name="' + prop + '" ' + 
					  'value="'+this.params[prop]+'" />';
		}
	}
	tag += '>';
	tag += params;
	tag += this.lang["fallback"];
	tag += '</applet>';
	return tag;
}

 /**
		getElement()
		
		return an DOMElement by ID
 */
 
AppletObject.prototype.getElement = function (id)
{ 
	var element = (document.getElementById) ? document.getElementById(id)
					: document.all[id];
	if(element==null){
		alert("No element with id=\""+id+"\" was found on your page. \n\nMake sure you call the function below your container object.");
	}else{
		return element;
	}
}




