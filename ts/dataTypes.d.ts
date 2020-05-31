export interface Product {
    id: string;
    count: number;
}

export interface ProductIps {
    id: string;
    ips: number;
}

export interface Process {
    id: string;
    craftTime: number;
    inputs: Product[];
    outputs: Product[];
}

export interface ProcessIps {
    id: string;
    inputs: ProductIps[];
    outputs: ProductIps[];
}

export interface RefProcessList {
    basicOilProcessing: Process;
    advancedOilProcessing: Process;
    coalLiquefaction: Process;
}

export interface ChemProcessList {
    heavyOilCracking: Process;
    lightOilCracking: Process;
}

export interface FactorioMachine {
    id: string;
    craftSpeed: number;
    energyMax: number;
    processList: any;
}

export interface Refinery extends FactorioMachine {
    processList: RefProcessList;
}

export interface ChemicalPlant extends FactorioMachine {
    processList: ChemProcessList;
}
