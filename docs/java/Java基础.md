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

#### 3.1 Sychronized 和 Lock

1. Sychronized：非公平，悲观，独享，互斥，可重入的重量级

2. Lock
   ReentrantLock：可公平，悲观，独享，互斥，可重入，重量级锁。

 ReentrantReadWriteLock：可公平，悲观，写独享，读共享，读写，可重入，重量级锁。

**Sychronized 和 ReentrantLock 的区别**

1. synchronized是关键字，Lock是Api
2. synchronized自动释放锁，Lock手动释放
3. synchronized不可以中断，ReentrantLock可中断(调用interrupt方法)
4. synchronized非公平锁，Lock两者皆可
5. synchronized只能随机或全部唤醒，Lock可以使用Condition精确唤醒

#### 3.2 锁分类

##### 3.2.1 按性质分类

公平锁：多个线程按照申请锁的顺序来获取锁。
非公平锁：多个线程获取锁的顺序并不是按照申请锁的顺序。

乐观锁：采用尝试更新，不断重新的方式更新数据。
悲观锁：对于同一个数据的并发操作，悲观锁采取加锁的形式。

独享锁：该锁一次只能被一个线程所持有。
共享锁：该锁可被多个线程所持有。

互斥锁：写锁。
读写锁：读锁。

可重入锁：同一个线程在外层方法获取锁的时候，在进入内层加锁方法会自动获取锁。

##### 3.2.2 按照设计分类

自旋锁：采用循环的方式去尝试获取锁。
自适应自旋锁：循环多次发现等待时间过长，切换为阻塞状态。

锁粗化：如一个方法内加了多个锁，JVM认为没必要，于是将其合并为一个锁。
锁消除：JVM认为有些代码块无需加锁，于是删除了那个锁。

偏向锁：一段同步代码一直被一个线程访问，该线程会自动获得锁。
轻量级锁：当锁是偏向锁的时候，被另外线程访问，其它线程会通过自旋的形式尝试获取锁。
重量级锁：当锁是轻量级锁的时候，另一个线程自旋到一定次数未得到锁则进入阻塞。

分段锁：将数据分为多段，每次只给一段加锁。

#### 3. LockSupport

概念：线程的等待唤醒机制（wait / notify）

三种让线程等待唤醒的方法

1. 使用Object中的wait()方法让线程等待，使用Object中的notify()方法唤醒线程
2. 使用JUC包中Condition的await()方法让线程等待，使用signal()方法唤醒线程
3. LockSupport类可以阻塞当前线程以及唤醒指定被阻塞的线程 pack() unpack()

