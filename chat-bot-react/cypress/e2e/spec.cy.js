describe('Login Test', () => {
  it('logs into the website', () => {
    // Entrar al chat-bot
    cy.visit('https://chatbot.sanchezapps.net/');

    // Ingresar las credenciales de MANAGER
    cy.get('input[type="email"]').type('a01640873@tec.mx');
    cy.get('input[type="password"]').type('password');
    cy.contains('Iniciar Sesión').click();

    // Entrar a un proyecto
    cy.wait(4000); 
    cy.contains('tr', 'Chat-Bot').last().within(() => {
      cy.get('button').contains('View Members').click();
    });

    // Entrar a un Developer
    cy.wait(4000); 
    cy.contains('tr', 'Erick Orozco').within(() => {
      cy.get('svg').click();
    });

    // Ver la descripción de una task
    cy.wait(3000);
    cy.contains('Ver Más').click();

    // Cerrar la task
    cy.wait(3000);
    cy.contains('Close').click();

    // Usar cada una de las opciones del filtro
    cy.get('[data-slot="trigger"]').click();
    cy.wait(3000);
    cy.contains('li[role="menuitem"]', 'Nombre (Z-A)').click();
    cy.wait(2000);
    cy.get('[data-slot="trigger"]').click();
    cy.contains('li[role="menuitem"]', 'Nombre (A-Z)').click();
    cy.wait(2000);
    cy.get('[data-slot="trigger"]').click();
    cy.contains('li[role="menuitem"]', 'Prioridad (High-Low)').click();
    cy.wait(2000);
    cy.get('[data-slot="trigger"]').click();
    cy.contains('li[role="menuitem"]', 'Prioridad (Low-High)').click();

    //Usar boton de back
    cy.xpath('//*[@id="root"]/div/button').click();

    //Salir de la sesión
    cy.wait(2000);
    cy.xpath('//*[@id="root"]/div/div/div[1]/button').click();
    cy.wait(2000);
    cy.xpath('//*[@id=":r5o:"]/footer/button[1]').click();

    // Ingresar las credenciales de DEVELOPER
    cy.get('input[type="email"]').type('a01198247@tec.mx');
    cy.get('input[type="password"]').type('password');
    cy.contains('Iniciar Sesión').click();

    // Usar las opciones de filtrado
    cy.wait(3000);
    cy.get('[data-slot="trigger"]').click();
    cy.contains('li[role="menuitem"]', 'Filter by Status').click();
    cy.wait(2000);
    cy.get('[data-slot="trigger"]').click();
    cy.contains('li[role="menuitem"]', 'Filter by Priority').click();

    // Agregar una nueva task
    cy.wait(2000);
    cy.xpath('//*[@id="root"]/div/div/div[2]/button[1]').click();

    cy.get('input[name="name"]').type('Test de tarea');
    cy.get('input[name="description"]').type('Esto es un testing');
    cy.wait(2000);
    cy.get('[data-slot="value"]').click();
    cy.contains('li[role="option"]', 'LOW').click();
    cy.xpath('//*[@id=":r70:"]/footer/button[2]').click();

  });
});
