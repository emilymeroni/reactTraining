import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as personActionTypes from '../store/personActions';

class Persons extends Component {
    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.personAdded} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.personDeleted(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        persons: state.persons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        personAdded: () => dispatch({ type: personActionTypes.ADD }),
        personDeleted: (id) => dispatch({ type: personActionTypes.DELETE, id: id })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);