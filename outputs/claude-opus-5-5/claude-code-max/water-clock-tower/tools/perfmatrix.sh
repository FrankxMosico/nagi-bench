#!/bin/sh
# 依次测量几种开关组合下的帧率
cd "$(dirname "$0")/.." || exit 1
for x in "mute" "mute&noshadow" "mute&nohud" "mute&noshadow&nohud"; do
  echo "== $x"
  timeout 300 bun tools/perf.mjs --secs 12 --extra "$x" 2>&1 | grep -E "^\+|ready"
done
