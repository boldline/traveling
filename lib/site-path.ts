// Next Link handles basePath itself; raw DOM URLs and images need this helper.
export function sitePath(path: string) {
  return (process.env.NEXT_PUBLIC_BASE_PATH || '') + path;
}
