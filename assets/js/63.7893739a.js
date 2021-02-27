(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{413:function(s,t,a){"use strict";a.r(t);var e=a(42),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"redis基础"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis基础"}},[s._v("#")]),s._v(" redis基础")]),s._v(" "),a("h2",{attrs:{id:"redis管道"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis管道"}},[s._v("#")]),s._v(" redis管道")]),s._v(" "),a("p",[s._v("可以将多个操作合并成一次请求，降低通信的成本")]),s._v(" "),a("div",{staticClass:"language-powershell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-powershell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 开启socket连接使用redis")]),s._v("\nnc localhost 6379\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("set")]),s._v(" k1 v1\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 批量操作redis")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("e "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"set k2 2\\n incr k2\\n get k2"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("|")]),s._v(" nc localhost 6379\n")])])]),a("h2",{attrs:{id:"消息订阅"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#消息订阅"}},[s._v("#")]),s._v(" 消息订阅")]),s._v(" "),a("p",[s._v("在redis中的A端开启消息的发布"),a("code",[s._v("publish")])]),s._v(" "),a("p",[s._v("在redis中的B端使用"),a("code",[s._v("subscribe")]),s._v("可实时监听消息")]),s._v(" "),a("p",[a("strong",[s._v("服务端")])]),s._v(" "),a("div",{staticClass:"language-powershell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-powershell"}},[a("code",[s._v("127"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("1:6379> publish my hello\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("integer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" 0\n127"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("1:6379> publish my world\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("integer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" 1\n")])])]),a("p",[a("strong",[s._v("消费端")])]),s._v(" "),a("div",{staticClass:"language-powershell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-powershell"}},[a("code",[s._v("127"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("1:6379> subscribe my\nReading messages"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("press Ctrl"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("C to quit"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"subscribe"')]),s._v("\n2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"my"')]),s._v("\n3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("integer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" 1\n1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"message"')]),s._v("\n2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"my"')]),s._v("\n3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"world"')]),s._v("\n")])])]),a("p",[a("strong",[s._v("使用场景：实时聊天")])]),s._v(" "),a("p",[s._v("客户端A发布消息到redis")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("客户端B订阅消息，收消息")])]),s._v(" "),a("li",[a("p",[s._v("redis zset服务订阅消息，维护近期的热点消息，时间作为分值，消息作为元素，剔除早期的数据")])]),s._v(" "),a("li",[a("p",[s._v("数据库服务订阅消息，维护全量消息数据")])])]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20210110094824260.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),s._v(" "),a("h2",{attrs:{id:"redisbloom-布隆过滤器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redisbloom-布隆过滤器"}},[s._v("#")]),s._v(" redisBloom（布隆过滤器）")]),s._v(" "),a("p",[s._v("布隆过滤器：解决缓存穿透")]),s._v(" "),a("ol",[a("li",[s._v("将可查询到的数据通过映射函数向布隆过滤器里标记")]),s._v(" "),a("li",[s._v("如果用户请求的数据你有，就会放行到DB，如果你没有，也有小概率被放行")]),s._v(" "),a("li",[s._v("可能会误标记：商品3 映射到了商品1和商品2标记的位置")]),s._v(" "),a("li",[s._v("但是一定概率会大量减少穿透，而且成本低")]),s._v(" "),a("li",[s._v("数据库增加了元素，也需要向布隆过滤器里增加")])]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20210110163932551.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("布隆过滤器的3种实现")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20210110164709746.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("安装布隆过滤器")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20210110164739616.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),s._v(" "),a("h2",{attrs:{id:"redis-encoding"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis-encoding"}},[s._v("#")]),s._v(" redis encoding")]),s._v(" "),a("p",[a("strong",[s._v("判断这个key中value的编码")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("object encoding key\n")])])]),a("p",[s._v("二进制安全：redis只取字节流")]),s._v(" "),a("p",[s._v("如果进行了 incr 操作，那么 redis 会将 value 取出转换成数值类型再进行 incr")]),s._v(" "),a("p",[a("strong",[s._v("编码集格式化")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("redis-cli --raw\n")])])]),a("h2",{attrs:{id:"list"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#list"}},[s._v("#")]),s._v(" List")]),s._v(" "),a("p",[s._v("栈：同向命令，如 lpush + lpop，rpush + rpop")]),s._v(" "),a("p",[s._v("队列：反向命令：如 lpush + rpop，rpush + lpop")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看list命令")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("help")]),s._v(" @list\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 取出指定 key 的 start 到 end 个元素")]),s._v("\nLRANGE KEY START END\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 例：取出 k1 的所有元素")]),s._v("\nLRANGE k1 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" -1\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 实现一个简单的阻塞队列")]),s._v("\nBLPOP k1 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 客户端1阻塞")]),s._v("\nLPUSH k1 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 客户端2压入数据客户端1取消阻塞")]),s._v("\n")])])]),a("h2",{attrs:{id:"hash"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hash"}},[s._v("#")]),s._v(" Hash")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("HSET sean name zzl\nHMSET sean age "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),s._v(" address bj\nhget sean name\nhmget sean name age\nhkeys sean\n")])])]),a("h2",{attrs:{id:"set"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#set"}},[s._v("#")]),s._v(" Set")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 向set里加入数据并去重")]),s._v("\nsadd kset "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 随机取出3个元素，去重")]),s._v("\nsrandmember kset "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 随机取出3个元素，可以有重复")]),s._v("\nsrandmember kset -3\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 弹出一个元素")]),s._v("\nspop kset\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 取两个集合的交集")]),s._v("\nsinter a b\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 取两个集合的并集")]),s._v("\nsunion a b\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 取a集合对于b集合的差集")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sdiff")]),s._v(" a b\n")])])]),a("h2",{attrs:{id:"sorted-set"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sorted-set"}},[s._v("#")]),s._v(" Sorted Set")]),s._v(" "),a("blockquote",[a("p",[s._v("skip list")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加元素到zset")]),s._v("\nzadd kzset "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v(" apple "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" banana "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" orange\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看zset的元素，带分值")]),s._v("\nzrange kzset "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" -1 WITHSCORES\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 取出分值3-8之间的元素")]),s._v("\nzrangbyscore kzset "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 取出对应元素的分值")]),s._v("\nzscore kzset apple\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 得到对应元素的排名")]),s._v("\nzrank kzset apple\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 增加对应元素分值+ ")]),s._v("\nzincrby kzset "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.5")]),s._v(" banana\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 并集 第一个集合权重1 第二个集合权重0.5")]),s._v("\nzunionstore unkey "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" k1 k2 weights "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.5")]),s._v("\n")])])]),a("h2",{attrs:{id:"bitmap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bitmap"}},[s._v("#")]),s._v(" bitmap")]),s._v(" "),a("p",[s._v("1字节 = 8位 即 1字节 = 0000 0000")]),s._v(" "),a("p",[s._v("将k1偏移量为1的位置上设置为1，即 0100 0000")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("setbit k1 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nstrlen k1 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 长度是1")]),s._v("\n")])])]),a("p",[s._v("将k1偏移量为9的位置上设置为1，即 0000 0000 0100 0000")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("setbit k2 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nstrlen k2 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 长度是2")]),s._v("\n")])])]),a("p",[a("strong",[s._v("bitpos")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("bitpos key bit start end\n")])])]),a("p",[s._v("从第一个字节中找出1的第一次出现位置")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("bitpos k1 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("integer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n")])])]),a("p",[s._v("从第二个字节中找出1的第一次出现位置")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("bitpos k2 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("integer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9")]),s._v("\n")])])]),a("p",[a("strong",[s._v("bitcount")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("BITCOUNT key "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("start"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("end"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])])]),a("p",[a("code",[s._v("start")]),s._v(" 和 "),a("code",[s._v("end")]),s._v(" 都可以使用负数值：比如 "),a("code",[s._v("-1")]),s._v(" 表示最后一个位，而 "),a("code",[s._v("-2")]),s._v(" 表示倒数第二个位，以此类推。")]),s._v(" "),a("p",[s._v("返回前两个字节中1的个数")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("bitcount k1 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n")])])]),a("p",[a("strong",[s._v("bitop")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 按位与 有0则0")]),s._v("\nbitop and ka k1 k2\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 按位或 有1则1")]),s._v("\nbitop or ko k1 k2\n")])])]),a("p",[a("strong",[s._v("应用场景")])]),s._v(" "),a("ol",[a("li",[s._v("有用户系统，统计用户登录天数，且窗口随机")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("setbit sean "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\t\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 第1天登录")]),s._v("\nsetbit sean "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\t\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 第7天登录")]),s._v("\nsetbit sean "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("364")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 第364天登录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看长度，即46个字节即可保存一个用户一年的登录天数")]),s._v("\nstrlen sean\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("integer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("46")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 反向索引找到最后一次的登录时间")]),s._v("\nbitcount sean -2 -1\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("统计某几天的活跃用户数")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 2020-6-18 号用户数1个")]),s._v("\nsetbit "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("20200618")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 2020-6-18 号用户数2个")]),s._v("\nsetbit "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("20200619")]),s._v("\t"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nsetbit "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("20200619")]),s._v("\t"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 按位或运算")]),s._v("\nbitop or destkey "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("20190618")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("20190619")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 统计人数")]),s._v("\nbitcount destkey "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" -1\n")])])]),a("p",[s._v("位图可以这样表示：user1登录了一天，user2登录了两天，user3没登录")]),s._v(" "),a("table",[a("thead",[a("tr",[a("th",[s._v("key")]),s._v(" "),a("th",[s._v("user1")]),s._v(" "),a("th",[s._v("user2")]),s._v(" "),a("th",[s._v("user3")])])]),s._v(" "),a("tbody",[a("tr",[a("td",[s._v("20200618")]),s._v(" "),a("td",[s._v("0")]),s._v(" "),a("td",[s._v("1")]),s._v(" "),a("td",[s._v("0")])]),s._v(" "),a("tr",[a("td",[s._v("20200619")]),s._v(" "),a("td",[s._v("1")]),s._v(" "),a("td",[s._v("1")]),s._v(" "),a("td",[s._v("0")])])])])])}),[],!1,null,null,null);t.default=n.exports}}]);