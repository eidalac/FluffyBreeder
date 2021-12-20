#!/bin/bash
if [ ! -d ".git" ]; then
	#not running in git repo, so can't use git commands :-)
	echo "No .git repo found - skipping sanity checks"
	exit 0
fi

WARNING='\033[93m'

myprint() {
	while read -r data; do
		echo -n -e "[$1]$WARNING"
		echo "$data"
	done
}

GREP="git grep -n --color"

# Check for accidental assignment.  e.g.:   <<if $foo = "hello">>
$GREP "<<[ ]*if[^>=]*[^><\!=]=[^=][^>]*>>" -- 'src/*' | myprint "AccidentalAssignmentInIf"
# Check for accidental assignment.  e.g.:   <<elseif $foo = "hello">>
$GREP "<<[ ]*elseif[^>=]*[^><\!=]=[^=][^>]*>>" -- 'src/*' | myprint "AccidentalAssignmentInElseIf"
# Check for missing ".  e.g.:   <<if $foo == "hello>>
$GREP "<<[^\"<>]*\"[^\"<>]*>>" -- 'src/*' | myprint "MissingSpeechMark"
# Check for missing ".  e.g.:   <<if $foo = "hello)
$GREP -e "<<[^\"<>]*\([^\"<>]*\"[^><\"]*\"\| [<>] \)*\"\([^\"<>]*\"[^><\"]*\"\| [<>] \)*\([^\"<>]\| [<>] \)*>>" --and --not -e "*[^']*" -- 'src/*' | myprint "MissingSpeechMark2"
# Check for colors like: @@color:red   - should be @@.red
# $GREP -e "@@color:" --and --not -e "@@color:rgb([0-9 ]\+,[0-9 ]\+,[0-9 ]\+)" -- "src/*" | myprint "UseCSSColors"
# Check for missing $ in activeFluffy or PC
$GREP "<<[ ]*[^\$><_\[]*\(activeFluffy\|PC\)[.]" -- "src/*" | myprint "MissingDollar"
# Check for closing bracket without opening bracket.  e.g.:  <<if foo)>>	  (but  <<case "foo")>>   is valid, so ignore those
$GREP -e "<<[ a-zA-Z]\+\([^()<>]\|[^()<>][<>][^()<>]\)*)" --and --not -e "<< *case" -- "src/**/*.tw" | myprint "MissingOpeningBracket"
# Check for opening bracket without closing bracket.  e.g.:  <<if (foo>>
# $GREP -e "<<[ a-zA-Z]\([^<>]\|[^<>][<>][^<>]\)\+(\([^()<>]\|[^<>()][<>][^<>()]\|([^<>()]*])\)*>>" -- "src/*" | myprint "MissingClosingBracket"
# Check for two closing brackets but one opening bracket.  e.g.:  <<if (foo))>>
$GREP -e "<<[ a-zA-Z]\+[^()<>]*([^()]*)[^()]*)[^()<>]*>>" -- "src/**/*.tw" | myprint "MissingOpeningBracket2"
# Check for one closing bracket but two opening brackets.  e.g.:  <<if ((foo)>>
#$GREP -e "<<[ a-zA-Z]\+[^()<>]*([^()]*([^()]*)[^()<>]*>>" -- "src/**/*.tw" | myprint "MissingClosingBracket2"
#$GREP -e "<<.*[(][^<>)]*[(][^<>)]*)\?[^<>)]*>>" -- "src/**/*.tw" | myprint "MissingClosingBracket3"
# Check for too many >>>.  e.g.: <</if>>>
$GREP "<<[^<>]*[<>]\?[^<>]*>>>" -- "src/**/*.tw" | myprint "TooManyAngleBrackets"
# Check for wrong capitalization on 'activeFluffy ' and other common typos
# $GREP -e "\$act" --and --not -e "\$\(activeFluffy\)" -- "src/*" | myprint "WrongCapitalization"
# Check for strange spaces e.g.  $globalFluffies[$i]. lips
$GREP "\$globalFluffies\[\$i\]\. " -- 'src/*' | myprint "MissingPropertyAfterDot"
# Check, e.g.  <<else $foo==4
$GREP "<<else >\?[^>]" -- 'src/*' | myprint "ShouldBeElseIf"
# Check, e.g., =to
# $GREP "=to" -- 'src/*' | myprint "EqualAndTo"
# Try to check for accidentally mixing slaves[] and activeSlave.  This can have a lot of false matches, but has caught a lot of bugs so it's worth the pain
# $GREP -e "activeSlave[.]" --and -e "slaves\[..\?\][.]" --and --not -e '[.]ID' --and --not -e 'slaves\[..\?\][.]\(slaveName\|# slaveSurname\|actualAge\|relation\|assignment\|age\|devotion\|trust\|vagina\|mother\|father\|training\)' -- 'src/*' | myprint # "MaybeAccidentalMixingOfSlavesAndActiveSlave"
# Check, e.g.  <<set foo == 4>>
$GREP "<<set[^{>=]*==" -- 'src/*' | myprint "DoubleEqualsInSet"
# Check for, e.g   <<if slaves[foo]>>
$GREP "<<\([^>]\|[^>]>[^>]\)*[^$]slaves\[" -- 'src/*' | myprint "MissingDollar"
# Check for missing $ or _ in variable name:
#$GREP -e "<<[a-zA-Z]\([^>\"\]\|[^>]>[^>]\|\"[^\"]*\"\)* [a-zA-Z]\+ * =" -- "src/**/*.tw" | myprint "MissingDollar2"
# Check for missing command, e.g.  <<foo =
$GREP -e "<<[a-zA-Z]* = *" -- "src/**/*.tw" | myprint "BadCommand"
# Check for duplicate words, e.g. with with
# $GREP -e " \(\b[a-zA-Z][a-zA-Z]\+\) \1\b " --and --not -e " her her " --and --not -e " you you " --and --not -e " New New " --and # --not -e "Slave Slave " --and --not -e " that that " --and --not -e " in in " --and --not -e " is is " -- 'src/*' ':!*.css' | # myprint "Duplicate words"
# Check for obsolete SugarCube macros
$GREP -E "<<display |<<click|<<.*\.contains" -- "src/**/*.tw" | myprint "ObsoleteMacro"
# Check for double articles
$GREP -E "\Wa an\W" -- "src/**/*.tw" | myprint "DoubleArticle"
# Check for incorrect articles
# $GREP -i -E "\Wa (a|e|i|o|u)." -- "src/**/*.tw" | grep -a -i -vE "\Wa (un|eu|us|ut|on|ur|in)." | grep -a -i -vE "(&|<<s>>|UM)." | myprint "IncorrectArticle"
$GREP -i -E "\Wan (b|c|d|f|g|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z)\w." -- "src/**/*.tw" | grep -a -i -vE "[A-Z]{3}" | myprint "IncorrectArticle"
# Check for $ sign mid-word
$GREP -i "\w$\w" -- "src/**/*.tw" | myprint "VarSignMidWord"
# check for $ sign at beginning of macro
$GREP '<<\s*\$' -- 'src/*' | myprint "VarSignAtMacroStart"
# $GREP -e "<<if def [^(>]*[&|]" -- 'src/*' | myprint "AddBracketsAroundDef2"
# check for missing ; before statement
$GREP 'if $ ' -- 'src/*' | myprint "Missing ; before statement"
$GREP 'elseif $ ' -- 'src/*' | myprint "Missing ; before statement"
# Check for an unrecognized letter before >>
$GREP "[^]a-zA-Z0-9 \")}'+-\*\`] *>>" -- 'src/*' | myprint "StrangeCharacterAtEndOfCommand"
# Check for a . inside a <<>>
$GREP "<<[a-zA-Z]\([^\"'>]\|[^\"'>]>[^\"'>]\)*[a-zA-Z][.][^a-zA-Z\`]" -- "src/**/*.tw"| myprint "StrangeCharacterAfterDot"
# Check for @@.  instead of .@@
# $GREP -E "@@(\.|,|;|:)\s" -- "src/**/*.tw" | myprint "WrongSelectorPunctuation"
$GREP "@@[a-z]\+;" -- 'src/*' | myprint "SelectorMissingDot"
# Check for </span>.  instead of .</span>
$GREP -E "</span>(\.|,|;|:)\s" -- src/*.js | myprint "WrongSelectorPunctuation"
# Check for missing whitespace between operators
#$GREP -E "\(.(\+|\-|\*|\/|\=)." -- src/*.js :^src/001-lib/Jquery.js,^src/js/dTree.min.js,^devTools/tweeGo/storyFormats/sugarcube-2/format.js,^src/001-lib/mousetrap.js | myprint "MissingWhitespace"		disabled until I can figure out how to exclude files
# Check for @@ selector instead of <span> selector
$GREP "@@\." -- src/*.js | myprint "WrongSelectorUsed"
# Check for JSdoc inside function declaration
#$GREP -e ".\=.\/\*\*" --or -e "slave\s\*\/" -- src/*.js --exclude 'src/interaction/main/mainLinks.js' | myprint "WrongJSdocFormat"	# this --exclude doesn't work # too many false positives
# Check for missing whitespace at end of /**/ style comments
#$GREP "\S\*\/" -- src/* --exclude 'src/001-lib/jquery/Jquery.js' | myprint "MissingWhitespace"		disabled until I can figure out to exclude files
# Check for var instead of let or const
#$GREP "var\s" -- src/*.js | myprint "UseLetOrConst"	disabled until I can figure out how to exclude certain files
# Check for non lethal or non-lethal instead of nonlethal
$GREP -i "non.lethal" -- 'src/*' | myprint "ShouldBeNonlethal"
# Check for missing quotation marks around selectors
$GREP "span class=[^\"\']" -- src/*.js ':!src/001-lib/Jquery/Jquery.js' | myprint "MissingQuotes"

(
	cd src/ || exit
	$GREP "\$\(PC\|activeSlave\|slaves\|tanks\)[.][^a-zA-Z]" | myprint "UnexpectedCharAfterDot"
)
# Check for lines with only "let"
$GREP '[^A-Za-z]let(\r|\n)' | myprint "WrongLetStyle"
# Check for lines with only "const"
$GREP 'const(\r|\n)' | myprint "WrongConstStyle"
# Check for events with mismatched names
$GREP -P 'App\.Events\.(.*)\s*=\s*class\s+(?!\1)(.*)(?=\s+extends\s+App\.Events\.BaseEvent)' -- src/*.js | myprint "MismatchedEventName"

# Check that all the tags are properly opened and closed & a lot of other stuff
java -jar devTools/javaSanityCheck/SanityCheck.jar
