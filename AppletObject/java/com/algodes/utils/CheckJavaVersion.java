/*
 *	this file is part of appletobject.js,
 *	please see:
 *	http://appletobject.org/
 *
 *  ----------------------------------------------------------------------------
 *	
 *	...
 *
 *  ----------------------------------------------------------------------------
 *	
 *  changed: 2007-xx-xx stephen
 *
 */

package com.algodes.utils;
/*
 to compile so that java 1.1 can play the applet use...
 		javac -target 1.1 -source 1.2 -Xlint:deprecation CheckJavaVersion.java
 
 */

import java.applet.Applet;
import java.awt.Color;
import java.awt.Label;
import java.net.URL;
import java.net.URLEncoder;

public class CheckJavaVersion extends Applet {

	public void init() {
        setBackground(Color.white);
        Color fontColour = new Color(240, 240, 240);
        Label tfVersionVendor = new Label("Java Version: " + System.getProperty("java.version") + "  from " + System.getProperty("java.vendor"));
        tfVersionVendor.setForeground(fontColour);
        add(tfVersionVendor);
        
		try {
			String redirect_url = getParameter("url");
			String params = getParameter("params");
			if(redirect_url!=null && !redirect_url.equals("")){
				params += "&version="+System.getProperty("java.version");
				params += "&vendor="+URLEncoder.encode(System.getProperty("java.vendor"));
				URL url = new URL(redirect_url+"?"+params);
				url.getContent();
			} else {
				System.err.println("You must provide a url parameter in order to have a script called."); 
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
