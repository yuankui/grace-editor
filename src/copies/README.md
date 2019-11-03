之所以增加这个目录，是因为 webpack 会把 require 关键字进行替换，我我喜欢希望代码运行在
electron 的 console 中，希望还是正常执行  原生的require。所以这里解决方式就是

- 拷贝
- 改代码