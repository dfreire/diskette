import * as React from 'react';
import { withRouteData } from 'react-static';
import { SiteData } from '../common/Types';

interface Props extends SiteData {
	pageTitle: 'Home',
}

export default withRouteData((props: Props) => (
	<div>
		<h1 style={{ textAlign: 'center' }}>Welcome to {props.title} {props.pageTitle}</h1>
	</div>
));
