import moment from 'moment';
export default {
    name: 'AddCustmorPackage',    
    created() {
        this.packegeSelected = this.$parent.selectedPackage;
        this.customersInfo.UnknownNumberId = this.packegeSelected.id;
        var isnum = /^\d+$/.test(this.$parent.selectedPackage.code);
        if (isnum) {
            this.customersInfo.code = this.$parent.selectedPackage.code;
        } else {
            this.customersInfo.serviceName = this.$parent.selectedPackage.code;
        }
        this.customersInfo.countUseMassage = this.$parent.selectedPackage.count;
        
        
    },
     
    components: {
    },

    filters: {
        moment: function (date)
        {
            if (date === null) {
                return "فارغ";
            }
            return moment(date).format('MMMM Do YYYY');
        }
    },

    data() {

        return {

            packegeSelected:[],
            customersInfo: {
                UnknownNumberId:'',
                custmorId: 0,
                name: '',
                phone: '',
                date: '',
                email: '',
                companyName: '',
                companyAddress: '',
                serviceName: '',
                code: '',
                amount: '',
                countMassage: '',
                from: '',
                to: '',
                discriptions: '',
                countUseMassage: '',

            },
        };
    },

    methods: {

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addCustomor();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


        },

        addCustomor() {
            this.$blockUI.Start();
            this.$http.AddOldCustomor(this.customersInfo)
                .then(response => {
                    this.$parent.state = 0;
                    this.$message({
                        type: 'info',
                        message: response.data
                    });
                    this.$blockUI.Stop();
                    this.resetForm('customersInfo');
                    this.$parent.getUnkownPackage();
                    this.$parent.state = 0;
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
            this.$parent.getUnkownPackage();
            this.$parent.state = 0;

        },



        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }    
}
