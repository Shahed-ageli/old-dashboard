export default {
    name: 'AddCustomers',    
    created() {

        this.GetAllPartners();

        this.Types = [
            {
                id: 1,
                name: "إسلامية"
            },
            {
                id: 2,
                name: 'تقافية'
            },
            {
                id: 3,
                name: 'رياضية'
            },
            {
                id: 4,
                name: 'منوعات ترفيهية'
            },
            {
                id: 5,
                name: 'اجتماعية'
            },
            {
                id: 6,
                name: 'تصنيف اخر '
            }


        ];
    },
   
    data() {
        return {

            PartnersPhones: [],
            Types: [],


            ServiceInfo: {
                PartnerId: '',
                Name: '',
                ShortName: '',
                ShortCode: '',
                Type: '',
                Description: '',
                Content: '',
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



        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AddService();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


        },

        AddService() {
            this.$blockUI.Start();
            this.$http.AddService(this.ServiceInfo)
                .then(response => {
                    this.$message({
                        type: 'info',
                        message: response.data
                    });
                    this.$blockUI.Stop();
                    this.ServiceInfo.Content = '';
                    this.ServiceInfo.Description = '';
                    this.ServiceInfo.ShortName = '';
                    this.resetForm('ServiceInfo');
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    this.$message({
                        type: 'error',
                        message: err.response.data
                    });
                });



            
        },


        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }    
}
