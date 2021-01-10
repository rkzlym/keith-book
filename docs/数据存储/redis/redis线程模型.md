# redis线程模型

> NIO异步单线程

## 为什么redis单线程还能支撑高并发

1. IO多路复用程序只负责监听所有的socket产生的请求，有人发过来请求就直接放入队列中。
2. 事件处理器是基于纯内存操作的。
3. 单线程反而避免了多线程频繁切换上下文问题。

## 客户端与redis的通信的一次流程

1. 在redis初始化的时候，redis会将连接应答处理器跟AE_READABLE事件关联起来，接着如果一个客户端与redis发起连接，此时会产生一个AE_READABLE事件，然后由<font color=blue>连接应答处理器</font>来处理与客户端的连接，创建客户端对应的socket，同时将这个socket的AE_READABLE事件跟<font color=blue>命令请求处理器</font>关联起来。
2. 当客户端想redis发起请求的时候，首先会在socket产生一个AE_READABLE事件，然后由<font color=blue>命令请求处理器</font>来处理，这个命令请求处理器就会从socket中读取请求相关数据，然后进行执行和处理。
3. 接着redis这边准备好了给客户端的相应数据之后，就会将socket的AE_WRITEABLE事件跟<font color=blue>命令回复处理器</font>关联起来，当客户端这边准备好读取相应数据时，就会在socket上产生一个AE_WRITEABLE事件，会由<font color=blue>命令回复处理器</font>来处理，就是准备好写入socket，供客户端来读取。
4. <font color=blue>命令回复处理器</font>写完之后，就会删除这个socket的AE_WRITEABLE事件和<font color=blue>命令回复处理器</font>的关联关系。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020121916394029.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## IO模型

> 一个客户端的连接就是一个文件描述符

### BIO

同步阻塞，等待读写命令时，线程一直处于等待状态，即每次连接占用一个线程。

BIO的弊端：由于是阻塞的，所以需要抛出许多线程来处理新进来的请求，比较浪费CPU资源，因为线程太多了。

流程：客户端连接进来，Socket建立了连接，服务器的线程监听了这个Socket，但是数据包还没到，所以是阻塞状态。所有当有新的客户端进来时需要开新的线程来处理。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021010922244029.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### NIO

同步非阻塞，等待读写命令时，线程可以去做别的事，使用selector轮询，遇到感兴趣的就处理(ACCEPT)

相对于BIO优势：CPU不用频繁的切换线程，节省了CPU性能

NIO的弊端：假设有1万个Clinet连接，只有一个Clinet返回了数据，但是需要遍历1万个客户端，即有大量CPU资源被浪费。

流程：可用一个线程处理所有客户端连接。客户端进来时不阻塞，把每个进来的客户端放入List中，对List中的客户端进行遍历，即问每一个客户端是否有数据，返回0，-1或者是具体的数据，不会阻塞。

一个线程就可以完成一个服务端对应多个客户端。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021010922294737.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### NIO多路复用

把1000个文件描述符传给select，内核因为线程调了select一次，所以把1000个文件描述符遍历一遍，返回几个文件描述符，这几个文件描述符去调读写数据的系统调用，需要自己完成数据写出，读入。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210109192025330.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### epoll（NIO）

上面的问题是传递数据的成本较高，粒度不够细

epoll可以在用户空间create epfd（epoll文件描述符），未来有一个连接进来就写给epoll文件描述符，epoll会准备一个共享空间mmap，mmap里维护了红黑树和链表，在mmap里的增删改是内核来完成的，查询两边都可以查。新进来的连接放入红黑树，用户空间调wait，等待事件，谁的数据到了就把这个节点往链表里放，wait从阻塞变为不阻塞取这个链表，把实际到达的这几个文件描述符取出到用户空间，然后用户空间再调读写方法。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210109192855527.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## 附录

redis在线程有顺序性

**Redis是二进制安全的**

客户端通过socket访问redis，redis拿到字节流

