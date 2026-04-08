import * as wanakana from 'wanakana';
// --- Kuroshiro Initialization ---
let kuro: any = null;
let kuroReady = false;
let kuroInitializing = false;

export const initKuro = async () => {
  if (kuroReady && kuro) return;
  if (kuroInitializing) {
    while (kuroInitializing) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return;
  }
  kuroInitializing = true;
  console.log('Initializing Kuroshiro conversion system...');
  
  // Inject path polyfill for kuromoji-js in browser
  if (typeof window !== 'undefined' && !(window as any).path) {
    console.log('Injecting path polyfill');
    const path = await import('path-browserify');
    (window as any).path = path.default || path;
  }
  
  console.log('Importing kuroshiro modules');
  const KuroMod = await import('kuroshiro');
  const AnalyzerMod = await import('kuroshiro-analyzer-kuromoji');
  
  // High-reliability class resolution
  const resolveClass = (mod: any) => {
    if (typeof mod === 'function') return mod;
    if (mod.default && typeof mod.default === 'function') return mod.default;
    if (mod.default?.default && typeof mod.default.default === 'function') return mod.default.default;
    return mod;
  };

  const KC = resolveClass(KuroMod);
  const AC = resolveClass(AnalyzerMod);

  if (typeof KC !== 'function' || typeof AC !== 'function') {
    throw new Error(`Failed to resolve Kuroshiro or Analyzer classes. KC: ${typeof KC}, AC: ${typeof AC}`);
  }

  try {
    // Monkey patch XHR to redirect .gz requests to .gz.bin to bypass Vite auto-decompression
    if (typeof window !== 'undefined' && !(window as any)._xhrPatched) {
      const oldOpen = window.XMLHttpRequest.prototype.open;
      window.XMLHttpRequest.prototype.open = function(method: string, url: string | URL) {
        let finalUrl = url.toString();
        if (finalUrl.includes('kuromoji-data') && finalUrl.endsWith('.gz')) {
          finalUrl += '.bin';
          console.log('Redirecting dict request:', url, '->', finalUrl);
        }
        return oldOpen.apply(this, [method, finalUrl, ...Array.prototype.slice.call(arguments, 2)] as any);
      };
      (window as any)._xhrPatched = true;
    }

    kuro = new KC();
    console.log('Kuroshiro instantiated');
    const dictPath = '/kuromoji-data';
    await kuro.init(new AC({ dictPath }));
    kuroReady = true;
    console.log('Kuroshiro system ready at ' + dictPath);
  } catch (err) {
    console.error('Kuroshiro initialization failed:', err);
    throw err;
  } finally {
    kuroInitializing = false;
  }
};

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

export const toHiragana = (text: string) => wanakana.toHiragana(text);
export const toKatakana = (text: string) => wanakana.toKatakana(text);
export const toRomaji = (text: string) => wanakana.toRomaji(text);
export const romajiToHiragana = (text: string) => wanakana.toHiragana(text);
export const romajiToKatakana = (text: string) => wanakana.toKatakana(text);

export const kanjiToHiragana = async (text: string) => {
  await initKuro();
  return kuro.convert(text, { to: 'hiragana' });
};

export const kanjiToKatakana = async (text: string) => {
  await initKuro();
  return kuro.convert(text, { to: 'katakana' });
};

export const kanjiToRomaji = async (text: string) => {
  await initKuro();
  return kuro.convert(text, { to: 'romaji' });
};

const HK_MAP: any = { 'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ', 'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ', 'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ', 'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ', 'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ', 'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ', 'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ', 'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ', 'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ', 'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ', 'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ', 'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ', 'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ', 'ラ': 'ﾗ', 'リ': 'ﾘ', 'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ', 'ワ': 'ﾜ', 'ヲ': 'ｦ', 'ン': 'ﾝ', 'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｩ', 'ェ': 'ｪ', 'ォ': 'ｫ', 'ッ': 'ｯ', 'ャ': 'ｬ', 'ュ': 'ｭ', 'ョ': 'ｮ', 'ー': 'ｰ', '。': '｡', '「': '｢', '」': '｣', '、': '､', '・': '･' };
export const toHalfKatakana = (text: string) => wanakana.toKatakana(text).replace(/[ァ-ヶー。、「」、・]/g, m => HK_MAP[m] || m);

export const fromHalfKatakana = (text: string) => {
  const mapping: any = { 'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ', 'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ', 'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド', 'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ', 'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ', 'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ', 'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ', 'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ', 'ﾀ': 'タ', 'チ': 'チ', 'ツ': 'ツ', 'ﾃ': 'テ', 'ト': 'ト', 'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ヌ': 'ヌ', 'ネ': 'ネ', 'ﾉ': 'ノ', 'ﾊ': 'ハ', 'ヒ': 'ヒ', 'フ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ', 'ﾏ': 'マ', 'ミ': 'ミ', 'ム': 'ム', 'ﾒ': 'メ', 'モ': 'モ', 'ヤ': 'ヤ', 'ユ': 'ユ', 'ヨ': 'ヨ', 'ラ': 'ラ', 'リ': 'リ', 'る': 'る', 'れ': 'れ', 'ろ': 'ろ', 'わ': 'ワ', 'ヲ': 'ヲ', 'ン': 'ン', 'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ', 'ｯ': 'ッ', 'ｬ': 'ャ', 'ュ': 'ュ', 'ｮ': 'ョ', 'ｰ': 'ー', '｡': '。', '｢': '「', '｣': '」', '､': '、', '･': '・' };
  let result = text;
  Object.keys(mapping).sort((a, b) => b.length - a.length).forEach(k => result = result.split(k).join(mapping[k]));
  return result;
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
export const encodeHTML = (s: string) => s.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m));

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
  const MORSE: any = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/' };
  return text.toUpperCase().split('').map(c => MORSE[c] || c).join(' ');
};

export const toBraille = (text: string) => {
  const BRAILLE: any = { 'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠕', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': ' ' };
  return text.toLowerCase().split('').map(c => BRAILLE[c] || c).join('');
};

export const toStrikethrough = (s: string) => s.split('').map(c => c + '\u0336').join('');
export const toSlanted = (s: string) => s.split('').map(c => {
  const n = c.charCodeAt(0);
  if (n >= 65 && n <= 90) return String.fromCodePoint(0x1d434 + n - 65);
  if (n >= 97 && n <= 122) return String.fromCodePoint(0x1d44e + n - 97);
  return c;
}).join('');

export const toHexStream = (s: string) => new TextEncoder().encode(s).reduce((a, b) => a + b.toString(16).padStart(2, '0'), '');
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
  return isNaN(d.getTime()) ? Math.floor(Date.now() / 1000).toString() : Math.floor(d.getTime() / 1000).toString();
};

export const fromUnixTime = (s: string) => new Date(parseInt(s) * 1000).toISOString();

export const normalizeNFC = (s: string) => s.normalize('NFC');
export const normalizeNFD = (s: string) => s.normalize('NFD');

export const toInitials = (s: string) => s.split(/\s+/).map(w => w[0]).join('').toUpperCase();

export const toHieroglyph = (s: string) => {
  const MAP: any = { 'A': '𓄿', 'B': '𓏲', 'C': '𓎼', 'D': '𓂧', 'E': '𓇋', 'F': '𓆑', 'G': '𓎼', 'H': '𓇽', 'I': '𓇋', 'J': '𓆎', 'K': '𓎼', 'L': '𓃀', 'M': '𓅓', 'N': '𓈖', 'O': '𓅱', 'P': '𓆵', 'Q': '𓎼', 'R': '𓂋', 'S': '𓋴', 'T': '𓏏', 'U': '𓅱', 'V': '𓆑', 'W': '𓅱', 'X': '𓎼𓋴', 'Y': '𓇋', 'Z': '𓋴', ' ': ' ' };
  return s.toUpperCase().split('').map(c => MAP[c] || '').join('');
};

export const toMD5 = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i), h |= 0;
  return (h >>> 0).toString(16).padStart(8, '0');
};

export const toSHA256 = (s: string) => toMD5(s + 'sha'); // Simplified mock

export const toFraction = (s: string) => {
  const n = parseFloat(s);
  if (isNaN(n)) return 'Error';
  const parts = s.split('.');
  if (parts.length < 2) return s;
  const den = Math.pow(10, parts[1].length);
  const num = Math.round(n * den);
  return `${num}/${den}`;
};

export const toKanjiNum = (s: string) => {
  const MAP = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return s.split('').map(c => MAP[parseInt(c)] || c).join('');
};

export const removeAllNewlines = (s: string) => s.replace(/\n/g, '');
export const removeAllWhitespace = (s: string) => s.replace(/\s/g, '');

// --- Transcription / AI Helper Conversions ---
export const removeFillers = (s: string) => {
  const jpFillers = ['あのー', 'あの', 'えーと', 'えっと', 'そのー', 'その', 'まあ', 'まー', 'えー', 'うーん', 'うーんと', 'えーっと', 'あー', 'はぁ'];
  const enFillers = ['um', 'uh', 'er', 'ah', 'like', 'you know', 'i mean'];

  let res = s;

  // Japanese fillers
  jpFillers.forEach(f => {
    const regex = new RegExp(`(^|\\s|、|。)${f}(\\s|、|。|$)`, 'g');
    res = res.replace(regex, (match, p1, p2) => p1 + p2);
  });

  // English fillers (case insensitive, word boundary)
  enFillers.forEach(f => {
    const regex = new RegExp(`\\b${f}\\b`, 'gi');
    res = res.replace(regex, '');
  });

  return res.replace(/\s+/g, ' ').replace(/^[、。,\.]/, '').trim();
};

export const autoPunctuate = (s: string) => {
  let res = s.trim();
  if (!res) return '';

  const hasJapanese = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]/.test(res);

  const lines = res.split('\n').map(line => {
    let l = line.trim();
    if (!l) return '';

    if (hasJapanese) {
      // Japanese logic
      if (!/[。？！?!.]$/.test(l)) l += '。';
      l = l.replace(/([はがを])(?![、。？！?!.])/g, '$1、');
    } else {
      // English logic
      // Capitalize first letter
      l = l.charAt(0).toUpperCase() + l.slice(1);
      // Add period if missing
      if (!/[.!?]$/.test(l)) l += '.';
      // Capitalize after periods within the line
      l = l.replace(/([.!?]\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
    }
    return l;
  });

  return lines.join('\n');
};
