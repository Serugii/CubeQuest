describe('CubeQuest Main Page E2E Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9000');
    });

    it('should load the main page and display welcome message', () => {
        cy.url().should('include', '/');
        cy.get('h2').should('contain', 'Ласкаво просимо в світ головоломок та пригод!');
    });

    it('should display introduction text', () => {
        cy.get('p').should('contain', 'CubeQuest – це твоя подорож до майстерності у складанні кубиків Рубика.');
    });

    it('should display the "Start" button and navigate to play/login page', () => {
        cy.get('a').contains('Розпочати').click();
        cy.url().should('include', '/login');
    });

    it('should navigate to "About" page when clicking on "Дізнатись більше" button', () => {
        cy.get('a').contains('Дізнатись більше').click();
        cy.url().should('include', '/about');
    });

    it('should navigate to play page if logged in when clicking "Start"', () => {
        localStorage.setItem('token', 'dummy-token');
        cy.visit('/');
        cy.get('a').contains('Розпочати').click();
        cy.url().should('include', '/play');
    });

    it("should display Rubik's Collection image", () => {
        cy.get('img[alt="Rubik\'s Collection"]').should('be.visible');
    });
});
