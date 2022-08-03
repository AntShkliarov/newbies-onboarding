/// <reference types="cypress" />


describe('TodoMVC first steps', () => {

    it('navigate to TodoMVC', () => {
        cy.visit('https://todomvc.com/examples/react/').should('be.ok')
    });

    it.only('check multiple todos', () => {
        const inputSel = 'input.new-todo'
        const todoSel = '.todo-list li'
        const todoCheckboxSel = `input.toggle`
        const deleteTodoSel = 'button'
        const counterSel = '.todo-count strong'

        const todoText = 'a'

        cy.visit('https://todomvc.com/examples/react/').should('be.ok')

        cy.get(inputSel).type('b{enter}')
        cy.get(inputSel).type('c{enter}')
        cy.get(inputSel).type(`${todoText}{enter}`)

        cy.get(`${todoSel}:contains(${todoText})`).find(todoCheckboxSel).click()
        cy.get(`${todoSel}:contains(${todoText})`).should('have.attr', 'class', 'completed')

        cy.get(`${todoSel}:contains(${todoText})`)
          .find(deleteTodoSel)
          .invoke('show')
          .should('be.visible')
          .click()

        cy.get(`${todoSel}:contains(${todoText})`).should('not.exist')

})  

});