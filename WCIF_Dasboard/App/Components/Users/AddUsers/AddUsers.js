﻿export default {
    name: 'AddUser',
    created() {

        this.UserType = [
            {
                id: 1,
                name: "مدير"
            },
            {
                id: 2,
                name: 'مراقب'
            }
        ];
         
    },
    data() {
        return {
            pageNo: 1,
            pageSize: 10,
            pages: 0,

            UserType: [],

            form: {
                LoginName: '',
                Password: null,
                FirstName: '',
                LastName: '',
                UserType: '',
                Email: '',
                Gender: '',
                Phone: '',
                DateOfBirth: '',
                Status: 0,
                SearchByName: false,
            },
            AllData: this.$parent.AllData,
            ConfimPassword: '',
            NID: this.$parent.NID,
            PermissionLable: this.$parent.persmissonLable,
            Hospital: []
        };
    },
    methods: {
        Back() {
            this.$parent.state = 0;
            this.$parent.getUser();
        },


        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validLoginName: function (LoginName) {
            var login = /^[a-zA-Z]{0,40}$/;
            return login.test(LoginName);
        },
        validFirstName: function (FirstName) {
            var loginArabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
            return loginArabic.test(FirstName);
        },
        validLastName: function (LastName) {
            var loginArabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
            return loginArabic.test(LastName);
        },

        validPassword: function (Password) {

            var PasswordT = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,}.*$/;

            return PasswordT.test(Password);
        },
        validPhone: function (Phone) {

            var mobileRegex = /^09[1|2|3|4|5][0-9]{7}$/i;

            return mobileRegex.test(Phone);
        },


        Save() {
            this.$blockUI.Start();

            if (!this.form.LoginName) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الـرجاء إدخال اسم الدخول'
                });
                return;
            } else if (!this.validLoginName(this.form.LoginName)) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال اسم الدخول بطريقه صحيحه '
                });
                return;
            }

            if (!this.form.FirstName) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال الاسم  '
                });
                return;
            } else if (!this.validFirstName(this.form.FirstName)) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال الاسم  بطريقه صحيحه '
                });
                return;
            }
            if (!this.form.LastName) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال اللقب  '
                });
                return;
            } else if (!this.validLastName(this.form.LastName)) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال اللقب  بطريقه صحيحه '
                });
                return;
            }

            if (!this.form.Email) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال البريد الإلكتروني '
                });
                return;
            }
            else if (!this.validEmail(this.form.Email)) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال البريد الإلكتروني بطريقه صحيحه '
                });
                return;
            }

            if (!this.form.Gender) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إختيار الجنس '
                });
                return;
            }

            if (!this.form.Phone) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء رقم الهاتف '
                });
                return;
            } else if (!this.validPhone(this.form.Phone)) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال رقم الهاتف  بطريقه صحيحه '
                });
                return;
            }

            if (!this.form.DateOfBirth) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إختيار تاريخ الميلاد '
                });
                return;
            }

            if (!this.form.Password) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال الرقم السري '
                });
                return;
            }
            if (this.form.Password.length <= 6) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال الرقم السري تحتوي علي سته ارقام '
                });
                return;
            }
            if (!this.validPassword(this.form.Password)) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'عـفوا : يجب ان يحتوي الرقم السري علي حروف صغيرة وكبيرة وارقام'
                });
                return;
            }

            if (!this.ConfimPassword) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال تأكيد الرقم السري '
                });
                return;
            }


            if (this.form.Password != this.ConfimPassword) {
                this.$blockUI.Stop();
                this.$message({
                    type: 'error',
                    message: 'الرجاء التأكد من تطابق الرقم السري'
                });
                return;
            }

            
            this.$http.addUser(this.form)
                .then(response => {
                    this.$parent.state = 0;
                    this.$message({
                        type: 'info',
                        message: response.data
                    });
                    this.$parent.getUser();
                    this.$blockUI.Stop();
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    this.$message({
                        type: 'error',
                        message: err.response.data
                    });
                });
        }




    }
}
