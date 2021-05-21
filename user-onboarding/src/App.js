import React, { useEffect, useState } from 'react'
// import Person from './components/Person'
// import Form from'./components/Form.js'
// import './index.css'
import axios from 'axios'

import * as yup from 'yup'  // Libary for form validation
import schema from './validation/formSchema.js'
import Form from './components/Form'

// Initial States
const initialFormValues = {
  // Text Inputs
  name: '',
  email: '',
  // username: '',
  password: '',

  // checkbox
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  // username: '',
  password: '',
}

const initialUsers =[]
const initialDisabled = true

function App() {

  const [users, setUsers] = useState([]) // state for users
  const [formValues, setFormValues] = useState(initialFormValues)  //state for the form
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)  // boolean
  
  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
    .then(res => {
      console.log(res.data.data)
      setUsers(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      setUsers([res.data, ...users])
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setFormValues(initialFormValues)
    })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: ''}))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  // event handlers
  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const change = evt => {
    
    // console.log(evt)

    const { name, value, checked, type } = evt.target

    // logic for checkbox
    const valueToUse = type === "checkbox" ? checked : value

    setFormValues({ ...formValues, [name]: valueToUse })  // updating state with new values
  }

  const submit = evt => {
    evt.preventDefault()

    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      // username: formValues.username.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms
    }

    setUsers(users.concat(newUser))
  }

  // side effects
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="container">
        <h1>Form</h1>

        {/* <div className='errors'>
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div> */}

        <form onSubmit={submit}>
          <input 
            name="name"
            type="text"
            value={formValues.name}
            onChange={change}
            placeholder="Name"
          />

          <input 
          name="email"
          type="email"
          value={formValues.email}
          onChange={change}
          placeholder="Email"
          />

          {/* <input 
          name="username"
          type="text"
          value={formValues.username}
          onChange={change}
          placeholder="Username"
          /> */}

          <label htmlFor="Password"></label>
          <input
          name="password"
          type="password"
          value={formValues.password}
          onChange={change}
          placeholder="Password"
          />

          <label htmlFor="Terms of Service">Terms of service</label>
          <input 
          name='terms'
          type='checkbox'
          value={formValues.terms}
          onChange={change}
          />
          
        <button disabled={disabled}>Submit</button>

        </form>

        {users.map(user => {
          return (
          <div
            className="user-card"
            key={user.email}>
            <b>Name:</b> {user.first_name}, <b>Email:</b> {user.email}
          </div>)
        })}

    </div>
  );
}

export default App;
