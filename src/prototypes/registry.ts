import type { ComponentType } from 'react'
import KeyAttributesUpdate from './key-attributes-update'

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
export const prototypes: PrototypeMeta[] = [
  {
    slug: 'key-attributes-update',
    title: 'Обновление ключевых атрибутов',
    description: 'Задача на массовое обновление атрибутов предметов залога через файл',
    status: 'draft',
    component: KeyAttributesUpdate,
  },
]
