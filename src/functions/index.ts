export function extractUrl(text: string): string {
  const matchResult = text.match(/(.*)\shttps:\/\/.*$/);
  if (matchResult) {
    return matchResult[1];
  } else {
    return text;
  }
}

export function extractNwontart(text: string): string {
  const matchResult = text.match(/^(.*)\s?#ヌォンタート\s?(.*)$/);
  if (matchResult) {
    const extracted = [matchResult[1], matchResult[2]].join(' ');
    return extracted.split(' ').join('') ? extracted : '#ヌォンタート';
  } else {
    return text;
  }
}
