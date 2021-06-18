describe('Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  const nameInput = () => cy.get('input[name=name]')
  const emailInput = () => cy.get('input[name=email]')
  const passwordInput = () => cy.get('input[name=password]')
  const termsCheckbox = () => cy.get('input[name=agree]')
  const SubmitBtn = () => cy.get('button[id=submitBtn]')

  it('Sanity check to make sure tests work', () => {
    expect(1+2).to.equal(3)
    expect(2+2).not.to.equal(5)
    expect({}).not.to.equal({})
    expect({}).to.eql({})
  })

  it('Test 1: Get the Name input and type a name in it', () => {
    nameInput()
      .should('have.value', '')
      .type('James Hetfield')
      .should('have.value', 'James Hetfield')
  })

  it('Test 2: Get the Email input and type an email address in it', () => {
    emailInput()
      .should('have.value', '')
      .type('MUYA83@mail.com')
      .should('have.value', 'MUYA83@mail.com')
  })

  it('Test 3: Get the password input and type a password in it', () => {
    passwordInput()
      .should('have.value', '')
      .type('Dave4evr')
      .should('have.value', 'Dave4evr')
  })

  it('Test 4: Will check to see if a user can check the terms of service box',() => {
    termsCheckbox()
      .check()
  })

  it('Test 5: Check to see if a user can submit the form data', () => {
    SubmitBtn()
      .click()
  })

  it('Test 6: Check for form validation if an input is left empty', () => {
    nameInput()
      .type('el')
      SubmitBtn().should('be.disabled')

    emailInput()
      .type('sdvpbq')
    SubmitBtn().should('be.disabled')

    passwordInput()
      .type('hi')
    SubmitBtn().should('be.disabled')
  })
})