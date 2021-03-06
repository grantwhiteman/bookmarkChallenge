describe('load page',() => {
    it('displays bookmark list', () =>{
        cy.visit('/bookmarks')
        cy.get('h1').should('contain', 'Bookmark Manager!')
    })

    it('displays bookmark list', () =>{
        cy.task("taskTruncateTables")
        cy.task("taskCreateEntry")
        cy.visit('/bookmarks')
        cy.get('#bookmark-0').should('contain', 'aldi')
    })

    it('displays bookmark list', () =>{
        cy.task("taskTruncateTables")
        cy.task("taskCreateEntry")
        cy.visit('/bookmarks')
        cy.get('#bookmark-0-delete').click()
        cy.get('h1').should('contain', 'Bookmark Manager!')
        cy.get('#bookmark-0').should('not.exist')
    })

    it('edit button works', () =>{
        cy.task("taskTruncateTables")
        cy.task("taskCreateEntry")
        cy.visit('/bookmarks')
        cy.get('#bookmark-0-edit').click()
        cy.get('h1').should('contain', 'Update that sheet!')
        cy.get('#name_input').type('Tesco')
        cy.get('#url_input').type('tesco.com')
        cy.get('#submit').click()
        cy.get('#bookmark-0').should('contain', 'Tesco')
    })

    it('edit button works', () =>{
        cy.task("taskTruncateTables")
        cy.task("taskCreateEntry")
        cy.visit('/bookmarks')
        cy.get('#bookmark-0-comment').click()
        cy.get('h1').should('contain', 'Comment that sheet!')
        cy.get('#comment_input').type("Lottie's favourite store")
        cy.get('#submit').click()
        cy.get('#bookmark-0').should('contain', "comment: Lottie's favourite store")
    })

    it('filter works', () =>{
        cy.task("taskTruncateTables")
        cy.task("taskCreateEntry")
        cy.visit('/bookmarks')
        cy.get('#name_input').type('Tesco')
        cy.get('#url_input').type('tesco.com')
        cy.get('#tag').select('shopping')
        cy.get('#submit').click()
        cy.get('#filter').select('noTag')
        cy.get('#filter-submit').click()
        cy.get('#bookmarks-list').should('contain', "aldi")
        cy.get('#bookmarks-list').should('not.contain', "Tesco")
    })
})
