(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{398:function(_,v,r){"use strict";r.r(v);var t=r(42),e=Object(t.a)({},(function(){var _=this,v=_.$createElement,r=_._self._c||v;return r("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[r("h1",{attrs:{id:"sql-执行底层原理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#sql-执行底层原理"}},[_._v("#")]),_._v(" SQL 执行底层原理")]),_._v(" "),r("h2",{attrs:{id:"sql-server组成部分"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#sql-server组成部分"}},[_._v("#")]),_._v(" SQL Server组成部分")]),_._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/20190423191904900.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDUzNTQ3Ng==,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}}),_._v("\n1.关系引擎：主要作用是优化和执行查询。\n包含三大组件：")]),_._v(" "),r("p",[_._v("（1）命令解析器：检查语法和转换查询树。")]),_._v(" "),r("p",[_._v("（2）查询执行器：优化查询。")]),_._v(" "),r("p",[_._v("（3）查询优化器：负责执行查询。")]),_._v(" "),r("p",[_._v("2.存储引擎：管理所有数据及涉及的IO\n包含三大组件：")]),_._v(" "),r("p",[_._v("（1）事务管理器：通过锁来管理数据及维持事务的ACID属性。")]),_._v(" "),r("p",[_._v("（2）数据访问方法：处理对行、索引、页、行版本、空间分配等的I/O请求。")]),_._v(" "),r("p",[_._v("（3）缓冲区管理器：管理SQL Server的主要内存消耗组件Buffer Pool。")]),_._v(" "),r("p",[_._v("3.Buffer Pool\n包含SQL Server的所有缓存。如计划缓存和数据缓存。")]),_._v(" "),r("p",[_._v("4.事务日志\n记录事务的所有更改。保证事务ACID属性的重要组件。")]),_._v(" "),r("p",[_._v("5.数据文件\n数据库的物理存储文件。")]),_._v(" "),r("p",[_._v("6.SQL Server网络接口\n建立在客户端和服务器之间的网络连接的协议层")]),_._v(" "),r("h2",{attrs:{id:"查询的底层原理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#查询的底层原理"}},[_._v("#")]),_._v(" 查询的底层原理")]),_._v(" "),r("p",[r("img",{attrs:{src:"https://img-blog.csdnimg.cn/2019042319215785.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDUzNTQ3Ng==,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}}),_._v("\n1.当客户端执行一条T-SQL语句给SQL Server服务器时，会首先到达服务器的网络接口，网络接口和客户端之间有协议层。")]),_._v(" "),r("p",[_._v("2.客户端和网络接口之间建立连接。使用称为“表格格式数据流”(TDS) 数据包的 Microsoft 通信格式来格式化通信数据。")]),_._v(" "),r("p",[_._v("3.客户端发送TDS包给协议层。协议层接收到TDS包后，解压并分析包里面包含了什么请求。")]),_._v(" "),r("p",[_._v("4.命令解析器解析T-SQL语句。命令解析器会做下面几件事情：")]),_._v(" "),r("p",[_._v("（1）检查语法。发现有语法错误就返回给客户端。下面的步骤不执行。")]),_._v(" "),r("p",[_._v("（2）检查缓冲池（Buffer Pool）中是否存在一个对应该T-SQL语句的执行计划缓存。")]),_._v(" "),r("p",[_._v("（3）如果找到已缓存的执行计划，就从执行计划缓存中直接读取，并传输给查询执行器执行。")]),_._v(" "),r("p",[_._v("（4）如果未找到执行计划缓存，则在查询执行器中进行优化并产生执行计划，存放到Buffer Pool中。")]),_._v(" "),r("p",[_._v("5.查询优化器优化SQL语句")]),_._v(" "),r("p",[_._v("当Buffer Pool中没有该SQL语句的执行计划时，就需要将SQL传到查询优化器，通过一定的算法，分析SQL语句，产生一个或多个候选执行计划。选出开销最小的计划作为最终执行计划。然后将执行计划传给查询执行器。")]),_._v(" "),r("p",[_._v("6.查询执行器执行查询")]),_._v(" "),r("p",[_._v("查询执行器把执行计划通过OLE DB接口传给存储引擎的数据访问方法。")]),_._v(" "),r("p",[_._v("7.数据访问方法生成执行代码")]),_._v(" "),r("p",[_._v("数据访问方法将执行计划生成SQL Server可操作数据的代码，不会实际执行这些代码，传送给缓冲区管理器来执行。")]),_._v(" "),r("p",[_._v("8.缓冲区管理器读取数据。")]),_._v(" "),r("p",[_._v("先在缓冲池的数据缓存中检查是否存在这些数据，如果存在，就把结果返回给存储引擎的数据访问方法；如果不存在，则从磁盘（数据文件）中读出数据并放入数据缓存中，然后将读出的数据返回给存储引擎的数据访问方法。")]),_._v(" "),r("p",[_._v("9.对于读取数据，将会申请共享锁，事务管理器分配共享锁给读操作。")]),_._v(" "),r("p",[_._v("10.存储引擎的数据访问方法将查询到的结果返回关系引擎的查询执行器。")]),_._v(" "),r("p",[_._v("11.查询执行器将结果返回给协议层。")]),_._v(" "),r("p",[_._v("12.协议层将数据封装成TDS包，然后协议层将TDS包传给客户端。")])])}),[],!1,null,null,null);v.default=e.exports}}]);