function HangDaMuaCtrl($scope,$http) {
    $scope.lstDaMua = [];
    $scope.form_DaMua = {
        image: null,
        name: "",
        size: "",
        price: "",
        quantity: "",
        sum:""
    };
    const apiDaMua="http://localhost:3000/HoaDon";
    $http.get(apiDaMua) // gửi yêu cầu với method get đến api để lấy ra dữ liệu
    .then(function (response) { // sau khi có dữ liệu, xử lý dữ liệu trả về
        console.log(response);
        $scope.lstDaMua = response.data;
    })
    .catch(function (error) {
        alert(error.message);
    })
};