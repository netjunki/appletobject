/*
 *  AppletObject
 *
 *  Florian Jenett, Stephen Williams, Aaron Steed
 *
 *  http://appletobject.org/
 *
 *  -----------------------------------------------------------
 *
 *	changed: 2007-06-19 10:20:19 - fjenett
 *	version: 0.0.6
 *
 *  -----------------------------------------------------------
 *
 *    
 *
 *  ----------------------------------------------------------- */


/**
        getElement()
        
        return an DOMElement by ID
 */
 
var getElement = function (aID)
{ 
     return ((document.getElementById) ? document.getElementById(aID)
                                      : document.all[aID]);
};


if ( !Array.prototype.push ) {
/**
        Array.push()
        
        win IE 5.01 fix,
        push items onto an array, return new length
 */
Array.prototype.push = function() 
{
    for(var j = 0, n = arguments.length; j < n; ++j) {
        this[this.length] = arguments[j];
    }
    return this.length;
};
};



if ( !Array.prototype.shift ) {
/**
        Array.shift()
        
        win IE 5.01 fix,
        remove and return first item in an array
 */
Array.prototype.shift = function ()
{
    if ( this.length == 0 ) return null;
    var val = this[0];
    var arr = [];
    for ( var i= 0; i < this.length  ; i++) arr[i]  = this[i];
    for ( var i= 0; i < this.length-1; i++) this[i] = arr[i+1];
    this[this.length-1] = null;
    return val;
};
};


if ( !Array.prototype.concat ) {
/**
        Array.concat()
        
        win IE 5.01 fix,
        append an array to another
 */
Array.prototype.concat = function ()
{
    for ( var i=0; i< arguments[0].length; i++ ) this[this.length+i] = arguments[0][i];
};
};


if ( !Number.prototype.toFixed ) {
/**
        Number.toFixed()
        
        win IE 5.01 fix,
        return a fixed length float for a number
 */
Number.prototype.toFixed = function ( fractionDigits )
{
   var fStr = this.toString();
   var len = fStr.lastIndexOf('.') + fractionDigits + 1;
   if ( len == fractionDigits ) return this;
   return (1.0 * fStr.substring(0,len));
};
};

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

/**
        Function.bind()
        
        bind a function to an object
        from: Prototype JavaScript framework, version 1.5.0_rc2
 */

Function.prototype.bind = function()
{  
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat(arguments));
  };
};

/**
        $A
        
        return an array for an iterable
        from: Prototype JavaScript framework, version 1.5.0_rc2
 */
 
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
};


/**
        Array.implode()
        
        in love with PHPs implode function,
        opposite to string.split(seperator)
        
        @param string seperator

        example:
          (["1","2","3"]).implode( ", " );
          > "1, 2, 3"
 */
 
Array.prototype.implode = function ( _sep )
{
    var i = 0;    var _str = this[0];
    while ( this[i+1] ) _str = _str + _sep + this[++i];
    return _str;
};



/**
        singleton AppletObjects
        
        a wrapper around all applet objects, it does:
        - handles callbacks from the preloader-applet
        - maintains access to all appletobjects
 */
 
AppletObjects =
{
    objects : [], // array containing all appletobjects
    push : function ( _obj )
    {
        return this.objects.push(_obj)-1; // return the ID of the object injected
    },
    
    create : function ( opt )
    {
        return new AppletObject( opt.code, 
                                 opt.archives, 
                                 opt.width, opt.height,
                                 
                                 opt.minimumVersionString,
                                 opt.mayscript,
                                 opt.codebase,
                                 opt.params,
                                 opt.tagType );
    },
    
    // AppletObjectHelper.class callbacks
    //
    inited : function ( _id )
    {
        if ( this.objects[_id] ) this.objects[_id].inited = true;
    },
    
    started : function ( _id )
    {
        if ( this.objects[_id] ) this.objects[_id].started = true;
    },
    
    setJavaVersion : function ( _id, jVersion )
    {
    	jVersion = jVersion.replace(/[\._]/g, "");
	
        if ( this.objects[_id] )
        {
        	if ( this.objects[_id].minimumVersion != undefined )
        	{
        		var minVersion = this.objects[_id].minimumVersion;
        		
        		if ( this.compareJavaVersions( minVersion, jVersion ) )
        			this.objects[_id].javaCheck = true;
        		else
        			this.objects[_id].javaCheck = this.JAVA_PLUGIN_TOO_OLD;
        	}
        	else
        		this.objects[_id].javaCheck = true;
        }
    },
    
    compareJavaVersions : function ( vers1, vers2 )
    {
    	for ( i=0; i<vers1.length && i<vers2.length; i++ )
        {
			if ( vers1[i] > vers2[i] )
			{
				return false;
			}
        }
        return true;
    },
    
    debugLevel : -1,
    
    JREVersion : '0',
    
    JAVA_PLUGIN_MISSING : -1,
    JAVA_DISABLED : -2,
    JAVA_PLUGIN_TOO_OLD : -3,
    
    hasJava : function ()
    {
        // refresh() is not working properly ..
        //if ( navigator.plugins && navigator.plugins.refresh )
        //        navigator.plugins.refresh(true);
        
        var jMimeType = 'application/x-java-applet';
        
        var hasPlugin = false; // true as default for IE
        
        // netscape mac seems to wrongly report javaEnabled() as false.
        // so we take our chances and just assume it's enabled ...
        //
        var isEnabled = (navigator.userAgent.toLowerCase().match("netscape")
                         ? true
                         : navigator.javaEnabled());
        
        // [fjen] switch to VB for that?
        
        if (    window.ActiveXObject
             && navigator.plugins.length == 0 ) // msIE
        {
            // checks for JavaPlugin versions 1.2.0_00 to 1.6.6_14
            // IE win only
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
                            if ( hasPlugin )
                            {
                                var versString = '1.' +
                                                 (n1 - 10) + '.' +
                                                 (n2+'_'+(n3<10?'0'+n3:n3));
                                
                                this.JREVersion = versString.replace(/\._/g,"");
                            }
                        } catch (e) {}
                    }
                }
            }
            if ( !hasPlugin ) return AppletObjects.JAVA_PLUGIN_MISSING;
        }
        
        
        var i, j;
        for (i = 0;    i < navigator.plugins.length 
                    && !hasPlugin; i++)
        {
            if ( navigator.plugins[i].name.toLowerCase().match("java") )
            {
                for (j = 0; j < navigator.plugins[i].length && !hasPlugin; j++)
                {
                    hasPlugin = navigator.plugins[i][j].type.match(jMimeType);
                    //if ( hasPlugin )  alert( navigator.plugins[i][j].type );
                }
            }
        }
        
        // [fjen] this is an opera fix, java will not be in plugins[],
        //        but in mimetypes[]
        //        sidenote: after deinstalling java on winXP, opera 8.51
        //        kept the mimetype around.
        //
        for (i = 0;    i < navigator.mimeTypes.length 
                    && !hasPlugin; i++)
        {
            hasPlugin = navigator.mimeTypes[i].type.toLowerCase().match(jMimeType);
        }
        
        
        // [fjen] opera is not registering the java-plugin with 
        //        navigator.plugins, we try to rely on isEnabled
        //        for that ...
        //
        var returnValue = true;
        
        if ( !isEnabled && hasPlugin ) {
        
            returnValue = AppletObjects.JAVA_DISABLED;
            
        } else if ( !hasPlugin ) {
        
            returnValue = AppletObjects.JAVA_PLUGIN_MISSING;
        }

        return returnValue;
    },
    
    TAG_APPLET : 1,
    TAG_OBJECT : 2,
    TAG_EMBED  : 4,
    
    PRELOAD_TIMEDOUT : -13
};


var AppletObject = 
/**
        prototype AppletObject()
        
        represents an applet object
 */
function AppletObject ( )
{
    this.code		= arguments[0];
    
    this.archives = new Array();
    if ( arguments[1] )
    {
        this.archives     = (arguments[1][0].length > 1)
                            ? arguments[1]
                            : arguments[1].replace(/[ \n\r\t\b\f]/g,"").split(',');
    }
                      
    this.width      = arguments[2] > 0 ? arguments[2] : 100;
    this.height     = arguments[3] > 0 ? arguments[3] : 100;
    
    this.minimumVersion = arguments[4] ? arguments[4].replace(/\._/g,"") : undefined;
                      
    this.mayscript  = arguments[5] ? arguments[5] : 'true';
    
    this.codebase   = arguments[6] != '' ? arguments[6] : null;
    
    this.params = new Array();
    if (arguments[7]) {
        this.addParams(arguments[7]);
    }
    
    this.tagType    = arguments[8] && arguments[8] > 0 && arguments[8] < 5
                      ? arguments[8]
                      : AppletObjects.TAG_OBJECT;
    
    this.fallback    = 'To view this content, you need to install '+
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
    
    this.preload_timedout_message = '<b>Preloading timed out!<'+'/'+'b>';
    
    this.currentJar = 0;
    
    this.loaded     = false;
    this.inited     = false;
    this.started    = false;
    
    this.container     	   = null;
    this.preloadContainer  = null;
    this.preLoadClass 	   = "org.appletobject.AppletObjectHelper.class";
    this.preLoadJar   	   = "ZZZZZZ.jar";
    this.timeoutFunctionID = null;
    this.timeLastPreload   = 0;
    
    // [fjenett 20070219] 1 minute, timeout if preloader fails (no callbacks)
    this.preloadTimeout = 1000*60*1;
    
    // [fjen] should fork, but 0 would strangle konqeror 3.x
    this.wait         = 500;
    
    this.javaCheck = AppletObjects.hasJava();
    
    this.id = AppletObjects.push(this);
};


/**
        AppletObject.getContainer()
        
        set and return the DOMElement in which the applet will be created
 */

AppletObject.prototype.getContainer = function (elmID)
{
    if (!elmID && this.container) return this.container;
    if (this.container == null ) this.container = getElement(elmID);
    return this.container;
};
 

AppletObject.prototype.isCamino = navigator.userAgent.toLowerCase().match("camino");



/**
        AppletObject.alterElement()
        
        2007-02-10 17:38:49 - fjenett
        this is a "fix" for camino 1.x mac,
        which does flicker when using Element.innerHTML = ...
 */

AppletObject.prototype.alterElement = function ( element, html_snip )
{
	if ( this.isCamino )
    	setTimeout( function(){ element.innerHTML=html_snip; }, 20 );
    else
    	element.innerHTML=html_snip;
};


/**
        default callback from Preloading applet
        
        onfail() will be called once if loading fails.
 */

AppletObject.prototype.onfail = function( err, element_id )
{
    switch ( err )
    {
        case AppletObjects.PRELOAD_TIMEDOUT:
            this.alterElement(getElement( this.element_id ), this.preload_timedout_message);
            break;
            
        case AppletObjects.JAVA_DISABLED:
            this.alterElement(getElement( this.element_id ), this.java_disabled_message);
            break;
            
        case AppletObjects.JAVA_PLUGIN_TOO_OLD:
            this.alterElement(getElement( this.element_id ), this.java_version_message);
            break;
            
        case AppletObjects.JAVA_PLUGIN_MISSING:
        default:
            this.alterElement(getElement( this.element_id ), this.java_plugin_message);
    }
};


/**
        default callback from Preloading applet
        
        oninit() will be called once just before loading starts.
 */
 
AppletObject.prototype.oninit = function()
{
    this.alterElement( getElement( this.element_id ), this.loading_message);
};



/**
        default callback from Preloading applet
        
        onstep() will be called twice per jar.
 */
 
AppletObject.prototype.onstep = function(perc)
{
    this.alterElement( getElement( this.element_id ),
        '<b>Loading applet:<'+'/b>' +
        '<div style="width:100px">'+
        	'<p style="color:#ffffff;' + 
                    'background-color:#AAAA99;' + 
                    'width:' + Math.floor(perc)+'%;' + 
                    '' + 
                    '">' +
            	perc + "%" +
        	'<'+'/p>'+
        '<'+'/div>'
    );
};



/**
        default callback from Preloading applet
        
        onload() will be called once when preloading is finished.
 */
 
AppletObject.prototype.onload = function()
{
    //this.debug( element_id );
    this.writeToElement( this.element_id );
};


/**
        AppletObject._checkNext()
        
        check preloading status in preloading loop
 */

AppletObject.prototype._checkNext = function ()
{
    window.clearTimeout(this.timeoutFunctionID);
    
    if ( !this.preloadContainer )
    {
        this.preloadContainer = document.createElement("div");
        // opera 9 mac won't load hidden applets, so let it
        // be very tiny and sit in the upper left corner

        this.preloadContainer.style.position = "absolute";
        this.preloadContainer.style.top  = '0px';
        this.preloadContainer.style.left = '0px';
        this.preloadContainer.style.width  = '1px';
        this.preloadContainer.style.height = '1px';
        this.preloadContainer.style.borderWidth = '0px';
        this.preloadContainer.style.zIndex = 1000;
        document.body.insertBefore( this.preloadContainer, document.body.lastChild.nextSibling ); // insertAfter
    }
    
    var loadlet = this.preloadContainer.firstChild;
    
    var isActive = ( loadlet && document.applets.length > 0
                       && loadlet == document.applets[document.applets.length-1]
                       ? true : false );
    
    if ( !this.loaded && isActive )
    {
        if ( this.currentJar >= this.archives.length )
        {
            this.loaded = true;
            if ( Function.prototype.apply )
                this.timeoutFunctionID = window.setTimeout(
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
        
        if ( ((new Date()).getTime() - this.timeLastPreload) > this.preloadTimeout )
        {
            
            if ( Function.prototype.apply )
                this.timeoutFunctionID = window.setTimeout(
                            this._loadCleanup.bind(this), 5000 );
            else
                this._setTimeout( '_loadCleanup()', 1000);
                
            this.onfail( AppletObjects.PRELOAD_TIMEDOUT );
            
            return;
        }
    }
    else if ( !loadlet )
    {
        this._loadNext();
    }
    else return alert( 'Error: preloading class is missing.' );
    
    if ( Function.prototype.apply ) 
        this.timeoutFunctionID = window.setTimeout( this._checkNext.bind(this), this.wait);
    else
        this._setTimeout( '_checkNext()', 1000);
};


/**
        AppletObject._setTimeout()
        
        internal function to do a bound setTimeout on this AppletObject.
        this is a fix for win IE 5.01
 */

AppletObject.prototype._setTimeout = function ( _fnc, delay )
{
    // fix win 5.01
    var __code = 'AppletObjects.objects['+this.id+'].'+_fnc;
    this.timeoutFunctionID = window.setTimeout( function(){eval(__code);}, delay);
};


/**
        AppletObject._loadCleanup()
        
        internally called to do some cleanup after preloading
 */

AppletObject.prototype._loadCleanup = function ()
{
    window.clearTimeout(this.timeoutFunctionID);
    this.preloadContainer.style.top  = '-10px';
    this.preloadContainer.style.left = '-10px';
    this.preloadContainer.style.display = 'none';
    this.preloadContainer.parentNode.removeChild(this.preloadContainer.parentNode.lastChild);
};


/**
        AppletObject._loadNext()
        
        internally called to preload one jar
 */

AppletObject.prototype._loadNext = function ()
{
	if (this.javaCheck!=true) { return this.onfail(this.javaCheck); }
    
    if ( this.currentJar == -1 )
    	this.preloadContainer.archives = this.preLoadJar;
    else
    	this.preloadContainer.archives = this.archives[this.currentJar]+','+this.preLoadJar;
    	
    this.currentJar++;
    
    var appletHTML = '<applet ' + 'code="'+this.preLoadClass+'" '+
								  'archive="'+this.preloadContainer.archives+'" '+
								   ( this.codebase ?  'codebase="' + this.codebase + '" ' : '' ) +
								  'width="1"'+
								  'height="1"'+
								  'mayscript="true">'+
							'<param name="appletobjectid" value="'+this.id+'" />'+
							'<param name="boxbgcolor" value="'+this.getParam('boxbgcolor')+'" />'+
							( this.minimumVersion != undefined ? '<param name="getjavaversion" value="checkit" />' : '' ) +
						'</applet>';
						
    this.alterElement( this.preloadContainer, appletHTML );
    
    this.timeLastPreload = (new Date()).getTime();
};


/**
        AppletObject.preload()
        
        start preloading loop
 */

AppletObject.prototype.preload = function ( elmID )
{
    this.element_id = elmID;

    if (this.javaCheck!=true) { return this.onfail(this.javaCheck); }
    
    // no archives, no preload!
    if ( this.archives.length <= 0 )
    {
        this.oninit();
        this.onload();
        return;
    }
    
    this.loaded  = false;
    this.started = false;
    this.inited  = false;
    
    this.oninit();
    
    this.currentJar = -1;
    this.preloadContainer = null;
    this.stepPerc = (50.0/(this.archives.length)); // called twice per jar
    this.perc = 0;
    
    this._checkNext();
};


/**
        AppletObject.load()
        
        create tag, insert into element without preloading
 */

AppletObject.prototype.load = function ( elementId )
{
    this.element_id = elementId;

    if (this.javaCheck!=true) { return this.onfail(this.javaCheck); }

    this.writeToElement( this.element_id );
};


/**
        AppletObject.create()
        
        called to create an applet tag based on 
        AppletObject setting tagType
 */
    
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
};


/**
        AppletObject.createTagApplet()
        
        create the an applet applet tag
 */

AppletObject.prototype.createTagApplet = function ()
{
	var codebaseString = ( this.codebase )? 'codebase="' + this.codebase+'" ' : '' ;
	var tag = '<applet code="'      + this.code
 				  + '" archive="'   + this.archives.implode(', ')
            	  + '" ' 			+ codebaseString
				  + '  width="'     + this.width 
				  + '" height="'    + this.height
				  + '" mayscript="' + this.mayscript
				  + '" >';
    for(var i = 0; i < this.params.length; i++)
    {
        tag += '<param  name="' + this.params[i].name  + '" ' + 
                      'value="' + this.params[i].value + '" />';
    }
    tag += this.fallback;
    tag += '</applet>';
    return tag;
};


/**
        AppletObject.createTagObject()
        
        create the an object applet tag,
        this is the current default
 */
 
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
                        ( this.codebase ?
                      '<param name="codebase"   value="'+ this.codebase+'" />' : '' ) +
                    '<param name="archive"    value="'+jarchives+'" />'+
                    '<param name="mayscript"  value="'+this.mayscript+'" />'+
                    '<param name="scriptable" value="'+this.mayscript+'" />';
    for(var i = 0; i < this.params.length; i++)
    {
        tag += '<param  name="' + this.params[i].name  + '" ' + 
                      'value="' + this.params[i].value +'" />';
    }
    tag += this.fallback;
    tag += '</object>';
    return tag;
};


/**
        AppletObject.createTagObjectIE()
        
        create the an object applet tag for internet explorer
 */

// [fjen] this ( clsid / codebase ) needs to play together with the minimumVersion
//           setting.

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
        tag += '<param  name="' + this.params[i].name  + '" ' + 
                      'value="' + this.params[i].value +'" />';
    }
    tag += this.fallback;
    tag += '</object>';
    return tag;
};


/**
        AppletObject.createTagEmbed()
        
        create the an embed applet tag
 */

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
                      'mayscript="' +this.mayscript+'" '+
                      'scriptable="'+this.mayscript+'" ';
    for(var i = 0; i < this.params.length; i++)
    {
        tag += this.params[i].name + '="' + this.params[i].value + '" ';
    }
    tag += ' >';
    tag += '<noembed>' + this.fallback + '</noembed>';
    tag += '</embed>';
    return tag;
};


/**
        AppletObject.writeToElement()
        
        create the applet tag and insert it into the given element
 */

AppletObject.prototype.writeToElement = function ( elementId )
{
    this.element_id = elementId;
    
    if ( typeof this.getParam("image") == "undefined" ) {
        //TODO encode the url.
        //this.addParam("image", 'http://ez-applet-html.sourceforge.net/loading.gif');
    }

    var tag = this.create();
    this.alterElement( getElement( this.element_id ), tag );
    return tag;
};


/**
        AppletObject.debug()
        
        used instead of writeToElement to see the created html source
 */
    
AppletObject.prototype.debug = function ( elementId )
{
    this.element_id = elementId;
    
    var tag = this.create();
    this.alterElement( getElement( this.element_id ), '<textarea style="width:400px;height:100%;">' + tag + '</textarea>' );
    return tag;
};


/**
        AppletObject.addParam()
        
        add one parameter to the AppletObject 
 */
    
AppletObject.prototype.addParam = function ( _name, _value )
{
    if ( !_name || !_value ) return;
    if ( !this.params ) this.params = new Array();
    this.params.push( {  name  : _name,
                        value  : _value } );
// this.params[_name] = { name  : _name,
//                            value  : _value };
};


/**
        AppletObject.addParams()
        
        add one or more parameters to the AppletObject 
 */
 
AppletObject.prototype.addParams = function ( )
{
    if ( arguments.length <= 0 ) return;
    for ( var i=0; i < arguments.length; i++ )
    {
        this.addParam( arguments[i][0], arguments[i][1] );
    }
};


/**
        AppletObject.getParam()
        
        return a param from AppletObject by name
 */
 
AppletObject.prototype.getParam = function ( _name )
{
    // return this.params[_name];
    for( var i = 0; i < this.params.length; i++ )
    {
    	if ( this.params[i].name == _name )
    		return this.params[i].value;
    }
    return undefined;
};


/**
        AppletObject.addLibrary()
        
        add one or more libraries to the AppletObject
        
        @param: single or multiple strings or one array
 */

AppletObject.prototype.addLibraries = function ( )
{
    if ( arguments.length == 1 )
    {
        if ( typeof arguments[0] == 'string' )
            this.archives[this.archives.length] = arguments[0];
    
        else if ( arguments[0].length > 0 ) // array
        {
            for ( var i = 0; i < arguments[0].length; i++ )
            {
                this.archives[this.archives.length] = arguments[0][i];
            }
        }
    }
    else if ( arguments.length > 0 )
    {
        for ( var i = 0; i < arguments.length; i++ )
        {
            if ( typeof arguments[i] == 'string' )
                this.archives[this.archives.length] = arguments[i];
        }
    }
};



