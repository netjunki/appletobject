<?php
	

	/**
	*		sessions, login / logout
	*
	*		@author 	Florian Jenett <fjen@builtwithprocessing.org>
	*		@copyrightÊ	CopyrightÊ&copy;Ê2006,ÊFlorian Jenett
	*		@linkÊ		http://builtwithprocessing.org/
	*
	*		@version 	bwp-000.1
	 */
	 
	 
	if ( !defined('BWP') ) die( 'Access Error: '.basename(__FILE__) );
	 
	 
	define( LOGIN_KEY_STRING  , '+%s-BWP-%s+');
	define( LOGIN_HASH_STRING ,	'BWP+%s+PWB' );
	 
	function login_check_simple ()
	{
		@session_start();
		
		if (   isset($_SESSION['user-id'])      && isset($_SESSION['user-name'])
		  	&& isset($_SESSION['user-timeout']) && isset($_SESSION['user-key'])   && isset($_SESSION['user-hash'])
		  	&& $_SESSION['user-timeout'] >= date('U')
		  	&& $_SESSION['user-key'] == md5( sprintf( LOGIN_KEY_STRING, $_SESSION['user-name'], $_SERVER['REMOTE_ADDR'] ) )
		)
		{
			return true;
		}
		
		return false;
	}
	
	function login_check ()
	{
		if ( realpath(session_save_path()) !== realpath(DIR_SESSIONS) )
		{
			session_save_path(DIR_SESSIONS);
		}
		
		if ( !is_readable(DIR_SESSIONS) )
		{
			die( 'Can\'t access sessions-dir.<br />'.realpath(DIR_SESSIONS) );
		}
		
		session_start();
		
		if (    isset($_GET['login'])
		     && $_GET['login'] == 'trylogin'
		     && isset($_GET['un'])
		     && isset($_GET['up'])
		   )
		{
			$_SESSION = array();
			
			$name = preg_replace( '/[^-.*a-zA-Z0-9 ]+/i', '', $_GET['un'] );
			$pass = $_GET['up'];
			
			$user = db_fetch_row( 'SELECT * FROM user WHERE name = "'.$name.'"' );
			
			if ( is_array( $user ) && !empty($user) )
			{
				$pass_hash = md5( sprintf( LOGIN_HASH_STRING, $_GET['up'], '' ) );
				
				if ( $pass_hash == $user['pass'] )
				{
					
					$_SESSION['user-id'] 		= $user['id'];
					$_SESSION['user-name'] 		= $user['name'];
					$_SESSION['user-timeout'] 	= date('U') + (60 * 15);
					$_SESSION['user-key'] 		= md5( sprintf( LOGIN_KEY_STRING , $user['name'], $_SERVER['REMOTE_ADDR'] ) );
					$_SESSION['user-hash'] 		= md5( sprintf( LOGIN_HASH_STRING, $pass_hash,    $user['id']		       ) );
					
					//echo 'logged in (1)';
					return true;
				}
				else message( 'Passwort ist falsch.' );
			}
			else message( 'Unbekannter User.' );
		}
		else if ( login_check_simple() )
		{
			$user = db_fetch_row( 'SELECT * FROM user WHERE id = "'.(int)$_SESSION['user-id'].'"' );
		
			if (    is_array( $user ) && !empty($user)
				 && $_SESSION['user-hash'] == md5( sprintf( LOGIN_HASH_STRING, $user['pass'], $user['id']) )
			   )
			{
				$_SESSION['user-timeout'] = date('U') + (60 * 15);
			
				//echo 'logged in (2)';
				return true;
			}
			//else message( 'MySQL Fehler.' );
		}
		//else message( 'Session Fehler.' );
		
		login_logout();
		return false;
	}
	
	function login_logout ()
	{
		@session_start();
			
		$CookieInfo = session_get_cookie_params();
		if (    empty($CookieInfo['domain'])
			 && empty($CookieInfo['secure'])
		   )
		{
			setcookie(session_name(), '', time()-3600, $CookieInfo['path']);
		}
		elseif ( empty($CookieInfo['secure']) )
		{
			setcookie(session_name(), '', time()-3600, $CookieInfo['path'], $CookieInfo['domain']);
		}
		else
		{
			setcookie(session_name(), '', time()-3600, $CookieInfo['path'], $CookieInfo['domain'], $CookieInfo['secure']);
		}
		unset($_COOKIE[session_name()]);
		$_SESSION = array();
		session_unset();
		session_destroy();
		
		session_start();
		
		return true;
	}
?>