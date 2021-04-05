import addCategory from './AddCategory/AddCategory.vue';
import editCategory from './EditCategory/EditCategory.vue';
import moment from 'moment';

export default {
    name: 'Category',
    created() {

        this.SearchType = [
            {
                id: 1,
                name: "الإسم"
            },
            {
                id: 2,
                name: 'رقم الخدمة'
            }, {
                id: 3,
                name: "الحالة"
            }


        ];

        this.pakegeStatus = [
            {
                id: 1,
                name: "Active"
            },
            {
                id: 2,
                name: 'Not Active'
            }, {
                id: 3,
                name: "Done"
            }


        ];

        this.getCategory();

    },
    components: {
        'add-Category': addCategory,
        'edit-Category': editCategory
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
            pageNo: 1,
            pageSize: 10,
            pages: 0,
            state: 0,
            categories:[],

            EditCategoryObj: [],
        };
    },
    methods: {

         

        getCategory(pageNo) {
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }
            
            this.$blockUI.Start();
            this.$http.getCategory()//this.pageNo, this.pageSize    this.$parent.SuperPackageParent.superPackageId
                .then(response => {
                    debugger

                    if (response.data == "Please Login again !!")
                    {
                        window.location.href = '/Security/Login';
                    }

                    this.$blockUI.Stop();
                    this.categories = response.data;

                    //response.data.forEach((item, index) => {
                    //    this.users.push(item);
                    //});
                    //this.pages = response.data.count;
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    console.error(err);
                    this.pages = 0;
                });

        },

        addCategory() {
            this.state = 1;
        },

        EditCategory(Category) {
            this.state = 2;
            this.EditCategoryObj = Category;

        },

        DeactivateCategory(CategoryId) {


            this.$confirm('سيؤدي ذلك إلى ايقاف تفعيل الفئة  . استمر؟', 'تـحذير', {
                confirmButtonText: 'نـعم',
                cancelButtonText: 'لا',
                type: 'warning'
            }).then(() => {


                this.$http.DeactivateCategory(CategoryId)
                    .then(response => {
                        if (this.categories.lenght === 1) {
                            this.pageNo--;
                            if (this.pageNo <= 0) {
                                this.pageNo = 1;
                            }
                        }
                        this.$message({
                            type: 'info',
                            message: 'تم ايقاف التفعيل الفئة بنجاح',
                        });
                        this.getCategory();
                    })
                    .catch((err) => {
                        this.$message({
                            type: 'error',
                            message: err.response.data
                        });
                    });
            });
        },

        ActivateCategory(CategoryId) {

            this.$confirm('سيؤدي ذلك إلى تفعيل الفئة  . استمر؟', 'تـحذير', {
                confirmButtonText: 'نـعم',
                cancelButtonText: 'لا',
                type: 'warning'
            }).then(() => {


                this.$http.ActivateCategory(CategoryId)
                    .then(response => {
                        if (this.categories.lenght === 1) {
                            this.pageNo--;
                            if (this.pageNo <= 0) {
                                this.pageNo = 1;
                            }
                        }
                        this.$message({
                            type: 'info',
                            message: 'تم تفعيل الفئة بنجاح',
                        });
                        this.getCategory();
                    })
                    .catch((err) => {
                        this.$message({
                            type: 'error',
                            message: err.response.data
                        });
                    });
            });

        },

        delteCategory(CategoryId) {

            this.$confirm('سيؤدي ذلك إلى حدف الفئة  . استمر؟', 'تـحذير', {
                confirmButtonText: 'نـعم',
                cancelButtonText: 'لا',
                type: 'warning'
            }).then(() => {


                this.$http.delteCategory(CategoryId)
                    .then(response => {
                        if (this.categories.lenght === 1) {
                            this.pageNo--;
                            if (this.pageNo <= 0) {
                                this.pageNo = 1;
                            }
                        }
                        this.$message({
                            type: 'info',
                            message: 'تم حدف الفئة بنجاح',
                        });
                        this.getCategory();
                    })
                    .catch((err) => {
                        this.$message({
                            type: 'error',
                            message: err.response.data
                        });
                    });
            });

        },
    }
}
