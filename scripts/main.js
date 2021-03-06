// Imports
import { UtilService } from './util.js';
import * as Data from './data.js';
// Constants
const elInputRefCount = document.getElementById("InputRefCount");
const elInputRefSpeedBonus = document.getElementById("InputRefSpeedBonus");
const elInputRefProdBonus = document.getElementById("InputRefProdBonus");
const elInputChemSpeedBonus = document.getElementById("InputChemSpeedBonus");
const elInputChemProdBonus = document.getElementById("InputChemProdBonus");
const elOutput = document.getElementById("output");
const elRatios = document.getElementById("ratios");
const elNet = document.getElementById("net");
// Expose global functions
window.renderData = renderData;
function onInit() {
    elInputRefCount.valueAsNumber = 1;
    elInputRefSpeedBonus.valueAsNumber = 0;
    elInputRefProdBonus.valueAsNumber = 30;
    elInputChemSpeedBonus.valueAsNumber = 0;
    elInputChemProdBonus.valueAsNumber = 0;
    //
    elInputRefCount.valueAsNumber = 15;
    elInputRefSpeedBonus.valueAsNumber = 455;
    elInputRefProdBonus.valueAsNumber = 30;
    elInputChemSpeedBonus.valueAsNumber = 355;
    elInputChemProdBonus.valueAsNumber = 30;
    renderData();
}
function renderData() {
    // console.log(elInputRefCount.value);
    // basicOilProcessing();
    advancedOilProcessing();
}
// function basicOilProcessing() {
//     const outputIps = Data.ref.process.basicOilProcessing.outputs.map(item => {
//         return {
//             id: item.id,
//             ips: getIps(
//                 item.count,
//                 Data.ref.craftSpeed,
//                 Data.ref.process.basicOilProcessing.craftTime,
//                 elInputRefSpeedBonus.value
//             )
//         };
//     });
//     console.log(Data.basicOilProcessing.outputs);
//     console.log(outputIps);
// }
function advancedOilProcessing() {
    const processChain = [
        {
            craftSpeed: Data.ref.craftSpeed,
            process: Data.ref.processList.advancedOilProcessing,
        },
        {
            craftSpeed: Data.chemPlant.craftSpeed,
            process: Data.chemPlant.processList.heavyOilCracking,
        },
        {
            craftSpeed: Data.chemPlant.craftSpeed,
            process: Data.chemPlant.processList.lightOilCracking,
        },
    ];
    const processChainIps = processChain.map(processChainItem => {
        return getProcessIps(processChainItem.process, processChainItem.craftSpeed, processChainItem.process.id == 'Advanced_Oil_Processing' ? elInputRefSpeedBonus.valueAsNumber : elInputChemSpeedBonus.valueAsNumber, processChainItem.process.id == 'Advanced_Oil_Processing' ? elInputRefProdBonus.valueAsNumber : elInputChemProdBonus.valueAsNumber);
    });
    console.log(processChainIps);
    const buildingCount = [
        elInputRefCount.valueAsNumber, 1, 1
    ];
    const totalIps = {
        id: "Total_Ips",
        inputs: [],
        outputs: [],
    };
    const netIps = [];
    // Calculate total Ips and Building Count
    processChainIps.forEach((process, idx) => {
        // console.log(idx);
        // console.log(totalIps);
        if (idx > 0) {
            let baseProductInput;
            let totalProductOutput;
            processChainIps[idx].inputs.forEach(input => {
                const outputFound = totalIps.outputs.find(p => p.id == input.id);
                // console.log(`Search:`);
                // console.log(totalIps.outputs);
                if (outputFound) {
                    // console.log(`Found`)
                    baseProductInput = input;
                    totalProductOutput = outputFound;
                }
            });
            if (baseProductInput && totalProductOutput) {
                // console.log(baseProductInput.id);
                // console.log(`${totalProductOutput.ips} / ${baseProductInput.ips}`)
                buildingCount[idx] = totalProductOutput.ips / baseProductInput.ips;
            }
            else {
                throw Error("Not found :/");
            }
            // throw Error('')
        }
        // console.log(buildingCount);
        // Calculate total output Ips
        console.log(`OOOOOOOOOOOOOO`);
        process.outputs.forEach((product) => {
            // console.log(product.id);
            const outputTotalsIdx = totalIps.outputs.findIndex(p => p.id == product.id);
            // console.log(outputTotalsIdx);
            if (outputTotalsIdx >= 0) {
                totalIps.outputs[outputTotalsIdx].ips += product.ips * buildingCount[idx];
            }
            else {
                totalIps.outputs.push(Object.assign(Object.assign({}, product), { ips: product.ips * buildingCount[idx] }));
            }
            // console.log(JSON.stringify(totalIps, null, 4));
        });
        // Calculate total input Ips
        console.log(`IIIIIIIIIIIIIIIIIII`);
        process.inputs.forEach((product) => {
            const inputTotalsIdx = totalIps.inputs.findIndex(p => p.id == product.id);
            if (inputTotalsIdx >= 0) {
                totalIps.inputs[inputTotalsIdx].ips += product.ips * buildingCount[idx];
            }
            else {
                totalIps.inputs.push(Object.assign(Object.assign({}, product), { ips: product.ips * buildingCount[idx] }));
            }
        });
    });
    // Calculate Net
    totalIps.inputs.forEach(i => {
        const product = totalIps.outputs.find(f => f.id === i.id);
        let val = i.ips;
        if (product) {
            console.log(`Found: ${i.id}`);
            val -= product.ips;
        }
        netIps.push({
            id: i.id,
            ips: val,
        });
    });
    totalIps.outputs.forEach(o => {
        const product = totalIps.inputs.find(f => f.id === o.id);
        if (!product) {
            netIps.push({
                id: o.id,
                ips: o.ips,
            });
        }
    });
    // Display
    console.log('===============');
    console.log(totalIps);
    elRatios.innerHTML = UtilService.syntaxHighlight(JSON.stringify(buildingCount, null, 4));
    processChain.forEach((p, i) => {
        elRatios.appendChild(UtilService.getFactorioIconNumberCombo(p.process.id, buildingCount[i].toFixed(0)));
    });
    elOutput.innerHTML = UtilService.syntaxHighlight(JSON.stringify(totalIps, null, 4));
    elNet.innerHTML = UtilService.syntaxHighlight(JSON.stringify(netIps, null, 4));
}
// Helper Functions
function getProcessIps(process, craftSpeed, speedBonusPercent, productionBonusPercent) {
    return {
        id: process.id,
        // craftTime: process.craftTime,
        inputs: process.inputs.map(product => {
            return getProductIps(product, craftSpeed, process.craftTime, speedBonusPercent);
        }),
        outputs: process.outputs.map(product => {
            return getProductIps(product, craftSpeed, process.craftTime, speedBonusPercent, productionBonusPercent);
        })
    };
}
function getProductIps(product, craftSpeed, craftTime, speedBonusPercent, productionBonusPercent) {
    return {
        id: product.id,
        ips: getIps(product.count, craftSpeed, craftTime, speedBonusPercent) * (productionBonusPercent ? 1 + productionBonusPercent / 100 : 1)
    };
}
function getIps(count, speed, time, bonusSpeedPercent) {
    const totSpeed = speed + speed * bonusSpeedPercent / 100;
    return count * totSpeed / time;
}
// Run script
onInit();
