import React from 'react';

export default function Home() {
  fetch('https://covid-api.mmediagroup.fr/v1/cases')
    .then(response => response.text())
    .then(data => console.log(data));
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}
