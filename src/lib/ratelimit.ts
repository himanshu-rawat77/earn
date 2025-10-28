import { Ratelimit } from '@upstash/ratelimit';

import { redis } from './redis';

export const commentCreateRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(10, '1 m'),
  analytics: true,
  prefix: 'ratelimit:comment_create',
});

export const aiGenerateRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(20, '1 m'),
  analytics: true,
  prefix: 'ratelimit:ai_generate',
});

export const powCreateRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, '1 h'),
  analytics: true,
  prefix: 'ratelimit:pow_create',
});

export const uploadSignatureRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(10, '1 m'),
  analytics: true,
  prefix: 'ratelimit:upload_signature',
});

export const commentGetRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(30, '1 m'),
  analytics: true,
  prefix: 'ratelimit:comment_get',
});

export const serverTimeRateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(30, '1 m'),
  analytics: true,
  prefix: 'ratelimit:server_time',
});

// import { Ratelimit, Duration } from '@upstash/ratelimit';
// import { redis } from './redis';

// // simple local in-memory fallback rate limiter
// class LocalRateLimiter {
//   private requests = new Map<string, number[]>();

//   constructor(private limit: number, private windowMs: number) {}

//   async limitRequest(key: string) {
//     const now = Date.now();
//     const timestamps = (this.requests.get(key) ?? []).filter(
//       (t) => now - t < this.windowMs
//     );

//     if (timestamps.length >= this.limit) {
//       return { success: false };
//     }

//     timestamps.push(now);
//     this.requests.set(key, timestamps);
//     return { success: true };
//   }
// }

// // helper to pick limiter type
// function makeRateLimiter(limit: number, window: Duration, prefix: string) {
//   if (redis) {
//     return new Ratelimit({
//       redis,
//       limiter: Ratelimit.fixedWindow(limit, window),
//       analytics: true,
//       prefix,
//     });
//   } else {
//     // use local fallback (~ equivalent timing)
//     const windowMs =
//       window.includes('m')
//         ? parseInt(window) * 60_000
//         : window.includes('h')
//         ? parseInt(window) * 60 * 60_000
//         : 60_000; // default 1m

//     const localLimiter = new LocalRateLimiter(limit, windowMs);
//     return {
//       limit: async (identifier: string) => localLimiter.limitRequest(identifier),
//     };
//   }
// }

// export const commentCreateRateLimiter = makeRateLimiter(10, '1 m', 'ratelimit:comment_create');
// export const aiGenerateRateLimiter = makeRateLimiter(20, '1 m', 'ratelimit:ai_generate');
// export const powCreateRateLimiter = makeRateLimiter(5, '1 h', 'ratelimit:pow_create');
// export const uploadSignatureRateLimiter = makeRateLimiter(10, '1 m', 'ratelimit:upload_signature');
// export const commentGetRateLimiter = makeRateLimiter(30, '1 m', 'ratelimit:comment_get');
// export const serverTimeRateLimiter = makeRateLimiter(30, '1 m', 'ratelimit:server_time');
