/**
 * Created by hxsd on 2016/9/22.
 */

//创建一个控制器用来控制商品类别显示
myapp.controller('productsCtrl',function($scope,mycart){
    //保存用户当前选中的商品类别
    $scope.selected=null;
    //响应用户选择商品类的的操作
    $scope.select_=function(category){
        $scope.selected=category;
        //每次点击商品类别  显示第一页
        $scope.pageNum=1;
    };
    //过滤函数 参数是被过滤 数组总每一个元素
    $scope.filterCategory=function(product){
        return $scope.selected==null || $scope.selected==product.category
    };
    $scope.pageNum=1;
    $scope.pageSize=2;
    $scope.selectpage=function(page){
        $scope.pageNum=page;
    }
    //将制定商品 添加到购物车中
    $scope.add=function(products){
        //
        mycart.add(products)
    }
});