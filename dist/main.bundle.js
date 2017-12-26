webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/add-dhana/add-dhana.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/add-dhana/add-dhana.component.html":
/***/ (function(module, exports) {

module.exports = "<hr>\n<h1>Add Dhana Event</h1>\n<hr>\n<div class=\"col-md-4\">\n</div>\n\n<div class=\"container\"  *ngIf=\"!name; else forminfo\">\n<form [formGroup]=\"rForm\" (ngSubmit)=\"addDhana(rForm.value)\"> \n     <div class=\"col-md-4 text-left\">\n\n        <div class=\"row form-group\">\n          <label for=\"fName\">First Name</label>\n          <input formControlName=\"firstName\" type=\"text\" class=\"form-control\" id=\"fName\" placeholder=\"Enter First Name\">\n          <div class=\"alert alert_animation alert-danger\" *ngIf=\"!rForm.controls['firstName'].valid && rForm.controls['firstName'].touched\">{{ requiredAlert }}</div>\n\n        </div>\n        <div class=\"row form-group\">\n          <label for=\"payee\">Last Name</label>\n          <input  type=\"text\" class=\"form-control\" formControlName=\"lastName\" id=\"lName\" placeholder=\"Enter Last Name\">\n          <div class=\"alert alert_animation alert-danger\" *ngIf=\"!rForm.controls['lastName'].valid && rForm.controls['lastName'].touched\">{{ requiredAlert }}</div>\n\n        </div>\n        <div class=\"row form-group\">\n          <label for=\"payee\">Email</label>\n          <input type=\"text\" class=\"form-control\" id=\"email\" formControlName=\"email\" placeholder=\"Enter Email Adress\">\n          <div class=\"alert alert_animation alert-danger\" *ngIf=\"!rForm.controls['email'].valid && rForm.controls['email'].touched\">{{ validEmailAlert }}</div>\n\n        </div>\n        <div class=\"row form-group\">\n            <label for=\"mobile\">Mobile Number</label>\n            <input type=\"text\" class=\"form-control\" id=\"mobile\" formControlName=\"mobile\" placeholder=\"Enter Mobile Number\">\n            <div class=\"alert alert_animation alert-danger\" *ngIf=\"!rForm.controls['mobile'].valid && rForm.controls['mobile'].touched\">{{ validMobilelAlert }}</div>\n\n          </div>\n        \n        <div class=\"row form-group\">\n          <label for=\"day\">Day of the Month</label>\n          <select formControlName=\"dayOfMonth\">\n              <option *ngFor=\"let x of days\" value=\"{{x}}\">{{x}}</option>\n            </select>\n        </div>\n        <div class=\"row form-group\">\n          <label for=\"type\">Special Notes</label>\n          <textarea formControlName=\"specialNotes\" name=\"specialNotes\" type=\"text\" class=\"form-control\" id=\"type\" placeholder=\"Enter Any special note\"></textarea>\n        </div>\n        <div class=\"col-md-4\">\n        </div>\n        <div class=\"form-group\" class=\"col-md-8\">\n          <div class=\"col-md-4\">\n              <button type=\"submit\" name=\"btn_register\" class=\"btn btn-primary\" [disabled]=\"!rForm.valid\">Add</button>\n          </div>\n          <div class=\"col-md-4\">\n          <button type=\"button\" class=\"btn btn-default\">Cancel</button>\n          </div>\n        </div>\n      \n        <div class=\"col-md-4\">\n        </div>\n      </div>\n\n    \n\n    </form>\n\n </div>\n<div class=\"col-md-4\">\n</div>\n\n<div class=\"alert alert-success col-md-12\"  *ngIf=\"reminderAddResult\">\n  <strong>Success!</strong> Reminder added succesfully. <a href=\"{{eventLink}}\" target=\"_blank\">Click Here</a> to view the event. \n</div>\n<div class=\"alert alert-danger col-md-12\"  *ngIf=\"reminderAddResult!==undefined && reminderAddResult==false\">\n  <strong>Failed!</strong> {{errorMessage}}\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/add-dhana/add-dhana.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddDhanaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_dhana_service__ = __webpack_require__("../../../../../src/app/services/dhana.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_DhanaRequest__ = __webpack_require__("../../../../../src/app/models/DhanaRequest.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddDhanaComponent = (function () {
    function AddDhanaComponent(dhanaService, fb) {
        this.dhanaService = dhanaService;
        this.fb = fb;
        this.dayOfMonth = 5;
        this.requiredAlert = "*This field is required";
        this.validEmailAlert = "* Valid email address required";
        this.validMobilelAlert = "* Valid mobile number required";
        this.reminderAddResult = undefined;
        this.eventLink = '';
        var d = [];
        for (var i = 1; i < 32; i++) {
            d.push(i);
        }
        this.days = d;
        this.rForm = this.fb.group({
            'firstName': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required],
            'lastName': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required],
            'email': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].email])],
            'mobile': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].maxLength(10)])],
            'dayOfMonth': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required],
            'specialNotes': ''
        });
    }
    AddDhanaComponent.prototype.ngOnInit = function () {
    };
    AddDhanaComponent.prototype.addDhana = function (post) {
        var _this = this;
        var self = this;
        self.firstName = post.firstName;
        self.lastName = post.lastName;
        self.email = post.email;
        self.mobile = post.mobile;
        self.dayOfMonth = post.dayOfMonth;
        self.specialNotes = post.specialNotes;
        console.log(post);
        console.log(this.firstName);
        this.dhanaService
            .addDhana(new __WEBPACK_IMPORTED_MODULE_2__models_DhanaRequest__["a" /* ReccurringDhanaRequest */](this.firstName, this.lastName, this.email, this.mobile, this.specialNotes, this.dayOfMonth))
            .then(function (data) {
            console.log(data);
            console.log(data.htmlLink);
            console.log(_this);
            self.eventLink = data.htmlLink;
            if (data.status !== undefined && data.status == 'confirmed') {
                console.log("Event successfully created");
                self.reminderAddResult = true;
            }
        }).catch(function (err) {
            console.log(err);
            console.log(err.status);
            console.log(err.error[0].summary);
            if (err.status == 403) {
                self.errorMessage = "Dhana slot is already taken." + err.error[0].summary;
            }
            else {
                self.errorMessage = "Error occured while adding dhana slot. May be it is already taken";
            }
            self.reminderAddResult = false;
        });
    };
    AddDhanaComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-add-dhana',
            template: __webpack_require__("../../../../../src/app/add-dhana/add-dhana.component.html"),
            styles: [__webpack_require__("../../../../../src/app/add-dhana/add-dhana.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_dhana_service__["a" /* DhanaService */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
    ], AddDhanaComponent);
    return AddDhanaComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_dhana_add_dhana_component__ = __webpack_require__("../../../../../src/app/add-dhana/add-dhana.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dhana_request_dhana_request_component__ = __webpack_require__("../../../../../src/app/dhana-request/dhana-request.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dhana_approval_dhana_approval_component__ = __webpack_require__("../../../../../src/app/dhana-approval/dhana-approval.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: 'dhana/add', component: __WEBPACK_IMPORTED_MODULE_2__add_dhana_add_dhana_component__["a" /* AddDhanaComponent */] },
    { path: 'dhana/request', component: __WEBPACK_IMPORTED_MODULE_3__dhana_request_dhana_request_component__["a" /* DhanaRequestComponent */] },
    { path: 'dhana/approve', component: __WEBPACK_IMPORTED_MODULE_4__dhana_approval_dhana_approval_component__["a" /* DhanaApprovalComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    NC Buddhist Vihara Dhana Management System\n  </h1>\n  <div class=\"\">\n  <router-outlet></router-outlet>\n</div>\n</div>\n "

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Dhana Calender';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_dhana_service__ = __webpack_require__("../../../../../src/app/services/dhana.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_dhana_add_dhana_component__ = __webpack_require__("../../../../../src/app/add-dhana/add-dhana.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dhana_request_dhana_request_component__ = __webpack_require__("../../../../../src/app/dhana-request/dhana-request.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dhana_approval_dhana_approval_component__ = __webpack_require__("../../../../../src/app/dhana-approval/dhana-approval.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__add_dhana_add_dhana_component__["a" /* AddDhanaComponent */],
                __WEBPACK_IMPORTED_MODULE_7__dhana_request_dhana_request_component__["a" /* DhanaRequestComponent */],
                __WEBPACK_IMPORTED_MODULE_8__dhana_approval_dhana_approval_component__["a" /* DhanaApprovalComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_forms__["c" /* ReactiveFormsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_3__services_dhana_service__["a" /* DhanaService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/dhana-approval/dhana-approval.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dhana-approval/dhana-approval.component.html":
/***/ (function(module, exports) {

module.exports = "\n<hr>\n<div class=\"container\">\n    <div class=\"col-md-4\"></div>\n    <form [formGroup]=\"rForm\">\n    <div class=\"col-md-4 text-left\">\n\n\n       <div class=\"form-group col-md-12\">\n         <div class=\"col-md-6\">\n             <button name=\"btn_register\" class=\"btn btn-success\" (click)=\"approve(rForm.value)\">Approve</button>\n         </div>\n         <div class=\"col-md-6\">\n         <button type=\"button\" class=\"btn btn-danger\" (click)=\"reject(rForm.value)\">Reject</button>\n         </div>\n       </div>\n       <div class=\"row form-group col-md-12 text-center\">\n          <label for=\"type\">Message to Requester</label>\n          <textarea formControlName=\"specialNotes\" type=\"text\" (focus)=\"showMessage=false\" class=\"form-control\" id=\"type\" placeholder=\"Please be kind enough to mention the reason in case you reject the request\"></textarea>\n          <div class=\"alert alert_animation alert-danger\" *ngIf=\"showMessage\">Special Note is required when rejecting the request.</div>\n\n        </div>\n       <div class=\"col-md-4\">\n       </div>\n     </div>\n    </form>\n     <div class=\"col-md-4\"></div>\n     <div class=\"alert alert-success col-md-12\"  *ngIf=\"result==true\">\n      <strong>Success!</strong> {{noticeType}} notice sent successfully. \n    </div>\n    <div class=\"alert alert-danger col-md-12\"  *ngIf=\"result!==undefined && result==false\">\n      <strong>Failed!</strong> Error occured while sending the notice.\n    </div>\n    \n</div>"

/***/ }),

/***/ "../../../../../src/app/dhana-approval/dhana-approval.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DhanaApprovalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_dhana_service__ = __webpack_require__("../../../../../src/app/services/dhana.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DhanaApprovalComponent = (function () {
    function DhanaApprovalComponent(route, dhanaService, fb) {
        this.route = route;
        this.dhanaService = dhanaService;
        this.fb = fb;
        this.rForm = this.fb.group({
            'specialNotes': ''
        });
    }
    DhanaApprovalComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("init");
        this.route.queryParamMap.forEach(function (data) {
            console.log(data.get("key"));
            _this.key = data.get("key");
        });
    };
    DhanaApprovalComponent.prototype.approve = function (formData) {
        var _this = this;
        console.log("Approved: " + this.key);
        this.dhanaService.approveDhana(this.key).then(function (data) {
            _this.noticeType = "Approval";
            _this.result = true;
            console.log(data);
        })
            .catch(function (err) {
            console.log(err);
            _this.result = false;
        });
    };
    DhanaApprovalComponent.prototype.reject = function (formData) {
        var _this = this;
        if (formData.specialNotes.length === 0) {
            console.log("true");
            this.showMessage = true;
        }
        else {
            this.showMessage = false;
            this.dhanaService.rejectDhana(this.key, formData.specialNotes).then(function (data) {
                _this.noticeType = "Notice";
                _this.result = true;
            }).catch(function (err) {
                _this.result = false;
            });
        }
        console.log("Rejected:" + this.key);
        console.log(formData.specialNotes.length);
    };
    DhanaApprovalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-dhana-approval',
            template: __webpack_require__("../../../../../src/app/dhana-approval/dhana-approval.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dhana-approval/dhana-approval.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__services_dhana_service__["a" /* DhanaService */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
    ], DhanaApprovalComponent);
    return DhanaApprovalComponent;
}());



/***/ }),

/***/ "../../../../../src/app/dhana-request/dhana-request.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dhana-request/dhana-request.component.html":
/***/ (function(module, exports) {

module.exports = "\n<button name=\"btn_view_cal\" class=\"btn btn-success \" (click)=\"viewCal= (!viewCal)\">View/Hide Calender</button>\n\n<div *ngIf=\"viewCal\">\n<iframe src=\"https://calendar.google.com/calendar/embed?src=jfktuipfgori7d3ate1he3t8nc%40group.calendar.google.com&ctz=America%2FNew_York\" style=\"border: 0\" width=\"800\" height=\"600\" frameborder=\"0\" scrolling=\"no\"></iframe>\n</div>\n<hr>\n<h1>Dhana Request Form</h1>\n<div class=\"container\"  *ngIf=\"!name; else forminfo\">\n    <div class=\"col-md-4\"></div>\n    <form [formGroup]=\"rForm\" (ngSubmit)=\"requestDhana(rForm.value)\"> \n\n    <div class=\"col-md-4 text-left\">\n        <div class=\"row form-group\">\n            <label for=\"fName\">First Name</label>\n            <input formControlName=\"firstName\" type=\"text\" class=\"form-control\" id=\"fName\" placeholder=\"Enter First Name\">\n            <div class=\"alert alert_animation alert-danger\" *ngIf=\"!rForm.controls['firstName'].valid && rForm.controls['firstName'].touched\">{{ requiredAlert }}</div>\n  \n          </div>\n          <div class=\"row form-group\">\n            <label for=\"payee\">Last Name</label>\n            <input  type=\"text\" class=\"form-control\" formControlName=\"lastName\" id=\"lName\" placeholder=\"Enter Last Name\">\n            <div class=\"alert alert_animation alert-danger\" *ngIf=\"!rForm.controls['lastName'].valid && rForm.controls['lastName'].touched\">{{ requiredAlert }}</div>\n  \n          </div>\n          <div class=\"row form-group\">\n            <label for=\"payee\">Email</label>\n            <input type=\"text\" class=\"form-control\" id=\"email\" formControlName=\"email\" placeholder=\"Enter Email Adress\">\n            <div class=\"alert alert_animation alert-danger\" *ngIf=\"!rForm.controls['email'].valid && rForm.controls['email'].touched\">{{ validEmailAlert }}</div>\n  \n          </div>\n          <div class=\"row form-group\">\n              <label for=\"mobile\">Mobile Number</label>\n              <input type=\"text\" class=\"form-control\" id=\"mobile\" formControlName=\"mobile\" placeholder=\"Enter Mobile Number\">\n              <div class=\"alert alert_animation alert-danger\" *ngIf=\"!rForm.controls['mobile'].valid && rForm.controls['mobile'].touched\">{{ validMobilelAlert }}</div>\n  \n            </div>\n     \n       <div class=\"row form-group\">\n         <label for=\"day\">Date</label>\n         <input  type=\"date\"  formControlName=\"date\">\n         <div class=\"alert alert_animation alert-danger\" *ngIf=\"!rForm.controls['date'].valid && rForm.controls['date'].touched\">{{ requiredAlert }}</div>\n\n\n       </div>\n        <div class=\"row form-group\">\n         <label for=\"type\">Special Notes</label>\n         <textarea formControlName=\"specialNotes\" type=\"text\" class=\"form-control\" id=\"type\" placeholder=\"Enter Any special note\"></textarea>\n       </div>\n       <div class=\"col-md-4\">\n       </div>\n       <div class=\"form-group\" class=\"col-md-12\">\n         <div class=\"col-md-6\">\n             <button type=\"submit\" name=\"btn_register\" class=\"btn btn-primary\" [disabled]=\"!rForm.valid\">Request</button>\n         </div>\n         <div class=\"col-md-6\">\n         <button type=\"button\" class=\"btn btn-default\">Cancel</button>\n         </div>\n       </div>\n     \n       <div class=\"col-md-4\">\n       </div>\n     </div>\n</form>\n     \n     <div class=\"col-md-4\"></div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/dhana-request/dhana-request.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DhanaRequestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_dhana_service__ = __webpack_require__("../../../../../src/app/services/dhana.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_DhanaRequest__ = __webpack_require__("../../../../../src/app/models/DhanaRequest.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DhanaRequestComponent = (function () {
    function DhanaRequestComponent(dhanaService, fb) {
        this.dhanaService = dhanaService;
        this.fb = fb;
        this.requiredAlert = "*This field is required";
        this.validEmailAlert = "* Valid email address required";
        this.validMobilelAlert = "* Valid mobile number required";
        this.date = new Date();
        this.reminderAddResult = undefined;
        this.eventLink = '';
        this.rForm = this.fb.group({
            'firstName': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            'lastName': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            'email': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].email])],
            'mobile': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(10)])],
            'date': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            'specialNotes': ''
        });
    }
    DhanaRequestComponent.prototype.ngOnInit = function () {
    };
    DhanaRequestComponent.prototype.requestDhana = function (post) {
        var _this = this;
        var self = this;
        self.firstName = post.firstName;
        self.lastName = post.lastName;
        self.email = post.email;
        self.mobile = post.mobile;
        self.date = post.date;
        self.specialNotes = post.specialNotes;
        console.log(post);
        this.dhanaService
            .requestDhana(new __WEBPACK_IMPORTED_MODULE_3__models_DhanaRequest__["b" /* UpdateDhanaRequest */](this.firstName, this.lastName, this.email, this.mobile, this.specialNotes, this.date))
            .then(function (data) {
            console.log(data);
            console.log(data.htmlLink);
            console.log(_this);
            self.eventLink = data.htmlLink;
            if (data.status !== undefined && data.status == 'confirmed') {
                console.log("Event successfully created");
                self.reminderAddResult = true;
            }
        }).catch(function (err) {
            console.log(err);
            console.log(err.status);
            console.log(err.error[0].summary);
            if (err.status == 403) {
                self.errorMessage = "Dhana slot is already taken." + err.error[0].summary;
            }
            else {
                self.errorMessage = "Error occured while adding dhana slot. May be it is already taken";
            }
            self.reminderAddResult = false;
        });
    };
    DhanaRequestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-dhana-request',
            template: __webpack_require__("../../../../../src/app/dhana-request/dhana-request.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dhana-request/dhana-request.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_dhana_service__["a" /* DhanaService */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
    ], DhanaRequestComponent);
    return DhanaRequestComponent;
}());



/***/ }),

/***/ "../../../../../src/app/models/DhanaRequest.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DhanaRequest */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReccurringDhanaRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UpdateDhanaRequest; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DhanaRequest = (function () {
    function DhanaRequest(firstName, lastName, email, mobile, specialNotes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.specialNotes = specialNotes;
    }
    DhanaRequest.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
    };
    return DhanaRequest;
}());

var ReccurringDhanaRequest = (function (_super) {
    __extends(ReccurringDhanaRequest, _super);
    function ReccurringDhanaRequest(fName, lname, _email, _mobile, _specialNotes, _dayofMonth) {
        var _this = _super.call(this, fName, lname, _email, _mobile, _specialNotes) || this;
        _this.dayOfMonth = _dayofMonth;
        return _this;
    }
    return ReccurringDhanaRequest;
}(DhanaRequest));

var UpdateDhanaRequest = (function (_super) {
    __extends(UpdateDhanaRequest, _super);
    function UpdateDhanaRequest(fName, lname, _email, _mobile, _specialNotes, _date) {
        var _this = _super.call(this, fName, lname, _email, _mobile, _specialNotes) || this;
        _this.date = _date;
        return _this;
    }
    return UpdateDhanaRequest;
}(DhanaRequest));



/***/ }),

/***/ "../../../../../src/app/services/dhana.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DhanaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var am_11 = 60 * 60 * 11 * 1000;
var pm_1 = 60 * 60 * 13 * 1000;
var DhanaService = (function () {
    function DhanaService(http) {
        this.http = http;
    }
    DhanaService.prototype.addDhana = function (request) {
        var baseDate = new Date("2018-01-" + request.dayOfMonth);
        var startDate = new Date(baseDate.getTime() + am_11);
        var endDate = new Date(baseDate.getTime() + pm_1);
        var fullName = request.getFullName();
        var event = {
            'metaData': request,
            'googleCalenderEvent': {
                "summary": fullName,
                "location": "temple",
                "description": fullName,
                "start": {
                    "dateTime": startDate.toISOString(),
                    'timeZone': 'America/New_York'
                },
                "end": {
                    "dateTime": endDate.toISOString(),
                    'timeZone': 'America/New_York'
                },
                "recurrence": [
                    "RRULE:FREQ=MONTHLY;BYMONTHDAY=" + request.dayOfMonth + ";INTERVAL=1"
                ]
            }
        };
        return this.http.put('/calender/event', event).toPromise();
    };
    DhanaService.prototype.requestDhana = function (request) {
        return this.http.post('/calender/request/event', request).toPromise();
    };
    DhanaService.prototype.approveDhana = function (key) {
        return this.http.get('/calender/request/approve?key=' + key).toPromise();
    };
    DhanaService.prototype.rejectDhana = function (key, message) {
        return this.http.post('/calender/request/reject?key=' + key, { 'message': message }).toPromise();
    };
    DhanaService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], DhanaService);
    return DhanaService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map