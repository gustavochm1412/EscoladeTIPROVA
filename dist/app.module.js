"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const computador_entity_1 = require("./entities/computador.entity");
const periferico_entity_1 = require("./entities/periferico.entity");
const computadores_controller_1 = require("./controllers/computadores.controller");
const computadores_service_1 = require("./services/computadores.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT) || 5432,
                username: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_DATABASE || 'prova_db',
                entities: [computador_entity_1.Computador, periferico_entity_1.Periferico],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([computador_entity_1.Computador, periferico_entity_1.Periferico]),
        ],
        controllers: [app_controller_1.AppController, computadores_controller_1.ComputadoresController],
        providers: [app_service_1.AppService, computadores_service_1.ComputadoresService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map