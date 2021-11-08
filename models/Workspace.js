const { Workspace, Users_has_workspace } = require("../database/models");
const UserModel = require("../models/User");

exports.createWorkspace = async (workspace) => {
  const workspaceCreated = await Workspace.create(workspace);
  return workspaceCreated.dataValues;
};

exports.updateWorkspaceUsers = async (email, workspace_id, is_admin) => {
  try {
    const newUser = await UserModel.getUserByEmail(email);
    await Users_has_workspace.create({
      user_id: newUser.id,
      workspace_id,
      is_admin,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.linkWorkspaceToUser = async ({ userId, workspaceId, isAdmin }) => {
  await Users_has_workspace.create({
    user_id: userId,
    workspace_id: workspaceId,
    is_admin: isAdmin,
  });
};

exports.getWorkspaceUsers = async (workspace_id) => {
  const workspace = await Workspace.findByPk(workspace_id);
  const userList = await workspace.getUsers();
  return userList.map((user) => user.dataValues);
};

exports.getWorkspaces = async (user_id) => {
  const workspaces = [];
  const userHasWorkspaces = await Users_has_workspace.findAll({
    where: {
      user_id,
    },
    attributes: ["is_admin", "workspace_id"],
  });

  for (let i = 0; i < userHasWorkspaces.length; i++) {
    let workspaceFound = await Workspace.findByPk(
      userHasWorkspaces[i].workspace_id
    );
    workspaces.push({
      workspaceId: userHasWorkspaces[i].dataValues.workspace_id,
      isAdmin: userHasWorkspaces[i].dataValues.is_admin,
      workspaceName: workspaceFound.dataValues.name,
    });
  }

  return workspaces;
};

exports.findWorkspaceByUser = async (user_id, workspace_id) => {
  const workspace = await Users_has_workspace.findOne({
    where: {
      user_id,
      workspace_id,
    },
    attributes: ["is_admin", "workspace_id"],
  });

  return workspace.dataValues;
};

exports.findByPk = async (id) => await Workspace.findByPk(id);

exports.findWorkspaceUsersCharacters = async (workspace_id) => {
  const workspace = await Workspace.findByPk(workspace_id);
  const userList = await workspace.getUsers();
  const userCharacter = [];

  for (let i = 0; i < userList.length; i++) {
    userCharacter.push({
      userId: userList[i].dataValues.id,
      userElements: await UserModel.findCharacterByUser(
        userList[i].dataValues.id
      ),
    });
  }

  return userCharacter;
};
