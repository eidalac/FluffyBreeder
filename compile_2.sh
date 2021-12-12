#!/bin/bash

output=/dev/stdout

# displays help text
function displayHelp() {
	cat <<HelpText
Usage: compile.sh [OPTION]...

Options:
  -d, --dry      Do not compile
  -g, --git      Add hash of HEAD to filename
  -h, --help     Show this help text
  -s, --sanity   Run sanityCheck
  -q, --quiet    Suppress terminal output
  -m, --minify   Minify output files
  --ci           CI mode
HelpText
}

#display an error message
function echoError() {
	echo -e "\033[0;31m$*\033[0m"
}

#display message
function echoMessage() {
	echo "$1" >"${output}"
}

#compile the HTML file
function compile() {
	mkdir -p bin/resources
	export TWEEGO_PATH=devTools/tweeGo_current/storyFormats
	TWEEGO_EXE="./devTools/tweeGo_current/tweego"


	file="bin/FluffyBreeder.html"

	# Find and insert current commit
	if [[ "$ci" ]]; then
		COMMIT=$CI_COMMIT_SHORT_SHA
	elif [[ -d .git ]]; then
		COMMIT=$(git rev-parse --short HEAD)
		if [[ "$usehash" ]]; then
			file="bin/FluffyBreeder_${COMMIT}.html"
		fi
	fi

	$TWEEGO_EXE -o "$file" src/ || build_failed="true"
	if [ "$build_failed" = "true" ]; then
		echoError "Build failed."
		exit 1
	fi

	echoMessage "Saved to $file."
}

if [[ "$1" == "" ]]; then
	#tip if no option
	echoMessage "For more options see compile.sh -h."
else
	#parse options
	while [[ "$1" ]]; do
		case $1 in
			-d | --dry)
				dry="true"
				;;
			-g | --git)
				usehash="true"
				;;
			-h | --help)
				displayHelp
				exit 0
				;;
			-s | --sanity)
				sanity="true"
				;;
			-q | --quiet)
				output=/dev/null
				;;
			-t | --themes)
				themes="true"
				;;
			-m | --minify)
				minify="true"
				;;
			--ci)
				ci="true"
				;;
			*)
				echoError "Unknown argument $1."
				displayHelp
				exit 1
				;;
		esac
		shift
	done
fi

# Run sanity check.
[ -n "$sanity" ] && ./sanityCheck.sh

if ! [[ -d .git ]]; then
	echoMessage "No git repository. Git specific actions disabled."
fi

#compile
if [[ "$dry" ]]; then
	echoMessage "Dry run finished."
else
	compile
	echoMessage "Compilation finished at $(date +%T)."
fi

