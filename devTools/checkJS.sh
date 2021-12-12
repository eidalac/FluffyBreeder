#!/bin/sh

tmpJoinedFile=`mktemp --suffix=.js`

files=$(find js src -name '*.js' -print)
files=$(echo "$files" | sort)
for f in $files; do
	printf "\n/* ${f} */\n" >> "$tmpJoinedFile"
	cat "$f" >> "$tmpJoinedFile"
done

node -c "$tmpJoinedFile"

test $? -eq 0 && rm "$tmpJoinedFile"
