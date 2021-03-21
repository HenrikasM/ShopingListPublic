import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'reactstrap';
import {logout} from '../../action/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes= {
        logout: PropTypes.func.isRequired
    };

    
  render() {
    return (
      <div>
            <NavLink onClick={this.props.logout} href='#'></NavLink>
      </div>
    )
  }
}

export default connect(null,
    {logout})
    (Logout);
