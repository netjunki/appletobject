/*
 *	this file is part of appletobject.js,
 *	please see:
 *	http://appletobject.org/
 *
 *  ----------------------------------------------------------------------------
 *	
 *	implements callbacks for preloading applets via javascript
 *
 *  ----------------------------------------------------------------------------
 *	
 *  changed: 2007-05-24 07:44:09 - fjenett
 *
 */

package de.bezier.js.preloading;

// http://www.rgagnon.com/javadetails/java-0240.html

public class Preloading
extends java.applet.Applet
{
	public int width, height;
	public java.awt.Color color;
	
	public void init ()
	{
		width  = getSize().width;
    	height = getSize().height;
    	
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
		
		callback( "inited" );
	}
	
	public void start ()
	{
		callback( "started" );
	}
	
	public void callback ( String _what )
	{
		// AppletObject id
		//
		String aobj = getParameter("AObject");
		
		// AppletObjects.started( id )
		//
		String jscmd = "AppletObjects." + _what + "(" +
  						( aobj != null ? aobj : "-1" ) + ")";
  		
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
  		catch (Exception e) {;}
		
		
		// failed? ... then let's try via javascript: - protocol
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
  		catch (Exception e) {;}
	}
	
	public void update ( java.awt.Graphics g )
	{
		paint(g);
	}
	
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