import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  pets() {
    return this.props.pets.map(pet => (
      <Pet pet={pet} onAdoptPet={this.props.onAdoptPet} />
    ))
  }

  render() {
    return (
      <div className="ui cards">
        {this.props.pets && this.pets()}
      </div>
    )
  }
}

export default PetBrowser
