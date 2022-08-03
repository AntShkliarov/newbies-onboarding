 /// <reference types="cypress" />


 describe('TodoMVC first steps', () => {
    beforeEach(function () {
        cy.visit('https://todomvc.com/examples/react/').should('be.ok');
    })

    it('navigate to TodoMVC', () => {
            cy.get('input').type('Slava Ukraini{enter}');
            cy.get('.todo-list li').should('have.text', 'Slava Ukraini');
    });

    it('check multiple todos',() => {
        const inputSel = 'input.new-todo'
        const todoSel = '.todo-list li'
        const todoCheckboxSel = '.toggle'
        const deleteTodoSel = 'button'
        const counterSel = '.todo-count strong'

        const todoText = 'a'

        cy.get(inputSel).type('b{enter}')
        cy.get(inputSel).type('c{enter}')
        cy.get(inputSel).type(`${todoText}{enter}`)
    

        cy.get(`${todoSel}:contains(${todoText})`).find(todoCheckboxSel).click()
        cy.get(`${todoSel}:contains(${todoText})`).should('have.attr', 'class', 'completed')

        cy.get(`${todoSel}:contains(${todoText})`)
        .find(deleteTodoSel)
        .invoke('show')
        .should('be.visible').click()

        
    })

    it('check multiple todos applying filters',() => {
        const inputSel = 'input.new-todo'
        const todoSel = '.todo-list li'
        const todoCheckboxSel = '.toggle'
        const counterSel = '.todo-count strong'
        const todoFiltersSel = 'ul.filters'
        
       // const todoText = 'a'

      //  cy.get(inputSel).type('b{enter}')
      //  cy.get(inputSel).type('c{enter}')
      //  cy.get(inputSel).type('d{enter}')
      //  cy.get(inputSel).type('e{enter}')
      //  cy.get(inputSel).type(`${todoText}{enter}`)

        const inputValues = ['a', 'b', 'c', 'd', 'e']

        for (let i = 0; i < inputValues.length; i++) {
            cy.get(inputSel).type(`${inputValues[i]}{enter}`)
        }

        cy.get(counterSel).contains(inputValues.length)
    
        cy.get(`${todoSel}:contains(${inputValues[0]})`).find(todoCheckboxSel).click()
        cy.get(`${todoSel}:contains(${inputValues[3]})`).find(todoCheckboxSel).click()

        //cy.get(`${todoSel}:contains(c)`).find(todoCheckboxSel).click()
        //cy.get(`${todoSel}:contains(c)`).should('have.attr', 'class', 'completed')

        cy.get('ul.filters > li [href="#/active"]').click()
        cy.get(`${todoSel}[class="completed"]`).should('not.exist')
        cy.get(`${todoSel}[class=""]`).should('exist')

        cy.get('ul.filters > li [href="#/completed"]').click()
        cy.get(`${todoSel}[class="completed"]`).should('exist')
        cy.get(`${todoSel}[class=""]`).should('not.exist')

        cy.get('ul.filters > li [href="#/"]').click()
        cy.get(`${todoSel}[class="completed"]`).should('exist')
        cy.get(`${todoSel}[class=""]`).should('exist')

        cy.get('[for="toggle-all"]').click()
        cy.get(`${todoSel}[class="completed"]`).should('exist')
        cy.get(`${todoSel}[class=""]`).should('not.exist')

        cy.get('button.clear-completed').click()
        cy.get(`${todoSel}[class="completed"]`).should('not.exist')
        cy.get(`${todoSel}[class=""]`).should('not.exist')


    })
})

