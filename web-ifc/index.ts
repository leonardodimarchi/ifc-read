import { promises as fsPromises } from 'fs';
import * as WebIFC from 'web-ifc';


async function run() {
    const ifcData = await fsPromises.readFile('../example-files/UT_SpatialStructure_4.ifc');

        // initialize the API
    const ifcApi = new WebIFC.IfcAPI();

    // initialize the library
    await ifcApi.Init();

    // open a model from data
    /* IFC data as a string or UInt8Array */ /* optional settings object */
    let modelID = ifcApi.OpenModel(ifcData);

    if (modelID < 0) {
        throw new Error('Failed to load IFC file.')
    }

    console.log(ifcApi.GetIfcEntityList(modelID))

    // the model is now loaded! use modelID to fetch geometry or properties
    // checkout examples/usage for some details on how to read/write IFC

    // close the model, all memory is freed
    ifcApi.CloseModel(modelID);
}

run();
