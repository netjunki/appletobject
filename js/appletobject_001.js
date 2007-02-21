/*
 *  AppletObject by Aaron Steed (st33d), robotacid.com
 *				 && Florian Jenett (fjen), bezier.de   
 *
 *  http://robotacid.com/news/2007/01/chronic-pain-in-arse.html
 *
 *  -----------------------------------------------------------
 *
 *	changed: 2007-01-11 12:14:33 - fjenett
 *
 *	
 *
 */

// fix for some IE
var getElement = function (aID)
{ 
     return (document.getElementById) ? document.getElementById(aID)
                                      : document.all[aID];
}

// fix IE 5.01 win
if ( !Array.prototype.push ) Array.prototype.push = function() 
{
	for(var j = 0, n = arguments.length; j < n; ++j) {
		this[this.length] = arguments[j];
	}
	return this.length;
}

// fix IE 5.01 win
if ( !Number.prototype.toFixed ) Number.prototype.toFixed = function ( fractionDigits )
{
   /*var m = Math.pow(10,fractionDigits);
   return Math.round(this*m,0)/m;*/
   var fStr = this.toString();
   return (1.0 * fStr.substring(0,fStr.lastIndexOf('.')+fractionDigits+1));
}

// sort of a sprintf function
// params:
//   - string array ["a","b","c"]
//   - a number (string array length - 1)
//     variables to put in the "gaps"
// example:
//   sprinta( ["1","2","3"], "+", "=" );
//   > "1+2=3"
//
var sprinta = function ()
{
	if (    arguments.length <= 1
		|| !arguments[0].length
		||  arguments[0].length == 0 ) return "";
		
	var str = "";
	for ( var i = 0; i < arguments[0].length; i++ )
	{
		str = str + ( arguments[0][i] ? arguments[0][i] : "") + 
					( arguments[i+1]  ? arguments[i+1]  : "");
	}
	return str;
}

AppletObjects =
{
	objects : [],
	push : function ( _obj )
	{
		return this.objects.push(_obj)-1; // give the ID of the object injected
	},
	inited : function ( _id )
	{
	},
	started : function ( _id )
	{
		if ( this.objects[_id] ) this.objects[_id].started = true;
	},
	stopped : function ( _id )
	{
	},
	destroyed : function ( _id )
	{
	}
};

function AppletObject ( code, archive, width, height, mayscript ) 
{
	this.code = code;
	this.archive = archive;
	this.width = width;
	this.height = height;
	this.mayscript = mayscript;

	this.id = AppletObjects.push(this);
	this.library = "";
	this.container = null;
	this.folder = this.archive.substring(0, this.archive.lastIndexOf("/")) + "/";
	this.alt = 'To view this content, you need to install Java from <A HREF="http://java.com">java.com</A>';
	this.params = new Array();
	this.jars = new Array();
	this.currentJar = 0;
	this.loaded = false;
	this.started = false;
	this.loadApplet = null;
	this.preLoadClass = "de.bezier.js.preloading.Preloading.class";
	this.preLoadJar = "ZZZZZZ.jar";
	this.timeout = null;
	this.wait = 1000; // fork!
	this.loadChecks = 0;
}

AppletObject.prototype.getContainer = function (elmID)
{
	if (!elmID && this.container) return this.container;
	if (this.container == null ) this.container = getElement(elmID);
	return this.container;
}

// callback, override this
AppletObject.prototype.onload = function () {}

AppletObject.prototype.loadAjax = function (elmID)
{
	this.loaded = false;
	this.getContainer(elmID).innerHTML = "<b>Loading applet.</b>";
	this.jars = this.archive.split(",");
	this.currentJar = 0;
	Ajax.Responders.register( this );
	this.loadNextAjax();
}

AppletObject.prototype.onComplete = function () {
	this.loadNextAjax();
}

AppletObject.prototype.onFailure = function () {
	this.loadNextAjax();
}

AppletObject.prototype.onException = function () {
	this.loadNextAjax();
}

AppletObject.prototype.loadNextAjax = function ()
{
	if ( this.currentJar >= this.jars.length ) { this.loaded = true; return this.onload(); }
	var loading = "<b>Loading applet:</b><br />";
	
	var ajax = new Ajax.Request(
		this.jars[this.currentJar],
		{
		method: 'get'
		});
	
	this.getContainer(false).innerHTML = loading + ((this.currentJar/this.jars.length)*100).toFixed(2) + "%";
	this.currentJar++;
}

AppletObject.prototype.loadAsImage = function (elmID)
{
	this.loaded = false;
	this.getContainer(elmID).innerHTML = "<b>Loading applet.</b>";
	this.jars = this.archive.split(",");
	this.currentJar = 0;
	this.loadNextImage();
}

AppletObject.prototype.loadNextImage = function ()
{
	if ( this.currentJar >= this.jars.length ) { this.loaded = true; return this.onload(); }
	var loading = "<b>Loading applet:</b><br />";
	var appl = new Image();
	appl.onload = this.loadNextImage.bind(this);
	appl.src = this.jars[this.currentJar];
	this.getContainer(false).innerHTML = loading + ((this.currentJar/this.jars.length)*100).toFixed(2) + "%";
	//while( !appl.complete ) {}
	this.currentJar++;
}

AppletObject.prototype.checkLoad = function ()
{
	window.clearTimeout(this.timeout);
	/*window.status = "Loading applet ..."
						+ (this.started?" started":"")
						+ (this.destroyed?", destroyed.":"");*/
	
	if ( !this.loadApplet )
	{
		this.loadApplet = document.createElement("div");
		this.loadApplet.style.position = "absolute";
		this.loadApplet.style.top = '-'+this.height+'px';
		this.loadApplet.style.left = '-'+this.width+'px';
		this.loadApplet.style.zIndex = 1000;
		document.body.insertBefore(this.loadApplet, document.body.lastChild.nextSibling ); // insertAfter() .. no comment!
	}
	
	var loading = "<b>Loading applet:</b><br />";
	var papplet = this.loadApplet.firstChild;
	
	
	var isActive = ( papplet
	  				 && document.applets.length > 0
					 
					 // isActive only works for inited applets
	  				 // && (papplet.isActive ? papplet.isActive() : papplet == document.applets[document.applets.length-1])
	  				 
	  				 // raises a java.lang.NullPointerException in java1.4.2_2 plugin or later
	  				 // && papplet.isActive && papplet.isActive()
	  				 && papplet == document.applets[document.applets.length-1]
	  				 
	  				 // probably not needed ...
	  				 //&& papplet.archive == this.jars[this.currentJar-1]
	  				 
	  				 && this.loadApplet
	  				 && papplet.archive == this.loadApplet.archives
	  				 
	  				 ? true : false );
	
	if ( !this.loaded && isActive )
	{
		if ( this.currentJar >= this.jars.length )
		{
			this.loaded = true;
			this.loadApplet.parentNode.removeChild(this.loadApplet.parentNode.lastChild);
			window.status = "Loading applet ... finished!";
			return this.onload();
			//papplet.noLoop();     // calles stop() inside papplet
			//papplet.frameCount=0; // calles setup() inside papplet after start() is called
			//papplet.loop();       // calles start() inside papplet
		}
	
		if ( this.started )
		{
			this.started = false;
			this.container.innerHTML = loading + ((this.currentJar/this.jars.length)*100).toFixed(2) + "%";
			this.loadApplet.archives = this.jars[this.currentJar]+','+this.preLoadJar;//+'?'+Math.round(Math.random()*100000);
			this.loadApplet.innerHTML = '<applet '+
												 'code="'+this.preLoadClass+'" '+
												 'archive="'+this.loadApplet.archives+'" '+
												 'width="'+this.width+'" '+
												 'height="'+this.height+'" '+
												 'mayscript="true">'+
										'<param name="AObject" value="'+this.id+'" />'+
										'</applet>';
			this.currentJar++;
		}
	}
	else if ( !papplet )
	{
		this.container.innerHTML = loading + ((this.currentJar/this.jars.length)*100).toFixed(2) + "%";
		this.loadApplet.archives = this.jars[this.currentJar]+','+this.preLoadJar;//+'?'+Math.round(Math.random()*100000);
		this.loadApplet.innerHTML = '<applet '+
		                                     'code="'+this.preLoadClass+'" '+
		                                     'archive="'+this.loadApplet.archives+'" '+
		                                     'width="'+this.width+'" '+
		                                     'height="'+this.height+'" '+
		                                     'mayscript="true">'+
		                            '<param name="AObject" value="'+this.id+'" />'+
		                            '</applet>';
		this.currentJar++;
	}
	//else return alert( 'Err.' );
	
	this.timeout = window.setTimeout( this.checkLoad.bind(this), this.wait);
}

AppletObject.prototype.loadOutside = function (elmID)
{
	this.loaded = false;
	this.started = false;
	this.destroyed = false;
	this.getContainer(elmID).innerHTML = "<b>Loading applet.</b>";
	
	this.jars = this.archive.split(",");
	this.currentJar = 0;
	this.loadApplet = null;
	
	this.checkLoad();
}
	
AppletObject.prototype.create = function () 
{
	var string = '<applet code="'      + this.code
					 + '" archive="'   + this.archive + this.library
					 + '" width="'     + this.width 
					 + '" height="'    + this.height
					 + '" mayscript="' + this.mayscript
					 + '">';
	for(var i = 0; i < this.params.length; i++)
	{
		string += '<param name="'+this.params[i].name+'" value="'+this.params[i].value+'" />';
	}
	string += this.alt;
	string += '</applet>';
	return string;
}


AppletObject.prototype.write = function (elmID)
{
	var string = this.create();
	this.getContainer(elmID).innerHTML = string;
	return string;
}
	
AppletObject.prototype.debug = function (elmID)
{
	alert( this.write( elmID ) );
}
	
AppletObject.prototype.addParam = function ( _name, _value )
{
	this.params.push( { name  : _name,
					   value : _value } );
}
	
AppletObject.prototype.addParams = function ( )
{
	for ( var i=0; i < arguments.length; i++ )
	{
		this.addParam( arguments[i][0], arguments[i][1] );
	}
}
	
AppletObject.prototype.addLibrary = function (file)
{
	if (file.charAt(0) == ',' || this.library.charAt(this.library.length-1) == ',')
	{
		library += file;
	}
	else
	{
		library += ',' + file;
	}
}
