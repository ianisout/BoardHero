const express = require("express");
const router = express.Router();

const verifyLoggedUser = require("../middlewares/VerifyLoggedUser");
const verifyNotLoggedUser = require("../middlewares/VerifyNotLoggedUser");

const TaskController = require("../controllers/TaskController");
const TypeOfElementController = require("../controllers/TypeOfElementController");
const CharacterController = require("../controllers/CharacterController");
const EquipController = require("../controllers/EquipController");

/* GET home page */
router.get("/", verifyNotLoggedUser, function (req, res, next) {
  res.render("index");
});

/* GET home page */
router.get("/index", verifyNotLoggedUser, function (req, res, next) {
  res.render("index");
});

/* GET character or signup options page  */
router.get("/char-login", verifyNotLoggedUser, function (req, res, next) {
  res.render("char-login");
});

/* GET character creation page */
router.get("/character-creation/", verifyNotLoggedUser, async function (req, res) {
  const typeOfElements = await TypeOfElementController.findAll();
  res.render("character-creation", { typeOfElements });
});

router.post("/character-creation/", async (req, res) => {
  let {CHARACTER_SET} = req.body;
  res.cookie('CHARACTER_SET', CHARACTER_SET, {maxAge: 60000});
  res.status(201).redirect("/User/signup")
})

/* GET reference page for sidebar and navbar components (TEST) */
router.get("/homepage", verifyLoggedUser, async function (req, res, next) {
  const { user } = req.session;
  const userId = user.id;
  const workspaceId = user.activeWorkspace.id;
  const allTasks = await TaskController.getAllTasks(workspaceId);
  const character = await CharacterController.getCharacterByUserId(userId);
  const characterVisualElements = await EquipController.findCharacterElements(character.id);
  const alert = req.session.alert;

  user.character = character;
  user.elements = characterVisualElements;

  res.render("homepage", { allTasks, user, alert });

  req.session.alert = 'false';
});

/* GET dashboard page */
router.get("/dashboard", verifyLoggedUser, function (req, res, next) {
  res.render("dashboard", { user: req.session.user });
});

/* GET inventory/store page */
router.get("/inventory", verifyLoggedUser, async function (req, res, next) {
  const user = req.session.user;
  const allElements = await EquipController.findAllEquips();
  const ownedEquips = await CharacterController.getOwnedEquipments(user.character.id);

  for(let i = 0; i < ownedEquips.length; i++) { // NOT WORKING PROPERLY
    checkIfOwned: {
      for (let j = 0; j < allElements.length; j++) {
        if (allElements[j].id === ownedEquips[i].elementId) {
          allElements[j].is_owned = 'owned';
          break checkIfOwned;
        }
      }
    }
  }
  
  res.render("inventory-store", { user, allElements, ownedEquips });
});

router.post("/inventory", async function (req, res) {
  const { element_id } = req.body;
  const character = req.session.user.character;
  const characterId = character.id;

  const statusMessage = await CharacterController.purchaseEquipment(character, characterId, Number(element_id));

  if (statusMessage === 'COINS_ERROR') {
    return res.status(402).send({
        error: statusMessage,
        statusCode: 402
    });
  }

  if (statusMessage === 'LVL_ERROR') {
    return res.status(401).send({
      error: statusMessage,
      statusCode: 401
  });
  }

  res.status(200).end();
});

router.patch("/inventory", async function (req, res) {
  const id = req.body;
  const user = req.session.user;
  const ownedEquips = await CharacterController.getOwnedEquipments(user.character.id);
  const allElements = await EquipController.findAllEquips();

  await EquipController.setEquipmentStatus(Number(id.id));

  const characterVisualElements = await EquipController.findCharacterElements(user.character.id);

  user.elements = characterVisualElements;

  res.render("inventory-store", { user, ownedEquips, allElements });
});

module.exports = router;
