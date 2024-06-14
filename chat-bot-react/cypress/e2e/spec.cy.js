describe('Login Test', () => {
  it('logs into the website', () => {
    cy.visit('https://chatbot.sanchezapps.net/');
    cy.get('input[type="email"]').type('a01640873@tec.mx');
    cy.get('input[type="password"]').type('password');
    cy.contains('Iniciar Sesión').click();

    cy.wait(3000); 
    cy.contains('tr', 'Chat-Bot').last().within(() => {
      cy.get('button').contains('View Members').click();
    });

    cy.wait(3000); 
    cy.contains('tr', 'Erick Orozco').within(() => {
      cy.get('svg').click();
    });
  });
});
