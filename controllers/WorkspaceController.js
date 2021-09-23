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

  const userList = workspaceUsers.map(user => {
    return {
        value: user.id,
        name: `${user.first_name} ${user.last_name}`,
        avatar: "https://i.pravatar.cc/80?img=1",
        email: user.email,
    };
  });

  return userList;
}
  