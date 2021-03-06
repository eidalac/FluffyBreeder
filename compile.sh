#!/bin/bash

# Find and insert current commit
COMMIT=$(git rev-list HEAD --count)
sed -i "s/COMMIT/$COMMIT/" ./src/init/storyInit.tw

# run sanity check unless explicitly specified not to
if [ "${1}" != "--insane" ]
then
  ./sanityCheck
fi

./devTools/tweeGo_current/tweego.exe -o bin/FluffyBreeder.html src

# Revert current commit insertion in ./src/init/storyInit.tw for next compilation
git checkout -- ./src/init/storyInit.tw
