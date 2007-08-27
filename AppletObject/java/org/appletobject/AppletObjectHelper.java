/*
 *	this file is part of appletobject.js, see:
 *	http://appletobject.org/
 *
 *  ----------------------------------------------------------------------------
 *	
 *	implements callbacks for preloading applets via javascript
 *
 *  ----------------------------------------------------------------------------
 *	
 *  changed: 2007-08-19 10:39:46 - fjenett
 *
 */

package org.appletobject;

// http://www.rgagnon.com/javadetails/java-0240.html

public class AppletObjectHelper
extends java.applet.Applet
{
	public int width, height;
	public java.awt.Color color;
	public String appletObjectID = "-1";
	
	/*
	 *	init () is inherited from java.applet.Applet.init ()
	 *
	 *	will be called by the browser / viewer to initialize the
	 *	applet.
	 */
	public void init ()
	{
		// read size from java.awt.Component
		//
		width  = getSize().width;
    	height = getSize().height;
    	
		// AppletObject id
		//
		String aobjID = getParameter("appletobjectid");
		if ( aobjID != null && !aobjID.equals("") )
			this.appletObjectID = aobjID;
    	
    	// read and set the background color from params
    	//
    	String boxbgcolor = getParameter("boxbgcolor");
    	
    	if (     boxbgcolor != null
    		 && !boxbgcolor.equals("") )
    	{
    		boxbgcolor = boxbgcolor.substring( 1, 7 ); // strip # from web-hex #FF00FF
    		try {
    			color = new java.awt.Color(Integer.parseInt(boxbgcolor, 16));
    		} catch ( java.lang.NumberFormatException nfe ) {
    			color = java.awt.Color.white;
    		}
    	}
    	else
    		color = java.awt.Color.white;
    	
    	String getjavaversion = getParameter("getjavaversion");
    	
    	if ( getjavaversion != null && !getjavaversion.equals("") )
    	{
			String args = "";
			
			args = jsEscape(this.appletObjectID) + "," + jsEscape( System.getProperty("java.version") );
	
			/*
			System.getProperty("java.vendor")
			System.getProperty("os.name")
			System.getProperty("os.version")
			System.getProperty("os.arch")
			*/
							
			callback( "setJavaVersion", args );
		}
		
		callback( "inited", this.appletObjectID );
	}
	
	/*
	 *	jsEscape ( string )
	 *
	 *	replace " with ' and add quotes at both ends
	 */
	String jsEscape ( String quoted )
	{
		return '"' + quoted.replace( '"', '\'' ) + '"'; // use single quotes for strings in js
	}
	
	
	/*
	 *	start () is inherited from java.applet.Applet.start ()
	 *
	 *	will be called by the browser / viewer to start the
	 *	applets thread.
	 */
	public void start ()
	{
		callback( "started", this.appletObjectID );
	}
	
	/*
	 *	callback ( String ) tries to call into javascript. 
	 * 	first it attempts to use JSObject, if that fails it tries to use the
	 *	"javascript:" protocol.
	 */
	public void callback ( String _func, String _params )
	{
		// for example: "AppletObjects.started( id )"
		//
		String jscmd = "AppletObjects." + _func + 
						"(" +
  						( _params != null && !_params.equals("") ? _params : "" ) +
  						")";
  		
  		// first try using JSObject via reflection
  		//
		try
		{ 
   			Class c = Class.forName("netscape.javascript.JSObject");
   			
   			java.lang.reflect.Method getWin = 
   						c.getMethod("getWindow",new Class[]{java.applet.Applet.class});
   						
   			java.lang.reflect.Method eval = 
   						c.getMethod("eval",new Class[]{String.class}); 
 
   			Object jswin = getWin.invoke(c, new Object[]{this});
  
  			if ( jswin != null )
	   			eval.invoke(jswin, new Object[]{ jscmd }).toString();
   			
			return;
  		}
  		catch (Exception ignore) {;}
		
		
		// failed? ... then let's try via javascript: - protocol.
		// this will not work on IE 5 mac since it's not decoding 
		// the URL-encoding ...
		//
		try
		{
			java.applet.AppletContext context = getAppletContext();
			if ( context != null ) {
  				context.showDocument(
  									new java.net.URL("javascript:" + jscmd)
  									,"_self"
  									       );
  			}
  		}
  		catch (Exception ignore) {;}
	}
	
	/*
	 *	java.awt.Container.update();
	 */
	public void update ( java.awt.Graphics g )
	{
		paint(g);
	}
	
	/*
	 *	java.awt.Container.paint();
	 */
	public void paint ( java.awt.Graphics g )
	{
    	g.setColor( color );
    	g.fillRect(0,0,width,height);
    }
	
	// sadly callbacks don't work inside these ...
	//
	public void stop () { }
	public void destroy () { }
}