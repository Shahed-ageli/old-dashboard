export default {
    name: 'AddPackage',
    created() {

        this.GetAllPartners();
       // this.GetAllPackeges();

        this.PackegesType = [
            {
                id: 1,
                name: "الرسائل التنبيهية للخدمات المصرفية"
            },
            {
                id: 2,
                name: 'الرسائل لشركات مزودي الخدمات المضافة والخدمات المصرفية فقط '
            },
            {
                id: 3,
                name: 'الرسائل الدعائية والتسويقية Bulk SMS'
            },
            {
                id: 4,
                name: 'الرسائل التنبيهية لخدمات المحافظ الالكترونية'
            },
            {
                id: 5,
                name: 'الرسائل التنبيهية لمزودي خدمات الانترنت ISP'
            }


        ];
    },

    data() {
        return {

            PackegesType: [],
            TypeSelected: '',


            PartnersPhones: [],
            PartnersId: '',

            Packeges:[],

            PartnerServices:[],

            SubscriptionsInfo:
            {
                ServicesId: '',
                PackageId: '',
                Cash: '',
                UsedSMS: '0',
                From: '',
                To: '',
                MaximumRatio: '90',
            },
        };
    },
    methods: {

        GetAllPartners() {

            this.$blockUI.Start();
            this.$http.GetAllPartners()
                .then(response => {
                    this.$blockUI.Stop();
                    this.PartnersPhones = response.data.partners;
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                });

        },

        GetPartnerService() {
            this.$blockUI.Start();
            this.$http.GetPartnerService(this.PartnersId)
                .then(response => {
                    this.$blockUI.Stop();
                    this.PartnerServices = response.data.partnerService;
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                });
        },


        GetAllPackeges() {
            this.$blockUI.Start();
            this.$http.GetAllPackeges(this.TypeSelected)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Packeges = response.data.packeges;
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                });
        },


        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AddSubscription();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


        },


        AddSubscription()
        {
            this.$blockUI.Start();
            this.$http.AddSubscription(this.SubscriptionsInfo)
                .then(response => {
                    this.$message({
                        type: 'info',
                        message: response.data
                    });
                    this.Clear();
                    this.$blockUI.Stop();
                    
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                    this.$message({
                        type: 'error',
                        message: err.response.data,
                        
                    });
                });
        },

        Clear() {

            this.SubscriptionsInfo.UsedSMS = '0';
            this.SubscriptionsInfo.MaximumRatio = '90';
            this.SubscriptionsInfo.From = '';
            this.SubscriptionsInfo.To = '';
            this.SubscriptionsInfo.ServicesId = '';
            this.SubscriptionsInfo.PackageId = '';
            this.SubscriptionsInfo.Cash = '';
            this.PartnersId = '';
            this.TypeSelected = '';
            this.PartnerServices.Clear();
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
}
