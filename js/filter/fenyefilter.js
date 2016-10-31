/**
 * Created by hxsd on 2016/9/22.
 */

//创建一个新的模块
angular.module('marsFilter',[]);
//在这个模块当中创建一个分页的过滤器
//这个过滤器会接受三个参数
            //第一个参数   是被过滤的三数组 （所有商品的集合）
            //第二个参数   是请求的页码数
            //第三个参数   是页面大小
angular.module('marsFilter',[]).filter('pagerFilter',function(){
    return function(product,pageNum,pageSize){
        //如果传进来的product 不是一个数组 pagenum 和pagesize 不是一个数字 那么返回这个数据
        if(angular.isArray(product) && angular.isNumber(pageNum)&& angular.isNumber(pageSize)){
            //根据分页的算法 计算出请求页面的起始索引值
            var startIndex=(pageNum-1)*pageSize;
            if(startIndex>=product.length){
                return []   //如果计算的起始值大于或者等于数组的长度 那么 返回一个空的数组
            }
            //从传进来的数组 截取指定数量出来 （pagesize）并返回
            return product.slice(startIndex,startIndex+pageSize)
        }else{
            return product
        }

    }
}).filter("navpag",function(){
    return function(product,pageSize){
        if(angular.isArray(product) && angular.isNumber(pageSize)){
            //计算页数
            var pagenumber=Math.ceil(product.length/pageSize);//分页数
            //声明一个新的数据并返回
            var pagenav=[];
            for(var i=0;i<pagenumber;i++){
                pagenav.push(i+1)
            }
            return pagenav;
        }else{
            return product
        }
    }
});
