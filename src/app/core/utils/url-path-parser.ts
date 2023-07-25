
export function parseUrlPathInSegments(fullUrl: string): Array<string> {
  const result = fullUrl
      .split('/')
      .filter(segment => segment)
      .map(segment => {
          let path = segment;
          const paramPos = path.indexOf(';');
          if (paramPos > -1) {
              path = path.substring(0, paramPos);
          }
          const outletPos = path.indexOf(':');
          if (outletPos > -1) {
              path = path.substring(outletPos + 1, path.length - 1);
          }
          return path;
      });
  return result;
}
