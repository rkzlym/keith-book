# Tomcat

## 请求流程图
Tomcat为什么慢，因为它在应用层，是Java开发跑在JVM上的，相当于在内核上又虚拟的一块内存出来，在CPU调内核的时候又切换成虚拟机的状态，所以性能低。

![在这里插入图片描述](https://img-blog.csdnimg.cn/202101161546587.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

