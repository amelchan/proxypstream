import { EventHandlerRequest, H3Event, getRequestIP, getHeader } from 'h3';

export function getIp(event: H3Event<EventHandlerRequest>) {
  // 1. Cloudflare Header (Trusted Priority)
  const cfIp = getHeader(event, 'CF-Connecting-IP');
  if (cfIp) return cfIp;

  // 2. Native H3 Detection (Standard Headers + Socket)
  const ip = getRequestIP(event, { xForwardedFor: true });
  
  if (!ip) {
    throw new Error('Client IP cannot be resolved. Ensure X-Forwarded-For is set if behind a proxy.');
  }
  return ip;
}
