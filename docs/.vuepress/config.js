module.exports = {
    base: '/',
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
            { text: 'Linux', link: '/linux/' },
            { text: 'Java', link: '/java/' }
        ],
        sidebar: {
            '/linux/': [
                {
                    title: 'Docker',
                    path: '/linux/docker/',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        '/linux/docker/Docker基本操作',
                        '/linux/docker/Docker安装Redis',
                        '/linux/docker/Docker安装Nginx',
                        '/linux/docker/Docker安装Mysql',
                        '/linux/docker/Docker安装Jenkins',
                    ]
                },
                {
                    title: 'Test',
                    path: '/linux/test/',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        '/linux/test/test1',
                        '/linux/test/test2',
                    ]
                }
            ],
            '/java/': [
                {
                    title: 'Java',
                    path: '/java/',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        '/java/java基础/反射',
                        '/java/java基础/集合',
                        '/java/java基础/锁',
                        '/java/java基础/线程池',
                        '/java/java基础/IO流',
                        '/java/java基础/JVM',
                    ]
                }
            ]
        }
    }
}