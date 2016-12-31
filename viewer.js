/**
 * Created by kisstheraik on 16/12/31.
 * 查看http请求的工具
 */

/**
 * 可以查看的信息
 * header
 * body 可选 -b
 * socket 端口 -s
 * 链路层数据
 */
let http = require('http');
let para = require('nodejs-getopt');
let defaultUrl='http://www.baidu.com';
let url=process.argv[2];
if(url == null){
    url = defaultUrl;
}
let paraList=para.getopt(process.argv.splice(3).join(' '),'bsh',{'h':function () {
    console.log('Usage: node viewer [url] [options]\n       -b : 展示响应body\n       -s : 展示socket信息')
}});

http.get(url,function (res) {

    //打印headers
    console.log('header:\n');
    let header=res.headers;
    let maxKey=0;
    for(let i in res.headers){
        if(i.length>maxKey){
            maxKey=i.length;
        }
    }
    for(let i in res.headers){
        let pad=maxKey-i.length;
        let padstr='';
        for(let j=0;j<pad;j++){
            padstr+=' ';
        }
        console.log(i.substring(0,1).toUpperCase()+i.substring(1)+padstr+' : '+res.headers[i]);
    }

    //打印body
    if(paraList['b']!=null) {
        console.log();
        console.log('body:\n');
        res.on('data', function (data) {
            console.log(data);
        })
    }

    //打印socket
    if(paraList['s']!=null){
        let socket=res.socket;
        console.log();
        console.log('socket:\n');
        console.log('localAddr : '+socket.localAddress);
        console.log('localPort : '+socket.localPort);
        console.log('remoteAddr : '+socket.remoteAddress);
        console.log('remotePort : '+socket.remotePort);

    }

});
