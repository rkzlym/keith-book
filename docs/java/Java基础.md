# Java 基础

## 类加载顺序

1. 类初始化：静态方法 -> 静态代码块，先初始化父类再初始化子类
2. 实例初始化 ：顺序: 非静态实例变量、非静态代码块、构造器代码
3. 子类覆写了父类的方法，初始化时只会执行子类的方法，若父类方法没被覆写，则执行父类方法

```java
public class Parent {
    private int i = param();
    private int a = paramParent();
    private static int j = staticParam();

    static{
        System.out.println("父类静态代码块");
    }

    Parent(){
        System.out.println("父类构造方法");
    }

    {
        System.out.println("父类代码块");
    }

    public int param(){
        System.out.println("父类实例变量1");
        return 1;
    }

    public int paramParent(){
        System.out.println("父类实例变量2");
        return 1;
    }

    public static int staticParam(){
        System.out.println("父类静态实例变量");
        return 1;
    }
}
```

```java
public class Child extends Parent {
    private int i = param();
    private static int j = staticParam();

    static {
        System.out.println("子类静态代码块");
    }

    Child(){
        System.out.println("子类构造方法");
    }

    {
        System.out.println("子类代码块");
    }

    @Override
    public int param(){
        System.out.println("子类实例变量");
        return 1;
    }

    public static int staticParam(){
        System.out.println("子类静态实例变量");
        return 1;
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        Child c1 = new Child();
        System.out.println();
    }
}
```

执行结果：

父类静态实例变量
父类静态代码块
子类静态实例变量
子类静态代码块
子类实例变量
父类实例变量2
父类代码块
父类构造方法
子类实例变量
子类代码块
子类构造方法

## 静态变量

静态变量作用在类层面，所有实例都会共享

```java
public class StaticVariableDemo {
    static int num;

    {
        num++;
    }

    void plus(){
        num++;
    }

    public static void main(String[] args) {
        StaticVariableDemo d1 = new StaticVariableDemo();
        StaticVariableDemo d2 = new StaticVariableDemo();
        d1.plus();
        d2.plus();
        System.out.println(num);
    }
}
```

## 内部类

| 静态内部类                                                   | 非静态内部类                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 可以有静态成员(方法，属性)                                   | 不能有静态成员(方法，属性)                                   |
| 实例化<br />OutClassTest.InnerStaticClass inner = new OutClassTest.InnerStaticClass(); | 实例化<br />OutClassTest oc1 = new OutClassTest();<br />OutClassTest.InnerClass inner = oc1.new InnerClass(); |
| 调用方法或静态变量，通过类名直接调用<br />OutClassTest.InnerStaticClass.staticValue<br />OutClassTest.InnerStaticClass.method() | 实例化出来之后正常调用<br />inner.method()                   |

## String

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

## 参数传递

- 基本数据类型：传递值
- 引用数据类型：传地址

String、包装类等属于引用数据类型，同时是**不可变对象**

> ```
> 《Effective Java》
> 不可变对象(Immutable Object)：对象一旦被创建后，对象所有的状态及属性在其生命周期内不会发生任何变化。
> 由于ImmutableObject不提供任何setter方法，并且成员变量value是基本数据类型，getter方法返回的是value的拷贝，所以一旦ImmutableObject实例被创建后，该实例的状态无法再进行更改，因此该类具备不可变性。
> ```

## 反射

> JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法。对于任意一个对象，都能够调用它的任意方法和属性。

```java
/* 根据属性名获取属性值 */
public static Object getFieldValue(String fieldName, Object object) {
    try {
        Field field = object.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        return field.get(object);
    } catch (Exception e) {
        log.warn("反射获取数据异常", e);
    }
    return null;
}

/* 根据属性名设置属性值 */
public static void setFieldValue(String fieldName, Object object, Object value) {
    try {
        Class<?> c = object.getClass();
        Field f = c.getDeclaredField(fieldName);
        f.setAccessible(true);
        f.set(object, value);
    } catch (Exception e) {
        log.warn("反射设置数据异常", e);
    }
}
```

## 注解

可以通过注解来获取相关属性，通过这些属性再配合反射实现相应业务。

案例：通过反射获取全类名，再通过全类名实例化对应的类

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@interface Channel{
    String value();
}
```

```java
/* 连接接口 */
public interface Connection {
    boolean build();
}

public class CloudConnection implements Connection {
    @Override
    public boolean build() {
        System.out.println("Connect to cloud");
        return true;
    }
}

public class DatabaseConnection implements Connection {
    @Override
    public boolean build() {
        System.out.println("Connect to database");
        return true;
    }
}
```

```java
@Channel("com.demo.basic.annotation.DatabaseConnection")
public class Message{

    private Connection conn;

    public Message(){
        Channel channel = this.getClass().getAnnotation(Channel.class);
        try {
            // 通过反射获取到Connection对象实例
            conn = (Connection) Class.forName(channel.value()).newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void send(String msg){
        // 执行build方法，实际上执行的是Connection接口的实现类
        if (conn.build()){
            System.out.println("消息发送:" + msg);
        }
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        Message msg = new Message();
        msg.send("Hello World");
    }
}
```

