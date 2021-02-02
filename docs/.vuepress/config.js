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
            { text: 'Java', link: '/Java/' },
            { text: 'Spring', link: '/Spring/' },
            { text: '数据存储', link: '/数据存储/' },
            { text: '设计模式', link: '/设计模式/' },
            { text: '数据结构', link: '/数据结构/' },
            { text: '分布式', link: '/分布式/' },
            { text: '运维', link: '/运维/' },
            { text: '前端', link: '/前端/' },
            { text: '其它', link: '/其它/' },
        ],
        sidebar: {
            '/Java/': [
                {
                    title: 'Java',
                    path: '/Java/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/Java/Java基础',
                        '/Java/Java集合',
                        '/Java/JavaIO',
                        '/Java/JavaJVM',
                        '/Java/Java多线程',
                        '/Java/Java锁',
                    ]
                }
            ],
            '/Spring/': [
                {
                    title: 'Spring',
                    path: '/Spring/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/Spring/SpringIoc',
                        '/Spring/SpringAop',
                        '/Spring/SpringMvc',
                        '/Spring/SpringBoot',
                        '/Spring/SpringCloud',
                        '/Spring/SpringWebFlux',
                        '/Spring/Mybatis',
                    ]
                }
            ],
            '/数据存储/': [
                {
                    title: 'mysql',
                    path: '/数据存储/mysql/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/数据存储/mysql/mysql建库建表',
                        '/数据存储/mysql/mysql约束',
                        '/数据存储/mysql/mysql流程控制语句',
                        '/数据存储/mysql/mysql函数',
                        '/数据存储/mysql/mysql变量',
                        '/数据存储/mysql/mysql存储过程',
                        '/数据存储/mysql/mysql事务',
                        '/数据存储/mysql/mysql索引',
                        '/数据存储/mysql/mysql锁',
                        '/数据存储/mysql/mysql主从复制',
                        '/数据存储/mysql/mysql调优',
                        '/数据存储/mysql/mysql分区表',
                        '/数据存储/mysql/mysql服务器参数配置',
                    ],
                },
                {
                    title: 'redis',
                    path: '/数据存储/redis/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/数据存储/redis/redis基础',
                        '/数据存储/redis/redis命令速查',
                        '/数据存储/redis/redis常见缓存问题',
                        '/数据存储/redis/redis配置',
                        '/数据存储/redis/redis线程模型',
                        '/数据存储/redis/redis事务',
                        '/数据存储/redis/redis过期策略',
                        '/数据存储/redis/redis分布式锁',
                        '/数据存储/redis/redis集群',
                        '/数据存储/redis/redis哨兵模式',
                        '/数据存储/redis/redis主从复制',
                        '/数据存储/redis/redis持久化',
                    ],
                },
                {
                    title: 'mq',
                    path: '/数据存储/mq/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/数据存储/mq/RabbitMQ基础',
                        '/数据存储/mq/RabbitMQ高级',
                        '/数据存储/mq/RabbitMQ应用',
                    ],
                },
                {
                    title: 'elasticsearch',
                    path: '/数据存储/elasticsearch/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [

                    ],
                },
                {
                    title: 'mongodb',
                    path: '/数据存储/mongodb/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [

                    ],
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
            '/数据结构/': [
                {
                    title: '数据结构',     
                    path: '/数据结构/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [

                    ]
                }
            ],
            '/分布式/': [
                {
                    title: '分布式',     
                    path: '/分布式/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/分布式/分布式锁',
                        '/分布式/分布式事务',
                        '/分布式/Dubbo',
                        '/分布式/Zookeeper',
                        '/分布式/附录',
                    ]
                }
            ],
            '/运维/': [
                {
                    title: '运维',     
                    path: '/运维/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/运维/操作系统',
                        '/运维/Linux',
                        '/运维/FastDFS',
                        '/运维/Openresty',
                        '/运维/Tomcat',
                        '/运维/Docker基本操作',
                        '/运维/Docker安装Redis',
                        '/运维/Docker安装Nginx',
                        '/运维/Docker安装Mysql',
                        '/运维/Docker安装Jenkins',
                        '/运维/Docker安装RabbitMq',
                    ]
                }
            ],
            '/前端/': [
                {
                    title: '前端',     
                    path: '/前端/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/前端/WebPack',
                        '/前端/Vue脚手架',
                    ]
                }
            ],
            '/其它/': [
                {
                    title: '其它',     
                    path: '/其它/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/其它/计算机网络',
                        '/其它/JMH',
                        '/其它/Lua',
                    ]
                }
            ]
        }
    }
}