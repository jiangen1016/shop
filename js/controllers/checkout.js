//定义结账数据绑定的控制器 我们把它页注册在主模块中
myapp.controller('checkoutCtrl',function($scope,mycart){
    $scope.cart=mycart.findAll();
    //计算商品金额
    $scope.totalmoney=function(){
        var total=0;
        angular.forEach($scope.cart,function(item){
            total+=item.number*item.product.price;
        });
        return total;
    };
    //删除商品
    $scope.remove=function(item){
        mycart.remove(item.product.name)
    }
});
