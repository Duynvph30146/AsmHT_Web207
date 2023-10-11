function TrangChuCtrl($scope, $http, $routeParams) {
    $scope.lstProducts = [];
    $http.get("http://localhost:3000/product") // gửi yêu cầu với method get đến api để lấy ra dữ liệu
        .then(function (response) { // sau khi có dữ liệu, xử lý dữ liệu trả về
            console.log(response);
            $scope.lstProducts = response.data;
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
};