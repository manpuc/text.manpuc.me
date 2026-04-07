
export type ToolId = 
  | 'upper' | 'lower' | 'title' | 'sentence'
  | 'full-width' | 'half-width' | 'hiragana' | 'katakana' | 'romaji' | 'half-katakana'
  | 'from-half-katakana' | 'half-katakana-to-hiragana'
  | 'slug' | 'camel' | 'snake' | 'pascal'
  | 'trim' | 'whitespace' | 'line-breaks' | 'duplicate' | 'sort'
  | 'base64-encode' | 'base64-decode'
  | 'url-encode' | 'url-decode'
  | 'html-encode' | 'html-decode'
  | 'json-format' | 'json-minify'
  | 'binary-encode' | 'binary-decode' | 'num-to-bin' | 'bin-to-num'
  | 'html-format' | 'html-minify' | 'code-format' | 'code-minify'
  | 'strike' | 'slanted' | 'remove-nl' | 'remove-ws';

export interface ToolDef {
  id: ToolId;
  label: { ja: string; en: string };
  desc: { ja: string; en: string };
  category: 'case' | 'width' | 'kana' | 'code' | 'organize' | 'encode';
  tags: { ja: string[]; en: string[] };
  shortcuts?: string[];
}

export const tools: ToolDef[] = [
  { 
    id: 'upper', 
    label: { ja: '大文字', en: 'UPPERCASE' }, 
    desc: { ja: 'すべてを大文字に変換します', en: 'Convert to ALL UPPERCASE' }, 
    category: 'case',
    tags: { ja: ['英文', '定数定数名'], en: ['English', 'Constants'] }
  },
  { 
    id: 'lower', 
    label: { ja: '小文字', en: 'lowercase' }, 
    desc: { ja: 'すべてを小文字に変換します', en: 'Convert to all lowercase' }, 
    category: 'case',
    tags: { ja: ['英文', 'プログラミング'], en: ['English', 'Programming'] }
  },
  { 
    id: 'title', 
    label: { ja: 'タイトル名', en: 'Title Case' }, 
    desc: { ja: '各単語の先頭を大文字にします', en: 'Capitalize each word' }, 
    category: 'case',
    tags: { ja: ['タイトル', '英文'], en: ['Titles', 'English'] }
  },
  { 
    id: 'sentence', 
    label: { ja: '一文字目大文字', en: 'Sentence case' }, 
    desc: { ja: '最初の一文字目だけ大文字にします', en: 'Capitalize only the first letter' }, 
    category: 'case',
    tags: { ja: ['文章', '英文'], en: ['Sentences', 'English'] }
  },
  
  { 
    id: 'full-width', 
    label: { ja: '全角に変換', en: 'Full-width' }, 
    desc: { ja: '半角文字を全角文字に変換します', en: 'Convert half-width to full-width' }, 
    category: 'width',
    tags: { ja: ['日本語入力', 'フォーム入力'], en: ['Japanese', 'Forms'] }
  },
  { 
    id: 'half-width', 
    label: { ja: '半角に変換', en: 'Half-width' }, 
    desc: { ja: '全角文字を半角文字に変換します', en: 'Convert full-width to half-width' }, 
    category: 'width',
    tags: { ja: ['数字', '英数字', 'DB'], en: ['Numbers', 'Alphanumeric', 'DB'] }
  },
  
  { 
    id: 'hiragana', 
    label: { ja: 'ひらがな', en: 'Hiragana' }, 
    desc: { ja: 'カタカナをひらがなに変換します', en: 'Convert Katakana to Hiragana' }, 
    category: 'kana',
    tags: { ja: ['日本語', '教育', '読み'], en: ['Japanese', 'Education'] }
  },
  { 
    id: 'katakana', 
    label: { ja: 'カタカナ', en: 'Katakana' }, 
    desc: { ja: 'ひらがなをカタカナに変換します', en: 'Convert Hiragana to Katakana' }, 
    category: 'kana',
    tags: { ja: ['日本語', '固有名詞'], en: ['Japanese', 'Proper Nouns'] }
  },
  { 
    id: 'half-katakana', 
    label: { ja: '半角カタカナ', en: 'Half-width Katakana' }, 
    desc: { ja: 'ひらがな・カタカナを半角にします', en: 'Convert Hiragana/Katakana to Half-width' }, 
    category: 'kana',
    tags: { ja: ['レガシーシステム', '銀行', 'DB'], en: ['Legacy Systems', 'Banking', 'DB'] }
  },
  { 
    id: 'from-half-katakana', 
    label: { ja: '半角→全角カナ', en: 'Half → Full Katakana' }, 
    desc: { ja: '半角カタカナを全角カタカナに変換します', en: 'Convert Half-width Katakana to Full-width' }, 
    category: 'kana',
    tags: { ja: ['テキスト整理', '日本語'], en: ['Organization', 'Japanese'] }
  },
  { 
    id: 'half-katakana-to-hiragana', 
    label: { ja: '半角カナ→ひらがな', en: 'Half → Hiragana' }, 
    desc: { ja: '半角カタカナをひらがなに変換します', en: 'Convert Half-width Katakana to Hiragana' }, 
    category: 'kana',
    tags: { ja: ['テキスト整理', '日本語'], en: ['Organization', 'Japanese'] }
  },
  { 
    id: 'romaji', 
    label: { ja: 'ローマ字', en: 'Romaji' }, 
    desc: { ja: 'ひらがな・カタカナをローマ字に変換します', en: 'Convert Kana to Romaji' }, 
    category: 'kana',
    tags: { ja: ['日本語学習', '英語圏向け'], en: ['Jp Learning', 'English Speakers'] }
  },
  
  { 
    id: 'slug', 
    label: { ja: 'スラッグ化', en: 'Slugify' }, 
    desc: { ja: 'URLに適した形式に変換します', en: 'Convert to URL-friendly slug' }, 
    category: 'code',
    tags: { ja: ['URL', 'ブログ', 'SEO'], en: ['URL', 'Blog', 'SEO'] }
  },
  { 
    id: 'camel', 
    label: { ja: 'camelCase', en: 'camelCase' }, 
    desc: { ja: 'キャメルケースに変換します', en: 'Convert to camelCase' }, 
    category: 'code',
    tags: { ja: ['JS/TS', '変数名'], en: ['JS/TS', 'Variable Names'] }
  },
  { 
    id: 'snake', 
    label: { ja: 'snake_case', en: 'snake_case' }, 
    desc: { ja: 'スネークケースに変換します', en: 'Convert to snake_case' }, 
    category: 'code',
    tags: { ja: ['Python/Ruby', 'DBカラム名'], en: ['Python/Ruby', 'DB Columns'] }
  },
  { 
    id: 'pascal', 
    label: { ja: 'PascalCase', en: 'PascalCase' }, 
    desc: { ja: 'パスカルケースに変換します', en: 'Convert to PascalCase' }, 
    category: 'code',
    tags: { ja: ['React/Java', 'クラス名'], en: ['React/Java', 'Class Names'] }
  },
  
  { 
    id: 'trim', 
    label: { ja: '前後の余白削除', en: 'Trim' }, 
    desc: { ja: 'テキスト前後の余白を削除します', en: 'Remove whitespace from both ends' }, 
    category: 'organize',
    tags: { ja: ['データ清掃', '汎用'], en: ['Data Cleaning', 'General'] }
  },
  { 
    id: 'whitespace', 
    label: { ja: '余白整理', en: 'Clean Space' }, 
    desc: { ja: '連続する空白を1つにまとめます', en: 'Consolidate multiple spaces' }, 
    category: 'organize',
    tags: { ja: ['文章校正', 'ドキュメント'], en: ['Proofreading', 'Document'] }
  },
  { 
    id: 'line-breaks', 
    label: { ja: '空行の削除', en: 'Clean lines' }, 
    desc: { ja: '連続する改行を1つにします', en: 'Consolidate multiple newlines' }, 
    category: 'organize',
    tags: { ja: ['コード整理', '文章'], en: ['Code Cleanup', 'Writing'] }
  },
  { 
    id: 'duplicate', 
    label: { ja: '重複行の削除', en: 'Remove duplicates' }, 
    desc: { ja: '同じ内容の行を一行にまとめます', en: 'Remove duplicate lines' }, 
    category: 'organize',
    tags: { ja: ['リスト整理', 'ログ解析'], en: ['List Cleanup', 'Logs'] }
  },
  { 
    id: 'sort', 
    label: { ja: '行の並べ替え', en: 'Sort lines' }, 
    desc: { ja: '行を五十音・アルファベット順に並べます', en: 'Sort lines alphabetically' }, 
    category: 'organize',
    tags: { ja: ['リスト整理', '汎用'], en: ['List Sorting', 'General'] }
  },
  
  { 
    id: 'base64-encode', 
    label: { ja: 'Base64 エンコード', en: 'Base64 Encode' }, 
    desc: { ja: 'データをBase64形式に変換します', en: 'Encode to Base64' }, 
    category: 'encode',
    tags: { ja: ['データ転送', '画像', '通信'], en: ['Data Transfer', 'Images', 'Networking'] }
  },
  { 
    id: 'base64-decode', 
    label: { ja: 'Base64 デコード', en: 'Base64 Decode' }, 
    desc: { ja: 'Base64形式を元に戻します', en: 'Decode from Base64' }, 
    category: 'encode',
    tags: { ja: ['データ復元', '画像解析'], en: ['Data Recovery', 'Image Analysis'] }
  },
  { 
    id: 'url-encode', 
    label: { ja: 'URL エンコード', en: 'URL Encode' }, 
    desc: { ja: 'URLに適した形式にエンコードします', en: 'Encode as URL parameter' }, 
    category: 'encode',
    tags: { ja: ['URL引数', 'ブラウザ'], en: ['URL Params', 'Web Browser'] }
  },
  { 
    id: 'url-decode', 
    label: { ja: 'URL デコード', en: 'URL Decode' }, 
    desc: { ja: 'URLエンコードされた文字を戻します', en: 'Decode URL parameters' }, 
    category: 'encode',
    tags: { ja: ['URL引数', 'デバッグ'], en: ['URL Params', 'Debug'] }
  },
  { 
    id: 'html-encode', 
    label: { ja: 'HTML Entity エンコード', en: 'HTML Entity Encode' }, 
    desc: { ja: 'HTMLタグなどをエスケープします', en: 'Encode HTML entities' }, 
    category: 'encode',
    tags: { ja: ['セキュリティ', 'XSS対策', 'ウェブ'], en: ['Security', 'XSS', 'Web'] }
  },
  { 
    id: 'html-decode', 
    label: { ja: 'HTML Entity デコード', en: 'HTML Entity Decode' }, 
    desc: { ja: 'HTMLエンティティを元に戻します', en: 'Decode HTML entities' }, 
    category: 'encode',
    tags: { ja: ['テキスト解析', 'スクレイピング'], en: ['Text Analysis', 'Scraping'] }
  },
  
  { 
    id: 'json-format', 
    label: { ja: 'JSON 整形', en: 'JSON Beautify' }, 
    desc: { ja: 'JSONを整形して読みやすくします', en: 'Format and beautify JSON' }, 
    category: 'code',
    tags: { ja: ['API', '設定ファイル', '開発者'], en: ['API', 'Config Files', 'Developer'] }
  },
  { 
    id: 'json-minify', 
    label: { ja: 'JSON 圧縮', en: 'JSON Minify' }, 
    desc: { ja: 'JSONから空白を削除し軽量化します', en: 'Remove all spaces from JSON' }, 
    category: 'code',
    tags: { ja: ['通信最適化', '軽量化'], en: ['Networking', 'Payload Size'] }
  },
  { 
    id: 'binary-encode', 
    label: { ja: 'Binary エンコード', en: 'Text to Binary' }, 
    desc: { ja: 'テキストを二進数形式に変換します', en: 'Convert text to binary representation' }, 
    category: 'encode',
    tags: { ja: ['コンピューター科学', 'デバッグ'], en: ['CS', 'Debug'] }
  },
  { 
    id: 'binary-decode', 
    label: { ja: 'Binary デコード', en: 'Binary to Text' }, 
    desc: { ja: '二進数形式のテキストを元に戻します', en: 'Convert binary strings back to text' }, 
    category: 'encode',
    tags: { ja: ['デコード', '解析'], en: ['Decode', 'Analysis'] }
  },
  { 
    id: 'num-to-bin', 
    label: { ja: '10進数→2進数', en: 'Dec to Bin' }, 
    desc: { ja: '数字（10進数）を二進数に変換します', en: 'Convert decimal number to binary' }, 
    category: 'encode',
    tags: { ja: ['計算', '基礎'], en: ['Math', 'Computing'] }
  },
  { 
    id: 'bin-to-num', 
    label: { ja: '2進数→10進数', en: 'Bin to Dec' }, 
    desc: { ja: '二進数を数字（10進数）に戻します', en: 'Convert binary to decimal number' }, 
    category: 'encode',
    tags: { ja: ['計算', '基礎'], en: ['Math', 'Computing'] }
  },
  { 
    id: 'html-format', 
    label: { ja: 'HTML 整形', en: 'HTML Beautify' }, 
    desc: { ja: 'HTMLを整形して読みやすくします', en: 'Format and beautify HTML code' }, 
    category: 'code',
    tags: { ja: ['ウェブ開発', 'ブラウザ'], en: ['Web Dev', 'Browser'] }
  },
  { 
    id: 'html-minify', 
    label: { ja: 'HTML 圧縮', en: 'HTML Minify' }, 
    desc: { ja: 'HTMLから空白やコメントを削除します', en: 'Remove spaces and comments from HTML' }, 
    category: 'code',
    tags: { ja: ['SEO', '軽量化'], en: ['SEO', 'Payload Size'] }
  },
  { 
    id: 'code-format', 
    label: { ja: 'Code 整形', en: 'Code Beautify' }, 
    desc: { ja: 'コード（JS/CSS等）を整形します', en: 'Apply generic indentation to code' }, 
    category: 'code',
    tags: { ja: ['開発効率', '可読性'], en: ['Productivity', 'Readability'] }
  },
  { 
    id: 'code-minify', 
    label: { ja: 'Code 圧縮', en: 'Code Minify' }, 
    desc: { ja: 'コードの空白やコメントを一括削除します', en: 'Minify code by removing spaces and comments' }, 
    category: 'code',
    tags: { ja: ['パフォーマンス', '軽量化'], en: ['Performance', 'Minification'] }
  },
  { 
    id: 'strike', 
    label: { ja: '取り消し線', en: 'Strikethrough' }, 
    desc: { ja: 'テキストに取り消し線を引きます', en: 'Draw a horizontal line through text' }, 
    category: 'case',
    tags: { ja: ['SNS', '強調', '装飾'], en: ['Social Media', 'Emphasis', 'Decoration'] }
  },
  { 
    id: 'slanted', 
    label: { ja: '斜体文字', en: 'Slanted Math' }, 
    desc: { ja: '斜体（数学記号）に変換します', en: 'Convert to slanted mathematical italics' }, 
    category: 'case',
    tags: { ja: ['SNS', 'デザイン'], en: ['Social Media', 'Design'] }
  },
  { 
    id: 'remove-nl', 
    label: { ja: '全改行削除', en: 'Remove Newlines' }, 
    desc: { ja: 'すべての改行を削除し1行にします', en: 'Remove all line breaks' }, 
    category: 'organize',
    tags: { ja: ['テキスト整形', '1行化'], en: ['Compact', 'Single Line'] }
  },
  { 
    id: 'remove-ws', 
    label: { ja: '全空白削除', en: 'Remove Spaces' }, 
    desc: { ja: 'すべての空白（スペース・タブ）を削除します', en: 'Remove all whitespace' }, 
    category: 'organize',
    tags: { ja: ['データ清掃', '軽量化'], en: ['Data Cleaning', 'Compact'] }
  },
];
