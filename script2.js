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
    "wordsUsedDuringGame":[],
    "wordsUsedDuringCurrentTurn":[],

    "start": function () {
        this.rules.createField();
        this.rules.resetPurse();
        this.rules.resetField();
        this.rules.fieldSetStartingWord();
        this.renderField();
        this.playerTurn();
        this.bindEvents();
    },

    "playerGrabLetters": function () {
        if (this.debug) {
            this.players[this.currentPlayer].letters = ["с", "п", "о", "р", "т", "а", "а"];
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
        clearTimeout(this.gameTimer);
        this.gameTimer = setTimeout(this.endTurn, this.roundTime);
    },

    "endTurn": function () {
        var characterToRemove;
        var Game = this;

        // 1. Traverse all letters in field.
        // 2. If there are valid words on field, mark all player letters  as filled.
        // 3. If there aren't any valid words, remove all player letters from field and return them to player stash.
        // 4. Mark all the valid words which were created during the turn as used.
        if(Game.wordsUsedDuringCurrentTurn.length != 0){
            for (var i = 0; i < wordsUsedDuringCurrentTurn.length; i++){
                Game.wordsUsedDuringGame.push(wordsUsedDuringCurrentTurn[i]);
            }
        }

        for (var i = 0; i < Game.field.length; i++) {
            for (var j = 0; j < Game.field[i].length; j++) {
                if (Game.currentPoints != 0) {
                    if (Game.field[i][j].letter != "" && Game.field[i][j].status != 'filled') {
                        Game.field[i][j].status = 'filled';
                    }
                }
                else {
                    if (Game.field[i][j].letter != "" && Game.field[i][j].status != 'filled') {
                        characterToRemove = Game.field[i][j].letter;
                        Game.players[Game.currentPlayer].letters.push(characterToRemove);
                        Game.field[i][j].letter = "";
                        Game.field[i][j].status = "";
                    }
                }
            }
        }
        Game.renderField();

        // Change active player.
        if (Game.currentPlayer === 0) {
            Game.currentPlayer = 1;
        } else {
            Game.currentPlayer = 0;
        }

        Game.playerTurn();
    },


    "calculateScore": function () {

        var letter;
        var results;
        var word;
        var bonuses,score;
//        Очищаем (список букв использованных для соствления слова);
//        Очищаем список слов,найденных за ход.
//        общий бал = 0
//        Проверяем (есть ли (поставленные буквы) за ход на поле).
//        Если да,
//            для каждой (посталенной буквы):
//                Проверяем не использовалась ли эта буква для создания слова ранее.
//                Если да,
//                    Проверяем соединена ли (наша поставленная буква) с уже (поставленными буквами) или буквами, которые сами соединены с уже поставленными буквами.
//                    Если да,
//                        Найти самые длинные слова, которое формирует (наша поставленная буква).
//                        Для каждого слова выполнить:
//                            Проверяем есть ли слово в словаре(и больше ли слово 2-х букв)
//                            проверить нет ли слова в списке найденных слов за всю игру.
//                            проверяем, нет ли слова в   списке найденных слов за ход
//                            если да,
//                                записываем все наши буквы, использовнные в слове в список букв использованных для соствления слова.(если они не были включены туда ранее)
//                                записываем наше (слово) в (список найденных слов за ход).
//                                получить бонусы за наши буквы в слове.
//                                общий балл = общий балл + балл за текущее слово
//                            если нет
//                                вернуть общий балл = 0.
//                    Если нет
//                        вернуть общий балл = 0.
//        Если нет
//            вернуть общий балл = 0.

        var Game = this;


        var lettersInField = [];


        var isThereAreMyLettersInField = function(){
            for(var i=0; i<Game.field.length; i++){
                for(j=0; j<Game.field[i].length; j++){
                    if ( Game.field[i][j].letter != "" && Game.field[i][j].status != "filled"){
                        lettersInField.push(Game.field[i][j])
                    }
                }
            }
            if (LettersInField.length != 0){
                return true;
            }
            else {
                return false;
            }

        };


        var letterUsedPreviouslyForCreatingWord = function (letter) {
            if (listOfLettersUsedInWords.length != 0) {
                for (var i = 0; i < listOfLettersUsedInWords.length; i++) {
                    if (listOfLettersUsedInWords[i] === letter) {
                        if (letter.htrace == 1 && letter.vtrace == 1){

                        }
                    }
                }

                return false;

            }
            else {
                return false;
            }
        };



        var IsLetterConnected = function(letter){
            var visitedLetter = [];
            var IsNotInVisitedLetter = function(array,xy){
                for(var i = 0;i < array.length; i++){
                    if(array[i] === xy){
                        return false;
                        break;
                    }
                }
                return true;
            }
            var isConnected = function(x,y){
                var r1, r2, r3, r4;
                if(x < 0 || x > this.field.length || y < 0 || y > this.game.field.length){
                    return false;
                }
                if (this.field[x][y].status === "filled"){
                    return true
                }
                else {
                    if (IsNotInVisitedLetter(visitedLetter,(x,y))){
                        IsLetterConnected.push(x,y);
                    }
                    else {
                        return false;
                    }
                    if(this.field[x][y].letter === ""){
                        return false;
                    }
                    r1 = isConnected(x+1,y);
                    r2 = isConnected(x-1,y);
                    r3 = isConnected(x,y-1);
                    r4 = isConnected(x,y+1);
                    return r1|| r2 || r3 || r4;
                }
            }

        };




        var findNewWords = function(letter){
            var x = letter.x;
            var y = letter.y;
            var by,bx;
            var array = {
                "word": '',
                "chars": [],
                "word_bonus": 1
            };



            for (j = y - 1; j >= 0 && this.field[x][j].letter != ''; j = j - 1) {
                by = j;
            }
            for (j = by; j < this.field[x].length && this.field[x][j].letter != ''; j++) {
                if (Game.field[x][j].htrace != 1) {
                    array.chars.push(this.field[x][j].letter);
                    array.word = array.word + this.field[x][j].letter;
                }
                else {
                    return false;
                }
            }
            if (isWordInDictionary(array.word) && !isWordInListOfFoundWordsDuringTurn(array.word) && !isWordInListOfPreviouslyFoundWords(array.word) ){
                array.chars.htrace = 1;
                listOfLettersUsedInWords.push(array.chars);
            }

            array = {
                "word": '',
                "chars": [],
                "word_bonus": 1
            };

                for (i = x - 1; i >= 0 && this.field[i][y].letter != ''; i--) {
                    bx = i;
                }
                for (i = bx; i < this.field.length && this.field[i][y].letter != ''; i++) {
                    if (Game.field[x][j].vtrace != 1) {
                        array.chars.push(this.field[i][y].letter);
                        array.word = array.word + this.field[i][y].letter;
                    }
                    else {
                        return false;
                    }
                }
            if (isWordInDictionary(array.word) && !isWordInListOfFoundWordsDuringTurn(array.word) && !isWordInListOfPreviouslyFoundWords(array.word) ){
                array.chars.vtrace = 1;
                listOfLettersUsedInWords.push(array.chars);
                }
                return array;
            };



        var isWordInDictionary = function(word){
            for(var i = 0; i< Game.dictionary.length; i++){
                if (Game.dictionary[i] === word) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };



        var listOfWordsFoundDuringTurn = [];



        var isWordInListOfFoundWordsDuringTurn = function(word){
            if(listOfWordsFoundDuringTurn.length != 0){
                for(var i=0; i < listOfWordsFoundDuringTurn.length; i++){
                    if(listOfWordsFoundDuringTurn[i] === word){
                        return true;
                    }
                }
               return false;
            }
            else {
                return false;
            }
        };

        var isWordInListOfPreviouslyFoundWords = function(){
            if(isWordInListOfPreviouslyFoundWords.length != 0){
                for(var i=0; i < isWordInListOfPreviouslyFoundWords.length; i++){
                    if(isWordInListOfPreviouslyFoundWords[i] === word){
                        return true;
                    }
                }
                return false;
            }
            else {
                return false;
            }
        };



        var pushLettersToListOfUsedLetters = function(letters,list){
            for (var i = 0; i < letters.length; i++){
                list.push(letters[i]);
            }
        };



        var getBonusesForWord = function(array){
                    var points;
                    var word_points = 0;
                    var finalScore;
                        for (var k = 0; k < array.length; k++) {
                            var l = array[k]; // {"letter": "a", "bonus": 1}

                            points = Game.rules.scores[l.letter] * l.bonus;
                            word_points = word_points + points;
                        }
                }

                var scoreForWord = function(word, bonuses){
                    finalScore = finalScore + word_points * array.word_bonus;
                    return finalScore;
        };





        var listOfLettersUsedInWords = [];
        var listOfWordsFoundDuringTurn = [];
        var currentScore = 0;
        if (isThereAreMyLettersInField()) {
            for (var i = 0; i < Game.lettersInField; i++) {
                letter = Game.lettersInField [i];
                if (!letterUsedPreviouslyForCreatingWord(letter)) {
                    if (IsLetterConnected(letter)) {
                        results = findNewWords(letter);
                        for (j = 0; j < results.length; j++) {
                            word = results[j].word;
                            if (isWordInDictionary(word) && !isWordInListOfFoundWordsDuringTurn(word) && !isWordInListOfPreviouslyFoundWords(word)) {
                                pushLettersToListOfUsedLetters(results.chars, listOfLettersUsedInWords);
                                listOfWordsFoundDuringTurn.push(results.word);
                                bonuses = getBonusesForWord(word);
                                currentScore = currentScore + scoreForWord(word, bonuses);
                            }
                            else {
                                return 0;
                            }
                        }
                    }
                    else {
                        return 0;
                    }
                }
            }
        }
        else {
            return 0;
        }

        return currentScore;






        this.currentPoints = 0;
        for (var i = 0; i < this.rules.indexOfPlayfield; i++) {
            for (var j = 0; j < this.rules.indexOfPlayfield; j++) {
                this.field[i][j].connected = false;
            }
        }
        var connect = function (Game, x, y) {
            Game.field[x][y].connected = true;
            if (((x + 1) < Game.rules.indexOfPlayField) && (Game.field[x + 1][y].status == 'manual') && (Game.field[x + 1][y].connected != true)) {
                connect(Game, x + 1, y);
            }
            if (((x - 1) >= 0) && (Game.field[x - 1][y].status == 'manual') && (Game.field[x - 1][y].connected != true)) {
                connect(Game, x - 1, y);
            }
            if (((y + 1) < Game.rules.indexOfPlayField) && (Game.field[x][y + 1].status == 'manual') && (Game.field[x][y + 1].connected != true)) {
                connect(Game, x, y + 1);
            }
            if (((y - 1) >= 0) && (Game.field[x][y - 1].status == 'manual') && (Game.field[x][y - 1].connected != true)) {
                connect(Game, x, y - 1);
            }
        }
        for (i = 0; i < this.connectedLetters.length; i++) {
            connect(this, this.connectedLetters[i].x, this.connectedLetters[i].y);
        }
        for (var i = 0; i < this.field.length; i++) {
            for (var j = 0; j < this.field[i].length; j++) {
                this.field[i][j].vtrace = 0;
                this.field[i][j].htrace = 0;
            }
        }
        for (i = 0; i < this.lettersInField.length; i++) {
            var a = this.findNewWord(this.lettersInField[i]);
            if (a === false) {
                this.currentPoints = 0;
                break;
            }
            else {
                this.currentPoints = this.currentPoints + a;
            }
        }
    },


    /**
     * Returns scores for potential words, created by letter in passed cell.
     *
     * @param cell Cell to check.
     * @returns int Score for found words (if any).
     */

    "findNewWord": function (cell) {


        var x = cell.x;
        var y = cell.y;
        var by = y;
        var bx = x;
        var results = [];
        var finalScore = 0;

        var scoreForWords = function (Game, results) {
            var points;
            var word_points;

            for (var g = 0; g < results.length; g++) {
                result = results[g];
                word_points = 0;
                for (var k = 0; k < result.chars.length; k++) {
                    var l = result.chars[k]; // {"letter": "a", "bonus": 1}

                    points = Game.rules.scores[l.letter] * l.bonus;
                    word_points = word_points + points;
                }
                finalScore = finalScore + word_points * result.word_bonus;
            }
            return finalScore;
        }


        var result = {
            "word": '',
            "chars": [],
            "word_bonus": 1
        };

        for (var j = y - 1; j >= 0 && this.field[x][j].letter != ''; j = j - 1) {
            by = j;
        }
        for (var j = by; j < this.field[x].length && this.field[x][j].letter != ''; j++) {
            if (this.field[x][j].connected == false && this.field[x][j].status != "filled") {
                return false;
            }
            if (this.field[x][j].htrace == 1) {
                return scoreForWords(this, results);
            }
            result.word = result.word + this.field[x][j].letter;
            result.chars.push({"letter": this.field[x][j].letter, "bonus": this.field[x][j].bl});
            result.word_bonus = result.word_bonus * this.field[x][j].bw;
            this.field[x][j].htrace = 1;
        }

        this.wordsUsedDuringCurrentTurn = [];
        var isValidWord = function (Game,word_to_test, result_array) {

            if (word_to_test.word.length >= 2) {
                for (var f = 0; f < Game.rules.dictionary.length; f++) {
                    if (Game.rules.dictionary[f] === word_to_test.word) {
                        result_array.push(word_to_test);
                        return true;
                    }
                }
                for( var d = 0; d < results.length; d++ ){
                    if(results[d] !=  word_to_test){
                        return true;
                    }
                }
                return false;
            }
            else {
                return false;
            }
            if(Game.wordsUsedDuringCurrentTurn != 0){
                for (var k = 0;k < Game.wordsUsedDuringCurrentTurn.length; k++){
                    if (Game.wordsUsedDuringCurrentTurn[k] === result_array.word){
                        return false;
                    }
                    else {
                        Game.wordsUsedDuringCurrentTurn.push(result_array.word);
                        return true;
                    }
                }
            }
            else {
                Game.wordsUsedDuringCurrentTurn.push(result_array.word);
                return true;
            }
            if (Game.wordsUsedDuringGame != 0){
                for (var k = 0;k < Game.wordsUsedDuringGame.length; k++){
                    if (Game.wordsUsedDuringGame[k] === result_array.word){
                        return false;
                    }
                    else {
                        return true
                    }
                }
        };

        if (result.word.length > 1 && isValidWord(MyGame,result.word,results) == false) {
            return false;
        }


        result = {
            "word": '',
            "chars": [],
            "word_bonus": 1
        };
        for (var i = x - 1; i >= 0 && this.field[i][y].letter != ''; i--) {
            bx = i;
        }
        for (var i = bx; i < this.field.length && this.field[i][y].letter != ''; i++) {
            if (this.field[i][y].connected == false && this.field[i][y].status != "filled") {
                return false;
            }
            if (this.field[i][y].vtrace == 1) {
                return scoreForWords(this, results);
            }
            result.word = result.word + this.field[i][y].letter;
            result.chars.push({"letter": this.field[i][y].letter, "bonus": this.field[i][y].bl});
            result.word_bonus = result.word_bonus * this.field[i][y].bw;
            this.field[i][y].vtrace = 1;
        }
        if (result.word.length > 1 && isValidWord(MyGame,result.word, results) == false) {
            return false;
        }
        if (results.length == 0) {
            return false;
        }

        return scoreForWords(this, results);
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
        var selector, classname,CHR;
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
        $(".my_letters td").click(this.eventMyLettersClick());
        $(".play-field td").click(this.eventFieldClick());
        $(".play-field td").dblclick(this.eventFieldDblClick());
        $(".endTurn a").click(this.eventChangePlayerClick());
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
    "insertLetterInField": function (x, y, letter){
        var Game = this;
        Game.field[x][y].letter = letter;
        Game.field[x][y].status = "manual";
        if ((((x + 1) < Game.rules.indexOfPlayField) && (Game.field[x + 1][y].status === 'filled')) ||
            (((x - 1) >= 0) && (Game.field[x - 1][y].status === 'filled')) ||
            (((y + 1) < Game.rules.indexOfPlayField) && (Game.field[x][y + 1].status === 'filled')) ||
            (((y - 1) >= 0) && (Game.field[x][y - 1].status === 'filled'))
            ) {
            Game.lettersInField.push({"x": x, "y": y, "letter": letter});
        }
    },
    "deleteActiveLetter": function(letter){
        for(var  i=0; i<this.players[this.currentPlayer].letters.length; i++){
            if (this.players[this.currentPlayer].letters[i] ===  letter){
                this.players[this.currentPlayer].letters.splice(i,1);
                break;
            }
        }
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
                    Game.deleteActiveLetter(letterToFind);
                    Game.insertLetterInField(x, y, letterToFind);
                    Game.calculateScore();
                    console.log(Game.currentPoints);
                }
            }
        }
    },
    "deleteSelectedLetterFromField": function (x,y) {
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
    "setLetterBackToUserLetters": function(character){
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

                Game.deleteSelectedLetterFromField(x,y);
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