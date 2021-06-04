<!-- RICORDATI: QUESTO FILE E' ASSEMBLATO DAL TUO SCRIPT - NON MODIFICARLO DA QUI -->
<!-- 2020/09/03 16:05:41.938 -->

[![Version](https://vsmarketplacebadge.apphb.com/version-short/nicola-granata.version-boss.svg?style=for-the-badge&colorA=FCAA33&colorB=3399CC)](https://vsmarketplacebadge.apphb.com/version-short/nicola-granata.version-boss.svg?style=for-the-badge&colorA=FCAA33&colorB=3399CC)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads-short/nicola-granata.version-boss.svg?style=for-the-badge&colorA=66BB33&colorB=AA66FC)](https://vsmarketplacebadge.apphb.com/downloads-short/nicola-granata.version-boss.svg?style=for-the-badge&colorA=66BB33&colorB=AA66FC)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/nicola-granata.version-boss.svg?style=for-the-badge&colorA=66AAFC&colorB=FC66AA)](https://vsmarketplacebadge.apphb.com/installs-short/nicola-granata.version-boss.svg?style=for-the-badge&colorA=66AAFC&colorB=FC66AA)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-short/nicola-granata.version-boss.svg?style=for-the-badge&colorA=AC3BAF&colorB=6AA69C)](https://vsmarketplacebadge.apphb.com/rating-short/nicola-granata.version-boss.svg?style=for-the-badge&colorA=AC3BAF&colorB=6AA69C)


# Table of contents
1.	[Version Boss & MonsterDoc - v. 1.4.64](#version-boss--monsterdoc---v-1464)<hr style="height:1px;border-width:0px;border-top-width:1px; border-top-style:dotted; position:relative;">
	1.	[Very Important Informations for **Upgrade**](#very-important-informations-for-upgrade)
		-	[Upgrade to **V. 1.4.0** and above: **PLEASE UPDATE YOUR SETTINGS**](#upgrade-to-v-140-and-above-please-update-your-settings)
		-	[Upgrade to **V. 1.2.0** and above: **PLEASE UPDATE YOUR SETTINGS**](#upgrade-to-v-120-and-above-please-update-your-settings)
	1.	[Features](#features)
	1.	[Release Notes for version 1.4.64](#release-notes-for-version-1464)
1.	[**Version Boss & MonsterDoc** Demo](#version-boss--monsterdoc-demo)<hr style="height:1px;border-width:0px;border-top-width:1px; border-top-style:dotted; position:relative;">
	1.	[Version Boss - for versioning files, classes and functions](#version-boss---for-versioning-files-classes-and-functions)
	1.	[MonsterDoc - PHPDoc / JSDoc / TypeDoc dockblock generator and Todo+ labeling](#monsterdoc---phpdoc-/-jsdoc-/-typedoc-dockblock-generator-and-todo-labeling)
		-	[Insert **Todo+** quick labels](#insert-todo-quick-labels)
		-	[Choose labels from Completion Items Dropdown Menu](#choose-labels-from-completion-items-dropdown-menu)
		-	[See PHPDoc / JSDoc / TypeDoc online help and documentation](#see-phpdoc-/-jsdoc-/-typedoc-online-help-and-documentation)
	1.	[Some recommendations before start using *Version Boss & MonsterDoc*](#some-recommendations-before-start-using-version-boss--monsterdoc)
	1.	[Quick Start](#quick-start)
	1.	[History](#history)
	1.	[Off-standard functions](#off-standard-functions)
1.	[Shortcuts Reference](#shortcuts-reference)<hr style="height:1px;border-width:0px;border-top-width:1px; border-top-style:dotted; position:relative;">
1.	[Settings](#settings)<hr style="height:1px;border-width:0px;border-top-width:1px; border-top-style:dotted; position:relative;">
	1.	[Requirements](#requirements)
	1.	[Known Issues](#known-issues)

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

# Version Boss & MonsterDoc - v. 1.4.64

Versioning and Documenting like a Boss - Semantic Versioner and PHPDoc / JSDoc / TypeDoc Document Blocks Generator and  [Todo+  by Fabio Spampinato](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus) Keywords for Scripting Languages: insert and update Version of file and of classes and functions (according to http://semver.org directives), insert Copyrights, Distribution License and generate Documentation for PHP / JavaScript and TypeScript Languages and add Todo+ Keywords using shortcuts.

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## Very Important Informations for **Upgrade**

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

### Upgrade to **V. 1.4.0** and above: **PLEASE UPDATE YOUR SETTINGS**
1. **Copyrights: Authors Names and Emails**: from version `1.4.0`,  thanks to the new contribution point `type=array`, *Copyrights: Authors Names* field and *Copyrights: Authors Emails* field in **Settings** are merged in `Copyrights: Authors And Emails`. See **Settings**  in-line help for more details.
1. **Copyrights: Licenses**: from version `1.4.0`, thanks to the new contribution point `"type"="array"`, the license string has <b>been</b> divided into an array for easy management of the licenses themselves. If you have customized these settings, remove them from `settings.json` and update them from **Settings** panel. I have tried to keep backwards compatibility, but I'm not sure it works.

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

### Upgrade to **V. 1.2.0** and above: **PLEASE UPDATE YOUR SETTINGS**
1. **Boundary structures in your scripts**: from version `1.2.0` was changed structure of boundaries from `<!#(.+)#!>` to `<!#(.+)>` and `</#(.+)#/>` to `</#(.+)>` (e.g.: `<!#FV#!>1.2.3456-beta.3</#FV#/>` to `<!#FV>1.2.3456-beta.3</#FV>`. Even all others boundaries are changed in this pattern!);
1. **Settings**: from version `1.2.0` was removed `Version Update On Pattern Match Only First` and  changed rule of `Version Update On Pattern Match` from `false` / `true` to `False` / `True` / `Only First Occurrence` (default: `False`);

---

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## Features

**Version Boss & MonsterDoc** is an extension to keep the versions of script files up to date according to the [semver.org](http://semver.org) directives (`Major.Minor.Patch-Channel.ChannelVersion` eg: `1.2.3456-beta.3`).

> Tip: I suggest you also use one of my [VSCode Themes](https://marketplace.visualstudio.com/search?term=publisher%3A%22Nicola%20Granata%22&target=VSCode&category=Themes&sortBy=Name)!

**Version Boss & MonsterDoc**, using shortcuts, can:
- Insert and Update (step-up and step-down) **File Version** and **Function / Class Version**;
- Insert **Todo+ Keywords** in docblock for [Todo+ by Fabio Spampinato](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus) (from **Version Boss & MonsterDoc** v. 1.4.0)
- Insert **PHP PHPDoc** / **JavaScript JSDoc** / **TypeScript TypeDoc** docblocks (from **Version Boss & MonsterDoc** v. 1.4.0)
- Insert **Copyrights** infos in multiline comments(1), `Licensing` and file stats as `file name`, `file creation` and `file modification` time;
- Insert **Copyrights** infos in **JavaScript Object** or **PHP Associative Array** and in **JSON stringified object** for all other languages;
- Easily switch between **Licenses** (and customize them in **Settings**);


> Tip: **Warning**: **Version Boss & MonsterDoc** was tested with **JavaScript** and **PHP** files but will be work on most of scripting languages: In *future versions*, I will try to refine the output for the various programming languages.

---
<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## Release Notes for version 1.4.64

> Note: [`Development`] sections in *Changelog* are addressed to the developer to remind him of any important changes that occurred during the writing of the code and do not always concern improvements made to the extension or to the theme.

- [`Feature`] Added some options to optimize informations in Copyrigths Infos Array: now is possible to insert Main Author and its E-mail address in two seprate fields, is possible to add fileVersion and appName (see Settings of Version Boss & MonsterDoc), output of `Authors Names and E-mails` item is now an array;
- [`Settings`] **WARNING!** Changed some **Settings**: now several fields are an array of strings instead a complex string: **you must comment all `Version Boss & MonsterDoc` variables in `settings.ini` and set them from Settings Panel.**;
- [`Development`] Error Messages can be displayed in UI language of VScode (at this moment only `english` and `italian`).
- [`Feature`] Now `README.md` has `Table of Contents` automatically generated.
- [`Feature`] With PHPDoc / JSDoc / TypeDoc keyword `@version`, implemented the function for update standalone version with date and time in standard ISO notation (e.g. `@version 1.2.3456-beta.3 2020-03-16T18:55:55.951Z`);
- [`Development`] Now `version` keys in  `package.json` and `package-lock.json` are automatically aligned to the internal version;
- [`Development`] Now `README.md` and `CHANGELOG.md` are generated at activation of extension only when in `Debug Mode`, after pressing the first time any shortcut or launch any command;
- [`Feature`] Added PHPDoc / JSDoc / TypeDoc and [Todo+ by Fabio Spampinato](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus) Comments Generator.

See `Changelog` for previous versions.

---

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

# **Version Boss & MonsterDoc** Demo

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## Version Boss - for versioning files, classes and functions
![Version Boss & MonsterDoc Demo](./_gfx/version-boss-demo-00.gif)

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## MonsterDoc - PHPDoc / JSDoc / TypeDoc dockblock generator and Todo+ labeling

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

### Insert **Todo+** quick labels
Quick labels are first two keywords in `Monsterdoc Todo Plus Dockblock Keywords` settings.
1. position the cursor in an empty row and press the shortcut `CTRL+ALT+SHIFT+D` or `CTRL+ALT+SHIFT+F` (alternative mode) to create an empty dockbloc
1. press `CTRL+ALT+SHIFT+D` again  to add first keyword (default: `todo`) or `CTRL+ALT+SHIFT+F` to add second keyword (default: `fixme`);
1. just press `CTRL+ALT+SHIFT+D` or `CTRL+ALT+SHIFT+F` repeatedly, scroll between the two keywords (replaces the keyword without clear following text).

	[-- Monsterdoc demo here --]
	[-- Monsterdoc demo here --]
	[-- Monsterdoc demo here --]

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

### Choose labels from Completion Items Dropdown Menu

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

### See PHPDoc / JSDoc / TypeDoc online help and documentation

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## Some recommendations before start using *Version Boss & MonsterDoc*

The extension is almost entirely customizable (`1`), at least until sufficient feedback is available to eliminate unnecessary customizables settings.
It is good to leave the default settings, except for that which may cause conflicts with your code, and customize only:

- Try one of my [VSCode Themes](https://marketplace.visualstudio.com/search?term=publisher%3A%22Nicola%20Granata%22&target=VSCode&category=Themes&sortBy=Name)!
- Version Boss & MonsterDoc »  Copyrights » *[all settings for this group]*.

Consider also setting :
- Version Boss & MonsterDoc »  Settings »  Set Variable Name For Copyrights Infos Associative Array;
- Version Boss & MonsterDoc »  Settings »  Auto Save After Step Up;
- Version Boss & MonsterDoc »  Settings »  Show Information Message;
- Version Boss & MonsterDoc »  Settings »  Copyrights »  Owner (can be Author, Company or both);
- Version Boss & MonsterDoc »  Settings »  Copyrights »  Set Licenses List (set the list of licenses, placing the one you use most in the first place);
- Version Boss & MonsterDoc »  Settings »  Semver Update On Pattern Match (`2`);

---

Notes:

1. Better to prepare all the options before an active development, to be aware of possible conflicts.

2. *Semver Update On Pattern Match* can recognize any pattern similar to "`Major.Minor.Patch[-Channel[.ChannelVersion]]`" (eg: `1.2.3456-beta.3`) enclosed in pair double-quote `"` or pair single-quote `'` (without spaces in between).
If you plan to use similar pattern in portion of your code, this may be in conflict with **Version Boss & MonsterDoc** pattern recognition. In this case you can (one of them):
	1. ~~limit step only to first occurence (*Settings » Semver » Update On Pattern Match Only First*: `true`)~~ limit step only to first occurence (*Settings » Semver » Update On Pattern Match*: `Only First Occurrency`);
	2. in your string  add `#` or `any non digit char` as first char (eg: `1.2.3456-beta.3` -> `#1.2.3456-beta.3`, useful if you maintain track of features/bug fixes in comments to code);
	3. disable *Version Boss & MonsterDoc »  Settings »  Semver Update On Pattern Match*.

---

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## Quick Start

> TIP 1: Make a Variable `version=""` in your file and assign version by press `CTRL+ALT+SHIFT+B` (version number with boundaries).

> Tip 2: With  `CTRL+ALT+SHIFT+S` you can step-up Patch version and save the file at the same time. See `Contributions` for other **Version Boss & MonsterDoc** shortcuts.

> Tip 3: if you want to save file at step-up/step-down whenever you change any of the `Major/Minor/Patch/Channel/ChannelVersion` enable *Version Boss & MonsterDoc »  Settings »  Auto Save After Step Up*.

> Tip 4: if you use multiple instances of the file version group, when you update the version, all instances will be updated with the highest value found between them.

> Tip 5: by set `Version Update On Pattern Match` you can versioning even functions (with `False`, from first instance of version string, with `Only First Occurrence` enabled, from second instance of version string). To update them, move cursor to line with function version. `Warning`: if you store multiple version strings (not in boundaries) in same line, only first string after cursor position will be updated. If there is only one semver matching string in line, cursor position don't affect step-up/down: the string will be updated anyway. With `False`, all strings that match semver pattern enclosed in quotes can be updated individually.  With `Only First Occurrence` enabled, the first string without boundaries will be aligned to file version. From second string that match semver pattern, update will be only if you move cursor in line. Form **Version Boss & MonsterDoc** v. `1.2.9`, is possible to step version with leading `^` (e.g. `"^1.35.0"`).

---

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## History

I wrote the first draft for *Eclipse Monkey*, to help me manage the versioning of my JS and PHP scripts.
After updates to Eclipse, Monkey was no longer supported and was replaced by EASE. I used old versions of Eclipse for quite some time, so as not to abandon the convenience of automatic versioning.
Although I had subsequently started writing the code for EASE, I feared that what happened with Monkey would happen again and, consequently, I decided to do without the automatic versioning for a while (it was driving me crazy) until I have decided to abandon the slowness of Eclipse in favor of VSCode.

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## Off-standard functions

The first scripts for Monkey did not use the SemVer directives, simply because I used versioning for internal reference, so I implemented the Minor Version increase on passing the Patch Version `99`, and the Major Version on passing the Minor Version `99`.
It was not implemented not even the use of the channel. Since, personally, I found this method comfortable, although not correct, I decided to add the possibility to choose whether or not to use the step-up of the echelon after reaching threshold(`1`) for the current echelon (e.g. limit:`1000` -> from `Patch 999` to `Patch 1000` step-up Minor Version of `+1` and set Patch version to `0`) and to be `able to set the limit to be reached before carrying out the progress of the next echelon` for `each echelon` (eg. limit for Minor Version before step-up Major Version set to `100`, and limit for Patch Version to step-up `+1` Minor Version set to `1000`).
The use of this function is strongly discouraged after the release of the first public version of ypur app, but as long as you manage your scripts yourself, I don't think anyone can hurt you. Other non-standard functions are the `step-downs` for each echelon.

---

Notes:

1. In step-down mode, for security reasons, the levels are always independent of the limits.

---



<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

# Shortcuts Reference

|Command Palette|Windows|Mac|
|---|---|---|
| *Version Boss*: Version Boss - Patch - insert or step-up and save (autosave ever enabled) | `CTRL+ALT+SHIFT+S` | `CTRL+OPTION+SHIFT+S` |
| *Version Boss*: Version Boss - Channel Ver. - insert or step-up | `CTRL+ALT+SHIFT+T` | `CTRL+OPTION+SHIFT+T` |
| *Version Boss*: Version Boss - Channel - insert or step-up | `CTRL+ALT+SHIFT+R` | `CTRL+OPTION+SHIFT+R` |
| *Version Boss*: Version Boss - Patch - insert or step-up | `CTRL+ALT+SHIFT+E` | `CTRL+OPTION+SHIFT+E` |
| *Version Boss*: Version Boss - Minor - insert or step-up | `CTRL+ALT+SHIFT+W` | `CTRL+OPTION+SHIFT+W` |
| *Version Boss*: Version Boss - Major - insert or step-up | `CTRL+ALT+SHIFT+Q` | `CTRL+OPTION+SHIFT+Q` |
| *Version Boss*: Version Boss - Channel Ver. - insert or step-down | `CTRL+ALT+SHIFT+P` | `CTRL+OPTION+SHIFT+P` |
| *Version Boss*: Version Boss - Channel - insert or step-down | `CTRL+ALT+SHIFT+O` | `CTRL+OPTION+SHIFT+O` |
| *Version Boss*: Version Boss - Patch - insert or step-down | `CTRL+ALT+SHIFT+I` | `CTRL+OPTION+SHIFT+I` |
| *Version Boss*: Version Boss - Minor - insert or step-down | `CTRL+ALT+SHIFT+U` | `CTRL+OPTION+SHIFT+U` |
| *Version Boss*: Version Boss - Major - insert or step-down | `CTRL+ALT+SHIFT+Y` | `CTRL+OPTION+SHIFT+Y` |
| *Version Boss*: Version Boss - Align all version numbers to max version number without step-up/down | `CTRL+ALT+SHIFT+A` | `CTRL+OPTION+SHIFT+A` |
| *Version Boss*: Version Boss - Force insert version, with boundaries, at caret position | `CTRL+ALT+SHIFT+B` | `CTRL+OPTION+SHIFT+B` |
| *Version Boss*: Version Boss - Force insert version, without boundaries, at caret position | `CTRL+ALT+SHIFT+V` | `CTRL+OPTION+SHIFT+V` |
| *Version Boss*: Version Boss - Forces insert version, without boundaries, in the position of approach with the main ban of char (prevent the global passage up / down) | `CTRL+ALT+SHIFT+N` | `CTRL+OPTION+SHIFT+N` |
| *Version Boss*: Version Boss - Copyrights - insert or update | `CTRL+ALT+SHIFT+C` | `CTRL+OPTION+SHIFT+C` |
| *Version Boss*: Version Boss - License - insert or update | `CTRL+ALT+SHIFT+L` | `CTRL+OPTION+SHIFT+L` |
| *Version Boss*: Version Boss - Insert Copyrights Informations Array | `CTRL+ALT+SHIFT+J` | `CTRL+OPTION+SHIFT+J` |
| *MonsterDoc*: MonsterDoc - Document this! | `CTRL+ALT+SHIFT+D` | `CTRL+OPTION+SHIFT+D` |
| *MonsterDoc*: MonsterDoc - Generate Class / Function / Variables Documentation PHPDoc / JSDoc / TypeDoc (DocBlock inside) and Todo+ Comment (default @fixme) | `CTRL+ALT+SHIFT+F` | `CTRL+OPTION+SHIFT+F` |

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

# Settings

This extension contributes the following settings:

##### Version Boss »  Monsterdoc »  Monsterdoc Use Smart Tabbing
* For a correct docblock formatting, MonsterDoc pre-computes trailing-spaces after keywords (e.g. `@param`): if *Smart Tabbing* is set to `true`, MonsterDoc use only default and customized keywords to determine the maximum length for a keyword with trailing spaces string to optimize space between the keyword and the related parameter (e.g. `* @param` . . . `boolean`), otherwise use all registered keywords. In the latter case, the space between the keyword and the relative parameter can be greater.

> `versionBoss.monsterdoc.monsterdocUseSmartTabbing` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Insert All Authors In Documentation
* Insert `All Authors` listed in **Version Boss > Copyrights: Authors Names and Emails**. if `false`, only `Main Author` will be entered.

> `versionBoss.monsterdoc.insertAllAuthorsInDocumentation` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Docblock Inside Functions As Default
* Insert dockblock string outside (`false` - default) or inside (`true`) the body of the classes/functions with default shortcut and inside with alternative shortcut for MonsterDoc. If is set to `true`, default shortcut and alternative shortcut are inverted. Set to `true`, is a non-standard option, but it is useful when writing the code, in order to keep information about the function well anchored to the function itself.

> `versionBoss.monsterdoc.docblockInsideFunctionsAsDefault` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Docblock Grouped For Multiple Variables Selection As Default
* When you select multiple variables in multiple rows, each variable is commented just above here. With this value set to `true` all selected variables are commented in an single docblock above selection as default. If is set to `true`, default shortcut and alternative shortcut are inverted.

> `versionBoss.monsterdoc.docblockGroupedForMultipleVariablesSelectionAsDefault` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Add Empty Row Between Sections
* Add an empty row between Monsterdoc's sections.

> `versionBoss.monsterdoc.addEmptyRowBetweenSections` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Add Authors Infos
* Add `@author` in docblock string followed by `Main Author` Name and E-mail address stored in **Version Boss** settings.

`Main Author` is the first element listed in **Authors Names and Emails**.

> `versionBoss.monsterdoc.addAuthorsInfos` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Add Copyrights Infos
* Add `@copyrights` in docblock string followed by Copyrights Informations stored in **Version Boss** settings.

> `versionBoss.monsterdoc.addCopyrightsInfos` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Add Classes And Functions Access
* Add `@access` in docblock string. If not is possible to determine, by declaration the access type of function or class, default value for `@access` is `public`.

> `versionBoss.monsterdoc.addClassesAndFunctionsAccess` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Add Classes And Functions Version
* Add `@version` in docblock string. Version are set to the default version (e.g. `0.0.0`) followed by local date in ISO format (e.g. `2020-03-20T16:11:23.256Z`).

> `versionBoss.monsterdoc.addClassesAndFunctionsVersion` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Add Classes And Functions Inline Code Example
* Add `inline code example` in docblock string.

> `versionBoss.monsterdoc.addClassesAndFunctionsInlineCodeExample` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Add Classes And Functions Example
* Add first `@example` in docblock string.

> `versionBoss.monsterdoc.addClassesAndFunctionsExample` [type: `boolean`] 
---
##### Version Boss »  Monsterdoc »  Classes And Functions Examples Path
* Path for Monsterdoc examples (may be `url`, `absolute` or `relative` root path).

> `versionBoss.monsterdoc.classesAndFunctionsExamplesPath` [type: `string`] 
---
##### Version Boss »  Monsterdoc »  Classes And Functions Examples File Extension
* Extension for Monsterdoc examples. Name of file will be determined by function name.

> `versionBoss.monsterdoc.classesAndFunctionsExamplesFileExtension` [type: `string`] 
---
##### Version Boss »  Monsterdoc »  Monsterdoc Blocks Order
* Order of Blocks in PHPDoc / JSDoc / TypeDoc.

> `versionBoss.monsterdoc.monsterdocBlocksOrder` [type: `string`] 
---
##### Version Boss »  Monsterdoc »  Keywords To Add For Functions
* Append additional and custom keywords in docblock string for Functions.

> `versionBoss.monsterdoc.keywordsToAddForFunctions` [type: `array`] 
---
##### Version Boss »  Monsterdoc »  Keywords To Add For Classes
* Append additional and custom keywords in docblock string for Classes.

> `versionBoss.monsterdoc.keywordsToAddForClasses` [type: `array`] 
---
##### Version Boss »  Monsterdoc »  Keywords Suggestions Exclusions For PHPDoc
* Insert keywords to **remove** from Suggestions Provider for PHPDoc.

> Note 1: some keywords are used for the default dockblock generation and, even if present in the exclusion list, they will not be removed.

> Note 2: some keywords may be overwritten by another ***Doc's keywords and may be present in the list but, when filtering by language, they will not be displayed.

> `versionBoss.monsterdoc.keywordsSuggestionsExclusionsForPHPDoc` [type: `array`] 
---
##### Version Boss »  Monsterdoc »  Keywords Suggestions Exclusions For JSDoc
* Insert keywords to **remove** from Suggestions Provider for JSDoc.

> Note: some keywords are used for the default dockblock generation and, even if present in the exclusion list, they will not be removed.

> Note 2: some keywords may be overwritten by another ***Doc's keywords and may be present in the list but, when filtering by language, they will not be displayed.

> `versionBoss.monsterdoc.keywordsSuggestionsExclusionsForJSDoc` [type: `array`] 
---
##### Version Boss »  Monsterdoc »  Keywords Suggestions Exclusions For TYPEDoc
* Insert keywords to **remove** from Suggestions Provider for TypeDoc.

> Note: some keywords are used for the default dockblock generation and, even if present in the exclusion list, they will not be removed.

> Note 2: some keywords may be overwritten by another ***Doc's keywords and may be present in the list but, when filtering by language, they will not be displayed.

> `versionBoss.monsterdoc.keywordsSuggestionsExclusionsForTYPEDoc` [type: `array`] 
---
##### Version Boss »  Monsterdoc »  Keywords Suggestions For Todo Plus
* [Todo+ by Fabio Spampinato](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus) keywords (follow the link for more informations).

> Tip 1: the first character (wich is not visible in the suggestion list) makes the order in list:

1. if you use `@`, **Todo+** Keywords are sorted together with PHPDoc / JSDoc / TypeDoc keywords;

1. if you use `#`,  **Todo+** Keywords are placed at the top of the list; 

1. if you use `§`,  **Todo+** Keywords are placed at the bottom of the list;

> Tip 2: the first two keywords (by default `todo` and `fixme`) are used in quick dockblock creation on an empty row the second time you press the hotkey.

See `READMS.md` for more informations.

> Tip 3: if you wanto to add more keywords, remind to add same keywords in **Todo+** Settings (some RegEx fields).

> `versionBoss.monsterdoc.keywordsSuggestionsForTodoPlus` [type: `array`] 
---
##### Version Boss »  Monsterdoc »  Set Variables Prefixes And Suffixes
* PHPDoc / JSDoc / TypeDoc Variable Prefixes / Suffixes for easy recognition of type by name of variable  when you not (or can not) declare type of variables or related default value (from which to take the type in PHP < 7) in function declaration.

Prefixes must be placed at the begin (e.g. `bool_`is_open) and suffixes at the end of variable name (e.g. person`_array`).

> `Tip 1`: to determine if string is prefix or suffix use `_` (underscore) after string for prefix and before string for suffix. If you use `_` at begin and at end (e.g. `_bool_`), system search in variable name, but not at begin and not at the end of variable name.

> `Tip 2`: if you don't use `_` (underscore) in declaration, system try at begin, at middle and at end of string adding `_` (underscore) in search string:

- e.g. if you write "`boolean=bool,boolean`", system search for `bool_`, `_bool`, `_bool_`, `boolean_`, [...]

Follow the examples below (1st is the pattern).

1. `[type or custom type] = [suffix_or_prefix_1, suffix_or_prefix_2, ..., suffix_or_prefix_n]`;

1. `boolean = bool_, _bool` - `array = _ra, arr_`

> `versionBoss.monsterdoc.setVariablesPrefixesAndSuffixes` [type: `array`] 
---
##### Version Boss »  Monsterdoc »  Set Variables Types Monsterdoc Templates
* PHPDoc / JSDoc / TypeDoc Variable templates for Monsterdoc. These templates are added after `@param` (e.g. `@ param type variablename : [template for variable documentation]`).

Templates are first seearched by type and overryded if system find a template for prefix or suffix (e.g. `function somefunc(somevar_json){...}` » variable name `somevar_json` » type `string` but, by default settings, there is a template for `json` prefix/suffix » system use template for `json` prefix/suffix in Monsterdoc.

> `versionBoss.monsterdoc.setVariablesTypesMonsterdocTemplates` [type: `array`] 
---
##### Version Boss »  Settings »  Set Variable Name For Copyrights Infos Array
* Set the name of the default variable to insert the Copyrights Infos Array  into the code.

> `PHP Language Tip`: do not use the prefix **`$`**: it will be added automatically based on the programming language of the file (if inserted, will be ignored in PHP files but not in others programming languages). You can use an array item (e.g. `glob_env["copyrights_infos"]`).

`Warning`: because of complexity of programming languages, this field not use pattern matching to check malformed typing. Please, pay attention!

> `versionBoss.settings.setVariableNameForCopyrightsInfosArray` [type: `string`] 
---
##### Version Boss »  Settings »  Add App Name Variable In Copyrights Infos Array
* If not empty, adds App Name Variable in Copyrights Infos Array and values it with current Filename (dynamic).

> `versionBoss.settings.addAppNameVariableInCopyrightsInfosArray` [type: `string`] 
---
##### Version Boss »  Settings »  Add File Name Variable In Copyrights Infos Array
* If not empty, add current Filename in Copyrights Infos Array.

> `versionBoss.settings.addFileNameVariableInCopyrightsInfosArray` [type: `string`] 
---
##### Version Boss »  Settings »  File Name Php Variable In Copyrights Infos Array
* In PHP is possible to get filename using code.

> `Tip`: `static` adds static filename (no changes when uptdate file version), `dynamic` use *Version Boss* features to change filename when you update file version. Other methods uses PHP code. 

> `versionBoss.settings.fileNamePhpVariableInCopyrightsInfosArray` [type: `string`] 
---
##### Version Boss »  Settings »  Author Name Variable In Copyrights Infos Array
* If not empty, adds main Author Name Variable in Copyrights Infos Array and values it with current first name in `Authors Names and Emails`.

> `versionBoss.settings.authorNameVariableInCopyrightsInfosArray` [type: `string`] 
---
##### Version Boss »  Settings »  Author Email Variable In Copyrights Infos Array
* If not empty, adds main Author E-mail Variable in Copyrights Infos Array and values it with current first author email in `Authors Names and Emails`.

> `versionBoss.settings.authorEmailVariableInCopyrightsInfosArray` [type: `string`] 
---
##### Version Boss »  Settings »  Add File Version Variable In Copyrights Infos Array
* If not empty, add current File Version in Copyrights Infos Array.

> `versionBoss.settings.addFileVersionVariableInCopyrightsInfosArray` [type: `string`] 
---
##### Version Boss »  Settings »  Check If Variable Name For Copyrights Infos Array Exists
* Check if the Variable Name For Copyrights Storage already exists and prevents writing to avoid overrides.

When set to `false`, overrides are permitted (naturally you could change the variable name after insert).

> `versionBoss.settings.checkIfVariableNameForCopyrightsInfosArrayExists` [type: `boolean`] 
---
##### Version Boss »  Settings »  Set Default Quoting Char For Generated Code
* Set the default quoting char to insert generated code into your code (e.g. Copyrights Infos Array).

> `versionBoss.settings.setDefaultQuotingCharForGeneratedCode` [type: `string`] 
---
##### Version Boss »  Settings »  Version Use Channels Strict Match
* Enable the strict matching of channel part of semver string.

- `true`: only part of semver string matching the string of channels availabes in *Version Boss » Settings » Set Channels List* is recognized and updated

- `false`: any channel string in semver full pattern is recognized and fixed/updated (e.g. `<!#FV> 1.25.0-roadrunner.1 </#FV>` -> `<!#FV> 1.25.0-alpha.1</#FV>`)

> `versionBoss.settings.versionUseChannelsStrictMatch` [type: `boolean`] 
---
##### Version Boss »  Settings »  Version Update On Pattern Match
* Enable Version Update even without a boundaries. Version string must be enclosed in double-quote or single-quote.

`Warning`: this may conflict with your code if you use patterns similar to `Major.Minor.Patch [-Channel [.ChannelVersion]]` (e.g. `"1.0.0-alpha.2"`) for different purposes than file versioning. You can insert a symbol before first digit to prevent update of a specific matching string (eg. `1.23.45` -> `#1.23.45`).

Update only first occurrence of semver string enclosed in pair of double-quote or single-quote (e.g. "`1.23.45`") `in page` or `in line`.

On update semver if line where is caret position not match semver pattern, the first occurrence in page and all instances in boundaries (e.g. `<!#FV> 1.25.0-roadrunner.1 </#FV>`) are updated.

On update semver, if line where is caret position match semver pattern:

1. `once`: the occurrence is updated; 

2. `more than once`: only first occurrence **after caret position** is updated.

3. `more than once` but caret position after lastest match: to avoid unwanted update, no one occurrence is updated.

> `versionBoss.settings.versionUpdateOnPatternMatch` [type: `string`] 
---
##### Version Boss »  Settings »  Char For Banned Version
* Char for banned version for Changelog or for Function versioning (e.g. `#` -> `#1.23.45`).

> `versionBoss.settings.charForBannedVersion` [type: `string`] 
---
##### Version Boss »  Settings »  Auto Save After Step Up
* Save file after each step up.

> `versionBoss.settings.autoSaveAfterStepUp` [type: `boolean`] 
---
##### Version Boss »  Settings »  Insert Quotes With File Version
* Insert File Version (without boundaries) with o without quotes.

> `versionBoss.settings.insertQuotesWithFileVersion` [type: `boolean`] 
---
##### Version Boss »  Settings »  Set First Version
* Set Fisrt version to use when you start versioning `Major.Minor.Patch[-(any Channel[.(any ChannelVersion > 0)]]`

e.g.: `1.0.0`,`0.0.0`, `1.0.0-beta.1`.

> `versionBoss.settings.setFirstVersion` [type: `string`] 
---
##### Version Boss »  Settings »  Set Channels List
* Channels (except `Release` wich no have any abbreviation in semver.org directives - multiple data separated by comma `,`).

e.g. `alpha`, `beta`,[`...`], `RC`,`RTM`,`GA`, `RTW`.

`Warning 1`: only words with a-z chars and comma are valid values: the other symbols will be ignored.

> `versionBoss.settings.setChannelsList` [type: `string`] 
---
##### Version Boss »  Settings »  Show Information Message
* Show Information Message when action is done.

> `versionBoss.settings.showInformationMessage` [type: `boolean`] 
---
##### Version Boss »  Settings »  Show Warning And Error Message
* Show Warning and Errors Messages when action could not be done.

> `versionBoss.settings.showWarningAndErrorMessage` [type: `boolean`] 
---
##### Version Boss »  Settings »  Reset Childs On Step Up
* Set `0` to childs when step-up Minor or Major version.

e.g. `true`:
1. Step-up Major = `1.23.45` -> **`2.0.0`**;
2. Step-up Minor = `1.23.45` -> `1.`**`24.0`**;

e.g. `false`:
1. Step-up Major = `1.23.45` -> **`2`**`.23.45`;
2. Step-up Minor = `1.23.45` -> `1.`**`24`**`.45`.

> `versionBoss.settings.resetChildsOnStepUp` [type: `boolean`] 
---
##### Version Boss »  Settings »  Set Channel To Alpha On Major Version Step Up
* Set channel to `alpha` when step-up Major version.

e.g. `true`:
1. Step-up Major = `1.23.45-RC.3` -> **`2.0.0-alpha`**;

e.g. `false` :
1. Step-up Major = `1.23.45-RC.3` -> **`2.0.0`** (with `Reset Childs On Step Up ` set to `true`);
2. Step-up Major = `1.23.45-RC.3` -> **`2.0.0-RC.3`** (with `Reset Childs On Step Up ` set to `false`).

> `versionBoss.settings.setChannelToAlphaOnMajorVersionStepUp` [type: `boolean`] 
---
##### Version Boss »  Settings »  Non Standard »  Step Up Channel On Channel Version Limit Reach
* `Warning! - is not a standard`: Step Up Channel when Channel Version reach this limit (`0` for no step-up).

e.g. Version limit: `3`: Steping up Channel Version from `1.23.45-beta.3` to `1.23.45-beta.4` make  **`1.23.45-RC`**.

> `versionBoss.settings.nonStandard.stepUpChannelOnChannelVersionLimitReach` [type: `integer`] 
---
##### Version Boss »  Settings »  Non Standard »  Step Up Minor Version On Patch Version Limit Reach
* `Warning! - is not a standard`: Step Up Minor Version when Patch Version reach this limit (`0` for no step-up).

e.g. Version limit: `99`: Steping up Patch Version from `1.23.99` to `1.23.100` make  **`1.24.00`**.

> `versionBoss.settings.nonStandard.stepUpMinorVersionOnPatchVersionLimitReach` [type: `integer`] 
---
##### Version Boss »  Settings »  Non Standard »  Step Up Major Version On Minor Version Limit Reach
* `Warning! - is not a standard`: Step Up Major Version when Minor Version reach this limit (`0` for no step-up).

e.g. Version limit: `99`: Steping up Patch Version from `1.99.45` to `1.100.45` make  **`2.00.00`**.

> `versionBoss.settings.nonStandard.stepUpMajorVersionOnMinorVersionLimitReach` [type: `integer`] 
---
##### Version Boss »  Boundaries »  Tag Enclosers
* Chars which enclose the boundary.

e.g. `<` and `>` in `<!#FV>`1.23.45`</#FV>`.

> `versionBoss.boundaries.tagEnclosers` [type: `string`] 
---
##### Version Boss »  Boundaries »  Boundary Identity Char
* Symbol which set the identity of open/close boundary (e.g. `#` in `<!#FV>`).

> `versionBoss.boundaries.boundaryIdentityChar` [type: `string`] 
---
##### Version Boss »  Boundaries »  Boundary Open Char
* Symbol which set open boundary (set to `not equal` to Boundary Close Char, or it will be substituted with another one, e.g. `!` in  `<!#FV>`).

> `versionBoss.boundaries.boundaryOpenChar` [type: `string`] 
---
##### Version Boss »  Boundaries »  Boundary Close Char
* Symbol which set close boundary (set to `not equal` to Boundary Open Char, or it will be substituted with another one, e.g. `/` in `</#FV>`).

> `versionBoss.boundaries.boundaryCloseChar` [type: `string`] 
---
##### Version Boss »  Boundaries »  Data String IDs »  File Name
* String to recognize and update or insert Filename boundaries and values.

> `versionBoss.boundaries.dataStringIDs.fileName` [type: `string`] 
---
##### Version Boss »  Boundaries »  Data String IDs »  File Birth
* String to recognize and update or insert File Birth boundaries and values.

> `versionBoss.boundaries.dataStringIDs.fileBirth` [type: `string`] 
---
##### Version Boss »  Boundaries »  Data String IDs »  File Version
* String to recognize and update or insert File Version boundaries and values.

> `versionBoss.boundaries.dataStringIDs.fileVersion` [type: `string`] 
---
##### Version Boss »  Boundaries »  Data String IDs »  File Modification Time
* String to recognize and update or insert File Modification Time boundaries and values.

> `versionBoss.boundaries.dataStringIDs.fileModificationTime` [type: `string`] 
---
##### Version Boss »  Boundaries »  Data String IDs »  Copyrights
* String to recognize or insert File Copyrights boundaries and values.

***Note***:

for preserve data manually inserted in Copyrights block, system prevent to update it accidentally by pressing shortcuts. You have to delete the Copyrigths block to inserert new data (at least, if you want to leave old data for your convenience, delete only the boundaries tags <!#CR#!> and </#CR#/>). This is not valid for all other infos (even in Copirights block) wich is enclosed in boundaries (e.g. File Version, File Mod Time are ever updated,  Licensing only on pressing shortcuts).

> `versionBoss.boundaries.dataStringIDs.copyrights` [type: `string`] 
---
##### Version Boss »  Boundaries »  Data String IDs »  Licenses
* String to recognize and update or insert File License boundaries and values.

> `versionBoss.boundaries.dataStringIDs.licenses` [type: `string`] 
---
##### Version Boss »  Boundaries »  Data String IDs »  Licenses Url
* String to recognize and update or insert File License URL boundaries and values.

> `versionBoss.boundaries.dataStringIDs.licensesUrl` [type: `string`] 
---
##### Version Boss »  Boundaries »  Data String IDs »  Licenses Clarification
* String to recognize and update or insert File License Description boundaries and values.

> `versionBoss.boundaries.dataStringIDs.licensesClarification` [type: `string`] 
---
##### Version Boss »  Settings »  Copyrights »  Insert Extension Author Credits
* If you want, can include credits of the author of this extension: it will occupy only one row at bottom of yours copyrights informations.

> `versionBoss.settings.copyrights.insertExtensionAuthorCredits` [type: `boolean`] 
---
##### Version Boss »  Settings »  Copyrights »  Row Max Length
* Length of the rows of Copyrights in columns (80 columns suggested in Coding Standard Directives).

> `versionBoss.settings.copyrights.rowMaxLength` [type: `integer`] 
---
##### Version Boss »  Settings »  Copyrights »  Copyrights Header
* Header of Copyrights box.

> `versionBoss.settings.copyrights.copyrightsHeader` [type: `string`] 
---
##### Version Boss »  Settings »  Copyrights »  File And Licenses Infos Header
* Header of File and Licenses Informations box.

> `versionBoss.settings.copyrights.fileAndLicensesInfosHeader` [type: `string`] 
---
##### Version Boss »  Settings »  Copyrights »  Set Licenses Pattern Url
* This is the path to the site or file where you can store information about the license of your script.

By default, it use [SPDX site](https://spdx.org/licenses/)  data and the special keyword *`{LICENSE_ID}`* thath will be dinamically converted with license-id you choosed in url of ***SPDX***. For this, you have to insert in *Settings » Copyrights » Set Licences List* the exact IDs found at [SPDX Site](https://spdx.org/licenses/) in 2nd column (named *Identifier*), e.g. `LGPL-3.0-or-later` will produce the following url `https://spdx.org/licenses/LGPL-3.0-or-later.html`. Url can be customized (e.g. `https://example.com/get_lic.php?somevar=someval&mylicense={LICENSE_ID}`).

> `versionBoss.settings.copyrights.setLicensesPatternUrl` [type: `string`] 
---
##### Version Boss »  Settings »  Copyrights »  Set Licenses List
* Licenses in which, generally, you want to distribute your software (ono license per row and use structure `LICENSE_NAME_OR_ID` | `LICENSE_URL` | `LICENSE_CLARIFICATION` using pipe `|` to split each part of license string). Fisrt Value is default.

1. `LICENSE_NAME_OR_ID` : use id from [SPDX site](https://spdx.org/licenses/) or your personal id or name (name will be converted in ID-like);

2. `LICENSE_URL`: url of your license. If empty, value in *Set Licenses Pattern Url* will be used;

3. `LICENSE_CLARIFICATION`: Short clarification about licenses. If empty, value in *Set Licenses Default Clarification* will be used.

*To get Licenses IDs*: go to [SPDX Site](https://spdx.org/licenses/), get strings (even more than one) from 2nd column (named *Identifier*) and enter it in this field (separated by comma `,`).

> `versionBoss.settings.copyrights.setLicensesList` [type: `array`] 
---
##### Version Boss »  Settings »  Copyrights »  Set Licenses Default Clarification
* Licenses clarification about use of file and its contents. This is default clarification. To set clarification for each license, please use *Set Licenses List*.

> `versionBoss.settings.copyrights.setLicensesDefaultClarification` [type: `string`] 
---
##### Version Boss »  Settings »  Copyrights »  Insert File Basename
* Insert current file basename.

> `versionBoss.settings.copyrights.insertFileBasename` [type: `boolean`] 
---
##### Version Boss »  Settings »  Copyrights »  Insert File Birth Date And Time
* Insert current file birth date.

> `versionBoss.settings.copyrights.insertFileBirthDateAndTime` [type: `boolean`] 
---
##### Version Boss »  Settings »  Copyrights »  Copyrights Owner
* Owner of File / Code.

> `versionBoss.settings.copyrights.copyrightsOwner` [type: `string`] 
---
##### Version Boss »  Settings »  Copyrights »  Label And Value Separator Chars
* Separator betwen Labels and Values of Copyrights data.

> `versionBoss.settings.copyrights.labelAndValueSeparatorChars` [type: `string`] 
---
##### Version Boss »  Settings »  Copyrights »  Top And Bottom Frame Chars
* Copyrights Frame chars.
At least one char.

> `versionBoss.settings.copyrights.topAndBottomFrameChars` [type: `string`] 
---
##### Version Boss »  Settings »  Copyrights »  Left And Right Frame Chars
* Copyrights Frame chars.
Leave empty to use char `space` and make a very basic copyrights frame.
Note: the first char of `Top And Bottom Frame Chars` is used as left character to prevent format of comment block by the editor.

> `versionBoss.settings.copyrights.leftAndRightFrameChars` [type: `string`] 
---
##### Version Boss »  Settings »  Copyrights »  Fill Chars
* Copyrights empty spaces Fill char.
Leave empty to use char `space`.

> `versionBoss.settings.copyrights.fillChars` [type: `string`] 
---
##### Version Boss »  Settings »  Copyrights »  Section Separator Chars
* Separator betwen Headers and data of Copyrights information.

> `versionBoss.settings.copyrights.sectionSeparatorChars` [type: `string`] 
---
##### Version Boss »  Copyrights »  Authors Names And Emails
* Authors names and e-mails (name separated by semicolon `;`  from email (e.g. `Wyle Coyote, wyle.coyote@example.com`).

If no e-mail is present, use `-`, after semicolon `;` (e.g.: `Wyle Coyote;-`).

Multiple e-mail addresses separated by a comma `;` are allowed.

Multiple data are allowed: one address per line.

First value is the `Main Author`.

Leave empty for none.

> Tip: iIn Copyrights Infos Array is possible to obtain Main Author Name and its E-Mail address in two separate fields.

> `versionBoss.copyrights.authorsNamesAndEmails` [type: `array`] 
---
##### Version Boss »  Copyrights »  Authors Websites
* Your websites address (Labels separated by `:` from data and multiple data separated by comma `,`).
e.g.: If you use short url -> Facebook: `https://bit.ly/18AOiDE`.

> `versionBoss.copyrights.authorsWebsites` [type: `array`] 
---
##### Version Boss »  Copyrights »  Authors Socials
* Company Social Networks .
Multiple data are allowed: one address per line.
Leave empty for none.

> `versionBoss.copyrights.authorsSocials` [type: `array`] 
---
##### Version Boss »  Copyrights »  Company Name
* Company name.
Leave empty for none.

> `versionBoss.copyrights.companyName` [type: `string`] 
---
##### Version Boss »  Copyrights »  Company Email
* Company E-Mail address.
Multiple data are allowed: one item per line.
Leave empty for none.

> `versionBoss.copyrights.companyEmail` [type: `array`] 
---
##### Version Boss »  Copyrights »  Company Websites
* Company websites address.
Multiple data are allowed: one item per line.
Leave empty for none.

> `versionBoss.copyrights.companyWebsites` [type: `array`] 
---
##### Version Boss »  Copyrights »  Company Socials
* Company Social Networks .
Multiple data are allowed: one item per line.
Leave empty for none.

> `versionBoss.copyrights.companySocials` [type: `array`] 
---
##### Version Boss »  Copyrights »  Credits
* Other people who constantly contribute to perfecting your code.
Multiple data are allowed: one item per line.
Leave empty for none or `-`  to leave a label and space for manual editing.

> `versionBoss.copyrights.credits` [type: `array`] 
---
##### Version Boss »  Copyrights »  Other Infos
* Other generic infos.
Multiple data are allowed: one item per line.
Leave empty for none or `-` to leave a label and space for manual editing.

> `versionBoss.copyrights.otherInfos` [type: `array`] 
---
##### Version Boss »  Copyrights »  Notes
* Author Notes.
Multiple data are allowed: one item per line.
Leave empty for none or `-` to leave a label and space for manual editing.

> `versionBoss.copyrights.notes` [type: `array`] 
---



<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## Requirements

None.

<a href="#table-of-contents" name="toc" style="float:right;z-index:1000;position:relative;" >&#128316;</a>

## Known Issues

* My poor English.
* [`Fixed`] ~~The comparison between two identical version values ​​but with a different channel returns an incorrect value: eg 1.2.3456 vs 1.2.3456-alpha returns 1.2.3456-alpha as the highest grade channel (for my laziness). However this is not a problem: you step-up to the release channel version (wich is without channel value)~~
* Not all programming languages are fully tested with this extension. I cannot implement all languages without a feedback. *Copyrights informations* are written in multi-line comments. Not all language supports it. I wrote code  for comment every single line, but i don't know all programming languages and their capacities to manage multi-line comments or symbols to set single line comments. For the reason above, Copyrights Infos object is correctly written in JavaScript Object and PHP Associative Array, but for all other languages, i have write it into a string with JSON structure.



