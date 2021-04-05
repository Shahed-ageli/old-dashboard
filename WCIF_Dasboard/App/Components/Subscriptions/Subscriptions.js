import moment from 'moment';
export default {
    name: 'Subscriptions',    
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
        this.GetSubscriptions();







        this.pakegeStatus = [
            {
                id: 1,
                name: "نشطة"
            },
            {
                id: 2,
                name: 'غير نشطة'
            }, {
                id: 3,
                name: "	موقوفة"
            }, {
                id: 4,
                name: "	تخطت الحد الأقصي "
            }


        ];


        
        
    },

    components: {
    },

    filters: {
        moment: function (date)
        {
            if (date === null) {
                return "فارغ";
            }
           
            return moment(date).format('MMMM Do YYYY'); // || return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        }
    },

    data() {

        return {


            SearchType: [],
            SearchTypeSelected: '',
            PartnersPhones: [],
            PartnersNames: [],
            SearchId: '',
            pageNo: 1,
            pageSize: 10,
            pages: 0,  

            Subscriptions: [],





            selectedPackege: '',

            state: 0,

            
            SMSstopResone: 'لقد تم إيقاف الخدمة الخاصة بكم الرجاء مراجعة إدارة الخدمات بشركة المدار',
            
            StopSMSServiceDialog: false,
            SMSServiceInfoDialog: false,
          
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

        GetSubscriptions(pageNo) {
            if (this.SearchTypeSelected === 3)
                this.SearchId = '';
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }

            this.$blockUI.Start();
            this.$http.GetSubscriptions(this.pageNo, this.pageSize, this.SearchId)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Subscriptions = response.data.subscriptions;
                    this.pages = response.data.count;

                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                    this.pages = 0;
                });

        },

        
        showStopSMSDialog(item) {
            this.StopSMSServiceDialog = true;
            this.selectedPackege = item;
        },

        stopServeice(id) {
            this.$confirm('سيؤدي ذلك إلى إيقاف الإشتراك  . استمر؟', 'تـحذير', {
                confirmButtonText: 'نـعم',
                cancelButtonText: 'لا',
                type: 'warning'
            }).then(() => {
                this.$blockUI.Start();
                this.$http.stopServeice(id)
                    .then(response => {
                        this.$message({
                            type: 'info',
                            message: response.data
                        });
                        this.GetAllPartners();
                        this.GetSubscriptions();
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
        

        canselStoped() {
            this.StopSMSServiceDialog = false;
        },

        backService(id) {


            this.$confirm('سيؤدي ذلك إلى إعادة تشغيل الباقة  . استمر؟', 'تـحذير', {
                confirmButtonText: 'نـعم',
                cancelButtonText: 'لا',
                type: 'warning'
            }).then(() => {

                this.$blockUI.Start();
                this.$http.backServeice(id)
                    .then(response => {
                        this.$message({
                            type: 'info',
                            message: response.data
                        });
                        this.GetAllPartners();
                        this.GetSubscriptions();
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

        showSmsInfo(item) {
            this.SMSServiceInfoDialog = true;
            this.selectedPackege = item;
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.rechargeService();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },


        addPackege() {
            this.state = 1;
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        ClearStopSMSServiceDialog() {
            this.stopResone='';
            this.SMSstopResone= 'لقد تم إيقاف الخدمة الخاصة بكم الرجاء مراجعة إدارة الخدمات بشركة المدار';
        },


    }    
}
