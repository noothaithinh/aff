/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {
  var slice = [].slice;

  this.ActionCable = {
    INTERNAL: {
      "message_types": {
        "welcome": "welcome",
        "ping": "ping",
        "confirmation": "confirm_subscription",
        "rejection": "reject_subscription"
      },
      "default_mount_path": "/cable",
      "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
    },
    createConsumer: function(url) {
      var ref;
      if (url == null) {
        url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
      }
      return new ActionCable.Consumer(this.createWebSocketURL(url));
    },
    getConfig: function(name) {
      var element;
      element = document.head.querySelector("meta[name='action-cable-" + name + "']");
      return element != null ? element.getAttribute("content") : void 0;
    },
    createWebSocketURL: function(url) {
      var a;
      if (url && !/^wss?:/i.test(url)) {
        a = document.createElement("a");
        a.href = url;
        a.href = a.href;
        a.protocol = a.protocol.replace("http", "ws");
        return a.href;
      } else {
        return url;
      }
    },
    startDebugging: function() {
      return this.debugging = true;
    },
    stopDebugging: function() {
      return this.debugging = null;
    },
    log: function() {
      var messages;
      messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.debugging) {
        messages.push(Date.now());
        return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
      }
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.ActionCable = this.ActionCable;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.ActionCable;
  }

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ActionCable.ConnectionMonitor = (function() {
    var clamp, now, secondsSince;

    ConnectionMonitor.pollInterval = {
      min: 3,
      max: 30
    };

    ConnectionMonitor.staleThreshold = 6;

    function ConnectionMonitor(connection) {
      this.connection = connection;
      this.visibilityDidChange = bind(this.visibilityDidChange, this);
      this.reconnectAttempts = 0;
    }

    ConnectionMonitor.prototype.start = function() {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        document.addEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
      }
    };

    ConnectionMonitor.prototype.stop = function() {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        document.removeEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor stopped");
      }
    };

    ConnectionMonitor.prototype.isRunning = function() {
      return (this.startedAt != null) && (this.stoppedAt == null);
    };

    ConnectionMonitor.prototype.recordPing = function() {
      return this.pingedAt = now();
    };

    ConnectionMonitor.prototype.recordConnect = function() {
      this.reconnectAttempts = 0;
      this.recordPing();
      delete this.disconnectedAt;
      return ActionCable.log("ConnectionMonitor recorded connect");
    };

    ConnectionMonitor.prototype.recordDisconnect = function() {
      this.disconnectedAt = now();
      return ActionCable.log("ConnectionMonitor recorded disconnect");
    };

    ConnectionMonitor.prototype.startPolling = function() {
      this.stopPolling();
      return this.poll();
    };

    ConnectionMonitor.prototype.stopPolling = function() {
      return clearTimeout(this.pollTimeout);
    };

    ConnectionMonitor.prototype.poll = function() {
      return this.pollTimeout = setTimeout((function(_this) {
        return function() {
          _this.reconnectIfStale();
          return _this.poll();
        };
      })(this), this.getPollInterval());
    };

    ConnectionMonitor.prototype.getPollInterval = function() {
      var interval, max, min, ref;
      ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
      interval = 5 * Math.log(this.reconnectAttempts + 1);
      return Math.round(clamp(interval, min, max) * 1000);
    };

    ConnectionMonitor.prototype.reconnectIfStale = function() {
      if (this.connectionIsStale()) {
        ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
        } else {
          ActionCable.log("ConnectionMonitor reopening");
          return this.connection.reopen();
        }
      }
    };

    ConnectionMonitor.prototype.connectionIsStale = function() {
      var ref;
      return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.disconnectedRecently = function() {
      return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.visibilityDidChange = function() {
      if (document.visibilityState === "visible") {
        return setTimeout((function(_this) {
          return function() {
            if (_this.connectionIsStale() || !_this.connection.isOpen()) {
              ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
              return _this.connection.reopen();
            }
          };
        })(this), 200);
      }
    };

    now = function() {
      return new Date().getTime();
    };

    secondsSince = function(time) {
      return (now() - time) / 1000;
    };

    clamp = function(number, min, max) {
      return Math.max(min, Math.min(max, number));
    };

    return ConnectionMonitor;

  })();

}).call(this);
(function() {
  var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

  supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

  ActionCable.Connection = (function() {
    Connection.reopenDelay = 500;

    function Connection(consumer) {
      this.consumer = consumer;
      this.open = bind(this.open, this);
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ActionCable.ConnectionMonitor(this);
      this.disconnected = true;
    }

    Connection.prototype.send = function(data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    };

    Connection.prototype.open = function() {
      if (this.isActive()) {
        ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
        throw new Error("Existing connection must be closed before opening");
      } else {
        ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
        if (this.webSocket != null) {
          this.uninstallEventHandlers();
        }
        this.webSocket = new WebSocket(this.consumer.url, protocols);
        this.installEventHandlers();
        this.monitor.start();
        return true;
      }
    };

    Connection.prototype.close = function(arg) {
      var allowReconnect, ref1;
      allowReconnect = (arg != null ? arg : {
        allowReconnect: true
      }).allowReconnect;
      if (!allowReconnect) {
        this.monitor.stop();
      }
      if (this.isActive()) {
        return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
      }
    };

    Connection.prototype.reopen = function() {
      var error, error1;
      ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
      if (this.isActive()) {
        try {
          return this.close();
        } catch (error1) {
          error = error1;
          return ActionCable.log("Failed to reopen WebSocket", error);
        } finally {
          ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open();
      }
    };

    Connection.prototype.getProtocol = function() {
      var ref1;
      return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
    };

    Connection.prototype.isOpen = function() {
      return this.isState("open");
    };

    Connection.prototype.isActive = function() {
      return this.isState("open", "connecting");
    };

    Connection.prototype.isProtocolSupported = function() {
      var ref1;
      return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
    };

    Connection.prototype.isState = function() {
      var ref1, states;
      states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
    };

    Connection.prototype.getState = function() {
      var ref1, state, value;
      for (state in WebSocket) {
        value = WebSocket[state];
        if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
          return state.toLowerCase();
        }
      }
      return null;
    };

    Connection.prototype.installEventHandlers = function() {
      var eventName, handler;
      for (eventName in this.events) {
        handler = this.events[eventName].bind(this);
        this.webSocket["on" + eventName] = handler;
      }
    };

    Connection.prototype.uninstallEventHandlers = function() {
      var eventName;
      for (eventName in this.events) {
        this.webSocket["on" + eventName] = function() {};
      }
    };

    Connection.prototype.events = {
      message: function(event) {
        var identifier, message, ref1, type;
        if (!this.isProtocolSupported()) {
          return;
        }
        ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
        switch (type) {
          case message_types.welcome:
            this.monitor.recordConnect();
            return this.subscriptions.reload();
          case message_types.ping:
            return this.monitor.recordPing();
          case message_types.confirmation:
            return this.subscriptions.notify(identifier, "connected");
          case message_types.rejection:
            return this.subscriptions.reject(identifier);
          default:
            return this.subscriptions.notify(identifier, "received", message);
        }
      },
      open: function() {
        ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
        this.disconnected = false;
        if (!this.isProtocolSupported()) {
          ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
          return this.close({
            allowReconnect: false
          });
        }
      },
      close: function(event) {
        ActionCable.log("WebSocket onclose event");
        if (this.disconnected) {
          return;
        }
        this.disconnected = true;
        this.monitor.recordDisconnect();
        return this.subscriptions.notifyAll("disconnected", {
          willAttemptReconnect: this.monitor.isRunning()
        });
      },
      error: function() {
        return ActionCable.log("WebSocket onerror event");
      }
    };

    return Connection;

  })();

}).call(this);
(function() {
  var slice = [].slice;

  ActionCable.Subscriptions = (function() {
    function Subscriptions(consumer) {
      this.consumer = consumer;
      this.subscriptions = [];
    }

    Subscriptions.prototype.create = function(channelName, mixin) {
      var channel, params, subscription;
      channel = channelName;
      params = typeof channel === "object" ? channel : {
        channel: channel
      };
      subscription = new ActionCable.Subscription(this.consumer, params, mixin);
      return this.add(subscription);
    };

    Subscriptions.prototype.add = function(subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, "initialized");
      this.sendCommand(subscription, "subscribe");
      return subscription;
    };

    Subscriptions.prototype.remove = function(subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, "unsubscribe");
      }
      return subscription;
    };

    Subscriptions.prototype.reject = function(identifier) {
      var i, len, ref, results, subscription;
      ref = this.findAll(identifier);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        this.forget(subscription);
        this.notify(subscription, "rejected");
        results.push(subscription);
      }
      return results;
    };

    Subscriptions.prototype.forget = function(subscription) {
      var s;
      this.subscriptions = (function() {
        var i, len, ref, results;
        ref = this.subscriptions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (s !== subscription) {
            results.push(s);
          }
        }
        return results;
      }).call(this);
      return subscription;
    };

    Subscriptions.prototype.findAll = function(identifier) {
      var i, len, ref, results, s;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.identifier === identifier) {
          results.push(s);
        }
      }
      return results;
    };

    Subscriptions.prototype.reload = function() {
      var i, len, ref, results, subscription;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.sendCommand(subscription, "subscribe"));
      }
      return results;
    };

    Subscriptions.prototype.notifyAll = function() {
      var args, callbackName, i, len, ref, results, subscription;
      callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
      }
      return results;
    };

    Subscriptions.prototype.notify = function() {
      var args, callbackName, i, len, results, subscription, subscriptions;
      subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (typeof subscription === "string") {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [subscription];
      }
      results = [];
      for (i = 0, len = subscriptions.length; i < len; i++) {
        subscription = subscriptions[i];
        results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
      }
      return results;
    };

    Subscriptions.prototype.sendCommand = function(subscription, command) {
      var identifier;
      identifier = subscription.identifier;
      return this.consumer.send({
        command: command,
        identifier: identifier
      });
    };

    return Subscriptions;

  })();

}).call(this);
(function() {
  ActionCable.Subscription = (function() {
    var extend;

    function Subscription(consumer, params, mixin) {
      this.consumer = consumer;
      if (params == null) {
        params = {};
      }
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    Subscription.prototype.perform = function(action, data) {
      if (data == null) {
        data = {};
      }
      data.action = action;
      return this.send(data);
    };

    Subscription.prototype.send = function(data) {
      return this.consumer.send({
        command: "message",
        identifier: this.identifier,
        data: JSON.stringify(data)
      });
    };

    Subscription.prototype.unsubscribe = function() {
      return this.consumer.subscriptions.remove(this);
    };

    extend = function(object, properties) {
      var key, value;
      if (properties != null) {
        for (key in properties) {
          value = properties[key];
          object[key] = value;
        }
      }
      return object;
    };

    return Subscription;

  })();

}).call(this);
(function() {
  ActionCable.Consumer = (function() {
    function Consumer(url) {
      this.url = url;
      this.subscriptions = new ActionCable.Subscriptions(this);
      this.connection = new ActionCable.Connection(this);
    }

    Consumer.prototype.send = function(data) {
      return this.connection.send(data);
    };

    Consumer.prototype.connect = function() {
      return this.connection.open();
    };

    Consumer.prototype.disconnect = function() {
      return this.connection.close({
        allowReconnect: false
      });
    };

    Consumer.prototype.ensureActiveConnection = function() {
      if (!this.connection.isActive()) {
        return this.connection.open();
      }
    };

    return Consumer;

  })();

}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t="length"in e&&e.length,n=J.type(e);return"function"===n||J.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e}function i(e,t,n){if(J.isFunction(t))return J.grep(e,function(e,i){return!!t.call(e,i,e)!==n});if(t.nodeType)return J.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(ae.test(t))return J.filter(t,e,n);t=J.filter(t,e)}return J.grep(e,function(e){return X.call(t,e)>=0!==n})}function r(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function o(e){var t=he[e]={};return J.each(e.match(fe)||[],function(e,n){t[n]=!0}),t}function s(){Q.removeEventListener("DOMContentLoaded",s,!1),e.removeEventListener("load",s,!1),J.ready()}function a(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=J.expando+a.uid++}function l(e,t,n){var i;if(void 0===n&&1===e.nodeType)if(i="data-"+t.replace(be,"-$1").toLowerCase(),n=e.getAttribute(i),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:we.test(n)?J.parseJSON(n):n}catch(r){}ye.set(e,t,n)}else n=void 0;return n}function u(){return!0}function c(){return!1}function d(){try{return Q.activeElement}catch(e){}}function p(e,t){return J.nodeName(e,"table")&&J.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function f(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function h(e){var t=Le.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function g(e,t){for(var n=0,i=e.length;i>n;n++)ve.set(e[n],"globalEval",!t||ve.get(t[n],"globalEval"))}function m(e,t){var n,i,r,o,s,a,l,u;if(1===t.nodeType){if(ve.hasData(e)&&(o=ve.access(e),s=ve.set(t,o),u=o.events)){delete s.handle,s.events={};for(r in u)for(n=0,i=u[r].length;i>n;n++)J.event.add(t,r,u[r][n])}ye.hasData(e)&&(a=ye.access(e),l=J.extend({},a),ye.set(t,l))}}function v(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return void 0===t||t&&J.nodeName(e,t)?J.merge([e],n):n}function y(e,t){var n=t.nodeName.toLowerCase();"input"===n&&Ce.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}function w(t,n){var i,r=J(n.createElement(t)).appendTo(n.body),o=e.getDefaultComputedStyle&&(i=e.getDefaultComputedStyle(r[0]))?i.display:J.css(r[0],"display");return r.detach(),o}function b(e){var t=Q,n=ze[e];return n||(n=w(e,t),"none"!==n&&n||($e=($e||J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=$e[0].contentDocument,t.write(),t.close(),n=w(e,t),$e.detach()),ze[e]=n),n}function x(e,t,n){var i,r,o,s,a=e.style;return n=n||We(e),n&&(s=n.getPropertyValue(t)||n[t]),n&&(""!==s||J.contains(e.ownerDocument,e)||(s=J.style(e,t)),qe.test(s)&&He.test(t)&&(i=a.width,r=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=i,a.minWidth=r,a.maxWidth=o)),void 0!==s?s+"":s}function S(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function k(e,t){if(t in e)return t;for(var n=t[0].toUpperCase()+t.slice(1),i=t,r=Ge.length;r--;)if(t=Ge[r]+n,t in e)return t;return i}function C(e,t,n){var i=Ve.exec(t);return i?Math.max(0,i[1]-(n||0))+(i[2]||"px"):t}function T(e,t,n,i,r){for(var o=n===(i?"border":"content")?4:"width"===t?1:0,s=0;4>o;o+=2)"margin"===n&&(s+=J.css(e,n+Se[o],!0,r)),i?("content"===n&&(s-=J.css(e,"padding"+Se[o],!0,r)),"margin"!==n&&(s-=J.css(e,"border"+Se[o]+"Width",!0,r))):(s+=J.css(e,"padding"+Se[o],!0,r),"padding"!==n&&(s+=J.css(e,"border"+Se[o]+"Width",!0,r)));return s}function _(e,t,n){var i=!0,r="width"===t?e.offsetWidth:e.offsetHeight,o=We(e),s="border-box"===J.css(e,"boxSizing",!1,o);if(0>=r||null==r){if(r=x(e,t,o),(0>r||null==r)&&(r=e.style[t]),qe.test(r))return r;i=s&&(Z.boxSizingReliable()||r===e.style[t]),r=parseFloat(r)||0}return r+T(e,t,n||(s?"border":"content"),i,o)+"px"}function E(e,t){for(var n,i,r,o=[],s=0,a=e.length;a>s;s++)i=e[s],i.style&&(o[s]=ve.get(i,"olddisplay"),n=i.style.display,t?(o[s]||"none"!==n||(i.style.display=""),""===i.style.display&&ke(i)&&(o[s]=ve.access(i,"olddisplay",b(i.nodeName)))):(r=ke(i),"none"===n&&r||ve.set(i,"olddisplay",r?n:J.css(i,"display"))));for(s=0;a>s;s++)i=e[s],i.style&&(t&&"none"!==i.style.display&&""!==i.style.display||(i.style.display=t?o[s]||"":"none"));return e}function O(e,t,n,i,r){return new O.prototype.init(e,t,n,i,r)}function D(){return setTimeout(function(){Ze=void 0}),Ze=J.now()}function P(e,t){var n,i=0,r={height:e};for(t=t?1:0;4>i;i+=2-t)n=Se[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function A(e,t,n){for(var i,r=(nt[t]||[]).concat(nt["*"]),o=0,s=r.length;s>o;o++)if(i=r[o].call(n,t,e))return i}function M(e,t,n){var i,r,o,s,a,l,u,c,d=this,p={},f=e.style,h=e.nodeType&&ke(e),g=ve.get(e,"fxshow");n.queue||(a=J._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,l=a.empty.fire,a.empty.fire=function(){a.unqueued||l()}),a.unqueued++,d.always(function(){d.always(function(){a.unqueued--,J.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[f.overflow,f.overflowX,f.overflowY],u=J.css(e,"display"),c="none"===u?ve.get(e,"olddisplay")||b(e.nodeName):u,"inline"===c&&"none"===J.css(e,"float")&&(f.display="inline-block")),n.overflow&&(f.overflow="hidden",d.always(function(){f.overflow=n.overflow[0],f.overflowX=n.overflow[1],f.overflowY=n.overflow[2]}));for(i in t)if(r=t[i],Ke.exec(r)){if(delete t[i],o=o||"toggle"===r,r===(h?"hide":"show")){if("show"!==r||!g||void 0===g[i])continue;h=!0}p[i]=g&&g[i]||J.style(e,i)}else u=void 0;if(J.isEmptyObject(p))"inline"===("none"===u?b(e.nodeName):u)&&(f.display=u);else{g?"hidden"in g&&(h=g.hidden):g=ve.access(e,"fxshow",{}),o&&(g.hidden=!h),h?J(e).show():d.done(function(){J(e).hide()}),d.done(function(){var t;ve.remove(e,"fxshow");for(t in p)J.style(e,t,p[t])});for(i in p)s=A(h?g[i]:0,i,d),i in g||(g[i]=s.start,h&&(s.end=s.start,s.start="width"===i||"height"===i?1:0))}}function N(e,t){var n,i,r,o,s;for(n in e)if(i=J.camelCase(n),r=t[i],o=e[n],J.isArray(o)&&(r=o[1],o=e[n]=o[0]),n!==i&&(e[i]=o,delete e[n]),s=J.cssHooks[i],s&&"expand"in s){o=s.expand(o),delete e[i];for(n in o)n in e||(e[n]=o[n],t[n]=r)}else t[i]=r}function F(e,t,n){var i,r,o=0,s=tt.length,a=J.Deferred().always(function(){delete l.elem}),l=function(){if(r)return!1;for(var t=Ze||D(),n=Math.max(0,u.startTime+u.duration-t),i=n/u.duration||0,o=1-i,s=0,l=u.tweens.length;l>s;s++)u.tweens[s].run(o);return a.notifyWith(e,[u,o,n]),1>o&&l?n:(a.resolveWith(e,[u]),!1)},u=a.promise({elem:e,props:J.extend({},t),opts:J.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Ze||D(),duration:n.duration,tweens:[],createTween:function(t,n){var i=J.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(i),i},stop:function(t){var n=0,i=t?u.tweens.length:0;if(r)return this;for(r=!0;i>n;n++)u.tweens[n].run(1);return t?a.resolveWith(e,[u,t]):a.rejectWith(e,[u,t]),this}}),c=u.props;for(N(c,u.opts.specialEasing);s>o;o++)if(i=tt[o].call(u,e,c,u.opts))return i;return J.map(c,A,u),J.isFunction(u.opts.start)&&u.opts.start.call(e,u),J.fx.timer(J.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function I(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var i,r=0,o=t.toLowerCase().match(fe)||[];if(J.isFunction(n))for(;i=o[r++];)"+"===i[0]?(i=i.slice(1)||"*",(e[i]=e[i]||[]).unshift(n)):(e[i]=e[i]||[]).push(n)}}function L(e,t,n,i){function r(a){var l;return o[a]=!0,J.each(e[a]||[],function(e,a){var u=a(t,n,i);return"string"!=typeof u||s||o[u]?s?!(l=u):void 0:(t.dataTypes.unshift(u),r(u),!1)}),l}var o={},s=e===wt;return r(t.dataTypes[0])||!o["*"]&&r("*")}function j(e,t){var n,i,r=J.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((r[n]?e:i||(i={}))[n]=t[n]);return i&&J.extend(!0,e,i),e}function Y(e,t,n){for(var i,r,o,s,a=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===i&&(i=e.mimeType||t.getResponseHeader("Content-Type"));if(i)for(r in a)if(a[r]&&a[r].test(i)){l.unshift(r);break}if(l[0]in n)o=l[0];else{for(r in n){if(!l[0]||e.converters[r+" "+l[0]]){o=r;break}s||(s=r)}o=o||s}return o?(o!==l[0]&&l.unshift(o),n[o]):void 0}function $(e,t,n,i){var r,o,s,a,l,u={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)u[s.toLowerCase()]=e.converters[s];for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&i&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(s=u[l+" "+o]||u["* "+o],!s)for(r in u)if(a=r.split(" "),a[1]===o&&(s=u[l+" "+a[0]]||u["* "+a[0]])){s===!0?s=u[r]:u[r]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(d){return{state:"parsererror",error:s?d:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}function z(e,t,n,i){var r;if(J.isArray(t))J.each(t,function(t,r){n||Ct.test(e)?i(e,r):z(e+"["+("object"==typeof r?t:"")+"]",r,n,i)});else if(n||"object"!==J.type(t))i(e,t);else for(r in t)z(e+"["+r+"]",t[r],n,i)}function H(e){return J.isWindow(e)?e:9===e.nodeType&&e.defaultView}var q=[],W=q.slice,R=q.concat,V=q.push,X=q.indexOf,B={},U=B.toString,G=B.hasOwnProperty,Z={},Q=e.document,K="2.1.4",J=function(e,t){return new J.fn.init(e,t)},ee=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,te=/^-ms-/,ne=/-([\da-z])/gi,ie=function(e,t){return t.toUpperCase()};J.fn=J.prototype={jquery:K,constructor:J,selector:"",length:0,toArray:function(){return W.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:W.call(this)},pushStack:function(e){var t=J.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return J.each(this,e,t)},map:function(e){return this.pushStack(J.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(W.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:V,sort:q.sort,splice:q.splice},J.extend=J.fn.extend=function(){var e,t,n,i,r,o,s=arguments[0]||{},a=1,l=arguments.length,u=!1;for("boolean"==typeof s&&(u=s,s=arguments[a]||{},a++),"object"==typeof s||J.isFunction(s)||(s={}),a===l&&(s=this,a--);l>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],i=e[t],s!==i&&(u&&i&&(J.isPlainObject(i)||(r=J.isArray(i)))?(r?(r=!1,o=n&&J.isArray(n)?n:[]):o=n&&J.isPlainObject(n)?n:{},s[t]=J.extend(u,o,i)):void 0!==i&&(s[t]=i));return s},J.extend({expando:"jQuery"+(K+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===J.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!J.isArray(e)&&e-parseFloat(e)+1>=0},isPlainObject:function(e){return"object"!==J.type(e)||e.nodeType||J.isWindow(e)?!1:e.constructor&&!G.call(e.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?B[U.call(e)]||"object":typeof e},globalEval:function(e){var t,n=eval;e=J.trim(e),e&&(1===e.indexOf("use strict")?(t=Q.createElement("script"),t.text=e,Q.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(te,"ms-").replace(ne,ie)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,i){var r,o=0,s=e.length,a=n(e);if(i){if(a)for(;s>o&&(r=t.apply(e[o],i),r!==!1);o++);else for(o in e)if(r=t.apply(e[o],i),r===!1)break}else if(a)for(;s>o&&(r=t.call(e[o],o,e[o]),r!==!1);o++);else for(o in e)if(r=t.call(e[o],o,e[o]),r===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(ee,"")},makeArray:function(e,t){var i=t||[];return null!=e&&(n(Object(e))?J.merge(i,"string"==typeof e?[e]:e):V.call(i,e)),i},inArray:function(e,t,n){return null==t?-1:X.call(t,e,n)},merge:function(e,t){for(var n=+t.length,i=0,r=e.length;n>i;i++)e[r++]=t[i];return e.length=r,e},grep:function(e,t,n){for(var i,r=[],o=0,s=e.length,a=!n;s>o;o++)i=!t(e[o],o),i!==a&&r.push(e[o]);return r},map:function(e,t,i){var r,o=0,s=e.length,a=n(e),l=[];if(a)for(;s>o;o++)r=t(e[o],o,i),null!=r&&l.push(r);else for(o in e)r=t(e[o],o,i),null!=r&&l.push(r);return R.apply([],l)},guid:1,proxy:function(e,t){var n,i,r;return"string"==typeof t&&(n=e[t],t=e,e=n),J.isFunction(e)?(i=W.call(arguments,2),r=function(){return e.apply(t||this,i.concat(W.call(arguments)))},r.guid=e.guid=e.guid||J.guid++,r):void 0},now:Date.now,support:Z}),J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){B["[object "+t+"]"]=t.toLowerCase()});var re=function(e){function t(e,t,n,i){var r,o,s,a,l,u,d,f,h,g;if((t?t.ownerDocument||t:z)!==M&&A(t),t=t||M,n=n||[],a=t.nodeType,"string"!=typeof e||!e||1!==a&&9!==a&&11!==a)return n;if(!i&&F){if(11!==a&&(r=ye.exec(e)))if(s=r[1]){if(9===a){if(o=t.getElementById(s),!o||!o.parentNode)return n;if(o.id===s)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(s))&&Y(t,o)&&o.id===s)return n.push(o),n}else{if(r[2])return K.apply(n,t.getElementsByTagName(e)),n;if((s=r[3])&&x.getElementsByClassName)return K.apply(n,t.getElementsByClassName(s)),n}if(x.qsa&&(!I||!I.test(e))){if(f=d=$,h=t,g=1!==a&&e,1===a&&"object"!==t.nodeName.toLowerCase()){for(u=T(e),(d=t.getAttribute("id"))?f=d.replace(be,"\\$&"):t.setAttribute("id",f),f="[id='"+f+"'] ",l=u.length;l--;)u[l]=f+p(u[l]);h=we.test(e)&&c(t.parentNode)||t,g=u.join(",")}if(g)try{return K.apply(n,h.querySelectorAll(g)),n}catch(m){}finally{d||t.removeAttribute("id")}}}return E(e.replace(le,"$1"),t,n,i)}function n(){function e(n,i){return t.push(n+" ")>S.cacheLength&&delete e[t.shift()],e[n+" "]=i}var t=[];return e}function i(e){return e[$]=!0,e}function r(e){var t=M.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),i=e.length;i--;)S.attrHandle[n[i]]=t}function s(e,t){var n=t&&e,i=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||B)-(~e.sourceIndex||B);if(i)return i;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function a(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function u(e){return i(function(t){return t=+t,i(function(n,i){for(var r,o=e([],n.length,t),s=o.length;s--;)n[r=o[s]]&&(n[r]=!(i[r]=n[r]))})})}function c(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function d(){}function p(e){for(var t=0,n=e.length,i="";n>t;t++)i+=e[t].value;return i}function f(e,t,n){var i=t.dir,r=n&&"parentNode"===i,o=q++;return t.first?function(t,n,o){for(;t=t[i];)if(1===t.nodeType||r)return e(t,n,o)}:function(t,n,s){var a,l,u=[H,o];if(s){for(;t=t[i];)if((1===t.nodeType||r)&&e(t,n,s))return!0}else for(;t=t[i];)if(1===t.nodeType||r){if(l=t[$]||(t[$]={}),(a=l[i])&&a[0]===H&&a[1]===o)return u[2]=a[2];if(l[i]=u,u[2]=e(t,n,s))return!0}}}function h(e){return e.length>1?function(t,n,i){for(var r=e.length;r--;)if(!e[r](t,n,i))return!1;return!0}:e[0]}function g(e,n,i){for(var r=0,o=n.length;o>r;r++)t(e,n[r],i);return i}function m(e,t,n,i,r){for(var o,s=[],a=0,l=e.length,u=null!=t;l>a;a++)(o=e[a])&&(!n||n(o,i,r))&&(s.push(o),u&&t.push(a));return s}function v(e,t,n,r,o,s){return r&&!r[$]&&(r=v(r)),o&&!o[$]&&(o=v(o,s)),i(function(i,s,a,l){var u,c,d,p=[],f=[],h=s.length,v=i||g(t||"*",a.nodeType?[a]:a,[]),y=!e||!i&&t?v:m(v,p,e,a,l),w=n?o||(i?e:h||r)?[]:s:y;if(n&&n(y,w,a,l),r)for(u=m(w,f),r(u,[],a,l),c=u.length;c--;)(d=u[c])&&(w[f[c]]=!(y[f[c]]=d));if(i){if(o||e){if(o){for(u=[],c=w.length;c--;)(d=w[c])&&u.push(y[c]=d);o(null,w=[],u,l)}for(c=w.length;c--;)(d=w[c])&&(u=o?ee(i,d):p[c])>-1&&(i[u]=!(s[u]=d))}}else w=m(w===s?w.splice(h,w.length):w),o?o(null,s,w,l):K.apply(s,w)})}function y(e){for(var t,n,i,r=e.length,o=S.relative[e[0].type],s=o||S.relative[" "],a=o?1:0,l=f(function(e){return e===t},s,!0),u=f(function(e){return ee(t,e)>-1},s,!0),c=[function(e,n,i){var r=!o&&(i||n!==O)||((t=n).nodeType?l(e,n,i):u(e,n,i));return t=null,r}];r>a;a++)if(n=S.relative[e[a].type])c=[f(h(c),n)];else{if(n=S.filter[e[a].type].apply(null,e[a].matches),n[$]){for(i=++a;r>i&&!S.relative[e[i].type];i++);return v(a>1&&h(c),a>1&&p(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(le,"$1"),n,i>a&&y(e.slice(a,i)),r>i&&y(e=e.slice(i)),r>i&&p(e))}c.push(n)}return h(c)}function w(e,n){var r=n.length>0,o=e.length>0,s=function(i,s,a,l,u){var c,d,p,f=0,h="0",g=i&&[],v=[],y=O,w=i||o&&S.find.TAG("*",u),b=H+=null==y?1:Math.random()||.1,x=w.length;for(u&&(O=s!==M&&s);h!==x&&null!=(c=w[h]);h++){if(o&&c){for(d=0;p=e[d++];)if(p(c,s,a)){l.push(c);break}u&&(H=b)}r&&((c=!p&&c)&&f--,i&&g.push(c))}if(f+=h,r&&h!==f){for(d=0;p=n[d++];)p(g,v,s,a);if(i){if(f>0)for(;h--;)g[h]||v[h]||(v[h]=Z.call(l));v=m(v)}K.apply(l,v),u&&!i&&v.length>0&&f+n.length>1&&t.uniqueSort(l)}return u&&(H=b,O=y),g};return r?i(s):s}var b,x,S,k,C,T,_,E,O,D,P,A,M,N,F,I,L,j,Y,$="sizzle"+1*new Date,z=e.document,H=0,q=0,W=n(),R=n(),V=n(),X=function(e,t){return e===t&&(P=!0),0},B=1<<31,U={}.hasOwnProperty,G=[],Z=G.pop,Q=G.push,K=G.push,J=G.slice,ee=function(e,t){for(var n=0,i=e.length;i>n;n++)if(e[n]===t)return n;return-1},te="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",ie="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",re=ie.replace("w","w#"),oe="\\["+ne+"*("+ie+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+re+"))|)"+ne+"*\\]",se=":("+ie+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+oe+")*)|.*)\\)|)",ae=new RegExp(ne+"+","g"),le=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),ue=new RegExp("^"+ne+"*,"+ne+"*"),ce=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),de=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),pe=new RegExp(se),fe=new RegExp("^"+re+"$"),he={ID:new RegExp("^#("+ie+")"),CLASS:new RegExp("^\\.("+ie+")"),TAG:new RegExp("^("+ie.replace("w","w*")+")"),ATTR:new RegExp("^"+oe),PSEUDO:new RegExp("^"+se),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+te+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},ge=/^(?:input|select|textarea|button)$/i,me=/^h\d$/i,ve=/^[^{]+\{\s*\[native \w/,ye=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,we=/[+~]/,be=/'|\\/g,xe=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),Se=function(e,t,n){var i="0x"+t-65536;return i!==i||n?t:0>i?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,1023&i|56320)},ke=function(){A()};try{K.apply(G=J.call(z.childNodes),z.childNodes),G[z.childNodes.length].nodeType}catch(Ce){K={apply:G.length?function(e,t){Q.apply(e,J.call(t))}:function(e,t){for(var n=e.length,i=0;e[n++]=t[i++];);e.length=n-1}}}x=t.support={},C=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},A=t.setDocument=function(e){var t,n,i=e?e.ownerDocument||e:z;return i!==M&&9===i.nodeType&&i.documentElement?(M=i,N=i.documentElement,n=i.defaultView,n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",ke,!1):n.attachEvent&&n.attachEvent("onunload",ke)),F=!C(i),x.attributes=r(function(e){return e.className="i",!e.getAttribute("className")}),x.getElementsByTagName=r(function(e){return e.appendChild(i.createComment("")),!e.getElementsByTagName("*").length}),x.getElementsByClassName=ve.test(i.getElementsByClassName),x.getById=r(function(e){return N.appendChild(e).id=$,!i.getElementsByName||!i.getElementsByName($).length}),x.getById?(S.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&F){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},S.filter.ID=function(e){var t=e.replace(xe,Se);return function(e){return e.getAttribute("id")===t}}):(delete S.find.ID,S.filter.ID=function(e){var t=e.replace(xe,Se);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}}),S.find.TAG=x.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):x.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,i=[],r=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[r++];)1===n.nodeType&&i.push(n);return i}return o},S.find.CLASS=x.getElementsByClassName&&function(e,t){return F?t.getElementsByClassName(e):void 0},L=[],I=[],(x.qsa=ve.test(i.querySelectorAll))&&(r(function(e){N.appendChild(e).innerHTML="<a id='"+$+"'></a><select id='"+$+"-\f]' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&I.push("[*^$]="+ne+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||I.push("\\["+ne+"*(?:value|"+te+")"),e.querySelectorAll("[id~="+$+"-]").length||I.push("~="),e.querySelectorAll(":checked").length||I.push(":checked"),e.querySelectorAll("a#"+$+"+*").length||I.push(".#.+[+~]")}),r(function(e){var t=i.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&I.push("name"+ne+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||I.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),I.push(",.*:")})),(x.matchesSelector=ve.test(j=N.matches||N.webkitMatchesSelector||N.mozMatchesSelector||N.oMatchesSelector||N.msMatchesSelector))&&r(function(e){x.disconnectedMatch=j.call(e,"div"),j.call(e,"[s!='']:x"),L.push("!=",se)}),I=I.length&&new RegExp(I.join("|")),L=L.length&&new RegExp(L.join("|")),t=ve.test(N.compareDocumentPosition),Y=t||ve.test(N.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,i=t&&t.parentNode;return e===i||!(!i||1!==i.nodeType||!(n.contains?n.contains(i):e.compareDocumentPosition&&16&e.compareDocumentPosition(i)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},X=t?function(e,t){if(e===t)return P=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!x.sortDetached&&t.compareDocumentPosition(e)===n?e===i||e.ownerDocument===z&&Y(z,e)?-1:t===i||t.ownerDocument===z&&Y(z,t)?1:D?ee(D,e)-ee(D,t):0:4&n?-1:1)}:function(e,t){if(e===t)return P=!0,0;var n,r=0,o=e.parentNode,a=t.parentNode,l=[e],u=[t];if(!o||!a)return e===i?-1:t===i?1:o?-1:a?1:D?ee(D,e)-ee(D,t):0;if(o===a)return s(e,t);for(n=e;n=n.parentNode;)l.unshift(n);for(n=t;n=n.parentNode;)u.unshift(n);for(;l[r]===u[r];)r++;return r?s(l[r],u[r]):l[r]===z?-1:u[r]===z?1:0},i):M},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==M&&A(e),n=n.replace(de,"='$1']"),x.matchesSelector&&F&&(!L||!L.test(n))&&(!I||!I.test(n)))try{var i=j.call(e,n);if(i||x.disconnectedMatch||e.document&&11!==e.document.nodeType)return i}catch(r){}return t(n,M,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==M&&A(e),Y(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==M&&A(e);var n=S.attrHandle[t.toLowerCase()],i=n&&U.call(S.attrHandle,t.toLowerCase())?n(e,t,!F):void 0;return void 0!==i?i:x.attributes||!F?e.getAttribute(t):(i=e.getAttributeNode(t))&&i.specified?i.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],i=0,r=0;if(P=!x.detectDuplicates,D=!x.sortStable&&e.slice(0),e.sort(X),P){for(;t=e[r++];)t===e[r]&&(i=n.push(r));for(;i--;)e.splice(n[i],1)}return D=null,e},k=t.getText=function(e){var t,n="",i=0,r=e.nodeType;if(r){if(1===r||9===r||11===r){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=k(e)}else if(3===r||4===r)return e.nodeValue}else for(;t=e[i++];)n+=k(t);return n},S=t.selectors={cacheLength:50,createPseudo:i,match:he,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xe,Se),e[3]=(e[3]||e[4]||e[5]||"").replace(xe,Se),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return he.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&pe.test(n)&&(t=T(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(xe,Se).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=W[e+" "];return t||(t=new RegExp("(^|"+ne+")"+e+"("+ne+"|$)"))&&W(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,i){return function(r){var o=t.attr(r,e);return null==o?"!="===n:n?(o+="","="===n?o===i:"!="===n?o!==i:"^="===n?i&&0===o.indexOf(i):"*="===n?i&&o.indexOf(i)>-1:"$="===n?i&&o.slice(-i.length)===i:"~="===n?(" "+o.replace(ae," ")+" ").indexOf(i)>-1:"|="===n?o===i||o.slice(0,i.length+1)===i+"-":!1):!0}},CHILD:function(e,t,n,i,r){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===i&&0===r?function(e){return!!e.parentNode}:function(t,n,l){var u,c,d,p,f,h,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),y=!l&&!a;if(m){if(o){for(;g;){for(d=t;d=d[g];)if(a?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[s?m.firstChild:m.lastChild],s&&y){for(c=m[$]||(m[$]={}),u=c[e]||[],f=u[0]===H&&u[1],p=u[0]===H&&u[2],d=f&&m.childNodes[f];d=++f&&d&&d[g]||(p=f=0)||h.pop();)if(1===d.nodeType&&++p&&d===t){c[e]=[H,f,p];break}}else if(y&&(u=(t[$]||(t[$]={}))[e])&&u[0]===H)p=u[1];else for(;(d=++f&&d&&d[g]||(p=f=0)||h.pop())&&((a?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++p||(y&&((d[$]||(d[$]={}))[e]=[H,p]),d!==t)););return p-=r,p===i||p%i===0&&p/i>=0}}},PSEUDO:function(e,n){var r,o=S.pseudos[e]||S.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return o[$]?o(n):o.length>1?(r=[e,e,"",n],S.setFilters.hasOwnProperty(e.toLowerCase())?i(function(e,t){for(var i,r=o(e,n),s=r.length;s--;)i=ee(e,r[s]),e[i]=!(t[i]=r[s])}):function(e){return o(e,0,r)}):o}},pseudos:{not:i(function(e){var t=[],n=[],r=_(e.replace(le,"$1"));return r[$]?i(function(e,t,n,i){for(var o,s=r(e,null,i,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}}),has:i(function(e){return function(n){return t(e,n).length>0}}),contains:i(function(e){return e=e.replace(xe,Se),function(t){return(t.textContent||t.innerText||k(t)).indexOf(e)>-1}}),lang:i(function(e){return fe.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(xe,Se).toLowerCase(),function(t){var n;do if(n=F?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===N},focus:function(e){return e===M.activeElement&&(!M.hasFocus||M.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!S.pseudos.empty(e)},header:function(e){return me.test(e.nodeName)},input:function(e){return ge.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:u(function(){return[0]}),last:u(function(e,t){return[t-1]}),eq:u(function(e,t,n){return[0>n?n+t:n]}),even:u(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:u(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:u(function(e,t,n){for(var i=0>n?n+t:n;--i>=0;)e.push(i);return e}),gt:u(function(e,t,n){for(var i=0>n?n+t:n;++i<t;)e.push(i);return e})}},S.pseudos.nth=S.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})S.pseudos[b]=a(b);for(b in{submit:!0,reset:!0})S.pseudos[b]=l(b);return d.prototype=S.filters=S.pseudos,S.setFilters=new d,T=t.tokenize=function(e,n){var i,r,o,s,a,l,u,c=R[e+" "];if(c)return n?0:c.slice(0);for(a=e,l=[],u=S.preFilter;a;){(!i||(r=ue.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),l.push(o=[])),i=!1,(r=ce.exec(a))&&(i=r.shift(),o.push({value:i,type:r[0].replace(le," ")}),a=a.slice(i.length));for(s in S.filter)!(r=he[s].exec(a))||u[s]&&!(r=u[s](r))||(i=r.shift(),o.push({value:i,type:s,matches:r}),a=a.slice(i.length));if(!i)break}return n?a.length:a?t.error(e):R(e,l).slice(0)},_=t.compile=function(e,t){var n,i=[],r=[],o=V[e+" "];if(!o){for(t||(t=T(e)),n=t.length;n--;)o=y(t[n]),o[$]?i.push(o):r.push(o);o=V(e,w(r,i)),o.selector=e}return o},E=t.select=function(e,t,n,i){var r,o,s,a,l,u="function"==typeof e&&e,d=!i&&T(e=u.selector||e);if(n=n||[],1===d.length){if(o=d[0]=d[0].slice(0),o.length>2&&"ID"===(s=o[0]).type&&x.getById&&9===t.nodeType&&F&&S.relative[o[1].type]){if(t=(S.find.ID(s.matches[0].replace(xe,Se),t)||[])[0],!t)return n;u&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(r=he.needsContext.test(e)?0:o.length;r--&&(s=o[r],!S.relative[a=s.type]);)if((l=S.find[a])&&(i=l(s.matches[0].replace(xe,Se),we.test(o[0].type)&&c(t.parentNode)||t))){if(o.splice(r,1),e=i.length&&p(o),!e)return K.apply(n,i),n;break}}return(u||_(e,d))(i,t,!F,n,we.test(e)&&c(t.parentNode)||t),n},x.sortStable=$.split("").sort(X).join("")===$,x.detectDuplicates=!!P,A(),x.sortDetached=r(function(e){return 1&e.compareDocumentPosition(M.createElement("div"))}),r(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),x.attributes&&r(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),r(function(e){return null==e.getAttribute("disabled")})||o(te,function(e,t,n){var i;return n?void 0:e[t]===!0?t.toLowerCase():(i=e.getAttributeNode(t))&&i.specified?i.value:null}),t}(e);J.find=re,J.expr=re.selectors,J.expr[":"]=J.expr.pseudos,J.unique=re.uniqueSort,J.text=re.getText,J.isXMLDoc=re.isXML,J.contains=re.contains;var oe=J.expr.match.needsContext,se=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,ae=/^.[^:#\[\.,]*$/;J.filter=function(e,t,n){var i=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===i.nodeType?J.find.matchesSelector(i,e)?[i]:[]:J.find.matches(e,J.grep(t,function(e){return 1===e.nodeType}))},J.fn.extend({find:function(e){var t,n=this.length,i=[],r=this;
if("string"!=typeof e)return this.pushStack(J(e).filter(function(){for(t=0;n>t;t++)if(J.contains(r[t],this))return!0}));for(t=0;n>t;t++)J.find(e,r[t],i);return i=this.pushStack(n>1?J.unique(i):i),i.selector=this.selector?this.selector+" "+e:e,i},filter:function(e){return this.pushStack(i(this,e||[],!1))},not:function(e){return this.pushStack(i(this,e||[],!0))},is:function(e){return!!i(this,"string"==typeof e&&oe.test(e)?J(e):e||[],!1).length}});var le,ue=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ce=J.fn.init=function(e,t){var n,i;if(!e)return this;if("string"==typeof e){if(n="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:ue.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||le).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof J?t[0]:t,J.merge(this,J.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:Q,!0)),se.test(n[1])&&J.isPlainObject(t))for(n in t)J.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}return i=Q.getElementById(n[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=Q,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):J.isFunction(e)?"undefined"!=typeof le.ready?le.ready(e):e(J):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),J.makeArray(e,this))};ce.prototype=J.fn,le=J(Q);var de=/^(?:parents|prev(?:Until|All))/,pe={children:!0,contents:!0,next:!0,prev:!0};J.extend({dir:function(e,t,n){for(var i=[],r=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(r&&J(e).is(n))break;i.push(e)}return i},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}),J.fn.extend({has:function(e){var t=J(e,this),n=t.length;return this.filter(function(){for(var e=0;n>e;e++)if(J.contains(this,t[e]))return!0})},closest:function(e,t){for(var n,i=0,r=this.length,o=[],s=oe.test(e)||"string"!=typeof e?J(e,t||this.context):0;r>i;i++)for(n=this[i];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&J.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?J.unique(o):o)},index:function(e){return e?"string"==typeof e?X.call(J(e),this[0]):X.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(J.unique(J.merge(this.get(),J(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),J.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return J.dir(e,"parentNode")},parentsUntil:function(e,t,n){return J.dir(e,"parentNode",n)},next:function(e){return r(e,"nextSibling")},prev:function(e){return r(e,"previousSibling")},nextAll:function(e){return J.dir(e,"nextSibling")},prevAll:function(e){return J.dir(e,"previousSibling")},nextUntil:function(e,t,n){return J.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return J.dir(e,"previousSibling",n)},siblings:function(e){return J.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return J.sibling(e.firstChild)},contents:function(e){return e.contentDocument||J.merge([],e.childNodes)}},function(e,t){J.fn[e]=function(n,i){var r=J.map(this,t,n);return"Until"!==e.slice(-5)&&(i=n),i&&"string"==typeof i&&(r=J.filter(i,r)),this.length>1&&(pe[e]||J.unique(r),de.test(e)&&r.reverse()),this.pushStack(r)}});var fe=/\S+/g,he={};J.Callbacks=function(e){e="string"==typeof e?he[e]||o(e):J.extend({},e);var t,n,i,r,s,a,l=[],u=!e.once&&[],c=function(o){for(t=e.memory&&o,n=!0,a=r||0,r=0,s=l.length,i=!0;l&&s>a;a++)if(l[a].apply(o[0],o[1])===!1&&e.stopOnFalse){t=!1;break}i=!1,l&&(u?u.length&&c(u.shift()):t?l=[]:d.disable())},d={add:function(){if(l){var n=l.length;!function o(t){J.each(t,function(t,n){var i=J.type(n);"function"===i?e.unique&&d.has(n)||l.push(n):n&&n.length&&"string"!==i&&o(n)})}(arguments),i?s=l.length:t&&(r=n,c(t))}return this},remove:function(){return l&&J.each(arguments,function(e,t){for(var n;(n=J.inArray(t,l,n))>-1;)l.splice(n,1),i&&(s>=n&&s--,a>=n&&a--)}),this},has:function(e){return e?J.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],s=0,this},disable:function(){return l=u=t=void 0,this},disabled:function(){return!l},lock:function(){return u=void 0,t||d.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!l||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],i?u.push(t):c(t)),this},fire:function(){return d.fireWith(this,arguments),this},fired:function(){return!!n}};return d},J.extend({Deferred:function(e){var t=[["resolve","done",J.Callbacks("once memory"),"resolved"],["reject","fail",J.Callbacks("once memory"),"rejected"],["notify","progress",J.Callbacks("memory")]],n="pending",i={state:function(){return n},always:function(){return r.done(arguments).fail(arguments),this},then:function(){var e=arguments;return J.Deferred(function(n){J.each(t,function(t,o){var s=J.isFunction(e[t])&&e[t];r[o[1]](function(){var e=s&&s.apply(this,arguments);e&&J.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===i?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?J.extend(e,i):i}},r={};return i.pipe=i.then,J.each(t,function(e,o){var s=o[2],a=o[3];i[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),r[o[0]]=function(){return r[o[0]+"With"](this===r?i:this,arguments),this},r[o[0]+"With"]=s.fireWith}),i.promise(r),e&&e.call(r,r),r},when:function(e){var t,n,i,r=0,o=W.call(arguments),s=o.length,a=1!==s||e&&J.isFunction(e.promise)?s:0,l=1===a?e:J.Deferred(),u=function(e,n,i){return function(r){n[e]=this,i[e]=arguments.length>1?W.call(arguments):r,i===t?l.notifyWith(n,i):--a||l.resolveWith(n,i)}};if(s>1)for(t=new Array(s),n=new Array(s),i=new Array(s);s>r;r++)o[r]&&J.isFunction(o[r].promise)?o[r].promise().done(u(r,i,o)).fail(l.reject).progress(u(r,n,t)):--a;return a||l.resolveWith(i,o),l.promise()}});var ge;J.fn.ready=function(e){return J.ready.promise().done(e),this},J.extend({isReady:!1,readyWait:1,holdReady:function(e){e?J.readyWait++:J.ready(!0)},ready:function(e){(e===!0?--J.readyWait:J.isReady)||(J.isReady=!0,e!==!0&&--J.readyWait>0||(ge.resolveWith(Q,[J]),J.fn.triggerHandler&&(J(Q).triggerHandler("ready"),J(Q).off("ready"))))}}),J.ready.promise=function(t){return ge||(ge=J.Deferred(),"complete"===Q.readyState?setTimeout(J.ready):(Q.addEventListener("DOMContentLoaded",s,!1),e.addEventListener("load",s,!1))),ge.promise(t)},J.ready.promise();var me=J.access=function(e,t,n,i,r,o,s){var a=0,l=e.length,u=null==n;if("object"===J.type(n)){r=!0;for(a in n)J.access(e,t,a,n[a],!0,o,s)}else if(void 0!==i&&(r=!0,J.isFunction(i)||(s=!0),u&&(s?(t.call(e,i),t=null):(u=t,t=function(e,t,n){return u.call(J(e),n)})),t))for(;l>a;a++)t(e[a],n,s?i:i.call(e[a],a,t(e[a],n)));return r?e:u?t.call(e):l?t(e[0],n):o};J.acceptData=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType},a.uid=1,a.accepts=J.acceptData,a.prototype={key:function(e){if(!a.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=a.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(i){t[this.expando]=n,J.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var i,r=this.key(e),o=this.cache[r];if("string"==typeof t)o[t]=n;else if(J.isEmptyObject(o))J.extend(this.cache[r],t);else for(i in t)o[i]=t[i];return o},get:function(e,t){var n=this.cache[this.key(e)];return void 0===t?n:n[t]},access:function(e,t,n){var i;return void 0===t||t&&"string"==typeof t&&void 0===n?(i=this.get(e,t),void 0!==i?i:this.get(e,J.camelCase(t))):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,i,r,o=this.key(e),s=this.cache[o];if(void 0===t)this.cache[o]={};else{J.isArray(t)?i=t.concat(t.map(J.camelCase)):(r=J.camelCase(t),t in s?i=[t,r]:(i=r,i=i in s?[i]:i.match(fe)||[])),n=i.length;for(;n--;)delete s[i[n]]}},hasData:function(e){return!J.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}};var ve=new a,ye=new a,we=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,be=/([A-Z])/g;J.extend({hasData:function(e){return ye.hasData(e)||ve.hasData(e)},data:function(e,t,n){return ye.access(e,t,n)},removeData:function(e,t){ye.remove(e,t)},_data:function(e,t,n){return ve.access(e,t,n)},_removeData:function(e,t){ve.remove(e,t)}}),J.fn.extend({data:function(e,t){var n,i,r,o=this[0],s=o&&o.attributes;if(void 0===e){if(this.length&&(r=ye.get(o),1===o.nodeType&&!ve.get(o,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&(i=s[n].name,0===i.indexOf("data-")&&(i=J.camelCase(i.slice(5)),l(o,i,r[i])));ve.set(o,"hasDataAttrs",!0)}return r}return"object"==typeof e?this.each(function(){ye.set(this,e)}):me(this,function(t){var n,i=J.camelCase(e);if(o&&void 0===t){if(n=ye.get(o,e),void 0!==n)return n;if(n=ye.get(o,i),void 0!==n)return n;if(n=l(o,i,void 0),void 0!==n)return n}else this.each(function(){var n=ye.get(this,i);ye.set(this,i,t),-1!==e.indexOf("-")&&void 0!==n&&ye.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){ye.remove(this,e)})}}),J.extend({queue:function(e,t,n){var i;return e?(t=(t||"fx")+"queue",i=ve.get(e,t),n&&(!i||J.isArray(n)?i=ve.access(e,t,J.makeArray(n)):i.push(n)),i||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=J.queue(e,t),i=n.length,r=n.shift(),o=J._queueHooks(e,t),s=function(){J.dequeue(e,t)};"inprogress"===r&&(r=n.shift(),i--),r&&("fx"===t&&n.unshift("inprogress"),delete o.stop,r.call(e,s,o)),!i&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return ve.get(e,n)||ve.access(e,n,{empty:J.Callbacks("once memory").add(function(){ve.remove(e,[t+"queue",n])})})}}),J.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?J.queue(this[0],e):void 0===t?this:this.each(function(){var n=J.queue(this,e,t);J._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&J.dequeue(this,e)})},dequeue:function(e){return this.each(function(){J.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,i=1,r=J.Deferred(),o=this,s=this.length,a=function(){--i||r.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)n=ve.get(o[s],e+"queueHooks"),n&&n.empty&&(i++,n.empty.add(a));return a(),r.promise(t)}});var xe=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Se=["Top","Right","Bottom","Left"],ke=function(e,t){return e=t||e,"none"===J.css(e,"display")||!J.contains(e.ownerDocument,e)},Ce=/^(?:checkbox|radio)$/i;!function(){var e=Q.createDocumentFragment(),t=e.appendChild(Q.createElement("div")),n=Q.createElement("input");n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),Z.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",Z.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var Te="undefined";Z.focusinBubbles="onfocusin"in e;var _e=/^key/,Ee=/^(?:mouse|pointer|contextmenu)|click/,Oe=/^(?:focusinfocus|focusoutblur)$/,De=/^([^.]*)(?:\.(.+)|)$/;J.event={global:{},add:function(e,t,n,i,r){var o,s,a,l,u,c,d,p,f,h,g,m=ve.get(e);if(m)for(n.handler&&(o=n,n=o.handler,r=o.selector),n.guid||(n.guid=J.guid++),(l=m.events)||(l=m.events={}),(s=m.handle)||(s=m.handle=function(t){return typeof J!==Te&&J.event.triggered!==t.type?J.event.dispatch.apply(e,arguments):void 0}),t=(t||"").match(fe)||[""],u=t.length;u--;)a=De.exec(t[u])||[],f=g=a[1],h=(a[2]||"").split(".").sort(),f&&(d=J.event.special[f]||{},f=(r?d.delegateType:d.bindType)||f,d=J.event.special[f]||{},c=J.extend({type:f,origType:g,data:i,handler:n,guid:n.guid,selector:r,needsContext:r&&J.expr.match.needsContext.test(r),namespace:h.join(".")},o),(p=l[f])||(p=l[f]=[],p.delegateCount=0,d.setup&&d.setup.call(e,i,h,s)!==!1||e.addEventListener&&e.addEventListener(f,s,!1)),d.add&&(d.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),r?p.splice(p.delegateCount++,0,c):p.push(c),J.event.global[f]=!0)},remove:function(e,t,n,i,r){var o,s,a,l,u,c,d,p,f,h,g,m=ve.hasData(e)&&ve.get(e);if(m&&(l=m.events)){for(t=(t||"").match(fe)||[""],u=t.length;u--;)if(a=De.exec(t[u])||[],f=g=a[1],h=(a[2]||"").split(".").sort(),f){for(d=J.event.special[f]||{},f=(i?d.delegateType:d.bindType)||f,p=l[f]||[],a=a[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=p.length;o--;)c=p[o],!r&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||i&&i!==c.selector&&("**"!==i||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,d.remove&&d.remove.call(e,c));s&&!p.length&&(d.teardown&&d.teardown.call(e,h,m.handle)!==!1||J.removeEvent(e,f,m.handle),delete l[f])}else for(f in l)J.event.remove(e,f+t[u],n,i,!0);J.isEmptyObject(l)&&(delete m.handle,ve.remove(e,"events"))}},trigger:function(t,n,i,r){var o,s,a,l,u,c,d,p=[i||Q],f=G.call(t,"type")?t.type:t,h=G.call(t,"namespace")?t.namespace.split("."):[];if(s=a=i=i||Q,3!==i.nodeType&&8!==i.nodeType&&!Oe.test(f+J.event.triggered)&&(f.indexOf(".")>=0&&(h=f.split("."),f=h.shift(),h.sort()),u=f.indexOf(":")<0&&"on"+f,t=t[J.expando]?t:new J.Event(f,"object"==typeof t&&t),t.isTrigger=r?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:J.makeArray(n,[t]),d=J.event.special[f]||{},r||!d.trigger||d.trigger.apply(i,n)!==!1)){if(!r&&!d.noBubble&&!J.isWindow(i)){for(l=d.delegateType||f,Oe.test(l+f)||(s=s.parentNode);s;s=s.parentNode)p.push(s),a=s;a===(i.ownerDocument||Q)&&p.push(a.defaultView||a.parentWindow||e)}for(o=0;(s=p[o++])&&!t.isPropagationStopped();)t.type=o>1?l:d.bindType||f,c=(ve.get(s,"events")||{})[t.type]&&ve.get(s,"handle"),c&&c.apply(s,n),c=u&&s[u],c&&c.apply&&J.acceptData(s)&&(t.result=c.apply(s,n),t.result===!1&&t.preventDefault());return t.type=f,r||t.isDefaultPrevented()||d._default&&d._default.apply(p.pop(),n)!==!1||!J.acceptData(i)||u&&J.isFunction(i[f])&&!J.isWindow(i)&&(a=i[u],a&&(i[u]=null),J.event.triggered=f,i[f](),J.event.triggered=void 0,a&&(i[u]=a)),t.result}},dispatch:function(e){e=J.event.fix(e);var t,n,i,r,o,s=[],a=W.call(arguments),l=(ve.get(this,"events")||{})[e.type]||[],u=J.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!u.preDispatch||u.preDispatch.call(this,e)!==!1){for(s=J.event.handlers.call(this,e,l),t=0;(r=s[t++])&&!e.isPropagationStopped();)for(e.currentTarget=r.elem,n=0;(o=r.handlers[n++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,i=((J.event.special[o.origType]||{}).handle||o.handler).apply(r.elem,a),void 0!==i&&(e.result=i)===!1&&(e.preventDefault(),e.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,i,r,o,s=[],a=t.delegateCount,l=e.target;if(a&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!==this;l=l.parentNode||this)if(l.disabled!==!0||"click"!==e.type){for(i=[],n=0;a>n;n++)o=t[n],r=o.selector+" ",void 0===i[r]&&(i[r]=o.needsContext?J(r,this).index(l)>=0:J.find(r,this,null,[l]).length),i[r]&&i.push(o);i.length&&s.push({elem:l,handlers:i})}return a<t.length&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,i,r,o=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||Q,i=n.documentElement,r=n.body,e.pageX=t.clientX+(i&&i.scrollLeft||r&&r.scrollLeft||0)-(i&&i.clientLeft||r&&r.clientLeft||0),e.pageY=t.clientY+(i&&i.scrollTop||r&&r.scrollTop||0)-(i&&i.clientTop||r&&r.clientTop||0)),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0),e}},fix:function(e){if(e[J.expando])return e;var t,n,i,r=e.type,o=e,s=this.fixHooks[r];for(s||(this.fixHooks[r]=s=Ee.test(r)?this.mouseHooks:_e.test(r)?this.keyHooks:{}),i=s.props?this.props.concat(s.props):this.props,e=new J.Event(o),t=i.length;t--;)n=i[t],e[n]=o[n];return e.target||(e.target=Q),3===e.target.nodeType&&(e.target=e.target.parentNode),s.filter?s.filter(e,o):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==d()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===d()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&J.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(e){return J.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,i){var r=J.extend(new J.Event,n,{type:e,isSimulated:!0,originalEvent:{}});i?J.event.trigger(r,null,t):J.event.dispatch.call(t,r),r.isDefaultPrevented()&&n.preventDefault()}},J.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},J.Event=function(e,t){return this instanceof J.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?u:c):this.type=e,t&&J.extend(this,t),this.timeStamp=e&&e.timeStamp||J.now(),void(this[J.expando]=!0)):new J.Event(e,t)},J.Event.prototype={isDefaultPrevented:c,isPropagationStopped:c,isImmediatePropagationStopped:c,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=u,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=u,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=u,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},J.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){J.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,i=this,r=e.relatedTarget,o=e.handleObj;return(!r||r!==i&&!J.contains(i,r))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),Z.focusinBubbles||J.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){J.event.simulate(t,e.target,J.event.fix(e),!0)};J.event.special[t]={setup:function(){var i=this.ownerDocument||this,r=ve.access(i,t);r||i.addEventListener(e,n,!0),ve.access(i,t,(r||0)+1)},teardown:function(){var i=this.ownerDocument||this,r=ve.access(i,t)-1;r?ve.access(i,t,r):(i.removeEventListener(e,n,!0),ve.remove(i,t))}}}),J.fn.extend({on:function(e,t,n,i,r){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=void 0);for(s in e)this.on(s,t,n,e[s],r);return this}if(null==n&&null==i?(i=t,n=t=void 0):null==i&&("string"==typeof t?(i=n,n=void 0):(i=n,n=t,t=void 0)),i===!1)i=c;else if(!i)return this;return 1===r&&(o=i,i=function(e){return J().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=J.guid++)),this.each(function(){J.event.add(this,e,i,n,t)})},one:function(e,t,n,i){return this.on(e,t,n,i,1)},off:function(e,t,n){var i,r;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,J(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(r in e)this.off(r,t,e[r]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=void 0),n===!1&&(n=c),this.each(function(){J.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){J.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?J.event.trigger(e,t,n,!0):void 0}});var Pe=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Ae=/<([\w:]+)/,Me=/<|&#?\w+;/,Ne=/<(?:script|style|link)/i,Fe=/checked\s*(?:[^=]|=\s*.checked.)/i,Ie=/^$|\/(?:java|ecma)script/i,Le=/^true\/(.*)/,je=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Ye={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Ye.optgroup=Ye.option,Ye.tbody=Ye.tfoot=Ye.colgroup=Ye.caption=Ye.thead,Ye.th=Ye.td,J.extend({clone:function(e,t,n){var i,r,o,s,a=e.cloneNode(!0),l=J.contains(e.ownerDocument,e);if(!(Z.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||J.isXMLDoc(e)))for(s=v(a),o=v(e),i=0,r=o.length;r>i;i++)y(o[i],s[i]);if(t)if(n)for(o=o||v(e),s=s||v(a),i=0,r=o.length;r>i;i++)m(o[i],s[i]);else m(e,a);return s=v(a,"script"),s.length>0&&g(s,!l&&v(e,"script")),a},buildFragment:function(e,t,n,i){for(var r,o,s,a,l,u,c=t.createDocumentFragment(),d=[],p=0,f=e.length;f>p;p++)if(r=e[p],r||0===r)if("object"===J.type(r))J.merge(d,r.nodeType?[r]:r);else if(Me.test(r)){for(o=o||c.appendChild(t.createElement("div")),s=(Ae.exec(r)||["",""])[1].toLowerCase(),a=Ye[s]||Ye._default,o.innerHTML=a[1]+r.replace(Pe,"<$1></$2>")+a[2],u=a[0];u--;)o=o.lastChild;J.merge(d,o.childNodes),o=c.firstChild,o.textContent=""}else d.push(t.createTextNode(r));for(c.textContent="",p=0;r=d[p++];)if((!i||-1===J.inArray(r,i))&&(l=J.contains(r.ownerDocument,r),o=v(c.appendChild(r),"script"),l&&g(o),n))for(u=0;r=o[u++];)Ie.test(r.type||"")&&n.push(r);return c},cleanData:function(e){for(var t,n,i,r,o=J.event.special,s=0;void 0!==(n=e[s]);s++){if(J.acceptData(n)&&(r=n[ve.expando],r&&(t=ve.cache[r]))){if(t.events)for(i in t.events)o[i]?J.event.remove(n,i):J.removeEvent(n,i,t.handle);ve.cache[r]&&delete ve.cache[r]}delete ye.cache[n[ye.expando]]}}}),J.fn.extend({text:function(e){return me(this,function(e){return void 0===e?J.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)})},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,i=e?J.filter(e,this):this,r=0;null!=(n=i[r]);r++)t||1!==n.nodeType||J.cleanData(v(n)),n.parentNode&&(t&&J.contains(n.ownerDocument,n)&&g(v(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(J.cleanData(v(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return J.clone(this,e,t)})},html:function(e){return me(this,function(e){var t=this[0]||{},n=0,i=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ne.test(e)&&!Ye[(Ae.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(Pe,"<$1></$2>");try{for(;i>n;n++)t=this[n]||{},1===t.nodeType&&(J.cleanData(v(t,!1)),t.innerHTML=e);t=0}catch(r){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=arguments[0];return this.domManip(arguments,function(t){e=this.parentNode,J.cleanData(v(this)),e&&e.replaceChild(t,this)}),e&&(e.length||e.nodeType)?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){e=R.apply([],e);var n,i,r,o,s,a,l=0,u=this.length,c=this,d=u-1,p=e[0],g=J.isFunction(p);if(g||u>1&&"string"==typeof p&&!Z.checkClone&&Fe.test(p))return this.each(function(n){var i=c.eq(n);g&&(e[0]=p.call(this,n,i.html())),i.domManip(e,t)});if(u&&(n=J.buildFragment(e,this[0].ownerDocument,!1,this),i=n.firstChild,1===n.childNodes.length&&(n=i),i)){for(r=J.map(v(n,"script"),f),o=r.length;u>l;l++)s=n,l!==d&&(s=J.clone(s,!0,!0),o&&J.merge(r,v(s,"script"))),t.call(this[l],s,l);if(o)for(a=r[r.length-1].ownerDocument,J.map(r,h),l=0;o>l;l++)s=r[l],Ie.test(s.type||"")&&!ve.access(s,"globalEval")&&J.contains(a,s)&&(s.src?J._evalUrl&&J._evalUrl(s.src):J.globalEval(s.textContent.replace(je,"")))}return this}}),J.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){J.fn[e]=function(e){for(var n,i=[],r=J(e),o=r.length-1,s=0;o>=s;s++)n=s===o?this:this.clone(!0),J(r[s])[t](n),V.apply(i,n.get());return this.pushStack(i)}});var $e,ze={},He=/^margin/,qe=new RegExp("^("+xe+")(?!px)[a-z%]+$","i"),We=function(t){return t.ownerDocument.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):e.getComputedStyle(t,null)};!function(){function t(){s.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",s.innerHTML="",r.appendChild(o);var t=e.getComputedStyle(s,null);n="1%"!==t.top,i="4px"===t.width,r.removeChild(o)}var n,i,r=Q.documentElement,o=Q.createElement("div"),s=Q.createElement("div");s.style&&(s.style.backgroundClip="content-box",s.cloneNode(!0).style.backgroundClip="",Z.clearCloneStyle="content-box"===s.style.backgroundClip,o.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",o.appendChild(s),e.getComputedStyle&&J.extend(Z,{pixelPosition:function(){return t(),n},boxSizingReliable:function(){return null==i&&t(),i},reliableMarginRight:function(){var t,n=s.appendChild(Q.createElement("div"));return n.style.cssText=s.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",n.style.marginRight=n.style.width="0",s.style.width="1px",r.appendChild(o),t=!parseFloat(e.getComputedStyle(n,null).marginRight),r.removeChild(o),s.removeChild(n),t}}))}(),J.swap=function(e,t,n,i){var r,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];r=n.apply(e,i||[]);for(o in t)e.style[o]=s[o];return r};var Re=/^(none|table(?!-c[ea]).+)/,Ve=new RegExp("^("+xe+")(.*)$","i"),Xe=new RegExp("^([+-])=("+xe+")","i"),Be={position:"absolute",visibility:"hidden",display:"block"},Ue={letterSpacing:"0",fontWeight:"400"},Ge=["Webkit","O","Moz","ms"];J.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=x(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var r,o,s,a=J.camelCase(t),l=e.style;return t=J.cssProps[a]||(J.cssProps[a]=k(l,a)),s=J.cssHooks[t]||J.cssHooks[a],void 0===n?s&&"get"in s&&void 0!==(r=s.get(e,!1,i))?r:l[t]:(o=typeof n,"string"===o&&(r=Xe.exec(n))&&(n=(r[1]+1)*r[2]+parseFloat(J.css(e,t)),o="number"),null!=n&&n===n&&("number"!==o||J.cssNumber[a]||(n+="px"),Z.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,i))||(l[t]=n)),void 0)}},css:function(e,t,n,i){var r,o,s,a=J.camelCase(t);return t=J.cssProps[a]||(J.cssProps[a]=k(e.style,a)),s=J.cssHooks[t]||J.cssHooks[a],s&&"get"in s&&(r=s.get(e,!0,n)),void 0===r&&(r=x(e,t,i)),"normal"===r&&t in Ue&&(r=Ue[t]),""===n||n?(o=parseFloat(r),n===!0||J.isNumeric(o)?o||0:r):r}}),J.each(["height","width"],function(e,t){J.cssHooks[t]={get:function(e,n,i){return n?Re.test(J.css(e,"display"))&&0===e.offsetWidth?J.swap(e,Be,function(){return _(e,t,i)}):_(e,t,i):void 0},set:function(e,n,i){var r=i&&We(e);return C(e,n,i?T(e,t,i,"border-box"===J.css(e,"boxSizing",!1,r),r):0)}}}),J.cssHooks.marginRight=S(Z.reliableMarginRight,function(e,t){return t?J.swap(e,{display:"inline-block"},x,[e,"marginRight"]):void 0}),J.each({margin:"",padding:"",border:"Width"},function(e,t){J.cssHooks[e+t]={expand:function(n){for(var i=0,r={},o="string"==typeof n?n.split(" "):[n];4>i;i++)r[e+Se[i]+t]=o[i]||o[i-2]||o[0];return r}},He.test(e)||(J.cssHooks[e+t].set=C)}),J.fn.extend({css:function(e,t){return me(this,function(e,t,n){var i,r,o={},s=0;if(J.isArray(t)){for(i=We(e),r=t.length;r>s;s++)o[t[s]]=J.css(e,t[s],!1,i);return o}return void 0!==n?J.style(e,t,n):J.css(e,t)},e,t,arguments.length>1)},show:function(){return E(this,!0)},hide:function(){return E(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ke(this)?J(this).show():J(this).hide()})}}),J.Tween=O,O.prototype={constructor:O,init:function(e,t,n,i,r,o){this.elem=e,this.prop=n,this.easing=r||"swing",this.options=t,this.start=this.now=this.cur(),this.end=i,this.unit=o||(J.cssNumber[n]?"":"px")},cur:function(){var e=O.propHooks[this.prop];return e&&e.get?e.get(this):O.propHooks._default.get(this)},run:function(e){var t,n=O.propHooks[this.prop];return this.options.duration?this.pos=t=J.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):O.propHooks._default.set(this),this}},O.prototype.init.prototype=O.prototype,O.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=J.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){J.fx.step[e.prop]?J.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[J.cssProps[e.prop]]||J.cssHooks[e.prop])?J.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},O.propHooks.scrollTop=O.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},J.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},J.fx=O.prototype.init,J.fx.step={};var Ze,Qe,Ke=/^(?:toggle|show|hide)$/,Je=new RegExp("^(?:([+-])=|)("+xe+")([a-z%]*)$","i"),et=/queueHooks$/,tt=[M],nt={"*":[function(e,t){var n=this.createTween(e,t),i=n.cur(),r=Je.exec(t),o=r&&r[3]||(J.cssNumber[e]?"":"px"),s=(J.cssNumber[e]||"px"!==o&&+i)&&Je.exec(J.css(n.elem,e)),a=1,l=20;if(s&&s[3]!==o){o=o||s[3],r=r||[],s=+i||1;do a=a||".5",s/=a,J.style(n.elem,e,s+o);while(a!==(a=n.cur()/i)&&1!==a&&--l)}return r&&(s=n.start=+s||+i||0,n.unit=o,n.end=r[1]?s+(r[1]+1)*r[2]:+r[2]),n}]};J.Animation=J.extend(F,{tweener:function(e,t){J.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,i=0,r=e.length;r>i;i++)n=e[i],nt[n]=nt[n]||[],nt[n].unshift(t)},prefilter:function(e,t){t?tt.unshift(e):tt.push(e)}}),J.speed=function(e,t,n){var i=e&&"object"==typeof e?J.extend({},e):{complete:n||!n&&t||J.isFunction(e)&&e,duration:e,easing:n&&t||t&&!J.isFunction(t)&&t};return i.duration=J.fx.off?0:"number"==typeof i.duration?i.duration:i.duration in J.fx.speeds?J.fx.speeds[i.duration]:J.fx.speeds._default,(null==i.queue||i.queue===!0)&&(i.queue="fx"),i.old=i.complete,i.complete=function(){J.isFunction(i.old)&&i.old.call(this),i.queue&&J.dequeue(this,i.queue)},i},J.fn.extend({fadeTo:function(e,t,n,i){return this.filter(ke).css("opacity",0).show().end().animate({opacity:t},e,n,i)},animate:function(e,t,n,i){var r=J.isEmptyObject(e),o=J.speed(t,n,i),s=function(){var t=F(this,J.extend({},e),o);(r||ve.get(this,"finish"))&&t.stop(!0)};return s.finish=s,r||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var i=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,r=null!=e&&e+"queueHooks",o=J.timers,s=ve.get(this);if(r)s[r]&&s[r].stop&&i(s[r]);else for(r in s)s[r]&&s[r].stop&&et.test(r)&&i(s[r]);for(r=o.length;r--;)o[r].elem!==this||null!=e&&o[r].queue!==e||(o[r].anim.stop(n),t=!1,o.splice(r,1));(t||!n)&&J.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=ve.get(this),i=n[e+"queue"],r=n[e+"queueHooks"],o=J.timers,s=i?i.length:0;for(n.finish=!0,J.queue(this,e,[]),
r&&r.stop&&r.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)i[t]&&i[t].finish&&i[t].finish.call(this);delete n.finish})}}),J.each(["toggle","show","hide"],function(e,t){var n=J.fn[t];J.fn[t]=function(e,i,r){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(P(t,!0),e,i,r)}}),J.each({slideDown:P("show"),slideUp:P("hide"),slideToggle:P("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){J.fn[e]=function(e,n,i){return this.animate(t,e,n,i)}}),J.timers=[],J.fx.tick=function(){var e,t=0,n=J.timers;for(Ze=J.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);n.length||J.fx.stop(),Ze=void 0},J.fx.timer=function(e){J.timers.push(e),e()?J.fx.start():J.timers.pop()},J.fx.interval=13,J.fx.start=function(){Qe||(Qe=setInterval(J.fx.tick,J.fx.interval))},J.fx.stop=function(){clearInterval(Qe),Qe=null},J.fx.speeds={slow:600,fast:200,_default:400},J.fn.delay=function(e,t){return e=J.fx?J.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var i=setTimeout(t,e);n.stop=function(){clearTimeout(i)}})},function(){var e=Q.createElement("input"),t=Q.createElement("select"),n=t.appendChild(Q.createElement("option"));e.type="checkbox",Z.checkOn=""!==e.value,Z.optSelected=n.selected,t.disabled=!0,Z.optDisabled=!n.disabled,e=Q.createElement("input"),e.value="t",e.type="radio",Z.radioValue="t"===e.value}();var it,rt,ot=J.expr.attrHandle;J.fn.extend({attr:function(e,t){return me(this,J.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){J.removeAttr(this,e)})}}),J.extend({attr:function(e,t,n){var i,r,o=e.nodeType;if(e&&3!==o&&8!==o&&2!==o)return typeof e.getAttribute===Te?J.prop(e,t,n):(1===o&&J.isXMLDoc(e)||(t=t.toLowerCase(),i=J.attrHooks[t]||(J.expr.match.bool.test(t)?rt:it)),void 0===n?i&&"get"in i&&null!==(r=i.get(e,t))?r:(r=J.find.attr(e,t),null==r?void 0:r):null!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):void J.removeAttr(e,t))},removeAttr:function(e,t){var n,i,r=0,o=t&&t.match(fe);if(o&&1===e.nodeType)for(;n=o[r++];)i=J.propFix[n]||n,J.expr.match.bool.test(n)&&(e[i]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!Z.radioValue&&"radio"===t&&J.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),rt={set:function(e,t,n){return t===!1?J.removeAttr(e,n):e.setAttribute(n,n),n}},J.each(J.expr.match.bool.source.match(/\w+/g),function(e,t){var n=ot[t]||J.find.attr;ot[t]=function(e,t,i){var r,o;return i||(o=ot[t],ot[t]=r,r=null!=n(e,t,i)?t.toLowerCase():null,ot[t]=o),r}});var st=/^(?:input|select|textarea|button)$/i;J.fn.extend({prop:function(e,t){return me(this,J.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[J.propFix[e]||e]})}}),J.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var i,r,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!J.isXMLDoc(e),o&&(t=J.propFix[t]||t,r=J.propHooks[t]),void 0!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:e[t]=n:r&&"get"in r&&null!==(i=r.get(e,t))?i:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||st.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),Z.optSelected||(J.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),J.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){J.propFix[this.toLowerCase()]=this});var at=/[\t\r\n\f]/g;J.fn.extend({addClass:function(e){var t,n,i,r,o,s,a="string"==typeof e&&e,l=0,u=this.length;if(J.isFunction(e))return this.each(function(t){J(this).addClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(fe)||[];u>l;l++)if(n=this[l],i=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(at," "):" ")){for(o=0;r=t[o++];)i.indexOf(" "+r+" ")<0&&(i+=r+" ");s=J.trim(i),n.className!==s&&(n.className=s)}return this},removeClass:function(e){var t,n,i,r,o,s,a=0===arguments.length||"string"==typeof e&&e,l=0,u=this.length;if(J.isFunction(e))return this.each(function(t){J(this).removeClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(fe)||[];u>l;l++)if(n=this[l],i=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(at," "):"")){for(o=0;r=t[o++];)for(;i.indexOf(" "+r+" ")>=0;)i=i.replace(" "+r+" "," ");s=e?J.trim(i):"",n.className!==s&&(n.className=s)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):J.isFunction(e)?this.each(function(n){J(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n)for(var t,i=0,r=J(this),o=e.match(fe)||[];t=o[i++];)r.hasClass(t)?r.removeClass(t):r.addClass(t);else(n===Te||"boolean"===n)&&(this.className&&ve.set(this,"__className__",this.className),this.className=this.className||e===!1?"":ve.get(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,i=this.length;i>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(at," ").indexOf(t)>=0)return!0;return!1}});var lt=/\r/g;J.fn.extend({val:function(e){var t,n,i,r=this[0];{if(arguments.length)return i=J.isFunction(e),this.each(function(n){var r;1===this.nodeType&&(r=i?e.call(this,n,J(this).val()):e,null==r?r="":"number"==typeof r?r+="":J.isArray(r)&&(r=J.map(r,function(e){return null==e?"":e+""})),t=J.valHooks[this.type]||J.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,r,"value")||(this.value=r))});if(r)return t=J.valHooks[r.type]||J.valHooks[r.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(r,"value"))?n:(n=r.value,"string"==typeof n?n.replace(lt,""):null==n?"":n)}}}),J.extend({valHooks:{option:{get:function(e){var t=J.find.attr(e,"value");return null!=t?t:J.trim(J.text(e))}},select:{get:function(e){for(var t,n,i=e.options,r=e.selectedIndex,o="select-one"===e.type||0>r,s=o?null:[],a=o?r+1:i.length,l=0>r?a:o?r:0;a>l;l++)if(n=i[l],(n.selected||l===r)&&(Z.optDisabled?!n.disabled:null===n.getAttribute("disabled"))&&(!n.parentNode.disabled||!J.nodeName(n.parentNode,"optgroup"))){if(t=J(n).val(),o)return t;s.push(t)}return s},set:function(e,t){for(var n,i,r=e.options,o=J.makeArray(t),s=r.length;s--;)i=r[s],(i.selected=J.inArray(i.value,o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),J.each(["radio","checkbox"],function(){J.valHooks[this]={set:function(e,t){return J.isArray(t)?e.checked=J.inArray(J(e).val(),t)>=0:void 0}},Z.checkOn||(J.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){J.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),J.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,i){return this.on(t,e,n,i)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var ut=J.now(),ct=/\?/;J.parseJSON=function(e){return JSON.parse(e+"")},J.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(i){t=void 0}return(!t||t.getElementsByTagName("parsererror").length)&&J.error("Invalid XML: "+e),t};var dt=/#.*$/,pt=/([?&])_=[^&]*/,ft=/^(.*?):[ \t]*([^\r\n]*)$/gm,ht=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,gt=/^(?:GET|HEAD)$/,mt=/^\/\//,vt=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,yt={},wt={},bt="*/".concat("*"),xt=e.location.href,St=vt.exec(xt.toLowerCase())||[];J.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:xt,type:"GET",isLocal:ht.test(St[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":bt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":J.parseJSON,"text xml":J.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?j(j(e,J.ajaxSettings),t):j(J.ajaxSettings,e)},ajaxPrefilter:I(yt),ajaxTransport:I(wt),ajax:function(e,t){function n(e,t,n,s){var l,c,v,y,b,S=t;2!==w&&(w=2,a&&clearTimeout(a),i=void 0,o=s||"",x.readyState=e>0?4:0,l=e>=200&&300>e||304===e,n&&(y=Y(d,x,n)),y=$(d,y,x,l),l?(d.ifModified&&(b=x.getResponseHeader("Last-Modified"),b&&(J.lastModified[r]=b),b=x.getResponseHeader("etag"),b&&(J.etag[r]=b)),204===e||"HEAD"===d.type?S="nocontent":304===e?S="notmodified":(S=y.state,c=y.data,v=y.error,l=!v)):(v=S,(e||!S)&&(S="error",0>e&&(e=0))),x.status=e,x.statusText=(t||S)+"",l?h.resolveWith(p,[c,S,x]):h.rejectWith(p,[x,S,v]),x.statusCode(m),m=void 0,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[x,d,l?c:v]),g.fireWith(p,[x,S]),u&&(f.trigger("ajaxComplete",[x,d]),--J.active||J.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var i,r,o,s,a,l,u,c,d=J.ajaxSetup({},t),p=d.context||d,f=d.context&&(p.nodeType||p.jquery)?J(p):J.event,h=J.Deferred(),g=J.Callbacks("once memory"),m=d.statusCode||{},v={},y={},w=0,b="canceled",x={readyState:0,getResponseHeader:function(e){var t;if(2===w){if(!s)for(s={};t=ft.exec(o);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===w?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return w||(e=y[n]=y[n]||e,v[e]=t),this},overrideMimeType:function(e){return w||(d.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>w)for(t in e)m[t]=[m[t],e[t]];else x.always(e[x.status]);return this},abort:function(e){var t=e||b;return i&&i.abort(t),n(0,t),this}};if(h.promise(x).complete=g.add,x.success=x.done,x.error=x.fail,d.url=((e||d.url||xt)+"").replace(dt,"").replace(mt,St[1]+"//"),d.type=t.method||t.type||d.method||d.type,d.dataTypes=J.trim(d.dataType||"*").toLowerCase().match(fe)||[""],null==d.crossDomain&&(l=vt.exec(d.url.toLowerCase()),d.crossDomain=!(!l||l[1]===St[1]&&l[2]===St[2]&&(l[3]||("http:"===l[1]?"80":"443"))===(St[3]||("http:"===St[1]?"80":"443")))),d.data&&d.processData&&"string"!=typeof d.data&&(d.data=J.param(d.data,d.traditional)),L(yt,d,t,x),2===w)return x;u=J.event&&d.global,u&&0===J.active++&&J.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!gt.test(d.type),r=d.url,d.hasContent||(d.data&&(r=d.url+=(ct.test(r)?"&":"?")+d.data,delete d.data),d.cache===!1&&(d.url=pt.test(r)?r.replace(pt,"$1_="+ut++):r+(ct.test(r)?"&":"?")+"_="+ut++)),d.ifModified&&(J.lastModified[r]&&x.setRequestHeader("If-Modified-Since",J.lastModified[r]),J.etag[r]&&x.setRequestHeader("If-None-Match",J.etag[r])),(d.data&&d.hasContent&&d.contentType!==!1||t.contentType)&&x.setRequestHeader("Content-Type",d.contentType),x.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+bt+"; q=0.01":""):d.accepts["*"]);for(c in d.headers)x.setRequestHeader(c,d.headers[c]);if(d.beforeSend&&(d.beforeSend.call(p,x,d)===!1||2===w))return x.abort();b="abort";for(c in{success:1,error:1,complete:1})x[c](d[c]);if(i=L(wt,d,t,x)){x.readyState=1,u&&f.trigger("ajaxSend",[x,d]),d.async&&d.timeout>0&&(a=setTimeout(function(){x.abort("timeout")},d.timeout));try{w=1,i.send(v,n)}catch(S){if(!(2>w))throw S;n(-1,S)}}else n(-1,"No Transport");return x},getJSON:function(e,t,n){return J.get(e,t,n,"json")},getScript:function(e,t){return J.get(e,void 0,t,"script")}}),J.each(["get","post"],function(e,t){J[t]=function(e,n,i,r){return J.isFunction(n)&&(r=r||i,i=n,n=void 0),J.ajax({url:e,type:t,dataType:r,data:n,success:i})}}),J._evalUrl=function(e){return J.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},J.fn.extend({wrapAll:function(e){var t;return J.isFunction(e)?this.each(function(t){J(this).wrapAll(e.call(this,t))}):(this[0]&&(t=J(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return J.isFunction(e)?this.each(function(t){J(this).wrapInner(e.call(this,t))}):this.each(function(){var t=J(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=J.isFunction(e);return this.each(function(n){J(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){J.nodeName(this,"body")||J(this).replaceWith(this.childNodes)}).end()}}),J.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0},J.expr.filters.visible=function(e){return!J.expr.filters.hidden(e)};var kt=/%20/g,Ct=/\[\]$/,Tt=/\r?\n/g,_t=/^(?:submit|button|image|reset|file)$/i,Et=/^(?:input|select|textarea|keygen)/i;J.param=function(e,t){var n,i=[],r=function(e,t){t=J.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=J.ajaxSettings&&J.ajaxSettings.traditional),J.isArray(e)||e.jquery&&!J.isPlainObject(e))J.each(e,function(){r(this.name,this.value)});else for(n in e)z(n,e[n],t,r);return i.join("&").replace(kt,"+")},J.fn.extend({serialize:function(){return J.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=J.prop(this,"elements");return e?J.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!J(this).is(":disabled")&&Et.test(this.nodeName)&&!_t.test(e)&&(this.checked||!Ce.test(e))}).map(function(e,t){var n=J(this).val();return null==n?null:J.isArray(n)?J.map(n,function(e){return{name:t.name,value:e.replace(Tt,"\r\n")}}):{name:t.name,value:n.replace(Tt,"\r\n")}}).get()}}),J.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var Ot=0,Dt={},Pt={0:200,1223:204},At=J.ajaxSettings.xhr();e.attachEvent&&e.attachEvent("onunload",function(){for(var e in Dt)Dt[e]()}),Z.cors=!!At&&"withCredentials"in At,Z.ajax=At=!!At,J.ajaxTransport(function(e){var t;return Z.cors||At&&!e.crossDomain?{send:function(n,i){var r,o=e.xhr(),s=++Ot;if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(r in e.xhrFields)o[r]=e.xhrFields[r];e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(r in n)o.setRequestHeader(r,n[r]);t=function(e){return function(){t&&(delete Dt[s],t=o.onload=o.onerror=null,"abort"===e?o.abort():"error"===e?i(o.status,o.statusText):i(Pt[o.status]||o.status,o.statusText,"string"==typeof o.responseText?{text:o.responseText}:void 0,o.getAllResponseHeaders()))}},o.onload=t(),o.onerror=t("error"),t=Dt[s]=t("abort");try{o.send(e.hasContent&&e.data||null)}catch(a){if(t)throw a}},abort:function(){t&&t()}}:void 0}),J.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return J.globalEval(e),e}}}),J.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),J.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(i,r){t=J("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&r("error"===e.type?404:200,e.type)}),Q.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Mt=[],Nt=/(=)\?(?=&|$)|\?\?/;J.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mt.pop()||J.expando+"_"+ut++;return this[e]=!0,e}}),J.ajaxPrefilter("json jsonp",function(t,n,i){var r,o,s,a=t.jsonp!==!1&&(Nt.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Nt.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(r=t.jsonpCallback=J.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(Nt,"$1"+r):t.jsonp!==!1&&(t.url+=(ct.test(t.url)?"&":"?")+t.jsonp+"="+r),t.converters["script json"]=function(){return s||J.error(r+" was not called"),s[0]},t.dataTypes[0]="json",o=e[r],e[r]=function(){s=arguments},i.always(function(){e[r]=o,t[r]&&(t.jsonpCallback=n.jsonpCallback,Mt.push(r)),s&&J.isFunction(o)&&o(s[0]),s=o=void 0}),"script"):void 0}),J.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||Q;var i=se.exec(e),r=!n&&[];return i?[t.createElement(i[1])]:(i=J.buildFragment([e],t,r),r&&r.length&&J(r).remove(),J.merge([],i.childNodes))};var Ft=J.fn.load;J.fn.load=function(e,t,n){if("string"!=typeof e&&Ft)return Ft.apply(this,arguments);var i,r,o,s=this,a=e.indexOf(" ");return a>=0&&(i=J.trim(e.slice(a)),e=e.slice(0,a)),J.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(r="POST"),s.length>0&&J.ajax({url:e,type:r,dataType:"html",data:t}).done(function(e){o=arguments,s.html(i?J("<div>").append(J.parseHTML(e)).find(i):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},J.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){J.fn[t]=function(e){return this.on(t,e)}}),J.expr.filters.animated=function(e){return J.grep(J.timers,function(t){return e===t.elem}).length};var It=e.document.documentElement;J.offset={setOffset:function(e,t,n){var i,r,o,s,a,l,u,c=J.css(e,"position"),d=J(e),p={};"static"===c&&(e.style.position="relative"),a=d.offset(),o=J.css(e,"top"),l=J.css(e,"left"),u=("absolute"===c||"fixed"===c)&&(o+l).indexOf("auto")>-1,u?(i=d.position(),s=i.top,r=i.left):(s=parseFloat(o)||0,r=parseFloat(l)||0),J.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(p.top=t.top-a.top+s),null!=t.left&&(p.left=t.left-a.left+r),"using"in t?t.using.call(e,p):d.css(p)}},J.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){J.offset.setOffset(this,e,t)});var t,n,i=this[0],r={top:0,left:0},o=i&&i.ownerDocument;if(o)return t=o.documentElement,J.contains(t,i)?(typeof i.getBoundingClientRect!==Te&&(r=i.getBoundingClientRect()),n=H(o),{top:r.top+n.pageYOffset-t.clientTop,left:r.left+n.pageXOffset-t.clientLeft}):r},position:function(){if(this[0]){var e,t,n=this[0],i={top:0,left:0};return"fixed"===J.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),J.nodeName(e[0],"html")||(i=e.offset()),i.top+=J.css(e[0],"borderTopWidth",!0),i.left+=J.css(e[0],"borderLeftWidth",!0)),{top:t.top-i.top-J.css(n,"marginTop",!0),left:t.left-i.left-J.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||It;e&&!J.nodeName(e,"html")&&"static"===J.css(e,"position");)e=e.offsetParent;return e||It})}}),J.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var i="pageYOffset"===n;J.fn[t]=function(r){return me(this,function(t,r,o){var s=H(t);return void 0===o?s?s[n]:t[r]:void(s?s.scrollTo(i?e.pageXOffset:o,i?o:e.pageYOffset):t[r]=o)},t,r,arguments.length,null)}}),J.each(["top","left"],function(e,t){J.cssHooks[t]=S(Z.pixelPosition,function(e,n){return n?(n=x(e,t),qe.test(n)?J(e).position()[t]+"px":n):void 0})}),J.each({Height:"height",Width:"width"},function(e,t){J.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,i){J.fn[i]=function(i,r){var o=arguments.length&&(n||"boolean"!=typeof i),s=n||(i===!0||r===!0?"margin":"border");return me(this,function(t,n,i){var r;return J.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(r=t.documentElement,Math.max(t.body["scroll"+e],r["scroll"+e],t.body["offset"+e],r["offset"+e],r["client"+e])):void 0===i?J.css(t,n,s):J.style(t,n,i,s)},t,o?i:void 0,o,null)}})}),J.fn.size=function(){return this.length},J.fn.andSelf=J.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return J});var Lt=e.jQuery,jt=e.$;return J.noConflict=function(t){return e.$===J&&(e.$=jt),t&&e.jQuery===J&&(e.jQuery=Lt),J},typeof t===Te&&(e.jQuery=e.$=J),J}),window.Modernizr=function(e,t,n){function i(e){w.cssText=e}function r(e,t){return i(k.join(e+";")+(t||""))}function o(e,t){return typeof e===t}function s(e,t){return!!~(""+e).indexOf(t)}function a(e,t){for(var i in e){var r=e[i];if(!s(r,"-")&&w[r]!==n)return"pfx"==t?r:!0}return!1}function l(e,t,i){for(var r in e){var s=t[e[r]];if(s!==n)return i===!1?e[r]:o(s,"function")?s.bind(i||t):s}return!1}function u(e,t,n){var i=e.charAt(0).toUpperCase()+e.slice(1),r=(e+" "+T.join(i+" ")+i).split(" ");return o(t,"string")||o(t,"undefined")?a(r,t):(r=(e+" "+_.join(i+" ")+i).split(" "),l(r,t,n))}function c(){h.input=function(n){for(var i=0,r=n.length;r>i;i++)P[n[i]]=!!(n[i]in b);return P.list&&(P.list=!(!t.createElement("datalist")||!e.HTMLDataListElement)),P}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),h.inputtypes=function(e){for(var i,r,o,s=0,a=e.length;a>s;s++)b.setAttribute("type",r=e[s]),i="text"!==b.type,i&&(b.value=x,b.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(r)&&b.style.WebkitAppearance!==n?(m.appendChild(b),o=t.defaultView,i=o.getComputedStyle&&"textfield"!==o.getComputedStyle(b,null).WebkitAppearance&&0!==b.offsetHeight,m.removeChild(b)):/^(search|tel)$/.test(r)||(i=/^(url|email)$/.test(r)?b.checkValidity&&b.checkValidity()===!1:b.value!=x)),D[e[s]]=!!i;return D}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d,p,f="2.8.3",h={},g=!0,m=t.documentElement,v="modernizr",y=t.createElement(v),w=y.style,b=t.createElement("input"),x=":)",S={}.toString,k=" -webkit- -moz- -o- -ms- ".split(" "),C="Webkit Moz O ms",T=C.split(" "),_=C.toLowerCase().split(" "),E={svg:"http://www.w3.org/2000/svg"},O={},D={},P={},A=[],M=A.slice,N=function(e,n,i,r){var o,s,a,l,u=t.createElement("div"),c=t.body,d=c||t.createElement("body");if(parseInt(i,10))for(;i--;)a=t.createElement("div"),a.id=r?r[i]:v+(i+1),u.appendChild(a);return o=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),u.id=v,(c?u:d).innerHTML+=o,d.appendChild(u),c||(d.style.background="",d.style.overflow="hidden",l=m.style.overflow,m.style.overflow="hidden",m.appendChild(d)),s=n(u,e),c?u.parentNode.removeChild(u):(d.parentNode.removeChild(d),m.style.overflow=l),!!s},F=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var i;return N("@media "+t+" { #"+v+" { position: absolute; } }",function(t){i="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),i},I=function(){function e(e,r){r=r||t.createElement(i[e]||"div"),e="on"+e;var s=e in r;return s||(r.setAttribute||(r=t.createElement("div")),r.setAttribute&&r.removeAttribute&&(r.setAttribute(e,""),s=o(r[e],"function"),o(r[e],"undefined")||(r[e]=n),r.removeAttribute(e))),r=null,s}var i={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return e}(),L={}.hasOwnProperty;p=o(L,"undefined")||o(L.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return L.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=M.call(arguments,1),i=function(){if(this instanceof i){var r=function(){};r.prototype=t.prototype;var o=new r,s=t.apply(o,n.concat(M.call(arguments)));return Object(s)===s?s:o}return t.apply(e,n.concat(M.call(arguments)))};return i}),O.flexbox=function(){return u("flexWrap")},O.flexboxlegacy=function(){return u("boxDirection")},O.canvas=function(){var e=t.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},O.canvastext=function(){return!(!h.canvas||!o(t.createElement("canvas").getContext("2d").fillText,"function"))},O.webgl=function(){return!!e.WebGLRenderingContext},O.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:N(["@media (",k.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},O.geolocation=function(){return"geolocation"in navigator},O.postmessage=function(){return!!e.postMessage},O.websqldatabase=function(){return!!e.openDatabase},O.indexedDB=function(){return!!u("indexedDB",e)},O.hashchange=function(){return I("hashchange",e)&&(t.documentMode===n||t.documentMode>7)},O.history=function(){return!(!e.history||!history.pushState)},O.draganddrop=function(){var e=t.createElement("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e},O.websockets=function(){return"WebSocket"in e||"MozWebSocket"in e},O.rgba=function(){return i("background-color:rgba(150,255,150,.5)"),s(w.backgroundColor,"rgba")},O.hsla=function(){return i("background-color:hsla(120,40%,100%,.5)"),s(w.backgroundColor,"rgba")||s(w.backgroundColor,"hsla")},O.multiplebgs=function(){return i("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(w.background)},O.backgroundsize=function(){return u("backgroundSize")},O.borderimage=function(){return u("borderImage")},O.borderradius=function(){return u("borderRadius")},O.boxshadow=function(){return u("boxShadow")},O.textshadow=function(){return""===t.createElement("div").style.textShadow},O.opacity=function(){return r("opacity:.55"),/^0.55$/.test(w.opacity)},O.cssanimations=function(){return u("animationName")},O.csscolumns=function(){return u("columnCount")},O.cssgradients=function(){var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";return i((e+"-webkit- ".split(" ").join(t+e)+k.join(n+e)).slice(0,-e.length)),s(w.backgroundImage,"gradient")},O.cssreflections=function(){return u("boxReflect")},O.csstransforms=function(){return!!u("transform")},O.csstransforms3d=function(){var e=!!u("perspective");return e&&"webkitPerspective"in m.style&&N("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},O.csstransitions=function(){return u("transition")},O.fontface=function(){var e;return N('@font-face {font-family:"font";src:url("https://")}',function(n,i){var r=t.getElementById("smodernizr"),o=r.sheet||r.styleSheet,s=o?o.cssRules&&o.cssRules[0]?o.cssRules[0].cssText:o.cssText||"":"";e=/src/i.test(s)&&0===s.indexOf(i.split(" ")[0])}),e},O.generatedcontent=function(){var e;return N(["#",v,"{font:0/0 a}#",v,':after{content:"',x,'";visibility:hidden;font:3px/1 a}'].join(""),function(t){e=t.offsetHeight>=3}),e},O.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(i){}return n},O.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(i){}return n},O.localstorage=function(){try{return localStorage.setItem(v,v),localStorage.removeItem(v),!0}catch(e){return!1}},O.sessionstorage=function(){try{return sessionStorage.setItem(v,v),sessionStorage.removeItem(v),!0}catch(e){return!1}},O.webworkers=function(){return!!e.Worker},O.applicationcache=function(){return!!e.applicationCache},O.svg=function(){return!!t.createElementNS&&!!t.createElementNS(E.svg,"svg").createSVGRect},O.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==E.svg},O.smil=function(){return!!t.createElementNS&&/SVGAnimate/.test(S.call(t.createElementNS(E.svg,"animate")))},O.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(S.call(t.createElementNS(E.svg,"clipPath")))};for(var j in O)p(O,j)&&(d=j.toLowerCase(),h[d]=O[j](),A.push((h[d]?"":"no-")+d));return h.input||c(),h.addTest=function(e,t){if("object"==typeof e)for(var i in e)p(e,i)&&h.addTest(i,e[i]);else{if(e=e.toLowerCase(),h[e]!==n)return h;t="function"==typeof t?t():t,"undefined"!=typeof g&&g&&(m.className+=" "+(t?"":"no-")+e),h[e]=t}return h},i(""),y=b=null,function(e,t){function n(e,t){var n=e.createElement("p"),i=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",i.insertBefore(n.lastChild,i.firstChild)}function i(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function r(e){var t=v[e[g]];return t||(t={},m++,e[g]=m,v[m]=t),t}function o(e,n,i){if(n||(n=t),c)return n.createElement(e);i||(i=r(n));var o;return o=i.cache[e]?i.cache[e].cloneNode():h.test(e)?(i.cache[e]=i.createElem(e)).cloneNode():i.createElem(e),!o.canHaveChildren||f.test(e)||o.tagUrn?o:i.frag.appendChild(o)}function s(e,n){if(e||(e=t),c)return e.createDocumentFragment();n=n||r(e);for(var o=n.frag.cloneNode(),s=0,a=i(),l=a.length;l>s;s++)o.createElement(a[s]);return o}function a(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?o(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function l(e){e||(e=t);var i=r(e);return!y.shivCSS||u||i.hasCSS||(i.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),c||a(e,i),e}var u,c,d="3.7.0",p=e.html5||{},f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",m=0,v={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,c=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){u=!0,c=!0}}();var y={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:d,shivCSS:p.shivCSS!==!1,supportsUnknownElements:c,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:l,createElement:o,createDocumentFragment:s};e.html5=y,l(t)}(this,t),h._version=f,h._prefixes=k,h._domPrefixes=_,h._cssomPrefixes=T,h.mq=F,h.hasEvent=I,h.testProp=function(e){return a([e])},h.testAllProps=u,h.testStyles=N,h.prefixed=function(e,t,n){return t?u(e,t,n):u(e,"pfx")},m.className=m.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(g?" js "+A.join(" "):""),h}(this,this.document),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";function e(){return Fn.apply(null,arguments)}function t(e){Fn=e}function n(e){return"[object Array]"===Object.prototype.toString.call(e)}function i(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function r(e,t){var n,i=[];for(n=0;n<e.length;++n)i.push(t(e[n],n));return i}function o(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function s(e,t){for(var n in t)o(t,n)&&(e[n]=t[n]);return o(t,"toString")&&(e.toString=t.toString),o(t,"valueOf")&&(e.valueOf=t.valueOf),
e}function a(e,t,n,i){return Oe(e,t,n,i,!0).utc()}function l(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function u(e){return null==e._pf&&(e._pf=l()),e._pf}function c(e){if(null==e._isValid){var t=u(e);e._isValid=!(isNaN(e._d.getTime())||!(t.overflow<0)||t.empty||t.invalidMonth||t.invalidWeekday||t.nullInput||t.invalidFormat||t.userInvalidated),e._strict&&(e._isValid=e._isValid&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour)}return e._isValid}function d(e){var t=a(NaN);return null!=e?s(u(t),e):u(t).userInvalidated=!0,t}function p(e,t){var n,i,r;if("undefined"!=typeof t._isAMomentObject&&(e._isAMomentObject=t._isAMomentObject),"undefined"!=typeof t._i&&(e._i=t._i),"undefined"!=typeof t._f&&(e._f=t._f),"undefined"!=typeof t._l&&(e._l=t._l),"undefined"!=typeof t._strict&&(e._strict=t._strict),"undefined"!=typeof t._tzm&&(e._tzm=t._tzm),"undefined"!=typeof t._isUTC&&(e._isUTC=t._isUTC),"undefined"!=typeof t._offset&&(e._offset=t._offset),"undefined"!=typeof t._pf&&(e._pf=u(t)),"undefined"!=typeof t._locale&&(e._locale=t._locale),Ln.length>0)for(n in Ln)i=Ln[n],r=t[i],"undefined"!=typeof r&&(e[i]=r);return e}function f(t){p(this,t),this._d=new Date(null!=t._d?t._d.getTime():NaN),jn===!1&&(jn=!0,e.updateOffset(this),jn=!1)}function h(e){return e instanceof f||null!=e&&null!=e._isAMomentObject}function g(e){return 0>e?Math.ceil(e):Math.floor(e)}function m(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=g(t)),n}function v(e,t,n){var i,r=Math.min(e.length,t.length),o=Math.abs(e.length-t.length),s=0;for(i=0;r>i;i++)(n&&e[i]!==t[i]||!n&&m(e[i])!==m(t[i]))&&s++;return s+o}function y(){}function w(e){return e?e.toLowerCase().replace("_","-"):e}function b(e){for(var t,n,i,r,o=0;o<e.length;){for(r=w(e[o]).split("-"),t=r.length,n=w(e[o+1]),n=n?n.split("-"):null;t>0;){if(i=x(r.slice(0,t).join("-")))return i;if(n&&n.length>=t&&v(r,n,!0)>=t-1)break;t--}o++}return null}function x(e){var t=null;if(!Yn[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=In._abbr,require("./locale/"+e),S(t)}catch(n){}return Yn[e]}function S(e,t){var n;return e&&(n="undefined"==typeof t?C(e):k(e,t),n&&(In=n)),In._abbr}function k(e,t){return null!==t?(t.abbr=e,Yn[e]=Yn[e]||new y,Yn[e].set(t),S(e),Yn[e]):(delete Yn[e],null)}function C(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return In;if(!n(e)){if(t=x(e))return t;e=[e]}return b(e)}function T(e,t){var n=e.toLowerCase();$n[n]=$n[n+"s"]=$n[t]=e}function _(e){return"string"==typeof e?$n[e]||$n[e.toLowerCase()]:void 0}function E(e){var t,n,i={};for(n in e)o(e,n)&&(t=_(n),t&&(i[t]=e[n]));return i}function O(t,n){return function(i){return null!=i?(P(this,t,i),e.updateOffset(this,n),this):D(this,t)}}function D(e,t){return e._d["get"+(e._isUTC?"UTC":"")+t]()}function P(e,t,n){return e._d["set"+(e._isUTC?"UTC":"")+t](n)}function A(e,t){var n;if("object"==typeof e)for(n in e)this.set(n,e[n]);else if(e=_(e),"function"==typeof this[e])return this[e](t);return this}function M(e,t,n){var i=""+Math.abs(e),r=t-i.length,o=e>=0;return(o?n?"+":"":"-")+Math.pow(10,Math.max(0,r)).toString().substr(1)+i}function N(e,t,n,i){var r=i;"string"==typeof i&&(r=function(){return this[i]()}),e&&(Wn[e]=r),t&&(Wn[t[0]]=function(){return M(r.apply(this,arguments),t[1],t[2])}),n&&(Wn[n]=function(){return this.localeData().ordinal(r.apply(this,arguments),e)})}function F(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function I(e){var t,n,i=e.match(zn);for(t=0,n=i.length;n>t;t++)Wn[i[t]]?i[t]=Wn[i[t]]:i[t]=F(i[t]);return function(r){var o="";for(t=0;n>t;t++)o+=i[t]instanceof Function?i[t].call(r,e):i[t];return o}}function L(e,t){return e.isValid()?(t=j(t,e.localeData()),qn[t]=qn[t]||I(t),qn[t](e)):e.localeData().invalidDate()}function j(e,t){function n(e){return t.longDateFormat(e)||e}var i=5;for(Hn.lastIndex=0;i>=0&&Hn.test(e);)e=e.replace(Hn,n),Hn.lastIndex=0,i-=1;return e}function Y(e){return"function"==typeof e&&"[object Function]"===Object.prototype.toString.call(e)}function $(e,t,n){ri[e]=Y(t)?t:function(e){return e&&n?n:t}}function z(e,t){return o(ri,e)?ri[e](t._strict,t._locale):new RegExp(H(e))}function H(e){return e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,i,r){return t||n||i||r}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function q(e,t){var n,i=t;for("string"==typeof e&&(e=[e]),"number"==typeof t&&(i=function(e,n){n[t]=m(e)}),n=0;n<e.length;n++)oi[e[n]]=i}function W(e,t){q(e,function(e,n,i,r){i._w=i._w||{},t(e,i._w,i,r)})}function R(e,t,n){null!=t&&o(oi,e)&&oi[e](t,n._a,n,e)}function V(e,t){return new Date(Date.UTC(e,t+1,0)).getUTCDate()}function X(e){return this._months[e.month()]}function B(e){return this._monthsShort[e.month()]}function U(e,t,n){var i,r,o;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),i=0;12>i;i++){if(r=a([2e3,i]),n&&!this._longMonthsParse[i]&&(this._longMonthsParse[i]=new RegExp("^"+this.months(r,"").replace(".","")+"$","i"),this._shortMonthsParse[i]=new RegExp("^"+this.monthsShort(r,"").replace(".","")+"$","i")),n||this._monthsParse[i]||(o="^"+this.months(r,"")+"|^"+this.monthsShort(r,""),this._monthsParse[i]=new RegExp(o.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[i].test(e))return i;if(n&&"MMM"===t&&this._shortMonthsParse[i].test(e))return i;if(!n&&this._monthsParse[i].test(e))return i}}function G(e,t){var n;return"string"==typeof t&&(t=e.localeData().monthsParse(t),"number"!=typeof t)?e:(n=Math.min(e.date(),V(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e)}function Z(t){return null!=t?(G(this,t),e.updateOffset(this,!0),this):D(this,"Month")}function Q(){return V(this.year(),this.month())}function K(e){var t,n=e._a;return n&&-2===u(e).overflow&&(t=n[ai]<0||n[ai]>11?ai:n[li]<1||n[li]>V(n[si],n[ai])?li:n[ui]<0||n[ui]>24||24===n[ui]&&(0!==n[ci]||0!==n[di]||0!==n[pi])?ui:n[ci]<0||n[ci]>59?ci:n[di]<0||n[di]>59?di:n[pi]<0||n[pi]>999?pi:-1,u(e)._overflowDayOfYear&&(si>t||t>li)&&(t=li),u(e).overflow=t),e}function J(t){e.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+t)}function ee(e,t){var n=!0;return s(function(){return n&&(J(e+"\n"+(new Error).stack),n=!1),t.apply(this,arguments)},t)}function te(e,t){gi[e]||(J(t),gi[e]=!0)}function ne(e){var t,n,i=e._i,r=mi.exec(i);if(r){for(u(e).iso=!0,t=0,n=vi.length;n>t;t++)if(vi[t][1].exec(i)){e._f=vi[t][0];break}for(t=0,n=yi.length;n>t;t++)if(yi[t][1].exec(i)){e._f+=(r[6]||" ")+yi[t][0];break}i.match(ti)&&(e._f+="Z"),xe(e)}else e._isValid=!1}function ie(t){var n=wi.exec(t._i);return null!==n?void(t._d=new Date(+n[1])):(ne(t),void(t._isValid===!1&&(delete t._isValid,e.createFromInputFallback(t))))}function re(e,t,n,i,r,o,s){var a=new Date(e,t,n,i,r,o,s);return 1970>e&&a.setFullYear(e),a}function oe(e){var t=new Date(Date.UTC.apply(null,arguments));return 1970>e&&t.setUTCFullYear(e),t}function se(e){return ae(e)?366:365}function ae(e){return e%4===0&&e%100!==0||e%400===0}function le(){return ae(this.year())}function ue(e,t,n){var i,r=n-t,o=n-e.day();return o>r&&(o-=7),r-7>o&&(o+=7),i=De(e).add(o,"d"),{week:Math.ceil(i.dayOfYear()/7),year:i.year()}}function ce(e){return ue(e,this._week.dow,this._week.doy).week}function de(){return this._week.dow}function pe(){return this._week.doy}function fe(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")}function he(e){var t=ue(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")}function ge(e,t,n,i,r){var o,s=6+r-i,a=oe(e,0,1+s),l=a.getUTCDay();return r>l&&(l+=7),n=null!=n?1*n:r,o=1+s+7*(t-1)-l+n,{year:o>0?e:e-1,dayOfYear:o>0?o:se(e-1)+o}}function me(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")}function ve(e,t,n){return null!=e?e:null!=t?t:n}function ye(e){var t=new Date;return e._useUTC?[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}function we(e){var t,n,i,r,o=[];if(!e._d){for(i=ye(e),e._w&&null==e._a[li]&&null==e._a[ai]&&be(e),e._dayOfYear&&(r=ve(e._a[si],i[si]),e._dayOfYear>se(r)&&(u(e)._overflowDayOfYear=!0),n=oe(r,0,e._dayOfYear),e._a[ai]=n.getUTCMonth(),e._a[li]=n.getUTCDate()),t=0;3>t&&null==e._a[t];++t)e._a[t]=o[t]=i[t];for(;7>t;t++)e._a[t]=o[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[ui]&&0===e._a[ci]&&0===e._a[di]&&0===e._a[pi]&&(e._nextDay=!0,e._a[ui]=0),e._d=(e._useUTC?oe:re).apply(null,o),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[ui]=24)}}function be(e){var t,n,i,r,o,s,a;t=e._w,null!=t.GG||null!=t.W||null!=t.E?(o=1,s=4,n=ve(t.GG,e._a[si],ue(De(),1,4).year),i=ve(t.W,1),r=ve(t.E,1)):(o=e._locale._week.dow,s=e._locale._week.doy,n=ve(t.gg,e._a[si],ue(De(),o,s).year),i=ve(t.w,1),null!=t.d?(r=t.d,o>r&&++i):r=null!=t.e?t.e+o:o),a=ge(n,i,r,s,o),e._a[si]=a.year,e._dayOfYear=a.dayOfYear}function xe(t){if(t._f===e.ISO_8601)return void ne(t);t._a=[],u(t).empty=!0;var n,i,r,o,s,a=""+t._i,l=a.length,c=0;for(r=j(t._f,t._locale).match(zn)||[],n=0;n<r.length;n++)o=r[n],i=(a.match(z(o,t))||[])[0],i&&(s=a.substr(0,a.indexOf(i)),s.length>0&&u(t).unusedInput.push(s),a=a.slice(a.indexOf(i)+i.length),c+=i.length),Wn[o]?(i?u(t).empty=!1:u(t).unusedTokens.push(o),R(o,i,t)):t._strict&&!i&&u(t).unusedTokens.push(o);u(t).charsLeftOver=l-c,a.length>0&&u(t).unusedInput.push(a),u(t).bigHour===!0&&t._a[ui]<=12&&t._a[ui]>0&&(u(t).bigHour=void 0),t._a[ui]=Se(t._locale,t._a[ui],t._meridiem),we(t),K(t)}function Se(e,t,n){var i;return null==n?t:null!=e.meridiemHour?e.meridiemHour(t,n):null!=e.isPM?(i=e.isPM(n),i&&12>t&&(t+=12),i||12!==t||(t=0),t):t}function ke(e){var t,n,i,r,o;if(0===e._f.length)return u(e).invalidFormat=!0,void(e._d=new Date(NaN));for(r=0;r<e._f.length;r++)o=0,t=p({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[r],xe(t),c(t)&&(o+=u(t).charsLeftOver,o+=10*u(t).unusedTokens.length,u(t).score=o,(null==i||i>o)&&(i=o,n=t));s(e,n||t)}function Ce(e){if(!e._d){var t=E(e._i);e._a=[t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],we(e)}}function Te(e){var t=new f(K(_e(e)));return t._nextDay&&(t.add(1,"d"),t._nextDay=void 0),t}function _e(e){var t=e._i,r=e._f;return e._locale=e._locale||C(e._l),null===t||void 0===r&&""===t?d({nullInput:!0}):("string"==typeof t&&(e._i=t=e._locale.preparse(t)),h(t)?new f(K(t)):(n(r)?ke(e):r?xe(e):i(t)?e._d=t:Ee(e),e))}function Ee(t){var o=t._i;void 0===o?t._d=new Date:i(o)?t._d=new Date(+o):"string"==typeof o?ie(t):n(o)?(t._a=r(o.slice(0),function(e){return parseInt(e,10)}),we(t)):"object"==typeof o?Ce(t):"number"==typeof o?t._d=new Date(o):e.createFromInputFallback(t)}function Oe(e,t,n,i,r){var o={};return"boolean"==typeof n&&(i=n,n=void 0),o._isAMomentObject=!0,o._useUTC=o._isUTC=r,o._l=n,o._i=e,o._f=t,o._strict=i,Te(o)}function De(e,t,n,i){return Oe(e,t,n,i,!1)}function Pe(e,t){var i,r;if(1===t.length&&n(t[0])&&(t=t[0]),!t.length)return De();for(i=t[0],r=1;r<t.length;++r)(!t[r].isValid()||t[r][e](i))&&(i=t[r]);return i}function Ae(){var e=[].slice.call(arguments,0);return Pe("isBefore",e)}function Me(){var e=[].slice.call(arguments,0);return Pe("isAfter",e)}function Ne(e){var t=E(e),n=t.year||0,i=t.quarter||0,r=t.month||0,o=t.week||0,s=t.day||0,a=t.hour||0,l=t.minute||0,u=t.second||0,c=t.millisecond||0;this._milliseconds=+c+1e3*u+6e4*l+36e5*a,this._days=+s+7*o,this._months=+r+3*i+12*n,this._data={},this._locale=C(),this._bubble()}function Fe(e){return e instanceof Ne}function Ie(e,t){N(e,0,0,function(){var e=this.utcOffset(),n="+";return 0>e&&(e=-e,n="-"),n+M(~~(e/60),2)+t+M(~~e%60,2)})}function Le(e){var t=(e||"").match(ti)||[],n=t[t.length-1]||[],i=(n+"").match(Ci)||["-",0,0],r=+(60*i[1])+m(i[2]);return"+"===i[0]?r:-r}function je(t,n){var r,o;return n._isUTC?(r=n.clone(),o=(h(t)||i(t)?+t:+De(t))-+r,r._d.setTime(+r._d+o),e.updateOffset(r,!1),r):De(t).local()}function Ye(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function $e(t,n){var i,r=this._offset||0;return null!=t?("string"==typeof t&&(t=Le(t)),Math.abs(t)<16&&(t=60*t),!this._isUTC&&n&&(i=Ye(this)),this._offset=t,this._isUTC=!0,null!=i&&this.add(i,"m"),r!==t&&(!n||this._changeInProgress?tt(this,Ze(t-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,e.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?r:Ye(this)}function ze(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}function He(e){return this.utcOffset(0,e)}function qe(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Ye(this),"m")),this}function We(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Le(this._i)),this}function Re(e){return e=e?De(e).utcOffset():0,(this.utcOffset()-e)%60===0}function Ve(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Xe(){if("undefined"!=typeof this._isDSTShifted)return this._isDSTShifted;var e={};if(p(e,this),e=_e(e),e._a){var t=e._isUTC?a(e._a):De(e._a);this._isDSTShifted=this.isValid()&&v(e._a,t.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Be(){return!this._isUTC}function Ue(){return this._isUTC}function Ge(){return this._isUTC&&0===this._offset}function Ze(e,t){var n,i,r,s=e,a=null;return Fe(e)?s={ms:e._milliseconds,d:e._days,M:e._months}:"number"==typeof e?(s={},t?s[t]=e:s.milliseconds=e):(a=Ti.exec(e))?(n="-"===a[1]?-1:1,s={y:0,d:m(a[li])*n,h:m(a[ui])*n,m:m(a[ci])*n,s:m(a[di])*n,ms:m(a[pi])*n}):(a=_i.exec(e))?(n="-"===a[1]?-1:1,s={y:Qe(a[2],n),M:Qe(a[3],n),d:Qe(a[4],n),h:Qe(a[5],n),m:Qe(a[6],n),s:Qe(a[7],n),w:Qe(a[8],n)}):null==s?s={}:"object"==typeof s&&("from"in s||"to"in s)&&(r=Je(De(s.from),De(s.to)),s={},s.ms=r.milliseconds,s.M=r.months),i=new Ne(s),Fe(e)&&o(e,"_locale")&&(i._locale=e._locale),i}function Qe(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function Ke(e,t){var n={milliseconds:0,months:0};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function Je(e,t){var n;return t=je(t,e),e.isBefore(t)?n=Ke(e,t):(n=Ke(t,e),n.milliseconds=-n.milliseconds,n.months=-n.months),n}function et(e,t){return function(n,i){var r,o;return null===i||isNaN(+i)||(te(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period)."),o=n,n=i,i=o),n="string"==typeof n?+n:n,r=Ze(n,i),tt(this,r,e),this}}function tt(t,n,i,r){var o=n._milliseconds,s=n._days,a=n._months;r=null==r?!0:r,o&&t._d.setTime(+t._d+o*i),s&&P(t,"Date",D(t,"Date")+s*i),a&&G(t,D(t,"Month")+a*i),r&&e.updateOffset(t,s||a)}function nt(e,t){var n=e||De(),i=je(n,this).startOf("day"),r=this.diff(i,"days",!0),o=-6>r?"sameElse":-1>r?"lastWeek":0>r?"lastDay":1>r?"sameDay":2>r?"nextDay":7>r?"nextWeek":"sameElse";return this.format(t&&t[o]||this.localeData().calendar(o,this,De(n)))}function it(){return new f(this)}function rt(e,t){var n;return t=_("undefined"!=typeof t?t:"millisecond"),"millisecond"===t?(e=h(e)?e:De(e),+this>+e):(n=h(e)?+e:+De(e),n<+this.clone().startOf(t))}function ot(e,t){var n;return t=_("undefined"!=typeof t?t:"millisecond"),"millisecond"===t?(e=h(e)?e:De(e),+e>+this):(n=h(e)?+e:+De(e),+this.clone().endOf(t)<n)}function st(e,t,n){return this.isAfter(e,n)&&this.isBefore(t,n)}function at(e,t){var n;return t=_(t||"millisecond"),"millisecond"===t?(e=h(e)?e:De(e),+this===+e):(n=+De(e),+this.clone().startOf(t)<=n&&n<=+this.clone().endOf(t))}function lt(e,t,n){var i,r,o=je(e,this),s=6e4*(o.utcOffset()-this.utcOffset());return t=_(t),"year"===t||"month"===t||"quarter"===t?(r=ut(this,o),"quarter"===t?r/=3:"year"===t&&(r/=12)):(i=this-o,r="second"===t?i/1e3:"minute"===t?i/6e4:"hour"===t?i/36e5:"day"===t?(i-s)/864e5:"week"===t?(i-s)/6048e5:i),n?r:g(r)}function ut(e,t){var n,i,r=12*(t.year()-e.year())+(t.month()-e.month()),o=e.clone().add(r,"months");return 0>t-o?(n=e.clone().add(r-1,"months"),i=(t-o)/(o-n)):(n=e.clone().add(r+1,"months"),i=(t-o)/(n-o)),-(r+i)}function ct(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function dt(){var e=this.clone().utc();return 0<e.year()&&e.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():L(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):L(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function pt(t){var n=L(this,t||e.defaultFormat);return this.localeData().postformat(n)}function ft(e,t){return this.isValid()?Ze({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function ht(e){return this.from(De(),e)}function gt(e,t){return this.isValid()?Ze({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function mt(e){return this.to(De(),e)}function vt(e){var t;return void 0===e?this._locale._abbr:(t=C(e),null!=t&&(this._locale=t),this)}function yt(){return this._locale}function wt(e){switch(e=_(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this}function bt(e){return e=_(e),void 0===e||"millisecond"===e?this:this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms")}function xt(){return+this._d-6e4*(this._offset||0)}function St(){return Math.floor(+this/1e3)}function kt(){return this._offset?new Date(+this):this._d}function Ct(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]}function Tt(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}}function _t(){return c(this)}function Et(){return s({},u(this))}function Ot(){return u(this).overflow}function Dt(e,t){N(0,[e,e.length],0,t)}function Pt(e,t,n){return ue(De([e,11,31+t-n]),t,n).week}function At(e){var t=ue(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==e?t:this.add(e-t,"y")}function Mt(e){var t=ue(this,1,4).year;return null==e?t:this.add(e-t,"y")}function Nt(){return Pt(this.year(),1,4)}function Ft(){var e=this.localeData()._week;return Pt(this.year(),e.dow,e.doy)}function It(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)}function Lt(e,t){return"string"!=typeof e?e:isNaN(e)?(e=t.weekdaysParse(e),"number"==typeof e?e:null):parseInt(e,10)}function jt(e){return this._weekdays[e.day()]}function Yt(e){return this._weekdaysShort[e.day()]}function $t(e){return this._weekdaysMin[e.day()]}function zt(e){var t,n,i;for(this._weekdaysParse=this._weekdaysParse||[],t=0;7>t;t++)if(this._weekdaysParse[t]||(n=De([2e3,1]).day(t),i="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),this._weekdaysParse[t]=new RegExp(i.replace(".",""),"i")),this._weekdaysParse[t].test(e))return t}function Ht(e){var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=Lt(e,this.localeData()),this.add(e-t,"d")):t}function qt(e){var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")}function Wt(e){return null==e?this.day()||7:this.day(this.day()%7?e:e-7)}function Rt(e,t){N(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function Vt(e,t){return t._meridiemParse}function Xt(e){return"p"===(e+"").toLowerCase().charAt(0)}function Bt(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"}function Ut(e,t){t[pi]=m(1e3*("0."+e))}function Gt(){return this._isUTC?"UTC":""}function Zt(){return this._isUTC?"Coordinated Universal Time":""}function Qt(e){return De(1e3*e)}function Kt(){return De.apply(null,arguments).parseZone()}function Jt(e,t,n){var i=this._calendar[e];return"function"==typeof i?i.call(t,n):i}function en(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])}function tn(){return this._invalidDate}function nn(e){return this._ordinal.replace("%d",e)}function rn(e){return e}function on(e,t,n,i){var r=this._relativeTime[n];return"function"==typeof r?r(e,t,n,i):r.replace(/%d/i,e)}function sn(e,t){var n=this._relativeTime[e>0?"future":"past"];return"function"==typeof n?n(t):n.replace(/%s/i,t)}function an(e){var t,n;for(n in e)t=e[n],"function"==typeof t?this[n]=t:this["_"+n]=t;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function ln(e,t,n,i){var r=C(),o=a().set(i,t);return r[n](o,e)}function un(e,t,n,i,r){if("number"==typeof e&&(t=e,e=void 0),e=e||"",null!=t)return ln(e,t,n,r);var o,s=[];for(o=0;i>o;o++)s[o]=ln(e,o,n,r);return s}function cn(e,t){return un(e,t,"months",12,"month")}function dn(e,t){return un(e,t,"monthsShort",12,"month")}function pn(e,t){return un(e,t,"weekdays",7,"day")}function fn(e,t){return un(e,t,"weekdaysShort",7,"day")}function hn(e,t){return un(e,t,"weekdaysMin",7,"day")}function gn(){var e=this._data;return this._milliseconds=Gi(this._milliseconds),this._days=Gi(this._days),this._months=Gi(this._months),e.milliseconds=Gi(e.milliseconds),e.seconds=Gi(e.seconds),e.minutes=Gi(e.minutes),e.hours=Gi(e.hours),e.months=Gi(e.months),e.years=Gi(e.years),this}function mn(e,t,n,i){var r=Ze(t,n);return e._milliseconds+=i*r._milliseconds,e._days+=i*r._days,e._months+=i*r._months,e._bubble()}function vn(e,t){return mn(this,e,t,1)}function yn(e,t){return mn(this,e,t,-1)}function wn(e){return 0>e?Math.floor(e):Math.ceil(e)}function bn(){var e,t,n,i,r,o=this._milliseconds,s=this._days,a=this._months,l=this._data;return o>=0&&s>=0&&a>=0||0>=o&&0>=s&&0>=a||(o+=864e5*wn(Sn(a)+s),s=0,a=0),l.milliseconds=o%1e3,e=g(o/1e3),l.seconds=e%60,t=g(e/60),l.minutes=t%60,n=g(t/60),l.hours=n%24,s+=g(n/24),r=g(xn(s)),a+=r,s-=wn(Sn(r)),i=g(a/12),a%=12,l.days=s,l.months=a,l.years=i,this}function xn(e){return 4800*e/146097}function Sn(e){return 146097*e/4800}function kn(e){var t,n,i=this._milliseconds;if(e=_(e),"month"===e||"year"===e)return t=this._days+i/864e5,n=this._months+xn(t),"month"===e?n:n/12;switch(t=this._days+Math.round(Sn(this._months)),e){case"week":return t/7+i/6048e5;case"day":return t+i/864e5;case"hour":return 24*t+i/36e5;case"minute":return 1440*t+i/6e4;case"second":return 86400*t+i/1e3;case"millisecond":return Math.floor(864e5*t)+i;default:throw new Error("Unknown unit "+e)}}function Cn(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*m(this._months/12)}function Tn(e){return function(){return this.as(e)}}function _n(e){return e=_(e),this[e+"s"]()}function En(e){return function(){return this._data[e]}}function On(){return g(this.days()/7)}function Dn(e,t,n,i,r){return r.relativeTime(t||1,!!n,e,i)}function Pn(e,t,n){var i=Ze(e).abs(),r=dr(i.as("s")),o=dr(i.as("m")),s=dr(i.as("h")),a=dr(i.as("d")),l=dr(i.as("M")),u=dr(i.as("y")),c=r<pr.s&&["s",r]||1===o&&["m"]||o<pr.m&&["mm",o]||1===s&&["h"]||s<pr.h&&["hh",s]||1===a&&["d"]||a<pr.d&&["dd",a]||1===l&&["M"]||l<pr.M&&["MM",l]||1===u&&["y"]||["yy",u];return c[2]=t,c[3]=+e>0,c[4]=n,Dn.apply(null,c)}function An(e,t){return void 0===pr[e]?!1:void 0===t?pr[e]:(pr[e]=t,!0)}function Mn(e){var t=this.localeData(),n=Pn(this,!e,t);return e&&(n=t.pastFuture(+this,n)),t.postformat(n)}function Nn(){var e,t,n,i=fr(this._milliseconds)/1e3,r=fr(this._days),o=fr(this._months);e=g(i/60),t=g(e/60),i%=60,e%=60,n=g(o/12),o%=12;var s=n,a=o,l=r,u=t,c=e,d=i,p=this.asSeconds();return p?(0>p?"-":"")+"P"+(s?s+"Y":"")+(a?a+"M":"")+(l?l+"D":"")+(u||c||d?"T":"")+(u?u+"H":"")+(c?c+"M":"")+(d?d+"S":""):"P0D"}var Fn,In,Ln=e.momentProperties=[],jn=!1,Yn={},$n={},zn=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Hn=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,qn={},Wn={},Rn=/\d/,Vn=/\d\d/,Xn=/\d{3}/,Bn=/\d{4}/,Un=/[+-]?\d{6}/,Gn=/\d\d?/,Zn=/\d{1,3}/,Qn=/\d{1,4}/,Kn=/[+-]?\d{1,6}/,Jn=/\d+/,ei=/[+-]?\d+/,ti=/Z|[+-]\d\d:?\d\d/gi,ni=/[+-]?\d+(\.\d{1,3})?/,ii=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,ri={},oi={},si=0,ai=1,li=2,ui=3,ci=4,di=5,pi=6;N("M",["MM",2],"Mo",function(){return this.month()+1}),N("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),N("MMMM",0,0,function(e){return this.localeData().months(this,e)}),T("month","M"),$("M",Gn),$("MM",Gn,Vn),$("MMM",ii),$("MMMM",ii),q(["M","MM"],function(e,t){t[ai]=m(e)-1}),q(["MMM","MMMM"],function(e,t,n,i){var r=n._locale.monthsParse(e,i,n._strict);null!=r?t[ai]=r:u(n).invalidMonth=e});var fi="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),hi="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),gi={};e.suppressDeprecationWarnings=!1;var mi=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,vi=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],yi=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],wi=/^\/?Date\((\-?\d+)/i;e.createFromInputFallback=ee("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),N(0,["YY",2],0,function(){return this.year()%100}),N(0,["YYYY",4],0,"year"),N(0,["YYYYY",5],0,"year"),N(0,["YYYYYY",6,!0],0,"year"),T("year","y"),$("Y",ei),$("YY",Gn,Vn),$("YYYY",Qn,Bn),$("YYYYY",Kn,Un),$("YYYYYY",Kn,Un),q(["YYYYY","YYYYYY"],si),q("YYYY",function(t,n){n[si]=2===t.length?e.parseTwoDigitYear(t):m(t)}),q("YY",function(t,n){n[si]=e.parseTwoDigitYear(t)}),e.parseTwoDigitYear=function(e){return m(e)+(m(e)>68?1900:2e3)};var bi=O("FullYear",!1);N("w",["ww",2],"wo","week"),N("W",["WW",2],"Wo","isoWeek"),T("week","w"),T("isoWeek","W"),$("w",Gn),$("ww",Gn,Vn),$("W",Gn),$("WW",Gn,Vn),W(["w","ww","W","WW"],function(e,t,n,i){t[i.substr(0,1)]=m(e)});var xi={dow:0,doy:6};N("DDD",["DDDD",3],"DDDo","dayOfYear"),T("dayOfYear","DDD"),$("DDD",Zn),$("DDDD",Xn),q(["DDD","DDDD"],function(e,t,n){n._dayOfYear=m(e)}),e.ISO_8601=function(){};var Si=ee("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var e=De.apply(null,arguments);return this>e?this:e}),ki=ee("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var e=De.apply(null,arguments);return e>this?this:e});Ie("Z",":"),Ie("ZZ",""),$("Z",ti),$("ZZ",ti),q(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Le(e)});var Ci=/([\+\-]|\d\d)/gi;e.updateOffset=function(){};var Ti=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,_i=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Ze.fn=Ne.prototype;var Ei=et(1,"add"),Oi=et(-1,"subtract");e.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var Di=ee("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});N(0,["gg",2],0,function(){return this.weekYear()%100}),N(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Dt("gggg","weekYear"),Dt("ggggg","weekYear"),Dt("GGGG","isoWeekYear"),Dt("GGGGG","isoWeekYear"),T("weekYear","gg"),T("isoWeekYear","GG"),$("G",ei),$("g",ei),$("GG",Gn,Vn),$("gg",Gn,Vn),$("GGGG",Qn,Bn),$("gggg",Qn,Bn),$("GGGGG",Kn,Un),$("ggggg",Kn,Un),W(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,i){t[i.substr(0,2)]=m(e)}),W(["gg","GG"],function(t,n,i,r){n[r]=e.parseTwoDigitYear(t)}),N("Q",0,0,"quarter"),T("quarter","Q"),$("Q",Rn),q("Q",function(e,t){t[ai]=3*(m(e)-1)}),N("D",["DD",2],"Do","date"),T("date","D"),$("D",Gn),$("DD",Gn,Vn),$("Do",function(e,t){return e?t._ordinalParse:t._ordinalParseLenient}),q(["D","DD"],li),q("Do",function(e,t){t[li]=m(e.match(Gn)[0],10)});var Pi=O("Date",!0);N("d",0,"do","day"),N("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),N("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),N("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),N("e",0,0,"weekday"),N("E",0,0,"isoWeekday"),T("day","d"),T("weekday","e"),T("isoWeekday","E"),$("d",Gn),$("e",Gn),$("E",Gn),$("dd",ii),$("ddd",ii),$("dddd",ii),W(["dd","ddd","dddd"],function(e,t,n){var i=n._locale.weekdaysParse(e);null!=i?t.d=i:u(n).invalidWeekday=e}),W(["d","e","E"],function(e,t,n,i){t[i]=m(e)});var Ai="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Mi="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Ni="Su_Mo_Tu_We_Th_Fr_Sa".split("_");N("H",["HH",2],0,"hour"),N("h",["hh",2],0,function(){return this.hours()%12||12}),Rt("a",!0),Rt("A",!1),T("hour","h"),$("a",Vt),$("A",Vt),$("H",Gn),$("h",Gn),$("HH",Gn,Vn),$("hh",Gn,Vn),q(["H","HH"],ui),q(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),q(["h","hh"],function(e,t,n){t[ui]=m(e),u(n).bigHour=!0});var Fi=/[ap]\.?m?\.?/i,Ii=O("Hours",!0);N("m",["mm",2],0,"minute"),T("minute","m"),$("m",Gn),$("mm",Gn,Vn),q(["m","mm"],ci);var Li=O("Minutes",!1);N("s",["ss",2],0,"second"),T("second","s"),$("s",Gn),$("ss",Gn,Vn),q(["s","ss"],di);var ji=O("Seconds",!1);N("S",0,0,function(){return~~(this.millisecond()/100)}),N(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),N(0,["SSS",3],0,"millisecond"),N(0,["SSSS",4],0,function(){return 10*this.millisecond()}),N(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),N(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),N(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),N(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),N(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),T("millisecond","ms"),$("S",Zn,Rn),$("SS",Zn,Vn),$("SSS",Zn,Xn);var Yi;for(Yi="SSSS";Yi.length<=9;Yi+="S")$(Yi,Jn);for(Yi="S";Yi.length<=9;Yi+="S")q(Yi,Ut);var $i=O("Milliseconds",!1);N("z",0,0,"zoneAbbr"),N("zz",0,0,"zoneName");var zi=f.prototype;zi.add=Ei,zi.calendar=nt,zi.clone=it,zi.diff=lt,zi.endOf=bt,zi.format=pt,zi.from=ft,zi.fromNow=ht,zi.to=gt,zi.toNow=mt,zi.get=A,zi.invalidAt=Ot,zi.isAfter=rt,zi.isBefore=ot,zi.isBetween=st,zi.isSame=at,zi.isValid=_t,zi.lang=Di,zi.locale=vt,zi.localeData=yt,zi.max=ki,zi.min=Si,zi.parsingFlags=Et,zi.set=A,zi.startOf=wt,zi.subtract=Oi,zi.toArray=Ct,zi.toObject=Tt,zi.toDate=kt,zi.toISOString=dt,zi.toJSON=dt,zi.toString=ct,zi.unix=St,zi.valueOf=xt,zi.year=bi,zi.isLeapYear=le,zi.weekYear=At,zi.isoWeekYear=Mt,zi.quarter=zi.quarters=It,zi.month=Z,zi.daysInMonth=Q,zi.week=zi.weeks=fe,zi.isoWeek=zi.isoWeeks=he,zi.weeksInYear=Ft,zi.isoWeeksInYear=Nt,zi.date=Pi,zi.day=zi.days=Ht,zi.weekday=qt,zi.isoWeekday=Wt,zi.dayOfYear=me,zi.hour=zi.hours=Ii,zi.minute=zi.minutes=Li,zi.second=zi.seconds=ji,zi.millisecond=zi.milliseconds=$i,zi.utcOffset=$e,zi.utc=He,zi.local=qe,zi.parseZone=We,zi.hasAlignedHourOffset=Re,zi.isDST=Ve,zi.isDSTShifted=Xe,zi.isLocal=Be,zi.isUtcOffset=Ue,zi.isUtc=Ge,zi.isUTC=Ge,zi.zoneAbbr=Gt,zi.zoneName=Zt,zi.dates=ee("dates accessor is deprecated. Use date instead.",Pi),zi.months=ee("months accessor is deprecated. Use month instead",Z),zi.years=ee("years accessor is deprecated. Use year instead",bi),zi.zone=ee("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",ze);var Hi=zi,qi={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",
sameElse:"L"},Wi={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Ri="Invalid date",Vi="%d",Xi=/\d{1,2}/,Bi={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Ui=y.prototype;Ui._calendar=qi,Ui.calendar=Jt,Ui._longDateFormat=Wi,Ui.longDateFormat=en,Ui._invalidDate=Ri,Ui.invalidDate=tn,Ui._ordinal=Vi,Ui.ordinal=nn,Ui._ordinalParse=Xi,Ui.preparse=rn,Ui.postformat=rn,Ui._relativeTime=Bi,Ui.relativeTime=on,Ui.pastFuture=sn,Ui.set=an,Ui.months=X,Ui._months=fi,Ui.monthsShort=B,Ui._monthsShort=hi,Ui.monthsParse=U,Ui.week=ce,Ui._week=xi,Ui.firstDayOfYear=pe,Ui.firstDayOfWeek=de,Ui.weekdays=jt,Ui._weekdays=Ai,Ui.weekdaysMin=$t,Ui._weekdaysMin=Ni,Ui.weekdaysShort=Yt,Ui._weekdaysShort=Mi,Ui.weekdaysParse=zt,Ui.isPM=Xt,Ui._meridiemParse=Fi,Ui.meridiem=Bt,S("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10,n=1===m(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n}}),e.lang=ee("moment.lang is deprecated. Use moment.locale instead.",S),e.langData=ee("moment.langData is deprecated. Use moment.localeData instead.",C);var Gi=Math.abs,Zi=Tn("ms"),Qi=Tn("s"),Ki=Tn("m"),Ji=Tn("h"),er=Tn("d"),tr=Tn("w"),nr=Tn("M"),ir=Tn("y"),rr=En("milliseconds"),or=En("seconds"),sr=En("minutes"),ar=En("hours"),lr=En("days"),ur=En("months"),cr=En("years"),dr=Math.round,pr={s:45,m:45,h:22,d:26,M:11},fr=Math.abs,hr=Ne.prototype;hr.abs=gn,hr.add=vn,hr.subtract=yn,hr.as=kn,hr.asMilliseconds=Zi,hr.asSeconds=Qi,hr.asMinutes=Ki,hr.asHours=Ji,hr.asDays=er,hr.asWeeks=tr,hr.asMonths=nr,hr.asYears=ir,hr.valueOf=Cn,hr._bubble=bn,hr.get=_n,hr.milliseconds=rr,hr.seconds=or,hr.minutes=sr,hr.hours=ar,hr.days=lr,hr.weeks=On,hr.months=ur,hr.years=cr,hr.humanize=Mn,hr.toISOString=Nn,hr.toString=Nn,hr.toJSON=Nn,hr.locale=vt,hr.localeData=yt,hr.toIsoString=ee("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Nn),hr.lang=Di,N("X",0,0,"unix"),N("x",0,0,"valueOf"),$("x",ei),$("X",ni),q("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),q("x",function(e,t,n){n._d=new Date(m(e))}),e.version="2.10.6",t(De),e.fn=Hi,e.min=Ae,e.max=Me,e.utc=a,e.unix=Qt,e.months=cn,e.isDate=i,e.locale=S,e.invalid=d,e.duration=Ze,e.isMoment=h,e.weekdays=pn,e.parseZone=Kt,e.localeData=C,e.isDuration=Fe,e.monthsShort=dn,e.weekdaysMin=hn,e.defineLocale=k,e.weekdaysShort=fn,e.normalizeUnits=_,e.relativeTimeThreshold=An;var gr=e;return gr}),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e(window.jQuery||window.Zepto)}(function(e){"use strict";var t,n=[],i={},r=/^([a-z]:)?\/\//i,o=/\.\w+$/;i.init=function(s){return s=e.extend({ping:null,dimensions:"preserve",glue:"_",skipExtensions:["svg"]},s),this.each(function(){var a=e(this);if(a.is("img")&&!a.hasClass("dense-image")){a.addClass("dense-image dense-loading");var l,u=i.getImageAttribute.call(this),c=a.attr("src"),d=!1;if(!u){if(!c||1===t||-1!==e.inArray(c.split(".").pop().split(/[\?\#]/).shift(),s.skipExtensions))return void a.removeClass("dense-image dense-loading");u=c.replace(o,function(e){return s.glue+t+"x"+e}),d=s.ping!==!1&&-1===e.inArray(u,n)&&(s.ping===!0||!r.test(u)||0===u.indexOf("//"+document.domain)||0===u.indexOf(document.location.protocol+"//"+document.domain))}l=function(){var e=function(){a.removeClass("dense-loading").addClass("dense-ready").trigger("denseRetinaReady.dense")};a.attr("src",u),"update"===s.dimensions?a.dense("updateDimensions").one("denseDimensionChanged",e):("remove"===s.dimensions&&a.removeAttr("width height"),e())},d?e.ajax({url:u,type:"HEAD"}).done(function(e,t,i){var r=i.getResponseHeader("Content-type");r&&0!==r.indexOf("image/")||(n.push(u),l())}):l()}}),this},i.updateDimensions=function(){return this.each(function(){var t,n=e(this),i=n.attr("src");i&&(t=new Image,t.src=i,e(t).on("load.dense",function(){n.attr({width:t.width,height:t.height}).trigger("denseDimensionChanged.dense")}))})},i.devicePixelRatio=function(){var t=1;return"undefined"!==e.type(window.devicePixelRatio)?t=window.devicePixelRatio:"undefined"!==e.type(window.matchMedia)&&e.each([1.3,2,3,4,5,6],function(e,n){var i=["(-webkit-min-device-pixel-ratio: "+n+")","(min-resolution: "+Math.floor(96*n)+"dpi)","(min-resolution: "+n+"dppx)"].join(",");return window.matchMedia(i).matches?void(t=n):!1}),Math.ceil(t)},i.getImageAttribute=function(){for(var n,i=e(this).eq(0),r=!1,o=1;t>=o;o++)n=i.attr("data-"+o+"x"),n&&(r=n);return r},t=i.devicePixelRatio(),e.fn.dense=function(t,n){return("string"!==e.type(t)||"function"!==e.type(i[t]))&&(n=t,t="init"),i[t].call(this,n)},e(function(){e("body.dense-retina img").dense()})}),function(){"use strict";function e(t,i){function r(e,t){return function(){return e.apply(t,arguments)}}var o;if(i=i||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=i.touchBoundary||10,this.layer=t,this.tapDelay=i.tapDelay||200,this.tapTimeout=i.tapTimeout||700,!e.notNeeded(t)){for(var s=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,l=0,u=s.length;u>l;l++)a[s[l]]=r(a[s[l]],a);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,i){var r=Node.prototype.removeEventListener;"click"===e?r.call(t,e,n.hijacked||n,i):r.call(t,e,n,i)},t.addEventListener=function(e,n,i){var r=Node.prototype.addEventListener;"click"===e?r.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),i):r.call(t,e,n,i)}),"function"==typeof t.onclick&&(o=t.onclick,t.addEventListener("click",function(e){o(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,i=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,r=i&&/OS 4_\d(_\d)?/.test(navigator.userAgent),o=i&&/OS [6-7]_\d/.test(navigator.userAgent),s=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(i&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,i;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),i=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;i&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,o;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],i){if(o=window.getSelection(),o.rangeCount&&!o.isCollapsed)return!0;if(!r){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,s,a,l,u,c=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,s=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,o&&(u=e.changedTouches[0],c=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||c,c.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=c.tagName.toLowerCase(),"label"===a){if(t=this.findControl(c)){if(this.focus(c),n)return!1;c=t}}else if(this.needsFocus(c))return e.timeStamp-s>100||i&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(c),this.sendClick(c,e),i&&"select"===a||(this.targetElement=null,e.preventDefault()),!1);return i&&!r&&(l=c.fastClickScrollParent,l&&l.fastClickLastScrollTop!==l.scrollTop)?!0:(this.needsClick(c)||(e.preventDefault(),this.sendClick(c,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,i,r,o;if("undefined"==typeof window.ontouchstart)return!0;if(i=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(i>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(s&&(r=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),r[1]>=10&&r[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(o=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],o>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction?!0:!1)},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}(),function(e,t){"function"==typeof define&&define.amd?define(["jquery"],t):t(e.jQuery)}(this,function(e){"use strict";function t(t){if(o.webkit&&!t)return{height:0,width:0};if(!o.data.outer){var n={border:"none","box-sizing":"content-box",height:"200px",margin:"0",padding:"0",width:"200px"};o.data.inner=e("<div>").css(e.extend({},n)),o.data.outer=e("<div>").css(e.extend({left:"-1000px",overflow:"scroll",position:"absolute",top:"-1000px"},n)).append(o.data.inner).appendTo("body")}return o.data.outer.scrollLeft(1e3).scrollTop(1e3),{height:Math.ceil(o.data.outer.offset().top-o.data.inner.offset().top||0),width:Math.ceil(o.data.outer.offset().left-o.data.inner.offset().left||0)}}function n(){var e=t(!0);return!(e.height||e.width)}function i(e){var t=e.originalEvent;return t.axis&&t.axis===t.HORIZONTAL_AXIS?!1:t.wheelDeltaX?!1:!0}var r=!1,o={data:{index:0,name:"scrollbar"},macosx:/mac/i.test(navigator.platform),mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),overlay:null,scroll:null,scrolls:[],webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)};o.scrolls.add=function(e){this.remove(e).push(e)},o.scrolls.remove=function(t){for(;e.inArray(t,this)>=0;)this.splice(e.inArray(t,this),1);return this};var s={autoScrollSize:!0,autoUpdate:!0,debug:!1,disableBodyScroll:!1,duration:200,ignoreMobile:!1,ignoreOverlay:!1,scrollStep:30,showArrows:!1,stepScrolling:!0,scrollx:null,scrolly:null,onDestroy:null,onInit:null,onScroll:null,onUpdate:null},a=function(i){o.scroll||(o.overlay=n(),o.scroll=t(),u(),e(window).resize(function(){var e=!1;if(o.scroll&&(o.scroll.height||o.scroll.width)){var n=t();(n.height!==o.scroll.height||n.width!==o.scroll.width)&&(o.scroll=n,e=!0)}u(e)})),this.container=i,this.namespace=".scrollbar_"+o.data.index++,this.options=e.extend({},s,window.jQueryScrollbarOptions||{}),this.scrollTo=null,this.scrollx={},this.scrolly={},i.data(o.data.name,this),o.scrolls.add(this)};a.prototype={destroy:function(){if(this.wrapper){this.container.removeData(o.data.name),o.scrolls.remove(this);var t=this.container.scrollLeft(),n=this.container.scrollTop();this.container.insertBefore(this.wrapper).css({height:"",margin:"","max-height":""}).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(t).scrollTop(n),this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace),this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace),this.wrapper.remove(),e(document).add("body").off(this.namespace),e.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container])}},init:function(t){var n=this,r=this.container,s=this.containerWrapper||r,a=this.namespace,l=e.extend(this.options,t||{}),u={x:this.scrollx,y:this.scrolly},c=this.wrapper,d={scrollLeft:r.scrollLeft(),scrollTop:r.scrollTop()};if(o.mobile&&l.ignoreMobile||o.overlay&&l.ignoreOverlay||o.macosx&&!o.webkit)return!1;if(c)s.css({height:"auto","margin-bottom":-1*o.scroll.height+"px","margin-right":-1*o.scroll.width+"px","max-height":""});else{if(this.wrapper=c=e("<div>").addClass("scroll-wrapper").addClass(r.attr("class")).css("position","absolute"==r.css("position")?"absolute":"relative").insertBefore(r).append(r),r.is("textarea")&&(this.containerWrapper=s=e("<div>").insertBefore(r).append(r),c.addClass("scroll-textarea")),s.addClass("scroll-content").css({height:"auto","margin-bottom":-1*o.scroll.height+"px","margin-right":-1*o.scroll.width+"px","max-height":""}),r.on("scroll"+a,function(t){e.isFunction(l.onScroll)&&l.onScroll.call(n,{maxScroll:u.y.maxScrollOffset,scroll:r.scrollTop(),size:u.y.size,visible:u.y.visible},{maxScroll:u.x.maxScrollOffset,scroll:r.scrollLeft(),size:u.x.size,visible:u.x.visible}),u.x.isVisible&&u.x.scroll.bar.css("left",r.scrollLeft()*u.x.kx+"px"),u.y.isVisible&&u.y.scroll.bar.css("top",r.scrollTop()*u.y.kx+"px")}),c.on("scroll"+a,function(){c.scrollTop(0).scrollLeft(0)}),l.disableBodyScroll){var p=function(e){i(e)?u.y.isVisible&&u.y.mousewheel(e):u.x.isVisible&&u.x.mousewheel(e)};c.on("MozMousePixelScroll"+a,p),c.on("mousewheel"+a,p),o.mobile&&c.on("touchstart"+a,function(t){var n=t.originalEvent.touches&&t.originalEvent.touches[0]||t,i={pageX:n.pageX,pageY:n.pageY},o={left:r.scrollLeft(),top:r.scrollTop()};e(document).on("touchmove"+a,function(e){var t=e.originalEvent.targetTouches&&e.originalEvent.targetTouches[0]||e;r.scrollLeft(o.left+i.pageX-t.pageX),r.scrollTop(o.top+i.pageY-t.pageY),e.preventDefault()}),e(document).on("touchend"+a,function(){e(document).off(a)})})}e.isFunction(l.onInit)&&l.onInit.apply(this,[r])}e.each(u,function(t,o){var s=null,c=1,d="x"===t?"scrollLeft":"scrollTop",p=l.scrollStep,f=function(){var e=r[d]();r[d](e+p),1==c&&e+p>=h&&(e=r[d]()),-1==c&&h>=e+p&&(e=r[d]()),r[d]()==e&&s&&s()},h=0;o.scroll||(o.scroll=n._getScroll(l["scroll"+t]).addClass("scroll-"+t),l.showArrows&&o.scroll.addClass("scroll-element_arrows_visible"),o.mousewheel=function(e){if(!o.isVisible||"x"===t&&i(e))return!0;if("y"===t&&!i(e))return u.x.mousewheel(e),!0;var s=-1*e.originalEvent.wheelDelta||e.originalEvent.detail,a=o.size-o.visible-o.offset;return(s>0&&a>h||0>s&&h>0)&&(h+=s,0>h&&(h=0),h>a&&(h=a),n.scrollTo=n.scrollTo||{},n.scrollTo[d]=h,setTimeout(function(){n.scrollTo&&(r.stop().animate(n.scrollTo,240,"linear",function(){h=r[d]()}),n.scrollTo=null)},1)),e.preventDefault(),!1},o.scroll.on("MozMousePixelScroll"+a,o.mousewheel).on("mousewheel"+a,o.mousewheel).on("mouseenter"+a,function(){h=r[d]()}),o.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown"+a,function(i){if(1!=i.which)return!0;c=1;var a={eventOffset:i["x"===t?"pageX":"pageY"],maxScrollValue:o.size-o.visible-o.offset,scrollbarOffset:o.scroll.bar.offset()["x"===t?"left":"top"],scrollbarSize:o.scroll.bar["x"===t?"outerWidth":"outerHeight"]()},u=0,g=0;return e(this).hasClass("scroll-arrow")?(c=e(this).hasClass("scroll-arrow_more")?1:-1,p=l.scrollStep*c,h=c>0?a.maxScrollValue:0):(c=a.eventOffset>a.scrollbarOffset+a.scrollbarSize?1:a.eventOffset<a.scrollbarOffset?-1:0,p=Math.round(.75*o.visible)*c,h=a.eventOffset-a.scrollbarOffset-(l.stepScrolling?1==c?a.scrollbarSize:0:Math.round(a.scrollbarSize/2)),h=r[d]()+h/o.kx),n.scrollTo=n.scrollTo||{},n.scrollTo[d]=l.stepScrolling?r[d]()+p:h,l.stepScrolling&&(s=function(){h=r[d](),clearInterval(g),clearTimeout(u),u=0,g=0},u=setTimeout(function(){g=setInterval(f,40)},l.duration+100)),setTimeout(function(){n.scrollTo&&(r.animate(n.scrollTo,l.duration),n.scrollTo=null)},1),n._handleMouseDown(s,i)}),o.scroll.bar.on("mousedown"+a,function(i){if(1!=i.which)return!0;var s=i["x"===t?"pageX":"pageY"],l=r[d]();return o.scroll.addClass("scroll-draggable"),e(document).on("mousemove"+a,function(e){var n=parseInt((e["x"===t?"pageX":"pageY"]-s)/o.kx,10);r[d](l+n)}),n._handleMouseDown(function(){o.scroll.removeClass("scroll-draggable"),h=r[d]()},i)}))}),e.each(u,function(e,t){var n="scroll-scroll"+e+"_visible",i="x"==e?u.y:u.x;t.scroll.removeClass(n),i.scroll.removeClass(n),s.removeClass(n)}),e.each(u,function(t,n){e.extend(n,"x"==t?{offset:parseInt(r.css("left"),10)||0,size:r.prop("scrollWidth"),visible:c.width()}:{offset:parseInt(r.css("top"),10)||0,size:r.prop("scrollHeight"),visible:c.height()})}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),e.isFunction(l.onUpdate)&&l.onUpdate.apply(this,[r]),e.each(u,function(e,t){var n="x"===e?"left":"top",i="x"===e?"outerWidth":"outerHeight",o="x"===e?"width":"height",s=parseInt(r.css(n),10)||0,a=t.size,u=t.visible+s,c=t.scroll.size[i]()+(parseInt(t.scroll.size.css(n),10)||0);l.autoScrollSize&&(t.scrollbarSize=parseInt(c*u/a,10),t.scroll.bar.css(o,t.scrollbarSize+"px")),t.scrollbarSize=t.scroll.bar[i](),t.kx=(c-t.scrollbarSize)/(a-u)||1,t.maxScrollOffset=a-u}),r.scrollLeft(d.scrollLeft).scrollTop(d.scrollTop).trigger("scroll")},_getScroll:function(t){var n={advanced:['<div class="scroll-element">','<div class="scroll-element_corner"></div>','<div class="scroll-arrow scroll-arrow_less"></div>','<div class="scroll-arrow scroll-arrow_more"></div>','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_inner-wrapper">','<div class="scroll-element_inner scroll-element_track">','<div class="scroll-element_inner-bottom"></div>',"</div>","</div>",'<div class="scroll-bar">','<div class="scroll-bar_body">','<div class="scroll-bar_body-inner"></div>',"</div>",'<div class="scroll-bar_bottom"></div>','<div class="scroll-bar_center"></div>',"</div>","</div>","</div>"].join(""),simple:['<div class="scroll-element">','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_track"></div>','<div class="scroll-bar"></div>',"</div>","</div>"].join("")};return n[t]&&(t=n[t]),t||(t=n.simple),t="string"==typeof t?e(t).appendTo(this.wrapper):e(t),e.extend(t,{bar:t.find(".scroll-bar"),size:t.find(".scroll-element_size"),track:t.find(".scroll-element_track")}),t},_handleMouseDown:function(t,n){var i=this.namespace;return e(document).on("blur"+i,function(){e(document).add("body").off(i),t&&t()}),e(document).on("dragstart"+i,function(e){return e.preventDefault(),!1}),e(document).on("mouseup"+i,function(){e(document).add("body").off(i),t&&t()}),e("body").on("selectstart"+i,function(e){return e.preventDefault(),!1}),n&&n.preventDefault(),!1},_updateScroll:function(t,n){var i=this.container,r=this.containerWrapper||i,s="scroll-scroll"+t+"_visible",a="x"===t?this.scrolly:this.scrollx,l=parseInt(this.container.css("x"===t?"left":"top"),10)||0,u=this.wrapper,c=n.size,d=n.visible+l;n.isVisible=c-d>1,n.isVisible?(n.scroll.addClass(s),a.scroll.addClass(s),r.addClass(s)):(n.scroll.removeClass(s),a.scroll.removeClass(s),r.removeClass(s)),"y"===t&&(i.is("textarea")||d>c?r.css({height:d+o.scroll.height+"px","max-height":"none"}):r.css({"max-height":d+o.scroll.height+"px"})),(n.size!=i.prop("scrollWidth")||a.size!=i.prop("scrollHeight")||n.visible!=u.width()||a.visible!=u.height()||n.offset!=(parseInt(i.css("left"),10)||0)||a.offset!=(parseInt(i.css("top"),10)||0))&&(e.extend(this.scrollx,{offset:parseInt(i.css("left"),10)||0,size:i.prop("scrollWidth"),visible:u.width()}),e.extend(this.scrolly,{offset:parseInt(i.css("top"),10)||0,size:this.container.prop("scrollHeight"),visible:u.height()}),this._updateScroll("x"===t?"y":"x",a))}};var l=a;e.fn.scrollbar=function(t,n){return"string"!=typeof t&&(n=t,t="init"),"undefined"==typeof n&&(n=[]),e.isArray(n)||(n=[n]),this.not("body, .scroll-wrapper").each(function(){var i=e(this),r=i.data(o.data.name);(r||"init"===t)&&(r||(r=new l(i)),r[t]&&r[t].apply(r,n))}),this},e.fn.scrollbar.options=s;var u=function(){var e=0,t=0;return function(n){var i,s,a,l,c,d,p;for(i=0;i<o.scrolls.length;i++)l=o.scrolls[i],s=l.container,a=l.options,c=l.wrapper,d=l.scrollx,p=l.scrolly,(n||a.autoUpdate&&c&&c.is(":visible")&&(s.prop("scrollWidth")!=d.size||s.prop("scrollHeight")!=p.size||c.width()!=d.visible||c.height()!=p.visible))&&(l.init(),a.debug&&(window.console&&console.log({scrollHeight:s.prop("scrollHeight")+":"+l.scrolly.size,scrollWidth:s.prop("scrollWidth")+":"+l.scrollx.size,visibleHeight:c.height()+":"+l.scrolly.visible,visibleWidth:c.width()+":"+l.scrollx.visible},!0),t++));r&&t>10?(window.console&&console.log("Scroll updates exceed 10"),u=function(){}):(clearTimeout(e),e=setTimeout(u,300))}}();window.angular&&!function(e){e.module("jQueryScrollbar",[]).provider("jQueryScrollbar",function(){var t=s;return{setOptions:function(n){e.extend(t,n)},$get:function(){return{options:e.copy(t)}}}}).directive("jqueryScrollbar",function(e,t){return{restrict:"AC",link:function(n,i,r){var o=t(r.jqueryScrollbar),s=o(n);i.scrollbar(s||e.options).on("$destroy",function(){i.scrollbar("destroy")})}}})}(window.angular)}),jQuery.extend({bez:function(e){var t="bez_"+jQuery.makeArray(arguments).join("_").replace(".","p");if("function"!=typeof jQuery.easing[t]){var n=function(e,t){var n=[null,null],i=[null,null],r=[null,null],o=function(o,s){return r[s]=3*e[s],i[s]=3*(t[s]-e[s])-r[s],n[s]=1-r[s]-i[s],o*(r[s]+o*(i[s]+o*n[s]))},s=function(e){return r[0]+e*(2*i[0]+3*n[0]*e)},a=function(e){for(var t,n=e,i=0;++i<14&&(t=o(n,0)-e,!(Math.abs(t)<.001));)n-=t/s(n);return n};return function(e){return o(a(e),1)}};jQuery.easing[t]=function(t,i,r,o,s){return o*n([e[0],e[1]],[e[2],e[3]])(i/s)+r}}return t}}),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){e.fn.addBack=e.fn.addBack||e.fn.andSelf,e.fn.extend({actual:function(t,n){if(!this[t])throw'$.actual => The jQuery method "'+t+'" you called does not exist';var i,r,o={absolute:!1,clone:!1,includeMargin:!1,display:"block"},s=e.extend(o,n),a=this.eq(0);if(s.clone===!0)i=function(){var e="position: absolute !important; top: -1000 !important; ";a=a.clone().attr("style",e).appendTo("body")},r=function(){a.remove()};else{var l,u=[],c="";i=function(){l=a.parents().addBack().filter(":hidden"),c+="visibility: hidden !important; display: "+s.display+" !important; ",s.absolute===!0&&(c+="position: absolute !important; "),l.each(function(){var t=e(this),n=t.attr("style");u.push(n),t.attr("style",n?n+";"+c:c)})},r=function(){l.each(function(t){var n=e(this),i=u[t];void 0===i?n.removeAttr("style"):n.attr("style",i)})}}i();var d=/(outer)/.test(t)?a[t](s.includeMargin):a[t]();return r(),d}})}),function(){"use strict";function e(i){if(!i)throw new Error("No options passed to Waypoint constructor");if(!i.element)throw new Error("No element option passed to Waypoint constructor");if(!i.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+t,this.options=e.Adapter.extend({},e.defaults,i),this.element=this.options.element,this.adapter=new e.Adapter(this.element),this.callback=i.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=e.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=e.Context.findOrCreateByElement(this.options.context),e.offsetAliases[this.options.offset]&&(this.options.offset=e.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,t+=1}var t=0,n={};e.prototype.queueTrigger=function(e){this.group.queueTrigger(this,e)},e.prototype.trigger=function(e){this.enabled&&this.callback&&this.callback.apply(this,e)},e.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},e.prototype.disable=function(){return this.enabled=!1,this},e.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},e.prototype.next=function(){return this.group.next(this)},e.prototype.previous=function(){return this.group.previous(this)},e.invokeAll=function(e){var t=[];for(var i in n)t.push(n[i]);for(var r=0,o=t.length;o>r;r++)t[r][e]()},e.destroyAll=function(){e.invokeAll("destroy")},e.disableAll=function(){e.invokeAll("disable")},e.enableAll=function(){e.invokeAll("enable")},e.refreshAll=function(){e.Context.refreshAll()},e.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},e.viewportWidth=function(){return document.documentElement.clientWidth},e.adapters=[],e.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},e.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=e}(),function(){"use strict";function e(e){window.setTimeout(e,1e3/60)}function t(e){this.element=e,this.Adapter=r.Adapter,this.adapter=new this.Adapter(e),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},e.waypointContextKey=this.key,i[e.waypointContextKey]=this,n+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,i={},r=window.Waypoint,o=window.onload;t.prototype.add=function(e){var t=e.options.horizontal?"horizontal":"vertical";this.waypoints[t][e.key]=e,this.refresh()},t.prototype.checkEmpty=function(){var e=this.Adapter.isEmptyObject(this.waypoints.horizontal),t=this.Adapter.isEmptyObject(this.waypoints.vertical);e&&t&&(this.adapter.off(".waypoints"),delete i[this.key])},t.prototype.createThrottledResizeHandler=function(){function e(){t.handleResize(),t.didResize=!1}var t=this;this.adapter.on("resize.waypoints",function(){t.didResize||(t.didResize=!0,r.requestAnimationFrame(e))})},t.prototype.createThrottledScrollHandler=function(){function e(){t.handleScroll(),t.didScroll=!1}var t=this;this.adapter.on("scroll.waypoints",function(){(!t.didScroll||r.isTouch)&&(t.didScroll=!0,r.requestAnimationFrame(e))})},t.prototype.handleResize=function(){r.Context.refreshAll()},t.prototype.handleScroll=function(){var e={},t={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in t){var i=t[n],r=i.newScroll>i.oldScroll,o=r?i.forward:i.backward;for(var s in this.waypoints[n]){var a=this.waypoints[n][s],l=i.oldScroll<a.triggerPoint,u=i.newScroll>=a.triggerPoint,c=l&&u,d=!l&&!u;(c||d)&&(a.queueTrigger(o),e[a.group.id]=a.group)}}for(var p in e)e[p].flushTriggers();this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}},t.prototype.innerHeight=function(){return this.element==this.element.window?r.viewportHeight():this.adapter.innerHeight()},t.prototype.remove=function(e){delete this.waypoints[e.axis][e.key],this.checkEmpty()},t.prototype.innerWidth=function(){return this.element==this.element.window?r.viewportWidth():this.adapter.innerWidth()},t.prototype.destroy=function(){var e=[];for(var t in this.waypoints)for(var n in this.waypoints[t])e.push(this.waypoints[t][n]);for(var i=0,r=e.length;r>i;i++)e[i].destroy()},t.prototype.refresh=function(){var e,t=this.element==this.element.window,n=t?void 0:this.adapter.offset(),i={};this.handleScroll(),e={horizontal:{contextOffset:t?0:n.left,contextScroll:t?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:t?0:n.top,contextScroll:t?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var o in e){var s=e[o];for(var a in this.waypoints[o]){var l,u,c,d,p,f=this.waypoints[o][a],h=f.options.offset,g=f.triggerPoint,m=0,v=null==g;f.element!==f.element.window&&(m=f.adapter.offset()[s.offsetProp]),"function"==typeof h?h=h.apply(f):"string"==typeof h&&(h=parseFloat(h),f.options.offset.indexOf("%")>-1&&(h=Math.ceil(s.contextDimension*h/100))),l=s.contextScroll-s.contextOffset,f.triggerPoint=m+l-h,u=g<s.oldScroll,c=f.triggerPoint>=s.oldScroll,d=u&&c,p=!u&&!c,!v&&d?(f.queueTrigger(s.backward),i[f.group.id]=f.group):!v&&p?(f.queueTrigger(s.forward),i[f.group.id]=f.group):v&&s.oldScroll>=f.triggerPoint&&(f.queueTrigger(s.forward),i[f.group.id]=f.group)}}return r.requestAnimationFrame(function(){for(var e in i)i[e].flushTriggers()}),this},t.findOrCreateByElement=function(e){return t.findByElement(e)||new t(e)},t.refreshAll=function(){for(var e in i)i[e].refresh();
},t.findByElement=function(e){return i[e.waypointContextKey]},window.onload=function(){o&&o(),t.refreshAll()},r.requestAnimationFrame=function(t){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||e;n.call(window,t)},r.Context=t}(),function(){"use strict";function e(e,t){return e.triggerPoint-t.triggerPoint}function t(e,t){return t.triggerPoint-e.triggerPoint}function n(e){this.name=e.name,this.axis=e.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),i[this.axis][this.name]=this}var i={vertical:{},horizontal:{}},r=window.Waypoint;n.prototype.add=function(e){this.waypoints.push(e)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var i=this.triggerQueues[n],r="up"===n||"left"===n;i.sort(r?t:e);for(var o=0,s=i.length;s>o;o+=1){var a=i[o];(a.options.continuous||o===i.length-1)&&a.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(t){this.waypoints.sort(e);var n=r.Adapter.inArray(t,this.waypoints),i=n===this.waypoints.length-1;return i?null:this.waypoints[n+1]},n.prototype.previous=function(t){this.waypoints.sort(e);var n=r.Adapter.inArray(t,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(e,t){this.triggerQueues[t].push(e)},n.prototype.remove=function(e){var t=r.Adapter.inArray(e,this.waypoints);t>-1&&this.waypoints.splice(t,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(e){return i[e.axis][e.name]||new n(e)},r.Group=n}(),function(){"use strict";function e(e){this.$element=t(e)}var t=window.jQuery,n=window.Waypoint;t.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(t,n){e.prototype[n]=function(){var e=Array.prototype.slice.call(arguments);return this.$element[n].apply(this.$element,e)}}),t.each(["extend","inArray","isEmptyObject"],function(n,i){e[i]=t[i]}),n.adapters.push({name:"jquery",Adapter:e}),n.Adapter=e}(),function(){"use strict";function e(e){return function(){var n=[],i=arguments[0];return e.isFunction(arguments[0])&&(i=e.extend({},arguments[1]),i.handler=arguments[0]),this.each(function(){var r=e.extend({},i,{element:this});"string"==typeof r.context&&(r.context=e(this).closest(r.context)[0]),n.push(new t(r))}),n}}var t=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=e(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=e(window.Zepto))}(),function(e){function t(e){var t=e.length,i=n.type(e);return"function"===i||n.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===i||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var n=function(e,t){return new n.fn.init(e,t)};n.isWindow=function(e){return null!=e&&e==e.window},n.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?r[s.call(e)]||"object":typeof e},n.isArray=Array.isArray||function(e){return"array"===n.type(e)},n.isPlainObject=function(e){var t;if(!e||"object"!==n.type(e)||e.nodeType||n.isWindow(e))return!1;try{if(e.constructor&&!o.call(e,"constructor")&&!o.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(i){return!1}for(t in e);return void 0===t||o.call(e,t)},n.each=function(e,n,i){var r,o=0,s=e.length,a=t(e);if(i){if(a)for(;s>o&&(r=n.apply(e[o],i),r!==!1);o++);else for(o in e)if(r=n.apply(e[o],i),r===!1)break}else if(a)for(;s>o&&(r=n.call(e[o],o,e[o]),r!==!1);o++);else for(o in e)if(r=n.call(e[o],o,e[o]),r===!1)break;return e},n.data=function(e,t,r){if(void 0===r){var o=e[n.expando],s=o&&i[o];if(void 0===t)return s;if(s&&t in s)return s[t]}else if(void 0!==t){var o=e[n.expando]||(e[n.expando]=++n.uuid);return i[o]=i[o]||{},i[o][t]=r,r}},n.removeData=function(e,t){var r=e[n.expando],o=r&&i[r];o&&n.each(t,function(e,t){delete o[t]})},n.extend=function(){var e,t,i,r,o,s,a=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof a&&(c=a,a=arguments[l]||{},l++),"object"!=typeof a&&"function"!==n.type(a)&&(a={}),l===u&&(a=this,l--);u>l;l++)if(null!=(o=arguments[l]))for(r in o)e=a[r],i=o[r],a!==i&&(c&&i&&(n.isPlainObject(i)||(t=n.isArray(i)))?(t?(t=!1,s=e&&n.isArray(e)?e:[]):s=e&&n.isPlainObject(e)?e:{},a[r]=n.extend(c,s,i)):void 0!==i&&(a[r]=i));return a},n.queue=function(e,i,r){function o(e,n){var i=n||[];return null!=e&&(t(Object(e))?!function(e,t){for(var n=+t.length,i=0,r=e.length;n>i;)e[r++]=t[i++];if(n!==n)for(;void 0!==t[i];)e[r++]=t[i++];return e.length=r,e}(i,"string"==typeof e?[e]:e):[].push.call(i,e)),i}if(e){i=(i||"fx")+"queue";var s=n.data(e,i);return r?(!s||n.isArray(r)?s=n.data(e,i,o(r)):s.push(r),s):s||[]}},n.dequeue=function(e,t){n.each(e.nodeType?[e]:e,function(e,i){t=t||"fx";var r=n.queue(i,t),o=r.shift();"inprogress"===o&&(o=r.shift()),o&&("fx"===t&&r.unshift("inprogress"),o.call(i,function(){n.dequeue(i,t)}))})},n.fn=n.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),i=this.offset(),r=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:n(e).offset();return i.top-=parseFloat(t.style.marginTop)||0,i.left-=parseFloat(t.style.marginLeft)||0,e.style&&(r.top+=parseFloat(e.style.borderTopWidth)||0,r.left+=parseFloat(e.style.borderLeftWidth)||0),{top:i.top-r.top,left:i.left-r.left}}};var i={};n.expando="velocity"+(new Date).getTime(),n.uuid=0;for(var r={},o=r.hasOwnProperty,s=r.toString,a="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<a.length;l++)r["[object "+a[l]+"]"]=a[l].toLowerCase();n.fn.init.prototype=n.fn,e.Velocity={Utilities:n}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):e()}(function(){return function(e,t,n,i){function r(e){for(var t=-1,n=e?e.length:0,i=[];++t<n;){var r=e[t];r&&i.push(r)}return i}function o(e){return g.isWrapped(e)?e=[].slice.call(e):g.isNode(e)&&(e=[e]),e}function s(e){var t=p.data(e,"velocity");return null===t?i:t}function a(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,n,i,r){function o(e,t){return 1-3*t+3*e}function s(e,t){return 3*t-6*e}function a(e){return 3*e}function l(e,t,n){return((o(t,n)*e+s(t,n))*e+a(t))*e}function u(e,t,n){return 3*o(t,n)*e*e+2*s(t,n)*e+a(t)}function c(t,n){for(var r=0;g>r;++r){var o=u(n,e,i);if(0===o)return n;var s=l(n,e,i)-t;n-=s/o}return n}function d(){for(var t=0;w>t;++t)k[t]=l(t*b,e,i)}function p(t,n,r){var o,s,a=0;do s=n+(r-n)/2,o=l(s,e,i)-t,o>0?r=s:n=s;while(Math.abs(o)>v&&++a<y);return s}function f(t){for(var n=0,r=1,o=w-1;r!=o&&k[r]<=t;++r)n+=b;--r;var s=(t-k[r])/(k[r+1]-k[r]),a=n+s*b,l=u(a,e,i);return l>=m?c(t,a):0==l?a:p(t,n,n+b)}function h(){C=!0,(e!=n||i!=r)&&d()}var g=4,m=.001,v=1e-7,y=10,w=11,b=1/(w-1),x="Float32Array"in t;if(4!==arguments.length)return!1;for(var S=0;4>S;++S)if("number"!=typeof arguments[S]||isNaN(arguments[S])||!isFinite(arguments[S]))return!1;e=Math.min(e,1),i=Math.min(i,1),e=Math.max(e,0),i=Math.max(i,0);var k=x?new Float32Array(w):new Array(w),C=!1,T=function(t){return C||h(),e===n&&i===r?t:0===t?0:1===t?1:l(f(t),n,r)};T.getControlPoints=function(){return[{x:e,y:n},{x:i,y:r}]};var _="generateBezier("+[e,n,i,r]+")";return T.toString=function(){return _},T}function u(e,t){var n=e;return g.isString(e)?w.Easings[e]||(n=!1):n=g.isArray(e)&&1===e.length?a.apply(null,e):g.isArray(e)&&2===e.length?b.apply(null,e.concat([t])):g.isArray(e)&&4===e.length?l.apply(null,e):!1,n===!1&&(n=w.Easings[w.defaults.easing]?w.defaults.easing:y),n}function c(e){if(e){var t=(new Date).getTime(),n=w.State.calls.length;n>1e4&&(w.State.calls=r(w.State.calls));for(var o=0;n>o;o++)if(w.State.calls[o]){var a=w.State.calls[o],l=a[0],u=a[2],f=a[3],h=!!f,m=null;f||(f=w.State.calls[o][3]=t-16);for(var v=Math.min((t-f)/u.duration,1),y=0,b=l.length;b>y;y++){var S=l[y],C=S.element;if(s(C)){var T=!1;if(u.display!==i&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var _=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];p.each(_,function(e,t){x.setPropertyValue(C,"display",t)})}x.setPropertyValue(C,"display",u.display)}u.visibility!==i&&"hidden"!==u.visibility&&x.setPropertyValue(C,"visibility",u.visibility);for(var E in S)if("element"!==E){var O,D=S[E],P=g.isString(D.easing)?w.Easings[D.easing]:D.easing;if(1===v)O=D.endValue;else{var A=D.endValue-D.startValue;if(O=D.startValue+A*P(v,u,A),!h&&O===D.currentValue)continue}if(D.currentValue=O,"tween"===E)m=O;else{if(x.Hooks.registered[E]){var M=x.Hooks.getRoot(E),N=s(C).rootPropertyValueCache[M];N&&(D.rootPropertyValue=N)}var F=x.setPropertyValue(C,E,D.currentValue+(0===parseFloat(O)?"":D.unitType),D.rootPropertyValue,D.scrollData);x.Hooks.registered[E]&&(x.Normalizations.registered[M]?s(C).rootPropertyValueCache[M]=x.Normalizations.registered[M]("extract",null,F[1]):s(C).rootPropertyValueCache[M]=F[1]),"transform"===F[0]&&(T=!0)}}u.mobileHA&&s(C).transformCache.translate3d===i&&(s(C).transformCache.translate3d="(0px, 0px, 0px)",T=!0),T&&x.flushTransformCache(C)}}u.display!==i&&"none"!==u.display&&(w.State.calls[o][2].display=!1),u.visibility!==i&&"hidden"!==u.visibility&&(w.State.calls[o][2].visibility=!1),u.progress&&u.progress.call(a[1],a[1],v,Math.max(0,f+u.duration-t),f,m),1===v&&d(o)}}w.State.isTicking&&k(c)}function d(e,t){if(!w.State.calls[e])return!1;for(var n=w.State.calls[e][0],r=w.State.calls[e][1],o=w.State.calls[e][2],a=w.State.calls[e][4],l=!1,u=0,c=n.length;c>u;u++){var d=n[u].element;if(t||o.loop||("none"===o.display&&x.setPropertyValue(d,"display",o.display),"hidden"===o.visibility&&x.setPropertyValue(d,"visibility",o.visibility)),o.loop!==!0&&(p.queue(d)[1]===i||!/\.velocityQueueEntryFlag/i.test(p.queue(d)[1]))&&s(d)){s(d).isAnimating=!1,s(d).rootPropertyValueCache={};var f=!1;p.each(x.Lists.transforms3D,function(e,t){var n=/^scale/.test(t)?1:0,r=s(d).transformCache[t];s(d).transformCache[t]!==i&&new RegExp("^\\("+n+"[^.]").test(r)&&(f=!0,delete s(d).transformCache[t])}),o.mobileHA&&(f=!0,delete s(d).transformCache.translate3d),f&&x.flushTransformCache(d),x.Values.removeClass(d,"velocity-animating")}if(!t&&o.complete&&!o.loop&&u===c-1)try{o.complete.call(r,r)}catch(h){setTimeout(function(){throw h},1)}a&&o.loop!==!0&&a(r),s(d)&&o.loop===!0&&!t&&(p.each(s(d).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),w(d,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&p.dequeue(d,o.queue)}w.State.calls[e]=!1;for(var g=0,m=w.State.calls.length;m>g;g++)if(w.State.calls[g]!==!1){l=!0;break}l===!1&&(w.State.isTicking=!1,delete w.State.calls,w.State.calls=[])}var p,f=function(){if(n.documentMode)return n.documentMode;for(var e=7;e>4;e--){var t=n.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return i}(),h=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var n,i=(new Date).getTime();return n=Math.max(0,16-(i-e)),e=i+n,setTimeout(function(){t(i+n)},n)}}(),g={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==i&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},m=!1;if(e.fn&&e.fn.jquery?(p=e,m=!0):p=t.Velocity.Utilities,8>=f&&!m)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=f)return void(jQuery.fn.velocity=jQuery.fn.animate);var v=400,y="swing",w={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:n.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:p,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:v,easing:y,begin:i,complete:i,progress:i,display:i,visibility:i,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){p.data(e,"velocity",{isSVG:g.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==i?(w.State.scrollAnchor=t,w.State.scrollPropertyLeft="pageXOffset",w.State.scrollPropertyTop="pageYOffset"):(w.State.scrollAnchor=n.documentElement||n.body.parentNode||n.body,w.State.scrollPropertyLeft="scrollLeft",w.State.scrollPropertyTop="scrollTop");var b=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,n,i){var r={x:t.x+i.dx*n,v:t.v+i.dv*n,tension:t.tension,friction:t.friction};return{dx:r.v,dv:e(r)}}function n(n,i){var r={dx:n.v,dv:e(n)},o=t(n,.5*i,r),s=t(n,.5*i,o),a=t(n,i,s),l=1/6*(r.dx+2*(o.dx+s.dx)+a.dx),u=1/6*(r.dv+2*(o.dv+s.dv)+a.dv);return n.x=n.x+l*i,n.v=n.v+u*i,n}return function i(e,t,r){var o,s,a,l={x:-1,v:0,tension:null,friction:null},u=[0],c=0,d=1e-4,p=.016;for(e=parseFloat(e)||500,t=parseFloat(t)||20,r=r||null,l.tension=e,l.friction=t,o=null!==r,o?(c=i(e,t),s=c/r*p):s=p;;)if(a=n(a||l,s),u.push(1+a.x),c+=16,!(Math.abs(a.x)>d&&Math.abs(a.v)>d))break;return o?function(e){return u[e*(u.length-1)|0]}:c}}();w.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},p.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){w.Easings[t[0]]=l.apply(null,t[1])});var x=w.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<x.Lists.colors.length;e++){var t="color"===x.Lists.colors[e]?"0 0 0 1":"255 255 255 1";x.Hooks.templates[x.Lists.colors[e]]=["Red Green Blue Alpha",t]}var n,i,r;if(f)for(n in x.Hooks.templates){i=x.Hooks.templates[n],r=i[0].split(" ");var o=i[1].match(x.RegEx.valueSplit);"Color"===r[0]&&(r.push(r.shift()),o.push(o.shift()),x.Hooks.templates[n]=[r.join(" "),o.join(" ")])}for(n in x.Hooks.templates){i=x.Hooks.templates[n],r=i[0].split(" ");for(var e in r){var s=n+r[e],a=e;x.Hooks.registered[s]=[n,a]}}},getRoot:function(e){var t=x.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return x.RegEx.valueUnwrap.test(t)&&(t=t.match(x.RegEx.valueUnwrap)[1]),x.Values.isCSSNullValue(t)&&(t=x.Hooks.templates[e][1]),t},extractValue:function(e,t){var n=x.Hooks.registered[e];if(n){var i=n[0],r=n[1];return t=x.Hooks.cleanRootPropertyValue(i,t),t.toString().match(x.RegEx.valueSplit)[r]}return t},injectValue:function(e,t,n){var i=x.Hooks.registered[e];if(i){var r,o,s=i[0],a=i[1];return n=x.Hooks.cleanRootPropertyValue(s,n),r=n.toString().match(x.RegEx.valueSplit),r[a]=t,o=r.join(" ")}return n}},Normalizations:{registered:{clip:function(e,t,n){switch(e){case"name":return"clip";case"extract":var i;return x.RegEx.wrappedValueAlreadyExtracted.test(n)?i=n:(i=n.toString().match(x.RegEx.valueUnwrap),i=i?i[1].replace(/,(\s+)?/g," "):n),i;case"inject":return"rect("+n+")"}},blur:function(e,t,n){switch(e){case"name":return w.State.isFirefox?"filter":"-webkit-filter";case"extract":var i=parseFloat(n);if(!i&&0!==i){var r=n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);i=r?r[1]:0}return i;case"inject":return parseFloat(n)?"blur("+n+")":"none"}},opacity:function(e,t,n){if(8>=f)switch(e){case"name":return"filter";case"extract":var i=n.toString().match(/alpha\(opacity=(.*)\)/i);return n=i?i[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(n)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(n),10)+")"}else switch(e){case"name":return"opacity";case"extract":return n;case"inject":return n}}},register:function(){9>=f||w.State.isGingerbread||(x.Lists.transformsBase=x.Lists.transformsBase.concat(x.Lists.transforms3D));for(var e=0;e<x.Lists.transformsBase.length;e++)!function(){var t=x.Lists.transformsBase[e];x.Normalizations.registered[t]=function(e,n,r){switch(e){case"name":return"transform";case"extract":return s(n)===i||s(n).transformCache[t]===i?/^scale/i.test(t)?1:0:s(n).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(r);break;case"scal":case"scale":w.State.isAndroid&&s(n).transformCache[t]===i&&1>r&&(r=1),o=!/(\d)$/i.test(r);break;case"skew":o=!/(deg|\d)$/i.test(r);break;case"rotate":o=!/(deg|\d)$/i.test(r)}return o||(s(n).transformCache[t]="("+r+")"),s(n).transformCache[t]}}}();for(var e=0;e<x.Lists.colors.length;e++)!function(){var t=x.Lists.colors[e];x.Normalizations.registered[t]=function(e,n,r){switch(e){case"name":return t;case"extract":var o;if(x.RegEx.wrappedValueAlreadyExtracted.test(r))o=r;else{var s,a={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(r)?s=a[r]!==i?a[r]:a.black:x.RegEx.isHex.test(r)?s="rgb("+x.Values.hexToRgb(r).join(" ")+")":/^rgba?\(/i.test(r)||(s=a.black),o=(s||r).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=f||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=f?4===r.split(" ").length&&(r=r.split(/\s+/).slice(0,3).join(" ")):3===r.split(" ").length&&(r+=" 1"),(8>=f?"rgb":"rgba")+"("+r.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(f||w.State.isAndroid&&!w.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(w.State.prefixMatches[e])return[w.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],n=0,i=t.length;i>n;n++){var r;if(r=0===n?e:t[n]+e.replace(/^\w/,function(e){return e.toUpperCase()}),g.isString(w.State.prefixElement.style[r]))return w.State.prefixMatches[e]=r,[r,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,n=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e=e.replace(n,function(e,t,n,i){return t+t+n+n+i+i}),t=i.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,n,r,o){function a(e,n){function r(){u&&x.setPropertyValue(e,"display","none")}var l=0;if(8>=f)l=p.css(e,n);else{var u=!1;if(/^(width|height)$/.test(n)&&0===x.getPropertyValue(e,"display")&&(u=!0,x.setPropertyValue(e,"display",x.Values.getDisplayType(e))),!o){if("height"===n&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(x.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(x.getPropertyValue(e,"paddingBottom"))||0);return r(),c}if("width"===n&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var d=e.offsetWidth-(parseFloat(x.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(x.getPropertyValue(e,"paddingRight"))||0);return r(),d}}var h;h=s(e)===i?t.getComputedStyle(e,null):s(e).computedStyle?s(e).computedStyle:s(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===n&&(n="borderTopColor"),l=9===f&&"filter"===n?h.getPropertyValue(n):h[n],(""===l||null===l)&&(l=e.style[n]),r()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(n)){var g=a(e,"position");("fixed"===g||"absolute"===g&&/top|left/i.test(n))&&(l=p(e).position()[n]+"px")}return l}var l;if(x.Hooks.registered[n]){var u=n,c=x.Hooks.getRoot(u);r===i&&(r=x.getPropertyValue(e,x.Names.prefixCheck(c)[0])),x.Normalizations.registered[c]&&(r=x.Normalizations.registered[c]("extract",e,r)),l=x.Hooks.extractValue(u,r)}else if(x.Normalizations.registered[n]){var d,h;d=x.Normalizations.registered[n]("name",e),"transform"!==d&&(h=a(e,x.Names.prefixCheck(d)[0]),x.Values.isCSSNullValue(h)&&x.Hooks.templates[n]&&(h=x.Hooks.templates[n][1])),l=x.Normalizations.registered[n]("extract",e,h)}if(!/^[\d-]/.test(l))if(s(e)&&s(e).isSVG&&x.Names.SVGAttribute(n))if(/^(height|width)$/i.test(n))try{l=e.getBBox()[n]}catch(g){l=0}else l=e.getAttribute(n);else l=a(e,x.Names.prefixCheck(n)[0]);return x.Values.isCSSNullValue(l)&&(l=0),w.debug>=2&&console.log("Get "+n+": "+l),l},setPropertyValue:function(e,n,i,r,o){var a=n;if("scroll"===n)o.container?o.container["scroll"+o.direction]=i:"Left"===o.direction?t.scrollTo(i,o.alternateValue):t.scrollTo(o.alternateValue,i);else if(x.Normalizations.registered[n]&&"transform"===x.Normalizations.registered[n]("name",e))x.Normalizations.registered[n]("inject",e,i),a="transform",i=s(e).transformCache[n];else{if(x.Hooks.registered[n]){var l=n,u=x.Hooks.getRoot(n);r=r||x.getPropertyValue(e,u),i=x.Hooks.injectValue(l,i,r),n=u}if(x.Normalizations.registered[n]&&(i=x.Normalizations.registered[n]("inject",e,i),n=x.Normalizations.registered[n]("name",e)),a=x.Names.prefixCheck(n)[0],8>=f)try{e.style[a]=i}catch(c){w.debug&&console.log("Browser does not support ["+i+"] for ["+a+"]")}else s(e)&&s(e).isSVG&&x.Names.SVGAttribute(n)?e.setAttribute(n,i):e.style[a]=i;w.debug>=2&&console.log("Set "+n+" ("+a+"): "+i)}return[a,i]},flushTransformCache:function(e){function t(t){return parseFloat(x.getPropertyValue(e,t))}var n="";if((f||w.State.isAndroid&&!w.State.isChrome)&&s(e).isSVG){var i={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};p.each(s(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),i[e]&&(n+=e+"("+i[e].join(" ")+") ",delete i[e])})}else{var r,o;p.each(s(e).transformCache,function(t){return r=s(e).transformCache[t],"transformPerspective"===t?(o=r,!0):(9===f&&"rotateZ"===t&&(t="rotate"),void(n+=t+r+" "))}),o&&(n="perspective"+o+" "+n)}x.setPropertyValue(e,"transform",n)}};x.Hooks.register(),x.Normalizations.register(),w.hook=function(e,t,n){var r=i;return e=o(e),p.each(e,function(e,o){if(s(o)===i&&w.init(o),n===i)r===i&&(r=w.CSS.getPropertyValue(o,t));else{var a=w.CSS.setPropertyValue(o,t,n);"transform"===a[0]&&w.CSS.flushTransformCache(o),r=a}}),r};var S=function(){function e(){return a?E.promise||null:l}function r(){function e(e){function d(e,t){var n=i,r=i,s=i;return g.isArray(e)?(n=e[0],!g.isArray(e[1])&&/^[\d-]/.test(e[1])||g.isFunction(e[1])||x.RegEx.isHex.test(e[1])?s=e[1]:(g.isString(e[1])&&!x.RegEx.isHex.test(e[1])||g.isArray(e[1]))&&(r=t?e[1]:u(e[1],a.duration),e[2]!==i&&(s=e[2]))):n=e,t||(r=r||a.easing),g.isFunction(n)&&(n=n.call(o,C,k)),g.isFunction(s)&&(s=s.call(o,C,k)),[n||0,r,s]}function f(e,t){var n,i;return i=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return n=e,""}),n||(n=x.Values.getUnitType(e)),[i,n]}function v(){var e={myParent:o.parentNode||n.body,position:x.getPropertyValue(o,"position"),fontSize:x.getPropertyValue(o,"fontSize")},i=e.position===F.lastPosition&&e.myParent===F.lastParent,r=e.fontSize===F.lastFontSize;F.lastParent=e.myParent,F.lastPosition=e.position,F.lastFontSize=e.fontSize;var a=100,l={};if(r&&i)l.emToPx=F.lastEmToPx,l.percentToPxWidth=F.lastPercentToPxWidth,l.percentToPxHeight=F.lastPercentToPxHeight;else{var u=s(o).isSVG?n.createElementNS("http://www.w3.org/2000/svg","rect"):n.createElement("div");w.init(u),e.myParent.appendChild(u),p.each(["overflow","overflowX","overflowY"],function(e,t){w.CSS.setPropertyValue(u,t,"hidden")}),w.CSS.setPropertyValue(u,"position",e.position),w.CSS.setPropertyValue(u,"fontSize",e.fontSize),w.CSS.setPropertyValue(u,"boxSizing","content-box"),p.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){w.CSS.setPropertyValue(u,t,a+"%")}),w.CSS.setPropertyValue(u,"paddingLeft",a+"em"),l.percentToPxWidth=F.lastPercentToPxWidth=(parseFloat(x.getPropertyValue(u,"width",null,!0))||1)/a,l.percentToPxHeight=F.lastPercentToPxHeight=(parseFloat(x.getPropertyValue(u,"height",null,!0))||1)/a,l.emToPx=F.lastEmToPx=(parseFloat(x.getPropertyValue(u,"paddingLeft"))||1)/a,e.myParent.removeChild(u)}return null===F.remToPx&&(F.remToPx=parseFloat(x.getPropertyValue(n.body,"fontSize"))||16),null===F.vwToPx&&(F.vwToPx=parseFloat(t.innerWidth)/100,F.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=F.remToPx,l.vwToPx=F.vwToPx,l.vhToPx=F.vhToPx,w.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),o),l}if(a.begin&&0===C)try{a.begin.call(h,h)}catch(b){setTimeout(function(){throw b},1)}if("scroll"===O){var S,T,_,D=/^x$/i.test(a.axis)?"Left":"Top",P=parseFloat(a.offset)||0;a.container?g.isWrapped(a.container)||g.isNode(a.container)?(a.container=a.container[0]||a.container,S=a.container["scroll"+D],_=S+p(o).position()[D.toLowerCase()]+P):a.container=null:(S=w.State.scrollAnchor[w.State["scrollProperty"+D]],T=w.State.scrollAnchor[w.State["scrollProperty"+("Left"===D?"Top":"Left")]],_=p(o).offset()[D.toLowerCase()]+P),l={scroll:{rootPropertyValue:!1,startValue:S,currentValue:S,endValue:_,unitType:"",easing:a.easing,scrollData:{container:a.container,direction:D,alternateValue:T}},element:o},w.debug&&console.log("tweensContainer (scroll): ",l.scroll,o)}else if("reverse"===O){if(!s(o).tweensContainer)return void p.dequeue(o,a.queue);"none"===s(o).opts.display&&(s(o).opts.display="auto"),"hidden"===s(o).opts.visibility&&(s(o).opts.visibility="visible"),s(o).opts.loop=!1,s(o).opts.begin=null,s(o).opts.complete=null,y.easing||delete a.easing,y.duration||delete a.duration,a=p.extend({},s(o).opts,a);var A=p.extend(!0,{},s(o).tweensContainer);for(var M in A)if("element"!==M){var N=A[M].startValue;A[M].startValue=A[M].currentValue=A[M].endValue,A[M].endValue=N,g.isEmptyObject(y)||(A[M].easing=a.easing),w.debug&&console.log("reverse tweensContainer ("+M+"): "+JSON.stringify(A[M]),o)}l=A}else if("start"===O){var A;s(o).tweensContainer&&s(o).isAnimating===!0&&(A=s(o).tweensContainer),p.each(m,function(e,t){if(RegExp("^"+x.Lists.colors.join("$|^")+"$").test(e)){var n=d(t,!0),r=n[0],o=n[1],s=n[2];if(x.RegEx.isHex.test(r)){for(var a=["Red","Green","Blue"],l=x.Values.hexToRgb(r),u=s?x.Values.hexToRgb(s):i,c=0;c<a.length;c++){var p=[l[c]];o&&p.push(o),u!==i&&p.push(u[c]),m[e+a[c]]=p}delete m[e]}}});for(var L in m){var j=d(m[L]),Y=j[0],$=j[1],z=j[2];L=x.Names.camelCase(L);var H=x.Hooks.getRoot(L),q=!1;if(s(o).isSVG||"tween"===H||x.Names.prefixCheck(H)[1]!==!1||x.Normalizations.registered[H]!==i){(a.display!==i&&null!==a.display&&"none"!==a.display||a.visibility!==i&&"hidden"!==a.visibility)&&/opacity|filter/.test(L)&&!z&&0!==Y&&(z=0),a._cacheValues&&A&&A[L]?(z===i&&(z=A[L].endValue+A[L].unitType),q=s(o).rootPropertyValueCache[H]):x.Hooks.registered[L]?z===i?(q=x.getPropertyValue(o,H),z=x.getPropertyValue(o,L,q)):q=x.Hooks.templates[H][1]:z===i&&(z=x.getPropertyValue(o,L));var W,R,V,X=!1;if(W=f(L,z),z=W[0],V=W[1],W=f(L,Y),Y=W[0].replace(/^([+-\/*])=/,function(e,t){return X=t,""}),R=W[1],z=parseFloat(z)||0,Y=parseFloat(Y)||0,"%"===R&&(/^(fontSize|lineHeight)$/.test(L)?(Y/=100,R="em"):/^scale/.test(L)?(Y/=100,R=""):/(Red|Green|Blue)$/i.test(L)&&(Y=Y/100*255,R="")),/[\/*]/.test(X))R=V;else if(V!==R&&0!==z)if(0===Y)R=V;else{r=r||v();var B=/margin|padding|left|right|width|text|word|letter/i.test(L)||/X$/.test(L)||"x"===L?"x":"y";switch(V){case"%":z*="x"===B?r.percentToPxWidth:r.percentToPxHeight;break;case"px":break;default:z*=r[V+"ToPx"]}switch(R){case"%":z*=1/("x"===B?r.percentToPxWidth:r.percentToPxHeight);break;case"px":break;default:z*=1/r[R+"ToPx"]}}switch(X){case"+":Y=z+Y;break;case"-":Y=z-Y;break;case"*":Y=z*Y;break;case"/":Y=z/Y}l[L]={rootPropertyValue:q,startValue:z,currentValue:z,endValue:Y,unitType:R,easing:$},w.debug&&console.log("tweensContainer ("+L+"): "+JSON.stringify(l[L]),o)}else w.debug&&console.log("Skipping ["+H+"] due to a lack of browser support.")}l.element=o}l.element&&(x.Values.addClass(o,"velocity-animating"),I.push(l),""===a.queue&&(s(o).tweensContainer=l,s(o).opts=a),s(o).isAnimating=!0,C===k-1?(w.State.calls.push([I,h,a,null,E.resolver]),w.State.isTicking===!1&&(w.State.isTicking=!0,c())):C++)}var r,o=this,a=p.extend({},w.defaults,y),l={};switch(s(o)===i&&w.init(o),parseFloat(a.delay)&&a.queue!==!1&&p.queue(o,a.queue,function(e){w.velocityQueueEntryFlag=!0,
s(o).delayTimer={setTimeout:setTimeout(e,parseFloat(a.delay)),next:e}}),a.duration.toString().toLowerCase()){case"fast":a.duration=200;break;case"normal":a.duration=v;break;case"slow":a.duration=600;break;default:a.duration=parseFloat(a.duration)||1}w.mock!==!1&&(w.mock===!0?a.duration=a.delay=1:(a.duration*=parseFloat(w.mock)||1,a.delay*=parseFloat(w.mock)||1)),a.easing=u(a.easing,a.duration),a.begin&&!g.isFunction(a.begin)&&(a.begin=null),a.progress&&!g.isFunction(a.progress)&&(a.progress=null),a.complete&&!g.isFunction(a.complete)&&(a.complete=null),a.display!==i&&null!==a.display&&(a.display=a.display.toString().toLowerCase(),"auto"===a.display&&(a.display=w.CSS.Values.getDisplayType(o))),a.visibility!==i&&null!==a.visibility&&(a.visibility=a.visibility.toString().toLowerCase()),a.mobileHA=a.mobileHA&&w.State.isMobile&&!w.State.isGingerbread,a.queue===!1?a.delay?setTimeout(e,a.delay):e():p.queue(o,a.queue,function(t,n){return n===!0?(E.promise&&E.resolver(h),!0):(w.velocityQueueEntryFlag=!0,void e(t))}),""!==a.queue&&"fx"!==a.queue||"inprogress"===p.queue(o)[0]||p.dequeue(o)}var a,l,f,h,m,y,b=arguments[0]&&(arguments[0].p||p.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||g.isString(arguments[0].properties));if(g.isWrapped(this)?(a=!1,f=0,h=this,l=this):(a=!0,f=1,h=b?arguments[0].elements||arguments[0].e:arguments[0]),h=o(h)){b?(m=arguments[0].properties||arguments[0].p,y=arguments[0].options||arguments[0].o):(m=arguments[f],y=arguments[f+1]);var k=h.length,C=0;if(!/^(stop|finish|finishAll)$/i.test(m)&&!p.isPlainObject(y)){var T=f+1;y={};for(var _=T;_<arguments.length;_++)g.isArray(arguments[_])||!/^(fast|normal|slow)$/i.test(arguments[_])&&!/^\d/.test(arguments[_])?g.isString(arguments[_])||g.isArray(arguments[_])?y.easing=arguments[_]:g.isFunction(arguments[_])&&(y.complete=arguments[_]):y.duration=arguments[_]}var E={promise:null,resolver:null,rejecter:null};a&&w.Promise&&(E.promise=new w.Promise(function(e,t){E.resolver=e,E.rejecter=t}));var O;switch(m){case"scroll":O="scroll";break;case"reverse":O="reverse";break;case"finish":case"finishAll":case"stop":p.each(h,function(e,t){s(t)&&s(t).delayTimer&&(clearTimeout(s(t).delayTimer.setTimeout),s(t).delayTimer.next&&s(t).delayTimer.next(),delete s(t).delayTimer),"finishAll"!==m||y!==!0&&!g.isString(y)||(p.each(p.queue(t,g.isString(y)?y:""),function(e,t){g.isFunction(t)&&t()}),p.queue(t,g.isString(y)?y:"",[]))});var D=[];return p.each(w.State.calls,function(e,t){t&&p.each(t[1],function(n,r){var o=y===i?"":y;return o===!0||t[2].queue===o||y===i&&t[2].queue===!1?void p.each(h,function(n,i){i===r&&((y===!0||g.isString(y))&&(p.each(p.queue(i,g.isString(y)?y:""),function(e,t){g.isFunction(t)&&t(null,!0)}),p.queue(i,g.isString(y)?y:"",[])),"stop"===m?(s(i)&&s(i).tweensContainer&&o!==!1&&p.each(s(i).tweensContainer,function(e,t){t.endValue=t.currentValue}),D.push(e)):("finish"===m||"finishAll"===m)&&(t[2].duration=1))}):!0})}),"stop"===m&&(p.each(D,function(e,t){d(t,!0)}),E.promise&&E.resolver(h)),e();default:if(!p.isPlainObject(m)||g.isEmptyObject(m)){if(g.isString(m)&&w.Redirects[m]){var P=p.extend({},y),A=P.duration,M=P.delay||0;return P.backwards===!0&&(h=p.extend(!0,[],h).reverse()),p.each(h,function(e,t){parseFloat(P.stagger)?P.delay=M+parseFloat(P.stagger)*e:g.isFunction(P.stagger)&&(P.delay=M+P.stagger.call(t,e,k)),P.drag&&(P.duration=parseFloat(A)||(/^(callout|transition)/.test(m)?1e3:v),P.duration=Math.max(P.duration*(P.backwards?1-e/k:(e+1)/k),.75*P.duration,200)),w.Redirects[m].call(t,t,P||{},e,k,h,E.promise?E:i)}),e()}var N="Velocity: First argument ("+m+") was not a property map, a known action, or a registered redirect. Aborting.";return E.promise?E.rejecter(new Error(N)):console.log(N),e()}O="start"}var F={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},I=[];p.each(h,function(e,t){g.isNode(t)&&r.call(t)});var L,P=p.extend({},w.defaults,y);if(P.loop=parseInt(P.loop),L=2*P.loop-1,P.loop)for(var j=0;L>j;j++){var Y={delay:P.delay,progress:P.progress};j===L-1&&(Y.display=P.display,Y.visibility=P.visibility,Y.complete=P.complete),S(h,"reverse",Y)}return e()}};w=p.extend(S,w),w.animate=S;var k=t.requestAnimationFrame||h;return w.State.isMobile||n.hidden===i||n.addEventListener("visibilitychange",function(){n.hidden?(k=function(e){return setTimeout(function(){e(!0)},16)},c()):k=t.requestAnimationFrame||h}),e.Velocity=w,e!==t&&(e.fn.velocity=S,e.fn.velocity.defaults=w.defaults),p.each(["Down","Up"],function(e,t){w.Redirects["slide"+t]=function(e,n,r,o,s,a){var l=p.extend({},n),u=l.begin,c=l.complete,d={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},f={};l.display===i&&(l.display="Down"===t?"inline"===w.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){u&&u.call(s,s);for(var n in d){f[n]=e.style[n];var i=w.CSS.getPropertyValue(e,n);d[n]="Down"===t?[i,0]:[0,i]}f.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in f)e.style[t]=f[t];c&&c.call(s,s),a&&a.resolver(s)},w(e,d,l)}}),p.each(["In","Out"],function(e,t){w.Redirects["fade"+t]=function(e,n,r,o,s,a){var l=p.extend({},n),u={opacity:"In"===t?1:0},c=l.complete;r!==o-1?l.complete=l.begin=null:l.complete=function(){c&&c.call(s,s),a&&a.resolver(s)},l.display===i&&(l.display="In"===t?"auto":"none"),w(this,u,l)}}),w}(window.jQuery||window.Zepto||window,window,document)}),function(e){"function"==typeof require&&"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(["velocity"],e):e()}(function(){return function(e,t,n,i){function r(e,t){var n=[];return e&&t?(s.each([e,t],function(e,t){var i=[];s.each(t,function(e,t){for(;t.toString().length<5;)t="0"+t;i.push(t)}),n.push(i.join(""))}),parseFloat(n[0])>parseFloat(n[1])):!1}if(!e.Velocity||!e.Velocity.Utilities)return void(t.console&&console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));var o=e.Velocity,s=o.Utilities,a=o.version,l={major:1,minor:1,patch:0};if(r(l,a)){var u="Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";throw alert(u),new Error(u)}o.RegisterEffect=o.RegisterUI=function(e,t){function n(e,t,n,i){var r,a=0;s.each(e.nodeType?[e]:e,function(e,t){i&&(n+=e*i),r=t.parentNode,s.each(["height","paddingTop","paddingBottom","marginTop","marginBottom"],function(e,n){a+=parseFloat(o.CSS.getPropertyValue(t,n))})}),o.animate(r,{height:("In"===t?"+":"-")+"="+a},{queue:!1,easing:"ease-in-out",duration:n*("In"===t?.6:1)})}return o.Redirects[e]=function(r,a,l,u,c,d){function p(){a.display!==i&&"none"!==a.display||!/Out$/.test(e)||s.each(c.nodeType?[c]:c,function(e,t){o.CSS.setPropertyValue(t,"display","none")}),a.complete&&a.complete.call(c,c),d&&d.resolver(c||r)}var f=l===u-1;"function"==typeof t.defaultDuration?t.defaultDuration=t.defaultDuration.call(c,c):t.defaultDuration=parseFloat(t.defaultDuration);for(var h=0;h<t.calls.length;h++){var g=t.calls[h],m=g[0],v=a.duration||t.defaultDuration||1e3,y=g[1],w=g[2]||{},b={};if(b.duration=v*(y||1),b.queue=a.queue||"",b.easing=w.easing||"ease",b.delay=parseFloat(w.delay)||0,b._cacheValues=w._cacheValues||!0,0===h){if(b.delay+=parseFloat(a.delay)||0,0===l&&(b.begin=function(){a.begin&&a.begin.call(c,c);var t=e.match(/(In|Out)$/);t&&"In"===t[0]&&m.opacity!==i&&s.each(c.nodeType?[c]:c,function(e,t){o.CSS.setPropertyValue(t,"opacity",0)}),a.animateParentHeight&&t&&n(c,t[0],v+b.delay,a.stagger)}),null!==a.display)if(a.display!==i&&"none"!==a.display)b.display=a.display;else if(/In$/.test(e)){var x=o.CSS.Values.getDisplayType(r);b.display="inline"===x?"inline-block":x}a.visibility&&"hidden"!==a.visibility&&(b.visibility=a.visibility)}h===t.calls.length-1&&(b.complete=function(){if(t.reset){for(var e in t.reset){var n=t.reset[e];o.CSS.Hooks.registered[e]!==i||"string"!=typeof n&&"number"!=typeof n||(t.reset[e]=[t.reset[e],t.reset[e]])}var s={duration:0,queue:!1};f&&(s.complete=p),o.animate(r,t.reset,s)}else f&&p()},"hidden"===a.visibility&&(b.visibility=a.visibility)),o.animate(r,m,b)}},o},o.RegisterEffect.packagedEffects={"callout.bounce":{defaultDuration:550,calls:[[{translateY:-30},.25],[{translateY:0},.125],[{translateY:-15},.125],[{translateY:0},.25]]},"callout.shake":{defaultDuration:800,calls:[[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:0},.125]]},"callout.flash":{defaultDuration:1100,calls:[[{opacity:[0,"easeInOutQuad",1]},.25],[{opacity:[1,"easeInOutQuad"]},.25],[{opacity:[0,"easeInOutQuad"]},.25],[{opacity:[1,"easeInOutQuad"]},.25]]},"callout.pulse":{defaultDuration:825,calls:[[{scaleX:1.1,scaleY:1.1},.5,{easing:"easeInExpo"}],[{scaleX:1,scaleY:1},.5]]},"callout.swing":{defaultDuration:950,calls:[[{rotateZ:15},.2],[{rotateZ:-10},.2],[{rotateZ:5},.2],[{rotateZ:-5},.2],[{rotateZ:0},.2]]},"callout.tada":{defaultDuration:1e3,calls:[[{scaleX:.9,scaleY:.9,rotateZ:-3},.1],[{scaleX:1.1,scaleY:1.1,rotateZ:3},.1],[{scaleX:1.1,scaleY:1.1,rotateZ:-3},.1],["reverse",.125],["reverse",.125],["reverse",.125],["reverse",.125],["reverse",.125],[{scaleX:1,scaleY:1,rotateZ:0},.2]]},"transition.fadeIn":{defaultDuration:500,calls:[[{opacity:[1,0]}]]},"transition.fadeOut":{defaultDuration:500,calls:[[{opacity:[0,1]}]]},"transition.flipXIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateY:[0,-55]}]],reset:{transformPerspective:0}},"transition.flipXOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateY:55}]],reset:{transformPerspective:0,rotateY:0}},"transition.flipYIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateX:[0,-45]}]],reset:{transformPerspective:0}},"transition.flipYOut":{defaultDuration:800,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateX:25}]],reset:{transformPerspective:0,rotateX:0}},"transition.flipBounceXIn":{defaultDuration:900,calls:[[{opacity:[.725,0],transformPerspective:[400,400],rotateY:[-10,90]},.5],[{opacity:.8,rotateY:10},.25],[{opacity:1,rotateY:0},.25]],reset:{transformPerspective:0}},"transition.flipBounceXOut":{defaultDuration:800,calls:[[{opacity:[.9,1],transformPerspective:[400,400],rotateY:-10},.5],[{opacity:0,rotateY:90},.5]],reset:{transformPerspective:0,rotateY:0}},"transition.flipBounceYIn":{defaultDuration:850,calls:[[{opacity:[.725,0],transformPerspective:[400,400],rotateX:[-10,90]},.5],[{opacity:.8,rotateX:10},.25],[{opacity:1,rotateX:0},.25]],reset:{transformPerspective:0}},"transition.flipBounceYOut":{defaultDuration:800,calls:[[{opacity:[.9,1],transformPerspective:[400,400],rotateX:-15},.5],[{opacity:0,rotateX:90},.5]],reset:{transformPerspective:0,rotateX:0}},"transition.swoopIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["100%","50%"],transformOriginY:["100%","100%"],scaleX:[1,0],scaleY:[1,0],translateX:[0,-700],translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%"}},"transition.swoopOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformOriginX:["50%","100%"],transformOriginY:["100%","100%"],scaleX:0,scaleY:0,translateX:-700,translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%",scaleX:1,scaleY:1,translateX:0}},"transition.whirlIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,0],scaleY:[1,0],rotateY:[0,160]},1,{easing:"easeInOutSine"}]]},"transition.whirlOut":{defaultDuration:750,calls:[[{opacity:[0,"easeInOutQuint",1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:0,scaleY:0,rotateY:160},1,{easing:"swing"}]],reset:{scaleX:1,scaleY:1,rotateY:0}},"transition.shrinkIn":{defaultDuration:750,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,1.5],scaleY:[1,1.5],translateZ:0}]]},"transition.shrinkOut":{defaultDuration:600,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:1.3,scaleY:1.3,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.expandIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,.625],scaleY:[1,.625],translateZ:0}]]},"transition.expandOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:.5,scaleY:.5,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.bounceIn":{defaultDuration:800,calls:[[{opacity:[1,0],scaleX:[1.05,.3],scaleY:[1.05,.3]},.4],[{scaleX:.9,scaleY:.9,translateZ:0},.2],[{scaleX:1,scaleY:1},.5]]},"transition.bounceOut":{defaultDuration:800,calls:[[{scaleX:.95,scaleY:.95},.35],[{scaleX:1.1,scaleY:1.1,translateZ:0},.35],[{opacity:[0,1],scaleX:.3,scaleY:.3},.3]],reset:{scaleX:1,scaleY:1}},"transition.bounceUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[-30,1e3]},.6,{easing:"easeOutCirc"}],[{translateY:10},.2],[{translateY:0},.2]]},"transition.bounceUpOut":{defaultDuration:1e3,calls:[[{translateY:20},.2],[{opacity:[0,"easeInCirc",1],translateY:-1e3},.8]],reset:{translateY:0}},"transition.bounceDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[30,-1e3]},.6,{easing:"easeOutCirc"}],[{translateY:-10},.2],[{translateY:0},.2]]},"transition.bounceDownOut":{defaultDuration:1e3,calls:[[{translateY:-20},.2],[{opacity:[0,"easeInCirc",1],translateY:1e3},.8]],reset:{translateY:0}},"transition.bounceLeftIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[30,-1250]},.6,{easing:"easeOutCirc"}],[{translateX:-10},.2],[{translateX:0},.2]]},"transition.bounceLeftOut":{defaultDuration:750,calls:[[{translateX:30},.2],[{opacity:[0,"easeInCirc",1],translateX:-1250},.8]],reset:{translateX:0}},"transition.bounceRightIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[-30,1250]},.6,{easing:"easeOutCirc"}],[{translateX:10},.2],[{translateX:0},.2]]},"transition.bounceRightOut":{defaultDuration:750,calls:[[{translateX:-30},.2],[{opacity:[0,"easeInCirc",1],translateX:1250},.8]],reset:{translateX:0}},"transition.slideUpIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,20],translateZ:0}]]},"transition.slideUpOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:-20,translateZ:0}]],reset:{translateY:0}},"transition.slideDownIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,-20],translateZ:0}]]},"transition.slideDownOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:20,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftIn":{defaultDuration:1e3,calls:[[{opacity:[1,0],translateX:[0,-20],translateZ:0}]]},"transition.slideLeftOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:-20,translateZ:0}]],reset:{translateX:0}},"transition.slideRightIn":{defaultDuration:1e3,calls:[[{opacity:[1,0],translateX:[0,20],translateZ:0}]]},"transition.slideRightOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:20,translateZ:0}]],reset:{translateX:0}},"transition.slideUpBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,75],translateZ:0}]]},"transition.slideUpBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:-75,translateZ:0}]],reset:{translateY:0}},"transition.slideDownBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,-75],translateZ:0}]]},"transition.slideDownBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:75,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,-75],translateZ:0}]]},"transition.slideLeftBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:-75,translateZ:0}]],reset:{translateX:0}},"transition.slideRightBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,75],translateZ:0}]]},"transition.slideRightBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:75,translateZ:0}]],reset:{translateX:0}},"transition.perspectiveUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveUpOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},"transition.perspectiveDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveDownOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},"transition.perspectiveLeftIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2e3,2e3],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveLeftOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2e3,2e3],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}},"transition.perspectiveRightIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2e3,2e3],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveRightOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2e3,2e3],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}}};for(var c in o.RegisterEffect.packagedEffects)o.RegisterEffect(c,o.RegisterEffect.packagedEffects[c]);o.RunSequence=function(e){var t=s.extend(!0,[],e);t.length>1&&(s.each(t.reverse(),function(e,n){var i=t[e+1];if(i){var r=n.o||n.options,a=i.o||i.options,l=r&&r.sequenceQueue===!1?"begin":"complete",u=a&&a[l],c={};c[l]=function(){var e=i.e||i.elements,t=e.nodeType?[e]:e;u&&u.call(t,t),o(n)},i.o?i.o=s.extend({},a,c):i.options=s.extend({},a,c)}}),t.reverse()),o(t[0])}}(window.jQuery||window.Zepto||window,window,document)}),function(e,t){function n(e,t,n){var i=e.children(),r=!1;e.empty();for(var s=0,a=i.length;a>s;s++){var l=i.eq(s);if(e.append(l),n&&e.append(n),o(e,t)){l.remove(),r=!0;break}n&&n.detach()}return r}function i(t,n,s,a,l){var u=!1,c="a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",d="script, .dotdotdot-keep";return t.contents().detach().each(function(){var p=this,f=e(p);if("undefined"==typeof p)return!0;if(f.is(d))t.append(f);else{if(u)return!0;t.append(f),!l||f.is(a.after)||f.find(a.after).length||t[t.is(c)?"after":"append"](l),o(s,a)&&(u=3==p.nodeType?r(f,n,s,a,l):i(f,n,s,a,l),u||(f.detach(),u=!0)),u||l&&l.detach()}}),n.addClass("is-truncated"),u}function r(t,n,i,r,a){var c=t[0];if(!c)return!1;var p=u(c),f=-1!==p.indexOf(" ")?" ":"　",h="letter"==r.wrap?"":f,g=p.split(h),m=-1,v=-1,y=0,w=g.length-1;for(r.fallbackToLetter&&0==y&&0==w&&(h="",g=p.split(h),w=g.length-1);w>=y&&(0!=y||0!=w);){var b=Math.floor((y+w)/2);if(b==v)break;v=b,l(c,g.slice(0,v+1).join(h)+r.ellipsis),i.children().each(function(){e(this).toggle().toggle()}),o(i,r)?(w=v,r.fallbackToLetter&&0==y&&0==w&&(h="",g=g[0].split(h),m=-1,v=-1,y=0,w=g.length-1)):(m=v,y=v)}if(-1==m||1==g.length&&0==g[0].length){var x=t.parent();t.detach();var S=a&&a.closest(x).length?a.length:0;x.contents().length>S?c=d(x.contents().eq(-1-S),n):(c=d(x,n,!0),S||x.detach()),c&&(p=s(u(c),r),l(c,p),S&&a&&e(c).parent().append(a))}else p=s(g.slice(0,m+1).join(h),r),l(c,p);return!0}function o(e,t){return e.innerHeight()>t.maxHeight}function s(t,n){for(;e.inArray(t.slice(-1),n.lastCharacter.remove)>-1;)t=t.slice(0,-1);return e.inArray(t.slice(-1),n.lastCharacter.noEllipsis)<0&&(t+=n.ellipsis),t}function a(e){return{width:e.innerWidth(),height:e.innerHeight()}}function l(e,t){e.innerText?e.innerText=t:e.nodeValue?e.nodeValue=t:e.textContent&&(e.textContent=t)}function u(e){return e.innerText?e.innerText:e.nodeValue?e.nodeValue:e.textContent?e.textContent:""}function c(e){do e=e.previousSibling;while(e&&1!==e.nodeType&&3!==e.nodeType);return e}function d(t,n,i){var r,o=t&&t[0];if(o){if(!i){if(3===o.nodeType)return o;if(e.trim(t.text()))return d(t.contents().last(),n)}for(r=c(o);!r;){if(t=t.parent(),t.is(n)||!t.length)return!1;r=c(t[0])}if(r)return d(e(r),n)}return!1}function p(t,n){return t?"string"==typeof t?(t=e(t,n),t.length?t:!1):t.jquery?t:!1:!1}function f(e){for(var t=e.innerHeight(),n=["paddingTop","paddingBottom"],i=0,r=n.length;r>i;i++){var o=parseInt(e.css(n[i]),10);isNaN(o)&&(o=0),t-=o}return t}if(!e.fn.dotdotdot){e.fn.dotdotdot=function(t){if(0==this.length)return e.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){e(this).dotdotdot(t)});var r=this;r.data("dotdotdot")&&r.trigger("destroy.dot"),r.data("dotdotdot-style",r.attr("style")||""),r.css("word-wrap","break-word"),"nowrap"===r.css("white-space")&&r.css("white-space","normal"),r.bind_events=function(){return r.bind("update.dot",function(t,a){switch(r.removeClass("is-truncated"),t.preventDefault(),t.stopPropagation(),typeof l.height){case"number":l.maxHeight=l.height;break;case"function":l.maxHeight=l.height.call(r[0]);break;default:l.maxHeight=f(r)}l.maxHeight+=l.tolerance,"undefined"!=typeof a&&(("string"==typeof a||"nodeType"in a&&1===a.nodeType)&&(a=e("<div />").append(a).contents()),a instanceof e&&(s=a)),g=r.wrapInner('<div class="dotdotdot" />').children(),g.contents().detach().end().append(s.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var c=!1,d=!1;return u.afterElement&&(c=u.afterElement.clone(!0),c.show(),u.afterElement.detach()),o(g,l)&&(d="children"==l.wrap?n(g,l,c):i(g,r,g,l,c)),g.replaceWith(g.contents()),g=null,e.isFunction(l.callback)&&l.callback.call(r[0],d,s),u.isTruncated=d,d}).bind("isTruncated.dot",function(e,t){return e.preventDefault(),e.stopPropagation(),"function"==typeof t&&t.call(r[0],u.isTruncated),u.isTruncated}).bind("originalContent.dot",function(e,t){return e.preventDefault(),e.stopPropagation(),"function"==typeof t&&t.call(r[0],s),s}).bind("destroy.dot",function(e){e.preventDefault(),e.stopPropagation(),r.unwatch().unbind_events().contents().detach().end().append(s).attr("style",r.data("dotdotdot-style")||"").data("dotdotdot",!1)}),r},r.unbind_events=function(){return r.unbind(".dot"),r},r.watch=function(){if(r.unwatch(),"window"==l.watch){var t=e(window),n=t.width(),i=t.height();t.bind("resize.dot"+u.dotId,function(){n==t.width()&&i==t.height()&&l.windowResizeFix||(n=t.width(),i=t.height(),d&&clearInterval(d),d=setTimeout(function(){r.trigger("update.dot")},100))})}else c=a(r),d=setInterval(function(){if(r.is(":visible")){var e=a(r);(c.width!=e.width||c.height!=e.height)&&(r.trigger("update.dot"),c=e)}},500);return r},r.unwatch=function(){return e(window).unbind("resize.dot"+u.dotId),d&&clearInterval(d),r};var s=r.contents(),l=e.extend(!0,{},e.fn.dotdotdot.defaults,t),u={},c={},d=null,g=null;return l.lastCharacter.remove instanceof Array||(l.lastCharacter.remove=e.fn.dotdotdot.defaultArrays.lastCharacter.remove),l.lastCharacter.noEllipsis instanceof Array||(l.lastCharacter.noEllipsis=e.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),u.afterElement=p(l.after,r),u.isTruncated=!1,u.dotId=h++,r.data("dotdotdot",!0).bind_events().trigger("update.dot"),l.watch&&r.watch(),r},e.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0},e.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","　",",",";",".","!","?"],noEllipsis:[]}},e.fn.dotdotdot.debug=function(e){};var h=1,g=e.fn.html;e.fn.html=function(n){return n!=t&&!e.isFunction(n)&&this.data("dotdotdot")?this.trigger("update",[n]):g.apply(this,arguments)};var m=e.fn.text;e.fn.text=function(n){return n!=t&&!e.isFunction(n)&&this.data("dotdotdot")?(n=e("<div />").text(n).html(),this.trigger("update",[n])):m.apply(this,arguments)}}}(jQuery),function(e){function t(e,t,r){var o=e[0],s=/er/.test(r)?_indeterminate:/bl/.test(r)?h:p,a=r==_update?{checked:o[p],disabled:o[h],indeterminate:"true"==e.attr(_indeterminate)||"false"==e.attr(_determinate)}:o[s];if(/^(ch|di|in)/.test(r)&&!a)n(e,s);else if(/^(un|en|de)/.test(r)&&a)i(e,s);else if(r==_update)for(var l in a)a[l]?n(e,l,!0):i(e,l,!0);else t&&"toggle"!=r||(t||e[_callback]("ifClicked"),a?o[_type]!==d&&i(e,s):n(e,s))}function n(t,n,r){var c=t[0],g=t.parent(),m=n==p,v=n==_indeterminate,y=n==h,w=v?_determinate:m?f:"enabled",b=o(t,w+s(c[_type])),x=o(t,n+s(c[_type]));if(c[n]!==!0){if(!r&&n==p&&c[_type]==d&&c.name){var S=t.closest("form"),k='input[name="'+c.name+'"]';k=S.length?S.find(k):e(k),k.each(function(){this!==c&&e(this).data(l)&&i(e(this),n)})}v?(c[n]=!0,c[p]&&i(t,p,"force")):(r||(c[n]=!0),m&&c[_indeterminate]&&i(t,_indeterminate,!1)),a(t,m,n,r)}c[h]&&o(t,_cursor,!0)&&g.find("."+u).css(_cursor,"default"),g[_add](x||o(t,n)||""),g.attr("role")&&!v&&g.attr("aria-"+(y?h:p),"true"),g[_remove](b||o(t,w)||"")}function i(e,t,n){var i=e[0],r=e.parent(),l=t==p,c=t==_indeterminate,d=t==h,g=c?_determinate:l?f:"enabled",m=o(e,g+s(i[_type])),v=o(e,t+s(i[_type]));i[t]!==!1&&((c||!n||"force"==n)&&(i[t]=!1),a(e,l,g,n)),!i[h]&&o(e,_cursor,!0)&&r.find("."+u).css(_cursor,"pointer"),r[_remove](v||o(e,t)||""),r.attr("role")&&!c&&r.attr("aria-"+(d?h:p),"false"),r[_add](m||o(e,g)||"")}function r(t,n){t.data(l)&&(t.parent().html(t.attr("style",t.data(l).s||"")),n&&t[_callback](n),t.off(".i").unwrap(),e(_label+'[for="'+t[0].id+'"]').add(t.closest(_label)).off(".i"))}function o(e,t,n){return e.data(l)?e.data(l).o[t+(n?"":"Class")]:void 0}function s(e){return e.charAt(0).toUpperCase()+e.slice(1)}function a(e,t,n,i){i||(t&&e[_callback]("ifToggled"),e[_callback]("ifChanged")[_callback]("if"+s(n)))}var l="iCheck",u=l+"-helper",c="checkbox",d="radio",p="checked",f="un"+p,h="disabled";_determinate="determinate",_indeterminate="in"+_determinate,_update="update",_type="type",_click="click",_touch="touchbegin.i touchend.i",_add="addClass",_remove="removeClass",_callback="trigger",_label="label",_cursor="cursor",_mobile=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent),e.fn[l]=function(o,s){var a='input[type="'+c+'"], input[type="'+d+'"]',f=e(),g=function(t){t.each(function(){var t=e(this);f=t.is(a)?f.add(t):f.add(t.find(a))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(o))return o=o.toLowerCase(),g(this),f.each(function(){var n=e(this);"destroy"==o?r(n,"ifDestroyed"):t(n,!0,o),e.isFunction(s)&&s()});if("object"!=typeof o&&o)return this;var m=e.extend({checkedClass:p,disabledClass:h,indeterminateClass:_indeterminate,labelHover:!0},o),v=m.handle,y=m.hoverClass||"hover",w=m.focusClass||"focus",b=m.activeClass||"active",x=!!m.labelHover,S=m.labelHoverClass||"hover",k=0|(""+m.increaseArea).replace("%","");return(v==c||v==d)&&(a='input[type="'+v+'"]'),-50>k&&(k=-50),g(this),f.each(function(){var o=e(this);r(o);var s,a=this,f=a.id,g=-k+"%",v=100+2*k+"%",C={position:"absolute",top:g,left:g,display:"block",width:v,height:v,margin:0,padding:0,background:"#fff",border:0,opacity:0},T=_mobile?{position:"absolute",visibility:"hidden"}:k?C:{position:"absolute",opacity:0},_=a[_type]==c?m.checkboxClass||"i"+c:m.radioClass||"i"+d,E=e(_label+'[for="'+f+'"]').add(o.closest(_label)),O=!!m.aria,D=l+"-"+Math.random().toString(36).substr(2,6),P='<div class="'+_+'" '+(O?'role="'+a[_type]+'" ':"");O&&E.each(function(){P+='aria-labelledby="',this.id?P+=this.id:(this.id=D,P+=D),P+='"'}),P=o.wrap(P+"/>")[_callback]("ifCreated").parent().append(m.insert),s=e('<ins class="'+u+'"/>').css(C).appendTo(P),o.data(l,{o:m,s:o.attr("style")}).css(T),!!m.inheritClass&&P[_add](a.className||""),!!m.inheritID&&f&&P.attr("id",l+"-"+f),"static"==P.css("position")&&P.css("position","relative"),t(o,!0,_update),E.length&&E.on(_click+".i mouseover.i mouseout.i "+_touch,function(n){var i=n[_type],r=e(this);if(!a[h]){if(i==_click){if(e(n.target).is("a"))return;t(o,!1,!0)}else x&&(/ut|nd/.test(i)?(P[_remove](y),r[_remove](S)):(P[_add](y),r[_add](S)));if(!_mobile)return!1;n.stopPropagation()}}),o.on(_click+".i focus.i blur.i keyup.i keydown.i keypress.i",function(e){var t=e[_type],r=e.keyCode;return t==_click?!1:"keydown"==t&&32==r?(a[_type]==d&&a[p]||(a[p]?i(o,p):n(o,p)),!1):void("keyup"==t&&a[_type]==d?!a[p]&&n(o,p):/us|ur/.test(t)&&P["blur"==t?_remove:_add](w))}),s.on(_click+" mousedown mouseup mouseover mouseout "+_touch,function(e){var n=e[_type],i=/wn|up/.test(n)?b:y;if(!a[h]){if(n==_click?t(o,!1,!0):(/wn|er|in/.test(n)?P[_add](i):P[_remove](i+" "+b),E.length&&x&&i==y&&E[/ut|nd/.test(n)?_remove:_add](S)),!_mobile)return!1;e.stopPropagation()}})})}}(window.jQuery||window.Zepto),function(e,t){"function"==typeof define&&define.amd?define("sifter",t):"object"==typeof exports?module.exports=t():e.Sifter=t()}(this,function(){var e=function(e,t){this.items=e,this.settings=t||{diacritics:!0}};e.prototype.tokenize=function(e){if(e=i(String(e||"").toLowerCase()),!e||!e.length)return[];var t,n,o,a,l=[],u=e.split(/ +/);for(t=0,n=u.length;n>t;t++){if(o=r(u[t]),this.settings.diacritics)for(a in s)s.hasOwnProperty(a)&&(o=o.replace(new RegExp(a,"g"),s[a]));l.push({string:u[t],regex:new RegExp(o,"i")})}return l},e.prototype.iterator=function(e,t){var n;n=o(e)?Array.prototype.forEach||function(e){for(var t=0,n=this.length;n>t;t++)e(this[t],t,this)}:function(e){for(var t in this)this.hasOwnProperty(t)&&e(this[t],t,this)},n.apply(e,[t])},e.prototype.getScoreFunction=function(e,t){var n,i,r,o;n=this,e=n.prepareSearch(e,t),r=e.tokens,i=e.options.fields,o=r.length;var s=function(e,t){var n,i;return e?(e=String(e||""),i=e.search(t.regex),-1===i?0:(n=t.string.length/e.length,0===i&&(n+=.5),n)):0},a=function(){var e=i.length;return e?1===e?function(e,t){return s(t[i[0]],e)}:function(t,n){for(var r=0,o=0;e>r;r++)o+=s(n[i[r]],t);return o/e}:function(){return 0}}();return o?1===o?function(e){return a(r[0],e)}:"and"===e.options.conjunction?function(e){for(var t,n=0,i=0;o>n;n++){if(t=a(r[n],e),0>=t)return 0;i+=t}return i/o}:function(e){for(var t=0,n=0;o>t;t++)n+=a(r[t],e);return n/o}:function(){return 0}},e.prototype.getSortFunction=function(e,n){var i,r,o,s,a,l,u,c,d,p,f;if(o=this,e=o.prepareSearch(e,n),f=!e.query&&n.sort_empty||n.sort,d=function(e,t){return"$score"===e?t.score:o.items[t.id][e]},a=[],f)for(i=0,r=f.length;r>i;i++)(e.query||"$score"!==f[i].field)&&a.push(f[i]);if(e.query){for(p=!0,i=0,r=a.length;r>i;i++)if("$score"===a[i].field){p=!1;break}p&&a.unshift({field:"$score",direction:"desc"})}else for(i=0,r=a.length;r>i;i++)if("$score"===a[i].field){a.splice(i,1);break}for(c=[],i=0,r=a.length;r>i;i++)c.push("desc"===a[i].direction?-1:1);return l=a.length,l?1===l?(s=a[0].field,u=c[0],function(e,n){return u*t(d(s,e),d(s,n))}):function(e,n){var i,r,o;for(i=0;l>i;i++)if(o=a[i].field,r=c[i]*t(d(o,e),d(o,n)))return r;return 0}:null},e.prototype.prepareSearch=function(e,t){if("object"==typeof e)return e;t=n({},t);var i=t.fields,r=t.sort,s=t.sort_empty;return i&&!o(i)&&(t.fields=[i]),r&&!o(r)&&(t.sort=[r]),s&&!o(s)&&(t.sort_empty=[s]),{options:t,query:String(e||"").toLowerCase(),tokens:this.tokenize(e),total:0,items:[]}},e.prototype.search=function(e,t){var n,i,r,o,s=this;return i=this.prepareSearch(e,t),
t=i.options,e=i.query,o=t.score||s.getScoreFunction(i),e.length?s.iterator(s.items,function(e,r){n=o(e),(t.filter===!1||n>0)&&i.items.push({score:n,id:r})}):s.iterator(s.items,function(e,t){i.items.push({score:1,id:t})}),r=s.getSortFunction(i,t),r&&i.items.sort(r),i.total=i.items.length,"number"==typeof t.limit&&(i.items=i.items.slice(0,t.limit)),i};var t=function(e,t){return"number"==typeof e&&"number"==typeof t?e>t?1:t>e?-1:0:(e=a(String(e||"")),t=a(String(t||"")),e>t?1:t>e?-1:0)},n=function(e,t){var n,i,r,o;for(n=1,i=arguments.length;i>n;n++)if(o=arguments[n])for(r in o)o.hasOwnProperty(r)&&(e[r]=o[r]);return e},i=function(e){return(e+"").replace(/^\s+|\s+$|/g,"")},r=function(e){return(e+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")},o=Array.isArray||$&&$.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},s={a:"[aÀÁÂÃÄÅàáâãäåĀāąĄ]",c:"[cÇçćĆčČ]",d:"[dđĐďĎ]",e:"[eÈÉÊËèéêëěĚĒēęĘ]",i:"[iÌÍÎÏìíîïĪī]",l:"[lłŁ]",n:"[nÑñňŇńŃ]",o:"[oÒÓÔÕÕÖØòóôõöøŌō]",r:"[rřŘ]",s:"[sŠšśŚ]",t:"[tťŤ]",u:"[uÙÚÛÜùúûüůŮŪū]",y:"[yŸÿýÝ]",z:"[zŽžżŻźŹ]"},a=function(){var e,t,n,i,r="",o={};for(n in s)if(s.hasOwnProperty(n))for(i=s[n].substring(2,s[n].length-1),r+=i,e=0,t=i.length;t>e;e++)o[i.charAt(e)]=n;var a=new RegExp("["+r+"]","g");return function(e){return e.replace(a,function(e){return o[e]}).toLowerCase()}}();return e}),function(e,t){"function"==typeof define&&define.amd?define("microplugin",t):"object"==typeof exports?module.exports=t():e.MicroPlugin=t()}(this,function(){var e={};e.mixin=function(e){e.plugins={},e.prototype.initializePlugins=function(e){var n,i,r,o=this,s=[];if(o.plugins={names:[],settings:{},requested:{},loaded:{}},t.isArray(e))for(n=0,i=e.length;i>n;n++)"string"==typeof e[n]?s.push(e[n]):(o.plugins.settings[e[n].name]=e[n].options,s.push(e[n].name));else if(e)for(r in e)e.hasOwnProperty(r)&&(o.plugins.settings[r]=e[r],s.push(r));for(;s.length;)o.require(s.shift())},e.prototype.loadPlugin=function(t){var n=this,i=n.plugins,r=e.plugins[t];if(!e.plugins.hasOwnProperty(t))throw new Error('Unable to find "'+t+'" plugin');i.requested[t]=!0,i.loaded[t]=r.fn.apply(n,[n.plugins.settings[t]||{}]),i.names.push(t)},e.prototype.require=function(e){var t=this,n=t.plugins;if(!t.plugins.loaded.hasOwnProperty(e)){if(n.requested[e])throw new Error('Plugin has circular dependency ("'+e+'")');t.loadPlugin(e)}return n.loaded[e]},e.define=function(t,n){e.plugins[t]={name:t,fn:n}}};var t={isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}};return e}),function(e,t){"function"==typeof define&&define.amd?define("selectize",["jquery","sifter","microplugin"],t):"object"==typeof exports?module.exports=t(require("jquery"),require("sifter"),require("microplugin")):e.Selectize=t(e.jQuery,e.Sifter,e.MicroPlugin)}(this,function(e,t,n){"use strict";var i=function(e,t){if("string"!=typeof t||t.length){var n="string"==typeof t?new RegExp(t,"i"):t,i=function(e){var t=0;if(3===e.nodeType){var r=e.data.search(n);if(r>=0&&e.data.length>0){var o=e.data.match(n),s=document.createElement("span");s.className="highlight";var a=e.splitText(r),l=(a.splitText(o[0].length),a.cloneNode(!0));s.appendChild(l),a.parentNode.replaceChild(s,a),t=1}}else if(1===e.nodeType&&e.childNodes&&!/(script|style)/i.test(e.tagName))for(var u=0;u<e.childNodes.length;++u)u+=i(e.childNodes[u]);return t};return e.each(function(){i(this)})}},r=function(){};r.prototype={on:function(e,t){this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(t)},off:function(e,t){var n=arguments.length;return 0===n?delete this._events:1===n?delete this._events[e]:(this._events=this._events||{},void(e in this._events!=!1&&this._events[e].splice(this._events[e].indexOf(t),1)))},trigger:function(e){if(this._events=this._events||{},e in this._events!=!1)for(var t=0;t<this._events[e].length;t++)this._events[e][t].apply(this,Array.prototype.slice.call(arguments,1))}},r.mixin=function(e){for(var t=["on","off","trigger"],n=0;n<t.length;n++)e.prototype[t[n]]=r.prototype[t[n]]};var o=/Mac/.test(navigator.userAgent),s=65,a=13,l=27,u=37,c=38,d=80,p=39,f=40,h=78,g=8,m=46,v=16,y=o?91:17,w=o?18:17,b=9,x=1,S=2,k=!/android/i.test(window.navigator.userAgent)&&!!document.createElement("form").validity,C=function(e){return"undefined"!=typeof e},T=function(e){return"undefined"==typeof e||null===e?null:"boolean"==typeof e?e?"1":"0":e+""},_=function(e){return(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},E=function(e){return(e+"").replace(/\$/g,"$$$$")},O={};O.before=function(e,t,n){var i=e[t];e[t]=function(){return n.apply(e,arguments),i.apply(e,arguments)}},O.after=function(e,t,n){var i=e[t];e[t]=function(){var t=i.apply(e,arguments);return n.apply(e,arguments),t}};var D=function(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}},P=function(e,t){var n;return function(){var i=this,r=arguments;window.clearTimeout(n),n=window.setTimeout(function(){e.apply(i,r)},t)}},A=function(e,t,n){var i,r=e.trigger,o={};e.trigger=function(){var n=arguments[0];return-1===t.indexOf(n)?r.apply(e,arguments):void(o[n]=arguments)},n.apply(e,[]),e.trigger=r;for(i in o)o.hasOwnProperty(i)&&r.apply(e,o[i])},M=function(e,t,n,i){e.on(t,n,function(t){for(var n=t.target;n&&n.parentNode!==e[0];)n=n.parentNode;return t.currentTarget=n,i.apply(this,[t])})},N=function(e){var t={};if("selectionStart"in e)t.start=e.selectionStart,t.length=e.selectionEnd-t.start;else if(document.selection){e.focus();var n=document.selection.createRange(),i=document.selection.createRange().text.length;n.moveStart("character",-e.value.length),t.start=n.text.length-i,t.length=i}return t},F=function(e,t,n){var i,r,o={};if(n)for(i=0,r=n.length;r>i;i++)o[n[i]]=e.css(n[i]);else o=e.css();t.css(o)},I=function(t,n){if(!t)return 0;var i=e("<test>").css({position:"absolute",top:-99999,left:-99999,width:"auto",padding:0,whiteSpace:"pre"}).text(t).appendTo("body");F(n,i,["letterSpacing","fontSize","fontFamily","fontWeight","textTransform"]);var r=i.width();return i.remove(),r},L=function(e){var t=null,n=function(n,i){var r,o,s,a,l,u,c,d;n=n||window.event||{},i=i||{},n.metaKey||n.altKey||(i.force||e.data("grow")!==!1)&&(r=e.val(),n.type&&"keydown"===n.type.toLowerCase()&&(o=n.keyCode,s=o>=97&&122>=o||o>=65&&90>=o||o>=48&&57>=o||32===o,o===m||o===g?(d=N(e[0]),d.length?r=r.substring(0,d.start)+r.substring(d.start+d.length):o===g&&d.start?r=r.substring(0,d.start-1)+r.substring(d.start+1):o===m&&"undefined"!=typeof d.start&&(r=r.substring(0,d.start)+r.substring(d.start+1))):s&&(u=n.shiftKey,c=String.fromCharCode(n.keyCode),c=u?c.toUpperCase():c.toLowerCase(),r+=c)),a=e.attr("placeholder"),!r&&a&&(r=a),l=I(r,e)+4,l!==t&&(t=l,e.width(l),e.triggerHandler("resize")))};e.on("keydown keyup update blur",n),n()},j=function(n,i){var r,o,s,a,l=this;a=n[0],a.selectize=l;var u=window.getComputedStyle&&window.getComputedStyle(a,null);if(s=u?u.getPropertyValue("direction"):a.currentStyle&&a.currentStyle.direction,s=s||n.parents("[dir]:first").attr("dir")||"",e.extend(l,{order:0,settings:i,$input:n,tabIndex:n.attr("tabindex")||"",tagType:"select"===a.tagName.toLowerCase()?x:S,rtl:/rtl/i.test(s),eventNS:".selectize"+ ++j.count,highlightedValue:null,isOpen:!1,isDisabled:!1,isRequired:n.is("[required]"),isInvalid:!1,isLocked:!1,isFocused:!1,isInputHidden:!1,isSetup:!1,isShiftDown:!1,isCmdDown:!1,isCtrlDown:!1,ignoreFocus:!1,ignoreBlur:!1,ignoreHover:!1,hasOptions:!1,currentResults:null,lastValue:"",caretPos:0,loading:0,loadedSearches:{},$activeOption:null,$activeItems:[],optgroups:{},options:{},userOptions:{},items:[],renderCache:{},onSearchChange:null===i.loadThrottle?l.onSearchChange:P(l.onSearchChange,i.loadThrottle)}),l.sifter=new t(this.options,{diacritics:i.diacritics}),l.settings.options){for(r=0,o=l.settings.options.length;o>r;r++)l.registerOption(l.settings.options[r]);delete l.settings.options}if(l.settings.optgroups){for(r=0,o=l.settings.optgroups.length;o>r;r++)l.registerOptionGroup(l.settings.optgroups[r]);delete l.settings.optgroups}l.settings.mode=l.settings.mode||(1===l.settings.maxItems?"single":"multi"),"boolean"!=typeof l.settings.hideSelected&&(l.settings.hideSelected="multi"===l.settings.mode),l.initializePlugins(l.settings.plugins),l.setupCallbacks(),l.setupTemplates(),l.setup()};return r.mixin(j),n.mixin(j),e.extend(j.prototype,{setup:function(){var t,n,i,r,s,a,l,u,c,d=this,p=d.settings,f=d.eventNS,h=e(window),g=e(document),m=d.$input;if(l=d.settings.mode,u=m.attr("class")||"",t=e("<div>").addClass(p.wrapperClass).addClass(u).addClass(l),n=e("<div>").addClass(p.inputClass).addClass("items").appendTo(t),i=e('<input type="text" autocomplete="off" />').appendTo(n).attr("tabindex",m.is(":disabled")?"-1":d.tabIndex),a=e(p.dropdownParent||t),r=e("<div>").addClass(p.dropdownClass).addClass(l).hide().appendTo(a),s=e("<div>").addClass(p.dropdownContentClass).appendTo(r),d.settings.copyClassesToDropdown&&r.addClass(u),t.css({width:m[0].style.width}),d.plugins.names.length&&(c="plugin-"+d.plugins.names.join(" plugin-"),t.addClass(c),r.addClass(c)),(null===p.maxItems||p.maxItems>1)&&d.tagType===x&&m.attr("multiple","multiple"),d.settings.placeholder&&i.attr("placeholder",p.placeholder),!d.settings.splitOn&&d.settings.delimiter){var b=d.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");d.settings.splitOn=new RegExp("\\s*"+b+"+\\s*")}m.attr("autocorrect")&&i.attr("autocorrect",m.attr("autocorrect")),m.attr("autocapitalize")&&i.attr("autocapitalize",m.attr("autocapitalize")),d.$wrapper=t,d.$control=n,d.$control_input=i,d.$dropdown=r,d.$dropdown_content=s,r.on("mouseenter","[data-selectable]",function(){return d.onOptionHover.apply(d,arguments)}),r.on("mousedown click","[data-selectable]",function(){return d.onOptionSelect.apply(d,arguments)}),M(n,"mousedown","*:not(input)",function(){return d.onItemSelect.apply(d,arguments)}),L(i),n.on({mousedown:function(){return d.onMouseDown.apply(d,arguments)},click:function(){return d.onClick.apply(d,arguments)}}),i.on({mousedown:function(e){e.stopPropagation()},keydown:function(){return d.onKeyDown.apply(d,arguments)},keyup:function(){return d.onKeyUp.apply(d,arguments)},keypress:function(){return d.onKeyPress.apply(d,arguments)},resize:function(){d.positionDropdown.apply(d,[])},blur:function(){return d.onBlur.apply(d,arguments)},focus:function(){return d.ignoreBlur=!1,d.onFocus.apply(d,arguments)},paste:function(){return d.onPaste.apply(d,arguments)}}),g.on("keydown"+f,function(e){d.isCmdDown=e[o?"metaKey":"ctrlKey"],d.isCtrlDown=e[o?"altKey":"ctrlKey"],d.isShiftDown=e.shiftKey}),g.on("keyup"+f,function(e){e.keyCode===w&&(d.isCtrlDown=!1),e.keyCode===v&&(d.isShiftDown=!1),e.keyCode===y&&(d.isCmdDown=!1)}),g.on("mousedown"+f,function(e){if(d.isFocused){if(e.target===d.$dropdown[0]||e.target.parentNode===d.$dropdown[0])return!1;d.$control.has(e.target).length||e.target===d.$control[0]||d.blur(e.target)}}),h.on(["scroll"+f,"resize"+f].join(" "),function(){d.isOpen&&d.positionDropdown.apply(d,arguments)}),h.on("mousemove"+f,function(){d.ignoreHover=!1}),this.revertSettings={$children:m.children().detach(),tabindex:m.attr("tabindex")},m.attr("tabindex",-1).hide().after(d.$wrapper),e.isArray(p.items)&&(d.setValue(p.items),delete p.items),k&&m.on("invalid"+f,function(e){e.preventDefault(),d.isInvalid=!0,d.refreshState()}),d.updateOriginalInput(),d.refreshItems(),d.refreshState(),d.updatePlaceholder(),d.isSetup=!0,m.is(":disabled")&&d.disable(),d.on("change",this.onChange),m.data("selectize",d),m.addClass("selectized"),d.trigger("initialize"),p.preload===!0&&d.onSearchChange("")},setupTemplates:function(){var t=this,n=t.settings.labelField,i=t.settings.optgroupLabelField,r={optgroup:function(e){return'<div class="optgroup">'+e.html+"</div>"},optgroup_header:function(e,t){return'<div class="optgroup-header">'+t(e[i])+"</div>"},option:function(e,t){return'<div class="option">'+t(e[n])+"</div>"},item:function(e,t){return'<div class="item">'+t(e[n])+"</div>"},option_create:function(e,t){return'<div class="create">Add <strong>'+t(e.input)+"</strong>&hellip;</div>"}};t.settings.render=e.extend({},r,t.settings.render)},setupCallbacks:function(){var e,t,n={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"};for(e in n)n.hasOwnProperty(e)&&(t=this.settings[n[e]],t&&this.on(e,t))},onClick:function(e){var t=this;t.isFocused||(t.focus(),e.preventDefault())},onMouseDown:function(t){var n=this,i=t.isDefaultPrevented();e(t.target);if(n.isFocused){if(t.target!==n.$control_input[0])return"single"===n.settings.mode?n.isOpen?n.close():n.open():i||n.setActiveItem(null),!1}else i||window.setTimeout(function(){n.focus()},0)},onChange:function(){this.$input.trigger("change")},onPaste:function(t){var n=this;n.isFull()||n.isInputHidden||n.isLocked?t.preventDefault():n.settings.splitOn&&setTimeout(function(){for(var t=e.trim(n.$control_input.val()||"").split(n.settings.splitOn),i=0,r=t.length;r>i;i++)n.createItem(t[i])},0)},onKeyPress:function(e){if(this.isLocked)return e&&e.preventDefault();var t=String.fromCharCode(e.keyCode||e.which);return this.settings.create&&"multi"===this.settings.mode&&t===this.settings.delimiter?(this.createItem(),e.preventDefault(),!1):void 0},onKeyDown:function(e){var t=(e.target===this.$control_input[0],this);if(t.isLocked)return void(e.keyCode!==b&&e.preventDefault());switch(e.keyCode){case s:if(t.isCmdDown)return void t.selectAll();break;case l:return void(t.isOpen&&(e.preventDefault(),e.stopPropagation(),t.close()));case h:if(!e.ctrlKey||e.altKey)break;case f:if(!t.isOpen&&t.hasOptions)t.open();else if(t.$activeOption){t.ignoreHover=!0;var n=t.getAdjacentOption(t.$activeOption,1);n.length&&t.setActiveOption(n,!0,!0)}return void e.preventDefault();case d:if(!e.ctrlKey||e.altKey)break;case c:if(t.$activeOption){t.ignoreHover=!0;var i=t.getAdjacentOption(t.$activeOption,-1);i.length&&t.setActiveOption(i,!0,!0)}return void e.preventDefault();case a:return void(t.isOpen&&t.$activeOption&&(t.onOptionSelect({currentTarget:t.$activeOption}),e.preventDefault()));case u:return void t.advanceSelection(-1,e);case p:return void t.advanceSelection(1,e);case b:return t.settings.selectOnTab&&t.isOpen&&t.$activeOption&&(t.onOptionSelect({currentTarget:t.$activeOption}),t.isFull()||e.preventDefault()),void(t.settings.create&&t.createItem()&&e.preventDefault());case g:case m:return void t.deleteSelection(e)}return!t.isFull()&&!t.isInputHidden||(o?e.metaKey:e.ctrlKey)?void 0:void e.preventDefault()},onKeyUp:function(e){var t=this;if(t.isLocked)return e&&e.preventDefault();var n=t.$control_input.val()||"";t.lastValue!==n&&(t.lastValue=n,t.onSearchChange(n),t.refreshOptions(),t.trigger("type",n))},onSearchChange:function(e){var t=this,n=t.settings.load;n&&(t.loadedSearches.hasOwnProperty(e)||(t.loadedSearches[e]=!0,t.load(function(i){n.apply(t,[e,i])})))},onFocus:function(e){var t=this,n=t.isFocused;return t.isDisabled?(t.blur(),e&&e.preventDefault(),!1):void(t.ignoreFocus||(t.isFocused=!0,"focus"===t.settings.preload&&t.onSearchChange(""),n||t.trigger("focus"),t.$activeItems.length||(t.showInput(),t.setActiveItem(null),t.refreshOptions(!!t.settings.openOnFocus)),t.refreshState()))},onBlur:function(e,t){var n=this;if(n.isFocused&&(n.isFocused=!1,!n.ignoreFocus)){if(!n.ignoreBlur&&document.activeElement===n.$dropdown_content[0])return n.ignoreBlur=!0,void n.onFocus(e);var i=function(){n.close(),n.setTextboxValue(""),n.setActiveItem(null),n.setActiveOption(null),n.setCaret(n.items.length),n.refreshState(),(t||document.body).focus(),n.ignoreFocus=!1,n.trigger("blur")};n.ignoreFocus=!0,n.settings.create&&n.settings.createOnBlur?n.createItem(null,!1,i):i()}},onOptionHover:function(e){this.ignoreHover||this.setActiveOption(e.currentTarget,!1)},onOptionSelect:function(t){var n,i,r=this;t.preventDefault&&(t.preventDefault(),t.stopPropagation()),i=e(t.currentTarget),i.hasClass("create")?r.createItem(null,function(){r.settings.closeAfterSelect&&r.close()}):(n=i.attr("data-value"),"undefined"!=typeof n&&(r.lastQuery=null,r.setTextboxValue(""),r.addItem(n),r.settings.closeAfterSelect?r.close():!r.settings.hideSelected&&t.type&&/mouse/.test(t.type)&&r.setActiveOption(r.getOption(n))))},onItemSelect:function(e){var t=this;t.isLocked||"multi"===t.settings.mode&&(e.preventDefault(),t.setActiveItem(e.currentTarget,e))},load:function(e){var t=this,n=t.$wrapper.addClass(t.settings.loadingClass);t.loading++,e.apply(t,[function(e){t.loading=Math.max(t.loading-1,0),e&&e.length&&(t.addOption(e),t.refreshOptions(t.isFocused&&!t.isInputHidden)),t.loading||n.removeClass(t.settings.loadingClass),t.trigger("load",e)}])},setTextboxValue:function(e){var t=this.$control_input,n=t.val()!==e;n&&(t.val(e).triggerHandler("update"),this.lastValue=e)},getValue:function(){return this.tagType===x&&this.$input.attr("multiple")?this.items:this.items.join(this.settings.delimiter)},setValue:function(e,t){var n=t?[]:["change"];A(this,n,function(){this.clear(t),this.addItems(e,t)})},setActiveItem:function(t,n){var i,r,o,s,a,l,u,c,d=this;if("single"!==d.settings.mode){if(t=e(t),!t.length)return e(d.$activeItems).removeClass("active"),d.$activeItems=[],void(d.isFocused&&d.showInput());if(i=n&&n.type.toLowerCase(),"mousedown"===i&&d.isShiftDown&&d.$activeItems.length){for(c=d.$control.children(".active:last"),s=Array.prototype.indexOf.apply(d.$control[0].childNodes,[c[0]]),a=Array.prototype.indexOf.apply(d.$control[0].childNodes,[t[0]]),s>a&&(u=s,s=a,a=u),r=s;a>=r;r++)l=d.$control[0].childNodes[r],-1===d.$activeItems.indexOf(l)&&(e(l).addClass("active"),d.$activeItems.push(l));n.preventDefault()}else"mousedown"===i&&d.isCtrlDown||"keydown"===i&&this.isShiftDown?t.hasClass("active")?(o=d.$activeItems.indexOf(t[0]),d.$activeItems.splice(o,1),t.removeClass("active")):d.$activeItems.push(t.addClass("active")[0]):(e(d.$activeItems).removeClass("active"),d.$activeItems=[t.addClass("active")[0]]);d.hideInput(),this.isFocused||d.focus()}},setActiveOption:function(t,n,i){var r,o,s,a,l,u=this;u.$activeOption&&u.$activeOption.removeClass("active"),u.$activeOption=null,t=e(t),t.length&&(u.$activeOption=t.addClass("active"),(n||!C(n))&&(r=u.$dropdown_content.height(),o=u.$activeOption.outerHeight(!0),n=u.$dropdown_content.scrollTop()||0,s=u.$activeOption.offset().top-u.$dropdown_content.offset().top+n,a=s,l=s-r+o,s+o>r+n?u.$dropdown_content.stop().animate({scrollTop:l},i?u.settings.scrollDuration:0):n>s&&u.$dropdown_content.stop().animate({scrollTop:a},i?u.settings.scrollDuration:0)))},selectAll:function(){var e=this;"single"!==e.settings.mode&&(e.$activeItems=Array.prototype.slice.apply(e.$control.children(":not(input)").addClass("active")),e.$activeItems.length&&(e.hideInput(),e.close()),e.focus())},hideInput:function(){var e=this;e.setTextboxValue(""),e.$control_input.css({opacity:0,position:"absolute",left:e.rtl?1e4:-1e4}),e.isInputHidden=!0},showInput:function(){this.$control_input.css({opacity:1,position:"relative",left:0}),this.isInputHidden=!1},focus:function(){var e=this;e.isDisabled||(e.ignoreFocus=!0,e.$control_input[0].focus(),window.setTimeout(function(){e.ignoreFocus=!1,e.onFocus()},0))},blur:function(e){this.$control_input[0].blur(),this.onBlur(null,e)},getScoreFunction:function(e){return this.sifter.getScoreFunction(e,this.getSearchOptions())},getSearchOptions:function(){var e=this.settings,t=e.sortField;return"string"==typeof t&&(t=[{field:t}]),{fields:e.searchField,conjunction:e.searchConjunction,sort:t}},search:function(t){var n,i,r,o=this,s=o.settings,a=this.getSearchOptions();if(s.score&&(r=o.settings.score.apply(this,[t]),"function"!=typeof r))throw new Error('Selectize "score" setting must be a function that returns a function');if(t!==o.lastQuery?(o.lastQuery=t,i=o.sifter.search(t,e.extend(a,{score:r})),o.currentResults=i):i=e.extend(!0,{},o.currentResults),s.hideSelected)for(n=i.items.length-1;n>=0;n--)-1!==o.items.indexOf(T(i.items[n].id))&&i.items.splice(n,1);return i},refreshOptions:function(t){var n,r,o,s,a,l,u,c,d,p,f,h,g,m,v,y;"undefined"==typeof t&&(t=!0);var w=this,b=e.trim(w.$control_input.val()),x=w.search(b),S=w.$dropdown_content,k=w.$activeOption&&T(w.$activeOption.attr("data-value"));for(s=x.items.length,"number"==typeof w.settings.maxOptions&&(s=Math.min(s,w.settings.maxOptions)),a={},l=[],n=0;s>n;n++)for(u=w.options[x.items[n].id],c=w.render("option",u),d=u[w.settings.optgroupField]||"",p=e.isArray(d)?d:[d],r=0,o=p&&p.length;o>r;r++)d=p[r],w.optgroups.hasOwnProperty(d)||(d=""),a.hasOwnProperty(d)||(a[d]=[],l.push(d)),a[d].push(c);for(this.settings.lockOptgroupOrder&&l.sort(function(e,t){var n=w.optgroups[e].$order||0,i=w.optgroups[t].$order||0;return n-i}),f=[],n=0,s=l.length;s>n;n++)d=l[n],w.optgroups.hasOwnProperty(d)&&a[d].length?(h=w.render("optgroup_header",w.optgroups[d])||"",h+=a[d].join(""),f.push(w.render("optgroup",e.extend({},w.optgroups[d],{html:h})))):f.push(a[d].join(""));if(S.html(f.join("")),w.settings.highlight&&x.query.length&&x.tokens.length)for(n=0,s=x.tokens.length;s>n;n++)i(S,x.tokens[n].regex);if(!w.settings.hideSelected)for(n=0,s=w.items.length;s>n;n++)w.getOption(w.items[n]).addClass("selected");g=w.canCreate(b),g&&(S.prepend(w.render("option_create",{input:b})),y=e(S[0].childNodes[0])),w.hasOptions=x.items.length>0||g,w.hasOptions?(x.items.length>0?(v=k&&w.getOption(k),v&&v.length?m=v:"single"===w.settings.mode&&w.items.length&&(m=w.getOption(w.items[0])),m&&m.length||(m=y&&!w.settings.addPrecedence?w.getAdjacentOption(y,1):S.find("[data-selectable]:first"))):m=y,w.setActiveOption(m),t&&!w.isOpen&&w.open()):(w.setActiveOption(null),t&&w.isOpen&&w.close())},addOption:function(t){var n,i,r,o=this;if(e.isArray(t))for(n=0,i=t.length;i>n;n++)o.addOption(t[n]);else(r=o.registerOption(t))&&(o.userOptions[r]=!0,o.lastQuery=null,o.trigger("option_add",r,t))},registerOption:function(e){var t=T(e[this.settings.valueField]);return!t||this.options.hasOwnProperty(t)?!1:(e.$order=e.$order||++this.order,this.options[t]=e,t)},registerOptionGroup:function(e){var t=T(e[this.settings.optgroupValueField]);return t?(e.$order=e.$order||++this.order,this.optgroups[t]=e,t):!1},addOptionGroup:function(e,t){t[this.settings.optgroupValueField]=e,(e=this.registerOptionGroup(t))&&this.trigger("optgroup_add",e,t)},removeOptionGroup:function(e){this.optgroups.hasOwnProperty(e)&&(delete this.optgroups[e],this.renderCache={},this.trigger("optgroup_remove",e))},clearOptionGroups:function(){this.optgroups={},this.renderCache={},this.trigger("optgroup_clear")},updateOption:function(t,n){var i,r,o,s,a,l,u,c=this;if(t=T(t),o=T(n[c.settings.valueField]),null!==t&&c.options.hasOwnProperty(t)){if("string"!=typeof o)throw new Error("Value must be set in option data");u=c.options[t].$order,o!==t&&(delete c.options[t],s=c.items.indexOf(t),-1!==s&&c.items.splice(s,1,o)),n.$order=n.$order||u,c.options[o]=n,a=c.renderCache.item,l=c.renderCache.option,a&&(delete a[t],delete a[o]),l&&(delete l[t],delete l[o]),-1!==c.items.indexOf(o)&&(i=c.getItem(t),r=e(c.render("item",n)),i.hasClass("active")&&r.addClass("active"),i.replaceWith(r)),c.lastQuery=null,c.isOpen&&c.refreshOptions(!1)}},removeOption:function(e,t){var n=this;e=T(e);var i=n.renderCache.item,r=n.renderCache.option;i&&delete i[e],r&&delete r[e],delete n.userOptions[e],delete n.options[e],n.lastQuery=null,n.trigger("option_remove",e),n.removeItem(e,t)},clearOptions:function(){var e=this;e.loadedSearches={},e.userOptions={},e.renderCache={},e.options=e.sifter.items={},e.lastQuery=null,e.trigger("option_clear"),e.clear()},getOption:function(e){return this.getElementWithValue(e,this.$dropdown_content.find("[data-selectable]"))},getAdjacentOption:function(t,n){var i=this.$dropdown.find("[data-selectable]"),r=i.index(t)+n;return r>=0&&r<i.length?i.eq(r):e()},getElementWithValue:function(t,n){if(t=T(t),"undefined"!=typeof t&&null!==t)for(var i=0,r=n.length;r>i;i++)if(n[i].getAttribute("data-value")===t)return e(n[i]);return e()},getItem:function(e){return this.getElementWithValue(e,this.$control.children())},addItems:function(t,n){for(var i=e.isArray(t)?t:[t],r=0,o=i.length;o>r;r++)this.isPending=o-1>r,this.addItem(i[r],n)},addItem:function(t,n){var i=n?[]:["change"];A(this,i,function(){var i,r,o,s,a,l=this,u=l.settings.mode;return t=T(t),-1!==l.items.indexOf(t)?void("single"===u&&l.close()):void(l.options.hasOwnProperty(t)&&("single"===u&&l.clear(n),"multi"===u&&l.isFull()||(i=e(l.render("item",l.options[t])),a=l.isFull(),l.items.splice(l.caretPos,0,t),l.insertAtCaret(i),(!l.isPending||!a&&l.isFull())&&l.refreshState(),l.isSetup&&(o=l.$dropdown_content.find("[data-selectable]"),l.isPending||(r=l.getOption(t),s=l.getAdjacentOption(r,1).attr("data-value"),l.refreshOptions(l.isFocused&&"single"!==u),s&&l.setActiveOption(l.getOption(s))),!o.length||l.isFull()?l.close():l.positionDropdown(),l.updatePlaceholder(),l.trigger("item_add",t,i),l.updateOriginalInput({silent:n})))))})},removeItem:function(e,t){var n,i,r,o=this;n="object"==typeof e?e:o.getItem(e),e=T(n.attr("data-value")),i=o.items.indexOf(e),-1!==i&&(n.remove(),n.hasClass("active")&&(r=o.$activeItems.indexOf(n[0]),o.$activeItems.splice(r,1)),o.items.splice(i,1),o.lastQuery=null,!o.settings.persist&&o.userOptions.hasOwnProperty(e)&&o.removeOption(e,t),i<o.caretPos&&o.setCaret(o.caretPos-1),o.refreshState(),o.updatePlaceholder(),o.updateOriginalInput({silent:t}),o.positionDropdown(),o.trigger("item_remove",e,n))},createItem:function(t,n){var i=this,r=i.caretPos;t=t||e.trim(i.$control_input.val()||"");var o=arguments[arguments.length-1];if("function"!=typeof o&&(o=function(){}),"boolean"!=typeof n&&(n=!0),!i.canCreate(t))return o(),!1;i.lock();var s="function"==typeof i.settings.create?this.settings.create:function(e){var t={};return t[i.settings.labelField]=e,t[i.settings.valueField]=e,t},a=D(function(e){if(i.unlock(),!e||"object"!=typeof e)return o();var t=T(e[i.settings.valueField]);return"string"!=typeof t?o():(i.setTextboxValue(""),i.addOption(e),i.setCaret(r),i.addItem(t),i.refreshOptions(n&&"single"!==i.settings.mode),void o(e))}),l=s.apply(this,[t,a]);return"undefined"!=typeof l&&a(l),!0},refreshItems:function(){this.lastQuery=null,this.isSetup&&this.addItem(this.items),this.refreshState(),this.updateOriginalInput()},refreshState:function(){var e,t=this;t.isRequired&&(t.items.length&&(t.isInvalid=!1),t.$control_input.prop("required",e)),t.refreshClasses()},refreshClasses:function(){var t=this,n=t.isFull(),i=t.isLocked;t.$wrapper.toggleClass("rtl",t.rtl),t.$control.toggleClass("focus",t.isFocused).toggleClass("disabled",t.isDisabled).toggleClass("required",t.isRequired).toggleClass("invalid",t.isInvalid).toggleClass("locked",i).toggleClass("full",n).toggleClass("not-full",!n).toggleClass("input-active",t.isFocused&&!t.isInputHidden).toggleClass("dropdown-active",t.isOpen).toggleClass("has-options",!e.isEmptyObject(t.options)).toggleClass("has-items",t.items.length>0),t.$control_input.data("grow",!n&&!i)},isFull:function(){return null!==this.settings.maxItems&&this.items.length>=this.settings.maxItems},updateOriginalInput:function(e){var t,n,i,r,o=this;if(e=e||{},o.tagType===x){for(i=[],t=0,n=o.items.length;n>t;t++)r=o.options[o.items[t]][o.settings.labelField]||"",i.push('<option value="'+_(o.items[t])+'" selected="selected">'+_(r)+"</option>");i.length||this.$input.attr("multiple")||i.push('<option value="" selected="selected"></option>'),o.$input.html(i.join(""))}else o.$input.val(o.getValue()),o.$input.attr("value",o.$input.val());o.isSetup&&(e.silent||o.trigger("change",o.$input.val()))},updatePlaceholder:function(){if(this.settings.placeholder){var e=this.$control_input;this.items.length?e.removeAttr("placeholder"):e.attr("placeholder",this.settings.placeholder),e.triggerHandler("update",{force:!0})}},open:function(){var e=this;e.isLocked||e.isOpen||"multi"===e.settings.mode&&e.isFull()||(e.focus(),e.isOpen=!0,e.refreshState(),e.$dropdown.css({visibility:"hidden",display:"block"}),e.positionDropdown(),e.$dropdown.css({visibility:"visible"}),e.trigger("dropdown_open",e.$dropdown))},close:function(){var e=this,t=e.isOpen;"single"===e.settings.mode&&e.items.length&&e.hideInput(),e.isOpen=!1,e.$dropdown.hide(),e.setActiveOption(null),e.refreshState(),t&&e.trigger("dropdown_close",e.$dropdown)},positionDropdown:function(){var e=this.$control,t="body"===this.settings.dropdownParent?e.offset():e.position();t.top+=e.outerHeight(!0),this.$dropdown.css({width:e.outerWidth(),top:t.top,left:t.left})},clear:function(e){var t=this;t.items.length&&(t.$control.children(":not(input)").remove(),t.items=[],t.lastQuery=null,t.setCaret(0),t.setActiveItem(null),t.updatePlaceholder(),t.updateOriginalInput({silent:e}),t.refreshState(),t.showInput(),t.trigger("clear"))},insertAtCaret:function(t){var n=Math.min(this.caretPos,this.items.length);0===n?this.$control.prepend(t):e(this.$control[0].childNodes[n]).before(t),this.setCaret(n+1)},deleteSelection:function(t){var n,i,r,o,s,a,l,u,c,d=this;if(r=t&&t.keyCode===g?-1:1,o=N(d.$control_input[0]),d.$activeOption&&!d.settings.hideSelected&&(l=d.getAdjacentOption(d.$activeOption,-1).attr("data-value")),s=[],d.$activeItems.length){for(c=d.$control.children(".active:"+(r>0?"last":"first")),a=d.$control.children(":not(input)").index(c),r>0&&a++,n=0,i=d.$activeItems.length;i>n;n++)s.push(e(d.$activeItems[n]).attr("data-value"));t&&(t.preventDefault(),t.stopPropagation())}else(d.isFocused||"single"===d.settings.mode)&&d.items.length&&(0>r&&0===o.start&&0===o.length?s.push(d.items[d.caretPos-1]):r>0&&o.start===d.$control_input.val().length&&s.push(d.items[d.caretPos]));if(!s.length||"function"==typeof d.settings.onDelete&&d.settings.onDelete.apply(d,[s])===!1)return!1;for("undefined"!=typeof a&&d.setCaret(a);s.length;)d.removeItem(s.pop());return d.showInput(),d.positionDropdown(),d.refreshOptions(!0),l&&(u=d.getOption(l),u.length&&d.setActiveOption(u)),!0},advanceSelection:function(e,t){var n,i,r,o,s,a,l=this;0!==e&&(l.rtl&&(e*=-1),n=e>0?"last":"first",i=N(l.$control_input[0]),l.isFocused&&!l.isInputHidden?(o=l.$control_input.val().length,s=0>e?0===i.start&&0===i.length:i.start===o,s&&!o&&l.advanceCaret(e,t)):(a=l.$control.children(".active:"+n),a.length&&(r=l.$control.children(":not(input)").index(a),l.setActiveItem(null),l.setCaret(e>0?r+1:r))))},advanceCaret:function(e,t){var n,i,r=this;0!==e&&(n=e>0?"next":"prev",r.isShiftDown?(i=r.$control_input[n](),i.length&&(r.hideInput(),r.setActiveItem(i),t&&t.preventDefault())):r.setCaret(r.caretPos+e))},setCaret:function(t){var n=this;if(t="single"===n.settings.mode?n.items.length:Math.max(0,Math.min(n.items.length,t)),!n.isPending){var i,r,o,s;for(o=n.$control.children(":not(input)"),i=0,r=o.length;r>i;i++)s=e(o[i]).detach(),t>i?n.$control_input.before(s):n.$control.append(s)}n.caretPos=t},lock:function(){this.close(),this.isLocked=!0,this.refreshState()},unlock:function(){this.isLocked=!1,this.refreshState()},disable:function(){var e=this;e.$input.prop("disabled",!0),e.$control_input.prop("disabled",!0).prop("tabindex",-1),e.isDisabled=!0,e.lock()},enable:function(){var e=this;e.$input.prop("disabled",!1),e.$control_input.prop("disabled",!1).prop("tabindex",e.tabIndex),e.isDisabled=!1,e.unlock()},destroy:function(){var t=this,n=t.eventNS,i=t.revertSettings;t.trigger("destroy"),t.off(),t.$wrapper.remove(),t.$dropdown.remove(),t.$input.html("").append(i.$children).removeAttr("tabindex").removeClass("selectized").attr({tabindex:i.tabindex}).show(),t.$control_input.removeData("grow"),t.$input.removeData("selectize"),e(window).off(n),e(document).off(n),e(document.body).off(n),delete t.$input[0].selectize},render:function(e,t){var n,i,r="",o=!1,s=this,a=/^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
return("option"===e||"item"===e)&&(n=T(t[s.settings.valueField]),o=!!n),o&&(C(s.renderCache[e])||(s.renderCache[e]={}),s.renderCache[e].hasOwnProperty(n))?s.renderCache[e][n]:(r=s.settings.render[e].apply(this,[t,_]),("option"===e||"option_create"===e)&&(r=r.replace(a,"<$1 data-selectable")),"optgroup"===e&&(i=t[s.settings.optgroupValueField]||"",r=r.replace(a,'<$1 data-group="'+E(_(i))+'"')),("option"===e||"item"===e)&&(r=r.replace(a,'<$1 data-value="'+E(_(n||""))+'"')),o&&(s.renderCache[e][n]=r),r)},clearCache:function(e){var t=this;"undefined"==typeof e?t.renderCache={}:delete t.renderCache[e]},canCreate:function(e){var t=this;if(!t.settings.create)return!1;var n=t.settings.createFilter;return e.length&&("function"!=typeof n||n.apply(t,[e]))&&("string"!=typeof n||new RegExp(n).test(e))&&(!(n instanceof RegExp)||n.test(e))}}),j.count=0,j.defaults={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:!1,createOnBlur:!1,createFilter:null,highlight:!0,openOnFocus:!0,maxOptions:1e3,maxItems:null,hideSelected:null,addPrecedence:!1,selectOnTab:!1,preload:!1,allowEmptyOption:!1,closeAfterSelect:!1,scrollDuration:60,loadThrottle:300,loadingClass:"loading",dataAttr:"data-data",optgroupField:"optgroup",valueField:"value",labelField:"text",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"selectize-control",inputClass:"selectize-input",dropdownClass:"selectize-dropdown",dropdownContentClass:"selectize-dropdown-content",dropdownParent:null,copyClassesToDropdown:!0,render:{}},e.fn.selectize=function(t){var n=e.fn.selectize.defaults,i=e.extend({},n,t),r=i.dataAttr,o=i.labelField,s=i.valueField,a=i.optgroupField,l=i.optgroupLabelField,u=i.optgroupValueField,c=function(t,n){var a,l,u,c,d=t.attr(r);if(d)for(n.options=JSON.parse(d),a=0,l=n.options.length;l>a;a++)n.items.push(n.options[a][s]);else{var p=e.trim(t.val()||"");if(!i.allowEmptyOption&&!p.length)return;for(u=p.split(i.delimiter),a=0,l=u.length;l>a;a++)c={},c[o]=u[a],c[s]=u[a],n.options.push(c);n.items=u}},d=function(t,n){var c,d,p,f,h=n.options,g={},m=function(e){var t=r&&e.attr(r);return"string"==typeof t&&t.length?JSON.parse(t):null},v=function(t,r){t=e(t);var l=T(t.attr("value"));if(l||i.allowEmptyOption)if(g.hasOwnProperty(l)){if(r){var u=g[l][a];u?e.isArray(u)?u.push(r):g[l][a]=[u,r]:g[l][a]=r}}else{var c=m(t)||{};c[o]=c[o]||t.text(),c[s]=c[s]||l,c[a]=c[a]||r,g[l]=c,h.push(c),t.is(":selected")&&n.items.push(l)}},y=function(t){var i,r,o,s,a;for(t=e(t),o=t.attr("label"),o&&(s=m(t)||{},s[l]=o,s[u]=o,n.optgroups.push(s)),a=e("option",t),i=0,r=a.length;r>i;i++)v(a[i],o)};for(n.maxItems=t.attr("multiple")?null:1,f=t.children(),c=0,d=f.length;d>c;c++)p=f[c].tagName.toLowerCase(),"optgroup"===p?y(f[c]):"option"===p&&v(f[c])};return this.each(function(){if(!this.selectize){var r,o=e(this),s=this.tagName.toLowerCase(),a=o.attr("placeholder")||o.attr("data-placeholder");a||i.allowEmptyOption||(a=o.children('option[value=""]').text());var l={placeholder:a,options:[],optgroups:[],items:[]};"select"===s?d(o,l):c(o,l),r=new j(o,e.extend(!0,{},n,l,t))}})},e.fn.selectize.defaults=j.defaults,e.fn.selectize.support={validity:k},j.define("drag_drop",function(t){if(!e.fn.sortable)throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');if("multi"===this.settings.mode){var n=this;n.lock=function(){var e=n.lock;return function(){var t=n.$control.data("sortable");return t&&t.disable(),e.apply(n,arguments)}}(),n.unlock=function(){var e=n.unlock;return function(){var t=n.$control.data("sortable");return t&&t.enable(),e.apply(n,arguments)}}(),n.setup=function(){var t=n.setup;return function(){t.apply(this,arguments);var i=n.$control.sortable({items:"[data-value]",forcePlaceholderSize:!0,disabled:n.isLocked,start:function(e,t){t.placeholder.css("width",t.helper.css("width")),i.css({overflow:"visible"})},stop:function(){i.css({overflow:"hidden"});var t=n.$activeItems?n.$activeItems.slice():null,r=[];i.children("[data-value]").each(function(){r.push(e(this).attr("data-value"))}),n.setValue(r),n.setActiveItem(t)}})}}()}}),j.define("dropdown_header",function(t){var n=this;t=e.extend({title:"Untitled",headerClass:"selectize-dropdown-header",titleRowClass:"selectize-dropdown-header-title",labelClass:"selectize-dropdown-header-label",closeClass:"selectize-dropdown-header-close",html:function(e){return'<div class="'+e.headerClass+'"><div class="'+e.titleRowClass+'"><span class="'+e.labelClass+'">'+e.title+'</span><a href="javascript:void(0)" class="'+e.closeClass+'">&times;</a></div></div>'}},t),n.setup=function(){var i=n.setup;return function(){i.apply(n,arguments),n.$dropdown_header=e(t.html(t)),n.$dropdown.prepend(n.$dropdown_header)}}()}),j.define("optgroup_columns",function(t){var n=this;t=e.extend({equalizeWidth:!0,equalizeHeight:!0},t),this.getAdjacentOption=function(t,n){var i=t.closest("[data-group]").find("[data-selectable]"),r=i.index(t)+n;return r>=0&&r<i.length?i.eq(r):e()},this.onKeyDown=function(){var e=n.onKeyDown;return function(t){var i,r,o,s;return!this.isOpen||t.keyCode!==u&&t.keyCode!==p?e.apply(this,arguments):(n.ignoreHover=!0,s=this.$activeOption.closest("[data-group]"),i=s.find("[data-selectable]").index(this.$activeOption),s=t.keyCode===u?s.prev("[data-group]"):s.next("[data-group]"),o=s.find("[data-selectable]"),r=o.eq(Math.min(o.length-1,i)),void(r.length&&this.setActiveOption(r)))}}();var i=function(){var e,t=i.width,n=document;return"undefined"==typeof t&&(e=n.createElement("div"),e.innerHTML='<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>',e=e.firstChild,n.body.appendChild(e),t=i.width=e.offsetWidth-e.clientWidth,n.body.removeChild(e)),t},r=function(){var r,o,s,a,l,u,c;if(c=e("[data-group]",n.$dropdown_content),o=c.length,o&&n.$dropdown_content.width()){if(t.equalizeHeight){for(s=0,r=0;o>r;r++)s=Math.max(s,c.eq(r).height());c.css({height:s})}t.equalizeWidth&&(u=n.$dropdown_content.innerWidth()-i(),a=Math.round(u/o),c.css({width:a}),o>1&&(l=u-a*(o-1),c.eq(o-1).css({width:l})))}};(t.equalizeHeight||t.equalizeWidth)&&(O.after(this,"positionDropdown",r),O.after(this,"refreshOptions",r))}),j.define("remove_button",function(t){if("single"!==this.settings.mode){t=e.extend({label:"&times;",title:"Remove",className:"remove",append:!0},t);var n=this,i='<a href="javascript:void(0)" class="'+t.className+'" tabindex="-1" title="'+_(t.title)+'">'+t.label+"</a>",r=function(e,t){var n=e.search(/(<\/[^>]+>\s*)$/);return e.substring(0,n)+t+e.substring(n)};this.setup=function(){var o=n.setup;return function(){if(t.append){var s=n.settings.render.item;n.settings.render.item=function(e){return r(s.apply(this,arguments),i)}}o.apply(this,arguments),this.$control.on("click","."+t.className,function(t){if(t.preventDefault(),!n.isLocked){var i=e(t.currentTarget).parent();n.setActiveItem(i),n.deleteSelection()&&n.setCaret(n.items.length)}})}}()}}),j.define("restore_on_backspace",function(e){var t=this;e.text=e.text||function(e){return e[this.settings.labelField]},this.onKeyDown=function(){var n=t.onKeyDown;return function(t){var i,r;return t.keyCode===g&&""===this.$control_input.val()&&!this.$activeItems.length&&(i=this.caretPos-1,i>=0&&i<this.items.length)?(r=this.options[this.items[i]],this.deleteSelection(t)&&(this.setTextboxValue(e.text.apply(this,[r])),this.refreshOptions(!0)),void t.preventDefault()):n.apply(this,arguments)}}()}),j}),function(){function e(t){var n=e.modules[t];if(!n)throw new Error('failed to require "'+t+'"');return"exports"in n||"function"!=typeof n.definition||(n.client=n.component=!0,n.definition.call(this,n.exports={},n),delete n.definition),n.exports}e.loader="component",e.helper={},e.helper.semVerSort=function(e,t){for(var n=e.version.split("."),i=t.version.split("."),r=0;r<n.length;++r){var o=parseInt(n[r],10),s=parseInt(i[r],10);if(o!==s)return o>s?1:-1;var a=n[r].substr((""+o).length),l=i[r].substr((""+s).length);if(""===a&&""!==l)return 1;if(""!==a&&""===l)return-1;if(""!==a&&""!==l)return a>l?1:-1}return 0},e.latest=function(t,n){function i(e){throw new Error('failed to find latest module of "'+e+'"')}var r=/(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/,o=/(.*)~(.*)/;o.test(t)||i(t);for(var s=Object.keys(e.modules),a=[],l=[],u=0;u<s.length;u++){var c=s[u];if(new RegExp(t+"@").test(c)){var d=c.substr(t.length+1),p=r.exec(c);null!=p?a.push({version:d,name:c}):l.push({version:d,name:c})}}if(0===a.concat(l).length&&i(t),a.length>0){var f=a.sort(e.helper.semVerSort).pop().name;return n===!0?f:e(f)}var f=l.sort(function(e,t){return e.name>t.name})[0].name;return n===!0?f:e(f)},e.modules={},e.register=function(t,n){e.modules[t]={definition:n}},e.define=function(t,n){e.modules[t]={exports:n}},e.register("abpetkov~transitionize@0.0.3",function(e,t){function n(e,t){return this instanceof n?(this.element=e,this.props=t||{},void this.init()):new n(e,t)}t.exports=n,n.prototype.isSafari=function(){return/Safari/.test(navigator.userAgent)&&/Apple Computer/.test(navigator.vendor)},n.prototype.init=function(){var e=[];for(var t in this.props)e.push(t+" "+this.props[t]);this.element.style.transition=e.join(", "),this.isSafari()&&(this.element.style.webkitTransition=e.join(", "))}}),e.register("ftlabs~fastclick@v0.6.11",function(e,t){function n(e){"use strict";var t,i=this;if(this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=10,this.layer=e,!e||!e.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return n.prototype.onClick.apply(i,arguments)},this.onMouse=function(){return n.prototype.onMouse.apply(i,arguments)},this.onTouchStart=function(){return n.prototype.onTouchStart.apply(i,arguments)},this.onTouchMove=function(){return n.prototype.onTouchMove.apply(i,arguments)},this.onTouchEnd=function(){return n.prototype.onTouchEnd.apply(i,arguments)},this.onTouchCancel=function(){return n.prototype.onTouchCancel.apply(i,arguments)},n.notNeeded(e)||(this.deviceIsAndroid&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,i){var r=Node.prototype.removeEventListener;"click"===t?r.call(e,t,n.hijacked||n,i):r.call(e,t,n,i)},e.addEventListener=function(t,n,i){var r=Node.prototype.addEventListener;"click"===t?r.call(e,t,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),i):r.call(e,t,n,i)}),"function"==typeof e.onclick&&(t=e.onclick,e.addEventListener("click",function(e){t(e)},!1),e.onclick=null))}n.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,n.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),n.prototype.deviceIsIOS4=n.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),n.prototype.deviceIsIOSWithBadTarget=n.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),n.prototype.needsClick=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(this.deviceIsIOS&&"file"===e.type||e.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(e.className)},n.prototype.needsFocus=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!this.deviceIsAndroid;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},n.prototype.sendClick=function(e,t){"use strict";var n,i;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),i=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},n.prototype.determineEventType=function(e){"use strict";return this.deviceIsAndroid&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},n.prototype.focus=function(e){"use strict";var t;this.deviceIsIOS&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},n.prototype.updateScrollParent=function(e){"use strict";var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},n.prototype.getTargetElementFromEventTarget=function(e){"use strict";return e.nodeType===Node.TEXT_NODE?e.parentNode:e},n.prototype.onTouchStart=function(e){"use strict";var t,n,i;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],this.deviceIsIOS){if(i=window.getSelection(),i.rangeCount&&!i.isCollapsed)return!0;if(!this.deviceIsIOS4){if(n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<200&&e.preventDefault(),!0},n.prototype.touchHasMoved=function(e){"use strict";var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},n.prototype.onTouchMove=function(e){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},n.prototype.findControl=function(e){"use strict";return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},n.prototype.onTouchEnd=function(e){"use strict";var t,n,i,r,o,s=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<200)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,this.deviceIsIOSWithBadTarget&&(o=e.changedTouches[0],s=document.elementFromPoint(o.pageX-window.pageXOffset,o.pageY-window.pageYOffset)||s,s.fastClickScrollParent=this.targetElement.fastClickScrollParent),i=s.tagName.toLowerCase(),"label"===i){if(t=this.findControl(s)){if(this.focus(s),this.deviceIsAndroid)return!1;s=t}}else if(this.needsFocus(s))return e.timeStamp-n>100||this.deviceIsIOS&&window.top!==window&&"input"===i?(this.targetElement=null,!1):(this.focus(s),this.deviceIsIOS4&&"select"===i||(this.targetElement=null,e.preventDefault()),!1);return this.deviceIsIOS&&!this.deviceIsIOS4&&(r=s.fastClickScrollParent,r&&r.fastClickLastScrollTop!==r.scrollTop)?!0:(this.needsClick(s)||(e.preventDefault(),this.sendClick(s,e)),!1)},n.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},n.prototype.onMouse=function(e){"use strict";return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},n.prototype.onClick=function(e){"use strict";var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},n.prototype.destroy=function(){"use strict";var e=this.layer;this.deviceIsAndroid&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},n.notNeeded=function(e){"use strict";var t,i;if("undefined"==typeof window.ontouchstart)return!0;if(i=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n.prototype.deviceIsAndroid)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(i>31&&window.innerWidth<=window.screen.width)return!0}}return"none"===e.style.msTouchAction?!0:!1},n.attach=function(e){"use strict";return new n(e)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return n}):"undefined"!=typeof t&&t.exports?(t.exports=n.attach,t.exports.FastClick=n):window.FastClick=n}),e.register("component~indexof@0.0.3",function(e,t){t.exports=function(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0;n<e.length;++n)if(e[n]===t)return n;return-1}}),e.register("component~classes@1.2.1",function(t,n){function i(e){if(!e)throw new Error("A DOM element reference is required");this.el=e,this.list=e.classList}var r=e("component~indexof@0.0.3"),o=/\s+/,s=Object.prototype.toString;n.exports=function(e){return new i(e)},i.prototype.add=function(e){if(this.list)return this.list.add(e),this;var t=this.array(),n=r(t,e);return~n||t.push(e),this.el.className=t.join(" "),this},i.prototype.remove=function(e){if("[object RegExp]"==s.call(e))return this.removeMatching(e);if(this.list)return this.list.remove(e),this;var t=this.array(),n=r(t,e);return~n&&t.splice(n,1),this.el.className=t.join(" "),this},i.prototype.removeMatching=function(e){for(var t=this.array(),n=0;n<t.length;n++)e.test(t[n])&&this.remove(t[n]);return this},i.prototype.toggle=function(e,t){return this.list?("undefined"!=typeof t?t!==this.list.toggle(e,t)&&this.list.toggle(e):this.list.toggle(e),this):("undefined"!=typeof t?t?this.add(e):this.remove(e):this.has(e)?this.remove(e):this.add(e),this)},i.prototype.array=function(){var e=this.el.className.replace(/^\s+|\s+$/g,""),t=e.split(o);return""===t[0]&&t.shift(),t},i.prototype.has=i.prototype.contains=function(e){return this.list?this.list.contains(e):!!~r(this.array(),e)}}),e.register("component~event@0.1.4",function(e,t){var n=window.addEventListener?"addEventListener":"attachEvent",i=window.removeEventListener?"removeEventListener":"detachEvent",r="addEventListener"!==n?"on":"";e.bind=function(e,t,i,o){return e[n](r+t,i,o||!1),i},e.unbind=function(e,t,n,o){return e[i](r+t,n,o||!1),n}}),e.register("component~query@0.0.3",function(e,t){function n(e,t){return t.querySelector(e)}e=t.exports=function(e,t){return t=t||document,n(e,t)},e.all=function(e,t){return t=t||document,t.querySelectorAll(e)},e.engine=function(t){if(!t.one)throw new Error(".one callback required");if(!t.all)throw new Error(".all callback required");return n=t.one,e.all=t.all,e}}),e.register("component~matches-selector@0.1.5",function(t,n){function i(e,t){if(!e||1!==e.nodeType)return!1;if(s)return s.call(e,t);for(var n=r.all(t,e.parentNode),i=0;i<n.length;++i)if(n[i]==e)return!0;return!1}var r=e("component~query@0.0.3"),o=Element.prototype,s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector;n.exports=i}),e.register("component~closest@0.1.4",function(t,n){var i=e("component~matches-selector@0.1.5");n.exports=function(e,t,n,r){for(e=n?{parentNode:e}:e,r=r||document;(e=e.parentNode)&&e!==document;){if(i(e,t))return e;if(e===r)return}}}),e.register("component~delegate@0.2.3",function(t,n){var i=e("component~closest@0.1.4"),r=e("component~event@0.1.4");t.bind=function(e,t,n,o,s){return r.bind(e,n,function(n){var r=n.target||n.srcElement;n.delegateTarget=i(r,t,!0,e),n.delegateTarget&&o.call(e,n)},s)},t.unbind=function(e,t,n,i){r.unbind(e,t,n,i)}}),e.register("component~events@1.0.9",function(t,n){function i(e,t){if(!(this instanceof i))return new i(e,t);if(!e)throw new Error("element required");if(!t)throw new Error("object required");this.el=e,this.obj=t,this._events={}}function r(e){var t=e.split(/ +/);return{name:t.shift(),selector:t.join(" ")}}var o=e("component~event@0.1.4"),s=e("component~delegate@0.2.3");n.exports=i,i.prototype.sub=function(e,t,n){this._events[e]=this._events[e]||{},this._events[e][t]=n},i.prototype.bind=function(e,t){function n(){var e=[].slice.call(arguments).concat(c);l[t].apply(l,e)}var i=r(e),a=this.el,l=this.obj,u=i.name,t=t||"on"+u,c=[].slice.call(arguments,2);return i.selector?n=s.bind(a,i.selector,u,n):o.bind(a,u,n),this.sub(u,t,n),n},i.prototype.unbind=function(e,t){if(0==arguments.length)return this.unbindAll();if(1==arguments.length)return this.unbindAllOf(e);var n=this._events[e];if(n){var i=n[t];i&&o.unbind(this.el,e,i)}},i.prototype.unbindAll=function(){for(var e in this._events)this.unbindAllOf(e)},i.prototype.unbindAllOf=function(e){var t=this._events[e];if(t)for(var n in t)this.unbind(e,n)}}),e.register("switchery",function(t,n){function i(e,t){if(!(this instanceof i))return new i(e,t);this.element=e,this.options=t||{};for(var n in l)null==this.options[n]&&(this.options[n]=l[n]);null!=this.element&&"checkbox"==this.element.type&&this.init(),this.isDisabled()===!0&&this.disable()}var r=e("abpetkov~transitionize@0.0.3"),o=e("ftlabs~fastclick@v0.6.11"),s=e("component~classes@1.2.1"),a=e("component~events@1.0.9");n.exports=i;var l={color:"#64bd63",secondaryColor:"#dfdfdf",jackColor:"#fff",jackSecondaryColor:null,className:"switchery",disabled:!1,disabledOpacity:.5,speed:"0.4s",size:"default"};i.prototype.hide=function(){this.element.style.display="none"},i.prototype.show=function(){var e=this.create();this.insertAfter(this.element,e)},i.prototype.create=function(){return this.switcher=document.createElement("span"),this.jack=document.createElement("small"),this.switcher.appendChild(this.jack),this.switcher.className=this.options.className,this.events=a(this.switcher,this),this.switcher},i.prototype.insertAfter=function(e,t){e.parentNode.insertBefore(t,e.nextSibling)},i.prototype.setPosition=function(e){var t=this.isChecked(),n=this.switcher,i=this.jack;e&&t?t=!1:e&&!t&&(t=!0),t===!0?(this.element.checked=!0,window.getComputedStyle?i.style.left=parseInt(window.getComputedStyle(n).width)-parseInt(window.getComputedStyle(i).width)+"px":i.style.left=parseInt(n.currentStyle.width)-parseInt(i.currentStyle.width)+"px",this.options.color&&this.colorize(),this.setSpeed()):(i.style.left=0,this.element.checked=!1,this.switcher.style.boxShadow="inset 0 0 0 0 "+this.options.secondaryColor,this.switcher.style.borderColor=this.options.secondaryColor,this.switcher.style.backgroundColor=this.options.secondaryColor!==l.secondaryColor?this.options.secondaryColor:"#fff",this.jack.style.backgroundColor=this.options.jackSecondaryColor!==this.options.jackColor?this.options.jackSecondaryColor:this.options.jackColor,this.setSpeed())},i.prototype.setSpeed=function(){var e={},t={"background-color":this.options.speed,left:this.options.speed.replace(/[a-z]/,"")/2+"s"};e=this.isChecked()?{border:this.options.speed,"box-shadow":this.options.speed,"background-color":3*this.options.speed.replace(/[a-z]/,"")+"s"}:{border:this.options.speed,"box-shadow":this.options.speed},r(this.switcher,e),r(this.jack,t)},i.prototype.setSize=function(){var e="switchery-small",t="switchery-default",n="switchery-large";switch(this.options.size){case"small":s(this.switcher).add(e);break;case"large":s(this.switcher).add(n);break;default:s(this.switcher).add(t)}},i.prototype.colorize=function(){var e=this.switcher.offsetHeight/2;this.switcher.style.backgroundColor=this.options.color,this.switcher.style.borderColor=this.options.color,this.switcher.style.boxShadow="inset 0 0 0 "+e+"px "+this.options.color,this.jack.style.backgroundColor=this.options.jackColor},i.prototype.handleOnchange=function(e){if(document.dispatchEvent){var t=document.createEvent("HTMLEvents");t.initEvent("change",!0,!0),this.element.dispatchEvent(t)}else this.element.fireEvent("onchange")},i.prototype.handleChange=function(){var e=this,t=this.element;t.addEventListener?t.addEventListener("change",function(){e.setPosition()}):t.attachEvent("onchange",function(){e.setPosition()})},i.prototype.handleClick=function(){var e=this.switcher;o(e),this.events.bind("click","bindClick")},i.prototype.bindClick=function(){var e=this.element.parentNode.tagName.toLowerCase(),t="label"===e?!1:!0;this.setPosition(t),this.handleOnchange(this.element.checked)},i.prototype.markAsSwitched=function(){this.element.setAttribute("data-switchery",!0)},i.prototype.markedAsSwitched=function(){return this.element.getAttribute("data-switchery")},i.prototype.init=function(){this.hide(),this.show(),this.setSize(),this.setPosition(),this.markAsSwitched(),this.handleChange(),this.handleClick()},i.prototype.isChecked=function(){return this.element.checked},i.prototype.isDisabled=function(){return this.options.disabled||this.element.disabled||this.element.readOnly},i.prototype.destroy=function(){this.events.unbind()},i.prototype.enable=function(){this.options.disabled&&(this.options.disabled=!1),this.element.disabled&&(this.element.disabled=!1),this.element.readOnly&&(this.element.readOnly=!1),this.switcher.style.opacity=1,this.events.bind("click","bindClick")},i.prototype.disable=function(){this.options.disabled||(this.options.disabled=!0),this.element.disabled||(this.element.disabled=!0),this.element.readOnly||(this.element.readOnly=!0),this.switcher.style.opacity=this.options.disabledOpacity,this.destroy()}}),"object"==typeof exports?module.exports=e("switchery"):"function"==typeof define&&define.amd?define("Switchery",[],function(){return e("switchery")}):(this||window).Switchery=e("switchery")}();var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=_self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var i={};for(var r in e)e.hasOwnProperty(r)&&(i[r]=t.util.clone(e[r]));return i;case"Array":return e.map&&e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var i=t.util.clone(t.languages[e]);for(var r in n)i[r]=n[r];return i},insertBefore:function(e,n,i,r){r=r||t.languages;var o=r[e];if(2==arguments.length){i=arguments[1];for(var s in i)i.hasOwnProperty(s)&&(o[s]=i[s]);return o}var a={};for(var l in o)if(o.hasOwnProperty(l)){if(l==n)for(var s in i)i.hasOwnProperty(s)&&(a[s]=i[s]);a[l]=o[l]}return t.languages.DFS(t.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=a)}),r[e]=a},DFS:function(e,n,i){for(var r in e)e.hasOwnProperty(r)&&(n.call(e,r,e[r],i||r),"Object"===t.util.type(e[r])?t.languages.DFS(e[r],n):"Array"===t.util.type(e[r])&&t.languages.DFS(e[r],n,r))}},plugins:{},highlightAll:function(e,n){for(var i,r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),o=0;i=r[o++];)t.highlightElement(i,e===!0,n)},highlightElement:function(n,i,r){for(var o,s,a=n;a&&!e.test(a.className);)a=a.parentNode;a&&(o=(a.className.match(e)||[,""])[1],s=t.languages[o]),n.className=n.className.replace(e,"").replace(/\s+/g," ")+" language-"+o,a=n.parentNode,/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var l=n.textContent,u={element:n,language:o,grammar:s,code:l};if(!l||!s)return void t.hooks.run("complete",u);if(t.hooks.run("before-highlight",u),i&&_self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){u.highlightedCode=e.data,t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),t.hooks.run("after-highlight",u),t.hooks.run("complete",u)},c.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=t.highlight(u.code,u.grammar,u.language),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(n),t.hooks.run("after-highlight",u),t.hooks.run("complete",u)},highlight:function(e,i,r){var o=t.tokenize(e,i);return n.stringify(t.util.encode(o),r)},tokenize:function(e,n,i){var r=t.Token,o=[e],s=n.rest;if(s){for(var a in s)n[a]=s[a];delete n.rest}e:for(var a in n)if(n.hasOwnProperty(a)&&n[a]){var l=n[a];l="Array"===t.util.type(l)?l:[l];for(var u=0;u<l.length;++u){var c=l[u],d=c.inside,p=!!c.lookbehind,f=0,h=c.alias;c=c.pattern||c;for(var g=0;g<o.length;g++){var m=o[g];if(o.length>e.length)break e;if(!(m instanceof r)){c.lastIndex=0;var v=c.exec(m);if(v){p&&(f=v[1].length);var y=v.index-1+f,v=v[0].slice(f),w=v.length,b=y+w,x=m.slice(0,y+1),S=m.slice(b+1),k=[g,1];x&&k.push(x);var C=new r(a,d?t.tokenize(v,d):v,h);k.push(C),S&&k.push(S),Array.prototype.splice.apply(o,k)}}}}}return o},hooks:{all:{},add:function(e,n){var i=t.hooks.all;i[e]=i[e]||[],i[e].push(n)},run:function(e,n){var i=t.hooks.all[e];if(i&&i.length)for(var r,o=0;r=i[o++];)r(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,i,r){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return n.stringify(t,i,e)}).join("");var o={type:e.type,content:n.stringify(e.content,i,r),tag:"span",classes:["token",e.type],attributes:{},language:i,parent:r};if("comment"==o.type&&(o.attributes.spellcheck="true"),e.alias){var s="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(o.classes,s)}t.hooks.run("wrap",o);var a="";for(var l in o.attributes)a+=(a?" ":"")+l+'="'+(o.attributes[l]||"")+'"';return"<"+o.tag+' class="'+o.classes.join(" ")+'" '+a+">"+o.content+"</"+o.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var n=JSON.parse(e.data),i=n.language,r=n.code,o=n.immediateClose;_self.postMessage(t.highlight(r,t.languages[i],i)),o&&_self.close()},!1),_self.Prism):_self.Prism;var i=document.getElementsByTagName("script");return i=i[i.length-1],i&&(t.filename=i.src,document.addEventListener&&!i.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism),Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,
important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag)),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),Prism.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\`|\\?[^`])*`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript,function(){"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",html:"markup",svg:"markup",xml:"markup",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell"};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,i=t.getAttribute("data-src"),r=t,o=/\blang(?:uage)?-(?!\*)(\w+)\b/i;r&&!o.test(r.className);)r=r.parentNode;if(r&&(n=(t.className.match(o)||[,""])[1]),!n){var s=(i.match(/\.(\w+)$/)||[,""])[1];n=e[s]||s}var a=document.createElement("code");a.className="language-"+n,t.textContent="",a.textContent="Loading…",t.appendChild(a);var l=new XMLHttpRequest;l.open("GET",i,!0),l.onreadystatechange=function(){4==l.readyState&&(l.status<400&&l.responseText?(a.textContent=l.responseText,Prism.highlightElement(a)):l.status>=400?a.textContent="✖ Error "+l.status+" while fetching file: "+l.statusText:a.textContent="✖ Error: File does not exist or is empty")},l.send(null)})},self.Prism.fileHighlight())}(),Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,constant:/\b[A-Z0-9_]{2,}\b/,comment:{pattern:/(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,lookbehind:!0}}),Prism.languages.insertBefore("php","class-name",{"shell-comment":{pattern:/(^|[^\\])#.*/,lookbehind:!0,alias:"comment"}}),Prism.languages.insertBefore("php","keyword",{delimiter:/\?>|<\?(?:php)?/i,variable:/\$\w+\b/i,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.backupCode=e.code,e.code=e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(t){return e.tokenStack.push(t),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("before-insert",function(e){"php"===e.language&&(e.code=e.backupCode,delete e.backupCode)}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var t,n=0;t=e.tokenStack[n];n++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(n+1)+"}}}",Prism.highlight(t,e.grammar,"php").replace(/\$/g,"$$$$"));e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/})),function(){"undefined"!=typeof self&&self.Prism&&self.document&&Prism.hooks.add("complete",function(e){if(e.code){var t=e.element.parentNode,n=/\s*\bline-numbers\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(n.test(t.className)||n.test(e.element.className))&&!e.element.querySelector(".line-numbers-rows")){n.test(e.element.className)&&(e.element.className=e.element.className.replace(n,"")),n.test(t.className)||(t.className+=" line-numbers");var i,r=e.code.match(/\n(?!$)/g),o=r?r.length+1:1,s=new Array(o+1);s=s.join("<span></span>"),i=document.createElement("span"),i.className="line-numbers-rows",i.innerHTML=s,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(i)}}})}(),function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);p=t.overflowY,"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),d="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(d)&&(d=0),r()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,p=t,c&&(e.style.overflowY=t),i()}function i(){var t=window.pageYOffset,n=document.body.scrollTop,i=e.style.height;e.style.height="auto";var r=e.scrollHeight+d;return 0===e.scrollHeight?void(e.style.height=i):(e.style.height=r+"px",f=e.clientWidth,document.documentElement.scrollTop=t,void(document.body.scrollTop=n))}function r(){var t=e.style.height;i();var r=window.getComputedStyle(e,null);if(r.height!==e.style.height?"visible"!==p&&n("visible"):"hidden"!==p&&n("hidden"),t!==e.style.height){var o=document.createEvent("Event");o.initEvent("autosize:resized",!0,!1),e.dispatchEvent(o)}}var s=void 0===arguments[1]?{}:arguments[1],a=s.setOverflowX,l=void 0===a?!0:a,u=s.setOverflowY,c=void 0===u?!0:u;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!o.has(e)){var d=null,p=null,f=e.clientWidth,h=function(){e.clientWidth!==f&&r()},g=function(t){window.removeEventListener("resize",h,!1),e.removeEventListener("input",r,!1),e.removeEventListener("keyup",r,!1),e.removeEventListener("autosize:destroy",g,!1),e.removeEventListener("autosize:update",r,!1),o["delete"](e),Object.keys(t).forEach(function(n){e.style[n]=t[n]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",g,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",r,!1),window.addEventListener("resize",h,!1),e.addEventListener("input",r,!1),e.addEventListener("autosize:update",r,!1),o.add(e),l&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function i(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:destroy",!0,!1),e.dispatchEvent(t)}}function r(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:update",!0,!1),e.dispatchEvent(t)}}var o="function"==typeof Set?new Set:function(){var e=[];return{has:function(t){return Boolean(e.indexOf(t)>-1)},add:function(t){e.push(t)},"delete":function(t){e.splice(e.indexOf(t),1)}}}(),s=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(s=function(e){return e},s.destroy=function(e){return e},s.update=function(e){return e}):(s=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},s.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e},s.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e}),t.exports=s}),function(e,t,n,i){"use strict";function r(e,t,n){return setTimeout(c(e,n),t)}function o(e,t,n){return Array.isArray(e)?(s(e,n[t],n),!0):!1}function s(e,t,n){var r;if(e)if(e.forEach)e.forEach(t,n);else if(e.length!==i)for(r=0;r<e.length;)t.call(n,e[r],r,e),r++;else for(r in e)e.hasOwnProperty(r)&&t.call(n,e[r],r,e)}function a(e,t,n){for(var r=Object.keys(t),o=0;o<r.length;)(!n||n&&e[r[o]]===i)&&(e[r[o]]=t[r[o]]),o++;return e}function l(e,t){return a(e,t,!0)}function u(e,t,n){var i,r=t.prototype;i=e.prototype=Object.create(r),i.constructor=e,i._super=r,n&&a(i,n)}function c(e,t){return function(){return e.apply(t,arguments)}}function d(e,t){return typeof e==ce?e.apply(t?t[0]||i:i,t):e}function p(e,t){return e===i?t:e}function f(e,t,n){s(v(t),function(t){e.addEventListener(t,n,!1)})}function h(e,t,n){s(v(t),function(t){e.removeEventListener(t,n,!1)})}function g(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1}function m(e,t){return e.indexOf(t)>-1}function v(e){return e.trim().split(/\s+/g)}function y(e,t,n){if(e.indexOf&&!n)return e.indexOf(t);for(var i=0;i<e.length;){if(n&&e[i][n]==t||!n&&e[i]===t)return i;i++}return-1}function w(e){return Array.prototype.slice.call(e,0)}function b(e,t,n){for(var i=[],r=[],o=0;o<e.length;){var s=t?e[o][t]:e[o];y(r,s)<0&&i.push(e[o]),r[o]=s,o++}return n&&(i=t?i.sort(function(e,n){return e[t]>n[t]}):i.sort()),i}function x(e,t){for(var n,r,o=t[0].toUpperCase()+t.slice(1),s=0;s<le.length;){if(n=le[s],r=n?n+o:t,r in e)return r;s++}return i}function S(){return he++}function k(e){var t=e.ownerDocument;return t.defaultView||t.parentWindow}function C(e,t){var n=this;this.manager=e,this.callback=t,this.element=e.element,this.target=e.options.inputTarget,this.domHandler=function(t){d(e.options.enable,[e])&&n.handler(t)},this.init()}function T(e){var t,n=e.options.inputClass;return new(t=n?n:ve?$:ye?q:me?R:Y)(e,_)}function _(e,t,n){var i=n.pointers.length,r=n.changedPointers.length,o=t&Ce&&i-r===0,s=t&(_e|Ee)&&i-r===0;n.isFirst=!!o,n.isFinal=!!s,o&&(e.session={}),n.eventType=t,E(e,n),e.emit("hammer.input",n),e.recognize(n),e.session.prevInput=n}function E(e,t){var n=e.session,i=t.pointers,r=i.length;n.firstInput||(n.firstInput=P(t)),r>1&&!n.firstMultiple?n.firstMultiple=P(t):1===r&&(n.firstMultiple=!1);var o=n.firstInput,s=n.firstMultiple,a=s?s.center:o.center,l=t.center=A(i);t.timeStamp=fe(),t.deltaTime=t.timeStamp-o.timeStamp,t.angle=I(a,l),t.distance=F(a,l),O(n,t),t.offsetDirection=N(t.deltaX,t.deltaY),t.scale=s?j(s.pointers,i):1,t.rotation=s?L(s.pointers,i):0,D(n,t);var u=e.element;g(t.srcEvent.target,u)&&(u=t.srcEvent.target),t.target=u}function O(e,t){var n=t.center,i=e.offsetDelta||{},r=e.prevDelta||{},o=e.prevInput||{};(t.eventType===Ce||o.eventType===_e)&&(r=e.prevDelta={x:o.deltaX||0,y:o.deltaY||0},i=e.offsetDelta={x:n.x,y:n.y}),t.deltaX=r.x+(n.x-i.x),t.deltaY=r.y+(n.y-i.y)}function D(e,t){var n,r,o,s,a=e.lastInterval||t,l=t.timeStamp-a.timeStamp;if(t.eventType!=Ee&&(l>ke||a.velocity===i)){var u=a.deltaX-t.deltaX,c=a.deltaY-t.deltaY,d=M(l,u,c);r=d.x,o=d.y,n=pe(d.x)>pe(d.y)?d.x:d.y,s=N(u,c),e.lastInterval=t}else n=a.velocity,r=a.velocityX,o=a.velocityY,s=a.direction;t.velocity=n,t.velocityX=r,t.velocityY=o,t.direction=s}function P(e){for(var t=[],n=0;n<e.pointers.length;)t[n]={clientX:de(e.pointers[n].clientX),clientY:de(e.pointers[n].clientY)},n++;return{timeStamp:fe(),pointers:t,center:A(t),deltaX:e.deltaX,deltaY:e.deltaY}}function A(e){var t=e.length;if(1===t)return{x:de(e[0].clientX),y:de(e[0].clientY)};for(var n=0,i=0,r=0;t>r;)n+=e[r].clientX,i+=e[r].clientY,r++;return{x:de(n/t),y:de(i/t)}}function M(e,t,n){return{x:t/e||0,y:n/e||0}}function N(e,t){return e===t?Oe:pe(e)>=pe(t)?e>0?De:Pe:t>0?Ae:Me}function F(e,t,n){n||(n=Le);var i=t[n[0]]-e[n[0]],r=t[n[1]]-e[n[1]];return Math.sqrt(i*i+r*r)}function I(e,t,n){n||(n=Le);var i=t[n[0]]-e[n[0]],r=t[n[1]]-e[n[1]];return 180*Math.atan2(r,i)/Math.PI}function L(e,t){return I(t[1],t[0],je)-I(e[1],e[0],je)}function j(e,t){return F(t[0],t[1],je)/F(e[0],e[1],je)}function Y(){this.evEl=$e,this.evWin=ze,this.allow=!0,this.pressed=!1,C.apply(this,arguments)}function $(){this.evEl=We,this.evWin=Re,C.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function z(){this.evTarget=Xe,this.evWin=Be,this.started=!1,C.apply(this,arguments)}function H(e,t){var n=w(e.touches),i=w(e.changedTouches);return t&(_e|Ee)&&(n=b(n.concat(i),"identifier",!0)),[n,i]}function q(){this.evTarget=Ge,this.targetIds={},C.apply(this,arguments)}function W(e,t){var n=w(e.touches),i=this.targetIds;if(t&(Ce|Te)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var r,o,s=w(e.changedTouches),a=[],l=this.target;if(o=n.filter(function(e){return g(e.target,l)}),t===Ce)for(r=0;r<o.length;)i[o[r].identifier]=!0,r++;for(r=0;r<s.length;)i[s[r].identifier]&&a.push(s[r]),t&(_e|Ee)&&delete i[s[r].identifier],r++;return a.length?[b(o.concat(a),"identifier",!0),a]:void 0}function R(){C.apply(this,arguments);var e=c(this.handler,this);this.touch=new q(this.manager,e),this.mouse=new Y(this.manager,e)}function V(e,t){this.manager=e,this.set(t)}function X(e){if(m(e,tt))return tt;var t=m(e,nt),n=m(e,it);return t&&n?nt+" "+it:t||n?t?nt:it:m(e,et)?et:Je}function B(e){this.id=S(),this.manager=null,this.options=l(e||{},this.defaults),this.options.enable=p(this.options.enable,!0),this.state=rt,this.simultaneous={},this.requireFail=[]}function U(e){return e&ut?"cancel":e&at?"end":e&st?"move":e&ot?"start":""}function G(e){return e==Me?"down":e==Ae?"up":e==De?"left":e==Pe?"right":""}function Z(e,t){var n=t.manager;return n?n.get(e):e}function Q(){B.apply(this,arguments)}function K(){Q.apply(this,arguments),this.pX=null,this.pY=null}function J(){Q.apply(this,arguments)}function ee(){B.apply(this,arguments),this._timer=null,this._input=null}function te(){Q.apply(this,arguments)}function ne(){Q.apply(this,arguments)}function ie(){B.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function re(e,t){return t=t||{},t.recognizers=p(t.recognizers,re.defaults.preset),new oe(e,t)}function oe(e,t){t=t||{},this.options=l(t,re.defaults),this.options.inputTarget=this.options.inputTarget||e,this.handlers={},this.session={},this.recognizers=[],this.element=e,this.input=T(this),this.touchAction=new V(this,this.options.touchAction),se(this,!0),s(t.recognizers,function(e){var t=this.add(new e[0](e[1]));e[2]&&t.recognizeWith(e[2]),e[3]&&t.requireFailure(e[3])},this)}function se(e,t){var n=e.element;s(e.options.cssProps,function(e,i){n.style[x(n.style,i)]=t?e:""})}function ae(e,n){var i=t.createEvent("Event");i.initEvent(e,!0,!0),i.gesture=n,n.target.dispatchEvent(i)}var le=["","webkit","moz","MS","ms","o"],ue=t.createElement("div"),ce="function",de=Math.round,pe=Math.abs,fe=Date.now,he=1,ge=/mobile|tablet|ip(ad|hone|od)|android/i,me="ontouchstart"in e,ve=x(e,"PointerEvent")!==i,ye=me&&ge.test(navigator.userAgent),we="touch",be="pen",xe="mouse",Se="kinect",ke=25,Ce=1,Te=2,_e=4,Ee=8,Oe=1,De=2,Pe=4,Ae=8,Me=16,Ne=De|Pe,Fe=Ae|Me,Ie=Ne|Fe,Le=["x","y"],je=["clientX","clientY"];C.prototype={handler:function(){},init:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(k(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&h(this.element,this.evEl,this.domHandler),this.evTarget&&h(this.target,this.evTarget,this.domHandler),this.evWin&&h(k(this.element),this.evWin,this.domHandler)}};var Ye={mousedown:Ce,mousemove:Te,mouseup:_e},$e="mousedown",ze="mousemove mouseup";u(Y,C,{handler:function(e){var t=Ye[e.type];t&Ce&&0===e.button&&(this.pressed=!0),t&Te&&1!==e.which&&(t=_e),this.pressed&&this.allow&&(t&_e&&(this.pressed=!1),this.callback(this.manager,t,{pointers:[e],changedPointers:[e],pointerType:xe,srcEvent:e}))}});var He={pointerdown:Ce,pointermove:Te,pointerup:_e,pointercancel:Ee,pointerout:Ee},qe={2:we,3:be,4:xe,5:Se},We="pointerdown",Re="pointermove pointerup pointercancel";e.MSPointerEvent&&(We="MSPointerDown",Re="MSPointerMove MSPointerUp MSPointerCancel"),u($,C,{handler:function(e){var t=this.store,n=!1,i=e.type.toLowerCase().replace("ms",""),r=He[i],o=qe[e.pointerType]||e.pointerType,s=o==we,a=y(t,e.pointerId,"pointerId");r&Ce&&(0===e.button||s)?0>a&&(t.push(e),a=t.length-1):r&(_e|Ee)&&(n=!0),0>a||(t[a]=e,this.callback(this.manager,r,{pointers:t,changedPointers:[e],pointerType:o,srcEvent:e}),n&&t.splice(a,1))}});var Ve={touchstart:Ce,touchmove:Te,touchend:_e,touchcancel:Ee},Xe="touchstart",Be="touchstart touchmove touchend touchcancel";u(z,C,{handler:function(e){var t=Ve[e.type];if(t===Ce&&(this.started=!0),this.started){var n=H.call(this,e,t);t&(_e|Ee)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:we,srcEvent:e})}}});var Ue={touchstart:Ce,touchmove:Te,touchend:_e,touchcancel:Ee},Ge="touchstart touchmove touchend touchcancel";u(q,C,{handler:function(e){var t=Ue[e.type],n=W.call(this,e,t);n&&this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:we,srcEvent:e})}}),u(R,C,{handler:function(e,t,n){var i=n.pointerType==we,r=n.pointerType==xe;if(i)this.mouse.allow=!1;else if(r&&!this.mouse.allow)return;t&(_e|Ee)&&(this.mouse.allow=!0),this.callback(e,t,n)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Ze=x(ue.style,"touchAction"),Qe=Ze!==i,Ke="compute",Je="auto",et="manipulation",tt="none",nt="pan-x",it="pan-y";V.prototype={set:function(e){e==Ke&&(e=this.compute()),Qe&&(this.manager.element.style[Ze]=e),this.actions=e.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var e=[];return s(this.manager.recognizers,function(t){d(t.options.enable,[t])&&(e=e.concat(t.getTouchAction()))}),X(e.join(" "))},preventDefaults:function(e){if(!Qe){var t=e.srcEvent,n=e.offsetDirection;if(this.manager.session.prevented)return void t.preventDefault();var i=this.actions,r=m(i,tt),o=m(i,it),s=m(i,nt);return r||o&&n&Ne||s&&n&Fe?this.preventSrc(t):void 0}},preventSrc:function(e){this.manager.session.prevented=!0,e.preventDefault()}};var rt=1,ot=2,st=4,at=8,lt=at,ut=16,ct=32;B.prototype={defaults:{},set:function(e){return a(this.options,e),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(e){if(o(e,"recognizeWith",this))return this;var t=this.simultaneous;return e=Z(e,this),t[e.id]||(t[e.id]=e,e.recognizeWith(this)),this},dropRecognizeWith:function(e){return o(e,"dropRecognizeWith",this)?this:(e=Z(e,this),delete this.simultaneous[e.id],this)},requireFailure:function(e){if(o(e,"requireFailure",this))return this;var t=this.requireFail;return e=Z(e,this),-1===y(t,e)&&(t.push(e),e.requireFailure(this)),this},dropRequireFailure:function(e){if(o(e,"dropRequireFailure",this))return this;e=Z(e,this);var t=y(this.requireFail,e);return t>-1&&this.requireFail.splice(t,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(e){return!!this.simultaneous[e.id]},emit:function(e){function t(t){n.manager.emit(n.options.event+(t?U(i):""),e)}var n=this,i=this.state;at>i&&t(!0),t(),i>=at&&t(!0)},tryEmit:function(e){return this.canEmit()?this.emit(e):void(this.state=ct)},canEmit:function(){for(var e=0;e<this.requireFail.length;){if(!(this.requireFail[e].state&(ct|rt)))return!1;e++}return!0},recognize:function(e){var t=a({},e);return d(this.options.enable,[this,t])?(this.state&(lt|ut|ct)&&(this.state=rt),this.state=this.process(t),void(this.state&(ot|st|at|ut)&&this.tryEmit(t))):(this.reset(),void(this.state=ct))},process:function(e){},getTouchAction:function(){},reset:function(){}},u(Q,B,{defaults:{pointers:1},attrTest:function(e){var t=this.options.pointers;return 0===t||e.pointers.length===t},process:function(e){var t=this.state,n=e.eventType,i=t&(ot|st),r=this.attrTest(e);return i&&(n&Ee||!r)?t|ut:i||r?n&_e?t|at:t&ot?t|st:ot:ct}}),u(K,Q,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ie},getTouchAction:function(){var e=this.options.direction,t=[];return e&Ne&&t.push(it),e&Fe&&t.push(nt),t},directionTest:function(e){var t=this.options,n=!0,i=e.distance,r=e.direction,o=e.deltaX,s=e.deltaY;return r&t.direction||(t.direction&Ne?(r=0===o?Oe:0>o?De:Pe,n=o!=this.pX,i=Math.abs(e.deltaX)):(r=0===s?Oe:0>s?Ae:Me,n=s!=this.pY,i=Math.abs(e.deltaY))),e.direction=r,n&&i>t.threshold&&r&t.direction},attrTest:function(e){return Q.prototype.attrTest.call(this,e)&&(this.state&ot||!(this.state&ot)&&this.directionTest(e))},emit:function(e){this.pX=e.deltaX,this.pY=e.deltaY;var t=G(e.direction);t&&this.manager.emit(this.options.event+t,e),this._super.emit.call(this,e)}}),u(J,Q,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[tt]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||this.state&ot)},emit:function(e){if(this._super.emit.call(this,e),1!==e.scale){var t=e.scale<1?"in":"out";this.manager.emit(this.options.event+t,e)}}}),u(ee,B,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Je]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,i=e.distance<t.threshold,o=e.deltaTime>t.time;if(this._input=e,!i||!n||e.eventType&(_e|Ee)&&!o)this.reset();else if(e.eventType&Ce)this.reset(),this._timer=r(function(){this.state=lt,this.tryEmit()},t.time,this);else if(e.eventType&_e)return lt;return ct},reset:function(){clearTimeout(this._timer)},emit:function(e){this.state===lt&&(e&&e.eventType&_e?this.manager.emit(this.options.event+"up",e):(this._input.timeStamp=fe(),this.manager.emit(this.options.event,this._input)))}}),u(te,Q,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[tt]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||this.state&ot)}}),u(ne,Q,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Ne|Fe,pointers:1},getTouchAction:function(){return K.prototype.getTouchAction.call(this)},attrTest:function(e){var t,n=this.options.direction;return n&(Ne|Fe)?t=e.velocity:n&Ne?t=e.velocityX:n&Fe&&(t=e.velocityY),this._super.attrTest.call(this,e)&&n&e.direction&&e.distance>this.options.threshold&&pe(t)>this.options.velocity&&e.eventType&_e},emit:function(e){var t=G(e.direction);t&&this.manager.emit(this.options.event+t,e),this.manager.emit(this.options.event,e)}}),u(ie,B,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[et]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,i=e.distance<t.threshold,o=e.deltaTime<t.time;if(this.reset(),e.eventType&Ce&&0===this.count)return this.failTimeout();if(i&&o&&n){if(e.eventType!=_e)return this.failTimeout();var s=this.pTime?e.timeStamp-this.pTime<t.interval:!0,a=!this.pCenter||F(this.pCenter,e.center)<t.posThreshold;this.pTime=e.timeStamp,this.pCenter=e.center,a&&s?this.count+=1:this.count=1,this._input=e;var l=this.count%t.taps;if(0===l)return this.hasRequireFailures()?(this._timer=r(function(){this.state=lt,this.tryEmit()},t.interval,this),ot):lt}return ct},failTimeout:function(){return this._timer=r(function(){this.state=ct},this.options.interval,this),ct},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==lt&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),re.VERSION="2.0.4",re.defaults={domEvents:!1,touchAction:Ke,enable:!0,inputTarget:null,inputClass:null,preset:[[te,{enable:!1}],[J,{enable:!1},["rotate"]],[ne,{direction:Ne}],[K,{direction:Ne},["swipe"]],[ie],[ie,{event:"doubletap",taps:2},["tap"]],[ee]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var dt=1,pt=2;oe.prototype={set:function(e){return a(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this},stop:function(e){this.session.stopped=e?pt:dt},recognize:function(e){var t=this.session;if(!t.stopped){this.touchAction.preventDefaults(e);var n,i=this.recognizers,r=t.curRecognizer;(!r||r&&r.state&lt)&&(r=t.curRecognizer=null);for(var o=0;o<i.length;)n=i[o],t.stopped===pt||r&&n!=r&&!n.canRecognizeWith(r)?n.reset():n.recognize(e),!r&&n.state&(ot|st|at)&&(r=t.curRecognizer=n),o++}},get:function(e){if(e instanceof B)return e;for(var t=this.recognizers,n=0;n<t.length;n++)if(t[n].options.event==e)return t[n];return null},add:function(e){if(o(e,"add",this))return this;var t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e},remove:function(e){if(o(e,"remove",this))return this;var t=this.recognizers;return e=this.get(e),t.splice(y(t,e),1),this.touchAction.update(),this},on:function(e,t){var n=this.handlers;return s(v(e),function(e){n[e]=n[e]||[],n[e].push(t)}),this},off:function(e,t){var n=this.handlers;return s(v(e),function(e){t?n[e].splice(y(n[e],t),1):delete n[e]}),this},emit:function(e,t){this.options.domEvents&&ae(e,t);var n=this.handlers[e]&&this.handlers[e].slice();if(n&&n.length){t.type=e,t.preventDefault=function(){t.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](t),i++}},destroy:function(){this.element&&se(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},a(re,{INPUT_START:Ce,INPUT_MOVE:Te,INPUT_END:_e,INPUT_CANCEL:Ee,STATE_POSSIBLE:rt,STATE_BEGAN:ot,STATE_CHANGED:st,STATE_ENDED:at,STATE_RECOGNIZED:lt,STATE_CANCELLED:ut,STATE_FAILED:ct,DIRECTION_NONE:Oe,DIRECTION_LEFT:De,DIRECTION_RIGHT:Pe,DIRECTION_UP:Ae,DIRECTION_DOWN:Me,DIRECTION_HORIZONTAL:Ne,DIRECTION_VERTICAL:Fe,DIRECTION_ALL:Ie,Manager:oe,Input:C,TouchAction:V,TouchInput:q,MouseInput:Y,PointerEventInput:$,TouchMouseInput:R,SingleTouchInput:z,Recognizer:B,AttrRecognizer:Q,Tap:ie,Pan:K,Swipe:ne,Pinch:J,Rotate:te,Press:ee,on:f,off:h,each:s,merge:l,extend:a,inherit:u,bindFn:c,prefixed:x}),typeof define==ce&&define.amd?define(function(){return re}):"undefined"!=typeof module&&module.exports?module.exports=re:e[n]=re}(window,document,"Hammer"),function(e){var t,n,i=e.event;t=i.special.debouncedresize={setup:function(){e(this).on("resize",t.handler)},teardown:function(){e(this).off("resize",t.handler)},handler:function(e,r){var o=this,s=arguments,a=function(){e.type="debouncedresize",i.dispatch.apply(o,s)};n&&clearTimeout(n),r?a():n=setTimeout(a,t.threshold)},threshold:150}}(jQuery),function(){"use strict";var e="undefined"!=typeof module&&module.exports,t="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,n=function(){for(var e,t,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],i=0,r=n.length,o={};r>i;i++)if(e=n[i],e&&e[1]in document){for(i=0,t=e.length;t>i;i++)o[n[0][i]]=e[i];return o}return!1}(),i={request:function(e){var i=n.requestFullscreen;e=e||document.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?e[i]():e[i](t&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[n.exitFullscreen]()},toggle:function(e){this.isFullscreen?this.exit():this.request(e)},raw:n};return n?(Object.defineProperties(i,{isFullscreen:{get:function(){return!!document[n.fullscreenElement]}},element:{enumerable:!0,get:function(){return document[n.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!document[n.fullscreenEnabled]}}}),void(e?module.exports=i:window.screenfull=i)):void(e?module.exports=!1:window.screenfull=!1)}();
!function(t){if("function"==typeof define&&define.amd&&define("uikit",function(){var e=window.UIkit||t(window,window.jQuery,window.document);return e.load=function(t,i,o,n){var s,a=t.split(","),r=[],l=(n.config&&n.config.uikit&&n.config.uikit.base?n.config.uikit.base:"").replace(/\/+$/g,"");if(!l)throw new Error("Please define base path to UIkit in the requirejs config.");for(s=0;s<a.length;s+=1){var d=a[s].replace(/\./g,"/");r.push(l+"/components/"+d)}i(r,function(){o(e)})},e}),!window.jQuery)throw new Error("UIkit requires jQuery");window&&window.jQuery&&t(window,window.jQuery,window.document)}(function(t,e,i){"use strict";var o={},n=t.UIkit?Object.create(t.UIkit):void 0;if(o.version="2.23.0",o.noConflict=function(){return n&&(t.UIkit=n,e.UIkit=n,e.fn.uk=n.fn),o},o.prefix=function(t){return t},o.$=e,o.$doc=o.$(document),o.$win=o.$(window),o.$html=o.$("html"),o.support={},o.support.transition=function(){var t=function(){var t,e=i.body||i.documentElement,o={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(t in o)if(void 0!==e.style[t])return o[t]}();return t&&{end:t}}(),o.support.animation=function(){var t=function(){var t,e=i.body||i.documentElement,o={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(t in o)if(void 0!==e.style[t])return o[t]}();return t&&{end:t}}(),function(){Date.now=Date.now||function(){return(new Date).getTime()};for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var i=t[e];window.requestAnimationFrame=window[i+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i+"CancelAnimationFrame"]||window[i+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var o=0;window.requestAnimationFrame=function(t){var e=Date.now(),i=Math.max(o+16,e);return setTimeout(function(){t(o=i)},i-e)},window.cancelAnimationFrame=clearTimeout}}(),o.support.touch="ontouchstart"in document||t.DocumentTouch&&document instanceof t.DocumentTouch||t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints>0||t.navigator.pointerEnabled&&t.navigator.maxTouchPoints>0||!1,o.support.mutationobserver=t.MutationObserver||t.WebKitMutationObserver||null,o.Utils={},o.Utils.isFullscreen=function(){return document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.fullscreenElement||!1},o.Utils.str2json=function(t,e){try{return e?JSON.parse(t.replace(/([\$\w]+)\s*:/g,function(t,e){return'"'+e+'":'}).replace(/'([^']+)'/g,function(t,e){return'"'+e+'"'})):new Function("","var json = "+t+"; return JSON.parse(JSON.stringify(json));")()}catch(i){return!1}},o.Utils.debounce=function(t,e,i){var o;return function(){var n=this,s=arguments,a=function(){o=null,i||t.apply(n,s)},r=i&&!o;clearTimeout(o),o=setTimeout(a,e),r&&t.apply(n,s)}},o.Utils.removeCssRules=function(t){var e,i,o,n,s,a,r,l,d,h;t&&setTimeout(function(){try{for(h=document.styleSheets,n=0,r=h.length;r>n;n++){for(o=h[n],i=[],o.cssRules=o.cssRules,e=s=0,l=o.cssRules.length;l>s;e=++s)o.cssRules[e].type===CSSRule.STYLE_RULE&&t.test(o.cssRules[e].selectorText)&&i.unshift(e);for(a=0,d=i.length;d>a;a++)o.deleteRule(i[a])}}catch(u){}},0)},o.Utils.isInView=function(t,i){var n=e(t);if(!n.is(":visible"))return!1;var s=o.$win.scrollLeft(),a=o.$win.scrollTop(),r=n.offset(),l=r.left,d=r.top;return i=e.extend({topoffset:0,leftoffset:0},i),d+n.height()>=a&&d-i.topoffset<=a+o.$win.height()&&l+n.width()>=s&&l-i.leftoffset<=s+o.$win.width()?!0:!1},o.Utils.checkDisplay=function(t,i){var n=o.$("[data-uk-margin], [data-uk-grid-match], [data-uk-grid-margin], [data-uk-check-display]",t||document);return t&&!n.length&&(n=e(t)),n.trigger("display.uk.check"),i&&("string"!=typeof i&&(i='[class*="uk-animation-"]'),n.find(i).each(function(){var t=o.$(this),e=t.attr("class"),i=e.match(/uk\-animation\-(.+)/);t.removeClass(i[0]).width(),t.addClass(i[0])})),n},o.Utils.options=function(t){if(e.isPlainObject(t))return t;var i=t?t.indexOf("{"):-1,n={};if(-1!=i)try{n=o.Utils.str2json(t.substr(i))}catch(s){}return n},o.Utils.animate=function(t,i){var n=e.Deferred();return t=o.$(t),i=i,t.css("display","none").addClass(i).one(o.support.animation.end,function(){t.removeClass(i),n.resolve()}).width(),t.css("display",""),n.promise()},o.Utils.uid=function(t){return(t||"id")+(new Date).getTime()+"RAND"+Math.ceil(1e5*Math.random())},o.Utils.template=function(t,e){for(var i,o,n,s,a=t.replace(/\n/g,"\\n").replace(/\{\{\{\s*(.+?)\s*\}\}\}/g,"{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g),r=0,l=[],d=0;r<a.length;){if(i=a[r],i.match(/\{\{\s*(.+?)\s*\}\}/))switch(r+=1,i=a[r],o=i[0],n=i.substring(i.match(/^(\^|\#|\!|\~|\:)/)?1:0),o){case"~":l.push("for(var $i=0;$i<"+n+".length;$i++) { var $item = "+n+"[$i];"),d++;break;case":":l.push("for(var $key in "+n+") { var $val = "+n+"[$key];"),d++;break;case"#":l.push("if("+n+") {"),d++;break;case"^":l.push("if(!"+n+") {"),d++;break;case"/":l.push("}"),d--;break;case"!":l.push("__ret.push("+n+");");break;default:l.push("__ret.push(escape("+n+"));")}else l.push("__ret.push('"+i.replace(/\'/g,"\\'")+"');");r+=1}return s=new Function("$data",["var __ret = [];","try {","with($data){",d?'__ret = ["Not all blocks are closed correctly."]':l.join(""),"};","}catch(e){__ret = [e.message];}",'return __ret.join("").replace(/\\n\\n/g, "\\n");',"function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"].join("\n")),e?s(e):s},o.Utils.events={},o.Utils.events.click=o.support.touch?"tap":"click",t.UIkit=o,o.fn=function(t,i){var n=arguments,s=t.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),a=s[1],r=s[2];return o[a]?this.each(function(){var t=e(this),s=t.data(a);s||t.data(a,s=o[a](this,r?void 0:i)),r&&s[r].apply(s,Array.prototype.slice.call(n,1))}):(e.error("UIkit component ["+a+"] does not exist."),this)},e.UIkit=o,e.fn.uk=o.fn,o.langdirection="rtl"==o.$html.attr("dir")?"right":"left",o.components={},o.component=function(t,i){var n=function(i,s){var a=this;return this.UIkit=o,this.element=i?o.$(i):null,this.options=e.extend(!0,{},this.defaults,s),this.plugins={},this.element&&this.element.data(t,this),this.init(),(this.options.plugins.length?this.options.plugins:Object.keys(n.plugins)).forEach(function(t){n.plugins[t].init&&(n.plugins[t].init(a),a.plugins[t]=!0)}),this.trigger("init.uk.component",[t,this]),this};return n.plugins={},e.extend(!0,n.prototype,{defaults:{plugins:[]},boot:function(){},init:function(){},on:function(t,e,i){return o.$(this.element||this).on(t,e,i)},one:function(t,e,i){return o.$(this.element||this).one(t,e,i)},off:function(t){return o.$(this.element||this).off(t)},trigger:function(t,e){return o.$(this.element||this).trigger(t,e)},find:function(t){return o.$(this.element?this.element:[]).find(t)},proxy:function(t,e){var i=this;e.split(" ").forEach(function(e){i[e]||(i[e]=function(){return t[e].apply(t,arguments)})})},mixin:function(t,e){var i=this;e.split(" ").forEach(function(e){i[e]||(i[e]=t[e].bind(i))})},option:function(){return 1==arguments.length?this.options[arguments[0]]||void 0:void(2==arguments.length&&(this.options[arguments[0]]=arguments[1]))}},i),this.components[t]=n,this[t]=function(){var i,n;if(arguments.length)switch(arguments.length){case 1:"string"==typeof arguments[0]||arguments[0].nodeType||arguments[0]instanceof jQuery?i=e(arguments[0]):n=arguments[0];break;case 2:i=e(arguments[0]),n=arguments[1]}return i&&i.data(t)?i.data(t):new o.components[t](i,n)},o.domready&&o.component.boot(t),n},o.plugin=function(t,e,i){this.components[t].plugins[e]=i},o.component.boot=function(t){o.components[t].prototype&&o.components[t].prototype.boot&&!o.components[t].booted&&(o.components[t].prototype.boot.apply(o,[]),o.components[t].booted=!0)},o.component.bootComponents=function(){for(var t in o.components)o.component.boot(t)},o.domObservers=[],o.domready=!1,o.ready=function(t){o.domObservers.push(t),o.domready&&t(document)},o.on=function(t,e,i){return t&&t.indexOf("ready.uk.dom")>-1&&o.domready&&e.apply(o.$doc),o.$doc.on(t,e,i)},o.one=function(t,e,i){return t&&t.indexOf("ready.uk.dom")>-1&&o.domready?(e.apply(o.$doc),o.$doc):o.$doc.one(t,e,i)},o.trigger=function(t,e){return o.$doc.trigger(t,e)},o.domObserve=function(t,e){o.support.mutationobserver&&(e=e||function(){},o.$(t).each(function(){var t=this,i=o.$(t);if(!i.data("observer"))try{var n=new o.support.mutationobserver(o.Utils.debounce(function(o){e.apply(t,[]),i.trigger("changed.uk.dom")},50));n.observe(t,{childList:!0,subtree:!0}),i.data("observer",n)}catch(s){}}))},o.init=function(t){t=t||document,o.domObservers.forEach(function(e){e(t)})},o.on("domready.uk.dom",function(){o.init(),o.domready&&o.Utils.checkDisplay()}),e(function(){o.$body=o.$("body"),o.ready(function(t){o.domObserve("[data-uk-observe]")}),o.on("changed.uk.dom",function(t){o.init(t.target),o.Utils.checkDisplay(t.target)}),o.trigger("beforeready.uk.dom"),o.component.bootComponents(),requestAnimationFrame(function(){var t,e={x:window.pageXOffset,y:window.pageYOffset},i=function(){(e.x!=window.pageXOffset||e.y!=window.pageYOffset)&&(t={x:0,y:0},window.pageXOffset!=e.x&&(t.x=window.pageXOffset>e.x?1:-1),window.pageYOffset!=e.y&&(t.y=window.pageYOffset>e.y?1:-1),e={dir:t,x:window.pageXOffset,y:window.pageYOffset},o.$doc.trigger("scrolling.uk.document",[e])),requestAnimationFrame(i)};return o.support.touch&&o.$html.on("touchmove touchend MSPointerMove MSPointerUp pointermove pointerup",i),(e.x||e.y)&&i(),i}()),o.trigger("domready.uk.dom"),o.support.touch&&navigator.userAgent.match(/(iPad|iPhone|iPod)/g)&&o.$win.on("load orientationchange resize",o.Utils.debounce(function(){var t=function(){return e(".uk-height-viewport").css("height",window.innerHeight),t};return t()}(),100)),o.trigger("afterready.uk.dom"),o.domready=!0}),o.$html.addClass(o.support.touch?"uk-touch":"uk-notouch"),o.support.touch){var s,a=!1,r="uk-hover",l=".uk-overlay, .uk-overlay-hover, .uk-overlay-toggle, .uk-animation-hover, .uk-has-hover";o.$html.on("mouseenter touchstart MSPointerDown pointerdown",l,function(){a&&e("."+r).removeClass(r),a=e(this).addClass(r)}).on("mouseleave touchend MSPointerUp pointerup",function(t){s=e(t.target).parents(l),a&&a.not(s).removeClass(r)})}return o}),function(t){function e(t,e,i,o){return Math.abs(t-e)>=Math.abs(i-o)?t-e>0?"Left":"Right":i-o>0?"Up":"Down"}function i(){d=null,u.last&&(void 0!==u.el&&u.el.trigger("longTap"),u={})}function o(){d&&clearTimeout(d),d=null}function n(){a&&clearTimeout(a),r&&clearTimeout(r),l&&clearTimeout(l),d&&clearTimeout(d),a=r=l=d=null,u={}}function s(t){return t.pointerType==t.MSPOINTER_TYPE_TOUCH&&t.isPrimary}if(!t.fn.swipeLeft){var a,r,l,d,h,u={},c=750;t(function(){var p,f,m,g=0,v=0;"MSGesture"in window&&(h=new MSGesture,h.target=document.body),t(document).on("MSGestureEnd gestureend",function(t){var e=t.originalEvent.velocityX>1?"Right":t.originalEvent.velocityX<-1?"Left":t.originalEvent.velocityY>1?"Down":t.originalEvent.velocityY<-1?"Up":null;e&&void 0!==u.el&&(u.el.trigger("swipe"),u.el.trigger("swipe"+e))}).on("touchstart MSPointerDown pointerdown",function(e){("MSPointerDown"!=e.type||s(e.originalEvent))&&(m="MSPointerDown"==e.type||"pointerdown"==e.type?e:e.originalEvent.touches[0],p=Date.now(),f=p-(u.last||p),u.el=t("tagName"in m.target?m.target:m.target.parentNode),a&&clearTimeout(a),u.x1=m.pageX,u.y1=m.pageY,f>0&&250>=f&&(u.isDoubleTap=!0),u.last=p,d=setTimeout(i,c),!h||"MSPointerDown"!=e.type&&"pointerdown"!=e.type&&"touchstart"!=e.type||h.addPointer(e.originalEvent.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){("MSPointerMove"!=t.type||s(t.originalEvent))&&(m="MSPointerMove"==t.type||"pointermove"==t.type?t:t.originalEvent.touches[0],o(),u.x2=m.pageX,u.y2=m.pageY,g+=Math.abs(u.x1-u.x2),v+=Math.abs(u.y1-u.y2))}).on("touchend MSPointerUp pointerup",function(i){("MSPointerUp"!=i.type||s(i.originalEvent))&&(o(),u.x2&&Math.abs(u.x1-u.x2)>30||u.y2&&Math.abs(u.y1-u.y2)>30?l=setTimeout(function(){void 0!==u.el&&(u.el.trigger("swipe"),u.el.trigger("swipe"+e(u.x1,u.x2,u.y1,u.y2))),u={}},0):"last"in u&&(isNaN(g)||30>g&&30>v?r=setTimeout(function(){var e=t.Event("tap");e.cancelTouch=n,void 0!==u.el&&u.el.trigger(e),u.isDoubleTap?(void 0!==u.el&&u.el.trigger("doubleTap"),u={}):a=setTimeout(function(){a=null,void 0!==u.el&&u.el.trigger("singleTap"),u={}},250)},0):u={},g=v=0))}).on("touchcancel MSPointerCancel",n),t(window).on("scroll",n)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(i){return t(this).on(e,i)}})}}(jQuery),function(t){"use strict";var e=[];t.component("stackMargin",{defaults:{cls:"uk-margin-small-top"},boot:function(){t.ready(function(e){t.$("[data-uk-margin]",e).each(function(){var e,i=t.$(this);i.data("stackMargin")||(e=t.stackMargin(i,t.Utils.options(i.attr("data-uk-margin"))))})})},init:function(){var i=this;this.columns=[],t.$win.on("resize orientationchange",function(){var e=function(){i.process()};return t.$(function(){e(),t.$win.on("load",e)}),t.Utils.debounce(e,20)}()),t.$html.on("changed.uk.dom",function(t){i.process()}),this.on("display.uk.check",function(t){this.element.is(":visible")&&this.process()}.bind(this)),e.push(this)},process:function(){return this.columns=this.element.children(),t.Utils.stackMargin(this.columns,this.options),this},revert:function(){return this.columns.removeClass(this.options.cls),this}}),function(){var e=[],i=function(t){if(t.is(":visible")){var e=t.parent().width(),i=t.data("width"),o=e/i,n=Math.floor(o*t.data("height"));t.css({height:i>e?n:t.data("height")})}};t.component("responsiveElement",{defaults:{},boot:function(){t.ready(function(e){t.$("iframe.uk-responsive-width, [data-uk-responsive]",e).each(function(){var e,i=t.$(this);i.data("responsiveIframe")||(e=t.responsiveElement(i,{}))})})},init:function(){var t=this.element;t.attr("width")&&t.attr("height")&&(t.data({width:t.attr("width"),height:t.attr("height")}).on("display.uk.check",function(){i(t)}),i(t),e.push(t))}}),t.$win.on("resize load",t.Utils.debounce(function(){e.forEach(function(t){i(t)})},15))}(),t.Utils.stackMargin=function(e,i){i=t.$.extend({cls:"uk-margin-small-top"},i),i.cls=i.cls,e=t.$(e).removeClass(i.cls);var o=!1,n=e.filter(":visible:first"),s=n.length?n.position().top+n.outerHeight()-1:!1;s!==!1&&e.each(function(){var e=t.$(this);e.is(":visible")&&(o?e.addClass(i.cls):e.position().top>=s&&(o=e.addClass(i.cls)))})},t.Utils.matchHeights=function(e,i){e=t.$(e).css("min-height",""),i=t.$.extend({row:!0},i);var o=function(e){if(!(e.length<2)){var i=0;e.each(function(){i=Math.max(i,t.$(this).outerHeight())}).each(function(){var e=t.$(this),o=i-("border-box"==e.css("box-sizing")?0:e.outerHeight()-e.height());e.css("min-height",o+"px")})}};i.row?(e.first().width(),setTimeout(function(){var i=!1,n=[];e.each(function(){var e=t.$(this),s=e.offset().top;s!=i&&n.length&&(o(t.$(n)),n=[],s=e.offset().top),n.push(e),i=s}),n.length&&o(t.$(n))},0)):o(e)},function(e){t.Utils.inlineSvg=function(i,o){t.$(i||'img[src$=".svg"]',o||document).each(function(){var i=t.$(this),o=i.attr("src");if(!e[o]){var n=t.$.Deferred();t.$.get(o,{nc:Math.random()},function(e){n.resolve(t.$(e).find("svg"))}),e[o]=n.promise()}e[o].then(function(e){var o=t.$(e).clone();i.attr("id")&&o.attr("id",i.attr("id")),i.attr("class")&&o.attr("class",i.attr("class")),i.attr("style")&&o.attr("style",i.attr("style")),i.attr("width")&&(o.attr("width",i.attr("width")),i.attr("height")||o.removeAttr("height")),i.attr("height")&&(o.attr("height",i.attr("height")),i.attr("width")||o.removeAttr("width")),i.replaceWith(o)})})},t.ready(function(e){t.Utils.inlineSvg("[data-uk-svg]",e)})}({})}(UIkit),function(t){"use strict";function e(e,i){i=t.$.extend({duration:1e3,transition:"easeOutExpo",offset:0,complete:function(){}},i);var o=e.offset().top-i.offset,n=t.$doc.height(),s=window.innerHeight;o+s>n&&(o=n-s),t.$("html,body").stop().animate({scrollTop:o},i.duration,i.transition).promise().done(i.complete)}t.component("smoothScroll",{boot:function(){t.$html.on("click.smooth-scroll.uikit","[data-uk-smooth-scroll]",function(e){var i=t.$(this);if(!i.data("smoothScroll")){t.smoothScroll(i,t.Utils.options(i.attr("data-uk-smooth-scroll")));i.trigger("click")}return!1})},init:function(){var i=this;this.on("click",function(o){o.preventDefault(),e(t.$(this.hash).length?t.$(this.hash):t.$("body"),i.options)})}}),t.Utils.scrollToElement=e,t.$.easing.easeOutExpo||(t.$.easing.easeOutExpo=function(t,e,i,o,n){return e==n?i+o:o*(-Math.pow(2,-10*e/n)+1)+i})}(UIkit),function(t){"use strict";var e=t.$win,i=t.$doc,o=[],n=function(){for(var t=0;t<o.length;t++)window.requestAnimationFrame.apply(window,[o[t].check])};t.component("scrollspy",{defaults:{target:!1,cls:"uk-scrollspy-inview",initcls:"uk-scrollspy-init-inview",topoffset:0,leftoffset:0,repeat:!1,delay:0},boot:function(){i.on("scrolling.uk.document",n),e.on("load resize orientationchange",t.Utils.debounce(n,50)),t.ready(function(e){t.$("[data-uk-scrollspy]",e).each(function(){var e=t.$(this);if(!e.data("scrollspy")){t.scrollspy(e,t.Utils.options(e.attr("data-uk-scrollspy")))}})})},init:function(){var e,i=this,n=this.options.cls.split(/,/),s=function(){var o=i.options.target?i.element.find(i.options.target):i.element,s=1===o.length?1:0,a=0;o.each(function(o){var r=t.$(this),l=r.data("inviewstate"),d=t.Utils.isInView(r,i.options),h=r.data("ukScrollspyCls")||n[a].trim();!d||l||r.data("scrollspy-idle")||(e||(r.addClass(i.options.initcls),i.offset=r.offset(),e=!0,r.trigger("init.uk.scrollspy")),r.data("scrollspy-idle",setTimeout(function(){r.addClass("uk-scrollspy-inview").toggleClass(h).width(),r.trigger("inview.uk.scrollspy"),r.data("scrollspy-idle",!1),r.data("inviewstate",!0)},i.options.delay*s)),s++),!d&&l&&i.options.repeat&&(r.data("scrollspy-idle")&&clearTimeout(r.data("scrollspy-idle")),r.removeClass("uk-scrollspy-inview").toggleClass(h),r.data("inviewstate",!1),r.trigger("outview.uk.scrollspy")),a=n[a+1]?a+1:0})};s(),this.check=s,o.push(this)}});var s=[],a=function(){for(var t=0;t<s.length;t++)window.requestAnimationFrame.apply(window,[s[t].check])};t.component("scrollspynav",{defaults:{cls:"uk-active",closest:!1,topoffset:0,leftoffset:0,smoothscroll:!1},boot:function(){i.on("scrolling.uk.document",a),e.on("resize orientationchange",t.Utils.debounce(a,50)),t.ready(function(e){t.$("[data-uk-scrollspy-nav]",e).each(function(){var e=t.$(this);if(!e.data("scrollspynav")){t.scrollspynav(e,t.Utils.options(e.attr("data-uk-scrollspy-nav")))}})})},init:function(){var i,o=[],n=this.find("a[href^='#']").each(function(){o.push(t.$(this).attr("href"))}),a=t.$(o.join(",")),r=this.options.cls,l=this.options.closest||this.options.closest,d=this,h=function(){i=[];for(var o=0;o<a.length;o++)t.Utils.isInView(a.eq(o),d.options)&&i.push(a.eq(o));if(i.length){var s,h=e.scrollTop(),u=function(){for(var t=0;t<i.length;t++)if(i[t].offset().top>=h)return i[t]}();if(!u)return;d.options.closest?(n.closest(l).removeClass(r),s=n.filter("a[href='#"+u.attr("id")+"']").closest(l).addClass(r)):s=n.removeClass(r).filter("a[href='#"+u.attr("id")+"']").addClass(r),d.element.trigger("inview.uk.scrollspynav",[u,s])}};this.options.smoothscroll&&t.smoothScroll&&n.each(function(){t.smoothScroll(this,d.options.smoothscroll)}),h(),this.element.data("scrollspynav",this),this.check=h,s.push(this)}})}(UIkit),function(t){"use strict";var e=[];t.component("toggle",{defaults:{target:!1,cls:"uk-hidden",animation:!1,duration:200},boot:function(){t.ready(function(i){t.$("[data-uk-toggle]",i).each(function(){var e=t.$(this);if(!e.data("toggle")){t.toggle(e,t.Utils.options(e.attr("data-uk-toggle")))}}),setTimeout(function(){e.forEach(function(t){t.getToggles()})},0)})},init:function(){var t=this;this.aria=-1!==this.options.cls.indexOf("uk-hidden"),this.getToggles(),this.on("click",function(e){t.element.is('a[href="#"]')&&e.preventDefault(),t.toggle()}),e.push(this)},toggle:function(){if(this.totoggle.length){if(this.options.animation&&t.support.animation){var e=this,i=this.options.animation.split(",");1==i.length&&(i[1]=i[0]),i[0]=i[0].trim(),i[1]=i[1].trim(),this.totoggle.css("animation-duration",this.options.duration+"ms"),this.totoggle.each(function(){var o=t.$(this);o.hasClass(e.options.cls)?(o.toggleClass(e.options.cls),t.Utils.animate(o,i[0]).then(function(){o.css("animation-duration",""),t.Utils.checkDisplay(o)})):t.Utils.animate(this,i[1]+" uk-animation-reverse").then(function(){o.toggleClass(e.options.cls).css("animation-duration",""),t.Utils.checkDisplay(o)})})}else this.totoggle.toggleClass(this.options.cls),t.Utils.checkDisplay(this.totoggle);this.updateAria()}},getToggles:function(){this.totoggle=this.options.target?t.$(this.options.target):[],this.updateAria()},updateAria:function(){this.aria&&this.totoggle.length&&this.totoggle.each(function(){t.$(this).attr("aria-hidden",t.$(this).hasClass("uk-hidden"))})}})}(UIkit),function(t){"use strict";t.component("alert",{defaults:{fade:!0,duration:200,trigger:".uk-alert-close"},boot:function(){t.$html.on("click.alert.uikit","[data-uk-alert]",function(e){var i=t.$(this);if(!i.data("alert")){var o=t.alert(i,t.Utils.options(i.attr("data-uk-alert")));t.$(e.target).is(o.options.trigger)&&(e.preventDefault(),o.close())}})},init:function(){var t=this;this.on("click",this.options.trigger,function(e){e.preventDefault(),t.close()})},close:function(){var t=this.trigger("close.uk.alert"),e=function(){this.trigger("closed.uk.alert").remove()}.bind(this);this.options.fade?t.css("overflow","hidden").css("max-height",t.height()).animate({height:0,opacity:0,"padding-top":0,"padding-bottom":0,"margin-top":0,"margin-bottom":0},this.options.duration,e):e()}})}(UIkit),function(t){"use strict";t.component("buttonRadio",{defaults:{activeClass:"uk-active",target:".uk-button"},boot:function(){t.$html.on("click.buttonradio.uikit","[data-uk-button-radio]",function(e){var i=t.$(this);if(!i.data("buttonRadio")){var o=t.buttonRadio(i,t.Utils.options(i.attr("data-uk-button-radio"))),n=t.$(e.target);n.is(o.options.target)&&n.trigger("click")}})},init:function(){var e=this;this.find(e.options.target).attr("aria-checked","false").filter("."+e.options.activeClass).attr("aria-checked","true"),this.on("click",this.options.target,function(i){var o=t.$(this);o.is('a[href="#"]')&&i.preventDefault(),e.find(e.options.target).not(o).removeClass(e.options.activeClass).blur(),o.addClass(e.options.activeClass),e.find(e.options.target).not(o).attr("aria-checked","false"),o.attr("aria-checked","true"),e.trigger("change.uk.button",[o])})},getSelected:function(){return this.find("."+this.options.activeClass)}}),t.component("buttonCheckbox",{defaults:{activeClass:"uk-active",target:".uk-button"},boot:function(){t.$html.on("click.buttoncheckbox.uikit","[data-uk-button-checkbox]",function(e){var i=t.$(this);if(!i.data("buttonCheckbox")){var o=t.buttonCheckbox(i,t.Utils.options(i.attr("data-uk-button-checkbox"))),n=t.$(e.target);n.is(o.options.target)&&n.trigger("click")}})},init:function(){var e=this;this.find(e.options.target).attr("aria-checked","false").filter("."+e.options.activeClass).attr("aria-checked","true"),this.on("click",this.options.target,function(i){var o=t.$(this);o.is('a[href="#"]')&&i.preventDefault(),o.toggleClass(e.options.activeClass).blur(),o.attr("aria-checked",o.hasClass(e.options.activeClass)),e.trigger("change.uk.button",[o])})},getSelected:function(){return this.find("."+this.options.activeClass)}}),t.component("button",{defaults:{},boot:function(){t.$html.on("click.button.uikit","[data-uk-button]",function(e){var i=t.$(this);if(!i.data("button")){t.button(i,t.Utils.options(i.attr("data-uk-button")));i.trigger("click")}})},init:function(){var t=this;this.element.attr("aria-pressed",this.element.hasClass("uk-active")),this.on("click",function(e){t.element.is('a[href="#"]')&&e.preventDefault(),t.toggle(),t.trigger("change.uk.button",[t.element.blur().hasClass("uk-active")])})},toggle:function(){this.element.toggleClass("uk-active"),this.element.attr("aria-pressed",this.element.hasClass("uk-active"))}})}(UIkit),function(t){"use strict";function e(e,i,o,n){if(e=t.$(e),i=t.$(i),o=o||window.innerWidth,n=n||e.offset(),i.length){var s=i.outerWidth();if(e.css("min-width",s),"right"==t.langdirection){var a=o-(i.offset().left+s),r=o-(e.offset().left+e.outerWidth());e.css("margin-right",a-r)}else e.css("margin-left",i.offset().left-n.left)}}var i,o=!1,n={x:{"bottom-left":"bottom-right","bottom-right":"bottom-left","bottom-center":"bottom-right","top-left":"top-right","top-right":"top-left","top-center":"top-right","left-top":"right","left-bottom":"right-bottom","left-center":"right-center","right-top":"left","right-bottom":"left-bottom","right-center":"left-center"},y:{"bottom-left":"top-left","bottom-right":"top-right","bottom-center":"top-center","top-left":"bottom-left","top-right":"bottom-right","top-center":"bottom-center","left-top":"top-left","left-bottom":"left-bottom","left-center":"top-left","right-top":"top-left","right-bottom":"bottom-left","right-center":"top-left"},xy:{}};t.component("dropdown",{defaults:{mode:"hover",pos:"bottom-left",offset:0,remaintime:800,justify:!1,boundary:t.$win,delay:0,dropdownSelector:".uk-dropdown,.uk-dropdown-blank",hoverDelayIdle:250},remainIdle:!1,boot:function(){var e=t.support.touch?"click":"mouseenter";t.$html.on(e+".dropdown.uikit","[data-uk-dropdown]",function(i){var o=t.$(this);if(!o.data("dropdown")){var n=t.dropdown(o,t.Utils.options(o.attr("data-uk-dropdown")));("click"==e||"mouseenter"==e&&"hover"==n.options.mode)&&n.element.trigger(e),n.element.find(n.options.dropdownSelector).length&&i.preventDefault()}})},init:function(){var e=this;this.dropdown=this.find(this.options.dropdownSelector),this.offsetParent=this.dropdown.parents().filter(function(){return-1!==t.$.inArray(t.$(this).css("position"),["relative","fixed","absolute"])}).slice(0,1),this.centered=this.dropdown.hasClass("uk-dropdown-center"),this.justified=this.options.justify?t.$(this.options.justify):!1,this.boundary=t.$(this.options.boundary),this.boundary.length||(this.boundary=t.$win),this.dropdown.hasClass("uk-dropdown-up")&&(this.options.pos="top-left"),this.dropdown.hasClass("uk-dropdown-flip")&&(this.options.pos=this.options.pos.replace("left","right")),this.dropdown.hasClass("uk-dropdown-center")&&(this.options.pos=this.options.pos.replace(/(left|right)/,"center")),this.element.attr("aria-haspopup","true"),this.element.attr("aria-expanded",this.element.hasClass("uk-open")),"click"==this.options.mode||t.support.touch?this.on("click.uikit.dropdown",function(i){var o=t.$(i.target);o.parents(e.options.dropdownSelector).length||((o.is("a[href='#']")||o.parent().is("a[href='#']")||e.dropdown.length&&!e.dropdown.is(":visible"))&&i.preventDefault(),o.blur()),e.element.hasClass("uk-open")?(!e.dropdown.find(i.target).length||o.is(".uk-dropdown-close")||o.parents(".uk-dropdown-close").length)&&e.hide():e.show()}):this.on("mouseenter",function(t){e.trigger("pointerenter.uk.dropdown",[e]),e.remainIdle&&clearTimeout(e.remainIdle),i&&clearTimeout(i),o&&o==e||(i=o&&o!=e?setTimeout(function(){i=setTimeout(e.show.bind(e),e.options.delay)},e.options.hoverDelayIdle):setTimeout(e.show.bind(e),e.options.delay))}).on("mouseleave",function(){i&&clearTimeout(i),e.remainIdle=setTimeout(function(){o&&o==e&&e.hide()},e.options.remaintime),e.trigger("pointerleave.uk.dropdown",[e])}).on("click",function(i){var n=t.$(i.target);e.remainIdle&&clearTimeout(e.remainIdle),o&&o==e||((n.is("a[href='#']")||n.parent().is("a[href='#']"))&&i.preventDefault(),e.show())})},show:function(){t.$html.off("click.outer.dropdown"),o&&o!=this&&o.hide(!0),i&&clearTimeout(i),this.trigger("beforeshow.uk.dropdown",[this]),this.checkDimensions(),this.element.addClass("uk-open"),this.element.attr("aria-expanded","true"),this.trigger("show.uk.dropdown",[this]),t.Utils.checkDisplay(this.dropdown,!0),o=this,this.registerOuterClick()},hide:function(t){this.trigger("beforehide.uk.dropdown",[this,t]),this.element.removeClass("uk-open"),this.remainIdle&&clearTimeout(this.remainIdle),this.remainIdle=!1,this.element.attr("aria-expanded","false"),this.trigger("hide.uk.dropdown",[this,t]),o==this&&(o=!1)},registerOuterClick:function(){var e=this;t.$html.off("click.outer.dropdown"),setTimeout(function(){t.$html.on("click.outer.dropdown",function(n){i&&clearTimeout(i);t.$(n.target);o!=e||e.element.find(n.target).length||(e.hide(!0),t.$html.off("click.outer.dropdown"))})},10)},checkDimensions:function(){if(this.dropdown.length){this.dropdown.removeClass("uk-dropdown-top uk-dropdown-bottom uk-dropdown-left uk-dropdown-right uk-dropdown-stack").css({"top-left":"",left:"","margin-left":"","margin-right":""}),this.justified&&this.justified.length&&this.dropdown.css("min-width","");var i,o=t.$.extend({},this.offsetParent.offset(),{width:this.offsetParent[0].offsetWidth,height:this.offsetParent[0].offsetHeight}),s=this.options.offset,a=this.dropdown,r=(a.show().offset(),a.outerWidth()),l=a.outerHeight(),d=this.boundary.width(),h=(this.boundary.offset()?this.boundary.offset():{top:0,left:0},this.options.pos),u={"bottom-left":{top:0+o.height+s,left:0},"bottom-right":{top:0+o.height+s,left:0+o.width-r},"bottom-center":{top:0+o.height+s,left:0+o.width/2-r/2},"top-left":{top:0-l-s,left:0},"top-right":{top:0-l-s,left:0+o.width-r},"top-center":{top:0-l-s,left:0+o.width/2-r/2},"left-top":{top:0,left:0-r-s},"left-bottom":{top:0+o.height-l,left:0-r-s},"left-center":{top:0+o.height/2-l/2,left:0-r-s},"right-top":{top:0,left:0+o.width+s},"right-bottom":{top:0+o.height-l,left:0+o.width+s},"right-center":{top:0+o.height/2-l/2,left:0+o.width+s}},c={};if(i=h.split("-"),c=u[h]?u[h]:u["bottom-left"],this.justified&&this.justified.length)e(a.css({left:0}),this.justified,d);else{switch(this.checkBoundary(o.left+c.left,o.top+c.top,r,l,d)){case"x":h=n.x[h]||"right-top";break;case"y":h=n.y[h]||"top-left";break;case"xy":h=n.xy[h]||"right-bottom"}i=h.split("-"),c=u[h]?u[h]:u["bottom-left"]}r>d&&(a.addClass("uk-dropdown-stack"),this.trigger("stack.uk.dropdown",[this])),a.css(c).css("display","").addClass("uk-dropdown-"+i[0])}},checkBoundary:function(e,i,o,n,s){var a="";return(0>e||e-t.$win.scrollLeft()+o>s)&&(a+="x"),(0>i||i-t.$win.scrollTop()+n>window.innerHeight)&&(a+="y"),a}}),t.component("dropdownOverlay",{defaults:{justify:!1,cls:"",duration:200},boot:function(){t.ready(function(e){t.$("[data-uk-dropdown-overlay]",e).each(function(){var e=t.$(this);e.data("dropdownOverlay")||t.dropdownOverlay(e,t.Utils.options(e.attr("data-uk-dropdown-overlay")))})})},init:function(){var i=this;this.justified=this.options.justify?t.$(this.options.justify):!1,this.overlay=this.element.find("uk-dropdown-overlay"),this.overlay.length||(this.overlay=t.$('<div class="uk-dropdown-overlay"></div>').appendTo(this.element)),this.overlay.addClass(this.options.cls),this.on({"beforeshow.uk.dropdown":function(t,o){i.dropdown=o,i.justified&&i.justified.length&&e(i.overlay.css({display:"block","margin-left":"","margin-right":""}),i.justified,i.justified.outerWidth())},"show.uk.dropdown":function(e,o){var n=i.dropdown.dropdown.outerHeight(!0);i.dropdown.element.removeClass("uk-open"),i.overlay.stop().css("display","block").animate({height:n},i.options.duration,function(){i.dropdown.dropdown.css("visibility",""),i.dropdown.element.addClass("uk-open"),t.Utils.checkDisplay(i.dropdown.dropdown,!0)}),i.pointerleave=!1},"hide.uk.dropdown":function(){i.overlay.stop().animate({height:0},i.options.duration)},"pointerenter.uk.dropdown":function(t,e){clearTimeout(i.remainIdle)},"pointerleave.uk.dropdown":function(t,e){i.pointerleave=!0}}),this.overlay.on({mouseenter:function(){i.remainIdle&&(clearTimeout(i.dropdown.remainIdle),clearTimeout(i.remainIdle))},mouseleave:function(){i.pointerleave&&o&&(i.remainIdle=setTimeout(function(){
o&&o.hide()},o.options.remaintime))}})}})}(UIkit),function(t){"use strict";var e=[];t.component("gridMatchHeight",{defaults:{target:!1,row:!0,ignorestacked:!1},boot:function(){t.ready(function(e){t.$("[data-uk-grid-match]",e).each(function(){var e,i=t.$(this);i.data("gridMatchHeight")||(e=t.gridMatchHeight(i,t.Utils.options(i.attr("data-uk-grid-match"))))})})},init:function(){var i=this;this.columns=this.element.children(),this.elements=this.options.target?this.find(this.options.target):this.columns,this.columns.length&&(t.$win.on("load resize orientationchange",function(){var e=function(){i.match()};return t.$(function(){e()}),t.Utils.debounce(e,50)}()),t.$html.on("changed.uk.dom",function(t){i.columns=i.element.children(),i.elements=i.options.target?i.find(i.options.target):i.columns,i.match()}),this.on("display.uk.check",function(t){this.element.is(":visible")&&this.match()}.bind(this)),e.push(this))},match:function(){var e=this.columns.filter(":visible:first");if(e.length){var i=Math.ceil(100*parseFloat(e.css("width"))/parseFloat(e.parent().css("width")))>=100;return i&&!this.options.ignorestacked?this.revert():t.Utils.matchHeights(this.elements,this.options),this}},revert:function(){return this.elements.css("min-height",""),this}}),t.component("gridMargin",{defaults:{cls:"uk-grid-margin"},boot:function(){t.ready(function(e){t.$("[data-uk-grid-margin]",e).each(function(){var e,i=t.$(this);i.data("gridMargin")||(e=t.gridMargin(i,t.Utils.options(i.attr("data-uk-grid-margin"))))})})},init:function(){t.stackMargin(this.element,this.options)}})}(UIkit),function(t){"use strict";function e(e,i){return i?("object"==typeof e?(e=e instanceof jQuery?e:t.$(e),e.parent().length&&(i.persist=e,i.persist.data("modalPersistParent",e.parent()))):e="string"==typeof e||"number"==typeof e?t.$("<div></div>").html(e):t.$("<div></div>").html("UIkit.modal Error: Unsupported data type: "+typeof e),e.appendTo(i.element.find(".uk-modal-dialog")),i):void 0}var i,o=!1,n=0,s=t.$html;t.component("modal",{defaults:{keyboard:!0,bgclose:!0,minScrollHeight:150,center:!1,modal:!0},scrollable:!1,transition:!1,hasTransitioned:!0,init:function(){if(i||(i=t.$("body")),this.element.length){var e=this;this.paddingdir="padding-"+("left"==t.langdirection?"right":"left"),this.dialog=this.find(".uk-modal-dialog"),this.active=!1,this.element.attr("aria-hidden",this.element.hasClass("uk-open")),this.on("click",".uk-modal-close",function(t){t.preventDefault(),e.hide()}).on("click",function(i){var o=t.$(i.target);o[0]==e.element[0]&&e.options.bgclose&&e.hide()})}},toggle:function(){return this[this.isActive()?"hide":"show"]()},show:function(){if(this.element.length){var e=this;if(!this.isActive())return this.options.modal&&o&&o.hide(!0),this.element.removeClass("uk-open").show(),this.resize(),this.options.modal&&(o=this),this.active=!0,n++,t.support.transition?(this.hasTransitioned=!1,this.element.one(t.support.transition.end,function(){e.hasTransitioned=!0}).addClass("uk-open")):this.element.addClass("uk-open"),s.addClass("uk-modal-page").height(),this.element.attr("aria-hidden","false"),this.element.trigger("show.uk.modal"),t.Utils.checkDisplay(this.dialog,!0),this}},hide:function(e){if(!e&&t.support.transition&&this.hasTransitioned){var i=this;this.one(t.support.transition.end,function(){i._hide()}).removeClass("uk-open")}else this._hide();return this},resize:function(){var t=i.width();if(this.scrollbarwidth=window.innerWidth-t,i.css(this.paddingdir,this.scrollbarwidth),this.element.css("overflow-y",this.scrollbarwidth?"scroll":"auto"),!this.updateScrollable()&&this.options.center){var e=this.dialog.outerHeight(),o=parseInt(this.dialog.css("margin-top"),10)+parseInt(this.dialog.css("margin-bottom"),10);e+o<window.innerHeight?this.dialog.css({top:window.innerHeight/2-e/2-o}):this.dialog.css({top:""})}},updateScrollable:function(){var t=this.dialog.find(".uk-overflow-container:visible:first");if(t.length){t.css("height",0);var e=Math.abs(parseInt(this.dialog.css("margin-top"),10)),i=this.dialog.outerHeight(),o=window.innerHeight,n=o-2*(20>e?20:e)-i;return t.css("height",n<this.options.minScrollHeight?"":n),!0}return!1},_hide:function(){this.active=!1,n>0?n--:n=0,this.element.hide().removeClass("uk-open"),this.element.attr("aria-hidden","true"),n||(s.removeClass("uk-modal-page"),i.css(this.paddingdir,"")),o===this&&(o=!1),this.trigger("hide.uk.modal")},isActive:function(){return this.active}}),t.component("modalTrigger",{boot:function(){t.$html.on("click.modal.uikit","[data-uk-modal]",function(e){var i=t.$(this);if(i.is("a")&&e.preventDefault(),!i.data("modalTrigger")){var o=t.modalTrigger(i,t.Utils.options(i.attr("data-uk-modal")));o.show()}}),t.$html.on("keydown.modal.uikit",function(t){o&&27===t.keyCode&&o.options.keyboard&&(t.preventDefault(),o.hide())}),t.$win.on("resize orientationchange",t.Utils.debounce(function(){o&&o.resize()},150))},init:function(){var e=this;this.options=t.$.extend({target:e.element.is("a")?e.element.attr("href"):!1},this.options),this.modal=t.modal(this.options.target,this.options),this.on("click",function(t){t.preventDefault(),e.show()}),this.proxy(this.modal,"show hide isActive")}}),t.modal.dialog=function(i,o){var n=t.modal(t.$(t.modal.dialog.template).appendTo("body"),o);return n.on("hide.uk.modal",function(){n.persist&&(n.persist.appendTo(n.persist.data("modalPersistParent")),n.persist=!1),n.element.remove()}),e(i,n),n},t.modal.dialog.template='<div class="uk-modal"><div class="uk-modal-dialog" style="min-height:0;"></div></div>',t.modal.alert=function(e,i){i=t.$.extend(!0,{bgclose:!1,keyboard:!1,modal:!1,labels:t.modal.labels},i);var o=t.modal.dialog(['<div class="uk-margin uk-modal-content">'+String(e)+"</div>",'<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary uk-modal-close">'+i.labels.Ok+"</button></div>"].join(""),i);return o.on("show.uk.modal",function(){setTimeout(function(){o.element.find("button:first").focus()},50)}),o.show()},t.modal.confirm=function(e,i,o){i=t.$.isFunction(i)?i:function(){},o=t.$.extend(!0,{bgclose:!1,keyboard:!1,modal:!1,labels:t.modal.labels},o);var n=t.modal.dialog(['<div class="uk-margin uk-modal-content">'+String(e)+"</div>",'<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-modal-close">'+o.labels.Cancel+'</button> <button class="uk-button uk-button-primary js-modal-confirm">'+o.labels.Ok+"</button></div>"].join(""),o);return n.element.find(".js-modal-confirm").on("click",function(){i(),n.hide()}),n.on("show.uk.modal",function(){setTimeout(function(){n.element.find(".js-modal-confirm").focus()},50)}),n.show()},t.modal.prompt=function(e,i,o,n){o=t.$.isFunction(o)?o:function(t){},n=t.$.extend(!0,{bgclose:!1,keyboard:!1,modal:!1,labels:t.modal.labels},n);var s=t.modal.dialog([e?'<div class="uk-modal-content uk-form">'+String(e)+"</div>":"",'<div class="uk-margin-small-top uk-modal-content uk-form"><p><input type="text" class="uk-width-1-1"></p></div>','<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-modal-close">'+n.labels.Cancel+'</button> <button class="uk-button uk-button-primary js-modal-ok">'+n.labels.Ok+"</button></div>"].join(""),n),a=s.element.find("input[type='text']").val(i||"").on("keyup",function(t){13==t.keyCode&&s.element.find(".js-modal-ok").trigger("click")});return s.element.find(".js-modal-ok").on("click",function(){o(a.val())!==!1&&s.hide()}),s.on("show.uk.modal",function(){setTimeout(function(){a.focus()},50)}),s.show()},t.modal.blockUI=function(e,i){var o=t.modal.dialog(['<div class="uk-margin uk-modal-content">'+String(e||'<div class="uk-text-center">...</div>')+"</div>"].join(""),t.$.extend({bgclose:!1,keyboard:!1,modal:!1},i));return o.content=o.element.find(".uk-modal-content:first"),o.show()},t.modal.labels={Ok:"Ok",Cancel:"Cancel"}}(UIkit),function(t){"use strict";function e(e){var i=t.$(e),o="auto";if(i.is(":visible"))o=i.outerHeight();else{var n={position:i.css("position"),visibility:i.css("visibility"),display:i.css("display")};o=i.css({position:"absolute",visibility:"hidden",display:"block"}).outerHeight(),i.css(n)}return o}t.component("nav",{defaults:{toggle:">li.uk-parent > a[href='#']",lists:">li.uk-parent > ul",multiple:!1},boot:function(){t.ready(function(e){t.$("[data-uk-nav]",e).each(function(){var e=t.$(this);if(!e.data("nav")){t.nav(e,t.Utils.options(e.attr("data-uk-nav")))}})})},init:function(){var e=this;this.on("click.uikit.nav",this.options.toggle,function(i){i.preventDefault();var o=t.$(this);e.open(o.parent()[0]==e.element[0]?o:o.parent("li"))}),this.find(this.options.lists).each(function(){var i=t.$(this),o=i.parent(),n=o.hasClass("uk-active");i.wrap('<div style="overflow:hidden;height:0;position:relative;"></div>'),o.data("list-container",i.parent()[n?"removeClass":"addClass"]("uk-hidden")),o.attr("aria-expanded",o.hasClass("uk-open")),n&&e.open(o,!0)})},open:function(i,o){var n=this,s=this.element,a=t.$(i),r=a.data("list-container");this.options.multiple||s.children(".uk-open").not(i).each(function(){var e=t.$(this);e.data("list-container")&&e.data("list-container").stop().animate({height:0},function(){t.$(this).parent().removeClass("uk-open").end().addClass("uk-hidden")})}),a.toggleClass("uk-open"),a.attr("aria-expanded",a.hasClass("uk-open")),r&&(a.hasClass("uk-open")&&r.removeClass("uk-hidden"),o?(r.stop().height(a.hasClass("uk-open")?"auto":0),a.hasClass("uk-open")||r.addClass("uk-hidden"),this.trigger("display.uk.check")):r.stop().animate({height:a.hasClass("uk-open")?e(r.find("ul:first")):0},function(){a.hasClass("uk-open")?r.css("height",""):r.addClass("uk-hidden"),n.trigger("display.uk.check")}))}})}(UIkit),function(t){"use strict";var e={x:window.scrollX,y:window.scrollY},i=(t.$win,t.$doc,t.$html),o={show:function(o){if(o=t.$(o),o.length){var n=t.$("body"),s=o.find(".uk-offcanvas-bar:first"),a="right"==t.langdirection,r=s.hasClass("uk-offcanvas-bar-flip")?-1:1,l=r*(a?-1:1),d=window.innerWidth-n.width();e={x:window.pageXOffset,y:window.pageYOffset},o.addClass("uk-active"),n.css({width:window.innerWidth-d,height:window.innerHeight}).addClass("uk-offcanvas-page"),n.css(a?"margin-right":"margin-left",(a?-1:1)*(s.outerWidth()*l)).width(),i.css("margin-top",-1*e.y),s.addClass("uk-offcanvas-bar-show"),this._initElement(o),s.trigger("show.uk.offcanvas",[o,s]),o.attr("aria-hidden","false")}},hide:function(o){var n=t.$("body"),s=t.$(".uk-offcanvas.uk-active"),a="right"==t.langdirection,r=s.find(".uk-offcanvas-bar:first"),l=function(){n.removeClass("uk-offcanvas-page").css({width:"",height:"","margin-left":"","margin-right":""}),s.removeClass("uk-active"),r.removeClass("uk-offcanvas-bar-show"),i.css("margin-top",""),window.scrollTo(e.x,e.y),r.trigger("hide.uk.offcanvas",[s,r]),s.attr("aria-hidden","true")};s.length&&(t.support.transition&&!o?(n.one(t.support.transition.end,function(){l()}).css(a?"margin-right":"margin-left",""),setTimeout(function(){r.removeClass("uk-offcanvas-bar-show")},0)):l())},_initElement:function(e){e.data("OffcanvasInit")||(e.on("click.uk.offcanvas swipeRight.uk.offcanvas swipeLeft.uk.offcanvas",function(e){var i=t.$(e.target);if(!e.type.match(/swipe/)&&!i.hasClass("uk-offcanvas-close")){if(i.hasClass("uk-offcanvas-bar"))return;if(i.parents(".uk-offcanvas-bar:first").length)return}e.stopImmediatePropagation(),o.hide()}),e.on("click","a[href^='#']",function(e){var i=t.$(this),n=i.attr("href");"#"!=n&&(t.$doc.one("hide.uk.offcanvas",function(){var e;try{e=t.$(n)}catch(o){e=""}e.length||(e=t.$('[name="'+n.replace("#","")+'"]')),e.length&&i.attr("data-uk-smooth-scroll")&&t.Utils.scrollToElement?t.Utils.scrollToElement(e,t.Utils.options(i.attr("data-uk-smooth-scroll")||"{}")):window.location.href=n}),o.hide())}),e.data("OffcanvasInit",!0))}};t.component("offcanvasTrigger",{boot:function(){i.on("click.offcanvas.uikit","[data-uk-offcanvas]",function(e){e.preventDefault();var i=t.$(this);if(!i.data("offcanvasTrigger")){t.offcanvasTrigger(i,t.Utils.options(i.attr("data-uk-offcanvas")));i.trigger("click")}}),i.on("keydown.uk.offcanvas",function(t){27===t.keyCode&&o.hide()})},init:function(){var e=this;this.options=t.$.extend({target:e.element.is("a")?e.element.attr("href"):!1},this.options),this.on("click",function(t){t.preventDefault(),o.show(e.options.target)})}}),t.offcanvas=o}(UIkit),function(t){"use strict";function e(e,i,o){var n,s=t.$.Deferred(),a=e,r=e;return o[0]===i[0]?(s.resolve(),s.promise()):("object"==typeof e&&(a=e[0],r=e[1]||e[0]),t.$body.css("overflow-x","hidden"),n=function(){i&&i.hide().removeClass("uk-active "+r+" uk-animation-reverse"),o.addClass(a).one(t.support.animation.end,function(){o.removeClass(""+a).css({opacity:"",display:""}),s.resolve(),t.$body.css("overflow-x",""),i&&i.css({opacity:"",display:""})}.bind(this)).show()},o.css("animation-duration",this.options.duration+"ms"),i&&i.length?(i.css("animation-duration",this.options.duration+"ms"),i.css("display","none").addClass(r+" uk-animation-reverse").one(t.support.animation.end,function(){n()}.bind(this)).css("display","")):(o.addClass("uk-active"),n()),s.promise())}var i;t.component("switcher",{defaults:{connect:!1,toggle:">*",active:0,animation:!1,duration:200,swiping:!0},animating:!1,boot:function(){t.ready(function(e){t.$("[data-uk-switcher]",e).each(function(){var e=t.$(this);if(!e.data("switcher")){t.switcher(e,t.Utils.options(e.attr("data-uk-switcher")))}})})},init:function(){var e=this;if(this.on("click.uikit.switcher",this.options.toggle,function(t){t.preventDefault(),e.show(this)}),this.options.connect){this.connect=t.$(this.options.connect),this.connect.find(".uk-active").removeClass(".uk-active"),this.connect.length&&(this.connect.children().attr("aria-hidden","true"),this.connect.on("click","[data-uk-switcher-item]",function(i){i.preventDefault();var o=t.$(this).attr("data-uk-switcher-item");if(e.index!=o)switch(o){case"next":case"previous":e.show(e.index+("next"==o?1:-1));break;default:e.show(parseInt(o,10))}}),this.options.swiping&&this.connect.on("swipeRight swipeLeft",function(t){t.preventDefault(),window.getSelection().toString()||e.show(e.index+("swipeLeft"==t.type?1:-1))}));var i=this.find(this.options.toggle),o=i.filter(".uk-active");if(o.length)this.show(o,!1);else{if(this.options.active===!1)return;o=i.eq(this.options.active),this.show(o.length?o:i.eq(0),!1)}i.not(o).attr("aria-expanded","false"),o.attr("aria-expanded","true"),this.on("changed.uk.dom",function(){e.connect=t.$(e.options.connect)})}},show:function(o,n){if(!this.animating){if(isNaN(o))o=t.$(o);else{var s=this.find(this.options.toggle);o=0>o?s.length-1:o,o=s.eq(s[o]?o:0)}var a=this,s=this.find(this.options.toggle),r=t.$(o),l=i[this.options.animation]||function(t,o){if(!a.options.animation)return i.none.apply(a);var n=a.options.animation.split(",");return 1==n.length&&(n[1]=n[0]),n[0]=n[0].trim(),n[1]=n[1].trim(),e.apply(a,[n,t,o])};n!==!1&&t.support.animation||(l=i.none),r.hasClass("uk-disabled")||(s.attr("aria-expanded","false"),r.attr("aria-expanded","true"),s.filter(".uk-active").removeClass("uk-active"),r.addClass("uk-active"),this.options.connect&&this.connect.length&&(this.index=this.find(this.options.toggle).index(r),-1==this.index&&(this.index=0),this.connect.each(function(){var e=t.$(this),i=t.$(e.children()),o=t.$(i.filter(".uk-active")),n=t.$(i.eq(a.index));a.animating=!0,l.apply(a,[o,n]).then(function(){o.removeClass("uk-active"),n.addClass("uk-active"),o.attr("aria-hidden","true"),n.attr("aria-hidden","false"),t.Utils.checkDisplay(n,!0),a.animating=!1})})),this.trigger("show.uk.switcher",[r]))}}}),i={none:function(){var e=t.$.Deferred();return e.resolve(),e.promise()},fade:function(t,i){return e.apply(this,["uk-animation-fade",t,i])},"slide-bottom":function(t,i){return e.apply(this,["uk-animation-slide-bottom",t,i])},"slide-top":function(t,i){return e.apply(this,["uk-animation-slide-top",t,i])},"slide-vertical":function(t,i,o){var n=["uk-animation-slide-top","uk-animation-slide-bottom"];return t&&t.index()>i.index()&&n.reverse(),e.apply(this,[n,t,i])},"slide-left":function(t,i){return e.apply(this,["uk-animation-slide-left",t,i])},"slide-right":function(t,i){return e.apply(this,["uk-animation-slide-right",t,i])},"slide-horizontal":function(t,i,o){var n=["uk-animation-slide-right","uk-animation-slide-left"];return t&&t.index()>i.index()&&n.reverse(),e.apply(this,[n,t,i])},scale:function(t,i){return e.apply(this,["uk-animation-scale-up",t,i])}},t.switcher.animations=i}(UIkit),function(t){"use strict";t.component("tab",{defaults:{target:">li:not(.uk-tab-responsive, .uk-disabled)",connect:!1,active:0,animation:!1,duration:200,swiping:!0},boot:function(){t.ready(function(e){t.$("[data-uk-tab]",e).each(function(){var e=t.$(this);if(!e.data("tab")){t.tab(e,t.Utils.options(e.attr("data-uk-tab")))}})})},init:function(){var e=this;this.current=!1,this.on("click.uikit.tab",this.options.target,function(i){if(i.preventDefault(),!e.switcher||!e.switcher.animating){var o=e.find(e.options.target).not(this);o.removeClass("uk-active").blur(),e.trigger("change.uk.tab",[t.$(this).addClass("uk-active"),e.current]),e.current=t.$(this),e.options.connect||(o.attr("aria-expanded","false"),t.$(this).attr("aria-expanded","true"))}}),this.options.connect&&(this.connect=t.$(this.options.connect)),this.responsivetab=t.$('<li class="uk-tab-responsive uk-active"><a></a></li>').append('<div class="uk-dropdown uk-dropdown-small"><ul class="uk-nav uk-nav-dropdown"></ul><div>'),this.responsivetab.dropdown=this.responsivetab.find(".uk-dropdown"),this.responsivetab.lst=this.responsivetab.dropdown.find("ul"),this.responsivetab.caption=this.responsivetab.find("a:first"),this.element.hasClass("uk-tab-bottom")&&this.responsivetab.dropdown.addClass("uk-dropdown-up"),this.responsivetab.lst.on("click.uikit.tab","a",function(i){i.preventDefault(),i.stopPropagation();var o=t.$(this);e.element.children("li:not(.uk-tab-responsive)").eq(o.data("index")).trigger("click")}),this.on("show.uk.switcher change.uk.tab",function(t,i){e.responsivetab.caption.html(i.text())}),this.element.append(this.responsivetab),this.options.connect&&(this.switcher=t.switcher(this.element,{toggle:">li:not(.uk-tab-responsive)",connect:this.options.connect,active:this.options.active,animation:this.options.animation,duration:this.options.duration,swiping:this.options.swiping})),t.dropdown(this.responsivetab,{mode:"click"}),e.trigger("change.uk.tab",[this.element.find(this.options.target).not(".uk-tab-responsive").filter(".uk-active")]),this.check(),t.$win.on("resize orientationchange",t.Utils.debounce(function(){e.element.is(":visible")&&e.check()},100)),this.on("display.uk.check",function(){e.element.is(":visible")&&e.check()})},check:function(){var e=this.element.children("li:not(.uk-tab-responsive)").removeClass("uk-hidden");if(!e.length)return void this.responsivetab.addClass("uk-hidden");var i,o,n,s=e.eq(0).offset().top+Math.ceil(e.eq(0).height()/2),a=!1;if(this.responsivetab.lst.empty(),e.each(function(){t.$(this).offset().top>s&&(a=!0)}),a)for(var r=0;r<e.length;r++)i=t.$(e.eq(r)),o=i.find("a"),"none"==i.css("float")||i.attr("uk-dropdown")||(i.hasClass("uk-disabled")||(n=i[0].outerHTML.replace("<a ",'<a data-index="'+r+'" '),this.responsivetab.lst.append(n)),i.addClass("uk-hidden"));this.responsivetab[this.responsivetab.lst.children("li").length?"removeClass":"addClass"]("uk-hidden")}})}(UIkit),function(t){"use strict";t.component("cover",{defaults:{automute:!0},boot:function(){t.ready(function(e){t.$("[data-uk-cover]",e).each(function(){var e=t.$(this);if(!e.data("cover")){t.cover(e,t.Utils.options(e.attr("data-uk-cover")))}})})},init:function(){if(this.parent=this.element.parent(),t.$win.on("load resize orientationchange",t.Utils.debounce(function(){this.check()}.bind(this),100)),this.on("display.uk.check",function(t){this.element.is(":visible")&&this.check()}.bind(this)),this.check(),this.element.is("iframe")&&this.options.automute){var e=this.element.attr("src");this.element.attr("src","").on("load",function(){this.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}',"*")}).attr("src",[e,e.indexOf("?")>-1?"&":"?","enablejsapi=1&api=1"].join(""))}},check:function(){this.element.css({width:"",height:""}),this.dimension={w:this.element.width(),h:this.element.height()},this.element.attr("width")&&!isNaN(this.element.attr("width"))&&(this.dimension.w=this.element.attr("width")),this.element.attr("height")&&!isNaN(this.element.attr("height"))&&(this.dimension.h=this.element.attr("height")),this.ratio=this.dimension.w/this.dimension.h;var t,e,i=this.parent.width(),o=this.parent.height();i/this.ratio<o?(t=Math.ceil(o*this.ratio),e=o):(t=i,e=Math.ceil(i/this.ratio)),this.element.css({width:t,height:e})}})}(UIkit),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-accordion",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(e){var i=t.$(e),o="auto";if(i.is(":visible"))o=i.outerHeight();else{var n={position:i.css("position"),visibility:i.css("visibility"),display:i.css("display")};o=i.css({position:"absolute",visibility:"hidden",display:"block"}).outerHeight(),i.css(n)}return o}return t.component("accordion",{defaults:{showfirst:!0,collapse:!0,animate:!0,easing:"swing",duration:300,toggle:".uk-accordion-title",containers:".uk-accordion-content",clsactive:"uk-active"},boot:function(){t.ready(function(e){setTimeout(function(){t.$("[data-uk-accordion]",e).each(function(){var e=t.$(this);e.data("accordion")||t.accordion(e,t.Utils.options(e.attr("data-uk-accordion")))})},0)})},init:function(){var e=this;this.element.on("click.uikit.accordion",this.options.toggle,function(i){i.preventDefault(),e.toggleItem(t.$(this).data("wrapper"),e.options.animate,e.options.collapse)}),this.update(),this.options.showfirst&&this.toggleItem(this.toggle.eq(0).data("wrapper"),!1,!1)},toggleItem:function(i,o,n){var s=this;i.data("toggle").toggleClass(this.options.clsactive);var a=i.data("toggle").hasClass(this.options.clsactive);n&&(this.toggle.not(i.data("toggle")).removeClass(this.options.clsactive),this.content.not(i.data("content")).parent().stop().css("overflow","hidden").animate({height:0},{easing:this.options.easing,duration:o?this.options.duration:0}).attr("aria-expanded","false")),i.stop().css("overflow","hidden"),o?i.animate({height:a?e(i.data("content")):0},{easing:this.options.easing,duration:this.options.duration,complete:function(){a&&(i.css({overflow:"",height:"auto"}),t.Utils.checkDisplay(i.data("content"))),s.trigger("display.uk.check")}}):(i.height(a?"auto":0),a&&(i.css({overflow:""}),t.Utils.checkDisplay(i.data("content"))),this.trigger("display.uk.check")),i.attr("aria-expanded",a),this.element.trigger("toggle.uk.accordion",[a,i.data("toggle"),i.data("content")])},update:function(){var e,i,o,n=this;this.toggle=this.find(this.options.toggle),this.content=this.find(this.options.containers),this.content.each(function(s){e=t.$(this),e.parent().data("wrapper")?i=e.parent():(i=t.$(this).wrap('<div data-wrapper="true" style="overflow:hidden;height:0;position:relative;"></div>').parent(),i.attr("aria-expanded","false")),o=n.toggle.eq(s),i.data("toggle",o),i.data("content",e),o.data("wrapper",i),e.data("wrapper",i)}),this.element.trigger("update.uk.accordion",[this])}}),t.accordion}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-autocomplete",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";var e;return t.component("autocomplete",{defaults:{minLength:3,param:"search",method:"post",delay:300,loadingClass:"uk-loading",flipDropdown:!1,skipClass:"uk-skip",hoverClass:"uk-active",source:null,renderer:null,template:'<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">{{~items}}<li data-value="{{$item.value}}"><a>{{$item.value}}</a></li>{{/items}}</ul>'},visible:!1,value:null,selected:null,boot:function(){t.$html.on("focus.autocomplete.uikit","[data-uk-autocomplete]",function(e){var i=t.$(this);i.data("autocomplete")||t.autocomplete(i,t.Utils.options(i.attr("data-uk-autocomplete")))}),t.$html.on("click.autocomplete.uikit",function(t){e&&t.target!=e.input[0]&&e.hide()})},init:function(){var e=this,i=!1,o=t.Utils.debounce(function(t){return i?i=!1:void e.handle()},this.options.delay);this.dropdown=this.find(".uk-dropdown"),this.template=this.find('script[type="text/autocomplete"]').html(),this.template=t.Utils.template(this.template||this.options.template),this.input=this.find("input:first").attr("autocomplete","off"),this.dropdown.length||(this.dropdown=t.$('<div class="uk-dropdown"></div>').appendTo(this.element)),this.options.flipDropdown&&this.dropdown.addClass("uk-dropdown-flip"),this.dropdown.attr("aria-expanded","false"),this.input.on({keydown:function(t){if(t&&t.which&&!t.shiftKey)switch(t.which){case 13:i=!0,e.selected&&(t.preventDefault(),e.select());break;case 38:t.preventDefault(),e.pick("prev",!0);break;case 40:t.preventDefault(),e.pick("next",!0);break;case 27:case 9:e.hide()}},keyup:o}),this.dropdown.on("click",".uk-autocomplete-results > *",function(){e.select()}),this.dropdown.on("mouseover",".uk-autocomplete-results > *",function(){e.pick(t.$(this))}),this.triggercomplete=o},handle:function(){var t=this,e=this.value;return this.value=this.input.val(),this.value.length<this.options.minLength?this.hide():(this.value!=e&&t.request(),this)},pick:function(e,i){var o=this,n=t.$(this.dropdown.find(".uk-autocomplete-results").children(":not(."+this.options.skipClass+")")),s=!1;if("string"==typeof e||e.hasClass(this.options.skipClass)){if("next"==e||"prev"==e){if(this.selected){var a=n.index(this.selected);s="next"==e?n.eq(a+1<n.length?a+1:0):n.eq(0>a-1?n.length-1:a-1)}else s=n["next"==e?"first":"last"]();s=t.$(s)}}else s=e;if(s&&s.length&&(this.selected=s,n.removeClass(this.options.hoverClass),this.selected.addClass(this.options.hoverClass),i)){var r=s.position().top,l=o.dropdown.scrollTop(),d=o.dropdown.height();(r>d||0>r)&&o.dropdown.scrollTop(l+r)}},select:function(){if(this.selected){var t=this.selected.data();this.trigger("selectitem.uk.autocomplete",[t,this]),t.value&&this.input.val(t.value).trigger("change"),this.hide()}},show:function(){return this.visible?void 0:(this.visible=!0,this.element.addClass("uk-open"),e&&e!==this&&e.hide(),e=this,this.dropdown.attr("aria-expanded","true"),this)},hide:function(){return this.visible?(this.visible=!1,this.element.removeClass("uk-open"),e===this&&(e=!1),this.dropdown.attr("aria-expanded","false"),this):void 0},request:function(){var e=this,i=function(t){t&&e.render(t),e.element.removeClass(e.options.loadingClass)};if(this.element.addClass(this.options.loadingClass),this.options.source){var o=this.options.source;switch(typeof this.options.source){case"function":this.options.source.apply(this,[i]);break;case"object":if(o.length){var n=[];o.forEach(function(t){t.value&&-1!=t.value.toLowerCase().indexOf(e.value.toLowerCase())&&n.push(t)}),i(n)}break;case"string":var s={};s[this.options.param]=this.value,t.$.ajax({url:this.options.source,data:s,type:this.options.method,dataType:"json"}).done(function(t){i(t||[])});break;default:i(null)}}else this.element.removeClass(e.options.loadingClass)},render:function(t){return this.dropdown.empty(),this.selected=!1,this.options.renderer?this.options.renderer.apply(this,[t]):t&&t.length&&(this.dropdown.append(this.template({items:t})),this.show(),this.trigger("show.uk.autocomplete")),this}}),t.autocomplete}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-datepicker",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";var e,i=!1;return t.component("datepicker",{defaults:{mobile:!1,weekstart:1,i18n:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},format:"DD.MM.YYYY",offsettop:5,maxDate:!1,minDate:!1,pos:"auto",addClass:"",template:function(e,i){var o,n="";if(n+='<div class="uk-datepicker-nav uk-clearfix">',n+='<a href="" class="uk-datepicker-previous"></a>',n+='<a href="" class="uk-datepicker-next"></a>',t.formSelect){var s,a,r,l,d=(new Date).getFullYear(),h=[];for(o=0;o<i.i18n.months.length;o++)o==e.month?h.push('<option value="'+o+'" selected>'+i.i18n.months[o]+"</option>"):h.push('<option value="'+o+'">'+i.i18n.months[o]+"</option>");for(s='<span class="uk-form-select">'+i.i18n.months[e.month]+'<select class="update-picker-month">'+h.join("")+"</select></span>",h=[],r=e.minDate?e.minDate.year():d-50,l=e.maxDate?e.maxDate.year():d+20,o=r;l>=o;o++)o==e.year?h.push('<option value="'+o+'" selected>'+o+"</option>"):h.push('<option value="'+o+'">'+o+"</option>");a='<span class="uk-form-select">'+e.year+'<select class="update-picker-year">'+h.join("")+"</select></span>",n+='<div class="uk-datepicker-heading">'+s+" "+a+"</div>"}else n+='<div class="uk-datepicker-heading">'+i.i18n.months[e.month]+" "+e.year+"</div>";for(n+="</div>",n+='<table class="uk-datepicker-table">',n+="<thead>",o=0;o<e.weekdays.length;o++)e.weekdays[o]&&(n+="<th>"+e.weekdays[o]+"</th>");for(n+="</thead>",n+="<tbody>",o=0;o<e.days.length;o++)if(e.days[o]&&e.days[o].length){n+="<tr>";for(var u=0;u<e.days[o].length;u++)if(e.days[o][u]){var c=e.days[o][u],p=[];c.inmonth||p.push("uk-datepicker-table-muted"),c.selected&&p.push("uk-active"),c.disabled&&p.push("uk-datepicker-date-disabled uk-datepicker-table-muted"),n+='<td><a href="" class="'+p.join(" ")+'" data-date="'+c.day.format()+'">'+c.day.format("D")+"</a></td>"}n+="</tr>"}return n+="</tbody>",n+="</table>"}},boot:function(){t.$win.on("resize orientationchange",function(){i&&i.hide()}),t.$html.on("focus.datepicker.uikit","[data-uk-datepicker]",function(e){var i=t.$(this);i.data("datepicker")||(e.preventDefault(),t.datepicker(i,t.Utils.options(i.attr("data-uk-datepicker"))),i.trigger("focus"))}),t.$html.on("click focus","*",function(o){var n=t.$(o.target);!i||n[0]==e[0]||n.data("datepicker")||n.parents(".uk-datepicker:first").length||i.hide()})},init:function(){if(!t.support.touch||"date"!=this.element.attr("type")||this.options.mobile){var o=this;this.current=this.element.val()?moment(this.element.val(),this.options.format):moment(),this.on("click focus",function(){i!==o&&o.pick(this.value?this.value:o.options.minDate?o.options.minDate:"")}).on("change",function(){o.element.val()&&!moment(o.element.val(),o.options.format).isValid()&&o.element.val(moment().format(o.options.format))}),e||(e=t.$('<div class="uk-dropdown uk-datepicker '+o.options.addClass+'"></div>'),e.on("click",".uk-datepicker-next, .uk-datepicker-previous, [data-date]",function(o){o.stopPropagation(),o.preventDefault();var n=t.$(this);return n.hasClass("uk-datepicker-date-disabled")?!1:void(n.is("[data-date]")?(i.current=moment(n.data("date")),i.element.val(i.current.format(i.options.format)).trigger("change"),e.removeClass("uk-dropdown-shown"),setTimeout(function(){e.removeClass("uk-dropdown-active")},280),i.hide()):i.add(n.hasClass("uk-datepicker-next")?1:-1,"months"))}),e.on("change",".update-picker-month, .update-picker-year",function(){var e=t.$(this);i[e.is(".update-picker-year")?"setYear":"setMonth"](Number(e.val()))}),e.appendTo("body"))}},pick:function(o){var n=this.element.offset(),s=n.left,a=n.top,r={left:s,right:""};this.current=o?moment(o,this.options.format):moment(),this.initdate=this.current.format("YYYY-MM-DD"),this.update(),"right"==t.langdirection&&(r.right=window.innerWidth-(r.left+this.element.outerWidth()),r.left="");var l=a-this.element.outerHeight()+this.element.height()-this.options.offsettop-e.outerHeight(),d=a+this.element.outerHeight()+this.options.offsettop;r.top=d,"top"==this.options.pos?(r.top=l,e.addClass("uk-dropdown-up")):"auto"==this.options.pos&&window.innerHeight-d-e.outerHeight()+$body.scrollTop()<0&&l>=0&&(r.top=l,e.addClass("uk-dropdown-up")),r.minWidth=e.actual("outerWidth"),e.css(r).addClass("uk-dropdown-active uk-dropdown-shown"),this.trigger("show.uk.datepicker"),
i=this},add:function(t,e){this.current.add(t,e),this.update()},setMonth:function(t){this.current.month(t),this.update()},setYear:function(t){this.current.year(t),this.update()},update:function(){var t=this.getRows(this.current.year(),this.current.month()),i=this.options.template(t,this.options);e.html(i),this.trigger("update.uk.datepicker")},getRows:function(t,e){var i=this.options,o=moment().format("YYYY-MM-DD"),n=[31,t%4===0&&t%100!==0||t%400===0?29:28,31,30,31,30,31,31,30,31,30,31][e],s=new Date(t,e,1,12).getDay(),a={month:e,year:t,weekdays:[],days:[],maxDate:!1,minDate:!1},r=[];i.maxDate!==!1&&(a.maxDate=isNaN(i.maxDate)?moment(i.maxDate,i.format):moment().add(i.maxDate,"days")),i.minDate!==!1&&(a.minDate=isNaN(i.minDate)?moment(i.minDate,i.format):moment().add(i.minDate-1,"days")),a.weekdays=function(){for(var t=0,e=[];7>t;t++){for(var o=t+(i.weekstart||0);o>=7;)o-=7;e.push(i.i18n.weekdays[o])}return e}(),i.weekstart&&i.weekstart>0&&(s-=i.weekstart,0>s&&(s+=7));for(var l=n+s,d=l;d>7;)d-=7;l+=7-d;for(var h,u,c,p,f,m=0,g=0;l>m;m++)h=new Date(t,e,1+(m-s),12),u=a.minDate&&a.minDate>h||a.maxDate&&h>a.maxDate,f=!(s>m||m>=n+s),h=moment(h),c=this.initdate==h.format("YYYY-MM-DD"),p=o==h.format("YYYY-MM-DD"),r.push({selected:c,today:p,disabled:u,day:h,inmonth:f}),7===++g&&(a.days.push(r),r=[],g=0);return a},hide:function(){i&&i===this&&(e.removeClass("uk-dropdown-shown"),setTimeout(function(){e.removeClass("uk-dropdown-active uk-dropdown-up")},280),i=!1,this.trigger("hide.uk.datepicker"))}}),t.Utils.moment=moment(),t.datepicker}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-form-password",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";return t.component("formPassword",{defaults:{lblShow:"Show",lblHide:"Hide"},boot:function(){t.$html.on("click.formpassword.uikit","[data-uk-form-password]",function(e){var i=t.$(this);i.data("formPassword")||(e.preventDefault(),t.formPassword(i,t.Utils.options(i.attr("data-uk-form-password"))),i.trigger("click"))})},init:function(){var t=this;this.on("click",function(e){if(e.preventDefault(),t.input.length){var i=t.input.attr("type");t.input.attr("type","text"==i?"password":"text"),t.element.html(t.options["text"==i?"lblShow":"lblHide"])}}),this.input=this.element.next("input").length?this.element.next("input"):this.element.prev("input"),this.element.html(this.options[this.input.is("[type='password']")?"lblShow":"lblHide"]),this.element.data("formPassword",this)}}),t.formPassword}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-form-select",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";return t.component("formSelect",{defaults:{target:">span:first",activeClass:"uk-active"},boot:function(){t.ready(function(e){t.$("[data-uk-form-select]",e).each(function(){var e=t.$(this);e.data("formSelect")||t.formSelect(e,t.Utils.options(e.attr("data-uk-form-select")))})})},init:function(){var t=this;this.target=this.find(this.options.target),this.select=this.find("select"),this.select.on("change",function(){var e=t.select[0],i=function(){try{t.target.text(e.options[e.selectedIndex].text)}catch(o){}return t.element[t.select.val()?"addClass":"removeClass"](t.options.activeClass),i};return i()}()),this.element.data("formSelect",this)}}),t.formSelect}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-grid",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(t){return i(t)}t.component("grid",{defaults:{colwidth:"auto",animation:!0,duration:300,gutter:0,controls:!1,filter:!1},boot:function(){t.ready(function(e){t.$("[data-uk-grid]",e).each(function(){var e=t.$(this);e.data("grid")||t.grid(e,t.Utils.options(e.attr("data-uk-grid")))})})},init:function(){var e=this,i=String(this.options.gutter).trim().split(" ");this.gutterv=parseInt(i[0],10),this.gutterh=parseInt(i[1]||i[0],10),this.element.css({position:"relative"}),this.controls=null,this.options.controls&&(this.controls=t.$(this.options.controls),this.controls.on("click","[data-uk-filter]",function(i){i.preventDefault(),e.filter(t.$(this).data("ukFilter"))}),this.controls.on("click","[data-uk-sort]",function(i){i.preventDefault();var o=t.$(this).attr("data-uk-sort").split(":");e.sort(o[0],o[1])})),t.$win.on("load resize orientationchange",t.Utils.debounce(function(){e.currentfilter?e.filter(e.currentfilter):this.updateLayout()}.bind(this),100)),this.on("display.uk.check",function(){e.element.is(":visible")&&e.updateLayout()}),t.$html.on("changed.uk.dom",function(t){e.updateLayout()}),this.options.filter!==!1?this.filter(this.options.filter):this.updateLayout()},_prepareElements:function(){var t,e=this.element.children(":not([data-grid-prepared])");e.length&&(t={position:"absolute","box-sizing":"border-box",width:"auto"==this.options.colwidth?"":this.options.colwidth},this.options.gutter&&(t["padding-left"]=this.gutterh,t["padding-bottom"]=this.gutterv,this.element.css("margin-left",-1*this.gutterh)),e.attr("data-grid-prepared","true").css(t))},updateLayout:function(i){this._prepareElements(),i=i||this.element.children(":visible");var o,n,s,a,r,l,d,h,u=i,c=this.element.width()+2*this.gutterh+2,p=0,f=0,m=[];this.trigger("beforeupdate.uk.grid",[u]),u.each(function(i){for(h=e(this),o=t.$(this),n=h.outerWidth,s=h.outerHeight,p=0,f=0,r=0,d=m.length;d>r;r++)a=m[r],p<=a.aX&&(p=a.aX),p+n>c&&(p=0),f<=a.aY&&(f=a.aY);m.push({ele:o,top:f,left:p,width:n,height:s,aY:f+s,aX:p+n})});var g,v=0;for(r=0,d=m.length;d>r;r++){for(a=m[r],f=0,l=0;r>l;l++)g=m[l],a.left<g.aX&&g.left+1<a.aX&&(f=g.aY);a.top=f,a.aY=f+a.height,v=Math.max(v,a.aY)}v-=this.gutterv,this.options.animation?(this.element.stop().animate({height:v},100),m.forEach(function(t){t.ele.stop().animate({top:t.top,left:t.left,opacity:1},this.options.duration)}.bind(this))):(this.element.css("height",v),m.forEach(function(t){t.ele.css({top:t.top,left:t.left,opacity:1})}.bind(this))),setTimeout(function(){t.$doc.trigger("scrolling.uk.document")},2*this.options.duration*(this.options.animation?1:0)),this.trigger("afterupdate.uk.grid",[u])},filter:function(e){this.currentfilter=e,e=e||[],"string"==typeof e&&(e=e.split(/,/).map(function(t){return t.trim()}));var i=this,o=this.element.children(),n={visible:[],hidden:[]};o.each(function(i){var o=t.$(this),s=o.attr("data-uk-filter"),a=e.length?!1:!0;s&&(s=s.split(/,/).map(function(t){return t.trim()}),e.forEach(function(t){s.indexOf(t)>-1&&(a=!0)})),n[a?"visible":"hidden"].push(o)}),n.hidden=t.$(n.hidden).map(function(){return this[0]}),n.visible=t.$(n.visible).map(function(){return this[0]}),n.hidden.attr("aria-hidden","true").filter(":visible").fadeOut(this.options.duration),n.visible.attr("aria-hidden","false").filter(":hidden").css("opacity",0).show(),i.updateLayout(n.visible),this.controls&&this.controls.length&&this.controls.find("[data-uk-filter]").removeClass("uk-active").filter('[data-uk-filter="'+e+'"]').addClass("uk-active")},sort:function(e,i){i=i||1,"string"==typeof i&&(i="desc"==i.toLowerCase()?-1:1);var o=this.element.children();o.sort(function(o,n){return o=t.$(o),n=t.$(n),(n.data(e)||"")<(o.data(e)||"")?i:-1*i}).appendTo(this.element),this.updateLayout(o.filter(":visible")),this.controls&&this.controls.length&&this.controls.find("[data-uk-sort]").removeClass("uk-active").filter('[data-uk-sort="'+e+":"+(-1==i?"desc":"asc")+'"]').addClass("uk-active")}});var i=function(){function t(t){if(t){if("string"==typeof h[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,i=0,o=d.length;o>i;i++)if(e=d[i]+t,"string"==typeof h[e])return e}}function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){}function o(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=c.length;i>e;e++){var o=c[e];t[o]=0}return t}function n(){if(!p){p=!0;var i=window.getComputedStyle;if(a=function(){var t=i?function(t){return i(t,null)}:function(t){return t.currentStyle};return function(e){var i=t(e);return i||u("Style returned "+i+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),i}}(),r=t("boxSizing")){var o=document.createElement("div");o.style.width="200px",o.style.padding="1px 2px 3px 4px",o.style.borderStyle="solid",o.style.borderWidth="1px 2px 3px 4px",o.style[r]="border-box";var n=document.body||document.documentElement;n.appendChild(o);var s=a(o);l=200===e(s.width),n.removeChild(o)}}}function s(t){if(n(),"string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var i=a(t);if("none"===i.display)return o();var s={};s.width=t.offsetWidth,s.height=t.offsetHeight;for(var d=s.isBorderBox=!(!r||!i[r]||"border-box"!==i[r]),h=0,u=c.length;u>h;h++){var p=c[h],f=i[p],m=parseFloat(f);s[p]=isNaN(m)?0:m}var g=s.paddingLeft+s.paddingRight,v=s.paddingTop+s.paddingBottom,k=s.marginLeft+s.marginRight,w=s.marginTop+s.marginBottom,b=s.borderLeftWidth+s.borderRightWidth,y=s.borderTopWidth+s.borderBottomWidth,$=d&&l,C=e(i.width);C!==!1&&(s.width=C+($?0:g+b));var x=e(i.height);return x!==!1&&(s.height=x+($?0:v+y)),s.innerWidth=s.width-(g+b),s.innerHeight=s.height-(v+y),s.outerWidth=s.width+k,s.outerHeight=s.height+w,s}}var a,r,l,d="Webkit Moz ms Ms O".split(" "),h=document.documentElement.style,u="undefined"==typeof console?i:function(t){console.error(t)},c=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],p=!1;return s}()}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-lightbox",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(e){return i?(i.lightbox=e,i):(i=t.$(['<div class="uk-modal">','<div class="uk-modal-dialog uk-modal-dialog-lightbox uk-slidenav-position" style="margin-left:auto;margin-right:auto;width:200px;height:200px;top:'+Math.abs(window.innerHeight/2-200)+'px;">','<a href="#" class="uk-modal-close uk-close uk-close-alt"></a>','<div class="uk-lightbox-content"></div>','<div class="uk-modal-spinner uk-hidden"></div>',"</div>","</div>"].join("")).appendTo("body"),i.dialog=i.find(".uk-modal-dialog:first"),i.content=i.find(".uk-lightbox-content:first"),i.loader=i.find(".uk-modal-spinner:first"),i.closer=i.find(".uk-close.uk-close-alt"),i.modal=t.modal(i,{modal:!1}),i.on("swipeRight swipeLeft",function(t){i.lightbox["swipeLeft"==t.type?"next":"previous"]()}).on("click","[data-lightbox-previous], [data-lightbox-next]",function(e){e.preventDefault(),i.lightbox[t.$(this).is("[data-lightbox-next]")?"next":"previous"]()}),i.on("hide.uk.modal",function(t){i.content.html("")}),t.$win.on("load resize orientationchange",t.Utils.debounce(function(e){i.is(":visible")&&!t.Utils.isFullscreen()&&i.lightbox.fitSize()}.bind(this),100)),i.lightbox=e,i)}var i,o={};return t.component("lightbox",{defaults:{group:!1,duration:400,keyboard:!0},index:0,items:!1,boot:function(){t.$html.on("click","[data-uk-lightbox]",function(e){e.preventDefault();var i=t.$(this);i.data("lightbox")||t.lightbox(i,t.Utils.options(i.attr("data-uk-lightbox"))),i.data("lightbox").show(i)}),t.$doc.on("keyup",function(t){if(i&&i.is(":visible")&&i.lightbox.options.keyboard)switch(t.preventDefault(),t.keyCode){case 37:i.lightbox.previous();break;case 39:i.lightbox.next()}})},init:function(){var e=[];if(this.index=0,this.siblings=[],this.element&&this.element.length){var i=this.options.group?t.$(['[data-uk-lightbox*="'+this.options.group+'"]',"[data-uk-lightbox*='"+this.options.group+"']"].join(",")):this.element;i.each(function(){var i=t.$(this);e.push({source:i.attr("href"),title:i.attr("title"),type:i.attr("data-lightbox-type")||"auto",link:i})}),this.index=i.index(this.element),this.siblings=e}else this.options.group&&this.options.group.length&&(this.siblings=this.options.group);this.trigger("lightbox-init",[this])},show:function(i){this.modal=e(this),this.modal.dialog.stop(),this.modal.content.stop();var o,n,s=this,a=t.$.Deferred();i=i||0,"object"==typeof i&&this.siblings.forEach(function(t,e){i[0]===t.link[0]&&(i=e)}),0>i?i=this.siblings.length-i:this.siblings[i]||(i=0),n=this.siblings[i],o={lightbox:s,source:n.source,type:n.type,index:i,promise:a,title:n.title,item:n,meta:{content:"",width:null,height:null}},this.index=i,this.modal.content.empty(),this.modal.is(":visible")||(this.modal.content.css({width:"",height:""}).empty(),this.modal.modal.show()),this.modal.loader.removeClass("uk-hidden"),a.promise().done(function(){s.data=o,s.fitSize(o)}).fail(function(){o.meta.content='<div class="uk-position-cover uk-flex uk-flex-middle uk-flex-center"><strong>Loading resource failed!</strong></div>',o.meta.width=400,o.meta.height=300,s.data=o,s.fitSize(o)}),s.trigger("showitem.uk.lightbox",[o])},fitSize:function(){var e=this,i=this.data,o=this.modal.dialog.outerWidth()-this.modal.dialog.width(),n=parseInt(this.modal.dialog.css("margin-top"),10),s=parseInt(this.modal.dialog.css("margin-bottom"),10),a=n+s,r=i.meta.content,l=e.options.duration;this.siblings.length>1&&(r=[r,'<a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-previous uk-hidden-touch" data-lightbox-previous></a>','<a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-next uk-hidden-touch" data-lightbox-next></a>'].join(""));var d,h,u=t.$("<div>&nbsp;</div>").css({opacity:0,position:"absolute",top:0,left:0,width:"100%","max-width":e.modal.dialog.css("max-width"),padding:e.modal.dialog.css("padding"),margin:e.modal.dialog.css("margin")}),c=i.meta.width,p=i.meta.height;u.appendTo("body").width(),d=u.width(),h=window.innerHeight-a,u.remove(),this.modal.dialog.find(".uk-modal-caption").remove(),i.title&&(this.modal.dialog.append('<div class="uk-modal-caption">'+i.title+"</div>"),h-=this.modal.dialog.find(".uk-modal-caption").outerHeight()),d<i.meta.width&&(p=Math.floor(p*(d/c)),c=d),p>h&&(p=Math.floor(h),c=Math.ceil(i.meta.width*(h/i.meta.height))),this.modal.content.css("opacity",0).width(c).html(r),"iframe"==i.type&&this.modal.content.find("iframe:first").height(p);var f=p+o,m=Math.floor(window.innerHeight/2-f/2)-a;0>m&&(m=0),this.modal.closer.addClass("uk-hidden"),e.modal.data("mwidth")==c&&e.modal.data("mheight")==p&&(l=0),this.modal.dialog.animate({width:c+o,height:p+o,top:m},l,"swing",function(){e.modal.loader.addClass("uk-hidden"),e.modal.content.css({width:""}).animate({opacity:1},function(){e.modal.closer.removeClass("uk-hidden")}),e.modal.data({mwidth:c,mheight:p})})},next:function(){this.show(this.siblings[this.index+1]?this.index+1:0)},previous:function(){this.show(this.siblings[this.index-1]?this.index-1:this.siblings.length-1)}}),t.plugin("lightbox","image",{init:function(t){t.on("showitem.uk.lightbox",function(t,e){if("image"==e.type||e.source&&e.source.match(/\.(jpg|jpeg|png|gif|svg)$/i)){var i=function(t,i,o){e.meta={content:'<img class="uk-responsive-width" width="'+i+'" height="'+o+'" src ="'+t+'">',width:i,height:o},e.type="image",e.promise.resolve()};if(o[e.source])i(e.source,o[e.source].width,o[e.source].height);else{var n=new Image;n.onerror=function(){e.promise.reject("Loading image failed")},n.onload=function(){o[e.source]={width:n.width,height:n.height},i(e.source,o[e.source].width,o[e.source].height)},n.src=e.source}}})}}),t.plugin("lightbox","youtube",{init:function(t){var e=/(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)&?(.*)/,i=/youtu\.be\/(.*)/;t.on("showitem.uk.lightbox",function(t,n){var s,a,r=function(t,e,i){n.meta={content:'<iframe src="//www.youtube.com/embed/'+t+'" width="'+e+'" height="'+i+'" style="max-width:100%;"></iframe>',width:e,height:i},n.type="iframe",n.promise.resolve()};if((a=n.source.match(e))&&(s=a[2]),(a=n.source.match(i))&&(s=a[1]),s){if(o[s])r(s,o[s].width,o[s].height);else{var l=new Image,d=!1;l.onerror=function(){o[s]={width:640,height:320},r(s,o[s].width,o[s].height)},l.onload=function(){120==l.width&&90==l.height?d?(o[s]={width:640,height:320},r(s,o[s].width,o[s].height)):(d=!0,l.src="//img.youtube.com/vi/"+s+"/0.jpg"):(o[s]={width:l.width,height:l.height},r(s,l.width,l.height))},l.src="//img.youtube.com/vi/"+s+"/maxresdefault.jpg"}t.stopImmediatePropagation()}})}}),t.plugin("lightbox","vimeo",{init:function(e){var i,n=/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/;e.on("showitem.uk.lightbox",function(e,s){var a,r=function(t,e,i){s.meta={content:'<iframe src="//player.vimeo.com/video/'+t+'" width="'+e+'" height="'+i+'" style="width:100%;box-sizing:border-box;"></iframe>',width:e,height:i},s.type="iframe",s.promise.resolve()};(i=s.source.match(n))&&(a=i[2],o[a]?r(a,o[a].width,o[a].height):t.$.ajax({type:"GET",url:"http://vimeo.com/api/oembed.json?url="+encodeURI(s.source),jsonp:"callback",dataType:"jsonp",success:function(t){o[a]={width:t.width,height:t.height},r(a,o[a].width,o[a].height)}}),e.stopImmediatePropagation())})}}),t.plugin("lightbox","video",{init:function(e){e.on("showitem.uk.lightbox",function(e,i){var n=function(t,e,o){i.meta={content:'<video class="uk-responsive-width" src="'+t+'" width="'+e+'" height="'+o+'" controls></video>',width:e,height:o},i.type="video",i.promise.resolve()};if("video"==i.type||i.source.match(/\.(mp4|webm|ogv)$/i))if(o[i.source])n(i.source,o[i.source].width,o[i.source].height);else var s=t.$('<video style="position:fixed;visibility:hidden;top:-10000px;"></video>').attr("src",i.source).appendTo("body"),a=setInterval(function(){s[0].videoWidth&&(clearInterval(a),o[i.source]={width:s[0].videoWidth,height:s[0].videoHeight},n(i.source,o[i.source].width,o[i.source].height),s.remove())},20)})}}),t.lightbox.create=function(e,i){if(e){var o,n=[];return e.forEach(function(e){n.push(t.$.extend({source:"",title:"",type:"auto",link:!1},"string"==typeof e?{source:e}:e))}),o=t.lightbox(t.$.extend({},i,{group:n}))}},t.lightbox}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-nestable",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";var e,i="ontouchstart"in window,o=t.$html,n=[],s=t.$win,a=i?"touchstart":"mousedown",r=i?"touchmove":"mousemove",l=i?"touchend":"mouseup",d=i?"touchcancel":"mouseup";return t.component("nestable",{defaults:{listBaseClass:"uk-nestable",listClass:"uk-nestable-list",listItemClass:"uk-nestable-item",dragClass:"uk-nestable-dragged",movingClass:"uk-nestable-moving",emptyClass:"uk-nestable-empty",handleClass:"",collapsedClass:"uk-collapsed",placeholderClass:"uk-nestable-placeholder",noDragClass:"uk-nestable-nodrag",group:!1,maxDepth:10,threshold:20,idlethreshold:10},boot:function(){t.$html.on("mousemove touchmove",function(i){if(e){var o=e.offset().top;o<t.$win.scrollTop()?t.$win.scrollTop(t.$win.scrollTop()-Math.ceil(e.height()/2)):o+e.height()>window.innerHeight+t.$win.scrollTop()&&t.$win.scrollTop(t.$win.scrollTop()+Math.ceil(e.height()/2))}}),t.ready(function(e){t.$("[data-uk-nestable]",e).each(function(){var e=t.$(this);e.data("nestable")||t.nestable(e,t.Utils.options(e.attr("data-uk-nestable")))})})},init:function(){var o=this;Object.keys(this.options).forEach(function(t){-1!=String(t).indexOf("Class")&&(o.options["_"+t]="."+o.options[t])}),this.find(this.options._listItemClass).find(">ul").addClass(this.options.listClass),this.checkEmptyList(),this.reset(),this.element.data("nestable-group",this.options.group||t.Utils.uid("nestable-group")),this.find(this.options._listItemClass).each(function(){o.setParent(t.$(this))}),this.on("click","[data-nestable-action]",function(e){if(!o.dragEl&&(i||0===e.button)){e.preventDefault();var n=t.$(e.currentTarget),s=n.data("nestableAction"),a=n.closest(o.options._listItemClass);"collapse"===s&&o.collapseItem(a),"expand"===s&&o.expandItem(a),"toggle"===s&&o.toggleItem(a)}});var n=function(e){var n=t.$(e.target);e.target!==o.element[0]&&(n.is(o.options._noDragClass)||n.closest(o.options._noDragClass).length||n.is("[data-nestable-action]")||n.closest("[data-nestable-action]").length||(o.options.handleClass&&!n.hasClass(o.options.handleClass)&&o.options.handleClass&&(n=n.closest(o.options._handleClass)),!n.length||o.dragEl||!i&&0!==e.button||i&&1!==e.touches.length||(e.originalEvent&&e.originalEvent.touches&&(e=evt.originalEvent.touches[0]),o.delayMove=function(t){t.preventDefault(),o.dragStart(e),o.trigger("start.uk.nestable",[o]),o.delayMove=!1},o.delayMove.x=parseInt(e.pageX,10),o.delayMove.y=parseInt(e.pageY,10),o.delayMove.threshold=o.options.idlethreshold,e.preventDefault())))},h=function(t){t.originalEvent&&t.originalEvent.touches&&(t=t.originalEvent.touches[0]),o.delayMove&&(Math.abs(t.pageX-o.delayMove.x)>o.delayMove.threshold||Math.abs(t.pageY-o.delayMove.y)>o.delayMove.threshold)&&(window.getSelection().toString()?o.delayMove=!1:o.delayMove(t)),o.dragEl&&(t.preventDefault(),o.dragMove(t),o.trigger("move.uk.nestable",[o]))},u=function(t){o.dragEl&&(t.preventDefault(),o.dragStop(i?t.touches[0]:t)),e=!1,o.delayMove=!1};i?(this.element[0].addEventListener(a,n,!1),window.addEventListener(r,h,!1),window.addEventListener(l,u,!1),window.addEventListener(d,u,!1)):(this.on(a,n),s.on(r,h),s.on(l,u))},serialize:function(){var e,i=0,o=this,n=function(e,i){var s=[],a=e.children(o.options._listItemClass);return a.each(function(){for(var e,a=t.$(this),r={},l=a.children(o.options._listClass),d=0;d<a[0].attributes.length;d++)e=a[0].attributes[d],0===e.name.indexOf("data-")&&(r[e.name.substr(5)]=t.Utils.str2json(e.value));l.length&&(r.children=n(l,i+1)),s.push(r)}),s};return e=n(o.element,i)},list:function(e){var i=[],o=this,n=0,s=function(o,n,a){var r=o.children(e._listItemClass);r.each(function(o){var r=t.$(this),l=t.$.extend({parent_id:a?a:null,depth:n,order:o},r.data()),d=r.children(e._listClass);i.push(l),d.length&&s(d,n+1,r.data(e.idProperty||"id"))})};return e=t.$.extend({},o.options,e),s(o.element,n),i},reset:function(){this.mouse={offsetX:0,offsetY:0,startX:0,startY:0,lastX:0,lastY:0,nowX:0,nowY:0,distX:0,distY:0,dirAx:0,dirX:0,dirY:0,lastDirX:0,lastDirY:0,distAxX:0,distAxY:0},this.moving=!1,this.dragEl=null,this.dragRootEl=null,this.dragDepth=0,this.hasNewRoot=!1,this.pointEl=null;for(var t=0;t<n.length;t++)this.checkEmptyList(n[t]);n=[]},toggleItem:function(t){this[t.hasClass(this.options.collapsedClass)?"expandItem":"collapseItem"](t)},expandItem:function(t){t.removeClass(this.options.collapsedClass)},collapseItem:function(t){var e=t.children(this.options._listClass);e.length&&t.addClass(this.options.collapsedClass)},expandAll:function(){var e=this;this.find(e.options._listItemClass).each(function(){e.expandItem(t.$(this))})},collapseAll:function(){var e=this;this.find(e.options._listItemClass).each(function(){e.collapseItem(t.$(this))})},setParent:function(t){t.children(this.options._listClass).length&&t.addClass("uk-parent")},unsetParent:function(t){t.removeClass("uk-parent "+this.options.collapsedClass),t.children(this.options._listClass).remove()},dragStart:function(i){var n=this.mouse,s=t.$(i.target),a=s.closest(this.options._listItemClass),r=a.offset();this.placeEl=a,n.offsetX=i.pageX-r.left,n.offsetY=i.pageY-r.top,n.startX=n.lastX=r.left,n.startY=n.lastY=r.top,this.dragRootEl=this.element,this.dragEl=t.$("<ul></ul>").addClass(this.options.listClass+" "+this.options.dragClass).append(a.clone()),this.dragEl.css("width",a.width()),this.placeEl.addClass(this.options.placeholderClass),e=this.dragEl,this.tmpDragOnSiblings=[a[0].previousSibling,a[0].nextSibling],t.$body.append(this.dragEl),this.dragEl.css({left:r.left,top:r.top});var l,d,h=this.dragEl.find(this.options._listItemClass);for(l=0;l<h.length;l++)d=t.$(h[l]).parents(this.options._listClass+","+this.options._listBaseClass).length,d>this.dragDepth&&(this.dragDepth=d);o.addClass(this.options.movingClass)},dragStop:function(e){var i=t.$(this.placeEl),n=this.placeEl.parents(this.options._listBaseClass+":first");this.placeEl.removeClass(this.options.placeholderClass),this.dragEl.remove(),this.element[0]!==n[0]?(n.trigger("change.uk.nestable",[n.data("nestable"),i,"added"]),this.element.trigger("change.uk.nestable",[this,i,"removed"])):this.element.trigger("change.uk.nestable",[this,i,"moved"]),this.trigger("stop.uk.nestable",[this,i]),this.reset(),o.removeClass(this.options.movingClass)},dragMove:function(e){var i,o,s,a,r,l=this.options,d=this.mouse,h=this.dragRootEl?this.dragRootEl.data("nestable").options.maxDepth:l.maxDepth;this.dragEl.css({left:e.pageX-d.offsetX,top:e.pageY-d.offsetY}),d.lastX=d.nowX,d.lastY=d.nowY,d.nowX=e.pageX,d.nowY=e.pageY,d.distX=d.nowX-d.lastX,d.distY=d.nowY-d.lastY,d.lastDirX=d.dirX,d.lastDirY=d.dirY,d.dirX=0===d.distX?0:d.distX>0?1:-1,d.dirY=0===d.distY?0:d.distY>0?1:-1;var u=Math.abs(d.distX)>Math.abs(d.distY)?1:0;if(!d.moving)return d.dirAx=u,void(d.moving=!0);if(d.dirAx!==u?(d.distAxX=0,d.distAxY=0):(d.distAxX+=Math.abs(d.distX),0!==d.dirX&&d.dirX!==d.lastDirX&&(d.distAxX=0),d.distAxY+=Math.abs(d.distY),0!==d.dirY&&d.dirY!==d.lastDirY&&(d.distAxY=0)),d.dirAx=u,d.dirAx&&d.distAxX>=l.threshold&&(d.distAxX=0,s=this.placeEl.prev("li"),d.distX>0&&s.length&&!s.hasClass(l.collapsedClass)&&(i=s.find(l._listClass).last(),r=this.placeEl.parents(l._listClass+","+l._listBaseClass).length,r+this.dragDepth<=h&&(i.length?(i=s.children(l._listClass).last(),i.append(this.placeEl)):(i=t.$("<ul/>").addClass(l.listClass),i.append(this.placeEl),s.append(i),this.setParent(s)))),d.distX<0&&(a=this.placeEl.next(l._listItemClass),!a.length))){var c=this.placeEl.closest([l._listBaseClass,l._listClass].join(",")),p=c.closest(l._listItemClass);p.length&&(p.after(this.placeEl),c.children().length||this.unsetParent(p))}var f=!1,m=e.pageX-(window.pageXOffset||document.scrollLeft||0),g=e.pageY-(window.pageYOffset||document.documentElement.scrollTop);if(this.pointEl=t.$(document.elementFromPoint(m,g)),l.handleClass&&this.pointEl.hasClass(l.handleClass))this.pointEl=this.pointEl.closest(l._listItemClass);else{var v=this.pointEl.closest(l._listItemClass);v.length&&(this.pointEl=v)}if(!this.placeEl.find(this.pointEl).length){if(this.pointEl.data("nestable")&&!this.pointEl.children().length)f=!0,this.checkEmptyList(this.pointEl);else if(!this.pointEl.length||!this.pointEl.hasClass(l.listItemClass))return;var k=this.element,w=this.pointEl.closest(this.options._listBaseClass),b=k[0]!=w[0];if(!d.dirAx||b||f){if(b&&l.group!==w.data("nestable-group"))return;if(n.push(k),r=this.dragDepth-1+this.pointEl.parents(l._listClass+","+l._listBaseClass).length,r>h)return;var y=e.pageY<this.pointEl.offset().top+this.pointEl.height()/2;o=this.placeEl.parent(),f?this.pointEl.append(this.placeEl):y?this.pointEl.before(this.placeEl):this.pointEl.after(this.placeEl),o.children().length||o.data("nestable")||this.unsetParent(o.parent()),this.checkEmptyList(this.dragRootEl),this.checkEmptyList(k),b&&(this.dragRootEl=w,this.hasNewRoot=this.element[0]!==this.dragRootEl[0])}}},checkEmptyList:function(e){e=e?t.$(e):this.element,this.options.emptyClass&&e[e.children().length?"removeClass":"addClass"](this.options.emptyClass)}}),t.nestable}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-notify",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";var e={},i={},o=function(e){return"string"==t.$.type(e)&&(e={message:e}),arguments[1]&&(e=t.$.extend(e,"string"==t.$.type(arguments[1])?{status:arguments[1]}:arguments[1])),new s(e).show()},n=function(t,e){var o;if(t)for(o in i)t===i[o].group&&i[o].close(e);else for(o in i)i[o].close(e)},s=function(o){this.options=t.$.extend({},s.defaults,o),this.uuid=t.Utils.uid("notifymsg"),this.element=t.$(['<div class="uk-notify-message">','<a class="uk-close"></a>',"<div></div>","</div>"].join("")).data("notifyMessage",this),this.content(this.options.message),this.options.status&&(this.element.addClass("uk-notify-message-"+this.options.status),this.currentstatus=this.options.status),this.group=this.options.group,i[this.uuid]=this,e[this.options.pos]||(e[this.options.pos]=t.$('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo("body").on("click",".uk-notify-message",function(){var e=t.$(this).data("notifyMessage");e.element.trigger("manualclose.uk.notify",[e]),e.close()}))};return t.$.extend(s.prototype,{uuid:!1,element:!1,timout:!1,currentstatus:"",group:!1,show:function(){if(!this.element.is(":visible")){var t=this;e[this.options.pos].show().prepend(this.element);var i=parseInt(this.element.css("margin-bottom"),10);return this.element.css({opacity:0,"margin-top":-1*this.element.outerHeight(),"margin-bottom":0}).animate({opacity:1,"margin-top":0,"margin-bottom":i},function(){if(t.options.timeout){var e=function(){t.close()};t.timeout=setTimeout(e,t.options.timeout),t.element.hover(function(){clearTimeout(t.timeout)},function(){t.timeout=setTimeout(e,t.options.timeout)})}}),this}},close:function(t){var o=this,n=function(){o.element.remove(),e[o.options.pos].children().length||e[o.options.pos].hide(),o.options.onClose.apply(o,[]),o.element.trigger("close.uk.notify",[o]),delete i[o.uuid]};this.timeout&&clearTimeout(this.timeout),t?n():this.element.animate({opacity:0,"margin-top":-1*this.element.outerHeight(),"margin-bottom":0},function(){n()})},content:function(t){var e=this.element.find(">div");return t?(e.html(t),this):e.html()},status:function(t){return t?(this.element.removeClass("uk-notify-message-"+this.currentstatus).addClass("uk-notify-message-"+t),this.currentstatus=t,this):this.currentstatus}}),s.defaults={message:"",status:"",timeout:5e3,group:null,pos:"top-center",onClose:function(){}},t.notify=o,t.notify.message=s,t.notify.closeAll=n,o}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-sortable",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(e){e=t.$(e);do{if(e.data("sortable"))return e;e=t.$(e).parent()}while(e.length);return e}function i(t,e){var i=t.parentNode;if(e.parentNode!=i)return!1;for(var o=t.previousSibling;o&&9!==o.nodeType;){if(o===e)return!0;o=o.previousSibling}return!1}function o(t,e){var i=e;if(i==t)return null;for(;i;){if(i.parentNode===t)return i;if(i=i.parentNode,!i||!i.ownerDocument||11===i.nodeType)break}return null}function n(t){t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),t.returnValue=!1}var s,a,r,l,d,h,u,c,p,f="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch;return t.component("sortable",{defaults:{animation:150,threshold:10,childClass:"uk-sortable-item",placeholderClass:"uk-sortable-placeholder",overClass:"uk-sortable-over",draggingClass:"uk-sortable-dragged",dragMovingClass:"uk-sortable-moving",baseClass:"uk-sortable",noDragClass:"uk-sortable-nodrag",emptyClass:"uk-sortable-empty",dragCustomClass:"",handleClass:!1,group:!1,stop:function(){},start:function(){},change:function(){}},boot:function(){t.ready(function(e){t.$("[data-uk-sortable]",e).each(function(){var e=t.$(this);e.data("sortable")||t.sortable(e,t.Utils.options(e.attr("data-uk-sortable")))})}),t.$html.on("mousemove touchmove",function(e){if(u){var i=e.originalEvent.targetTouches?e.originalEvent.targetTouches[0]:e;(Math.abs(i.pageX-u.pos.x)>u.threshold||Math.abs(i.pageY-u.pos.y)>u.threshold)&&u.apply(i)}if(s){d||(d=!0,s.show(),s.$current.addClass(s.$sortable.options.placeholderClass),s.$sortable.element.children().addClass(s.$sortable.options.childClass),t.$html.addClass(s.$sortable.options.dragMovingClass));var o=s.data("mouse-offset"),n=parseInt(e.originalEvent.pageX,10)+o.left,a=parseInt(e.originalEvent.pageY,10)+o.top;if(s.css({left:n,top:a}),a+s.height()/3>document.body.offsetHeight)return;a<t.$win.scrollTop()?t.$win.scrollTop(t.$win.scrollTop()-Math.ceil(s.height()/3)):a+s.height()/3>window.innerHeight+t.$win.scrollTop()&&t.$win.scrollTop(t.$win.scrollTop()+Math.ceil(s.height()/3))}}),t.$html.on("mouseup touchend",function(t){if(u=h=!1,!a||!s)return void(a=s=null);var i=e(t.target),o=s.$sortable,n={type:t.type};i[0]&&o.dragDrop(n,o.element),o.dragEnd(n,o.element)})},init:function(){function e(){
f?h.addEventListener("touchmove",v,!1):(h.addEventListener("mouseover",m,!1),h.addEventListener("mouseout",g,!1))}function i(){f?h.removeEventListener("touchmove",v,!1):(h.removeEventListener("mouseover",m,!1),h.removeEventListener("mouseout",g,!1))}function s(t){a&&d.dragMove(t,d)}function l(e){return function(i){var n,s,a;i&&(n=f&&i.touches&&i.touches[0]||{},s=n.target||i.target,f&&document.elementFromPoint&&(s=document.elementFromPoint(i.pageX-document.body.scrollLeft,i.pageY-document.body.scrollTop))),t.$(s).hasClass(d.options.childClass)?e.apply(s,[i]):s!==h&&(a=o(h,s),a&&e.apply(a,[i]))}}var d=this,h=this.element[0];c=[],this.checkEmptyList(),this.element.data("sortable-group",this.options.group?this.options.group:t.Utils.uid("sortable-group"));var u=l(function(e){var i=t.$(e.target),o=i.is("a[href]")?i:i.parents("a[href]");if(!i.is(":input"))return e.preventDefault(),!f&&o.length&&o.one("click",function(t){t.preventDefault()}).one("mouseup",function(){p||o.trigger("click")}),d.dragStart(e,this)}),m=(l(function(t){return a?(t.preventDefault&&t.preventDefault(),!1):!0}),l(t.Utils.debounce(function(t){return d.dragEnter(t,this)}),40)),g=l(function(e){var i=d.dragenterData(this);d.dragenterData(this,i-1),d.dragenterData(this)||(t.$(this).removeClass(d.options.overClass),d.dragenterData(this,!1))}),v=l(function(t){return a&&a!==this&&r!==this?(d.element.children().removeClass(d.options.overClass),r=this,d.moveElementNextTo(a,this),n(t)):!0});this.addDragHandlers=e,this.removeDragHandlers=i,window.addEventListener(f?"touchmove":"mousemove",s,!1),h.addEventListener(f?"touchstart":"mousedown",u,!1)},dragStart:function(e,i){p=!1,d=!1,l=!1;var o=this,n=t.$(e.target);if(f||2!=e.button){if(o.options.handleClass){var r=n.hasClass(o.options.handleClass)?n:n.closest("."+o.options.handleClass,o.element);if(!r.length)return}if(!n.is("."+o.options.noDragClass)&&!n.closest("."+o.options._noDragClass).length&&!n.is(":input")){a=i,s&&s.remove();var h=t.$(a),c=h.offset();u={pos:{x:e.pageX,y:e.pageY},threshold:o.options.threshold,apply:function(e){s=t.$('<div class="'+[o.options.draggingClass,o.options.dragCustomClass].join(" ")+'"></div>').css({display:"none",top:c.top,left:c.left,width:h.width(),height:h.height(),padding:h.css("padding")}).data({"mouse-offset":{left:c.left-parseInt(e.pageX,10),top:c.top-parseInt(e.pageY,10)},origin:o.element,index:h.index()}).append(h.html()).appendTo("body"),s.$current=h,s.$sortable=o,h.data({"start-list":h.parent(),"start-index":h.index(),"sortable-group":o.options.group}),o.addDragHandlers(),o.options.start(this,a),o.trigger("start.uk.sortable",[o,a]),p=!0,u=!1}}}}},dragMove:function(e,i){var o,n=t.$(document.elementFromPoint(e.pageX-document.body.scrollLeft,e.pageY-(window.pageYOffset||document.documentElement.scrollTop))),s=n.closest("."+this.options.baseClass),r=s.data("sortable-group"),l=t.$(a),d=l.parent(),h=l.data("sortable-group");s[0]!==d[0]&&void 0!==h&&r===h&&(s.data("sortable").addDragHandlers(),c.push(s),s.children().addClass(this.options.childClass),s.children().length>0?(o=n.closest("."+this.options.childClass),o.length?o.before(l):s.append(l)):n.append(l),UIkit.$doc.trigger("mouseover")),this.checkEmptyList(),this.checkEmptyList(d)},dragEnter:function(e,i){if(!a||a===i)return!0;var o=this.dragenterData(i);return this.dragenterData(i,o+1),0===o&&(t.$(i).addClass(this.options.overClass),this.moveElementNextTo(a,i)),!1},dragEnd:function(e,i){var o=this;a&&(this.options.stop(i),this.trigger("stop.uk.sortable",[this])),a=null,r=null,c.push(this.element),c.forEach(function(e,i){t.$(e).children().each(function(){1===this.nodeType&&(t.$(this).removeClass(o.options.overClass).removeClass(o.options.placeholderClass).removeClass(o.options.childClass),o.dragenterData(this,!1))})}),c=[],t.$html.removeClass(this.options.dragMovingClass),this.removeDragHandlers(),s&&(s.remove(),s=null)},dragDrop:function(t,e){"drop"===t.type&&(t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault()),this.triggerChangeEvents()},triggerChangeEvents:function(){if(a){var e=t.$(a),i=s.data("origin"),o=e.closest("."+this.options.baseClass),n=[],r=t.$(a);i[0]===o[0]&&s.data("index")!=e.index()?n.push({sortable:this,mode:"moved"}):i[0]!=o[0]&&n.push({sortable:t.$(o).data("sortable"),mode:"added"},{sortable:t.$(i).data("sortable"),mode:"removed"}),n.forEach(function(t,e){t.sortable.element.trigger("change.uk.sortable",[t.sortable,r,t.mode])})}},dragenterData:function(e,i){return e=t.$(e),1==arguments.length?parseInt(e.data("child-dragenter"),10)||0:void(i?e.data("child-dragenter",Math.max(0,i)):e.removeData("child-dragenter"))},moveElementNextTo:function(e,o){l=!0;var n=this,s=t.$(e).parent().css("min-height",""),a=i(e,o)?o:o.nextSibling,r=s.children(),d=r.length;return n.options.animation?(s.css("min-height",s.height()),r.stop().each(function(){var e=t.$(this),i=e.position();i.width=e.width(),e.data("offset-before",i)}),o.parentNode.insertBefore(e,a),t.Utils.checkDisplay(n.element.parent()),r=s.children().each(function(){var e=t.$(this);e.data("offset-after",e.position())}).each(function(){var e=t.$(this),i=e.data("offset-before");e.css({position:"absolute",top:i.top,left:i.left,"min-width":i.width})}),void r.each(function(){var e=t.$(this),i=(e.data("offset-before"),e.data("offset-after"));e.css("pointer-events","none").width(),setTimeout(function(){e.animate({top:i.top,left:i.left},n.options.animation,function(){e.css({position:"",top:"",left:"","min-width":"","pointer-events":""}).removeClass(n.options.overClass).removeData("child-dragenter"),d--,d||(s.css("min-height",""),t.Utils.checkDisplay(n.element.parent()))})},0)})):(o.parentNode.insertBefore(e,a),void t.Utils.checkDisplay(n.element.parent()))},serialize:function(){var e,i,o=[];return this.element.children().each(function(n,s){e={};for(var a=0;a<s.attributes.length;a++)i=s.attributes[a],0===i.name.indexOf("data-")&&(e[i.name.substr(5)]=t.Utils.str2json(i.value));o.push(e)}),o},checkEmptyList:function(e){e=e?t.$(e):this.element,this.options.emptyClass&&e[e.children().length?"removeClass":"addClass"](this.options.emptyClass)}}),t.sortable}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-sticky",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(e){var s=arguments.length?arguments:n;if(s.length&&!(i.scrollTop()<0))for(var a,r,l,d,h=i.scrollTop(),u=o.height(),c=i.height(),p=u-c,f=h>p?p-h:0,m=0;m<s.length;m++)if(d=s[m],d.element.is(":visible")&&!d.animate){if(d.check()){if(d.top<0?a=0:(l=d.element.outerHeight(),a=u-l-d.top-d.options.bottom-h-f,a=0>a?a+d.top:d.top),d.boundary&&d.boundary.length){var g=d.boundary.offset().top;r=d.boundtoparent?u-(g+d.boundary.outerHeight())+parseInt(d.boundary.css("padding-bottom")):u-g-parseInt(d.boundary.css("margin-top")),a=h+l>u-r-(d.top<0?0:d.top)?u-r-(h+l):a}if(d.currentTop!=a){if(d.element.css({position:"fixed",top:a,width:"undefined"!=typeof d.getWidthFrom?t.$(d.getWidthFrom).width():d.element.width(),left:d.wrapper.offset().left}),!d.init&&(d.element.addClass(d.options.clsinit),location.hash&&h>0&&d.options.target)){var v=t.$(location.hash);v.length&&setTimeout(function(t,e){return function(){e.element.width();var i=t.offset(),o=i.top+t.outerHeight(),n=e.element.offset(),s=e.element.outerHeight(),a=n.top+s;n.top<o&&i.top<a&&(h=i.top-s-e.options.target,window.scrollTo(0,h))}}(v,d),0)}d.element.addClass(d.options.clsactive).removeClass(d.options.clsinactive),d.element.css("margin",""),d.options.animation&&d.init&&!t.Utils.isInView(d.wrapper)&&d.element.addClass(d.options.animation),d.currentTop=a}}else null!==d.currentTop&&d.reset();d.init=!0}}var i=t.$win,o=t.$doc,n=[],s=1;return t.component("sticky",{defaults:{top:0,bottom:0,animation:"",clsinit:"uk-sticky-init",clsactive:"uk-active",clsinactive:"",getWidthFrom:"",showup:!1,boundary:!1,media:!1,target:!1,disabled:!1},boot:function(){t.$doc.on("scrolling.uk.document",function(t,i){i&&i.dir&&(s=i.dir.y,e())}),t.$win.on("resize orientationchange",t.Utils.debounce(function(){if(n.length){for(var t=0;t<n.length;t++)n[t].reset(!0),n[t].self.computeWrapper();e()}},100)),t.ready(function(i){setTimeout(function(){t.$("[data-uk-sticky]",i).each(function(){var e=t.$(this);e.data("sticky")||t.sticky(e,t.Utils.options(e.attr("data-uk-sticky")))}),e()},0)})},init:function(){var e,a=t.$('<div class="uk-sticky-placeholder"></div>'),r=this.options.boundary;this.wrapper=this.element.css("margin",0).wrap(a).parent(),this.computeWrapper(),r&&(r===!0?(r=this.wrapper.parent(),e=!0):"string"==typeof r&&(r=t.$(r))),this.sticky={self:this,options:this.options,element:this.element,currentTop:null,wrapper:this.wrapper,init:!1,getWidthFrom:this.options.getWidthFrom||this.wrapper,boundary:r,boundtoparent:e,top:0,calcTop:function(){var e=this.options.top;if(this.options.top&&"string"==typeof this.options.top)if(this.options.top.match(/^(-|)(\d+)vh$/))e=window.innerHeight*parseInt(this.options.top,10)/100;else{var i=t.$(this.options.top).first();i.length&&i.is(":visible")&&(e=-1*(i.offset().top+i.outerHeight()-this.wrapper.offset().top))}this.top=e},reset:function(e){this.calcTop();var i=function(){this.element.css({position:"",top:"",width:"",left:"",margin:"0"}),this.element.removeClass([this.options.animation,"uk-animation-reverse",this.options.clsactive].join(" ")),this.element.addClass(this.options.clsinactive),this.currentTop=null,this.animate=!1}.bind(this);!e&&this.options.animation&&t.support.animation&&!t.Utils.isInView(this.wrapper)?(this.animate=!0,this.element.removeClass(this.options.animation).one(t.support.animation.end,function(){i()}).width(),this.element.addClass(this.options.animation+" uk-animation-reverse")):i()},check:function(){if(this.options.disabled)return!1;if(this.options.media)switch(typeof this.options.media){case"number":if(window.innerWidth<this.options.media)return!1;break;case"string":if(window.matchMedia&&!window.matchMedia(this.options.media).matches)return!1}var e=i.scrollTop(),n=o.height(),a=n-window.innerHeight,r=e>a?a-e:0,l=this.wrapper.offset().top,d=l-this.top-r,h=e>=d;return h&&this.options.showup&&(1==s&&(h=!1),-1==s&&!this.element.hasClass(this.options.clsactive)&&t.Utils.isInView(this.wrapper)&&(h=!1)),h}},this.sticky.calcTop(),n.push(this.sticky)},update:function(){e(this.sticky)},enable:function(){this.options.disabled=!1,this.update()},disable:function(t){this.options.disabled=!0,this.sticky.reset(t)},computeWrapper:function(){this.wrapper.css({height:-1==["absolute","fixed"].indexOf(this.element.css("position"))?this.element.outerHeight():"","float":"none"!=this.element.css("float")?this.element.css("float"):"",margin:this.element.css("margin")})}}),t.sticky}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-tooltip",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";var e,i,o;return t.component("tooltip",{defaults:{offset:5,pos:"top",animation:!1,delay:0,cls:"",activeClass:"uk-active",src:function(t){var e=t.attr("title");return void 0!==e&&t.data("cached-title",e).removeAttr("title"),t.data("cached-title")}},tip:"",boot:function(){t.$html.on("mouseenter.tooltip.uikit focus.tooltip.uikit","[data-uk-tooltip]",function(e){var i=t.$(this);i.data("tooltip")||(t.tooltip(i,t.Utils.options(i.attr("data-uk-tooltip"))),i.trigger("mouseenter"))})},init:function(){var i=this;e||(e=t.$('<div class="uk-tooltip"></div>').appendTo("body")),this.on({focus:function(t){i.show()},blur:function(t){i.hide()},mouseenter:function(t){i.show()},mouseleave:function(t){i.hide()}})},show:function(){if(this.tip="function"==typeof this.options.src?this.options.src(this.element):this.options.src,i&&clearTimeout(i),o&&clearTimeout(o),"string"==typeof this.tip?this.tip.length:0){e.stop().css({top:-2e3,visibility:"hidden"}).removeClass(this.options.activeClass).show(),e.html('<div class="uk-tooltip-inner">'+this.tip+"</div>");var n=this,s=t.$.extend({},this.element.offset(),{width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}),a=e[0].offsetWidth,r=e[0].offsetHeight,l="function"==typeof this.options.offset?this.options.offset.call(this.element):this.options.offset,d="function"==typeof this.options.pos?this.options.pos.call(this.element):this.options.pos,h=d.split("-"),u={display:"none",visibility:"visible",top:s.top+s.height+r,left:s.left};if("fixed"==t.$html.css("position")||"fixed"==t.$body.css("position")){var c=t.$("body").offset(),p=t.$("html").offset(),f={top:p.top+c.top,left:p.left+c.left};s.left-=f.left,s.top-=f.top}"left"!=h[0]&&"right"!=h[0]||"right"!=t.langdirection||(h[0]="left"==h[0]?"right":"left");var m={bottom:{top:s.top+s.height+l,left:s.left+s.width/2-a/2},top:{top:s.top-r-l,left:s.left+s.width/2-a/2},left:{top:s.top+s.height/2-r/2,left:s.left-a-l},right:{top:s.top+s.height/2-r/2,left:s.left+s.width+l}};t.$.extend(u,m[h[0]]),2==h.length&&(u.left="left"==h[1]?s.left:s.left+s.width-a);var g=this.checkBoundary(u.left,u.top,a,r);if(g){switch(g){case"x":d=2==h.length?h[0]+"-"+(u.left<0?"left":"right"):u.left<0?"right":"left";break;case"y":d=2==h.length?(u.top<0?"bottom":"top")+"-"+h[1]:u.top<0?"bottom":"top";break;case"xy":d=2==h.length?(u.top<0?"bottom":"top")+"-"+(u.left<0?"left":"right"):u.left<0?"right":"left"}h=d.split("-"),t.$.extend(u,m[h[0]]),2==h.length&&(u.left="left"==h[1]?s.left:s.left+s.width-a)}u.left-=t.$body.position().left,i=setTimeout(function(){e.css(u).attr("class",["uk-tooltip","uk-tooltip-"+d,n.options.cls].join(" ")),n.options.animation?e.css({opacity:0,display:"block"}).addClass(n.options.activeClass).animate({opacity:1},parseInt(n.options.animation,10)||400):e.show().addClass(n.options.activeClass),i=!1,o=setInterval(function(){n.element.is(":visible")||n.hide()},150)},parseInt(this.options.delay,10)||0)}},hide:function(){if(!this.element.is("input")||this.element[0]!==document.activeElement)if(i&&clearTimeout(i),o&&clearTimeout(o),e.stop(),this.options.animation){var t=this;e.fadeOut(parseInt(this.options.animation,10)||400,function(){e.removeClass(t.options.activeClass)})}else e.hide().removeClass(this.options.activeClass)},content:function(){return this.tip},checkBoundary:function(e,i,o,n){var s="";return(0>e||e-t.$win.scrollLeft()+o>window.innerWidth)&&(s+="x"),(0>i||i-t.$win.scrollTop()+n>window.innerHeight)&&(s+="y"),s}}),t.tooltip}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-search",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(t,e){t=t||0,e=e||24;var i,o,n={"12h":[],"24h":[]};for(i=t,o="";e>i;i++)o=""+i,10>i&&(o="0"+o),n["24h"].push({value:o+":00"}),n["24h"].push({value:o+":30"}),0===i&&(o=12,n["12h"].push({value:o+":00 AM"}),n["12h"].push({value:o+":30 AM"})),i>0&&13>i&&12!==i&&(n["12h"].push({value:o+":00 AM"}),n["12h"].push({value:o+":30 AM"})),i>=12&&(o-=12,0===o&&(o=12),10>o&&(o="0"+String(o)),n["12h"].push({value:o+":00 PM"}),n["12h"].push({value:o+":30 PM"}));return n}t.component("timepicker",{defaults:{format:"24h",delay:0,start:0,end:24},boot:function(){t.$html.on("focus.timepicker.uikit","[data-uk-timepicker]",function(e){var i=t.$(this);if(!i.data("timepicker")){var o=t.timepicker(i,t.Utils.options(i.attr("data-uk-timepicker")));setTimeout(function(){o.autocomplete.input.focus()},40)}})},init:function(){var i,o=this,n=e(this.options.start,this.options.end);this.options.minLength=0,this.options.template='<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">{{~items}}<li data-value="{{$item.value}}"><a class="needsclick">{{$item.value}}</a></li>{{/items}}</ul>',this.options.source=function(t){t(n[o.options.format]||n["12h"])},this.element.is("input")?(this.element.wrap('<div class="uk-autocomplete"></div>'),i=this.element.parent()):i=this.element.addClass("uk-autocomplete"),this.autocomplete=t.autocomplete(i,this.options),this.autocomplete.dropdown.addClass("uk-dropdown-small uk-dropdown-scrollable"),this.autocomplete.on("show.uk.autocomplete",function(){var t=o.autocomplete.dropdown.find('[data-value="'+o.autocomplete.input.val()+'"]');setTimeout(function(){o.autocomplete.pick(t,!0)},10)}),this.autocomplete.input.on("focus",function(){o.autocomplete.value=Math.random(),o.autocomplete.triggercomplete()}).on("blur",t.Utils.debounce(function(){o.checkTime()},100)),this.element.data("timepicker",this)},checkTime:function(){var t,e,i,o,n="AM",s=this.autocomplete.input.val();"12h"==this.options.format?(t=s.split(" "),e=t[0].split(":"),n=t[1]):e=s.split(":"),i=parseInt(e[0],10),o=parseInt(e[1],10),isNaN(i)&&(i=0),isNaN(o)&&(o=0),"12h"==this.options.format?(i>12?i=12:0>i&&(i=12),"am"===n||"a"===n?n="AM":("pm"===n||"p"===n)&&(n="PM"),"AM"!==n&&"PM"!==n&&(n="AM")):i>=24?i=23:0>i&&(i=0),0>o?o=0:o>=60&&(o=0),this.autocomplete.input.val(this.formatTime(i,o,n)).trigger("change")},formatTime:function(t,e,i){return t=10>t?"0"+t:t,e=10>e?"0"+e:e,t+":"+e+("12h"==this.options.format?" "+i:"")}})}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-upload",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(o,n){function s(e,i){var o=new FormData,n=new XMLHttpRequest;if(i.before(i,e)!==!1){for(var s,a=0;s=e[a];a++)o.append(i.param,s);for(var r in i.params)o.append(r,i.params[r]);n.upload.addEventListener("progress",function(t){var e=t.loaded/t.total*100;i.progress(e,t)},!1),n.addEventListener("loadstart",function(t){i.loadstart(t)},!1),n.addEventListener("load",function(t){i.load(t)},!1),n.addEventListener("loadend",function(t){i.loadend(t)},!1),n.addEventListener("error",function(t){i.error(t)},!1),n.addEventListener("abort",function(t){i.abort(t)},!1),n.open(i.method,i.action,!0),"json"==i.type&&n.setRequestHeader("Accept","application/json"),n.onreadystatechange=function(){if(i.readystatechange(n),4==n.readyState){var e=n.responseText;if("json"==i.type)try{e=t.$.parseJSON(e)}catch(o){e=!1}i.complete(e,n)}},i.beforeSend(n),n.send(o)}}if(!t.support.ajaxupload)return this;if(n=t.$.extend({},e.defaults,n),o.length){if("*.*"!==n.allow)for(var a,r=0;a=o[r];r++)if(!i(n.allow,a.name))return void("string"==typeof n.notallowed?alert(n.notallowed):n.notallowed(a,n));var l=n.complete;if(n.single){var d=o.length,h=0,u=!0;n.beforeAll(o),n.complete=function(t,e){h+=1,l(t,e),n.filelimit&&h>=n.filelimit&&(u=!1),u&&d>h?s([o[h]],n):n.allcomplete(t,e)},s([o[0]],n)}else n.complete=function(t,e){l(t,e),n.allcomplete(t,e)},s(o,n)}}function i(t,e){var i="^"+t.replace(/\//g,"\\/").replace(/\*\*/g,"(\\/[^\\/]+)*").replace(/\*/g,"[^\\/]+").replace(/((?!\\))\?/g,"$1.")+"$";return i="^"+i+"$",null!==e.match(new RegExp(i,"i"))}return t.component("uploadSelect",{init:function(){var t=this;this.on("change",function(){e(t.element[0].files,t.options);var i=t.element.clone(!0).data("uploadSelect",t);t.element.replaceWith(i),t.element=i})}}),t.component("uploadDrop",{defaults:{dragoverClass:"uk-dragover"},init:function(){var t=this,i=!1;this.on("drop",function(i){i.dataTransfer&&i.dataTransfer.files&&(i.stopPropagation(),i.preventDefault(),t.element.removeClass(t.options.dragoverClass),t.element.trigger("dropped.uk.upload",[i.dataTransfer.files]),e(i.dataTransfer.files,t.options))}).on("dragenter",function(t){t.stopPropagation(),t.preventDefault()}).on("dragover",function(e){e.stopPropagation(),e.preventDefault(),i||(t.element.addClass(t.options.dragoverClass),i=!0)}).on("dragleave",function(e){e.stopPropagation(),e.preventDefault(),t.element.removeClass(t.options.dragoverClass),i=!1})}}),t.support.ajaxupload=function(){function t(){var t=document.createElement("INPUT");return t.type="file","files"in t}function e(){var t=new XMLHttpRequest;return!!(t&&"upload"in t&&"onprogress"in t.upload)}function i(){return!!window.FormData}return t()&&e()&&i()}(),t.support.ajaxupload&&t.$.event.props.push("dataTransfer"),e.defaults={action:"",single:!0,method:"POST",param:"files[]",params:{},allow:"*.*",type:"text",filelimit:!1,before:function(t){},beforeSend:function(t){},beforeAll:function(){},loadstart:function(){},load:function(){},loadend:function(){},error:function(){},abort:function(){},progress:function(){},complete:function(){},allcomplete:function(){},readystatechange:function(){},notallowed:function(t,e){alert("Only the following file types are allowed: "+e.allow)}},t.Utils.xhrupload=e,e}),"undefined"!=typeof UIkit&&UIkit.on("beforeready.uk.dom",function(){"undefined"!=typeof UIkit.components.accordion&&$.extend(UIkit.components.accordion.prototype.defaults,{easing:$.bez(easing_swiftOut),duration:200}),"undefined"!=typeof UIkit.components.dropdown.prototype&&($.extend(UIkit.components.dropdown.prototype.defaults,{remaintime:150,delay:50}),function(){var t=UIkit.components.dropdown.prototype.show;UIkit.components.dropdown.prototype.show=function(){return this.dropdown.css({"min-width":this.dropdown.outerWidth()}).addClass("uk-dropdown-active uk-dropdown-shown"),t.apply(this,arguments)}}(),function(){var t=UIkit.components.dropdown.prototype.hide;UIkit.components.dropdown.prototype.hide=function(){var e=this.dropdown;e.removeClass("uk-dropdown-shown");setTimeout(function(){e.removeClass("uk-dropdown-active")},280);return t.apply(this,arguments)}}()),"undefined"!=typeof UIkit.components.modal&&($.extend(UIkit.components.modal.prototype.defaults,{center:!0}),UIkit.modal.dialog.template='<div class="uk-modal uk-modal-dialog-replace"><div class="uk-modal-dialog" style="min-height:0;"></div></div>',$body.on("show.uk.modal",".uk-modal-dialog-replace",function(){setTimeout(function(){var t=$(".uk-modal-dialog-replace");if(t.find(".uk-button-primary").length){var e=t.find(".uk-button-primary").toggleClass("uk-button-primary md-btn-flat-primary");e.next("button")&&e.next("button").after(e)}t.find(".uk-button").length&&t.find(".uk-button").toggleClass("uk-button md-btn md-btn-flat"),t.find(".uk-margin-small-top").length&&t.find(".uk-margin-small-top").toggleClass("uk-margin-small-top uk-margin-top"),t.find("input.uk-width-1-1").length&&(t.find("input.uk-width-1-1").toggleClass("uk-width-1-1 md-input"),altair_md.inputs()),t.find(".uk-form").length&&t.find(".uk-form").removeClass("uk-form")},50)})),"undefined"!=typeof UIkit.components.tooltip&&$.extend(UIkit.components.tooltip.prototype.defaults,{animation:280,offset:8}),"undefined"!=typeof UIkit.components.sortable&&Modernizr.touch&&$("[data-uk-sortable]").children().addClass("needsclick")});
function isHighDensity(){return window.matchMedia&&(window.matchMedia("only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)").matches||window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)").matches)||window.devicePixelRatio&&window.devicePixelRatio>1.3}function scrollbarWidth(){var e=jQuery('<div style="width: 100%; height:200px;">test</div>'),i=jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append(e),a=e[0],e=i[0];return jQuery("body").append(e),a=a.offsetWidth,i.css("overflow","scroll"),e=e.clientWidth,i.remove(),a-e}function randID_generator(){var e=String.fromCharCode(65+Math.floor(26*Math.random()));return e+Date.now()}function hex2rgba(e,i){return e=e.replace("#",""),r=parseInt(e.substring(0,2),16),g=parseInt(e.substring(2,4),16),b=parseInt(e.substring(4,6),16),result="rgba("+r+","+g+","+b+","+i/100+")",result}function lsTest(){var e="test";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(i){return!1}}$(function(){"use strict";altair_page_onload.init(),altair_main_header.init(),altair_main_sidebar.init(),altair_secondary_sidebar.init(),altair_top_bar.init(),altair_page_heading.init(),altair_md.init(),altair_forms.init(),altair_helpers.truncate_text($(".truncate-text")),altair_helpers.full_screen()}),jQuery.fn.reverse=[].reverse,$.fn.serializeObject=function(){var e={},i=this.serializeArray();return $.each(i,function(){void 0!==e[this.name]?(e[this.name].push||(e[this.name]=[e[this.name]]),e[this.name].push(this.value||"")):e[this.name]=this.value||""}),e},"undefined"!=typeof $.fn.selectize&&Selectize.define("dropdown_after",function(e){this.positionDropdown=function(){var e=this.$control,i=e.position(),a=i.left,t=i.top+e.outerHeight(!0)+32;this.$dropdown.css({width:e.outerWidth(),top:t,left:a})}}),easing_swiftOut=[.4,0,.2,1],bez_easing_swiftOut=$.bez(easing_swiftOut);var $body=$("body"),$html=$("html"),$document=$(document),$window=$(window),$page_content=$("#page_content"),$page_content_inner=$("#page_content_inner"),$sidebar_main=$("#sidebar_main"),$sidebar_main_toggle=$("#sidebar_main_toggle"),$sidebar_secondary=$("#sidebar_secondary"),$sidebar_secondary_toggle=$("#sidebar_secondary_toggle"),$topBar=$("#top_bar"),$pageHeading=$("#page_heading"),$header_main=$("#header_main"),header__main_height=48;altair_page_onload={init:function(){$window.load(function(){altair_helpers.hierarchical_show(),altair_helpers.hierarchical_slide()})}},altair_page_content={hide_content_sidebar:function(){$body.hasClass("header_double_height")||($page_content.css("max-height",$html.height()-40),$html.css({paddingRight:scrollbarWidth(),overflow:"hidden"}))},show_content_sidebar:function(){$body.hasClass("header_double_height")||($page_content.css("max-height",""),$html.css({paddingRight:"",overflow:""}))}},altair_forms={init:function(){altair_forms.textarea_autosize(),altair_forms.select_elements(),altair_forms.switches()},textarea_autosize:function(){$textarea=$("textarea.textarea_autosize,textarea.md-input"),$textarea.each(function(){$(this).hasClass("autosize_init")||(autosize($("textarea.textarea_autosize,textarea.md-input")),$(this).addClass("autosize_init"))})},select_elements:function(e){var i=e?$(e).find("select"):$("[data-md-selectize],.data-md-selectize");i.each(function(){var e=$(this);if(!e.hasClass("selectized")){var i=e.attr("data-md-selectize-bottom");e.after('<div class="selectize_fix"></div>').selectize({hideSelected:!0,dropdownParent:"body",onDropdownOpen:function(e){e.hide().velocity("slideDown",{begin:function(){"undefined"!=typeof i&&e.css({"margin-top":"0"})},duration:200,easing:easing_swiftOut})},onDropdownClose:function(e){e.show().velocity("slideUp",{complete:function(){"undefined"!=typeof i&&e.css({"margin-top":""})},duration:200,easing:easing_swiftOut})}})}});var a=$("[data-md-selectize-inline]");a.each(function(){var e=$(this);if(!e.hasClass("selectized")){var i=e.attr("data-md-selectize-bottom");e.after('<div class="selectize_fix"></div>').closest("div").addClass("uk-position-relative").end().selectize({plugins:["dropdown_after"],dropdownParent:e.closest("div"),hideSelected:!0,onDropdownOpen:function(e){e.hide().velocity("slideDown",{begin:function(){"undefined"!=typeof i&&e.css({"margin-top":"0"})},duration:200,easing:easing_swiftOut})},onDropdownClose:function(e){e.show().velocity("slideUp",{complete:function(){"undefined"!=typeof i&&e.css({"margin-top":""})},duration:200,easing:easing_swiftOut})}})}})},switches:function(){var e=$("[data-switchery]");e.length&&e.each(function(){if(!$(this).siblings(".switchery").length){var e=this,i=$(e).attr("data-switchery-size"),a=$(e).attr("data-switchery-color"),t=$(e).attr("data-switchery-secondary-color");new Switchery(e,{color:"undefined"!=typeof a?hex2rgba(a,50):hex2rgba("#009688",50),jackColor:"undefined"!=typeof a?hex2rgba(a,100):hex2rgba("#009688",100),secondaryColor:"undefined"!=typeof t?hex2rgba(t,50):"rgba(0, 0, 0,0.26)",jackSecondaryColor:"undefined"!=typeof t?hex2rgba(t,50):"#fafafa",className:"switchery"+("undefined"!=typeof i?" switchery-"+i:"")})}})},parsley_validation_config:function(){window.ParsleyConfig={excluded:"input[type=button], input[type=submit], input[type=reset], input[type=hidden], input.exclude_validation",trigger:"change",errorsWrapper:'<div class="parsley-errors-list"></div>',errorTemplate:"<span></span>",errorClass:"md-input-danger",successClass:"md-input-success",errorsContainer:function(e){var i=e.$element;return i.closest(".parsley-row")},classHandler:function(e){var i=e.$element;return i.is(":checkbox")||i.is(":radio")||i.parent().is("label")||$(i).is("[data-md-selectize]")?i.closest(".parsley-row"):void 0}}},parsley_extra_validators:function(){window.ParsleyConfig=window.ParsleyConfig||{},window.ParsleyConfig.validators=window.ParsleyConfig.validators||{},window.ParsleyConfig.validators.date={fn:function(e){var i=/^(\d{2})[.\/](\d{2})[.\/](\d{4})$/.exec(e);if(null==i)return!1;var a=e.split(/[.\/-]+/),t=parseInt(a[1],10),n=parseInt(a[0],10),s=parseInt(a[2],10);if(0==s||0==n||n>12)return!1;var r=[31,28,31,30,31,30,31,31,30,31,30,31];return(s%400==0||s%100!=0&&s%4==0)&&(r[1]=29),t>0&&t<=r[n-1]},priority:256}}},altair_main_sidebar={init:function(){$sidebar_main.length&&($body.hasClass("sidebar_mini")||null!==localStorage.getItem("altair_sidebar_mini")?(altair_main_sidebar.mini_sidebar(),setTimeout(function(){$window.resize()},280)):($sidebar_main_toggle.on("click",function(e){e.preventDefault(),$body.hasClass("sidebar_main_active")||$body.hasClass("sidebar_main_open")&&$window.width()>=1220?altair_main_sidebar.hide_sidebar():altair_main_sidebar.show_sidebar()}),$document.on("click keyup",function(e){$body.hasClass("sidebar_main_active")&&$window.width()<1220&&(!$(e.target).closest($sidebar_main).length&&!$(e.target).closest($sidebar_main_toggle).length||27==e.keyCode)&&altair_main_sidebar.hide_sidebar()}),altair_helpers.custom_scrollbar($sidebar_main),$body.hasClass("sidebar_main_active")&&$window.width()<1220?altair_page_content.hide_content_sidebar():altair_page_content.show_content_sidebar(),altair_main_sidebar.main_menu(),altair_main_sidebar.swipe_open()),altair_main_sidebar.lang_switcher())},hide_sidebar:function(){$body.addClass("sidebar_main_hiding").removeClass("sidebar_main_active sidebar_main_open"),$window.width()<1220&&altair_page_content.show_content_sidebar(),setTimeout(function(){$body.removeClass("sidebar_main_hiding"),$window.resize()},280)},show_sidebar:function(){$body.addClass("sidebar_main_active"),$window.width()<1220&&altair_page_content.hide_content_sidebar(),setTimeout(function(){$window.resize()},280)},main_menu:function(){$sidebar_main.find(".menu_section > ul").children("li").each(function(){var e=$(this).children("ul").length;e&&$(this).addClass("submenu_trigger")}),$(".submenu_trigger > a").on("click",function(e){e.preventDefault();var i=$(this),a=i.next("ul").is(":visible")?"slideUp":"slideDown";i.next("ul").velocity(a,{duration:400,easing:easing_swiftOut,begin:function(){"slideUp"==a?$(this).closest(".submenu_trigger").removeClass("act_section"):$(this).closest(".submenu_trigger").addClass("act_section")},complete:function(){if("slideUp"!==a){var e=$sidebar_main.find(".scroll-content").length?$sidebar_main.find(".scroll-content"):$sidebar_main.find(".scrollbar-inner");i.closest(".act_section").velocity("scroll",{duration:500,easing:easing_swiftOut,container:e})}}})}),$sidebar_main.find(".act_item").closest(".submenu_trigger").addClass("act_section current_section").children("a").trigger("click")},lang_switcher:function(){var e=$("#lang_switcher");e.length&&(e.selectize({options:[{id:1,title:"English",value:"gb"},{id:2,title:"French",value:"fr"},{id:3,title:"Chinese",value:"cn"},{id:4,title:"Dutch",value:"nl"},{id:5,title:"Italian",value:"it"},{id:6,title:"Spanish",value:"es"},{id:7,title:"German",value:"de"},{id:8,title:"Polish",value:"pl"}],render:{option:function(e,i){return'<div class="option"><i class="item-icon flag-'+i(e.value).toUpperCase()+'"></i><span>'+i(e.title)+"</span></div>"},item:function(e,i){return'<div class="item"><i class="item-icon flag-'+i(e.value).toUpperCase()+'"></i></div>'}},valueField:"value",labelField:"title",searchField:"title",create:!1,hideSelected:!0,onDropdownOpen:function(e){e.hide().velocity("slideDown",{begin:function(){e.css({"margin-top":"-33px"})},duration:200,easing:easing_swiftOut})},onDropdownClose:function(e){e.show().velocity("slideUp",{complete:function(){e.css({"margin-top":""})},duration:200,easing:easing_swiftOut})}}),e.next().children(".selectize-input").find("input").attr("readonly",!0))},swipe_open:function(){if($body.hasClass("sidebar_main_swipe")&&Modernizr.touch){$body.append('<div id="sidebar_swipe_area" style="position: fixed;left: 0;top:0;z-index:1000;width:16px;height:100%"></div>');var e=document.getElementById("sidebar_swipe_area");mc=new Hammer.Manager(e),mc.add(new Hammer.Swipe({threshold:0,pointers:2,velocity:0})),mc.on("swiperight",function(){$body.hasClass("sidebar_main_active")||altair_main_sidebar.show_sidebar()})}},mini_sidebar:function(){$body.addClass("sidebar_mini").removeClass("sidebar_main_active sidebar_main_open sidebar_main_swipe"),$sidebar_main_toggle.hide(),$sidebar_main.find(".menu_section > ul").children("li").each(function(){var e=$(this).children("ul").length;e?($(this).addClass("sidebar_submenu"),$(this).find(".act_item").length&&$(this).addClass("current_section")):UIkit.tooltip($(this),{})})}},altair_secondary_sidebar={init:function(){$sidebar_secondary.length&&($sidebar_secondary_toggle.removeClass("sidebar_secondary_check"),$sidebar_secondary_toggle.on("click",function(e){e.preventDefault(),$body.hasClass("sidebar_secondary_active")?altair_secondary_sidebar.hide_sidebar():altair_secondary_sidebar.show_sidebar()}),$document.on("click keydown",function(e){!$body.hasClass("sidebar_secondary_active")||($(e.target).closest($sidebar_secondary).length||$(e.target).closest($sidebar_secondary_toggle).length)&&27!=e.which||altair_secondary_sidebar.hide_sidebar()}),$body.hasClass("sidebar_secondary_active")&&altair_secondary_sidebar.hide_sidebar(),altair_helpers.custom_scrollbar($sidebar_secondary),altair_secondary_sidebar.chat_sidebar())},hide_sidebar:function(){$body.removeClass("sidebar_secondary_active")},show_sidebar:function(){$body.addClass("sidebar_secondary_active")},chat_sidebar:function(){$sidebar_secondary.find(".md-list.chat_users").length&&($(".md-list.chat_users").children("li").on("click",function(){$(".md-list.chat_users").velocity("transition.slideRightBigOut",{duration:280,easing:easing_swiftOut,complete:function(){$sidebar_secondary.find(".chat_box_wrapper").addClass("chat_box_active").velocity("transition.slideRightBigIn",{duration:280,easing:easing_swiftOut,begin:function(){$sidebar_secondary.addClass("chat_sidebar")}})}})}),$sidebar_secondary.find(".chat_sidebar_close").on("click",function(){$sidebar_secondary.find(".chat_box_wrapper").removeClass("chat_box_active").velocity("transition.slideRightBigOut",{duration:280,easing:easing_swiftOut,complete:function(){$sidebar_secondary.removeClass("chat_sidebar"),$(".md-list.chat_users").velocity("transition.slideRightBigIn",{duration:280,easing:easing_swiftOut})}})}),$sidebar_secondary.find(".uk-tab").length&&$sidebar_secondary.find(".uk-tab").on("change.uk.tab",function(e,i,a){$(i).hasClass("chat_sidebar_tab")&&$sidebar_secondary.find(".chat_box_wrapper").hasClass("chat_box_active")?$sidebar_secondary.addClass("chat_sidebar"):$sidebar_secondary.removeClass("chat_sidebar")}))}},altair_top_bar={init:function(){$topBar.length&&$body.addClass("top_bar_active")}},altair_page_heading={init:function(){$pageHeading.length&&$body.addClass("page_heading_active")}},altair_main_header={init:function(){altair_main_header.search_activate(),$("#menu_top_dropdown").children().on("show.uk.dropdown",function(e){setTimeout(function(){$window.resize()},320)})},search_activate:function(){$("#main_search_btn").on("click",function(e){e.preventDefault(),altair_main_header.search_show()}),$(document).on("click keydown",function(e){$body.hasClass("main_search_active")&&(!$(e.target).closest(".header_main_search_form").length&&!$(e.target).closest("#main_search_btn").length||27==e.which)&&altair_main_header.search_hide()}),$(".header_main_search_close").on("click",function(){altair_main_header.search_hide()})},search_show:function(){$header_main.children(".header_main_content").velocity("transition.slideUpBigOut",{duration:280,easing:easing_swiftOut,begin:function(){$body.addClass("main_search_active")},complete:function(){$header_main.children(".header_main_search_form").velocity("transition.slideDownBigIn",{duration:280,easing:easing_swiftOut,complete:function(){$(".header_main_search_input").focus()}})}})},search_hide:function(){$header_main.children(".header_main_search_form").velocity("transition.slideUpBigOut",{duration:280,easing:easing_swiftOut,begin:function(){$header_main.velocity("reverse"),$body.removeClass("main_search_active")},complete:function(){$header_main.children(".header_main_content").velocity("transition.slideDownBigIn",{duration:280,easing:easing_swiftOut,complete:function(){$(".header_main_search_input").blur().val("")}})}})}},altair_md={init:function(){altair_md.inputs(),altair_md.checkbox_radio(),altair_md.card_fullscreen(),altair_md.card_expand(),altair_md.card_overlay(),altair_md.card_single(),altair_md.card_panel(),altair_md.list_outside(),altair_md.fab_speed_dial(),altair_md.fab_toolbar(),altair_md.fab_sheet()},card_fullscreen:function(){$(".md-card-fullscreen-activate").on("click",function(){var e=$(this).closest(".md-card"),i=e.height(),a=e.width();e.after('<div class="md-card-placeholder" style="width:'+a+"px;height:"+i+'px;"/>'),e.addClass("md-card-fullscreen").css({width:a,height:i}).velocity({left:0,top:0},{duration:600,easing:easing_swiftOut,begin:function(i){e.find(".md-card-toolbar").prepend('<span class="md-icon md-card-fullscreen-deactivate material-icons uk-float-left">&#xE5C4;</span>'),altair_page_content.hide_content_sidebar()}}).velocity({height:"100%",width:"100%"},{duration:600,easing:easing_swiftOut,complete:function(i){$(window).resize(),e.find(".md-card-fullscreen-content").velocity("transition.slideUpBigIn",{duration:600,easing:easing_swiftOut,complete:function(e){$(window).resize()}})}})}),$page_content.on("click",".md-card-fullscreen-deactivate",function(){var e=$(".md-card-placeholder"),i=e.height(),a=e.width(),t=e.offset().top,n=e.offset().left,s=$(".md-card-fullscreen");s.velocity({height:i,width:a},{duration:600,easing:easing_swiftOut,begin:function(e){s.find(".md-card-fullscreen-content").velocity("transition.slideDownOut",{duration:275,easing:easing_swiftOut})},complete:function(e){$window.resize(),s.find(".md-card-fullscreen-deactivate").remove(),altair_page_content.show_content_sidebar()}}).velocity({left:n,top:t},{duration:600,easing:easing_swiftOut,complete:function(i){s.removeClass("md-card-fullscreen").css({width:"",height:"",left:"",top:""}),e.remove(),$body.removeClass("md-card-fullscreen-active")}})})},card_expand:function(){$(".md-expand").velocity("transition.expandIn",{stagger:175,drag:!0}),$(".md-expand-group").children().velocity("transition.expandIn",{stagger:175,drag:!0})},card_overlay:function(){var e=$(".md-card");e.each(function(){var e=$(this);e.hasClass("md-card-overlay-active")&&e.find(".md-card-overlay-toggler").html("&#xE5CD;")}),e.on("click",".md-card-overlay-toggler",function(e){e.preventDefault(),$(this).closest(".md-card").hasClass("md-card-overlay-active")?$(this).html("&#xE5D4;").closest(".md-card").removeClass("md-card-overlay-active"):$(this).html("&#xE5CD;").closest(".md-card").addClass("md-card-overlay-active")})},card_single:function(){function e(){var e=$window.height()-(2*header__main_height+12);i.find(".md-card-content").innerHeight(e)}var i=$(".md-card-single");i&&$body.hasClass("header_double_height")&&(e(),$window.on("debouncedresize",function(){e()}))},card_panel:function(){$(".md-card-close").on("click",function(e){e.preventDefault();var i=$(this),a=i.closest(".md-card"),t=function(){$(a).remove()};altair_md.card_show_hide(a,void 0,t)}),$(".md-card-toggle").on("click",function(e){e.preventDefault();var i=$(this),a=i.closest(".md-card");$(a).toggleClass("md-card-collapsed").children(".md-card-content").slideToggle("280",bez_easing_swiftOut),i.velocity({scale:0,opacity:.2},{duration:280,easing:easing_swiftOut,complete:function(){$(a).hasClass("md-card-collapsed")?i.html("&#xE313;"):i.html("&#xE316;"),i.velocity("reverse")}})})},card_show_hide:function(e,i,a,t){$(e).velocity({scale:0,opacity:.2},{duration:400,easing:easing_swiftOut,begin:function(){"undefined"!=typeof i&&i(t)},complete:function(){"undefined"!=typeof a&&a(t)}}).velocity("reverse")},list_outside:function(){function e(){var e=$window.height()-(2*header__main_height+10);i.height(e)}var i=$(".md-list-outside-wrapper");i&&$body.hasClass("header_double_height")&&(e(),$window.on("debouncedresize",function(){e()}),altair_helpers.custom_scrollbar(i))},inputs:function(e){var i="undefined"==typeof e?$(".md-input"):$(e).find(".md-input");i.each(function(){if(!$(this).closest(".md-input-wrapper").length){var e=$(this);e.prev("label").length?e.prev("label").andSelf().wrapAll('<div class="md-input-wrapper"/>'):e.siblings("[data-uk-form-password]").length?e.siblings("[data-uk-form-password]").andSelf().wrapAll('<div class="md-input-wrapper"/>'):e.wrap('<div class="md-input-wrapper"/>'),e.closest(".md-input-wrapper").append('<span class="md-input-bar"/>'),altair_md.update_input(e)}$body.on("focus",".md-input",function(){$(this).closest(".md-input-wrapper").addClass("md-input-focus")}).on("blur",".md-input",function(){$(this).closest(".md-input-wrapper").removeClass("md-input-focus"),$(this).hasClass("label-fixed")||(""!=$(this).val()?$(this).closest(".md-input-wrapper").addClass("md-input-filled"):$(this).closest(".md-input-wrapper").removeClass("md-input-filled"))}).on("change",".md-input",function(){altair_md.update_input($(this))})})},checkbox_radio:function(e){var i="undefined"==typeof e?$("[data-md-icheck],.data-md-icheck"):$(e);i.each(function(){$(this).next(".iCheck-helper").length||$(this).iCheck({checkboxClass:"icheckbox_md",radioClass:"iradio_md",increaseArea:"20%"}).on("ifChanged",function(e){$(this).data("parsley-multiple")&&$(this).parsley().validate()})})},update_input:function(e){e.closest(".md-input-wrapper").removeClass("md-input-wrapper-danger md-input-wrapper-success md-input-wrapper-disabled"),e.hasClass("md-input-danger")&&e.closest(".md-input-wrapper").addClass("md-input-wrapper-danger"),e.hasClass("md-input-success")&&e.closest(".md-input-wrapper").addClass("md-input-wrapper-success"),e.prop("disabled")&&e.closest(".md-input-wrapper").addClass("md-input-wrapper-disabled"),e.hasClass("label-fixed")&&e.closest(".md-input-wrapper").addClass("md-input-filled"),""!=e.val()&&e.closest(".md-input-wrapper").addClass("md-input-filled")},fab_speed_dial:function(){$(".md-fab-speed-dial").children(".md-fab").append('<i class="material-icons md-fab-action-close" style="display:none">&#xE5CD;</i>').on("click",function(){var e=$(this),i=e.closest(".md-fab-wrapper");i.hasClass("md-fab-active")?i.removeClass("md-fab-active"):i.addClass("md-fab-active"),e.velocity({scale:0},{duration:140,easing:easing_swiftOut,complete:function(){e.children().toggle(),e.velocity({scale:1},{duration:140,easing:easing_swiftOut})}})}).closest(".md-fab-wrapper").find(".md-fab-small").on("click",function(){$(this).closest(".md-fab-wrapper").removeClass("md-fab-active")})},fab_toolbar:function(){var e=$(".md-fab-toolbar");e&&(e.children("i").on("click",function(i){i.preventDefault();var a=e.children(".md-fab-toolbar-actions").children().length;e.addClass("md-fab-animated");var t=e.hasClass("md-fab-small")?24:16,n=e.hasClass("md-fab-small")?44:64;setTimeout(function(){e.width(a*n+t)},140),setTimeout(function(){e.addClass("md-fab-active")},420)}),$document.on("click scroll",function(i){e.hasClass("md-fab-active")&&($(i.target).closest(e).length||(e.css("width","").removeClass("md-fab-active"),setTimeout(function(){e.removeClass("md-fab-animated")},140)))}))},fab_sheet:function(){var e=$(".md-fab-sheet");e&&(e.children("i").on("click",function(i){i.preventDefault();var a=e.children(".md-fab-sheet-actions").children("a").length;e.addClass("md-fab-animated"),setTimeout(function(){e.width("240px").height(40*a+8)},140),setTimeout(function(){e.addClass("md-fab-active")},280)}),$document.on("click scroll",function(i){e.hasClass("md-fab-active")&&($(i.target).closest(e).length||(e.css({height:"",width:""}).removeClass("md-fab-active"),setTimeout(function(){e.removeClass("md-fab-animated")},140)))}))}},altair_helpers={truncate_text:function(e){e.each(function(){$(this).dotdotdot({watch:"window"})})},custom_scrollbar:function(e){e.children(".scrollbar-inner").length||e.wrapInner("<div class='scrollbar-inner'></div>"),Modernizr.touch?e.children(".scrollbar-inner").addClass("touchscroll"):e.children(".scrollbar-inner").scrollbar({disableBodyScroll:!0,scrollx:!1,duration:100})},hierarchical_show:function(){$hierarchical_show=$(".hierarchical_show"),$hierarchical_show.length&&$hierarchical_show.each(function(){var e=$(this),i=e.children().length,a=60;e.children().each(function(e){$(this).css({"-webkit-animation-delay":e*a+"ms","animation-delay":e*a+"ms"})}).end().waypoint({handler:function(){e.addClass("hierarchical_show_inView"),setTimeout(function(){e.removeClass("hierarchical_show hierarchical_show_inView fast_animation").children().css({"-webkit-animation-delay":"","animation-delay":""})},i*a+1200),this.destroy()},context:"window",offset:"90%"})})},hierarchical_slide:function(){$hierarchical_slide=$(".hierarchical_slide"),$hierarchical_slide.length&&$hierarchical_slide.each(function(){var e=$(this),i=e.attr("data-slide-children")?e.children(e.attr("data-slide-children")):e.children(),a=i.length,t=e.attr("data-slide-context")?e.closest(e.attr("data-slide-context"))[0]:"window",n=100;a>=1&&(i.each(function(e){$(this).css({"-webkit-animation-delay":e*n+"ms","animation-delay":e*n+"ms"})}),e.waypoint({handler:function(){e.addClass("hierarchical_slide_inView"),setTimeout(function(){e.removeClass("hierarchical_slide hierarchical_slide_inView"),i.css({"-webkit-animation-delay":"","animation-delay":""})},a*n+1200),this.destroy()},context:t,offset:"90%"}))})},content_preloader_show:function(e,i){if(!$body.find(".content-preloader").length){var a=isHighDensity()?"@2x":"",t="undefined"!=typeof e&&"regular"==e?'<img src="assets/img/spinners/spinner'+a+'.gif" alt="" width="32" height="32">':'<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="32" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>',n="undefined"!=typeof i?i:$body;n.append('<div class="content-preloader">'+t+"</div>"),setTimeout(function(){$(".content-preloader").addClass("preloader-active")},0)}},content_preloader_hide:function(){$body.find(".content-preloader").length&&($(".content-preloader").removeClass("preloader-active"),preloader_timeout=window.setTimeout(function(){$(".content-preloader").remove()},500))},color_picker:function(e,i){if(e){for(var a=randID_generator(),t=i?i:["#e53935","#d81b60","#8e24aa","#5e35b1","#3949ab","#1e88e5","#039be5","#0097a7","#00897b","#43a047","#689f38","#ef6c00","#f4511e","#6d4c41","#757575","#546e7a"],n=t.length,s=$('<div class="cp_altair" id="'+a+'"/>'),r=0;n>r;r++)s.append("<span data-color="+t[r]+' style="background:'+t[r]+'"></span>');return s.append('<input type="hidden">'),$body.on("click","#"+a+" span",function(){$(this).addClass("active_color").siblings().removeClass("active_color").end().closest(".cp_altair").find("input").val($(this).attr("data-color"))}),e.append(s)}},retina_images:function(){"undefined"!=typeof $.fn.dense&&$("img").dense({glue:"@"})},full_screen:function(){$("#full_screen_toggle").on("click",function(e){e.preventDefault(),screenfull.toggle()})}},altair_uikit={reinitialize_grid_margin:function(){$("[data-uk-grid-margin]").each(function(){var e=$(this);e.data("gridMargin")||$.UIkit.gridMargin(e,$.UIkit.Utils.options(e.attr("data-uk-grid-margin")))}),$window.resize()}};
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//







;
