export function blendColors(color1: string, color2: string, ratio: number): string {
  const hex = (c: string) => parseInt(c, 16);
  const r1 = hex(color1.substring(1, 3));
  const g1 = hex(color1.substring(3, 5));
  const b1 = hex(color1.substring(5, 7));
  const r2 = hex(color2.substring(1, 3));
  const g2 = hex(color2.substring(3, 5));
  const b2 = hex(color2.substring(5, 7));

  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);

  return `rgb(${r}, ${g}, ${b})`;
}
