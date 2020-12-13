module.exports = {
    title: "鸿鹄笔记",
    description: "鸿鹄的个人笔记",
    head: [
        ['meta', { rel: 'author', content: 'Keith' }],
        ['link', { rel: 'icon', content: '/favicon.ico' }]
    ],
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'About', link: '/about/' },
            { text: 'External', link: 'https://google.com' },
        ],
        sidebar: [
            {
                title: 'Group 1',   // 必要的
                path: '/css/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/css/c-aaa',
                    '/css/c-bbb',
                    '/css/c-ccc',
                ]
            }
        ]
    }
}