export function makeAsciiTitleBox(title: string, minWidth = 40) {
  const content = ` ${title.trim()} `;
  const visibleLength = [...content].length;
  const totalWidth = Math.max(minWidth, visibleLength + 4); // 여유 여백 확보

  const padding = totalWidth - visibleLength;
  const left = Math.floor(padding / 2);
  const right = padding - left;

  const top = `╔${"═".repeat(left)}${content}${"═".repeat(right)}╗`;
  const bottom = `╚${"═".repeat(totalWidth)}╝`;

  return { top, bottom };
}
