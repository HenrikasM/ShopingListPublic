import React, {Component} from 'react';

import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {connect} from 'react-redux';

import { getItems, deleteItem, addItem } from '../action/itemActions';

import editItem from './ItemEdit';

import PropTypes from 'prop-types';
import Jumbotron from 'reactstrap/lib/Jumbotron';


class ShopingList extends Component {

    
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    }

    componentDidMount() {
            this.props.getItems(localStorage.getItem('userId'));
      }
   
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    onClick = () => {

    }

    
    render() {
        const { items } = this.props.item;

        const mainList = (
            <Jumbotron>
            <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                {this.props.isAuthenticated ? (
                                    <Button 
                                    close aria-label="Cancel"
                                    >
                                    <editItem/>
                                    <span aria-hidden>&#x205E;</span>
                                    </Button>
                                    ) : null} {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
                </Jumbotron>
        );

        return(
            <Container>
{ this.props.isAuthenticated ? 
                mainList
                : null}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.user
});

export default connect(mapStateToProps, {getItems, deleteItem, addItem})(ShopingList);