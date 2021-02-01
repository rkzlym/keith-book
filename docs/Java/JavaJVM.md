# Java JVM

## Class

### Java从编码到执行

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210111203500781.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### 混合模式

解释器：bytecode intepreter

JIT：Just In-Time compiler



混合使用解释器 + 热点代码编译

起始阶段采用解释执行

热点代码检测

- 多次被调用的方法（方法计数器：监测方法执行频率）
- 多次被调用的循环（循环计数器：监测循环执行频率）
- 进行编译



- -Xmixed 默认为混合模式 开始解释执行，启动速度较快，对热点代码实行检测和编译
- -Xint 使用编译模式，启动很快，执行稍慢
- -Xcomp 使用纯编译模式，执行很快，启动很慢

### Class类文件解释

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210111220329956.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### Class生命周期

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210111220751109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### ClassLoader

**类加载流程图：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200131191909464.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
**类加载器示意图：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210111220915818.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

**ClassLoader**：负责加载class文件（class文件在文件开头有特定文件标识）

**各个类加载器的作用**

BootStrapClassLoader 引导类加载器：加载JVM自身需要的类，使用C++实现，负责加载`%JAVA_HOME%/jre/lib.jar`核心类库。

ExtensionClassLoader 扩展类加载器：负责加载%JAVA_HOME%/lib/ext目录下的类。

AppClassLoader 系统类加载器：负责加载系统类路径`java -classpath`或`-D java.class.path` 指定路径下的类库。

CustomClassLoader 自定义类加载器：继承ClassLoader重写findClass方法

**双亲委派**：JVM收到类加载请求，他会自底向上地去缓存中找这个类，找到了返回，没找到就把这个请求委派给父加载器（不是继承）去寻找，直到BootstrapClassLoader也没找到时，会自顶向下加载这个class，如果到最后还没加载成功，则会抛出异常 `ClassNotFoundException`

作用：沙箱安全，不让自己定义的类去勿扰JDK出厂自带的类

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210111223139570.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## JVM 内存模型

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200131192106991.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

1. **程序计数器**：存放指令位置，虚拟机的运行就是循环取PC中的指令
2. **栈**：每个JVM都有自己私有的JVM栈，JVM栈用来存储栈帧
3. **本地方法栈**：存放native方法的地方。
4. **堆**：所有线程共享，存放对象实例，几乎所有的对象实例以及数组都在这里分配内存。
5. **方法区**：存储class二进制文件、类信息、常量、静态变量、运行时常量池
6. **直接内存**：JVM可以直接访问的内核空间的内存。

**图示：线程的共享区和私有区**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210119205519997.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)



## Stack

栈：每个JVM都有自己私有的JVM栈，JVM栈用来存储Frame

Frame：每个方法对应一个 Frame

Frame 存放：Local Variable Table, Operated Stack, Dynamic Linking, Return Address

Local Variable Table：byte、short、int、long、float、double、boolean、char、reference

Dynamic Linking：A方法调用B方法，这个过程就叫动态链接

Return Address：A方法调用B方法，B方法返回值的存放地址

案例：输出结果为8

```java
// 将8压入操作数栈，再将8拿出来赋值给i
int i = 8;
// 将8压入操作数栈，i加1，从操作数栈中弹出8赋值给i
i = i++;
// 输出最终结果 8
System.out.println(i);
```

## Heap 

### 堆的基本概念

主要存放Java在运行过程中new出来的对象，凡是通过new生成的对象都存放在堆中，对于堆中的对象生命周期的管理由Java虚拟机的垃圾回收机制GC进行回收和统一管理，类的非静态成员变量存放在堆区，其中基本数据类型是直接保存值，而复杂类型是保存指向对象的引用一个JVM实例只存在一个堆内存，堆是所有线程共享的，而且堆内存大小是可以调节的。

```java
// 左边存放在栈中，右边存放在堆中
Person person = new Person("张三", 22);
```

### JVM 内存分代模型

> 除了 Epsilon ZGC Shenandoah 之外的GC都是使用逻辑分代模型
>
> G1是逻辑分代，物理不分代
>
> 除上述 GC 模型之外不仅是逻辑分代，而且是物理分代

新生代 = Eden区 + 2 个 Suvivor区

1. YGC 回收之后，大多数对象被回收，活着的进入S0
2. 再次 YGC ，活着的对象 Eden + S0 -> S1
3. 再次 YGC， Eden + S1 -> S0
4. 年龄足够进入老年代
5. 分配担保：Suvivor区装不下直接进入老年代 

老年代：

1. 老年代满了就Full GC

永久代（1.7）/ 元空间（1.8）

1. 永久代 元空间 - Class
2. 永久代必须指定大小限制，元空间可以设置，也可以不设置，上限取决于物理内存
3. 字符串常量 1.7 - 永久代，1.8 - 堆
4. 永久代和元空间都是方法区的实现

图示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200131193503949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## 实例化对象分配

1. 栈上分配

   线程私有小对象、无逃逸、支持标量替换

2. 线程本地分配 TLAB （Thread Local Alllocation Buffer）

   默认占用Eden的1%、多线程的时候不用竞争Eden就可以申请空间，提升效率、小对象

3. 老年代：大对象

## GC

### GC概述

GC是什么（分代收集算法）

- 频繁收集Young区
- 较少收集Old区
- 基本不动元空间

普通GC(Minor GC):只针对新生代区域的GC，指发生在新生代的垃圾收集动作，因为大部分Java对象存活率不高，所以Minor GC非常频繁，一般回收速度也比较快。

全局GC(Major GC / Full GC)：指发生在老年代的垃圾收集动作，出现了Major GC，经常会伴随至少一次的Minor GC，Major GC的速度一般要比Minor GC慢10倍以上。

### 如何定位垃圾

**引用计数法**

没有被引用的内存空间就是垃圾，需要被收集
缺点：计数器本身有消耗，较难处理循环引用

**根可达性分析算法**

通过一系列的名为“GC Root”的对象作为起点，从这些节点向下搜索，搜索所走过的路径称为引用链(Reference Chain)，当一个对象到GC Root没有任何引用链相连时，则该对象不可达，该对象是不可使用的，垃圾收集器将回收其所占的内存。

Java 可以做GC Root的对象：局部变量表、类静态属性引用的对象、常量引用的对象、Native方法引用的对象。

### 常用的垃圾回收算法

1. 复制算法（Copying）：没有碎片，浪费空间

   YGC用的是复制算法，复制算法的基本思想是将内存分为两块，每次只用其中一块，当一块内存用完，就将还活着的对象复制到另一块上面，复制算法不会产生内存碎片。
   原理：从根集合（GC Root）开始，通过Tracing从From中找到存活对象，拷贝到To中。From和To交换身份，下次内存分配从To开始
   缺点：浪费了一半内存

2. 标记清除（Mark-Sweep）：位置不连续，产生碎片，效率偏低（两遍扫描）

   老年代一般由标记清除和标记整理混合实现

   原理：算法分成标记和清除两个阶段。先标记出要回收的对象，然后统一回收这些对象。

   解释：程序运行期间，可用内存将被耗尽的时候,GC线程就会被触发并将程序暂停，随后将要回收的对象标记一遍，最终统一回收这些对象。

   缺点：两次扫描，耗时严重，会产生内存碎片（清理出来的内存是不连续的）

3. 标记清除压缩（Mark-Compact）：没有碎片，效率偏低（两遍扫描，指针需要调整）

   即标记清除整理
   第一步：标记清除
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117210457686.png)
   第二步：压缩
   再次扫描，并往一端滑动存活对象
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117210521309.png)
   优势：没有碎片
   劣势：需要移动对象的成本

### 垃圾回收器

- 串行回收：单线程，会暂停所有的用户线程，Serial + Serial Old

- 并行回收：多线程，会暂停所有的用户线程，Parallel Scavenge + Parallel Old（JDK8默认）

- 并发标记清除：用户线程和垃圾收集线程同时执行（并行或交替），ParNew + CMS

  - CMS四个阶段：初始标记，并发标记，重新标记，并发清除

  - CSM的问题：会产生碎片，有浮动垃圾，当老年代碎片过多，换Serial Old上场

  - CMS问题解决方案之一：降低触发CMS的阈值

    ```shell
    -XX:CMSInitiatingOccupancyFraction 70% # 内存空间降低到70%再进行回收
    ```

- G1：将堆内存分割成不同的区域并发的对其进行垃圾回收，只在逻辑上分年轻代老年代

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021011714275194.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### 引用

- 强引用：OOM也不回收
- 软引用：内存不足时回收
- 弱引用：只要执行GC就被回收
- 虚引用：跟没引用一样，可以用来管理堆外内存（直接内存），当对象被回收时，通过Queue可以检测到，然后清理堆外内存。堆外内存如何回收 -- Unsafe.freeMemory(address)

## JVM调优

### 基本概念

吞吐量：用户代码时间 / ( 用户代码执行时间 + 垃圾回收时间 )

响应时间：STW越短，响应时间越好

### JVM调优指令

```shell
# 查看所有指令
java -X
java -XX:+PrintFlagsFinal -version
# 模糊查询指令
java -XX:+PrintFlagsFinal -version | grep Command 
```

常用指令

```shell
-Xms<size>        					# 设置初始 Java 堆大小
-Xmx<size>        					# 设置最大 Java 堆大小
-Xss<size>        					# 设置 Java 线程堆栈大小
-XX:+PrintCommandLineFlags -version	# 查看当前使用的垃圾回收器
-XX: MetaspaceSize=128m				# 修改元空间大小
-XX: MaxTenuringThreshold=15		# 修改老年代的大小
```
```shell
jinfo <pid>		# 打印虚拟机详细信息
jstat -gc <pid> <time>	# 打印gc信息，每<time>毫秒打印一次
jconsole	# java控制面板
```

### JVM调优场景

**系统CPU经常100%，如何调优**

CPU 100% 一定有线程在占用系统资源

1. 找出哪个进程的 CPU 高（top）
2. 该进程的哪个线程 CPU 高（top - Hp [pid]）
3. 导出该线程的堆栈（jstack）
4. 查找哪个方法（栈帧）消耗时间 （jstack）
5. 工作线程占比高 | 垃圾回收线程占比高

```shell
# 查看Linux中哪个进程占资源
top
# 只列出java的进程
jps
# 查看这个<pid>的进程中哪个线程占资源
top -Hp <pid>
# 查看这个<pid>的线程堆栈
jstack <pid>
# 导出堆内存
jamp -heap <pid>
```

**如何监控JVM**

jstat

```shell
# 格式模板
jstat -<option> [-t] [-h<lines>] <vmid> [<interval> [<count>]]

# 常见用法
jstack <pid>
# 类加载统计
jstat -class 19570
# 编译统计
jstat -compiler 19570

### 观察信息
# 死锁
Found one java-level deadlock
# 锁时间过长
很多线程都在 waiting on <0x00000000eda673f0> 等待锁的释放
要找到 <0x00000000eda673f0> 这把锁被哪个线程持有
举例说明：一个程序有10个线程，第一个线程持有锁后死循环，其它线程全部WAITING，只有第一个线程是RUNNABLE
```

jconsole jvisualvm

**执行GC之后内存占用依然很高**

使用jvisualvm打开GUI面板，监视 -> 堆 Dump，截取一个内存快照。

检查 -> 查找前20个最大的对象，可以检查到哪几个对象占用了大量的内存。

**JMX不建议在生产环境使用**

JMX一般是在测试环境使用，因为 JMX 会 patch 到 JVM 上而且占用了很大的性能。

如何在线上系统观察 可以使用 jmap 命令找到占用内存较大的类

```shell
jmap -histo 21853 | head -20
```

但是对于内存特别大的系统，jmap执行期间会对进程产生很大影响，甚至卡顿

解决方案1：设定以下参数，OOM的时候会自动生成堆转储文件

```shell
-XX:+HeapDumpOnOutOfMemoryError
```

解决方案2：有服务器备份（高可用），停掉这台服务器对其它服务器不影响

## 附录

JVM一个线程的成本：1MB

线程多了调度成本就高了，造成了CPU的浪费

class被load到内存之后，class的二进制文件加载到内存里，与此同时生成了class类的对象，该对象指向了二进制文件。class对象存在metaspace