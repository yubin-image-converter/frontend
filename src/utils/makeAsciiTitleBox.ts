export function makeAsciiTitleBox(title: string, fixedWidth?: number) {
  const content = ` ${title.trim()} `;
  const visibleLength = [...content].length;

  // 최소 박스 너비 = 제목 길이 + 여유 패딩 (좌우 6칸씩 정도 = 총 12칸)
  const minBoxWidth = visibleLength + 12;

  // fixedWidth가 주어지면 그걸 쓰되, 너무 작으면 최소값으로 보정
  const totalWidth =
    fixedWidth !== undefined ? Math.max(minBoxWidth, fixedWidth) : minBoxWidth;

  // 강제로 짝수로 맞추기 (레이아웃 안정화용)
  const evenWidth = totalWidth % 2 === 0 ? totalWidth : totalWidth + 1;

  const padding = evenWidth - visibleLength;
  const left = Math.floor(padding / 2);
  const right = padding - left;

  const top = `╔${"═".repeat(left)}${content}${"═".repeat(right)}╗`;
  const bottom = `╚${"═".repeat(evenWidth)}╝`;

  return { top, bottom };
}

// export function makeAsciiTitleBox(
//   title: string,
//   width: number,
// ): { top: string; bottom: string } {
//   const safeWidth = Math.max(title.length + 4, width); // 최소 길이 보장
//   const padding = safeWidth - title.length - 2;

//   const leftPad = Math.floor(padding / 2);
//   const rightPad = padding - leftPad;

//   const top = `┌${"─".repeat(safeWidth - 2)}┐`;
//   const mid = `│${" ".repeat(leftPad)}${title}${" ".repeat(rightPad)}│`;
//   const bottom = `└${"─".repeat(safeWidth - 2)}┘`;

//   return { top: `${top}\n${mid}`, bottom };
// }
