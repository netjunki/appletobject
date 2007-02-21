<?php

	/**
	*		settings, definitions, startup, ...
	*
	*		@author 	Florian Jenett <fjen@builtwithprocessing.org>
	*		@copyrightÊ	CopyrightÊ&copy;Ê2006,ÊFlorian Jenett
	*		@linkÊ		http://builtwithprocessing.org/
	*
	*		@version 	bwp-000.1
	 */


	if ( !defined('BWP') ) die( 'Access Error: '.basename(__FILE__) );
	
	DEFINE( 'DEBUG', 		TRUE );
	DEFINE( 'SUPERDEBUG', 	TRUE );
	
	DEFINE( 'DIR_INCLUDE',  dirname(__FILE__).	'/php' 			 	);
	DEFINE( 'DIR_SYSTEM',   DIR_INCLUDE.		'/system' 		 	);
	DEFINE( 'DIR_SESSIONS', DIR_INCLUDE.		'/sessions' 	 	);
	DEFINE( 'DIR_TEMPLATE', DIR_INCLUDE.		'/template' 	 	);
	
	DEFINE( 'DIR_IMAGES',   dirname(__FILE__).	'/../images' 	 	);
	DEFINE( 'WEB_IMAGES',   str_replace( $_SERVER['DOCUMENT_ROOT'], 
										 '', 
										 realpath(DIR_IMAGES))	  	);
	
	DEFINE(  'DIR_UPLOADS',  DIR_INCLUDE.'/uploads' 				);
	
	ini_set( 'file_uploads', 		TRUE );
	ini_set( 'upload_tmp_dir', 		DIR_SYSTEM.'/tmp' );
	ini_set( 'upload_max_filesize', 100000 ); // 100kb
	ini_set( 'post_max_size', 		120000 ); // 120kb
	
	
	function init ()
	{
		require_dir(  DIR_SYSTEM 								  	);
		require_once( DIR_INCLUDE.'/handlers/application.inc.php' 	);
		require_dir(  DIR_INCLUDE.'/handlers' 					  	);
		
		if( !sizeof( $_GET ) )
		{
			foreach( $_POST as $k => $v )
			{
				$_GET[$k] = $v;
			}
		}
	}
	
	
	// function to require_once() all files in a dir
	//
	
	function require_dir ( $dirpath, $mask='/\.inc\.php$/i' )
	{
		$dirhandle = dir( $dirpath );
		while( $incfile = $dirhandle->read())
		{
			if ( preg_match( $mask, $incfile) ) require_once( $dirhandle->path.'/'.$incfile );
		}
		@closedir($dirhandle);
	}
	
	init();
?>