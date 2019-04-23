import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';

import './Blog.css';
// import axios from 'axios';

const AsyncNewPost = asyncComponent(() => {
    return import('..//NewPost/NewPost'); // dynamic import syntax
});

class Blog extends Component {

    state = {
        auth: true
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/posts"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        textDecoration: 'underline'
                                    }}>Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>}/> */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>Not found</h1>} />
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;