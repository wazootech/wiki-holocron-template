#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "${ROOT}/docs"
for file in "${ROOT}"/wiki/*.md; do
  base="$(basename "${file}" .md)"
  title=$(sed -n 's/^headline: //p' "${file}")
  desc=$(sed -n 's/^description: //p' "${file}")
  [ -z "$title" ] && title="$base"
  {
    echo '---'
    echo "title: $title"
    echo "description: $desc"
    echo '---'
    echo ''
    awk 'BEGIN{fm=0} /^---\r?$/ {fm++; next} fm>=2 {print}' "${file}"
  } > "${ROOT}/docs/${base}.mdx"
done
