// Imports
// Data
export const ref = {
    id: "Oil_Refinery",
    craftSpeed: 1,
    energyMax: 434,
    processList: {
        basicOilProcessing: {
            id: "Basic_Oil_Processing",
            craftTime: 5,
            inputs: [
                {
                    id: "Crude_Oil",
                    count: 100,
                },
            ],
            outputs: [
                {
                    id: "Petroleum_Gas",
                    count: 45,
                },
            ]
        },
        advancedOilProcessing: {
            id: "Advanced_Oil_Processing",
            craftTime: 5,
            inputs: [
                {
                    id: "Crude_Oil",
                    count: 100,
                },
                {
                    id: "Water",
                    count: 50,
                },
            ],
            outputs: [
                {
                    id: "Petroleum_Gas",
                    count: 55,
                },
                {
                    id: "Light_Oil",
                    count: 45,
                },
                {
                    id: "Heavy_Oil",
                    count: 25,
                },
            ]
        },
        coalLiquefaction: {
            id: "Coal_Liquefaction",
            craftTime: 5,
            inputs: [
                {
                    id: "Coal",
                    count: 10,
                },
                {
                    id: "Heavy_Oil",
                    count: 25,
                },
                {
                    id: "Steam",
                    count: 50,
                },
            ],
            outputs: [
                {
                    id: "Petroleum_Gas",
                    count: 10,
                },
                {
                    id: "Light_Oil",
                    count: 20,
                },
                {
                    id: "Heavy_Oil",
                    count: 90,
                },
            ]
        }
    }
};
export const chemPlant = {
    id: "Chemical_Plant",
    craftSpeed: 1,
    energyMax: 217,
    processList: {
        heavyOilCracking: {
            id: "Heavy_Oil_Cracking",
            craftTime: 2,
            inputs: [
                {
                    id: "Water",
                    count: 30,
                },
                {
                    id: "Heavy_Oil",
                    count: 40,
                },
            ],
            outputs: [
                {
                    id: "Light_Oil",
                    count: 30,
                },
            ]
        },
        lightOilCracking: {
            id: "Light_Oil_Cracking",
            craftTime: 2,
            inputs: [
                {
                    id: "Water",
                    count: 30,
                },
                {
                    id: "Light_Oil",
                    count: 30,
                },
            ],
            outputs: [
                {
                    id: "Petroleum_Gas",
                    count: 20,
                },
            ]
        }
    }
};
