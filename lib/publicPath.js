// next/link and next/image already honor basePath. Raw <img>, <video>, and
// fetch() do not, so those URLs have to be prefixed by hand.
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export function publicPath(path) {
  if (typeof path !== "string" || path.length === 0) return path;
  if (path.startsWith("#") || path.startsWith("//")) return path;
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  if (!BASE_PATH) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
