
async function logStructureChildren(api: any, modelId: any, structure: any, prefix = '') {
    const elementId = structure.expressID;
    const base = await getElement(api, modelId, elementId);
    console.log('\n\n\nPARENT:')
    console.log(base.Name.value);

    for (let i = 0; i < structure.children.length; i++) {
        const structureChild = structure.children[i];
        const elementId = structureChild.expressID;

        console.log(`\n${prefix}--- CHILD ${i} ---`);

        const element = await getElement(api, modelId, elementId);
        console.log(element.Name.value);

        if (structureChild.children.length > 0) {
            await logStructureChildren(api, modelId, structureChild, `${element.Name.value}  `);
        }
    }
}

export async function logAll(api: { properties: { getSpatialStructure: (arg0: any) => any; }; }, modelId: any) {
    const structure = await api.properties.getSpatialStructure(modelId);
    await logStructureChildren(api, modelId, structure);
}

async function getElement(api: { properties: { getItemProperties: (arg0: any, arg1: any) => any; }; }, modelId: any, elementId: any) {
    return await api.properties.getItemProperties(modelId, elementId);
}