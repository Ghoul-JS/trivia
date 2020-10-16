
function Update() {
    getQuestions();
}

function getQuestions() {
    const cuestionNumbers = document.getElementById('question-numbers').value;
    const typeCategory = document.getElementById('select-category').value;
    const selectDifficulty = document.getElementById('difficulty').value;
    const selectType = document.getElementById('type').value;

    fetch(`https://opentdb.com/api.php?amount=${cuestionNumbers}&category=${typeCategory}&difficulty=${selectDifficulty}&type=${selectType}`)
        .then(response => response.json())
        .then(data => printCards(data.results));
}

function printCards(questions) {
    const container = document.getElementById('container-card');
    container.innerHTML = '';
    let cont1 = 0;
    let cont2 = 0;

    questions.forEach(question => {
        cont1++;

        if (document.getElementById('type').value === 'boolean') {
            if (cont1 > 1) {
                cont2 = (cont1 - 1) * 2 + 1;
            } else {
                cont2++;
            }
        } else if (document.getElementById('type').value === 'multiple') {
            if (cont1 > 1) {
                cont2 = (cont1 - 1) * 4 + 1;
            } else {
                cont2++;
            }
        }


        const row = cardHTML(question, cont1, cont2);
        container.innerHTML += row;
    });
}

function cardHTML(ques, cont1, cont2) {

    const card = `<div class="form-group"><div class="card"">
                        <div class="card-body">
                        <h5 class="card-title">${ques.category}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${ques.question}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">${ques.difficulty}</h6>
                        ${answeres(ques.correct_answer, ques.incorrect_answers, cont1, cont2)}
                        </div>
                 </div></div>`;
    return card;
}

function answeres(correct, incorrects, cont1, cont2) {

    const ram = random();

    incorrects.splice(ram, 0, correct);

    //console.log(incorrects);
    var incorrectRBTN = '';


    incorrects.forEach((incorrect, index) => {
        console.log(cont2);

        if (index === ram) {
            incorrectRBTN += `<div class="form-check">
            <input class="form-check-input" type="radio" name="question${JSON.stringify(cont1)}" id="id${JSON.stringify(cont2)}" value= true>
            <label class="form-check-label" for="exampleRadios1">
            ${correct}
            </label>
        </div>`

        } else {
            incorrectRBTN += `<div class="form-check">
            <input class="form-check-input" type="radio" name="question${JSON.stringify(cont1)}" id="id${JSON.stringify(cont2)}" value= false>
            <label class="form-check-label" for="exampleRadios1">
            ${incorrect}
            </label>
        </div>`;

        }
        cont2++;
    });

    console.log(incorrectRBTN);
    return incorrectRBTN;

}

function cantity() {

    let cant = document.getElementById("question-numbers").value;

    if (cant === '0') {
        alert("No has Respondido a ninguna pregunta");
    } else {

        let ok = 0;
        let bad = 0;
        var type = document.getElementById('type').value;

        if (type === 'boolean') {

            for (let i = 1; i <= JSON.parse(cant * 2); i++) {
                var text = 'id' + JSON.stringify(i);
                console.log(text);
                const press = document.getElementById(text);
                console.log(press);

                if (press.checked === true && press.value === 'true') {
                    ok++;
                } else if (press.checked === true) {
                    bad++;
                }

            }

            let total = ok + bad;

            if (total < cant) {
                alert("Conteste todas las preguntas ");
            } else {
                localStorage.setItem("buenas", JSON.stringify(ok));
                localStorage.setItem("malas", JSON.stringify(bad));

                window.location.href = '/result.html';
            }

        } else if (type === 'multiple') {

            for (let i = 1; i <= JSON.parse(cant * 4); i++) {
                var text = 'id' + JSON.stringify(i);
                console.log(text);
                const press = document.getElementById(text);
                console.log(press);

                if (press.checked === true && press.value === 'true') {
                    ok++;
                } else if (press.checked === true) {
                    bad++;
                }

            }

            let total = ok + bad;

            if (total < cant) {
                alert("Conteste todas las preguntas ");
            } else {
                localStorage.setItem("buenas", JSON.stringify(ok));
                localStorage.setItem("malas", JSON.stringify(bad));

                window.location.href = '/result.html';
            }
        }



        console.log(ok);
        console.log(bad);


    }
}


function random() {
    return Math.floor(Math.random() * (4 - 1)) + 0;
}




