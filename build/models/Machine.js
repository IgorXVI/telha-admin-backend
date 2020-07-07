"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var type_graphql_1 = require("type-graphql");
var Product_1 = require("./Product");
var Machine = /** @class */ (function (_super) {
    __extends(Machine, _super);
    function Machine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.ID; }),
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Machine.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.CreateDateColumn({ type: "datetime" }),
        __metadata("design:type", Date)
    ], Machine.prototype, "createdAt", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.UpdateDateColumn({ type: "datetime" }),
        __metadata("design:type", Date)
    ], Machine.prototype, "updatedAt", void 0);
    __decorate([
        type_graphql_1.Field(function () { return Product_1.Product; }, { nullable: true }),
        typeorm_1.OneToMany(function () { return Product_1.Product; }, function (ProductInstance) { return ProductInstance.Machine; }),
        __metadata("design:type", Array)
    ], Machine.prototype, "Products", void 0);
    Machine = __decorate([
        typeorm_1.Entity(),
        type_graphql_1.ObjectType()
    ], Machine);
    return Machine;
}(typeorm_1.BaseEntity));
exports.Machine = Machine;
