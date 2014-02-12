var MyGame = {
    "rules": null,
    "debug": true,
    "roundTime": 30000,
    "gameTimer": null,
    "players": [
        {
            "name": '',
            "score": 0,
            "letters": []
        },
        {
            "name": '',
            "score": 0,
            "letters": []
        }
    ],
    "currentPlayer": 0,
    "purse": [],
    "field": [],
    "currentPoints": 0,
    'lettersInField': [],
    "connectedLetters": [],
    "listOfPreviouslyFoundWords": [],
    "listOfWordsFoundDuringTurn":[],


    "start": function () {
        this.rules.createField();
        this.rules.resetPurse();
        this.rules.resetField();
        this.rules.fieldSetStartingWord();
        this.renderCurrentPoints();
        this.renderCurrentPointsForWord();
        this.renderField();
        this.playerTurn();
        this.bindEvents();


       // this.rules.createFieldIfStarIsChosen();
        //this.rules.renderFieldIfStarIsChosen();
    },

    "playerGrabLetters": function () {
        if (this.debug) {
            this.players[this.currentPlayer].letters = ["с", "п", "о", "р", "т", "а", "*"];
        }
        else {
            // Fill the letters array of the player with index "this.currentPlayer" (if he needs more letters).
            for (var i = this.players[this.currentPlayer].letters.length; i < 7; i++) {
                var indexOfRandomCharacter = Math.floor(Math.random() * this.purse.length);
                var randomCharacter = this.purse[indexOfRandomCharacter];
                this.purse.splice(indexOfRandomCharacter, 1);
                this.players[this.currentPlayer].letters.push(randomCharacter);
                this.renderPurse();
            }
        }
    },
    "playerTurn": function () {
        this.resetPlayerVariables();
        this.playerGrabLetters();
        this.renderCurrentPlayer();
        this.renderPlayerLetters();
        this.setTurnTimeout();

    },

    "resetPlayerVariables": function () {
        this.connectedLetters = [];
        this.lettersInField = [];
    },

    "setTurnTimeout": function () {
        var Game = this;
        clearTimeout(Game.gameTimer);
        Game.gameTimer = setTimeout(function () { Game.endTurn(); }, 30000);
    },

    "endTurn": function () {
        var characterToRemove;
        var j;


        // 1. Traverse all letters in field.
        // 2. If there are valid words on field, mark all player letters  as filled.
        // 3. If there aren't any valid words, remove all player letters from field and return them to player stash.
        // 4. Mark all the valid words which were created during the turn as used.
        /* if(Game.wordsUsedDuringCurrentTurn.length != 0){
         for (var i = 0; i < wordsUsedDuringCurrentTurn.length; i++){
         Game.wordsUsedDuringGame.push(wordsUsedDuringCurrentTurn[i]);
         }
         }*/
        this.calculateScore();
        if ( this.listOfWordsFoundDuringTurn.length > 0){
            for( var i=0;i < this.listOfWordsFoundDuringTurn.length;i++ ){
                this.listOfPreviouslyFoundWords.push(this.listOfWordsFoundDuringTurn[i]);
            }
        }

        if (this.currentPoints != 0) {
            this.players[this.currentPlayer].score = this.players[this.currentPlayer].score + this.currentPoints;
            this.currentPoints = 0;
            for (var i = 0; i < this.field.length; i++) {
                for (j = 0; j < this.field[i].length; j++) {
                    if (this.field[i][j].letter != "" && this.field[i][j].status != 'filled') {
                        this.field[i][j].status = 'filled';
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.field.length; i++) {
                for (j = 0; j < this.field[i].length; j++) {
                    if (this.field[i][j].letter != "" && this.field[i][j].status != 'filled') {
                        characterToRemove = this.field[i][j].letter;
                        this.players[this.currentPlayer].letters.push(characterToRemove);
                        this.field[i][j].letter = "";
                        this.field[i][j].status = "";
                    }
                }
            }
        }

        this.renderField();
        this.renderCurrentPoints();
        this.renderCurrentPointsForWord();
        this.renderPurse();

        // Change active player.
        if (this.currentPlayer === 0) {
            this.currentPlayer = 1;
        } else {
            this.currentPlayer = 0;
        }

        this.playerTurn();
    },


    "calculateScore": function () {
        var Game = this;


//        Очищаем (список букв использованных для соствления слова);
//        Очищаем (список слов, найденных за ход).
//        Обнуляем (общий балл)
//        Проверяем есть ли (поставленные буквы) за ход на поле.
//        Если да,
//            для каждой (посталенной буквы):
//                Получаем (направления) по котормы буква не формироала слова ранее из (списка букв использованных для соствления слова).
//                Если такие (направления) есть,
//                    Проверяем соединена ли (наша поставленная буква) с уже (поставленными буквами) или буквами, которые сами соединены с уже поставленными буквами.
//                    Если да,
//                        Найти самые длинные слова по доступным (направлениям), которое формирует (наша поставленная буква), а также записать их (направление).
//                        Если есть слова,
//                           Для каждого слова выполнить:
//                               Проверяем есть ли слово в словаре(и больше ли слово 2-х букв)
//                               проверить нет ли слова в списке найденных слов за всю игру.
//                               проверяем, нет ли слова в списке найденных слов за ход
//                               если да,
//                                    Записываем все наши буквы, использовнные в слове в (список букв использованных для соствления слова).
//                                      - саму букву, координаты и направление.
//                                    Получить бонусы за наши буквы в слове.
//                                    записываем наше (слово) в (список найденных слов за ход).
//                                    общий балл = общий балл + балл за текущее слово
//                               если нет
//                                   вернуть общий балл = 0.
//                    Если нет
//                        вернуть общий балл = 0.
//        Если нет
//            вернуть общий балл = 0.


        var isThereAreMyLettersInField = function () {
            if (Game.lettersInField.length != 0) {
                return true;
            }
            else {
                return false;
            }
        };

        var getDirections = function (letter) {
            var result = {
                "horizontal": true,
                "vertical": true
            };
            if (listOfLettersUsedForCreatingWords.length > 0) {
                for (var i = 0; i < listOfLettersUsedForCreatingWords.length; i++) {
                    if (listOfLettersUsedForCreatingWords[i].letter === letter.letter &&
                        listOfLettersUsedForCreatingWords[i].x === letter.x &&
                        listOfLettersUsedForCreatingWords[i].y === letter.y
                        ) {
                        if (listOfLettersUsedForCreatingWords[i].direction.horizontal === true) {
                            result.horizontal = false;
                        }
                        else if (listOfLettersUsedForCreatingWords[i].direction.vertical === true) {
                            result.vertical = false;
                        }

                    }
                }
            }
            return result;
        }

        var isLetterConnected = function (letter) {
            var visitedLetter = [];
            var IsNotInVisitedLetter = function (visitedLetter, coords) {
                for (var i = 0; i < visitedLetter.length; i++) {
                    if (visitedLetter[i].x === coords.x && visitedLetter[i].y === coords.y) {
                        return false;
                    }
                }
                return true;
            }
            var isConnected = function (x, y) {
                var r1, r2, r3, r4;
                if (x < 0 || x >= Game.field.length || y < 0 || y >= Game.field.length) {
                    return false;
                }
                if (Game.field[x][y].status === "filled") {
                    return true
                }
                else {
                    if (IsNotInVisitedLetter(visitedLetter, {"x": x, "y": y})) {
                        visitedLetter.push({"x": x, "y": y});
                    }
                    else {
                        return false;
                    }
                    if (Game.field[x][y].letter === "") {
                        return false;
                    }
                    r1 = isConnected(x + 1, y);
                    r2 = isConnected(x - 1, y);
                    r3 = isConnected(x, y - 1);
                    r4 = isConnected(x, y + 1);
                    return r1 || r2 || r3 || r4;
                }
            }
            return isConnected(letter.x, letter.y);

        };


        var findNewWords = function (letter, directions) {

            var x = letter.x;
            var y = letter.y;
            var by = y;
            var bx = x;
            var newWord = {
                "word": '',
                "points": 0,
                "letters": [],
                "bonus_word":1
            };
            var newWords = [];

            if (directions.horizontal === true) {
                for (var j = y - 1; j >= 0 && Game.field[x][j].letter != ''; j--) {
                    by = j;
                }
                for (var j = by; j < Game.rules.indexOfPlayField && Game.field[x][j].letter != ''; j++) {
                    newWord.word = newWord.word + Game.field[x][j].letter;
                    newWord.letters.push({"letter": Game.field[x][j].letter, "x": x, "y": j, "direction": {"horizontal": true}, "bonus_letter": Game.field[x][j].bl});

                    if (Game.field[x][j].bw != 1) {
                        newWord.bonus_word = parseFloat(newWord.bonus_word) + parseFloat(Game.field[x][j].bw);
                    }
                }
                if (newWord.word.length >= Game.rules.minimalWordLength) {
                    newWord.points = Game.rules.scoreForWord(newWord);
                    newWords.push(newWord);
                }
            }

            var newWord = {
                "word": '',
                "points": 0,
                "letters": [],
                "bonus_word":1
            };

            if (directions.vertical === true) {

                for (var i = x - 1; i >= 0 && i < Game.field.length && Game.field[i][y].letter != ''; i = i - 1) {
                    bx = i;
                }
                for (var i = bx; i < Game.field.length && Game.field[i][y].letter != ''; i++) {
                    newWord.word = newWord.word + Game.field[i][y].letter;
                    newWord.letters.push({"letter": Game.field[i][y].letter, "x": i, "y": y, "direction": {"vertical": true}, "bonus_letter": Game.field[i][y].bl});

                    if (Game.field[i][y].bw != 1) {
                        newWord.bonus_word = parseFloat(newWord.bonus_word) + parseFloat(Game.field[i][y].bw);
                    }
                }
                if (newWord.word.length >= Game.rules.minimalWordLength) {
                    newWord.points = Game.rules.scoreForWord(newWord);
                    newWords.push(newWord);
                }
            }

            return newWords;
        }

        var isValidWord = function (array, word) {
            if (array.length > 0) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === word) {
                        return true;
                    }
                }
                return false;
            }
            else {
                return false;
            }
        };

        var isWordInDictionary = function (word) {
            return isValidWord(Game.rules.dictionary, word);
        };

        var isWordInListOfPreviouslyFoundWords = function (word) {
            return isValidWord(Game.listOfPreviouslyFoundWords, word);
        };

        var isWordInListOfFoundWordsDuringTurn = function (word) {
            return isValidWord(Game.listOfWordsFoundDuringTurn, word);
        };


        Game.listOfWordsFoundDuringTurn = [];
        Game.currentPoints = 0;
        var listOfLettersUsedForCreatingWords = [];
        var directions, words, char;
        var j, f;
        var letter;
        var word;

        if (isThereAreMyLettersInField()) {
            for (var i = 0; i < Game.lettersInField.length; i++) {
                letter = Game.lettersInField [i];
                directions = getDirections(letter);
                if (directions.horizontal === true || directions.vertical === true) {
                    if (isLetterConnected(letter)) {
                        words = findNewWords(letter, directions);
                        if (words.length > 0) {
                            for (j = 0; j < words.length; j++) {
                                word = words[j];
                                if (isWordInDictionary(word.word) && !isWordInListOfPreviouslyFoundWords(word.word) && !isWordInListOfFoundWordsDuringTurn(word.word)) {
                                    for (f = 0; f < word.letters.length; f++) {
                                        char = word.letters[f];
                                        listOfLettersUsedForCreatingWords.push(char);
                                    }
                                    Game.listOfWordsFoundDuringTurn.push(word.word);
                                    Game.currentPoints = Game.currentPoints + word.points;
                                }
                                else {
                                    Game.currentPoints = 0;
                                    return false;
                                }
                            }
                        }
                    }
                    else {
                        Game.currentPoints = 0;
                        return 0;
                    }
                }
            }
        }
        else {
            return 0;
        }
        this.renderCurrentPointsForWord();
        return Game.currentPoints;

    },
    "renderCurrentPointsForWord": function() {
        $(".current_score span").text(this.currentPoints);
    },
    "renderCurrentPoints": function() {
        if(this.currentPlayer === 0){
            $(".player_1 .total_scores").text(this.players[0].score);
        }
        if(this.currentPlayer === 1){
            $(".player_2 .total_scores").text(this.players[1].score);
        }
    },
    "renderCurrentPlayer": function () {
        if (this.currentPlayer === 0) {
            $(".player_1").removeClass("active");
            $(".player_2").addClass("active");
        } else {
            $(".player_2").removeClass("active");
            $(".player_1").addClass("active");
        }
    },
    "renderPurse": function () {
        $(".all_letters").text(this.purse.length);
    },
    "renderField": function () {
        var selector, classname, CHR;
        var Game = this;

        // 1. Travers all field cells.
        // 2. Color cells which respond for bonus cells and status.
        // 3. Put letter in cell if there is a character in field cell.
        for (var i = 0; i < Game.field.length; i++) {
            for (var j = 0; j < Game.field[i].length; j++) {
                selector = ".play-field tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")";
                classname = "";
                if (Game.field[i][j].status === "filled") {
                    classname = "filled";
                }
                else if (Game.field[i][j].bw != 1) {
                    classname = 'bonus-word' + this.field[i][j].bw;
                }
                else if (Game.field[i][j].bl != 1) {
                    classname = 'bonus-letter' + this.field[i][j].bl;
                }
                if ($(selector).attr("class") != classname) {
                    $(selector).attr("class", classname);
                }

                if (Game.field[i][j].letter != "") {
                    CHR = Game.field[i][j].letter;
                    $(selector).text(CHR);
                }
                else if ($(selector).text() != "") {
                    $(selector).text("");
                }
            }
        }
    },

    "renderPlayerLetters": function () {
        var selector, CHR;

        // 1. Remove all letters from cells and reset active letters.
        // 2. For each letter in player stash, fill cells with letters.

        $(".my_letters tr td").removeAttr('class').text("");
        for (var i = 0; i < this.players[this.currentPlayer].letters.length; i++) {
            CHR = this.players[this.currentPlayer].letters[i];
            selector = ".my_letters tr td:nth-child(" + (i + 1) + ")";
            $(selector).text(CHR);
        }
    },

    "bindEvents": function () {
        $(".my_letters td:not(.bound-click)").click(this.eventMyLettersClick()).addClass("bound-click");
        $(".play-field td:not(.bound-click)").click(this.eventFieldClick()).addClass("bound-click");
        $(".play-field td:not(.bound-dblclick)").dblclick(this.eventFieldDblClick()).addClass("bound-dblclick");
        $(".endTurn a:not(.bound-click)").click(this.eventChangePlayerClick()).addClass("bound-click");
        $(".if_star_chosen div:not(.bound-click)").click(this.rules.eventAlphabetClick()).addClass("bound-click");
    },
    "eventChangePlayerClick": function () {
        var Game = this;
        return function () {
            Game.endTurn();
            return false;
        }
    },
    "eventMyLettersClick": function () {
        var Game = this;
        return function () {
            if ($(this).is(".green")) {
                $(this).removeClass("green");
            }
            else {
                $(".green").removeClass("green");
                if ($(this).text() !== "") {
                    $(this).addClass("green");
                }
            }
        }
    },
    "insertLetterInField": function (x, y, letter) {
        var Game = this;
        Game.field[x][y].letter = letter;
        Game.field[x][y].status = "manual";
        Game.lettersInField.push({"x": x, "y": y, "letter": letter});
    },
    "deleteActiveLetter": function (letter) {
        for (var i = 0; i < this.players[this.currentPlayer].letters.length; i++) {
            if (this.players[this.currentPlayer].letters[i] === letter) {
                this.players[this.currentPlayer].letters.splice(i, 1);
                break;
            }
        }
    },

    "eventFieldClickIfChosenStar":function(){
        this.rules.createFieldIfStarIsChosen();
        this.rules.renderFieldIfStarIsChosen();
    },
    "eventFieldClick": function () {
        var Game = this;
        return function () {
            if ($(this).text() === "") {
                if ($(".my_letters td").is('.green')) {
                    var letterToFind = $(".my_letters td.green").text();
                    var x = parseInt($(this).attr('x'));
                    var y = parseInt($(this).attr('y'));
                    $(this).text(letterToFind);
                    $(".my_letters td.green").text("").removeClass("green");
                    if (letterToFind === "*"){
                    Game.deleteActiveLetter(letterToFind);
                    Game.insertLetterInField(x, y, letterToFind);
                    Game.calculateScore();
                    Game.renderCurrentPointsForWord();
                    Game.eventFieldClickIfChosenStar();
                    }
                    else{
                        Game.deleteActiveLetter(letterToFind);
                        Game.insertLetterInField(x, y, letterToFind);
                        Game.calculateScore();
                        Game.renderCurrentPointsForWord();
                    }
                }
            }
        }
    },
    "deleteSelectedLetterFromField": function (x, y) {
        var Game = this;
        Game.field[x][y].letter = "";
        Game.field[x][y].status = "";

        for (var i = 0; i < Game.lettersInField.length; i++) {
            if (Game.lettersInField[i].x == x && Game.lettersInField[i].y == y) {
                Game.lettersInField.splice(i, 1);
                break;
            }
        }
        for (var i = 0; i < Game.connectedLetters.length; i++) {
            if (Game.connectedLetters[i].x == x && Game.connectedLetters[i].y == y) {
                Game.connectedLetters.splice(i, 1);
                break;
            }
        }
    },
    "setLetterBackToUserLetters": function (character) {
        var Game = this;
        Game.players[Game.currentPlayer].letters.push(character);
    },

    "eventFieldDblClick": function () {
        var Game = this;
        return function () {
            if (!$(this).is(".filled")) {
                var characterToRemove = $(this).text();
                var x = $(this).attr('x');
                var y = $(this).attr('y');
                $(this).text("");
                $(".my_letters td").each(function () {
                    if ($(this).text() === "") {
                        $(this).text(characterToRemove);
                        return false;
                    }
                });

                Game.deleteSelectedLetterFromField(x, y);
                Game.setLetterBackToUserLetters(characterToRemove);
                Game.calculateScore();
                console.log(Game.currentPoints);
            }
        }
    }
}

$(document).ready(function () {
    MyGame.rules = Rules;
    Rules.game = MyGame;
    MyGame.start();
});