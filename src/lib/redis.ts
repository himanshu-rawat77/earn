import { Redis } from '@upstash/redis';

// let redis: Redis | null = null;
let redis: Redis;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
} else {
  console.warn(
    '⚠️ Upstash Redis environment variables missing — using in-memory rate limiter fallback.',
  );
}

export { redis };
