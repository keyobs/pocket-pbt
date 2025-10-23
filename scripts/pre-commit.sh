set -e

# Get list of staged files
CHANGED_FILES=$(git diff --cached --name-only)

echo "🔍 Detecting changed paths..."

if echo "$CHANGED_FILES" | grep -q '^apps/web/'; then
  echo "🧪 Changes detected in apps/web — running web tests..."
  pnpm --filter @pocket/web test:run || exit 1

#elif echo "$CHANGED_FILES" | grep -q '^apps/mobile/'; then
#  echo "🧪 Changes detected in apps/mobile — running mobile tests..."
#  pnpm --filter @pocket/mobile test:run || exit 1

else
  echo "🧪 Running root tests..."
  pnpm test:run || exit 1
fi

echo "✅ All tests passed!"
