## Stateless component (dumb, presentational):
they only output data as they get it. Better to have functional stateless components.
## State components (smart, container):
As less as possible. Only a few selected components should have state. 

## Class base lifecycle

### Creation 
Creation is only available in Class-based Components!

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

### Update
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

### How React updates the DOM
- render()
It doesn't immediately render it to the DOM. It is a suggestion of what the HTML should look like.
It compares Virtual domes: Old and re-rendered (or future) virtual DOM
React keeps two copies of the DOM and compares them to see if there are any differences. At that
point it changes the dom only where the changes occured (like the text of the button)

## High order component
- It wraps another component.
- There are two ways to create it, you don't return a functional component but instead you pass
in a reference to a component. To use it you need to wrap it in the export of the class using it.

## Refs
ref is a special property to reference an element. For functional components you can use useRef() hook

## Context API
when you don't want to pass into multiple layers the properties for a component

## HTTP Request in React with Axios
The Server is a Rest API that sends back JSON Data

Axios: Promise based 

### Interceptors
Allows you to manipulate a response and add some common headers. It accesses axios globally.
You always need to return the request otherwise it blocks it.
First argument: request configuration changing function
Second argument: function that handles any error;
Interceptors can be used both for requests and responses.

### Defaults
When the request is always the same, you can change the baseURL of the defaults property in axios.
If you want to use for example the baseURL only for certain parts of the project you can use instances.

### Instances
You create an instance of axios and use it only where needed to give you flexibility and control in detail in which part of your app you want to use default settings and where not.

## Routing
Be able to show different pages to the user in single page applications, that only has a single HTML file. We use JS to render different pages for different paths.
Routing parses the path and shows the appropriate code.

The de-facto standard package is react-router with react-router-dom
What it does is
- Parses the URL / Path that will be configured differently by the developer
- Reads the configuration
- Renders the appropriate Component by loading the different code

You can use the Route component in your code with the following attributes:
- path: The path for which the content can be seen, the criteria to be met
- exact: if the specified path is the exact path
- render: some jsx code to render content for that path
- component: function or class you want to use
Routes are parsed from top to bottom. It shows all routes that match.

To not reload the whole site you can use the Link component that has the to attribute. For a more enhanced Link use the NavLink instead (for example to have an "active" css class on it or aria tags).

Note: The routing props are not passed down to the components tree.
There is a HOC called withRouter which we use by wrapping the export to get access to these properties.

The way you write links doesn't affect absolute or relative paths, links will always be absolute and will always be appended right after your domain.
If you want to turn it into a relative path you need to build the path dynamically. You can use the this.props.match.url to take the path you are currently on.

"/:id" is replaced dynamically with a property, it tells the router it is a route parameter. You need to rap the component with a Link. 
To pass the route parameter we have the params under the props match parameters.

You can tell React Router to only load one route, the Switch component which is the first one you find.
You can also mix and only include routes that needed to be exclusive.

Nested routes: load a Component inside another component loaded via route. 
The Route component can be used anywhere you like as long as you have the BrowserRouter wrapping it up in the tree.
Note: The router uses old components, it does not update based on a new parameter. Use componentDidUpdate

### Redirecting
You can use a special component, Redirect, where you specify the path and where it should bring to.
Redirect can also be used conditionally.

### Navigation guards
Needed for example when you don't know if the user is authenticated or not.

### Lazy loading
Depends on the webpack configuration, needs to be modern.
Since 16.6 we have React Suspense to do lazy loading. It can be used also outside of a Router scenario.

## Redux
A global store for state.
Each Redux application has a Central Store that contains all of the application state (it is a giant JavaScript object).
Actions are dispatched from react components and can contain a payload, you send out information to the Central store.
An Action then reaches Recuders that check the type of the action. It is a pure function that recieves the old state and the action and returns
the new state. Reducers need to be synchronous. Reducers updated the Central Store.
There is a Subscription module when the state changes, react components can register to the subscription.
NEVER MUTATE ANY DATA!
To not make a huge reducer you can split it up by feature (in the end,
redux can only manage one reducer).

### When sould we use Redux / action dispatching ?
Depends on the size of the application and the complexity of the state.
Some examples:
- Local UI state (show/hide backdrop): mostly handled within components
- Persistent state (All users, all posts): use it but not all the data, just the relevant slices
- Client State (is user authenticated, filters set by the user): yup, its central storage is perfect for this case