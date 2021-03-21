import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input,
    ModalHeader,
    Label,
    Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class ItemEdit extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
    };


    render() {
        return (
            <div>

                <Button 
                close aria-label="Cancel"
                onClick={this.toggle}
                >zzzzzzzzzzzzzzzzzzzz
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>

                                <Label for='item'>Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder=''
                                    className="mb-3"
                                    autoComplete =""
                                    onChange={this.onChange}
                                />

                                <Label for='item'>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='Password'
                                    placeholder='Password'
                                    className="mb-3"
                                    autoComplete = "current-password"
                                    onChange={this.onChange}
                                />

                                <Button color='blue' style={{ marginTop: '2rem' }} block
                                >Save</Button>
                                <Button color='dark' style={{ marginTop: '2rem' }} block>Cancel</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(ItemEdit);