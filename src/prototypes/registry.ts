import type { ComponentType } from 'react'

export type PrototypeStatus = 'draft' | 'review' | 'ready'

export interface PrototypeMeta {
  slug: string
  title: string
  description: string
  status: PrototypeStatus
  /** slug'и связанных прототипов */
  linkedTo?: string[]
  component: ComponentType
}

// Новые прототипы регистрируются здесь (команда /proto).
export const prototypes: PrototypeMeta[] = []
