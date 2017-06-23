export default () => {

    // Add "win7" class to target IE11 on Windows 7
    // IE11 on windows 7 is a littlebit different than IE11 on windows 10 :s
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) {
        document.body.classList.add('win7');
    }


    // Contains all the polyfill for older browsers that babel.js doesn't cover

    // element.closest();
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    if (window.Element && !Element.prototype.closest) {
        Element.prototype.closest =
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i,
                el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) {}
            } while ((i < 0) && (el = el.parentElement));
            return el;
        };
    }

    // element.matches()
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

};
