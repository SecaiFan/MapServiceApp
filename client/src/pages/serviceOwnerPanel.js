import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";

const ServiceOwnerPanel = () => {
    return (
        <Container className='d-flex justify-content-center align-items-center'
                   style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>Owner's panel</h2>
                <Form className='d-flex flex-column'>
                    <Form.Group className='mb-3' controlId='formName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter Institution name' />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formPassword'>
                        <Form.Label>Enter Coordinates</Form.Label>
                        <Form.Control type='text' placeholder='Coordinates' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formPassword'>
                        <Form.Label>Or Address</Form.Label>
                        <Form.Control type='text' placeholder='Address' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formCheckbox'>
                        <Form.Check type='checkbox' label='Check me out' />
                    </Form.Group>
                    <Button variant='outline-success' type='Add'>
                        Sign In
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default ServiceOwnerPanel;