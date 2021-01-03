# 数据结构

## 时间/空间复杂度

### 1. 时间复杂度

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216220144701.png)

常对幂指阶：常数级<对数级<幂数级<指数级<阶乘

结论1：顺序执行的代码只影响常数项，可以忽略

结论2：只需挑循环中的一个基本操作分析它的执行次数与n的关系即可

练习：计算时间复杂度

```java
void loveYou(int n){	// n为问题规模
    int i = 1;
    while(i <= n){
        i = i * 2;
        printf("I love you %d\n", i);
    }
}
```

设总循环的次数为x，则由循环条件可知，循环结束刚好满足2^x > n

x = log₂n + 1

T(n) = O(log₂n)

### 2. 空间复杂度

```java
// S(n) = O(1)
void test(){
    int i;
}
```

```java
// S(n) = O(n)
void test(int n){
	int arr[n];
    int i;
}
```

```java
// S(n) = O(n²)
void test(int n){
    int arr1[n][n];
	int arr2[n];
    int i;
}
```

递归调用空间复杂度：空间复杂度 = 递归调用的深度

## 线性/非线性结构

**线性结构**：元素之间存在一对一的线性关系，常见的有：数组、队列、链表、栈

线性结构有两种不同的存储结构：

- 顺序表：存储的元素是连续的

- 链表：存储元素不一定是连续的，元素节点中存放数据元素以及相邻元素的地址信息

**非线性结构**：二维数组，多维数组，广义表，树结构，图结构

## 单链表

```java
static class Node<E> {
    E element;
    Node<E> next;

    Node(E element, Node<E> next) {
        this.element = element;
        this.next = next;
    }

    @Override
    public String toString() {
        return element + "";
    }
}

static class LinkedList<E>{
    private Node<E> head;

    void add(E e){
        if (head == null){
            head = new Node<>(e, null);
            return;
        }
        Node<E> tmp = head;
        while (tmp.next != null) {
            tmp = tmp.next;
        }
        tmp.next = new Node<>(e, null);
    }

    void add(int index, E e){
        if (index <= 0){
            Node<E> tmp = head;
            head = new Node<>(e, tmp);
        } else {
            Node<E> next = node(index);
            Node<E> prev = node(index - 1);
            prev.next = new Node<>(e, next);
        }
    }

    void remove(int index){
        if (index <= 0){
            head = head.next;
        } else {
            Node<E> prev = node(index - 1);
            prev.next = node(index + 1);
        }
    }

    Node<E> node(int index) {
        if (index < 0)
            index = 0;
        Node<E> tmp = head;
        for (int i = 0; i < index; i++){
            if (tmp == null)
                break;
            tmp = tmp.next;
        }
        return tmp;
    }

    void showAll(){
        Node<E> tmp = head;
        while (tmp != null){
            System.out.print((tmp) + "\t");
            tmp = tmp.next;
        }
    }
}

public static void main(String[] args) {
    LinkedList<Object> list = new LinkedList<>();
    list.add("aaa");
    list.add("bbb");
    list.add("ccc");
    list.add(0, "ddd");
    list.add(1, "eee");
    list.remove(1);
    list.showAll();
}
```

## 环形链表

约瑟夫问题：N个人围成一圈，从第一个开始报数，第M个将被出圈，最后剩下一个

例如N=6，M=5，出圈的顺序是：5，4，6，2，3

```java
public class SingleCircleLinkedListDemo {
    static class Node{
        int no;
        Node next;
        public Node(int no){
            this.no = no;
        }
    }

    static class LinkedList{
        int size;
        Node first;

        public void init(int num){
            if (num < 1)
               throw new UnsupportedOperationException("num must greater then 0");
            this.size = num;
            // create circle linked list
            Node curr = null;
            for (int i = 1; i <= num; i++){
                Node node = new Node(i);
                if (i == 1){
                    first = node;
                    first.next = first; // make a circle
                    curr = first;
                } else {
                    curr.next = node;
                    node.next = first;
                    curr = node;
                }
            }
        }

        public void showAll(){
            Node curr = first;
            while (true){
                System.out.printf("The no of node: %d\n", curr.no);
                if (curr.next == first)
                    break;
                curr = curr.next;
            }
        }

        /**
         * 计算出圈顺序
         * @param count 数几个数字
         */
        public void out(int count){
            if (first == null)
                throw new UnsupportedOperationException("List is empty");
            Node curr = first;
            while (curr.next != first) {
                curr = curr.next;
            }
            while (curr != first) {
                for (int i = 0; i < count - 1; i++) {
                    first = first.next;
                    curr = curr.next;
                }
                System.out.println("The out no of node: " + first.no);
                // delete the out node
                first = first.next;
                curr.next = first;
            }
            System.out.println("Last node: " + first.no);
        }
    }

    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.init(5);
        list.showAll();
        System.out.println();
        list.out( 2);
    }
}
```

## 环形队列

> 队列是一个有序列表，可以用数组或链表实现，遵循先进先出原则

数组实现环形队列：尾索引的下一个为头索引时表示队列满

```java
class CircleQueue{
    private int maxSize;
    private int front;
    private int rear;
    private int arr[];

    public CircleQueue(int maxSize){
        this.maxSize = maxSize;
        arr = new int[maxSize];
    }

    public boolean isFull(){
        return (rear + 1) % maxSize == front;
    }

    public boolean isEmpty(){
        return rear == front;
    }

    public void add(int n){
        if (isFull())
            throw new UnsupportedOperationException("cannot add element to full queue");
        arr[rear] = n;
        rear = (rear + 1) % maxSize;
    }

    public int poll(){
        if (isEmpty())
            throw new UnsupportedOperationException("cannot poll element to empty queue");
        int value = arr[front];
        front = (front + 1) % maxSize;
        return value;
    }

    public void showAll(){
        for (int i = front; i < front + size(); i++){
            System.out.printf("arr[%d] = %d\n", i % maxSize, arr[i % maxSize]);
        }
    }

    public int size() {
        return (rear - front + maxSize) % maxSize;
    }
}

public static void main(String[] args) {
    CircleQueue queue = new CircleQueue(4);
    queue.add(1);
    queue.add(2);
    queue.add(3);
    queue.showAll();
    System.out.println();
    queue.poll();
    queue.showAll();
    System.out.println();
    queue.add(4);
    queue.showAll();
    System.out.println();
    queue.poll();
    queue.showAll();
    System.out.println();
    queue.add(5);
    queue.showAll();
}
```

## 栈

栈的应用场景：

子程序调用：在跳往子程序前，会先将下个指令的地址存到堆栈中，直到子程序执行完后再将地址取出，以回到原来的程序中。

处理递归调用：和子程序调用类似，只是除了存储下一个指令的地址外，也将参数、区域变量等存入堆栈中。

表达式转换：中缀表达式转后缀表达式

二叉树遍历

图形的深度优先搜索法（depth-first）

```java
class Stack{
    int maxSize;
    int top = -1;
    int[] arr;

    public Stack(int maxSize){
        this.maxSize = maxSize;
        arr = new int[maxSize];
    }

    public boolean isFull(){
        return top == maxSize - 1;
    }

    public boolean isEmpty(){
        return top == -1;
    }

    public void push(int val){
        if (isFull())
            throw new UnsupportedOperationException("Stack is full");
        top++;
        arr[top] = val;
    }

    public int pop(){
        if (isEmpty())
            throw new UnsupportedOperationException("Stack is Empty");
        int val = arr[top];
        top--;
        return val;
    }

    // Begin with top when traversing
    public void showAll(){
        for (int i = top; i >= 0; i--){
            System.out.printf("stack[%d]=%d\n", i, arr[i]);
        }
    }
}
```

### 前缀、中缀、后缀表达式

- 前缀表达式

  从右至左扫描表达式，遇到数字时，将数字压入栈，遇到运算符时，弹出栈顶的两个数，用运算符对他们做相应的计算，并将结果压入栈，重复上述过程得到最终结果

  例：(3+4)*5-6 的前缀表达式为 - * + 3 4 5 6 

- 中缀表达式

  就是常见的表达式 (3+4)*5-6 

- 后缀表达式（逆波兰表达式）

  从左向右扫描，遇到数字时，将数字压入栈，遇到运算符时，弹出栈顶的两个数，用运算符对它们做相应的计算，并将结果压入栈，重复上述过程直到表达式的最右端

  例：(3+4)*5-6 的后缀表达式为 3 4 + 5 * 6 -


**中缀表达式转后缀表达式**

1. 初始化两个栈：运算符栈s1和储存中间结果的栈s2；

2. 从左至右扫描中缀表达式；

3. 遇到操作数时，将其压s2；

4. 遇到运算符时，比较其与s1栈顶运算符的优先级：

   1. 如果s1为空，或栈顶运算符为左括号“(”，则直接将此运算符入栈；

   2. 否则，若优先级比栈顶运算符的高，也将运算符压入s1；

   3. 否则，将s1栈顶的运算符弹出并压入到s2中，再次转到(4-1)与s1中新的栈顶运算符相比较；

5. 遇到括号时：
   1. 如果是左括号“(”，则直接压入s1
   2. 如果是右括号“)”，则依次弹出s1栈顶的运算符，并压入s2，直到遇到左括号为止，此时将这一对括号丢弃

6. 重复步骤2至5，直到表达式的最右边

7. 将s1中剩余的运算符依次弹出并压入s2

8. 依次弹出s2中的元素并输出，结果的逆序即为中缀表达式对应的后缀表达式

## 递归

通过递归解决阶乘问题

```java
public static int factorial(int n){
    if (n == 1){
        return 1;
    } else {
        return factorial(n - 1) * n;
    }
}
```

