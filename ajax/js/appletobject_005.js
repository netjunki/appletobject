/*
 *  AppletObject by Aaron Steed (st33d), robotacid.com
 *				 && Florian Jenett (fjen), bezier.de   
 *
 *  http://robotacid.com/news/2007/01/chronic-pain-in-arse.html
 *
 *  -----------------------------------------------------------
 *
 *	changed: 2007-01-12 14:15:09 - fjenett
 *  version: 0.0.5
 *
 *  -----------------------------------------------------------
 *
 *	currently supports only "newer" browsers. IE 5+, ...
 *
 *  ----------------------------------------------------------- */

// fix for some older IEs
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
if ( !Array.prototype.shift ) Array.prototype.shift = function ()
{
	if ( this.length == 0 ) return null;
	var val = this[0];
	var arr = [];
	for ( var i= 0; i < this.length  ; i++) arr[i]  = this[i];
	for ( var i= 0; i < this.length-1; i++) this[i] = arr[i+1];
	this[this.length-1] = null;
	return val;
}

// fix IE 5.01 win
if ( !Array.prototype.concat ) Array.prototype.concat = function ()
{
	alert( 1 );
	for ( var i=0; i< arguments[0].length; i++ ) this[this.length+i] = arguments[0][i];
}

// fix IE 5.01 win
if ( !Number.prototype.toFixed ) Number.prototype.toFixed = function ( fractionDigits )
{
   var fStr = this.toString();
   var len = fStr.lastIndexOf('.') + fractionDigits + 1;
   if ( len == fractionDigits ) return this;
   return (1.0 * fStr.substring(0,len));
}

//  Function.prototype.bind , $A
//  taken from:
/*--------------------------------------------------------------------------*/
/*  Prototype JavaScript framework, version 1.5.0_rc2
 *  (c) 2005-2007 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 */
/*--------------------------------------------------------------------------*/
Function.prototype.bind = function()
{  
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat(arguments));
  }
}

var $A = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0, length = iterable.length; i < length; i++)
      results.push(iterable[i]);
    return results;
  }
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
		return this.objects.push(_obj)-1; // return the ID of the object injected
	},
	
	// Preloading-applet callbacks
	//
	inited : function ( _id )
	{
		if ( this.objects[_id] ) this.objects[_id].inited = true;
	},
	started : function ( _id )
	{
		if ( this.objects[_id] ) this.objects[_id].started = true;
	},
	
	JAVA_PLUGIN_MISSING : -1,
	JAVA_DISABLED : -2,
	hasJava : function ()
	{
		// refresh() is not working properly ..
		//if ( navigator.plugins && navigator.plugins.refresh )
		//		navigator.plugins.refresh(true);
		
		var jMimeType = 'application/x-java-applet';
		
		// true as default for IE
		//
		var hasPlugin = navigator.plugins.length == 0;
		
		// netscape mac seems to wrongly report javaEnabled() as false.
		// so we take our chances and just assume it's enabled ...
		//
		var isEnabled = (navigator.userAgent.toLowerCase().match("netscape")
						 ? true
						 : navigator.javaEnabled());
		
		if (    navigator.plugins.length == 0
			 && window.ActiveXObject
			 && !hasPlugin
			 && !isEnabled ) // msIE
		{
			// checks for JavaPlugin versions 1.2.0_00 to 1.6.6_14
			//
			var vers; var n1 = 12, n2 = 0, n3 = 0;
			for ( n1 = 12; n1 < 17 && !hasPlugin; n1++ )
			{
				for ( n2 = 0; n2 < 7 && !hasPlugin; n2++ )
				{
					for ( n3 = 0; n3 < 15 && !hasPlugin; n3++ )
					{
						vers = n1+(n2+'_'+(n3<10?'0'+n3:n3));
						try {

							hasPlugin = new ActiveXObject('JavaPlugin.'+vers);
						} catch (e) {}
					}
				}
			}
		}
		
		var i, j;
		for (i = 0;    i < navigator.plugins.length 
					&& !hasPlugin
					&& !isEnabled; i++)
		{
			if ( navigator.plugins[i].name.toLowerCase().match("java") )
			{
				for (j = 0; j < navigator.plugins[i].length && !hasPlugin; j++)
				{
					hasPlugin = navigator.plugins[i][j].type.match(jMimeType);
				}
			}
		}
		
		
		// opera is not registering the java-plugin with navigator.plugins,
		// we have to rely on isEnabled for that ...
		//
		if (    !isEnabled
		     && !hasPlugin )	return AppletObjects.JAVA_PLUGIN_MISSING;
		
		else if ( !isEnabled )  return AppletObjects.JAVA_DISABLED;
		
		else 					return true;
	},
	TAG_APPLET : 1,
	TAG_OBJECT : 2,
	TAG_EMBED  : 4
}

var AppletObject = 
function AppletObject ( /* class, archives[], width, height, mayscript, codebase, params[], type */ ) 
{
	this.code 		= arguments[0];
	
	this.archives 	= (arguments[1][0].length > 1)
					  ? arguments[1]
					  : arguments[1].split(',');
					  
	this.width 		= arguments[2] > 0 ? arguments[2] : 100;
					  
	this.height 	= arguments[3] > 0 ? arguments[3] : 100;
					  
	this.mayscript 	= arguments[4] ? arguments[4] : 'true';
	
	this.codebase   = arguments[5] ? arguments[5] : null;
	
	this.params     = arguments[6] && arguments[6].push
					  ? this.addParams(arguments[6])
					  : new Array();
					  
	this.tagType    = arguments[7] && arguments[7] > 0 && arguments[7] < 5
					  ? arguments[7]
					  : AppletObjects.TAG_APPLET;
	
	this.fallback	= 'To view this content, you need to install Java from <A HREF="http://java.com">java.com</A>';
	
	this.currentJar = 0;
	
	this.loaded 	= false;
	this.inited 	= false;
	this.started 	= false;
	
	this.container 	= null;
	this.loadApplet = null;
	this.preLoadClass = "de.bezier.js.preloading.Preloading.class";
	this.preLoadJar   = "ZZZZZZ.jar";
	this.timeout 	= null;
	this.wait 		= 500; // should fork, but 0 would strangle konqeror 3.x
	this.loadChecks = 0;

	this.id 		= AppletObjects.push(this);
}

AppletObject.prototype.getContainer = function (elmID)
{
	if (!elmID && this.container) return this.container;
	if (this.container == null ) this.container = getElement(elmID);
	return this.container;
}

// callback, override these with your own callbacks
AppletObject.prototype.onfail = function () {}
AppletObject.prototype.oninit = function () {}
AppletObject.prototype.onstep = function ( perc ) {}
AppletObject.prototype.onload = function () {}


AppletObject.prototype._checkNext = function ()
{
	window.clearTimeout(this.timeout);
	
	if ( !this.loadApplet )
	{
		this.loadApplet = document.createElement("div");
		// opera 9 mac won't load hidden applets, so let it
		// be very tiny and sit in the upper left corner

		this.loadApplet.style.position = "absolute";
		this.loadApplet.style.top  = '0px';
		this.loadApplet.style.left = '0px';
		this.loadApplet.style.width  = '2px';
		this.loadApplet.style.height = '2px';
		this.loadApplet.style.borderWidth = '0px';
		this.loadApplet.style.zIndex = 1000;
		document.body.insertBefore( this.loadApplet, document.body.lastChild.nextSibling ); // insertAfter
	}
	
	var prapplet = this.loadApplet.firstChild;
	
	var isActive = ( prapplet && document.applets.length > 0
	  				 && prapplet == document.applets[document.applets.length-1]
	  				 ? true : false );
	
	if ( !this.loaded && isActive )
	{
		if ( this.currentJar >= this.archives.length )
		{
			this.loaded = true;
			if ( Function.prototype.apply )
				this.timeout = window.setTimeout(
							this._loadCleanup.bind(this), 5000 );
							// 5sec, let FF 1.5 have some time to breathe
			else
				this._setTimeout( '_loadCleanup()', 1000);
				
			return this.onload();
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
	else return alert( 'Err.' );
	
	if ( Function.prototype.apply ) 
		this.timeout = window.setTimeout( this._checkNext.bind(this), this.wait);
	else
		this._setTimeout( '_checkNext()', 1000);
}

AppletObject.prototype._setTimeout = function ( _fnc, delay )
{
	// fix win 5.01
	var __code = 'AppletObjects.objects['+this.id+'].'+_fnc;
	this.timeout = window.setTimeout( function(){eval(__code);}, delay);
}

AppletObject.prototype._loadCleanup = function ()
{
	window.clearTimeout(this.timeout);
	this.loadApplet.parentNode.removeChild(this.loadApplet.parentNode.lastChild);
}

AppletObject.prototype._loadNext = function ()
{
	this.loadApplet.archives = this.archives[this.currentJar]+','+this.preLoadJar;
	this.currentJar++;
	this.loadApplet.innerHTML = '<applet '+  'code="'+this.preLoadClass+'" '+
		                                     'archive="'+this.loadApplet.archives+'" '+
            	  							 ( this.codebase ? 
            	  							 'codebase="' + this.codebase + '" ' : '' ) +
		                                     'width="1"'+
		                                     'height="1"'+
		                                     'mayscript="true">'+
		                        	'<param name="AObject" value="'+this.id+'" />'+
		                        '</applet>';
}

AppletObject.prototype.preload = function ( emlID )
{
	var jcheck = AppletObjects.hasJava();
	
	if (jcheck!=true) { return this.onfail(jcheck); }
	
	this.loaded  = false;
	this.started = false;
	this.inited  = false;
	
	this.oninit();
	
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
		case AppletObjects.TAG_APPLET:
			_str = this.createTagApplet();
			break;
		case AppletObjects.TAG_OBJECT:
			_str = this.createTagObject();
			break;
		case AppletObjects.TAG_EMBED:
			_str = this.createTagEmbed();
			break;
		default:
			_str = this.createTagApplet();
	}
	return _str;
}

AppletObject.prototype.createTagApplet = function ()
{
	var tag = '<applet code="'      + this.code
 				  + '" archive="'   + this.archives.implode(', ') +
            	  ( this.codebase 
            	  ? 'codebase="'    + this.codebase+'" ' : '' ) +
				  + '" width="'     + this.width 
				  + '" height="'    + this.height
				  + '" mayscript="' + this.mayscript
				  + '" >';
	for(var i = 0; i < this.params.length; i++)
	{
		tag += '<param  name="' + this.params[i].name + '" ' + 
					  'value="'+this.params[i].value+'" />';
	}
	tag += this.fallback;
	tag += '</applet>';
	return tag;
}

AppletObject.prototype.createTagObject = function ()
{
	if ( navigator.userAgent.toLowerCase().match('msie') )
		return this.createTagObjectIE();
		
	var jarchives = this.archives.implode(", ");
	
	var tag = '<object classid="java:'+this.code+'.class" '+
            		  'type="application/x-java-applet" '+
            		  'archive="'   + jarchives+'" '+
            	  	  ( this.codebase 
            	      ? 'codebase="'+ this.codebase+'" ' : '' ) +
				  	  'width="'     + this.width +'" '+
				      'height="'    + this.height +'" '+
				      'standby="Loading applet ..." '+
				      '>'+
            	  	  ( this.codebase  ?
            	  	'<param name="codebase"   value="'+ this.codebase+'" />' : '' ) +
					'<param name="archive"    value="'+jarchives+'" />'+
				    '<param name="mayscript"  value="'+this.mayscript+'" />'+
				    '<param name="scriptable" value="'+this.mayscript+'" />';
	for(var i = 0; i < this.params.length; i++)
	{
		tag += '<param  name="' + this.params[i].name + '" ' + 
					  'value="'+this.params[i].value+'" />';
	}
	tag += this.fallback;
	tag += '</object>';
	return tag;
}

AppletObject.prototype.createTagObjectIE = function ()
{
	var jarchives = this.archives.implode(", ");
	
	var tag = '<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" '+
            		  'type="application/x-java-applet" '+
            		  'archive="'   + jarchives+'" '+
            	  	  'codebase="http://java.sun.com/update/1.4.2/jinstall-1_4_2_03-windows-i586.cab" ' +
				  	  'width="'     + this.width +'" '+
				      'height="'    + this.height +'" '+
				      'standby="Loading applet ..." '+
				      '>'+
					'<param name="code"       value="'+this.code+'" />'+
            	  	  ( this.codebase  ?
            	  	'<param name="codebase"   value="'+ this.codebase+'" />' : '' ) +
					'<param name="archive"    value="'+jarchives+'" />'+
				    '<param name="mayscript"  value="'+this.mayscript+'" />'+
				    '<param name="scriptable" value="'+this.mayscript+'" />';
	for(var i = 0; i < this.params.length; i++)
	{
		tag += '<param  name="' + this.params[i].name + '" ' + 
					  'value="'+this.params[i].value+'" />';
	}
	tag += this.fallback;
	tag += '</object>';
	return tag;
}


AppletObject.prototype.createTagEmbed = function ()
{
	var jarchives = this.archives.implode(", ");
	
	var tag = '<embed code="'       + this.code+'.class" '+
            		  'type="application/x-java-applet" '+
            		  'archive="'   + jarchives+'" '+
            	  	  ( this.codebase 
            	    ? 'codebase="'  + this.codebase+'" ' : '' ) +
				  	  'width="'     + this.width +'" '+
				      'height="'    + this.height +'" '+
				      'align="baseline" '+
				      'pluginspage="http://java.sun.com/products/plugin/downloads/index.html" '+
				      'mayscript="'+this.mayscript+'" '+
				      'scriptable="'+this.mayscript+'" ';
	for(var i = 0; i < this.params.length; i++)
	{
		tag += this.params[i].name + '="' + this.params[i].value + '" ';
	}
	tag += ' >';
	tag += '<noembed>' + this.fallback + '</noembed>';
	tag += '</embed>';
	return tag;
}

AppletObject.prototype.writeToElement = function ( elm )
{
	var tag = this.create();
	var element = (typeof elm == 'object' ) ? elm : getElement(elm);
	element.innerHTML = tag;
	return tag;
}
	
AppletObject.prototype.debug = function ( elm )
{
	var tag = this.create();
	var element = (typeof elm == 'object' ) ? elm : getElement(elm);
	element.innerHTML = '<textarea style="width:400px;height:100%;">' + tag + '</textarea>' ;
	return tag;
}
	
AppletObject.prototype.addParam = function ( _name, _value )
{
	if ( !_name || !_value ) return;
	if ( !this.params ) this.params = new Array();
	this.params.push( { name  : _name,
					   value  : _value } );
}
	
AppletObject.prototype.addParams = function ( )
{
	if ( arguments.length <= 0 ) return;
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
