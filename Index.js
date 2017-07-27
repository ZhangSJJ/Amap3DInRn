console.log(1);
//Time1
setTimeout(function(){
	console.log(2);
},300);
//Time2
setTimeout(function(){
	console.log(3)
},400);

for (var i = 0;i<10000;i++) {
	console.log(4);
}
//Time3
setTimeout(function(){
	console.log(5);
},100);


var a ="zhangsj"
function b(a){
	a="nihao";
	console.log(a);
}
b(a);
console.log(a)








