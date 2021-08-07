const Token = require('markdown-it/lib/token')
const arrayReplaceAt = (src, pos, newElements) => {
    return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1))
}

module.exports = md => {
    const figure_def = state => {
        let nesting = 0
        for (let idx = state.tokens.length - 1; idx >= 0; idx--) {
            nesting += state.tokens[idx].nesting
            if (state.tokens[idx].type !== 'inline') continue
            if (nesting !== -1) continue

            let token = state.tokens[idx]
            if (token.children.length !== 1) continue
            if (token.children[0].type !== 'image') continue
            if (state.tokens[idx + 1].type !== 'paragraph_close') continue
            if (state.tokens[idx - 1].type !== 'paragraph_open') continue

            state.tokens[idx + 1] = new Token('figure_close', 'figure', -1)
            state.tokens[idx + 1].block = true
            state.tokens[idx - 1] = new Token('figure_open', 'figure', 1)
            state.tokens[idx - 1].block = true

            let img = token.children[0],
                caption = img.attrGet('title')

            if (!caption) continue

            let inline = new Token('inline', '', 0)
            inline.content = caption
            inline.block = true
            let text = new Token('text', '', 0)
            text.content = caption
            inline.children = [text]

            let figcaption_open = new Token('figcaption_open', 'figcaption', 1)
            figcaption_open.block = true

            let figcaption_close = new Token('figcaption_close', 'figcaption', -1)
            figcaption_close.block = true

            state.tokens = arrayReplaceAt(state.tokens, idx, [
                img,
                figcaption_open,
                inline,
                figcaption_close
            ])
        }
    }

    md.core.ruler.push('figure', figure_def)
}