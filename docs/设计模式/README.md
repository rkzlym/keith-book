# 设计模式

设计模式是一种能够更好的实现程序的拓展性的思想

## 设计原则

**单一职责原则** - Single Responsibility Principle

一个类应该只有一个发生变化的原因

**开闭原则** - Open Closed Principle

一个软件实体，如类、模块和函数应该对扩展开放，对修改关闭

**里氏替换原则** - Liskov Substitution Principle

所有引用基类的地方必须能透明地使用其子类的对象

**迪米特法则** - Law of Demeter

如果两个软件实体无须直接通信，那么就不应当发生直接的相互调用，可以通过第三方转发该调用。其目的是降低类之间的耦合度，提高模块的相对独立性。

**接口隔离原则** - Interface Segregation Principle

客户端不应该依赖它不需要的接口。类间的依赖关系应该建立在最小的接口上。

**依赖倒置原则** - Dependence Inversion Principle

上层模块不应该依赖底层模块，它们都应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖于抽象。

## 设计模式分类

创建型模式（5种）
 1. 工厂方法模式
 2. 抽象工厂模式
 3. 建造者模式
 4. 原型模式
 5. 单例模式

结构型模式（7种）
 1. 适配器模式
 2. 桥接模式
 3. 组合模式
 4. 装饰器模式
 5. 外观模式
 6. 享元模式
 7. 代理模式

行为型模式（10种）
 1. 责任链模式
 2. 命令模式
 3. 迭代器模式
 4. 中介者模式
 5. 备忘录模式
 6. 观察者模式
 7. 状态模式
 8. 策略模式
 9. 模板方法模式
 10. 访问者模式

