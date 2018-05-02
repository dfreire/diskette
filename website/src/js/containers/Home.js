import * as React from 'react';
import { withRouteData } from 'react-static';
export default withRouteData((props) => (React.createElement("div", null,
    React.createElement("h1", { style: { textAlign: 'center' } },
        "Welcome to ",
        props.title,
        " ",
        props.pageTitle))));
