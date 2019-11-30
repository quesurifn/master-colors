import React from 'react'
import { Form, Container } from 'semantic-ui-react'

export default class Login extends React.Component {
    constructor() {
        super()

        this.state = {
            password:false,
            email: false,
            loginPage:true
        }
        this.API_URL = "http://localhost:3001/auth/login"
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    getFilteredState() {
        const excludeKeys = ['about']
        const stateCopy = this.state
        for(const key in stateCopy) {
            if(excludeKeys.indexOf(key) > -1) {
                delete stateCopy[key];
            }
        }
        return stateCopy;
    }

    async onSubmit() {
        const response = await fetch(this.API_URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.getFilteredState) // body data type must match "Content-Type" header
          });
          const parsedResponse = await response.json(); // parses JSON response into native JavaScript objects

          if(parsedResponse.errors) {
              this.setState({errors: parsedResponse.errors})
          } else {
              this.props.history.push('/profile/')
          }
    }

    changeLoginSignup() {
        this.setState({loginPage: !this.state.loginPage})
    }
    

    render() {
        return (
        <div className="absolute-center">
         <Container>
            <h1>Login</h1>
            <Form onSubmit={this.onSubmit}>      
                <Form.Input
                    name="email"
                    fluid
                    label='Email'
                    placeholder='john.doe@gmail.com'
                    onChange={(e) => this.onChange(e)}
                    required
                />
                <Form.Input type="password" name="password" fluid label='Password' placeholder='Password' onChange={(e) => this.onChange(e)} required/>
                <Form.Button>Submit</Form.Button>
            </Form>
            <button onClick={this.changeLoginSignup}>{this.state.loginPage ? "Signup Instead" : "Login Instead"}</button>
        </Container>
        </div>
        )
    }
}