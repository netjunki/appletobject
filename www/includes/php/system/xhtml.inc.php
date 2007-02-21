<?php

	/**
	*		A plugin-based template system.
	*
	*		the generic xhtml_plugin takes data, processes and outputs it.
	*		each plugin extending xhtml_plugin should override process() to
	*		work upon the data it receives.
	*		xhtml_plugin uses a str_replace-approach to replace "tags" in
	*		the source data with a replacement-data, which again can be
	*		another xhtml_plugin.
	*
	*		@author 	Florian Jenett <fjen@builtwithprocessing.org>
	*		@copyright 	Copyright &copy; 2006, Florian Jenett
	*		@link 		http://builtwithprocessing.org/
	*
	*		@version 	bwp-000.1
	 */
	
	
	
	if ( !defined('BWP') ) die( 'Access Error: '.basename(__FILE__) );
	

	class xhtml_plugin
	{
		var $data_raw;
		var $data_fine;
		var $dirty = true;
		var $elements = array();
		
		var $markup_start = '<!--*-->'; var $markup_end   = '<!--*-->';
		var $insert = '<!--xhtml_plugin_insert-->';
		
		function xhtml_plugin ( $data="xhtml_plugin: Plugin test." ) {
			$this->data_raw = $data;
		}
		
		function set ( $kv, $value=NULL )
		{
			if ( !is_array($this->elements) )
			{
				$this->elements = array();
			}
			
			if (empty($value) && is_array($kv) )
			{
				foreach ( $kv as $k => $v )
				{
					$this->elements[$k] = $v;
				}
				
			} else {
			
				$this->elements[$kv] = $value;
			}
			
			$this->dirty = true;
		}
		
		function process ()
		{
			if ( !$this->dirty ) return;
			
			if ( is_array($this->elements) )
			{
				foreach( $this->elements as $k=>$v )
				{
					if ( is_array( $v ) )
					{
						$v = $this->process_array( $v );
					}
					
					$v_class 	= get_class( $v );
						
					if ( $v_class === FALSE ) {
					
						$this->data_raw = str_replace( $this->markup($k) , $this->process_input($v) , $this->data_raw );
					
					} elseif ( is_subclass_of($v,'xhtml_plugin') || $v_class == 'xhtml_plugin' ) {
					
						$this->data_raw = str_replace( $this->markup($k) , $this->process_input($v->out()) , $this->data_raw );
					}
				}
			}
			
			$this->data_fine = str_replace( $this->insert, '', $this->data_raw );
			$this->dirty = false;
		}
		
		function process_array ($arr)
		{
			$arr_size = sizeof($arr);
			
			for( $i=0 ; $i < $arr_size ; $i++ )
			{
				if ( @is_subclass_of($arr[$i], 'xhtml_plugin') || @get_class($arr[$i])=='xhtml_plugin' ) {
				
					$arr[$i] = $arr[$i]->out();
				}
			}
			
			return implode( '', $arr );
		}
		
		function process_input ($input)
		{
			return $input;
		}
		
		function set_replace ( $kv, $value=NULL )
		{
			$this->set($kv, $value);
			$this->process();
		}
		
		function out () {
			if ($this->dirty) $this->process();
			$this->dirty = false;
			return $this->data_fine;
		}
		
		function markup ( $key )
		{
			return $this->markup_start.$key.$this->markup_end;
		}
		
		function uniqueid ()
		{
			return dechex(crc32(microtime()));
		}
	}
	
	class xhtml_page
	extends xhtml_plugin
	{
		var $file;
		var $insert = '<!--content-->';
		var $inserted = '<!--content-->';
	
		function xhtml_page ( $file=NULL )
		{
			if ( $file !== NULL ) $this->file = $file;
		}
		
		function set_template ( $file )
		{
			$this->file = $file;
			
			$file = DIR_TEMPLATE.'/'.$this->file;
			
			if ( 	!empty($file)
				 && file_exists($file)
				 && is_readable($file)
				 && strstr($file,'.html') !== FALSE
			   )
			{
				return true;
			}
			else
			{
				if ( DEBUG ) die( 'Error checking template:<br />'.$file );
				return false;
			}
		}
		
		function parse_template (  )
		{
			$file = DIR_TEMPLATE.'/'.$this->file;
			
			if ( 	!empty($file)
				 && file_exists($file)
				 && is_readable($file)
				 && strstr($file,'.html') !== FALSE
			   )
			{
				ob_start();
					require($file);
					$this->data_raw = ob_get_contents();
				ob_end_clean();
				return true;
			}
			else
			{
				if ( DEBUG ) die( 'Error parsing template:<br />'.$file.'<br />'.get_class($this) );
				return false;
			}
		}
		
		function insert ( $value )
		{
			$value_id = 'insert_'.md5(microtime());
			
			$this->set($value_id, $value);
			
			$this->inserted = str_replace(
											$this->insert, 
											$this->markup($value_id).$this->insert, 
											$this->inserted
										 );
			
			$this->dirty = true;
			
			return $value_id;
		}
		
		function process ()
		{
			$this->parse_template();
			
			$this->data_raw = str_replace(
									$this->insert, 
									$this->inserted,
									$this->data_raw
								 );
			parent::process();
		}
	}

?>