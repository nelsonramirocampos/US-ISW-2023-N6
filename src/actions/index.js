// actions/index.js
export const MI_ACCION = 'MI_ACCION';

export function miAccion(data) {
  return {
    type: MI_ACCION,
    payload: data,
  };
}
