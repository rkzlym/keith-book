# Java 基础

### String

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

### 对象的深浅拷贝

浅拷贝：只复制一个对象，对象内部存在的指向其他对象数组或者引用则不复制

深拷贝：对象，对象内部的引用均复制

> clone方法执行的是浅拷贝，如要实现深拷贝，对象内部的引用对象需重写clone方法