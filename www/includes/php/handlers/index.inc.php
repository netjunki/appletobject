<?php


	class index
	extends application
	{
	
		// ?q=index
		// ?q=index/init
		// ?q=index/init/...
		
		function init ()
		{
			$this->render();
			// this is called if action is not set or found
			//$this->render();
		}
		
		function about ()
		{
			$this->init();
		}
	}

?>