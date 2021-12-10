import React, { Component } from 'react';
import { connect } from 'react-redux';

// CUIDADOOOO. SI O SI CLASS COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// TAMBIEN VAS A TENER QUE USAR EL METODO CONNECT DE REDUX, JUNTO A MAP_STATE_TO_PROPS 
// Y MAP_DISPATCH_TO_PROPS!! <3
export class Houses extends Component {
    
    render() {
        return (
            <div>

            </div>
        );
    };
};

export const mapStateToProps = undefined;

export const mapDispatchToProps = undefined;

export default connect(mapStateToProps, mapDispatchToProps)(Houses);

