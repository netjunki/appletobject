/**
 * AlgodesEZApplet v1.0.0: Java Plug-in detection and embed - http://www.fluidforms.at/AlgodesEZApplet/
 * 
 * AlgodesEZApplet is (c) 2006 Stephen Williams and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * AlgodesEZApplet is based on...
 * SWFObject v1.4.4: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 * SWFObject is (c) 2006 Geoff Stearns and is released under the MIT License:
 * 
 * 
 * 
 * Below is the minimal code required to display a java applet with AlgodesEZApplet.
 * 
 * <script type="text/javascript" src="js/AlgodesEZApplet.js"></script>
 * <div id="appplet">
 *   Please Upgrader your Java Plug-in.
 * </div>
 * <script type="text/javascript">
 *    var so = new EZApplet("CheckJavaVersion.class", "CheckVersion", "200", "30", "1.5.0_10");
 *    so.write("appplet");
 * </script>
 * 
 * 
 * 
 * To see the generated code call your page with the parameter "com_algodes_debug=true" on the end
 */


if(typeof com_algodes == "undefined") var com_algodes = new Object();
if(typeof com_algodes.util == "undefined") com_algodes.util = new Object();




com_algodes.EZApplet = function(code, id, width, height, minimumVersion, mode, detectKey, redirectUrl ){
	this.debug = com_algodes.util.getRequestParameter("com_algodes_debug");

	this.DETECT_KEY = detectKey ? detectKey : 'nojavadetect';

	if (!document.getElementById) { return; }

	this.skipDetect = com_algodes.util.getRequestParameter(this.DETECT_KEY);

	this.params = new Object();
	this.variables = new Object();
	this.attributes = new Array();

	if(code) {
		this.setAttribute('code', code);
	}
	if(id) {
		this.setAttribute("id", id); 
	} else {
		this.setAttribute("id","myapplet"); 
	}
	if(width) {
		this.setAttribute('width', width); 
	}else{
		this.setAttribute('width', 240); 
	}
	if(height) { 
		this.setAttribute('height', height); 
	} else {
		this.setAttribute('height', 320); 
	}
	if(minimumVersion) {
		this.minimumVersion = new com_algodes.JavaVersion(minimumVersion);
	}else{
		this.skipDetect = true;
	}

	/**
	 * This specifies that for IE a registry lookup should
	 * be performed. This raises an ActiveX security warning.
	 */
	this.readRegistry = false;
	this.useBrutForceDetectionForIE = true;
	this.useAppletTag = true;
	this.doBrowserDownload = false;

	
	if(!this.skipDetect){
		this.installedVer = this.getJavaVersion();
	}

	this.setAttribute('redirectUrl', '');
	if(redirectUrl) { 
		this.setAttribute('redirectUrl', redirectUrl); 
	}
}

com_algodes.EZApplet.prototype = {
	/**
	 * Sets an attribute
	 * i.e. <
	 */
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},
	getAttribute: function(name){
		return this.attributes[name];
	},
	addParam: function(name, value){
		this.params[name] = value;
	},
	getParam: function(name){
		return this.params[name];
	},
	getParams: function(){
		return this.params;
	},
	addVariable: function(name, value){
		this.variables[name] = value;
	},
	getVariable: function(name){
		return this.variables[name];
	},
	getVariables: function(){
		return this.variables;
	},
	getVariablePairs: function(){
		var variablePairs = new Array();
		var key;
		var variables = this.getVariables();
		for(key in variables){
			variablePairs.push(key +"="+ variables[key]);
		}
		return variablePairs;
	},
	getAppletHTML: function() {
		var javaNode = "";
		if(typeof this.getParam("image") == "undefined"){
			this.addParam("image", 'http://localhost/tutorial/www/images/coordinates.gif');
		}
		if(typeof this.getAttribute("codebase") == "undefined"){
			this.setAttribute("codebase", '.');
		}
		if(this.useAppletTag){
			javaNode = '<applet code="'+ this.getAttribute('code') +'" ' +
					'id="'+ this.getAttribute('id') +'" ' +
					'codebase="'+ this.getAttribute('codebase') +'" ' +
					'width="'+ this.getAttribute('width') +'" ' +
					'height="'+ this.getAttribute('height') +'">\n';
			var params = this.getParams();
			for(var key in params) {
			 javaNode += '  <param name="'+ key +'" value="'+ params[key] +'" />\n';
			}
			javaNode += "</applet>";
		}else{
			if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { // netscape plugin architecture
				javaNode = '<embed type="application/x-java-applet" \n' +
						'pluginspage="http://java.sun.com/j2se/1.5.0/download.html" \n' +
						'code="'+ this.getAttribute('code') +'" \n' +
						'codebase="'+ this.getAttribute('codebase') +'" \n' +
						'width="'+ this.getAttribute('width') +'" \n' +
						'height="'+ this.getAttribute('height') +'" \n' +
						'id="'+ this.getAttribute('id') +'" \n' +
						'name="'+ this.getAttribute('id') +'" \n';
				var params = this.getParams();
				 for(var key in params){
				 	javaNode += '  '+[key] +'="'+ params[key] +'" \n'; 
				 }
				//var pairs = this.getVariablePairs().join("&");
				//if (pairs.length > 0){ javaNode += 'flashvars="'+ pairs +'"'; }
				javaNode += '/>';
			} else { // PC IE
				if(!this.getAttribute("codebase")){
					this.setAttribute("codebase", 'codebase="http://java.sun.com/products/plugin/autodl/jinstall-1_5_0-windows-i586.cab#Version=1,5,0,0"');
				}
				if(!this.getAttribute("classid")){
					this.setAttribute("classid", "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93");
				}
				if(this.doBrowserDownload){
					this.setAttribute("classid", "clsid:CAFEEFAC-0015-0001-0000-ABCDEFFEDCBA");
				}
				javaNode = '<object id="'+ this.getAttribute('id') +'" \n\t' +
						''+ this.getAttribute('codebase') +' \n\t' +
						'width="'+ this.getAttribute('width') +'" \n\t' +
						'height="'+ this.getAttribute('height') +'" \n\t' +
						'classid="'+this.getAttribute("classid")+'" ' +
						'>\n';
				javaNode += '  <param name="code" value="'+ this.getAttribute('code') +'" />\n';
				var params = this.getParams();
				for(var key in params) {
				 javaNode += '  <param name="'+ key +'" value="'+ params[key] +'" />\n';
				}
				javaNode += "</object>";
			}
		}
		return javaNode;
	},
	write: function(elementId){
		if(this.skipDetect || this.installedVer.isGreater(this.minimumVersion)){
			var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
			var html = this.getAppletHTML();
			if(this.debug){
				html = "<pre>"+this.encode_html(html)+"</pre>";
			}
			n.innerHTML = html;
			return true;
		}else{
			if(this.debug){
				alert("EZApplet DEBUG :: Java Version not high enough.");
			}
			
			if(this.getAttribute('redirectUrl') != "") {
				document.location.replace(this.getAttribute('redirectUrl'));
			}
		}
		return false;
	},
	/**
	 * This code is based on some code posted to the Java Forum. 
	 * Have another look to find the authors details.
	 */
	getJavaVersion: function(){
		var javaVersion = new com_algodes.JavaVersion("0.0.0_0");
		
		var agt=navigator.userAgent.toLowerCase();
		var is_major = parseInt(navigator.appVersion);
	
		var is_nav = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
			&& (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
			&& (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
		var is_nav4up = (is_nav && (is_major >= 4));
		var is_ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
		var is_ie5 = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0") != -1) );
		var is_ie5_5 = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
		var is_ie6 = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.0") !=-1));
		var is_ie7 = (is_ie && (is_major == 4) && (agt.indexOf("msie 7.0") !=-1));
		var is_ie5up = (is_ie && (is_major == 4) && ( (agt.indexOf("msie 5.0")!=-1)
			|| (agt.indexOf("msie 5.5")!=-1)
			|| (agt.indexOf("msie 6.0")!=-1) 
			|| (agt.indexOf("msie 7.0")!=-1) 
			) );
	
		var pluginDetected = false;
		var activeXDisabled = false;
		
		// we can check for plugin existence only when browser is 'is_ie5up' or 'is_nav4up'
		if(is_nav4up) {
			// Refresh 'navigator.plugins' to get newly installed plugins.
			// Use 'navigator.plugins.refresh(false)' to refresh plugins
			// without refreshing open documents (browser windows)
			if(navigator.plugins) {
				navigator.plugins.refresh(false);
			}
		
			// check for Java plugin in installed plugins
			if(navigator.mimeTypes) {
				for (i=0; i < navigator.mimeTypes.length; i++) {
					mimeType = navigator.mimeTypes[i].type;
					if( (mimeType != null)
						&& (mimeType.indexOf(
						"application/x-java-applet;jpi-version=") != -1) ) {
							var versionIndex = mimeType.indexOf("version=");
							javaVersion = new com_algodes.JavaVersion(mimeType.substring(versionIndex+8));
							pluginDetected = true;
							break;
					}
				}
			}
		} else if (is_ie5up) {
			registryBeenRead = false;
			if(this.readRegistry) {
				/*
				 * Using the shell causes IE to display a warning that the script
				 * may not be safe.
				 */
				var shell;
				try {
					// Create WSH(WindowsScriptHost) shell, available on Windows only
					shell = new ActiveXObject("WScript.Shell");
			
					if (shell != null) {
						// Read JRE version from Window Registry
						try {
							javaVersion = new com_algodes.JavaVersion(shell.regRead("HKEY_LOCAL_MACHINE\\Software\\JavaSoft\\Java Runtime Environment\\CurrentVersion"));
							registryBeenRead = true;
						} catch(e) {
							// handle exceptions raised by 'shell.regRead(...)' here
							// so that the outer try-catch block would receive only
							// exceptions raised by 'shell = new ActiveXObject(...)'
						}
					}else{ 
						//alert("Couldn t get shell");
					}
				} catch(e) {
					// Creating ActiveX controls thru script is disabled
					// in InternetExplorer security options
					
					// To enable it:
					// a. Go to the 'Tools --> Internet Options' menu
					// b. Select the 'Security' tab
					// c. Select zone (Internet/Intranet)
					// d. Click the 'Custom Level..' button which will display the
					// 'Security Settings' window.
					// e. Enable the option 'Initialize and script ActiveX controls
					// not marked as safe'
				
					activeXDisabled = true;
				}
			}
			if(!registryBeenRead && this.useBrutForceDetectionForIE){
				javaVersion = this.getJavaVersionWithBrutForce(this.minimumVersion);
			}
		}
		return javaVersion;
	},

	/**
	 * This function tries to instantiate JavaPlugin.??? objects.
	 * JRE versions 1.2.1_4 through to 1.3.1 installed a JavaSoft.JavaBeansBridge object.
	/* Instantiating this object causes the java consol to load, which take 1 or two seconds.
	 * If you are going to display an applet anyway this is no problem otherwise
	 * you might want to avoid using it.
	*/
	getJavaVersionWithBrutForce: function(){
		var javaVersion = new com_algodes.JavaVersion("0.0.0_0");
		startOfRegistryClasses = new com_algodes.JavaVersion("1.3.1_1");
		if(!this.minimumVersion.isGreater(startOfRegistryClasses)){
			/* this call caused the java consol to load, which take 1 or two seconds.
			 * If you are going to display an applet anyway this is no problem otherwise
			 * you might want to avoid using it.
			*/
			result = new ActiveXObject("JavaSoft.JavaBeansBridge");
			if(result){
				javaVersion = new com_algodes.JavaVersion("1.2.1_4");
			}
		}
		major = 10+this.minimumVersion.major;
		for(; major<=16; major++){//major  1.3 - 1.6
			for(minor=0; minor<=2; minor++){//minor 0  - 2;  I have also seen Java version 1.1.4 to 1.1.8
				for(sub=0; sub<=20; sub++){//major  0 - 20???
					subVersion = "";
					if(sub>0){
						subVersion = subVersion+"_";
						if(sub<10){
							subVersion = subVersion + "0" + sub;
						}else{
							subVersion = subVersion + "" + sub;
						}
					}
					regVersion = major+""+minor+subVersion;
					
					var version = new com_algodes.JavaVersion(""+(major/10) + "." + minor+subVersion);
					try {
						result = new ActiveXObject("JavaPlugin."+regVersion);
						if(result){
							javaVersion = version;
						}
					} catch(e) {}
					if(!this.minimumVersion.isGreater(javaVersion)){
						return javaVersion;
					}
				}
			}
		}
		return javaVersion;
	},
	encode_html: function(e){ // "htmlspecialchars" in javascript
		if(!this.debug)return e;
		var o=e;
		o=o.replace(/&/g,"&amp;");
		o=o.replace(/</g,"&lt;");
		o=o.replace(/>/g,"&gt;");
		o=o.replace(/"/g,"&quot;");
		return o;
	} 
	
}

com_algodes.JavaVersion = function(version){

	arrVersion = version.split(".");
	if(arrVersion[2] != null){
		arrMinorAndRev = arrVersion[2].split("_");
	}
	this.superMajor = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
	this.major = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
	this.minor = arrMinorAndRev[0] != null ? parseInt(arrMinorAndRev[0]) : 0;
	this.rev = arrMinorAndRev[1] != null ? parseInt(arrMinorAndRev[1]) : 0;
	
	/*
	alert("superMajor:"+this.superMajor);
	alert("major:"+this.major);
	alert("minor:"+this.minor);
	alert("rev:"+this.rev);
	*/
}

com_algodes.JavaVersion.prototype.isGreater = function(fv){
	if(this.major < fv.major) return false;
	if(this.major > fv.major) return true;
	if(this.minor < fv.minor) return false;
	if(this.minor > fv.minor) return true;
	if(this.rev < fv.rev) return false;
	return true;
}




/* ---- get value of query string param ---- */
com_algodes.util.getRequestParameter = function(param) {
	var q = document.location.search || document.location.hash;
	if(q) {
		var pairs = q.substring(1).split("&");
		for (var i=0; i < pairs.length; i++) {
			if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
				return pairs[i].substring((pairs[i].indexOf("=")+1));
			}
		}
	}
	return "";
}





//?????
/* add Array.push if needed (ie5) */
if (Array.prototype.push == null) { Array.prototype.push = function(item) { this[this.length] = item; return this.length; }}







var EZApplet = com_algodes.EZApplet;
