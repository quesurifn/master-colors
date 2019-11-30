import React from 'react'
import { Form, Grid, Container, Button } from 'semantic-ui-react'

export default class Create extends React.Component {
    constructor() {
        super()

        this.state = {
            user: {first_name: false,
                last_name: false,
                email: false,
                job_title: false,
                company: false,
                bio: false,
                password: false,
                password_confirmation: false},
            errors: false,
            login: false
        
        }
        this.API_URL = "http://localhost:3001/users/"
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    onChange(evt) {
        const { user } = this.state
        const newObj =  { [evt.target.name]:evt.target.value, ...user };
        this.setState({user: newObj, errors: false})
    }

    async onSubmit(type) {
        const response = await fetch(this.API_URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user) // body data type must match "Content-Type" header
          });
          const parsedResponse = await response.json(); // parses JSON response into native JavaScript objects
        
          if(parsedResponse.errors) {
                this.setState({errors: parsedResponse.errors})
          } else {
                this.props.history.push('/generate/');
          }
    }
    

    render() {
        const { login } = this.state

        return (
        <div className="absolute-center">
         <Container>
            {this.state.errors &&
                this.state.errors.map((e, idx) => {
                    return  <div key={idx} className="error">
                                {e}
                            </div>
                })
            }

            {login && 
                <div>
                    <h1>Login</h1>
                    <Form onSubmit={() => this.onSubmit("login")}>      
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
                    <Button onClick={() => this.setState({login: false})}>Sign Up Instead</Button>
                </div>
            
            }

            {!login &&
                <div>
                     <h1>Create Your Account</h1>
                    <Form onSubmit={() => this.onSubmit("create")}> 
                        <Form.Group widths='equal'>
                            <Form.Input name="first_name" fluid label='First name' placeholder='First name' onChange={(e) => this.onChange(e)} required/>
                            <Form.Input name="last_name" fluid label='Last name' placeholder='Last name' onChange={(e) => this.onChange(e)}/>
                        </Form.Group>
                        <Form.Input
                            name="email"
                            fluid
                            label='Email'
                            placeholder='john.doe@gmail.com'
                            onChange={(e) => this.onChange(e)}
                            required
                        />
                        <Form.Group widths='equal'>
                            <Form.Input name="password" label='Enter Password' type='password' onChange={(e) => this.onChange(e)} required/>
                            <Form.Input name="password_confirmation" label='Confirm Password' type='password' onChange={(e) => this.onChange(e)} required/>
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Input name="job_title" fluid label='Job Title' placeholder='Job Title' onChange={(e) => this.onChange(e)}/>
                            <Form.Input name="company" fluid label='Company' placeholder='Company'  onChange={(e) => this.onChange(e)}/>
                        </Form.Group>
                        <Form.TextArea name="bio" label='About' placeholder='Tell us more about you...' onChange={(e) => this.onChange(e)} />
                        <Form.Checkbox label='I agree to the Terms and Conditions' onChange={(e) => this.onChange(e)} required/>
                        <Form.Button>Submit</Form.Button>
                    </Form>
                    <Button onClick={() => this.setState({login: true})}>Login In Instead</Button>
                </div>
            }
        </Container>
        </div>
        )
    }
}