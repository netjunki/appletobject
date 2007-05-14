<?php

/**
 *		this file is part of appletobject.js, please see:
 *		http://appletobject.org/
 *
 *		------------------------------------------------------------------
 *
 *
 *		------------------------------------------------------------------
 *
 *		2007-02-11 11:07:07 - fjenett
 */

session_start();

foreach( $_GET as $k => $v ) {

	$_SESSION[$k] = $v;

}
?>