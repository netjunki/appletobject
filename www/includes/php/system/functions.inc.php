<?php
	
	/**
	*		a big functions mesh-up.
	*
	*		@author 	Florian Jenett <fjen@builtwithprocessing.org>
	*		@copyrightÊ	CopyrightÊ&copy;Ê2006,ÊFlorian Jenett
	*		@linkÊ		http://builtwithprocessing.org/
	*
	*		@version 	bwp-000.1
	 */
	
	
	
	if ( !defined('BWP') ) die( 'Access Error: '.basename(__FILE__) );
	
	
	
	/**
	*		handle
	*
	*		simulate the handler -> action -> args behaviour as implemented in ror.
	*		for example ?q=foo/bar will try to make an instance of foo and call
	*		it's bar method foo->bar();
	*		besides calling the method on the instance, handle() also checks if
	*		a template is available and passes it to the instance.
	*		calling the above foo->bar will look for a template foo_bar.html and if
	*		that's not available will check foo.html (the handlers default template ).
	*		
	*
	*		@param 		string 		$handler		the handler object to call
	*
	*		@param 		string 		$action			the action to method to call 
	*												inside the handler
	*
	*		@param 		mixed 		$args			(all) additional arguments
	*
	*		@return		mixed						instance of the handler or false
	*
	 */
	
	
	function handle( $handler, $action, $args )
	{
		if ( class_exists( $handler ) )
		{
			if ( is_callable(  array($handler, $action) ) )
			{
				$instance = new $handler();
				
				if (    $instance->set_template( $handler.'_'.$action.'.html') === FALSE
					 && $instance->set_template( $handler.'.html') === FALSE
				   )
					if (DEBUG) die('Unable to load template:<br />- '.$handler.'.html<br />- '.$handler.'_'.$action.'.html');
					else return handle('index', '', '');
				
				$instance->$action($args);
				
				return $instance;
			}
			else if ( is_callable(  array($handler, 'init') ) )
			{
				$instance = new $handler();
				
				if ( $instance->set_template( $handler.'.html') === FALSE )
					if (DEBUG) die('Unable to load template:<br />'.$handler.'.html');
					else return handle('index', '', '');
					
				$instance->init($args);
				
				return $instance;
			}
			else
			{
				if (DEBUG) die( $handler.'->'.$action.'()<br />Action not found.' );
				else return handle('index', '', '');
			}
		}
		else
		{
			if (DEBUG) die( $handler.'<br />Handler not found.' );
			else return handle('index', '', '');
		}
		
		return false;
	}
	
	

	/**
	*		upload
	*
	*		guess what ... upload files, with german error messages.
	*
	*		@return		mixed 		file-name if upload successful or false
	*
	 */
	
	
	function upload ()
	{
		ini_set('max_execution_time', 60*2);
		
		$php_uploaderrs = array(
			UPLOAD_ERR_INI_SIZE 	=> 'Die Datei ist zu gross. Es k&ouml;nnen nur Dateien bis zu einer Dateigr&ouml;sse von 1 mb hogeladen werden.', //"The uploaded file exceeds the upload_max_filesize directive in php.ini.",
			UPLOAD_ERR_FORM_SIZE 	=> 'Die Datei ist zu gross. Es k&ouml;nnen nur Dateien bis zu einer Dateigr&ouml;sse von 1 mb hogeladen werden.', //"The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.",
			UPLOAD_ERR_PARTIAL 		=> 'Die Datei wurde nicht vollst&auml;ndig hochgeladen.', //"The uploaded file was only partially uploaded.",
			UPLOAD_ERR_NO_FILE 		=> 'Es wurde keine Datei hochgeladen.', //"No file was uploaded.",
			UPLOAD_ERR_NO_TMP_DIR 	=> 'Das tempor&auml;re Upload-Verzeichnis wurde nicht gefunden.', //"Missing a temporary folder.",
			UPLOAD_ERR_CANT_WRITE 	=> 'Es Konnte nicht auf die Server-Festplatte geschrieben werden.', //"Failed to write file to disk.",
			UPLOAD_ERR_EXTENSION 	=> 'Software-Fehler.' //"Extension Error."
		);
		
		$max_file_size   = 250000; // 250kb
		$allowed_types   = array('image/x-png', 'image/png', 'image/pjpeg', 'image/jpeg', 'image/gif' );
		$allowed_ext     = array('jpg', 'png', 'jpeg', 'gif' );
		
		if (    isset($_FILES['file'])
			 && sizeof($_FILES['file']) > 0
			 && $_FILES['file']['error'] == UPLOAD_ERR_OK )
		{
			$file = strtolower(basename($_FILES['file']['name']));
			$file = preg_replace( '/[^-a-zA-Z0-9._]/i', '', $file );
			$ext  = preg_replace( '/.*\.([a-z]{3,4})$/i', '\1', $file);
			
			$filepath = DIR_UPLOADS.'/'.$file;
			
			if (    in_array( $_FILES['file']['type'], $allowed_types )
				 && in_array( $ext  ,$allowed_ext )
			   )
			{
				
				if ( $_FILES['file']['size'] <= $max_file_size )
				{
					// will be moved afterwards anyways ... so replace is ok.
					//
					/*if ( 	 !file_exists( $filepath )
						  || isset($_GET['replace'])
					   )
					{*/
						if ( is_uploaded_file( $_FILES['file']['tmp_name'] ) )
						{
						
							$isize = getimagesize($_FILES['file']['tmp_name']);
							
							if( $isize[0] > 300 && $isize[0] < 1200 && $isize[0] > 200 && $isize[0] < 1000 )
							{
								
								if ( move_uploaded_file( $_FILES['file']['tmp_name'], $filepath ) )
								{
									message( 'Datei '.$file.' wurde erfolgreich hochgeladen.' );
									return $file;
								}
								else error( 'System-Fehler beim Verschieben der Datei (-3).' );
							}
							else error( 'Die Bild-Datei ist zu gross ( > 1200x1000 px ) oder zu klein ( < 300x200 px ).' );
						}
						else error( 'System-Fehler beim Hochladen der Datei (-2).' );
					/*}
					else error( 'Datei mit diesem Namen existiert bereits. Bitte umbenennen.' );*/
				}
				else error( 'Die Datei ist zu gross (~ '.substr( ((float)$_FILES['file']['size']/1000), 0, 4 ).' kb).<br />Sie darf nur maximal <b>'.substr( ($max_file_size/1000), 0, 4 ).' kb</b> gross sein.' );
			}
			else error( 'Die Datei ist im falschen Format.<br />Es k&ouml;nnen nur <b>JPGs, GIFs oder PNGs</b> hochgeladen werden.' );
		}
		else if ( $_FILES['file']['error'] != UPLOAD_ERR_NO_FILE )
			error( 'System-Fehler beim Hochladen der Datei ('.$_FILES['file']['error'].').<br />'.$php_uploaderrs[$_FILES['file']['error']] );
		
		//print_r( $_FILES['file'] );
		
		return FALSE;
	} 
		


	/**
	*		html_utf8
	*
	*		this is like htmlentities(), but specialized for utf8.
	*
	*		@param		string		$plain		raw string to convert
	*
	*		@param		bool		$endings	switch to set wether to 
	*											convert line-endings or not.
	*
	*		@return		string 		converted string
	*
	 */
	 
	
	function html_utf8 ( $plain , $endings=TRUE )
	{
		$plain = is_utf8($plain) ? utf8_decode($plain) : $plain;
		
		$trans = get_html_translation_table(HTML_ENTITIES, ENT_COMPAT);
		
		foreach ($trans as $key => $value)
			$trans[$key] = '&#'.ord($key).';';
		
		$plain = strtr($plain, $trans);
		
		if ($endings) $plain = preg_replace( '/\r\n|\r|\n/', '<br />', $plain);
		
		return $plain;
	}
	
	// wrapper function
	//
	
	function h ( $str ) { return html_utf8(trim($str));	}
	
	
	
	/**
	*		is_utf8
	*
	*		check wether a given string is utf8-encoded or not
	*
	*		@author 	<bmorel@ssi.fr>
	*		@link		http://www.php.net/manual/en/function.utf8-encode.php
	*
	*		@param		string		$str		string to check
	*
	*		@return		bool 		
	*
	 */
	
	
	function is_utf8 ($str)
	{
		for ($i=0; $i<strlen($str); $i++)
		{
			if (ord($str[$i]) < 0x80) continue; 			# 0bbbbbbb
			elseif ((ord($str[$i]) & 0xE0) == 0xC0) $n=1; 	# 110bbbbb
			elseif ((ord($str[$i]) & 0xF0) == 0xE0) $n=2; 	# 1110bbbb
			elseif ((ord($str[$i]) & 0xF8) == 0xF0) $n=3; 	# 11110bbb
			elseif ((ord($str[$i]) & 0xFC) == 0xF8) $n=4; 	# 111110bb
			elseif ((ord($str[$i]) & 0xFE) == 0xFC) $n=5; 	# 1111110b
			else return false; 								# Does not match any model
			
			for ($j=0; $j<$n; $j++)
			{ 												# n bytes matching 10bbbbbb follow ?
				if ((++$i == strlen($str)) || ((ord($str[$i]) & 0xC0) != 0x80))
					return false;
			}
		}
		return true;
	}
	
	
	
	
	/**
	*		utf8
	*
	*		encode a string as utf8
	*
	*		@param		string		$str		string to check
	*
	*		@return		string		utf8-encoded string 		
	*
	 */
	
	
	function utf8 ($str)
	{
		$str = get_magic_quotes_gpc() ? stripslashes($str) : $str;
		return is_utf8($str) ? $str : utf8_encode($str);
	}
?>