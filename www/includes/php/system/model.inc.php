<?php


	/**
	*		models around mysql tables
	*
	*		@author 	Florian Jenett <fjen@builtwithprocessing.org>
	*		@copyrightÊ	CopyrightÊ&copy;Ê2006,ÊFlorian Jenett
	*		@linkÊ		http://builtwithprocessing.org/
	*
	*		@version 	bwp-000.1
	 */
	 
	 
	if ( !defined('BWP') ) die( 'Access Error: '.basename(__FILE__) );
	
	
	$_SYS = array();
	
	define( MYSQLMODEL_LOAD_DEEP, TRUE );
	define( MYSQLMODEL_LOAD_SHALLOW, FALSE );

	class MySQLModel
	{
		var $type;
		var $deepload;
		
		var $primaryKey;
		var $definition;
		
		function Model(){$args=func_get_args();call_user_func_array(array(&$this,'__construct'),$args);}
		function __construct ()
		{
			global $_SYS;
			
			$this->type = get_class($this);
			
			if ( empty($_SYS['OBJECT_DEFINITIONS'][$this->type]) )
			{
				$_SYS['OBJECT_DEFINITIONS'][$this->type] = db_fetch_array( 'DESCRIBE '.$this->type );
			}
			$this->definition = $_SYS['OBJECT_DEFINITIONS'][$this->type];
			
			foreach( $this->definition as $column )
			{
				if ( $column['Key'] == 'PRI' )
				{
					$this->primaryKey = $column['Field'];
				}
			}
			if ( !isset($this->primaryKey) || empty($this->primaryKey) ) die( $this->type.'(): no primary key found.' );

		}
		
		function mysql_type ( $mysql_type, $value )
		{
			$type = preg_replace('/([^(]*)\(.*/i', '\1',    $mysql_type);
			$max  = preg_replace('/[^(]*\((.*)\)$/i', '\1', $mysql_type);
			
			//print_r( array($type, $max, $value) );
			
			switch( $type )
			{
				case 'varchar':
				case 'text':
				case 'tinytext':
					$value = mysql_real_escape_string(utf8($value));
					return "'".$value."'"; //preg_match( '/^.'.( (int)$max == 0 ? '*' : '{0,'.$max.'}' ).'$/i', $value) ? '"'.$value.'"' : FALSE;
					break;
				
				case 'int':
				case 'tinyint':
				case 'bigint':
					$value = (int)$value;
					return preg_match( '/^[0-9]'.( (int)$max == 0 ? '*' : '{0,'.$max.'}' ).'$/i', $value) ? $value : FALSE;
					break;
					
				case 'enum':
					$enums = explode(',',$max);
					return in_array("'".$value."'",$enums) ? "'".mysql_real_escape_string(utf8($value))."'" : FALSE;
					break;
					
				case 'date':
					return '"'.$value.'"';
					break;
					
				default:
			}
		}
	}
	
	function &load ( $model, $where='', $deep = MYSQLMODEL_LOAD_SHALLOW )
	{
		global $_SYS;
	
		$r = db_fetch_row( 'SELECT * FROM '.$model->type.' '.(!empty($where)?'WHERE '.implode(' AND ',$where):'').' LIMIT 1' );
		
		if (     isset( $_SYS['OBJECT_MEMORY'][$model->type][$r[$model->primaryKey]] )
			 && !empty( $_SYS['OBJECT_MEMORY'][$model->type][$r[$model->primaryKey]] )
		) {
			return $_SYS['OBJECT_MEMORY'][$model->type][$r[$model->primaryKey]];
		}
		
		if ( !is_array($r) ) return FALSE;
		
		foreach ( $r as $k => $v ) { $model->$k = $v; }
		
		if ( $deep )
		{
			foreach ( $model->has_one as $k => $v )
			{
				$model->{$k} = load(new $k(), array($v[0].'='.$model->{$v[1]}) );
			}
			foreach ( $model->has_many as $k => $v )
			{
				if (!is_array($model->{$k}))
				
				$model->{$k} = array();
				$model->{$k}[] = load(new $k(), array($v[0].'='.$model->{$v[1]}) );
			}
			$mode->deepload = true;
		}
		else
			$mode->deepload = false;
			
		$_SYS['OBJECT_MEMORY'][$model->type][$model->id] =& $model;
		return $model;
	}
	
	
	// One for every table
	//
	
	class sketch_description
	extends MySQLModel
	{
		function sketch_description () { return parent::__construct(); }
	}
	
	class sketch_preview
	extends MySQLModel
	{
		function sketch_preview () { return parent::__construct(); }
	}
	
	class pde
	extends MySQLModel
	{
		var $has_one  = array( 'sketch' => array('id','sid') );
		
		function pde () { return parent::__construct(); }
	}
	
	class java
	extends MySQLModel
	{
		function java () { return parent::__construct(); }
	}
	
	class text
	extends MySQLModel
	{
		function text () { return parent::__construct(); }
	}
	
	class sketchbook
	extends MySQLModel
	{
		function sketchbook () { return parent::__construct(); }
	}
	
	class sketch
	extends MySQLModel
	{
		var $has_many = array( 'sketch_preview' 	=> array('sid','id'), 
							   'pde'  				=> array('sid','id'), 
							   'java' 				=> array('sid','id'), 
							   'text' 				=> array('sid','id')
							 );
		var $has_one  = array( 'sketch_description' => array('sid','id'),
							   'sketchbook'			=> array('id','bid')
							 );
		
		function sketch () { return parent::__construct(); }
	}
?>
<?php
	
	// TEST // // TEST // // TEST // // TEST // // TEST // // TEST //
	
	if ( false ) {
		echo '<pre>';
		
		$rnd = rand(0,6000);
		
		$s  = &load( new sketch(), array('id='.$rnd,'onoff=1'), MYSQLMODEL_LOAD_DEEP );
		$s2 = &load( new sketch(), array('id='.$rnd,'onoff=1'), MYSQLMODEL_LOAD_DEEP );
	
		if ( $s )
		{
			$s->test = 'abc';
			echo (($s === $s2) ? 'Passed' : 'Not passed')."\r";
			echo (($s->test === $s2->test) ? 'Passed' : 'Not passed')."\r";
			echo (($s->sketch_description === $s2->sketch_description) ? 'Passed' : 'Not passed')."\r";
			echo (($s->sketchbook->cleanurl === $s2->sketchbook->cleanurl) ? 'Passed' : 'Not passed')."\r";
			$s->sketchbook->test = 'abc';
			echo (($s->sketchbook->test === $s2->sketchbook->test) ? 'Passed' : 'Not passed')."\r";
		}
		else
			echo 'Not loaded';
	
		echo '</pre>';
	}
?>