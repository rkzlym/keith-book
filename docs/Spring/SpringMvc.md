# Spring MVC

### 概念

将Web层进行职责解耦，将Web应用分为 模型 - 视图 - 控制器。

### 九大组件

```java
/* 文件上传解析器 */
MultipartResolver multipartResolver;
/* 区域信息解析器 */
LocaleResolver localeResolver;
/* 主题解析器 */
ThemeResolver themeResolver;
/* Handler映射信息 */
List<HandlerMapping> handlerMappings;
/* Handler适配器 */
List<HandlerAdapter> handlerAdapters;
/* 异常解析器 */
List<HandlerExceptionResolver> handlerExceptionResolvers;
/* 请求到视图转换器 */
RequestToViewNameTranslator viewNameTranslator;
/* SpringMVC中运行重定向携带数据的功能 */
FlashMapManager flashMapManager;
/* 视图解析器 */
List<ViewResolver> viewResolvers;
```

### MVC流程

1. 客户端请求提交到 DispatcherServlet.
2. DispatcherServlet 收到请求后，遍历HandlerMapping集合得到HandlerExecutionChain，HandlerExecutionChain中包含Handler和Intercepetor (处理器和拦截器)
3. HandlerMapping 根据Url找到具体处理器，生成处理器的对象及处理器拦截器，并返回给DispatcherServlet.
4. DispatcherServlet 经过 HandlerAdapter 调用具体 Handler, 执行前置拦截器 applyPreHandle，执行目标方法返回 ModelAndView，执行后置拦截器 applyPostHandle，执行完成后返回ModelAndView给HandlerAdapter.
5. DispatcherServlet 将ModelAndView传给ViewResolver解析后返回view.
6. DispatcherServlet对View进行渲染并响应用户.