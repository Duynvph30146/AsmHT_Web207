// Khởi tạo ứng dụng angularjs
// Khai báo các thư viện phụ thuộc
var mySPA = angular.module("mySPA", ["ngRoute"]); //cung cấp các tính năng liên quan đến routing, cho phép bạn quản lý các route và hiển thị 
//nội dung tương ứng với mỗi route trong ứng dụng đơn trang (SPA).

// Khởi tạo controller được sử dụng trong file html với app
mySPA.controller("TrangChuCtrl", TrangChuCtrl);
mySPA.controller("DangNhapCtrl", DangNhapCtrl);
mySPA.controller("DangKyCtrl", DangKyCtrl);
mySPA.controller("GioiThieuCtrl", GioiThieuCtrl);
mySPA.controller("DanhMucCtrl", DanhMucCtrl);
mySPA.controller("QLSPCtrl", QLSPCtrl);
mySPA.controller("ChiTietSanPhamCtrl", ChiTietSanPhamCtrl);
mySPA.controller("SanPhamCtrl", SanPhamCtrl);
mySPA.controller("GioHangCtrl", GioHangCtrl);
mySPA.controller("HangDaMuaCtrl", HangDaMuaCtrl);
mySPA.controller("DoiMatKhauCtrl", DoiMatKhauCtrl);


// Cấu hình url, chuyển được nội dung các trang theo từng url
mySPA.config(function ($routeProvider, $locationProvider) { //config Phương thức này được sử dụng để cấu hình các tham số và tùy chọn cho ứng dụng AngularJS 
    //Xóa khoảng trắng
    $locationProvider.hashPrefix(""); //là 1 tham số của config dùng để cấu hình quy tắc URL và định dạng URL của ứng dụng
    //Cấu hình chuyển trang
    $routeProvider //là 1 tham số của config có thể cấu hình các route
        .when("/TrangChu", {
            templateUrl: "./pages/TrangChu.html",
            controller: "TrangChuCtrl"
        })
        .when("/DangNhap", {
            templateUrl: "./pages/DangNhap.html",
            controller: "DangNhapCtrl"
        })
        .when("/DangKy", {
            templateUrl: "./pages/DangKy.html",
            controller: "DangKyCtrl"
        })
        .when("/GioiThieu", {
            templateUrl: "./pages/GioiThieu.html",
            controller: "GioiThieuCtrl"
        })
        .when("/DanhMuc", {
            templateUrl: "./pages/DanhMuc.html",
            controller: "DanhMucCtrl"
        })
        .when("/QLSP", {
            templateUrl: "./pages/QLSP.html",
            controller: "QLSPCtrl"
        })
        .when("/SanPham", {
            templateUrl: "./pages/SanPham.html",
            controller: "SanPhamCtrl"
        })
        .when("/GioHang", {
            templateUrl: "./pages/GioHang.html",
            controller: "GioHangCtrl"
        })
        .when("/HangDaMua", {
            templateUrl: "./pages/HangDaMua.html",
            controller: "HangDaMuaCtrl"

        })
        .when("/DoiMatKhau", {
            templateUrl: "./pages/DoiMatKhau.html",
            controller: "DoiMatKhauCtrl"

        })
        
        .when("/ChiTietSanPham/:id", {
            templateUrl: "./pages/ChiTietSanPham.html",
            controller: "TrangChuCtrl",
            controller:"ChiTietSanPhamCtrl"
        })
        .otherwise({
            redirectTo: "/TrangChu" //.otherwise() để chỉ định route mặc định. Nếu không có route nào khớp với URL, 
            //ứng dụng sẽ tự động chuyển hướng đến "/trang-chu".
        })
});