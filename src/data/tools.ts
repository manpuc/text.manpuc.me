
export type ToolId = 
  | 'upper' | 'lower' | 'title' | 'sentence' | 'alternating' | 'reverse' | 'initials'
  | 'full-width' | 'half-width' | 'hiragana' | 'katakana' | 'romaji' | 'half-katakana' 
  | 'from-half-katakana' | 'half-katakana-to-hiragana'
  | 'slug' | 'camel' | 'snake' | 'pascal' | 'kebab'
  | 'upper-camel' | 'lower-camel' | 'upper-snake' | 'lower-snake' | 'upper-kebab' | 'lower-kebab'
  | 'trim' | 'whitespace' | 'line-breaks' | 'duplicate' | 'sort' | 'remove-nl' | 'remove-ws'
  | 'base64-encode' | 'base64-decode' | 'url-encode' | 'url-decode' | 'html-encode' | 'html-decode'
  | 'hex-encode' | 'hex-decode' | 'unicode-escape' | 'morse' | 'braille' | 'hieroglyph'
  | 'json-format' | 'json-minify' | 'html-format' | 'html-minify' | 'code-format' | 'code-minify'
  | 'binary-encode' | 'binary-decode'
  | 'num-to-bin' | 'num-to-hex' | 'num-to-oct' | 'bin-to-num' | 'hex-to-num' | 'num-to-kanji' | 'num-to-frac'
  | 'unix-time' | 'from-unix' | 'nfc' | 'nfd'
  | 'caesar' | 'rot13' | 'atbash' | 'md5' | 'sha256'
  | 'strike' | 'slanted';

export interface ToolDef {
  id: ToolId;
  label: { ja: string; en: string };
  desc: { ja: string; en: string };
  category: 'case' | 'width' | 'kana' | 'code' | 'organize' | 'encode';
  tags: { ja: string[]; en: string[] };
}

export const tools: ToolDef[] = [
  // --- CASE ---
  { id: 'upper', label: { ja: '大文字', en: 'UPPERCASE' }, desc: { ja: 'すべてを大文字に変換します', en: 'Convert to ALL UPPERCASE' }, category: 'case', tags: { ja: ['アルファベット', '英文'], en: ['Alphabet', 'English'] } },
  { id: 'lower', label: { ja: '小文字', en: 'lowercase' }, desc: { ja: 'すべてを小文字に変換します', en: 'Convert to all lowercase' }, category: 'case', tags: { ja: ['アルファベット', '英文'], en: ['Alphabet', 'English'] } },
  { id: 'title', label: { ja: 'タイトル名', en: 'Title Case' }, desc: { ja: '各単語の先頭を大文字にします', en: 'Capitalize each word' }, category: 'case', tags: { ja: ['アルファベット', '単語'], en: ['Alphabet', 'Words'] } },
  { id: 'sentence', label: { ja: '一文字目大文字', en: 'Sentence case' }, desc: { ja: '最初の一文字目だけ大文字にします', en: 'Capitalize only the first letter' }, category: 'case', tags: { ja: ['アルファベット', '文章'], en: ['Alphabet', 'Sentences'] } },
  { id: 'alternating', label: { ja: '大小交互', en: 'aLtErNaTiNg' }, desc: { ja: '大文字と小文字を交互に並べます', en: 'Alternate between upper and lower' }, category: 'case', tags: { ja: ['アルファベット', '装飾'], en: ['Alphabet', 'Decoration'] } },
  { id: 'reverse', label: { ja: '逆順', en: 'Reverse' }, desc: { ja: '文字列を逆から並べます', en: 'Reverse the character sequence' }, category: 'case', tags: { ja: ['文字列', '入れ替え'], en: ['String', 'Flip'] } },
  { id: 'initials', label: { ja: 'イニシャル', en: 'Initials' }, desc: { ja: '単語の頭文字だけを抽出します', en: 'Extract first letters' }, category: 'case', tags: { ja: ['アルファベット', '省略'], en: ['Alphabet', 'Short'] } },

  // --- WIDTH / KANA ---
  { id: 'full-width', label: { ja: '全角文字', en: 'Full-width' }, desc: { ja: '半角を全角に変換します', en: 'Convert to Full-width' }, category: 'width', tags: { ja: ['全角', '半角'], en: ['Full-width', 'Half-width'] } },
  { id: 'half-width', label: { ja: '半角文字', en: 'Half-width' }, desc: { ja: '全角を半角に変換します', en: 'Convert to Half-width' }, category: 'width', tags: { ja: ['全角', '半角'], en: ['Full-width', 'Half-width'] } },
  { id: 'hiragana', label: { ja: 'ひらがな', en: 'Hiragana' }, desc: { ja: 'カタカナをひらがなに戻します', en: 'Katakana to Hiragana' }, category: 'kana', tags: { ja: ['カタカナ', 'ひらがな'], en: ['Katakana', 'Hiragana'] } },
  { id: 'katakana', label: { ja: 'カタカナ', en: 'Katakana' }, desc: { ja: 'ひらがなをカタカナにします', en: 'Hiragana to Katakana' }, category: 'kana', tags: { ja: ['ひらがな', 'カタカナ'], en: ['Hiragana', 'Katakana'] } },
  { id: 'romaji', label: { ja: 'ローマ字', en: 'Romaji' }, desc: { ja: 'カナをローマ字に変換します', en: 'Kana to Romaji' }, category: 'kana', tags: { ja: ['日本語', 'ローマ字'], en: ['Japanese', 'Romaji'] } },
  { id: 'half-katakana', label: { ja: '半角カナ', en: 'Half Katakana' }, desc: { ja: 'カナを半角にします', en: 'Kana to Half-width' }, category: 'kana', tags: { ja: ['カナ', '半角'], en: ['Kana', 'Half-width'] } },
  { id: 'from-half-katakana', label: { ja: '半角→全角カナ', en: 'Half → Full Katakana' }, desc: { ja: '半角カタカナを全角カタカナに変換します', en: 'Convert Half-width Katakana to Full-width' }, category: 'kana', tags: { ja: ['半角カナ', '全角'], en: ['Half-width', 'Full-width'] } },
  { id: 'half-katakana-to-hiragana', label: { ja: '半角カナ→ひらがな', en: 'Half → Hiragana' }, desc: { ja: '半角カタカナをひらがなに変換します', en: 'Convert Half-width Katakana to Hiragana' }, category: 'kana', tags: { ja: ['半角カナ', 'ひらがな'], en: ['Half-width', 'Hiragana'] } },

  // --- CODE FORMATS ---
  { id: 'upper-camel', label: { ja: 'UpperCamelCase', en: 'UpperCamel' }, desc: { ja: 'アッパーキャメル（単語の区切りを大文字に）', en: 'Capitalize each word start' }, category: 'code', tags: { ja: ['プログラミング', '変数'], en: ['Programming', 'Variables'] } },
  { id: 'lower-camel', label: { ja: 'lowerCamelCase', en: 'lowerCamel' }, desc: { ja: 'ローワーキャメル（一文字目を小文字に）', en: 'CamelCase with lower start' }, category: 'code', tags: { ja: ['プログラミング', '変数'], en: ['Programming', 'Variables'] } },
  { id: 'upper-snake', label: { ja: 'UPPER_SNAKE_CASE', en: 'UPPER_SNAKE' }, desc: { ja: 'アッパースネーク（アンダーバー区切り）', en: 'Upper with underscores' }, category: 'code', tags: { ja: ['プログラミング', '定数'], en: ['Programming', 'Constants'] } },
  { id: 'lower-snake', label: { ja: 'lower_snake_case', en: 'lower_snake' }, desc: { ja: 'ローワースネーク', en: 'Lower with underscores' }, category: 'code', tags: { ja: ['プログラミング', 'DB'], en: ['Programming', 'Database'] } },
  { id: 'upper-kebab', label: { ja: 'UPPER-KEBAB-CASE', en: 'UPPER-KEBAB' }, desc: { ja: 'アッパーケバブ（ハイフン区切り）', en: 'Upper with hyphens' }, category: 'code', tags: { ja: ['プログラミング', 'CSS'], en: ['Programming', 'CSS'] } },
  { id: 'lower-kebab', label: { ja: 'lower-kebab-case', en: 'lower-kebab' }, desc: { ja: 'ローワーケバブ', en: 'Lower with hyphens' }, category: 'code', tags: { ja: ['プログラミング', 'URL'], en: ['Programming', 'URL'] } },
  { id: 'json-format', label: { ja: 'JSON 整形', en: 'JSON Beautify' }, desc: { ja: 'JSONを整形します', en: 'Format JSON' }, category: 'code', tags: { ja: ['JSON', '整形'], en: ['JSON', 'Format'] } },
  { id: 'json-minify', label: { ja: 'JSON 圧縮', en: 'JSON Minify' }, desc: { ja: 'JSONを圧縮します', en: 'Minify JSON' }, category: 'code', tags: { ja: ['JSON', '圧縮'], en: ['JSON', 'Minify'] } },
  { id: 'html-format', label: { ja: 'HTML 整形', en: 'HTML Beautify' }, desc: { ja: 'HTMLを整形します', en: 'Format HTML' }, category: 'code', tags: { ja: ['HTML', 'タグ'], en: ['HTML', 'Format'] } },
  { id: 'html-minify', label: { ja: 'HTML 圧縮', en: 'HTML Minify' }, desc: { ja: 'HTMLを圧縮します', en: 'Minify HTML' }, category: 'code', tags: { ja: ['HTML', '最小化'], en: ['HTML', 'Minify'] } },
  { id: 'code-format', label: { ja: 'Code 整形', en: 'Code Beautify' }, desc: { ja: 'Codeを整形します', en: 'Format Code' }, category: 'code', tags: { ja: ['プログラミング', '整形'], en: ['Code', 'Format'] } },
  { id: 'code-minify', label: { ja: 'Code 圧縮', en: 'Code Minify' }, desc: { ja: 'Codeを圧縮します', en: 'Minify Code' }, category: 'code', tags: { ja: ['JS/CSS', '圧縮'], en: ['JS/CSS', 'Minify'] } },

  // --- ORGANIZE ---
  { id: 'trim', label: { ja: '余白トリム', en: 'Trim' }, desc: { ja: '前後の余白を削除します', en: 'Remove surrounding whitespace' }, category: 'organize', tags: { ja: ['空白', '整理'], en: ['Whitespace', 'Fix'] } },
  { id: 'whitespace', label: { ja: '空白整理', en: 'Clean Space' }, desc: { ja: '連続する空白を1つにします', en: 'Fix double spaces' }, category: 'organize', tags: { ja: ['文章', '空白'], en: ['Text', 'Whitespace'] } },
  { id: 'duplicate', label: { ja: '重複行削除', en: 'Duplicate Remove' }, desc: { ja: '同じ行を一行にまとめます', en: 'Remove identical lines' }, category: 'organize', tags: { ja: ['行削除', 'リスト'], en: ['Line', 'List'] } },
  { id: 'sort', label: { ja: '行ソート', en: 'Line Sort' }, desc: { ja: '昇順に並べ替えます', en: 'Sort lines alphabetically' }, category: 'organize', tags: { ja: ['リスト', '順序'], en: ['List', 'Order'] } },
  { id: 'remove-nl', label: { ja: '全改行削除', en: 'Clear Newlines' }, desc: { ja: '1行にまとめます', en: 'Make single line' }, category: 'organize', tags: { ja: ['改行', '1行化'], en: ['Lines', 'Compact'] } },

  // --- ENCODE / DATA ---
  { id: 'base64-encode', label: { ja: 'Base64', en: 'Base64 Encode' }, desc: { ja: 'Base64にエンコードします', en: 'Binary to Base64' }, category: 'encode', tags: { ja: ['バイナリ', 'データ'], en: ['Binary', 'Data'] } },
  { id: 'hex-encode', label: { ja: '16進数文字列', en: 'Hex Encode' }, desc: { ja: '16進数形式に変換します', en: 'Text to Hex' }, category: 'encode', tags: { ja: ['16進数', 'コード'], en: ['Hex', 'Code'] } },
  { id: 'unicode-escape', label: { ja: 'Unicodeエスケープ', en: 'Unicode Escape' }, desc: { ja: '\\uXXXX 形式にします', en: 'To Unicode escape sequences' }, category: 'encode', tags: { ja: ['プログラミング', '文字'], en: ['Code', 'Chars'] } },
  { id: 'morse', label: { ja: 'モールス符号', en: 'Morse Code' }, desc: { ja: 'モールス信号に変換します', en: 'Convert to dots and dashes' }, category: 'encode', tags: { ja: ['信号', '通信'], en: ['Signal', 'Networking'] } },
  { id: 'braille', label: { ja: '点字', en: 'Braille' }, desc: { ja: '点字に変換します', en: 'Dots representation' }, category: 'encode', tags: { ja: ['アクセシビリティ', '点'], en: ['A11y', 'Dots'] } },
  { id: 'hieroglyph', label: { ja: 'ヒエログリフ', en: 'Hieroglyph' }, desc: { ja: '古代エジプト文字にします', en: 'Ancient Egyptian script' }, category: 'encode', tags: { ja: ['装飾', 'エジプト'], en: ['Decoration', 'Egypt'] } },

  // --- MATH / NUM ---
  { id: 'num-to-bin', label: { ja: '数値から2進数', en: 'Dec to Bin' }, desc: { ja: '10進数を二進数にします', en: 'Decimal to Binary' }, category: 'encode', tags: { ja: ['数字', '進数'], en: ['Math', 'Bases'] } },
  { id: 'num-to-hex', label: { ja: '数値から16進数', en: 'Dec to Hex' }, desc: { ja: '10進数を16進数にします', en: 'Decimal to Hex' }, category: 'encode', tags: { ja: ['数字', '進数'], en: ['Math', 'Hex'] } },
  { id: 'num-to-kanji', label: { ja: '数値から漢数字', en: 'Num to Kanji' }, desc: { ja: '数字を漢数字にします', en: 'Convert to Kanji numbers' }, category: 'encode', tags: { ja: ['日本語', '漢数字'], en: ['Japanese', 'Numbers'] } },
  { id: 'num-to-frac', label: { ja: '数値から分数', en: 'Num to Frac' }, desc: { ja: '小数などを分数の形にします', en: 'To fractional format' }, category: 'encode', tags: { ja: ['数学', '計算'], en: ['Math', 'Calculation'] } },
  { id: 'unix-time', label: { ja: 'UNIXタイム [秒]', en: 'Unix Stamp' }, desc: { ja: '日時からUnixタイムスタンプを生成します', en: 'Current stamp' }, category: 'encode', tags: { ja: ['時間', '開発者'], en: ['Time', 'Developer'] } },

  // --- CRYPTO ---
  { id: 'caesar', label: { ja: 'シーザー暗号', en: 'Caesar Cipher' }, desc: { ja: '鍵ずらし暗号を適用します', en: 'Shift cipher' }, category: 'encode', tags: { ja: ['暗号', '歴史'], en: ['Cipher', 'Security'] } },
  { id: 'rot13', label: { ja: 'ROT13', en: 'ROT13' }, desc: { ja: '13文字ずらします', en: 'Shift 13 letters' }, category: 'encode', tags: { ja: ['暗号', '掲示板'], en: ['Cipher', 'Forum'] } },
  { id: 'md5', label: { ja: 'MD5 ハッシュ', en: 'MD5 Hash' }, desc: { ja: 'MD5値を計算します', en: 'MD5 fingerprint' }, category: 'encode', tags: { ja: ['ハッシュ', '指紋'], en: ['Hash', 'Crypto'] } },

  // --- DECORATION ---
  { id: 'strike', label: { ja: '取り消し線', en: 'Strikethrough' }, desc: { ja: '横線を引きます', en: 'Cross through text' }, category: 'case', tags: { ja: ['装飾', '強調'], en: ['Decoration', 'Emphasis'] } },
  { id: 'slanted', label: { ja: '斜体文字', en: 'Slanted' }, desc: { ja: '数学記号で斜体にします', en: 'Mathematical italics' }, category: 'case', tags: { ja: ['装飾', '斜体'], en: ['Decoration', 'Style'] } },
];
