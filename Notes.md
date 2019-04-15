Stateless component (dumb, presentational):
they only output data as they get it. Better to have functional stateless components.
State components (smart, container):
As less as possible. Only a few selected components should have state. 

Class base lifecycle - Creation

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

Component Lifecycle - Update

- getDerivedStateFromPops(props, state)
Sync local state, don't cause side effects!

- shouldComponentUpdate(nextProps, nextState)
you can cancel the updating process, allows you to prevent unnecessary update cycles

- render()

- update Child Component Props

- getSnapshotBeforeUpdate(prevProps, prevState)
last minute dom operations (like getting the current scroll position of the user)

- componentDidUpdate() -> probably the most used
you can cause side effects, watch out to infinite loops if you make infinite loops. don't call synchronously the setState method.

For function Components you use useEffects, the second most important hook after useState. It allows you to access the rendering phase also after the dom updates.

How React updates the DOM
- render()
It doesn't immediately render it to the DOM. It is a suggestion of what the HTML should look like.
It compares Virtual domes: Old and re-rendered (or future) virtual DOM
React keeps two copies of the DOM and compares them to see if there are any differences. At that
point it changes the dom only where the changes occured (like the text of the button)

High order component
- It wraps another component.
- There are two ways to create it, you don't return a functional component but instead you pass
in a reference to a component. To use it you need to wrap it in the export of the class using it.

Refs
ref is a special property to reference an element. For functional components you can use useRef() hook

Context API
when you don't want to pass into multiple layers the properties for a component