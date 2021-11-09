const WorkspaceModel = require("../models/Workspace");

exports.createWorkspace = async ({ workspace, userId, isAdmin }) => {
  const workspaceCreated = await WorkspaceModel.createWorkspace(workspace);

  const workspaceId = workspaceCreated.id;
  WorkspaceModel.linkWorkspaceToUser({ userId, workspaceId, isAdmin });

  return workspaceCreated;
};

exports.linkWorkspaceToUser = ({ userId, workspaceId, isAdmin }) =>
  WorkspaceModel.linkWorkspaceToUser({ userId, workspaceId, isAdmin });

exports.getWorkspaceUsers = async (workspace_id) => {
  const workspaceUsers = await WorkspaceModel.getWorkspaceUsers(workspace_id);

  const userList = workspaceUsers.map((user) => {
    return {
      value: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
    };
  });

  return userList;
};

exports.updateWorkspaceUsers = async ({ email, workspace_id, isAdmin }) => {
  let is_admin = isAdmin === "True" ? true : false;

  await WorkspaceModel.updateWorkspaceUsers(email, workspace_id, is_admin);
};

exports.getWorkspaces = async (user_id) =>
  await WorkspaceModel.getWorkspaces(user_id);

exports.findWorkspaceByUser = async (user_id, workspace_id) => {
  const workspace = await WorkspaceModel.findWorkspaceByUser(
    user_id,
    workspace_id
  );

  const teste = await WorkspaceModel.findByPk(workspace_id);

  workspace.workspaceName = teste.dataValues.name;

  return workspace;
};

exports.findWorkspaceUsersCharacters = (workspaceId) =>
  WorkspaceModel.findWorkspaceUsersCharacters(workspaceId);
