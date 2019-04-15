Stateless component (dumb, presentational):
they only output data as they get it. Better to have functional stateless components.
State components (smart, container):
As less as possible. Only a few selected components should have state. 

Handlers can be passed on to a component as a reference within the props.

Class base lifecycle

Only available in Class-based Components!

Creation 

NB: Lifecycle Hooks !== React Hooks

- constructor 
is the first function called, if you need to override it you should call constructor(props)

- getDerivedStateFromPops(props, state)

- render()
prepare & structure JSX Code

- Render child Components 
will call the render method on all the children

- componentDidMount()
you can cause side effects (for example an HTTP request). Don't udpate the state synchronously!