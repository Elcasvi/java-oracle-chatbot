import React, { Component } from 'react';

class DevCardManagerView extends Component {
    render() {
        return (
            <article className='dev-card-manager'>
                <header className="dev-card-manger-header">
                    <img className="dev-card-manger-icon"
                        alt="Dev Icon"
                        src="https://unavatar.io/user"></img>
                    <div className="dev-card-manager-name">
                        <strong>Erick Eduardo Orozco Reyes</strong>
                        <span className="dev-card-manager-numTask">Numero de Task Asignadas: 10</span>
                    </div>
                </header>

                <div className='dev-card-manager-button'>
                    <button className="dev-card-manager-showMore">Ver Más</button>
                </div>
            </article>
        );
    }
}

export default DevCardManagerView;
