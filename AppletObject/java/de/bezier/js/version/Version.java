package de.bezier.js.version;

import java.applet.Applet;
import java.awt.*;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLEncoder;

public class Version extends Applet
{

    public void init()
    {
        try
        {
        	String sessionID = getParameter("session_id");
        	if ( !sessionID.equals("") )
        		sessionID = "session_id=" + URLEncoder.encode( sessionID );
        	else
        	{
        		System.err.println( "// ERROR // No session_id found in params!" );
        		return;
        	}
            String s = "versionCallback.php";
            String s1 =   "java_version=" + URLEncoder.encode( System.getProperty("java.version") ) + "&" 
            			+ "java_vendor="  + URLEncoder.encode( System.getProperty("java.vendor")  ) + "&" 
            			+ "os_name=" 	  + URLEncoder.encode( System.getProperty("os.name") 	  ) + "&" 
            			+ "os_version="   + URLEncoder.encode( System.getProperty("os.version")   ) + "&" 
            			+ "os_arch=" 	  + URLEncoder.encode( System.getProperty("os.arch") 	  ) + "&"
            			+ sessionID ;
            InputStream inputstream = (new URL(getCodeBase(), s + '?' + s1)).openStream();
            inputstream.close();
        }
        catch(IOException ioexception)
        {
            ioexception.printStackTrace();
        }
    }

    public void paint(Graphics g)
    {
        g.setColor(Color.red);
        Dimension dimension = getSize();
        g.fillRect(0, 0, dimension.width, dimension.height);
    }
}
