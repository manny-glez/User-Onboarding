// write test
describe('Form App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  const nameInput = () => cy.get('input[name=name]')
  const emailInput = () => cy.get('input[name=email]')
  const passwordInput = () => cy.get('input[name=password]')
  const termsInput = () => cy.get('input[name=terms]')
  const submitBtn = () => cy.get('button')
  const userForm = () => cy.get('form')

  it('sanity check to make sure test work', () => {
    expect(1+2).to.equal(3)
    expect(2+2).not.to.equal(5)
    expect({}).not.to.equal({})
    expect({}).to.eql({})
  })

  it('Get the name input and type a name in it', () => {
    nameInput()
    // .should('have.value', '')
    .type('James')
    .should('have.value', 'James')
  })

  it('Get the Email input and type an email address in it', () => {
    emailInput()
    .type('JamesHet83@gmail.com')
  })

  it('Get the password input and type a password in it', () => {
    passwordInput()
    .type('DaveM123')
  })

  it('Test that will check to see if a user can check the terms of service box', () => {
    termsInput()
    expect('input[name=terms]').to.equal(true)
  })

  it('Check to see if a user can submit the form data', () => {
    submitBtn()
    .should('have.value', '')
  })

  it('Check for form validation if an input is left empty', () => {
    userForm()
    .should('have.value', '')
    .should('be.disabled')
    
  })

})