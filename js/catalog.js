function viewBySubcategory(subcategory) {
  const categoryFolders = {
    "Carbon Bearing": "thrust-bearing",
    "Fiber Bearing": "thrust-bearing",
    "Carbide": "thrust-bearing",
    "Super Teflon": "thrust-bearing",
    "Carbon Bush": "bush",
    "Metal Bush": "bush",
    "Oil Seal": "rubber-products",
    "Neckring": "rubber-products",
    "Grommet": "rubber-products",
    "V4": "impeller",
    "V6": "impeller",
    "Old": "impeller",
    "V4 Wooden": "wooden-stick",
    "V6 Wooden": "wooden-stick",
    "V8": "wooden-stick",
    "V9": "wooden-stick",
    "SS Stud & Nuts": "hardware",
    "M S Stud & Nuts": "hardware",
    "Bolt": "hardware",
    "Washer": "hardware",
    "Lock": "hardware",
    "Key": "hardware"
  };

  const folder = categoryFolders[subcategory];
  if (!folder) {
    alert(`No folder mapping found for subcategory: ${subcategory}`);
    return;
  }

  const fileName = subcategory.trim().toLowerCase().replace(/\s+/g, "-") + ".html";

  // Navigate to static subcategory page without query param as page has SUBCATEGORY constant
  window.location.href = `category/${folder}/${fileName}`;
}
