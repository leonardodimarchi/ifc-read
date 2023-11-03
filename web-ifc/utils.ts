import { IfcAPI } from "web-ifc";

export async function logAll(api: IfcAPI, modelId: number) {
    const structure = await api.properties.getSpatialStructure(modelId);
    await logStructureChildren(api, modelId, structure);
}

async function logStructureChildren(api: IfcAPI, modelId: number, structure: any, prefix = '') {
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

async function getElement(api: IfcAPI, modelId: number, elementId: number) {
    return await api.properties.getItemProperties(modelId, elementId);
}