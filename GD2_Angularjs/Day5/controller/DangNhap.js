function DangNhapCtrl($scope, $http, $window) {
  $scope.isLoggedIn = false;
  $scope.errorMessage = '';
  $scope.user = {
    username: '',
    password: ''
  };

  $scope.login = function () {
    // Gửi yêu cầu đăng nhập đến JSON Server
  
    $http.get('http://localhost:3000/DangNhap?TenTaiKhoan=' + $scope.user.username + '&MatKhau=' + $scope.user.password)
      .then(function (response) {
        if (response.data.length > 0) {
          // Đăng nhập thành công
          $scope.isLoggedIn = true;
          $scope.errorMessage = '';
          // Chuyển hướng đến trang mà bạn muốn
          $window.location.href = '#QLSP'; // Sử dụng $window
          Swal.fire({
            title: 'Đăng nhập thành công!',
            text: 'Chào mừng bạn đến với ứng dụng của chúng tôi.',
            icon: 'success',
            showConfirmButton: false,
            timer: 500 // Thời gian hiển thị thông báo (milliseconds)    
          });
        } else {
          // Đăng nhập thất bại
          $scope.isLoggedIn = false;
          $scope.errorMessage = 'Vui lòng kiểm tra tên đăng nhập và mật khẩu';
        }
      })
      .catch(function (error) {
        $scope.isLoggedIn = false;
        $scope.errorMessage = 'Đăng nhập không thành công. Vui lòng kiểm tra tên đăng nhập và mật khẩu.';
      });

  };

  $scope.logout = function () {
    $scope.isLoggedIn = false;
    $scope.user = {
      username: '',
      password: ''
    };
  };
}