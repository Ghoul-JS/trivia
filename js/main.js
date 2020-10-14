
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



// function printCategory(getCategory) {
//     const tCategory = document.getElementById('form-category');
//     tCategory.innerHTML = '';

//     getCategory.forEach( selectCategory => {
//         const category = `<div class="form-group">
//                             <label for="exampleFormControlSelect1">Categoría</label>
//                             <select class="form-control" id="exampleFormControlSelect1">
//                             <option>${selectCategory.category}</option>
//                             </select>
//                         </div>`;
//         tCategory.innerHTML += category;
//     })

// }


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
    const correctRBTN = `<div class="form-check">
                            <input class="form-check-input" type="radio" name="question${JSON.stringify(cont1)}" id="id${JSON.stringify(cont2)}" value="true">
                            <label class="form-check-label" for="exampleRadios1">
                            ${correct}
                            </label>
                        </div>`;
    console.log(cont2);
    cont2++;

    let incorrectRBTN = '';

    incorrects.forEach(incorrect => {
        console.log(cont2);
        incorrectRBTN += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="question${JSON.stringify(cont1)}" id="id${JSON.stringify(cont2)}" value="false">
                            <label class="form-check-label" for="exampleRadios1">
                            ${incorrect}
                            </label>
                        </div>`;
        cont2++;
    })
    console.log("acabado");
    //console.log(cont2);
    return correctRBTN + incorrectRBTN;
}

function verifity() {

    var cant = document.getElementById("question-numbers").value;

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
        }



        console.log(ok);
        console.log(bad);

        localStorage.setItem("buenas", JSON.stringify(ok));
        localStorage.setItem("malas", JSON.stringify(bad));

        window.location.href = '/resp.html';
    }



}

