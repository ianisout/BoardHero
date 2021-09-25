"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("elements",
      [
        {
          name: "skincolor1",
          description: "Skin color",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/skincolor/skincolor1.png",
          type_of_element_id: 1
        },
        {
          name: "skincolor2",
          description: "Skin color",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/skincolor/skincolor2.png",
          type_of_element_id: 1
        },
        {
          name: "skincolor3",
          description: "Skin color",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/skincolor/skincolor3.png",
          type_of_element_id: 1
        },
        {
          name: "skincolor4",
          description: "Skin color",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/skincolor/skincolor4.png",
          type_of_element_id: 1
        },
        {
          name: "dress1",
          description: "Dress",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/dress/dress1.png",
          type_of_element_id: 2
        },
        {
          name: "dress2",
          description: "Dress",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/dress/dress2.png",
          type_of_element_id: 2
        },
        {
          name: "eyes1",
          description: "Eyes",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/eyes/eyes1.png",
          type_of_element_id: 4
        },
        {
          name: "eyes2",
          description: "Eyes",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/eyes/eyes2.png",
          type_of_element_id: 4
        },
        {
          name: "eyes3",
          description: "Eyes",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/eyes/eyes3.png",
          type_of_element_id: 4
        },
        {
          name: "eyes4",
          description: "Eyes",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/eyes/eyes4.png",
          type_of_element_id: 4
        },
        {
          name: "glasses1",
          description: "Glasses",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/glasses/glasses1.png",
          type_of_element_id: 5
        },
        {
          name: "hairback1",
          description: "Hair Back",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/hairback/hairback1.png",
          type_of_element_id: 6
        },
        {
          name: "hairback2",
          description: "Hair Back",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/hairback/hairback2.png",
          type_of_element_id: 6
        },
        {
          name: "hairback3",
          description: "Hair Back",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/hairback/hairback3.png",
          type_of_element_id: 6
        },
        {
          name: "hairfront1",
          description: "Hair Front",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/hairfront/hairfront1.png",
          type_of_element_id: 7
        },
        {
          name: "hairfront2",
          description: "Hair Front",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/hairfront/hairfront2.png",
          type_of_element_id: 7
        },
        {
          name: "hairfront3",
          description: "Hair Front",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/hairfront/hairfront3.png",
          type_of_element_id: 7
        },
        {
          name: "hairfront4",
          description: "Hair Front",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/hairfront/hairfront4.png",
          type_of_element_id: 7
        },
        {
          name: "mouth1",
          description: "Mouth",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/mouth/mouth1.png",
          type_of_element_id: 8
        },
        {
          name: "mouth2",
          description: "Mouth",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/mouth/mouth2.png",
          type_of_element_id: 8
        },
        {
          name: "mouth3",
          description: "Mouth",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/mouth/mouth3.png",
          type_of_element_id: 8
        },
        {
          name: "mouth4",
          description: "Mouth",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/mouth/mouth4.png",
          type_of_element_id: 8
        },
        {
          name: "pants1",
          description: "Pants",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/pants/pants1.png",
          type_of_element_id: 9
        },
        {
          name: "pants2",
          description: "Pants",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/pants/pants2.png",
          type_of_element_id: 9
        },
        {
          name: "pants3",
          description: "Pants",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/pants/pants3.png",
          type_of_element_id: 9
        },
        {
          name: "shirt1",
          description: "Shirt",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/shirt/shirt1.png",
          type_of_element_id: 11
        },
        {
          name: "shirt2",
          description: "Shirt",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/shirt/shirt2.png",
          type_of_element_id: 11
        },
        {
          name: "shirt3",
          description: "Shirt",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/shirt/shirt3.png",
          type_of_element_id: 11
        },
        {
          name: "shirt4",
          description: "Shirt",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/shirt/shirt4.png",
          type_of_element_id: 11
        },
        {
          name: "shoe1",
          description: "Shoe",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/shoe/shoe1.png",
          type_of_element_id: 12
        },
        {
          name: "shoe2",
          description: "Shoe",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/shoe/shoe2.png",
          type_of_element_id: 12
        },
        {
          name: "shoe3",
          description: "Shoe",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/shoe/shoe3.png",
          type_of_element_id: 12
        },
        {
          name: "tie1",
          description: "Tie",
          level: 0,
          price: 0,
          image_path: "/images/clothing-items/tie/tie1.png",
          type_of_element_id: 14
        },

      ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("elements", null, {});
  },
};
