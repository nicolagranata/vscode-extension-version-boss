<!-- RICORDATI: QUESTO FILE E' ASSEMBLATO DAL TUO SCRIPT - NON MODIFICARLO DA QUI -->
<!-- 2019/10/31 19:04:17.831 -->

# Version Boss Change Log

> Note: [`Development`] sections in *Changelog* are addressed to the developer to remind him of any important changes that occurred during the writing of the code and do not always concern improvements made to the extension or to the theme.

## [1.3.10]
- [`Fix`] Updated dependencies for security reasons.
- [`Development`] Minor bug fix;

## [1.3.5]
- [`Development`] Optimized some parts of **Version Boss** Extension code;
- [`Development`] Added function that generate **Version Boss** Extension badges in `README.md`.

## [1.3.4]
- [`Help`] Some corrections to inline help in Settings;
- [`Fix`] Updated dependencies for security reasons;
- [`Development`] Introduced `VSCode Extensions Manager` (fork of `VSCode Theme Master`), an external PHP tool only for extensions development to backup/clean/package/update dependencies/publish/make icons/manage extensions. 

## [1.3.1]
- [`Feature`] Now is possible to step-up/down inline version string even with `^` leading char (e.g. `"^1.35.0"`, used to indicate minimum version requirements in `package.json`);
- [`Development`] Optimized code structure;
- [`Fix`] Updated dependencies for security reasons.

## [1.2.1]

1. **Warning - Rules Changed**: **`PLEASE UPDATE BOUNDARIES STRUCTURE IN YOUR SCRIPTS`**: from version `1.2.0` was changed structure of boundaries from `<!#(.+)#!>` to `<!#(.+)>` and `</#(.+)#/>` to `</#(.+)>` (e.g.: `<!#FV#!>1.2.3456-beta.3</#FV#/>` to `<!#FV>1.2.3456-beta.3</#FV>`. Even all others boundaries are changed in this pattern!);
1. **Warning - Rules Changed**: **`PLEASE UPDATE YOUR SETTINGS`**: from version `1.2.0` was removed `Version Update On Pattern Match Only First` and changed rule of `Version Update On Pattern Match` from `false` / `true` to `False` / `True` / `Only First Occurrence` (default: `False`);

- [`Fix`] Fixed issue with correct cursor position after step-up/down and insert using Version Boss shortcuts;
- [`Fix`] Fixed issue with sorting version by Channel;
- [`Fix`] Changed structure of boundaries from `<!#(.+)#!>` to `<!#(.+)>` (e.g.: `<!#FV#!>1.2.3456-beta.3</#FV#/>` to `<!#FV>1.2.3456-beta.3</#FV>`);
- [`Feature`] Now is possible to update inline version pattern matching string even with `Version Update On Pattern Match` set to `False`;
- [`Settings`] Changed rule of `Version Update On Pattern Match` from `false`/`true` to `False` / `True` / `Only First Occurrence` (default: `False`);
- [`Settings`] Removed `Version Update On Pattern Match Only First`;
- [`Feature`] Added ability to realign version to max version without step-up/down: press `CTRL+ALT+SHIFT+A`;
- [`Feature`] Added ability to insert banned version to prevent step-up/down (useful in changelogs): press `CTRL+ALT+SHIFT+N`;
- [`Development`] Improved Version Boss CHANGELOG.md build function;
- [`Development`] Improved Version Boss README.md build function;
- [`Development`] Fixed issue with `Dollar Symbol` that caused anomalous behavior during the replacement with regular expressions in JS during README.md building.

## [1.0.14]

- [`Settings`] Changed _Settings » Reset Childs On Step Up_ default value to `true`;
- [`Settings`] Changed some descriptions.

## [1.0.13]

First version for public release @ 2019-05-08 20:40

# [Unreleased]

## [1.0.12]

- [`Development`] Restyled icon.
- [`Development`] Some corrections to output strings.
- [`Development`] Changed extension name from **Semver Boss** to more simple **Version Boss**
- [`Development`] Switched shortcuts between functions to insert version in boundaries or not.

## [1.0.11]

- [`Fix`] Fixed e-mail address.

## [1.0.10]

- [`Settings`] Added flag to choose if insert `File Version` (without boundaries) with or without quotes;
- [`Feature`] Function `Semver Update on Pattern Match Only First`, now support update of semver in line wich is independet from other semver match in file. This is useful if you're used to versioning `function` and `class` of your scripts.
- [`Update`] Updated output for Copyrights Infos and Version (JS Object, PHP Associative Array and, for all other languages, JSON string) with all current License Information and fileVersion value with boundaries instead of clean value;
- [`Update`] New extension icon;
- [`Development`] Variable `licensesDescription` was renamed in `licensesClarification`.

### [1.0.9]

Release to insider @ 2019-04-30 15:19

- [`Settings`] Added flag to choose to update only first occurrency of version enclosed in pair of double-quote or single-quote (e.g. \"`1.23.45`\") in file and consider only it for compare with other instances;
- [`Development`] Added Semver Boss Icon.

### [1.0.8]

Release to insider @ 2019-04-30 03:26

- [`Fix`] Fixed recognition issue of _Variable Name For Copyrights Infos Associative Array_, when, as variable, is used an array item (e.g. `glob_env["copyrights"]`), adding a string protptype `regexEscaped()`;
- [`Fix`] Fixed overlapping error of information, warning and error messages. Now all messages are displayed;
- [`Update`] Updated condition that prevent, as `Release` and `RTM`, channels `GA` and `RTW` to get Channel Version;
- [`Settings`] Added flag to choose if show Information Messages;
- [`Settings`] Added flag to choose if show Warning and Error Message;
- [`Settings`] Added fiedl First Version to insert first version you use when start coding;
- [`Development`] Because matching and replacing boundaries in README.md has unpredictable results, system now assemble README.md using fragments manually edited and dynamically generated.

### [1.0.5]

Release to insider @ 2019-04-28

- [`Development`] Added function to write **Guide to links** and **Guide to Settings** directly in `README.md` between two specific boundaries of HTML comment tags;
- [`Fix`] Fixed an issue that blocked the transition at the low level of Channel Version instead of make it cycling;
- [`Fix`] Optimized code for reload dynamic settings on each launch and static settings at boot;
- [`Fix`] Fixed issues in some descriptions of extension configuration in Settings.

### [1.0.3]

Release to 2019-04-27

- [`Feature`] Added function and shortcuts to generate Copyrights Infos and Version in current language programming of your file (JS Object, PHP Associative Array and, for all other languages, JSON string);
- [`Development`] Added function and shortcuts to get of all descriptions of contribution points and relative keybindings.

### [1.0.0]

Release to insider @ 2019-04-25

- Initial release - development started at 2019-04-11 04:45:00;

## Notes

1. Reference time: `GMT+1`.
