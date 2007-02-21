<?php


	class source
	extends application
	{
		
		// this is called if action is not set or not found
		function init ()
		{
			$sourceFile = 'js/appletobject.js';
			$sourceFileCache = 'js/appletobject.js.geshi';
			
			$lastModified = @filemtime($sourceFile);
			$lastModifiedCache = @filemtime($sourceFileCache);
			
			if ( $lastModifiedCache === FALSE
				 || $lastModifiedCache < $lastModified )
			{
				require_once( DIR_INCLUDE."/class.geshi.php" );

				$source = implode('', file($sourceFile));

				$geshi =& new GeSHi( $source , "javascript" );

				$this->sourceHighlighted = $geshi->parseCode();
				
				if (!$handle = fopen($sourceFileCache, 'a+')) {
         			die ( "Cannot open file ($sourceFileCache)" );
   				}

				if (fwrite($handle, $this->sourceHighlighted) === FALSE) {
					die ( "Cannot write to file ($sourceFileCache)" );
   				}

	   			fclose($handle);
				
				$geshi = null;
			}
			else
			{
				$this->sourceHighlighted = implode('', file($sourceFileCache));
			}
			
			$this->render();
		}
	}

?>