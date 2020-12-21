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
            { text: '设计模式', link: '/设计模式/' },
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
                        '/java/Spring'
                    ]
                }
            ],
            '/设计模式/': [
                {
                    title: '创建型模式',
                    path: '/设计模式/创建型模式/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/设计模式/创建型模式/工厂方法模式',
                        '/设计模式/创建型模式/抽象工厂模式',
                        '/设计模式/创建型模式/建造者模式',
                        '/设计模式/创建型模式/原型模式',
                        '/设计模式/创建型模式/单例模式'
                    ]
                },
                {
                    title: '结构型模式',
                    path: '/设计模式/结构型模式/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/设计模式/结构型模式/适配器模式',
                        '/设计模式/结构型模式/桥接模式',
                        '/设计模式/结构型模式/组合模式',
                        '/设计模式/结构型模式/装饰器模式',
                        '/设计模式/结构型模式/外观模式',
                        '/设计模式/结构型模式/享元模式',
                        '/设计模式/结构型模式/代理模式',
                    ]
                },
                {
                    title: '行为型模式',
                    path: '/设计模式/行为型模式/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/设计模式/行为型模式/责任链模式',
                        '/设计模式/行为型模式/命令模式',
                        '/设计模式/行为型模式/迭代器模式',
                        '/设计模式/行为型模式/中介者模式',
                        '/设计模式/行为型模式/备忘录模式',
                        '/设计模式/行为型模式/观察者模式',
                        '/设计模式/行为型模式/状态模式',
                        '/设计模式/行为型模式/策略模式',
                        '/设计模式/行为型模式/模板方法模式',
                        '/设计模式/行为型模式/访问者模式',
                    ]
                },
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