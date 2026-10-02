'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'

export default function BackButton({
  children
}: {
  children?: React.ReactNode
}) {
  const router = useRouter()

  return (
    <a onClick={() => router.back()}>
      {children ? (
        children
      ) : (
        <span className="font-bold text-2xl cursor-pointer flex link link-hover">
          <FontAwesomeIcon icon={faBackspace} className="w-[26px] mr-2" />
          Go Back
        </span>
      )}
    </a>
  )
}
