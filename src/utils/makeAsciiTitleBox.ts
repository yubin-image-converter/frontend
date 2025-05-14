// export function makeAsciiTitleBox(title: string, fixedWidth?: number) {
//   const content = ` ${title.trim()} `;
//   const visibleLength = [...content].length;

//   // 최소 박스 너비 = 제목 길이 + 여유 패딩 (좌우 6칸씩 정도 = 총 12칸)
//   const minBoxWidth = visibleLength + 12;

//   // fixedWidth가 주어지면 그걸 쓰되, 너무 작으면 최소값으로 보정
//   const totalWidth =
//     fixedWidth !== undefined ? Math.max(minBoxWidth, fixedWidth) : minBoxWidth;

//   // 강제로 짝수로 맞추기 (레이아웃 안정화용)
//   const evenWidth = totalWidth % 2 === 0 ? totalWidth : totalWidth + 1;

//   const padding = evenWidth - visibleLength;
//   const left = Math.floor(padding / 2);
//   const right = padding - left;

//   const top = `╔${"═".repeat(left)}${content}${"═".repeat(right)}╗`;
//   const bottom = `╚${"═".repeat(evenWidth)}╝`;

//   return { top, bottom };
// }

export function makeAsciiTitleBox(
  title: string,
  clientWidth: number,
): {
  top: string;
  bottom: string;
} {
  const isMobile = clientWidth < 480;
  const minBoxWidth = 24;
  const maxBoxWidth = 32;

  const baseWidth = Math.max(title.length + 10, minBoxWidth);
  const boxWidth = isMobile ? Math.min(baseWidth, maxBoxWidth) : baseWidth;

  const padding = boxWidth - title.length - 2;
  const leftPad = Math.floor(padding / 2);
  const rightPad = padding - leftPad;

  const top = `┌${"─".repeat(boxWidth - 2)}┐`;
  const bottom = `└${"─".repeat(boxWidth - 2)}┘`;
  const mid = `${" ".repeat(leftPad)}${title}${" ".repeat(rightPad)}`;

  return { top: `${top}\n${mid}`, bottom };
}
