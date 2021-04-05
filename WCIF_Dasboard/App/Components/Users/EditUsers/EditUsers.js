﻿export default {
    name: 'EditUser',    
    created() {
        this.form.FirstName = this.$parent.EditUsersObj.FirstName;
        this.form.LastName = this.$parent.EditUsersObj.LastName;
        this.form.LoginName = this.$parent.EditUsersObj.LoginName;
        this.form.Phone = this.$parent.EditUsersObj.Phone;
        this.form.UserType = this.$parent.EditUsersObj.UserType;
        this.form.Email = this.$parent.EditUsersObj.Email;
        this.form.Gender = this.$parent.EditUsersObj.Gender;
        this.form.DateOfBirth = this.$parent.EditUsersObj.BirthDate;
        this.form.UserId = this.$parent.EditUsersObj.UserId;

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
            isFromSelect: true,
            Users: [],
            state: 0,
            form: {
                LoginName: '',
                Phone: '',
                Password: '',
                FirstName: '',
                LastName: '',
                UserType: '',
                UserType: 0,
                Email: '',
                Gender: 0,
                DateOfBirth: '',                
               
            },
            ConfimPassword: ''
        
        };
    },
    methods: {
        Back() {
            this.$parent.state = 0;
        },
       
        validPhone: function (Phone) {

            var mobileRegex = /^09[1|2|3|4|5][0-9]{7}$/i;

            return mobileRegex.test(Phone);
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

        }, validLastName: function (LastName) {
            var loginArabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
            return loginArabic.test(LastName);
        },

     




        Edit(){

            if (!this.form.Email) {
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال البريد الإلكتروني '
                });
                return;
            } else if (!this.validEmail(this.form.Email)) {
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال البريد الإلكتروني بطريقه صحيحه '
                });
                return;
            }

            if (!this.form.Gender) {
                this.$message({
                    type: 'error',
                    message: 'الرجاء إختيار الجنس '
                });
                return;
            }

            if (!this.form.UserType) {
                this.$message({
                    type: 'error',
                    message: 'الرجاء إختيار نوع المستخدم '
                });
                return;
            }

            if (!this.form.DateOfBirth) {
                this.$message({
                    type: 'error',
                    message: 'الرجاء إختيار تاريخ الميلاد '
                });
                return;
            }


            if (!this.form.Phone) {
                this.$message({
                    type: 'error',
                    message: 'الرجاء رقم الهاتف '
                });
                return;
            } else if (!this.validPhone(this.form.Phone)) {
                this.$message({
                    type: 'error',
                    message: 'الرجاء إدخال رقم الهاتف  بطريقه صحيحه '
                });
                return;
            }
        
           
            console.log(this.form);
            this.$http.editUser(this.form)
                .then(response => {
                    
                    this.$message({
                        type: 'info',
                        message: response.data
                    });
                    this.$parent.EditUsersObj = [];
                    this.$parent.getUser(this.pageNo);
                  this.$parent.state = 0;
                 
                })
                .catch((err) => {
                    this.$message({
                        type: 'error',
                        message: err.response.data
                    });
                });
        }




    }    
}
