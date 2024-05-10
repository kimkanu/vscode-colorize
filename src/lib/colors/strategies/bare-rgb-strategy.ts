import ColorExtractor from '../color-extractor';
import Color from '../color';
import { DOT_VALUE, ALPHA, EOL } from '../../util/regexp';
import ColorStrategy from './__strategy-base';

const R_RED = `(?:\\d{1,3}${DOT_VALUE}?|${DOT_VALUE})`;
const R_GREEN = R_RED;
const R_BLUE = R_RED;
const R_PERCENTAGE = `(?:\\d{0,2}${DOT_VALUE}?|100(?:\\.0+)?)`;
const R_ALPHA = `(?:${ALPHA}|${R_PERCENTAGE}%)`;

export const REGEXP = new RegExp(`(${R_RED}\\s+${R_GREEN}\\s+${R_BLUE}(?:\\s*\\/\\s*${R_ALPHA})?)${EOL}`, 'gi');
export const REGEXP_ONE = new RegExp(`(${R_RED}\\s+${R_GREEN}\\s+${R_BLUE}(?:\\s*\\/\\s*${R_ALPHA})?)${EOL}`, 'i');

function extractRGBA(value: string): number[] {
  const [rgb_string, a_string] = value.split('/').map(s => s.trim());
  const rgb = rgb_string.split(/\s+/g).map(c => parseFloat(c));
  const alpha = !a_string ? 1 : a_string.endsWith('%') ? parseFloat(a_string) / 100 : parseFloat(a_string);
  return [...rgb, alpha];
}

function getColor(match: RegExpExecArray): Color {
  const value = match[1];
  console.log('value!!', value);
  const rgba = extractRGBA(value);
  const alpha = rgba[3] || 1;
  const rgb = rgba.slice(0, 3) as [number, number, number];
  // Check if it's a valid rgb(a) color
  if (rgb.every(c => c <= 255)) {
    return new Color(match[1], match.index, rgb, alpha);
  }
  return null;
}
const strategy = new ColorStrategy('BARE_RGB', REGEXP, REGEXP_ONE, getColor);
ColorExtractor.registerStrategy(strategy);
