#!/bin/sh

# $1: source dir
# $2: name wildcard
# #3: destination file

rm -f "$3"
files=$(find "$1" -name "$2" -print)
files=$(echo "$files" | sort)
for f in $files; do
	printf "\n/* ${f#$1} */\n" >> "$3"
	cat "$f" >> "$3"
done
