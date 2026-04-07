
/**
 * Conversion logic for text tools.
 * More robust implementation for non-latin1 characters and complex formats.
 */

export const toUpperCase = (text: string) => text.toUpperCase();
export const toLowerCase = (text: string) => text.toLowerCase();

export const toTitleCase = (text: string) => {
  return text.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
};

export const toSentenceCase = (text: string) => {
  if (!text) return '';
  const val = text.toLowerCase();
  return val.charAt(0).toUpperCase() + val.slice(1);
};

export const toFullWidth = (text: string) => {
  return text.replace(/[!-~]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) + 0xFEE0);
  }).replace(/ /g, '\u3000');
};

export const toHalfWidth = (text: string) => {
  return text.replace(/[\uFF01-\uFF5E]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
  }).replace(/\u3000/g, ' ');
};

export const toHiragana = (text: string) => {
  return text.replace(/[\u30A1-\u30F6]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 0x60);
  });
};

export const toKatakana = (text: string) => {
  return text.replace(/[\u3041-\u3096]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) + 0x60);
  });
};

export const toHalfKatakana = (text: string) => {
  // First convert Hiragana to Katakana
  const fullKatakana = toKatakana(text);
  const mapping: { [key: string]: string } = {
    'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ',
    'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ',
    'だ': 'ﾀﾞ', 'ぢ': 'ﾁﾞ', 'づ': 'ﾂﾞ', 'で': 'ﾃﾞ', 'ど': 'ﾄﾞ',
    'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ',
    'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ',
    'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ',
    'ヴ': 'ｳﾞ', 'ヷ': 'ﾜﾞ', 'ヺ': 'ｦﾞ',
    'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ',
    'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ',
    'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ',
    'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ',
    'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ',
    'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ',
    'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ',
    'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ',
    'ラ': 'ﾗ', 'リ': 'ﾘ', 'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ',
    'ワ': 'ﾜ', 'ヲ': 'ｦ', 'ン': 'ﾝ',
    'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｳ', 'ェ': 'ｪ', 'ォ': 'ｫ',
    'ッ': 'ｯ', 'ャ': 'ｬ', 'ュ': 'ｭ', 'ョ': 'ｮ',
    'ー': 'ｰ', '。': '｡', '「': '｢', '」': '｣', '、': '､', '・': '･'
  };
  const reg = new RegExp(Object.keys(mapping).join('|'), 'g');
  return fullKatakana.replace(reg, (match) => mapping[match] || match);
};

export const fromHalfKatakana = (text: string) => {
  const mapping: { [key: string]: string } = {
     'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
     'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
     'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
     'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
     'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
     'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
     'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
     'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
     'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
     'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
     'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
     'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
     'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
     'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
     'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
     'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
     'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
     'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
     'ｰ': 'ー', '｡': '。', '｢': '「', '｣': '」', '､': '、', '･': '・'
  };
  let result = text;
  // Handle voiced ones first to avoid matching single chars
  const sortedPairs = Object.keys(mapping).sort((a, b) => b.length - a.length);
  for (const key of sortedPairs) {
    result = result.split(key).join(mapping[key]);
  }
  return result;
};

export const toRomaji = (text: string) => {
  const map: { [key: string]: string } = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'o', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko'
    // ... basic mapping provided for demonstration
  };
  return text.split('').map(char => map[char] || char).join('');
};

export const toSlug = (text: string) => {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const toCamelCase = (text: string) => {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/[\s\-_]+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
};

export const toSnakeCase = (text: string) => {
  return text
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase())
    .join('_') || '';
};

export const toPascalCase = (text: string) => {
  return text
    .replace(/(?:\s|_|-|^)([a-z0-9])/gi, (_, letter) => letter.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
};

export const trimText = (text: string) => text.trim();

export const cleanWhitespace = (text: string) => {
  return text.replace(/[ \t]+/g, ' ').trim();
};

export const cleanLineBreaks = (text: string) => {
  return text.replace(/\n\s*\n/g, '\n').trim();
};

export const removeDuplicateLines = (text: string) => {
  const lines = text.split(/\r?\n/);
  return [...new Set(lines)].join('\n');
};

export const sortLines = (text: string) => {
  return text.split(/\r?\n/).sort((a, b) => a.localeCompare(b, 'ja')).join('\n');
};

/**
 * Base64 Encoding with full UTF-8 support
 */
export const encodeBase64 = (text: string) => {
  try {
    const bytes = new TextEncoder().encode(text);
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join('');
    return btoa(binString);
  } catch (e) {
    return 'Error: Encoding to Base64 failed.';
  }
};

/**
 * Base64 Decoding with full UTF-8 support
 */
export const decodeBase64 = (text: string) => {
  try {
    const binString = atob(text.replace(/\s/g, ''));
    const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
    return new TextDecoder().decode(bytes);
  } catch (e) {
    return 'Error: Invalid Base64 string.';
  }
};

export const encodeURL = (text: string) => encodeURIComponent(text);
export const decodeURL = (text: string) => {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    return 'Error: Invalid URL encoding.';
  }
};

export const encodeHTMLEntity = (text: string) => {
  return text.replace(/[\u00A0-\u9999<>&]/g, (i) => {
    return `&#${i.charCodeAt(0)};`;
  });
};

export const decodeHTMLEntity = (text: string) => {
  if (typeof document === 'undefined') return text;
  const p = document.createElement('p');
  p.innerHTML = text;
  return p.textContent || p.innerText || '';
};

export const formatJSON = (text: string) => {
  try {
    const obj = JSON.parse(text);
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return 'Error: Invalid JSON format.';
  }
};

export const minifyJSON = (text: string) => {
  try {
    const obj = JSON.parse(text);
    return JSON.stringify(obj);
  } catch (e) {
    return 'Error: Invalid JSON format.';
  }
};

export const textToBinary = (text: string) => {
  try {
    const bytes = new TextEncoder().encode(text);
    return Array.from(bytes).map(b => b.toString(2).padStart(8, '0')).join(' ');
  } catch (e) {
    return 'Error: Cannot convert to binary.';
  }
};

export const binaryToText = (text: string) => {
  try {
    const bytes = text.trim().split(/\s+/).map(b => {
      const val = parseInt(b, 2);
      if (isNaN(val)) throw new Error('Invalid binary');
      return val;
    });
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch (e) {
    return 'Error: Invalid binary string.';
  }
};

export const numberToBinary = (text: string) => {
  const num = parseInt(text.trim());
  if (isNaN(num)) return 'Error: Input is not a valid number.';
  return num.toString(2);
};

export const binaryToNumber = (text: string) => {
  const clean = text.replace(/\s/g, '');
  const num = parseInt(clean, 2);
  if (isNaN(num)) return 'Error: Input is not a valid binary number.';
  return num.toString();
};

export const formatHTML = (text: string) => {
  let formatted = '';
  let indent = 0;
  const nodes = text.replace(/>\s*</g, '><').split(/(?=<)|(?<=>)/);
  
  nodes.forEach(node => {
    if (node.match(/^<\/\w/)) indent--;
    formatted += '  '.repeat(Math.max(0, indent)) + node + '\n';
    if (node.match(/^<\w[^>]*[^\/]>$/) && !node.match(/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/)) indent++;
  });
  return formatted.trim();
};

export const minifyHTML = (text: string) => {
  return text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .trim();
};

export const formatCode = (text: string) => {
  let indent = 0;
  return text
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (trimmed.match(/^[}\]]/)) indent--;
      const result = '  '.repeat(Math.max(0, indent)) + trimmed;
      if (trimmed.match(/[{\[]$/)) indent++;
      return result;
    })
    .join('\n');
};

export const minifyCode = (text: string) => {
  return text
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // Remove comments
    .replace(/\s*([{}()\[\],:;=<>+\-*/])\s*/g, '$1') // Remove spaces around operators
    .replace(/\s+/g, ' ')
    .trim();
};

export const toStrikethrough = (text: string) => {
  return text.split('').map(char => char + '\u0336').join('');
};

export const toSlanted = (text: string) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    // A-Z
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D434 + (code - 65));
    // a-z (exception: h is 0x210E)
    if (code === 104) return '\u210E';
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D44E + (code - 97));
    return char;
  }).join('');
};

export const removeAllNewlines = (text: string) => text.replace(/\r?\n/g, '');
export const removeAllWhitespace = (text: string) => text.replace(/\s/g, '');

export const getTextStats = (text: string) => {
  const trimmed = text.trim();
  return {
    chars: text.length,
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    lines: text ? text.split(/\r?\n/).length : 0
  };
};
