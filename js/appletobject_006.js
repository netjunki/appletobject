/*
 *  AppletObject
 *
 *	Florian Jenett, Stephen Williams, Aaron Steed
 *
 *  -----------------------------------------------------------
 *
 *	changed: 2007-01-12 14:15:09 - fjenett
 *  version: 0.0.6
 *
 *  -----------------------------------------------------------
 *
 *	
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
	readRegistry : false,
	useBrutForceDetectionForIE : true,
	IEDetectUnder13 : true, // see not in getJavaVersionWithBrutForce()
	debugLevel : 0,
	
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
	JAVA_PLUGIN_TO_OLD : -3,
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
		
		/* [fjen] should this go away in favour of stephens new version?
		*/
		if (	window.ActiveXObject
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
							if ( hasPlugin ) alert( vers );
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
		
		
		var returnValue = true;
		// opera is not registering the java-plugin with navigator.plugins,
		// we have to rely on isEnabled for that ...
		//
		if ( !isEnabled && !hasPlugin ) {
			returnValue = AppletObjects.JAVA_PLUGIN_MISSING;
		} else if ( !isEnabled ) {
			returnValue = AppletObjects.JAVA_DISABLED;
		}

		return returnValue;
	},
	
	/**
	 * This code is based on some code posted to the Java Forum. 
	 * Have another look to find the authors details.
	 */
	
	JREVersion : null,
	
	getJavaVersion : function ()
	{
		if ( this.JREVersion ) return this.JREVersion;

		var javaVersion = new AppletObjects.JavaVersion("0.0.0_0");
		var agt=navigator.userAgent.toLowerCase();
		
		this.browser = agt;
		
		var is_major = parseInt(navigator.appVersion);
	
		var is_nav = (	  (agt.indexOf('mozilla')!=-1)
					   && (agt.indexOf('spoofer')==-1)
					   && (agt.indexOf('compatible') == -1) 
					   && (agt.indexOf('opera')==-1)
					   && (agt.indexOf('webtv')==-1) 
					   && (agt.indexOf('hotjava')==-1)  );
					   
		var is_nav4up= (is_nav && (is_major >= 4));
		
		var is_ie    = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
		
		var is_ie5   = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0") !=-1) );
		var is_ie5_5 = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
		var is_ie6   = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.0") !=-1));
		var is_ie7   = (is_ie && (is_major == 4) && (agt.indexOf("msie 7.0") !=-1));
		var is_ie5up = (is_ie && (is_major == 4) 
					   && (    (agt.indexOf("msie 5.0")!=-1)
							|| (agt.indexOf("msie 5.5")!=-1)
							|| (agt.indexOf("msie 6.0")!=-1) 
							|| (agt.indexOf("msie 7.0")!=-1) 
						) );
	
		var pluginDetected = false;
		var activeXDisabled = false;
		
		// we can check for plugin existence only when browser is 'is_ie5up' or 'is_nav4up'
		if (is_nav4up)
		{
			// Refresh 'navigator.plugins' to get newly installed plugins.
			// Use 'navigator.plugins.refresh(false)' to refresh plugins
			// without refreshing open documents (browser windows)
			//
			// [fjen] this is actually not working in some cases .. opera i think had problems.
			//		  have to recheck which browsers ignore it though.
			
			if (navigator.plugins) 
			{
				navigator.plugins.refresh(false);
			}
		
			// check for Java plugin in installed plugins
			if ( navigator.mimeTypes )
			{
				for ( var i=0; i < navigator.mimeTypes.length; i++ )
				{
					mimeType = navigator.mimeTypes[i].type;
					
					// [fjen]
					// ";jpi-version="
					// i wonder if all browsers actually report the mimetypes in this format.
					// IE 5.2 mac had problems with the ";jpi-version" string in the <object>
					// tag.
					
					if( (mimeType != null)
						&& (mimeType.indexOf( "application/x-java-applet;jpi-version=") != -1) )
					{
							var versionIndex = mimeType.indexOf("version=");
							var tmpJavaVersion = 
								new AppletObjects.JavaVersion(mimeType.substring(versionIndex+8));
							if ( tmpJavaVersion.isGreater(javaVersion) )
							{
								javaVersion = 
								new AppletObjects.JavaVersion(mimeType.substring(versionIndex+8));
							}
							pluginDetected = true;
					}
				}
			}
		}
		else if (is_ie5up)	 // [fjen] what about IE 5.2 Mac? came installed until osx 10.3
		{
			registryBeenRead = false;
			if ( this.readRegistry )
			{
				/*
				 * Using the shell causes IE to display a warning that the script
				 * may not be safe.
				 *
				 * [fjen] warnings are bad, no way to avoid this? any virus-protection is
				 *		  gonna freak about the shell access.
				 */
				var shell;
				try
				{
					// Create WSH(WindowsScriptHost) shell, available on Windows only
					shell = new ActiveXObject("WScript.Shell");
			
					if (shell != null) 
					{
						// Read JRE version from Window Registry
						try
						{
							javaVersion = 
								new AppletObjects.JavaVersion( shell.regRead(
											"HKEY_LOCAL_MACHINE\\Software\\"+
											"JavaSoft\\Java Runtime Environment\\CurrentVersion"));
							registryBeenRead = true;
						} catch(e) {
							// handle exceptions raised by 'shell.regRead(...)' here
							// so that the outer try-catch block would receive only
							// exceptions raised by 'shell = new ActiveXObject(...)'
						}
					} else { 
						//alert("Couldn t get shell");
					}
				} catch(e) {
					// Creating ActiveX controls thru script is disabled
					// in InternetExplorer security options
					
					// To enable it:
					// a. Go to the 'Tools --> Internet Options' menu
					// b. Select the 'Security' tab
					// c. Select zone (Internet/Intranet)
					// d. Click the 'Custom Level..' button which will display the
					// 'Security Settings' window.
					// e. Enable the option 'Initialize and script ActiveX controls
					// not marked as safe'
				
					activeXDisabled = true;
				}
			}
			
			// so, this is only IE5+ ?
			
			if ( !registryBeenRead && this.useBrutForceDetectionForIE )
			{
				javaVersion = this.getJavaVersionWithBrutForce( this.minimumVersion ); // where does this arg end up?
			}
		}
		this.JREVersion = javaVersion;
		return javaVersion;
	},

	/**
	 * This function tries to instantiate JavaPlugin.??? objects.
	 * JRE versions 1.1.1_06 through to 1.3.1 installed a JavaSoft.JavaBeansBridge object.
	 */
	 
	getJavaVersionWithBrutForce: function ()
	{
		var javaVersion = new AppletObjects.JavaVersion("0.0.0_0");
		startOfRegistryClasses = new AppletObjects.JavaVersion("1.3.1_1");
		try
		{
//			if(!this.minimumVersion.isGreater(startOfRegistryClasses)){
			if (this.IEDetectUnder13)
			{
				/* this call caused the java console to load, which takes 1 or two seconds.
				* If you are going to display an applet anyway this is no problem otherwise
				* you might want to avoid using it.
				*
				* [fjen] so, the java-console will open no matter what?
				*/
				result = new ActiveXObject("JavaSoft.JavaBeansBridge");
				if (result)
				{
					javaVersion = new AppletObjects.JavaVersion("1.1.1_06");
				}
			}
		} catch (e) {}
//		}
// if I check every time I write an applet 
// then I can start looking from the supplied min version
//		major = 10+this.minimumVersion.major;

		major = 13;
		for (; major <= 16; major++)			//major  1.3 - 1.6
		{			
			for (minor=0; minor <= 2; minor++)	//minor 0  - 2;  I have also seen Java version 1.1.4 to 1.1.8
			{	
				for (sub=0; sub <= 20; sub++)	//major  0 - 20???
				{
					subVersion = "";
					if (sub > 0)
					{
						subVersion = "_";
						if (sub < 10)
						{
							subVersion = subVersion + "0" + sub;
						} 
						else
						{
							subVersion = subVersion + "" + sub;
						}
					}
					regVersion = major+""+minor+subVersion;
					if (major==15)
					{
//						alert(regVersion);
					}
					try 
					{
						result = new ActiveXObject("JavaPlugin."+regVersion);
						if (result) 
						{
							var version = ""+(major/10) + "." + minor+subVersion;
							javaVersion = new AppletObjects.JavaVersion(version);
							
							if (this.debugLevel==0) 
							{
								alert(regVersion);
								javaVersion.show();
							}
						}
					} catch(e) {}
//					if(!this.minimumVersion.isGreater(javaVersion)){
//						return javaVersion;
//					}
				}
			}
		}
		return javaVersion;
	},
	TAG_APPLET : 1,
	TAG_OBJECT : 2,
	TAG_EMBED  : 4
}

AppletObjects.JavaVersion = function (version)
{
	this.minor = 0;
	this.rev = 0;
	arrVersion = version.split(".");
	
	if (arrVersion[2] != null) 
	{
		arrMinorAndRev = arrVersion[2].split("_");
		this.minor = arrMinorAndRev[0] != null ? parseInt(arrMinorAndRev[0]) : 0;
		
		if (arrMinorAndRev[1] != null)
		{
			if (arrMinorAndRev[1].substring(0,1)=="0")
			{
				this.rev = parseInt(arrMinorAndRev[1].substring(1,2));
			}
			else
			{
				this.rev = parseInt(arrMinorAndRev[1]);
			}
		}
	}
	
	this.superMajor = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
	this.major = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
}

AppletObjects.JavaVersion.prototype.isGreater = function (fv)
{
	if(this.major < fv.major) return false;
	if(this.major > fv.major) return true;
	if(this.minor < fv.minor) return false;
	if(this.minor > fv.minor) return true;
	if(this.rev < fv.rev) return false;
	return true;
}

AppletObjects.JavaVersion.prototype.show = function ()
{
	alert(this.toString());
}

AppletObjects.JavaVersion.prototype.toString = function ()
{
	var versionString = "Version: "+this.superMajor+
			"."+this.major+
			"."+this.minor;
	if ( this.rev )
	{
		if( this.rev > 10 )
		{
			versionString += "_"+this.rev;
		}
		else
		{
			versionString += "_0"+this.rev;
		}
	}
	return versionString;
}

var AppletObject = 
function AppletObject (  ) 
{

// [fjen] i guess we have to decide on the order of the params .. 
//		  and maybe make them easier to insert, remember, ...

/* class, archives[], width, height, minimumVersion, mayscript, codebase, params[], type */

	this.code 		= arguments[0];
	
	// [fjen] there is no preloading without archives.
	//
	this.archives = new Array();
	if ( arguments[1] )
	{
		this.archives 	= (arguments[1][0].length > 1)
						  ? arguments[1]
						  : arguments[1].split(',');
	}
					  
	this.width 		= arguments[2] > 0 ? arguments[2] : 100; // [fjen] alert? read from element?
	this.height 	= arguments[3] > 0 ? arguments[3] : 100;
	
	var minimumVersionString = arguments[4] ? arguments[4] : 0;
					  
	this.mayscript 	= arguments[5] ? arguments[5] : 'true';
	
	this.codebase   = arguments[6] ? arguments[6] : null;
	
	this.params = new Array();
	if (arguments[7]) {
		this.addParams(arguments[7]);
	}
	
	this.tagType    = arguments[8] && arguments[8] > 0 && arguments[8] < 5
					  ? arguments[8]
					  : AppletObjects.TAG_OBJECT; // [fjen] changed that to object as default
	
	this.fallback	= 'To view this content, you need to install '+
					   'Java from <A HREF="http://java.com">java.com</A>';
					   
	this.java_disabled_message = '<p><strong>'+
								'Java is disabled in your browsers preferences.<br />'+
								'You need to activate it to view this applet.'+
								'<'+'/strong><'+'/p>'+
								'Reload this page once you enabled Java.';
								
	this.java_plugin_message = '<p><strong>'+
								'This browser does not have a Java Plug-in.'+
								'<'+'/strong><'+'/p>'+
								'<a href="http://java.sun.com/products/plugin/downloads/index.html">'+
								'Get the latest Java Plug-in here.'+
								'<'+'/a>';

	this.java_version_message = '<p><strong>'+
								'This browser does not have a recent enough Java Plug-in.'+
								'<'+'/strong><'+'/p>'+
								'<a href="http://java.sun.com/products/plugin/downloads/index.html">'+
								'Get the latest Java Plug-in here.'+
								'<'+'/a>';

	this.loading_message = '<b>Loading applet ...<'+'/'+'b>';
	
	this.currentJar = 0;
	
	this.loaded 	= false;
	this.inited 	= false;
	this.started 	= false;
	
	this.container 	= null;
	this.loadApplet = null;
	this.preLoadClass = "de.bezier.js.preloading.Preloading.class";
	this.preLoadJar   = "ZZZZZZ.jar";
	this.timeout 	= null;
	this.wait 		= 500; // [fjen] should fork, but 0 would strangle konqeror 3.x
	this.loadChecks = 0;

	// [fjen] actually we don't need this. you can just call 
	//		  writeToElement() or create()
	//
	//this.usePreloader = false;
	
	// [fjen] is it a good idea to have the java-check in the contructor? 
	//		  if it totally fails, will we end up with a null object?
	
	this.jcheck = AppletObjects.hasJava();
	
	if ( minimumVersionString.length > 0 )
	{
		// won't this be a double check?
		//
		AppletObjects.getJavaVersion();
		this.minimumVersion = new AppletObjects.JavaVersion( minimumVersionString );
		
		if ( !AppletObjects.JREVersion.isGreater( this.minimumVersion ) )
		{
			this.jcheck = AppletObjects.JAVA_PLUGIN_TO_OLD;
		}
	}
	

	this.id = AppletObjects.push(this);
}

AppletObject.prototype.getContainer = function (elmID)
{
	if (!elmID && this.container) return this.container;
	if (this.container == null ) this.container = getElement(elmID);
	return this.container;
}

// [fjen] we have to be carefull about the innerHHTML thing. turns
// out that is a microsoft invention and is actually not part of the
// DOM functions.
//
// http://slayeroffice.com/articles/innerHTML_alternatives/
//
// camino mac starts flickering because of innerHTML, so i think we should
// replace it with pure DOM action.


// callback, override these with your own callbacks
AppletObject.prototype.onfail = function( err, element_id )
{
	switch ( err ) {
		case AppletObjects.JAVA_DISABLED:
			getElement(this.element_id).innerHTML = this.java_disabled_message;
			break;
		case AppletObjects.JAVA_PLUGIN_TO_OLD:
			getElement(this.element_id).innerHTML = this.java_version_message;
			break;
		case AppletObjects.JAVA_PLUGIN_MISSING:
		default:
			getElement(this.element_id).innerHTML = this.java_plugin_message;
	}
}

AppletObject.prototype.oninit = function()
{
	getElement(this.element_id).innerHTML = this.loading_message;
}

AppletObject.prototype.onstep = function(perc)
{
	getElement(this.element_id).innerHTML = 
		'<b>Loading applet:<'+'/b><br /><br />' +
		'<div style="width:100px"><h3 style="color:#ffffff;' + 
					'background-color:#AAAA99;' + 
					'width:' + Math.floor(perc)+'%;' + 
					'overflow:hidden;' + 
					'">' +
			perc + "%" +
		'<'+'/h3>'+'<'+'/div>';
}

AppletObject.prototype.onload = function()
{
	//this.debug( element_id );
	this.writeToElement( this.element_id );
}



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
	this.element_id = emlID;

	if (this.jcheck!=true) { return this.onfail(this.jcheck); }
	
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

AppletObject.prototype.load = function ( emlID )
{
	this.element_id = emlID;

	if (this.jcheck!=true) { return this.onfail(this.jcheck); }
	
	 // [fjen] ???
	 //

	var element = (typeof elm == 'object' ) ? elm : getElement(emlID);
	//element.innerHTML = '<img src="http://localhost/apache_pb.gif" alt="loading..."/>';
	element.innerHTML = '<img src="http://ez-applet-html.sourceforge.net/qualiyassurance.php?version=' +
					AppletObjects.JREVersion.toString() + '&browser='+this.browser + ' alt="loading..."/>';
					
	this.writeToElement(emlID);
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

// [fjen] this needs to play together with the minimumVersion
// 		  setting.

AppletObject.prototype.createTagObjectIE = function ()
{
	var jarchives = this.archives.implode(", ");
	
	var tag = '<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" '+
            		  'type="application/x-java-applet" '+
            		  'archive="'   + jarchives+'" '+
            	  	  'codebase="http://java.sun.com/update/1.4.2/jinstall-1_4_2_09-windows-i586.cab" ' +
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
	if ( typeof this.getParam("image") == "undefined" ) {
		//TODO encode the url.
		this.addParam("image", 'http://ez-applet-html.sourceforge.net/loading.gif'); // [fjen] ???
	}

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
AppletObject.prototype.getParam = function ( _name ){
	return this.params[_name];
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
