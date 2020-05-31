export class UtilService {
    static getFactorioIconUrl(id) {
        id = id[0].toUpperCase() + id.slice(1).toLowerCase();
        return `https://wiki.factorio.com/images/${id}.png`;
    }
    static getFactorioIconImg(id) {
        const el = document.createElement('img');
        el.src = this.getFactorioIconUrl(id);
        el.alt = id;
        el.title = id;
        el.className = "factorio-icon";
        return el;
    }
    static getFactorioIconNumberCombo(id, num) {
        const elWrap = document.createElement('div');
        elWrap.className = "f-icon-wrap";
        const elText = document.createElement('div');
        elText.className = "factorio-icon-text";
        elText.innerHTML = num;
        elWrap.appendChild(this.getFactorioIconImg(id));
        elWrap.appendChild(elText);
        return elWrap;
    }
    // https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript
    static syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                }
                else {
                    cls = 'string';
                }
            }
            else if (/true|false/.test(match)) {
                cls = 'boolean';
            }
            else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
}
