/**
 * Created by hxsd on 2016/9/22.
 */

        //创建一个主模块
var myapp = angular.module('app', ['marsFilter',"marscart","ngRoute"]);
//创建一个主控制器
myapp.controller('bodyCtrl', function ($scope,$http,$location,mycart) {
    $scope.data={
        categories:[
            {id:"1001",category:"商品类别01"},
            {id:"1002",category:"商品类别02"},
            {id:"1003",category:"商品类别03"},
            {id:"1004",category:"商品类别04"}
        ],
        products:[
            {name:"商品01",category:"商品类别01",price:100,desc:"2016流行新款,你值得拥有",imgsrc:"images/TB1_50x50.jpg"},
            {name:"商品01",category:"商品类别01",price:100,desc:"2016流行新款,你值得拥有",imgsrc:"images/TB1_50x50.jpg"},
            {name:"商品01",category:"商品类别01",price:100,desc:"2016流行新款,你值得拥有",imgsrc:"images/TB1_50x50.jpg"},
            {name:"商品0302",category:"商品类别02",price:150,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"商品04",category:"商品类别02",price:160,desc:"2016流行新款,你值得拥有",imgsrc:"images/TB3_50x50.jpg"},
            {name:"商品05",category:"商品类别02",price:170,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"商品06",category:"商品类别03",price:200,desc:"2016流行新款,你值得拥有",imgsrc:"images/TB4_50x50.jpg"},
            {name:"商品06",category:"商品类别03",price:200,desc:"2016流行新款,你值得拥有",imgsrc:"images/TB4_50x50.jpg"},
            {name:"商品07",category:"商品类别04",price:340,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"商品09",category:"商品类别04",price:588,desc:"2016流行新款,你值得拥有",imgsrc:"images/TB2_50x50.jpg"},
            {name:"商品09",category:"商品类别04",price:888,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"商品09",category:"商品类别04",price:888,desc:"2016流行新款,你值得拥有",imgsrc:"images/TB2_50x50.jpg"}
        ],
        shipping:{

        }
    };
    $scope.send=function(){
        //发送给服务器数据 1）购物城中的商品 2）收货人信息
        var orderData=angular.copy($scope.data.shipping)//拷贝收货人的信息
        orderData.cart=mycart.findAll()  //找出所有购物车中的商品

        $http.post("order2.json",orderData).success(function(okdata,status){
            //保存 返回的订单号 并显示在thank you页面中
            $scope.data.shipping.orderId=okdata.orderId
            //清空购物车
            mycart.clear();
        }).error(function(errdata,status){
            //保存错误的信息  并显示在thank you页面中
            $scope.data.shipping.errMsg=errdata;
            $scope.data.shipping.errStatus=status;

        }).finally(function(){
            //最后 不管订单提交成功与否 都是跳转到thank you 页面
            $location.path('/thankYou')
        })

    }
});

//配置路由
myapp.config(function($routeProvider){
    $routeProvider.when('/productsList',{
        templateUrl:'view/productsList.html',
        controller:'productsCtrl'
    });
    $routeProvider.when('/checkout',{
        templateUrl:'view/checkoutSummary.html',
        controller:'checkoutCtrl'
    });
    $routeProvider.when('/placeorder',{
        templateUrl:'view/placeOrder.html'

    });
    $routeProvider.when('/thankYou',{
        templateUrl:'view/thankYou.html'
    });
    $routeProvider.otherwise({
        templateUrl:'view/productsList.html',
        controller:'productsCtrl'
    })
});