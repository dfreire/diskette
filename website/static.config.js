import axios from 'axios'

export default {
	getSiteData: () => ({
		title: 'Diskette',
	}),
	getRoutes: async () => {
		const {
			data: posts
		} = await axios.get('https://jsonplaceholder.typicode.com/posts');

		return [{
				path: '/',
				component: 'src/js/containers/Home',
				getData: () => ({
					pageTitle: 'Hooooome!',
				}),
			},
			{
				path: '/about',
				component: 'src/js/containers/About',
			},
			{
				path: '/blog',
				component: 'src/js/containers/Blog',
				getData: () => ({
					posts,
				}),
				children: posts.map(post => ({
					path: `/post/${post.id}`,
					component: 'src/js/containers/Post',
					getData: () => ({
						post,
					}),
				})),
			},
			{
				is404: true,
				component: 'src/js/containers/404',
			},
		];
	},
}
