
import * as conversions from './src/lib/conversions.js';

const test = (name, fn, input, expected) => {
  const result = fn(input);
  console.log(`${name}: [${input}] -> [${result}] ${result === expected ? '✅' : '❌ (Expected: ' + expected + ')'}`);
};

console.log('Testing conversions...');
test('toUpperCase', conversions.toUpperCase, 'hello', 'HELLO');
test('toLowerCase', conversions.toLowerCase, 'HELLO', 'hello');
test('toTitleCase', conversions.toTitleCase, 'hello world', 'Hello World');
test('toFullWidth', conversions.toFullWidth, 'abc 123', 'ａｂｃ　１２３');
test('toHalfWidth', conversions.toHalfWidth, 'ａｂｃ　１２３', 'abc 123');
test('toHiragana', conversions.toHiragana, 'アイウエオ', 'あいうえお');
test('toKatakana', conversions.toKatakana, 'あいうえお', 'アイウエオ');
test('toSlug', conversions.toSlug, 'Hello World!', 'hello-world');
test('toCamelCase', conversions.toCamelCase, 'hello world', 'helloWorld');
test('toSnakeCase', conversions.toSnakeCase, 'hello World', 'hello_world');
test('toPascalCase', conversions.toPascalCase, 'hello world', 'HelloWorld');
test('trimText', conversions.trimText, '  hello  ', 'hello');
test('cleanWhitespace', conversions.cleanWhitespace, 'hello    world', 'hello world');
test('cleanLineBreaks', conversions.cleanLineBreaks, 'line1\n\n\nline2', 'line1\nline2');
test('removeDuplicateLines', conversions.removeDuplicateLines, 'a\nb\na', 'a\nb');
test('sortLines', conversions.sortLines, 'c\nb\na', 'a\nb\nc');
test('encodeBase64', conversions.encodeBase64, 'こんにちは', '44GT44KT44Gr44Gh44Gv');
test('decodeBase64', conversions.decodeBase64, '44GT44KT44Gr44Gh44Gv', 'こんにちは');
test('encodeURL', conversions.encodeURL, 'hello world', 'hello%20world');
test('decodeURL', conversions.decodeURL, 'hello%20world', 'hello world');
test('formatJSON', conversions.formatJSON, '{"a":1}', '{\n  "a": 1\n}');

console.log('Stats:', conversions.getTextStats('hello world\nline2'));
