#!/usr/bin/env bash
# Screenshots for W3 with the committee screenshot tool (proto.mjs).
# Phone full-page shots are taken with a viewport as tall as the page, so the
# fixed bottom bar lands at the page end instead of over the content.
set -e
P=/tmp/claude-0/-home-user-BioCMS/b24ffc38-5532-532d-b028-dcbe71e5024a/scratchpad/pw/proto.mjs
W=/home/user/BioCMS/prototypes/wireframes/w3
S=/home/user/BioCMS/prototypes/shots/round1
for pg in home saint; do
  node $P $W/$pg.html $S/w3-$pg-1440 1440 900
  out=$(node $P $W/$pg.html $S/w3-$pg-375 375 812); echo "$out"
  sh=$(echo "$out" | python3 -c 'import json,sys;print(json.load(sys.stdin)["sh"])')
  node $P $W/$pg.html $S/w3-tmp 375 "$sh" >/dev/null
  mv $S/w3-tmp.png $S/w3-$pg-375-full.png; rm -f $S/w3-tmp-full.png
done
# extra states (viewport only)
shot(){ node $P "$W/$1" $S/$2 $3 $4 >/dev/null; rm -f $S/$2-full.png; }
shot 'home.html#y=1000' w3-home-1440-scrolled 1440 900
shot 'home.html#browse' w3-home-1440-browse 1440 900
shot 'saint.html#y=1250' w3-saint-1440-scrolled 1440 900
shot 'home.html#y=900' w3-home-375-scrolled 375 812
shot 'home.html#sheet' w3-home-375-feasts 375 812
shot 'saint.html#y=1300' w3-saint-375-scrolled 375 812
echo done
