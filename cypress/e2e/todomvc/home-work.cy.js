/// <reference types="cypress" />

describe('todoMVC', () => {
    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/react/').should('be.ok');
    })

    it('Case3', () => {

        const inputSet = 'input.new-todo';
        const todoSel = 'ul.todo-list > li';
        const todoCheckboxSel = `input.toggle`;
        const counterSel = '.todo-count strong';

        const inputValues = ['a', 'b', 'c', 'd', 'e'];

        for (let i = 0; i < inputValues.length; i++) {
            cy.get(inputSet).type(`${inputValues[i]}{enter}`)
        }

        cy.get(counterSel).contains(inputValues.length); // Counter

        cy.get(`${todoSel}:contains(${inputValues[0]})`).find(todoCheckboxSel).click();
        cy.get(`${todoSel}:contains(${inputValues[1]})`).find(todoCheckboxSel).click();

        cy.get('ul.filters > li [href="#/active"]').click(); //Active filter
        cy.get(`${todoSel}[class="completed"]`).should('not.exist');
        cy.get(`${todoSel}[class=""]`).should('exist');

        cy.get('ul.filters > li [href="#/completed"]').click(); // Completed filter
        cy.get(`${todoSel}[class="completed"]`).should('exist');
        cy.get(`${todoSel}[class=""]`).should('not.exist');

        cy.get('ul.filters > li [href="#/"]').click(); // All filter
        cy.get(`${todoSel}[class="completed"]`).should('exist');
        cy.get(`${todoSel}[class=""]`).should('exist');

    });

    it('Case4', () => {

        const inputSet = 'input.new-todo';
        const todoSel = 'ul.todo-list > li';
        const todoCheckboxSel = `input.toggle`;

        const inputValues = ['a', 'b', 'c', 'd', 'e'];

        for (let i = 0; i < inputValues.length; i++) {
            cy.get(inputSet).type(`${inputValues[i]}{enter}`)
        }

        cy.get('[for="toggle-all"]').click(); // Select All
        cy.get(`${todoSel}[class="completed"]`).should('exist');
        cy.get(`${todoSel}[class=""]`).should('not.exist');

        cy.get('button.clear-completed').click(); // Clear All
        cy.get(`${todoSel}[class="completed"]`).should('not.exist');
        cy.get(`${todoSel}[class=""]`).should('not.exist');

    });

    it('For In/Of, Arrays.forEach', () => {
        //The For Of Loop
        const inputSet = 'input.new-todo';
        const inputValues = ['a', 'b', 'c', 'd', 'e'];

        //The For Of Loop
        // for (let x of inputValues) {
        //     cy.get(inputSet).type(`${x}{enter}`)
        // };

        //The For In Loop
        // for (let i in inputValues) {
        //     cy.get(inputSet).type(`${i}{enter}`) // ${i} returns keys of array 
        // }

        //Arrays.forEach
        //  inputValues.forEach(typingValues);

        //  function typingValues(i) {
        //      cy.get(inputSet).type(`${i}{enter}`)
        //  }

        inputValues.forEach((i) => { cy.get(inputSet).type(`${i}{enter}`) });

    });

    it.only('Function with requred numbers of todo list elements', () => {

        const inputSet = 'input.new-todo';

        const inputValues = ['a', 'b', 'c', 'd', 'e'];

        // const listOfElements = (array) => {

        //     for (let i = 0; i < array.length; i++) {
        //         cy.get(inputSet).type(`${array[i]}{enter}`);
        //     }
        // }

        // listOfElements(inputValues);


        const listOfElements = (numbersOfElements) => {
            for (let i = 0; i < numbersOfElements; i++) {
                cy.get(inputSet).type(`Element{enter}`);
            }
        }
        listOfElements(10);


    })

})