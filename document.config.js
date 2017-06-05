#!/usr/bin/env node
var fs = require('fs');
var package = require('./package.json');
var defaultHtml = '';
	defaultHtml = '<!DOCTYPE html>\n<html lang="zh-CN">\n\t<head>\n';
	defaultHtml += '\t<meta charset="UTF-8">\n';
	defaultHtml += '\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
	defaultHtml += '\t\t<title>Document</title>\n\t\t<link rel="stylesheet" href="css/index.css">\n';
	defaultHtml += '\t\t<link rel="stylesheet" href="css/reset.css">\n';
	defaultHtml += '\t</head>\n<body>\n\t<div id="wrap">wrap</div>\n</body>\n';
	defaultHtml += '<script type="text/javascript" src="js/index.js"></script>\n</html>';

var defaultCss = 'body, div, ul, ol, dl, dt, dd, li, dl, h1, h2, h3, h4';
	defaultCss += '{margin:0;padding:0;font-style:normal;font:13px,Microsoft YaHei}\n';
	defaultCss += 'ol, ul ,li{list-style: none;}\nimg {border: 0; vertical-align:middle;}\n';
	defaultCss += 'body{color:#000000;background:#FFF; text-align:center;}\n';
	defaultCss += '.clear{clear:both;height:1px;width:100%; overflow:hidden; margin-top:-1px;}\n';
 	defaultCss += 'a{color:#000000;text-decoration:none; }\n';
 	defaultCss += 'a:hover{color:#BA2636;text-decoration:underline;}';

var projectConfig = {
	//项目文件夹名字
	projectName : process.argv[2] || 'project',
	//初始化创建文件目录内容
	fileContent : [
		{
			name : 'css',
			type : 'dir'
			//dir为创建目录文件
		},
		{
			name : 'js',
			type : 'dir'
		},
		{
			name : 'images',
			type : 'dir'
		},
		{
			name : 'index.html',
			type : 'file',
			content : defaultHtml,
			//file为创建文件
		},
		{
			name : 'css/reset.css',
			type : 'file',
			content : defaultCss
		},
		{
			name : 'css/index.css',
			type : 'file',
			content : '#wrap{color : red}'
		},
		{
			name : 'js/index.js',
			type : 'file',
			content : '"use strict";\nconsole.log("js文件")'
		}
	]
};
var _PNAME = projectConfig.projectName;
var _PFCONTENT = projectConfig.fileContent;
function _createFile (v) {
	var _path = _PNAME+'/'+v.name;
	if(v['content']) {
		fs.writeFile(_path,v.content,function(err,data) {
			if(err) {
				console.log('创建文件失败！')
			}else{
				console.log('创建成功')
			}
		})
	}
};
function _createDir(v) {
	var _path = _PNAME+'/'+v.name;
	fs.mkdir(_path,function(err,data) {
		if(err) {
			console.log('文件夹创建失败！')
		}
		else {
			console.log('文件夹创建成功！')
		}
	})
}
function createInitial() {
	fs.mkdirSync(_PNAME);
	if(_PFCONTENT && _PFCONTENT.forEach) {
		_PFCONTENT.forEach(function(v,i) {
			console.log(v)
			switch (v.type) {
				case 'file' : 
					_createFile(v);
				break;
				case 'dir'  : 
					_createDir(v);
				break;
			}
		})
	}
};
if(_PNAME) {
	if(fs.existsSync(_PNAME)){
		console.log('文件已经存在！')
	}else{
		createInitial();
	}	
}