<?php

	/**
	*		main object for handle
	*
	*		@author 	Florian Jenett <fjen@builtwithprocessing.org>
	*		@copyrightÊ	CopyrightÊ&copy;Ê2006,ÊFlorian Jenett
	*		@linkÊ		http://builtwithprocessing.org/
	*
	*		@version 	bwp-000.1
	 */


	class application
	extends xhtml_page
	{
		/**
		*		render
		*
		*		inserts this plugin as element into the page
		*
		 */
		 
		function render ()
		{
			global $PAGE;
			$PAGE->insert( $this );
		}
	}

?>