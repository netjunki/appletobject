<?php


	/**
	*		main file, system entrance, 
	*
	*		@author 	Florian Jenett <fjen@builtwithprocessing.org>
	*		@copyright 	Copyright &copy; 2006, Florian Jenett
	*		@link 		http://builtwithprocessing.org/
	*
	*		@version 	bwp-000.1
	 */
 
 
 	// load settings
 	//
 	
	DEFINE( 'BWP', TRUE );
	require_once( 'includes/bootstrap.php' );
	
	
	// create page
	//
	
	$PAGE 	  = new xhtml_page( 'page.html' );
	
	
	// q, the query
	
	$Q 		  = isset( $_GET['q'] ) ? urldecode( $_GET['q'] ) : 'index';
	
	
	// set page title
	
	$PAGE->set( 'title', !empty($Q) ? strtoupper(h($Q)).' | Project AppletObject' : 'Project AppletObject' );
	
	
	$PAGE->set( 'menu', handle('menu', '', '') );
	
	
	// extract handler, action, args from query
	//
	
	$QA 	  = explode('/', $Q);
	$QHANDLER = array_shift($QA);
	$QACTION  = array_shift($QA);
	
	
	//handle( 'menu', 'build', array($QHANDLER, $QACTION, $QA) );
	
	
	// handle no query ( set default action )
	//
	
	if ( !$Q || empty($Q) )
	{
		handle( 'index', '', '' );
	}
	else
	{
		handle( $QHANDLER, $QACTION, $QA );
	}
	
	
	// this renders the page (and sub-items) and returns them to the browser
	//
	
	echo $PAGE->out();
?>