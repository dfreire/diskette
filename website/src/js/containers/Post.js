import * as React from 'react';
import { withRouteData, Link } from 'react-static';
export default withRouteData(({ post }) => (React.createElement("div", null,
    React.createElement(Link, { to: "/blog/" },
        '<',
        " Back"),
    React.createElement("br", null),
    React.createElement("h3", null, post.title),
    React.createElement("p", null, post.body))));
