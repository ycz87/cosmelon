import { Hono } from 'hono'
import type { Env } from '../index'
import { authMiddleware } from '../middleware/auth'

type AuthEnv = { Bindings: Env; Variables: { userId: string; email: string } }

export const warehouseRoutes = new Hono<AuthEnv>()

warehouseRoutes.use('*', authMiddleware)

const ITEM_TYPES = ['seed', 'sprout', 'bloom', 'green', 'ripe', 'legendary'] as const

// GET /warehouse — aggregate inventory into warehouse format
warehouseRoutes.get('/', async (c) => {
  const userId = c.get('userId')
  const { results } = await c.env.DB.prepare(
    'SELECT item_type, count FROM inventory WHERE user_id = ?'
  ).bind(userId).all()

  if (!results || results.length === 0) {
    return c.json({ warehouse: null })
  }

  const items: Record<string, number> = {}
  let totalCollected = 0
  for (const row of results) {
    const type = row.item_type as string
    const count = row.count as number
    items[type] = count
    if (type !== 'legendaryPity') {
      totalCollected += count
    }
  }

  const warehouse = {
    items: {
      seed: items['seed'] || 0,
      sprout: items['sprout'] || 0,
      bloom: items['bloom'] || 0,
      green: items['green'] || 0,
      ripe: items['ripe'] || 0,
      legendary: items['legendary'] || 0,
    },
    legendaryPity: items['legendaryPity'] || 0,
    totalCollected: items['totalCollected'] != null ? items['totalCollected'] : totalCollected,
  }

  return c.json({ warehouse })
})

// PUT /warehouse — overwrite entire warehouse data
warehouseRoutes.put('/', async (c) => {
  const userId = c.get('userId')
  const body = await c.req.json()
  const warehouse = body.warehouse ?? body
  const now = new Date().toISOString()

  // Build upsert statements for each item type + meta fields
  const stmts: D1PreparedStatement[] = []

  for (const type of ITEM_TYPES) {
    const count = warehouse.items?.[type] ?? 0
    stmts.push(
      c.env.DB.prepare(
        `INSERT INTO inventory (id, user_id, item_type, count, updated_at)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(user_id, item_type) DO UPDATE SET count = excluded.count, updated_at = excluded.updated_at`
      ).bind(`${userId}_${type}`, userId, type, count, now)
    )
  }

  // Store legendaryPity and totalCollected as special inventory rows
  stmts.push(
    c.env.DB.prepare(
      `INSERT INTO inventory (id, user_id, item_type, count, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(user_id, item_type) DO UPDATE SET count = excluded.count, updated_at = excluded.updated_at`
    ).bind(`${userId}_legendaryPity`, userId, 'legendaryPity', warehouse.legendaryPity ?? 0, now)
  )
  stmts.push(
    c.env.DB.prepare(
      `INSERT INTO inventory (id, user_id, item_type, count, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(user_id, item_type) DO UPDATE SET count = excluded.count, updated_at = excluded.updated_at`
    ).bind(`${userId}_totalCollected`, userId, 'totalCollected', warehouse.totalCollected ?? 0, now)
  )

  await c.env.DB.batch(stmts)

  return c.json({ ok: true })
})
