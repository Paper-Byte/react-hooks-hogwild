import React, { useState } from 'react';
import Nav from './Nav';
import hogs from '../porkers_data';
import HogCard from './HogCards';

function App() {
  const [hogFilter, setHogFilter] = useState('all');
  const [daHogs, setDaHogs] = useState(hogs);
  const [newHog, setNewHog] = useState({
    name: '',
    specialty: '',
    greased: false,
    weight: 0,
    'highest medal achieved': 'none',
    image: '',
    isHidden: false,
  });

  const isHidden = (id) => {
    setDaHogs((prevState) =>
      prevState.map((hog) =>
        hog.name === id ? { ...(hog.isHidden = true) } : hog
      )
    );
  };

  const updateNewHog = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    setNewHog({ ...newHog, [name]: value });
  };

  const newHogInt = (event) => {
    const newWeight = parseFloat(event.target.value);
    setNewHog({ ...newHog, weight: newWeight });
  };

  const submitNewHog = (event) => {
    event.preventDefault();
    setDaHogs((prevState) => [...prevState, newHog]);
    setNewHog({
      name: '',
      specialty: '',
      greased: false,
      weight: 0,
      'highest medal achieved': 'none',
      image: '',
      isHidden: false,
    });
  };

  const hogsToShow =
    hogFilter === 'all'
      ? daHogs.filter((hog) => !hog.isHidden)
      : daHogs.filter(
          (hog) => !hog.isHidden && hog.greased === hogFilter
        );

  const sortDaHogs = (event) => {
    const sortOption = event.target.name;
    const sortedHogs = daHogs;
    sortedHogs.sort((a, b) => {
      if (sortOption === 'name') {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return a.weight - b.weight;
      }
    });
    setDaHogs([...sortedHogs]);
    console.log(sortedHogs);
  };
  console.log(daHogs);

  return (
    <div className="App">
      <Nav />
      <div className="ui grid">
        <label>Filter</label>
        <div className="two wide column">
          <button onClick={() => setHogFilter(true)}>Greasy</button>
          <button onClick={() => setHogFilter(false)}>
            Not greasy
          </button>
        </div>
      </div>
      <div className="ui grid">
        <label>Sort</label>
        <div className="two wide column">
          <button name="name" onClick={sortDaHogs}>
            Name
          </button>
          <button name="weight" onClick={sortDaHogs}>
            Weight
          </button>
        </div>
      </div>
      <form className="ui form" onSubmit={submitNewHog}>
        <div className="field">
          <label>Hog Name</label>
          <input
            type="text"
            name="name"
            placeholder="Hog Name"
            onChange={updateNewHog}
            value={newHog.name}
          />
        </div>
        <div className="field">
          <label>Hog Name</label>
          <input
            type="text"
            name="specialty"
            placeholder="Hog Specialty"
            onChange={updateNewHog}
            value={newHog.specialty}
          />
        </div>
        <div className="field">
          <label>Weight</label>
          <input
            type="number"
            name="weight"
            placeholder="Hog Weight"
            onChange={newHogInt}
            value={newHog.weight}
          />
        </div>
        <div className="field">
          <label>Achievement</label>
          <select
            name="highest medal achieved"
            onChange={updateNewHog}
            value={`${newHog['highest medal achieved']}`}
          >
            <option value="none">None</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
          </select>
        </div>
        <div className="field">
          <label>Are they greasy?</label>
          <select name="greased" onChange={updateNewHog}>
            <option value={true}>Greasy</option>
            <option value={false}>Not Greasy</option>
          </select>
        </div>
        <div className="field">
          <label>Image URL</label>
          <input
            name="image"
            type="text"
            value={newHog.image}
            onChange={updateNewHog}
          ></input>
          <button className="ui blue button" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="ui grid">
        {hogsToShow.map((hog) => (
          <HogCard key={hog.name} hog={hog} isHidden={isHidden} />
        ))}
      </div>
    </div>
  );
}

export default App;
