import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav>
      <ul className="framed buttons">
          <CustomLink to='/'>Home</CustomLink>
          <CustomLink to='/pokedex'>Pokédex</CustomLink>
          <CustomLink to='/pokemon'>Pokémon</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li >
      <Link to={to} {...props}>
        <button className={isActive ? "active" : ""}>
          {children}
        </button>
      </Link>
    </li>
  )
}