#!/usr/bin/env node
/* Hint box contrast check (Nov 14, 2026): the .hintbox rule kept its
   light cream background (#fff8e6) in dark mode and set no text
   colour, so hint text inherited the dark theme's near-white ink
   (#eef4f1) and rendered almost invisibly (about 1.1:1). This check
   extracts the relevant CSS rules from the shipped shell, resolves
   the two theme values of --ink by hand (jsdom's getComputedStyle
   does not resolve var() in this repo, so a computed-style check
   cannot see the pairing), computes the WCAG contrast ratio of the
   hint text on the hint background in both themes, and fails below
   4.5:1. Run: node tests/check-hint-contrast.js
   (SHELL_HTML may point at another copy, e.g. a pre-fix shell, to
   demonstrate the failure this check guards against.) */
const fs = require("fs");
const path = require("path");
const FILE = process.env.SHELL_HTML || path.join(__dirname, "..", "index.html");
const css = fs.readFileSync(FILE, "utf8");
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

function ruleBody(re, label) {
  const m = css.match(re);
  if (!m) return null;
  const decls = {};
  m[1].split(";").forEach((d) => {
    const i = d.indexOf(":");
    if (i > 0) decls[d.slice(0, i).trim()] = d.slice(i + 1).trim();
  });
  return decls;
}
const rootVars = ruleBody(/:root\{([^}]*)\}/);
const darkVars = ruleBody(/html\[data-a11y-theme="dark"\]\{([^}]*)\}/);
const baseHint = ruleBody(/\.hintbox\{([^}]*)\}/);
const darkHint = ruleBody(/html\[data-a11y-theme="dark"\] \.hintbox\{([^}]*)\}/);
ok(!!rootVars && !!rootVars["--ink"], "light theme --ink found");
ok(!!darkVars && !!darkVars["--ink"], "dark theme --ink found");
ok(!!baseHint && !!baseHint.background, "base .hintbox rule with a background found");

function resolve(value, ink) {
  if (!value) return null;
  if (/^var\(--ink\)$/.test(value)) return ink;
  const hex = value.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/);
  return hex ? hex[0] : null;
}
function luminance(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const chan = [0, 2, 4].map((i) => {
    const s = parseInt(h.substr(i, 2), 16) / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2];
}
function contrast(fg, bg) {
  const a = luminance(fg), b = luminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

if (rootVars && darkVars && baseHint) {
  const lightInk = rootVars["--ink"], darkInk = darkVars["--ink"];
  const lightBg = resolve(baseHint.background, lightInk);
  const lightFg = resolve(baseHint.color, lightInk) || lightInk;
  const darkBg = (darkHint && resolve(darkHint.background, darkInk)) || lightBg;
  const darkFg = (darkHint && resolve(darkHint.color, darkInk)) || resolve(baseHint.color, darkInk) || darkInk;
  const lightRatio = contrast(lightFg, lightBg);
  const darkRatio = contrast(darkFg, darkBg);
  console.log("light: text " + lightFg + " on " + lightBg + " = " + lightRatio.toFixed(2) + ":1");
  console.log("dark:  text " + darkFg + " on " + darkBg + " = " + darkRatio.toFixed(2) + ":1");
  ok(lightRatio >= 4.5, "light mode hint contrast at least 4.5:1 (" + lightRatio.toFixed(2) + ":1)");
  ok(darkRatio >= 4.5, "dark mode hint contrast at least 4.5:1 (" + darkRatio.toFixed(2) + ":1)");
}

console.log(fail ? "HINT CONTRAST CHECK FAIL (" + fail + ")" : "HINT CONTRAST CHECK PASS: " + pass + " assertions");
process.exit(fail ? 1 : 0);
