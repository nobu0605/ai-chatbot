export function truncateText(input: string, maxLength = 200): string {
  if (input.length <= maxLength) return input;
  return `${input.slice(0, maxLength - 3)}...`;
}
