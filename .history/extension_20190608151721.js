/*
<!#CR>
************************************************************************************************************************
*                                                    Copyrigths ©                                                      *
* -------------------------------------------------------------------------------------------------------------------- *
*            Authors Names > Nicola Granata                                                                            *
*            Authors Email > info@daemoncms.com                                                                        *
*            Company Name  > ActiveShade by Nicola Granata                                                             *
* -------------------------------------------------------------------------------------------------------------------- *
*                                           File and License Informations                                              *
* -------------------------------------------------------------------------------------------------------------------- *
*            File Name     > <!#FN> extension.js </#FN>                                                                
*            File Birth    > <!#FB> 2019/05/06 21:54:01.691 </#FB>                                                     *
*            File Mod      > <!#FT> 2019/05/31 03:38:04.658 </#FT>                                                     *
*            License       > <!#LT> Copyrighted Commercial Software </#LT>                                             
*                            <!#LU> See License-Copyrighted-Commercial-Software.txt </#LU>                             
*                            <!#LD> This file may not be redistributed in whole or significant part. </#LD>            
*            File Version  > <!#FV> 1.2.1 </#FV>                                                                 
*                                                                                                                      *
******************************************* VSCode Extension: Version Boss *********************************************
</#CR>
*/


// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var fs = require('fs');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

// @ts-ignore

var glob_env = {
	"paths": {
		"master": "_master\\",
	},
	"master_files": {
		"readme": "_master.readme.md",
		"changelog": "_master.changelog.md"
	}
};

String.prototype.regexEscaped = function () {
	// esegue l'escape a triplo backslash per caratteri usati generalmente nelle RegExp che sono contenuti nel parametro da passare alla funzione
	var val = String(this);
	val = val.replace(new RegExp("(\\\(|\\\)|\\\[|\\\]|\\\{|\\\}|\\\"|\\\'|\\\.|\\\-|\\\<|\\\>|\\\!|\\\$|\\\#|\\\\|\\\^|\\\*|\\\+|\\\?|\\\=)", "gim"), "\\$1");
	//val = JSON.stringify(string)(String(val));
	//val = val.substring(1, val.length - 1);
	return val;
};
String.prototype.camelToLabel = function () {
	var val = String(this);
	val = val.replace(new RegExp("([a-z]+)", "gim"), function (match_ra, str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	});
	val = val.replace(new RegExp("([\.]+)", "gm"), " » ");
	val = val.replace(new RegExp("([A-Z]+)", "gm"), " \$1");
	val = val.charAt(0).toUpperCase() + val.slice(1);
	val = val.trim();
	return val;
};

String.prototype.flip = function () {
	var val = String(this);
	val = val.split("").reverse().join("");
	return val;
};
Object.defineProperty(Array.prototype, 'natsort', {
	enumerable: false,
	value: function () {
		var collator = new Intl.Collator(undefined, {
			numeric: true,
			sensitivity: 'base'
		});
		var natsorted_ra = this.sort(collator.compare);
		return natsorted_ra;
	}
});
Number.prototype.leadingzeroesMs = function () {
	var min_len = 3;
	var fill_char = "0";
	var val = prototype_string_lead(this, min_len, fill_char);
	return val;
};

Number.prototype.leadingzeroes = function () {
	var min_len = 2;
	var fill_char = "0";
	var val = prototype_string_lead(this, min_len, fill_char);
	return val;
};

String.prototype.setLicenseID = function () {
	var val = String(this);
	val = String(val.replace(new RegExp("([^a-z0-9\-\.\#]+)", "gim"), " ")).trim();
	val = val.replace(new RegExp("([\t ]+)", "gim"), "-");
	return val;
};


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
		str += y + "/" + m.leadingzeroes() + "/" + d.leadingzeroes();
	}
	if (bool_return_time) {
		str += " " + h.leadingzeroes() + ":" + min.leadingzeroes() + ":" + s.leadingzeroes() + "." + ms.leadingzeroesMs();
	}
	return str;
}

function get_config() {
	// @ts-ignore
	var package_obj = require("./package.json");
	var obj = {};
	var extensions_tree_config_obj = package_obj.contributes.configuration.properties;
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

function fv_fill_string(str, max_len, row_to_fill, delta_start_trim) {
	var new_str = str;
	var new_str_len = new_str.length;

	if (new_str_len < max_len) {
		new_str = new_str + row_to_fill.substr(delta_start_trim + new_str.length);
	}
	new_str = new_str.substr(0, max_len);
	return new_str;
}

function fv_row_fill(filler_label, filler_value, row_to_fill, row_fill_char, label_value_separator_char, max_label_len, max_value_len, frame_char, left_right_frame_char, space_char, sections_header_separator_chars, bool_leave_open_row, eol) {
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
			console.log(max_value_len);
		}
	}

	var copyrights_header_separator = String(new Array(Math.ceil((copyrights_row_max_len) / sections_header_separator_chars.length)).join(sections_header_separator_chars));
	var spacer = "";
	if (left_right_frame_char != "") {
		copyrights_header_separator = copyrights_header_separator.substr(0, copyrights_row_max_len - 2 * distance_header_sep_from_borders_in_chars * left_right_frame_char_len);
		spacer = new Array(Math.round(distance_header_sep_from_borders_in_chars / space_char_len)).join(space_char);
		copyrights_header_separator = left_right_frame_char + spacer + copyrights_header_separator + spacer + left_right_frame_char.flip();
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
			filler_label = fv_fill_string(filler_label, max_label_len, row_to_fill, row_to_fill_half_init);
		}
		if (filler_value != "") {
			if (filler_value.length < max_value_len) {
				filler_value = fv_fill_string(filler_value, max_value_len, row_to_fill, row_to_fill_half_init + max_label_len + filler_sep_len);
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

function fv_write_in_editor(editor_instance, selection, selection_replacement) {
	var init_num_lines = editor_instance.document.lineCount - 1;
	var position = editor_instance.selection.end;
	var init_line = position.line;
	editor_instance.edit(builder => builder.replace(selection, selection_replacement))
		.then(success => {
			var curr_num_lines = editor_instance.document.lineCount - 1;
			var delta_num_lines = curr_num_lines - init_num_lines;
			var end_line = init_line + delta_num_lines;
			var newPosition = position.with(end_line, editor_instance.document.lineAt(end_line).range.end.character);
			var newSelection = new vscode.Selection(newPosition, newPosition);
			editor_instance.selection = newSelection;
		});
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

function fv_get_contributes(editor, package_obj, eol) {
	var fs = require('fs');
	var contributes_str = "";
	var contributes_desc = "";
	var extension_path = vscode.extensions.getExtension(package_obj.publisher + "." + package_obj.name).extensionPath;

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
		contributes_str += "### " + p.camelToLabel() + eol + "* " + contributes_desc + eol + eol + "> `" + p + "` [type: `" + contributes_conf_obj[p].type + "`] " + eol + "---" + eol;
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

	shortcuts_str += eol + "## Shortcuts Reference" + eol + eol;
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
	var assembler_ra = {
		"app_name": package_obj.displayName,
		"app_version": package_obj.version,
		"app_description": package_obj.description,
		"contents": contents_str,

	};

	var fs_item_time = new Date();
	var filename_readme = "README.md";
	var filename_changelog = "CHANGELOG.md";

	var file_readme_full_path = extension_path + "\\" + filename_readme;
	var file_changelog_full_path = extension_path + "\\" + filename_changelog;
	var file_master_readme = extension_path + "\\" + glob_env.paths.master + glob_env.master_files.readme;
	var file_master_changelog = extension_path + "\\" + glob_env.paths.master + glob_env.master_files.changelog;
	var file_master_readme_contents = read_extension_file(fs, file_master_readme);
	var file_master_changelog_contents = read_extension_file(fs, file_master_changelog);

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
	assembler_ra.whats_new = whats_new;

	readme_md += common_headers_md + file_master_readme_contents + eol;

	for (var i in assembler_ra) {
		readme_md = readme_md.replace(new RegExp("\{" + i + "\}", "gim"), assembler_ra[i]);
		changelog_md = changelog_md.replace(new RegExp("\{" + i + "\}", "gim"), assembler_ra[i]);
	}

	readme_md = readme_md.replace(new RegExp("(" + dollar_ph + ")", "gim"), "$");
	//console.log(readme_md + eol + "----------------------------------------###############################################" + eol);
	fs.writeFileSync(file_readme_full_path, readme_md, "utf-8");
	fs.writeFileSync(file_changelog_full_path, changelog_md, "utf-8");
	console.log("*" + filename_readme + "* and *" + filename_changelog + "* have been generated correctly. Please check.");
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
		channels_obj[release_channel_ph] = prototype_string_lead(channels_ra.length, channel_id_fill_char);
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
	sorting_ids_ra = sorting_ids_ra.natsort();
	//console.log(sorting_ids_ra);
	var max_id = sorting_ids_ra.pop();
	var max_ver = sorting_obj[max_id];

	var max_ra_full = max_ver.split(chan_splitter);
	var max_obj = {};
	max_obj.max_version = max_ver;
	max_obj.max_number = String(max_ra_full[0]).split(num_splitter);
	max_obj.max_channel = [];
	if (max_ra_full.length == 2) {
		max_obj.max_channel = String(max_ra_full[1]).split(num_splitter);
	}
	return max_obj;
}

function fv_versioning(registered_command, root_item, semver_boss_command, step_value, bool_autosave) {
	// @ts-ignore
	var vz = 0;
	var eol = "\r\n";
	var space_char = " ";
	var comma = ",";

	// ripeto il get config perchè forse, tenendolo fuori il sistema non aggiorna le variabili.
	var config_obj = get_config();
	// Impostazioni versione secondo https://semver.org/ : MAJOR.MINOR.PATCH
	if (typeof (step_value) == "undefined" || step_value == 0 || isNaN(Number(step_value)) || step_value == "") {
		step_value = 1;
	}
	step_value = Number(parseInt(step_value));
	var local_bool_autosave = config_obj.settings[root_item + ".settings.autoSaveAfterStepUp"];
	if (registered_command.indexOf("-autosave") >= 0) {
		bool_autosave = true;
	} else {
		bool_autosave = local_bool_autosave;
	}

	var editor = vscode.window.activeTextEditor;
	var ws = vscode.workspace;
	var done_msg = [];

	// @ts-ignore
	var package_obj = config_obj.package;
	//var defaults_obj = config_obj.defaults;
	var settings_obj = config_obj.settings;

	var channels_list = String(settings_obj[root_item + ".settings.setChannelsList"]).trim();
	channels_list = channels_list.replace(new RegExp("[\t ]+", "gim"), " ");
	channels_list = channels_list.replace(new RegExp("^([^a-z]+)", "gim"), "");
	channels_list = channels_list.replace(new RegExp("([^a-z]+)$", "gim"), "");
	channels_list = channels_list.replace(new RegExp("([^a-z]{2,})", "gim"), ",");
	var channels_ra = String(channels_list).split(comma);

	if (semver_boss_command == "getsettingshelp") {
		fv_get_contributes(editor, package_obj, eol);
	} else {

		var show_information_message = settings_obj[root_item + ".settings.showInformationMessage"];
		var show_warning_and_error_message = settings_obj[root_item + ".settings.showWarningAndErrorMessage"];
		// console.log(root_item, semver_boss_command);
		//console.log("Config");
		//console.log(config_obj);
		var default_quoting_char = settings_obj[root_item + ".settings.setDefaultQuotingCharForGeneratedCode"];
		var copyrights_header = settings_obj[root_item + ".settings.copyrights.header"];
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
				boundary_close_char = "!"
			} else {
				boundary_close_char = "/"
			};
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
				}
			}
		}

		var fv_begin = bounds_obj.fileVersion.begin;
		var fv_end = bounds_obj.fileVersion.end;
		var fn_begin = bounds_obj.fileName.begin;
		var fn_end = bounds_obj.fileName.end;
		var fb_begin = bounds_obj.fileBirth.begin;
		var fb_end = bounds_obj.fileBirth.end;
		var fmt_begin = bounds_obj.fileModificationTime.begin;
		var fmt_end = bounds_obj.fileModificationTime.end;
		var cr_begin = bounds_obj.copyrights.begin;
		var cr_end = bounds_obj.copyrights.end;
		var lic_begin = bounds_obj.licenses.begin;
		var lic_end = bounds_obj.licenses.end;
		var lic_url_begin = bounds_obj.licensesUrl.begin;
		var lic_url_end = bounds_obj.licensesUrl.end;
		var lic_clar_begin = bounds_obj.licensesClarification.begin;
		var lic_clar_end = bounds_obj.licensesClarification.end;
		var licenses_boundaries_ra = Array([lic_begin, lic_end], [lic_url_begin, lic_url_end], [lic_clar_begin, lic_clar_end]);

		var sections_header_separator_chars = settings_obj[root_item + ".settings.copyrights.sectionSeparatorChars"];
		var licenses_default_pattern_url = settings_obj[root_item + ".settings.copyrights.setLicensesPatternUrl"];
		var licenses_list = String(settings_obj[root_item + ".settings.copyrights.setLicensesList"]).trim();
		licenses_list = licenses_list.replace(new RegExp("[\t ]+", "gim"), " ");

		var licenses_default_clarification = String(settings_obj[root_item + ".settings.copyrights.setLicensesDefaultClarification"]).trim();
		var licenses_list_ra = licenses_list.split(comma);
		var licenses_ra = [];
		var licenses_obj = {};
		var licenses_list_ra_i = [];
		var lic_name = "",
			lic_name_id = "",
			lic_clar = "",
			lic_url = "";

		//console.log(licenses_list_ra);

		for (var i in licenses_list_ra) {
			licenses_list_ra_i = (String(licenses_list_ra[i]).trim()).split("|");
			//console.log(licenses_list_ra_i);
			typeof (licenses_list_ra_i[0]) != "undefined" && licenses_list_ra_i[0] != "" ? lic_name_id = String(licenses_list_ra_i[0]).setLicenseID() : lic_name_id = "";
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
		for (const i in settings_obj) {
			copyrights_item_label = String(i);
			if (copyrights_item_label.indexOf(root_item + ".copyrights.") >= 0) {
				copyrights_item_label = (copyrights_item_label.split(".")).pop();
				copyrights_item_label = copyrights_item_label.camelToLabel();
				copyrights_item_value = String(settings_obj[i]).trim();
				copyrights_tmp_ra.push([copyrights_item_label.trim(), copyrights_item_value.trim(), i]);
			}
		}

		// (|\-((rc|beta|alpha)(|\.(\d+))))
		// var re_semver = "([0-9\.]+)(|\-(([a-z]+)(|\.[0-9]+)))";
		var semver_use_channels_strict_match = settings_obj[root_item + ".settings.versionUseChannelsStrictMatch"];
		var semver_channles_match_string_re = "([a-z]{1,256}";
		if (semver_use_channels_strict_match) {
			semver_channles_match_string_re = channels_ra.join("|");
		}
		var re_semver = "([0-9]+\.[0-9]+\.[0-9]+)(|\-(" + semver_channles_match_string_re + ")(|\.[0-9]+)))";
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


		var re_semver_full = fv_begin + "([" + eol + "\t ]*)" + re_semver + "([" + eol + "\t ]*)" + fv_end;
		var re_semver_extended_enclosers = "(\"|\')";
		// questo sistema usa la backreference per fare in modo che solo la stringa fra due caratteri identici fra quelli in re_semver_extended_enclosers poss aessre considerata
		var re_semver_extended_full = re_semver_extended_enclosers + re_semver + "(\\1)";

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
		// @ts-ignore
		var filename_full_path = editor.document.fileName;

		var file_stats_obj = fs.statSync(filename_full_path);
		var filename = filename_full_path;
		filename = filename.replace(ws.rootPath, "").slice(1);
		filename = filename.replace(new RegExp("[\\\\]+", "gim"), "/");
		var filename_basename = filename.split("/").pop();

		var filename_ext = String(filename_full_path.split(".").pop()).toLowerCase();
		var comments_block_open_default = "/*";
		var comments_block_close_default = comments_block_open_default.flip();
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
				comments_block_close = comments_block_open.flip();
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
		editor.selection = new vscode.Selection(position, position);
		var selection = editor.selection;
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
		var first_ver_full = fv_begin + space_char + first_ver + space_char + fv_end;
		// inizializzo position per l'eliminazione della selezione dopo alcune operazioni
		var position = editor.selection.end;
		var selection_to_replace, selection_replacement = "";
		var j_count = 0;
		var new_ver_full = "";
		var copyrights_infos_json_str = "";

		// var i = 0;
		var re_semver_bounds_replacers = "";
		re_semver_bounds_replacers += "((" + fv_begin + "|" + fv_end + ")";
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
		var max_ra = max_obj.max_number;
		var max_channel_ra = max_obj.max_channel;

		var curr_ver_ra = max_ra;

		// il seguente sistema è in accordo con le direttive "semver.org"
		var new_ver_ra = curr_ver_ra;
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
					done_msg.push(["warning", channel_alias + " cannot get channel version!"]);
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
					//TODO: Verificare se sia opportuno inserire un reset_child_on_step_up apposito per il subchannel
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
					new_ver_ra[2] < 0 ? new_ver_ra[2] = 0 : vz;
					// se il sistema raggiunge il limite...
					if (patch_version_limit <= 0 || (patch_version_limit > 0 && new_ver_ra[2] <= patch_version_limit)) {
						break;
					} else {
						new_ver_ra[2] = 0;
					}

					case "minor":
						var minor_version_limit = settings_obj[root_item + ".settings.nonStandard.stepUpMajorVersionOnMinorVersionLimitReach"];
						new_ver_ra[1] = new_ver_ra[1] * 1 + step_value;
						// per step down
						new_ver_ra[1] < 0 ? new_ver_ra[1] = 0 : vz;
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
						}
						case "major":
							new_ver_ra[0] = new_ver_ra[0] * 1 + step_value;
							// per step down
							new_ver_ra[0] < 0 ? new_ver_ra[0] = 0 : vz;
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

		new_ver_full = fv_begin + space_char + new_ver + space_char + fv_end;
		new_ver_full = new_ver_full.replace(new RegExp("[\t ]{2,}", "gim"), space_char);



		//console.log(new_ver);

		//}


		if (semver_boss_command == "boundversion" || semver_boss_command == "nakedversion" || semver_boss_command == "bannedversion") {

			if (semver_boss_command == "boundversion") {
				new_ver = new_ver_full;
			} else if (semver_boss_command == "nakedversion") {
				var bool_use_quotes_on_naked_version = settings_obj[root_item + ".settings.insertQuotesWithFileVersion"];
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

			fv_write_in_editor(editor, selection, new_ver);
		}
		if (semver_boss_command == "licenses") {
			var old_licenses_id = "";
			if (licenses_match_ra != null) {
				old_licenses_id = String(licenses_match_ra[0]).replace(new RegExp("(" + lic_begin + "([\t ]*)|([\t ]*)" + lic_end + ")", "gim"), "");
				old_licenses_id = old_licenses_id.setLicenseID();
				//console.log("1 " + old_licenses_id);
			}
			if (old_licenses_id.length == 0 || old_licenses_id == "" || typeof (licenses_obj[old_licenses_id]) == "undefined") {
				new_license_str = licenses_ra[0][0];
			} else {
				if (typeof (licenses_obj[old_licenses_id]) != "undefined") {
					license_id = licenses_obj[old_licenses_id];
				} else {
					license_id = Object.values(licenses_obj)[0];
				}
				license_id = license_id * 1 + step_value;
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
			var variable_name_id = "setVariableNameForCopyrightsInfosAssociativeArray";
			var variable_name = String(settings_obj[root_item + ".settings." + variable_name_id]).trim();

			var bool_planguage_is_defined = false;

			switch (filename_ext) {
				case "php":
					if (variable_name.charAt(0) != "$") {
						variable_name = "$" + variable_name;
					}
					operator_open = variable_name + " = Array(";
					operator_close = ");";
					operator_assign = "=>";
					bool_planguage_is_defined = true;
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
			var copyrights_infos_json_str = "";
			var copyrights_infos_json_str_items = "";
			var copyrights_for_json_ra = [];
			var cj_id = "";
			var cj_label = "";
			var cj_license_id = 0;
			copyrights_for_json_ra = copyrights_tmp_ra;

			if (licenses_match_ra != null) {
				cj_id = "license";
				cj_label = String(licenses_match_ra[0]);
				copyrights_for_json_ra.push([cj_id.camelToLabel(), cj_label, cj_id]);
				typeof (licenses_ra[cj_license_id]) == "undefined" ? cj_license_id = 0: vz;
				if (typeof (licenses_ra[cj_license_id][1]) != "undefined") {
					cj_id = "licenseUrl";
					//copyrights_for_json_ra.push([cj_id.camelToLabel(), lic_url_begin + space_char + licenses_ra[cj_license_id][1] + space_char + lic_url_end, cj_id]);
				}

				if (typeof (licenses_ra[cj_license_id][2]) != "undefined") {
					cj_id = "licenseClarification";
					copyrights_for_json_ra.push([cj_id.camelToLabel(), lic_clar_begin + space_char + licenses_ra[cj_license_id][2] + space_char + lic_clar_end, cj_id]);
				}
			}

			for (var i in copyrights_for_json_ra) {
				copyrights_infos_json_obj[String(copyrights_for_json_ra[i][2]).split(".").pop()] = copyrights_for_json_ra[i][1];
				copyrights_infos_json_str_items += "\t" + operator_quotes + String(copyrights_for_json_ra[i][2]).split(".").pop() + operator_quotes + operator_assign + operator_quotes + copyrights_for_json_ra[i][1] + operator_quotes + "," + eol;
			}

			var file_version_value = first_ver_full;
			var file_version_var_name = "fileVersion";

			if (new_ver != "") {
				file_version_value = fv_begin + space_char + new_ver + space_char + fv_end;
			}

			if (bool_planguage_is_defined) {
				copyrights_infos_json_str += operator_open + eol;
				copyrights_infos_json_str += copyrights_infos_json_str_items;
				copyrights_infos_json_str += "\t" + operator_quotes + file_version_var_name + operator_quotes + operator_assign + operator_quotes + file_version_value + operator_quotes + comma + eol;
				copyrights_infos_json_str += operator_close + eol;
			} else {
				// in caso non sia definito il linguaggio di programmazione, l'array viene trasformato in stringa JSON
				copyrights_infos_json_obj[file_version_var_name] = file_version_value;
				copyrights_infos_json_str = JSON.stringify(JSON.stringify(copyrights_infos_json_obj));
			}

			//console.log(copyrights_infos_json_str);
			var selection_replacement = copyrights_infos_json_str;
			var check_if_vnfc_exists = settings_obj[root_item + ".settings.checkIfVariableNameForCopyrightsInfosAssociativeArrayExists"];
			var variable_name_regex_escaped = variable_name.regexEscaped();

			//console.log(variable_name_regex_escaped);
			if (editor_contents_str.match(new RegExp(variable_name_regex_escaped + "([\t ]*)\=", "gim")) == null || !check_if_vnfc_exists) {
				done_msg.push(["information", "Copyrights Infos Array done."]);
				fv_write_in_editor(editor, selection, selection_replacement);
			} else {
				done_msg.push(["warning", "Copyrights Infos Array \"" + variable_name + "\" seems to be already present in your code. Please delete them or check conflicts in your code with variable name \"" + variable_name + "\" in \"Settings / " + package_obj.displayName + " / " + variable_name_id.camelToLabel() + "\" to be able to update them."]);
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
			copyrights_top_bottom_row = copyrights_top_bottom_row_half + copyrights_top_bottom_row_half.flip();
			// elimino 2 tronconi uguali a destra e sinistra (se dispari 1 a sx e 2 char a dx);
			copyrights_top_bottom_row = copyrights_top_bottom_row.substring(Math.floor(copyrights_top_bottom_row_delta_len / 2), copyrights_top_bottom_row.length - Math.ceil(copyrights_top_bottom_row_delta_len / 2));
			// tronco gli ulteriori caratteri extra copyrights_row_max_len
			copyrights_top_bottom_row = copyrights_top_bottom_row.substr(0, copyrights_row_max_len);

			var copyrights_fill_row = new Array(Math.round(copyrights_row_max_len / copyrights_fill_chars.length)).join(copyrights_fill_chars);
			copyrights_fill_row += copyrights_fill_row.substr(0, copyrights_row_max_len - copyrights_fill_row.length);
			copyrights_fill_row = copyrights_left_and_right_frame_char + copyrights_fill_row.substr(0, copyrights_fill_row.length - 2 * copyrights_left_and_right_frame_char.length) + copyrights_left_and_right_frame_char.flip();

			var copyrights_ra = [];
			var copyrights_owner = "";
			var copyrights_copyrightsOwner = settings_obj[root_item + ".settings." + semver_boss_command + ".owner"];
			var copyrights_authorsNames = settings_obj[root_item + "." + semver_boss_command + ".authorsNames"];
			var copyrights_authorCompany = settings_obj[root_item + "." + semver_boss_command + ".companyName"];

			if (copyrights_authorsNames == "undefined") {
				copyrights_authorsNames = "WARNING! No " + semver_boss_command + " author owner set!";
			}
			if (copyrights_authorCompany == "undefined") {
				copyrights_authorCompany = "WARNING! No " + semver_boss_command + " company owner set!";
			}
			var copyrights_copyrightsOwner_ID = Number(parseInt(copyrights_copyrightsOwner));
			// console.log(copyrights_copyrightsOwner);
			switch (copyrights_copyrightsOwner_ID) {
				case 0:
					copyrights_owner = copyrights_authorsNames;
					break;
				case 1:
					copyrights_owner = copyrights_authorCompany;
					break;
				case 2:
					copyrights_owner = copyrights_authorsNames + "," + copyrights_authorCompany;
					break;
				case 3:
					copyrights_owner = copyrights_authorCompany + "," + copyrights_authorsNames;
					break;
				default:
					copyrights_owner = copyrights_authorsNames;
					break;
			}

			settings_obj[root_item + "." + semver_boss_command + ".copyright"] = copyrights_owner + ",© All rights reserved.";
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
			for (var i in licenses_default_ra) {
				licenses_default_ra[i] = licenses_boundaries_ra[i][0] + space_char + licenses_default_ra[i] + space_char + licenses_boundaries_ra[i][1];
			}
			settings_obj.added_infos.license = licenses_default_ra;

			settings_obj.added_infos.fileVersion = new_ver_full;
			var added_infos_str = "",
				ai_value = "";

			copyrights_tmp_ra.unshift([copyrights_header.trim(), "@header", ""]);

			copyrights_tmp_ra.push(["", "@sep", ""]);
			copyrights_tmp_ra.push([file_and_licenses_infos_header.trim(), "@header", ""]);

			for (var i in settings_obj.added_infos) {
				ai_value = settings_obj.added_infos[i];
				if (typeof (ai_value) == "object") {
					for (var j in ai_value) {
						if (ai_value[j] == "") {
							ai_value.splice(j, 1);
						}
					}
				}
				typeof (ai_value) == "object" ? ai_value = ai_value.join(comma): vz = 0;
				copyrights_tmp_ra.push([(String(i).camelToLabel()).trim(), ai_value, ""]);
			}

			for (const i in copyrights_tmp_ra) {
				copyrights_item_label = copyrights_tmp_ra[i][0];
				copyrights_item_value = String(copyrights_tmp_ra[i][1]).trim();

				if (copyrights_item_value != "" && copyrights_item_value != null) {
					copyrights_item_ra = copyrights_item_value.split(comma);
					j_count = 0;
					for (var j in copyrights_item_ra) {
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
			for (const i in copyrights_ra) {
				var boundary_match_ra = String(copyrights_ra[i].join(" ")).match(new RegExp("(" + fv_begin + "|" + fn_begin + "|" + lic_begin + "|" + lic_url_begin + "|" + lic_clar_begin + "|" + fv_end + "|" + fn_end + "|" + lic_end + "|" + lic_url_end + "|" + lic_clar_end + ")", "gim"));
				bool_leave_open_row = false;
				if (boundary_match_ra != null) {
					bool_leave_open_row = true;
				}
				copyrights_str += fv_row_fill(copyrights_ra[i][0], copyrights_ra[i][1], copyrights_fill_row, copyrights_fill_chars, copyrights_label_value_separator_char, copyrights_max_label_len, copyrights_max_value_len, copyrights_top_and_bottom_frame_char, copyrights_left_and_right_frame_char, space_char, sections_header_separator_chars, bool_leave_open_row, eol);
			}

			if (added_infos_str != "") {
				copyrights_str += added_infos_str;
			}
			var copyrigths_extension_author_credits_str = "";
			if (settings_obj[root_item + ".settings." + semver_boss_command + ".insertExtensionAuthorCredits"]) {
				//console.log(defaults_obj);
				var versionboss_author_copyrights_label = space_char + "VSCode Extension: " + package_obj.displayName + space_char;
				//versionboss_author_copyrights_label +=  + "by" + space_char + package_obj.author.name + space_char;
				var versionboss_author_copyrights_value = "";
				var copyrigths_extension_author_credits_non_empty_left_right_char = "-";
				var copyrigths_extension_author_credits_to_fill = copyrights_top_bottom_row;
				var add_left_frame_char = "";
				if (copyrights_left_and_right_frame_char == "") {
					add_left_frame_char = left_frame_first_char + space_char;

				}
				copyrigths_extension_author_credits_str = fv_row_fill(versionboss_author_copyrights_label, versionboss_author_copyrights_value, copyrigths_extension_author_credits_to_fill, copyrights_fill_chars, copyrights_label_value_separator_char, versionboss_author_copyrights_label.length, versionboss_author_copyrights_value.length, copyrights_top_and_bottom_frame_char, copyrigths_extension_author_credits_non_empty_left_right_char, space_char, sections_header_separator_chars, false, eol);
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
				copyrights_str_full = comments_block_open + eol + copyrights_str_full + comments_block_close + eol + eol + eol;
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
							var tag_init = lang_match_ra[0];
							var tag_end = tag_init.replace(new RegExp("[a-z\<\>]+", "gim"), "");
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
				done_msg.push(["information", "Copyrights Infos added."]);
			} else {
				done_msg.push(["warning", "Copyrights Infos already entered. Please delete them to be able to update them. Please delete them to be able to update them."]);
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


		if (semver_boss_command != "copyrights" && semver_boss_command != "licenses" && semver_boss_command != "getinfosarray") {
			if (semver_match_ra != null) {
				editor_contents_str = editor_contents_str.replace(new RegExp(re_semver_full, "gim"), new_ver_full);
				done_msg.push(["information", "File Version set to: " + new_ver]);
			}
			if (semver_extended_match_ra != null) {
				var regexp_mode = "gim";
				if (bool_semver_update_on_pattern_match_only_first) {
					regexp_mode = "i";
				}
				editor_contents_str = editor_contents_str.replace(new RegExp(re_semver_extended_full, regexp_mode), "$1" + new_ver + "$7");
			}
		}

		if (semver_boss_command == "licenses") {
			if (licenses_match_ra != null && new_license_str != "") {
				editor_contents_str = editor_contents_str.replace(new RegExp(re_licenses_full, "gim"), lic_begin + space_char + new_license_str + space_char + lic_end);
				editor_contents_str = editor_contents_str.replace(new RegExp(re_licenses_url_full, "gim"), lic_url_begin + space_char + licenses_ra[license_id][1] + space_char + lic_url_end);
				editor_contents_str = editor_contents_str.replace(new RegExp(re_licenses_clar_full, "gim"), lic_clar_begin + space_char + licenses_ra[license_id][2] + space_char + lic_clar_end);
				done_msg.push(["information", "Licenses set to: " + new_license_str]);
			}
		}
		//console.log("COMMAND 5: " + semver_boss_command);
		if (done_msg.length >= 1) {
			for (var i in done_msg) {
				if (done_msg[i][0].indexOf("err") == 0) {
					if (show_warning_and_error_message) {
						vscode.window.showErrorMessage(done_msg[i][1]);
					}
				} else if (done_msg[i][0].indexOf("warn") == 0) {
					if (show_warning_and_error_message) {
						vscode.window.showWarningMessage(done_msg[i][1]);
					}
				} else {
					if (show_information_message) {
						vscode.window.showInformationMessage(done_msg[i][1]);
					}
				}
			}
		}

		//console.log("COMMAND 6: " + semver_boss_command);
		if (semver_line_range == null) {
			var firstLine = editor.document.lineAt(0);
			var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
			var textRange = new vscode.Range(0,
				firstLine.range.start.character,
				editor.document.lineCount - 1,
				lastLine.range.end.character);
			selection_to_replace = textRange;
		} else {
			selection_to_replace = semver_line_range;
		}
		selection_replacement = editor_contents_str;
		fv_write_in_editor(editor, selection_to_replace, selection_replacement);
		//console.log(semver_boss_command);
		if (bool_autosave) {
			editor.document.save();
		}
		//vscode.window.showInformationMessage(editor_contents_str);
	}
}


function activate(context) {
	var config_obj = get_config();

	var root_items_ra = config_obj.roots;
	// poichè root_items_ra deve contenere solo 1 elemento (se ne contiene di più il sistema visualizza un errore)
	// imposto root_item come segue
	var root_item = root_items_ra[0];
	var local_step = 1;
	var local_command = "";
	var ae_ra = config_obj.package.activationEvents;
	var disp_ra = [];
	var str = "";
	var registered_command = "";

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

		str += "let disp_obj_" + i + " = vscode.commands.registerCommand('" + registered_command + "', function () { fv_versioning('" + registered_command + "','" + root_item + "', '" + local_command + "', " + local_step + ");});";
		disp_ra.push("disp_obj_" + i);

	}
	eval(str);
	context.subscriptions.push(disp_ra);
}
exports.activate = activate;

function deactivate() {}
module.exports = {
	activate,
	deactivate
}