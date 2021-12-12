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
	export TWEEGO_PATH=devTools/tweeGo/storyFormats
	TWEEGO_EXE="tweego"

	if hash $TWEEGO_EXE 2>/dev/null; then
		echoMessage "system tweego binary"
	else
		case "$(uname -m)" in
			x86_64 | amd64)
				echoMessage "x64 arch"
				if [ "$(uname -s)" = "Darwin" ]; then
					TWEEGO_EXE="./devTools/tweeGo/tweego_osx64"
				elif [ "$OSTYPE" = "msys" ]; then
					TWEEGO_EXE="./devTools/tweeGo/tweego_win64"
				else
					TWEEGO_EXE="./devTools/tweeGo/tweego_nix64"
				fi
				;;
			x86 | i[3-6]86)
				echoMessage "x86 arch"
				if [ "$(uname -s)" = "Darwin" ]; then
					TWEEGO_EXE="./devTools/tweeGo/tweego_osx86"
				elif [ "$OSTYPE" = "msys" ]; then
					TWEEGO_EXE="./devTools/tweeGo/tweego_win86"
				else
					TWEEGO_EXE="./devTools/tweeGo/tweego_nix86"
				fi
				;;
			*)
				echoError "No system tweego binary found, and no precompiled binary for your platform available."
				echoError "Please compile tweego and put the executable in PATH."
				exit 2
				;;
		esac
	fi

	if [ "$(uname -m)" = "x86_64" ] || [ "$(uname -m)" = "amd64" ]; then
    if [ "$(uname -s)" = "Darwin" ]; then
      MINIFY_EXE="./devTools/minify/minify_darwin_amd64"
    elif [ "$OSTYPE" = "msys" ]; then
      MINIFY_EXE="./devTools/minify/minify_win_amd64.exe"
    else
      MINIFY_EXE="./devTools/minify/minify_linux_amd64"
    fi
	fi

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
	if [[ "$minify" ]]; then
		final_file=$file
		file="bin/tmp.html"
	fi

	if [[ "$COMMIT" ]]; then
		printf "App.Version.commitHash = '%s';\n" "${COMMIT}" > config/version.js.commitHash.js
	fi

	devTools/concatFiles.sh config/ '*.js' bin/fluffyBreeder.js
	devTools/concatFiles.sh src/css/ '*.css' bin/fluffyBreeder.css
	$TWEEGO_EXE -o "$file" --module=bin/fluffyBreeder.js --module=bin/fluffyBreeder.css src/ || build_failed="true"
	rm -f bin/fluffyBreeder.js
	rm -f bin/fluffyBreeder.css
	if [ "$build_failed" = "true" ]; then
		echoError "Build failed."
		exit 1
	fi

	if [[ "$minify" ]]; then
		if [[ "$MINIFY_EXE" ]]; then
			# SC license is inside an HTML comment, so keep them.
			# eval depends on local variables, so don't modify them (Config, Engine, ...)
			$MINIFY_EXE --html-keep-comments --js-keep-var-names "$file" > "$final_file"
			rm -f "$file"
		else
			echoError "Minification only available on amd64 systems."
			mv "$file" "$final_file"
		fi
		file=$final_file
	fi

	if [[ "$ci" || -d .git ]]; then
		rm config/version.js.commitHash.js
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

