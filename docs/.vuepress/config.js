module.exports = {
    base: '/keith-book/',
    title: '鸿鹄笔记',
    description: '鸿鹄的个人笔记',
    head: [
        ['meta', { rel: 'author', content: 'Keith' }],
        ['link', { rel: 'icon', content: '/favicon.ico' }]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        logo: '/favicon.ico',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Java', link: '/java/' },
            { text: 'Database', link: '/database/' },
            { text: 'Linux', link: '/linux/' }
        ],
        sidebar: {
            '/java/': [
                {
                    title: 'Java',
                    path: '/java/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/java/Java基础',
                        '/java/数据结构',
                        '/java/设计模式',
                        '/java/Spring'
                    ]
                }
            ],
            '/database/': [
                {
                    title: 'Database',
                    path: '/database/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/database/mysql',
                        '/database/redis'
                    ]
                }
            ],
            '/linux/': [
                {
                    title: 'Linux',     
                    path: '/linux/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/linux/Docker基本操作',
                        '/linux/Docker安装Redis',
                        '/linux/Docker安装Nginx',
                        '/linux/Docker安装Mysql',
                        '/linux/Docker安装Jenkins',
                    ]
                }
            ]
        }
    }
}