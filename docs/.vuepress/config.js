module.exports = {
    title: "鸿鹄笔记",
    description: "鸿鹄的个人笔记",
    head: [
        ['meta', { rel: 'author', content: 'Keith' }],
        ['link', { rel: 'icon', content: '/favicon.ico' }]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        logo: '/assets/img/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Linux', link: '/linux/' },
            { text: 'About', link: '/about/' }
        ],
        sidebar: {
            '/linux/': [
                {
                    title: 'Docker',   // 必要的
                    path: '/linux/docker/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        '/linux/docker/Docker基本操作',
                        '/linux/docker/Docker安装Redis',
                        '/linux/docker/Docker安装Nginx',
                        '/linux/docker/Docker安装Mysql',
                        '/linux/docker/Docker安装Jenkins',
                    ]
                },
                {
                    title: 'Test',   // 必要的
                    path: '/linux/test/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        '/linux/test/test1',
                        '/linux/test/test2',
                    ]
                }
            ],
            '/about/': [
                {
                    title: 'About',   // 必要的
                    path: '/about/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        '/about/aboutTest',
                        '/about/aboutTest2',
                    ]
                }
            ]
        }

        // '/linux/': [
        //     '/linux/docker/Docker基本操作',
        //     '/linux/docker/Docker安装Redis',
        //     '/linux/docker/Docker安装Nginx',
        //     '/linux/docker/Docker安装Mysql',
        //     '/linux/docker/Docker安装Jenkins',
        //     '/linux/test/test1',
        //     '/linux/test/test2',
        // ],
    }
}