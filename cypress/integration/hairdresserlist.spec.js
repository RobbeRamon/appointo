describe('Hairdresser list tests', function () {
    it('delayed respsone brings state out of sync', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/hairdressers',
            status: 200,
            response: 'fixture:hairdressers.json',
        });
        cy.route({
            delay: 2000,
            method: 'GET',
            url: '/api/hairdressers/?name=al',
            status: 200,
            respone: 'fixture:alexa.json',
        }).as('getALhairdresser');
        cy.route({
            delay: 2000,
            method: 'GET',
            url: '/api/hairdressers/?name=hairl',
            status: 200,
            respone: 'fixture:hairloungeMarlies.json',
        }).as('getHMhairdresser');


        cy.visit('/hairdresser/list');
        cy.get('[data-cy=filterInput]').type('al');
        cy.wait(300);
        cy.get('[data-cy=filterInput]').type('{backspace}{backspace}hairl');
        cy.wait(['@getALhairdresser', '@getHMhairdresser']);
        cy.get('[data-cy=hairdresserCard]').should('have.length', 1);
        cy.get('[data-cy=hairdresser-title]').should('contain', 'Hairlounge Marlies');
    })
});