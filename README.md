using an svg map from [here on wikipedia](https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_%28states_only%29.svg)

we can quickly and easily build an SVG react USA state selection map!


## getting started

### windows

windows users will need to install a command shell to be able to do anything useful on their computer!

[download git bash from here](https://gitforwindows.org/) and open the `git bash` program whenever we use a `$ shell command` (it'll look like that with the `$`)

[or the brave amongst us may try using Windows Linux Subsystem](https://www.google.com/search?q=windows+bash)

let's make sure we have installed `node` and `npm`

`$ which node`

this should print out something like

`/usr/local/node`

if it doesn't, you'll need to [download node from here](https://nodejs.org/en/download/)

once you've downloaded node, you should now see a response from `$ which node`

we should also check

`$ which npm`

and

`$ which npx`

which should both respond with a program location

then you're ready to start!




### mac

let's make sure we have installed `node` and `npm`

open the `terminal` application (command + space, terminal... or find it in Applications/Utilities)

`$ which node`

you should see a response like

`/usr/local/node`

if you see nothing, [download node from here](https://nodejs.org/en/download/)

once it's done downloading, you should see a response from

`$ which node`

`$ which npm`

and

`$ which npx`

once you do, you're ready to start!



### ubuntu


let's make sure we have installed `node` and `npm`


open bash (ctrl + alt + t)

`$ which node`

`$ which npm`

`$ which npx`

should all respond with a program location

if they don't, you'll need to install node

if you're using version 22, node is part of apt!

```sudo apt install nodejs -y```

[if you're using version 20](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)

[if you're using version 18](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/) 

[if you're using version 16](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)


once you have node, you're ready to go!




## making our project

open up the shell (git bash / terminal / ctrl + alt + t)

let's make a directory for all of our code projects

`$ mkdir code`

now we can check that it's really there

`$ ls`

and navigate into it

`$ cd code`


### create-react-app

now we can create a react app

`$ npx create-react-app usa-is-the-best`

once CRA is done running, we can enter the project and run it


`$ cd usa-is-the-best`

`$ npm start`

you should now see [localhost:3000](http://localhost:3000) with a rotating React logo.



## setting up the app

let's make ourselves a new Component, from which we'll render the map

in a new terminal session (cmd + t / alt + t on mac / ubuntu to make a new tab in terminal)

`$ touch src/USA.js`

let's put the boilerplate React Component code

<sub>./src/USA.js</sub>
```js
import React from 'react';

const USA = ()=> (
  'USA Placeholder'
);

export default USA;
```

now we can set up our main file (App.js) to render the component we just made


<sub>./src/App.js</sub>
```js
import './App.css';

import USA from './USA';

function App() {
  return (
    <div className='App'>
      <USA />
    </div>
  );
}

export default App;

```

now we should see our placeholder in the browser

so we're ready to download our USA map SVG



## getting the map

our USA svg map is available [here on wikipedia](https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_%28states_only%29.svg)

go into the browser and hit (ctrl + u / command + u / ctrl + u) to see the source code for the graphic


let's copy that into our USA component (so we can convert it to a React SVG)


<sub>./src/USA.js</sub>
```js
const USA = ()=> (
  <?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="959" height="593">
   <?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="959" height="593">
    <title>Blank US states map</title>
    <defs>
      <style type="text/css">


        .state {fill:#D3D3D3;}


        /*
        The .state class sets the default fill color for all states.

        Individual states (such as Kansas, Montana, Pennsylvania) can be colored as follows:

        #KS, #MT, #PA {fill:#0000FF;}

        Place this code in the empty space below.
        */





      </style>
    </defs>
    <g class="state">
      ...
    </g>
    <path id="frames" fill="none" stroke="#A9A9A9" stroke-width="2" d="M215 493v55l36 45M0 425h147l68 68h85l54 54v46"/>
  </svg>
);

export default USA;
```

we're going to need to do  bit of cleanup for this to work


1) get rid of the `<xml/>` tag, `<defs>` tag

2) convert the `height` and `width` on the `<svg>` tag to `viewBox`

```html
  <svg viewBox="0 0 959 593">
```


3) remove the comment and unnecessary `<path/>` at the end, fixing `strokeWidth`

```html
//...

      <g id="DC">
        <title>District of Columbia</title>
        <path id="DC1" d="M801.8 253.8l-1.1-1.6-1-.8 1.1-1.6 2.2 1.5z"/>
        <circle id="DC2" stroke="#FFFFFF" strokeWidth="1.5" cx="801.3" cy="251.8" r="5" opacity="1"/>
      </g>
    </g>
  </svg>
);

export default USA;
```


now we should see the map show up in our browser, so we're ready to do some React programming!




## a state for our colors, a color for our states

in our `App`, we are going to keep track of which color each state should be.

how will we do that? using `state` of course!

let's give our App a `state`

<sub>./src/App.js</sub>
```js
import { useState } from 'react';
import './App.css';

import USA from './USA';

function App() {

  const [mapColors, setMapColors] = useState({
    AK: 'red'
  });
  
  return (
    <div className='App'>
      <USA />
    </div>
  );
}

export default App;
```

now we can pass our `state` to our map Component as a prop and make Alaska red


<sub>./src/App.js</sub>
```js
//...

  return (
    <div className='App'>
      <USA mapColors={mapColors}/>
    </div>
  );
}
//...
```


inside the component, we'll need to read the `mapColors` prop and use it to set the `fill` on our state

<sub>./src/USA.js</sub>
```js
//...

const USA = ({ mapColors })=> (
  <svg viewBox="0 0 959 593">
    <g>
      <path id="AK" fill={mapColors.AK} ...
//...
```

now we can repeat this process 50 more times (50 state + DC!)



## changing the color

when our user clicks on a state, we want to update the `mapColors` state value for that state

let's make an updater function and pass it to our map as a prop

<sub>./src/App.js</sub>
```js
import { useState } from 'react';
import './App.css';

import USA from './USA';

function App() {

  const [mapColors, setMapColors] = useState({});

  const changeStateColor = (event)=>{
    setMapColors(prev=> ({
      ...prev,
      [event.target.id]: 'green'
    }))
  };
  
  return (
    <div className='App'>
      <USA mapColors={mapColors} onClick={changeStateColor} />
    </div>
  );
}

export default App;
```

(we've also taken out the default red color for Alaska, now that we can change it with a click)

at first, this is only going to change our states to green


now in our map Component, we can read that prop out and apply it to our svg

<sub>./src/USA.js</sub>
```js
//...

const USA = ({ mapColors, onClick })=> (
  <svg viewBox="0 0 959 593" onClick={onClick}>
    <g>

//...
```


## doing it 51 times

once you've set up the fill on our 50 states + DC, we'll be ready to cycle through colors!


## cycling through colors

now that our states all update to the color we want, let's make them cycle through three colors

<sub>./src/App.js</sub>
```js
//...
const colors = ['red', 'blue', 'green'];

//...

  const changeStateColor = (event)=>{
    setMapColors({
      ...mapColors,
      [event.target.id]: colors[
        (colors.indexOf( mapColors[event.target.id] ) + 1) % colors.length
      ]
    })
  };
//...
```

let's get through this line and then we're done!


how it works:

 - the `event` comes in from the click from react
   - `event.target` describes the element you clicked (the `<path/>` for the state)
   - `event.target.id` is the `id="WI"` that we put on all the states, which we use to track them
 - `setMapColors` is the updated function `useState` gives us for our `mapColors` state variable
   - we want all the old values, with one updated
     - ({ ...mapColors }) makes a new object with all the old values in it
     - ({ ...mapColors, AK: 'red' }) would overwrite Alaska to be red in the new object
   - in ({ [event.target.id]: 'red' }) the `[]` square brackets tell js to compute the expression for the key
     - this is how we can use a variable to decide for what key to set a value in a new object
   - to cycle through colors we need to find the old color, then pick the next one, and loop at the end
     - `colors.indexOf( ... )` will find the index of what we pass to it in the array of colors
       - `mapColors[event.target.id]` is the old color for the state we clicked
       - ` + 1` becasuse we want the next one
     - `(...) % colors.length` uses modulo `%` to loop back to 0 when we hit the end of the array
     - now that we computed the next index we want, `colors[ ... ]` will grab it out of the array


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
