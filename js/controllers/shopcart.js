/**
 * Created by hxsd on 2016/9/23.
 */

angular.module('marscart',[]).
    factory("mycart",function(){
    //先创建一个空的数组 保存购买的商品项，充当购物车的购物筐
    var cart=[];
    //创建一个购物车对象
    return {
        //添加商品到购物车的方法
        add:function(product){
            for(var i=0;i<cart.length;i++){
                var item=cart[i];
                //判断购物车中是否已经有了这个商品
                if(item.product.name==product.name){
                    //说明购物车中已经有了该商品
                    item.number++;
                    return; //添加商品过程结束
                }
            }
            //如果代码执行到这里 说明购物车中没有要添加的商品
            //购买项item添加到购物车当中
            cart.push({product:product,number:1});
        },
        //从购物车中删除某种商品的方法
        remove:function(name){
            for(var i=0;i<cart.length;i++){
                var item=cart[i];
                //判断购物车当中是否已经有了这个商品
                if(item.product.name== name){
                    //说明找到了这个商品 并将这个商品从数组当中删除
                    cart.splice(i,1);
                    return
                }
            }
        },
        //获得购物车中所有商品的方法
        findAll:function(){
            return cart;
        },
        //清空购物车的方法
        clear:function(){
            cart.length=0;
        }
    };
}).controller('cartCtrl',function($scope,mycart){
    var cart=mycart.findAll();//获得购物车中所有购买的商品
    $scope.count=function(){
        var total=0;
        angular.forEach(cart,function(item){
            total+=item.number; //累加每种商品的数量
        });
        return total;
    };
    $scope.money=function(){
        var total=0;
        angular.forEach(cart,function(item){
            total+=item.number*item.product.price;
        });
        return total;
    }

});