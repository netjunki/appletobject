dp.sh.Brushes.Processing = function()
{
	// see:
	// lib/keywords.txt
	// lib/preferences.txt
	
	// bbedit find-replace-grep:
	// ^([a-zA-Z_0-9]+)\s+([^\s]+)\s+([^\s]+)
	// \2 = \2 + '\1'; // \2_href = \2_href + '\3';
	
	var LITERAL1;
	var LITERAL2;
	var KEYWORD1;
	var KEYWORD2;
	var KEYWORD3;

	//# LITERAL1 specifies constants
//
LITERAL1 = LITERAL1 + ' ADD';	
LITERAL1 = LITERAL1 + ' ALIGN_CENTER';	
LITERAL1 = LITERAL1 + ' ALIGN_LEFT';	
LITERAL1 = LITERAL1 + ' ALIGN_RIGHT';	
LITERAL1 = LITERAL1 + ' ALPHA';
LITERAL1 = LITERAL1 + ' ALPHA_MASK';
LITERAL1 = LITERAL1 + ' ALT';
LITERAL1 = LITERAL1 + ' AMBIENT';	
LITERAL1 = LITERAL1 + ' ARROW';	
LITERAL1 = LITERAL1 + ' ARGB';
LITERAL1 = LITERAL1 + ' BACKSPACE';
LITERAL1 = LITERAL1 + ' BEVEL';
LITERAL1 = LITERAL1 + ' BLEND';
LITERAL1 = LITERAL1 + ' BLUE_MASK';
LITERAL1 = LITERAL1 + ' BLUR';
LITERAL1 = LITERAL1 + ' CENTER';	
LITERAL1 = LITERAL1 + ' CENTER_RADIUS';
LITERAL1 = LITERAL1 + ' CHATTER';	
LITERAL1 = LITERAL1 + ' CODED';
LITERAL1 = LITERAL1 + ' COMPLAINT';
LITERAL1 = LITERAL1 + ' COMPOSITE';
LITERAL1 = LITERAL1 + ' COMPONENT';
LITERAL1 = LITERAL1 + ' CONCAVE_POLYGON';
LITERAL1 = LITERAL1 + ' CONTROL';
LITERAL1 = LITERAL1 + ' CONVEX_POLYGON';
LITERAL1 = LITERAL1 + ' CORNER';
LITERAL1 = LITERAL1 + ' CORNERS';
LITERAL1 = LITERAL1 + ' CROSS';
LITERAL1 = LITERAL1 + ' CUSTOM';
LITERAL1 = LITERAL1 + ' DARKEST';
LITERAL1 = LITERAL1 + ' DEGREES';
LITERAL1 = LITERAL1 + ' DEG_TO_RAD';
LITERAL1 = LITERAL1 + ' DELETE';
LITERAL1 = LITERAL1 + ' DIFFERENCE';
LITERAL1 = LITERAL1 + ' DIFFUSE';
LITERAL1 = LITERAL1 + ' DISABLE_TEXT_SMOOTH';	
LITERAL1 = LITERAL1 + ' DISABLED';
LITERAL1 = LITERAL1 + ' DOWN';
LITERAL1 = LITERAL1 + ' ENTER';	
LITERAL1 = LITERAL1 + ' EPSILON';
LITERAL1 = LITERAL1 + ' ESC';
LITERAL1 = LITERAL1 + ' BLEND';
LITERAL1 = LITERAL1 + ' GIF';
LITERAL1 = LITERAL1 + ' GREEN_MASK';
LITERAL1 = LITERAL1 + ' GREY';
LITERAL1 = LITERAL1 + ' HAND';
LITERAL1 = LITERAL1 + ' HALF';	
LITERAL1 = LITERAL1 + ' HALF_PI';
LITERAL1 = LITERAL1 + ' HARD_LIGHT';
LITERAL1 = LITERAL1 + ' HSB';	
LITERAL1 = LITERAL1 + ' IMAGE';
LITERAL1 = LITERAL1 + ' INVERT';
LITERAL1 = LITERAL1 + ' JAVA2D';
LITERAL1 = LITERAL1 + ' JPEG';	
LITERAL1 = LITERAL1 + ' LEFT';	
LITERAL1 = LITERAL1 + ' LIGHTEST';	
LITERAL1 = LITERAL1 + ' LINES';	
LITERAL1 = LITERAL1 + ' LINE_LOOP';	
LITERAL1 = LITERAL1 + ' LINE_STRIP';
LITERAL1 = LITERAL1 + ' MAX_FLOAT';	
LITERAL1 = LITERAL1 + ' MITER';
LITERAL1 = LITERAL1 + ' MODEL';
LITERAL1 = LITERAL1 + ' MOVE';
LITERAL1 = LITERAL1 + ' MULTIPLY';	
LITERAL1 = LITERAL1 + ' NORMALIZED';	
LITERAL1 = LITERAL1 + ' NO_DEPTH_TEST';
LITERAL1 = LITERAL1 + ' NTSC';	
LITERAL1 = LITERAL1 + ' ORTHOGRAPHIC';
LITERAL1 = LITERAL1 + ' OPAQUE';
LITERAL1 = LITERAL1 + ' OPENGL';
LITERAL1 = LITERAL1 + ' ONE';
LITERAL1 = LITERAL1 + ' OVERLAY';
LITERAL1 = LITERAL1 + ' PAL';
LITERAL1 = LITERAL1 + ' P2D';
LITERAL1 = LITERAL1 + ' P3D';
LITERAL1 = LITERAL1 + ' PERSPECTIVE';
LITERAL1 = LITERAL1 + ' PI';
LITERAL1 = LITERAL1 + ' PIXEL_CENTER';
LITERAL1 = LITERAL1 + ' POINTS';	
LITERAL1 = LITERAL1 + ' POLYGON';
LITERAL1 = LITERAL1 + ' POSTERIZE';
LITERAL1 = LITERAL1 + ' PROBLEM';	
LITERAL1 = LITERAL1 + ' PROJECT';	
LITERAL1 = LITERAL1 + ' QUADS';	
LITERAL1 = LITERAL1 + ' QUAD_STRIP';	
LITERAL1 = LITERAL1 + ' QUARTER_PI';	
LITERAL1 = LITERAL1 + ' RAD_TO_DEG';
LITERAL1 = LITERAL1 + ' RADIANS';
LITERAL1 = LITERAL1 + ' RED_MASK';
LITERAL1 = LITERAL1 + ' REPLACE';	
LITERAL1 = LITERAL1 + ' RETURN';
LITERAL1 = LITERAL1 + ' RGB';	
LITERAL1 = LITERAL1 + ' RIGHT';	
LITERAL1 = LITERAL1 + ' ROUND';	
LITERAL1 = LITERAL1 + ' SCREEN';
LITERAL1 = LITERAL1 + ' SECAM';	
LITERAL1 = LITERAL1 + ' SHIFT';	
LITERAL1 = LITERAL1 + ' SPECULAR';
LITERAL1 = LITERAL1 + ' SOFT_LIGHT';
LITERAL1 = LITERAL1 + ' SQUARE';	
LITERAL1 = LITERAL1 + ' SUBTRACT';
LITERAL1 = LITERAL1 + ' SVIDEO';	
LITERAL1 = LITERAL1 + ' TAB';
LITERAL1 = LITERAL1 + ' TARGA';
LITERAL1 = LITERAL1 + ' TEXT';
LITERAL1 = LITERAL1 + ' TIFF';
LITERAL1 = LITERAL1 + ' TFF';
LITERAL1 = LITERAL1 + ' THRESHOLD';	
LITERAL1 = LITERAL1 + ' THIRD_PI';	
LITERAL1 = LITERAL1 + ' TRIANGLE_FAN';
LITERAL1 = LITERAL1 + ' TRIANGLES';	
LITERAL1 = LITERAL1 + ' TRIANGLE_STRIP';	
LITERAL1 = LITERAL1 + ' TUNER';
LITERAL1 = LITERAL1 + ' TWO';
LITERAL1 = LITERAL1 + ' TWO_PI';
LITERAL1 = LITERAL1 + ' UP';	
LITERAL1 = LITERAL1 + ' WAIT';
LITERAL1 = LITERAL1 + ' WHITESPACE';	
LITERAL1 = LITERAL1 + ' false';	
LITERAL1 = LITERAL1 + ' null';	
LITERAL1 = LITERAL1 + ' super';	
LITERAL1 = LITERAL1 + ' this';	
LITERAL1 = LITERAL1 + ' true';	
//

//# KEYWORD1 specifies datatypes
//
KEYWORD1 = KEYWORD1 + ' Boolean';	
KEYWORD1 = KEYWORD1 + ' Byte';	
KEYWORD1 = KEYWORD1 + ' Character';	
KEYWORD1 = KEYWORD1 + ' Class';	
KEYWORD1 = KEYWORD1 + ' Double';	
KEYWORD1 = KEYWORD1 + ' Float';	
KEYWORD1 = KEYWORD1 + ' Integer';	
KEYWORD1 = KEYWORD1 + ' Math';	
KEYWORD1 = KEYWORD1 + ' String';	
KEYWORD1 = KEYWORD1 + ' StringBuffer';	
KEYWORD1 = KEYWORD1 + ' Thread';		
KEYWORD1 = KEYWORD1 + ' abstract';	
KEYWORD1 = KEYWORD1 + ' catch';	
KEYWORD1 = KEYWORD1 + ' class';	
KEYWORD1 = KEYWORD1 + ' continue';	
KEYWORD1 = KEYWORD1 + ' default';	
KEYWORD1 = KEYWORD1 + ' do';	
KEYWORD1 = KEYWORD1 + ' double';	
KEYWORD1 = KEYWORD1 + ' extends';	
KEYWORD1 = KEYWORD1 + ' final';	
KEYWORD1 = KEYWORD1 + ' finally';	
KEYWORD1 = KEYWORD1 + ' import';	
KEYWORD1 = KEYWORD1 + ' implements';	
KEYWORD1 = KEYWORD1 + ' instanceof';	
KEYWORD1 = KEYWORD1 + ' interface';	
KEYWORD1 = KEYWORD1 + ' long';	
KEYWORD1 = KEYWORD1 + ' native';	
KEYWORD1 = KEYWORD1 + ' package';	
KEYWORD1 = KEYWORD1 + ' private';	
KEYWORD1 = KEYWORD1 + ' protected';	
KEYWORD1 = KEYWORD1 + ' public';	
KEYWORD1 = KEYWORD1 + ' return';	
KEYWORD1 = KEYWORD1 + ' short';	
KEYWORD1 = KEYWORD1 + ' static';	
KEYWORD1 = KEYWORD1 + ' switch';	
KEYWORD1 = KEYWORD1 + ' synchronized';	
KEYWORD1 = KEYWORD1 + ' throw';	
KEYWORD1 = KEYWORD1 + ' throws';	
KEYWORD1 = KEYWORD1 + ' transient';	
KEYWORD1 = KEYWORD1 + ' try';	
KEYWORD1 = KEYWORD1 + ' void';	
KEYWORD1 = KEYWORD1 + ' volatile';	
//

//# KEYWORD2 specifies methods and functions
//
KEYWORD2 = KEYWORD2 + ' cache';	
KEYWORD2 = KEYWORD2 + ' curveSegments';	
KEYWORD2 = KEYWORD2 + ' hint';	
KEYWORD2 = KEYWORD2 + ' unHint';	
//

//# THE TEXT ABOVE IS HAND-WRITTEN AND FOUND IN THE FILE "keywords_base.txt"
//# THE TEXT BELOW IS AUTO-GENERATED
//

KEYWORD2 = KEYWORD2 + ' abs'; // KEYWORD2_href = KEYWORD2_href + ' abs_';
KEYWORD2 = KEYWORD2 + ' acos'; // KEYWORD2_href = KEYWORD2_href + ' acos_';
//+=		addassign
//+		addition
KEYWORD2 = KEYWORD2 + ' alpha'; // KEYWORD2_href = KEYWORD2_href + ' alpha_';
KEYWORD2 = KEYWORD2 + ' ambient'; // KEYWORD2_href = KEYWORD2_href + ' ambient_';
KEYWORD2 = KEYWORD2 + ' ambientLight'; // KEYWORD2_href = KEYWORD2_href + ' ambientLight_';
KEYWORD2 = KEYWORD2 + ' append'; // KEYWORD2_href = KEYWORD2_href + ' append_';
KEYWORD2 = KEYWORD2 + ' applyMatrix'; // KEYWORD2_href = KEYWORD2_href + ' applyMatrix_';
KEYWORD2 = KEYWORD2 + ' arc'; // KEYWORD2_href = KEYWORD2_href + ' arc_';
KEYWORD1 = KEYWORD1 + ' Array'; // KEYWORD1_href = KEYWORD1_href + ' Array';
//[]		arrayaccess
KEYWORD2 = KEYWORD2 + ' asin'; // KEYWORD2_href = KEYWORD2_href + ' asin_';
//=		assign
KEYWORD2 = KEYWORD2 + ' atan'; // KEYWORD2_href = KEYWORD2_href + ' atan_';
KEYWORD2 = KEYWORD2 + ' atan2'; // KEYWORD2_href = KEYWORD2_href + ' atan2_';
KEYWORD2 = KEYWORD2 + ' background'; // KEYWORD2_href = KEYWORD2_href + ' background_';
KEYWORD2 = KEYWORD2 + ' beginCamera'; // KEYWORD2_href = KEYWORD2_href + ' beginCamera_';
KEYWORD2 = KEYWORD2 + ' beginShape'; // KEYWORD2_href = KEYWORD2_href + ' beginShape_';
KEYWORD2 = KEYWORD2 + ' bezier'; // KEYWORD2_href = KEYWORD2_href + ' bezier_';
KEYWORD2 = KEYWORD2 + ' bezierDetail'; // KEYWORD2_href = KEYWORD2_href + ' bezierDetail_';
KEYWORD2 = KEYWORD2 + ' bezierPoint'; // KEYWORD2_href = KEYWORD2_href + ' bezierPoint_';
KEYWORD2 = KEYWORD2 + ' bezierTangent'; // KEYWORD2_href = KEYWORD2_href + ' bezierTangent_';
KEYWORD2 = KEYWORD2 + ' bezierVertex'; // KEYWORD2_href = KEYWORD2_href + ' bezierVertex_';
KEYWORD2 = KEYWORD2 + ' binary'; // KEYWORD2_href = KEYWORD2_href + ' binary_';
//&		bitwiseAND
//|		bitwiseOR
KEYWORD2 = KEYWORD2 + ' blend'; // KEYWORD2_href = KEYWORD2_href + ' blend_';
KEYWORD2 = KEYWORD2 + ' blue'; // KEYWORD2_href = KEYWORD2_href + ' blue_';
KEYWORD1 = KEYWORD1 + ' boolean'; // KEYWORD1_href = KEYWORD1_href + ' boolean';
//KEYWORD2 = KEYWORD2 + ' boolean'; // KEYWORD2_href = KEYWORD2_href + ' boolean_';
KEYWORD2 = KEYWORD2 + ' box'; // KEYWORD2_href = KEYWORD2_href + ' box_';
KEYWORD1 = KEYWORD1 + ' break'; // KEYWORD1_href = KEYWORD1_href + ' break';
KEYWORD2 = KEYWORD2 + ' brightness'; // KEYWORD2_href = KEYWORD2_href + ' brightness_';
KEYWORD1 = KEYWORD1 + ' byte'; // KEYWORD1_href = KEYWORD1_href + ' byte';
//KEYWORD2 = KEYWORD2 + ' byte'; // KEYWORD2_href = KEYWORD2_href + ' byte_';
KEYWORD2 = KEYWORD2 + ' camera'; // KEYWORD2_href = KEYWORD2_href + ' camera_';
KEYWORD1 = KEYWORD1 + ' case'; // KEYWORD1_href = KEYWORD1_href + ' case';
KEYWORD2 = KEYWORD2 + ' ceil'; // KEYWORD2_href = KEYWORD2_href + ' ceil_';
KEYWORD1 = KEYWORD1 + ' char'; // KEYWORD1_href = KEYWORD1_href + ' char';
//KEYWORD2 = KEYWORD2 + ' char'; // KEYWORD2_href = KEYWORD2_href + ' char_';
KEYWORD1 = KEYWORD1 + ' class'; // KEYWORD1_href = KEYWORD1_href + ' class';
KEYWORD2 = KEYWORD2 + ' color'; // KEYWORD2_href = KEYWORD2_href + ' color_';
KEYWORD2 = KEYWORD2 + ' colorMode'; // KEYWORD2_href = KEYWORD2_href + ' colorMode_';
//KEYWORD1 = KEYWORD1 + ' color'; // KEYWORD1_href = KEYWORD1_href + ' color_datatype';
//,		comma
////		comment
KEYWORD2 = KEYWORD2 + ' concat'; // KEYWORD2_href = KEYWORD2_href + ' concat_';
//?:	KEYWORD1	conditional_
KEYWORD2 = KEYWORD2 + ' constrain'; // KEYWORD2_href = KEYWORD2_href + ' constrain_';
KEYWORD2 = KEYWORD2 + ' contract'; // KEYWORD2_href = KEYWORD2_href + ' contract_';
KEYWORD2 = KEYWORD2 + ' copy'; // KEYWORD2_href = KEYWORD2_href + ' copy_';
KEYWORD2 = KEYWORD2 + ' cos'; // KEYWORD2_href = KEYWORD2_href + ' cos_';
KEYWORD2 = KEYWORD2 + ' createFont'; // KEYWORD2_href = KEYWORD2_href + ' createFont_';
//{}		curlybraces
KEYWORD2 = KEYWORD2 + ' cursor'; // KEYWORD2_href = KEYWORD2_href + ' cursor_';
KEYWORD2 = KEYWORD2 + ' curve'; // KEYWORD2_href = KEYWORD2_href + ' curve_';
KEYWORD2 = KEYWORD2 + ' curveDetail'; // KEYWORD2_href = KEYWORD2_href + ' curveDetail_';
KEYWORD2 = KEYWORD2 + ' curvePoint'; // KEYWORD2_href = KEYWORD2_href + ' curvePoint_';
KEYWORD2 = KEYWORD2 + ' curveTightness'; // KEYWORD2_href = KEYWORD2_href + ' curveTightness_';
KEYWORD2 = KEYWORD2 + ' curveVertex'; // KEYWORD2_href = KEYWORD2_href + ' curveVertex_';
KEYWORD2 = KEYWORD2 + ' day'; // KEYWORD2_href = KEYWORD2_href + ' day_';
//--		decrement
KEYWORD1 = KEYWORD1 + ' default'; // KEYWORD1_href = KEYWORD1_href + ' default';
KEYWORD2 = KEYWORD2 + ' degrees'; // KEYWORD2_href = KEYWORD2_href + ' degrees_';
KEYWORD2 = KEYWORD2 + ' delay'; // KEYWORD2_href = KEYWORD2_href + ' delay_';
KEYWORD2 = KEYWORD2 + ' directionalLight'; // KEYWORD2_href = KEYWORD2_href + ' directionalLight_';
KEYWORD2 = KEYWORD2 + ' dist'; // KEYWORD2_href = KEYWORD2_href + ' dist_';
///		divide
///**		doccomment
//.		dot
KEYWORD3 = KEYWORD3 + ' draw'; // KEYWORD3_href = KEYWORD3_href + ' draw_';
KEYWORD2 = KEYWORD2 + ' ellipse'; // KEYWORD2_href = KEYWORD2_href + ' ellipse_';
KEYWORD2 = KEYWORD2 + ' ellipseMode'; // KEYWORD2_href = KEYWORD2_href + ' ellipseMode_';
KEYWORD1 = KEYWORD1 + ' else'; // KEYWORD1_href = KEYWORD1_href + ' else';
KEYWORD2 = KEYWORD2 + ' emissive'; // KEYWORD2_href = KEYWORD2_href + ' emissive_';
KEYWORD2 = KEYWORD2 + ' endCamera'; // KEYWORD2_href = KEYWORD2_href + ' endCamera_';
KEYWORD2 = KEYWORD2 + ' endShape'; // KEYWORD2_href = KEYWORD2_href + ' endShape_';
//==		equality
KEYWORD2 = KEYWORD2 + ' exp'; // KEYWORD2_href = KEYWORD2_href + ' exp_';
KEYWORD2 = KEYWORD2 + ' expand'; // KEYWORD2_href = KEYWORD2_href + ' expand_';
KEYWORD1 = KEYWORD1 + ' extends'; // KEYWORD1_href = KEYWORD1_href + ' extends';
KEYWORD1 = KEYWORD1 + ' false'; // KEYWORD1_href = KEYWORD1_href + ' false';
KEYWORD2 = KEYWORD2 + ' fill'; // KEYWORD2_href = KEYWORD2_href + ' fill_';
KEYWORD2 = KEYWORD2 + ' filter'; // KEYWORD2_href = KEYWORD2_href + ' filter_';
KEYWORD1 = KEYWORD1 + ' float'; // KEYWORD1_href = KEYWORD1_href + ' float';
//KEYWORD2 = KEYWORD2 + ' float'; // KEYWORD2_href = KEYWORD2_href + ' float_';
KEYWORD2 = KEYWORD2 + ' floor'; // KEYWORD2_href = KEYWORD2_href + ' floor_';
LITERAL2 = LITERAL2 + ' focused'; // LITERAL2_href = LITERAL2_href + ' focused';
KEYWORD1 = KEYWORD1 + ' for'; // KEYWORD1_href = KEYWORD1_href + ' for_';
LITERAL2 = LITERAL2 + ' frameCount'; // LITERAL2_href = LITERAL2_href + ' frameCount';
KEYWORD2 = KEYWORD2 + ' framerate'; // KEYWORD2_href = KEYWORD2_href + ' framerate_';
LITERAL2 = LITERAL2 + ' framerate'; // LITERAL2_href = LITERAL2_href + ' framerate';
KEYWORD2 = KEYWORD2 + ' frustum'; // KEYWORD2_href = KEYWORD2_href + ' frustum_';
KEYWORD2 = KEYWORD2 + ' get'; // KEYWORD2_href = KEYWORD2_href + ' get_';
//<		greaterthan
//<=		greaterthanorequalto
KEYWORD2 = KEYWORD2 + ' green'; // KEYWORD2_href = KEYWORD2_href + ' green_';
LITERAL1 = LITERAL1 + ' HALF_PI'; // LITERAL1_href = LITERAL1_href + ' HALF_PI';
LITERAL2 = LITERAL2 + ' height'; // LITERAL2_href = LITERAL2_href + ' height';
KEYWORD2 = KEYWORD2 + ' hex'; // KEYWORD2_href = KEYWORD2_href + ' hex_';
KEYWORD2 = KEYWORD2 + ' hour'; // KEYWORD2_href = KEYWORD2_href + ' hour_';
KEYWORD2 = KEYWORD2 + ' hue'; // KEYWORD2_href = KEYWORD2_href + ' hue_';
KEYWORD1 = KEYWORD1 + ' if'; // KEYWORD1_href = KEYWORD1_href + ' if_';
KEYWORD2 = KEYWORD2 + ' image'; // KEYWORD2_href = KEYWORD2_href + ' image_';
KEYWORD2 = KEYWORD2 + ' imageMode'; // KEYWORD2_href = KEYWORD2_href + ' imageMode_';
KEYWORD1 = KEYWORD1 + ' implements'; // KEYWORD1_href = KEYWORD1_href + ' implements';
//++		increment
//!=		inequality
KEYWORD1 = KEYWORD1 + ' int'; // KEYWORD1_href = KEYWORD1_href + ' int';
//KEYWORD2 = KEYWORD2 + ' int'; // KEYWORD2_href = KEYWORD2_href + ' int_';
KEYWORD2 = KEYWORD2 + ' join'; // KEYWORD2_href = KEYWORD2_href + ' join_';
LITERAL2 = LITERAL2 + ' key'; // LITERAL2_href = LITERAL2_href + ' key';
LITERAL2 = LITERAL2 + ' keyCode'; // LITERAL2_href = LITERAL2_href + ' keyCode';
KEYWORD2 = KEYWORD2 + ' keyPressed'; // KEYWORD2_href = KEYWORD2_href + ' keyPressed_';
LITERAL2 = LITERAL2 + ' keyPressed'; // LITERAL2_href = LITERAL2_href + ' keyPressed';
KEYWORD2 = KEYWORD2 + ' keyReleased'; // KEYWORD2_href = KEYWORD2_href + ' keyReleased_';
//<<		leftshift
KEYWORD2 = KEYWORD2 + ' lerp'; // KEYWORD2_href = KEYWORD2_href + ' lerp_';
//<		lessthan
//<=		lessthanorequalto
KEYWORD2 = KEYWORD2 + ' lightFalloff'; // KEYWORD2_href = KEYWORD2_href + ' lightFalloff_';
KEYWORD2 = KEYWORD2 + ' lights'; // KEYWORD2_href = KEYWORD2_href + ' lights_';
KEYWORD2 = KEYWORD2 + ' lightSpecular'; // KEYWORD2_href = KEYWORD2_href + ' lightSpecular_';
KEYWORD2 = KEYWORD2 + ' line'; // KEYWORD2_href = KEYWORD2_href + ' line_';
KEYWORD2 = KEYWORD2 + ' link'; // KEYWORD2_href = KEYWORD2_href + ' link_';
KEYWORD2 = KEYWORD2 + ' loadBytes'; // KEYWORD2_href = KEYWORD2_href + ' loadBytes_';
KEYWORD2 = KEYWORD2 + ' loadFont'; // KEYWORD2_href = KEYWORD2_href + ' loadFont_';
KEYWORD2 = KEYWORD2 + ' loadImage'; // KEYWORD2_href = KEYWORD2_href + ' loadImage_';
KEYWORD2 = KEYWORD2 + ' loadPixels'; // KEYWORD2_href = KEYWORD2_href + ' loadPixels_';
KEYWORD2 = KEYWORD2 + ' loadSound'; // KEYWORD2_href = KEYWORD2_href + ' loadSound_';
KEYWORD2 = KEYWORD2 + ' loadStrings'; // KEYWORD2_href = KEYWORD2_href + ' loadStrings_';
KEYWORD2 = KEYWORD2 + ' log'; // KEYWORD2_href = KEYWORD2_href + ' log_';
//&&		logicalAND
//!		logicalNOT
//||		logicalOR
KEYWORD2 = KEYWORD2 + ' lookat'; // KEYWORD2_href = KEYWORD2_href + ' lookat_';
KEYWORD2 = KEYWORD2 + ' loop'; // KEYWORD2_href = KEYWORD2_href + ' loop_';
KEYWORD2 = KEYWORD2 + ' mag'; // KEYWORD2_href = KEYWORD2_href + ' mag_';
KEYWORD2 = KEYWORD2 + ' max'; // KEYWORD2_href = KEYWORD2_href + ' max_';
KEYWORD2 = KEYWORD2 + ' millis'; // KEYWORD2_href = KEYWORD2_href + ' millis_';
KEYWORD2 = KEYWORD2 + ' min'; // KEYWORD2_href = KEYWORD2_href + ' min_';
//-		minus
KEYWORD2 = KEYWORD2 + ' minute'; // KEYWORD2_href = KEYWORD2_href + ' minute_';
KEYWORD2 = KEYWORD2 + ' modelX'; // KEYWORD2_href = KEYWORD2_href + ' modelX_';
KEYWORD2 = KEYWORD2 + ' modelY'; // KEYWORD2_href = KEYWORD2_href + ' modelY_';
KEYWORD2 = KEYWORD2 + ' modelZ'; // KEYWORD2_href = KEYWORD2_href + ' modelZ_';
//%		modulo
KEYWORD2 = KEYWORD2 + ' month'; // KEYWORD2_href = KEYWORD2_href + ' month_';
LITERAL2 = LITERAL2 + ' mouseButton'; // LITERAL2_href = LITERAL2_href + ' mouseButton';
KEYWORD2 = KEYWORD2 + ' mouseDragged'; // KEYWORD2_href = KEYWORD2_href + ' mouseDragged_';
KEYWORD2 = KEYWORD2 + ' mouseMoved'; // KEYWORD2_href = KEYWORD2_href + ' mouseMoved_';
KEYWORD2 = KEYWORD2 + ' mousePressed'; // KEYWORD2_href = KEYWORD2_href + ' mousePressed_';
LITERAL2 = LITERAL2 + ' mousePressed'; // LITERAL2_href = LITERAL2_href + ' mousePressed';
KEYWORD2 = KEYWORD2 + ' mouseReleased'; // KEYWORD2_href = KEYWORD2_href + ' mouseReleased_';
LITERAL2 = LITERAL2 + ' mouseX'; // LITERAL2_href = LITERAL2_href + ' mouseX';
LITERAL2 = LITERAL2 + ' mouseY'; // LITERAL2_href = LITERAL2_href + ' mouseY';
///*		multilinecomment
//*		multiply
KEYWORD1 = KEYWORD1 + ' new'; // KEYWORD1_href = KEYWORD1_href + ' new';
KEYWORD2 = KEYWORD2 + ' nf'; // KEYWORD2_href = KEYWORD2_href + ' nf_';
KEYWORD2 = KEYWORD2 + ' nfc'; // KEYWORD2_href = KEYWORD2_href + ' nfc_';
KEYWORD2 = KEYWORD2 + ' nfp'; // KEYWORD2_href = KEYWORD2_href + ' nfp_';
KEYWORD2 = KEYWORD2 + ' nfs'; // KEYWORD2_href = KEYWORD2_href + ' nfs_';
KEYWORD2 = KEYWORD2 + ' noCursor'; // KEYWORD2_href = KEYWORD2_href + ' noCursor_';
KEYWORD2 = KEYWORD2 + ' noFill'; // KEYWORD2_href = KEYWORD2_href + ' noFill_';
KEYWORD2 = KEYWORD2 + ' noise'; // KEYWORD2_href = KEYWORD2_href + ' noise_';
KEYWORD2 = KEYWORD2 + ' noiseDetail'; // KEYWORD2_href = KEYWORD2_href + ' noiseDetail_';
KEYWORD2 = KEYWORD2 + ' noiseSeed'; // KEYWORD2_href = KEYWORD2_href + ' noiseSeed_';
KEYWORD2 = KEYWORD2 + ' noLoop'; // KEYWORD2_href = KEYWORD2_href + ' noLoop_';
KEYWORD2 = KEYWORD2 + ' normal'; // KEYWORD2_href = KEYWORD2_href + ' normal_';
KEYWORD2 = KEYWORD2 + ' noSmooth'; // KEYWORD2_href = KEYWORD2_href + ' noSmooth_';
KEYWORD2 = KEYWORD2 + ' noStroke'; // KEYWORD2_href = KEYWORD2_href + ' noStroke_';
KEYWORD2 = KEYWORD2 + ' noTint'; // KEYWORD2_href = KEYWORD2_href + ' noTint_';
KEYWORD1 = KEYWORD1 + ' null'; // KEYWORD1_href = KEYWORD1_href + ' null';
KEYWORD1 = KEYWORD1 + ' Object'; // KEYWORD1_href = KEYWORD1_href + ' Object';
LITERAL2 = LITERAL2 + ' online'; // LITERAL2_href = LITERAL2_href + ' online';
KEYWORD2 = KEYWORD2 + ' open'; // KEYWORD2_href = KEYWORD2_href + ' open_';
KEYWORD2 = KEYWORD2 + ' openStream'; // KEYWORD2_href = KEYWORD2_href + ' openStream_';
KEYWORD2 = KEYWORD2 + ' ortho'; // KEYWORD2_href = KEYWORD2_href + ' ortho_';
KEYWORD2 = KEYWORD2 + ' param'; // KEYWORD2_href = KEYWORD2_href + ' param_';
//()		parentheses
KEYWORD2 = KEYWORD2 + ' perspective'; // KEYWORD2_href = KEYWORD2_href + ' perspective_';
KEYWORD1 = KEYWORD1 + ' PFont'; // KEYWORD1_href = KEYWORD1_href + ' PFont';
KEYWORD2 = KEYWORD2 + ' list'; // KEYWORD2_href = KEYWORD2_href + ' PFont_list_';
LITERAL1 = LITERAL1 + ' PI'; // LITERAL1_href = LITERAL1_href + ' PI';
KEYWORD1 = KEYWORD1 + ' PImage'; // KEYWORD1_href = KEYWORD1_href + ' PImage';
KEYWORD2 = KEYWORD2 + ' alpha'; // KEYWORD2_href = KEYWORD2_href + ' PImage_alpha_';
KEYWORD2 = KEYWORD2 + ' blend'; // KEYWORD2_href = KEYWORD2_href + ' PImage_blend_';
KEYWORD2 = KEYWORD2 + ' copy'; // KEYWORD2_href = KEYWORD2_href + ' PImage_copy_';
KEYWORD2 = KEYWORD2 + ' filter'; // KEYWORD2_href = KEYWORD2_href + ' PImage_filter_';
KEYWORD2 = KEYWORD2 + ' get'; // KEYWORD2_href = KEYWORD2_href + ' PImage_get_';
LITERAL2 = LITERAL2 + ' height'; // LITERAL2_href = LITERAL2_href + ' PImage_height';
KEYWORD2 = KEYWORD2 + ' mask'; // KEYWORD2_href = KEYWORD2_href + ' PImage_mask_';
LITERAL2 = LITERAL2 + ' pixels'; // LITERAL2_href = LITERAL2_href + ' PImage_pixels';
KEYWORD2 = KEYWORD2 + ' set'; // KEYWORD2_href = KEYWORD2_href + ' PImage_set_';
LITERAL2 = LITERAL2 + ' width'; // LITERAL2_href = LITERAL2_href + ' PImage_width';
LITERAL2 = LITERAL2 + ' pixels'; // LITERAL2_href = LITERAL2_href + ' pixels';
LITERAL2 = LITERAL2 + ' pmouseX'; // LITERAL2_href = LITERAL2_href + ' pmouseX';
LITERAL2 = LITERAL2 + ' pmouseY'; // LITERAL2_href = LITERAL2_href + ' pmouseY';
KEYWORD2 = KEYWORD2 + ' point'; // KEYWORD2_href = KEYWORD2_href + ' point_';
KEYWORD2 = KEYWORD2 + ' pointLight'; // KEYWORD2_href = KEYWORD2_href + ' pointLight_';
KEYWORD2 = KEYWORD2 + ' popMatrix'; // KEYWORD2_href = KEYWORD2_href + ' popMatrix_';
KEYWORD2 = KEYWORD2 + ' pow'; // KEYWORD2_href = KEYWORD2_href + ' pow_';
KEYWORD2 = KEYWORD2 + ' print'; // KEYWORD2_href = KEYWORD2_href + ' print_';
KEYWORD2 = KEYWORD2 + ' printCamera'; // KEYWORD2_href = KEYWORD2_href + ' printCamera_';
KEYWORD2 = KEYWORD2 + ' println'; // KEYWORD2_href = KEYWORD2_href + ' println_';
KEYWORD2 = KEYWORD2 + ' printMatrix'; // KEYWORD2_href = KEYWORD2_href + ' printMatrix_';
KEYWORD2 = KEYWORD2 + ' printProjection'; // KEYWORD2_href = KEYWORD2_href + ' printProjection_';
KEYWORD1 = KEYWORD1 + ' PSound'; // KEYWORD1_href = KEYWORD1_href + ' PSound';
KEYWORD2 = KEYWORD2 + ' duration'; // KEYWORD2_href = KEYWORD2_href + ' PSound_duration_';
KEYWORD2 = KEYWORD2 + ' loop'; // KEYWORD2_href = KEYWORD2_href + ' PSound_loop_';
KEYWORD2 = KEYWORD2 + ' noLoop'; // KEYWORD2_href = KEYWORD2_href + ' PSound_noLoop_';
KEYWORD2 = KEYWORD2 + ' pause'; // KEYWORD2_href = KEYWORD2_href + ' PSound_pause_';
KEYWORD2 = KEYWORD2 + ' play'; // KEYWORD2_href = KEYWORD2_href + ' PSound_play_';
KEYWORD2 = KEYWORD2 + ' stop'; // KEYWORD2_href = KEYWORD2_href + ' PSound_stop_';
KEYWORD2 = KEYWORD2 + ' time'; // KEYWORD2_href = KEYWORD2_href + ' PSound_time_';
KEYWORD2 = KEYWORD2 + ' volume'; // KEYWORD2_href = KEYWORD2_href + ' PSound_volume_';
KEYWORD2 = KEYWORD2 + ' pushMatrix'; // KEYWORD2_href = KEYWORD2_href + ' pushMatrix_';
KEYWORD2 = KEYWORD2 + ' quad'; // KEYWORD2_href = KEYWORD2_href + ' quad_';
KEYWORD2 = KEYWORD2 + ' radians'; // KEYWORD2_href = KEYWORD2_href + ' radians_';
KEYWORD2 = KEYWORD2 + ' random'; // KEYWORD2_href = KEYWORD2_href + ' random_';
KEYWORD2 = KEYWORD2 + ' randomSeed'; // KEYWORD2_href = KEYWORD2_href + ' randomSeed_';
KEYWORD2 = KEYWORD2 + ' rect'; // KEYWORD2_href = KEYWORD2_href + ' rect_';
KEYWORD2 = KEYWORD2 + ' rectMode'; // KEYWORD2_href = KEYWORD2_href + ' rectMode_';
KEYWORD2 = KEYWORD2 + ' red'; // KEYWORD2_href = KEYWORD2_href + ' red_';
KEYWORD2 = KEYWORD2 + ' redraw'; // KEYWORD2_href = KEYWORD2_href + ' redraw_';
KEYWORD2 = KEYWORD2 + ' resetMatrix'; // KEYWORD2_href = KEYWORD2_href + ' resetMatrix_';
KEYWORD1 = KEYWORD1 + ' return'; // KEYWORD1_href = KEYWORD1_href + ' return';
KEYWORD2 = KEYWORD2 + ' reverse'; // KEYWORD2_href = KEYWORD2_href + ' reverse_';
//>>		rightshift
KEYWORD2 = KEYWORD2 + ' rotate'; // KEYWORD2_href = KEYWORD2_href + ' rotate_';
KEYWORD2 = KEYWORD2 + ' rotateX'; // KEYWORD2_href = KEYWORD2_href + ' rotateX_';
KEYWORD2 = KEYWORD2 + ' rotateY'; // KEYWORD2_href = KEYWORD2_href + ' rotateY_';
KEYWORD2 = KEYWORD2 + ' rotateZ'; // KEYWORD2_href = KEYWORD2_href + ' rotateZ_';
KEYWORD2 = KEYWORD2 + ' round'; // KEYWORD2_href = KEYWORD2_href + ' round_';
KEYWORD2 = KEYWORD2 + ' saturation'; // KEYWORD2_href = KEYWORD2_href + ' saturation_';
KEYWORD2 = KEYWORD2 + ' save'; // KEYWORD2_href = KEYWORD2_href + ' save_';
KEYWORD2 = KEYWORD2 + ' saveBytes'; // KEYWORD2_href = KEYWORD2_href + ' saveBytes_';
KEYWORD2 = KEYWORD2 + ' saveFrame'; // KEYWORD2_href = KEYWORD2_href + ' saveFrame_';
KEYWORD2 = KEYWORD2 + ' saveStrings'; // KEYWORD2_href = KEYWORD2_href + ' saveStrings_';
KEYWORD2 = KEYWORD2 + ' scale'; // KEYWORD2_href = KEYWORD2_href + ' scale_';
LITERAL2 = LITERAL2 + ' screen'; // LITERAL2_href = LITERAL2_href + ' screen';
KEYWORD2 = KEYWORD2 + ' screenX'; // KEYWORD2_href = KEYWORD2_href + ' screenX_';
KEYWORD2 = KEYWORD2 + ' screenY'; // KEYWORD2_href = KEYWORD2_href + ' screenY_';
KEYWORD2 = KEYWORD2 + ' screenZ'; // KEYWORD2_href = KEYWORD2_href + ' screenZ_';
KEYWORD2 = KEYWORD2 + ' second'; // KEYWORD2_href = KEYWORD2_href + ' second_';
//;		semicolon
KEYWORD2 = KEYWORD2 + ' set'; // KEYWORD2_href = KEYWORD2_href + ' set_';
KEYWORD3 = KEYWORD3 + ' setup'; // KEYWORD3_href = KEYWORD3_href + ' setup_';
KEYWORD2 = KEYWORD2 + ' shininess'; // KEYWORD2_href = KEYWORD2_href + ' shininess_';
KEYWORD2 = KEYWORD2 + ' shorten'; // KEYWORD2_href = KEYWORD2_href + ' shorten_';
KEYWORD2 = KEYWORD2 + ' sin'; // KEYWORD2_href = KEYWORD2_href + ' sin_';
KEYWORD2 = KEYWORD2 + ' size'; // KEYWORD2_href = KEYWORD2_href + ' size_';
KEYWORD2 = KEYWORD2 + ' smooth'; // KEYWORD2_href = KEYWORD2_href + ' smooth_';
KEYWORD2 = KEYWORD2 + ' sort'; // KEYWORD2_href = KEYWORD2_href + ' sort_';
KEYWORD2 = KEYWORD2 + ' specular'; // KEYWORD2_href = KEYWORD2_href + ' specular_';
KEYWORD2 = KEYWORD2 + ' sphere'; // KEYWORD2_href = KEYWORD2_href + ' sphere_';
KEYWORD2 = KEYWORD2 + ' sphereDetail'; // KEYWORD2_href = KEYWORD2_href + ' sphereDetail_';
KEYWORD2 = KEYWORD2 + ' splice'; // KEYWORD2_href = KEYWORD2_href + ' splice_';
KEYWORD2 = KEYWORD2 + ' split'; // KEYWORD2_href = KEYWORD2_href + ' split_';
KEYWORD2 = KEYWORD2 + ' spotLight'; // KEYWORD2_href = KEYWORD2_href + ' spotLight_';
KEYWORD2 = KEYWORD2 + ' sq'; // KEYWORD2_href = KEYWORD2_href + ' sq_';
KEYWORD2 = KEYWORD2 + ' sqrt'; // KEYWORD2_href = KEYWORD2_href + ' sqrt_';
KEYWORD2 = KEYWORD2 + ' status'; // KEYWORD2_href = KEYWORD2_href + ' status_';
KEYWORD2 = KEYWORD2 + ' str'; // KEYWORD2_href = KEYWORD2_href + ' str_';
KEYWORD1 = KEYWORD1 + ' String'; // KEYWORD1_href = KEYWORD1_href + ' String';
KEYWORD2 = KEYWORD2 + ' charAt'; // KEYWORD2_href = KEYWORD2_href + ' String_charAt_';
KEYWORD2 = KEYWORD2 + ' equals'; // KEYWORD2_href = KEYWORD2_href + ' String_equals_';
KEYWORD2 = KEYWORD2 + ' indexOf'; // KEYWORD2_href = KEYWORD2_href + ' String_indexOf_';
KEYWORD2 = KEYWORD2 + ' length'; // KEYWORD2_href = KEYWORD2_href + ' String_length_';
KEYWORD2 = KEYWORD2 + ' substring'; // KEYWORD2_href = KEYWORD2_href + ' String_substring_';
KEYWORD2 = KEYWORD2 + ' toLowerCase'; // KEYWORD2_href = KEYWORD2_href + ' String_toLowerCase_';
KEYWORD2 = KEYWORD2 + ' toUpperCase'; // KEYWORD2_href = KEYWORD2_href + ' String_toUpperCase_';
KEYWORD2 = KEYWORD2 + ' stroke'; // KEYWORD2_href = KEYWORD2_href + ' stroke_';
KEYWORD2 = KEYWORD2 + ' strokeCap'; // KEYWORD2_href = KEYWORD2_href + ' strokeCap_';
KEYWORD2 = KEYWORD2 + ' strokeJoin'; // KEYWORD2_href = KEYWORD2_href + ' strokeJoin_';
KEYWORD2 = KEYWORD2 + ' strokeWeight'; // KEYWORD2_href = KEYWORD2_href + ' strokeWeight_';
KEYWORD2 = KEYWORD2 + ' subset'; // KEYWORD2_href = KEYWORD2_href + ' subset_';
//-=		subtractassign
KEYWORD2 = KEYWORD2 + ' switch'; // KEYWORD2_href = KEYWORD2_href + ' switch_';
KEYWORD2 = KEYWORD2 + ' tan'; // KEYWORD2_href = KEYWORD2_href + ' tan_';
KEYWORD2 = KEYWORD2 + ' text'; // KEYWORD2_href = KEYWORD2_href + ' text_';
KEYWORD2 = KEYWORD2 + ' textAlign'; // KEYWORD2_href = KEYWORD2_href + ' textAlign_';
KEYWORD2 = KEYWORD2 + ' textAscent'; // KEYWORD2_href = KEYWORD2_href + ' textAscent_';
KEYWORD2 = KEYWORD2 + ' textDescent'; // KEYWORD2_href = KEYWORD2_href + ' textDescent_';
KEYWORD2 = KEYWORD2 + ' textFont'; // KEYWORD2_href = KEYWORD2_href + ' textFont_';
KEYWORD2 = KEYWORD2 + ' textLeading'; // KEYWORD2_href = KEYWORD2_href + ' textLeading_';
KEYWORD2 = KEYWORD2 + ' textMode'; // KEYWORD2_href = KEYWORD2_href + ' textMode_';
KEYWORD2 = KEYWORD2 + ' textSize'; // KEYWORD2_href = KEYWORD2_href + ' textSize_';
KEYWORD2 = KEYWORD2 + ' texture'; // KEYWORD2_href = KEYWORD2_href + ' texture_';
KEYWORD2 = KEYWORD2 + ' textureMode'; // KEYWORD2_href = KEYWORD2_href + ' textureMode_';
KEYWORD2 = KEYWORD2 + ' textWidth'; // KEYWORD2_href = KEYWORD2_href + ' textWidth_';
KEYWORD1 = KEYWORD1 + ' this'; // KEYWORD1_href = KEYWORD1_href + ' this';
KEYWORD2 = KEYWORD2 + ' tint'; // KEYWORD2_href = KEYWORD2_href + ' tint_';
KEYWORD2 = KEYWORD2 + ' translate'; // KEYWORD2_href = KEYWORD2_href + ' translate_';
KEYWORD2 = KEYWORD2 + ' triangle'; // KEYWORD2_href = KEYWORD2_href + ' triangle_';
KEYWORD2 = KEYWORD2 + ' trim'; // KEYWORD2_href = KEYWORD2_href + ' trim_';
KEYWORD1 = KEYWORD1 + ' true'; // KEYWORD1_href = KEYWORD1_href + ' true';
LITERAL1 = LITERAL1 + ' TWO_PI'; // LITERAL1_href = LITERAL1_href + ' TWO_PI';
KEYWORD2 = KEYWORD2 + ' unbinary'; // KEYWORD2_href = KEYWORD2_href + ' unbinary_';
KEYWORD2 = KEYWORD2 + ' unhex'; // KEYWORD2_href = KEYWORD2_href + ' unhex_';
KEYWORD2 = KEYWORD2 + ' updatePixels'; // KEYWORD2_href = KEYWORD2_href + ' updatePixels_';
KEYWORD2 = KEYWORD2 + ' vertex'; // KEYWORD2_href = KEYWORD2_href + ' vertex_';
KEYWORD1 = KEYWORD1 + ' void'; // KEYWORD1_href = KEYWORD1_href + ' void';
KEYWORD1 = KEYWORD1 + ' while'; // KEYWORD1_href = KEYWORD1_href + ' while_';
LITERAL2 = LITERAL2 + ' width'; // LITERAL2_href = LITERAL2_href + ' width';
KEYWORD2 = KEYWORD2 + ' year'; // KEYWORD2_href = KEYWORD2_href + ' year_';


	this.regexList = [
		{ regex: new RegExp('//.*$', 'gm'),							css: 'comment' },			// one line comments
		{ regex: new RegExp('/\\*[\\s\\S]*?\\*/', 'g'),				css: 'comment' },			// multiline comments
		{ regex: new RegExp('"(?:[^"\n]|[\"])*?"', 'g'),			css: 'string' },			// double quoted strings
		{ regex: new RegExp("'(?:[^'\n]|[\'])*?'", 'g'),			css: 'string' },			// single quoted strings
		{ regex: new RegExp('^\\s*#.*', 'gm'),						css: 'preprocessor' },		// preprocessor tags like #region and #endregion
		//{ regex: new RegExp(this.GetKeywords(keywords), 'gm'),		css: 'keyword' }			// keywords
		
		{ regex: new RegExp(this.GetKeywords(LITERAL1), 'gm'),		css: 'LITERAL1' },
		{ regex: new RegExp(this.GetKeywords(LITERAL2), 'gm'),		css: 'LITERAL2' },
		{ regex: new RegExp(this.GetKeywords(KEYWORD1), 'gm'),		css: 'KEYWORD1' },
		{ regex: new RegExp(this.GetKeywords(KEYWORD2), 'gm'),		css: 'KEYWORD2' },
		{ regex: new RegExp(this.GetKeywords(KEYWORD3), 'gm'),		css: 'KEYWORD3' }
		];

	this.CssClass = 'dp-processing';
}

dp.sh.Brushes.Processing.prototype	= new dp.sh.Highlighter();
dp.sh.Brushes.Processing.Aliases	= ['p5', 'processing'];
