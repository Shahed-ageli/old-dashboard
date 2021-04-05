import moment from 'moment';
import EditPackageInfo from './EditPackageInfo/EditPackageInfo.vue';
export default {
    name: 'Customers',    
    created() {


        this.GetPackeges();


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

        //this.PackagesCheck();
        
    },
    components: {
        'EditPackageInfo': EditPackageInfo,
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

          
            PackegesType: [],
            TypeSelected:'',
            Packeges: [],
            pageNo: 1,
            pageSize: 10,
            pages: 0,  
            state: 0,  
            SelectedPackege:'',
          
        };
    },
    methods: {

        formatNumber(num) {
            if (isNaN(num)) {
                return 0;
            }
            else {
                return num.toFixed(4);
            }
        },

        GetPackeges(pageNo) {
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }

            this.$blockUI.Start();
            this.$http.GetPackeges(this.pageNo, this.pageSize, this.TypeSelected)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Packeges = response.data.packeges;
                    this.pages = response.data.count;

                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                    this.pages = 0;
                });

        },

        ViewPartner(item) {
            this.SelectedPackege = item;
            this.state = 2;
        },


        DeletePackge(id) {
            this.$confirm('سيؤدي ذلك إلى حدف الباقة  . استمر؟', 'تـحذير', {
                confirmButtonText: 'نـعم',
                cancelButtonText: 'لا',
                type: 'warning'
            }).then(() => {
                this.$http.DeletePackge(id)
                    .then(response => {
                        this.$message({
                            type: 'info',
                            message: response.data
                        });
                        this.GetPackeges();
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


    }   
}
