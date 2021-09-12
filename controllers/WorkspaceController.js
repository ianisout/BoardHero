const WorkspaceModel = require("../models/Workspace");

exports.createWorkspace = async ({ workspace, userId, isAdmin }) => {
  const workspaceCreated = await WorkspaceModel.createWorkspace(workspace);

  const workspaceId = workspaceCreated.id;
  WorkspaceModel.linkWorkspaceToUser({ userId, workspaceId, isAdmin });

  return workspaceCreated;
};

exports.linkWorkspaceToUser = ({ userId, workspaceId, isAdmin }) =>
  WorkspaceModel.linkWorkspaceToUser({ userId, workspaceId, isAdmin });
