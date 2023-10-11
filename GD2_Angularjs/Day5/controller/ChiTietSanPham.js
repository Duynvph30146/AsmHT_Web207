function ChiTietSanPhamCtrl($scope, $http, $routeParams) {
    $scope.GioHang = [];
    const apiGioHang = "http://localhost:3000/GioHang";
    $http.get(apiGioHang)
        .then(function (response) {
            console.log(response);
            $scope.GioHang = response.data;
        })
        .catch(function (error) {
            alert(error.message);
        });

    // NẾU TRÊN ĐƯỜNG DẪN CÓ PARAMETER
    $scope.id = $routeParams.id;
    $scope.ChiTietSanPham = {};
    if ($scope.id && $scope.id > 0) {
        console.log($scope.id);
        // Gửi yêu cầu lấy ra danh sách
        $http.get("http://localhost:3000/product" + "/" + $scope.id) // gửi yêu cầu với method get đến api để lấy ra dữ liệu
            .then(function (response) { // sau khi có dữ liệu, xử lý dữ liệu trả về
                $scope.ChiTietSanPham = response.data;
            })
            .catch(function (error) {
                alert(error.message);
            })
    }

    $scope.themVaoGio = function () {
        var kiem = 0;
        let id = $scope.ChiTietSanPham.id;
        for (var i = 0; i < $scope.GioHang.length; i++) {
            if (id == $scope.GioHang[i].idsp) {
                kiem = 1;
                break;
            }
        }
        if (kiem == 0) {
            let order = {
                idsp: $scope.ChiTietSanPham.id,
                image: $scope.ChiTietSanPham.image,
                name: $scope.ChiTietSanPham.name,
                price: $scope.ChiTietSanPham.price,
                quantity: $scope.ChiTietSanPham.quantity
            }
            console.log(order);
            $http.post(apiGioHang, order)
                .then(function () {
                    alert("Thêm vào giỏ hàng thành công!");
                })
                .catch(function (error) {})
        }
        if (kiem == 1) {
            alert("Sản phẩm đã có trong giỏ hàng");
        }
    }
};