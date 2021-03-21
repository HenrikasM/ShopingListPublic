import React, { Component } from 'react';
import {
    NavLink,
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
import {login} from '../../action/authActions';
import {clearErrors} from '../../action/errorActions';


class LoginModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg});
            } else {
                this.setState({msg: null});
            }
        }

        if(this.state.modal){
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const {email,password} = this.state;

        const User = {
            email,
            password
        };


        this.props.login(User);

    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Login
                </NavLink>

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

                                <Label for='item'>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    className="mb-3"
                                    autoComplete ="email"
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

                                <Button color='dark' style={{ marginTop: '2rem' }} block
                                >Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, {login, clearErrors})(LoginModal);