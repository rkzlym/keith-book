#### short s1 = 1; s1 = s1 + 1;有什么错? short s1 = 1; s1 +=1;有什么错? 

1) 对于 short s1=1;s1=s1+1 来说，在 s1+1 运算时会自动提升表达式的类型为 int， 那么将 int 赋予给 short 类型的变量 s1 会出现类型转换错误。 

2) 对于 short s1=1;s1+=1 来说 +=是 java 语言规定的运算符，java 编译器会对它进行特殊处理，因此可以正确编译。 

#### int和Integer的区别

1. Integer是int的包装类，int是基本数据类型
2. Integer必须实例化后才能使用，int不需要
3. Integer实际是对象的引用，当new一个Integer时，实际上生成一个指针指向此对象，而int直接存储数据值
4. Integer默认值是null，int默认值是0