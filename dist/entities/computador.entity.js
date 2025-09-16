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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Computador = void 0;
const typeorm_1 = require("typeorm");
const periferico_entity_1 = require("./periferico.entity");
let Computador = class Computador {
    id;
    nome;
    cor;
    dataFabricacao;
    perifericos;
};
exports.Computador = Computador;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Computador.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Computador.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Computador.prototype, "cor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Computador.prototype, "dataFabricacao", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => periferico_entity_1.Periferico, periferico => periferico.computador, { cascade: true }),
    __metadata("design:type", Array)
], Computador.prototype, "perifericos", void 0);
exports.Computador = Computador = __decorate([
    (0, typeorm_1.Entity)('computadores')
], Computador);
//# sourceMappingURL=computador.entity.js.map