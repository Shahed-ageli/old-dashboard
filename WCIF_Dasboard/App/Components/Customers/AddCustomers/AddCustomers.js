export default {
    name: 'AddCustomers',    
    created() {

        
    },
   
    data() {
        return {


            PartnerInfo: {
                companyName: '',
                phone: '',
                externalPhone: '',
                email: '',
                fax: '-',
                licenseNumber: '-',
                packegeCount: '',
            },
















            //customersInfo: {
            //    custmorId: 0,
            //    name: '',
            //    phone: '',
            //    date: '',
            //    email: '',
            //    companyName: '',
            //    companyAddress: '',
            //    serviceName: '',
            //    code: '',
            //    amount: '',
            //    countMassage: '',
            //    from: '',
            //    to: '',
            //    discriptions: '',
            //    isShared:true,
                
            //},
        };
    },
    methods: {

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AddPartner();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


        },

        AddPartner() {
            this.$blockUI.Start();
            this.$http.AddPartner(this.PartnerInfo)
                .then(response => {
                    this.$message({
                        type: 'info',
                        message: response.data
                    });
                    this.$blockUI.Stop();
                    this.resetForm('PartnerInfo');
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    this.$message({
                        type: 'error',
                        message: err.response.data
                    });
                });



            
        },

        cansel() {
            this.$parent.getCustomers();
            this.$parent.state = 0;
            
        },



        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }    
}
