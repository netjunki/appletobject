import processing.core.*; import processing.pdf.*; import processing.dxf.*; import processing.candy.*; import processing.xml.*; import java.applet.*; import java.awt.*; import java.awt.image.*; import java.awt.event.*; import java.io.*; import java.net.*; import java.text.*; import java.util.*; import java.util.zip.*; public class xhtml1 extends PApplet {




/**
 *    
 *    Comments from inside the sketch.<br />
 *    And <a href="#">a link</a> to test some HTML.<br />
 *    <br />
 *    fjenett - 2007-01-13
 */

PFont font;
String s;
int i;
int back;

public void setup () 
{
    size(100, 100);
    font = loadFont( "ArialMT-12.vlw" );
    if (online) s = param( "test_string" );
    else s = "offline";
    s = s == null || s.equals("") ? "no \"test_string\"\nparam given" : s ;
    i = 0;
    back = color(0,random(100,255),0);
    Callback.callback( this );
}

public void draw() {
    background( back );
    textFont( font );
    text( s, 10, 20 ); // read from param
    text( i++, 10, height-10 ); // counter to see sketch is running
}
static public void main(String args[]) {   PApplet.main(new String[] { "xhtml1" });}}