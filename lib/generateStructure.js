var Promise = require("bluebird"),
    fs = Promise.promisifyAll(require('fs-extra'));
var root = __dirname.replace(/liuziyao-react-cli\\lib/,'liuziyao-react-cli\\');	//	发布上线
// console.log("------"+root,"+++++++"+__dirname);
// console.log( root,'--------' );
// console.log(__dirname)
// console.log(process.cwd())
function generateStructure(project,select){
	// console.log( select );
	const yuyan = select.yuyan==true?"Javasript":"Typescript";
  return fs.copyAsync(root+`/moban/`+yuyan+"/"+select.huanjing, project,{clobber: true})
    .then(function(err){
      // return err ?  console.error(err) : console.log('generate project success');
      return err ?  console.error(err) : 123;
    })
}

module.exports = generateStructure;