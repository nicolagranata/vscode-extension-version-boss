{badges}

# {app_name} - v. {app_version}

{app_description}

## Release Notes for version {app_version}

> {development_sections_warning}

{whats_new}

See `Changelog` for previous versions.

### Very Important Informations for Upgrade to `{app_name} v. 1.2.0` and above

1. **`PLEASE UPDATE BOUNDARIES STRUCTURE IN YOUR SCRIPTS`**: from version `1.2.0` was changed structure of boundaries from `<!#(.+)#!>` to `<!#(.+)>` and `</#(.+)#/>` to `</#(.+)>` (e.g.: `<!#FV#!>1.2.3456-beta.3</#FV#/>` to `<!#FV>1.2.3456-beta.3</#FV>`. Even all others boundaries are changed in this pattern!);
1. **`PLEASE UPDATE YOUR SETTINGS`**: from version `1.2.0` was removed `Version Update On Pattern Match Only First` and  changed rule of `Version Update On Pattern Match` from `false` / `true` to `False` / `True` / `Only First Occurrence` (default: `False`);

---

## Features

**{app_name}** is an extension to keep the versions of script files up to date according to the [semver.org](http://semver.org) directives (`Major.Minor.Patch-Channel.ChannelVersion` eg: `1.2.3456-beta.3`).

> Tip: I suggest you also use one of my [VSCode Themes](https://marketplace.visualstudio.com/search?term=publisher%3A%22Nicola%20Granata%22&target=VSCode&category=Themes&sortBy=Name)!

**{app_name}**, using shortcuts, can:
- Insert and Update (step-up and step-down) File Version;
- Insert Copyrights infos in multiline comments(1)  and other infos about Licensing and file stats;
- Insert Copyrights infos in JavaScript Object or PHP Associative Array and in JSON stringified object for all other languages;
- Easily switch between Licenses (and customize it in Settings);

- `Warning`: **{app_name}** was tested with `JavaScript` and `PHP` files but will be work on most of scripting languages: In *future versions*, I will try to refine the output for the various programming languages.

---

## **{app_name}** Demo

![{app_name} Demo](./_gfx/version-boss-demo-00.gif)

## Some recommendations before start using *{app_name}*

The extension is almost entirely customizable (`1`), at least until sufficient feedback is available to eliminate unnecessary customizables settings. 
It is good to leave the default settings, except for that which may cause conflicts with your code, and customize only: 

- Try one of my [VSCode Themes](https://marketplace.visualstudio.com/search?term=publisher%3A%22Nicola%20Granata%22&target=VSCode&category=Themes&sortBy=Name)!
- {app_name} »  Copyrights » *[all settings for this group]*.

Consider also setting :
- {app_name} »  Settings »  Set Variable Name For Copyrights Infos Associative Array;
- {app_name} »  Settings »  Auto Save After Step Up;
- {app_name} »  Settings »  Show Information Message;
- {app_name} »  Settings »  Copyrights »  Owner (can be Author, Company or both);
- {app_name} »  Settings »  Copyrights »  Set Licenses List (set the list of licenses, placing the one you use most in the first place);
- {app_name} »  Settings »  Semver Update On Pattern Match (`2`);

---

Notes:

1. Better to prepare all the options before an active development, to be aware of possible conflicts.

2. *Semver Update On Pattern Match* can recognize any pattern similar to "`Major.Minor.Patch[-Channel[.ChannelVersion]]`" (eg: `1.2.3456-beta.3`) enclosed in pair double-quote `"` or pair single-quote `'` (without spaces in between). 
If you plan to use similar pattern in portion of your code, this may be in conflict with **{app_name}** pattern recognition. In this case you can (one of them):
	1. ~~limit step only to first occurence (*Settings » Semver » Update On Pattern Match Only First*: `true`)~~ limit step only to first occurence (*Settings » Semver » Update On Pattern Match*: `Only First Occurrency`);
	2. in your string  add `#` or `any non digit char` as first char (eg: `1.2.3456-beta.3` -> `#1.2.3456-beta.3`, useful if you maintain track of features/bug fixes in comments to code);
	3. disable *{app_name} »  Settings »  Semver Update On Pattern Match*.

---

## Quick Start

> TIP 1: Make a Variable `version=""` in your file and assign version by press `CTRL+ALT+SHIFT+B` (version number with boundaries).

> Tip 2: With  `CTRL+ALT+SHIFT+S` you can step-up Patch version and save the file at the same time. See `Contributions` for other **{app_name}** shortcuts.

> Tip 3: if you want to save file at step-up/step-down whenever you change any of the `Major/Minor/Patch/Channel/ChannelVersion` enable *{app_name} »  Settings »  Auto Save After Step Up*.

> Tip 4: if you use multiple instances of the file version group, when you update the version, all instances will be updated with the highest value found between them.

> Tip 5: by set `Version Update On Pattern Match` you can versioning even functions (with `False`, from first instance of version string, with `Only First Occurrence` enabled, from second instance of version string). To update them, move cursor to line with function version. `Warning`: if you store multiple version strings (not in boundaries) in same line, only first string after cursor position will be updated. If there is only one semver matching string in line, cursor position don't affect step-up/down: the string will be updated anyway. With `False`, all strings that match semver pattern enclosed in quotes can be updated individually.  With `Only First Occurrence` enabled, the first string without boundaries will be aligned to file version. From second string that match semver pattern, update will be only if you move cursor in line. Form **{app_name}** v. `1.2.9`, is possible to step version with leading `^` (e.g. `"^1.35.0"`).

---

## History

I wrote the first draft for *Eclipse Monkey*, to help me manage the versioning of my JS and PHP scripts.
After updates to Eclipse, Monkey was no longer supported and was replaced by EASE. I used old versions of Eclipse for quite some time, so as not to abandon the convenience of automatic versioning.
Although I had subsequently started writing the code for EASE, I feared that what happened with Monkey would happen again and, consequently, I decided to do without the automatic versioning for a while (it was driving me crazy) until I have decided to abandon the slowness of Eclipse in favor of VSCode.

### Off-standard functions

The first scripts for Monkey did not use the SemVer directives, simply because I used versioning for internal reference, so I implemented the Minor Version increase on passing the Patch Version `99`, and the Major Version on passing the Minor Version `99`. 
It was not implemented not even the use of the channel. Since, personally, I found this method comfortable, although not correct, I decided to add the possibility to choose whether or not to use the step-up of the echelon after reaching threshold(`1`) for the current echelon (e.g. limit:`1000` -> from `Patch 999` to `Patch 1000` step-up Minor Version of `+1` and set Patch version to `0`) and to be `able to set the limit to be reached before carrying out the progress of the next echelon` for `each echelon` (eg. limit for Minor Version before step-up Major Version set to `100`, and limit for Patch Version to step-up `+1` Minor Version set to `1000`). 
The use of this function is strongly discouraged after the release of the first public version of ypur app, but as long as you manage your scripts yourself, I don't think anyone can hurt you. Other non-standard functions are the `step-downs` for each echelon.

---

Notes:

1. In step-down mode, for security reasons, the levels are always independent of the limits.

---

{contents}

## Requirements

None.

## Known Issues

* My poor English.
* [`Fixed`] ~~The comparison between two identical version values ​​but with a different channel returns an incorrect value: eg 1.2.3456 vs 1.2.3456-alpha returns 1.2.3456-alpha as the highest grade channel (for my laziness). However this is not a problem: you step-up to the release channel version (wich is without channel value)~~
* Not all programming languages are fully tested with this extension. I cannot implement all languages without a feedback. *Copyrights informations* are written in multi-line comments. Not all language supports it. I wrote code  for comment every single line, but i don't know all programming languages and their capacities to manage multi-line comments or symbols to set single line comments. For the reason above, Copyrights Infos object is correctly written in JavaScript Object and PHP Associative Array, but for all other languages, i have write it into a string with JSON structure.

