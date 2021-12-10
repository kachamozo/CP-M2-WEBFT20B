import React, { Component } from 'react';
import { connect } from 'react-redux';

// CUIDADOOOO. SI O SI CLASS COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// TAMBIEN VAS A TENER QUE USAR EL METODO CONNECT DE REDUX , JUNTO A MAP_DISPATCH_TO_PROPS! <3
export class HouseCard extends Component {

    render() {

        return (
            <div>

            </div>
        );
    };
};

export const mapDispatchToProps = undefined;

export default connect(null, mapDispatchToProps)(HouseCard);
