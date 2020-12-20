# Java基础

## 基础

### 1. String

String中的intern()方法

如果字符串常量池中已经包含一个等于此String对象的字符串，则返回代表池中这个字符串的String对象的引用，否则会将此String对象包含的字符串添加到常量池中，并且返回此String对象的引用。

例题：

```java
String str1 = new StringBuilder("Hello").append("World").toString();
System.out.println(str1 == str1.intern());      // true
String str2 = new StringBuilder("ja").append("va").toString();
System.out.println(str2 == str2.intern());      // false
```

解释：有一个JDK自带的初始化的字符串"java"在加载sun.misc.Version这个类的时候进入了常量池

### 2. 集合

#### 2.1 List

| 名称       | 特点                 | get(index) | add(E) | add(index, E) | remove(E) |
| ---------- | -------------------- | ---------- | ------ | ------------- | --------- |
| ArrayList  | 高效，线程不安全     | O(1)       | O(1)   | O(n)          | O(n)      |
| LinkedList | 删除更高效，查询低效 | O(n)       | O(1)   | O(n)          | O(1)      |
| Vector     | 低效，线程安全       | O(1)       | O(1)   | O(n)          | O(n)      |

**ArrayList**

1. 底层是<font color=red>数组</font>
2. 默认装<font color=red>Object</font>
3. 初始为<font color=red>10</font>，(Jdk8之后默认添加数据的时候才开始给默认长度)。
4. 每次扩容是<font color=red>原长度的一半（取整）</font>：第一次扩到15，第二次22
5. 扩容方式：Arrays.copyOf，默认把原数组复制到新数组
6. 不是线程安全的
7. 手写一个Demo证明ArrayList是线程不安全的

```java
public static void main(String[] args) {
    List<String> list = new ArrayList<>();
    for(int i = 0; i < 30; i++){
        new Thread(() -> {
            list.add(UUID.randomUUID().toString().substring(0, 8));
            System.out.println(list);
        }, String.valueOf(i)).start();
    }
}
```

#### 2.2 Set

| 名称          | 特点                         | add(E)   | remove(E) | contains(E) |
| ------------- | ---------------------------- | -------- | --------- | ----------- |
| HashSet       | 线程不安全，可存储null值     | O(1)     | O(1)      | O(1)        |
| LinkedHashSet | 查询时有序 (存储还是无序)    | O(log n) | O(log n)  | O(log n)    |
| TreeSet       | 可根据指定值排序(基于红黑树) | O(1)     | O(1)      | O(1)        |

**HashSet**

1. 底层是Map，初始大小为16
2. 添加过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200209154216578.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

#### 2.3 Map

| 名称          | 特点                                  | get(key)      | put(key) |
| ------------- | ------------------------------------- | ------------- | -------- |
| HashMap       | 线程不安全，高效                      | O(1)~O(log n) | O(1)     |
| LinkedHashMap | 查询时有序 (存储还是无序)             | O(1)~O(log n) | O(1)     |
| TreeMap       | 可根据指定值排序(取决于Compare返回值) | O(log n)      | O(1)     |
| Hashtable     | 线程安全，低效                        | O(1)~O(log n) | O(1)     |
| Properties    | 键值对都是String类型                  | O(1)~O(log n) | O(1)     |

**HashMap**

1. 底层：数组 + 链表 + 红黑树
2. 首次添加操作创建数组，长度16，存的是<font color=red>一维数组Entry[]</font>
3. 扩容：超过临界值(Capacity * Load Factory)，则扩容为原来2倍，并将元数据复制过来
4. 添加过程
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200209154206861.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

#### 2.4 集合类线程不安全解决

> 异常：ConcurrentModificationException
>
> 原因：一个线程正在修改，另一个线程来争夺，导致数据不一致异常。

**同步容器**：Vector、HashTable、Collections.sychronized()生成

**并发容器**：ConcurrentHashMap**、**CopyOnWriteArrayList、CopyOnWriteArraySet

ConcurrentSkipListMap、ConcurrentSkipListSet、ConcurrentLinkedQueue、LinkedBlockingQueue、

ArrayBlockingQueue、PriorityBlockingQueue

**CopyOnWriteArrayList 源码解析**：写时加锁，复制一个新的数组，把新数组指向原来的数组

#### 2.5 阻塞队列

当阻塞队列为空时，从队列里获取元素的操作将会被阻塞

当阻塞对位为满时，从队列里添加元素的操作将会被阻塞

消息中间件MQ的核心底层原理：阻塞队列

**阻塞队列Api**

![image-20200128185633832](E:\Workspace\VsCode\keith-book\docs\java\Java基础.assets\阻塞队列Api.png)

**常用的阻塞队列**

ArrayBlockingQueue：由数组结构组成的有界阻塞队列。

LinkedBlockingQueue：由链表组成的有界（大小默认值为Integer.MAX_VALUE）阻塞队列。

SynchroousQueue：不存储元素的阻塞队列，即单个元素阻塞队列。

#### 2.6 IO / NIO / AIO / Netty

BIO：同步阻塞，等待读写命令时，线程一直处于等待状态

NIO：同步非阻塞，等待读写命令时，线程可以去做别的事，使用selector轮询，遇到感兴趣的就处理(ACCEPT)

AIO：异步非阻塞，临时写好处理方法，当客户端连上来时自动调用此方法

Netty：基于NIO的封装

缓冲区(Buffer)：就像一个数组，可以保存多个相同类型的数据，主要用于与 NIO 通道进行交互，数据是从通道读入缓冲区，从缓冲区写入通道中的。

通道(Channel)：表示 IO 源与目标打开的连接，本身不能直接访问数据，只能与Buffer进行交互。

选择器(Selector)：多路复用器，Selector 可以同时监控多个 SelectableChannel 的 IO 状况 (轮询式地获取选择器上已经"准备就绪"的事件) ，利用 Selector可使一个单独的线程管理多个 Channel。

#### 2.7 同步、异步、阻塞、非阻塞

同步异步关注的是消息通信机制

例子：小明烧水有两步，开火，倒水。同步表示两步都需要小明做，异步表示不需要。

阻塞非阻塞关注的是等待消息时的状态

例子：阻塞表示小明烧水时需要等待水烧开，非阻塞表示小明在烧水时可以做别的事。

**同步阻塞**：开火，等待（同步），不等水开不做任何事（阻塞）

**同步非阻塞**：开火，等待（同步），去看电视（非阻塞），水开之后处理

**异步非阻塞**：开火，去看电视（非阻塞），水开了之后事先写好程序自动处理（异步）

**阻塞和非阻塞**

- 阻塞式：当一个线程调用 read() 或 write()时，该线程被阻塞，直到有数据被读取或写入，该线程在此期间不
  能执行其他任务。因此，在完成网络通信进行 IO 操作时，由于线程会阻塞，<font color=blue>服务器端必须为每个客户端都提供一个独立的线程进行处理</font>，当服务器端需要处理大量客户端时，性能急剧下降。
- 非阻塞式：当线程从某通道进行读写数据时，若没有数据可用时，该线程可以进行其他任务。线程通常将非阻塞 IO 的空闲时间用于在其他通道上执行 IO 操作，所以单独的线程可以管理多个输入和输出通道。因此，NIO <font color=blue>可以让服务器端使用一个线程来同时处理连接到服务器端的多个客户端</font>。

#### 2.8 对象的深浅拷贝

浅拷贝：只复制一个对象，对象内部存在的指向其他对象数组或者引用则不复制

深拷贝：对象，对象内部的引用均复制

> clone方法执行的是浅拷贝，如要实现深拷贝，对象内部的引用对象需重写clone方法

### 3. IO流

#### 3.1 流的分类

按操作数据单位不同分为：字节流(8 bit)，字符流(16 bit)
按数据流的流向不同分为：输入流，输出流
按流的角色的不同分为：节点流，处理流
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020020116265641.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
IO流体系
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200201162728374.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

#### 3.2 流的操作

##### 3.2.1 操作步骤

1. File类的实例化
2. 流的实例化
3. 读写的操作
4. 资源的关闭

##### 3.2.2 字符流操作文件(文本文件)

1. 读文件

```java
public void readFile(){
    // 实例化File类对象，指明要操作的文件
    File file = new File("src/main/resources/file/1.txt");
    FileReader fr = null;
    try {
        // 提供具体的流
        fr = new FileReader(file);
        // 每次读1024个字符
        char[] cbuf = new char[1024];
        int len;
        // read(char[] cbuf) 返回每次读入cbuf数组中字符的个数，如果到达文件末尾，返回-1
        while ((len = fr.read(cbuf)) != -1){
            for (int i = 0; i < len; i++) {
                System.out.print(cbuf[i]);
            }
        }
        fr.read(cbuf);
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (fr != null)
                fr.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

2. 写文件

```java
public void writeFile() {
    File file = new File("src/main/resources/file/3.txt");
    FileWriter fw = null;
    try {
        // 参数2表示是否对原有文件追加
        fw = new FileWriter(file, false);
        fw.write("Hello World 张三");
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (fw != null)
                fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

3. 先读后写 -- 复制文件

```java
public void copyFile() {
    File srcFile = new File("src/main/resources/file/3.txt");
    File dstFile = new File("src/main/resources/file/4.txt");
    FileReader fr = null;
    FileWriter fw = null;
    try {
        fr = new FileReader(srcFile);
        fw = new FileWriter(dstFile, false);
        char[] cbuf = new char[1024];
        int len;
        while ((len = fr.read(cbuf)) != -1){
            fw.write(cbuf, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (fr != null)
                fr.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            if (fw != null)
                fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### 3.2.3 字节流操作文件(图片、视频等)

复制图片

```java
public void copyFile(){
    File srcFile = new File("src/main/resources/img/1.jpg");
    File dstFile = new File("src/main/resources/img/2.jpg");
    FileInputStream fis = null;
    FileOutputStream fos = null;
    try {
        fis = new FileInputStream(srcFile);
        fos = new FileOutputStream(dstFile);
        byte[] buf = new byte[1024];
        int len;
        while ((len = fis.read(buf)) != -1){
            fos.write(buf, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (fis != null)
                fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            if (fos != null)
                fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### 3.2.4 缓冲流的使用

作用：提升流的读取、写入速度。
复制图片文件

```java
public void copyImgFile(){
    File srcFile = new File("src/main/resources/img/1.jpg");
    File dstFile = new File("src/main/resources/img/2.jpg");
    BufferedInputStream bis = null;
    BufferedOutputStream bos = null;
    try {
        // 创建节点流
        FileInputStream fis = new FileInputStream(srcFile);
        FileOutputStream fos = new FileOutputStream(dstFile);
        // 创建缓冲流
        bis = new BufferedInputStream(fis);
        bos = new BufferedOutputStream(fos);
        // 读取写入
        byte[] buf = new byte[1024];
        int len;
        while ((len = bis.read(buf)) != -1){
            bos.write(buf, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        // 资源关闭，关闭外层流的同时，内层流也会自动关闭
        try {
            if (bis != null)
                bis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            if (bos != null)
                bos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

复制文本文件

```java
public void copyTxtFile(){
    File srcFile = new File("src/main/resources/file/1.txt");
    File dstFile = new File("src/main/resources/file/5.txt");
    BufferedReader br = null;
    BufferedWriter bw = null;
    try {
        FileReader fr = new FileReader(srcFile);
        FileWriter fw = new FileWriter(dstFile);
        br = new BufferedReader(fr);
        bw = new BufferedWriter(fw);
        char[] cbuf = new char[1024];
        int len;
        while ((len = br.read(cbuf)) != -1){
            bw.write(cbuf, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (br != null)
                br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            if (bw != null)
                bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## JVM

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

## 多线程

### 1. 线程的创建方式

1. 继承Thead类

```java
class MyThread extends Thread{
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + "\t 运行了...");
    }
}
// main
MyThread t = new MyThread();
t.start();
```

2. 实现Runnable接口

普通写法

```java
class MyThread implements Runnable{
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + "\t 运行了...");
    }
}
// main
MyThread t = new MyThread();
new Thread(t).start();
```

lambda写法

```java
new Thread(() -> {
	System.out.println(Thread.currentThread().getName() + "\t 运行了...");
}).start();
```

3. 实现Callable接口：可以抛出异常，支持泛型的返回值

```java
class MyThread implements Callable<Integer>{
    @Override
    public Integer call() throws Exception {
        System.out.println(Thread.currentThread().getName() + "\t 运行了...");
        Integer sum = 0;
        for (int i = 0; i < 100; i++) {
            if(i % 2 == 0){
                sum += i;
            }
        }
        return sum;
    }
}
// main
MyThread t = new MyThread();
FutureTask<Integer> futureTask = new FutureTask<>(t);
new Thread(futureTask).start();
Integer sum = futureTask.get();
System.out.println("总和为:" + sum);
```

4. 使用线程池

```java
// newScheduledThreadPool 创建固定大小的线程池，可以延迟或定时执行任务
ScheduledExecutorService pool = Executors.newScheduledThreadPool(5);
ScheduledFuture<Integer> result = pool.schedule(() -> {
    int num = new Random().nextInt(100);
    System.out.println(Thread.currentThread().getName() + "\t" + num);
    return num;
}, 100, TimeUnit.MILLISECONDS);
System.out.println(result.get());
pool.shutdown();
```

### 2. 线程池

#### 2.1 有哪几种线程池

- newFixedThreadPool（固定大小的线程池）
- newSingleThreadExecutor（单线程线程池）
- newCachedThreadPool（可缓存线程的线程池）用于并发执行大量短期的小任务。
- newScheduledThreadPool：用于需要多个后台线程执行周期任务，同时需要限制线程数量的场景。

#### 2.2 线程池的七大参数

1. corePoolSize: 线程池中的常驻核心线程数。
2. maximumPoolSize: 线程池能够容纳同时执行的最大线程数，此值必须大于等于1。
3. keepAliveTime: 多余的空闲线程存活时间。
4. unit: keepAliveTime的单位。
5. workQueue: 任务队列，被提交但尚未被执行的任务，一般使用阻塞队列。
6. threadFactory: 表示生成线程池中工作线程的线程工厂，用于创建线程，一般默认即可。
7. handler: 拒绝策略，表示当队列满了并且工作线程大于等于线程的最大线程数时如何来拒绝请求执行的runnable策略。

#### 2.3 线程池底层工作原理

- 在创建了线程池后，等待提交过来的任务请求
- 当调用execute()方法添加一个请求任务时，线程池会做如下判断
  - 如果正在运行的线程数量小于corePoolSize，那么马上创建线程运行任务
  - 如果正在运行的线程大于等于corePoolSize，那么将这个任务<font color=red>放入队列</font>
  - 如果这时队列满了且正在运行的线程数量小于maximumPoolSize，那么要创建非核心线程立刻运行这个任务
  - 如果队列满了且正在运行的线程数大于等于maximumPoolSize，那么线程会启动饱和<font color=red>拒绝策略</font>来执行

- 当一个线程完成任务时，他会从队列中取下一个任务来执行
- 当一个线程无事可做超过keepAliveTime时，线程会判断：
  - 如果当线程数大于corePoolSize，那么这个线程就被停掉
  - 线程池的所有任务完成后<font color=red>最终会收缩到corePoreSize大小</font>

#### 2.4 拒绝策略

定义：等待队列和max线程数都满了，那么就需要启用拒绝策略处理这个问题。

- AbortPolicy(默认)：直接抛出RejectedExecutionException异常
- CallerRunsPolicy：既不会抛弃任务，也不会抛出异常，而是把某些任务回退给调用者
- DiscardOldestPolicy：抛弃队列中等待最久的任务，然后把当前任务加入队列中尝试再次提交当前任务
- DiscardPolicy：直接丢弃任务，不予任何处理也不抛出异常

#### 2.5 手写一个线程池

```java
ExecutorService pool = new ThreadPoolExecutor(
    2, 5, 1L, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>(3),
    Executors.defaultThreadFactory(), new ThreadPoolExecutor.CallerRunsPolicy());
try {
    for (int i = 0; i < 10; i++) {
        final int fi = i;
        pool.execute(() -> {
            System.out.println(Thread.currentThread().getName() + "\t" + fi);
        });
    }
} catch (Exception e) {
    e.printStackTrace();
} finally {
    pool.shutdown();
}
```

#### 2.6 如何合理配置线程池

- Cpu密集型(Cpu一直运行)：Cpu核数+1个线程的线程池
- IO密集型(需要不断取数据)：
  - IO密集型并不是一直在执行任务，配置尽可能多的线程，如Cpu核数 * 2
  - Cpu核数 / 1 - 阻塞系数(0.8~0.9)	例如8核Cpu：8 / (1 - 0.9) = 80个线程数

### 3. 锁

#### 3.2 各类锁

**公平锁**：每个线程获取锁时先查看此锁维护的等待队列，为空就占有锁，否则就加入等待队列。

**非公平锁**：直接尝试占有锁，若失败，再采用类似公平锁的方式。

**可重入锁（递归锁）**：在同一个线程的外层方法获取锁的时候，进入内层方法会自动获取锁。避免死锁。

**对象锁**：将sychronized放在普通同步方法中，sychronized同步监视器为普通对象

**全局锁**：将sychronized放在静态同步方法中，sychronized同步监视器为类对象

**自旋锁**：尝试获取锁的线程不会立即阻塞，而是采用循环的方式去尝试获取锁。

**自适应自旋锁**：循环多次发现等待时间过长，切换为阻塞状态。

**独占锁**：该锁一次只能被一个线程所占有。

**共享锁**：该锁可以被多个线程锁持有。

**读写锁**：可以多人读，但只允许一人写。

**锁粗化**：如一个方法内加了多个锁，JVM认为没必要，于是将其合并为一个锁。

**锁消除**：JVM认为有些代码块无需加锁，于是删除了那个锁。

**偏向锁**：一段同步代码一直被一个线程访问，该线程会自动获得锁。

**轻量级锁**：当锁是偏向锁的时候，被另外线程访问，其它线程会通过自旋的形式尝试获取锁。

**重量级锁**：当锁是轻量级锁的时候，另一个线程自旋到一定次数未得到锁则进入阻塞。

**分段锁**：将数据分为多段，每次只给一段加锁。

**CountDownLatch**：被减少到零之后才放行，否则阻塞等待。

**CyclicBarrier**：先到的被阻塞，直到达到指定值时释放

**Semaphore**：多共享资源的互斥使用，并发线程数的控制。

**AQS (AbstractQueuedSynchronizer)**：基于先进先出的等待队列为实现锁和同步提供一个框架

#### 3.2 Sychronized 和 Lock

1. Sychronized：非公平，悲观，独享，互斥，可重入的重量级
2. Lock
   1. ReentrantLock：可公平，悲观，独享，互斥，可重入，重量级锁。
   2. ReentrantReadWriteLock：可公平，悲观，写独享，读共享，读写，可重入，重量级锁。

**Sychronized 和 ReentrantLock 的区别**

1. synchronized是关键字，Lock是Api
2. synchronized自动释放锁，Lock手动释放
3. synchronized不可以中断，ReentrantLock可中断(调用interrupt方法)
4. synchronized非公平锁，Lock两者皆可
5. synchronized只能随机或全部唤醒，Lock可以使用Condition精确唤醒

**Sychronized 和 ReentrantLock 的使用场景**

sychronized如果抢不到锁，就会一直等待

reentrantLock有tryLock机制，如果等待超时可以放弃等待

```java
if (lock.tryLock(3L, TimeUnit.SECONDS)){	// 3秒超时
    lock.lock();
    try{
        // 业务逻辑
    } finally {
        lock.unlock();
    }
} else {
    // 放弃等待后执行
}
```

#### 3.3 锁分类

##### 3.3.1 按性质分类

公平锁：多个线程按照申请锁的顺序来获取锁。
非公平锁：多个线程获取锁的顺序并不是按照申请锁的顺序。

乐观锁：采用尝试更新，不断重新的方式更新数据。
悲观锁：对于同一个数据的并发操作，悲观锁采取加锁的形式。

独享锁：该锁一次只能被一个线程所持有。
共享锁：该锁可被多个线程所持有。

互斥锁：写锁。
读写锁：读锁。

可重入锁：同一个线程在外层方法获取锁的时候，在进入内层加锁方法会自动获取锁。

##### 3.3.2 按照设计分类

自旋锁：采用循环的方式去尝试获取锁。
自适应自旋锁：循环多次发现等待时间过长，切换为阻塞状态。

锁粗化：如一个方法内加了多个锁，JVM认为没必要，于是将其合并为一个锁。
锁消除：JVM认为有些代码块无需加锁，于是删除了那个锁。

偏向锁：一段同步代码一直被一个线程访问，该线程会自动获得锁。
轻量级锁：当锁是偏向锁的时候，被另外线程访问，其它线程会通过自旋的形式尝试获取锁。
重量级锁：当锁是轻量级锁的时候，另一个线程自旋到一定次数未得到锁则进入阻塞。

分段锁：将数据分为多段，每次只给一段加锁。

#### 3.3 线程等待和唤醒

##### 3.3.1 Object: wait, notify

1. 都需要在同步代码块中执行(synchronized)

2. 先wait再notify，等待中的线程才会被唤醒，否则无法唤醒

##### 3.3.2 Condition: await, signal

1. 都需要在同步代码块中执行
2. 先await再signal，等待中的线程才会被唤醒，否则无法唤醒

##### 3.3.3 LockSupport: pack, unpack

线程阻塞工具类，可以让线程在任意位置阻塞，阻塞后也有对应的唤醒方法，底层调用Unsafe的native方法

线程阻塞需要消耗Permit，Permit最多存在1个

当调用park方法时

- 如果有凭证，直接消耗掉这个凭证然后正常退出
- 如果无凭证，就阻塞等待凭证可用

当调用unpark方法时

- 增加一个凭证，但凭证最多有1个

#### 3.4 AQS (AbstractQueuedSynchronizer)

概念：是用来构建锁或者其它同步组件的重量级基础框架及整个JUC体系的基石，通过内置的FIFO队列来完成资源获取线程的排队工作，并通过一个int类型变量表示持有锁的状态

同步器：ReentrantLock, CountDownLatch, Semaphore等

如果共享资源被占用，就需要一定的阻塞等待唤醒机制来保证锁的分配。这个机制主要用的是CLH队列的变体实现的，将暂时获取不到锁的线程加入到队列中，这个队列就是AQS的抽象表现。它将请求共享资源的线程封装成队列的节点（Node），通过CAS、自旋以及LockSupport.park()的方式，维护state变量的状态，使并发达到同步的控制效果。

AQS总结：state变量 + CLH变种的双端队列，Node中存放的是线程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201218203120948.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

非公平锁和公平锁的唯一区别：公平锁获取同步状态时多了一个限制条件 hasQueuedPredecessors，该方法是公平锁加锁时判断等待队列中是否存在有效节点的方法

源码说明

```java
final void lock() {
    if (compareAndSetState(0, 1))
        setExclusiveOwnerThread(Thread.currentThread());	// 第一个线程抢到锁
    else
        acquire(1);	// 第二个线程及后续线程抢占
}
```

```java
public final void acquire(int arg) {
    if (!tryAcquire(arg) &&		// 尝试抢占，抢占成功返回true不进入队列
        // acquireQueued 尝试获取锁，若不成功则用LockSupport.park阻塞，直到被唤醒
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))	
        selfInterrupt();
}
```

```java
private Node addWaiter(Node mode) {
    Node node = new Node(Thread.currentThread(), mode);
    // Try the fast path of enq; backup to full enq on failure
    Node pred = tail;
    // 第二次以后进入只需将Node加入队列末尾即可
    if (pred != null) {
        node.prev = pred;
        if (compareAndSetTail(pred, node)) {
            pred.next = node;
            return node;
        }
    }
    // 第一次进入队列会先初始化，即生成一个空的头节点
    enq(node);
    return node;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201218211732334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

#### 3.5 JMM (Java Memory Model)

**定义**：是一组规范，<font color=red>可见性、原子性、有序性</font>，定义了程序中各个变量的访问方式。

**解释**：线程创建时JVM会为其创建工作内存（线程私有），JMM规定所有变量存储在主内存（共享），但线程必须在工作内存中操作变量。具体流程：<font color=red>拷贝->操作->写回</font>。各个工作内存存储主内存变量的复印件，不同线程无法互相访问，线程间通信必须通过主内存。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201217232911616.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

**JMM关于同步的规定**：

1. 线程解锁前，必须把共享变量的值刷新回主内存。
2. 线程加锁前，必须读取主内存的最新值到工作内存。
3. 加锁解锁是同一把锁。

##### volatile

**作用**：保证可见性、禁止指令重排、但不保证原子性。

**原理**：volatile修饰的变量在进行写操作的时候会多出一个lock前缀的汇编指令，作用是：

- 将当前处理器缓存行的数据会写回到系统内存。
- 这个写回内存的操作会引起在其他CPU里缓存了该内存地址的数据无效。

##### CAS (Compare And Set)

**作用**：线程的期望值和物理内存真实值一样则修改，否则需要重新获得主物理内存的真实值，这个过程是<font color=red>原子</font>的。

**原理**：Unsafe、自旋锁、乐观锁

- Unsafe：基于Unsafe内部native方法可以直接操作内存。

- 自旋锁：循环判断工作内存与主内存的值是否相等，如相等则返回。

**缺点**：循环时间长开销大、只能保证一个共享变量的原子操作、ABA问题。

**为什么CAS要比synchronized快**

synchronized需要进行上下文切换，每一次线程进出Cpu就是一次上下文切换，而这一次切换大概需要3-5微秒，而Cpu执行一条执行大概只需要0.6纳秒，而CAS没有上下文切换的过程，那么效率就高。

