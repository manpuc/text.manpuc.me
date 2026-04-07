
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Icon } from './Icon';
import { tools, type ToolDef, type ToolId } from '../data/tools';
import * as conversions from '../lib/conversions';
import { ui } from '../i18n/ui';

interface ShellProps {
  initialLang: 'ja' | 'en';
}

export const Shell: React.FC<ShellProps> = ({ initialLang }) => {
  const [lang, setLang] = useState<'ja' | 'en'>(initialLang);
  const [currentToolId, setCurrentToolId] = useState<ToolId>('upper');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [totalConversions, setTotalConversions] = useState(12431002); // Mock total
  const [isCopied, setIsCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const t = (key: keyof typeof ui['en']) => ui[lang][key] || ui['en'][key];

  // Theme Sync
  useEffect(() => {
    const root = document.documentElement;
    const initialTheme = root.getAttribute('data-theme') as 'light' | 'dark' || 'light';
    setTheme(initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  }, [theme]);

  const toggleLang = useCallback(() => {
    setLang(l => (l === 'ja' ? 'en' : 'ja'));
  }, []);

  // Conversion Logic
  const getTransformResult = useCallback((toolId: ToolId, text: string) => {
    switch (toolId) {
      case 'upper': return conversions.toUpperCase(text);
      case 'lower': return conversions.toLowerCase(text);
      case 'title': return conversions.toTitleCase(text);
      case 'sentence': return conversions.toSentenceCase(text);
      case 'full-width': return conversions.toFullWidth(text);
      case 'half-width': return conversions.toHalfWidth(text);
      case 'hiragana': return conversions.toHiragana(text);
      case 'katakana': return conversions.toKatakana(text);
      case 'half-katakana': return conversions.toHalfKatakana(text);
      case 'from-half-katakana': return conversions.fromHalfKatakana(text);
      case 'half-katakana-to-hiragana': return conversions.toHiragana(conversions.fromHalfKatakana(text));
      case 'romaji': return conversions.toRomaji(text);
      case 'slug': return conversions.toSlug(text);
      case 'camel': return conversions.toCamelCase(text);
      case 'snake': return conversions.toSnakeCase(text);
      case 'pascal': return conversions.toPascalCase(text);
      case 'trim': return conversions.trimText(text);
      case 'whitespace': return conversions.cleanWhitespace(text);
      case 'line-breaks': return conversions.cleanLineBreaks(text);
      case 'duplicate': return conversions.removeDuplicateLines(text);
      case 'sort': return conversions.sortLines(text);
      case 'base64-encode': return conversions.encodeBase64(text);
      case 'base64-decode': return conversions.decodeBase64(text);
      case 'url-encode': return conversions.encodeURL(text);
      case 'url-decode': return conversions.decodeURL(text);
      case 'html-encode': return conversions.encodeHTMLEntity(text);
      case 'html-decode': return conversions.decodeHTMLEntity(text);
      case 'json-format': return conversions.formatJSON(text);
      case 'json-minify': return conversions.minifyJSON(text);
      case 'binary-encode': return conversions.textToBinary(text);
      case 'binary-decode': return conversions.binaryToText(text);
      case 'num-to-bin': return conversions.numberToBinary(text);
      case 'bin-to-num': return conversions.binaryToNumber(text);
      case 'html-format': return conversions.formatHTML(text);
      case 'html-minify': return conversions.minifyHTML(text);
      case 'code-format': return conversions.formatCode(text);
      case 'code-minify': return conversions.minifyCode(text);
      case 'strike': return conversions.toStrikethrough(text);
      case 'slanted': return conversions.toSlanted(text);
      case 'remove-nl': return conversions.removeAllNewlines(text);
      case 'remove-ws': return conversions.removeAllWhitespace(text);
      default: return text;
    }
  }, []);

  const handleTransform = useCallback((customToolId?: ToolId) => {
    const toolId = customToolId || currentToolId;
    const result = getTransformResult(toolId, inputText);
    setOutputText(result);
    if (!customToolId) setTotalConversions(prev => prev + 1);
  }, [currentToolId, inputText, getTransformResult]);

  // Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in certain elements but allow specific combos
      const isTyping = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName);

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleTransform();
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        handleCopy();
      }
      if (e.altKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
      }
      if (e.altKey && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        toggleLang();
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setShowHelp(false);
      }
      if (e.key === '?' && !isTyping) {
        e.preventDefault();
        setShowHelp(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTransform, toggleTheme, toggleLang, theme]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  // Auto-transform logic
  useEffect(() => {
    if (inputText) {
      const result = getTransformResult(currentToolId, inputText);
      setOutputText(result);
    } else {
      setOutputText('');
    }
  }, [inputText, currentToolId, getTransformResult]);

  // Heuristics for AI and Filtering
  const trimmedInput = inputText.trim();
  const hasLatin = /[a-zA-Z]/.test(trimmedInput);
  const hasHiragana = /[\u3041-\u3096]/.test(trimmedInput);
  const hasKatakana = /[\u30A1-\u30FA]/.test(trimmedInput);
  const hasHalfKatakana = /[\uFF66-\uFF9F]/.test(trimmedInput);
  const hasJapanese = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]/.test(trimmedInput);
  const hasFullWidth = /[！-～]/.test(trimmedInput);
  const hasSpaces = /\s/.test(trimmedInput);
  const hasNewlines = /\n/.test(trimmedInput);
  const isJson = (trimmedInput.startsWith('{') && trimmedInput.endsWith('}')) || (trimmedInput.startsWith('[') && trimmedInput.endsWith(']'));
  const isHtml = trimmedInput.startsWith('<') && trimmedInput.endsWith('>') && trimmedInput.includes('/');
  const isCode = (trimmedInput.includes('{') && trimmedInput.includes('}')) || (trimmedInput.includes('function') && trimmedInput.includes('('));
  const isBinary = /^[01\s]+$/.test(trimmedInput) && trimmedInput.length > 3;
  const isNumber = /^\d+$/.test(trimmedInput);
  const isBase64 = /^[A-Za-z0-9+/]+={0,2}$/.test(trimmedInput.replace(/\s/g, '')) && trimmedInput.length > 5;
  const isUrlEncoded = trimmedInput.includes('%');
  const hasHtmlTags = /<[^>]*>|&[#a-zA-Z0-9]+;/.test(trimmedInput);

  // AI Suggestion Logic
  const AI_Suggestions = useMemo(() => {
    const suggestions: { id: ToolId; reason: string }[] = [];
    if (!trimmedInput || trimmedInput.length < 2) return suggestions;

    // JSON check
    if ((trimmedInput.startsWith('{') && trimmedInput.endsWith('}')) || 
        (trimmedInput.startsWith('[') && trimmedInput.endsWith(']'))) {
      try {
        JSON.parse(trimmedInput);
        if (!inputText.includes('\n')) {
          suggestions.push({ id: 'json-format', reason: t('ai.reason.json') });
        } else if (!inputText.includes(' ')) {
          suggestions.push({ id: 'json-format', reason: t('ai.reason.json') });
        }
      } catch (e) {}
    }

    // HTML check
    if (trimmedInput.startsWith('<') && trimmedInput.endsWith('>') && trimmedInput.includes('/')) {
      if (!inputText.includes('\n') || inputText.length > 500) {
        suggestions.push({ id: 'html-format', reason: t('ai.reason.json') });
      }
      if (inputText.includes('\n')) {
        suggestions.push({ id: 'html-minify', reason: t('ai.reason.whitespace') });
      }
    }

    // Base64 check
    const base64Clean = trimmedInput.replace(/\s/g, '');
    if (base64Clean.length > 12 && /^[A-Za-z0-9+/]+={0,2}$/.test(base64Clean)) {
       try {
         const decoded = conversions.decodeBase64(base64Clean);
         if (!decoded.startsWith('Error') && decoded.length > 3) {
           suggestions.push({ id: 'base64-decode', reason: t('ai.reason.base64') });
         }
       } catch (e) {}
    }

    // URL check
    if (inputText.includes('%') && /%[0-9A-Fa-f]{2}/.test(inputText)) {
      suggestions.push({ id: 'url-decode', reason: t('ai.reason.url') });
    }

    // Binary / Number
    if (/^[01\s]+$/.test(trimmedInput) && trimmedInput.length > 7) {
      if (trimmedInput.replace(/\s/g, '').length % 8 === 0) {
        suggestions.push({ id: 'binary-decode', reason: t('ai.reason.base64') });
      }
      suggestions.push({ id: 'bin-to-num', reason: t('ai.reason.base64') });
    }

    // Organize - Duplicates
    const lines = inputText.split(/\n/).filter(l => l.trim().length > 0);
    if (lines.length > 3 && new Set(lines).size < lines.length) {
      suggestions.push({ id: 'duplicate', reason: t('ai.reason.duplicate') });
    }

    // Whitespace / Newlines
    if (/[ \t]{2,}/.test(inputText)) {
      suggestions.push({ id: 'whitespace', reason: t('ai.reason.whitespace') });
    }
    if (/\n\s*\n\s*\n/.test(inputText)) {
      suggestions.push({ id: 'line-breaks', reason: t('ai.reason.whitespace') });
    }
    if (inputText.startsWith(' ') || inputText.endsWith(' ')) {
      suggestions.push({ id: 'trim', reason: t('ai.reason.whitespace') });
    }

    // Case / Decoration
    if (trimmedInput.length > 5 && hasLatin && !/[a-z]/.test(trimmedInput)) {
      suggestions.push({ id: 'lower', reason: t('ai.reason.case') });
    }
    if (trimmedInput.length > 5 && hasLatin && !/[A-Z]/.test(trimmedInput)) {
      suggestions.push({ id: 'title', reason: t('ai.reason.case') });
    }
    if (trimmedInput.length > 10 && hasLatin && !trimmedInput.includes('\u0336')) {
       // Only suggest strike/slanted if it's plain text
       if (!isHtml && !isJson) {
         suggestions.push({ id: 'slanted', reason: t('ai.reason.case') });
       }
    }

    return suggestions.slice(0, 3);
  }, [inputText, lang, hasLatin, isHtml, isJson]);

  // Statistics
  // Filter tools for the button grid (dynamic based on input)
  const visibleTools = useMemo(() => {
    if (!trimmedInput) return tools;

    return tools.filter(tool => {
      // Always show current or related pairs
      if (tool.id === currentToolId) return true;
      if (currentToolId === 'base64-encode' && tool.id === 'base64-decode') return true;
      if (currentToolId === 'base64-decode' && tool.id === 'base64-encode') return true;
      if (currentToolId === 'num-to-bin' && tool.id === 'bin-to-num') return true;
      if (currentToolId === 'bin-to-num' && tool.id === 'num-to-bin') return true;

      // Global must-haves
      if (tool.id === 'trim') return true; 

      switch (tool.category) {
        case 'case': return hasLatin;
        case 'width': return hasFullWidth || hasJapanese || /[0-9a-zA-Z]/.test(trimmedInput);
        case 'kana': 
          if (tool.id === 'hiragana') return hasKatakana || hasHalfKatakana;
          if (tool.id === 'katakana') return hasHiragana;
          if (tool.id === 'half-katakana') return hasHiragana || hasKatakana;
          if (tool.id === 'from-half-katakana' || tool.id === 'half-katakana-to-hiragana') return hasHalfKatakana;
          return hasJapanese;
        case 'code':
          if (tool.id === 'slug' || tool.id === 'camel' || tool.id === 'snake' || tool.id === 'pascal') return hasSpaces || hasLatin;
          if (tool.id === 'json-format' || tool.id === 'json-minify') return isJson;
          if (tool.id === 'html-format' || tool.id === 'html-minify') return isHtml || hasHtmlTags;
          if (tool.id === 'code-format' || tool.id === 'code-minify') return isCode || isJson;
          return true;
        case 'organize':
          if (tool.id === 'whitespace') return /[ \t]{2,}/.test(inputText);
          if (tool.id === 'line-breaks') return /\n\s*\n/.test(inputText);
          if (tool.id === 'duplicate' || tool.id === 'sort') return hasNewlines || trimmedInput.length > 50;
          if (tool.id === 'remove-nl') return hasNewlines;
          if (tool.id === 'remove-ws') return hasSpaces;
          return true;
        case 'encode':
          if (tool.id === 'base64-decode') return isBase64;
          if (tool.id === 'url-decode') return isUrlEncoded;
          if (tool.id === 'html-decode') return hasHtmlTags;
          if (tool.id === 'binary-decode' || tool.id === 'bin-to-num') return isBinary;
          if (tool.id === 'num-to-bin') return isNumber;
          return true;
        default: return true;
      }
    });
  }, [inputText, currentToolId]);

  const stats = useMemo(() => conversions.getTextStats(inputText), [inputText]);

  const filteredTools = useMemo(() => {
    if (!searchQuery) return tools;
    const q = searchQuery.toLowerCase();
    return tools.filter(tool => 
      tool.label[lang].toLowerCase().includes(q) || 
      tool.id.toLowerCase().includes(q) || 
      tool.category.toLowerCase().includes(q) ||
      tool.tags[lang].some(tag => tag.toLowerCase().includes(q))
    );
  }, [searchQuery, lang]);

  const currentTool = tools.find(t => t.id === currentToolId) || tools[0];

  return (
    <div className="shell min-h-screen flex flex-col bg-primary transition-colors duration-300">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-subtle sticky top-0 bg-primary/80 backdrop-blur-lg z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">TextFlow</span>
          </div>
        </div>

        {/* Command Palette Trigger */}
        <div 
          className="flex-1 max-w-lg mx-6 group relative cursor-pointer"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <div className="w-full h-10 bg-secondary border border-subtle rounded-full flex items-center px-4 text-tertiary gap-3 group-hover:border-strong transition-all">
            <Icon.Search />
            <span className="text-sm truncate">{t('header.search')}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Badge */}
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-[10px] text-tertiary uppercase font-bold tracking-wider">{t('header.conversions')}</span>
            <span className="text-sm font-mono font-medium">{(totalConversions / 1000000).toFixed(1)}M</span>
          </div>

          <button onClick={toggleLang} className="p-2 hover:bg-tertiary rounded-lg text-secondary" title="Switch Language">
            <Icon.Globe />
          </button>
          <button onClick={toggleTheme} className="p-2 hover:bg-tertiary rounded-lg text-secondary" title="Toggle Theme">
            {theme === 'light' ? <Icon.Moon /> : <Icon.Sun />}
          </button>
          <button onClick={() => setShowHelp(true)} className="p-2 hover:bg-tertiary rounded-lg text-secondary">
            <Icon.Help />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row p-4 md:p-6 gap-6 max-w-[1600px] mx-auto w-full">
        {/* Input Column */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-secondary uppercase tracking-widest">Input</h2>
              <div className="flex gap-2">
                <span className="text-xs bg-tertiary px-2 py-1 rounded text-tertiary font-mono">{stats.chars} char</span>
              </div>
            </div>
            <button onClick={handleClear} className="text-xs text-tertiary hover:text-error transition-colors flex items-center gap-1">
              <Icon.Trash /> {t('tool.clear')}
            </button>
          </div>
          
          <div className="relative flex-1 group">
            <textarea
              className="w-full h-[300px] md:h-full min-h-[300px] p-6 bg-secondary border border-subtle rounded-2xl focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-lg resize-none font-mono"
              placeholder={t('tool.input_placeholder')}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            
            {/* AI Suggestion Chips */}
            {AI_Suggestions.length > 0 && (
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 animate-fade-in">
                {AI_Suggestions.map((sug) => (
                  <button
                    key={sug.id}
                    onClick={() => {
                      setCurrentToolId(sug.id);
                      handleTransform(sug.id);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white text-sm rounded-full shadow-lg hover:scale-105 transition-transform"
                  >
                    <Icon.Sparkles />
                    <span className="font-medium">{tools.find(t => t.id === sug.id)?.label[lang]}</span>
                    <span className="opacity-70 text-xs"> E{sug.reason}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Tool Menu (Mobile scroll, Desktop grid) */}
          <div className="flex overflow-x-auto pb-2 gap-2 md:grid md:grid-cols-4 lg:grid-cols-5 md:overflow-visible transition-all">
            {visibleTools.map(tool => (
              <button
                key={tool.id}
                onClick={() => {
                  setCurrentToolId(tool.id);
                  handleTransform(tool.id);
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-all animate-fade-in hover:scale-105 active:scale-95 ${
                  currentToolId === tool.id 
                    ? 'bg-accent-primary text-white border-accent-primary' 
                    : 'bg-secondary border-subtle hover:border-strong text-secondary'
                }`}
              >
                {tool.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Output Column */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between mb-1">
             <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-secondary uppercase tracking-widest">Output</h2>
              <div className="flex gap-2">
                <span className="text-xs bg-tertiary px-2 py-1 rounded text-tertiary font-mono">{outputText.length} char</span>
              </div>
            </div>
            <button 
              onClick={handleCopy}
              className={`text-sm font-bold flex items-center gap-2 px-4 py-1 rounded-full transition-all ${isCopied ? 'bg-success text-white' : 'bg-accent-subtle text-accent-primary hover:bg-accent-primary hover:text-white'}`}
            >
              {isCopied ? <Icon.Check /> : <Icon.Copy />}
              {isCopied ? t('tool.copied') : t('tool.copy')}
            </button>
          </div>

          <div className="flex-1 flex flex-col relative">
             <textarea
              readOnly
              className="w-full h-full min-h-[300px] p-6 bg-tertiary/50 border border-subtle rounded-2xl text-lg font-mono"
              placeholder={t('tool.output_placeholder')}
              value={outputText}
            />
             {currentTool && (
               <div className="mt-4 p-4 rounded-xl bg-secondary border border-subtle text-xs text-tertiary animate-fade-in">
                 <div className="flex items-center justify-between mb-2">
                   <p className="font-bold text-secondary">{currentTool.label[lang]}</p>
                   <div className="flex gap-1">
                     {currentTool.tags[lang].map(tag => (
                       <span key={tag} className="px-2 py-0.5 rounded-md bg-tertiary text-[10px] font-medium text-tertiary">{tag}</span>
                     ))}
                   </div>
                 </div>
                 <p className="mb-2">{currentTool.desc[lang]}</p>
                 <p className="mt-2 text-[10px] opacity-70">
                    {t('tool.today_used').replace('{count}', Math.floor(Math.random() * 5000 + 1000).toLocaleString())}
                 </p>
               </div>
            )}
          </div>
        </div>
      </main>

      {/* Command Palette Modal */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-20 px-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-elevated border border-strong rounded-3xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[70vh]">
            <div className="p-4 border-b border-subtle flex items-center gap-3">
              <Icon.Search />
              <input 
                autoFocus
                className="flex-1 bg-none text-xl"
                placeholder={t('header.search')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <span className="text-xs font-mono px-2 py-1 bg-tertiary rounded">ESC</span>
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {filteredTools.length > 0 ? filteredTools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setCurrentToolId(tool.id);
                    handleTransform(tool.id);
                    setCommandPaletteOpen(false);
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center justify-between p-4 hover:bg-tertiary rounded-2xl text-left transition-all group"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">{tool.label[lang]}</span>
                    <span className="text-xs text-tertiary">{tool.desc[lang]}</span>
                  </div>
                  <span className="text-[10px] text-tertiary opacity-0 group-hover:opacity-100 uppercase tracking-widest">Jump to tool</span>
                </button>
              )) : (
                <div className="p-8 text-center text-tertiary">{t('search.no_results')}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-20 px-4">
           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowHelp(false)} />
           <div className="relative z-10 w-full max-w-md bg-elevated border border-strong rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-subtle flex items-center justify-between">
                <h3 className="font-bold text-lg">{t('shortcut.help')}</h3>
                <button onClick={() => setShowHelp(false)} className="p-2 hover:bg-tertiary rounded-full transition-colors"><Icon.X /></button>
              </div>
              <div className="p-6 space-y-4">
                 {[
                   { key: 'Cmd + K', label: t('shortcut.cmd_k') },
                   { key: 'Cmd + Enter', label: t('shortcut.cmd_enter') },
                   { key: 'Shift + C', label: t('shortcut.cmd_shift_c') },
                   { key: 'Alt + Shift + T', label: t('shortcut.alt_shift_t') },
                   { key: 'Alt + Shift + L', label: t('shortcut.alt_shift_l') },
                   { key: '?', label: t('shortcut.help') },
                   { key: 'Esc', label: t('shortcut.close') },
                 ].map(s => (
                   <div key={s.key} className="flex items-center justify-between text-sm">
                     <span className="text-secondary">{s.label}</span>
                     <span className="font-mono bg-tertiary px-3 py-1 rounded-lg text-xs font-bold border border-subtle">{s.key}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Footer */}
      <footer className="p-6 border-t border-subtle bg-secondary/50">
        <a 
          href="https://manpuc.me" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-tertiary text-xs hover:text-accent-primary transition-all inline-block hover:scale-105 active:scale-95 no-underline"
        >
          Made with ❤️ by <span className="font-bold">manpuc</span>
        </a>
      </footer>
    </div>
  );
};
