"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputadoresController = void 0;
const common_1 = require("@nestjs/common");
const computadores_service_1 = require("../services/computadores.service");
let ComputadoresController = class ComputadoresController {
    computadoresService;
    constructor(computadoresService) {
        this.computadoresService = computadoresService;
    }
    async findAll() {
        return this.computadoresService.findAll();
    }
    async findOne(id) {
        return this.computadoresService.findOne(id);
    }
    async create(createComputadorDto) {
        return this.computadoresService.create(createComputadorDto);
    }
    async update(id, updateComputadorDto) {
        return this.computadoresService.update(id, updateComputadorDto);
    }
    async remove(id) {
        await this.computadoresService.remove(id);
        return { message: 'maquina removida com sucesso' };
    }
    async addPeriferico(computadorId, createPerifericoDto) {
        return this.computadoresService.addPeriferico(computadorId, createPerifericoDto);
    }
    async removePeriferico(perifericoId) {
        await this.computadoresService.removePeriferico(perifericoId);
        return { message: 'periferico removido com sucesso' };
    }
};
exports.ComputadoresController = ComputadoresController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComputadoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ComputadoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputadoresController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ComputadoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ComputadoresController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/perifericos'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ComputadoresController.prototype, "addPeriferico", null);
__decorate([
    (0, common_1.Delete)(':id/perifericos/:perifericoId'),
    __param(0, (0, common_1.Param)('perifericoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ComputadoresController.prototype, "removePeriferico", null);
exports.ComputadoresController = ComputadoresController = __decorate([
    (0, common_1.Controller)('computadores'),
    __metadata("design:paramtypes", [computadores_service_1.ComputadoresService])
], ComputadoresController);
//# sourceMappingURL=computadores.controller.js.map