
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isAutoCategory = React.useRef(true);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const t = (key: string) => {
    const keys = key.split('.');
    let cur: any = ui[lang];
    let fallback: any = ui['en'];
    
    let res = cur;
    for (const k of keys) {
      if (!res || res[k] === undefined) {
        res = null;
        break;
      }
      res = res[k];
    }
    
    if (res !== null && typeof res === 'string') return res;
    
    let fbRes = fallback;
    for (const k of keys) {
      if (!fbRes || fbRes[k] === undefined) return key;
      fbRes = fbRes[k];
    }
    return fbRes || key;
  };

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
      case 'alternating': return conversions.toAlternatingCase(text);
      case 'reverse': return conversions.toReverse(text);
      case 'initials': return conversions.toInitials(text);
      case 'full-width': return conversions.toFullWidth(text);
      case 'half-width': return conversions.toHalfWidth(text);
      case 'hiragana': return conversions.toHiragana(text);
      case 'katakana': return conversions.toKatakana(text);
      case 'half-katakana': return conversions.toHalfKatakana(text);
      case 'romaji': return conversions.toRomaji(text);
      case 'upper-camel': return conversions.toUpperCamelCase(text);
      case 'lower-camel': return conversions.toLowerCamelCase(text);
      case 'upper-snake': return conversions.toUpperSnakeCase(text);
      case 'lower-snake': return conversions.toLowerSnakeCase(text);
      case 'upper-kebab': return conversions.toUpperKebabCase(text);
      case 'lower-kebab': return conversions.toLowerKebabCase(text);
      case 'trim': return conversions.trimText(text);
      case 'whitespace': return conversions.cleanWhitespace(text);
      case 'duplicate': return conversions.removeDuplicateLines(text);
      case 'sort': return conversions.sortLines(text);
      case 'remove-nl': return conversions.removeAllNewlines(text);
      case 'remove-ws': return conversions.removeAllWhitespace(text);
      case 'base64-encode': return conversions.encodeBase64(text);
      case 'base64-decode': return conversions.decodeBase64(text);
      case 'url-encode': return conversions.encodeURL(text);
      case 'url-decode': return conversions.decodeURL(text);
      case 'hex-encode': return conversions.toHexStream(text);
      case 'hex-decode': return conversions.fromHexStream(text);
      case 'unicode-escape': return conversions.toUnicodeEscape(text);
      case 'morse': return conversions.toMorse(text);
      case 'braille': return conversions.toBraille(text);
      case 'hieroglyph': return conversions.toHieroglyph(text);
      case 'num-to-bin': return conversions.numToBinary(text);
      case 'num-to-hex': return conversions.numToHex(text);
      case 'num-to-oct': return conversions.numToOctal(text);
      case 'bin-to-num': return conversions.binaryToDec(text);
      case 'hex-to-num': return conversions.hexToDec(text);
      case 'num-to-kanji': return conversions.toKanjiNum(text);
      case 'num-to-frac': return conversions.toFraction(text);
      case 'unix-time': return conversions.toUnixTime(text);
      case 'from-unix': return conversions.fromUnixTime(text);
      case 'nfc': return conversions.normalizeNFC(text);
      case 'nfd': return conversions.normalizeNFD(text);
      case 'caesar': return conversions.caesar(text);
      case 'rot13': return conversions.rot13(text);
      case 'atbash': return conversions.toAtbash(text);
      case 'md5': return conversions.toMD5(text);
      case 'sha256': return conversions.toSHA256(text);
      case 'strike': return conversions.toStrikethrough(text);
      case 'slanted': return conversions.toSlanted(text);
      case 'json-format': return conversions.toJSONFormat(text);
      case 'json-minify': return conversions.toJSONMinify(text);
      case 'html-format': return conversions.formatHTML(text);
      case 'html-minify': return conversions.minifyHTML(text);
      case 'code-format': return conversions.formatCode(text);
      case 'code-minify': return conversions.minifyCode(text);
      case 'from-half-katakana': return conversions.fromHalfKatakana(text);
      case 'half-katakana-to-hiragana': return conversions.toHiragana(conversions.fromHalfKatakana(text));
      default: return text;
    }
  }, []);

  const handleTransform = useCallback((customToolId?: ToolId) => {
    const toolId = customToolId || currentToolId;
    const result = getTransformResult(toolId, inputText);
    setOutputText(result);
    if (!customToolId) setTotalConversions(prev => prev + 1);
  }, [currentToolId, inputText, getTransformResult]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [outputText]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
  }, []);

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

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isTyping = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCommandPaletteOpen(prev => !prev); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); handleTransform(); }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'C') { e.preventDefault(); handleCopy(); }
      if (e.altKey && e.shiftKey && e.key === 'T') { e.preventDefault(); toggleTheme(); }
      if (e.altKey && e.shiftKey && e.key === 'L') { e.preventDefault(); toggleLang(); }
      if (e.key === 'Escape') { setCommandPaletteOpen(false); setShowHelp(false); }
      if (e.key === '?' && !isTyping) { e.preventDefault(); setShowHelp(prev => !prev); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTransform, handleCopy, toggleTheme, toggleLang]);

  useEffect(() => {
    if (!commandPaletteOpen) return;
    const handlePaletteKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredTools.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
      } else if (e.key === 'Enter' && filteredTools.length > 0) {
        e.preventDefault();
        const tool = filteredTools[selectedIndex];
        if (tool) {
          setCurrentToolId(tool.id);
          handleTransform(tool.id);
          setCommandPaletteOpen(false);
          setSearchQuery('');
        }
      }
    };
    window.addEventListener('keydown', handlePaletteKey);
    return () => window.removeEventListener('keydown', handlePaletteKey);
  }, [commandPaletteOpen, selectedIndex, filteredTools, handleTransform]);

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
  const isNumber = /^\d+(\.\d+)?$/.test(trimmedInput);
  const isBase64 = /^[A-Za-z0-9+/]+={0,2}$/.test(trimmedInput.replace(/\s/g, '')) && trimmedInput.length > 5;
  const isUrlEncoded = trimmedInput.includes('%');
  const hasHtmlTags = /<[^>]*>|&[#a-zA-Z0-9]+;/.test(trimmedInput);
  const isHexColor = /^#([A-Fa-f0-9]{3}){1,2}$/.test(trimmedInput);
  const isUnixTime = /^\d{10}$/.test(trimmedInput) || (/^\d{13}$/.test(trimmedInput));

  useEffect(() => {
    if (commandPaletteOpen && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, commandPaletteOpen]);

  useEffect(() => {
    if (inputText) {
      const result = getTransformResult(currentToolId, inputText);
      setOutputText(result);
    } else {
      setOutputText('');
    }
  }, [inputText, currentToolId, getTransformResult]);


  useEffect(() => {
    const hasInput = inputText.trim().length > 0;
    if (hasInput && isAutoCategory.current) {
      const txt = inputText.trim();
      const isJ = (txt.startsWith('{') && txt.endsWith('}')) || (txt.startsWith('[') && txt.endsWith(']'));
      const isH = txt.startsWith('<') && txt.endsWith('>') && txt.includes('/');
      const hasH = /<[^>]*>|&[#a-zA-Z0-9]+;/.test(txt);
      const isC = (txt.includes('{') && txt.includes('}')) || (txt.includes('function') && txt.includes('('));
      const hasJp = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]/.test(txt);
      const isN = /^\d+(\.\d+)?$/.test(txt);
      const isU = /^\d{10}$/.test(txt) || (/^\d{13}$/.test(txt));

      if (isJ || isH || hasH || isC) setActiveCategory('code');
      else if (hasJp) setActiveCategory('kana');
      else if (isN || isU) setActiveCategory('encode');
      else if (txt.split('\n').length > 1) setActiveCategory('organize');
      else if (/[a-zA-Z]/.test(txt) && !/[^a-zA-Z\s]/.test(txt)) setActiveCategory('case');
    } else if (!hasInput) {
      setActiveCategory('all');
      isAutoCategory.current = true;
    }
  }, [inputText]);

  const AI_Suggestions = useMemo(() => {
    const suggestions: { id: ToolId; reason: string }[] = [];
    if (!trimmedInput || trimmedInput.length < 2) return suggestions;

    // Highest Priority: Format specific
    if (isJson) { try { JSON.parse(trimmedInput); suggestions.push({ id: 'json-format', reason: t('ai.reason.json') }); } catch (e) {} }
    if (isHtml || hasHtmlTags) { suggestions.push({ id: 'html-format', reason: t('ai.reason.html') }); }
    
    // Decoding Suggestions
    if (isBase64) { suggestions.push({ id: 'base64-decode', reason: t('ai.reason.base64') }); }
    if (isUrlEncoded) { suggestions.push({ id: 'url-decode', reason: t('ai.reason.url') }); }
    if (isHexColor) { suggestions.push({ id: 'hex-to-num', reason: 'RGB' }); }
    
    // Numeric Suggestions
    if (isNumber) {
      if (isUnixTime) suggestions.push({ id: 'from-unix', reason: t('ai.reason.time') });
      suggestions.push({ id: 'num-to-bin', reason: 'Base2' });
      suggestions.push({ id: 'num-to-kanji', reason: '漢字' });
    }

    // List/String Suggestions
    const lines = inputText.split(/\n/).filter(l => l.trim().length > 0);
    if (lines.length > 2) {
      if (new Set(lines).size < lines.length) suggestions.push({ id: 'duplicate', reason: t('ai.reason.duplicate') });
      suggestions.push({ id: 'sort', reason: 'Order' });
    }

    // Case Suggestions
    if (hasLatin) {
      if (!/[a-z]/.test(trimmedInput)) suggestions.push({ id: 'lower', reason: t('ai.reason.case') });
      else if (!/[A-Z]/.test(trimmedInput)) suggestions.push({ id: 'upper', reason: t('ai.reason.case') });
      else suggestions.push({ id: 'title', reason: t('ai.reason.case') });
    }

    if (isBinary) { suggestions.push({ id: 'binary-decode', reason: t('ai.reason.base64') }); }
    if (/[ \t]{2,}/.test(inputText)) { suggestions.push({ id: 'whitespace', reason: t('ai.reason.whitespace') }); }
    
    return suggestions.slice(0, 3);
  }, [inputText, lang, trimmedInput, isJson, isHtml, hasHtmlTags, isBase64, isUrlEncoded, isBinary, hasLatin, isNumber, isUnixTime, isHexColor]);

  const visibleTools = useMemo(() => {
    return tools.filter(tool => {
      if (activeCategory !== 'all' && tool.category !== activeCategory) return false;
      if (!trimmedInput) return true;
      if (tool.id === currentToolId) return true;
      switch (tool.category) {
        case 'case': return hasLatin;
        case 'width': return hasFullWidth || hasJapanese || /[0-9a-zA-Z]/.test(trimmedInput);
        case 'kana': return hasJapanese || hasKatakana || hasHalfKatakana || hasHiragana;
        case 'code': return isCode || isJson || isHtml || hasHtmlTags || hasSpaces;
        case 'organize': return hasNewlines || hasSpaces;
        case 'encode': return true;
        default: return true;
      }
    });
  }, [trimmedInput, currentToolId, activeCategory, hasLatin, hasFullWidth, hasJapanese, hasKatakana, hasHalfKatakana, hasHiragana, hasSpaces, isJson, isHtml, hasHtmlTags, isCode, hasNewlines]);

  const stats = useMemo(() => conversions.getTextStats(inputText), [inputText]);
  const currentTool = tools.find(t => t.id === currentToolId) || tools[0];

  return (
    <div className="shell min-h-screen flex flex-col bg-primary transition-colors duration-300">
      <header className="h-16 flex items-center justify-between px-6 border-b border-subtle sticky top-0 bg-primary/80 backdrop-blur-lg z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">TextFlow</span>
          </div>
        </div>
        <div className="flex-1 max-w-lg mx-6 group relative cursor-pointer" onClick={() => setCommandPaletteOpen(true)}>
          <div className="w-full h-10 bg-secondary border border-subtle rounded-full flex items-center px-4 text-tertiary gap-3 group-hover:border-strong transition-all">
            <Icon.Search />
            <span className="text-sm truncate">{t('header.search')}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-[10px] text-tertiary uppercase font-bold tracking-wider">{t('header.conversions')}</span>
            <span className="text-sm font-mono font-medium">{(totalConversions / 1000000).toFixed(1)}M</span>
          </div>
          <button onClick={toggleLang} className="p-2 hover:bg-tertiary rounded-lg text-secondary"><Icon.Globe /></button>
          <button onClick={toggleTheme} className="p-2 hover:bg-tertiary rounded-lg text-secondary">{theme === 'light' ? <Icon.Moon /> : <Icon.Sun />}</button>
          <button onClick={() => setShowHelp(true)} className="p-2 hover:bg-tertiary rounded-lg text-secondary"><Icon.Help /></button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row p-4 md:p-6 gap-6 max-w-[1600px] mx-auto w-full">
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-secondary uppercase tracking-widest">{t('tool.input')}</h2>
              <span className="text-xs bg-tertiary px-2 py-1 rounded text-tertiary font-mono">{stats.chars} char</span>
            </div>
            <button onClick={handleClear} className="text-xs text-tertiary hover:text-error transition-colors flex items-center gap-1"><Icon.Trash /> {t('tool.clear')}</button>
          </div>
          <div className="relative flex-1 group">
            <textarea className="w-full h-[300px] md:h-full min-h-[300px] p-6 bg-secondary border border-subtle rounded-2xl focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-lg resize-none font-mono" placeholder={t('tool.input_placeholder')} value={inputText} onChange={(e) => setInputText(e.target.value)} />
            {AI_Suggestions.length > 0 && (
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 animate-fade-in">
                {AI_Suggestions.map((sug) => (
                  <button 
                    key={sug.id} 
                    onClick={() => { setCurrentToolId(sug.id); handleTransform(sug.id); }} 
                    className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white text-sm rounded-full shadow-lg hover:scale-105 transition-transform flex-shrink-0"
                  >
                    <Icon.Sparkles className="flex-shrink-0 w-4 h-4 text-white" /> 
                    <span className="font-bold whitespace-nowrap">{tools.find(t => t.id === sug.id)?.label[lang]}</span> 
                    <span className="opacity-80 text-xs whitespace-nowrap ml-1">({sug.reason})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
              {['all', 'case', 'width', 'kana', 'code', 'organize', 'encode'].map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); isAutoCategory.current = false; }} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-accent-primary text-white' : 'bg-secondary text-tertiary hover:bg-tertiary'}`}>{t(`category.${cat}`)}</button>
              ))}
            </div>
            <div className="flex overflow-x-auto pb-2 gap-2 md:grid md:grid-cols-4 lg:grid-cols-4 md:overflow-visible transition-all">
              {visibleTools.map(tool => (
                <button key={tool.id} onClick={() => { setCurrentToolId(tool.id); handleTransform(tool.id); }} className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-all animate-fade-in hover:scale-105 active:scale-95 ${currentToolId === tool.id ? 'bg-accent-primary text-white border-accent-primary' : 'bg-secondary border-subtle hover:border-strong text-secondary'}`}>{tool.label[lang]}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-widest">{t('tool.output')}</h2>
            <button onClick={handleCopy} className={`text-sm font-bold flex items-center gap-2 px-4 py-1 rounded-full transition-all ${isCopied ? 'bg-success text-white' : 'bg-accent-subtle text-accent-primary hover:bg-accent-primary hover:text-white'}`}>{isCopied ? <Icon.Check /> : <Icon.Copy />} {isCopied ? t('tool.copied') : t('tool.copy')}</button>
          </div>
          <div className="flex-1 flex flex-col relative">
            <textarea readOnly className="w-full h-full min-h-[300px] p-6 bg-tertiary/50 border border-subtle rounded-2xl text-lg font-mono" placeholder={t('tool.output_placeholder')} value={outputText} />
            {currentTool && (
              <div className="mt-4 p-4 rounded-xl bg-secondary border border-subtle text-xs text-tertiary animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-secondary">{currentTool.label[lang]}</p>
                  <div className="flex gap-1">{currentTool.tags[lang].map(tag => ( <span key={tag} className="px-2 py-0.5 rounded-md bg-tertiary text-[10px] font-medium text-tertiary">{tag}</span> ))}</div>
                </div>
                <p className="mb-2">{currentTool.desc[lang]}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {commandPaletteOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-20 px-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-elevated border border-strong rounded-3xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[70vh]">
            <div className="p-4 border-b border-subtle flex items-center gap-3">
              <Icon.Search />
              <input autoFocus className="flex-1 bg-none text-xl" placeholder={t('header.search')} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <span className="text-xs font-mono px-2 py-1 bg-tertiary rounded">ESC</span>
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {filteredTools.length > 0 ? filteredTools.map((tool, index) => (
                <button key={tool.id} ref={el => itemRefs.current[index] = el} onMouseEnter={() => setSelectedIndex(index)} onClick={() => { setCurrentToolId(tool.id); handleTransform(tool.id); setCommandPaletteOpen(false); setSearchQuery(''); }} className={`w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all ${selectedIndex === index ? 'bg-accent-primary/10' : 'hover:bg-tertiary'}`}>
                  <div className="flex flex-col items-start min-w-0 flex-1 mr-4 text-left">
                    <div className="flex items-center gap-10 mb-0.5 w-full">
                      <span className={`font-bold truncate flex-shrink-0 ${selectedIndex === index ? 'text-accent-primary' : 'text-primary'}`}>{tool.label[lang]}</span>
                      <div className="flex gap-1 overflow-hidden">{tool.tags[lang].slice(0, 2).map(tag => ( <span key={tag} className="px-1.5 py-0.5 rounded bg-tertiary text-[9px] text-tertiary whitespace-nowrap">#{tag}</span> ))}</div>
                    </div>
                    <span className="text-xs text-tertiary truncate w-full text-left inline-block">{tool.desc[lang]}</span>
                  </div>
                  {selectedIndex === index && ( <span className="text-[10px] text-accent-primary font-bold uppercase tracking-widest animate-fade-in whitespace-nowrap flex-shrink-0">{lang === 'ja' ? '決定(Enter↵)' : 'Select(Enter↵)'}</span> )}
                </button>
              )) : (
                <div className="p-8 text-center text-tertiary">{t('search.no_results')}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-20 px-4">
           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowHelp(false)} />
           <div className="relative z-10 w-full max-w-md bg-elevated border border-strong rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-subtle flex items-center justify-between">
                <h3 className="font-bold text-lg">{t('shortcut.help')}</h3>
                <button onClick={() => setShowHelp(false)} className="p-2 hover:bg-tertiary rounded-full transition-colors"><Icon.X /></button>
              </div>
              <div className="p-6 space-y-4">
                 {[ { key: 'Cmd + K', label: t('shortcut.cmd_k') }, { key: 'Cmd + Enter', label: t('shortcut.cmd_enter') }, { key: 'Shift + C', label: t('shortcut.cmd_shift_c') }, { key: 'Alt + Shift + T', label: t('shortcut.alt_shift_t') }, { key: 'Alt + Shift + L', label: t('shortcut.alt_shift_l') }, { key: '?', label: t('shortcut.help') }, { key: 'Esc', label: t('shortcut.close') }, ].map(s => (
                   <div key={s.key} className="flex items-center justify-between text-sm">
                     <span className="text-secondary">{s.label}</span>
                     <span className="font-mono bg-tertiary px-3 py-1 rounded-lg text-xs font-bold border border-subtle">{s.key}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      <footer className="p-6 border-t border-subtle bg-secondary/50">
        <a href="https://manpuc.me" target="_blank" rel="noopener noreferrer" className="text-tertiary text-xs hover:text-accent-primary transition-all inline-block hover:scale-105 active:scale-95 no-underline">
          Made with ❤️ by <span className="font-bold">manpuc</span>
        </a>
      </footer>
    </div>
  );
};
