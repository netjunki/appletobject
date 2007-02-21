import processing.pdf.*;
import processing.dxf.*;
import processing.candy.*;
import processing.xml.*;

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

void setup () 
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

void draw() {
    background( back );
    textFont( font );
    text( s, 10, 20 ); // read from param
    text( i++, 10, height-10 ); // counter to see sketch is running
}
