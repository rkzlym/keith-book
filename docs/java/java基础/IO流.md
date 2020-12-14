# IO流
## 1. 流的分类
按操作数据单位不同分为：字节流(8 bit)，字符流(16 bit)
按数据流的流向不同分为：输入流，输出流
按流的角色的不同分为：节点流，处理流
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020020116265641.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
IO流体系
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200201162728374.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
## 2. 流的操作
#### 2.1 操作步骤
1. File类的实例化
2. 流的实例化
3. 读写的操作
4. 资源的关闭
#### 2.2 字符流操作文件(文本文件)
1. 读文件
```java
public void readFile(){
    // 实例化File类对象，指明要操作的文件
    File file = new File("src/main/resources/file/1.txt");
    FileReader fr = null;
    try {
        // 提供具体的流
        fr = new FileReader(file);
        // 每次读1024个字符
        char[] cbuf = new char[1024];
        int len;
        // read(char[] cbuf) 返回每次读入cbuf数组中字符的个数，如果到达文件末尾，返回-1
        while ((len = fr.read(cbuf)) != -1){
            for (int i = 0; i < len; i++) {
                System.out.print(cbuf[i]);
            }
        }
        fr.read(cbuf);
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (fr != null)
                fr.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
2. 写文件
```java
public void writeFile() {
    File file = new File("src/main/resources/file/3.txt");
    FileWriter fw = null;
    try {
        // 参数2表示是否对原有文件追加
        fw = new FileWriter(file, false);
        fw.write("Hello World 张三");
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (fw != null)
                fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
3. 先读后写 -- 复制文件
```java
public void copyFile() {
    File srcFile = new File("src/main/resources/file/3.txt");
    File dstFile = new File("src/main/resources/file/4.txt");
    FileReader fr = null;
    FileWriter fw = null;
    try {
        fr = new FileReader(srcFile);
        fw = new FileWriter(dstFile, false);
        char[] cbuf = new char[1024];
        int len;
        while ((len = fr.read(cbuf)) != -1){
            fw.write(cbuf, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (fr != null)
                fr.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            if (fw != null)
                fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
#### 2.3 字节流操作文件(图片、视频等)
复制图片
```java
public void copyFile(){
    File srcFile = new File("src/main/resources/img/1.jpg");
    File dstFile = new File("src/main/resources/img/2.jpg");
    FileInputStream fis = null;
    FileOutputStream fos = null;
    try {
        fis = new FileInputStream(srcFile);
        fos = new FileOutputStream(dstFile);
        byte[] buf = new byte[1024];
        int len;
        while ((len = fis.read(buf)) != -1){
            fos.write(buf, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (fis != null)
                fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            if (fos != null)
                fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
#### 2.4 缓冲流的使用
作用：提升流的读取、写入速度。
复制图片文件
```java
public void copyImgFile(){
    File srcFile = new File("src/main/resources/img/1.jpg");
    File dstFile = new File("src/main/resources/img/2.jpg");
    BufferedInputStream bis = null;
    BufferedOutputStream bos = null;
    try {
        // 创建节点流
        FileInputStream fis = new FileInputStream(srcFile);
        FileOutputStream fos = new FileOutputStream(dstFile);
        // 创建缓冲流
        bis = new BufferedInputStream(fis);
        bos = new BufferedOutputStream(fos);
        // 读取写入
        byte[] buf = new byte[1024];
        int len;
        while ((len = bis.read(buf)) != -1){
            bos.write(buf, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        // 资源关闭，关闭外层流的同时，内层流也会自动关闭
        try {
            if (bis != null)
                bis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            if (bos != null)
                bos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
复制文本文件
```java
public void copyTxtFile(){
    File srcFile = new File("src/main/resources/file/1.txt");
    File dstFile = new File("src/main/resources/file/5.txt");
    BufferedReader br = null;
    BufferedWriter bw = null;
    try {
        FileReader fr = new FileReader(srcFile);
        FileWriter fw = new FileWriter(dstFile);
        br = new BufferedReader(fr);
        bw = new BufferedWriter(fw);
        char[] cbuf = new char[1024];
        int len;
        while ((len = br.read(cbuf)) != -1){
            bw.write(cbuf, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (br != null)
                br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            if (bw != null)
                bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```