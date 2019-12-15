angular.module('MyApp')
  .factory('Dashboard', ['$resource', function ($resource) {

    return{
      SaveMemberDetails: function () {
        return $resource('/api/SaveMemberDetails',
            {}, { 'save': { method: 'POST',isArray:false } });
    },
    ImportMemberDetails: function () {
        return $resource('/api/ImportMemberDetails',
            {}, { 'save': { method: 'POST',isArray:false } });
    },
    ListMembers: function () {
        return $resource('/api/ListMembers',{});
    },
	ListMembersNearMe: function () {
        return $resource('/api/ListMembersNearMe',{});
    },
    getDashboardCounts: function () {
        return $resource('/api/getDashboardCounts',{});
    },
      
    }
  }]);