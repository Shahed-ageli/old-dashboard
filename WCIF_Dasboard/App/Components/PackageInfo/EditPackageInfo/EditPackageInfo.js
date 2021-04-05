import moment from 'moment';
export default {
    name: 'AddCustomers',    
    created() {

        
        this.PackegeInfo = this.$parent.SelectedPackege;


      

    },
   
    data() {
        return {

            PackegeInfo: {
                id:'',
                name:'',
                smsCount:'',
                price:'',
            },



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

        back() {
            this.$parent.GetPackeges();
            this.$parent.state=0;
        },


        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editPackegeInfo();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


        },

        editPackegeInfo() {

            this.$confirm('سيؤدي ذلك إلى تعديل بيانات الباقة  . استمر؟', 'تـحذير', {
                confirmButtonText: 'نـعم',
                cancelButtonText: 'لا',
                type: 'warning'
            }).then(() => {


                this.$http.EditPackegeInfo(this.PackegeInfo)
                    .then(response => {
                        this.$message({
                            type: 'info',
                            message: response.data
                        });
                        this.back();
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



















        //ChangDivStyle(divNumber) {
        //    if (divNumber == 1) {
        //        this.baseStyles.transform = 'translate3d(0px, 0px, 0px)';
        //        this.icons = 'nc-icon nc-single-02';
        //        this.iconsHont ='البيانات الشخصية'
        //        this.currentPage=0;
        //    } else if (divNumber == 2) {
        //        this.baseStyles.transform = 'translate3d(-434.443px, 0px, 0px)';
        //        this.icons = 'nc-icon nc-layout-11';
        //        this.iconsHont = 'الباقات'
        //        this.currentPage=1;
        //    } else {
        //        this.baseStyles.transform = 'translate3d(-878.887px, 0px, 0px)';
        //        this.icons = 'nc-icon nc-simple-add';
        //        this.iconsHont = 'إضافة باقة'
        //        this.currentPage=2;
        //    }
        //},

        //allowEdit() {
        //    this.EditInfo = 1;
        //},

        //canselEdit() {
        //    this.EditInfo = 0;
        //},

        //addPackage()
        //{
        //    this.serviceInfo.to = this.serviceInfo.from;
        //    //this.to=this.from;
        //    this.$http.AddCustomorPackage(this.serviceInfo)
        //        .then(response => {
        //            //this.$parent.state = 0;
        //            this.$message({
        //                type: 'info',
        //                message: response.data
        //            });
        //            this.$blockUI.Stop();
        //            this.resetForm('serviceInfo');
        //            this.getPakegeByState(1, 1);
        //        })
        //        .catch((err) => {
        //            this.$blockUI.Stop();
        //            this.$message({
        //                type: 'error',
        //                message: err.response.data
        //            });
        //        });
        //},

        //changeCurrentState(index)
        //{
        //    if(index==1)
        //    {
        //        this.currentState=1;
        //    }else if(index==2)
        //    {
        //        this.currentState=2;
        //    }
        //    else if(index==3)
        //    {
        //        this.currentState=3;
        //    } else if (index == 4) {
        //        this.currentState = 4;
        //    }
        //},

        //showSMSInfo()
        //{
        //    this.SMSInfoDialog=true;
        //},

        //showStopSMSDialog(item)
        //{
        //    this.StopSMSServiceDialog = true;
        //    this.selectedPackege = item;
        //},

        //showReloadDialog(item)
        //{
        //    this.selectedPackege = item;
        //    this.ReloadServiceDialog=true;
        //},

        

        //getPakegeByState(pageNo, state) {
        //    //state
        //    //1 active
        //    //2 not active code
        //    //3 stoped
        //    //9 delete
        //    this.ActivePageNo = pageNo;
        //    if (this.ActivePageNo === undefined) {
        //        this.ActivePageNo = 1;
        //    } 

        //    this.$blockUI.Start();
        //    this.$http.getPakegeByState(this.ActivePageNo, this.ActivePageSize, this.custmor.customerId, state)//this.$parent.SuperPackageParent.superPackageId
        //        .then(response => {
        //            this.$blockUI.Stop();
        //            if (state == 1) {
        //                this.activePackges = response.data.packeges;
        //                this.ActivePages = response.data.count;
        //            } else if (state == 2) {
        //                this.notactivePackges = response.data.packeges;
        //                this.notActivePages = response.data.count;
        //            } else if (state == 3) {
        //                this.stoppedPackges = response.data.packeges;
        //                this.stoppedPages = response.data.count;
        //            }
        //        })
        //        .catch((err) => {
        //            this.$blockUI.Stop();
        //            console.error(err);
        //            this.ActivePages = 0;
        //        });

        //},

        //getHistoryPackges(pageNo, selectedHCodPack) {
        //    this.historyPageNo = pageNo;
        //    if (this.historyPageNo === undefined) {
        //        this.historyPageNo = 1;
        //    }
        //    this.$blockUI.Start();
        //    this.$http.GetHistoryPackges(this.historyPageNo, this.historyPageSize, this.custmor.customerId, selectedHCodPack, this.SearchTypeSelected)//this.$parent.SuperPackageParent.superPackageId
        //        .then(response => {
        //            this.$blockUI.Stop();
        //            this.historyPackges = response.data.packeges;
        //            this.historyPages = response.data.count;
        //        })
        //        .catch((err) => {
        //            this.$blockUI.Stop();
        //            console.error(err);
        //            this.ActivePages = 0;
        //        });

        //},

        //rechargeService() {
        //    this.$blockUI.Start();
        //    this.$http.rechargeService(this.selectedPackege.id, this.ReloadserviceInfo)
        //        .then(response => {
        //            //this.$parent.state = 0;
        //            this.$message({
        //                type: 'info',
        //                message: response.data
        //            });
        //            this.$blockUI.Stop();
        //            this.getPakegeByState(1, 1);
        //            this.getPakegeByState(1, 2);
        //            this.getHistoryPackges();
        //            this.ReloadServiceDialog = false;
        //        })
        //        .catch((err) => {
        //            this.$blockUI.Stop();
        //            this.$message({
        //                type: 'error',
        //                message: err.response.data
        //            });
        //        });
        //},

        //cansel() {
        //    this.$parent.getCustomers();
        //    this.$parent.state = 0;
            
        //},

        //canselStoped() {
        //    this.StopSMSServiceDialog = false;
        //},

        //stopServeice() {
        //    if (!this.stopResone) {
        //        this.$message({
        //            type: 'info',
        //            message: 'الرجاء إدخال سبب الإيقاف'
        //        });
        //        return;
        //    }
        //    this.$http.stopServeice(this.selectedPackege.id, this.stopResone)
        //        .then(response => {
        //            this.$message({
        //                type: 'info',
        //                message: response.data
        //            });
        //            this.$blockUI.Stop();
        //            this.StopSMSServiceDialog = false;
        //            this.getPakegeByState(1, 1);
        //            this.getPakegeByState(1, 2);
        //            this.getPakegeByState(1, 3);
        //        })
        //        .catch((err) => {
        //            this.$blockUI.Stop();
        //            this.$message({
        //                type: 'error',
        //                message: err.response.data
        //            });
        //        });
        //},

        //backService(item) {


        //    this.$confirm('سيؤدي ذلك إلى إعادة تشغيل الباقة  . استمر؟', 'تـحذير', {
        //        confirmButtonText: 'نـعم',
        //        cancelButtonText: 'لا',
        //        type: 'warning'
        //    }).then(() => {


        //        this.$http.backServeice(item.id)
        //            .then(response => {
        //                this.$message({
        //                    type: 'info',
        //                    message: response.data
        //                });
        //                this.$blockUI.Stop();
        //                this.getPakegeByState(1, 1);
        //                this.getPakegeByState(1, 2);
        //                this.getPakegeByState(1, 3);
        //            })
        //            .catch((err) => {
        //                this.$blockUI.Stop();
        //                this.$message({
        //                    type: 'error',
        //                    message: err.response.data
        //                });
        //            });
        //    });
        //},

        ////method 
        ////1 add pakege
        ////2 edit customr info
        ////3 recharge packge
        

        //resetForm(formName) {
        //    this.$refs[formName].resetFields();
        //},

        //getHistoryCodesPackges(id) {
            
        //    this.$blockUI.Start();
        //    this.$http.getHistoryCodesPackges(id)
        //        .then(response => {
        //            this.$blockUI.Stop();
        //            this.historyCodesPackges = response.data.historyCodesPackges;
        //        })
        //        .catch((err) => {
        //            this.$blockUI.Stop();
        //            console.error(err);
        //        });
        //},
    }    
}


