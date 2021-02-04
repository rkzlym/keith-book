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
  - 优点：支持随机存取，存储密度高
  - 缺点：大片连续空间分配不方便，改变容量不方便
- 链表：存储元素不一定是连续的，元素节点中存放数据元素以及相邻元素的地址信息
  - 优点：离散的小空间分配方便，改变容量方便
  - 缺点：不可随机存取，存储密度低

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

递归调用规则：

1. 当程序执行到一个方法时，就会开辟一个独立的空间（栈）
2. 每个空间的数据（局部变量）是独立的
3. 如果方法中使用的是引用类型的变量，就会共享该引用类型的数据
4. 递归必须向退出递归的条件逼近，否则就是无限递归
5. 当一个方法执行完毕，或者return，就会返回，遵守谁调用，就将结果返回给谁，同时方法执行完毕或返回时，该方法也就执行完毕

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

通过递归解决迷宫问题

```java
/**
 * 使用递归解决迷宫问题: 求最短路径
 * 策略: 下 右 上 左
 * map[1][1]: 起点
 * map[6][6]: 终点
 */
public class Maze {

    private static final int NOT_WALKED = 0;

    private static final int WALL = 1;

    private static final int WALKED = 2;

    private static final int DEAD_WAY = 3;

    public static void main(String[] args) {
        int[][] map = initMaze();
        walk(map, 1, 1);
        printMap(map);
        System.out.println("-------------------------");
        printMap(map);
    }

    private static int[][] initMaze(){
        int[][] map = new int[8][8];

        for (int i = 0; i < 8; i++) {
            map[0][i] = WALL;
            map[7][i] = WALL;
            map[i][0] = WALL;
            map[i][7] = WALL;
        }

        map[3][1] = WALL;
        map[3][2] = WALL;
        map[2][2] = WALL;

        return map;
    }

    private static boolean walk(int[][] map, int i, int j){
        if (map[6][6] == WALKED){    // 表示已经到终点了
            return true;
        }
        if (map[i][j] == NOT_WALKED){   // 如果可以走
            map[i][j] = WALKED;         // 设置为走过
            if (walk(map, i + 1, j)){           // 下
                return true;
            } else if(walk(map, i, j + 1)){     // 右
                return true;
             } else if (walk(map, i - 1, j)){   // 上
                return true;
            } else if (walk(map, i, j - 1)){    // 左
                return true;
            } else {
                map[i][j] = DEAD_WAY;
                return false;
            }
        }
        return false;
    }

    private static void printMap(int[][] map){
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j++){
                System.out.print(map[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

## 字符串模式匹配

### 暴力匹配

```java
public static int indexOf(String str, String subStr) {
    char[] s = str.toCharArray();
    char[] t = subStr.toCharArray();
    int i = 0, j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] == t[j]) {
            i++;
            j++;
        } else {
            i = i - (j - 1);	// 每次比对失败回溯到开始节点+1的位置
            j = 0;
        }
    }
    if (j == t.length)
        return (i - j);     //主串中存在该模式返回下标号
    else
        return -1;          //主串中不存在该模式
}
```

### KMP算法

> 用于字符串子串的查找，通过消除回溯来提高匹配效率

对于每模式串 t 的每个元素 t[i]，都存在一个实数 k ，使得模式串 t 开头的 k 个字符依次与 t[i] 前面的 k 个字符相同，如果这样的 k 有多个，则取最大的一个。

如果 j = k 时才发现匹配失败，说明 1 ~ k - 1 都匹配成功

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021020420593768.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

```java
public static int indexOf(String s, String t){
    char[] s_arr = s.toCharArray();
    char[] t_arr = t.toCharArray();
    int[] next = getNextArray(t_arr);
    int i = 0, j = 0;
    while (i<s_arr.length && j<t_arr.length){
        if(j == -1 || s_arr[i]==t_arr[j]){
            i++;
            j++;
        }
        else
            j = next[j];
    }
    if(j == t_arr.length)
        return i-j;
    else
        return -1;
}

private static int[] getNextArray(char[] t) {
    int[] next = new int[t.length];
    next[0] = -1;
    next[1] = 0;
    int k;
    for (int j = 2; j < t.length; j++) {
        k=next[j-1];
        while (k!=-1) {
            if (t[j - 1] == t[k]) {
                next[j] = k + 1;
                break;
            }
            else {
                k = next[k];
            }
            next[j] = 0;  //当k==-1而跳出循环时，next[j] = 0，否则next[j]会在break之前被赋值
        }
    }
    return next;
}
```

## 二叉树

**二叉树的遍历方式**

前序遍历：先访问根节点，再遍历左子树，最后遍历右子树。时间复杂度 O(n)

```java
void preOrder(Node n){
    if (n != null){
        visit(n);
        preOrder(n.left);
        preOrder(n.right)
    }
}
```

中序遍历：先遍历左子树，再访问根节点，最后遍历右子树。

```java
void InOrder(Node n){
    if (n != null){
        InOrder(n.left);
        visit(n);
        InOrder(n.right)
    }
}
```

后序遍历：从左到后从叶子节点遍历左右子树，最后访问根节点。

```java
void postOrder(Node n){
    if (n != null){
        postOrder(n.left);
        postOrder(n.right)
        visit(n);
    }
}
```

层次遍历：从根节点一层一层的从左到右遍历整个二叉树树

算法思想：

1. 初始将根入队并访问根节点
2. 若有左子树，则将左子树的根入队
3. 若有右子树，则将右子树的根入队
4. 然后出队，访问该节点
5. 反复这个过程直到队列空为止

```java
void levelOrder(BiTreeNode t) {
	if (t == null)
		return;
	Queue<BiTreeNode> queue = new LinkedBlockingQueue<>();
	BiTreeNode curr;
	queue.add(t);
	while (!queue.isEmpty()) {
		curr = queue.remove();
		System.out.println(curr.value);
		if (curr.left != null)
			queue.add(curr.left);
		if (curr.right != null)
			queue.add(curr.right);
	}
}
```

**中序遍历转换为非递归算法**

1. 初始时依次扫描根节点的所有左侧节点并将它们一一进栈
2. 出栈一个节点，访问它
3. 扫描该节点的右孩子节点并将其进栈
4. 依次扫描右孩子节点的所有左侧节点并一一进栈
5. 反复该过程直到栈空为止

```java
void InOrder(Node n){
    Node p = n;
    while(!stack.isEmpty()){
        if (p != null){
            stack.push(p);
            p = p.left;
        } else {
            visit(stack.pop());
       		p = p.right;
        }
    }
}
```

**使用遍历构造二叉树**

先序 / 后序遍历序列 + 中序遍历序列可以确定一棵二叉树

先序遍历序列 + 后序遍历序列<font color=blue>不能</font>确定一棵二叉树

原因：中序遍历序列可以确定左右子树，先序 / 后序 遍历序列可以确定根节点

1. 在先序序列中，第一个节点是根节点
2. 根节点将中序遍历序列划分为两部分
3. 然后在先序序列中确定两部分的节点，并且两部分的第一个节点分别为左子树的根和右子树的根
4. 在子树中重复递归该过程，便能唯一确定一棵二叉树

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210204231919982.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)