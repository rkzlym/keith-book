# Java 集合

## List

| 名称       | 特点                 | get(index) | add(E) | add(index, E) | remove(E) |
| ---------- | -------------------- | ---------- | ------ | ------------- | --------- |
| ArrayList  | 高效，线程不安全     | O(1)       | O(1)   | O(n)          | O(n)      |
| LinkedList | 删除更高效，查询低效 | O(n)       | O(1)   | O(n)          | O(1)      |
| Vector     | 低效，线程安全       | O(1)       | O(1)   | O(n)          | O(n)      |

### ArrayList

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

## Set

| 名称          | 特点                         | add(E)   | remove(E) | contains(E) |
| ------------- | ---------------------------- | -------- | --------- | ----------- |
| HashSet       | 线程不安全，可存储null值     | O(1)     | O(1)      | O(1)        |
| LinkedHashSet | 查询时有序 (存储还是无序)    | O(log n) | O(log n)  | O(log n)    |
| TreeSet       | 可根据指定值排序(基于红黑树) | O(1)     | O(1)      | O(1)        |

### HashSet

1. 底层是Map，初始大小为16
2. 添加过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200209154216578.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## Map

| 名称          | 特点                                  | get(key)      | put(key) |
| ------------- | ------------------------------------- | ------------- | -------- |
| HashMap       | 线程不安全，高效                      | O(1)~O(log n) | O(1)     |
| LinkedHashMap | 查询时有序 (存储还是无序)             | O(1)~O(log n) | O(1)     |
| TreeMap       | 可根据指定值排序(取决于Compare返回值) | O(log n)      | O(1)     |
| Hashtable     | 线程安全，低效                        | O(1)~O(log n) | O(1)     |
| Properties    | 键值对都是String类型                  | O(1)~O(log n) | O(1)     |

### HashMap

1. 底层：数组 + 链表 + 红黑树
2. 首次添加操作创建数组，长度16，存的是<font color=red>一维数组Entry[]</font>
3. 扩容：超过临界值(Capacity * Load Factory)，则扩容为原来2倍，并将元数据复制过来
4. 添加过程
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200209154206861.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## 集合类线程不安全

> 异常：ConcurrentModificationException
>
> 原因：一个线程正在修改，另一个线程来争夺，导致数据不一致异常。

**同步容器**：Vector、HashTable、Collections.sychronized()生成

**并发容器**：ConcurrentHashMap**、**CopyOnWriteArrayList、CopyOnWriteArraySet

ConcurrentSkipListMap、ConcurrentSkipListSet、ConcurrentLinkedQueue、LinkedBlockingQueue、

ArrayBlockingQueue、PriorityBlockingQueue

**CopyOnWriteArrayList 源码解析**：写时加锁，复制一个新的数组，把新数组指向原来的数组

## 阻塞队列

当阻塞队列为空时，从队列里获取元素的操作将会被阻塞

当阻塞对位为满时，从队列里添加元素的操作将会被阻塞

消息中间件MQ的核心底层原理：阻塞队列

**阻塞队列Api**

![image-20200128185633832](E:\Workspace\VsCode\keith-book\docs\java\Java基础.assets\阻塞队列Api.png)

**常用的阻塞队列**

ArrayBlockingQueue：由数组结构组成的有界阻塞队列。

LinkedBlockingQueue：由链表组成的有界（大小默认值为Integer.MAX_VALUE）阻塞队列。

SynchroousQueue：不存储元素的阻塞队列，即单个元素阻塞队列。