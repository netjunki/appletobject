/*
 *  AppletObject by Aaron Steed (st33d), robotacid.com
 *				 && Florian Jenett (fjen), bezier.de   
 *
 *  http://robotacid.com/news/2007/01/chronic-pain-in-arse.html
 *
 *  -----------------------------------------------------------
 *
 *	changed: 2007-01-12 10:07:12 - fjenett
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

Object.prototype.insertAfter = function ( element, element_after )
{
	if ( this.insertBefore )
		this.insertBefore( element, element_after.nextSibling );
}


// sprinta
// ---------------------------------------
// sort of a sprintf function
// ---------------------------------------
// params:
//   - array ["a","b","c"]
//   - a number (array length - 1)
//     variables to put in the "gaps"
// example:
//   (["1","2","3"]).sprinta( "+","=" );
//   or
//   (["1","2","3"]).sprinta(["+","="]);
//   > "1+2=3"
//
Array.prototype.sprinta = function ()
{
	if ( arguments.length == 0 || this.length == 0 ) return false;
	var _repl = arguments.length > 1 ? arguments : arguments[0];
	var _str = ""; var i = 0;
	while ( i < this.length ) {
		_str = _str + ( this[i] ? this[i]  : "")
					+ ( _repl[i]? _repl[i] : "");
		i++;
	}
	return _str;
}


// implode
// ---------------------------------------
// opposite to string.split(seperator)
// ---------------------------------------
// params:
//   - array []
//   - string seperator
// example:
//   (["1","2","3"]).implode( ", " );
//   > "1, 2, 3"
//
Array.prototype.implode = function ( _sep)
{
	var i = 0;	var _str = this[0];
	while ( this[i+1] ) _str = _str + _sep + this[++i];
	return _str;
}

AppletObjects =
{
	objects : [],
	push : function ( _obj )
	{
		return this.objects.push(_obj)-1; // give the ID of the object injected
	},
	// Preloading applet callbacks
	inited : function ( _id )
	{
		if ( this.objects[_id] ) this.objects[_id].inited = true;
	},
	started : function ( _id )
	{
		if ( this.objects[_id] ) this.objects[_id].started = true;
	}
}

var AppletObject = 
function AppletObject ( /* code, archives[], width, height, mayscript */ ) 
{
	this.code 		= arguments[0];
	this.archives 	= (arguments[1][0].length > 1)
					  ? arguments[1]
					  : arguments[1].split(',');
	this.width 		= arguments[2];
	this.height 	= arguments[3];
	this.mayscript 	= arguments[4];
	
	this.codebase   = arguments[5] ? arguments[5] : null;
	this.params     = arguments[6]
					  ? this.addParams(arguments[6])
					  : new Array();
	
	this.tagType    = AppletObject.TYPE_APPLET;
	this.fallback	= 'To view this content, you need to install Java from <A HREF="http://java.com">java.com</A>';
	
	this.currentJar = 0;
	
	this.loaded 	= false;
	this.inited 	= false;
	this.started 	= false;
	
	this.container 	= null;
	this.loadApplet = null;
	this.preLoadClass = "de.bezier.js.preloading.Preloading.class";
	this.preLoadJar = "ZZZZZZ12.jar";
	this.timeout 	= null;
	this.wait 		= 0; // fork!
	this.loadChecks = 0;

	this.id 		= AppletObjects.push(this);
}

AppletObject.prototype.TYPE_APPLET = 1;
AppletObject.prototype.TYPE_OBJECT = 2;
AppletObject.prototype.TYPE_OBJECT_IE = 3;
AppletObject.prototype.TYPE_EMBED = 4;

AppletObject.prototype.getContainer = function (elmID)
{
	if (!elmID && this.container) return this.container;
	if (this.container == null ) this.container = getElement(elmID);
	return this.container;
}

// callback, override these
AppletObject.prototype.oninit = function () {}
AppletObject.prototype.onstep = function ( perc ) {}
AppletObject.prototype.onload = function () {}


AppletObject.prototype._checkNext = function ()
{
	window.clearTimeout(this.timeout);
	
	if ( !this.loadApplet )
	{
		this.loadApplet = document.createElement("div");
		this.loadApplet.style.position = "absolute";
		this.loadApplet.style.top = '0px';//+'+this.height+'px';
		this.loadApplet.style.left = '0px';//+'+this.width+'px';
		this.loadApplet.style.zIndex = 1000;
		document.body.insertAfter( this.loadApplet, document.body.lastChild );
	}
	
	var prapplet = this.loadApplet.firstChild;
	
	var isActive = ( prapplet && document.applets.length > 0
	  				 && prapplet == document.applets[document.applets.length-1]
					 
					 // isActive only works for inited applets
	  				 // raises a java.lang.NullPointerException in java1.4.2_2 plugin or later
	  				 // will cause FF to go into a 2min+ loop
	  				 // when it tries to start JS->Java communication
	  				 // && (prapplet.isActive ? prapplet.isActive() : prapplet == document.applets[document.applets.length-1])
	  				 
	  				 ? true : false );
	
	if ( !this.loaded && isActive )
	{
		if ( this.currentJar >= this.archives.length )
		{
			this.loaded = true;
			this.loadApplet.parentNode.removeChild(this.loadApplet.parentNode.lastChild);
			return this.onload();
			//prapplet.noLoop();     // calles stop() inside papplet
			//prapplet.frameCount=0; // calles setup() inside papplet after start() is called
			//prapplet.loop();       // calles start() inside papplet
		}
				
		if ( this.inited )
		{
			this.inited  = false;
			this.perc++;
			this.onstep( (this.perc * this.stepPerc).toFixed(2) );
		}
	
		if ( this.started )
		{
			this.started = false;
			this.perc++;
			this.onstep( (this.perc * this.stepPerc).toFixed(2) );
			this._loadNext();
		}
	}
	else if ( !prapplet )
	{
		this._loadNext();
	}
	//else return alert( 'Err.' );
	
	this.timeout = window.setTimeout( this._checkNext.bind(this), this.wait);
}

AppletObject.prototype._loadNext = function ()
{
	this.loadApplet.archives = this.archives[this.currentJar]+','+this.preLoadJar;
	this.currentJar++;
	this.loadApplet.innerHTML = '<applet '+
		                                     'code="'+this.preLoadClass+'" '+
		                                     'archive="'+this.loadApplet.archives+'" '+
		                                     'width="1"'+//this.width+'" '+
		                                     'height="1"'+//this.height+'" '+
		                                     'mayscript="true">'+
		                            '<param name="AObject" value="'+this.id+'" />'+
		                            '<param name="target" value="_self" />'+
		                            '</applet>';
}

AppletObject.prototype.preload = function ( emlID )
{
	this.loaded  = false;
	this.started = false;
	this.inited  = false;
	
	window.setTimeout( this.oninit.bind(this), 0);
	
	this.currentJar = 0;
	this.loadApplet = null;
	this.stepPerc = (50.0/(this.archives.length-1)); // called twice per jar
	this.perc = 0;
	
	this._checkNext();
}
	
AppletObject.prototype.create = function () 
{
	var _str = "";
	switch (this.tagType) {
		case AppletObject.TYPE_APPLET:
			_str = this.createTagApplet();
			break;
		case AppletObject.TYPE_OBJECT:
			break;
		case AppletObject.TYPE_OBJECT_IE:
			break;
		case AppletObject.TYPE_EMBED:
			break;
		default:
			_str = this.createTagApplet();
	}
	return _str;
}

AppletObject.prototype.createTagApplet = function ()
{
	var tag = '<applet code="'      + this.code
 				  + '" archive="'   + this.archives.implode(', ')
				  + '" width="'     + this.width 
				  + '" height="'    + this.height
				  + '" mayscript="' + this.mayscript
				  + '">';
	for(var i = 0; i < this.params.length; i++)
	{
		tag += '<param name="'+this.params[i].name+'" value="'+this.params[i].value+'" />';
	}
	tag += this.fallback;
	tag += '</applet>';
	return tag;
}

AppletObject.prototype.writeToElement = function ( elm )
{
	var string = this.create();
	var element = (typeof elm == 'object' ) ? elm : getElement(elm);
	element.innerHTML = string;
	return string;
}
	
AppletObject.prototype.debug = function ( elm )
{
	alert( this.writeToElement( elm ) );
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
