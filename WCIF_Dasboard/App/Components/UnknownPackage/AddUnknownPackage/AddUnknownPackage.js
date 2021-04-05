import moment from 'moment';
export default {
    name: 'AddUnknownPackage',    
    created() {

        this.getCustomers();
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
            custmors: [],
            customersInfo:
            {
                UnknownNumberId:'',
                custmorId: '',
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
                    this.addPackage();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


        },

        addPackage() {

            this.$blockUI.Start();
            this.$http.AddOldPackage(this.customersInfo)
                .then(response => {

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

        getCustomers() {

            this.$blockUI.Start();
            this.$http.GetCustomers()//this.$parent.SuperPackageParent.superPackageId
                .then(response => {
                    this.$blockUI.Stop();
                    this.custmors = response.data.custmor;
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                    this.pages = 0;
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
