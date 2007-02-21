<?php

	/**
	*		database startup and functions
	*
	*		@author 	Florian Jenett <fjen@builtwithprocessing.org>
	*		@copyright 	Copyright &copy; 2006, Florian Jenett
	*		@link 		http://builtwithprocessing.org/
	*
	*		@version 	bwp-000.1
	 */
	 
	
	
	if ( !defined('BWP') ) die( 'Access Error: '.basename(__FILE__) );
	
	
	// 
	//
	
	function db_init ( $run_local = true )
	{
		if ( $run_local )
		{	
			$db_conn = mysql_connect( '' , '', '')
						or die('Could not connect: ' . mysql_error());
			
			mysql_select_db('')
						or die('Could not select database');
		}
		else
		{
			$db_conn = mysql_connect('', '', '')
						or die('Could not connect: ' . mysql_error());
			
			mysql_select_db('')
						or die('Could not select database');
		
		}
		
		return $db_conn;
	}
	
	
	// switch local / live
	//
	
	$run_local = 	true
				 || $_SERVER['SERVER_NAME'] == 'localhost'
				 || $_SERVER['SERVER_ADDR'] == '127.0.0.1'
				 || strpos( $_SERVER['SERVER_ADDR'], '192.168.' ) !== FALSE	;
					
	//db_init( $run_local );
	
	
	
	// some handy functions
	//
	
	function db_query ( $sql )
	{
		$res = mysql_query($sql) 
			   or die( $sql.'<br />'.mysql_error() );
	
		@mysql_free_result( $res );
	}
	
	
	
	function db_fetch_array ( $sql )
	{
		$res = mysql_query($sql) 
			   or die( $sql.'<br />'.mysql_error() );
		
		$arr = array();
		while ( $row = mysql_fetch_array( $res, MYSQL_ASSOC ) )
		{
			$arr[] = $row;
		}
		
		@mysql_free_result( $res );
		
		return $arr;
	}
	
	
	
	function db_fetch_row ( $sql )
	{
		$res = mysql_query($sql) 
			   or die( $sql.'<br />'.mysql_error() );
		
		$row = mysql_fetch_array( $res, MYSQL_ASSOC );
		
		@mysql_free_result( $res );
		
		if ( is_array($row) )
			return $row;
		else
			return false;
	}
	
	
	
	function db_fetch_result ( $sql )
	{
		$res = mysql_query($sql) 
			   or die( $sql.'<br />'.mysql_error() );
		
		$row = mysql_fetch_array( $res, MYSQL_ASSOC );
		
		@mysql_free_result( $res );
		
		if ( is_array($row) )
			return array_pop( $row );
		else
			return false;
	}
	
	
?>