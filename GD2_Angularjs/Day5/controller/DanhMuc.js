function DanhMucCtrl($scope, $http) {

    $scope.lstProducts = [];
    $scope.lstProductsQLSP = [];
    $scope.form_Products = {
        name: "",
        stuff: "",
        sole: "",
        trademark: "",
        origin: ""
    };
    $http.get("http://localhost:3000/product") // gửi yêu cầu với method get đến api để lấy ra dữ liệu
        .then(function (response) { // sau khi có dữ liệu, xử lý dữ liệu trả về
            console.log(response);
            $scope.lstProductsQLSP = response.data;
        })
        .catch(function (error) {
            alert(error.message);
        });

    $http.get("  http://localhost:3000/DanhMuc") // gửi yêu cầu với method get đến api để lấy ra dữ liệu
        .then(function (response) { // sau khi có dữ liệu, xử lý dữ liệu trả về
            console.log(response);
            $scope.lstProducts = response.data;
        })
        .catch(function (error) {
            alert(error.message);
        })
    //Xóa dữ liệu



    $scope.removeSinhVien = function (event, index) {
        // Hiển thị thông báo SweetAlert2 trước khi xóa sản phẩm
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa danh mục này?',
            text: "Danh mục sẽ được xóa",
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
                let api = "  http://localhost:3000/DanhMuc/" + sv.id;
                $http.delete(api).then(function (response) {
                    $scope.lstProducts.splice(index, 1);
                })
                // Thực hiện xóa sản phẩm ở đây (có thể gọi API hoặc xóa trực tiếp khỏi danh sách)
                // Sau khi xóa thành công, hiển thị thông báo thành công
                // Đây là ví dụ giả định rằng xóa thành công
                Swal.fire(
                    'Xóa thành công!',
                    'Danh mục đã được xóa.',
                    'success'
                );
            }
        });
    };
    //Detail
    $scope.viTriUpdate = -1;
    $scope.detailSinhVien = function (event, index) {
        event.preventDefault();
        let pr = $scope.lstProducts[index];
        $scope.form_Products.name = pr.name;
        $scope.form_Products.stuff = pr.stuff;
        $scope.form_Products.sole = pr.sole;
        $scope.form_Products.trademark = pr.trademark;
        $scope.form_Products.origin = pr.origin;
        $scope.viTriUpdate = index;
    };

    //Add dữ liệu
    // POST: Thêm mới dữ liệu

    $scope.addSinhVien = function (event) {
        // Hiển thị thông báo SweetAlert2 trước khi xóa sản phẩm
        event.preventDefault();
        $http.post("  http://localhost:3000/DanhMuc", $scope.form_Products).then(function (response) {
            $scope.lstProducts.push(response.data);
        });
        Swal.fire({
            title: 'Thêm danh mục thành công!',
            text: 'Danh mục đã được thêm vào giỏ hàng.',
            icon: 'success',
            timer: 5000, // Thời gian (milliseconds) trước khi tự động đóng
            showConfirmButton: false // Ẩn nút xác nhận
        });
    };

    //Cập nhật dữ liệu
    //PUT =>UPDATE DỮ LIỆU

    $scope.updateSinhVien = function (event) {
        // Hiển thị thông báo SweetAlert2 trước khi xóa sản phẩm
        Swal.fire({
            title: 'Bạn có chắc chắn muốn cập nhật danh mục này?',
            text: "Danh mục sẽ được cập nhật",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cập nhật',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                event.preventDefault();
                let pr = $scope.lstProducts[$scope.viTriUpdate];
                let api = "  http://localhost:3000/DanhMuc/" + pr.id;
                $http.put(api, $scope.form_Products).then(function (response) {
                    $scope.lstProducts[$scope.viTriUpdate] = response.data;
                });
                // Thực hiện xóa sản phẩm ở đây (có thể gọi API hoặc xóa trực tiếp khỏi danh sách)
                // Sau khi xóa thành công, hiển thị thông báo thành công
                // Đây là ví dụ giả định rằng xóa thành công
                Swal.fire(
                    'Cập nhật thành công!',
                    'Danh mục đã được cập nhật.',
                    'success'
                );
            }
        });
    };
};