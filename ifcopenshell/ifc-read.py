import ifcopenshell


def traverse_ifc_elements(element, depth=0):
    if hasattr(element, 'Name'):
        print('\n\n\n\n')
        print(f"{'  ' * depth}Name: {element.Name if element.Name else 'N/A'}")
    else:
        print('N/A')

    if isinstance(element, str):
        print(element)
    else:    
        if element:
            psets = ifcopenshell.util.element.get_psets(element)
            print(psets)    

        for rel in ifcopenshell.util.element.get_decomposition(element):
            for related_element in rel:
                traverse_ifc_elements(related_element, depth + 1)

ifc = ifcopenshell.open('../example-files/UT_SpatialStructure_4.ifc')

for element in ifc.by_type("IfcProject"):
    traverse_ifc_elements(element)