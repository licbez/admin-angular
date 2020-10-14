export function debounce(callback: () => void, time: number): () => void {
  const timeCancel = window.setTimeout(callback, time);

  return () => window.clearTimeout(timeCancel);
}
