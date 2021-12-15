describe('python format in javascript', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl)
    })

    it('displays two text areas and their labels', () => {
        cy.get('.text_input_label').should('have.length', 2)
        cy.get('.text_input').should('have.length', 2)

        cy.get('.text_input_label').first().should('have.text', 'String')
        cy.get('.text_input_label').last().should('have.text', 'Formatter')
    })

    it('displays format method text', () => {
        cy.get('.result').should('contain.text', "format")
    })

    it('formats texts correctly', () => {
        const tests = [
            {
                "string": "abc",
                "formatter": "",
                "expectedResult": "abc"
            },
            {
                "string": "Hello {0}!",
                "formatter": "world",
                "expectedResult": "Hello world!"
            },
            {
                "string": "{0} {1}!",
                "formatter": "Hello, world",
                "expectedResult": "Hello world!"
            },
            {
                "string": "{1}, {0}",
                "formatter": "first, last",
                "expectedResult": "last, first"
            },
            {
                "string": "Hello {}!",
                "formatter": "world",
                "expectedResult": "Hello world!"
            },
            {
                "string": "{} {}!",
                "formatter": "Hello, world",
                "expectedResult": "Hello world!"
            },
            {
                "string": "Hello {name}",
                "formatter": "{name: world}",
                "expectedResult": "Hello world"
            },
            {
                "string": "Hello {name} and {name}",
                "formatter": "{name: world}",
                "expectedResult": "Hello world and world"
            },
            {
                "string": "{last}, {first}",
                "formatter": "{first: first, last: last}",
                "expectedResult": "last, first"
            },
            {
                "string": "{} {name} {}",
                "formatter": "bye, hi, {name: hello}",
                "expectedResult": "bye hello hi"
            },
            {
                "string": "{1} {name} {0}",
                "formatter": "Bonjour, 3.14, {name: 100}",
                "expectedResult": "3.14 100 Bonjour"
            }
        ];

        for (let test of tests) {
            if (test.string) cy.get('#string').type(test.string, {parseSpecialCharSequences: false});
            if (test.formatter) cy.get('#formatter').type(test.formatter, {parseSpecialCharSequences: false});
            // cy.get('#formatter').type('{enter}')
            cy.get(".result > h2").should("have.text", `format(${test.string}, ${test.formatter}):`)
            cy.get(".result > h1").should("have.text", test.expectedResult)

            cy.get('#string').clear()
            cy.get('#formatter').clear()
        }
    })
})
