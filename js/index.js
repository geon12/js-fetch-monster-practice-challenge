const monsterUrl = 'http://localhost:3000/monsters'
const monsterContainer = document.getElementById('monster-container');
let page = 1;

function fetchMonsters(pageNum) {
    
    const monsterNum = 50

    fetch(`${monsterUrl}/?_limit=${monsterNum}&_page=${pageNum}`)
        .then(resp => resp.json())
        .then(appendMonstersToDOM)
        //.catch(error => console.log(error));
}





function createMonster(monster) {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    
    h3.innerHTML = monster.name;
    h4.innerHTML = `Age: ${monster.age}`;
    p.innerHTML = monster.description;

    div.appendChild(h3);
    div.appendChild(h4);
    div.appendChild(p);

    return div;
}

function appendMonstersToDOM(monsters) {

    monsters.forEach((monster) => {
        const monsterDiv = createMonster(monster);
        monsterContainer.appendChild(monsterDiv);
    });

}



function createForm(){
    const form = document.createElement('form');
    form.id = "monster-form";

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.name = 'name';
    inputName.id = "monster-name";
    inputName.placeholder = "Name";

    const inputAge = document.createElement('input');
    inputAge.type = 'text';
    inputAge.name =  'age';
    inputAge.id = "monster-age";
    inputAge.placeholder = "Age";

    const inputDescription = document.createElement('input');
    inputDescription.type = 'text';
    inputDescription.name = 'description';
    inputDescription.id = 'monster-description'
    inputDescription.placeholder = "Description"

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.name = 'submit';
    submit.value = 'Create Monster';

    form.appendChild(inputName);
    form.appendChild(inputAge);
    form.appendChild(inputDescription);
    form.appendChild(submit);

    return form;
}

function addForm(form) {
    
    const div = document.getElementById("create-monster");
    div.appendChild(form);
}


function postMonster(newMonster){
   

    configObj = {
        method: 'POST',
        headers:  {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify(newMonster)

        
    };

   
    fetch(`${monsterUrl}`, configObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
        //.catch(error => console.log(error));
}

function addMonsterData() {
    const form = document.getElementById("monster-form");
    const name = document.getElementById("monster-name");
    const age = document.getElementById("monster-age");
    const description = document.getElementById("monster-description");

    form.addEventListener('submit',(event) => {
        event.preventDefault();
        const newMonster = {"name": name.value,
            "age": age.value,
            "description": description.value
        };

        postMonster(newMonster);
        name.value = "";
        age.value = "";
        description.value = "";
        changePage(page);
    })
}

function addButtonEventListerners() {
    const back = document.getElementById("back");
    const forward = document.getElementById("forward");
    back.addEventListener("click",() => {
        if(page > 1) {
            page = page - 1;
            changePage(page);
        }
    })
    forward.addEventListener('click', () => {
        page = page + 1
        changePage(page);
    })
}

function changePage(pageNum) {

    monsterContainer.innerHTML = "";
    fetchMonsters(pageNum);
}
/* const exampleMonster = {
    "name": "Nova Tartarus",
    "age": 1.10232323,
    "description": "A novaCyclopean swarthy amorphous singular accursed furtive non-euclidean stygian. Swarthy gibbering charnel eldritch daemoniac gibbous. Cyclopean lurk hideous tentacles squamous immemorial tenebrous mortal. Madness tentacles furtive mortal foetid decadent. Foetid immemorial comprehension."
}; */

//postMonster(exampleMonster);

fetchMonsters(page);

addForm(createForm());

addMonsterData();

addButtonEventListerners();




