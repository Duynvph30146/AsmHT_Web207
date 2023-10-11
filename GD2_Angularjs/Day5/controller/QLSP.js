function QLSPCtrl($scope, $http) {
    $scope.lstProducts = [];
    $scope.form_Products = {
        image: null,
        name: "",
        size: "",
        price: "",
        status: ""
    };
    $scope.form_Products.price = ""; // Biến để lưu trữ số tiền
    $http.get("http://localhost:3000/product") // gửi yêu cầu với method get đến api để lấy ra dữ liệu
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
            title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
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
                let api = "http://localhost:3000/product/" + sv.id;
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
    //Detail
    $scope.viTriUpdate = -1;
    $scope.detailSinhVien = function (event, index) {
        event.preventDefault();
        let pr = $scope.lstProducts[index];
        $scope.form_Products.image = pr.image;
        $scope.form_Products.name = pr.name;
        $scope.form_Products.size = pr.size;
        $scope.form_Products.price = pr.price;
        $scope.form_Products.status = pr.status;
        $scope.viTriUpdate = index;
    };
    // thêm
    $scope.imageSelected = function (event) {
        var fileInput = event.target;
        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.form_Products.image = e.target.result;
                $scope.$apply();
            };
            reader.readAsDataURL(file);
        }
    };
    //sửa
    $scope.imageSelectedForUpdate = function (event) {
        var fileInput = event.target;
        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.form_Products.image = e.target.result;
                $scope.$apply();
            };
            reader.readAsDataURL(file);
        }
    };
    
    //Add dữ liệu
    // POST: Thêm mới dữ liệu
    $scope.addSinhVien = function (event) {
        event.preventDefault();
        $http.post("http://localhost:3000/product", $scope.form_Products).then(function (response) {
            $scope.lstProducts.push(response.data);
        });
        Swal.fire({
            title: 'Thêm sản phẩm thành công!',
            text: 'Sản phẩm đã được thêm vào giỏ hàng.',
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
            title: 'Bạn có chắc chắn muốn cập nhật sản phẩm này?',
            text: "Sản phẩm sẽ được cập nhật",
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
                let api = "http://localhost:3000/product/" + pr.id;
                $http.put(api, $scope.form_Products).then(function (response) {
                    $scope.lstProducts[$scope.viTriUpdate] = response.data;
                });
                // Thực hiện xóa sản phẩm ở đây (có thể gọi API hoặc xóa trực tiếp khỏi danh sách)
                // Sau khi xóa thành công, hiển thị thông báo thành công
                // Đây là ví dụ giả định rằng xóa thành công
                Swal.fire(
                    'Cập nhật thành công!',
                    'Sản phẩm đã được cập nhật.',
                    'success'
                );
            }
        });
    };
};
// function directive(thousandsSeparator,$filter) {
//     return {
//         require: "ngModel",
//         link: function (scope, element, attrs, ngModelController) {
//             ngModelController.$parsers.push(function (data) {
//                 // Xóa tất cả các dấu phân cách phần nghìn
//                 var cleanValue = data.replace(/,/g, '');
//                 // Định dạng giá trị với dấu phân cách phần nghìn
//                 var formattedValue = $filter('number')(cleanValue);
//                 // Cập nhật giá trị trong ô input
//                 ngModelController.$setViewValue(formattedValue);
//                 ngModelController.$render();
//                 // Trả về giá trị sau khi đã định dạng
//                 return cleanValue;
//             });
//             ngModelController.$formatters.push(function (data) {
//                 // Định dạng giá trị với dấu phân cách phần nghìn
//                 return $filter('number')(data);
//             });
//         }
//     };
// };
function directive(numberFormat) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$formatters.push(formatNumber);
            ngModelCtrl.$parsers.push(parseNumber);

            function formatNumber(modelValue) {
                if (modelValue === null || modelValue === undefined) return '';
                return modelValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            function parseNumber(viewValue) {
                if (viewValue === null || viewValue === undefined) return '';
                return viewValue.replace(/,/g, '');
            }
        }
    }
};