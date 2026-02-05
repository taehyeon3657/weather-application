export function formatAddress(fullStr: string) {
  const parts = fullStr.split('-');
  const main = parts.pop() || '';
  const sub = parts.join(' ');
  return { main, sub, full: fullStr.replaceAll('-', ' ') };
}
