import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";

const Registration = () => {
    return (
        <Container className='d-flex justify-content-center align-items-center'
        style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>Registration</h2>
                <Form className='d-flex flex-column'>
                    <Form.Group className='mb-3' controlId='formBasicLogin'>
                        <Form.Label>Login</Form.Label>
                        <Form.Control type='login' placeholder='Enter login' />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type='password' placeholder='Repeat Password' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                        <Form.Check type='checkbox' label='Check me out' />
                    </Form.Group>
                    <Button variant='outline-success' type='submit'>
                        Sign Up
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Registration;