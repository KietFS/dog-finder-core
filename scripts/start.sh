#!/bin/sh
set -e

echo "🔄 Running database migrations..."
node -e "
const ds = require('./dist/config/database.config').default;
ds.initialize()
  .then(() => ds.runMigrations())
  .then(() => { console.log('✅ Migrations completed'); process.exit(0); })
  .catch((err) => { console.error('❌ Migration failed:', err); process.exit(1); });
" 2>&1 || echo "⚠️  No migrations to run or migration step skipped"

# ── Optional: seed initial data ──────────────────────────────────────────────
# Set SEED_DB=true in your environment (docker-compose or EC2 .env) to seed.
# Remove it after the first successful seed to avoid re-seeding on every restart.
if [ "$SEED_DB" = "true" ]; then
  echo "🌱 Seeding initial data (SEED_DB=true)..."
  node dist/database/seeds/seed-runner.js
  echo "✅ Seeding complete"
fi

echo "🚀 Starting application..."
exec node dist/main

