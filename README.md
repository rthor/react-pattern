# React Pattern

A React pattern matching component for conditional rendering.

## Usage 

First install the component.

```sh
npm install --save react-pattern
```

Then, import it and use it.

```js
import React from 'react'
import Switch from 'react-pattern'

const { Case } = Switch

const App = ({ isFetching, error }) => (
  <Switch value={isFetching}>
    <Case when={true}>
      <p>Is loading the data</p>
    </Case>
    <Case default>
      <Switch value={typeof error}>
        <Case when="object">
          {() => <p>{error.message}</p>}
        </Case>
        <Case default>
          <p>App loaded without errors.</p>
        </Case>
      </Switch>
    </Case>
  </Switch>
)
```
