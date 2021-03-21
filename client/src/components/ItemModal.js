import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input,
    ModalHeader,
    Label
} from 'reactstrap';

 import {connect} from 'react-redux';
 import {addItem} from '../action/itemActions';
 import PropTypes from 'prop-types';

//item modal -> item action -> items

 class ItemModal extends Component {

     state = { 
         modal: false,
         name: '',
      };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

      toggle = () => {
          this.setState ({
              modal: !this.state.modal
          });
      }

      onChange = (e) => {
          this.setState({ 
              [e.target.name]: e.target.value} );
          //add to state
      };

      onSubmit = (e) => {
          e.preventDefault();

          const newItem = {  
            name: this.state.name,
            userID:  localStorage.getItem('userId')
            //take from state
          }

          //Add item actions
          this.props.addItem(newItem);

          //Close modals
          this.toggle();
      }

      render() {
          return (
              <div>
                  { this.props.isAuthenticated ? 
                  <Button
                  color = 'dark'
                  style={{marginBottom: '2rem'}}
                  onClick={this.toggle}
                  >add item</Button>: <h4 className='mb-3 ml-4'>Please log in to manage items</h4>}
                  <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  >
                  <ModalHeader
                  toggle={this.toggle}
                  >Add to shoping list</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='item'>Item</Label>
                                <Input 
                                type='text'
                                name = 'name'
                                id='item'
                                placeholder='add shoping item'
                                onChange={this.onChange}
                                />
                                <Button color='dark' style ={{marginTop: '2rem'}} block
                                >Add item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                  </Modal>
              </div>
          );
      }
 }
 
const mapStateToProps = state => ({
    item:state.item,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {addItem})(ItemModal);