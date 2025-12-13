export const Role = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system'
} as const;

export type RoleValue = (typeof Role)[keyof typeof Role];
