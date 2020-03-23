import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (value) => {
    this.setState({ filters: { ...this.state.filters, type: value } })
  }

  onFindPetsClick = () => {
    const type = this.state.filters.type;
    const url = type === 'all' ? '/api/pets' : `/api/pets?type=${type}`;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({ pets: json })
      })
      .catch(error => console.log(error.message))
  }

  onAdoptPet = (id) => {
    this.setState(prevState => {
      const petToAdopt = prevState.pets.find(pet => pet.id === id);
      const otherPets = prevState.pets.filter(pet => pet.id !== id);
      const updatedPet = { ...petToAdopt, isAdopted: true };
      return { pets: [...otherPets, updatedPet] }
    })

  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                onAdoptPet={this.onAdoptPet}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
