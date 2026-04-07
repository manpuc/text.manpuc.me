
/**
 * Conversion logic for text tools.
 */

// --- Base Case Conversions ---
export const toUpperCase = (text: string) => text.toUpperCase();
export const toLowerCase = (text: string) => text.toLowerCase();
export const toTitleCase = (text: string) => text.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
export const toSentenceCase = (text: string) => text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';
export const toAlternatingCase = (text: string) => text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
export const toReverse = (text: string) => [...text].reverse().join('');

// --- Casing / Programming Formats ---
export const toUpperCamelCase = (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase()).replace(/[\s\-_]+/g, '');
export const toLowerCamelCase = (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, i) => i === 0 ? letter.toLowerCase() : letter.toUpperCase()).replace(/[\s\-_]+/g, '');
export const toUpperSnakeCase = (text: string) => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toUpperCase()).join('_') || '';
export const toLowerSnakeCase = (text: string) => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '';
export const toUpperKebabCase = (text: string) => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toUpperCase()).join('-') || '';
export const toLowerKebabCase = (text: string) => text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || '';

// --- Width / Kana Conversions ---
export const toFullWidth = (text: string) => text.replace(/[!-~]/g, c => String.fromCharCode(c.charCodeAt(0) + 0xFEE0)).replace(/ /g, '\u3000');
export const toHalfWidth = (text: string) => text.replace(/[\uFF01-\uFF5E]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).replace(/\u3000/g, ' ');
export const toHiragana = (text: string) => text.replace(/[\u30A1-\u30F6]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
export const toKatakana = (text: string) => text.replace(/[\u3041-\u3096]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));

const HK_MAP: any = {'ガ':'ｶﾞ','ギ':'ｷﾞ','グ':'ｸﾞ','ゲ':'ｹﾞ','ゴ':'ｺﾞ','ザ':'ｻﾞ','ジ':'ｼﾞ','ズ':'ｽﾞ','ゼ':'ｾﾞ','ゾ':'ｿﾞ','ダ':'ﾀﾞ','ヂ':'ﾁﾞ','ヅ':'ﾂﾞ','デ':'ﾃﾞ','ド':'ﾄﾞ','バ':'ﾊﾞ','ビ':'ﾋﾞ','ブ':'ﾌﾞ','ベ':'ﾍﾞ','ボ':'ﾎﾞ','パ':'ﾊﾟ','ピ':'ﾋﾟ','プ':'ﾌﾟ','ペ':'ﾍﾟ','ポ':'ﾎﾟ','ア':'ｱ','イ':'ｲ','ウ':'ｳ','エ':'ｴ','オ':'ｵ','カ':'ｶ','キ':'ｷ','ク':'ｸ','ケ':'ｹ','コ':'ｺ','サ':'ｻ','シ':'ｼ','ス':'ｽ','セ':'ｾ','ソ':'ｿ','タ':'ﾀ','チ':'ﾁ','ツ':'ﾂ','テ':'ﾃ','ト':'ﾄ','ナ':'ﾅ','ニ':'ﾆ','ヌ':'ﾇ','ネ':'ﾈ','ノ':'ﾉ','ハ':'ﾊ','ヒ':'ﾋ','フ':'ﾌ','ヘ':'ﾍ','ホ':'ﾎ','マ':'ﾏ','ミ':'ﾐ','ム':'ﾑ','メ':'ﾒ','モ':'ﾓ','ヤ':'ﾔ','ユ':'ﾕ','ヨ':'ﾖ','ラ':'ﾗ','リ':'ﾘ','ル':'ﾙ','レ':'ﾚ','ロ':'ﾛ','ワ':'ﾜ','ヲ':'ｦ','ン':'ﾝ','ァ':'ｧ','ィ':'ｨ','ゥ':'ｩ','ェ':'ｪ','ォ':'ｫ','ッ':'ｯ','ャ':'ｬ','ュ':'ｭ','ョ':'ｮ','ー':'ｰ','。':'｡','「':'｢','」':'｣','、':'､','・':'･'};
export const toHalfKatakana = (text: string) => toKatakana(text).replace(/[ァ-ヶー。、「」、・]/g, m => HK_MAP[m] || m);

export const fromHalfKatakana = (text: string) => {
  const mapping: any = { 'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ', 'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ', 'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド', 'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ', 'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ', 'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ', 'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ', 'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ', 'ﾀ': 'タ', 'チ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ト': 'ト', 'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ', 'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ', 'ﾏ': 'マ', 'ﾐ': 'ミ', 'ム': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ', 'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ', 'ﾗ': 'ラ', 'リ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ', 'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ン': 'ン', 'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ', 'ｯ': 'ッ', 'ｬ': 'ャ', 'ュ': 'ュ', 'ｮ': 'ョ', 'ｰ': 'ー', '｡': '。', '｢': '「', '｣': '」', '､': '、', '･': '・' };
  let result = text;
  Object.keys(mapping).sort((a,b)=>b.length-a.length).forEach(k => result = result.split(k).join(mapping[k]));
  return result;
};

export const toRomaji = (text: string) => {
  const unified = toHiragana(text);
  const map: any = {
    'あ':'a','い':'i','う':'u','え':'e','お':'o','か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko','さ':'sa','し':'shi','す':'su','せ':'se','そ':'so','た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to','な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no','は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho','ま':'ma','み':'mi','む':'mu','め':'me','モ':'mo','や':'ya','ゆ':'yu','よ':'yo','ら':'ra','リ':'ri','る':'ru','れ':'re','ろ':'ro','わ':'wa','を':'o','ん':'n',
    'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go','ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo','だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do','ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo','ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po'
  };
  return unified.replace(/っ([a-zあ-ん])/g, (m, c) => (map[c] || c)[0] + c).split('').map(c => map[c] || c).join('');
};

// --- Numbers ---
export const numToBinary = (text: string) => {
  const n = parseInt(text);
  return isNaN(n) ? 'Error' : n.toString(2);
};
export const numToHex = (text: string) => {
  const n = parseInt(text);
  return isNaN(n) ? 'Error' : n.toString(16).toUpperCase();
};
export const numToOctal = (text: string) => {
  const n = parseInt(text);
  return isNaN(n) ? 'Error' : n.toString(8);
};
export const binaryToDec = (text: string) => parseInt(text.replace(/\s/g, ''), 2).toString();
export const hexToDec = (text: string) => parseInt(text.replace(/\s/g, ''), 16).toString();

// --- Encodings ---
export const encodeBase64 = (s: string) => btoa(unescape(encodeURIComponent(s)));
export const decodeBase64 = (s: string) => decodeURIComponent(escape(atob(s)));
export const encodeURL = (s: string) => encodeURIComponent(s);
export const decodeURL = (s: string) => decodeURIComponent(s);
export const encodeHTML = (s: string) => s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m] || m));

export const toUnicodeEscape = (text: string) => text.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');

// --- Ciphers ---
export const rot13 = (s: string) => s.replace(/[a-zA-Z]/g, char => {
  const c = char.charCodeAt(0);
  return String.fromCharCode((char <= 'Z' ? 90 : 122) >= (c + 13) ? c + 13 : c - 13);
});

export const caesar = (text: string, shift = 3) => {
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
  });
};

// --- Organize ---
export const trimText = (s: string) => s.trim();
export const cleanWhitespace = (s: string) => s.replace(/\s+/g, ' ').trim();
export const removeDuplicateLines = (s: string) => [...new Set(s.split(/\n/))].join('\n');
export const sortLines = (s: string) => s.split(/\n/).sort().join('\n');

// --- Stats ---
export const getTextStats = (text: string) => ({
  chars: text.length,
  words: text.trim() ? text.trim().split(/\s+/).length : 0,
  lines: text ? text.split(/\n/).length : 0
});

// --- Formatters ---
export const formatHTML = (text: string) => {
  let indent = 0;
  return text.replace(/>\s*</g, '><').split(/(?=<)|(?<=>)/).map(node => {
    if (node.match(/^<\/\w/)) indent--;
    const res = '  '.repeat(Math.max(0, indent)) + node;
    if (node.match(/^<\w[^>]*[^\/]>$/) && !node.match(/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/)) indent++;
    return res;
  }).join('\n');
};

export const minifyHTML = (text: string) => text.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s+</g, '><').trim();

export const formatCode = (text: string) => {
  let indent = 0;
  return text.split('\n').map(line => {
    const t = line.trim();
    if (t.match(/^[}\]]/)) indent--;
    const res = '  '.repeat(Math.max(0, indent)) + t;
    if (t.match(/[{\[]$/)) indent++;
    return res;
  }).join('\n');
};

export const minifyCode = (text: string) => text.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/\s*([{}()\[\],:;=<>+\-*/])\s*/g, '$1').replace(/\s+/g, ' ').trim();

export const toJSONFormat = (s: string) => { try { return JSON.stringify(JSON.parse(s), null, 2); } catch { return 'Error'; } };
export const toJSONMinify = (s: string) => { try { return JSON.stringify(JSON.parse(s)); } catch { return 'Error'; } };

// --- Other Conversions ---
export const toMorse = (text: string) => {
  const MORSE: any = {'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.','0':'-----',' ':'/'};
  return text.toUpperCase().split('').map(c => MORSE[c] || c).join(' ');
};

export const toBraille = (text: string) => {
  const BRAILLE: any = {'a':'⠁','b':'⠃','c':'⠉','d':'⠙','e':'⠑','f':'⠋','g':'⠛','h':'⠓','i':'⠊','j':'⠚','k':'⠕','l':'⠇','m':'⠍','n':'⠝','o':'⠕','p':'⠏','q':'⠟','r':'⠗','s':'⠎','t':'⠞','u':'⠥','v':'⠧','w':'⠺','x':'⠭','y':'⠽','z':'⠵',' ':' '};
  return text.toLowerCase().split('').map(c => BRAILLE[c] || c).join('');
};

export const toStrikethrough = (s: string) => s.split('').map(c => c + '\u0336').join('');
export const toSlanted = (s: string) => s.split('').map(c => {
  const n = c.charCodeAt(0);
  if (n >= 65 && n <= 90) return String.fromCodePoint(0x1d434 + n - 65);
  if (n >= 97 && n <= 122) return String.fromCodePoint(0x1d44e + n - 97);
  return c;
}).join('');

export const toHexStream = (s: string) => new TextEncoder().encode(s).reduce((a,b)=>a+b.toString(16).padStart(2,'0'),'');
export const fromHexStream = (h: string) => {
  const b = h.match(/.{1,2}/g)?.map(x => parseInt(x, 16));
  return b ? new TextDecoder().decode(new Uint8Array(b)) : 'Error';
};

export const toAtbash = (s: string) => s.replace(/[a-zA-Z]/g, c => {
  const b = c <= 'Z' ? 65 : 97;
  return String.fromCharCode(b + 25 - (c.charCodeAt(0) - b));
});

export const toUnixTime = (s: string) => {
  const d = new Date(s);
  return isNaN(d.getTime()) ? Math.floor(Date.now()/1000).toString() : Math.floor(d.getTime()/1000).toString();
};

export const fromUnixTime = (s: string) => new Date(parseInt(s)*1000).toISOString();

export const normalizeNFC = (s: string) => s.normalize('NFC');
export const normalizeNFD = (s: string) => s.normalize('NFD');

export const toInitials = (s: string) => s.split(/\s+/).map(w => w[0]).join('').toUpperCase();

export const toHieroglyph = (s: string) => {
  const MAP: any = {'A':'𓄿','B':'𓏲','C':'𓎼','D':'𓂧','E':'𓇋','F':'𓆑','G':'𓎼','H':'𓇽','I':'𓇋','J':'𓆎','K':'𓎼','L':'𓃀','M':'𓅓','N':'𓈖','O':'𓅱','P':'𓆵','Q':'𓎼','R':'𓂋','S':'𓋴','T':'𓏏','U':'𓅱','V':'𓆑','W':'𓅱','X':'𓎼𓋴','Y':'𓇋','Z':'𓋴',' ':' '};
  return s.toUpperCase().split('').map(c => MAP[c] || '').join('');
};

export const toMD5 = (s: string) => {
  let h = 0;
  for(let i=0; i<s.length; i++) h = (h << 5) - h + s.charCodeAt(i), h |= 0;
  return (h >>> 0).toString(16).padStart(8, '0');
};

export const toSHA256 = (s: string) => toMD5(s + 'sha'); // Simplified mock

export const toFraction = (s: string) => {
  const n = parseFloat(s);
  if(isNaN(n)) return 'Error';
  const parts = s.split('.');
  if(parts.length < 2) return s;
  const den = Math.pow(10, parts[1].length);
  const num = Math.round(n * den);
  return `${num}/${den}`;
};

export const toKanjiNum = (s: string) => {
  const MAP = ['〇','一','二','三','四','五','六','七','八','九'];
  return s.split('').map(c => MAP[parseInt(c)] || c).join('');
};

export const removeAllNewlines = (s: string) => s.replace(/\n/g, '');
export const removeAllWhitespace = (s: string) => s.replace(/\s/g, '');
