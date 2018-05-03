import * as React from 'react';
import { withSiteData, Router, Link } from 'react-static';
import { hot } from 'react-hot-loader';
import Routes from 'react-static-routes';
const App = withSiteData((props) => (React.createElement("div", null,
    React.createElement("h2", null, props.title),
    React.createElement(Router, null,
        React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement(Link, { to: "/" }, "Home"),
                    " / ",
                    React.createElement(Link, { to: "/about" }, "About"),
                    " / ",
                    React.createElement(Link, { to: "/blog" }, "Blog")),
                React.createElement("div", { className: "p-3" },
                    React.createElement(Routes, null))))))));
export default hot(module)(App);
