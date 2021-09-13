const { Workspace, Users_has_workspace } = require("../database/models");

exports.createWorkspace = async (workspace) => {
  const workspaceCreated = await Workspace.create(workspace);
  return workspaceCreated.dataValues;
};

exports.linkWorkspaceToUser = async ({ userId, workspaceId, isAdmin }) => {
  await Users_has_workspace.create({
    user_id: userId,
    workspace_id: workspaceId,
    is_admin: isAdmin,
  });
};
