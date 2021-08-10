export class Workspace {

    id = -1
    name = ""
    color = ""
    tabs = []

    constructor() {

    }

    addTab(tab) {
        this.tabs.push(tab)
    }

    static serialize(workspace) {
        let object = {}
        object.i = workspace.id
        object.n = workspace.name
        object.c = workspace.color
        object.t = workspace.tabs
        return object
    }

    static deserialize(object) {
        let workspace = new Workspace()
        workspace.id = object.i
        workspace.name = object.n
        workspace.color = object.c
        workspace.tabs = object.t
        return workspace
    }
}

export class WorkspaceManager {

    setWorkspaceData(workspaceData) {
        browser.storage.sync.set({
            "workspaces": workspaceData
        })
    }

    setWorkspaces(workspaces) {
        this.setWorkspaceData(workspaces.map(Workspace.serialize))
    }

    async setWorkspace(workspace) {
        const workspaces = await this.getWorkspaces()

        for(let w of workspaces) {
            if(w.id === workspace.id) {
                const index = workspaces.indexOf(w)
                if (index > -1) {
                    workspaces.splice(index, 1)
                }
                break
            }
        }

        workspaces.push(workspace)

        this.setWorkspaces(workspaces)
    }

    async getWorkspaceData() {
        return (await browser.storage.sync.get("workspaces"))["workspaces"]
    }

    async getWorkspaces() {
        const workspaces = await this.getWorkspaceData()

        return workspaces.map(Workspace.deserialize)
    }

    async getWorkspace(id) {
        const workspaces = await this.getWorkspaces()

        for(let workspace of workspaces) {
            if(workspace.id == id) {
                return workspace
            }
        }
    }
}