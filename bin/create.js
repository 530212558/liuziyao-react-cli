#!/usr/bin/env node

const path = require('path'),
  program = require('commander'),
  generateStructure = require('../lib/generateStructure'),
  wf = require('../lib/withoutFile');
const spawn = require('cross-spawn');
const inquirer = require('inquirer');	//端交互的inquirer了	与用户进行一些简单的交互以确定项目的一些细节。

program
  // .version(require('../package.json').version)	//这里的 .version() 意思是返回该命令包的版本号，即运行 (autogo --version //- 返回1.0.0)
  .usage('创建react demo 如：creat-react demo')	//Commander帮我们做好了用法（Usage） 信息，以及两个参数（Options）autogo [-h|--help] 和 autogo [-V||--version]
  .parse(process.argv);   //  是将接收到的参数加入 Commander 的处理管道。	// process.argv 是获取命令行参数 如获取demo: autogo demo 

//program.args 是获取到命令后的参数，注意这里是一个数组autogo 返回  [] autogo demo  //-返回 ['demo'] autogo demo hello  //-返回 ['demo','hello']
var pname = program.args[0];
if (!pname) program.help();	//	如果我们直接运行 autogo 是会报错的，因为没有传入项目名，实际上我们在运行一个命令而不传入任何参数时，可以直接返回帮助信息：

// console.log("program.args:",...program.args);
	
	//inquirer.prompt	与终端交互的 inquirer 
  // type: String, // 表示提问的类型，下文会单独解释 name: String, // 在最后获取到的answers回答对象中，作为当前这个问题的键
  	//confirm:(布尔）	// input：用户输入（如果filter已定义则已过滤）（字符串）
	// number：用户输入（如果filter已定义则过滤）（数字） rawlist，list ：选择值（如果未指定值，则为名称）（String）
	//	checkbox 多选
  // message: String|Function, // 打印出来的问题标题，如果为函数的话 
  // default: String|Number|Array|Function, // 用户不输入回答时，问题的默认值。或者使用函数来return一个默认值。假如为函数时，函数第一个参数为当前问题的输入答案。 
  // choices: Array|Function, // 给出一个选择的列表，假如是一个函数的话，第一个参数为当前问题的输入答案。为数组时，数组的每个元素可以为基本类型中的值。 
  // validate: Function, // 接受用户输入，并且当值合法时，函数返回true。当函数返回false时，一个默认的错误信息会被提供给用户。 
  // filter: Function, // 接受用户输入并且将值转化后返回填充入最后的answers对象内。 
  // when: Function|Boolean, // 接受当前用户输入的answers对象，并且通过返回true或者false来决定是否当前的问题应该去问。也可以是简单类型的值。 
  // pageSize: Number, // 改变渲染list,rawlist,expand 或者checkbox时的行数的长度。}
inquirer.prompt([  // 这边就用到了与终端交互的 inquirer 了
    {
	    name: 'yuyan',  //  key 值
      type: 'confirm',  //  （确认）
      default:'none', //  默认返回的值
      message: '不需要（Typescript）?', //命令行显示的值
    },
    // {
    //   name: 'ok2',   //  key 值
    //   when: 'ismeta',   //  (输入)
    //   type: 'string',
    //   default:'nnnn', //  默认返回的值
    //   message: '项目名称:'  //命令行显示的值
    // },
    {
	    name: 'huanjing',   //  key 值
      when: 'ismeta', //  (选择)
      type: 'rawlist',
      message: '请选择 antd 是用PC端的还是用Mobile端的。。。 ', //命令行显示的标题值
      choices: [
        {
          name: 'antd',  //命令行显示的值
          value: 'antd',  //  返回的值
          // short: '想2'
        },
        {
          name: 'antd-mobile', //命令行显示的值
          value: 'antd-mobile', //  返回的值
          // short: '很想2'
        }
       ]
    }
]).then(answers => {
    	// console.log(answers);
      Promise.all([generateStructure(pname,answers)]).then(function(){
        // return wf(pname,["jade"]);
          // const cwd = process.cwd()+'\\'+pname; //  加入路劲拉取node

          const cwd = path.resolve(process.cwd(),pname); //  加入路劲拉取node
          const child = spawn('npm', ['install','react','react-dom','--save'], { cwd, stdio: 'inherit' });
          if( !answers.yuyan ){
            spawn('npm', ['install','@types/react','@types/react-dom','--save-dev'], { cwd, stdio: 'inherit' });
          }
          spawn('npm', ['install'], { cwd, stdio: 'inherit' });
      });
  });





