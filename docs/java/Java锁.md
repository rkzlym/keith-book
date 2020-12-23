# Java 锁

## 各类锁

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

## Sychronized 和 Lock

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

## 锁分类

### 按性质分类

公平锁：多个线程按照申请锁的顺序来获取锁。
非公平锁：多个线程获取锁的顺序并不是按照申请锁的顺序。

乐观锁：采用尝试更新，不断重新的方式更新数据。
悲观锁：对于同一个数据的并发操作，悲观锁采取加锁的形式。

独享锁：该锁一次只能被一个线程所持有。
共享锁：该锁可被多个线程所持有。

互斥锁：写锁。
读写锁：读锁。

可重入锁：同一个线程在外层方法获取锁的时候，在进入内层加锁方法会自动获取锁。

### 按照设计分类

自旋锁：采用循环的方式去尝试获取锁。
自适应自旋锁：循环多次发现等待时间过长，切换为阻塞状态。

锁粗化：如一个方法内加了多个锁，JVM认为没必要，于是将其合并为一个锁。
锁消除：JVM认为有些代码块无需加锁，于是删除了那个锁。

偏向锁：一段同步代码一直被一个线程访问，该线程会自动获得锁。
轻量级锁：当锁是偏向锁的时候，被另外线程访问，其它线程会通过自旋的形式尝试获取锁。
重量级锁：当锁是轻量级锁的时候，另一个线程自旋到一定次数未得到锁则进入阻塞。

分段锁：将数据分为多段，每次只给一段加锁。

## 线程等待和唤醒

#### Object: wait, notify

1. 都需要在同步代码块中执行(synchronized)

2. 先wait再notify，等待中的线程才会被唤醒，否则无法唤醒

#### Condition: await, signal

1. 都需要在同步代码块中执行
2. 先await再signal，等待中的线程才会被唤醒，否则无法唤醒

#### LockSupport: pack, unpack

线程阻塞工具类，可以让线程在任意位置阻塞，阻塞后也有对应的唤醒方法，底层调用Unsafe的native方法

线程阻塞需要消耗Permit，Permit最多存在1个

当调用park方法时

- 如果有凭证，直接消耗掉这个凭证然后正常退出
- 如果无凭证，就阻塞等待凭证可用

当调用unpark方法时

- 增加一个凭证，但凭证最多有1个

## AQS (AbstractQueuedSynchronizer)

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