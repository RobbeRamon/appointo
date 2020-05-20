describe('Manage treatments test', function () {
    beforeEach(function () {
        cy.login();
    });

    it('list of treatments', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/hairdressers/treatments',
            status: 200,
            response: 'fixture:treatments.json',
        });

        cy.visit('/manage/treatments');
        cy.get('[data-cy=treatmentRow]').should('have.length', 3);
    })

    it('add treatment', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/hairdressers/treatments',
            status: 200,
            response: 'fixture:treatments.json',
        });

        cy.route({
            method: 'POST',
            url: '/api/hairdressers/treatments',
            status: 200,
            response: 'fixture:treatment.json',
        });

        cy.visit('/manage/treatments');

        cy.get('#createTreatment').click();
        cy.location('pathname').should('eq', '/manage/treatments/create');

        cy.get('[data-cy=name]').type('Brushen');
        cy.get('[data-cy=price]').type('{backspace}10');
        cy.get('[data-cy=durationInMinutes]').type('20');

        cy.get('#confirmTreatment').click();
        cy.location('pathname').should('eq', '/manage/treatments');
        cy.get('[data-cy=treatmentRow]').should('have.length', 4);
    })
});
