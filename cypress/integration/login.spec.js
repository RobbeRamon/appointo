describe('Login test', function () {
    it('login user', () => {
        cy.visit("/login");

        cy.get('[data-cy=email]').type('alexa@gmail.com');
        cy.get('[data-cy=password').type('P@ssword1111');


        cy.get('#login').click();
        cy.location('pathname').should('eq', '/manage/calendar');
    })
});