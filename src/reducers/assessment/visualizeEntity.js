
export const CLOSE_VISUALIZE_ENTITY = 'CLOSE_VISUALIZE_ENTITY'
export const VISUALIZE_ENTITY = 'VISUALIZE_ENTITY'

export function visualizeEntity(entityId) {
  return {type: VISUALIZE_ENTITY, entityId}
}

export function closeVisualizeEntity() {
  return {type: CLOSE_VISUALIZE_ENTITY}
}
