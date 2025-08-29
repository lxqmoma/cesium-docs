/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript */
const self = typeof window != 'undefined' ? window : {}; const Prism = (function () {
  const e = /\blang(?:uage)?-(?!\*)(\w+)\b/i; var t = self.Prism = { util: { encode(e) { return e instanceof n ? new n(e.type, t.util.encode(e.content)) : t.util.type(e) === 'Array' ? e.map(t.util.encode) : e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00A0/g, ' ') }, type(e) { return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1] }, clone(e) { const n = t.util.type(e); switch (n) { case 'Object':var r = {}; for (const i in e)e.hasOwnProperty(i) && (r[i] = t.util.clone(e[i])); return r; case 'Array':return e.slice() } return e } }, languages: { extend(e, n) { const r = t.util.clone(t.languages[e]); for (const i in n)r[i] = n[i]; return r }, insertBefore(e, n, r, i) {
    i = i || t.languages; const s = i[e]; const o = {}; for (const u in s) {
      if (s.hasOwnProperty(u)) {
        if (u == n) {
          for (const a in r)r.hasOwnProperty(a) && (o[a] = r[a])
        } o[u] = s[u]
      }
    } return i[e] = o
  }, DFS(e, n) { for (const r in e) { n.call(e, r, e[r]); t.util.type(e) === 'Object' && t.languages.DFS(e[r], n) } } }, highlightAll(e, n) { const r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'); for (var i = 0, s; s = r[i++];)t.highlightElement(s, e === !0, n) }, highlightElement(r, i, s) {
    let o; let u; let a = r; while (a && !e.test(a.className))a = a.parentNode; if (a) { o = (a.className.match(e) || [,''])[1]; u = t.languages[o] } if (!u)
      return; r.className = `${r.className.replace(e, '').replace(/\s+/g, ' ')} language-${o}`; a = r.parentNode; /pre/i.test(a.nodeName) && (a.className = `${a.className.replace(e, '').replace(/\s+/g, ' ')} language-${o}`); const f = r.textContent; if (!f)
      return; const l = { element: r, language: o, grammar: u, code: f }; t.hooks.run('before-highlight', l); if (i && self.Worker) { const c = new Worker(t.filename); c.onmessage = function (e) { l.highlightedCode = n.stringify(JSON.parse(e.data), o); t.hooks.run('before-insert', l); l.element.innerHTML = l.highlightedCode; s && s.call(l.element); t.hooks.run('after-highlight', l) }; c.postMessage(JSON.stringify({ language: l.language, code: l.code })) }
    else { l.highlightedCode = t.highlight(l.code, l.grammar, l.language); t.hooks.run('before-insert', l); l.element.innerHTML = l.highlightedCode; s && s.call(r); t.hooks.run('after-highlight', l) }
  }, highlight(e, r, i) { const s = t.tokenize(e, r); return n.stringify(t.util.encode(s), i) }, tokenize(e, n, r) {
    const i = t.Token; const s = [e]; const o = n.rest; if (o) { for (var u in o)n[u] = o[u]; delete n.rest }e:for (var u in n) {
      if (!n.hasOwnProperty(u) || !n[u])
        continue; let a = n[u]; const f = a.inside; const l = !!a.lookbehind; let c = 0; a = a.pattern || a; for (let h = 0; h < s.length; h++) {
        const p = s[h]; if (s.length > e.length)
          break e; if (p instanceof i)
          continue; a.lastIndex = 0; var d = a.exec(p); if (d) { l && (c = d[1].length); const v = d.index - 1 + c; var d = d[0].slice(c); const m = d.length; const g = v + m; const y = p.slice(0, v + 1); const b = p.slice(g + 1); const w = [h, 1]; y && w.push(y); const E = new i(u, f ? t.tokenize(d, f) : d); w.push(E); b && w.push(b); Array.prototype.splice.apply(s, w) }
      }
    } return s
  }, hooks: { all: {}, add(e, n) { const r = t.hooks.all; r[e] = r[e] || []; r[e].push(n) }, run(e, n) {
    const r = t.hooks.all[e]; if (!r || !r.length)
      return; for (var i = 0, s; s = r[i++];)s(n)
  } } }; var n = t.Token = function (e, t) { this.type = e; this.content = t }; n.stringify = function (e, r, i) {
    if (typeof e == 'string')
      return e; if (Object.prototype.toString.call(e) == '[object Array]')
      return e.map((t) => { return n.stringify(t, r, e) }).join(''); const s = { type: e.type, content: n.stringify(e.content, r, i), tag: 'span', classes: ['token', e.type], attributes: {}, language: r, parent: i }; s.type == 'comment' && (s.attributes.spellcheck = 'true'); t.hooks.run('wrap', s); let o = ''; for (const u in s.attributes)o += `${u}="${s.attributes[u] || ''}"`; return `<${s.tag} class="${s.classes.join(' ')}" ${o}>${s.content}</${s.tag}>`
  }; if (!self.document) {
    if (!self.addEventListener)
      return self.Prism; self.addEventListener('message', (e) => { const n = JSON.parse(e.data); const r = n.language; const i = n.code; self.postMessage(JSON.stringify(t.tokenize(i, t.languages[r]))); self.close() }, !1); return self.Prism
  } let r = document.getElementsByTagName('script'); r = r[r.length - 1]; if (r) { t.filename = r.src; document.addEventListener && !r.hasAttribute('data-manual') && document.addEventListener('DOMContentLoaded', t.highlightAll) } return self.Prism
}()); typeof module != 'undefined' && module.exports && (module.exports = Prism)
Prism.languages.markup = { comment: /<!--[\s\S]*?-->/g, prolog: /<\?.+?\?>/, doctype: /<!DOCTYPE.+?>/, cdata: /<!\[CDATA\[[\s\S]*?\]\]>/i, tag: { pattern: /<\/?[\w:-]+\s*(?:\s[\w:-]+(?:=(?:("|')(\\?[\s\S])*?\1|[^\s'">=]+))?\s*)*\/?>/g, inside: { 'tag': { pattern: /^<\/?[\w:-]+/, inside: { punctuation: /^<\/?/, namespace: /^[\w-]+:/ } }, 'attr-value': { pattern: /=(?:('|")[\s\S]*?(\1)|[^\s>]+)/g, inside: { punctuation: /[=>"]/g } }, 'punctuation': /\/?>/g, 'attr-name': { pattern: /[\w:-]+/g, inside: { namespace: /^[\w-]+:/ } } } }, entity: /&#?[\da-z]{1,8};/gi }; Prism.hooks.add('wrap', (e) => { e.type === 'entity' && (e.attributes.title = e.content.replace(/&amp;/, '&')) })
Prism.languages.css = { comment: /\/\*[\s\S]*?\*\//g, atrule: { pattern: /@[\w-].*?(;|(?=\s*\{))/g, inside: { punctuation: /[;:]/g } }, url: /url\((["']?).*?\1\)/gi, selector: /[^{}\s][^{};]*(?=\{)/g, property: /(\b|\B)[\w-]+(?=\s*:)/g, string: /("|')(\\?.)*?\1/g, important: /\B!important\b/gi, punctuation: /[{};:]/g, function: /[-a-z0-9]+(?=\()/gi }; Prism.languages.markup && Prism.languages.insertBefore('markup', 'tag', { style: { pattern: /<style[\s\S]*?>[\s\S]*?<\/style>/gi, inside: { tag: { pattern: /<style[\s\S]*?>|<\/style>/gi, inside: Prism.languages.markup.tag.inside }, rest: Prism.languages.css } } })
Prism.languages.clike = { 'comment': { pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|(^|[^:])\/\/.*(\r?\n|$))/g, lookbehind: !0 }, 'string': /("|')(\\?.)*?\1/g, 'class-name': { pattern: /((?:class|interface|extends|implements|trait|instanceof|new)\s+|catch\s+\()[\w.\\]+/gi, lookbehind: !0, inside: { punctuation: /(\.|\\)/ } }, 'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g, 'boolean': /\b(true|false)\b/g, 'function': { pattern: /\w+\(/g, inside: { punctuation: /\(/ } }, 'number': /\b-?(0x[\dA-Fa-f]+|(?:\d+(?:\.\d+)?|\.\d+)([Ee]-?\d+)?)\b/g, 'operator': /[-+]{1,2}|[!?*/~^%]|<=?|>=?|={1,3}|&{1,2}|\|?\|/g, 'ignore': /&(lt|gt|amp);/gi, 'punctuation': /[{}[\];(),.:]/g }
Prism.languages.javascript = Prism.languages.extend('clike', { keyword: /\b(var|let|if|else|while|do|for|return|in|instanceof|function|get|set|new|with|typeof|try|throw|catch|finally|null|break|continue|this)\b/g, number: /\b-?(0x[\dA-Fa-f]+|(?:\d+(?:\.\d+)?|\.\d+)([Ee]-?\d+)?|NaN|-?Infinity)\b/g }); Prism.languages.insertBefore('javascript', 'keyword', { regex: { pattern: /(^|[^/])\/(?!\/)(\[.+?\]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g, lookbehind: !0 } }); Prism.languages.markup && Prism.languages.insertBefore('markup', 'tag', { script: { pattern: /<script[\s\S]*?>[\s\S]*?<\/script>/gi, inside: { tag: { pattern: /<script[\s\S]*?>|<\/script>/gi, inside: Prism.languages.markup.tag.inside }, rest: Prism.languages.javascript } } })
