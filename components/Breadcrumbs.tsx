import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Breadcrumbs({
  items,
}: {
  items?: {
    title: string,
    icon?: IconDefinition
    path?: string,
  }[]
}) {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items?.map(({ title, icon, path }) => {
          if (path) return (
            <li key={title}>
              <Link href={path}>
                {icon ? <FontAwesomeIcon icon={icon} className="h-[14px] mr-1" /> : null}
                {title}
              </Link>
            </li>
          )
          else return (
            <li key={title}>
              {icon ? <FontAwesomeIcon icon={icon} className="h-[14px] mr-1" /> : null}
              {title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
