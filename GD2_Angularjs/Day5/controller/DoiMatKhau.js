function DoiMatKhauCtrl($scope, $http) {
    $scope.formData = {};
    $scope.successMessage = '';
    $scope.errorMessage = '';

    $scope.changePassword = function () {
        // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu có trùng khớp nhau không
        if ($scope.formData.newPassword !== $scope.formData.confirmPassword) {
            $scope.errorMessage = 'Xác nhận mật khẩu không khớp.';
            $scope.successMessage = '';
            return;
        }

        // Lấy tên tài khoản được chọn từ dropdown
        const targetAccount = $scope.formData.targetAccount;

        // Gửi yêu cầu kiểm tra mật khẩu hiện tại đến JSON Server
        $http.get('http://localhost:3000/DangNhap', {
                params: {
                    TenTaiKhoan: targetAccount,
                    MatKhau: $scope.formData.currentPassword
                }
            })
            .then(function (response) {
                if (response.data.length > 0) {
                    // Nếu mật khẩu hiện tại đúng, thực hiện đổi mật khẩu
                    const userId = response.data[0].id;
                    $http.patch('http://localhost:3000/DangNhap/' + userId, {
                            MatKhau: $scope.formData.newPassword
                        })
                        .then(function (updateResponse) {               
                            alert("Đổi mật khẩu thành công");
                        })
                        .catch(function (updateError) {
                            $scope.errorMessage = 'Lỗi khi cập nhật mật khẩu mới.';
                            $scope.successMessage = '';
                        });
                } else {
                    $scope.errorMessage = 'Mật khẩu hiện tại không đúng. Vui lòng kiểm tra lại.';
                    $scope.successMessage = '';
                }
            })
            .catch(function (error) {
                $scope.errorMessage = 'Lỗi khi kiểm tra mật khẩu. Vui lòng thử lại.';
                $scope.successMessage = '';
            });
    };
}