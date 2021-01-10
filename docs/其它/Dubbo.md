# Dubbo

### BIO / NIO / AIO / Netty

BIO：同步阻塞，等待读写命令时，线程一直处于等待状态

NIO：同步非阻塞，等待读写命令时，线程可以去做别的事，使用selector轮询，遇到感兴趣的就处理(ACCEPT)

AIO：异步非阻塞，临时写好处理方法，当客户端连上来时自动调用此方法

Netty：基于NIO的封装

缓冲区(Buffer)：就像一个数组，可以保存多个相同类型的数据，主要用于与 NIO 通道进行交互，数据是从通道读入缓冲区，从缓冲区写入通道中的。

通道(Channel)：表示 IO 源与目标打开的连接，本身不能直接访问数据，只能与Buffer进行交互。

选择器(Selector)：多路复用器，Selector 可以同时监控多个 SelectableChannel 的 IO 状况 (轮询式地获取选择器上已经"准备就绪"的事件) ，利用 Selector可使一个单独的线程管理多个 Channel。

