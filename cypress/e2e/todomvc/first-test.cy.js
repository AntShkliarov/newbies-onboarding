/// <reference types="cypress" />

describe('todoMVC first steps', () => {

    it('navigate to todoMVC', () => {
        cy.visit('https://todomvc.com/examples/react/').should('be.ok');

        const inputValue = 'Слава Україні';
        cy.get('input').should('have.class', 'new-todo').type(`${inputValue}{enter}`);
        cy.get('.todo-list li').should('have.text', inputValue);

        //cy.get('input').should('have.class', 'new-todo').type('Слава Україні {enter}');
        //cy.get('.todo-list li').should('have.text', 'Слава Україні');
    });

    it('check multiple todos ', () => {

        const inputSet = 'input.new-todo';
        const todoSel = 'ul.todo-list > li';
        const todoCheckboxSel = `input.toggle`;
        const deleteTodoSel = `button`;
        const counterSel = '.todo-count strong';

        const todoText = 'a';

        cy.visit('https://todomvc.com/examples/react/').should('be.ok');

        cy.get(inputSet).type('b{enter}');
        cy.get(inputSet).type('c{enter}');
        cy.get(inputSet).type(`${todoText}{enter}`);

        cy.get(`${todoSel}:contains(${todoText})`).find(todoCheckboxSel).click();

        cy.get(`${todoSel}:contains(${todoText})`).should('have.attr', 'class', 'completed');

        cy.get(`${todoSel}:contains(${todoText})`)
            .find(deleteTodoSel)
            .invoke('show')
            .should('be.visible')
            .click();

        cy.get(`${todoSel}:contains(${todoText})`).should('not.exist')


    });

    it('using loop', () => {

        const inputSet = 'input.new-todo';
        const todoSel = 'ul.todo-list > li';
        const todoCheckboxSel = `input.toggle`;
        const deleteTodoSel = `button`;
        const counterSel = '.todo-count strong';

        const inputValues = ['a', 'b', 'c'];

        cy.visit('https://todomvc.com/examples/react/').should('be.ok');

        for (let i = 0; i < inputValues.length; i++) {
            cy.get(inputSet).type(`${inputValues[i]}{enter}`)
        }

        cy.get(counterSel).contains(inputValues.length)

        cy.get(`${todoSel}:contains(${inputValues[0]})`).find(todoCheckboxSel).click();

        cy.get('ul.filters > li [href="#/completed"]').click();

        cy.get(`${todoSel}`).should('have.class', 'completed')

        cy.get('ul.filters > li [href="#/"]').click();

    })



})