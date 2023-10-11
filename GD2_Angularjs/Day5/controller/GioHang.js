function GioHangCtrl($scope, $http) {
    const apiHoaDon = "http://localhost:3000/HoaDon";
    $scope.lstProducts = [];
    $scope.form_Products = {
        image: null,
        color: "",
        quantity: "",
        name: "",
        size: "",
        price: "",
        status: ""
    };
    $http.get("http://localhost:3000/GioHang") // gửi yêu cầu với method get đến api để lấy ra dữ liệu
        .then(function (response) { // sau khi có dữ liệu, xử lý dữ liệu trả về
            console.log(response);
            $scope.lstProducts = response.data;
        })
        .catch(function (error) {
            alert(error.message);
        });
    $scope.tongSoLuongDaChon = 0;
    $scope.capNhatTongSoLuong = function () {
        // Khởi tạo tổng số lượng đã chọn là 0
        var tongSoLuong = 0;

        // Duyệt qua mảng lstProducts và kiểm tra trạng thái của checkbox
        for (var i = 0; i < $scope.lstProducts.length; i++) {
            if ($scope.lstProducts[i].isChecked) {
                // Nếu checkbox được chọn, thêm số lượng của sản phẩm vào tổng số lượng
                tongSoLuong += $scope.lstProducts[i].quantity;
            }
        }
        // Cập nhật giá trị của biến tổng số lượng đã chọn
        $scope.tongSoLuongDaChon = tongSoLuong;
    };
    $scope.xoaGioHang = function (event, index) {
        // Hiển thị thông báo SweetAlert2 trước khi xóa sản phẩm
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa khỏi giỏ hàng không?',
            text: "Sản phẩm sẽ bị xóa vĩnh viễn!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                event.preventDefault();
                let sv = $scope.lstProducts[index];
                let api = "  http://localhost:3000/GioHang/" + sv.id;
                $http.delete(api).then(function (response) {
                    $scope.lstProducts.splice(index, 1);
                })
                // Thực hiện xóa sản phẩm ở đây (có thể gọi API hoặc xóa trực tiếp khỏi danh sách)
                // Sau khi xóa thành công, hiển thị thông báo thành công
                // Đây là ví dụ giả định rằng xóa thành công
                Swal.fire(
                    'Xóa thành công!',
                    'Sản phẩm đã được xóa.',
                    'success'
                );
            }
        });
    };

    $scope.mua = function () {
        var kiem = 0;
        $scope.lstProducts.forEach(sp => {
            if (sp.isChecked) {
                kiem = 1;
                let order = {
                    idsp: sp.id,
                    name: sp.name,
                    image: sp.image,
                    size: sp.size,
                    price: sp.price,
                    quantity: sp.quantity,
                    sum: Number.parseInt(sp.price) * Number.parseInt(sp.quantity)
                }
                console.log(order);
                $http.post(apiHoaDon, order)
                    .then(function () {
                        alert("mua thành công");
                        let id = sp.id;
                        $http.delete("http://localhost:3000/GioHang"+ "/" + id)
                        // for (var i = 0; i < $scope.lstSanPham.length; i++) {
                        //     if (id == $scope.lstSanPham[i].id) {
                        //         $scope.lstSanPham[i].soLuong = $scope.lstSanPham[i].soLuong - sp.soluong;
                        //         event.preventDefault();
                        //         $http.put(api_postSP + "/" + id, $scope.lstSanPham[i])
                        //     }
                        // }
                    })
                    .catch(function (error) {})
            }
        });
    }
};