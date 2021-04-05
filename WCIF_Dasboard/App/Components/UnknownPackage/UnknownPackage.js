import moment from 'moment';
import AddUnknownPackage from './AddUnknownPackage/AddUnknownPackage.vue';
import AddCustmorPackage from './AddCustmorPackage/AddCustmorPackage.vue';
export default {
    name: 'UnknownPackage',    
    created() {

        this.getUnkownPackage();
        
        
    },

    components: {
        'AddUnknownPackage': AddUnknownPackage,
        'AddCustmorPackage': AddCustmorPackage,
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

            state: 0,

            pageNo: 1,
            pageSize: 15,
            pages: 0,

            unkownPackage: [],
            selectedPackage:[],
        };
    },

    methods: {

        getUnkownPackage(pageNo) {
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }
            this.$blockUI.Start();
            this.$http.getUnkownPackage(this.pageNo, this.pageSize)
                .then(response => {
                    this.$blockUI.Stop();
                    this.unkownPackage = response.data.unkownPackage;
                    this.pages = response.data.count;
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                    this.pages = 0;
                });
        },

        delte(id) {
            this.$confirm('هل أنت متاكد من إتمام عملية الحدف  . استمر؟', 'تـحذير', {
                confirmButtonText: 'نـعم',
                cancelButtonText: 'لا',
                type: 'warning'
            }).then(() => {
                debugger
                this.$http.deleteUnkownPackge(id)
                    .then(response => {
                        this.$message({
                            type: 'info',
                            message: response.data
                        });
                        this.$blockUI.Stop();
                        this.getUnkownPackage();
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

        add(item) {
            this.selectedPackage = item;
            this.state = 1;
        },

        addCustomr(item) {
            this.selectedPackage = item;
            this.state = 2;
        }


    }    
}
