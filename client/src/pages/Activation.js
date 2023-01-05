import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";

const Activation = () => {
    return (
        <Container className='d-flex justify-content-center align-items-center'
                   style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>Activation</h2>
                <Form className='d-flex flex-column'>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' />
                        <Form.Text className='text-muted'>
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                        <Form.Check type='checkbox' label='Check me out' />
                    </Form.Group>
                    <Button variant='outline-success' type='submit'>
                        Activate
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Activation;