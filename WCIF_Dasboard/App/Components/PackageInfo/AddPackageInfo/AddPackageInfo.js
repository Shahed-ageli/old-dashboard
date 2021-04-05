export default {
    name: 'AddCustomers',    
    created() {

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
            

            PackegeInfo: {
                name: '',
                smsCount: '',
                price: '',
                type: '',
            },


        };
    },
    methods: {

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AddPackege();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


        },

        

        AddPackege() {
            this.$blockUI.Start();
            this.$http.AddPackege(this.PackegeInfo)
                .then(response => {
                    this.$message({
                        type: 'info',
                        message: response.data
                    });
                    this.$blockUI.Stop();
                    this.resetForm('PackegeInfo');
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
