var flipApp = angular.module('flipApp',['ngRoute','chart.js']);


flipApp.config(function($routeProvider,$locationProvider){
	$routeProvider

	.when('/',{
		templateUrl : 'views/home.html',
		contrller : 'homeController'
	})

	.when('/dashboard',{
		templateUrl : 'views/dashboard.html',
		contrller : 'dashController'
	})

	.when('/about',{
		templateUrl : 'views/about.html',
		contrller : 'aboutController'
	})

	.when('/contact',{
		templateUrl : 'views/contact.html',
		contrller : 'contactController'
	})

	.otherwise({ redirectTo: '/' });

	//HTML 5 History API
	$locationProvider.html5Mode(true);
});

flipApp.controller('homeController', function($scope){
	$scope.message = 'This is the home page';
});

flipApp.controller('dashController', function($scope,$http){
	$scope.message = 'Transactions List';
	$scope.transactions = [];


	$scope.getTransactions = function(){
		$http({method : 'GET',url : 'http://localhost:3000/api/transactions'})
		.success(function(data,status){
			$scope.transactions = data.data;
			console.log($scope.transactions);
		})
		.error(function(data,status){
			console.log('error');
		});
	};

	$scope.formatDate = function(str){
		dateArray = str.split('/');
		dateString = dateArray[2] + '-'+ dateArray[0] + '-' + dateArray[1];
		console.log(dateString);
		return Date.parse(dateString);
	};

	$scope.getTypeStyle = function(transactType){
		var style;
		var color;
		switch(transactType) {
			case "Food":
				color = "#1abc9c";
				break;
			case "Education":
				color = "#3498db";
				break;
			case "Clothing":
				color = "#d35400";
				break;
			case "Entertainment":
				color = "#9b59b6";
				break;
			case "Insurance":
				color = "#27ae60";
				break;
			case "Utilities":
				color = "#8e44ad";
				break;
			case "Rent":
				color = "#e67e22";
				break;
			case "Travel":
				color = "#f1c40f";
				break;
			case "Charity":
				color = "#c0392b";
				break;
			default:
				color = "#95a5a6";
		}
		
		style = "{color: '"+color+"'}";
		return style;
	};

});

flipApp.controller('aboutController', function($scope){
	$scope.message = 'This is the about page';
});

flipApp.controller('contactController', function($scope){
	$scope.message = 'This is the contact page';
});

flipApp.controller("PieCtrl", function ($scope,$http) {
	$scope.transactions = [];
  	$scope.labels = [];
  	$scope.listData = []; 
  	$scope.data =[];



 	$scope.getTransactions = function(){
		$http({method : 'GET',url : 'http://localhost:3000/api/transactions'})
		.success(function(data,status){
			$scope.transactions = data.data;
			console.log($scope.transactions[0].attributes);

			//generate chart labels 
			angular.forEach($scope.transactions, function(element){
				if($scope.labels.indexOf(element.attributes.type) < 0) {
					$scope.labels.push(element.attributes.type);
					$scope.listData.push({key: element.attributes.type, value: 0.0});
				}
			});
			
			// generate key value pair and add amount
			angular.forEach($scope.transactions, function(t){
				angular.forEach($scope.listData, function(item){
					if(item.key === t.attributes.type){
						item.value = item.value + parseFloat(t.attributes.amount);
					}
				});
			});

			// generate data for transaction chart
			angular.forEach($scope.listData, function(dataItem){
				$scope.data.push(dataItem.value.toFixed(2));
			});
			
		})
		.error(function(data,status){
			console.log('error');
		});
	};

	$scope.calculateData = function(){
		$scope.getTransactions();

		angular.forEach($scope.transactions, function(element){
			console.log('transact name:' + element.name);
		});
	}
});