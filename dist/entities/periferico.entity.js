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
exports.Periferico = void 0;
const typeorm_1 = require("typeorm");
const computador_entity_1 = require("./computador.entity");
let Periferico = class Periferico {
    id;
    nome;
    computadorId;
    computador;
};
exports.Periferico = Periferico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Periferico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Periferico.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Periferico.prototype, "computadorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => computador_entity_1.Computador, computador => computador.perifericos, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'computadorId' }),
    __metadata("design:type", computador_entity_1.Computador)
], Periferico.prototype, "computador", void 0);
exports.Periferico = Periferico = __decorate([
    (0, typeorm_1.Entity)('perifericos')
], Periferico);
//# sourceMappingURL=periferico.entity.js.map