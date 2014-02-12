var Rules = {
    "game":null,
    "indexOfPlayField": 15,
    "dictionary": ['тос','рис','сад','сан','нас','гас','чон','чек','сик','вик','мед','крем','ром','ато', 'спор', 'спорт', 'дорога', 'машина', "тир", 'рот', 'тик', 'бон', 'том', 'рот', 'лопата', 'дурак', 'желание', 'новинка', 'решение', "эрудит", "лес", "бак", "зад", "зал", "бег", "снег", "юла", "эра", "гора", "река", "дно", "дыра", "торпеда", "чистота"],
    "alphabet":["а","б","в","г","д","е","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ы","ь","э","ю","я"],
    "fieldIfStarIsChosen":[],
    "scores": {
        "а": 1,
        "о": 1,
        "е": 1,
        "и": 1,
        "н": 2,
        "р": 2,
        "с": 2,
        "т": 2,
        "в": 2,
        "д": 2,
        "к": 2,
        "л": 2,
        "п": 2,
        "м": 2,
        "й": 2,
        "у": 3,
        "б": 3,
        "г": 3,
        "я": 3,
        "ь": 5,
        "ы": 5,
        "з": 5,
        "ж": 5,
        "х": 5,
        "ч": 5,
        "ц": 5,
        "ш": 10,
        "э": 10,
        "ю": 10,
        "ф": 10,
        "щ": 10,
        "ъ": 10

        // Google rules and fill it up
    },

    "minimalWordLength":2,
     "createField": function () {
        for (var i = 0; i < this.indexOfPlayField; i++) {
            var tr = parent.document.createElement("tr");
            for (j = 0; j < this.indexOfPlayField; j++) {
                var td = parent.document.createElement("td");
                td.setAttribute('x', i);
                td.setAttribute('y', j);
                tr.appendChild(td);
            }
            $(".play-field").append(tr);
        }
    },
    "resetPurse": function () {
        // Google erudit rules and implement this function. Put the letters in global purse.
        this.game.purse = [];
        var resetLetter = function (Game, from, to, character) {
            for (var i = from; i < to; i++) {
                Game.purse[i] = character;
            }
        }
        resetLetter(this.game,0, 10, "a");
        resetLetter(this.game,10, 12, "б");
        resetLetter(this.game,12, 17, "в");
        resetLetter(this.game,17, 20, "г");
        resetLetter(this.game,20, 25, "д");
        resetLetter(this.game,25, 34, "е");
        resetLetter(this.game,34, 36, "ж");
        resetLetter(this.game,36, 38, "з");
        resetLetter(this.game,38, 46, "и");
        resetLetter(this.game,46, 50, "й");
        resetLetter(this.game,50, 56, "к");
        resetLetter(this.game,56, 60, "л");
        resetLetter(this.game,60, 65, "м");
        resetLetter(this.game,65, 73, "н");
        resetLetter(this.game,73, 83, "о");
        resetLetter(this.game,83, 89, "п");
        resetLetter(this.game,89, 95, "р");
        resetLetter(this.game,95, 101, "с");
        resetLetter(this.game,101, 106, "т");
        resetLetter(this.game,106, 109, "у");
        resetLetter(this.game,109, 110, "ф");
        resetLetter(this.game,110, 112, "х");
        resetLetter(this.game,112, 113, "ц");
        resetLetter(this.game,113, 115, "ч");
        resetLetter(this.game,115, 116, "ш");
        resetLetter(this.game,116, 117, "щ");
        resetLetter(this.game,117, 118, "ъ");
        resetLetter(this.game,118, 120, "ы");
        resetLetter(this.game,120, 122, "ь");
        resetLetter(this.game,122, 123, "э");
        resetLetter(this.game,123, 124, "ю");
        resetLetter(this.game,124, 127, "я");
        resetLetter(this.game,127, 130, "*");
    },
    "resetField": function () {
        // Google erudit rules and implement this function.
        var array = [];
        for (var i = 0; i < this.indexOfPlayField; i++) {
            array[i] = [];
            for (var j = 0; j < this.indexOfPlayField; j++) {
                array[i][j] = {
                    'letter': "",
                    'bw': "1",
                    'bl': "1",
                    'status': ""
                };

            }
        }

        for (i = 0; i < this.indexOfPlayField; i = i + 7) {
            for (j = 0; j < this.indexOfPlayField; j = j + 7) {
                array[i][j].bw = 3;
                if (i === 7 && j === 7) {
                    array[i][j].bw = 1;
                }
            }
        }

        for (i = 1; i < 5; i++) {
            array[i][i].bw = 2;
            array[14 - i][i].bw = 2;
            array[i][14 - i].bw = 2;
            array[14 - i][14 - i].bw = 2;
        }
        for (j = 1; j < this.indexOfPlayField; j = j + 4) {
            array[5][j].bl = 3;
            array[9][j].bl = 3;
        }
        for (j = 5; j < 10; j = j + 4) {
            array[1][j].bl = 3;
            array[13][j].bl = 3;
        }
        for (j = 3; j < this.indexOfPlayField; j = j + 8) {
            array[0][j].bl = 2;
            array[14][j].bl = 2;
        }
        for (j = 6; j < 9; j = j + 2) {
            array[2][j].bl = 2;
            array[12][j].bl = 2;
            array[6][j].bl = 2;
            array[8][j].bl = 2;
        }
        for (j = 0; j < this.indexOfPlayField; j = j + 7) {
            array[3][j].bl = 2;
            array[11][j].bl = 2;
        }
        for (j = 2; j < this.indexOfPlayField; j = j + 10) {
            array[6][j].bl = 2;
            array[8][j].bl = 2;
        }
        for (j = 3; j < this.indexOfPlayField; j = j + 8) {
            array[7][j].bl = 2;
        }
        this.game.field = array;
    },
    "fieldSetStartingWord": function () {
        // 1. Select word from dictionary, which is more than 5 letters, but less than 7 letters (see rules).
        // 2. Put the word into field array in center, letter by letter.

        var keywords = [];
        var k;
        for (k = 0; k < this.dictionary.length; k++) {
            if (this.dictionary[k].length === 7) {
                keywords.push(this.dictionary[k]);
            }
        }
        var index;
        if (this.game.debug) {
            index = 1;
        }
        else {
            index = Math.floor(Math.random() * keywords.length);
        }
        var keywordElement = keywords[index];
        var keyword = keywordElement.split('');
        var keywordLetter;
        var indexOfKeyLetter = 3;
        for (i = 0; i < keyword.length; i++) {
            keywordLetter = keyword[i];
            indexOfKeyLetter = indexOfKeyLetter + 1;
            this.game.field[7][indexOfKeyLetter].letter = keywordLetter;
            this.game.field[7][indexOfKeyLetter].status = "filled";
            keywordLetter = "";
        }
    },
    "createFieldIfStarIsChosen": function(){
        for( var i = 0; i<32 ;i++ ){
            var div = parent.document.createElement("div");
            div.setAttribute('x', i);
            $(".if_star_chosen").append(div);
            }

    },
    "removeFieldIfStarIsChosen":function(){
        $(".if_star_chosen div").remove();
    },
    "renderFieldIfStarIsChosen": function(){
        var CHR,selector;
        for(var i = 0;i<this.alphabet.length;i++){
            selector = ".if_star_chosen div:nth-child(" + (i + 1) + ")";
            CHR = this.alphabet[i];
            $(selector).text(CHR);
        }
        this.game.bindEvents();
    },
    "eventAlphabetClick":function(){
        var Rules = this;
        return function () {
            var z;
            var selectedLetter;
            z = $(this).attr("x");
            selectedLetter = Rules.alphabet[z];
            var i = Rules.game.lettersInField.length - 1;
            var x = Rules.game.lettersInField[i].x;
            var y = Rules.game.lettersInField[i].y;
            Rules.game.lettersInField.splice(i,1);
            Rules.game.insertLetterInField(x, y, selectedLetter);
            Rules.game.renderField();
            Rules.game.calculateScore();
            Rules.game.renderCurrentPointsForWord();
            Rules.removeFieldIfStarIsChosen();
        }
    },
    "scoreForWord": function(array){
        var points;
        var word_points = 0;
        var pointsForWord;
        for (var i = 0; i < array.letters.length; i++) {
            points = this.scores[array.letters[i].letter] * array.letters[i].bonus_letter;
            word_points = word_points + points;
        }
        pointsForWord = word_points * array.bonus_word;
        return pointsForWord;
    }

}