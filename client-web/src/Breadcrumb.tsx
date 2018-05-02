import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    location: Location;
}

const Breadcrumb = (props: Props) => {
    const tokens = props.location.pathname.split('/').filter(t => t.length > 0);

    const links = [{
        to: '/content',
        component: <Link className={classes.link} to={'/content'}>content</Link>,
    }];

    for (let i = 1; i < tokens.length; i++) {
        const token = tokens[i];
        const previous = links[i - 1];
        const to = previous.to + '/' + token;
        const component = <Link className={classes.link} to={to}>{token}</Link>;
        links.push({ to, component });
    }

    return (
        <div className={classes.container}>
            {links.map((link, i) => (
                <span key={link.to}>{link.component} {i < tokens.length - 1 ? ' / ' : ''}</span>
            ))}
        </div>
    );
}

const classes = {
    container: 'bg-grey-light p-3',
    link: 'text-black no-underline',
};

export default Breadcrumb;
