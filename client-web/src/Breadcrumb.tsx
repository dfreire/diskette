import * as React from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends React.Component {
    render() {
        const tokens = window.location.pathname.split('/').filter(t => t.length > 0);
        const links = [{
            to: '/content',
            component: <Link className="text-black no-underline" to={'/content'}>content</Link>,
        }];

        for (let i = 1; i < tokens.length; i++) {
            const token = tokens[i];
            const previous = links[i - 1];
            const to = previous.to + '/' + token;
            const component = <Link className="text-black no-underline" to={to}>{token}</Link>;
            links.push({ to, component });
        }

        return (
            <div className="bg-grey-light p-3">
                {links.map((link, i) => (
                    <span key={link.to}>{link.component} {i < tokens.length - 1 ? ' / ' : ''}</span>
                ))}
            </div>
        );
    }
}

export default Breadcrumb;
