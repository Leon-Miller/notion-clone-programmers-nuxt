import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
      currentWorkspace: {},
      currentWorkspacePath: []
    }
  },
  getters: {},
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async createWorkspace({ dispatch }, payload = {}) {
      const { parentId } = payload
      const workspace = await _request({
        method: 'POST',
        body: JSON.stringify({
          title: '',
          parent: parentId
        })
      })
      await dispatch('readWorkspaces')
      if (process.server) return
      $nuxt._router.push({
        name: 'workspaces-id',
        params: {
          id: workspace.id
        }
      })
    },
    async readWorkspaces({ commit, dispatch }) {
      const workspaces = await _request({
        method: 'GET'
      })
      commit('assignState', {
        workspaces
      })
      dispatch('findWorkspacePath')
      if (!workspaces.length) {
        await dispatch('createWorkspace')
      }
    },
    async readWorkspace({ commit }, payload) {
      const { id } = payload
      try {
        const workspace = await _request({
          id,
          method: 'GET'
        })
        commit('assignState', {
          currentWorkspace: workspace
        })
      } catch (error) {
        if (process.server) return
        $nuxt._router.push('/error')
      }
    },
    async updateWorkspace({ dispatch }, payload) {
      const { id, title, content } = payload
      await _request({
        id,
        method: 'PUT',
        body: JSON.stringify({
          title,
          content
        })
      })
      dispatch('readWorkspaces')
    },
    async deleteWorkspace({ state, dispatch }, payload) {
      const { id } = payload
      await _request({
        id,
        method: 'DELETE'
      })
      await dispatch('readWorkspaces')
      if (process.server) return
      if (id === parseInt($nuxt._router.app.$route.params.id, 10)) {
        $nuxt._router.push({
          name: 'workspaces-id',
          params: {
            id: state.workspaces[0].id
          }
        })
      }
    },
    findWorkspacePath({ state, commit }) {
      if (process.server) return
      const currentWorkspaceId = parseInt($nuxt._router.app.$route.params.id, 10)
      function _find(workspace, parents) {
        if (currentWorkspaceId === workspace.id) {
          commit('assignState', {
            currentWorkspacePath: [...parents, workspace]
          })
        }
        if (workspace.documents) {
          workspace.documents.forEach(ws => _find(ws, [...parents, workspace]))
        }
      }
      state.workspaces.forEach(workspace => _find(workspace, []))
    }
  }
}

async function _request(options) {
  const url = process.client
    ? '/api/workspace'
    : `${process.env.CLIENT_URL}/api/workspace`
  const { data } = await axios.post(url, options)
  return data
}