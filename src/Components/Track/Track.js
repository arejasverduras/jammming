import React from 'react';
import './Track.css';

export class Track extends React.Component {
    renderAction (){
        const action = this.props.isRemoval ? "-" : "+";
        return action
        
    }
    
    render(){
        return(
            <div className="Track">
  <div className="Track-information">
    <h3 key={this.props.track.key}>
        {this.props.track.name}
        </h3>
    <p>
        {this.props.track.artist} | {this.props.track.album}
        </p>
  </div>
  <button className="Track-action">
            {this.renderAction()}
      </button>
</div>
        )
    }
}