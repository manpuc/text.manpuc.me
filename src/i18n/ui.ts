
export const languages = {
  en: 'English',
  ja: '日本語',
};

export const defaultLang = 'ja';

export const ui = {
  en: {
    common: {
      all: 'ALL',
      search: 'Search',
      copy: 'Copy',
      copied: 'Copied',
      clear: 'Clear',
      total_conversions: 'Total Conversions',
    },
    nav: { home: 'Home', about: 'About' },
    header: {
      title: 'TextFlow',
      search: 'Search tools... (Cmd/Ctrl + K)',
      conversions: 'conversions',
    },
    footer: { madeby: 'Made with ❤️ by manpuc' },
    tool: {
      input_placeholder: 'Enter or paste text here...',
      output_placeholder: 'Result will appear here...',
      copy: 'Copy',
      copied: 'Copied!',
      clear: 'Clear',
      ai_suggestions: 'AI Suggestions',
      stats_chars: 'Chars',
      stats_words: 'Words',
      stats_lines: 'Lines',
      input: 'Input',
      output: 'Output',
    },
    shortcut: {
      help: 'Keyboard Shortcuts',
      close: 'Close',
      cmd_k: 'Command Palette',
      cmd_enter: 'Execute / Transform',
      cmd_shift_c: 'Copy Output',
      alt_shift_t: 'Theme Toggle',
      alt_shift_l: 'Language Toggle',
    },
    search: {
      placeholder: 'What do you want to do? (e.g. uppercase, JSON, Base64)',
      no_results: 'No tools found.',
    },
    ai: {
      reason: {
        case: 'Change case of the text.',
        json: 'Looks like JSON.',
        html: 'Looks like HTML.',
        base64: 'Possibly Base64.',
        url: 'Possibly URL encoded.',
        duplicate: 'Contains duplicate lines.',
        whitespace: 'Contains extra whitespace.',
        time: 'Looks like a UNIX timestamp.',
      }
    },
    category: {
      all: 'ALL',
      case: 'CASE',
      width: 'WIDTH',
      kana: 'KANA',
      code: 'CODE',
      organize: 'ORGANIZE',
      encode: 'ENCODE',
    }
  },
  ja: {
    common: {
      all: 'すべて',
      search: '検索',
      copy: 'コピー',
      copied: 'コピーしました',
      clear: 'クリア',
      total_conversions: '総変換回数',
    },
    nav: { home: 'ホーム', about: 'アバウト' },
    header: {
      title: 'TextFlow',
      search: 'ツールを検索... (Cmd/Ctrl + K)',
      conversions: '総変換回数',
    },
    footer: { madeby: 'Made with ❤️ by manpuc' },
    tool: {
      input_placeholder: 'ここにテキストを入力...',
      output_placeholder: '変換結果がここに表示されます...',
      copy: 'コピー',
      copied: 'コピーしました！',
      clear: 'クリア',
      ai_suggestions: 'AIからの提案',
      stats_chars: '文字数',
      stats_words: '単語数',
      stats_lines: '行数',
      input: '入力',
      output: '出力',
    },
    shortcut: {
      help: 'キーボードショートカット',
      close: '閉じる',
      cmd_k: 'コマンドパレット',
      cmd_enter: '変換実行',
      cmd_shift_c: '結果をコピー',
      alt_shift_t: 'テーマ切り替え',
      alt_shift_l: '言語切り替え',
    },
    search: {
      placeholder: '何がしたいですか？ (例: 大文字、JSON、Base64)',
      no_results: '見つかりませんでした。',
    },
    ai: {
      reason: {
        case: '大文字・小文字を変換できます。',
        json: 'JSONとして整形できそうです。',
        html: 'HTMLとして整形できそうです。',
        base64: 'Base64の可能性があります。',
        url: 'URLエンコードされているようです。',
        duplicate: '重複した行が含まれています。',
        whitespace: '余分な空白が含まれています。',
        time: 'UNIXタイムスタンプのようです。',
      }
    },
    category: {
      all: 'ALL',
      case: 'CASE',
      width: 'WIDTH',
      kana: 'KANA',
      code: 'CODE',
      organize: 'ORGANIZE',
      encode: 'ENCODE',
    }
  },
} as const;
