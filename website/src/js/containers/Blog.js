import * as React from 'react';
import { withRouteData, Link } from 'react-static';
export default withRouteData(({ posts }) => (React.createElement("div", null,
    React.createElement("h1", null, "It's blog time."),
    React.createElement("br", null),
    "All Posts:",
    React.createElement("ul", null, posts.map(post => (React.createElement("li", { key: post.id },
        React.createElement(Link, { to: `/blog/post/${post.id}/` }, post.title))))))));
