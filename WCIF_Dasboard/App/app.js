import Vue from 'vue';
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Vuetify from 'vuetify'
import locale from 'element-ui/lib/locale/lang/en'
import BlockUIService from './Shared/BlockUIService.js';
import Layout from './Components/Layout/Layout.vue';
import Home from './Components/Home/Home.vue';
import Courses from './Components/Courses/Courses.vue';
//import Packages from './Components/Packages/Packages.vue';
import Customers from './Components/Customers/Customers.vue';
import Users from './Components/Users/Users.vue';
import AddUser from './Components/Users/AddUsers/AddUsers.vue';
import EditUser from './Components/Users/EditUsers/EditUsers.vue';

import EditUsersProfile from './Components/Users/EditUsersProfile/EditUsersProfile.vue';
import ChangePassword from './Components/Users/ChangePassword/ChangePassword.vue';
//import AddOldPackage from './Components/Packages/AddOldPackage/AddOldPackage.vue';
import AddOldCustomers from './Components/Customers/AddOldCustomers/AddOldCustomers.vue';
//import AddPackage from './Components/Packages/AddPackage/AddPackage.vue';
import AddCustomers from './Components/Customers/AddCustomers/AddCustomers.vue';
import Reports from './Components/Reports/Reports.vue';

import Category from './Components/Category/Category.vue';

import Seting from './Components/Seting/Seting.vue';
import UnknownPackage from './Components/UnknownPackage/UnknownPackage.vue';
//import SharedPackage from './Components/Packages/SharedPackage/SharedPackage.vue';


import PackageInfo from './Components/PackageInfo/PackageInfo.vue';
import AddPackageInfo from './Components/PackageInfo/AddPackageInfo/AddPackageInfo.vue';

import Services from './Components/Services/Services.vue';
import AddServices from './Components/Services/AddServices/AddServices.vue';

import Subscriptions from './Components/Subscriptions/Subscriptions.vue';
import AddSubscriptions from './Components/Subscriptions/AddSubscriptions/AddSubscriptions.vue';






/*import Students from './Components/Students/Students.vue';
import Companies from './Components/Companies/Companies.vue';
import Packages from './Components/Packages/Packages.vue';
import SuperPackages from './Components/Packages/SuperPackages/SuperPackages.vue';
import SubPackages from './Components/Packages/SubPackages/SubPackages.vue';
import SubPackagesMain from './Components/SubPackages/SubPackages.vue';
import Courses from './Components/Packages/Courses/Courses.vue';
import CoursesMain from './Components/Courses/Courses.vue';
import SubPackageCourses from './Components/Packages/SubPackages/Courses/Courses.vue'
import CourseFiles from './Components/CourseFiles/CourseFiles.vue'; */

import DataService from './Shared/DataService';



Vue.use(Vuetify)
Vue.use(VueRouter);
Vue.use(ElementUI,{ locale });

Vue.config.productionTip = false;

Vue.prototype.$http = DataService;
Vue.prototype.$blockUI = BlockUIService;


export const eventBus = new Vue();



const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: Home },
        { path: '/Courses', component: Courses },
        { path: '/home', component: Home },
        //{ path: '/Packages', component: Packages },
        { path: '/Users', component: Users },
        { path: '/AddUser', component: AddUser },
        { path: '/EditUser', component: EditUser },
        { path: '/EditUsersProfile', component: EditUsersProfile },
        { path: '/ChangePassword', component: ChangePassword },  
        { path: '/Customers', component: Customers },
        //{ path: '/AddOldPackage', component: AddOldPackage },
        { path: '/AddOldCustomers', component: AddOldCustomers },
        //{ path: '/AddPackage', component: AddPackage },
        { path: '/AddCustomers', component: AddCustomers },
        { path: '/Reports', component: Reports },
        { path: '/Category', component: Category },
        { path: '/UnknownPackage', component: UnknownPackage },
        //{ path: '/SharedPackage', component: SharedPackage },
        { path: '/Seting', component: Seting },

        { path: '/PackageInfo', component: PackageInfo },
        { path: '/AddPackageInfo', component: AddPackageInfo },
        { path: '/Services', component: Services },
        { path: '/AddServices', component: AddServices },

        { path: '/Subscriptions', component: Subscriptions },
        { path: '/AddSubscriptions', component: AddSubscriptions },
        
        ]

});

Vue.filter('toUpperCase', function (value) {
    if (!value) return '';
    return value.toUpperCase();
});

new Vue({
    router,
    render: h => {
        return h(Layout);
    }    
}).$mount('#app');
