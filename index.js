
//  fs.watchFile(filename,[optitions],listener) //来监测文件是否发生改变

//  optations：{persistent:true,inteval:6000},persistent为true时候，表示文件监控不会退出应用程序。interval：表示多长时间监控一次。

var  fs=require("fs");
fs.watchFile('./src/App.js',function(curr,prev){
  if(Date.parse(prev.ctime)==0){
    console.log("文件被创建");
  }else if(Date.parse(curr.ctime)==0){
    console.log("文件被删除");
  }else if(Date.parse(curr.mtime)!=Date.parse(prev.mtime)){
    fs.readFile('./src/App.js', 'utf8', function(err, data){
      console.log("文件被修改",data);
    });
  }
})