/** Reach protected component fields from specs without widening production APIs. */
export function internals(component: object): Record<string, any> {
  return component as Record<string, any>;
}
