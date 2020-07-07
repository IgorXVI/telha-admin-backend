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
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var Product_1 = require("../models/Product");
var CreateProductInput_1 = require("../inputs/CreateProductInput");
var UpdateProductInput_1 = require("../inputs/UpdateProductInput");
var makeResolver_1 = require("./makeResolver");
var ProductResolver = /** @class */ (function (_super) {
    __extends(ProductResolver, _super);
    function ProductResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductResolver = __decorate([
        type_graphql_1.Resolver()
    ], ProductResolver);
    return ProductResolver;
}(makeResolver_1.makeCrudResolver(Product_1.Product, CreateProductInput_1.CreateProductInput, UpdateProductInput_1.UpdateProductInput)));
exports.ProductResolver = ProductResolver;
