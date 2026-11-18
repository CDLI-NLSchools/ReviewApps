#!/usr/bin/env node
/* Word (.docx) image check (Nov 18, 2026): a diagram-bearing set's
   Word download must carry its diagrams and photos as embedded media.
   Before the fix the export's walker skipped SVG outright and had no
   IMG handling at all, so a Math 2201 set downloaded as a Word file
   arrived with every graph and figure missing (teacher report through
   Report a Problem, verified by Jason on a 2201 set the same day).
   jsdom cannot rasterize, so this check replaces the two rasterizer
   functions with a stub returning a 1x1 PNG and then verifies the
   whole wiring around them on a real drawn set: media collection,
   drawing emission at each node's position (question body and answer
   key alike), media parts, relationships and content types. The
   browser rasterizers themselves are exercised in a real Chromium
   pass recorded in the fix report.
   Run: NODE_PATH=/home/hatch/workspace/physics-2204-review/node_modules node tests/check-word-images.js */
const fs = require("fs");
const { JSDOM } = require("jsdom");
const FILE = process.env.HOME + "/workspace/review-app-unified/index.html";
const html = fs.readFileSync(FILE, "utf8");
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

function boot(qs) {
  return new Promise((resolve) => {
    const dom = new JSDOM(html, {
      url: "file:///home/hatch/workspace/review-app-unified/index.html?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      beforeParse(w) { w.HTMLElement.prototype.scrollIntoView = function () {}; }
    });
    dom.window.TextEncoder = TextEncoder;
    dom.window.TextDecoder = TextDecoder;
    setTimeout(() => settleBoot(dom).then(() => resolve(dom)), 2000);
  });
}
/* Same loader-timing adaptation as tests/print-smoke.js. */
function settleBoot(dom) {
  return new Promise((res) => {
    let waited = 0;
    const iv = setInterval(() => {
      waited += 50;
      let ready = false;
      try { ready = dom.window.eval("typeof BANK !== 'undefined' && BANK.length > 0"); } catch (e) {}
      if (ready || waited >= 4000) {
        clearInterval(iv);
        try {
          dom.window.eval("(function(){"
            + "var p=new URLSearchParams(location.search);"
            + "if(!window.__COURSE)return;"
            + "if(p.get('set')){if(!window.T)tRebuildFromURL();return;}"
            + "if(!(p.get('unit')||p.get('preset')||p.get('indicator')))return;"
            + "var m=p.get('mode');"
            + "if(m==='sheet'||m==='worksheet'){if(!sheetState)startSheet();}"
            + "else if(m==='exam'){if(!examState)startExam();}"
            + "else if(!current||!current.length)startOnline();"
            + "})()");
        } catch (e) {}
        setTimeout(() => res(dom), 80);
      }
    }, 50);
  });
}
const ev = (d, code) => d.window.eval(code);

/* Minimal reader for the stored-entry ZIPs the app writes. */
function unzip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) { if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; } }
  if (eocd < 0) throw new Error("no end of central directory");
  const count = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const files = {};
  for (let k = 0; k < count; k++) {
    const nameLen = buf.readUInt16LE(off + 28), extraLen = buf.readUInt16LE(off + 30), comLen = buf.readUInt16LE(off + 32);
    const name = buf.toString("utf8", off + 46, off + 46 + nameLen);
    const size = buf.readUInt32LE(off + 20);
    const lho = buf.readUInt32LE(off + 42);
    const lNameLen = buf.readUInt16LE(lho + 26), lExtraLen = buf.readUInt16LE(lho + 28);
    files[name] = buf.slice(lho + 30 + lNameLen + lExtraLen, lho + 30 + lNameLen + lExtraLen + size);
    off += 46 + nameLen + extraLen + comLen;
  }
  return files;
}

const TINY_PNG_B64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

(async () => {
  const d = await boot("course=math-2201&unit=2&mode=sheet&teacher=1&mc=6&nc=6&seed=probe1");
  const doc = d.window.document;
  const prev = doc.querySelector("#sheetPrev");
  ok(!!prev, "sheet: preview rendered");
  ok(ev(d, "sheetState.items.length") === 12, "sheet: drew the requested 12 questions");

  /* Stub the rasterizers (jsdom has no canvas): every image node
     "converts" to the same 1x1 PNG, so counts and positions are what
     this check proves. */
  const pngBytes = Array.from(Buffer.from(TINY_PNG_B64, "base64"));
  ev(d, "window.__testPng = new Uint8Array(" + JSON.stringify(pngBytes) + ");");
  ev(d, "docxRasterizeSvgNode = function () { return Promise.resolve(window.__testPng); };");
  ev(d, "docxRasterizeImgNode = function () { return Promise.resolve(window.__testPng); };");

  /* A solution figure inside the answer key: the sheet key carries
     its diagrams as inline SVG in the solution markup when a solution
     has one, so stand one in at the end of the key to prove key-side
     placement as well as question-side placement. */
  const kb = prev.querySelector(".keybreak");
  ok(!!kb, "sheet: answer key present in the preview");
  const figDiv = doc.createElement("div");
  figDiv.setAttribute("class", "fig");
  figDiv.innerHTML = '<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Solution graph"><line x1="10" y1="190" x2="290" y2="190" stroke="#000"/></svg>';
  kb.appendChild(figDiv);

  const nodeCount = prev.querySelectorAll("svg, img").length;
  const figCount = prev.querySelectorAll(".fig svg").length;
  ok(figCount >= 4, "sheet: the drawn set carries diagram figures (saw " + figCount + ")");
  ok(nodeCount >= 6, "sheet: preview carries image nodes to convert (saw " + nodeCount + ")");

  const b64 = await ev(d, "makeWordDocxAsync(document.getElementById('sheetPrev')).then(function (b) {"
    + "var s = '', i; for (i = 0; i < b.length; i += 8192) s += String.fromCharCode.apply(null, b.subarray(i, i + 8192));"
    + "return btoa(s); })");
  const files = unzip(Buffer.from(b64, "base64"));
  const names = Object.keys(files);
  const media = names.filter((n) => /^word\/media\/image\d+\.png$/.test(n));
  ok(media.length === nodeCount,
     "docx: one embedded media part per image node (" + media.length + " media vs " + nodeCount + " nodes)");
  ok(media.every((n) => files[n].length === pngBytes.length), "docx: every media part carries the converted PNG bytes");
  const docXml = files["word/document.xml"].toString("utf8");
  const drawings = (docXml.match(/<w:drawing>/g) || []).length;
  ok(drawings === nodeCount, "docx: document carries one drawing per image node (saw " + drawings + ")");
  const rels = files["word/_rels/document.xml.rels"] ? files["word/_rels/document.xml.rels"].toString("utf8") : "";
  const relIds = (rels.match(/Id="rIdImg\d+"/g) || []).length;
  ok(relIds === nodeCount, "docx: one image relationship per drawing (saw " + relIds + ")");
  ok(media.every((n) => rels.includes('Target="media/' + n.split("/").pop() + '"')),
     "docx: every media part is the target of a relationship");
  ok(files["[Content_Types].xml"].toString("utf8").includes('Extension="png"'),
     "docx: content types declare the png extension");
  const keyAt = docXml.indexOf("Answer Key");
  ok(keyAt > 0 && docXml.lastIndexOf("<w:drawing>") > keyAt,
     "docx: the answer key's figure drawing lands after the answer key heading");
  ok(docXml.indexOf("<w:drawing>") >= 0 && docXml.indexOf("<w:drawing>") < keyAt,
     "docx: question-side drawings land in the sheet body, before the answer key");

  /* A root with no images produces the plain four-part package. */
  const plain = doc.createElement("div");
  plain.id = "wordImgPlain";
  plain.innerHTML = "<p>Text only, no images.</p>";
  doc.body.appendChild(plain);
  const b64plain = await ev(d, "makeWordDocxAsync(document.getElementById('wordImgPlain')).then(function (b) {"
    + "var s = '', i; for (i = 0; i < b.length; i += 8192) s += String.fromCharCode.apply(null, b.subarray(i, i + 8192));"
    + "return btoa(s); })");
  const pfiles = unzip(Buffer.from(b64plain, "base64"));
  ok(!Object.keys(pfiles).some((n) => n.startsWith("word/media/")), "docx (no images): no media parts");
  ok(!("word/_rels/document.xml.rels" in pfiles), "docx (no images): no document relationships part");
  ok(!pfiles["word/document.xml"].toString("utf8").includes("<w:drawing>"), "docx (no images): no drawings");

  /* The synchronous builder (used by other checks) still works and
     simply carries no images when media was not prepared. */
  const syncBytes = ev(d, "makeWordDocx(document.getElementById('sheetPrev'))");
  ok(syncBytes && syncBytes.length > 1000, "docx (sync builder): still produces a document");
  d.window.close();

  console.log(fail ? "WORD IMAGES FAIL (" + fail + ")" : "WORD IMAGES PASS: " + pass + " assertions");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("HARNESS ERROR: " + (e && e.stack || e)); process.exit(2); });
