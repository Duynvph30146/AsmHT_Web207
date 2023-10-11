function DangKyCtrl($scope, $http) {
    $scope.lstDangKy = [];
    $scope.form_DangKy = {
        TenTaiKhoan: "",
        MatKhau: ""
    };
    $http.get("http://localhost:3000/DangNhap") // gửi yêu cầu với method get đến api để lấy ra dữ liệu
        .then(function (response) { // sau khi có dữ liệu, xử lý dữ liệu trả về
            console.log(response);
            $scope.lstDangKy = response.data;
        })
        .catch(function (error) {
            alert(error.message);
        })

    $scope.kiemTraTenTaiKhoanTonTai = function (tenTaiKhoan) {
        return $scope.lstDangKy.some(function (user) {
            return user.TenTaiKhoan === tenTaiKhoan;
        });
    };


    //Add dữ liệu
    // POST: Thêm mới dữ liệu
    $scope.addTaiKhoan = function (event) {
        event.preventDefault();
        // Kiểm tra xem tên tài khoản đã tồn tại hay chưa
        if ($scope.kiemTraTenTaiKhoanTonTai($scope.form_DangKy.TenTaiKhoan)) {
            alert("Tên tài khoản đã tồn tại. Vui lòng chọn tên tài khoản khác.");
        } else {
            // Nếu tên tài khoản không tồn tại, thêm mới
            $http.post("http://localhost:3000/DangNhap", $scope.form_DangKy).then(function (response) {
                $scope.lstDangKy.push(response.data);
                alert("Đăng ký thành công");
            });
        }
    };
};