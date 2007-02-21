<?php


	class menu
	extends application
	{
		
		// this is called if action is not set or not found
		function init ( $args )
		{
			global $Q;
			
			$this->menuitemSelected = 0;
			
			$this->menuitems = array (
				'about' => 'index.php',
				'-',
				'source' => "index.php?q=source",
				'docs' => "index.php?q=docs",
				//'cvs' => "http://svn.sourceforge.net/viewvc/ez-applet-html/trunk/",
				//'svn' => "http://svn.sourceforge.net/svnroot/ez-applet-html/trunk/",
				'-',
				'examples' => "index.php?q=examples",
				'-',
				'contact' => "index.php?q=contact",
				'-',
				'project-page' => "http://appletobject.projectpath.com/projects/871799/"
			);
			
			$s = 0;
			foreach ( $this->menuitems as $k => $v ) {
				if ( preg_match( '/^'.$Q.'.*/i', $k ) ) {
					$this->menuitemSelected = $s; break;
				}
				$s++;
			}
		}
	}

?>