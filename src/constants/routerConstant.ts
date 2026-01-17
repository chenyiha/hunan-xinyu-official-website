export default {
	// 首页
	home: {
		path: '/',
		name: 'staticRoutes.home',
		component: () => import('/@/views/home/index.vue'),
		meta: {
			title: '首页',
			isAuth: false,
		},
	},
	// 关于我们
	aboutProfile: {
		path: '/about/profile',
		name: 'staticRoutes.aboutProfile',
		component: () => import('/@/views/about/profile/index.vue'),
		meta: {
			title: '公司简介',
			isAuth: false,
		},
	},
	aboutHistory: {
		path: '/about/history',
		name: 'staticRoutes.aboutHistory',
		component: () => import('/@/views/about/history/index.vue'),
		meta: {
			title: '历史里程碑',
			isAuth: false,
		},
	},
	aboutMission: {
		path: '/about/mission',
		name: 'staticRoutes.aboutMission',
		component: () => import('/@/views/about/mission/index.vue'),
		meta: {
			title: '使命愿景',
			isAuth: false,
		},
	},
	aboutCertification: {
		path: '/about/certification',
		name: 'staticRoutes.aboutCertification',
		component: () => import('/@/views/about/certification/index.vue'),
		meta: {
			title: '资质与认证',
			isAuth: false,
		},
	},
	aboutQuality: {
		path: '/about/quality',
		name: 'staticRoutes.aboutQuality',
		component: () => import('/@/views/about/quality/index.vue'),
		meta: {
			title: '质量体系',
			isAuth: false,
		},
	},
	aboutManufacturing: {
		path: '/about/manufacturing',
		name: 'staticRoutes.aboutManufacturing',
		component: () => import('/@/views/about/manufacturing/index.vue'),
		meta: {
			title: '制造能力',
			isAuth: false,
		},
	},
	// 产品中心
	products: {
		path: '/products',
		name: 'staticRoutes.products',
		component: () => import('/@/views/products/index.vue'),
		meta: {
			title: '产品中心',
			isAuth: false,
		},
	},
	productDetail: {
		path: '/products/:id',
		name: 'staticRoutes.productDetail',
		component: () => import('/@/views/products/detail/index.vue'),
		meta: {
			title: '产品详情',
			isAuth: false,
		},
	},
	// 解决方案
	solutions: {
		path: '/solutions',
		name: 'staticRoutes.solutions',
		component: () => import('/@/views/solutions/index.vue'),
		meta: {
			title: '解决方案',
			isAuth: false,
		},
	},
	solutionDetail: {
		path: '/solutions/:id',
		name: 'staticRoutes.solutionDetail',
		component: () => import('/@/views/solutions/detail/index.vue'),
		meta: {
			title: '解决方案详情',
			isAuth: false,
		},
	},
	// 技术与支持
	tech: {
		path: '/tech',
		name: 'staticRoutes.tech',
		component: () => import('/@/views/tech/index.vue'),
		meta: {
			title: '技术与支持',
			isAuth: false,
		},
	},
	techRd: {
		path: '/tech/rd',
		name: 'staticRoutes.techRd',
		component: () => import('/@/views/tech/rd/index.vue'),
		meta: {
			title: '研发与创新',
			isAuth: false,
		},
	},
	techTesting: {
		path: '/tech/testing',
		name: 'staticRoutes.techTesting',
		component: () => import('/@/views/tech/testing/index.vue'),
		meta: {
			title: '测试与实验室',
			isAuth: false,
		},
	},
	techResources: {
		path: '/tech/resources',
		name: 'staticRoutes.techResources',
		component: () => import('/@/views/tech/resources/index.vue'),
		meta: {
			title: '资源中心',
			isAuth: false,
		},
	},
	techWhitepaper: {
		path: '/tech/whitepaper',
		name: 'staticRoutes.techWhitepaper',
		component: () => import('/@/views/tech/whitepaper/index.vue'),
		meta: {
			title: '技术白皮书',
			isAuth: false,
		},
	},
	techApplications: {
		path: '/tech/applications',
		name: 'staticRoutes.techApplications',
		component: () => import('/@/views/tech/applications/index.vue'),
		meta: {
			title: '应用案例',
			isAuth: false,
		},
	},
	techFaq: {
		path: '/tech/faq',
		name: 'staticRoutes.techFaq',
		component: () => import('/@/views/tech/faq/index.vue'),
		meta: {
			title: '常见问题',
			isAuth: false,
		},
	},
	techDocuments: {
		path: '/tech/documents',
		name: 'staticRoutes.techDocuments',
		component: () => import('/@/views/tech/documents/index.vue'),
		meta: {
			title: '文档下载库',
			isAuth: false,
		},
	},
	techSupport: {
		path: '/tech/support',
		name: 'staticRoutes.techSupport',
		component: () => import('/@/views/tech/support/index.vue'),
		meta: {
			title: '支持请求',
			isAuth: false,
		},
	},
	// 新闻与活动
	news: {
		path: '/news',
		name: 'staticRoutes.news',
		component: () => import('/@/views/news/index.vue'),
		meta: {
			title: '新闻与活动',
			isAuth: false,
		},
	},
	newsDetail: {
		path: '/news/:id',
		name: 'staticRoutes.newsDetail',
		component: () => import('/@/views/news/detail/index.vue'),
		meta: {
			title: '新闻详情',
			isAuth: false,
		},
	},
	// 联系我们
	contact: {
		path: '/contact',
		name: 'staticRoutes.contact',
		component: () => import('/@/views/contact/index.vue'),
		meta: {
			title: '联系我们',
			isAuth: false,
		},
	},
	contactInquiry: {
		path: '/contact/inquiry',
		name: 'staticRoutes.contactInquiry',
		component: () => import('/@/views/contact/inquiry/index.vue'),
		meta: {
			title: '一般问询',
			isAuth: false,
		},
	},
	contactQuote: {
		path: '/contact/quote',
		name: 'staticRoutes.contactQuote',
		component: () => import('/@/views/contact/quote/index.vue'),
		meta: {
			title: '产品询价',
			isAuth: false,
		},
	},
	contactSupport: {
		path: '/contact/support',
		name: 'staticRoutes.contactSupport',
		component: () => import('/@/views/contact/support/index.vue'),
		meta: {
			title: '技术支持请求',
			isAuth: false,
		},
	},
	contactPartner: {
		path: '/contact/partner',
		name: 'staticRoutes.contactPartner',
		component: () => import('/@/views/contact/partner/index.vue'),
		meta: {
			title: '成为合作伙伴',
			isAuth: false,
		},
	},
};
