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
            "@link": "",
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