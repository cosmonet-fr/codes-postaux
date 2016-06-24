var data = require('./codes-postaux.json'),
    index = {};

data.forEach(function (entry) {
    if (! (entry.codePostal in index)) {
        index[entry.codePostal] = [];
    }
    index[entry.codePostal].push(entry);
});

exports.find = function (postalCode) {
    return index[postalCode] || [];
};


/** Communes with 0 inhabitants (“communes mortes pour la France”).
 * A sensible dataset to use for testing in any application that has a precondition where postal codes should map to a physical person.
 */
var _deadCommunes;  // lazy load & memoize

Object.defineProperty(exports, 'dead', {
    get: function getDeadCommunes() {
        if (! _deadCommunes) {
            var DEAD_INSEE_CODES = [ '55039', '55050', '55239', '55307', '55139', '55189' ];

            _deadCommunes = data.filter(function(commune) {
                return DEAD_INSEE_CODES.indexOf(commune.codeInsee) > -1;
            });
        }

        return _deadCommunes;
    }
});
