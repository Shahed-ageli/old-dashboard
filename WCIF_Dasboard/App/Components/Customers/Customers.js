import moment from 'moment';
import addCustomers from './AddCustomers/AddCustomers.vue';
import customersSteps from './CustomersSteps/CustomersSteps.vue';
export default {
    name: 'Customers',    
    created() {

        this.SearchType = [
            {
                id: 1,
                name: "الإسم"
            },
            {
                id: 2,
                name: 'رقم الهاتف'
            },
            {
                id: 3,
                name: 'عرض كل النتائج'
            }


        ];


        this.GetAllPartners();
        this.GetPartners();







        //this.getCustomers(1,0);
        //this.getCodes();
        //this.getCustomersPhone();



        //this.PackagesCheck();
        
    },
    components: {
        'add-coustomers': addCustomers,
        'customersSteps': customersSteps,
    },
    filters: {
        moment: function (date) {
            if (date === null) {
                return "فارغ";
            }
           // return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            return moment(date).format('MMMM Do YYYY');
        }
    },
    data() {
        return {


            
            Coustmors: [],
            CoustmorSelected: [],
            
            pakegeStatus: [],
            pakegeStatusSelected: [],
            packeges: [],
            custmors: [],
            codes: [],
            CodeSelectd: [],

            selectedCustmor:[],


            CourseEdit:[],
            SuperPackageParent: this.$parent.SuperPackageParent,
            
            Courses: [],
            state: 0,

            custmorPhone:[],
            PhoneSelected: [],






            SearchType: [],
            SearchTypeSelected: '',
            PartnersPhones:[],
            PartnersNames: [],
            SearchId: '',
            Partners: [],
            pageNo: 1,
            pageSize: 10,
            pages: 0,  
            SelectedPartner:'',
          
        };
    },
    methods: {


        GetAllPartners() {

            this.$blockUI.Start();
            this.$http.GetAllPartners()
                .then(response => {
                    this.$blockUI.Stop();
                    this.PartnersPhones = response.data.partners;
                    this.PartnersNames = response.data.partners;
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                });

        },

        GetPartners(pageNo) {
            if (this.SearchTypeSelected === 3)
                this.SearchId = '';
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }

            this.$blockUI.Start();
            this.$http.GetPartners(this.pageNo, this.pageSize, this.SearchId)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Partners = response.data.partners;
                    this.pages = response.data.count;

                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                    this.pages = 0;
                });

        },

        ViewPartner(item) {
            this.SelectedPartner = item;
            this.state = 2;
        },


        DeletePartner(id) {
            this.$confirm('سيؤدي ذلك إلى حدف الشريك  . استمر؟', 'تـحذير', {
                confirmButtonText: 'نـعم',
                cancelButtonText: 'لا',
                type: 'warning'
            }).then(() => {
                this.$http.DeletePartner(id)
                    .then(response => {
                        this.$message({
                            type: 'info',
                            message: response.data
                        });
                        this.GetAllPartners();
                        this.GetPartners();
                        this.$blockUI.Stop();
                    })
                    .catch((err) => {
                        this.$blockUI.Stop();
                        this.$message({
                            type: 'error',
                            message: err.response.data
                        });
                    });
            });
        },

        StopPartner(id) {
            this.$confirm('سيؤدي ذلك إلى إيقاف العميل وإيقاف جميع الباقات الخاصة به  . استمر؟', 'تـحذير', {
                confirmButtonText: 'نـعم',
                cancelButtonText: 'لا',
                type: 'warning'
            }).then(() => {
                this.$http.StopPartner(id)
                    .then(response => {
                        this.$message({
                            type: 'info',
                            message: response.data
                        });
                        this.GetAllPartners();
                        this.GetPartners();
                        this.$blockUI.Stop();
                    })
                    .catch((err) => {
                        this.$blockUI.Stop();
                        this.$message({
                            type: 'error',
                            message: err.response.data
                        });
                    });
            });
        },






        





        getCustomers(pageNo,id) {
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }
            
            this.$blockUI.Start();
            this.$http.GetCustomersInfo(this.pageNo, this.pageSize,id)//this.$parent.SuperPackageParent.superPackageId
                .then(response => {
                    this.$blockUI.Stop();
                    this.custmors = response.data.custmor;
                    this.pages = response.data.count;
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                    this.pages = 0;
                });

        },

        getCustomersPhone() {

            this.$blockUI.Start();
            this.$http.getCustomersPhone()//this.$parent.SuperPackageParent.superPackageId
                .then(response => {
                    this.$blockUI.Stop();
                    this.custmorPhone = response.data.customersPhone;
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                });

        },

        getCodes() {

            this.$blockUI.Start();
            this.$http.GetCodes()
                .then(response => {
                    this.$blockUI.Stop();
                    this.codes = response.data.codes;
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                    this.pages = 0;
                });

        },

        addCustomur() {
            this.state = 1;
        },

        
        

        //delteCustmor(item) {


        //    this.$confirm('سيؤدي ذلك إلى حدف العميل  . استمر؟', 'تـحذير', {
        //        confirmButtonText: 'نـعم',
        //        cancelButtonText: 'لا',
        //        type: 'warning'
        //    }).then(() => {


        //        this.$http.deleteCustmor(item.customerId)
        //            .then(response => {
        //                this.$message({
        //                    type: 'info',
        //                    message: response.data
        //                });
        //                this.$blockUI.Stop();
        //                this.getCustomers(1, 0);
        //            })
        //            .catch((err) => {
        //                this.$blockUI.Stop();
        //                this.$message({
        //                    type: 'error',
        //                    message: err.response.data
        //                });
        //            });
        //    });
        //},

    }   
}
