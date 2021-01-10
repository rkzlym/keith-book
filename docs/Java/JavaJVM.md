# Java JVM

### 1. 类加载器(ClassLoader)

**类加载流程图：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200131191909464.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
**类加载器示意图：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200131191931880.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
**ClassLoader**：负责加载class文件（class文件在文件开头有特定文件标识）

**各个类加载器的作用**

引导类加载器：加载JVM自身需要的类，使用C++实现，负责加载`%JAVA_HOME%/jre/lib.jar`核心类库。
扩展类加载器：负责加载%JAVA_HOME%/lib/ext目录下的类。
系统类加载器：负责加载系统类路径`java -classpath`或`-D java.class.path` 指定路径下的类库。
自定义类加载器：Java.lang.ClassLoader的子类

**双亲委派**：当一个类收到了类加载请求，他首先不会自己去加载这个类，而是把这个请求委派给父类去完成，每一层请求类都是如此。只有当父类加载器反馈自己无法完成这个请求的时候，子类加载器才会尝试自己去加载。
作用：沙箱安全，不让自己定义的类去勿扰JDK出厂自带的类

### 2. JVM内存模型

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200131192106991.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

1. **Java虚拟机栈**：存放 局部变量表、操作数栈、动态链接、方法出口

   局部变量表：boolean、byte、char、short、int、float、long、double、reference

2. **堆**：存放对象实例，几乎所有的对象实例以及数组都在这里分配内存。

3. **方法区**：存储已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据

   运行时常量池：方法区的一部分，存放常量信息。

4. **程序计数器**：存放程序下一跳指令所在单元地址的地方。

5. **本地方法栈**：存放native方法的地方。

### 3. 栈（Stack）

1. 栈的概述 
   栈内存主管Java程序的运行，是在线程创建的时候创建，它的生命期是跟随线程的生命期，线程结束栈内存释放，生命周期和线程一致，是线程私有的。对于栈来说不存在垃圾回收问题。
   8种基本类型变量 、对象引用变量 、实例方法 都是在函数的栈内存中分配
2. Java方法 = 栈帧，主要保存3类数据
   1. 局部变量（Local Variables）：输入参数和输出参数及方法内的变量
   2. 栈操作（Operand Stack）：记录出栈、入栈的操作
   3. 栈帧数据（Frame Data）：包括类文件、方法等等

### 4. 堆（Heap）

一个JVM实例只存在一个堆内存，堆内存大小是可以调节的。
类加载器读取了类文件后，需要把类、方法、常变量放到堆内存中，保证所有引用类型的真实信息，以方便执行器执行。
堆内存逻辑上分为三部分：新生、养老、永久
伊甸区满了，开启YGC（Young GC），Eden基本全部清空
养老区满了，开启FGC（Full GC），若是FGC多次，发现养老区空间没法腾出来，就会报OOM（OutOfMemeryError）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200131193503949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
YGC的过程：复制 -> 清空 -> 互换

1. eden、SurvivorFrom复制到SurvivorTo，年龄+1
   首先，当Eden区满的时候会触发第一次GC，把还活着的拷贝到SurvivorFrom区，当Eden区再次触发GC的时候会扫描Eden区和From区，对这两个区域进行垃圾回收，经过这次回收后还存活着的对象直接复制到To区域（如果有对象的年龄已经达到了老年标准，则复制到老年代区），同时把这些对象年龄+1 
2. 清空eden、SurvivorFrom
   然后清空Eden和SurvivorFrom中的对象，也即复制后有交换，谁空谁是To
3. SurvivorFrom和SurvivorTo互换
   最后SurvivorFrom和SurvivorTo互换，原SurvivorTo成为下一次GC时SurvivorFrom区，部分对象会在From和To区域中复制来复制去，如此交换15次（由JVM参数的MaxTenuringThreshold决定，这个参数默认是15），最终如果还存活，就存入老年代。

经研究，不同对象的生命周期不同，98%的对象是临时对象。

实际而言，方法区和堆一样，是各个线程共享的内存区域，它用于存储虚拟机加载的类信息、普通常量、静态常量、编辑器编译后的代码等等。虽然JVM规范将方法区描述为堆的一个逻辑部分，但它却还有一个别名Non-Heap(非堆)，目的就是要和堆分开。永久代是方法区的一个实现。

永久区用于存放JDK自身所携带的Class，Interface的元数据，也就是说它存储的是运行环境必须的类信息，被装载进此区域的数据是不会被垃圾回收器回收掉的，关闭JVM才会释放此区域所用的内存。
内存调优参数

| 参数                | 说明                                  |
| ------------------- | ------------------------------------- |
| -Xms                | 设置初始值大小，默认为物理内存的 1/64 |
| -Xmx                | 最大分配内存，默认为物理内存的 1/4    |
| -XX:+PrintGCDetails | 输出详细的GC处理日志                  |

Java8以后元空间并不在虚拟机中，而是使用本机物理内存。

### 5. 栈、堆、方法区的关系

栈管运行，堆管存储
HotSpot是使用指针的方式来访问对象
Java堆中会存放访问类元数据的地址
reference存储的就直接是对象的地址
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200114211523636.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
代码解释：左边存在栈中。右边存在堆中

```java
Person person = new Person("张三", 22);
```

### 6. GC

#### 6.1 GC概述

GC是什么（分代收集算法）

- 频繁收集Young区
- 较少收集Old区
- 基本不动元空间

普通GC(Minor GC):只针对新生代区域的GC，指发生在新生代的垃圾收集动作，因为大部分Java对象存活率不高，所以Minor GC非常频繁，一般回收速度也比较快。
全局GC(Major GC / Full GC)：指发生在老年代的垃圾收集动作，出现了Major GC，经常会伴随至少一次的Minor GC，**Major GC的速度一般要比Minor GC慢10倍以上**。

#### 6.2 GC四大算法

1. 引用计数法（JVM一般不采用这种方式）
   没有被引用的内存空间就是垃圾，需要被收集
   缺点：计数器本身有消耗，较难处理循环引用
2. 复制算法（Copying）
   YGC用的是复制算法，复制算法的基本思想是将内存分为两块，每次只用其中一块，当一块内存用完，就将还活着的对象复制到另一块上面，复制算法不会产生内存碎片。
   原理：从根集合（GC Root）开始，通过Tracing从From中找到存活对象，拷贝到To中。From和To交换身份，下次内存分配从To开始
   缺点：浪费了一半内存
3. 标记清除（Mark-Sweep）
   老年代一般由标记清除和标记整理混合实现
   原理：算法分成标记和清除两个阶段。先标记出要回收的对象，然后统一回收这些对象。
   解释：程序运行期间，可用内存将被耗尽的时候,GC线程就会被触发并将程序暂停，随后将要回收的对象标记一遍，最终统一回收这些对象。
   缺点：两次扫描，耗时严重，会产生内存碎片（清理出来的内存是不连续的）
4. 标记压缩（Mark-Compact）
   即标记清除整理
   第一步：标记清除
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117210457686.png)
   第二步：压缩
   再次扫描，并往一端滑动存活对象
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117210521309.png)
   优势：没有碎片
   劣势：需要移动对象的成本

#### 6.3 GC Root

可达性分析算法：通过一系列的名为“GC Root”的对象作为起点，从这些节点向下搜索，搜索所走过的路径称为引用链(Reference Chain)，当一个对象到GC Root没有任何引用链相连时，则该对象不可达，该对象是不可使用的，垃圾收集器将回收其所占的内存。

**Java 可以做GC Root的对象**：局部变量表、类静态属性引用的对象、常量引用的对象、Native方法引用的对象。

#### 6.4 垃圾收集器

- Serial(串行回收) : 单线程，会暂停所有的用户线程
- Parallel(并行回收) : 多线程，会暂停所有的用户线程
- CMS(并发标记清除) : 用户线程和垃圾收集线程同时执行(并行或交替)，会产生碎片
- G1: 将堆内存分割成不同的区域并发的对其进行垃圾回收

**查看当前使用的垃圾回收器**

```powershell
java -XX:+PrintCommandLineFlags -version
```

**查看JMM系统默认值**

> -XX: +|- Attribute

```powershell
java -XX:+PrintCommandLineFlags -verison	# 查看初始参数
java -XX:+PrintFlagsInitial					# 查看初始默认值
java -XX: MetaspaceSize=128m				# 修改元空间大小
java -XX: MaxTenuringThreshold=15			# 修改养老区的大小
java -XX:+PrintFlagsFinal -version			# 主要查看修改更新, 有 := 表示修改之后的参数值

jinfo -flags 5988							# 查询5988进程的所有配置
java -XX:+PrintFlagsFinal -Xss128k T		# 运行Java命令的同时打印出参数,T:运行java类的名字
```

#### 6.5 引用

- 强引用：OOM也不回收
- 软引用：内存不足时回收
- 弱引用：只要执行GC就被回收
- 虚引用：跟没引用一样，作用是在对象回收前做操作

## 7. 附录

JVM一个线程的成本：1MB

线程多了调度成本就高了，造成了CPU的浪费

