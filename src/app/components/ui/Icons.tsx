'use client'
import { Icon } from '@iconify/react'
import { useEffect } from 'react'

interface Props {
  icon: string
}

export default function icons(props: Props) {
  return <Icon icon={props.icon} />
}
