/*
<!#CR>
************************************************************************************************************************
*                                                    Copyrigths ©                                                      *
* -------------------------------------------------------------------------------------------------------------------- *
*      Authors Names And Emails > Nicola Granata <info@daemoncms.com>                                                  *
*      Company Name             > ActiveShade di Nicola Granata                                                        *
*      Copyright                > Nicola Granata                                                                       *
*                                 © All rights reserved.                                                               *
* -------------------------------------------------------------------------------------------------------------------- *
*                                           File and License Informations                                              *
* -------------------------------------------------------------------------------------------------------------------- *
*      File Name                > <!#FN> extension.js </#FN>
*      File Birth               > <!#FB> 2019/12/07 16:34:01.956 </#FB>                                                *
* File Mod > < !#FT > 2021 / 06 / 08 20: 41: 25.554 < /#FT>                                                *
*      License                  > <!#LT> BSD-3-Clause-Attribution </#LT>
*                                 <!#LU> https://spdx.org/licenses/BSD-3-Clause-Attribution.html </#LU>
*                                 <!#LD> This file may not be redistributed in whole or significant part. </#LD>
* File Version > < !#FV > 1.4 .67 < /#FV>
*                                                                                                                      *
******************************************* VSCode Extension: Version Boss *********************************************
</#CR>
*/


// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

/**
 * @todo Controllare l'inversione del raggruppamento delle variabili in modo da poter scegliere se usare il docblock esterno per le funzioni e in raggruppamento (invece delel signel line) per i gruppi di variabili
 *
 */

var vscode = require('vscode');
var fs = require('fs');
// var XRegExp = "";
var glob_env = {
	"version": "<!#FV> 1.4.67 </#FV>",
	"table_of_contents_title": "Table of contents",
	"table_of_contents_goto_symbol": "&#128316;",
	"lang": vscode.env.language,
	// count è una variabile che miserve a verificare quando versionboss viene ricaricato
	"count": 0,
	// riconoscimeto della dichiarazioni variabili
	"variables_declarations_re": "var|let|const|dim",
	"properties_keywords_for_classes_and_variables_re": "final|abstract|static|public|private|protected",
	"paths": {
		"master": "_master\\",
	},
	"master_files": {
		"readme": "_master.readme.md",
		"changelog": "_master.changelog.md"
	},
	"messages": {
		"development_sections_warning": "Note: [`Development`] sections in *Changelog* are addressed to the developer to remind him of any important changes that occurred during the writing of the code and do not always concern improvements made to the extension or to the theme.",
	},
	"vscode_marketplace_badges": {
		"url": "https://vsmarketplacebadge.apphb.com/",
		"badges": ["Version", "Downloads", "Installs", "Rating"],
		// badge mode puo' essere short o vuoto: qualsiasi valore diverso da short, restituisce "vuoto"
		"mode": "short",
		"badge_color_a": ["#FCAA33", "#66BB33", "#66AAFC", "#AC3BAF"],
		"badge_color_b": ["#3399CC", "#AA66FC", "#FC66AA", "#6AA69C"],
	},
	// Todo+ default keywords
	"monsterdoc_keywords_todoplus_default_array": ["@todo", "@fixme"],
}

var translations_obj = {
	"en": {
		"documentation_tags_added": "Todo+ tag added.",
		"make_docblock_for_variables": "Variables DocBlock added.",
		"copyrights_already_entered": "Copyrights Infos already entered. Please delete them to be able to update them (keep in mind version value!).",
		"copyrights_added": "Copyrights Infos added.",
		"copyrights_infos_array_done": "Copyrights Infos Array done.",
		"not_valid_selection": "This is not a valid selection!",
		"dockblock_addedd": "Empty DocBlock tags added.",
		"not_full_selection": "This is not (o not fully selected) Class / Function declaration!",
		"not_suitable_row": "This line is not suitable for adding DocBlock keywords!",
		"make_docblock_for": "{curr_structure_type} *{curr_structure_name}* DocBlock added",
		"channel_alias_no_channel_ver": "{channel_alias} cannot get channel version!",
		"file_version_set_to": "File Version set to: {new_ver}",
		"function_class_version_set_to": "Function/Class Version set to: {new_ver}",
		"licenses_set_to": "Licenses set to: {new_ver}",
		"copyrights_infos_array_already_entered": "Copyrights Infos Array \"{variable_name}\" seems to be already present in your code. Please delete them or check conflicts in your code with variable name \"{variable_name}\" in \"Settings / {app_name} / {variable_name_id_label}\" to be able to update them."
	},
	"it": {
		"documentation_tags_added": "Tag Todo+ aggiunto.",
		"copyrights_already_entered": "Informazioni sul Copyright già presenti. Se vuoi aggiornarle, eliminale e reinseriscile (tieni a mente il numero di versione per poterlo reinserire!).",
		"copyrights_added": "Informazioni sul Copyright aggiunte.",
		"copyrights_infos_array_done": "Copyrights Infos Array creato.",
		"not_valid_selection": "Selezione non valida!",
		"dockblock_addedd": "DocBlock vuoto aggiunto.",
		"not_full_selection": "Questa non è (o non è completamete selezionata) una dichiarazione di Class o Function!",
		"not_suitable_row": "Questa linea non può essere usata per aggiungere un DocBlock!",
		"make_docblock_for": "Documentazione creata per {curr_structure_type} *{curr_structure_name}*",
		"channel_alias_no_channel_ver": "{channel_alias} non può avere una versione di canale!",
		"file_version_set_to": "Versione del File impostata a: {new_ver}",
		"function_class_version_set_to": "Versione di Function/Class impostata a: {new_ver}",
		"licenses_set_to": "Licenza impostata a: {new_license_str}",
		"copyrights_infos_array_already_entered": "\"{variable_name}\", Array di Informazioni sul Copyright sembra essere già presente. Per favore, eliminalo o controlla se ci sono conflitti con il nome della variabile  \"{variable_name}\" in \"Impostazioni / {app_name} / {variable_name_id_label} per poterla aggiornare",
	}
}

var monsterdoc_keywords_todoplus_obj = {
	"todo": {
		//"TODO|FIXME|FIX|BUG|UGLY|HACK|NOTE|IDEA|REVIEW|DEBUG|OPTIMIZE"
		"language_name": "Todo+",
		"documentation_label": "Todo",
		"documentation_url": "",
		"documentation_extension": "",
		"download_url": "https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus",
		// prelevate da settings
		"keywords": {},
	},
}
var monsterdoc_keywords_main_obj = {
	// » true: indica che la key è fra quelle da includere per il calcolo della lunghezza del padding per ottener una formattazione elegante in MonsterDoc
	// » false: la key non deve essere inclusa per il calcolo della lunghezza massima dle padding
	"php": {
		"language_name": "PHP",
		"documentation_label": "PHPDoc",
		"documentation_url": "https://docs.phpdoc.org/latest/references/phpdoc/tags/",
		"documentation_extension": "html",
		"keywords": {
			"@abstract": "",
			"@access": {
				"is_predefined_keyword": true
			},
			"@author": {
				"is_predefined_keyword": true
			},
			"@category": "",
			"@copyright": {
				"is_predefined_keyword": true
			},
			"@deprecated": "",
			"@example": {
				"is_predefined_keyword": true
			},
			"@final": "",
			"@filesource": "",
			"@global": "",
			"@ignore": "",
			"@internal": "",
			"@license": {
				"is_predefined_keyword": true
			},
			"@link": {
				"is_predefined_keyword": true
			},
			"@method": "",
			"@name": "",
			"@package": "",
			"@param": {
				"is_predefined_keyword": true
			},
			"@property": "",
			"@return": {
				"is_predefined_keyword": true
			},
			"@see": "",
			"@since": "",
			"@static": "",
			"@staticvar": "",
			"@subpackage": "",
			"@todo": {
				"is_predefined_keyword": true
			},
			"@tutorial": "",
			"@uses": "",
			"@var": "",
			"@version": {
				"is_predefined_keyword": true
			},
			"@id": "",
			"@inheritdoc": "",
			"@source": "",
			"@toc": "",
		}
	},

	"js": {
		"language_name": "JavaScript",
		"documentation_label": "JSDoc",
		"documentation_url": "https://jsdoc.app/tags-",
		"documentation_extension": "html",
		"keywords": {
			"@abstract": "",
			"@access": "",
			"@alias": "",
			"@async": "",
			"@augments": "",
			"@author": "",
			"@borrows": "",
			"@callback": "",
			"@class": {
				"is_predefined_keyword": true
			},
			"@classdesc": {
				"is_predefined_keyword": true
			},
			"@constant": "",
			"@constructs": "",
			"@copyright": {
				"is_predefined_keyword": true
			},
			"@default": "",
			"@deprecated": "",
			"@description": {
				"is_predefined_keyword": true
			},
			"@enum": "",
			"@event": "",
			"@example": {
				"is_predefined_keyword": true
			},
			"@exports": "",
			"@external": "",
			"@file": "",
			"@fires": "",
			"@function": {
				"is_predefined_keyword": true
			},
			"@generator": "",
			"@global": "",
			"@hideconstructor": "",
			"@ignore": "",
			"@implements": "",
			"@inheritdoc": "",
			"@inner": "",
			"@instance": "",
			"@interface": "",
			"@kind": "",
			"@lends": "",
			"@license": "",
			"@listens": "",
			"@link": {
				"is_predefined_keyword": true
			},
			"@member": "",
			"@memberof": "",
			"@mixes": "",
			"@mixin": "",
			"@module": "",
			"@name": {
				"is_predefined_keyword": true
			},
			"@namespace": "",
			"@override": "",
			"@package": "",
			"@param": "",
			"@private": "",
			"@property": "",
			"@protected": "",
			"@public": "",
			"@readonly": "",
			"@requires": "",
			"@returns": "",
			"@see": "",
			"@since": "",
			"@static": "",
			"@summary": "",
			"@this": "",
			"@throws": "",
			"@todo": "",
			"@tutorial": "",
			"@type": "",
			"@typedef": "",
			"@variation": "",
			"@version": "",
			"@yields": "",
		}
	},
	"ts": {
		"language_name": "TypeScript",
		"documentation_label": "TypeDoc",
		"documentation_url": "https://typedoc.org/guides/doccomments/#",
		"documentation_extension": "",
		"keywords": {
			"@param": {
				"item_url": "param-param-name"
			},
			"@typeParam": {
				"item_url": "typeparam-param-name"
			},
			"@return": {
				"item_url": "returns"
			},
			"@returns": {
				"item_url": "returns"
			},
			"@event": "",
			"@hidden": {
				"item_url": "hidden-and-ignore"
			},
			"@ignore": {
				"item_url": "hidden-and-ignore"
			},
			"@internal": "",
			"@category": "",
		}
	},
}


//---------------

var monsterdoc_params_type_main_obj = {
	"php": {
		"keywords": {
			"integer": "",
			"float": "",
			"double": "",
			"string": "",
			"boolean": "",
			"object": "",
			"array": "",
			"null": "",
			"resource": "",
		}
	},
	"js": {
		"keywords": {
			"number": "",
			"string": "",
			"boolean": "",
			"symbol": "",
			"null": "",
			"undefined": "",
			"object": "",
			"array": "",
			"date": "",
			"function": "",
			"RegExp": "",
			"error": "",
		}
	},
	"ts": {
		"keywords": {
			"number": "",
			"string": "",
			"boolean": "",
			"object": "",
			"array": "",
			"tuple": "",
			"enum": "",
			"any": "",
			"void": "",
			"null": "",
			"never": "",
		}
	}
}
glob_env["translations"] = translations_obj;
glob_env["monsterdoc_params_type_main_obj"] = monsterdoc_params_type_main_obj;
glob_env["monsterdoc_keywords_main_obj"] = monsterdoc_keywords_main_obj;
glob_env["monsterdoc_keywords_todoplus_obj"] = monsterdoc_keywords_todoplus_obj;


function capitalize(str) {
	str = str.replace(new RegExp("^.", "gim"), function (match) {
		return match.toUpperCase();
	});
	return str;
};


function regexEscaped(val) {
	// esegue l'escape a triplo backslash per caratteri usati generalmente nelle RegExp che sono contenuti nel parametro da passare alla funzione

	val = val.replace(new RegExp("(\\\(|\\\)|\\\[|\\\]|\\\{|\\\}|\\\"|\\\'|\\\.|\\\-|\\\<|\\\>|\\\!|\\\$|\\\#|\\\\|\\\^|\\\*|\\\+|\\\?|\\\=)", "gim"), "\\$1");
	//val = JSON.stringify(string)(String(val));
	//val = val.substring(1, val.length - 1);
	return val;
}

function camelToLabel(val) {
	val = val.replace(new RegExp("([a-z]+)", "gim"), function (match_ra, str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	});
	val = val.replace(new RegExp("([\.]+)", "gm"), " » ");
	val = val.replace(new RegExp("([A-Z]+)", "gm"), " \$1");
	val = val.charAt(0).toUpperCase() + val.slice(1);
	val = val.trim();
	return val;
}

function flip(val) {

	val = val.split("").reverse().join("");
	return val;
}

function setLicenseID(val) {
	val = String(val.replace(new RegExp("([^a-z0-9\-\.\#]+)", "gim"), " ")).trim();
	val = val.replace(new RegExp("([\t ]+)", "gim"), "-");
	return val;
}

function natsort(unsorted_ra) {
	var collator = new Intl.Collator(undefined, {
		numeric: true,
		sensitivity: 'base'
	});
	var natsorted_ra = unsorted_ra.sort(collator.compare);
	return natsorted_ra;
}

function leadingzeroes(val, min_len) {
	if (typeof (min_len) == "undefined") {
		min_len = 2;
	}
	var fill_char = "0";
	val = prototype_string_lead(val, min_len, fill_char);
	return val;
}

function prototype_string_lead(val, min_len, fill_char) {
	val = String(val);
	var val_len = val.length;
	var fill = String(new Array(min_len - val_len + 1).join(fill_char));
	if (val_len < min_len) {
		val = fill + val;
	}
	return val;
}

function get_date_from_timestamp(timestamp_str, bool_return_date, bool_return_time) {
	var get_time = new Date(timestamp_str);
	var y = get_time.getFullYear();
	var m = 1 + get_time.getMonth() * 1;
	var d = get_time.getDate();
	var h = get_time.getHours();
	var min = get_time.getMinutes();
	var s = get_time.getSeconds();
	var ms = get_time.getMilliseconds();
	var str = "";
	if (bool_return_date) {
		str += y + "/" + leadingzeroes(m, 2) + "/" + leadingzeroes(d, 2);
	}
	if (bool_return_time) {
		str += " " + leadingzeroes(h, 2) + ":" + leadingzeroes(min, 2) + ":" + leadingzeroes(s, 2) + "." + leadingzeroes(ms, 3);
	}
	return str;
}

function get_config() {
	// @ts-ignore
	var package_obj = require("./package.json");
	var obj = {};
	var extensions_tree_config_obj = package_obj.contributes.configuration.properties;
	var vscode_editor_config_obj = Object.assign({}, vscode.workspace.getConfiguration("editor"));
	var root_items_obj = {};
	var root_items_ra = [];
	var path_items_ra = [];
	var root_item = "";
	var settings_tmp_obj = {};
	for (var i in extensions_tree_config_obj) {
		path_items_ra = String(i).split(".");
		root_item = path_items_ra[0];
		settings_tmp_obj[root_item] = vscode.workspace.getConfiguration(root_item);
		root_items_obj[root_item] = "";
	}

	for (var r in root_items_obj) {
		root_items_ra.push(r);
	}
	var settings_obj = Object.assign({}, extensions_tree_config_obj);
	var str_to_eval = "";
	for (i in extensions_tree_config_obj) {
		root_items_obj = String(i).split(".");

		str_to_eval = "settings_tmp_obj[\"" + root_items_obj.join("\"][\"") + "\"]";
		if (typeof (eval(str_to_eval)) != "undefined") {
			settings_obj[i] = eval(str_to_eval);
		}
	}
	obj = {
		"editor": vscode_editor_config_obj,
		"roots": root_items_ra,
		"package": package_obj,
		"defaults": extensions_tree_config_obj,
		"settings": settings_obj,
	};
	if (root_items_ra.length > 1) {
		var error_msg = "Attenzione!!! Ci sono " + root_items_ra.length + " (" + root_items_ra.join(", ") + ") elementi radice in Package.JSON configuration/properties!\r\nRidurre a 1 solo elemento identificativo le proprietà configurabili dell'estensione.";
		vscode.window.showInformationMessage(error_msg);
		////console.log(error_msg);
	}
	// console.log("function get_config()");
	// console.log(settings_obj);
	return obj;
}

function vboss_fill_string(str, max_len, row_to_fill, delta_start_trim) {
	var new_str = str;
	var new_str_len = new_str.length;

	if (new_str_len < max_len) {
		new_str = new_str + row_to_fill.substr(delta_start_trim + new_str.length);
	}
	new_str = new_str.substr(0, max_len);
	return new_str;
}

function vboss_row_fill(filler_label, filler_value, row_to_fill, row_fill_char, label_value_separator_char, max_label_len, max_value_len, frame_char, left_right_frame_char, space_char, sections_header_separator_chars, bool_leave_open_row, eol) {
	// Riempie le stringhe di lunghezza precalcolata del copyright con il valore della riga corrente
	var str = "";
	var bool_decorations_empty = false;
	var bool_is_header = false;
	var distance_header_sep_from_borders_in_chars = 2;
	var filler_sep = "";
	var space_char_len = space_char.length;
	var copyrights_row_max_len = row_to_fill.length;
	var left_right_frame_char_len = left_right_frame_char.length;
	var row_to_fill_len = row_to_fill.length;

	if (filler_value != "" && filler_value.indexOf("@") != 0) {
		filler_value = filler_value + space_char;
		if (bool_decorations_empty) {
			filler_sep += space_char;
		}
		filler_sep += label_value_separator_char + space_char;
	}
	var filler_sep_len = filler_sep.length;


	if (bool_leave_open_row) {
		row_to_fill = row_to_fill.substr(0, copyrights_row_max_len - left_right_frame_char_len) + (new Array(left_right_frame_char_len / space_char_len).join(space_char));
	}

	if (filler_value.indexOf("@") != 0) {
		var total_max_row_len = max_label_len + filler_sep_len + max_value_len + 2 * space_char_len + 2 * left_right_frame_char_len;
		if (total_max_row_len >= row_to_fill_len) {
			max_value_len = row_to_fill_len - (max_label_len + filler_sep_len + 4 * space_char_len + 2 * left_right_frame_char_len);
			//console.log( max_value_len );
		}
	}

	var copyrights_header_separator = String(new Array(Math.ceil((copyrights_row_max_len) / sections_header_separator_chars.length)).join(sections_header_separator_chars));
	var spacer = "";
	if (left_right_frame_char != "") {
		copyrights_header_separator = copyrights_header_separator.substr(0, copyrights_row_max_len - 2 * distance_header_sep_from_borders_in_chars * left_right_frame_char_len);
		spacer = new Array(Math.round(distance_header_sep_from_borders_in_chars / space_char_len)).join(space_char);
		copyrights_header_separator = left_right_frame_char + spacer + copyrights_header_separator + spacer + flip(left_right_frame_char);
	} else {
		copyrights_header_separator = copyrights_header_separator.substr(0, copyrights_row_max_len - 2 * left_right_frame_char_len);
	}

	copyrights_header_separator += eol;
	if (filler_value == "@sep") {
		bool_is_header = true;
	} else {
		bool_is_header = false;
		if (filler_value == "@header") {
			filler_label = space_char + filler_label + space_char;
			filler_value = "";
			bool_is_header = true;
			max_label_len = filler_label.length;
			max_value_len = 0;
		}


		if (left_right_frame_char == space_char || left_right_frame_char == "undefined" || left_right_frame_char == "") {
			bool_decorations_empty = true;
		}
		if (!bool_decorations_empty) {
			max_label_len += 2 * space_char_len;
		}
		max_value_len += space_char_len;
		if (filler_label.match(new RegExp("[a-z0-9]+", "gim")) != null) {
			if (!bool_decorations_empty && filler_value != "") {
				filler_label = space_char + filler_label + space_char;
			}
		}

		if (filler_value == "") {
			filler_sep_len = 0;
			max_value_len = 0;
		}


		if (filler_label.trim() == "") {
			filler_sep = filler_sep.replace(new RegExp("[^ ]{1}", "gim"), space_char);
		}
		var filler_len = max_label_len + filler_sep_len + max_value_len;


		var row_to_fill_span = row_to_fill_len - filler_len;
		var row_to_fill_half_init = Math.floor(row_to_fill_span / 2);

		var row_to_fill_half_init_str = row_to_fill.substr(0, row_to_fill_half_init);
		var row_to_fill_half_end_str = row_to_fill.substr(row_to_fill_half_init + filler_len);
		if (bool_decorations_empty) {
			//nel caso i caratteri di frame e fill siano spazi, evito la creazione di cornici "vuote" e tagli gli spazi iniziali
			row_to_fill_half_init_str = "";
			row_to_fill_half_end_str = "";
			row_fill_char = "";
		}
		//var row_to_fill_half_end_str = row_to_fill.substr(row_to_fill_half_init + filler_len + row_fill_char.length);
		if (filler_label.length <= max_label_len) {
			filler_label = vboss_fill_string(filler_label, max_label_len, row_to_fill, row_to_fill_half_init);
		}
		if (filler_value != "") {
			if (filler_value.length < max_value_len) {
				filler_value = vboss_fill_string(filler_value, max_value_len, row_to_fill, row_to_fill_half_init + max_label_len + filler_sep_len);
			}
		} else {
			// troncare il valore massimo del filler_value e mandare a capo le righe
		}
		if (filler_value.length > max_value_len) {
			var filler_value_ra = filler_value.match(new RegExp(".{1," + max_value_len + "}", "gim"));
			var filler_value_label_spacer = new Array(Math.ceil((max_label_len + filler_sep_len + left_right_frame_char_len) / space_char_len)).join(space_char);
			for (var j in filler_value_ra) {
				filler_value_ra[j] = String(filler_value_ra[j]).trim();
			}
			filler_value = filler_value_ra.join(eol + row_to_fill_half_init_str + filler_value_label_spacer);
		}

		var filler = filler_label + filler_sep + filler_value;
		str = row_to_fill_half_init_str + filler + row_to_fill_half_end_str + eol;
	}
	if (bool_is_header) {
		str += copyrights_header_separator;
	}
	return str;
}


function read_extension_file(fs, file_full_path) {
	var str = "";
	try {
		if (fs.existsSync(file_full_path)) {
			str = String(fs.readFileSync(file_full_path, "utf8"));
		}
	} catch (err) {
		console.error(err);
	}
	//console.log(str);
	return str;
}

function vboss_get_badges(extension_full_id, eol) {

	var badges_str = "";
	var vscm_badges_ra = glob_env["vscode_marketplace_badges"];
	var badge_mode = vscm_badges_ra["mode"];
	if (badge_mode != "short") {
		badge_mode = "";
	} else {
		badge_mode = "-" + badge_mode;
	}

	var badges_url = vscm_badges_ra["url"];
	var badges_ra = vscm_badges_ra["badges"];
	var color_a_ra = vscm_badges_ra["badge_color_a"];
	var color_b_ra = vscm_badges_ra["badge_color_b"];
	//console.log( color_b_ra );
	var color_a_ra_len = color_a_ra.length;
	var color_b_ra_len = color_b_ra.length;
	var badge_full_url = "";
	var badge_name = "";
	for (var i in badges_ra) {
		badge_name = badges_ra[i];
		badge_full_url = badges_url + badge_name.toLowerCase() + badge_mode + "/" + extension_full_id + ".svg";
		badge_full_url += "?style=for-the-badge&colorA=" + String(color_a_ra[parseInt(i) % color_a_ra_len]).substr(1, 6) +
			"&colorB=" + String(color_b_ra[parseInt(i) % color_b_ra_len]).substr(1, 6);
		badges_str += "[![" + badge_name + "](" + badge_full_url + ")](" + badge_full_url + ")" + eol;
	}
	return badges_str;
}

function vboss_get_contributes(editor, package_obj, eol) {
	var fs = require('fs');
	var contributes_str = "";
	var contributes_desc = "";
	var extension_full_id = package_obj.publisher + "." + package_obj.name;
	var extension_path = vscode.extensions.getExtension(extension_full_id).extensionPath;

	var contributes_conf_obj = package_obj.contributes.configuration.properties;
	var contributes_activationevents_obj = package_obj.activationEvents;
	var contributes_commands_obj = package_obj.contributes.commands;
	var contributes_keybindings_obj = package_obj.contributes.keybindings;


	contributes_str += eol + "# Settings" + eol + eol;
	contributes_str += "This extension contributes the following settings:" + eol + eol;
	for (var p in contributes_conf_obj) {
		contributes_desc = "`no description provided!`";
		if (typeof (contributes_conf_obj[p].markdownDescription) != "undefined") {
			contributes_desc = contributes_conf_obj[p].markdownDescription;
		} else if (typeof (contributes_conf_obj[p].description) != "undefined") {
			contributes_desc = contributes_conf_obj[p].description;
		}
		contributes_desc = contributes_desc.replace(new RegExp(". + eol + {3,}", "gim"), eol + eol);
		contributes_str += "##### " + camelToLabel(p) + eol + "* " + contributes_desc + eol + eol + "> `" + p + "` [type: `" + contributes_conf_obj[p].type + "`] " + eol + "---" + eol;
	}
	var a_e_item = "";
	var shortcuts_obj = {};
	for (p in contributes_activationevents_obj) {
		a_e_item = String(contributes_activationevents_obj[p]).split(":").pop().trim();
		shortcuts_obj[a_e_item] = {
			"title": "",
			"category": "",
			"key_win": "",
			"key_mac": ""
		};
	}
	var shortcuts_str = "";
	var tbl = "|";
	var tbl_h = tbl + "---";
	var shortcuts_titles_ra = ["Command Palette", "Windows", "Mac"];
	var shortcuts_titles_md = tbl + (shortcuts_titles_ra).join(tbl) + tbl + eol;
	var shortcuts_titles_md_delimiters = tbl_h + (new Array(shortcuts_titles_ra.length).join(tbl_h)) + tbl + eol;

	shortcuts_str += eol + "# Shortcuts Reference" + eol + eol;
	shortcuts_str += shortcuts_titles_md;
	shortcuts_str += shortcuts_titles_md_delimiters;
	for (p in shortcuts_obj) {
		for (var j in contributes_commands_obj) {
			if (contributes_commands_obj[j].command == p) {
				shortcuts_obj[p].title = contributes_commands_obj[j].title;
				shortcuts_obj[p].category = contributes_commands_obj[j].category;
				break;
			}
		}
		for (j in contributes_keybindings_obj) {
			if (contributes_keybindings_obj[j].command == p) {
				shortcuts_obj[p].key_win = String(contributes_keybindings_obj[j].key).toUpperCase();
				shortcuts_obj[p].key_mac = String(contributes_keybindings_obj[j].mac).toUpperCase();
				break;
			}
		}
		shortcuts_str += "| *" + shortcuts_obj[p].category + "*: " + shortcuts_obj[p].title + " | `" + shortcuts_obj[p].key_win + "` | `" + shortcuts_obj[p].key_mac + "` |" + eol;
	}


	// le variabili seguenti SONO UTILIZZATE nelle chiamate EVAL (quindi non eliminarle)

	var contents_str = eol + shortcuts_str + contributes_str + eol;
	var dollar_ph = "#§§§#";
	contents_str = contents_str.replace(new RegExp("[\$]+", "gim"), dollar_ph);

	var badges_str = vboss_get_badges(extension_full_id, eol);

	var assembler_ra = {
		"app_name": package_obj.displayName,
		"author_name": package_obj.author.name,
		"app_version": package_obj.version,
		"app_description": package_obj.description,
		"contents": contents_str,
		"development_sections_warning": glob_env["messages"]["development_sections_warning"],
		"badges": badges_str,
	};

	var fs_item_time = new Date();
	var timestamp = String(fs_item_time.toISOString()).replace(new RegExp("[^a-z0-9\-]+", "gim"), "-");
	var autobackup_path = extension_path + "\\_autobackup\\";
	var filename_package = "package.json";
	var filename_package_lock = "package-lock.json";
	var filename_readme = "README.md";
	var filename_changelog = "CHANGELOG.md";

	var filename_package_full_path = extension_path + "\\" + filename_package;
	var filename_package_lock_full_path = extension_path + "\\" + filename_package_lock;
	var file_readme_full_path = extension_path + "\\" + filename_readme;
	var file_changelog_full_path = extension_path + "\\" + filename_changelog;

	var file_master_readme = extension_path + "\\" + glob_env.paths.master + glob_env.master_files.readme;
	var file_master_changelog = extension_path + "\\" + glob_env.paths.master + glob_env.master_files.changelog;
	var file_master_readme_contents = read_extension_file(fs, file_master_readme);
	var file_master_changelog_contents = read_extension_file(fs, file_master_changelog);
	var last_app_version = String(glob_env["version"].replace(new RegExp("(<([^>]+)>)", "gim"), "")).trim();
	var msg_package_update = "";
	if (last_app_version != assembler_ra["app_version"].trim()) {
		var file_package_json_contents = read_extension_file(fs, filename_package_full_path);
		var package_local = JSON.parse(file_package_json_contents);
		package_local["version"] = last_app_version;
		var file_package_lock_json_contents = read_extension_file(fs, filename_package_lock_full_path);
		var package_lock_local = JSON.parse(file_package_lock_json_contents);
		package_lock_local["version"] = last_app_version;

		// copia di backup
		fs.writeFileSync(autobackup_path + filename_package + "." + timestamp + ".bak", file_package_json_contents, "utf-8");
		fs.writeFileSync(autobackup_path + filename_package_lock + "." + timestamp + ".bak", file_package_json_contents, "utf-8");
		// ora scrivo i nuovi file
		fs.writeFileSync(filename_package_full_path, JSON.stringify(package_local, null, "\t"), "utf-8");
		fs.writeFileSync(filename_package_lock_full_path, JSON.stringify(package_lock_local, null, "\t"), "utf-8");
		msg_package_update = " » *PACKAGE.JSON* and *PACKAGE-LOCK.JSON* *version* keys have been updated. Please check them." + eol
	}
	var common_headers_md = "";
	common_headers_md += "<!-- RICORDATI: QUESTO FILE E' ASSEMBLATO DAL TUO SCRIPT - NON MODIFICARLO DA QUI -->" + eol;
	common_headers_md += "<!-- " + get_date_from_timestamp(fs_item_time.getTime(), true, true) + " -->" + eol + eol;

	var readme_md = "";
	var changelog_md = common_headers_md + file_master_changelog_contents;

	var whats_new_ra = file_master_changelog_contents.split("##");
	var whats_new = whats_new_ra[1];
	var whats_new_1_ra = whats_new.split("\n");
	whats_new_1_ra.shift();
	whats_new = whats_new_1_ra.join("\n");
	whats_new = whats_new.trim();


	readme_md += common_headers_md + file_master_readme_contents + eol;
	// wats_new, essendo un abstract di changelog, deve essere fissato prima di essere aggiunto al readme
	for (var i in assembler_ra) {
		whats_new = whats_new.replace(new RegExp("\{" + i + "\}", "gim"), assembler_ra[i]);
	}
	assembler_ra["whats_new"] = whats_new;
	for (var i in assembler_ra) {
		changelog_md = changelog_md.replace(new RegExp("\{" + i + "\}", "gim"), assembler_ra[i]);
		readme_md = readme_md.replace(new RegExp("\{" + i + "\}", "gim"), assembler_ra[i]);
	}

	readme_md = readme_md.replace(new RegExp("(" + dollar_ph + ")", "gim"), "$");

	readme_md = vboss_make_toc_table_of_contents(readme_md, 3);


	//console.log(readme_md + eol + "----------------------------------------###############################################" + eol);
	fs.writeFileSync(file_changelog_full_path, changelog_md, "utf-8");
	fs.writeFileSync(file_readme_full_path, readme_md, "utf-8");
	var msg_success = "has been successfully generated. Please check it.";
	var msg_hr = "**** *** ***" + eol;
	var msg_final = eol + String(assembler_ra["app_name"]).toUpperCase() + " V. " + assembler_ra["app_version"] + " » " + glob_env["version"].replace(new RegExp("\<([^\>]+)\>", "gim"), "").trim() + " Extension Debugger - this is a message from the Author (" + assembler_ra["author_name"] + "):" + eol + "Your are in Debug Mode! You pressed a valid shortcut for this extension and now *Help Files* have been generated!" + eol + "This happens only the first time after you start a VSCode Debug Session Host!" + eol + msg_hr + " » *" + filename_readme + "* " + msg_success + eol + " » *" + filename_changelog + "* " + msg_success + eol + msg_package_update + msg_hr;
	console.log(msg_final);
	return readme_md;
}

function vboss_toc_item_set_id(str, separator) {
	if (typeof (separator) == "undefined") {
		separator = "-";
	}
	str = str.replace(new RegExp("([^a-z0-9 \\\/\\\-]+)", "gim"), "");
	str = str.trim();
	str = str.replace(new RegExp("([^a-z0-9\\\/\\\-]{1})", "gim"), separator);
	str = str.toLowerCase();
	// str = str.substring( 0, 256 );
	return str;
}

function vboss_make_toc_table_of_contents(str, levels) {
	var toc_str = "";
	var eol = "\r\n";
	str += eol;
	if (typeof (levels) == "undefined") {
		levels = 10;
	}
	var toc_symbol = glob_env["table_of_contents_goto_symbol"];
	var toc_title = glob_env["table_of_contents_title"];
	var titles_re = "^([\t ]*)([\\\#]{1," + levels + "})([^\\\#\r\n]+)";
	var titles_ra = str.match(new RegExp(titles_re, "gim"));
	var str_new = str.replace(new RegExp(titles_re, "gim"), "<a href=\"#" + vboss_toc_item_set_id(toc_title) + "\" name=\"toc\" style=\"float:right;z-index:1000;position:relative;\" >" + toc_symbol + "</a>" + eol + eol + "$1$2$3");
	if (titles_ra != null) {
		//console.log( titles_ra );
		var separator = "-";
		var pad = "";
		var re_ra = []

		//console.log( re_ra );
		toc_str = titles_ra.join("\r\n");

		toc_str = toc_str.replace(new RegExp(titles_re, "gim"), function (match, s1, s2, s3) {
			s3 = s3.trim();
			var pad = "";
			var pad_len = Math.max(0, s2.length - 1);
			var li_el = "";
			var add_hr = "";
			if (pad_len == 0) {
				add_hr = "<hr style=\"height:1px;border-width:0px;border-top-width:1px; border-top-style:dotted; position:relative;\">";
			}
			if (pad_len <= 1) {
				li_el = "1.";

			} else {
				li_el = "-";
			}
			var str = pad.padEnd(Math.max(0, s2.length - 1), "\t") + li_el + "\t[" + s3 + "](#" + vboss_toc_item_set_id(s3) + ")" + add_hr;
			return str;
		});
	}
	var toc_str_full = "# " + toc_title + eol + toc_str;
	var readme_md = str_new.replace("\{toc\}", toc_str_full);
	//console.log( toc_str )
	return readme_md;
}

function first_version_rectification(first_version, channels_ra) {
	var first_version_channel = first_version.replace(new RegExp("[^a-z]+", "gim"), "");
	var channels_obj = {};
	var c_i = "";
	for (var i in channels_ra) {
		c_i = channels_ra[i];
		channels_obj[c_i] = c_i;
	}
	var first_version_channel_new = first_version_channel;
	if (typeof (channels_obj[first_version_channel]) == "undefined") {
		first_version_channel_new = channels_ra[0];
	}
	var first_version_new = first_version;
	first_version_new = first_version_new.replace(first_version_channel, first_version_channel_new);
	return first_version_new;
}

function version_array_natsort(array_to_sort, first_version, re_semver_bounds_replacers, channels_ra, num_splitter, chan_splitter) {
	// questa funzione esegue un ordinamento naturale per le versioni e restituisce il valore massimo
	// N.B: sostituisce temporaneamente il canale alpha/beta ecc ecc con il suo id numerico nell'array personalizzabile dei settings per permettere un orinamento naturale ma corrispondente all'oridine dei canali inseriti nei settings

	var release_channel_ph = "zeta";
	var c_i = "";
	var min_channel_id_len = 4;
	var channel_id_fill_char = "0";
	var sorting_obj = {};
	var sorting_ids_ra = [];
	var channels_obj = {};
	for (var i in channels_ra) {
		c_i = channels_ra[i];
		if (c_i == "") {
			c_i = release_channel_ph;
		}
		channels_obj[c_i] = prototype_string_lead(i, min_channel_id_len, channel_id_fill_char);
	}

	if (typeof (channels_obj[release_channel_ph]) == "undefined") {
		channels_obj[release_channel_ph] = prototype_string_lead(channels_ra.length, min_channel_id_len, channel_id_fill_char);
	}
	var item_i = "",
		item_i_ra = null,
		item_i_channel = "",
		item_i_id = "";

	for (i in array_to_sort) {
		item_i = String(array_to_sort[i]);
		if (item_i == "") {
			item_i = first_version;
		}
		item_i = item_i.replace(new RegExp(re_semver_bounds_replacers, "gim"), "");
		item_i = item_i.trim();
		item_i = item_i.replace(new RegExp("[\t ]+", "gim"), "");
		item_i_ra = item_i.split(chan_splitter);
		if (item_i_ra.length < 2) {
			item_i_ra[1] = release_channel_ph;
		}
		// nel cao la stringa del channel sia stata *personalizzata* e quindi non presente nelal lista channels_ra, viene usato il primo valore di channels_ra (presumibilmente "alpha")
		item_i_channel = String(item_i_ra[1]).replace(new RegExp("[^a-z]+", "gim"), "");
		if (typeof (channels_obj[item_i_channel]) == "undefined") {
			item_i_channel = channels_obj[0];
		}
		item_i_ra[1] = String(item_i_ra[1]).replace(item_i_channel, channels_obj[item_i_channel]);
		item_i_id = item_i_ra.join(chan_splitter);
		sorting_ids_ra.push(item_i_id);
		sorting_obj[item_i_id] = item_i;
	}
	//console.log(channels_obj);
	sorting_ids_ra.map(String);
	sorting_ids_ra = natsort(sorting_ids_ra);
	//console.log(sorting_ids_ra);
	var max_id = sorting_ids_ra.pop();
	var max_ver = sorting_obj[max_id];

	var max_ra_full = max_ver.split(chan_splitter);
	var max_obj = {};
	max_obj["max_version"] = max_ver;
	max_obj["max_number"] = String(max_ra_full[0]).split(num_splitter);
	max_obj["max_channel"] = [];
	if (max_ra_full.length == 2) {
		max_obj["max_channel"] = String(max_ra_full[1]).split(num_splitter);
	}
	return max_obj;
}

function vboss_make_copyrights_owners(settings_obj, root_item, tabSize) {

	var copyrights_owner = [];
	var static_semver_boss_command = "copyrights";
	var copyrights_copyrightsOwner = settings_obj[root_item + ".settings." + static_semver_boss_command + ".copyrightsOwner"];
	var copyrights_authorsNamesAndEmails = [];
	var copyrights_authorsNamesAndEmails_tmp = settings_obj[root_item + "." + static_semver_boss_command + ".authorsNamesAndEmails"];
	if (typeof (copyrights_authorsNamesAndEmails_tmp) != "object" || copyrights_authorsNamesAndEmails_tmp.length == 0) {
		copyrights_authorsNamesAndEmails = ["WARNING! No " + static_semver_boss_command + " author owner set!"];
	} else {
		var copyrights_authorsNamesAndEmails_obj = make_autors_names_and_emails(copyrights_authorsNamesAndEmails_tmp);
		copyrights_authorsNamesAndEmails = copyrights_authorsNamesAndEmails_obj["copyrights_names"];
	}

	var copyrights_authorCompany = String(settings_obj[root_item + "." + static_semver_boss_command + ".companyName"]);
	if (copyrights_authorCompany == "undefined") {
		copyrights_authorCompany = "WARNING! No " + static_semver_boss_command + " company owner set!";
	}
	var copyrights_copyrightsOwner_ID = Number(parseInt(copyrights_copyrightsOwner));
	// console.log(copyrights_copyrightsOwner);
	switch (copyrights_copyrightsOwner_ID) {
		case 0:
			copyrights_owner = [copyrights_authorsNamesAndEmails[0]];
			break;
		case 1:
			copyrights_owner = [copyrights_authorCompany];
			break;
		case 2:
			copyrights_owner = [copyrights_authorsNamesAndEmails[0], copyrights_authorCompany];
			break;
		case 3:
			copyrights_owner = [copyrights_authorCompany, copyrights_authorsNamesAndEmails[0]];
			break;
		case 4:
			copyrights_owner = copyrights_authorsNamesAndEmails;
			break;
		case 5:
			copyrights_owner = copyrights_authorsNamesAndEmails.concat(copyrights_authorCompany);
			break;
		case 6:
			copyrights_owner = [copyrights_authorCompany].concat(copyrights_authorsNamesAndEmails);
			break;
		default:
			copyrights_owner = copyrights_authorsNamesAndEmails;
			break;
	}
	settings_obj[root_item + "." + static_semver_boss_command + ".copyright"] = copyrights_owner.concat(["© All rights reserved."]);
}

function vboss_get_filename() {
	var editor = vscode.window.activeTextEditor;
	var ws = vscode.workspace;
	var filename_full_path = editor.document.fileName;
	var file_stats_obj = fs.statSync(filename_full_path);
	var filename = filename_full_path;
	filename = filename.replace(ws.rootPath, "").slice(1);
	filename = filename.replace(new RegExp("[\\\\]+", "gim"), "/");
	var filename_basename = filename.split("/").pop();
	//var filename_ext = String( filename_full_path.split( "." ).pop() ).toLowerCase();
	var filename_ext = "";
	if (filename_full_path.lastIndexOf(".") != -1) {
		filename_ext = String(filename_full_path.substring(filename_full_path.lastIndexOf(".") + 1, filename_full_path.length)).toLowerCase();
	}
	var obj = {
		"filename_basename": filename_basename,
		"filename_ext": filename_ext,
		"file_stats_obj": file_stats_obj,
	}
	return obj;
}

function vboss_translate(trans_id, variables_in_text_obj) {
	var trans_str = "";
	var vz = 0;
	typeof (variables_in_text_obj) == "undefined" ? variables_in_text_obj = "": vz = 0;

	typeof (glob_env["current_translation"][trans_id]) != "undefined" ? trans_str = glob_env["current_translation"][trans_id]: trans_str = "* " + trans_id.toUpperCase() + " *";
	if (variables_in_text_obj != "") {
		trans_str = trans_str.replace(new RegExp("{([a-z0-9\\\_]+)}", "gim"), function (match, s1) {
			var str = "";
			if (typeof (variables_in_text_obj[s1]) != "undefined") {
				str = variables_in_text_obj[s1];
			} else {
				str = "[" + s1.toUpperCase() + " - not translated]";
			}
			return str;
		});
	}
	// console.log( "T-3 " + trans_str );
	return trans_str;
}

function vboss_versioning(registered_command, root_item, semver_boss_command, step_value, bool_autosave) {
	var vz = 0;
	var eol = "\r\n";
	var space_char = " ";
	var comma = ",";
	glob_env["current_file"] = vboss_get_filename();
	var file_stats_obj = glob_env["current_file"]["file_stats_obj"]
	var filename_basename = glob_env["current_file"]["filename_basename"];
	var filename_ext = glob_env["current_file"]["filename_ext"];
	// ripeto il get config perchè forse, tenendolo fuori il sistema non aggiorna le variabili.
	var config_obj = get_config();
	var tabSize = config_obj["editor"]["tabSize"];
	// Impostazioni versione secondo https://semver.org/ : MAJOR.MINOR.PATCH
	if (typeof (step_value) == "undefined" || step_value == 0 || isNaN(Number(step_value)) || step_value == "") {
		step_value = 1;
	}
	step_value = Number(parseInt(step_value));
	var local_bool_autosave = config_obj["settings"][root_item + ".settings.autoSaveAfterStepUp"];
	if (registered_command.indexOf("-autosave") >= 0) {
		bool_autosave = true;
	} else {
		bool_autosave = local_bool_autosave;
	}

	var editor = vscode.window.activeTextEditor;
	var ws = vscode.workspace;
	var done_msg_ra = [];

	// @ts-ignore
	var package_obj = config_obj["package"];
	//var defaults_obj = config_obj.defaults;
	var settings_obj = config_obj["settings"];
	var app_name = package_obj.displayName;

	var channels_list = String(settings_obj[root_item + ".settings.setChannelsList"]).trim();
	channels_list = channels_list.replace(new RegExp("[\t ]+", "gim"), " ");
	channels_list = channels_list.replace(new RegExp("^([^a-z]+)", "gim"), "");
	channels_list = channels_list.replace(new RegExp("([^a-z]+)$", "gim"), "");
	channels_list = channels_list.replace(new RegExp("([^a-z]{2,})", "gim"), ",");
	var channels_ra = String(channels_list).split(comma);

	var show_information_message = settings_obj[root_item + ".settings.showInformationMessage"];
	var show_warning_and_error_message = settings_obj[root_item + ".settings.showWarningAndErrorMessage"];
	// console.log(root_item, semver_boss_command);
	//console.log("Config");
	//console.log(config_obj);
	var default_quoting_char = settings_obj[root_item + ".settings.setDefaultQuotingCharForGeneratedCode"];
	var copyrights_header = settings_obj[root_item + ".settings.copyrights.copyrightsHeader"];
	var file_and_licenses_infos_header = settings_obj[root_item + ".settings.copyrights.fileAndLicensesInfosHeader"];

	var boundary_tag_enclosers_ra = String(settings_obj[root_item + ".boundaries.tagEnclosers"]).split(comma);
	// console.log(String(settings_obj[root_item + ".boundaries.tagEnclosers"]));
	var boundary_tag_begin = boundary_tag_enclosers_ra[0];
	var boundary_tag_end = boundary_tag_enclosers_ra[1];

	var boundary_identity_char = settings_obj[root_item + ".boundaries.boundaryIdentityChar"];
	var boundary_open_char = settings_obj[root_item + ".boundaries.boundaryOpenChar"];
	var boundary_close_char = settings_obj[root_item + ".boundaries.boundaryCloseChar"];
	// nel caso venissero selezionati due caratteri uguali, il caratttere boundary_close_char verrà sostituito da un altro carattere
	if (boundary_close_char == boundary_open_char) {
		if (boundary_open_char == "/") {
			boundary_close_char = "!";
		} else {
			boundary_close_char = "/";
		}
	}

	var bounds_obj = {};
	var bound_string = "";
	var bound_id = "";
	var bound_root = "";
	var i = "";
	for (i in settings_obj) {
		bound_root = root_item + ".boundaries.dataStringIDs.";
		if (String(i).indexOf(bound_root) === 0) {
			bound_string = settings_obj[i];
			bound_id = String(i).substr(bound_root.length);
			//console.log(bound_id);
			bounds_obj[bound_id] = {
				//"begin": boundary_tag_begin + boundary_open_char + boundary_identity_char + bound_string + boundary_identity_char + boundary_open_char + boundary_tag_end,
				//"end": boundary_tag_begin + boundary_close_char + boundary_identity_char + bound_string + boundary_identity_char + boundary_close_char + boundary_tag_end,
				"begin": boundary_tag_begin + boundary_open_char + boundary_identity_char + bound_string + boundary_tag_end,
				"end": boundary_tag_begin + boundary_close_char + boundary_identity_char + bound_string + boundary_tag_end,
			};
		}
	}

	var vboss_begin = bounds_obj["fileVersion"]["begin"];
	var vboss_end = bounds_obj["fileVersion"]["end"];
	var fn_begin = bounds_obj["fileName"]["begin"];
	var fn_end = bounds_obj["fileName"]["end"];
	var fb_begin = bounds_obj["fileBirth"]["begin"];
	var fb_end = bounds_obj["fileBirth"]["end"];
	var fmt_begin = bounds_obj["fileModificationTime"]["begin"];
	var fmt_end = bounds_obj["fileModificationTime"]["end"];
	var cr_begin = bounds_obj["copyrights"]["begin"];
	var cr_end = bounds_obj["copyrights"]["end"];
	var lic_begin = bounds_obj["licenses"]["begin"];
	var lic_end = bounds_obj["licenses"]["end"];
	var lic_url_begin = bounds_obj["licensesUrl"]["begin"];
	var lic_url_end = bounds_obj["licensesUrl"]["end"];
	var lic_clar_begin = bounds_obj["licensesClarification"]["begin"];
	var lic_clar_end = bounds_obj["licensesClarification"]["end"];
	var licenses_boundaries_ra = Array([lic_begin, lic_end], [lic_url_begin, lic_url_end], [lic_clar_begin, lic_clar_end]);
	if (semver_boss_command == "copyrights" || semver_boss_command.indexOf("monsterdoc") != -1) {
		vboss_make_copyrights_owners(settings_obj, root_item, tabSize)
	}
	var sections_header_separator_chars = settings_obj[root_item + ".settings.copyrights.sectionSeparatorChars"];
	var licenses_default_pattern_url = settings_obj[root_item + ".settings.copyrights.setLicensesPatternUrl"];
	var licenses_default_clarification = String(settings_obj[root_item + ".settings.copyrights.setLicensesDefaultClarification"]).trim();
	var licenses_list = "";
	licenses_list = settings_obj[root_item + ".settings.copyrights.setLicensesList"];
	var licenses_list_ra = null;
	if (typeof (licenses_list) == "string") {
		licenses_list = licenses_list.trim();
		licenses_list = licenses_list.replace(new RegExp("[\t ]+", "gim"), " ");
		licenses_list_ra = licenses_list.split(comma);
	} else {
		licenses_list_ra = licenses_list;
	}

	var licenses_ra = [];
	var licenses_obj = {};
	var licenses_list_ra_i = [];
	var lic_name = "",
		lic_name_id = "",
		lic_clar = "",
		lic_url = "";

	//console.log(licenses_list_ra);

	for (i in licenses_list_ra) {
		licenses_list_ra_i = (String(licenses_list_ra[i]).trim()).split("|");
		//console.log(licenses_list_ra_i);
		for (j in licenses_list_ra_i) {
			licenses_list_ra_i[j] = String(licenses_list_ra_i[j]).trim();
		}
		typeof (licenses_list_ra_i[0]) != "undefined" && licenses_list_ra_i[0] != "" ? lic_name_id = setLicenseID(String(licenses_list_ra_i[0])) : lic_name_id = "";
		typeof (licenses_list_ra_i[0]) != "undefined" && licenses_list_ra_i[0] != "" ? lic_name = licenses_list_ra_i[0] : lic_name = "ERROR: no License name provided!";
		typeof (licenses_list_ra_i[1]) != "undefined" && licenses_list_ra_i[1] != "" ? lic_url = licenses_list_ra_i[1] : lic_url = "";
		typeof (licenses_list_ra_i[2]) != "undefined" && licenses_list_ra_i[2] != "" ? lic_clar = licenses_list_ra_i[2] : lic_clar = licenses_default_clarification;
		if (lic_url == "" && licenses_default_pattern_url != "" && licenses_default_pattern_url != "undefined") {
			lic_url = licenses_default_pattern_url;
		}
		lic_url = lic_url.replace("{LICENSE_ID}", lic_name_id);
		licenses_ra.push([lic_name, lic_url, lic_clar]);
		licenses_obj[lic_name_id] = Number(i);
	}

	var copyrights_tmp_ra = [];
	var copyrights_item_value_obj = {};
	var copyrights_item_label = "";
	var copyrights_item_label_tmp = "";
	var settings_copy_obj = Object.assign(settings_obj);
	for (i in settings_copy_obj) {
		copyrights_item_label_tmp = String(i);
		if (copyrights_item_label_tmp.indexOf(root_item + ".copyrights.") >= 0) {
			copyrights_item_label_tmp = (copyrights_item_label_tmp.split(".")).pop();
			copyrights_item_label = camelToLabel(copyrights_item_label_tmp);
			copyrights_item_value = settings_copy_obj[i];
			if (copyrights_item_label_tmp == "authorsNamesAndEmails") {
				copyrights_item_value_obj = make_autors_names_and_emails(copyrights_item_value);
				copyrights_item_value = copyrights_item_value_obj["authorsNamesAndEmails"];
			}
			copyrights_tmp_ra.push([copyrights_item_label.trim(), copyrights_item_value, i]);
		}
	}

	// (|\-((rc|beta|alpha)(|\.(\d+))))
	// var re_semver = "([0-9\.]+)(|\-(([a-z]+)(|\.[0-9]+)))";
	var semver_use_channels_strict_match = settings_obj[root_item + ".settings.versionUseChannelsStrictMatch"];
	var semver_channles_match_string_re = "[a-z]{1,256}";
	if (semver_use_channels_strict_match) {
		semver_channles_match_string_re = channels_ra.join("|");
	}
	//var re_semver = "([0-9]+\.[0-9]+\.[0-9]+)(|\-(" + semver_channles_match_string_re + ")(|\.[0-9]+))";
	var re_semver = "([0-9]+\.[0-9]+\.[0-9]+)(\-(" + semver_channles_match_string_re + "(\.[0-9]+|))|)";
	var re_lic = "(.+)";
	// var re_copyrights = "(([\r\n]*)(.*)([\r\n]*))";
	var bool_semver_update_on_pattern_match = false;
	var bool_semver_update_on_pattern_match_only_first = false;

	var bool_semver_update_on_pattern_match_str = String(settings_obj[root_item + ".settings.versionUpdateOnPatternMatch"]).toLowerCase();
	//var bool_semver_update_on_pattern_match_only_first = settings_obj[root_item + ".settings.versionUpdateOnPatternMatchOnlyFirst"];

	// in questo modo mantengo la retrocompatibilità con la prima versioen pubblica . POI ANDRA' RIMOSSA

	if (bool_semver_update_on_pattern_match_str.indexOf("first") != -1) {
		bool_semver_update_on_pattern_match = true;
		bool_semver_update_on_pattern_match_only_first = true;
	} else if (bool_semver_update_on_pattern_match_str.indexOf("true") != -1) {
		// true o false
		bool_semver_update_on_pattern_match = true;
	} else {
		bool_semver_update_on_pattern_match = false;
		bool_semver_update_on_pattern_match_only_first = false;
	}


	var re_semver_full = vboss_begin + "([" + eol + "\t ]*)" + re_semver + "([" + eol + "\t ]*)" + vboss_end;
	//console.log( re_semver_full )
	// aggiungo anche il carattere "^" che indica la versione minima di compatibilità nel package json per l'upgrade
	var re_semver_extended_enclosers = "(\"|\'|\t| |^)(\\\^|)";
	// questo sistema usa la backreference per fare in modo che solo la stringa fra due caratteri identici fra quelli in re_semver_extended_enclosers poss aessre considerata

	var re_semver_extended_full = re_semver_extended_enclosers + re_semver + "(\\1| |\t|$|\b)";
	var re_datetime_full = "([0-9]{4}(\/|\-)[0-9]{2}(\/|\-)[0-9]{2}( |T)[0-9]{1,2}\:[0-9]{1,2}\:[0-9]{1,2}(\.[0-9]{1,3}Z|))";

	// console.log(re_semver_extended_full);

	var re_licenses_full = lic_begin + "([\r\n\t ]*)" + re_lic + "([\r\n\t ]*)" + lic_end;
	var re_licenses_url_full = lic_url_begin + "([\r\n\t ]*)" + re_lic + "([\r\n\t ]*)" + lic_url_end;
	var re_licenses_clar_full = lic_clar_begin + "([\r\n\t ]*)" + re_lic + "([\r\n\t ]*)" + lic_clar_end;
	var re_copyrights_full = cr_begin + "([\r\n\t ]*)|" + cr_end;

	// aggiungo la sigla per RELEASE (che non avendo sigla in semver.org è vuota)
	channels_ra.push("");
	var channels_obj = {};
	var channel_c = "";
	var channels_ra_len = Number(channels_ra.length);
	var c = 0;
	for (c = 0; c < channels_ra_len; c++) {
		channel_c = channels_ra[c];
		if (channel_c != "") {
			channels_obj[channel_c] = c;
		}
	}
	// vscode.window.showInformationMessage(re_semver_full);


	var comments_block_open_default = "/*";
	var comments_block_close_default = flip(comments_block_open_default);
	var comments_row_open_default = "//";
	var comments_row_close_default = "";

	var comments_block_open = "";
	var comments_block_close = "";
	var comments_row_open = "";
	var comments_row_close = "";

	switch (filename_ext) {
		case "cmd":
		case "bat":
			comments_block_open = "";
			comments_block_close = "";
			comments_row_open = "REM";
			comments_row_close = comments_row_close_default;
			break;
		case "vb":
		case "vbs":
			comments_block_open = "";
			comments_block_close = "";
			comments_row_open = "'";
			comments_row_close = comments_row_close_default;
			break;
		case "pas":
			comments_block_open = "{*";
			comments_block_close = "*}";
			comments_row_open = "{";
			comments_row_close = "}";
			break;
		case "py":
			comments_block_open = "'''";
			comments_block_close = flip(comments_block_open);
			comments_row_open = "#";
			comments_row_close = comments_row_close_default;
			break;
		case "htm":
		case "html":
			comments_block_open = "<!--";
			comments_block_close = "-->";
			comments_row_open = comments_block_open;
			comments_row_close = comments_block_close;
			break;
		default:
			comments_block_open = comments_block_open_default;
			comments_block_close = comments_block_close_default;
			comments_row_open = comments_row_open_default;
			comments_row_close = comments_row_close_default;
			break;

	}

	// console.log(vscode.FileType);


	var selection = editor.selection;
	var position = editor.selection.end;
	if (semver_boss_command.indexOf("monsterdoc") == -1) {
		editor.selection = new vscode.Selection(position, position);
		selection = editor.selection;
	}
	var editor_contents_str = editor.document.getText();
	var num_splitter = ".";
	var chan_splitter = "-";
	// var zero_ver = "0" + num_splitter + "0" + num_splitter + "0";
	//var first_ver = "1" + num_splitter + "0" + num_splitter + "0-" + channels_ra[0];
	var first_ver = settings_obj[root_item + ".settings.setFirstVersion"];
	// se per errore è stato inserito un valore sbagliato per il channel nei settings (dato che on è possibile prevedere quali channels imposterà l'untente, correggero' il channel sbagliato applicando il primo valore di channels_ra;
	// l aparte numerica delal version invece dovrebbe essere già corretta perchè nei settings è inseirta la regExp che cotnrolla la conformità dlela parte numerica.
	first_ver = first_version_rectification(first_ver, channels_ra);
	// verifico se esiste un copyright inserito
	var copyrights_match_ra = editor_contents_str.match(new RegExp(re_copyrights_full, "gim"));

	// verifico se esiste o meno già una versione inserita.
	var semver_match_ra = editor_contents_str.match(new RegExp(re_semver_full, "gim"));
	var semver_line_range = null;
	var semver_extended_match_ra = null;
	// verifico se alla linea selezionata ci sia un pattern match del semver in quote

	var semver_possible_pos = editor.selection.active;
	var semver_possible_pos_line = semver_possible_pos.line;
	var semver_current_line = editor.document.lineAt(semver_possible_pos_line);
	var semver_possible_pos_character = semver_possible_pos.character;
	semver_line_range = new vscode.Range(semver_possible_pos_line, 0, semver_possible_pos_line, semver_current_line.range.end.character);

	var line_text = editor.document.getText(semver_line_range);

	semver_extended_match_ra = line_text.match(new RegExp(re_semver_extended_full, "gim"));
	if (semver_extended_match_ra != null && semver_extended_match_ra.length > 1) {
		semver_line_range = new vscode.Range(semver_possible_pos_line, semver_possible_pos_character, semver_possible_pos_line, semver_current_line.range.end.character);
		line_text = editor.document.getText(semver_line_range);
	}
	// console.log(line_text);
	position.with(semver_possible_pos_line, semver_possible_pos_character);
	if (semver_extended_match_ra != null) {
		// cercare di trovare il modo di poter sostituire solo i valori nella linea selezionata
		editor_contents_str = line_text;
		semver_match_ra = null;
	} else {
		semver_line_range = null;
	}

	semver_extended_match_ra = editor_contents_str.match(new RegExp(re_semver_extended_full, "gim"));


	var licenses_match_ra = editor_contents_str.match(new RegExp(re_licenses_full, "gim"));

	// console.log(semver_match_ra);
	var first_ver_full = vboss_begin + space_char + first_ver + space_char + vboss_end;
	// inizializzo position per l'eliminazione della selezione dopo alcune operazioni
	position = editor.selection.end;
	var selection_to_replace, selection_replacement = "";
	var j_count = 0;
	var new_ver_full = "";
	var copyrights_infos_json_str = "";

	// var i = 0;
	var re_semver_bounds_replacers = "";
	re_semver_bounds_replacers += "((" + vboss_begin + "|" + vboss_end + ")";
	if (bool_semver_update_on_pattern_match || semver_line_range != null) {
		re_semver_bounds_replacers += "|" + re_semver_extended_enclosers;
	} else {
		// annullo il matching esteso
		semver_extended_match_ra = null;
	}
	re_semver_bounds_replacers += ")";

	var semver_match_full_ra = [];
	if (semver_match_ra != null) {
		semver_match_full_ra = semver_match_full_ra.concat(semver_match_ra);
	}
	if (semver_extended_match_ra != null) {
		if (bool_semver_update_on_pattern_match_only_first) {
			// uso solo il primo valore per la comparazione delle versioni trovate con OnPatternMatch true
			semver_extended_match_ra = [semver_extended_match_ra.shift()];
		}
		semver_match_full_ra = semver_match_full_ra.concat(semver_extended_match_ra);
	}

	//console.log(re_semver_bounds_replacers);
	if (semver_match_full_ra.length == 0) {
		semver_match_full_ra.push(first_ver);
	}

	var max_obj = version_array_natsort(semver_match_full_ra, first_ver, re_semver_bounds_replacers, channels_ra, num_splitter, chan_splitter);

	//var max = max_obj.max_version;
	var max_ra = max_obj["max_number"];
	var max_channel_ra = max_obj["max_channel"];

	var curr_ver_ra = max_ra;

	// il seguente sistema è in accordo con le direttive "semver.org"
	var new_ver_ra = curr_ver_ra.map(Number);
	var new_channel_ra = max_channel_ra;
	var new_license_str = "";
	var license_id = 0;
	var channel_id = 0;
	typeof (new_channel_ra[0]) == "undefined" ? new_channel_ra[0] = "": vz;
	var reset_child_on_step_up = settings_obj[root_item + ".settings.resetChildsOnStepUp"];
	var new_channel_ra_0_str = String(new_channel_ra[0].trim()).toLowerCase();

	switch (semver_boss_command) {
		case "chanver":
			//console.log("STEP 01");
			var chanver_limit = settings_obj[root_item + ".settings.nonStandard.stepUpChannelOnChannelVersionLimitReach"];
			if (new_channel_ra[0] !== "" && new_channel_ra_0_str.indexOf("rt") == -1 && new_channel_ra_0_str.indexOf("ga") == -1) {
				//console.log("new_channel_ra[0]=" + new_channel_ra[0]);
				if (typeof (new_channel_ra[1]) == "undefined" || new_channel_ra[1] == "") {
					if (step_value > 0) {
						new_channel_ra[1] = 1;
					}
				} else {
					new_channel_ra[1] = new_channel_ra[1] * 1 + step_value;
				}
			} else {
				var channel_alias = new_channel_ra[0];
				if (channel_alias == "") {
					channel_alias = "Release*";
				}

				done_msg_ra.push(["warning", vboss_translate("channel_alias_no_channel_ver", {
					"channel_alias": channel_alias
				})]);
			}
			// per step down
			new_channel_ra[1] < 1 ? new_channel_ra[1] = "" : vz;
			// se il sistema raggiunge il limite o la versione release gli step up da chanver si fermano
			if (chanver_limit <= 0 || (chanver_limit > 0 && new_channel_ra[1] <= chanver_limit) || new_channel_ra[0] == "" || step_value < 1) {
				break;
			}
			case "channel":
				if (new_channel_ra.length == 0 || new_channel_ra[0] == "" || typeof (channels_obj[new_channel_ra[0]]) == "undefined") {
					step_value > 0 ? new_channel_ra[0] = channels_ra[0] : new_channel_ra[0] = channels_ra[channels_ra_len + step_value];
					// questa funzione previene il fallimento dello step-down del Channel
					step_value < 0 && (new_channel_ra.length == 0 || new_channel_ra[0] == "") ? new_channel_ra[0] = channels_ra[channels_ra_len + 2 * step_value] : vz;
				} else {
					if (typeof (channels_obj[new_channel_ra[0]]) != "undefined") {
						channel_id = channels_obj[new_channel_ra[0]];
					} else {
						channel_id = channels_obj[channels_ra[0]];
					}
					channel_id = channel_id * 1 + step_value;
					if (typeof (channels_ra[channel_id]) == "undefined") {
						step_value > 0 ? channel_id = 0 : channel_id = channels_ra_len + step_value;
					}
					new_channel_ra[0] = channels_ra[channel_id];
				}
				if (reset_child_on_step_up && step_value > 0 || new_channel_ra[0] == "" || String(new_channel_ra[0].trim()).toLowerCase().indexOf("rt") == 0 || String(new_channel_ra[0].trim()).toLowerCase().indexOf("ga") == 0) {
					new_channel_ra[1] = "";
					if ((new_channel_ra[0] == "" || new_channel_ra_0_str.indexOf("rt") == 0 || new_channel_ra_0_str.indexOf("ga") == 0)) {
						new_channel_ra[1] = "";
					}
				}
				// in modalità "release" azzero i valori di channel e di chanver
				break;
			case "patch":
				var patch_version_limit = settings_obj[root_item + ".settings.nonStandard.stepUpMinorVersionOnPatchVersionLimitReach"];
				new_ver_ra[2] = Number(new_ver_ra[2]) * 1 + step_value;
				// per step down
				if (Number(new_ver_ra[2]) < 0) {
					new_ver_ra[2] = 0;
				}
				// se il sistema raggiunge il limite...
				if (patch_version_limit <= 0 || (patch_version_limit > 0 && new_ver_ra[2] <= patch_version_limit)) {
					break;
				} else {
					new_ver_ra[2] = 0;
				};

			case "minor":
				var minor_version_limit = settings_obj[root_item + ".settings.nonStandard.stepUpMajorVersionOnMinorVersionLimitReach"];
				new_ver_ra[1] = Number(new_ver_ra[1]) + step_value;
				// per step down
				if (Number(new_ver_ra[1]) < 0) {
					new_ver_ra[1] = 0;
				}
				// azzera solo in step up, mai in step-down
				if (reset_child_on_step_up && step_value > 0) {
					new_ver_ra[2] = 0;
				}
				// se il sistema raggiunge il limite...
				if (minor_version_limit <= 0 || (minor_version_limit > 0 && new_ver_ra[1] <= minor_version_limit)) {
					break;
				} else {
					new_ver_ra[1] = 0;
					new_ver_ra[2] = 0;
				};
			case "major":
				new_ver_ra[0] = Number(new_ver_ra[0]) + step_value;
				// per step down
				if (Number(new_ver_ra[0]) < 0) {
					new_ver_ra[0] = 0;
				}
				if (reset_child_on_step_up && step_value > 0) {
					new_ver_ra[1] = 0;
					new_ver_ra[2] = 0;
					new_channel_ra[0] = "";
				}
				if (settings_obj[root_item + ".settings.setChannelToAlphaOnMajorVersionStepUp"] && step_value > 0) {
					// imposta il canale ad alpha appena c'è uno step-up della Major version
					new_channel_ra[0] = channels_ra[0];
				}
				break;
			default:
				break;
	}

	// console.log(new_ver_ra);
	// console.log(max_ra_full);
	var new_ver = new_ver_ra.join(num_splitter);
	if (new_channel_ra[0] != "") {
		new_ver += "-";
		if (new_channel_ra[1] != "") {
			new_ver += new_channel_ra.join(num_splitter);
		} else {
			new_ver += new_channel_ra[0];
		}
	}
	if (new_ver.trim() == "") {
		new_ver = first_ver;
	}

	new_ver_full = vboss_begin + space_char + new_ver + space_char + vboss_end;
	new_ver_full = new_ver_full.replace(new RegExp("[\t ]{2,}", "gim"), space_char);

	//console.log(new_ver);

	//}


	if (semver_boss_command == "boundversion" || semver_boss_command == "nakedversion" || semver_boss_command == "bannedversion") {
		var bool_use_quotes_on_naked_version = settings_obj[root_item + ".settings.insertQuotesWithFileVersion"];
		if (semver_boss_command == "boundversion") {
			new_ver = new_ver_full;
		} else if (semver_boss_command == "nakedversion") {
			if (bool_use_quotes_on_naked_version) {
				new_ver = default_quoting_char + new_ver + default_quoting_char;
			}
		} else if (semver_boss_command == "bannedversion") {
			var banned_char = settings_obj[root_item + ".settings.charForBannedVersion"];
			new_ver = banned_char + new_ver;
			if (bool_use_quotes_on_naked_version) {
				new_ver = default_quoting_char + new_ver + default_quoting_char;
			}
		}

		vboss_write_in_editor(editor, selection, new_ver);
	}
	if (semver_boss_command == "licenses") {
		var old_licenses_id = "";
		if (licenses_match_ra != null) {
			old_licenses_id = String(licenses_match_ra[0]).replace(new RegExp("(" + lic_begin + "([\t ]*)|([\t ]*)" + lic_end + ")", "gim"), "");
			old_licenses_id = setLicenseID(old_licenses_id);
			//console.log("1 " + old_licenses_id);
		}
		if (old_licenses_id.length == 0 || old_licenses_id == "" || typeof (licenses_obj[old_licenses_id]) == "undefined") {
			new_license_str = licenses_ra[0][0];
		} else {
			if (typeof (licenses_obj[old_licenses_id]) != "undefined") {
				license_id = licenses_obj[old_licenses_id];
			} else {
				license_id = Number(Object.values(licenses_obj)[0]);
			}
			license_id = Number(license_id) + step_value;
			typeof (licenses_ra[license_id]) == "undefined" ? license_id = 0: vz;
			new_license_str = licenses_ra[license_id][0];
		}
		//console.log("2 " + license_id);
	}

	if (semver_boss_command == "getinfosarray") {
		// console.log("COMMAND 1: " + semver_boss_command);
		var operator_open = "";
		var operator_close = "";
		var operator_assign = "";
		var operator_quotes = default_quoting_char;
		var operator_alt_quotes = "'";
		if (operator_quotes != "\"") {
			operator_alt_quotes = "\"";
		}
		var variable_name_id = "setVariableNameForCopyrightsInfosArray";
		var variable_name = String(settings_obj[root_item + ".settings." + variable_name_id]).trim();

		var bool_planguage_is_defined = false;
		var filename_basename_full = operator_quotes + fn_begin + space_char + filename_basename + space_char + fn_end + operator_quotes;
		switch (filename_ext) {
			case "php":
				if (variable_name.charAt(0) != "$") {
					variable_name = "$" + variable_name;
				}
				operator_open = variable_name + " = array(";
				operator_close = ");";
				operator_assign = "=>";
				bool_planguage_is_defined = true;
				var php_variable_file_name_id = "fileNamePhpVariableInCopyrightsInfosArray"
				var php_variable_file_name = String(settings_obj[root_item + ".settings." + php_variable_file_name_id]).trim();
				if (php_variable_file_name.indexOf("static") == 0) {
					filename_basename_full = filename_basename;
				} else {
					if (php_variable_file_name.indexOf("dynamic") == -1) {
						filename_basename_full = php_variable_file_name;
					}
				}
				break;
			case "html":
			case "htm":
			case "js":
				operator_open = "var " + variable_name + "={";
				operator_close = "};";
				operator_assign = ":";
				bool_planguage_is_defined = true;
				break;
			default:
				// JSON STRING
				operator_open = operator_alt_quotes + "{";
				operator_close = "}" + operator_alt_quotes;
				operator_assign = ":";
				bool_planguage_is_defined = false;
				break;
		}

		var copyrights_infos_json_obj = {};
		copyrights_infos_json_str = "";
		var copyrights_infos_json_str_items = "";
		var copyrights_for_json_ra = [];
		var cj_id = "";
		var cj_label = "";
		var cj_license_id = 0;
		copyrights_for_json_ra = copyrights_tmp_ra;

		if (licenses_match_ra != null) {
			cj_id = "license";
			cj_label = String(licenses_match_ra[0]);
			copyrights_for_json_ra.push([camelToLabel(cj_id), cj_label, cj_id]);
			typeof (licenses_ra[cj_license_id]) == "undefined" ? cj_license_id = 0: vz;
			if (typeof (licenses_ra[cj_license_id][1]) != "undefined") {
				cj_id = "licenseUrl";
				//copyrights_for_json_ra.camelToLabel(push([cj_id), lic_url_begin + space_char + licenses_ra[cj_license_id][1] + space_char + lic_url_end, cj_id]);
			}

			if (typeof (licenses_ra[cj_license_id][2]) != "undefined") {
				cj_id = "licenseClarification";
				copyrights_for_json_ra.push([camelToLabel(cj_id), lic_clar_begin + space_char + licenses_ra[cj_license_id][2] + space_char + lic_clar_end, cj_id]);
			}
		}

		var copyrights_authorsNamesAndEmails_id = "authorsNamesAndEmails";
		var copyrights_authorsNamesAndEmails = String(settings_obj[root_item + ".copyrights." + copyrights_authorsNamesAndEmails_id]).trim();
		var author_name_and_email_ra = copyrights_authorsNamesAndEmails.split(",");
		var cpfj_i="", cpfj_v=null, cpfj_j=null, authors_names_and_emails_val_ra=[];
		for (i in copyrights_for_json_ra) {
			cpfj_i=String(copyrights_for_json_ra[i][2]).split(".").pop();
			copyrights_infos_json_obj[cpfj_i] = copyrights_for_json_ra[i][1];
			if(cpfj_i.indexOf("authorsNamesAndEmails")==-1){
				cpfj_v=operator_quotes + copyrights_for_json_ra[i][1] + operator_quotes;

			}else{
				for(var j in author_name_and_email_ra){
					cpfj_j=String(author_name_and_email_ra[j]).split(";");
					for(var x in cpfj_j){
						cpfj_j[x]=String(cpfj_j[x]).trim();
					}
					authors_names_and_emails_val_ra.push(cpfj_j);
				}
				cpfj_v=JSON.stringify(authors_names_and_emails_val_ra);
			}
			copyrights_infos_json_str_items += "\t" + operator_quotes + cpfj_i + operator_quotes + operator_assign + cpfj_v + "," + eol;
		}

		var file_version_value = first_ver_full;

		if (new_ver != "") {
			file_version_value = vboss_begin + space_char + new_ver + space_char + vboss_end;
		}

		if (bool_planguage_is_defined) {
			copyrights_infos_json_str += operator_open + eol;

			var appname_variable_name_id = "addAppNameVariableInCopyrightsInfosArray";
			var appname_variable_name = String(settings_obj[root_item + ".settings." + appname_variable_name_id]).trim();
			if (appname_variable_name != "") {
				copyrights_infos_json_str += "\t" + operator_quotes + "appName" + operator_quotes + operator_assign + operator_quotes + fn_begin + space_char + filename_basename + space_char + fn_end + operator_quotes + comma + eol;
			}
			var file_name_var_name_id = "addFileNameVariableInCopyrightsInfosArray";
			var file_name_var_name = String(settings_obj[root_item + ".settings." + file_name_var_name_id]).trim();
			if (file_name_var_name != "") {
				copyrights_infos_json_str += "\t" + operator_quotes + file_name_var_name + operator_quotes + operator_assign + filename_basename_full + comma + eol;
			}

			var file_version_var_name_id = "addFileVersionVariableInCopyrightsInfosArray";
			var file_version_var_name = String(settings_obj[root_item + ".settings." + file_version_var_name_id]).trim();
			if (file_version_var_name != "") {
				copyrights_infos_json_str += "\t" + operator_quotes + file_version_var_name + operator_quotes + operator_assign + operator_quotes + file_version_value + operator_quotes + comma + eol;
			}

			var first_author_name_variable_id = "authorNameVariableInCopyrightsInfosArray"
			var first_author_name_variable = String(settings_obj[root_item + ".settings." + first_author_name_variable_id]).trim();

			var first_author_email_variable_id = "authorEmailVariableInCopyrightsInfosArray"
			var first_author_email_variable = String(settings_obj[root_item + ".settings." + first_author_email_variable_id]).trim();

			var author_name_value =authors_names_and_emails_val_ra[0][0];
			var author_email_value = authors_names_and_emails_val_ra[0][1];
			if (first_author_name_variable != "") {
				copyrights_infos_json_str += "\t" + operator_quotes + first_author_name_variable + operator_quotes + operator_assign + operator_quotes + author_name_value + operator_quotes + comma + eol;
			}
			if (first_author_email_variable != "") {
				copyrights_infos_json_str += "\t" + operator_quotes + first_author_email_variable + operator_quotes + operator_assign + operator_quotes + author_email_value + operator_quotes + comma + eol;
			}

			copyrights_infos_json_str += copyrights_infos_json_str_items;
			copyrights_infos_json_str += operator_close + eol;
		} else {
			// in caso non sia definito il linguaggio di programmazione, l'array viene trasformato in stringa JSON
			copyrights_infos_json_obj[file_version_var_name] = file_version_value;
			copyrights_infos_json_str = JSON.stringify(JSON.stringify(copyrights_infos_json_obj));
		}

		//console.log(copyrights_infos_json_str);
		selection_replacement = copyrights_infos_json_str;
		var check_if_vnfc_exists = settings_obj[root_item + ".settings.checkIfVariableNameForCopyrightsInfosArrayExists"];
		var variable_name_regex_escaped = regexEscaped(variable_name);

		//console.log(variable_name_regex_escaped);
		if (editor_contents_str.match(new RegExp(variable_name_regex_escaped + "([\t ]*)\=", "gim")) == null || !check_if_vnfc_exists) {
			vboss_write_in_editor(editor, selection, selection_replacement, -1);
			done_msg_ra.push(["information", vboss_translate("copyrights_infos_array_done")]);
		} else {
			done_msg_ra.push(["warning", vboss_translate("copyrights_infos_array_already_entered", {
				"variable_name": variable_name,
				"app_name": app_name,
				"variable_name_id_label": camelToLabel(variable_name_id)
			})]);
		}
	}


	if (semver_boss_command == "copyrights") {
		var copyrights_max_label_len = 0;
		var copyrights_max_value_len = 0;
		var copyrights_str = "";
		var copyrights_item_value = "";
		var copyrights_item_value_j = "";
		var copyrights_item_label = "";
		var copyrights_item_label_len = 0;
		var copyrights_item_ra = [];
		var copyrights_row_max_len = settings_obj[root_item + ".settings." + semver_boss_command + ".rowMaxLength"];
		// se il linguaggio non supporta i commenti multiriga, devo anteporre il commento a riga sigola e quindi ridurre le dimensione copyrights_row_max_len affinchè il totale delle colonne non venga alterato
		if (comments_block_open == "") {
			copyrights_row_max_len -= comments_row_open.length + 2 * space_char.length + comments_row_close.length;
		}

		var copyrights_top_and_bottom_frame_char = settings_obj[root_item + ".settings." + semver_boss_command + ".topAndBottomFrameChars"];
		var copyrights_left_and_right_frame_char = settings_obj[root_item + ".settings." + semver_boss_command + ".leftAndRightFrameChars"];

		if (copyrights_top_and_bottom_frame_char == "") {
			copyrights_top_and_bottom_frame_char = space_char;
		}
		var copyrights_fill_chars = settings_obj[root_item + ".settings." + semver_boss_command + ".fillChars"];
		if (copyrights_fill_chars == "") {
			copyrights_fill_chars = space_char;
		}
		var copyrights_label_value_separator_char = settings_obj[root_item + ".settings." + semver_boss_command + ".labelAndValueSeparatorChars"];
		var copyrights_top_bottom_row = copyrights_top_and_bottom_frame_char + new Array(Math.round(copyrights_row_max_len / copyrights_top_and_bottom_frame_char.length)).join(copyrights_top_and_bottom_frame_char);
		// compenso i caratteri mancanti;
		if (copyrights_top_bottom_row.length < copyrights_row_max_len) {
			// di solito può differire di max 1 gruppo copyrights_top_and_bottom_frame_char
			copyrights_top_bottom_row += copyrights_top_and_bottom_frame_char;
		}
		var copyrights_top_bottom_row_delta_len = copyrights_top_bottom_row.length - copyrights_row_max_len;

		var copyrights_top_bottom_row_half = copyrights_top_bottom_row.substr(0, Math.ceil(copyrights_top_bottom_row.length / 2));
		copyrights_top_bottom_row = copyrights_top_bottom_row_half + flip(copyrights_top_bottom_row_half);
		// elimino 2 tronconi uguali a destra e sinistra (se dispari 1 a sx e 2 char a dx);
		copyrights_top_bottom_row = copyrights_top_bottom_row.substring(Math.floor(copyrights_top_bottom_row_delta_len / 2), copyrights_top_bottom_row.length - Math.ceil(copyrights_top_bottom_row_delta_len / 2));
		// tronco gli ulteriori caratteri extra copyrights_row_max_len
		copyrights_top_bottom_row = copyrights_top_bottom_row.substr(0, copyrights_row_max_len);

		var copyrights_fill_row = new Array(Math.round(copyrights_row_max_len / copyrights_fill_chars.length)).join(copyrights_fill_chars);
		copyrights_fill_row += copyrights_fill_row.substr(0, copyrights_row_max_len - copyrights_fill_row.length);
		copyrights_fill_row = copyrights_left_and_right_frame_char + copyrights_fill_row.substr(0, copyrights_fill_row.length - 2 * copyrights_left_and_right_frame_char.length) + flip(copyrights_left_and_right_frame_char);

		var copyrights_ra = [];

		var bool_insert_file_name = settings_obj[root_item + ".settings." + semver_boss_command + ".insertFileBasename"];
		var bool_insert_file_birth = settings_obj[root_item + ".settings." + semver_boss_command + ".insertFileBirthDateAndTime"];
		settings_obj.added_infos = {};

		if (bool_insert_file_name) {
			settings_obj.added_infos.fileName = fn_begin + space_char + filename_basename + space_char + fn_end;
		}

		var file_birth_time_ms = file_stats_obj.birthtimeMs;
		if (bool_insert_file_birth) {
			settings_obj.added_infos.fileBirth = fb_begin + space_char + get_date_from_timestamp(file_birth_time_ms, true, true) + space_char + fb_end;
			settings_obj.added_infos.fileMod = fmt_begin + space_char + get_date_from_timestamp(file_stats_obj.mtime, true, true) + space_char + fmt_end;
			//settings_obj.added_infos.fileUpdate = get_date_from_timestamp(new Date().getTime(), true, true);
		}

		// dall'aggiunta di settings_obj[root_item + "." + semver_boss_command + ".qualsiasiNomeVariabile"] con valore copyrights_separator_id, viene inserito un separatore di sezione

		var licenses_default_ra = licenses_ra[0];
		for (i in licenses_default_ra) {
			licenses_default_ra[i] = licenses_boundaries_ra[i][0] + space_char + licenses_default_ra[i] + space_char + licenses_boundaries_ra[i][1];
		}
		settings_obj.added_infos.license = licenses_default_ra;

		settings_obj.added_infos.fileVersion = new_ver_full;
		var added_infos_str = "",
			ai_value = [];

		copyrights_tmp_ra.unshift([copyrights_header.trim(), "@header", ""]);

		copyrights_tmp_ra.push(["", "@sep", ""]);
		copyrights_tmp_ra.push([file_and_licenses_infos_header.trim(), "@header", ""]);
		var j = "";
		for (i in settings_obj.added_infos) {
			ai_value = settings_obj.added_infos[i];
			if (typeof (ai_value) == "object") {
				for (j in ai_value) {
					if (ai_value[j] == "") {
						ai_value.splice(j, 1);
					}
				}
			}
			typeof (ai_value) == "object" ? ai_value = ai_value.join(comma): vz = 0;
			copyrights_tmp_ra.push([(camelToLabel(String(i))).trim(), ai_value, ""]);
		}
		// Gestisce tutte le voci COPYRIGTHS delle impostazioni
		for (i in copyrights_tmp_ra) {
			copyrights_item_label = copyrights_tmp_ra[i][0];
			copyrights_item_value = String(copyrights_tmp_ra[i][1]).trim();

			if (copyrights_item_value != "" && copyrights_item_value != null) {
				if (typeof (copyrights_item_value) != "object") {
					copyrights_item_ra = copyrights_item_value.split(comma);
				} else {
					copyrights_item_ra = copyrights_item_value;
				}
				j_count = 0;
				for (j in copyrights_item_ra) {
					copyrights_item_value_j = String(copyrights_item_ra[j]).trim();
					if (copyrights_item_value_j != null && copyrights_item_value_j != "") {
						copyrights_item_label_len = copyrights_item_label.length;
						// considero solo la lunghezza delle label il cui valore non è "@headers"
						if (copyrights_item_value.indexOf("@") != 0) {
							copyrights_max_label_len = Math.max(copyrights_max_label_len, copyrights_item_label_len);
						}
						copyrights_max_value_len = Math.max(copyrights_max_value_len, copyrights_item_value_j.length);
						if (j_count > 0) {
							copyrights_item_label = "";
						}
						copyrights_ra.push([copyrights_item_label.trim(), copyrights_item_value_j.trim(), i]);
						j_count++;
					}
				}
			}

		}

		var cols_count = "";

		// left_frame_first_char è usato per il foramto semplice dei copyrights
		var left_frame_first_char = copyrights_top_and_bottom_frame_char.charAt(0);
		if (copyrights_left_and_right_frame_char != "") {
			copyrights_str += copyrights_top_bottom_row + eol;
		}

		var bool_leave_open_row = false;
		for (i in copyrights_ra) {
			var boundary_match_ra = String(copyrights_ra[i].join(" ")).match(new RegExp("(" + vboss_begin + "|" + fn_begin + "|" + lic_begin + "|" + lic_url_begin + "|" + lic_clar_begin + "|" + vboss_end + "|" + fn_end + "|" + lic_end + "|" + lic_url_end + "|" + lic_clar_end + ")", "gim"));
			bool_leave_open_row = false;
			if (boundary_match_ra != null) {
				bool_leave_open_row = true;
			}
			copyrights_str += vboss_row_fill(copyrights_ra[i][0], copyrights_ra[i][1], copyrights_fill_row, copyrights_fill_chars, copyrights_label_value_separator_char, copyrights_max_label_len, copyrights_max_value_len, copyrights_top_and_bottom_frame_char, copyrights_left_and_right_frame_char, space_char, sections_header_separator_chars, bool_leave_open_row, eol);
		}

		if (added_infos_str != "") {
			copyrights_str += added_infos_str;
		}
		var copyrigths_extension_author_credits_str = "";
		if (settings_obj[root_item + ".settings." + semver_boss_command + ".insertExtensionAuthorCredits"]) {
			//console.log(defaults_obj);
			var versionboss_author_copyrights_label = space_char + "VSCode Extension: " + app_name + space_char;
			//versionboss_author_copyrights_label +=  + "by" + space_char + package_obj.author.name + space_char;
			var versionboss_author_copyrights_value = "";
			var copyrigths_extension_author_credits_non_empty_left_right_char = "-";
			var copyrigths_extension_author_credits_to_fill = copyrights_top_bottom_row;
			var add_left_frame_char = "";
			if (copyrights_left_and_right_frame_char == "") {
				add_left_frame_char = left_frame_first_char + space_char;
			}
			copyrigths_extension_author_credits_str = vboss_row_fill(versionboss_author_copyrights_label, versionboss_author_copyrights_value, copyrigths_extension_author_credits_to_fill, copyrights_fill_chars, copyrights_label_value_separator_char, versionboss_author_copyrights_label.length, versionboss_author_copyrights_value.length, copyrights_top_and_bottom_frame_char, copyrigths_extension_author_credits_non_empty_left_right_char, space_char, sections_header_separator_chars, false, eol);
			copyrigths_extension_author_credits_str = add_left_frame_char + copyrigths_extension_author_credits_str;
		}

		if (copyrights_left_and_right_frame_char != "") {
			copyrights_str += copyrights_fill_row + eol;
		} else {
			copyrights_str = left_frame_first_char + space_char + (copyrights_str.split(eol).slice(0, -1)).join(eol + left_frame_first_char + space_char) + eol;
		}
		copyrights_str += copyrigths_extension_author_credits_str;
		copyrights_str += cols_count;
		var copyrights_str_full = cr_begin + eol + copyrights_str + cr_end + eol;

		if (comments_block_open != "") {
			copyrights_str_full = comments_block_open + eol + copyrights_str_full + comments_block_close + eol;
		} else {
			var copyrights_str_ra = copyrights_str_full.split(eol);
			// rimuovo ultima riga vuota
			copyrights_str_ra.pop();
			copyrights_str_full = comments_row_open + space_char + copyrights_str_ra.join(eol + comments_row_open + space_char);
			if (comments_row_close != "") {
				copyrights_str_full += space_char + comments_row_close;
			}
		}
		//console.log(copyrights_str_full);
		var tag_init = "";
		var tag_end = "";
		if (copyrights_match_ra == null) {
			var lang_match_ra = [];

			switch (filename_ext) {
				case "asp":
				case "jsp":
				case "php":
				case "py":
					var re_tag = "\\\<(\\\?(php|\\\=|)|\\\%)";
					lang_match_ra = editor_contents_str.match(new RegExp(re_tag, "gi"));

					if (lang_match_ra != null) {
						tag_init = lang_match_ra[0];
						tag_end = tag_init.replace(new RegExp("[a-z\<\>]+", "gim"), "");
					} else {
						switch (filename_ext) {
							case "asp":
							case "jsp":
							case "py":
								tag_init = "<%";
								tag_end = "%>";
								break;
							case "php":
								tag_init = "<?php";
								tag_end = "?>";
								break;
						}
					}
					if (editor_contents_str.indexOf(tag_init) === 0) {
						editor_contents_str = editor_contents_str.replace(tag_init, tag_init + eol + eol + copyrights_str_full);
					} else {
						editor_contents_str = tag_init + eol + eol + copyrights_str_full + tag_end + editor_contents_str;
					}
					break;
				case "htm":
				case "html":
					// aggiungo i tag commento HTML e rimuovo il comment_block
					copyrights_str_full = cr_begin + eol + "<!--" + eol + copyrights_str + eol + "-->" + eol + cr_end + eol;
				default:
					editor_contents_str = copyrights_str_full + editor_contents_str;
					break;
			}
			done_msg_ra.push(["information", vboss_translate("copyrights_added")]);
		} else {
			done_msg_ra.push(["warning", vboss_translate("copyrights_already_entered")]);
		}
	}


	// aggiorna il File Modification Time (se il file non viene salvato il FMT rimane uguale!)
	var fmt_time = fmt_begin + space_char + get_date_from_timestamp(new Date().getTime(), true, true) + space_char + fmt_end;
	editor_contents_str = editor_contents_str.replace(new RegExp("(" + fmt_begin + ")([^" + fmt_end.charAt(0) + "]+)(" + fmt_end + ")", "gim"), fmt_time);
	// aggiorna il nome del file (utile se si copiano i copyrights da un file all'altro o se si rinomina il file stesso)
	var fn_name = fn_begin + space_char + filename_basename + space_char + fn_end;
	editor_contents_str = editor_contents_str.replace(new RegExp("(" + fn_begin + ")([^" + fn_end.charAt(0) + "]+)(" + fn_end + ")", "gim"), fn_name);
	// inserisce la data di creazione del file (il suo aggiornamento è utile nel caso i dati copyrights vengano copiati da un file all'altro o il file venga clonato)
	var file_birth = fb_begin + space_char + filename_basename + space_char + fn_end;
	editor_contents_str = editor_contents_str.replace(new RegExp("(" + fb_begin + ")([^" + fn_end.charAt(0) + "]+)(" + fb_begin + ")", "gim"), file_birth);

	if (semver_boss_command != "copyrights" && semver_boss_command != "licenses" && semver_boss_command != "getinfosarray" && semver_boss_command.indexOf("monsterdoc") == -1) {
		if (semver_match_ra != null) {
			editor_contents_str = editor_contents_str.replace(new RegExp(re_semver_full, "gim"), new_ver_full);
			done_msg_ra.push(["information", vboss_translate("file_version_set_to", {
				"new_ver": new_ver
			})]);
		}
		if (semver_extended_match_ra != null) {
			var regexp_mode = "gim";
			if (bool_semver_update_on_pattern_match_only_first) {
				regexp_mode = "i";
			}
			editor_contents_str = editor_contents_str.replace(new RegExp(re_semver_extended_full, regexp_mode), "$1$2" + new_ver + "$7");
			editor_contents_str = editor_contents_str.replace(new RegExp(re_datetime_full, "i"), new Date().toISOString());
			done_msg_ra.push(["information", vboss_translate("function_class_version_set_to", {
				"new_ver": new_ver
			})]);

		}
	}

	if (semver_boss_command == "licenses") {
		if (licenses_match_ra != null && new_license_str != "") {
			editor_contents_str = editor_contents_str.replace(new RegExp(re_licenses_full, "gim"), lic_begin + space_char + new_license_str + space_char + lic_end);
			editor_contents_str = editor_contents_str.replace(new RegExp(re_licenses_url_full, "gim"), lic_url_begin + space_char + licenses_ra[license_id][1] + space_char + lic_url_end);
			editor_contents_str = editor_contents_str.replace(new RegExp(re_licenses_clar_full, "gim"), lic_clar_begin + space_char + licenses_ra[license_id][2] + space_char + lic_clar_end);
			done_msg_ra.push(["information", vboss_translate("licenses_set_to", {
				"new_license_str": new_license_str
			})]);
		}
	}
	if (semver_boss_command.indexOf("monsterdoc") != -1) {

		var msg_ra = monsterdoc_maker(editor, selection, settings_obj, root_item, semver_boss_command, filename_ext, tabSize);
		done_msg_ra.push(msg_ra);
	}
	//console.log("COMMAND 5: " + semver_boss_command);
	vboss_notifications(done_msg_ra, app_name, show_warning_and_error_message, show_information_message);

	//console.log("COMMAND 6: " + semver_boss_command);
	if (semver_line_range == null) {
		var first_line = 0;
		var last_line = editor.document.lineCount - 1;
		var first_line_el = editor.document.lineAt(first_line);
		var last_line_el = editor.document.lineAt(last_line);
		var textRange = new vscode.Range(
			first_line,
			first_line_el.range.start.character,
			last_line,
			last_line_el.range.end.character);
		selection_to_replace = textRange;
	} else {
		selection_to_replace = semver_line_range;
	}
	if (semver_boss_command.indexOf("monsterdoc") == -1 && semver_boss_command != "getinfosarray") {
		selection_replacement = editor_contents_str;
		vboss_write_in_editor(editor, selection_to_replace, selection_replacement);
	}
	//console.log(semver_boss_command);
	if (bool_autosave) {
		editor.document.save();
	}
	glob_env["count"]++;
	//console.log( glob_env[ "count" ] );
	//vscode.window.showInformationMessage(editor_contents_str);
}

function vboss_notifications(done_msg_ra, app_name, show_warning_and_error_message, show_information_message) {
	if (done_msg_ra.length >= 1) {
		var done_msg_ra_str = "";
		var app_name_short = app_name.substring(0, app_name.indexOf("&"));
		for (var i in done_msg_ra) {
			done_msg_ra_str = app_name_short + " » " + done_msg_ra[i][1];
			if (done_msg_ra[i][0].indexOf("err") == 0) {
				if (show_warning_and_error_message) {
					vscode.window.showErrorMessage(done_msg_ra_str);
				}
			} else if (done_msg_ra[i][0].indexOf("warn") == 0) {
				if (show_warning_and_error_message) {
					vscode.window.showWarningMessage(done_msg_ra_str);
				}
			} else {
				if (show_information_message) {
					vscode.window.showInformationMessage(done_msg_ra_str);
				}
			}
		}
	}
}

function make_autors_names_and_emails(copyrights_autors_names_and_emails_ra) {
	var cne_ra = [];
	if (typeof (copyrights_autors_names_and_emails_ra) != "object") {
		cne_ra = copyrights_autors_names_and_emails_ra.split("|");
	} else {
		// trasforma l'objest in array
		cne_ra = Object.keys(copyrights_autors_names_and_emails_ra).map(function (key) {
			return copyrights_autors_names_and_emails_ra[key];
		});
	}

	var author_name = "";
	var author_emails = "";
	var item_ra = [];
	var item_ra_len = 0;
	var item = "";
	var full_item = "";
	var main_author = "";
	var count_i = 0;
	var count_j = 0;
	var copyrights_names_ra = [];
	for (var i in cne_ra) {
		cne_ra[i] = String(cne_ra[i]).split(",");
		author_name = cne_ra[i].shift();
		item_ra = cne_ra[i];
		item_ra_len = item_ra.length;
		author_emails = "";
		count_j = 0;
		if (count_i == 0) {
			main_author = author_name;
		}
		copyrights_names_ra.push(author_name);
		for (var j in item_ra) {
			item = String(item_ra[j]).trim()
			if (item.charAt(0) != "-") {
				full_item = "<" + item + ">"
				author_emails += full_item;
				if (count_i == 0 && count_j == 0) {
					main_author += " " + full_item;
				}
				if (parseInt(i) < item_ra_len) {
					author_emails += " ";
				}
			}
			count_j++;
		}
		if (String(author_emails.trim()) != "") {
			author_emails = " " + author_emails;
		}
		cne_ra[i] = author_name + author_emails;
		count_i++;
	}
	var obj = {
		"main_author": main_author,
		"copyrights_names": copyrights_names_ra,
		"authorsNamesAndEmails": cne_ra,
	}
	return obj;
}

function monsterdoc_get_param_type_by_suffix_or_prefix(param, pfx_and_sfx_obj, templates_obj) {
	param = param.trim();
	var param_type = "";
	var i_str = "";
	for (var i in pfx_and_sfx_obj) {
		param_type = "";
		i_str = String(i).trim();
		if (i_str.indexOf("_") == -1) {
			if (param.match(new RegExp("\\\_(" + i_str + "$)", "gim")) != null || param.match(new RegExp("(^([\\\$]*)" + i_str + "\\\_)", "gim")) != null || param.match(new RegExp("(\\\_" + i_str + "\\\_)", "gim")) != null) {
				param_type = pfx_and_sfx_obj[i];
				break;
			}
		} else {
			if (i_str.charAt(0) == "_" && i_str.charAt(i_str.length - 1) != "_") {
				// nome variabile che finisce con
				if (param.match(new RegExp("(" + i_str + "$)", "gim")) != null) {
					param_type = pfx_and_sfx_obj[i];
					break;
				}
			} else if (i_str.charAt(0) != "_" && i_str.charAt(i_str.length - 1) == "_") {
				// nome variabile che inizia con
				if (param.match(new RegExp("(^([\\\$]*)" + i_str + ")", "gim")) != null) {
					param_type = pfx_and_sfx_obj[i];
					break;
				}
			} else if (i_str.charAt(0) == "_" && i_str.charAt(i_str.length - 1) == "_") {
				// nome variabile che contiene
				if (param.match(new RegExp("(^([\\\$]*)([a-z]+)(" + i_str + ")([a-z]+)", "gim")) != null) {
					param_type = pfx_and_sfx_obj[i];
					break;
				}

			}
		}
	}
	return param_type;
}

function monsterdoc_make_pfx_and_sfx_obj(pfx_and_sfx_ra) {
	var pas_i = "";
	var pas_i_ra = [];
	var pas_i_j = "";
	var pas_i_j_ra = [];
	var obj = {};
	for (var i in pfx_and_sfx_ra) {
		pas_i = pfx_and_sfx_ra[i];
		pas_i_ra = pas_i.split("=");
		if (pas_i_ra.length > 1) {
			pas_i_j_ra = pas_i_ra[1].split(",");
			if (typeof (pas_i_j_ra) == "string") {
				pas_i_j_ra = [pas_i_j_ra];
			}
			for (var j in pas_i_j_ra) {
				// ad ogni substring assegno il tipo (invertendo di fatto quanto scritto nella configurazione)
				obj[pas_i_j_ra[j]] = pas_i_ra[0];
			}
		}
	}
	//console.log( obj );
	return obj;
}


function monsterdoc_fix_keywords_length(obj_id, monsterdocUseSmartTabbing, add_keywords_ra) {
	// serve a fare in modo che la lunghezza delle keyword venga uniformata aggiungendo spazi fino alla lunghezza massima per rendere più ordinata la scrittura della documentazione
	var obj = glob_env[obj_id];
	var new_glob_obj_id = obj_id + "_elab";
	var obj_new = {};
	var count = 0;
	var max_k_len = 0;
	var avg_len = 0;
	var avg_k_len_tot = 0;
	var str_len = 0;
	var obj_i_kw = null;
	var universal_max_len = 0;
	// console.log( add_keywords_ra )
	if (typeof (glob_env[new_glob_obj_id]) == "undefined") {
		for (var i in obj) {
			obj_i_kw = obj[i]["keywords"];
			obj_new = Object.assign({}, obj_new, obj_i_kw);
			for (var j in obj_i_kw) {
				if (obj_i_kw[j]["is_predefined_keyword"] == true) {
					obj_new[j] = true;
				}
			}
		}
		for (var i in add_keywords_ra) {
			obj_new[add_keywords_ra[i]] = true;
		}
		for (var i in obj_new) {
			str_len = String(i).length;
			if (!monsterdocUseSmartTabbing || (monsterdocUseSmartTabbing && obj_new[i] === true)) {
				max_k_len = Math.max(max_k_len, str_len);
				avg_k_len_tot += str_len;
			}
			universal_max_len = Math.max(universal_max_len, str_len);
		}
		// aggiungo uno spazio per distanziare dalla parola successiva
		max_k_len += 1;
		avg_len = Math.ceil(avg_k_len_tot / Number(Object.keys(obj_new).length)) + 1
		//console.log( max_k_len + "|" + avg_len );
		for (var i in obj_new) {
			obj_new[i] = String(i).padEnd(max_k_len);
		}
		glob_env[new_glob_obj_id] = obj_new;
		glob_env[new_glob_obj_id + "_keywords_max_lenght"] = max_k_len;
		glob_env[new_glob_obj_id + "_keywords_universal_max_lenght"] = universal_max_len;
	} else {
		obj_new = glob_env[new_glob_obj_id];
	}
	//console.log( obj_new )
	return obj_new;
}

function monsterdoc_make_templates_obj(templates_ra) {
	var obj = {};
	var t_i_ra = [];
	for (var i in templates_ra) {
		t_i_ra = String(templates_ra[i]).split("=");
		if (t_i_ra.length > 1) {
			obj[t_i_ra[0].trim()] = t_i_ra[1].trim();
		}
	}
	//console.log( templates_ra )
	//console.log( obj );
	return obj;
}

function monsterdoc_function_arguments_parser(monsterdoc_keywords_obj, monsterdoc_params_type_obj, monsterdoc_local_obj, function_arguments_orig, param_type_padding, variables_boundary_str, is_valid_function_or_class_selection, add_tab, pre_tabs, start_row, tabSize, eol) {
	var documentation_params_str = "";
	// prefissi e suffissi per il riconoscimento del tipo delle variabili senza assegnazione di type dal suffisso o prefisso del nome della variabile stessa
	var pfx_and_sfx_ra = monsterdoc_local_obj["setVariablesPrefixesAndSuffixes"];
	var templates_ra = monsterdoc_local_obj["setVariablesTypesMonsterdocTemplates"];

	var pfx_and_sfx_obj = monsterdoc_make_pfx_and_sfx_obj(pfx_and_sfx_ra);
	var templates_obj = monsterdoc_make_templates_obj(templates_ra);
	// in php elimino i valori di default che possono essere inseriti nelal dichairazioen della funzione
	function_arguments_orig = function_arguments_orig.trimEnd();


	//console.log( function_arguments_orig );
	if (variables_boundary_str.trim() != "" && function_arguments_orig.trim().indexOf(variables_boundary_str) == 0) {
		var args_tab_match = function_arguments_orig.match(new RegExp("^([\t ]*)", "i"));
		var args_tab = "";
		if (args_tab_match != null) {
			args_tab = args_tab_match[0];
		}
		function_arguments_orig = args_tab + function_arguments_orig.trimStart().substring(variables_boundary_str.length, function_arguments_orig.length);

	}
	//console.log( function_arguments_orig );
	var is_inline_multivariables = false;
	var clean_commons_re_ra = [
		["\"([^\"]*)\"", "\"\""],
		["\'([^\']*)\'", "\"\""],
		["\\\=([\t ]*)(\\bnew\\b)([\t ]*)", "="],
	];
	var clean_values_fallback_re_ra = [

		["\\\{([^\\\{\\\}]*)\\\}", "{}"],
		["\\\[([^\\\[\\\]]*)\\\]", "[]"],
		["([\t ]*)\\\(([^\\\\(\\\)]*)\\\)([\t ]*)", "()"],
		["\\\=([\t ]*)(\\array\\b)\\\(([^\\\(\\\)]*)", "=[]"],
		["\\\=([\t ]*)(\\object\\b)\\\(([^\\\(\\\)]*)", "={}"],
		["[\t ]+", " "],
		["([\\\;]+)$", ""],
	]

	var clean_values_re_ra = [

		["[\\\{]+", "{"],
		["[\\\[]+", "["],
		["[\\\(]+", "("],
		["[\\\}]+", "}"],
		["[\\\]]+", "]"],
		["[\\\)]+", ")"],
		["\\\=([\t ]*)(\\array\\b)\\\(([^\\\(\\\)]*)", "=[]"],
		["\\\=([\t ]*)(\\object\\b)\\\(([^\\\(\\\)]*)", "={}"],

		["[\t ]+", " "],

		["([\\\;]+)$", ""],
	]

	var function_arguments = function_arguments_orig + "\n";

	// var bool_xregex_is_complete = true;
	// for ( var i in clean_brackets_re_ra ) {
	// 	try {
	// 		var rec_match = XRegExp.matchRecursive( function_arguments, clean_brackets_re_ra[ i ][ 0 ], clean_brackets_re_ra[ i ][ 1 ], 'g' );
	// 		if ( rec_match != null ) {
	// 			for ( var j in rec_match ) {
	// 				function_arguments = function_arguments.replace( rec_match[ j ], clean_brackets_re_ra[ i ][ 2 ] );
	// 			}
	// 		}
	// 	} catch ( e ) {
	// 		console.log( e.message )
	// 		bool_xregex_is_complete = false;
	// 	}
	// }
	// if ( !bool_xregex_is_complete ) {
	var clean_values_fallback_full_re_ra = [];
	clean_values_fallback_full_re_ra = clean_values_fallback_full_re_ra.concat(clean_commons_re_ra, clean_values_fallback_re_ra)
	for (var i in clean_values_fallback_full_re_ra) {
		function_arguments = function_arguments.replace(new RegExp(clean_values_fallback_full_re_ra[i][0], "gim"), clean_values_fallback_full_re_ra[i][1]);
	}
	// }
	// console.log( function_arguments )
	// var clean_values_full_re_ra = [];
	// clean_values_full_re_ra = clean_values_full_re_ra.concat( clean_commons_re_ra, clean_values_re_ra )
	// for ( var i in clean_values_full_re_ra ) {
	// 	function_arguments = function_arguments.replace( new RegExp( clean_values_full_re_ra[ i ][ 0 ], "gim" ), clean_values_full_re_ra[ i ][ 1 ] );
	// }
	function_arguments_orig = function_arguments;
	// console.log( function_arguments )
	// function_arguments = function_arguments.replace( new RegExp( "([\t ]*)([\\\,]+)([\t ]*)", "gim" ), "," );
	// function_arguments = function_arguments.replace( new RegExp( "([\t ]*)([\\\;]+)([\t ]*)", "gim" ), ";" );
	// function_arguments = function_arguments.replace( new RegExp( "([\t ]*)([\\\:]+)([\t ]*)", "gim" ), ":" );
	// function_arguments = function_arguments.replace( new RegExp( "([\\\;]+)$", "gim" ), "" );

	var function_arguments_dirty = function_arguments;

	var default_param_type = "mixed";
	var re_std = "([\t ]*)(\\\=)([\t ]*)";
	var re_eq_std = "([\t ]*)(\\\=)([\t ]*)";
	var re_dp_std = "([\t ]*)(\:)([\t ]*)";
	var re_simple_string = "([a-z]+)";
	var re_simple_number = "([0-9\.\-]+)";
	var re_semicolon = "([\\\;]+)$";
	var comma = ",";
	var re_comma = "([\\\,]+)";

	var re_complex = "";

	re_complex = "([\t ]*)(\\barray\\b|\\bobject\\b|\\b([a-z0-9\\\_\\\.]+))([\t ]*)\\\(([^\r\n]*)\\\)";
	if (is_valid_function_or_class_selection) {
		re_complex = "([\t ]*)(\\barray\\b|\\bobject\\b|[a-z0-9\\\_\\\.]+)([\t ]*)\\\(([^\\\)\r\n]*)\\\)";
	}
	var re_clean_i = "";
	var re_clean_ra = [
		re_complex,
		"(\"|\')([^\"\']*)(\"|\')",
		"\\\(([^\\\)]*)(([\r\n]*)\\\)|([\r\n]+)|$)",
		"\\\[([^\\\]]*)(([\r\n]*)\\\]|([\r\n]+)|$)",
		"\\\{([^\\\}]*)(([\r\n]*)\\\}|([\r\n]+)|$)",
		re_simple_string,
		re_simple_number,
	]

	var function_arguments_ra = [];
	var param_keyword = "";
	var param_keyword_id = "";

	if (variables_boundary_str != "" && function_arguments.indexOf(variables_boundary_str) > -1) {
		//console.log( "V-0" );
		function_arguments_ra = function_arguments.split(variables_boundary_str);
		function_arguments_ra = function_arguments_ra.filter(function (value, index, arr) {
			return value.trim() != "" && value != null;
		})
		//console.log( function_arguments_ra )
		for (var i in re_clean_ra) {
			re_clean_i = re_clean_ra[i];
			for (var j in function_arguments_ra) {
				if (re_clean_i != "undefined") {
					function_arguments_ra[j] = function_arguments_ra[j].replace(new RegExp(re_std + re_clean_i, "gim"), "");

				}
			}
		};
	} else {
		//console.log( "V-1" );

		for (var i in re_clean_ra) {
			re_clean_i = re_clean_ra[i];
			if (re_clean_i != "undefined") {
				function_arguments = function_arguments.replace(new RegExp(re_std + re_clean_i, "gim"), "=");
				//console.log( i + " » " + function_arguments )
			}
		};
		function_arguments = function_arguments.trimEnd();
		if (is_valid_function_or_class_selection) {
			function_arguments = function_arguments.replace(new RegExp(re_std, "gim"), "");
		}
		function_arguments = function_arguments.replace(new RegExp(re_semicolon, "gim"), "");
		var fa_ra_i = "";
		if (function_arguments.indexOf(comma) > -1) {
			function_arguments_ra = function_arguments.split(comma);
			if (!is_valid_function_or_class_selection) {
				is_inline_multivariables = true;
				// nel caso fosse una sequenza di variabili (non argomenti di funzione) scritte su una sola riga, assumerò il tab riga come tab per tutte le altre var
				var match_tab = function_arguments.match(new RegExp("^([\t ]+)", "i"));
				var match_tab_str = "";
				if (match_tab != null) {
					match_tab_str = match_tab[0];
				}
				for (var i in function_arguments_ra) {
					fa_ra_i = function_arguments_ra[i].trim();
					if (fa_ra_i.indexOf("=") != -1) {
						fa_ra_i = fa_ra_i.substring(0, fa_ra_i.indexOf("=") + 1);
					}
					function_arguments_ra[i] = match_tab_str + fa_ra_i;
				}

			}
		} else {
			function_arguments_ra.push(function_arguments);
		}

		//console.log( function_arguments_ra );
	}
	// console.log( function_arguments_ra );

	var function_arguments_and_types_ra = [];
	var param = "";
	var param_re = "";
	var param_type = "";
	var re_obj = {};
	var re_obj_common = {
		"object": "(\\\{|(\\bnew\\b)([\t ]*)(object)	([\\t ]*)\\\()([^\\\=\\\,]+)",
		"array": "(\\\[|(\\bnew\\b)([\t ]*)(array)	([\\t ]*)\\\()([^\\\=\\\,]+)",

		"null": "(null)",
		"boolean": "(true|false)",
		"string": "(\\\"([\t ]*)(([^\\\{]*)))",
	}
	//console.log( function_arguments_orig );
	var re_obj_PHP = {
		"float": "([0-9]+)\\\.([0-9]+)",
		"integer": "([0-9]+)([^\\\.]+)",
		"string|JSON": "\\\"([\t ]*)\\\{",
	};
	var re_obj_TS = {
		"regexp": "(\\\[|(\\bnew\\b)([\t ]*)(regexp)	([\\t ]*)\\\()([^\\\=\\\,]+)",
		"undefined": "(undefined)",
		"number": "([0-9\\\.]+)",
		"string|JSON": "\\\"([\t ]*)\\\{",
	}

	var curr_re = "";
	var curr_re_eq_begin = "";
	var curr_re_dp_begin = "";
	var match_ra = null;
	var m_0 = "";
	var is_PHP = false;
	var is_PHP7 = false;
	var is_JS = false;
	var is_TS = false;
	var split_char = "";
	var param_ra = [];
	var param_ra_tmp = [];
	var param_padding = 0;
	var param_dirty = "";
	for (var i in function_arguments_ra) {
		split_char = ""
		param_type = "";
		param = String(function_arguments_ra[i]).trim();

		// determino il param_type in base alal struttura semplice function nome_function(float $variable_1, int $variable_2):float{} per PHP7 o nome_function(variable_1:float , variable_2:number ):number{} per TypeScript
		if (param.indexOf(":") > 0) {
			// TypeScript: questo sistema permette il riconoscimento del param_type in TypeScript
			is_TS = true;
			split_char = ":";
			param = param.replace(new RegExp("([\t ]*)([\\\:]+)([\t ]*)", "gim"), "$2");

		} else if (param.indexOf(" ") > 0 || param.indexOf("\t") > 0) {
			// PHP 7.x: questo sistema permette il riconoscimento del param_type nella nuova notazione PHP 7
			is_PHP = true;
			is_PHP7 = true;
			param = param.replace(new RegExp("([\t ]+)", "gim"), " ");
			split_char = " ";
		}
		param = param.trim();
		param = param.replace(new RegExp("([^a-z0-9\\\_\\\,\\\$\\\: ]+)", "gim"), "");

		if (split_char != "") {

			param_ra_tmp = param.split(split_char);
			for (var j in param_ra_tmp) {
				if (param_ra_tmp[j].trim() != "") {
					param_ra.push(param_ra_tmp[j]);
				}
			}
			//console.log( param_ra )
			if (param_ra.length > 1) {
				if (split_char == ":") {
					param = param_ra.shift();
					param_type = param_ra.pop();
				} else {
					param = param_ra.pop();
					param_type = param_ra.shift();
				}
			} else {
				param_type = "";
			}
			param = param.trim();
			param_type = param_type.trim();
		} else {
			var function_arguments_dirty_reduct = function_arguments_dirty;

			for (var j in clean_values_re_ra) {
				function_arguments_dirty_reduct = function_arguments_dirty_reduct.replace(new RegExp(clean_values_re_ra[j][0], "gim"), clean_values_re_ra[j][1]);
			}
			//console.log( "Y-1 " + " | " + function_arguments_dirty_reduct.trim() + " | " + param );
			function_arguments_dirty_reduct = "," + function_arguments_dirty_reduct;
			// ultima speranza di individuare il param_type dall'analsi del testo
			var param_dirty_ra = function_arguments_dirty_reduct.split("," + param + "=");
			if (param_dirty_ra.length > 1) {
				param_dirty = param_dirty_ra[1].trim();
				if (param_dirty == "" || param_dirty.indexOf(",") == 0) {
					param_type = "";
					// console.log( "Y-2 " + param_dirty );
				} else {
					//console.log( "Y-2 " + param_dirty );
					param_dirty_ra = param_dirty.split(",");
					param_dirty = param_dirty_ra[0];
					var match_type = param_dirty.match(new RegExp("([\\\=]+)([\t ]*)(([\\\{\\\[\\\"\\\']+)|(array|object)([\t ]*)\\\()", "i"));
					// console.log( "Y-3 " + param_dirty );
					var match_type_0 = "";
					if (match_type != null) {
						match_type_0 = match_type[0].trim().replace(new RegExp("[\t ]+", "gim"), "").toLowerCase();

						switch (match_type_0) {
							case "={":
							case "=object(":
								param_type = "object";
								break;
							case "=[":
							case "=array(":
								param_type = "array";
								break;
							case "=\"":
							case "='":
								param_type = "string";
								break;
						}
					}
				}
			} else {
				param_type = "";
			}
		}



		if (param.charAt(0) == "$") {
			// poichè il type number in php puo' essere float o integer mentre in TS/JS è solo number, fondo due object diversi con le definizioni corrette
			is_PHP = true;
			param_re = "\\" + param;
		} else {
			param_re = param
		}
		if (is_PHP) {
			re_obj = Object.assign({},
				re_obj_common,
				re_obj_PHP
			);
		} else {
			re_obj = Object.assign({},
				re_obj_common,
				re_obj_TS
			);
		}
		if (is_valid_function_or_class_selection) {
			param_keyword_id = "@param"
		} else {
			param_keyword_id = "@var";
		}
		param_keyword = monsterdoc_keywords_obj[param_keyword_id];
		if (!is_valid_function_or_class_selection) {
			// console.log( tabSize );
			param_keyword = param_keyword.trim() + " ";
			// console.log( "#" + param_keyword + "#" );
		}
		curr_re_eq_begin = "(" + param_re + ")" + re_eq_std;
		curr_re_dp_begin = "(" + param_re + ")" + re_dp_std;
		match_ra = null;
		if (param_type == "" && function_arguments_orig.match(new RegExp(curr_re_eq_begin, "gim")) != null) {
			for (var j in re_obj) {
				curr_re = curr_re_eq_begin + re_obj[j];
				//console.log( curr_re );
				match_ra = function_arguments_orig.match(new RegExp(curr_re, "gim"));
				//console.log( match_ra );
				if (match_ra != null) {
					param_type = j;
					break;
				} else {
					param_type = default_param_type;
				}
			}
		}


		if (param_type == "") {
			// poichè Javascript non permette le dichiarazioni di tipo,
			// per semplificare la scrittura della documentazione, udilizzo il riconoscimento dei prefissi e dei suffissi del nome variabile
			param_type = monsterdoc_get_param_type_by_suffix_or_prefix(param, pfx_and_sfx_obj);
		}
		if (param_type == "") {
			param_type = default_param_type;
		}
		function_arguments_ra[i] = param;
		function_arguments_and_types_ra[i] = [param.trim(), param_type.trim().toLowerCase()];

		param_padding = Math.max(param.length, param_padding);
	}
	//console.log( function_arguments_and_types_ra );
	// aggiungo uno spazio al padding;
	param_padding += 1;
	var param_type_elab = "";
	var params_row = "";
	var documentation_params_ra = [];
	for (var i in function_arguments_and_types_ra) {
		params_row = "";
		param = function_arguments_and_types_ra[i][0];
		param_type = function_arguments_and_types_ra[i][1];
		if (typeof (monsterdoc_params_type_obj[param_type]) !== "undefined") {
			param_type_elab = monsterdoc_params_type_obj[param_type];
		} else {
			if (param_type.length < param_type_padding) {
				param_type_elab = param_type.padEnd(param_type_padding);
			}
		}
		var description_template_str = "[description]";
		if (param !== "") {
			if (typeof (templates_obj[param_type]) != "undefined") {
				description_template_str = templates_obj[param_type];
			}
			params_row = start_row + param_keyword + param_type_elab + param.padEnd(param_padding) + ": " + description_template_str + eol;
			documentation_params_ra.push(params_row)
			documentation_params_str += add_tab + pre_tabs + params_row;
		}
	}
	// console.log( documentation_params_ra );
	// console.log( documentation_params_str );
	var obj = {
		"documentation_params": documentation_params_str,
		"documentation_params_ra": documentation_params_ra,
		"function_arguments_and_types": function_arguments_and_types_ra,
		"function_arguments": function_arguments_ra,
		"is_inline_multivariables": is_inline_multivariables,
		"param_padding": param_padding,
		"is_PHP": is_PHP,
		"is_PHP7": is_PHP7,
		"is_JS": is_JS,
		"is_TS": is_TS,
	}
	return obj;
}


function monsterdoc_maker(editor, selection, settings_obj, root_item, semver_boss_command, filename_ext, tabSize) {
	var eol = "\r\n";
	var docbkock_start = "/**";
	var docbkock_end = " */";
	var settings_local_obj = vboss_settings_obj_to_local_obj(settings_obj, root_item, "settings");
	var copyrights_local_obj = vboss_settings_obj_to_local_obj(settings_obj, root_item, "copyrights");
	var semver_boss_local_command = "monsterdoc";
	if (semver_boss_local_command.indexOf("monsterdoc-") != -1) {
		semver_boss_local_command = "monsterdoc";
	}
	var description_ph = "_description_";
	// non conviene centralizzare altrimenti bisogna ricaricare VSCODE affinchè le opzioni vengano aggiornate
	var monsterdoc_local_obj = vboss_settings_obj_to_local_obj(settings_obj, root_item, semver_boss_local_command);

	var properties_keywords_for_classes_and_variables_re = glob_env["properties_keywords_for_classes_and_variables_re"];
	var msg_ra = [];
	var msg_loc = "";
	var msg_loc_type = "";
	var line_range = new vscode.Range(selection.start.line, 0, selection.start.line, editor.document.lineAt(selection.start.line).range.end.character);
	var line_text = editor.document.getText(line_range);
	var msg_already_in_a_dockblock = "You are already in a DockBlock comment!";
	var monsterdoc_str = "";


	var docblockInsideFunctionsAsDefault = monsterdoc_local_obj["docblockInsideFunctionsAsDefault"];
	var monsterdockeywordsSuggestionsForTodoPlus_ra = [];
	if (monsterdoc_local_obj["keywordsSuggestionsForTodoPlus"].length > 0) {
		monsterdockeywordsSuggestionsForTodoPlus_ra = monsterdoc_local_obj["keywordsSuggestionsForTodoPlus"];
	}
	if (semver_boss_command == "monsterdoc-alternative") {
		// inverte i comandi
		if (docblockInsideFunctionsAsDefault) {
			docblockInsideFunctionsAsDefault = false;
		} else {
			docblockInsideFunctionsAsDefault = true;
		}
	}
	var line_text_trimmed = line_text.trim();
	var bool_is_already_a_dockblock = false;

	if (line_text_trimmed.indexOf("/*") != 0 && line_text_trimmed.indexOf("//") != 0 && line_text_trimmed.indexOf("*") != 0) {
		bool_is_already_a_dockblock = false;
		//console.log( "b-1" );
	} else {
		bool_is_already_a_dockblock = true;
		var re_no_word = "^([^a-z0-9]+)";
		var preset_keyword_a = glob_env["monsterdoc_keywords_todoplus_default_array"][0];
		var preset_keyword_b = glob_env["monsterdoc_keywords_todoplus_default_array"][1];
		var trigger_char = "@";
		if (monsterdockeywordsSuggestionsForTodoPlus_ra.length > 0) {
			preset_keyword_a = trigger_char + monsterdockeywordsSuggestionsForTodoPlus_ra[0].replace(new RegExp(re_no_word, "gim"), "");
			if (typeof (monsterdockeywordsSuggestionsForTodoPlus_ra[1]) != "undefined") {
				preset_keyword_b = trigger_char + monsterdockeywordsSuggestionsForTodoPlus_ra[1].replace(new RegExp(re_no_word, "gim"), "");
			}
		}
		//
		var preset_keyword = preset_keyword_a;
		var preset_keyword_to_remove = preset_keyword_b;
		if (docblockInsideFunctionsAsDefault) {
			preset_keyword = preset_keyword_b;
		}
		selection_to_replace = line_range;
		var find_init_spaces_re = "^([\t ]*)";
		var init_spaces_match = line_text.match(new RegExp(find_init_spaces_re, "gim"));
		var find_comment_re = "(([\\\/]*)\\\*|(\\\/\\\/))([\t ]*)";
		var find_keywords_re = "(\\\@|\\\#)([a-z]+)([\t ]*)";
		var comment_and_keyword_match = line_text_trimmed.match(new RegExp(find_comment_re + find_keywords_re, "gim"));
		var comment_match = null;
		monsterdoc_str = "";
		if (comment_and_keyword_match != null && line_text_trimmed.indexOf(comment_and_keyword_match[0]) == 0) {
			if ((comment_and_keyword_match[0].indexOf(preset_keyword_a) != -1 || comment_and_keyword_match[0].indexOf(preset_keyword_b) != -1) && comment_and_keyword_match[0].trim().indexOf("/*") == -1 && line_text_trimmed.indexOf("*/") == -1) {
				comment_match = line_text_trimmed.match(new RegExp(find_comment_re, "gim"));
				if (comment_and_keyword_match[0].indexOf(preset_keyword_a) != -1) {
					preset_keyword = preset_keyword_b;
					preset_keyword_to_remove = preset_keyword_a;
				} else {
					preset_keyword = preset_keyword_a;
					preset_keyword_to_remove = preset_keyword_b;
				}
				//monsterdoc_str += comment_match[ 0 ].trimEnd() + " " + preset_keyword + "\t" + line_text_trimmed.substr( line_text_trimmed.indexOf( preset_keyword_to_remove ) + preset_keyword_to_remove.length, );
				monsterdoc_str += line_text.replace(new RegExp(find_comment_re + find_keywords_re, "i"), comment_match[0].trimEnd() + " " + preset_keyword + "$7");

				//console.log( preset_keyword );
			}

		} else {
			// console.log( "A-1" );

			comment_match = line_text_trimmed.match(new RegExp(find_comment_re, "gim"));

			if (comment_match != null && comment_match[0].trim().indexOf("/*") == -1 && line_text_trimmed.indexOf("*/") == -1) {
				if (comment_match != null) {
					if (init_spaces_match != null) {
						monsterdoc_str += init_spaces_match[0];
					}

					// console.log( "A-2" );
					monsterdoc_str += comment_match[0].trimEnd() + " " + preset_keyword + "\t" + line_text_trimmed.substr(line_text_trimmed.indexOf(comment_match[0]) + comment_match[0].length, line_text_trimmed.length);
					// console.log(   );
				}
			}
			//console.log( "A-3" );
		}
		if (monsterdoc_str == "") {
			msg_loc_type = "warning";
			msg_loc = vboss_translate("not_suitable_row");

		}
	}

	var keywords_obj_id = "monsterdoc_keywords_main_obj";
	var monsterdocUseSmartTabbing = monsterdoc_local_obj["monsterdocUseSmartTabbing"];
	var monsterdocKeywordsToAddForClasses = monsterdoc_local_obj["monsterdocKeywordsToAddForClasses"];
	var monsterdocKeywordsToAddForFunctions = monsterdoc_local_obj["monsterdocKeywordsToAddForFunctions"];
	if (monsterdocKeywordsToAddForClasses != null && monsterdocKeywordsToAddForClasses.length > 0) {
		for (var i in monsterdocKeywordsToAddForClasses) {
			monsterdocKeywordsToAddForClasses[i] = monsterdocKeywordsToAddForClasses[i].trim();
			if (monsterdocKeywordsToAddForClasses[i].charAt(0) != "@") {
				monsterdocKeywordsToAddForClasses[i] = "@" + monsterdocKeywordsToAddForClasses[i];
			}
		}
	}
	if (monsterdocKeywordsToAddForFunctions != null && monsterdocKeywordsToAddForFunctions.length > 0) {
		for (var i in monsterdocKeywordsToAddForFunctions) {
			monsterdocKeywordsToAddForFunctions[i] = monsterdocKeywordsToAddForFunctions[i].trim();
			if (monsterdocKeywordsToAddForFunctions[i].charAt(0) != "@") {
				monsterdocKeywordsToAddForFunctions[i] = "@" + monsterdocKeywordsToAddForFunctions[i];
			}
		}
	}

	var add_keywords_ra = [].concat(monsterdocKeywordsToAddForClasses, monsterdocKeywordsToAddForFunctions);
	var monsterdoc_keywords_obj = monsterdoc_fix_keywords_length(keywords_obj_id, monsterdocUseSmartTabbing, add_keywords_ra);
	var keywords_padding = glob_env[keywords_obj_id + "_elab_keywords_max_lenght"];
	var params_type_obj_id = "monsterdoc_params_type_main_obj";
	monsterdocUseSmartTabbing = false;
	var monsterdoc_params_type_obj = monsterdoc_fix_keywords_length(params_type_obj_id, monsterdocUseSmartTabbing, []);
	var param_type_padding = glob_env[params_type_obj_id + "_elab_keywords_max_lenght"];
	var pre_tabs_re = "^([\t ]+)";
	var pre_tabs_ra = null;
	var pre_tabs = "";
	pre_tabs_ra = line_text.match(new RegExp(pre_tabs_re));
	if (pre_tabs_ra != null) {
		pre_tabs = pre_tabs_ra[0];
	}
	if (!bool_is_already_a_dockblock) {
		try {
			//console.log( copyrights_local_obj );
			//var copyrigths_authors_info = copyrights_authorsNamesAndEmails + " <" + copyrights_authorsEmail + ">";
			var copyrights_authorsNamesAndEmails_tmp = copyrights_local_obj["authorsNamesAndEmails"];
			var copyrights_authorsNamesAndEmails_obj = make_autors_names_and_emails(copyrights_authorsNamesAndEmails_tmp);
			var copyrigths_authors_info = [];
			if (monsterdoc_local_obj["insertAllAuthorsInDocumentation"]) {
				copyrigths_authors_info = copyrights_authorsNamesAndEmails_obj["authorsNamesAndEmails"];
			} else {
				copyrigths_authors_info = [copyrights_authorsNamesAndEmails_obj["main_author"]];
			}
			// var copyrights_names = copyrights_authorsNamesAndEmails_obj[ "copyrights_names" ].join( ", " );

			var copyrights_owner = settings_obj[root_item + ".copyrights.copyright"];
			//console.log( copyrights_owner );



			var selection_to_replace = null;
			//var selection_to_replace = new vscode.Range( selection.start.line, 0, editor.document.lineAt( selection.start.line + selectedText_ra_len ).range.end.line, Math.max( editor.document.lineAt( editor.document.lineCount - 1 ).range.end.character - 1, 0 ) );

			var is_valid_function_or_class_selection = false;
			var selectedText_ra = [];
			var selectedText_ra_len = 0;
			var selectedText = "";
			var function_recognition_str = "function";
			var class_recognition_str = "class";
			var interface_recognition_str = "interface";
			var function_recognition_short_re = "\\b" + function_recognition_str + "\\b(([\\t ]+)([a-z0-9_\\.]+)|)";
			var class_recognition_short_re = "\\b(" + class_recognition_str + ")\\b([\\t ]+)([a-z0-9_\\. ]+)";
			var interface_recognition_short_re = "\\b(" + interface_recognition_str + ")\\b([\\t ]+)([a-z0-9_\\. ]+)";
			var function_recognition_re = "(" + function_recognition_short_re + "([\\t ]*)([\r\n]*)([\\t ]*)([\(]+))";
			var class_recognition_re = "(" + class_recognition_short_re + "([\\t ]*)([\r\n]*)([\\t ]*)([\{]+))";
			var interface_recognition_re = "(" + interface_recognition_short_re + "([\\t ]*)([\r\n]*)([\\t ]*)([\\\{]+))";
			var last_line = editor.document.lineCount - 1;
			//var selection_new = new vscode.Range( selection.start.line, 0, editor.document.lineAt( editor.document.lineCount - 1 ).range.end.line, editor.document.lineAt( editor.document.lineCount - 1 ).range.end.character );
			var selection_new = new vscode.Range(selection.start.line, 0, last_line, editor.document.lineAt(last_line).range.end.character);

			// var line_range = new vscode.Range( selection.start.line, 0, selection.start.line, editor.document.lineAt( selection.start.line ).range.end.character );
			// var line_text = editor.document.getText( line_range );
			var variables_boundary_str = "";
			var bool_is_already_a_dockblock = false;
			if (line_text.match(new RegExp(function_recognition_short_re, "gim")) != null ||
				line_text.match(new RegExp(class_recognition_short_re, "gim")) != null ||
				line_text.match(new RegExp(interface_recognition_short_re, "gim")) != null

			) {

				// ATTENZIONE - NON ESEGUIRE IL TRIM O, in fase di sostituzione testo VERRANNO AGGIUNTE porzioni della stringa a completare gli spazi vuoti tranciati!!!

				//console.log( line_text );
				// ATTENZIONE - NON ESEGUIRE IL TRIM O, in fase di sostituzione testo VERRANNO AGGIUNTE porzioni della stringa a completare gli spazi vuoti tranciati!!!
				selectedText = String(editor.document.getText(selection_new));

				//selectedText = selectedText.replace( new RegExp( "([\)]{1})([\r\n\t ]*)([\{}]{1})", "gim" ), function_end_declaration );
				// msg_ra = [ "information", "Doc for Function: " + selectedText ];
				// aggiungo + 1 in modo che venga inclusa anche la parentesi tonda per determinare il gruppo degli arguments
				var class_end_declaration_re = "(([\t ]*)([\r\n]*)([\t ]*)((\:([\t ]*)([a-z]+))|)([\t ]*)([\r\n]*)([\t ]*)(([\{]{1})|([\\\;]+)))"
				var function_end_declaration_re = "([\)]{1})" + class_end_declaration_re;
				var function_end_declaration_match = selectedText.match(new RegExp(function_end_declaration_re, "gim"));
				var class_end_declaration_match = selectedText.match(new RegExp(class_end_declaration_re, "gim"));
				var firstIndex = null;
				var end_declaration_match_0 = null;
				if (function_end_declaration_match != null) {
					end_declaration_match_0 = function_end_declaration_match[0];
				} else if (class_end_declaration_match != null) {
					end_declaration_match_0 = class_end_declaration_match[0];
				}
				if (end_declaration_match_0 != null) {
					firstIndex = selectedText.indexOf(end_declaration_match_0);
					selectedText = selectedText.substring(0, firstIndex + end_declaration_match_0.length);
					//console.log( selectedText );
					selectedText_ra = selectedText.split("\n");
					selectedText_ra_len = selectedText_ra.length;
					selection_to_replace = new vscode.Range(selection.start.line, 0, editor.document.lineAt(selection.start.line + selectedText_ra_len - 1).range.end.line, selectedText_ra[selectedText_ra_len - 1].lastIndexOf(end_declaration_match_0) + end_declaration_match_0.length);
					is_valid_function_or_class_selection = true;
					// console.log( "*** E' UNA CLASSE, UN'INTERFACCIA O UNA FUNZIONE ***" )
					//console.log( "ZZ-0 " + selectedText );
				}
			} else {
				selection_to_replace = new vscode.Range(selection.start.line, 0, selection.end.line, editor.document.lineAt(selection.end.line).range.end.character);
				is_valid_function_or_class_selection = false;
			}
			var selectedText = String(editor.document.getText(selection_to_replace));

			selectedText_ra = selectedText.split("\n");
			selectedText_ra_len = selectedText_ra.length;
			//console.log( editor.document.getText( selection_to_replace ) )
			//console.log( function_recognition_re );
			function_recognition_str += " ";
			class_recognition_str += " ";
			interface_recognition_str += " ";
			var tab = "";
			tab = tab.padEnd(tabSize, " ");

			// devo lasciare uno spazio prima e uno dopo "*" per fare in modo che,
			// quando sono all'interno del dockblock e premo invio, venga creata la nuova riga con asterisco.
			// In caso contrario viene creata una riga che non inizia per "*";

			var start_row = " * ";
			var add_tab = "";
			var empty_row = "";

			if (is_valid_function_or_class_selection) {
				// add_tab solo pe rle funzioni e le classi, ma non per le variabili perchè crea un rientro in più
				if (docblockInsideFunctionsAsDefault) {
					add_tab = tab;
				}
				if (monsterdoc_local_obj["addEmptyRowBetweenSections"]) {
					empty_row = add_tab + pre_tabs + start_row + eol;
				}
			}
			var documentation_str = "";
			var documentation_obj = {
				"copyrights": "",
				"version": "",
				"params": "",
				"example": "",
				"additional_keywords": "",
			};

			var is_PHP = false;
			var is_PHP7 = false;
			var is_JS = false;
			var is_TS = false
			var is_function = false;
			var is_class = false;
			var is_interface = false;
			var cursor_line_position_after_write_in_editor = 0;

			var documentation_params_str = "";

			if (is_valid_function_or_class_selection && (
					selectedText.match(new RegExp(function_recognition_re, "gim")) != null && selectedText.lastIndexOf(")") > selectedText.indexOf("(") ||
					selectedText.match(new RegExp(class_recognition_re, "gim")) != null && selectedText.indexOf("{") > selectedText.indexOf(class_recognition_str) ||
					selectedText.match(new RegExp(interface_recognition_re, "gim")) != null && selectedText.indexOf("{") > selectedText.indexOf(interface_recognition_str)
				)) {


				var function_name = "";
				var class_name = "";
				var full_class_declaration = "";
				var curr_structure_type = "";
				var curr_structure_name = "";
				var curr_structure_re = "";
				var curr_structure_access = "";
				var curr_structure_access_default = "public";
				var monsterdoc_keywords_to_add = null;
				curr_structure_access = curr_structure_access_default;
				is_function = false;
				is_class = false;
				is_interface = false

				if (line_text.match(new RegExp(class_recognition_short_re, "gim")) != null && selectedText.match(new RegExp(class_recognition_re, "gim")) != null) {
					is_class = true;
					curr_structure_re = class_recognition_re;
					curr_structure_type = class_recognition_str;

					monsterdoc_keywords_to_add = monsterdocKeywordsToAddForClasses;
					//console.log( " » E' UNA CLASSE" );
					//console.log( selectedText.match( new RegExp( class_recognition_re, "gim" ) ) )
				} else if (line_text.match(new RegExp(interface_recognition_short_re, "gim")) != null && selectedText.match(new RegExp(interface_recognition_re, "gim")) != null) {
					is_interface = true;
					curr_structure_re = interface_recognition_re;
					curr_structure_type = interface_recognition_str;
					monsterdoc_keywords_to_add = monsterdocKeywordsToAddForClasses;
					// console.log( " » E' UNA INTERFACCIA" );

				} else if (line_text.match(new RegExp(function_recognition_short_re, "gim")) != null && selectedText.match(new RegExp(function_recognition_re, "gim")) != null) {
					is_function = true;
					curr_structure_re = function_recognition_re;
					curr_structure_type = function_recognition_str;

					monsterdoc_keywords_to_add = monsterdocKeywordsToAddForFunctions;
					//console.log( " » E' UNA FUNZIONE" );
					//console.log( selectedText.match( new RegExp( function_recognition_re, "gim" ) ) );
				} else {
					//console.log( " » E' UNA VARIABILE O ALTRO TIPO" );
				}
				//console.log( curr_structure_re )
				var structure_access_re = "([a-z]+)([\\t ]+)";
				structure_access_re += "(" + curr_structure_type.trim() + ")([\\t ]+)";

				if (is_function) {
					/*
					var curr_structure_access_ra = line_text.match( new RegExp("([a-z]+)([\t ]+)" + function_recognition_str) );
					if ( curr_structure_access_ra.length > 0 ) {
						curr_structure_access = String( curr_structure_access_ra[ 0 ] ).trim();
					}
					*/
					var function_arguments = selectedText.substring(selectedText.indexOf("(") + 1, selectedText.lastIndexOf(")"));

					var limit = 0;
					var line_text_trim = line_text.trim();
					if (line_text.lastIndexOf("(") >= 0) {
						limit = line_text.lastIndexOf("(");
					} else {
						limit = line_text.length;
					}
					if (line_text_trim.indexOf(curr_structure_type) === 0) {
						//console.log( "F-0" );
						function_name = String(line_text_trim.substring(line_text_trim.indexOf(" "), limit)).trim();

					} else {

						if (line_text_trim.match(new RegExp(structure_access_re, "gim")) == null) {
							//console.log( "F-1" );
							function_name = String(line_text_trim.substring(0, line_text_trim.indexOf("=")).trim());

						} else {
							// console.log( "F-2" );
							function_name = String(line_text_trim.substring(line_text_trim.indexOf(" "), limit)).trim();
							curr_structure_access = String(line_text_trim.substring(0, line_text_trim.indexOf(" "))).trim();
							// console.log( curr_structure_access )

						}
					}
					function_name = function_name.replace(new RegExp(structure_access_re, "gim"), "").trim();

					var fn_limit = 0;
					if (function_name.lastIndexOf("(") >= 0) {
						fn_limit = function_name.lastIndexOf("(");
					} else {
						fn_limit = function_name.length;
					}
					function_name = function_name.substring(0, fn_limit).trim();
					// console.log( "PRIMA: " + function_name );
					if (function_name.indexOf(" ") > 0) {
						function_name = function_name.substring(function_name.indexOf(" ") + 1, function_name.length);
						// console.log( "SONO QUI: 5" )
					}
					function_name = function_name.trim();
					// console.log( "DOPO: " + function_name );
					curr_structure_name = function_name;
					//console.log( function_name )
					// prelevo gli arguments

					var function_return = "";
					var function_end_declaration_match_str = String(function_end_declaration_match[0]);
					if (function_end_declaration_match_str.indexOf(":") >= 0) {
						var function_return_tmp = function_end_declaration_match_str.substring(function_end_declaration_match_str.indexOf(":") + 1, function_end_declaration_match_str.length).trim();
						var function_return_match = function_return_tmp.match(new RegExp("([a-z0-9\\\_\\\-\\\.]*)", "gim"));
						function_return = function_return_match[0];
					}
					if (function_return == "") {
						function_return = "mixed";
					}
					variables_boundary_str = "";
					var documentation_params_obj = monsterdoc_function_arguments_parser(monsterdoc_keywords_obj, monsterdoc_params_type_obj, monsterdoc_local_obj, function_arguments, param_type_padding, variables_boundary_str, is_valid_function_or_class_selection, add_tab, pre_tabs, start_row, tabSize, eol);
					documentation_params_str = documentation_params_obj["documentation_params"];
					var function_arguments_ra = documentation_params_obj["function_arguments"];
					is_PHP = documentation_params_obj["is_PHP"];
					is_PHP7 = documentation_params_obj["is_PHP7"];
					is_JS = documentation_params_obj["is_JS"];
					is_TS = documentation_params_obj["is_TS"];

				} else if (is_class || is_interface) {
					full_class_declaration = String(selectedText.substring(0, selectedText.indexOf("{"))).trim();
					class_name = full_class_declaration;

					var properties_keywords_for_classes_and_variables_declaration = "\\b(" + properties_keywords_for_classes_and_variables_re + ")\\b([\t ]+)";

					if (class_name.match(new RegExp(properties_keywords_for_classes_and_variables_declaration, "gim")) != null) {
						class_name = class_name.replace(new RegExp(properties_keywords_for_classes_and_variables_declaration, "gim"), "");
					}

					if (class_name.match(new RegExp(structure_access_re)) != null) {
						curr_structure_access = String(class_name.substring(0, class_name.indexOf(" "))).trim();
					}


					class_name = class_name.substring(class_name.indexOf(curr_structure_type) + curr_structure_type.length, class_name.length).trim();
					if (class_name.indexOf(" ") > 0) {
						class_name = class_name.substring(0, class_name.indexOf(" "));
					}
					//console.log( class_name );
					curr_structure_name = class_name;
					// dato che, in questa sezione, non posso riconoscere il linguaggio dalle stringhe, mi adatto usando l'estensione del file
					// mi serve soprattutto per la documentazione nei commenti usando i tre backtick
					eval("is_" + filename_ext.toUpperCase() + "=true;");
				}

				if (monsterdoc_local_obj["addClassesAndFunctionsVersion"]) {
					var first_version = settings_local_obj["setFirstVersion"];
					documentation_obj["version"] += add_tab + pre_tabs + start_row + monsterdoc_keywords_obj["@version"] + first_version + " " + (new Date().toISOString()) + eol;
				}
				if (is_function) {
					documentation_obj["params"] += documentation_params_str;
					var param_padding = documentation_params_obj["param_padding"];
					var param_empty = "";
					documentation_obj["params"] += add_tab + pre_tabs + start_row + monsterdoc_keywords_obj["@return"] + function_return.padEnd(param_type_padding) + param_empty.padEnd(param_padding) + ": _return" + description_ph + eol + eol;
				}

				if (typeof (monsterdoc_keywords_to_add) != "undefined" && monsterdoc_keywords_to_add != "undefined" && typeof (monsterdoc_keywords_to_add[0]) != "undefined") {
					if (monsterdoc_keywords_to_add.length > 0) {
						var monsterdoc_keywords_to_add_i = "";
						for (var i in monsterdoc_keywords_to_add) {
							monsterdoc_keywords_to_add_i = monsterdoc_keywords_to_add[i];
							documentation_obj["additional_keywords"] += add_tab + pre_tabs + start_row + monsterdoc_keywords_obj[monsterdoc_keywords_to_add_i] + "_" + monsterdoc_keywords_to_add_i.substr(1, monsterdoc_keywords_to_add_i.length) + description_ph + eol;
						}
					}
				}

				if (monsterdoc_local_obj["addClassesAndFunctionsExample"]) {
					var example_ext = String(monsterdoc_local_obj["classesAndFunctionsExamplesFileExtension"]).trim();
					if (example_ext.charAt(0) !== ".") {
						example_ext = "." + example_ext;
					}
					documentation_obj["example"] += add_tab + pre_tabs + start_row + monsterdoc_keywords_obj["@example"] + monsterdoc_local_obj["classesAndFunctionsExamplesPath"] + curr_structure_type + "_" + curr_structure_name + example_ext + eol;
				}
				if (monsterdoc_local_obj["addClassesAndFunctionsInlineCodeExample"]) {
					var code_distancer = String(" ").padEnd(keywords_padding);
					//var code_open = "<code>";
					//var code_close = "</code>";
					var code_language_add = "";
					if (is_PHP || is_PHP7) {
						code_language_add = "php";
					} else if (is_JS) {
						code_language_add = "javascript";
					} else if (is_TS) {
						code_language_add = "typescript";
					}
					var code_open = "```" + code_language_add;
					var code_close = "```";
					documentation_obj["example"] += add_tab + pre_tabs + start_row + code_distancer + code_open + eol
					documentation_obj["example"] += add_tab + pre_tabs + start_row + code_distancer + "\t// *** Inline Code Example ***" + eol;

					if (is_function) {
						documentation_obj["example"] += add_tab + pre_tabs + start_row + code_distancer + "\t" + function_name + "(" + function_arguments_ra.join(", ") + ");" + eol;
					} else {
						documentation_obj["example"] += add_tab + pre_tabs + start_row + code_distancer + "\t// TypeScript" + eol;
						documentation_obj["example"] += add_tab + pre_tabs + start_row + code_distancer + "\tlet class_test = new " + class_name + "(arguments);" + eol;
						documentation_obj["example"] += add_tab + pre_tabs + start_row + code_distancer + "\t// PHP" + eol;
						documentation_obj["example"] += add_tab + pre_tabs + start_row + code_distancer + "\t$" + class_name.toLowerCase() + " = new " + class_name + ";" + eol;
					}
					documentation_obj["example"] += add_tab + pre_tabs + start_row + code_distancer + code_close + eol
				}

				if (monsterdoc_local_obj["addAuthorsInfos"] == true) {
					//var copyrights_authorsNamesAndEmails = copyrights_local_obj[ "authorsNames" ];
					//var copyrights_authorsEmail = copyrights_local_obj[ "authorsEmail" ];
					//var copyrigths_authors_info = copyrights_authorsNamesAndEmails + " <" + copyrights_authorsEmail + ">";
					for (var i in copyrigths_authors_info) {
						documentation_obj["copyrights"] += add_tab + pre_tabs + start_row + monsterdoc_keywords_obj["@author"] + copyrigths_authors_info[i] + eol;
					}
				}
				if (monsterdoc_local_obj["addCopyrightsInfos"]) {
					documentation_obj["copyrights"] += add_tab + pre_tabs + start_row + monsterdoc_keywords_obj["@copyright"] + copyrights_owner.join(", ") + " © " + (new Date().getFullYear()) + eol;
				}

				documentation_str += eol + add_tab + pre_tabs + docbkock_start + eol;
				// documentation_str += add_tab + pre_tabs + start_row + curr_structure_type.trim().toUpperCase() + eol
				documentation_str += add_tab + pre_tabs + start_row
				if (!is_PHP) {
					documentation_str += monsterdoc_keywords_obj["@description"];
				} else {
					documentation_str += monsterdoc_keywords_obj["@description"].substring(1, 2).toUpperCase() + monsterdoc_keywords_obj["@description"].substring(2, monsterdoc_keywords_obj["@description"].length) + " ";
				}
				documentation_str += curr_structure_name;
				if (is_function) {
					// " + function_arguments.replace( new RegExp( "([\r\n\t ]+)", "gim" ), " " ) + "
					var fake_args = "";
					if (function_arguments_ra.length == 1 && function_arguments_ra[0].trim() == "") {
						function_arguments_ra.shift();
					}
					if (function_arguments_ra.length > 0) {
						fake_args = "...";
					}
					documentation_str += "(" + fake_args + ")";
				}
				documentation_str += " - _" + curr_structure_type.trim() + description_ph + eol;

				if (monsterdoc_local_obj["addClassesAndFunctionsAccess"]) {
					documentation_str += add_tab + pre_tabs + start_row + monsterdoc_keywords_obj["@access"] + curr_structure_access.padEnd(param_type_padding) + eol;
					documentation_str += empty_row;
				}
				var monsterdoc_blocks_order_str = (String(monsterdoc_local_obj["monsterdocBlocksOrder"]).toLowerCase()).trim();
				var monsterdoc_blocks_order_ra = monsterdoc_blocks_order_str.split(",");
				var dbo_i = "";
				for (var i in monsterdoc_blocks_order_ra) {
					if (typeof (monsterdoc_blocks_order_ra[i]) != "undefined") {
						dbo_i = String(monsterdoc_blocks_order_ra[i]).trim().replace(new RegExp("([\t ]+)", "gim"), "_");
						if (documentation_obj[dbo_i].trim() != "") {
							documentation_str += documentation_obj[dbo_i] + empty_row;
						}
					}
				}
				documentation_str += add_tab + pre_tabs + docbkock_end + eol + eol;
				monsterdoc_str = "";
				monsterdoc_str = documentation_str + selectedText + eol;
				if (docblockInsideFunctionsAsDefault) {
					monsterdoc_str = selectedText + eol + documentation_str;
				}

				msg_loc_type = "information";
				msg_loc = vboss_translate("make_docblock_for", {
					"curr_structure_type": capitalize(curr_structure_type),
					"curr_structure_name": curr_structure_name
				})

				bool_is_already_a_dockblock = false;
				cursor_line_position_after_write_in_editor = -1;
				//vboss_write_in_editor( editor, selection_to_replace, monsterdoc_str, cursor_line_position_after_write_in_editor );
			} else {
				// console.log( " » E' UNA VARIABILE O ALTRO TIPO" );

				var variables_text_full = selectedText;
				// elimino tutti i rimandi iniziali altrimenti viene generata una riga commentata con "undefined"
				variables_text_full = variables_text_full.replace(new RegExp("^([\t ]*)([\r\n]+)", "gim"), "");
				variables_text_full = variables_text_full.replace(new RegExp("([\r\n]+)", "gim"), "\n");

				var variables_text_full_ra = variables_text_full.split("\n");
				var variables_text_full_ra_i = "";
				var variables_text = variables_text_full;
				var variables_boundary_random = String(Math.random());
				variables_boundary_random = variables_boundary_random.substring(variables_boundary_random.indexOf(".") + 1);
				variables_boundary_random = parseInt(variables_boundary_random).toString(16).toUpperCase();
				variables_boundary_str = "<#§_" + variables_boundary_random + "_§@>";
				var vars_re = "(([\\t ]*)([a-z]+)([\\t ]+)|)(([\\\$]*)([a-z0-9\\\_\\\.]+))([\\t ]*)([\\\=\\\,\\\:\\\;]+([^\r\n]*)([\r\n]*))";
				var is_inline_multivariables = false;
				if (variables_text.match(new RegExp(vars_re, "gim"))) {

					//glob_env[ "properties_keywords_for_classes_and_variables_re" ] + "|" +

					variables_text = variables_text.replace(new RegExp("(([\\\;]*)[\r\n]+)", "gim"), variables_boundary_str);
					variables_text = variables_text.replace(new RegExp("(\\b(" + properties_keywords_for_classes_and_variables_re + "|" + glob_env["variables_declarations_re"] + ")\\b([\\t ]*))", "gim"), "");

					//console.log( variables_text );
					documentation_params_obj = monsterdoc_function_arguments_parser(monsterdoc_keywords_obj, monsterdoc_params_type_obj, monsterdoc_local_obj, variables_text, param_type_padding, variables_boundary_str, is_valid_function_or_class_selection, add_tab, pre_tabs, start_row, tabSize, eol);
					documentation_params_str = documentation_params_obj["documentation_params"];
					is_inline_multivariables = documentation_params_obj["is_inline_multivariables"];
					//console.log( "Z-1 " + documentation_params_str )
					cursor_line_position_after_write_in_editor = -1;
				} else {
					documentation_params_str = add_tab + pre_tabs + start_row + eol;
					cursor_line_position_after_write_in_editor = 1;
				}
				//console.log( semver_boss_command )
				var variables_text_full_elab = variables_text_full;
				// console.log( variables_text_full )
				var bool_is_variables_text_full_empty = false;
				if (variables_text_full.replace(new RegExp("[\\\/\\\*]+", "gim"), "").trim() == "") {
					// eseguo il trim solo se la selezione è vuota in modo da non aggiungere spazi inutili sotto al docblock
					bool_is_variables_text_full_empty = true;
				}
				var docblockGroupedForMultipleVariablesSelectionAsDefault = monsterdoc_local_obj["docblockGroupedForMultipleVariablesSelectionAsDefault"];
				//console.log(docblockGroupedForMultipleVariablesSelectionAsDefault)
				if (docblockGroupedForMultipleVariablesSelectionAsDefault) {
					if (semver_boss_command != "monsterdoc-alternative") {
						semver_boss_command = "monsterdoc-alternative";
					} else {
						semver_boss_command = "monsterdoc";
					}
				}
				if (semver_boss_command == "monsterdoc-alternative" || bool_is_variables_text_full_empty || is_inline_multivariables) {

					documentation_str += eol + add_tab + pre_tabs + docbkock_start + eol;
					documentation_str += documentation_params_str;
					documentation_str += add_tab + pre_tabs + docbkock_end + eol + eol;
					var selectedText_elab = selectedText;
					if (selectedText_elab.replace(new RegExp("[\\\/\\\*]+", "gim"), "").trim() == "") {
						// eseguo il trim solo se la selezione è vuota in modo da non aggiungere spazi inutili sotto al docblock
						selectedText_elab = selectedText_elab.trim();
					}
					monsterdoc_str = "";

					selectedText_elab = selectedText_elab.replace(new RegExp("^([\t ]*)([" + eol + "]+)", "gim"), "\n");
					selectedText_elab = selectedText_elab.replace(new RegExp("([" + eol + "]+)", "gim"), "\n")
					monsterdoc_str = documentation_str + selectedText_elab;

				} else {
					var documentation_params_ra = [];
					if (typeof (documentation_params_obj["documentation_params_ra"]) != "undefined") {
						documentation_params_ra = documentation_params_obj["documentation_params_ra"];
					}

					for (var i in variables_text_full_ra) {
						// non usare il trim!
						variables_text_full_ra_i = variables_text_full_ra[i];
						pre_tabs = "";
						pre_tabs_ra = variables_text_full_ra_i.match(new RegExp(pre_tabs_re));
						if (pre_tabs_ra != null && typeof (pre_tabs_ra[0]) != "undefined") {
							pre_tabs = pre_tabs_ra[0];
						}
						if (variables_text_full_ra_i != "undefined" && variables_text_full_ra_i.trim() != "") {
							documentation_str += eol + pre_tabs + docbkock_start + eol;
							documentation_str += pre_tabs + documentation_params_ra[i];
							documentation_str += pre_tabs + docbkock_end + eol;
							documentation_str += variables_text_full_ra_i + eol;
						}
					}
					monsterdoc_str = documentation_str.replace(new RegExp("(param)([\\t ]+)", "gim"), "$1\t\t");
				}
				msg_loc_type = "information";
				msg_loc = vboss_translate("make_docblock_for_variables");
			}
			if (monsterdoc_str != "") {
				vboss_write_in_editor(editor, selection_to_replace, monsterdoc_str, cursor_line_position_after_write_in_editor);

			} else {
				msg_loc = vboss_translate("not_full_selection");
				msg_loc_type = "warning";
			}

		} catch (e) {
			msg_loc_type = "warning";
			var error_msg = "";
			if (glob_env["bool_debug_mode_on"]) {
				error_msg = e.message + " » ";
			}
			msg_loc = error_msg + vboss_translate("not_valid_selection");
		}
	} else {
		if (monsterdoc_str != "") {
			vboss_write_in_editor(editor, selection_to_replace, monsterdoc_str, cursor_line_position_after_write_in_editor);
			msg_loc_type = "information";
			msg_loc = vboss_translate("documentation_tags_added");
		}
	}
	if (msg_loc_type != "" && msg_loc != "") {
		msg_ra = [msg_loc_type, msg_loc];
	}
	return msg_ra;
}

/*
function vboss_write_in_editor( editor_instance, selection, selection_replacement, bool_cursor_at_bottom ) {
	var init_num_lines = editor_instance.document.lineCount - 1;
	var position = editor_instance.selection.end;
	var init_line = position.line;
	bool_cursor_at_bottom != false ? bool_cursor_at_bottom = true : vz = 0;
	// IMPORTANTEEEEEE
	// aggiustare la posizione del cursore in base alle linee aggiunte

	editor_instance.edit( builder => builder.replace( selection, selection_replacement ) )
		.then( success => {
			if ( bool_cursor_at_bottom ) {
				var curr_num_lines = editor_instance.document.lineCount - 1;
				var delta_num_lines = curr_num_lines - init_num_lines;
				var end_line = init_line + delta_num_lines;
				var newPosition = position.with( end_line, editor_instance.document.lineAt( end_line ).range.end.character );
				var newSelection = new vscode.Selection( newPosition, newPosition );
				editor_instance.selection = newSelection;
			}
		} );
}
*/

function vboss_write_in_editor(editor_instance, selection, selection_replacement, cursor_line_position_after_write_in_editor) {
	var init_num_lines = editor_instance.document.lineCount - 1;

	var position = editor_instance.selection.start;
	var init_line = position.line;
	var eol = "\r\n";
	var vz = 0;
	var bool_cursor_at_bottom = false;
	var newPosition = position.with(init_line, editor_instance.document.lineAt(init_line).range.start.character);
	if (cursor_line_position_after_write_in_editor == -1) {
		bool_cursor_at_bottom = true;
	}

	var delta_num_lines = 0;

	editor_instance.edit(builder => builder.replace(selection, selection_replacement))
		.then(success => {
			var selection_text = String(editor_instance.document.getText(selection)).trim();
			var bool_substract_selection_rows_count = false;

			if (selection_text !== "") {
				if (selection_replacement.indexOf(selection_text) != -1) {
					if ((editor_instance.document.getText().length) > selection_replacement.length) {
						bool_substract_selection_rows_count = true;
					}
				}
			}
			if (bool_cursor_at_bottom) {
				var curr_num_lines = editor_instance.document.lineCount - 1;
				if (!bool_substract_selection_rows_count) {
					delta_num_lines = curr_num_lines - init_num_lines;
				} else {
					delta_num_lines = selection_replacement.trim().split(eol).length;
				}
				var end_line = init_line + delta_num_lines - 1;
				newPosition = position.with(end_line, editor_instance.document.lineAt(end_line).range.end.character);
				// console.log( "W-1 " + end_line )

			} else {
				var new_init_line = init_line;
				if (!isNaN(cursor_line_position_after_write_in_editor)) {
					new_init_line += cursor_line_position_after_write_in_editor + 1;
				}
				// console.log( init_line + "|" + new_init_line )
				newPosition = position.with(new_init_line, editor_instance.document.lineAt(new_init_line).range.end.character);
			}
			var newSelection = new vscode.Selection(newPosition, newPosition);
			editor_instance.selection = newSelection;
			//console.log( editor_instance.selection )
		});
}

function vboss_settings_obj_to_local_obj(settings_obj, root_item, semver_boss_command) {
	// crea una copia non istanziata dell'oggetto
	var settings_local_obj = Object.assign({}, settings_obj);
	var root_item = root_item.trim();
	var semver_boss_command = semver_boss_command.trim();
	var settings_local_pfx = "";
	settings_local_pfx += root_item;
	if (semver_boss_command != "") {
		settings_local_pfx += "." + semver_boss_command;
	}
	var eol = "\r\n";
	var obj = {};
	var var_name = "";
	var var_val = null;
	var var_val_final = "";
	for (var i in settings_local_obj) {
		if (String(i).indexOf(settings_local_pfx) == 0) {
			var_name = "";
			var_val = settings_local_obj[i];
			if (!isNaN(var_val) || typeof (var_val) === "boolean") {
				var_val = eval(var_val);
			}
			var_name += String(i).substr(settings_local_pfx.length + 1);
			obj[var_name] = var_val;
		}
	}
	return obj;
}

function obj_to_array(obj) {
	var obj_ra = Object.keys(obj).map(function (key) {
		return obj[key];
	});
	return obj_ra;
}

function vboss_help_maker() {

	// questo sistema identifica se l'estesione è attivata in debug mode (vscode.env.sessionId === "someValue.sessionId"), e in questo caso scrive i file README e CHANGELOG partendo dai master
	var config_obj = get_config();
	var package_obj = config_obj["package"];
	var editor = vscode.window.activeTextEditor;
	var eol = "\r\n";
	vboss_get_contributes(editor, package_obj, eol);

}

function make_hint_provider(editor, local_keywords_obj, trigger_char, eol) {

	var local_provider = vscode.languages.registerCompletionItemProvider(
		// {scheme: 'file', language: 'javascript'}
		[{
				scheme: 'file',
				language: 'typescript'
			},
			{
				scheme: 'file',
				language: 'javascript'
			},
			{
				scheme: 'file',
				language: 'php'
			}
		], {
			provideCompletionItems() {

				var selection = editor.selection;
				var position = selection.start;

				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				var linePrefix = editor.document.lineAt(position).text.substr(0, position.character);
				var control_obj = {};
				var control_obj_id = 0;
				var docblock_keyword_start_match = linePrefix.match(new RegExp("(\\\*|[\\\/]{2,})([\t ]*)\\" + trigger_char, "gim"));
				var md_i = null;
				var md_i_kw = null;
				var kw_clean = "";
				var kw_item_url = "";
				var kw_doc = "";
				var kw_dl = "";
				var kw_doc_ext = "";
				var spaces_string = "&nbsp;&nbsp;&nbsp;";
				var documentation_url = "";
				var documentation_label = "";
				var downlaod_url = "";
				var language_name = "";
				var language_name_short = "";
				var keywords_obj_id = "monsterdoc_keywords_main_obj";
				var keywords_padding = glob_env[keywords_obj_id + "_elab_keywords_universal_max_lenght"];
				var languages_tot_obj = {};
				var item_kind = null;
				if (docblock_keyword_start_match != null) {
					if (linePrefix.endsWith(trigger_char)) {
						var keywords_ra = [];
						var item = null;
						for (var i in local_keywords_obj) {
							documentation_label = "";
							md_i = local_keywords_obj[i];
							language_name = md_i["language_name"];
							documentation_label = md_i["documentation_label"];
							language_name_short = i.toUpperCase();
							// segno la lungehzza in modo da coustruire una stringa  vuota in caso di assenza della key nel linguaggio
							languages_tot_obj[language_name_short] = String("-").padStart(language_name_short.length);
							md_i_kw = md_i["keywords"];
							documentation_url = "";
							if (typeof (md_i["documentation_url"]) != "undefined") {
								documentation_url = md_i["documentation_url"];
							}
							for (var j in md_i_kw) {
								kw_dl = "";
								downlaod_url = "";
								if (typeof (md_i["download_url"]) != "undefined") {
									downlaod_url = md_i["download_url"];
								}
								kw_clean = String(j.replace(new RegExp("([^a-z0-9]+)", "i"), "")).trim();
								kw_item_url = kw_clean;
								if (typeof (md_i_kw[j]["item_url"]) != "undefined") {
									kw_item_url = md_i_kw[j]["item_url"];
								}
								kw_doc_ext = String(md_i["documentation_extension"]).trim();
								if (kw_doc_ext != "") {
									kw_item_url = "." + kw_doc_ext;
								}
								if (documentation_url != "") {
									kw_doc = "[[" + spaces_string + documentation_label + spaces_string + "]](" + md_i["documentation_url"] + kw_item_url + ")&nbsp;";
								} else {
									kw_doc = "[" + spaces_string + documentation_label + spaces_string + "]&nbsp;";
								}
								if (downlaod_url != "") {
									kw_dl = "[[" + spaces_string + language_name + spaces_string + "]](" + downlaod_url + ")&nbsp;";
								}
								if (typeof (control_obj[kw_clean]) == "undefined") {
									control_obj[kw_clean] = {};
									control_obj[kw_clean]["id"] = control_obj_id;
									control_obj[kw_clean]["item"] = null;
									control_obj[kw_clean]["item_documentation"] = "";
									control_obj[kw_clean]["item_download_url"] = "";
									control_obj[kw_clean]["item_filterText"] = "";
									control_obj[kw_clean]["item_language_labels"] = {};
									if (kw_dl != "") {
										control_obj[kw_clean]["item_download_url"] = kw_dl;
									}
									item_kind = vscode.CompletionItemKind.Keyword;
									if (j.charAt(0) != "@") {
										item_kind = vscode.CompletionItemKind.Constant;
									}
									item = new vscode.CompletionItem(kw_clean.padEnd(keywords_padding), item_kind);
									if (kw_doc != "") {
										control_obj[kw_clean]["item_documentation"] += kw_doc;
									}
									item.insertText = kw_clean + " ";
									item.sortText = j;
									control_obj[kw_clean]["item_filterText"] += kw_clean;
									control_obj[kw_clean]["item_language_labels"][language_name_short] = "|" + language_name_short + "|" + language_name;
									item.keepWhitespace = true;
									//item.range = new vscode.Range( selection.start.line, 0, selection.start.line, selection.active.character );
									//item.documentation = new MarkdownString( "Documentation:  [link to Google!](http://google.com)", true );
									//keywords_ra.push( item );
									control_obj[kw_clean]["item"] = item
									control_obj_id++;
								} else {
									control_obj[kw_clean]["item_documentation"] += kw_doc;
									control_obj[kw_clean]["item_download_url"] += kw_dl;
									control_obj[kw_clean]["item_language_labels"][language_name_short] = "|" + language_name_short + "|" + language_name;
									//  Questo trucco fa in modo ceh le chiavi che si accavallano tr ai linguaggi vengano ordinate in base alle preferenze dell'utente.
									//  Ai fini pratici fa in modo che ilk #todo del Todo+ sia messo in cima anzichè in ordine alfabetico con il @todo di PHP/JS/TypeDoc
									if (j < control_obj[kw_clean]["item"].sortText) {
										control_obj[kw_clean]["item"].sortText = j;
									}
									//keywords_ra[ control_obj[ kw_clean ][ "id" ] ].label += " | " + language_name_short;
								}
							}
						}
						// console.log( languages_tot_obj );
						// ordina l'object usando le keys (richiede che venga dichairato ES2019 in jsconfig.json)
						languages_tot_obj = Object.fromEntries(Object.entries(languages_tot_obj).sort());
						// console.log( languages_tot_obj );
						var add_br = "";
						var item_language_labels = "";
						var loc_id = null;
						var main_title = "";
						var documentation_title = "";
						var downloads_title = "";
						for (var j in control_obj) {
							add_br = "";
							item_language_labels = "";
							loc_id = control_obj[j]["id"];
							main_title = "**" + j.toUpperCase() + "** > ";
							documentation_title = "";
							downloads_title = "";
							if (control_obj[j]["item_documentation"] != "") {
								documentation_title = main_title + String("_Documentation_").toUpperCase() + eol + eol + spaces_string;
							}
							if (control_obj[j]["item_download_url"] != "") {
								downloads_title = main_title + String("_Downloads_").toUpperCase() + eol + eol + spaces_string;
							}
							if (control_obj[j]["item_documentation"] != "" && control_obj[j]["item_download_url"] != "") {
								add_br = eol + eol;
							}

							for (var l in languages_tot_obj) {
								item_language_labels += " | ";
								if (typeof (control_obj[j]["item_language_labels"][l]) == "undefined") {
									item_language_labels += languages_tot_obj[l];
								} else {
									item_language_labels += l.toUpperCase();
									control_obj[j]["item_filterText"] += control_obj[j]["item_language_labels"][l];
								}
							}
							control_obj[j]["item"].label += item_language_labels + " |";
							keywords_ra[loc_id] = control_obj[j]["item"];
							keywords_ra[loc_id].filterText = control_obj[j]["item_filterText"];
							keywords_ra[loc_id].documentation = new vscode.MarkdownString(documentation_title + control_obj[j]["item_documentation"] + add_br + downloads_title + control_obj[j]["item_download_url"] + eol + eol + "&nbsp;")
						}
						return keywords_ra;
					} else {
						return undefined;
					}
				} else {
					return undefined;
				}
			},
		},
		trigger_char // si attiva quando viene premuto questo carattere
	);
	//console.log( trigger_char );
	return local_provider;
}

function monsterdoc_clean_exculed_docblock_keywords(keywords_excusions_obj_ra, obj_to_clean) {

	var keywords_excusions_obj_obj = {};
	var kw_switch_ra = [];
	var obj_tmp = {};

	for (var i in keywords_excusions_obj_ra) {
		kw_switch_ra = keywords_excusions_obj_ra[i];
		if (typeof ([kw_switch_ra]) == "object") {
			//console.log( kw_switch_ra );
			obj_tmp = {};
			kw_switch_ra.forEach(element => obj_tmp[element] = "");
			keywords_excusions_obj_obj[i] = obj_tmp;
		}
	}
	var obj_i = {};
	var obj_ke = {};
	for (var i in obj_to_clean) {
		obj_i = obj_to_clean[i]["keywords"];
		if (typeof (keywords_excusions_obj_obj[i]) == "object") {
			obj_ke = keywords_excusions_obj_obj[i];
			for (var j in obj_i) {
				// cancello solo se l'oggetto è vuoto o ha
				if ((obj_i[j] == "" || typeof (obj_i[j]["is_predefined_keyword"]) == "undefined" || !obj_i[j]["is_predefined_keyword"]) && typeof (obj_ke[j]) != "undefined") {
					delete(obj_to_clean[i]["keywords"][j])
				}
			}
		}
	}
	return obj_to_clean;
}

function activate(context) {
	glob_env["bool_debug_mode_on"] = false;
	if (typeof (vscode.env.sessionId) != "undefined" && vscode.env.sessionId.indexOf("someValue.sessionId") != -1) {
		glob_env["bool_debug_mode_on"] = true;
	}
	var editor = vscode.window.activeTextEditor;
	var eol = "\r\n";
	var config_obj = get_config();
	var curr_lang = glob_env["lang"];
	if (typeof (glob_env["translations"][curr_lang]) != "undefined") {
		glob_env["current_translation"] = glob_env["translations"][curr_lang];
	} else {
		// default
		glob_env["current_translation"] = glob_env["translations"][Object.keys(glob_env["translations"])[0]];
	}
	//console.log( glob_env[ "current_translation" ] )
	var root_items_ra = config_obj["roots"];
	// poichè root_items_ra deve contenere solo 1 elemento (se ne contiene di più il sistema visualizza un errore)
	// imposto root_item come segue
	var root_item = root_items_ra[0];
	var local_step = 1;
	var local_command = "";
	var ae_ra = config_obj["package"]["activationEvents"];
	var disp_ra = [];
	var str = "";
	var registered_command = "";
	var semver_boss_local_command = "monsterdoc";
	if (semver_boss_local_command.indexOf("monsterdoc-") != -1) {
		semver_boss_local_command = "monsterdoc";
	}
	var config_obj = get_config();
	var settings_obj = config_obj["settings"];
	var monsterdoc_local_obj = vboss_settings_obj_to_local_obj(settings_obj, root_item, semver_boss_local_command);

	var monsterdockeywordsSuggestionsForTodoPlus_ra = monsterdoc_local_obj["keywordsSuggestionsForTodoPlus"];
	var monsterdockeywordsSuggestionsForTodoPlus_obj = {};
	for (var i in monsterdockeywordsSuggestionsForTodoPlus_ra) {
		monsterdockeywordsSuggestionsForTodoPlus_obj[monsterdockeywordsSuggestionsForTodoPlus_ra[i]] = "";
	}
	glob_env["monsterdoc_keywords_todoplus_obj"]["todo"]["keywords"] = monsterdockeywordsSuggestionsForTodoPlus_obj;

	var keywords_excusions_obj_ra = {
		"php": monsterdoc_local_obj["keywordsSuggestionsExclusionsForPHPDoc"],
		"js": monsterdoc_local_obj["keywordsSuggestionsExclusionsForJSDoc"],
		"ts": monsterdoc_local_obj["keywordsSuggestionsExclusionsForTYPEDoc"],
	}
	glob_env["monsterdoc_keywords_main_obj"] = monsterdoc_clean_exculed_docblock_keywords(keywords_excusions_obj_ra, glob_env["monsterdoc_keywords_main_obj"]);
	// console.log( glob_env[ "monsterdoc_keywords_main_obj" ] )
	var local_monsterdoc_keywords_main_obj = glob_env["monsterdoc_keywords_main_obj"];
	var local_keywords_obj = glob_env["monsterdoc_keywords_main_obj"];
	var file_obj = vboss_get_filename();
	var filename_ext = file_obj["filename_ext"];
	/*
	// questo sistema non va bene, perchè una volta esclusi i file diversi da php, non ricarica la lista delle keywords in base ad una altra estensione file
	if ( filename_ext == "js" || filename_ext == "ts" ) {
		var local_key = filename_ext;
		for ( var i in local_keywords_obj ) {
			if ( i != local_key ) {
				delete( local_keywords_obj[ i ] );
			}
		}
		console.log( local_keywords_obj )
		// aggiungo i todo
		//local_key = "todo";
		//local_keywords_obj[ local_key ] = Object.assign( local_monsterdoc_keywords_main_obj[ local_key ] );
	}
	*/
	var local_keywords_group_keys_ra = Object.keys(local_keywords_obj);
	var local_keywords_keys_ra = Object.keys(local_keywords_obj[local_keywords_group_keys_ra[0]]["keywords"]);
	var trigger_char = local_keywords_keys_ra[0].trim().charAt(0);

	for (var i in glob_env["monsterdoc_keywords_todoplus_obj"]) {
		local_keywords_obj[i] = glob_env["monsterdoc_keywords_todoplus_obj"][i];
	}
	//console.log( filename_ext );
	// console.log( local_keywords_obj );

	var docblock_completion_provider = null;
	docblock_completion_provider = make_hint_provider(editor, local_keywords_obj, trigger_char, eol);
	/*
	var todo_completion_provider = null;
	local_keywords_obj = Object.assign( {}, glob_env[ "monsterdoc_keywords_todoplus_obj" ] );
	//console.log( local_keywords_obj )
	local_keywords_keys_ra = Object.keys( local_keywords_obj[ "todo" ][ "keywords" ] );
	//console.log( local_keywords_keys_ra );
	if ( local_keywords_keys_ra.length > 0 ) {
		// console.log( local_keywords_obj[ "todo" ][ "keywords" ] );
		trigger_char = local_keywords_keys_ra[ 0 ].trim().charAt( 0 );
		todo_completion_provider = make_hint_provider( editor, local_keywords_obj, trigger_char, eol );
	}
	*/

	if (glob_env["bool_debug_mode_on"]) {
		vboss_help_maker();
	}
	for (var i in ae_ra) {
		registered_command = String(ae_ra[i]).split(":").pop().trim();
		local_command = registered_command.replace(new RegExp("(extension." + root_item + "-|step-|-up|-down|-autosave)", "gim"), "");
		// console.log(local_command, rc);
		if (registered_command.indexOf("-down") >= 0) {
			local_step = -1;
		} else if (registered_command.indexOf("-align") >= 0) {
			local_step = 0;
		} else {
			local_step = 1;
		}
		str += "let disp_obj_" + i + " = vscode.commands.registerCommand('" + registered_command + "', function () { vboss_versioning('" + registered_command + "','" + root_item + "', '" + local_command + "', " + local_step + ");});";
		disp_ra.push("disp_obj_" + i);
	}
	eval(str);
	context.subscriptions.push(disp_ra, docblock_completion_provider);
}
function deactivate() {}
module.exports = {
	activate,
	deactivate,
};