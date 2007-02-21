<?php

/**
 *		Dump any variables passed in by the applet into the session array.
 *
 *		2007-02-11 11:07:07 - fjenett
 */

session_start();

foreach( $_GET as $k => $v ) {

	$_SESSION[$k] = $v;

}
?>