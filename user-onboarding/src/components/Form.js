import React, { useState, useEffect } from 'react'
import formSchema from "../validation/formSchema"
import * as yup from "yup"
import axios from 'axios'


function Form() {

  const [form, setForm] = useState({name: "", email:"", password:"", agree: false})
  const [errors, setErrors] = useState({name: "", email:"", password:"", agree: ""})
  const [disabled, setDisabled] = useState(true)
  const [users, setUsers] = useState([])

  const setFormErrors = (name, value) => {
    yup.reach(formSchema, name).validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch(err => setErrors({ ...errors, [name]: err.errors[0]}))
  }

  const change = event => {
    const { checked, value, name, type } = event.target
    const valueToUse = type === "checkbox" ? checked : value
    setFormErrors(name, valueToUse)

    setForm({ ...form, [name]: valueToUse })
  }

  useEffect(() => {
    formSchema.isValid(form).then(valid => setDisabled(!valid))
  },[form])

  const submit = event => {
    event.preventDefault()
    
    const newUser = { name: form.name.trim(), email: form.email, password: form.password, agree: form.agree }

    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        console.log(res.data)

        setForm({name: "", email:"", password:"", agree: false})

        setUsers([res.data, ...users])
      })
      .catch(err => {
        debugger
      })
  }

  useEffect(() => {
    const getUsers = () => {
      axios.get("https://reqres.in/api/users")
      .then(res => {
  
        setUsers(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  
    getUsers()
  },[])

  return (
    <>
    <h1>Join</h1>
    <div className="form-container">
      <div>
        <h2 id="sign-up">Sign up</h2>
      </div>

      <form onSubmit={submit} className="form">
        <label>Name
          <input
            onChange={change}
            value={form.name}
            name="name"
            type="text"
            placeholder="Name"
          />
        </label>

        <label>Email
          <input
            onChange={change}
            value={form.email}
            name="email"
            type="email"
            placeholder="Email"
          />
        </label>

        <label>Password
          <input
            onChange={change}
            value={form.password}
            name="password"
            type="password"
            placeholder="Password"
          />
        </label>

        <label>Terms of Service
          <input
            onChange={change}
            checked={form.agree}
            name="agree"
            type="checkbox"
          />
        </label>

        <button disabled={disabled}>Join</button>
      </form>

      </div>
      <div style={{ color: 'red', marginTop: '15px' }}>
      <div>{errors.name}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.agree}</div>
    </div>

    <h2>Members</h2>

    {users.map(user => {
      return (
        <div className="user-card" key={user.email}>
          <p>{user.first_name || user.name}</p>
          <p>{user.email}</p>
        </div>
      )
    })}
    </>
  )
}

export default Form