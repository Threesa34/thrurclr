angular.module('MyApp')
	.controller('DashboardController', ['$scope', '$http', '$route', '$location', '$window', '$timeout', 'Upload', 'Dashboard', function ($scope, $http, $route, $location, $window, $timeout, Upload, Dashboard) {
        console.log('Dashboard ctrl works')

        $scope.ListMembers = function()
        {
            Dashboard.ListMembers().query().$promise.then(function(response){
                $scope.MembersList = response;
            });
        }

        $scope.GetMemberDetails = function(memberdetails)
        {
            $scope.member = [];
            $scope.member.push(memberdetails);
            $('#ModalAddMember').modal('show');
        }

        $scope.SaveMemberDetails = function()
        {
            Dashboard.SaveMemberDetails().save($scope.member).$promise.then(function (response) {
                Swal({
					type: response.type,
					title: response.title,
					text: response.message,
				}).then(() => {
                    if(response.status == 0)
                    {

                    }
                    else
                    {
                        $scope.member = [];
                        $scope.$apply();
                        $scope.ListMembers();
                    }
                });
            });
        };


        // IMPORT MEMBER DETAILS

        $scope.SelectedFileForUpload = null;
 
    $scope.UploadFile = function (files) {
        $scope.$apply(function () { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
            $scope.Message = "";
            $scope.SelectedFileForUpload = files[0];
        })
    }
 
    //Parse Excel Data 
    $scope.ParseExcelDataAndSave = function () {
        var file = $scope.SelectedFileForUpload;
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                //XLSX from js-xlsx library , which I will add in page view page
                var workbook = XLSX.read(data, { type: 'binary' });
                var sheetName = workbook.SheetNames[0];
                var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (excelData.length > 0) {
                    //Save data 
                    $scope.ImportMemberDetails(excelData);
                }
                else {
                    $scope.Message = "No data found";
                }
            }
            reader.onerror = function (ex) {
                console.log(ex);
            }
 
            reader.readAsBinaryString(file);
        }
        else{
            $scope.errormsg = "Please select The file first."
        }
    }
 
    // Save excel data to our database
    $scope.ImportMemberDetails = function (excelData) {
       Dashboard.ImportMemberDetails().save(excelData).$promise.then(function (response) {
        Swal({
            type: response.type,
            title: response.title,
            text: response.message,
        }).then(() => {
            if(response.status == 0)
            {

            }
            else
            {
                $('#ModalImportMember').modal('hide');
                $scope.ListMembers();
            }
        });
    });
    }
    
    $scope.resetSelection = function()
    {
        angular.element("input[type='file']").val(null);
        $(".custom-file-input").siblings(".custom-file-label").removeClass("selected").html("Choose file");
    }
    }]);

