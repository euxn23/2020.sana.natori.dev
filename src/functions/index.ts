export function extractUrl(text: string): string {
  const matchResult = text.match(/^([\s\S]*)https:[\s\S]*$/);
  if (matchResult) {
    return matchResult[1];
  } else {
    console.log(text);
    return text;
  }
}

export function extractNwontart(text: string): string {
  const matchResult = text.match(/^([\s\S]*)#ヌォンタート([\s\S]*)$/);
  if (matchResult) {
    const extracted = [matchResult[1], matchResult[2]].join(' ');
    return extracted.split(' ').join('') ? extracted : '#ヌォンタート';
  } else {
    return text;
  }
}
