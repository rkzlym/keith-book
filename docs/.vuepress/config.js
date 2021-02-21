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
            { text: '服务器', link: '/服务器/' },
            { text: '前端', link: '/前端/' },
            { text: '拓展', link: '/拓展/' },
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
                    path: '/Spring/Spring',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/Spring/Spring/SpringIoc',
                        '/Spring/Spring/SpringAop',
                        '/Spring/Spring/SpringMvc',
                        '/Spring/Spring/SpringBoot',
                        '/Spring/Spring/SpringWebFlux',
                        '/Spring/Spring/Mybatis',
                    ]
                },
                {
                    title: 'Spring Cloud',
                    path: '/Spring/SpringCloud',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/Spring/SpringCloud/注册中心',
                        '/Spring/SpringCloud/服务调用',
                        '/Spring/SpringCloud/服务网关',
                        '/Spring/SpringCloud/链路追踪',
                        '/Spring/SpringCloud/配置中心',
                        '/Spring/SpringCloud/健康检查',
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
                        '/数据存储/mysql/mysql分库分表',
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
                        '/数据存储/redis/redis主从复制',
                        '/数据存储/redis/redis持久化',
                        '/数据存储/redis/redis漏斗算法',
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
                        '/数据结构/1.时间空间复杂度',
                        '/数据结构/2.链表',
                        '/数据结构/3.队列',
                        '/数据结构/4.栈',
                        '/数据结构/5.树',
                        '/数据结构/6.串',
                        '/数据结构/7.递归',
                        '/数据结构/8.排序算法',
                    ]
                }
            ],
            '/服务器/': [
                {
                    title: 'Linux',     
                    path: '/服务器/Linux/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/服务器/Linux/1.Linux常用命令',
                        '/服务器/Linux/2.IO模型',
                        '/服务器/Linux/3.Shell',
                        '/服务器/Linux/4.Tomcat',
                        '/服务器/Linux/5.Netty',
                        '/服务器/Linux/6.Openresty',
                        '/服务器/Linux/7.FastDFS',
                        '/服务器/Linux/8.Linux安装Redis',
                        '/服务器/Linux/99.附录',
                    ]
                },
                {
                    title: 'Docker',     
                    path: '/服务器/Docker/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/服务器/Docker/1.Docker基本操作',
                        '/服务器/Docker/2.Docker安装Redis',
                        '/服务器/Docker/3.Docker安装Nginx',
                        '/服务器/Docker/4.Docker安装Mysql',
                        '/服务器/Docker/5.Docker安装Jenkins',
                        '/服务器/Docker/6.Docker安装RabbitMq',
                    ]
                },
                {
                    title: '分布式',     
                    path: '/服务器/分布式/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/服务器/分布式/1.分布式锁',
                        '/服务器/分布式/2.分布式事务',
                        '/服务器/分布式/3.Zookeeper',
                        '/服务器/分布式/4.Dubbo',
                        '/服务器/分布式/99.附录',
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
            '/拓展/': [
                {
                    title: '拓展',     
                    path: '/拓展/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/拓展/计算机网络',
                        '/拓展/JMH',
                        '/拓展/Lua',
                        '/拓展/大型系统设计',
                    ]
                }
            ]
        }
    }
}