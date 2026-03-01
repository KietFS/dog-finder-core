#!/bin/sh
set -e

# ── Migrations ────────────────────────────────────────────────────────────────
# In production (NODE_ENV=production), always run pending migrations on startup.
# In development, synchronize=true handles schema, so migrations are skipped.
if [ "$NODE_ENV" = "production" ]; then
  echo "🔄 Running database migrations..."
  node -e "
    const ds = require('./dist/config/database.config').default;
    ds.initialize()
      .then(() => ds.runMigrations({ transaction: 'each' }))
      .then((ran) => {
        if (ran.length === 0) console.log('✅ No pending migrations');
        else console.log('✅ Ran ' + ran.length + ' migration(s):', ran.map(m => m.name).join(', '));
        process.exit(0);
      })
      .catch((err) => { console.error('❌ Migration failed:', err.message); process.exit(1); });
  "
  echo "✅ Migrations complete"
else
  echo "ℹ️  Development mode — skipping migrations (synchronize=true handles schema)"
fi

# ── Seeding (development only) ────────────────────────────────────────────────
# SEED_DB is hardcoded to 'true' in docker-compose.yml (dev) and 'false' in
if [ "$SEED_DB" = "true" ]; then
  echo "🌱 Seeding initial data..."

  echo "🧹 Flushing Redis cache..."
  redis-cli -h "${REDIS_HOST:-redis}" -p "${REDIS_PORT:-6379}" FLUSHALL 2>/dev/null \
    && echo "✅ Redis cache cleared" \
    || echo "⚠️  Redis flush skipped"

  node dist/database/seeds/seed-runner.js
  echo "✅ Seeding complete"
fi

# ── Start application ─────────────────────────────────────────────────────────
echo "🚀 Starting application..."
exec node dist/main


